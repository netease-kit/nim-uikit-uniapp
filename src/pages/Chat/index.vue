<template>
  <!-- 处理滚动穿透  此为官方推荐做法 https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html#%E4%BB%8B%E7%BB%8D -->
  <page-meta
    :page-style="'overflow:' + (moveThrough ? 'hidden' : 'visible')"
  ></page-meta>
  <div :class="isH5 ? 'msg-page-wrapper-h5' : 'msg-page-wrapper'">
    <NavBar :title="title" :showLeft="true">
      <template v-slot:left>
        <div @click="backToConversation">
          <Icon type="icon-zuojiantou" :size="22"></Icon>
        </div>
      </template>
    </NavBar>
    <div class="msg-alert">
      <NetworkAlert />
    </div>
    <div :class="isH5 ? 'msg-wrapper-h5' : 'msg-wrapper'">
      <MessageList
        :conversationType="conversationType"
        :to="to"
        :msgs="msgs"
        :loading-more="loadingMore"
        :no-more="noMore"
        :reply-msgs-map="replyMsgsMap"
      />
    </div>
    <div style="height: 'auto'">
      <MessageInput
        :reply-msgs-map="replyMsgsMap"
        :conversation-type="conversationType"
        :to="to"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { events } from '../../utils/constants'
import { trackInit } from '../../utils/reporter'
import { autorun } from 'mobx'
import { ref, onMounted, onUnmounted } from '../../utils/transformVue'
import { deepClone, getUniPlatform } from '../../utils'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { customSwitchTab } from '../../utils/customNavigate'
import NetworkAlert from '../../components/NetworkAlert.vue'
import NavBar from './message/nav-bar.vue'
import Icon from '../../components/Icon.vue'
import MessageList from './message/message-list.vue'
import MessageInput from './message/message-input.vue'
import { HISTORY_LIMIT, MSG_ID_FLAG } from '../../utils/constants'
import { t } from '../../utils/i18n'
import { V2NIMMessage } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMMessageService'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK'

export interface YxReplyMsg {
  idClient: string
  scene: V2NIMConst.V2NIMConversationType
  from: string
  receiverId: string
  to: string
  idServer: string
  time: number
}

trackInit('ChatUIKit')

const title = ref('')

const conversationId = uni.$UIKitStore.uiStore.selectedConversation
const conversationType =
  uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(conversationId)
const to =
  uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationTargetId(
    conversationId
  )

const isH5 = getUniPlatform() === 'web'

// 处理uni-popup 引起的滚动穿透
const moveThrough = ref(false)

const backToConversation = () => {
  customSwitchTab({
    url: '/pages/Conversation/index',
  })
}

let isMounted = false

const loadingMore = ref(false)
const noMore = ref(false)

const myAccount = uni.$UIKitStore.userStore.myUserInfo.accountId

const msgs = ref<V2NIMMessage[]>([])

// 回复
const replyMsgsMap = ref<Record<string, V2NIMMessage>>()

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
  uni
    .showToast({
      title: t('onRemoveTeamText'),
      icon: 'success',
      duration: 1000,
    })
    .then(() => {
      backToConversation()
    })
}

const handleMsg = (msgs: V2NIMMessage[]) => {
  uni.$emit(events.ON_SCROLL_BOTTOM, msgs)
}

const handleSyncOfflineMsgs = () => {
  const timer = setTimeout(() => {
    uni.$emit(events.ON_SCROLL_BOTTOM)
    clearTimeout(timer)
  }, 300)
}

