<template>
  <span class="appellation" :style="{ color: color, fontSize: fontSize + 'px'}">{{ appellation }}</span>
</template>

<script lang="ts" setup>
import { autorun } from 'mobx';
import { ref } from '../utils/transformVue'

import { deepClone } from '../utils';

const appellation = ref('')
const { account, teamId, ignoreAlias, nickFromMsg } = defineProps({
  account: {
    type: String,
    required: true
  },
  teamId: {
    type: String,
    default: null
  },
  ignoreAlias: {
    type: Boolean,
    default: false
  },
  nickFromMsg: {
    type: String,
    default: null
  },
  color: {
    type: String,
    default: '#333'
  },
  fontSize: {
    type: Number,
    default: 16
  }
})

autorun(() => {
  // @ts-ignore
  appellation.value = deepClone(uni.$UIKitStore?.uiStore?.getAppellation({
    account,
    teamId,
    ignoreAlias,
    nickFromMsg
  }))
})


</script>

<style scoped lang="scss">
.appellation {
  color: #333;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
