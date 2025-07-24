<template>
  <ContactList />
</template>

<script lang="ts" setup>
/** 通讯录界面 */

import ContactList from './contact-list/index.vue'
import { onShow } from '@dcloudio/uni-app'
import { setContactTabUnread, setTabUnread } from '../../utils/msg'

onShow(() => {
  setTabUnread()
  setContactTabUnread()
})
</script>

<style>
@import '../styles/common.scss';

page {
  height: 100vh;
  overflow: hidden;
}
</style>
