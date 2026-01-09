<template>
  <!-- 处理滚动穿透  此为官方推荐做法 https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html#%E4%BB%8B%E7%BB%8D -->
  <page-meta
    :page-style="'overflow:' + (moveThrough ? 'hidden' : 'visible')"
  ></page-meta>
  <div :class="isH5 ? 'msg-page-wrapper-h5' : 'msg-page-wrapper'">
    <NavBar :title="title" :subTitle="subTitle" :showLeft="true">
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
import { onShow, onHide } from '@dcloudio/uni-app'
import { events } from '../../utils/constants'
import { trackInit } from '../../utils/reporter'
import { autorun } from 'mobx'
import { ref, onMounted, onUnmounted } from 'vue'
import { getUniPlatform } from '../../utils'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { customSwitchTab } from '../../utils/customNavigate'
import NetworkAlert from '../../components/NetworkAlert.vue'
import NavBar from './message/nav-bar.vue'
import Icon from '../../components/Icon.vue'
import MessageList from './message/message-list.vue'
import MessageInput from './message/message-input.vue'
import { HISTORY_LIMIT } from '../../utils/constants'
import { t } from '../../utils/i18n'
import { V2NIMMessage } from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMMessageService'
import { V2NIMConst } from '../../utils/nim'
import { V2NIMConversationType } from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMConversationService'
import { V2NIMMessageRefer } from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMMessageService'

export interface YxReplyMsg {
  messageClientId: string
  scene: V2NIMConst.V2NIMConversationType
  from: string
  receiverId: string
  to: string
  idServer: string
  time: number
}

trackInit('ChatUIKit')

const title = ref('')

const subTitle = ref('')

/**会话ID */
const conversationId = uni.$UIKitStore.uiStore.selectedConversation
/**会话类型 */
const conversationType =
  uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(
    conversationId
  ) as unknown as V2NIMConversationType

/**对话方 */
const to =
  uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationTargetId(
    conversationId
  )

const isH5 = getUniPlatform() === 'web'

/**处理uni-popup 引起的滚动穿透 */
const moveThrough = ref(false)

/**回到会话列表 */
const backToConversation = () => {
  customSwitchTab({
    url: '/pages/Conversation/index',
  })
}

/**读取是否需要显示群组消息已读未读的全局配置，默认 false */
const teamManagerVisible = uni.$UIKitStore.localOptions.teamMsgReceiptVisible

/**读取是否需要显示 p2p 消息、p2p会话列表消息已读未读的全局配置，默认 false */
const p2pMsgReceiptVisible = uni.$UIKitStore.localOptions.p2pMsgReceiptVisible

/** 读取是否需要显示在线离线的全局配置，默认true*/
const loginStateVisible = uni.$UIKitStore.localOptions.loginStateVisible

let isMounted = false

const loadingMore = ref(false)

/**是否还有更多历史消息 */

const noMore = ref(false)

/**消息列表 */
const msgs = ref<V2NIMMessage[]>([])

/**回复消息map，用于回复消息的解析处理 */
const replyMsgsMap = ref<Record<string, V2NIMMessage>>()

