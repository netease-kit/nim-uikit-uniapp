<template>
  <div class="empty-wrapper">
    <image class="empty-img" src="https://yx-web-nosdn.netease.im/common/e0f58096f06c18cdd101f2614e6afb09/empty.png" />
    <div class="empty-text">{{ text }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from '../utils/transformVue'
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
</script>
<style lang="scss" scoped>
.empty-wrapper {
  margin: 75px 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .empty-img {
    display: block;
    width: 125px;
    height: 100px;
  }

  .empty-text {
    display: block;
    color: #A6ADB6;
    margin: 10px;
  }
}
</style>
