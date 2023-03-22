<template>
  <i :class="class" :style="style">
    <Svg></Svg>
    <i v-html="svg"></i>
  </i>
</template>

<script lang="ts" setup>
import Svg from './Svg.vue'
import type { StyleValue } from 'vue';
const props = defineProps<{
  type: string
  class?: string
  style?: StyleValue
}>()
const svgStyle = 'width: 1em;height: 1em;vertical-align: -0.15em;fill: currentColor;overflow: hidden;'
const svg = `<svg style="${svgStyle}" aria-hidden="true"><use xlink:href = "#${props.type}" ></use></svg>`
</script>

<style></style>