/** 解散群组回调 */
const onTeamDismissed = (data: any) => {
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

/** 自己主动离开群组或被管理员踢出回调 */
const onTeamLeft = (data: any) => {
  uni
    .showToast({
      title: t('onRemoveTeamText'),
      icon: 'none',
      duration: 1000,
    })
    .then(() => {
      backToConversation()
    })
}

/** 收到新消息 */
const onReceiveMessages = (msgs: V2NIMMessage[]) => {
  const routes = getCurrentPages()
  const curRoute = routes[routes.length - 1].route

  // 不是当前用户的其他端发送的消息且是当前会话的未读消息，才发送已读回执
  if (
    msgs.length &&
    !msgs[0]?.isSelf &&
    msgs[0].conversationId == conversationId &&
    curRoute?.includes('Chat/index')
  ) {
    handleMsgReceipt(msgs)
  }
  uni.$emit(events.ON_SCROLL_BOTTOM, msgs)
}

/** 处理收到消息的已读回执 */
const handleMsgReceipt = (msg: V2NIMMessage[]) => {
  if (
    msg[0].conversationType ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P &&
    p2pMsgReceiptVisible
  ) {
    uni.$UIKitStore.msgStore.sendMsgReceiptActive(msg[0])
  } else if (
    msg[0].conversationType ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM &&
    teamManagerVisible
  ) {
    uni.$UIKitStore.msgStore.sendTeamMsgReceiptActive(msg)
  }
}

/** 处理历史消息的已读未读 */
const handleHistoryMsgReceipt = (msgs: V2NIMMessage[]) => {
  /** 如果是单聊 */
  if (
    conversationType ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P &&
    p2pMsgReceiptVisible
  ) {
    const myUserAccountId = uni.$UIKitNIM.V2NIMLoginService.getLoginUser()
    const othersMsgs = msgs
      .filter(
        (item: V2NIMMessage) =>
          // @ts-ignore
          !['beReCallMsg', 'reCallMsg'].includes(item.recallType || '')
      )
      .filter((item: V2NIMMessage) => item.senderId !== myUserAccountId)

    /** 发送单聊消息已读回执 */
    if (othersMsgs.length > 0) {
      uni.$UIKitStore.msgStore.sendMsgReceiptActive(othersMsgs?.[0])
    }

    /** 如果是群聊 */
  } else if (
    conversationType ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM &&
    teamManagerVisible
  ) {
    const myUserAccountId = uni.$UIKitNIM.V2NIMLoginService.getLoginUser()
    const myMsgs = msgs
      .filter(
        (item: V2NIMMessage) =>
          // @ts-ignore
          !['beReCallMsg', 'reCallMsg'].includes(item.recallType || '')
      )
      .filter((item: V2NIMMessage) => item.senderId === myUserAccountId)

    uni.$UIKitStore.msgStore.getTeamMsgReadsActive(myMsgs, conversationId)

    // 发送群消息已读回执
    // sdk 要求 一次最多传入 50 个消息对象
    const othersMsgs = msgs
      .filter(
        (item: V2NIMMessage) =>
          // @ts-ignore
          !['beReCallMsg', 'reCallMsg'].includes(item.recallType || '')
      )
      .filter((item: V2NIMMessage) => item.senderId !== myUserAccountId)

    if (othersMsgs.length > 0 && othersMsgs.length < 50) {
      uni.$UIKitStore.msgStore.sendTeamMsgReceiptActive(othersMsgs)
    }
  }
}

/** 拉取历史消息 */
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
      // 在点击会话时，去获取并更新 pin 和 msg 信息。
      await uni.$UIKitStore.msgStore.getPinnedMessageListActive(conversationId)

      loadingMore.value = false
      if (historyMsgs.length < HISTORY_LIMIT) {
        noMore.value = true
      }
      // 消息已读未读相关
      handleHistoryMsgReceipt(historyMsgs)
      return historyMsgs
    }
  } catch (error) {
    //@ts-ignore
    // 云端会话下，离线状态时，解散群聊，仍然可以拉到会话，但此时群已经解散
    if (error.code === 109404) {
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

    loadingMore.value = false
    throw error
  }
}

/** 加载更多消息 */
const loadMoreMsgs = (lastMsg: V2NIMMessage) => {
  if (lastMsg) {
    getHistory(lastMsg.createTime, lastMsg.messageServerId)
  } else {
    getHistory(Date.now())
  }
}

/** 设置页面标题 */
const setNavTitle = () => {
  // 如果是单聊
  if (
    conversationType ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
  ) {
    if (loginStateVisible) {
      subTitle.value =
        uni.$UIKitStore?.subscriptionStore?.stateMap?.get(to)?.statusType ===
        V2NIMConst.V2NIMUserStatusType.V2NIM_USER_STATUS_TYPE_LOGIN
          ? `(${t('userOnlineText')})`
          : `(${t('userOfflineText')})`
    }

    title.value = uni.$UIKitStore.uiStore.getAppellation({ account: to })

    // 如果是群聊
  } else if (
    conversationType ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
  ) {
    const team = uni.$UIKitStore.teamStore.teams.get(to)
    subTitle.value = `(${team?.memberCount || 0})`

    title.value = team?.name || ''
  }
}

