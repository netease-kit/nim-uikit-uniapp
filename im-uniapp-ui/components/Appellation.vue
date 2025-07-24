<template>
  <span
    class="appellation"
    :style="{ color: color, fontSize: fontSize + 'px' }"
    >{{ appellation }}</span
  >
</template>

<script lang="ts" setup>
import { autorun } from 'mobx'
import { onUnmounted, ref, withDefaults } from 'vue'

const appellation = ref('')

const { account, teamId, ignoreAlias, nickFromMsg } = withDefaults(
  defineProps<{
    account: string
    teamId?: string
    ignoreAlias?: boolean
    nickFromMsg?: string
    color?: string
    fontSize?: number
  }>(),
  {
    teamId: undefined,
    ignoreAlias: false,
    nickFromMsg: undefined,
    color: '#333',
    fontSize: 16,
  }
)

const uninstallAppellationWatch = autorun(() => {
  appellation.value = uni.$UIKitStore.uiStore.getAppellation({
    account,
    teamId,
    ignoreAlias,
    nickFromMsg,
  })
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
