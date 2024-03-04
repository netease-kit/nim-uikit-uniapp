<template>
  <!-- 处理滚动穿透  此为官方推荐做法 https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html#%E4%BB%8B%E7%BB%8D -->
  <page-meta :page-style="'overflow:' + (moveThrough ? 'hidden' : 'visible')"></page-meta>
  <div>
    <NavBar :title="title" :showLeft="true">
      <template v-slot:left>
        <div @click="backToConversation">
          <Icon type="icon-zuojiantou" :size="22"></Icon>
        </div>
      </template>
    </NavBar>
    <div class="msg-alert">
      <NetworkAlert />
    </div>
    <Message />
  </div>
</template>

<script lang="ts" setup>
import { onPageScroll, onPullDownRefresh, onShow } from '@dcloudio/uni-app';
import Message from './message/index.vue'
import { events } from '../../utils/constants'
import { debounce } from '@xkit-yx/utils'
import { trackInit } from '../../utils/reporter'
import { autorun } from 'mobx';
import { ref, onMounted } from '../../utils/transformVue';
import { parseSessionId } from '../../utils/msg'
import type { TMsgScene, Team } from '@xkit-yx/im-store';
import { deepClone } from '../../utils';
import { onLoad, onUnload } from '@dcloudio/uni-app';
import type { IMMessage } from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import { t } from '../../utils/i18n'
import { customSwitchTab } from '../../utils/customNavigate'
import NetworkAlert from '../../components/NetworkAlert.vue'
import NavBar from '../../components/NavBar.vue'
import Icon from '../../components/Icon.vue'
trackInit('ChatUIKit')

const title = ref('')
const sessionId = uni.$UIKitStore.uiStore.selectedSession
const { scene, to }: { scene: TMsgScene, to: string } = parseSessionId(sessionId);


// 处理uni-popup 引起的滚动穿透
const moveThrough = ref(false)

const backToConversation = () => {
  customSwitchTab({
    url: '/pages/Conversation/index',
  })
}

onShow(function () {
  autorun(() => {
    if (scene === 'p2p') {
      title.value = deepClone(uni.$UIKitStore.uiStore.getAppellation({ account: to }))
    } else if (scene === 'team') {
      const team = uni.$UIKitStore.teamStore.teams.get(to)
      const subTitle = `(${team?.memberNum || 0})`
      title.value = (team?.name || '') + subTitle
    }
    // uni.setNavigationBarTitle({
    //   title: title.value,
    // })
  })
})

onLoad(() => {
  uni.$on(events.HANDLE_MOVE_THROUGH, (flag) => {
    moveThrough.value = flag
  })
})

onMounted(() => {
  setTimeout(() => {
    uni.$emit(events.ON_CHAT_MOUNTED)
  }, 300);
  if (scene === 'p2p') {
    title.value = deepClone(uni.$UIKitStore.uiStore.getAppellation({ account: to }))
  } else if (scene === 'team') {
    const team = uni.$UIKitStore.teamStore.teams.get(to)
    const subTitle = `(${team?.memberNum || 0})`
    title.value = (team?.name || '') + subTitle
  }
  // uni.setNavigationBarTitle({
  //   title: title.value,
  // })
})


onUnload(() => {
  uni.$off(events.CONFIRM_FORWARD_MSG)
  uni.$off(events.CANCEL_FORWARD_MSG)
})


// 触底刷新还是下拉刷新，您可根据scroll-view自行实现

// #ifndef H5
// onPullDownRefresh(debounce(() => {
//   uni.$emit(events.ON_LOAD_MORE)
// }, 1000))
// #endif


// #ifdef H5
// h5端下拉刷新会刷新页面，所以此处触顶加载更多消息
// onPageScroll(debounce(function (data: any) {
//   if (data.scrollTop <= 10) {
//     // uni.$emit(events.ON_REACH_TOP)
//     uni.$emit(events.ON_LOAD_MORE)
//   }
// }, 1000))
// #endif

</script>

<style scoped lang="scss">
.msg-alert {
  display: flex;
  flex-direction: column;
  width: 100%;
  position: fixed;
  z-index: 1;
}
</style>
