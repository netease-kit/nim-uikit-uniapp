<template>
  <div
    class="p2p-msg-receipt-wrapper"
    v-if="
      conversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P &&
      p2pMsgReceiptVisible
    "
  >
    <div v-if="p2pMsgRotateDeg == 360" class="icon-read-wrapper">
      <Icon type="icon-read" :size="16"></Icon>
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
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref, onMounted, computed } from 'vue'
import Icon from '../../../components/Icon.vue'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK'
import { V2NIMConversationForUI } from '@xkit-yx/im-store-v2/dist/types/types'

const props = withDefaults(
  defineProps<{
    conversation: V2NIMConversationForUI
  }>(),
  {}
)

// 是否需要显示 p2p 消息、p2p会话列表消息已读未读，默认 false
const p2pMsgReceiptVisible = uni.$UIKitStore.localOptions.p2pMsgReceiptVisible

const conversationType =
  uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(
    props.conversation.conversationId
  )
const p2pMsgRotateDeg = computed(() => {
  return (props?.conversation?.msgReceiptTime || 0) >=
    (props?.conversation?.lastMessage?.messageRefer?.createTime || 0)
    ? 360
    : 0
})
</script>

<style scoped lang="scss">
.p2p-msg-receipt-wrapper {
  width: 22px;
  height: 22px;
  overflow: hidden;
  line-height: 18px;
  vertical-align: bottom;
  display: flex;
  align-items: center;
  justify-content: center;
}
.icon-read-wrapper {
  margin: 0px 3px 0px 0;
  width: 18px;
  height: 18px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.sector {
  display: inline-block;
  position: relative;
  overflow: hidden;
  border: 2px solid #4c84ff;
  width: 12px;
  height: 12px;
  background-color: #ffffff;
  border-radius: 50%;
  margin: 0px 3px 0 0;

  .cover-1,
  .cover-2 {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    background-color: #ffffff;
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
