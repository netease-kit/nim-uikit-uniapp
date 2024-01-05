<template>
  <div class="msg-wrapper">
    <div class="msg-alert">
      <NetworkAlert />
    </div>
    <MessageList :scene="scene" :to="to" :msgs="msgs" :loading-more="loadingMore" :no-more="noMore"
      :on-load-more="handleLoadMore" :reply-msgs-map="replyMsgsMap" />
    <MessageInput :reply-msgs-map="replyMsgsMap" :scene="scene" :to="to" />
  </div>
  <!-- 转发弹窗 -->
  <ForwardModal :forward-modal-visible="forwardModalVisible" :handle-cancel="handleForwardCancel" :handle-confirm="handleForwardConfirm"
    :forward-id="forwardId" :forward-msg="forwardMsg" :forward-scene="forwardScene"
    :forward-to-team-info="forwardToTeamInfo" />
</template>

<script lang="ts" setup>
import type {
  IMMessage,
  TMsgScene,
} from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import { ref } from 'vue'
import MessageList from './message-list.vue'
import MessageInput from './message-input.vue'
import { events, HISTORY_LIMIT } from '../../../utils/constants'
import { autorun } from 'mobx'
import NetworkAlert from '../../../components/NetworkAlert.vue'
import { t } from '../../../utils/i18n'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { storeUtils } from '@xkit-yx/im-store'
import { customSwitchTab } from '../../../utils/customNavigate'
import { parseSessionId } from '../../../utils/msg'
import ForwardModal from './message-forward-modal.vue'
import type { Team } from '@xkit-yx/im-store'
import { getUniPlatform } from '../../../utils'

let isMounted = false

const loadingMore = ref(false)
const noMore = ref(false)
const store = uni.$UIKitStore
const sessionId = store.uiStore.selectedSession
const myAccount = store.userStore.myUserInfo.account

const { scene, to }: { scene: TMsgScene, to: string } = parseSessionId(sessionId);

const msgs = ref<IMMessage[]>([])

// uni.pageScrollTo 在微信小程序不生效，故每次只拉取8条历史消息，保证感知拉取新消息
const HistoryLimit = getUniPlatform() == 'mp-weixin' ? 8 : HISTORY_LIMIT
// 转发相关
const forwardModalVisible = ref(false)
const forwardId = ref('')
const forwardMsg = ref<IMMessage>()
const forwardToTeamInfo = ref<Team>()
const forwardScene = ref<TMsgScene>('p2p')

const handleForwardCancel = () => {
  forwardModalVisible.value = false
}

const handleForwardConfirm = async (forwardComment) => {
    forwardModalVisible.value = false
    store.msgStore.forwardMsgActive(
      { 
        msg: forwardMsg.value as IMMessage,
        scene: forwardScene.value,
        to: forwardId.value,
      },
      forwardComment
    ).then(() => {
      uni.showToast({
        title: t('forwardSuccessText'),
        icon: 'success',
        duration: 1000,
      })
    }).catch(() =>{
      uni.showToast({
        title: t('forwardFailedText'),
        icon: 'error',
        duration: 1000,
      })
    })
}

// 回复
const replyMsgsMap = ref<Record<string, IMMessage>>()

const handleDismissTeam = (data) => {
  if (data.teamId === to) {
    uni.showModal({
      content: t('onDismissTeamText'),
      showCancel: false,
      success(data) {
        if (data.confirm) {
          backToConversation()
        }
      },
    })
  }
}

const handleRemoveTeamMembers = (data) => {
  if (data.team.teamId === to && data.accounts.includes(myAccount)) {
    uni.showModal({
      content: t('onRemoveTeamText'),
      showCancel: false,
      success(data) {
        if (data.confirm) {
          backToConversation()
        }
      },
    })
  }
}

const handleMsg = (msg) => {
  uni.$emit(events.ON_MSG, msg)
}

