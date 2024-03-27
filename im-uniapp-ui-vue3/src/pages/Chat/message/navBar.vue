<template>
    <!-- 样式兼容微信小程序  -->
    <div>
      <div class="nav-bar-wrapper"
        :style="{ backgroundColor: backgroundColor || '#ffffff', backgroundImage: `url(${title})`, height: isWeixinApp ? '55px' : '40px', alignItems: isWeixinApp ? 'flex-end' : 'center' }">
        <slot v-if="showLeft" name="left"></slot>
        <div v-else  @tap="back" >
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
      <div :class="isWeixinApp ? 'block-wx' : 'block'"></div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { getUniPlatform } from '../utils';
  import Icon from './Icon.vue'
  defineProps({
    title: {
      type: String,
      required: true
    },
    subTitle: {
      type: String,
      default: ''
    },
    backgroundColor: {
      type: String,
      default: ''
    },
    showLeft: {
      type: Boolean
    },
  })
  
  const isWeixinApp = getUniPlatform() === 'mp-weixin'
  
  const back = () => {
    uni.navigateBack({
      delta: 1
    })
  }
  
  </script>
  
  <style lang="scss" scoped>
  @import "../pages/styles/common.scss";
  
  .nav-bar-wrapper {
    display: flex;
    justify-content: space-between;
    padding: var(--status-bar-height) 10px 5px 10px;
    z-index: 9999;
  
    .title-container {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 230px;
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
    }
  
    .subTitle {
      white-space: nowrap;
      font-weight: 500;
    }
  }
  
  .block {
    width: 100%;
    height: calc(45px + var(--status-bar-height));
  }
  
  .block-wx {
    width: 100%;
    height: calc(55px + var(--status-bar-height));
  }
  </style>
  