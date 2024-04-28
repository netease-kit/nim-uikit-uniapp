<template>
  <div v-if="!isConnected && text" class="network-alert">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
import { autorun } from 'mobx'
import { ref, onMounted, onUnmounted } from '../utils/transformVue'
import { t } from '../utils/i18n'
const isConnected = ref(true)
const text = ref(t('connectingText'))
// uni.onNetworkStatusChange((res) => {
//   if (!res.isConnected) {
//     isConnected.value = false;
//     text.value = t('offlineText');
//   } else {
//     text.value = t('connectingText');
//   }
// });

onMounted(() => {
  // @ts-ignore
  if (uni.$UIKitStore?.connectStore?.connectState === 'connected') {
    isConnected.value = true
    // @ts-ignore
  } else if (uni.$UIKitStore?.connectStore?.connectState === 'disconnected') {
    isConnected.value = false
    text.value = t('offlineText')
  } else {
    isConnected.value = false
    text.value = t('connectingText')
  }
})

const uninstallConnectWatch = autorun(() => {
  // @ts-ignore
  if (uni.$UIKitStore?.connectStore?.connectState === 'connected') {
    isConnected.value = true
    // @ts-ignore
  } else if (uni.$UIKitStore?.connectStore?.connectState === 'disconnected') {
    isConnected.value = false
    text.value = t('offlineText')
  } else {
    isConnected.value = false
    text.value = t('connectingText')
  }
})

onUnmounted(() => {
  uninstallConnectWatch()
})
</script>

<style>
.network-alert {
  font-size: 14px;
  background: #fee3e6;
  color: #fc596a;
  text-align: center;
  padding: 8px 0;
}
</style>
