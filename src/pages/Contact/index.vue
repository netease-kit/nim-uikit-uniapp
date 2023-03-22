<template>
  <ContactList />
</template>

<script lang="ts" setup>
import ContactList from './contact-list/index.vue'
import { onShow } from '@dcloudio/uni-app'
import { setTabUnread } from '@/utils/msg';
import { trackInit } from '../../utils/reporter'

trackInit('ContactUIKit')
onShow(() => {
  setTabUnread()
})
</script>

<style>
@import "../styles/common.scss";

page {
  height: 100%;
  overflow: hidden;
}
</style>
