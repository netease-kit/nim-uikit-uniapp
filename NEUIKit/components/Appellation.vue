<template>
  <span
    class="appellation"
    :style="{ color: color, fontSize: fontSize + 'px' }"
    >{{ appellation }}</span
  >
</template>

<script lang="ts" setup>
import { autorun } from 'mobx'
import { onUnmounted, ref } from '../utils/transformVue'

import { deepClone } from '../utils'

const appellation = ref('')
const { account, teamId, ignoreAlias, nickFromMsg } = defineProps({
  account: {
    type: String,
    required: true,
  },
  teamId: {
    type: String,
    default: null,
  },
  ignoreAlias: {
    type: Boolean,
    default: false,
  },
  nickFromMsg: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: '#333',
  },
  fontSize: {
    type: Number,
    default: 16,
  },
})

const uninstallAppellationWatch = autorun(() => {
  appellation.value = deepClone(
    // @ts-ignore
    uni.$UIKitStore?.uiStore?.getAppellation({
      account,
      teamId,
      ignoreAlias,
      nickFromMsg,
    })
  )
})
onUnmounted(() => {
  uninstallAppellationWatch()
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
