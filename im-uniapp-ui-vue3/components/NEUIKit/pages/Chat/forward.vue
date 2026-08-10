<template>
  <page-meta
    :page-style="'overflow:' + (moveThrough ? 'hidden' : 'visible')"
  ></page-meta>
  <ForwardSelector @cancel="backToChat" @select="handleTargetsSelected" />
  <ForwardModal
    :forward-modal-visible="forwardModalVisible"
    :forward-to="primaryTarget?.id || ''"
    :forward-msg="forwardMsg"
    :forward-conversation-type="primaryTarget?.type || p2pConversationType"
    :forward-to-team-info="forwardToTeamInfo"
    :forward-mode="forwardMode"
    :source-conversation-id="sourceConversationId"
    :forward-targets="forwardTargets"
    @confirm="handleForwardConfirm"
    @cancel="handleForwardCancel"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
//@ts-ignore
import { onLoad } from '@dcloudio/uni-app'
import { events } from '../../utils/constants'
import {
  getForwardTask,
  resolveForwardTaskMessages,
  type ForwardMode,
} from '../../utils/forwardTask'
import {
  addRecentForwardTargets,
  type ForwardTarget,
} from '../../utils/forwardTarget'
import { t } from '../../utils/i18n'
import {
  sendMergedForwardMessage,
  sendOneByOneForwardMessages,
} from '../../utils/mergedForward'
import { NIM_WEB_SDK_VERSION, V2NIMConst } from '../../utils/nim'
import type { V2NIMMessageForUI } from '../../utils/module/im-store-v2/types/src'
import ForwardModal from './message/forward/forward-modal.vue'
import ForwardSelector from './message/forward/forward-selector.vue'

defineProps<{
  forwardConversationType?: string | number
  taskId?: string
  msgIdClient?: string
  origin?: string
}>()

const p2pConversationType =
  V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
const teamConversationType =
  V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
const selectedConversationId =
  uni.$UIKitStore?.uiStore.selectedConversation || ''

const sourceConversationId = ref(selectedConversationId)
const forwardMode = ref<ForwardMode>('single')
const taskMessages = ref<V2NIMMessageForUI[]>([])
const forwardMsg = ref<V2NIMMessageForUI>()
const forwardTargets = ref<ForwardTarget[]>([])
const forwardModalVisible = ref(false)
const isForwarding = ref(false)
const moveThrough = computed(() => forwardModalVisible.value)
const primaryTarget = computed(() => forwardTargets.value[0])
const forwardToTeamInfo = computed(() => {
  const target = primaryTarget.value
  if (!target || target.type !== teamConversationType) return undefined
  return {
    teamId: target.id,
    name: target.name,
    avatar: target.avatar || '',
  }
})

let msgIdClient = ''
let origin = ''
let taskId = ''
let failureBackPending = false

const backToChat = () => {
  uni.navigateBack({ delta: 1 })
}

const showForwardMessageFailedAndBack = () => {
  if (failureBackPending) return
  failureBackPending = true
  uni.showToast({
    title: t('getForwardMessageFailed'),
    icon: 'error',
    duration: 1000,
  })
  setTimeout(backToChat, 1000)
}

const resolveLegacyMessage = () => {
  forwardMsg.value = uni.$UIKitStore.msgStore.getMsg(selectedConversationId, [
    msgIdClient,
  ])?.[0]

  if (origin === 'pin') {
    const curPinMsgsMap =
      uni.$UIKitStore.msgStore.pinMsgs.get(selectedConversationId)
    const pinInfo = [...(curPinMsgsMap?.values?.() || [])].find(
      (item: any) => item.message?.messageClientId === msgIdClient
    ) as any
    if (pinInfo?.message) forwardMsg.value = pinInfo.message
  } else if (origin === 'collection') {
    const msg = uni.$UIKitStore.msgStore.collectionMsgs.get(msgIdClient)
    if (msg) forwardMsg.value = msg
  }
}

