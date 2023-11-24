<template>
  <ConversationList />
</template>

<script lang="ts" setup>
import ConversationList from './conversation-list/index.vue'
import { trackInit } from '../../utils/reporter'

trackInit('ConversationUIKit')


</script>

<style lang="scss" >
@import "../styles/common.scss";

page {
  height: 100vh;
  overflow: hidden;
}
</style>
