<template>
  <span class="appellation" :style="customStyle">{{ appellation }}</span>
</template>

<script lang="ts" setup>
import { autorun } from 'mobx';
import type { CSSProperties } from 'vue';
import { defineProps, ref } from 'vue';

const store = uni.$UIKitStore

const appellation = ref('')

autorun(() => {
  appellation.value = store.uiStore.getAppellation({ account, teamId, ignoreAlias, nickFromMsg })
})

const { account, teamId, ignoreAlias, nickFromMsg } = defineProps<{
  account: string
  teamId?: string
  ignoreAlias?: boolean
  nickFromMsg?: string
  customStyle?: CSSProperties
}>()

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
