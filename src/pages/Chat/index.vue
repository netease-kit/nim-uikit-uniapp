<template>
  <!-- <Connection> -->
  <Message />
  <!-- </Connection> -->
</template>

<script lang="ts" setup>
import { onPageScroll, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
import Message from './message/index.vue'
import { events } from '../../utils/constants'
import { debounce } from '@xkit-yx/utils'
import { trackInit } from '../../utils/reporter'

// uni.setNavigationBarTitle({
//   title: '聊天',
// })

trackInit('ChatUIKit')

onPullDownRefresh(() => {
  uni.$emit(events.ON_LOAD_MORE)
})

// onReachBottom(debounce(function () {
//   uni.$emit(events.ON_REACH_BOTTOM)
// }, 100))

// onPageScroll(debounce(function (data) {
//   if (data.scrollTop <= 0) {
//     uni.$emit(events.ON_REACH_TOP)
//   }
// }, 100))
</script>

<style scoped lang="scss"></style>
