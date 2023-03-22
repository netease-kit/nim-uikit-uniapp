<template>
  <div class="nav-bar-wrapper" :style="{ backgroundColor: backgroundColor || '#ffffff' }">
    <slot v-if="$slots.left" name="left"></slot>
    <Icon v-else @click="back" type="icon-zuojiantou"></Icon>
    <div class="title">{{ title }}</div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
  <div class="block"></div>
</template>
  
<script lang="ts" setup>
import Icon from './Icon.vue'
defineProps<{
  title: string
  backgroundColor?: string
}>()

const back = () => {
  uni.navigateBack({
    delta: 1
  })
}

</script>
  
<style lang="scss" scoped>
@import "../pages/styles/common.scss";
.nav-bar-wrapper {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 45px;
  padding: 0 10px; 
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  padding-top: var(--status-bar-height);

  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    width: 230px;
    white-space: nowrap;
  }
}

.block {
  height: calc(45px + var(--status-bar-height));
}
</style>
  