<template>
  <ConversationList />
</template>

<script lang="ts" setup>
import ConversationList from './conversation-list/index.vue'
import { trackInit } from '../../utils/reporter'
import { onShow } from '@dcloudio/uni-app';

import { setContactTabUnread, setTabUnread } from '../../utils/msg';
import { H5_HAS_LOGIN_KEY } from '../../utils/constants';

trackInit('ConversationUIKit')

onShow(() => {
  // 重置选中会话 
  // @ts-ignore
  uni.$UIKitStore?.uiStore.selectSession('')
  setTabUnread()
  setContactTabUnread()
  // #ifdef H5 
  uni.getStorage({
    key: H5_HAS_LOGIN_KEY,
    success: function (res) {
      if (!res.data) {
        setTimeout(() => {
          window.location.reload();
        }, 500)
        uni.setStorageSync(H5_HAS_LOGIN_KEY,true)
      }
    },
    fail: function (error) {
      uni.setStorageSync(H5_HAS_LOGIN_KEY,true)
    }
  })
  // #endif
})

</script>

<style lang="scss" >
@import "../styles/common.scss";

page {
  height: 100vh;
  overflow: hidden;
}
</style>
