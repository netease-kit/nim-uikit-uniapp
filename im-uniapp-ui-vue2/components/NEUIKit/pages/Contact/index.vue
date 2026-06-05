<template>
  <ContactList />
</template>

<script>
/** 通讯录界面 */

import ContactList from './contact-list/index.vue'
import { setContactTabUnread, setTabUnread } from '../../utils/msg'

export default {
  components: {
    ContactList,
  },
  onShow() {
    setTabUnread()
    setContactTabUnread()
  },
}
</script>

<style>
@import '../styles/common.scss';

page {
  height: 100vh;
  overflow: hidden;
}
</style>