const getHistory = async (endTime: number, lastMsgId?: string) => {
  try {
    if (noMore.value) {
      return []
    }
    if (loadingMore.value) {
      return []
    }
    loadingMore.value = true
    if (conversationId) {
      const historyMsgs = await uni.$UIKitStore.msgStore.getHistoryMsgActive({
        conversationId,
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

const handleLoadMore = async (lastMsg: V2NIMMessage) => {
  const res = await getHistory(lastMsg.createTime, lastMsg.messageServerId)
  return res
}

onShow(function () {
  autorun(() => {
    if (
      conversationType ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
    ) {
      title.value = deepClone(
        uni.$UIKitStore.uiStore.getAppellation({ account: to })
      )
    } else if (
      conversationType ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
    ) {
      const team = uni.$UIKitStore.teamStore.teams.get(to)
      const subTitle = `(${team?.memberCount || 0})`
      title.value = (team?.name || '') + subTitle
    }
  })
})

onLoad(() => {
  uni.$on(events.HANDLE_MOVE_THROUGH, (flag) => {
    moveThrough.value = flag
  })

  uni.$currentAudioContext = ''
})

onMounted(() => {
  const timer = setTimeout(() => {
    uni.$emit(events.ON_SCROLL_BOTTOM)
    clearTimeout(timer)
  }, 300)

  if (
    conversationType ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
  ) {
    title.value = deepClone(
      uni.$UIKitStore.uiStore.getAppellation({ account: to })
    )
  } else if (
    conversationType ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
  ) {
    const team = uni.$UIKitStore.teamStore.teams.get(to)
    const subTitle = `(${team?.memberCount || 0})`
    title.value = (team?.name || '') + subTitle
  }

  uni.$UIKitNIM.V2NIMMessageService.on('onReceiveMessages', handleMsg)

  uni.$UIKitNIM.V2NIMTeamService.on('onTeamDismissed', handleDismissTeam)

  uni.$UIKitNIM.V2NIMTeamService.on('onTeamLeft', handleRemoveTeamMembers)

  // uni.$UIKitNIM.on('syncOfflineMsgs', handleSyncOfflineMsgs)

  uni.$on(events.GET_HISTORY_MSG, (msg: V2NIMMessage) => {
    handleLoadMore(msg)
      .then((res: V2NIMMessage[]) => {
        if (res?.[0]) {
          // uni.pageScrollTo 微信小程序指定滚动位置不起作用 https://ask.dcloud.net.cn/question/173874?item_id=258278&rf=false
          setTimeout(() => {
            uni.pageScrollTo({
              selector: `#${MSG_ID_FLAG + res[0].messageClientId}`,
              scrollTop: 0,
              duration: 0,
              fail: (error) => {
                console.log('error', error)
              },
            })
          }, 300)
        }
      })
      .finally(() => {
        // uni.stopPullDownRefresh();
      })
  })
})

onUnload(() => {
  uni.$off(events.CONFIRM_FORWARD_MSG)
  uni.$off(events.CANCEL_FORWARD_MSG)
})

const uninstallHistoryWatch = autorun(() => {
  if (
    uni.$UIKitStore.connectStore.connectStatus ===
    V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED
  ) {
    getHistory(Date.now()).then(() => {
      if (!isMounted) {
        uni.$emit(events.ON_SCROLL_BOTTOM)
        isMounted = true
      }
    })
  }
})

// 动态更新消息
const uninstallMsgsWatch = autorun(() => {
  msgs.value = deepClone(uni.$UIKitStore.msgStore.getMsg(conversationId))

  // 遍历所有消息，找出被回复消息，储存在map中
  if (msgs.value.length !== 0) {
    const _replyMsgsMap: any = {}
    const reqMsgs: YxReplyMsg[] = []
    const idClients: Record<string, string> = {}
    msgs.value.forEach((msg) => {
      if (msg.serverExtension) {
        try {
          // yxReplyMsg 存储着被回复消息的相关消息
          const { yxReplyMsg } = JSON.parse(msg.serverExtension)
          if (yxReplyMsg) {
            // 从消息列表中找到被回复消息，replyMsg 为被回复的消息
            const replyMsg = msgs.value.find(
              (item) => item.messageClientId === yxReplyMsg.idClient
            )
            // 如果直接找到，存储在map中
            if (replyMsg) {
              _replyMsgsMap[msg.messageClientId] = replyMsg
              // 如果没找到，说明被回复的消息可能有三种情况：1.被删除 2.被撤回 3.不在当前消息列表中（一次性没拉到，在之前的消息中）
            } else {
              _replyMsgsMap[msg.messageClientId] = { idClient: 'noFind' }
              const { scene, from, to, idServer, idClient, time, receiverId } =
                yxReplyMsg

              if (
                scene &&
                from &&
                to &&
                idServer &&
                idClient &&
                time &&
                receiverId
              ) {
                reqMsgs.push({
                  scene,
                  from,
                  to,
                  idServer,
                  idClient,
                  time,
                  receiverId,
                })
                idClients[idServer] = msg.messageClientId
              }
            }
          }
        } catch {}
      }
    })

    if (reqMsgs.length > 0) {
      // 从服务器拉取被回复消息, 但是有频率控制

      uni.$UIKitNIM.V2NIMMessageService.getMessageListByRefers(
        reqMsgs.map((item) => ({
          senderId: item.from,
          receiverId: item.receiverId,
          messageClientId: item.idClient,
          messageServerId: item.idServer,
          createTime: item.time,
          conversationType: item.scene,
          conversationId: item.to,
        }))
      )
        .then((res) => {
          if (res?.length > 0) {
            res.forEach((item: V2NIMMessage) => {
              if (item.messageServerId) {
                _replyMsgsMap[idClients[item.messageServerId]] = item
              }
            })
          }
          replyMsgsMap.value = { ..._replyMsgsMap }
        })
        .catch(() => {
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

onUnmounted(() => {
  uni.$UIKitNIM.V2NIMTeamService.off('onTeamDismissed', handleDismissTeam)

  uni.$UIKitNIM.V2NIMTeamService.off(
    'onTeamMemberLeft',
    handleRemoveTeamMembers
  )

  uni.$UIKitNIM.V2NIMMessageService.off('onReceiveMessages', handleMsg)

  // uni.$UIKitNIM.off('syncOfflineMsgs', handleSyncOfflineMsgs)

  uni.$off(events.GET_HISTORY_MSG)

  uninstallHistoryWatch()
  uninstallMsgsWatch()
})
</script>

<style scoped lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.msg-page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.msg-page-wrapper-h5 {
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
}

.msg-alert {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  z-index: 1;
}

.msg-wrapper {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
}

.msg-wrapper-h5 {
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
}

.msg-wrapper > message-list {
  height: 100%;
}
</style>
