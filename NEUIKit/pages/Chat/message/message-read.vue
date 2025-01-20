<template>
  <div
    v-if="
      props.msg.sendingState ==
      V2NIMConst.V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED
    "
    class="msg-read-wrapper"
  >
    <div
      v-if="
        conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P &&
        p2pMsgReceiptVisible
      "
    >
      <div v-if="p2pMsgRotateDeg == 360" class="icon-read-wrapper">
        <Icon type="icon-read" :size="18"></Icon>
      </div>
      <div v-else class="sector">
        <span
          class="cover-1"
          :style="`transform: rotate(${p2pMsgRotateDeg}deg)`"
        ></span>
        <span
          :class="p2pMsgRotateDeg >= 180 ? 'cover-2 cover-3' : 'cover-2'"
        ></span>
      </div>
    </div>
    <div
      v-if="
        conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM &&
        teamManagerVisible
      "
    >
      <div class="icon-read-wrapper" v-if="teamMsgRotateDeg == 360">
        <Icon type="icon-read" :size="18"></Icon>
      </div>
      <div v-else class="sector" @click="jumpToTeamMsgReadInfo">
        <span
          class="cover-1"
          :style="`transform: rotate(${teamMsgRotateDeg}deg)`"
        ></span>
        <span
          :class="teamMsgRotateDeg >= 180 ? 'cover-2 cover-3' : 'cover-2'"
        ></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineProps,
  withDefaults,
  ref,
  onMounted,
  onUnmounted,
} from 'vue'
import { V2NIMMessageForUI } from '@xkit-yx/im-store-v2/dist/types/types'
import Icon from '../../../components/Icon.vue'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/esm/nim'

import { autorun } from 'mobx'
import { customNavigateTo } from '../../../utils/customNavigate'
import { t } from '../../../utils/i18n'
const props = withDefaults(
  defineProps<{
    msg: V2NIMMessageForUI
  }>(),
  {}
)

// 是否需要显示群组消息已读未读，默认 false
const teamManagerVisible = uni.$UIKitStore.localOptions.teamMsgReceiptVisible
// 是否需要显示 p2p 消息、p2p会话列表消息已读未读，默认 false
const p2pMsgReceiptVisible = uni.$UIKitStore.localOptions.p2pMsgReceiptVisible

const conversationType =
  uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(
    props.msg.conversationId
  ) as unknown as V2NIMConst.V2NIMConversationType
const p2pMsgRotateDeg = ref(0)

const setP2pMsgRotateDeg = () => {
  // 如果是单聊
  if (
    conversationType ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
  ) {
    const conversation = uni.$UIKitStore.conversationStore.conversations.get(
      props.msg.conversationId
    )

    p2pMsgRotateDeg.value =
      props?.msg?.createTime <= (conversation?.msgReceiptTime || 0) ? 360 : 0
  }
}

const p2pMsgReadWatch = autorun(() => {
  setP2pMsgRotateDeg()
})

const jumpToTeamMsgReadInfo = () => {
  if (
    uni.$UIKitStore.connectStore.connectStatus !==
    V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED
  ) {
    uni.showToast({
      title: t('offlineText'),
      icon: 'none',
    })
    return
  }
  // 跳转到消息已读未读详情页
  if (props?.msg?.messageClientId && props?.msg?.conversationId) {
    customNavigateTo({
      url: `/pages/Chat/message-read-info?messageClientId=${props.msg.messageClientId}&conversationId=${props.msg.conversationId}`,
    })
  }
}

onMounted(() => {
  setP2pMsgRotateDeg()
})

const teamMsgRotateDeg = computed(() => {
  if (
    conversationType ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
  ) {
    const percentage =
      (props?.msg?.yxRead || 0) /
        ((props?.msg?.yxUnread || 0) + (props?.msg?.yxRead || 0)) || 0
    return percentage * 360
  }
  return 0
})

onUnmounted(() => {
  p2pMsgReadWatch()
})
</script>

<style scoped lang="scss">
.msg-read-wrapper {
  align-self: flex-end;
}
.icon-read-wrapper {
  margin: 0px 10px 5px 0;
}
.sector {
  display: inline-block;
  position: relative;
  overflow: hidden;
  border: 2px solid #4c84ff;
  width: 14px;
  height: 14px;
  background-color: #eeeeee;
  border-radius: 50%;
  margin: 0px 10px 0 0;

  .cover-1,
  .cover-2 {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    background-color: #eeeeee;
  }

  .cover-1 {
    background-color: #4c84ff;
    transform-origin: right;
  }

  .cover-3 {
    right: 0;
    background-color: #4c84ff;
  }
}
</style>
