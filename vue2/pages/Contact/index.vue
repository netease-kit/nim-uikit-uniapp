<template>
  <ContactList />
</template>

<script lang="ts" setup>
import ContactList from './contact-list/index.vue'
import { onShow } from '@dcloudio/uni-app'
import { setContactTabUnread, setTabUnread } from '../../utils/msg';
import { trackInit } from '../../utils/reporter'

trackInit('ContactUIKit')
onShow(() => {
  setTabUnread()
  setContactTabUnread()
})
</script>

<style>
@import "../styles/common.scss";

page {
  height: 100vh;
  overflow: hidden;
}
</style>