const resolveMessages = () => {
  if (taskId) {
    if (!getForwardTask(taskId) || !taskMessages.value.length) {
      showForwardMessageFailedAndBack()
      return []
    }
    return taskMessages.value
  }
  if (!msgIdClient) return []
  resolveLegacyMessage()
  return forwardMsg.value ? [forwardMsg.value] : []
}

const handleTargetsSelected = (targets: ForwardTarget[]) => {
  if (!targets.length || failureBackPending || isForwarding.value) return
  const messages = resolveMessages()
  if (!messages.length) {
    showForwardMessageFailedAndBack()
    return
  }
  forwardTargets.value = targets
  forwardMsg.value = messages[0]
  forwardModalVisible.value = true
}

const getTargetConversationId = (target: ForwardTarget) =>
  uni.$UIKitNIM.V2NIMConversationIdUtil[
    target.type === p2pConversationType
      ? 'p2pConversationId'
      : 'teamConversationId'
  ](target.id)

const sendToTarget = async (
  target: ForwardTarget,
  messages: V2NIMMessageForUI[],
  forwardComment: string
) => {
  const targetConversationId = getTargetConversationId(target)
  if (forwardMode.value === 'merged') {
    await sendMergedForwardMessage({
      store: uni.$UIKitStore,
      nim: uni.$UIKitNIM,
      messages,
      targetConversationId,
      sourceConversationId: sourceConversationId.value,
      appVersion: 'UniApp',
      sdkVersion: NIM_WEB_SDK_VERSION,
      chatHistoryText: t('chatHistoryText'),
      comment: forwardComment,
    })
    return
  }
  if (forwardMode.value === 'oneByOne') {
    await sendOneByOneForwardMessages({
      store: uni.$UIKitStore,
      messages,
      targetConversationId,
      comment: forwardComment,
    })
    return
  }
  await uni.$UIKitStore.msgStore.forwardMsgActive(
    messages[0],
    targetConversationId,
    forwardComment
  )
}

const handleForwardConfirm = async (forwardComment: string) => {
  if (isForwarding.value) return
  forwardModalVisible.value = false
  const messages = resolveMessages()
  if (!messages.length || !forwardTargets.value.length) {
    showForwardMessageFailedAndBack()
    return
  }

  isForwarding.value = true
  try {
    await Promise.all(
      forwardTargets.value.map((target) =>
        sendToTarget(target, messages, forwardComment)
      )
    )
    addRecentForwardTargets(
      uni,
      forwardTargets.value,
      uni.$UIKitStore?.userStore?.myUserInfo?.accountId || '',
      p2pConversationType
    )
    uni.showToast({
      title: t('forwardSuccessText'),
      icon: 'none',
      duration: 1000,
    })
    if (taskId) uni.$emit(events.FORWARD_TASK_SUCCEEDED, taskId)
    setTimeout(backToChat, 1000)
  } catch (error) {
    if (forwardMode.value === 'merged') {
      console.error('[IMUIKit][MergedForward] forward failed', error)
    }
    uni.showToast({
      title: t('forwardFailedText'),
      icon: 'error',
      duration: 1000,
    })
  } finally {
    isForwarding.value = false
  }
}

const handleForwardCancel = () => {
  forwardModalVisible.value = false
}

onLoad((query: any) => {
  taskId = query?.taskId ? decodeURIComponent(query.taskId) : ''
  msgIdClient = query?.msgIdClient || ''
  origin = query?.origin || ''

  if (!taskId) return
  const task = getForwardTask(taskId)
  if (!task) {
    showForwardMessageFailedAndBack()
    return
  }
  sourceConversationId.value = task.sourceConversationId
  forwardMode.value = task.mode
  taskMessages.value = resolveForwardTaskMessages(
    task,
    uni.$UIKitStore.msgStore.getMsg(task.sourceConversationId) || []
  )
  forwardMsg.value = taskMessages.value[0]
  if (!taskMessages.value.length) showForwardMessageFailedAndBack()
})
</script>