onLoad((props) => {
  uni.$UIKitNIM.on('msg', handleMsg)
  uni.$UIKitNIM.on('dismissTeam', handleDismissTeam)
  uni.$UIKitNIM.on('removeTeamMembers', handleRemoveTeamMembers)
  // 转发消息相关
  const _forwardId = props?.forwardId 
  if (_forwardId && props?.msgIdClient) {
    forwardId.value = _forwardId
    forwardMsg.value = store.msgStore.getMsg(sessionId, [props.msgIdClient])[0]
    forwardModalVisible.value = true
    forwardScene.value = props?.forwardScene
    if (props?.forwardScene === 'team') {
      forwardToTeamInfo.value = store.teamStore.teams.get(_forwardId)
    }
  }
})

onUnload(() => {
  uni.$UIKitNIM.off('dismissTeam', handleDismissTeam)
  uni.$UIKitNIM.off('removeTeamMembers', handleRemoveTeamMembers)
  uni.$UIKitNIM.off('msg', handleMsg)
  // 销毁时清空内存
  // store.msgStore.removeMsg(sessionId)
})

const getHistroy = async (endTime: number, lastMsgId?: string) => {
  try {
    if (noMore.value) {
      return []
    }
    if (loadingMore.value) {
      return []
    }
    loadingMore.value = true
    if (sessionId) {
      const historyMsgs = await store.msgStore.getHistoryMsgActive({
        sessionId,
        endTime,
        lastMsgId,
        limit: HistoryLimit,
      })
      loadingMore.value = false
      if (historyMsgs.length < HistoryLimit) {
        noMore.value = true
      }
      return historyMsgs
    }
  } catch (error) {
    loadingMore.value = false
    // uni.showToast({
    //   title: t('getHistoryMsgFailedText'),
    //   icon: 'error',
    //   duration: 2000,
    // })
    throw error
  }
}

const handleLoadMore = async (lastMsg: IMMessage) => {
  const res = await getHistroy(lastMsg.time, lastMsg.idServer)
  return res
}

const backToConversation = () => {
  customSwitchTab({ url: '/pages/Conversation/index' })
}

autorun(() => {
  if (store.connectStore.connectState === 'connected') {
    getHistroy(Date.now()).then((msgs) => {
      if (!isMounted) {
        uni.$emit(events.ON_CHAT_MOUNTED, msgs?.[0])
        isMounted = true
      }
    })
  }
})

autorun(() => {
  msgs.value = storeUtils.getFilterMsgs(
    store.msgStore.getMsg(sessionId),
    (item) => item.type !== 'notification'
  )
  // 遍历所有消息，找出被回复消息，储存在map中
  if (msgs.value.length !== 0) {
    const _replyMsgsMap = {}
    const reqMsgs: Array<{
      scene: 'p2p' | 'team'
      from: string
      to: string
      idServer: string
      time: number
    }> = []
    const idClients: Record<string, string> = {}
    msgs.value.forEach((msg) => {
      if (msg.ext) {
        try {
          const { yxReplyMsg } = JSON.parse(msg.ext)
          if (yxReplyMsg) {
            const replyMsg = msgs.value.find(
              (item) => item.idClient === yxReplyMsg.idClient
            )
            if (replyMsg) {
              _replyMsgsMap[msg.idClient] = replyMsg
            } else {
              _replyMsgsMap[msg.idClient] = 'noFind'
              const { scene, from, to, idServer, time } = yxReplyMsg
              if (scene && from && to && idServer && time) {
                reqMsgs.push({ scene, from, to, idServer, time })
                idClients[idServer] = msg.idClient
              }
            }
          }
        } catch { }
      }
    })
    if (reqMsgs.length > 0) {
      store.msgStore.getMsgByIdServerActive({ reqMsgs }).then((res) => {
        res.forEach((item) => {
          if (item.idServer) {
            _replyMsgsMap[idClients[item.idServer]] = item
          }
        })
        replyMsgsMap.value = { ..._replyMsgsMap }
      })
    } else {
      replyMsgsMap.value = { ..._replyMsgsMap }
    }
  }
})

// onMounted(async () => {
//   const msgs = await getHistroy(Date.now())
//   uni.$emit(events.ON_CHAT_MOUNTED, msgs[0])
// })
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';

.msg-wrapper {
  display: flex;
  flex-direction: column;
}

.msg-alert {
  position: fixed;
  // top: calc(45px + var(--status-bar-height));
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 100;
}

.button-icon {
  font-size: 22px;
  color: #333;
}
</style>
