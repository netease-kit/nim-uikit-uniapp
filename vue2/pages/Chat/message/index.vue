<template>
  <div class="msg-wrapper">
    <MessageList :scene="scene" :to="to" :msgs="msgs" :loading-more="loadingMore" :no-more="noMore"
      :reply-msgs-map="replyMsgsMap" />
    <MessageInput :reply-msgs-map="replyMsgsMap" :scene="scene" :to="to" />
  </div>
</template>

<script lang="ts" setup>
import type {
  IMMessage,
  TMsgScene,
} from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import { onMounted, ref, onUnmounted } from '../../../utils/transformVue'
import MessageList from './message-list.vue'
import MessageInput from './message-input.vue'
import { events, HISTORY_LIMIT, MSG_ID_FLAG } from '../../../utils/constants'
import { autorun } from 'mobx'
import { t } from '../../../utils/i18n'
import { storeUtils } from '@xkit-yx/im-store'
import { customSwitchTab } from '../../../utils/customNavigate'
import { parseSessionId } from '../../../utils/msg'
import { deepClone } from '../../../utils'

let isMounted = false

const loadingMore = ref(false)
const noMore = ref(false)
const sessionId = uni.$UIKitStore.uiStore.selectedSession
const myAccount = uni.$UIKitStore.userStore.myUserInfo.account

const { scene, to }: { scene: TMsgScene, to: string } = parseSessionId(sessionId);

const msgs = ref<IMMessage[]>([])

// 回复
const replyMsgsMap = ref<Record<string, IMMessage>>()

const handleDismissTeam = (data: any) => {
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

const handleRemoveTeamMembers = (data: any) => {
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

const handleMsg = (msg: IMMessage) => {
  uni.$emit(events.ON_MSG, msg)
}

onMounted(function () {
  uni.$UIKitNIM.on('msg', handleMsg)
  uni.$UIKitNIM.on('dismissTeam', handleDismissTeam)
  uni.$UIKitNIM.on('removeTeamMembers', handleRemoveTeamMembers)
  
  uni.$on(events.GET_HISTORY_MSG, (msg: IMMessage) => {
    handleLoadMore(msg).then((res: IMMessage[]) => {
      if (res?.[0]) {
        // uni.pageScrollTo 微信小程序指定滚动位置不起作用 https://ask.dcloud.net.cn/question/173874?item_id=258278&rf=false
        setTimeout(() => {
          uni.pageScrollTo({
            selector: `#${MSG_ID_FLAG + res[0].idClient}`,
            scrollTop: 0,  
            duration: 0,
            fail: (error) => {
              console.log('error', error);
            },
          })
        }, 300);
      }
    }).finally(() => {
      // uni.stopPullDownRefresh();
    })
  })
})

onUnmounted(() => {
  uni.$UIKitNIM.off('dismissTeam', handleDismissTeam)
  uni.$UIKitNIM.off('removeTeamMembers', handleRemoveTeamMembers)
  uni.$UIKitNIM.off('msg', handleMsg)

  uni.$off(events.GET_HISTORY_MSG)
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
      const historyMsgs = await uni.$UIKitStore.msgStore.getHistoryMsgActive({
        sessionId,
        endTime,
        lastMsgId,
        limit: HISTORY_LIMIT,
      })
      loadingMore.value = false
      if (historyMsgs.length < HISTORY_LIMIT) {
        noMore.value = true
      }
      return historyMsgs
    }
  } catch (error) {
    loadingMore.value = false
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
  if (uni.$UIKitStore.connectStore.connectState === 'connected') {
    getHistroy(Date.now()).then((msgs) => {
      if (!isMounted) {
        uni.$emit(events.ON_CHAT_MOUNTED, msgs?.[0])
        isMounted = true
      }
    })
  }
})

autorun(() => {
  msgs.value = deepClone(storeUtils.getFilterMsgs(
    uni.$UIKitStore.msgStore.getMsg(sessionId),
    (item) => item.type !== 'notification'
  ))
      
  // 遍历所有消息，找出被回复消息，储存在map中
  if (msgs.value.length !== 0) {
    const _replyMsgsMap: any = {}
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
          // yxReplyMsg 存储着被回复消息的相关消息
          const { yxReplyMsg } = JSON.parse(msg.ext)
          if (yxReplyMsg) {
            // 从消息列表中找到被回复消息，replyMsg 为被回复的消息
            const replyMsg = msgs.value.find(
              (item) => item.idClient === yxReplyMsg.idClient
            )
            // 如果直接找到，存储在map中
            if (replyMsg) {
              _replyMsgsMap[msg.idClient] = replyMsg
            // 如果没找到，说明被回复的消息可能有三种情况：1.被删除 2.被撤回 3.不在当前消息列表中（一次性没拉到，在之前的消息中）
            } else {
              _replyMsgsMap[msg.idClient] = { idClient: 'noFind' }
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
      // 从服务器拉取被回复消息, 但是有频率控制
      uni.$UIKitStore.msgStore.getMsgByIdServerActive({ reqMsgs }).then((res) => {
        if (res?.length > 0) {
          res.forEach((item) => {
            if (item.idServer) {
              _replyMsgsMap[idClients[item.idServer]] = item
            }
          })
        }
        replyMsgsMap.value = { ..._replyMsgsMap }
      }).catch(() => {
        replyMsgsMap.value = { ..._replyMsgsMap }
      })
    } else {
      replyMsgsMap.value = { ..._replyMsgsMap }
    }
  }

  // 当聊天消息小于6条时，由于页面被键盘撑起，导致已经发出的消息不可见，所以需要隐藏键盘
  if (msgs.value.length < 6) {
    uni.hideKeyboard()
  }
})

</script>

<style scoped lang="scss">
@import '../../styles/common.scss';

.msg-wrapper {
  display: flex;
  flex-direction: column;
}


</style>
