<template>
  <!-- <Connection> -->
  <Message />
  <!-- </Connection> -->
</template>

<script lang="ts" setup>
import { onPageScroll, onPullDownRefresh, onShow } from '@dcloudio/uni-app';
import Message from './message/index.vue'
import { events } from '../../utils/constants'
import { debounce } from '@xkit-yx/utils'
import { trackInit } from '../../utils/reporter'
import { autorun } from 'mobx';
import { ref } from 'vue';
import { parseSessionId } from '../../utils/msg'
import type { TMsgScene } from '@xkit-yx/im-store';

trackInit('ChatUIKit')

const store = uni.$UIKitStore
const title = ref('')
const sessionId = store.uiStore.selectedSession

const { scene, to }: { scene: TMsgScene, to: string } = parseSessionId(sessionId);
autorun(() => {
  if (scene === 'p2p') {
    title.value = store.uiStore.getAppellation({ account: to })
  } else if (scene === 'team') {
    const team = store.teamStore.teams.get(to)
    const subTitle = `(${team?.memberNum || 0})`
    title.value = (team?.name || '') + subTitle
  }
})

onShow(() => {
  uni.$emit(events.ON_CHAT_MOUNTED)
})

uni.setNavigationBarTitle({
  title: title.value,
})

// #ifndef H5 
onPullDownRefresh(() => {
  uni.$emit(events.ON_LOAD_MORE)
})
// #endif


// #ifdef H5 
// h5端下拉刷新会刷新页面，所以此处触顶加载更多消息
onPageScroll(debounce(function (data) {
  if (data.scrollTop <= 10) {
    // uni.$emit(events.ON_REACH_TOP)
    uni.$emit(events.ON_LOAD_MORE)
  }
}, 1000))
// #endif

// onReachBottom(debounce(function () {
//   uni.$emit(events.ON_REACH_BOTTOM)
// }, 100))
</script>

<style scoped lang="scss"></style>