/** 监听当前聊天页面的会话类型 */
const conversationTypeWatch = autorun(() => {
  setNavTitle()
})

/** 监听连接状态 */
const connectedWatch = autorun(() => {
  if (
    uni.$UIKitStore.connectStore.connectStatus ===
    V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED
  ) {
    if (
      uni.$UIKitStore.connectStore.loginStatus ==
      V2NIMConst.V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED
    ) {
      getHistory(Date.now()).then(() => {
        if (!isMounted) {
          uni.$emit(events.ON_SCROLL_BOTTOM)
          isMounted = true
        }
      })
    }
  }
})

/** 处理回复消息 */
const handleReplyMsg = (messages: V2NIMMessage[]) => {
  // 遍历所有消息，找出被回复消息，储存在map中
  if (messages.length !== 0) {
    const replyMsgsMapForExt: any = {}
    const replyMsgsMapForThreadReply: any = {}
    const extReqMsgs: YxReplyMsg[] = []
    const threadReplyReqMsgs: V2NIMMessageRefer[] = []
    const messageClientIds: Record<string, string> = {}
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
              replyMsgsMapForExt[msg.messageClientId] = replyMsg
              // 如果没找到，说明被回复的消息可能有三种情况：1.被删除 2.被撤回 3.不在当前消息列表中（一次性没拉到，在之前的消息中）
            } else {
              replyMsgsMapForExt[msg.messageClientId] = {
                messageClientId: 'noFind',
              }
              const {
                scene,
                from,
                to,
                idServer,
                messageClientId,
                time,
                receiverId,
              } = yxReplyMsg

              if (
                scene &&
                from &&
                to &&
                idServer &&
                messageClientId &&
                time &&
                receiverId
              ) {
                extReqMsgs.push({
                  scene,
                  from,
                  to,
                  idServer,
                  messageClientId,
                  time,
                  receiverId,
                })
                messageClientIds[idServer] = msg.messageClientId
              }
            }
          }
        } catch {}
      }

      if (msg.threadReply) {
        //找到被回复的消息
        const beReplyMsg = msgs.value.find(
          (item) => item.messageClientId === msg.threadReply?.messageClientId
        )

        if (beReplyMsg) {
          replyMsgsMapForThreadReply[msg.messageClientId] = beReplyMsg
        } else {
          replyMsgsMapForThreadReply[msg.messageClientId] = {
            messageClientId: 'noFind',
          }
          messageClientIds[msg.threadReply.messageServerId] =
            msg.messageClientId
          threadReplyReqMsgs.push(msg.threadReply)
        }
      }
    })

    if (extReqMsgs.length > 0) {
      // 从服务器拉取被回复消息, 但是有频率控制
      uni.$UIKitNIM.V2NIMMessageService.getMessageListByRefers(
        //@ts-ignore
        extReqMsgs.map((item) => ({
          senderId: item.from,
          receiverId: item.receiverId,
          messageClientId: item.messageClientId,
          messageServerId: item.idServer,
          createTime: item.time,
          conversationType: item.scene,
          conversationId: item.to,
        }))
      )
        .then((res) => {
          if (res?.length > 0) {
            res.forEach((item) => {
              if (item.messageServerId) {
                replyMsgsMapForExt[messageClientIds[item.messageServerId]] =
                  item
              }
            })
          }
          replyMsgsMap.value = { ...replyMsgsMapForExt }
        })
        .catch(() => {
          replyMsgsMap.value = { ...replyMsgsMapForExt }
        })
    }

    replyMsgsMap.value = {
      ...replyMsgsMap.value,
      ...replyMsgsMapForThreadReply,
    }

    if (threadReplyReqMsgs.length > 0) {
      uni.$UIKitNIM.V2NIMMessageService.getMessageListByRefers(
        //@ts-ignore
        threadReplyReqMsgs
      )
        .then((res) => {
          if (res?.length > 0) {
            res.forEach((item) => {
              if (item.messageServerId) {
                replyMsgsMapForThreadReply[
                  messageClientIds[item.messageServerId]
                ] = item
              }
            })
          }
          replyMsgsMap.value = {
            ...replyMsgsMap.value,
            ...replyMsgsMapForThreadReply,
          }
        })
        .catch((error) => {
          replyMsgsMap.value = {
            ...replyMsgsMap.value,
            ...replyMsgsMapForThreadReply,
          }
        })
    }
  }
}

