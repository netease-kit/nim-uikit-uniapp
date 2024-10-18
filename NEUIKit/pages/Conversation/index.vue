<template>
  <ConversationList />
</template>

<script lang="ts" setup>
import ConversationList from './conversation-list/index.vue'
import { trackInit } from '../../utils/reporter'
import { onShow } from '@dcloudio/uni-app'

import { setContactTabUnread, setTabUnread } from '../../utils/msg'
import { autorun } from 'mobx'

trackInit('ConversationUIKit')

onShow(() => {
  // 重置选中会话
  uni.$UIKitStore?.uiStore.selectConversation('')
  // setTabUnread()
  // setContactTabUnread()
  setTimeout(() => {
    const unread = uni.$UIKitNIM.V2NIMConversationService.getTotalUnreadCount()
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
  }, 1000)
})
</script>

<style lang="scss">
@import '../styles/common.scss';

page {
  height: 100vh;
  overflow: hidden;
}
</style>
