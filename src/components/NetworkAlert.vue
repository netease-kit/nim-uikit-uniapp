<template>
  <div class="network-alert" v-if="!isConnected && text">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
import { autorun } from 'mobx';
import { ref } from 'vue';
import { t } from '../utils/i18n';
const isConnected = ref(true);
const text = ref('');
const store = uni.$UIKitStore
// uni.onNetworkStatusChange((res) => {
//   if (!res.isConnected) {
//     isConnected.value = false;
//     text.value = t('offlineText');
//   } else {
//     text.value = t('connectingText');
//   }
// });

autorun(() => {
  if (store.connectStore.connectState === 'connected') {
    isConnected.value = true;
  } else if (store.connectStore.connectState === 'disconnected') {
    isConnected.value = false;
    text.value = t('offlineText');
  } else {
    isConnected.value = false;
    text.value = t('connectingText');
  }
});

</script>

<style>
.network-alert {
  font-size: 14px;
  background: #FEE3E6;
  color: #FC596A;
  text-align: center;
  padding: 8px 0;
}
</style>
