<template>
  <ConversationList />
</template>

<script>
/** 会话列表页面 */

import ConversationList from './conversation-list/index.vue'
import { setContactTabUnread } from '../../utils/msg'

export default {
  components: {
    ConversationList,
  },
  data() {
    return {
      timeout: null,
    }
  },
  onShow() {
    uni.$UIKitStore?.uiStore.selectConversation('')
    setContactTabUnread()
    const enableV2CloudConversation =
      uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation
    this.timeout = setTimeout(() => {
      const unread = enableV2CloudConversation
        ? uni.$UIKitNIM?.V2NIMConversationService?.getTotalUnreadCount()
        : uni.$UIKitNIM?.V2NIMLocalConversationService?.getTotalUnreadCount()
      if (unread === 0) {
        uni.hideTabBarRedDot({
          index: 0,
        })
      } else {
        uni.showTabBarRedDot({
          index: 0,
        })
      }
    }, 800)
  },
  onHide() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
  },
}
</script>

<style lang="scss">
@import '../styles/common.scss';

page {
  height: 100vh;
  overflow: hidden;
}
</style>
