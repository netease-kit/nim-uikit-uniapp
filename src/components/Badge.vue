<template>
  <div class="dot" v-if="dot" :style="customStyle"></div>
  <div class="badge" v-else-if="text" :style="customStyle">{{ text }}</div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { computed } from 'vue';
import { defineProps } from 'vue';

const {
  num,
  max = 99,
  dot = false,
} = defineProps<{
  // 显示文案
  num: number
  // 最大显示数
  max?: number
  // 是否显示为小红点
  dot?: boolean
  // 自定义样式
  customStyle?: CSSProperties
}>()

const text = computed(() => {
  return num > 0 ? num > max ? `${max}+` : num + '' : ''
})

</script>

<style scoped lang="scss">
.dot {
  background-color: #FF4D4F;
  color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 99;
}

.badge {
  background-color: #FF4D4F;
  color: #fff;
  font-size: 12px;
  min-width: 20px;
  height: 20px;
  line-height: 19px;
  border-radius: 10px;
  padding: 0 5px;
  box-sizing: border-box;
  text-align: center;
  z-index: 99;
  position: relative;
}
</style>
