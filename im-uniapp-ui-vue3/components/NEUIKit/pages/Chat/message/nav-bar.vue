<template>
  <!-- 样式兼容微信小程序  -->
  <div>
    <div
      class="nav-bar-wrapper"
      :style="{
        backgroundColor: backgroundColor || '#ffffff',
        backgroundImage: `url(${title})`,
        height: isWxApp ? '55px' : '40px',
        alignItems: isWxApp ? 'flex-end' : 'center',
      }"
    >
      <slot v-if="showLeft" name="left"></slot>
      <div v-else @tap="back">
        <Icon type="icon-zuojiantou" :size="22"></Icon>
      </div>
      <div class="title-container">
        <div class="title">{{ title }}</div>
        <div class="subTitle" v-if="subTitle">{{ subTitle }}</div>
        <slot name="icon"></slot>
      </div>
      <div>
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isWxApp } from '../../../utils'
import Icon from '../../../components/Icon.vue'

withDefaults(
  defineProps<{
    title: string
    subTitle?: string
    backgroundColor?: string
    showLeft?: boolean
  }>(),
  {
    subTitle: '',
    backgroundColor: '',
    showLeft: true,
  }
)

const back = () => {
  uni.navigateBack({
    delta: 1,
  })
}
</script>

<style lang="scss" scoped>
@import '../../../pages/styles/common.scss';

.nav-bar-wrapper {
  display: flex;
  justify-content: space-between;
  padding: var(--status-bar-height) 10px 5px 10px;
  z-index: 9999;

  .title-container {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    white-space: nowrap;
    font-weight: 500;
    max-width: 230px;
  }

  .subTitle {
    white-space: nowrap;
    font-weight: 500;
  }
}
</style>