/** 动态更新消息 */
const msgsWatch = autorun(() => {
  // 这里需要 Clone，否则 pinState 更新了，对应的消息展示不会重新渲染
  const messages = [...uni.$UIKitStore.msgStore.getMsg(conversationId)]
  if (messages.length !== 0) {
    msgs.value = messages
  }

  // 处理回复消息
  handleReplyMsg(messages)

  // 当聊天消息小于6条时，由于页面被键盘撑起，导致已经发出的消息不可见，所以需要隐藏键盘
  if (messages.length < 6) {
    uni.hideKeyboard()
  }
})

/** 监听会话方在线离线状态 */
const statusWatch = autorun(() => {
  const stateMap = uni.$UIKitStore?.subscriptionStore.stateMap
  if (
    uni.$UIKitStore.localOptions.loginStateVisible &&
    conversationType ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
  ) {
    subTitle.value =
      stateMap.get(to)?.statusType ===
      V2NIMConst.V2NIMUserStatusType.V2NIM_USER_STATUS_TYPE_LOGIN
        ? `(${t('userOnlineText')})`
        : `(${t('userOfflineText')})`
  }
})

/** 滚动到底部*/
const scrollToBottom = () => {
  const timer = setTimeout(() => {
    uni.$emit(events.ON_SCROLL_BOTTOM)
    clearTimeout(timer)
  }, 300)
}

/** 订阅在线离线状态 */
const subscribeUserStatus = () => {
  if (
    loginStateVisible &&
    conversationType ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
  ) {
    uni.$UIKitStore.subscriptionStore.subscribeUserStatusActive([to])
  }
}

onShow(function () {
  setNavTitle()
  // 从其他页面返回到聊天页时，可能使用的是 uni.navigateBack，此时不会触发onload等事件，但此时需要将收到的新消息发送已读未读
  if (msgs.value.length) {
    const _msgs = [...msgs.value].reverse()
    handleHistoryMsgReceipt(_msgs)
  }
})

onLoad(() => {
  uni.$on(events.HANDLE_MOVE_THROUGH, (flag) => {
    moveThrough.value = flag
  })
})

onMounted(() => {
  setNavTitle()

  scrollToBottom()

  subscribeUserStatus()

  /** 收到消息 */
  uni.$UIKitNIM.V2NIMMessageService.on(
    'onReceiveMessages',
    //@ts-ignore
    onReceiveMessages
  )
  /** 解散群组回调 */
  uni.$UIKitNIM.V2NIMTeamService.on('onTeamDismissed', onTeamDismissed)
  /** 自己主动离开群组或被管理员踢出回调 */
  uni.$UIKitNIM.V2NIMTeamService.on('onTeamLeft', onTeamLeft)
  /** 加载更多消息 */
  uni.$on(events.GET_HISTORY_MSG, loadMoreMsgs)
})

//卸载相关事件监听
onUnmounted(() => {
  uni.$UIKitNIM.V2NIMTeamService.off('onTeamDismissed', onTeamDismissed)
  uni.$UIKitNIM.V2NIMTeamService.off('onTeamLeft', onTeamLeft)
  uni.$UIKitNIM.V2NIMMessageService.off(
    'onReceiveMessages',
    //@ts-ignore
    onReceiveMessages
  )

  uni.$off(events.GET_HISTORY_MSG, loadMoreMsgs)
  /** 移除store的数据监听 */
  connectedWatch()
  msgsWatch()
  statusWatch()
  conversationTypeWatch()
})

onHide(() => {
  uni.hideKeyboard()
})

onUnload(() => {
  uni.$off(events.CONFIRM_FORWARD_MSG)
  uni.$off(events.CANCEL_FORWARD_MSG)
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
