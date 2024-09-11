<template>
  <ConversationList />
</template>

<script lang="ts" setup>
import ConversationList from './conversation-list/index.vue'
import { trackInit } from '../../utils/reporter'
import { onShow } from '@dcloudio/uni-app'

import { setContactTabUnread, setTabUnread } from '../../utils/msg'

trackInit('ConversationUIKit')

onShow(() => {
  // 重置选中会话
  uni.$UIKitStore?.uiStore.selectConversation('')
  setTabUnread()
  setContactTabUnread()
})
</script>

<style lang="scss">
@import '../styles/common.scss';

page {
  height: 100vh;
  overflow: hidden;
}
</style>
