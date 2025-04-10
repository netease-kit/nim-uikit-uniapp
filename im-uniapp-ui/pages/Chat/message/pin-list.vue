<template>
  <div :class="`wrapper ${pinInfos.length === 0 ? 'bg-white' : ''}`">
    <NavBar :title="t('pinText')">
      <template v-slot:left>
        <div class="nav-bar-text" @tap="back">{{ t('pinText') }}</div>
      </template>
    </NavBar>
    <div class="pinCard-item-wrapper">
      <Empty v-if="pinInfos.length === 0" :text="t('noPinListText')" />

      <div
        v-else
        v-for="(item, index) in pinInfos"
        :key="item.message.messageClientId"
      >
        <PinCard
          :msg="item.message"
          :index="index"
          :key="item.message.messageClientId"
          :handleUnPinMsg="handleUnPinMsg(item.message)"
        >
        </PinCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/**pin 消息组件 */

import { onLoad } from '@dcloudio/uni-app'
import { autorun } from 'mobx'
import { onUnmounted, ref } from '../../../utils/transformVue'
import NavBar from '../../../components/NavBar.vue'
import PinCard from './message-pin-card.vue'
import { t } from '../../../utils/i18n'
import Empty from '../../../components/Empty.vue'
import { V2NIMMessage } from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMMessageService'
let conversationId = ''
let pinInfos = ref([])
let pinInfosWatch = () => {}

onLoad((option) => {
  conversationId = option?.conversationId
  pinInfosWatch = autorun(() => {
    const curPinMsgsMap =
      uni.$UIKitStore.msgStore.pinMsgs.map.get(conversationId)
    //@ts-ignore
    pinInfos.value = [...curPinMsgsMap.values()]
      .filter((pinInfo) => pinInfo.pinState > 0 && pinInfo.message)
      .sort((a, b) => b.message!.createTime - a.message!.createTime)
  })
})

/**取消pin */
const handleUnPinMsg = (msg: V2NIMMessage) => {
  return () => {
    // 不用进行 catch 处理，因为 store 里面的 pin 相关方法处理过了，并且会将错误日志输出到控制台
    return uni.$UIKitStore.msgStore
      .unpinMessageActive(msg)
      .catch((err: any) => {
        if (err?.code && typeof t(`${err.code}`) !== 'undefined') {
          uni.showToast({
            title: t(`${err.code}`),
            icon: 'error',
            duration: 1000,
          })
        } else {
          uni.showToast({
            title: t('unpinFailedText'),
            icon: 'error',
            duration: 1000,
          })
        }
      })
  }
}

onUnmounted(() => {
  pinInfosWatch()
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  background-color: rgb(245, 246, 247);
}

.wrapper {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 30px;
  background-color: rgb(245, 246, 247);
  min-height: 100vh;
  .nav-bar-text {
    color: rgb(20, 146, 209);
  }
}
.bg-white {
  background: #fff;
}
</style>
