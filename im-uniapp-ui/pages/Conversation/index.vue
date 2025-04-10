<template>
  <ConversationList />
</template>

<script lang="ts" setup>
/** 会话列表页面 */

import ConversationList from './conversation-list/index.vue'
import { trackInit } from '../../utils/reporter'
import { onShow } from '@dcloudio/uni-app'

trackInit('ConversationUIKit')

onShow(() => {
  // 重置选中会话
  uni.$UIKitStore?.uiStore.selectConversation('')
  // 是否是云端会话
  const enableV2CloudConversation =
    uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation
  setTimeout(() => {
    // 获取未读消息数
    const unread = enableV2CloudConversation
      ? uni.$UIKitNIM?.V2NIMConversationService?.getTotalUnreadCount()
      : uni.$UIKitNIM?.V2NIMLocalConversationService?.getTotalUnreadCount()
    if (unread === 0) {
      uni.hideTabBarRedDot({
        //隐藏数字
        index: 0, //tabbar下标
      })
    } else {
      uni.showTabBarRedDot({
        index: 0, //tabbar下标
      })
    }
  }, 800)
})
</script>

<style lang="scss">
@import '../styles/common.scss';

page {
  height: 100vh;
  overflow: hidden;
}
</style>
