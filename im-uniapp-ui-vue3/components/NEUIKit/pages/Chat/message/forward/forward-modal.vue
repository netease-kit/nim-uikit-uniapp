<template>
  <Modal
    :title="t('sendToText')"
    :visible="forwardModalVisible"
    :confirmText="t('sendText')"
    :cancelText="t('cancelText')"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <div
      v-if="props.forwardTargets && props.forwardTargets.length > 1"
      class="multi-targets-wrapper"
    >
      <Avatar
        v-for="target in props.forwardTargets"
        :key="`${target.type}-${target.id}`"
        :account="target.id"
        :avatar="target.avatar"
        size="36"
      />
    </div>
    <div
      v-else-if="
        props.forwardConversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
      "
      class="avatar-wrapper"
    >
      <Avatar
        :account="
          (props.forwardToTeamInfo && props.forwardToTeamInfo.teamId) || ''
        "
        :avatar="props.forwardToTeamInfo && props.forwardToTeamInfo.avatar"
        size="36"
      />
      <div class="name">
        {{ (props.forwardToTeamInfo && props.forwardToTeamInfo.name) || '' }}
      </div>
    </div>
    <div v-else class="avatar-wrapper">
      <Avatar :account="forwardTo" size="36" />
      <div class="name">
        <span>{{ forwardToNick }}</span>
      </div>
    </div>
    <div class="description">
      {{ '[' + t(forwardModeTextKey) + ']' }}
      {{ forwardSourceName }}
      {{ t('sessionRecordText') }}
    </div>
    <input
      class="forward-input"
      @input="handleForwardInputChange"
      :placeholder="t('forwardComment')"
    />
  </Modal>
</template>

<script lang="ts" setup>
/** 消息转发弹窗组件 */

import { t } from '../../../../utils/i18n'
import { ref, computed } from 'vue'
import Modal from '../../../../components/Modal.vue'
import Avatar from '../../../../components/Avatar.vue'
import type { V2NIMMessageForUI } from '../../../../utils/module/im-store-v2/types/src'
import { V2NIMConst } from '../../../../utils/nim'
import type { ForwardMode } from '../../../../utils/forwardTask'
import type { ForwardTarget } from '../../../../utils/forwardTarget'

interface ForwardToTeamInfo {
  teamId: string
  name: string
  avatar: string
}

const props = withDefaults(
  defineProps<{
    forwardModalVisible: boolean
    forwardTo: string
    forwardMsg?: V2NIMMessageForUI
    forwardConversationType: V2NIMConst.V2NIMConversationType
    forwardToTeamInfo?: ForwardToTeamInfo
    forwardMode?: ForwardMode
    sourceConversationId?: string
    forwardTargets?: ForwardTarget[]
  }>(),
  {
    forwardMode: 'single',
    sourceConversationId: '',
    forwardTargets: () => [],
  }
)

const emit = defineEmits(['confirm', 'cancel'])

/** 留言 */
const forwardComment = ref('')

/** 转发弹窗 Input  */
const handleForwardInputChange = (event: any) => {
  forwardComment.value = event.detail.value
}
/** 取消转发 */
const handleCancel = () => {
  emit('cancel')
}

/** 确认转发 */
const handleConfirm = () => {
  emit('confirm', forwardComment.value)
}

/** 转发消息的接收方昵称 */
const forwardToNick = computed(() => {
  return uni.$UIKitStore.uiStore.getAppellation({
    account: props.forwardTo,
  })
})

const forwardModeTextKey = computed(() => {
  if (props.forwardMode === 'merged') return 'mergedForwardText'
  if (props.forwardMode === 'oneByOne') return 'oneByOneForwardText'
  return 'forwardText'
})

/** 转发消息所属会话名称 */
const forwardSourceName = computed(() => {
  if (props.forwardMode === 'single') {
    if (!props.forwardMsg?.senderId) return ''
    return uni.$UIKitStore.uiStore.getAppellation({
      account: props.forwardMsg.senderId,
    })
  }
  const conversationId =
    props.sourceConversationId || props.forwardMsg?.conversationId
  if (!conversationId) return ''

  const conversationType =
    uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(conversationId)
  const targetId =
    uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationTargetId(
      conversationId
    )
  if (
    conversationType ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
  ) {
    return uni.$UIKitStore.teamStore.teams.get(targetId)?.name || targetId
  }
  return uni.$UIKitStore.userStore.users.get(targetId)?.name || targetId
})
</script>

<style lang="scss" scoped>
.description {
  font-size: 14px;
  height: 32px;
  color: #000000;
  background-color: #f2f4f5;
  margin: 16px;
  padding: 0 16px;
  line-height: 32px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.forward-input {
  height: 32px;
  border: 1px solid #e1e6e8;
  border-radius: 4px;
  margin: 10px 16px 0 16px;
  padding: 5px 8px;
  box-sizing: border-box;
}

.multi-targets-wrapper {
  display: flex;
  max-height: 80px;
  flex-wrap: wrap;
  gap: 8px;
  margin: 13px 16px;
  overflow-y: auto;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  height: 36px;
  margin: 13px 16px;
  .name {
    margin-left: 10px;
    font-size: 14px;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
