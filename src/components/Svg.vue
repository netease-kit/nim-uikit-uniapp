<template>
  <div v-if="appendSvg" v-html="svgString"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import svgString from '../utils/svgString';
const appendSvg = ref(false)
onMounted(() => {
  // 通过定时器，保证在页面渲染完成后再执行
  setTimeout(() => {
    uni.createSelectorQuery().select('#iconfont-svg').boundingClientRect().exec((res) => {
      appendSvg.value = !res[0]
    })
  }, 0)
})

</script>

<style scoped></style>




