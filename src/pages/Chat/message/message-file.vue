<template>
  <uni-link class="msg-file-wrapper" :href="downloadUrl" :download="name" :showUnderLine="false">
    <div :class="`msg-file msg-file-${msg.flow}`">
      <Icon class="msg-file-icon" :type="iconType"></Icon>
      <div class="msg-file-content">
        <div class="msg-file-title">
          <text class="msg-file-name" v-text="name"></text>
        </div>
        <div class="msg-file-size">{{ parseFileSize(size) }}</div>
      </div>
    </div>
  </uni-link>
</template>

<script lang="ts" setup>
import type { IMMessage } from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import { defineProps } from 'vue'
import { getFileType, parseFileSize } from '@xkit-yx/utils'
import Icon from '../../../components/Icon.vue';
import UniLink from '../../../uni_modules/uni-link/components/uni-link/uni-link.vue'

const props = defineProps<{
  msg: IMMessage
}>()

const fileIconMap = {
  pdf: 'icon-PPT',
  word: 'icon-Word',
  excel: 'icon-Excel',
  ppt: 'icon-PPT',
  zip: 'icon-RAR1',
  txt: 'icon-qita',
  img: 'icon-tupian2',
  audio: 'icon-yinle',
  video: 'icon-shipin',
}

const { name = '', url = '', ext = '', size = '' } = props.msg.attach || {}

//@ts-ignore
const iconType = fileIconMap[getFileType(ext)] || 'icon-weizhiwenjian'

const downloadUrl = url + ((url as string).includes('?') ? '&' : '?') + `download=${name}`
</script>

<style scoped lang="scss">
.msg-file-wrapper {
  // max-width: 300rpx;
}

.msg-file {
  height: 56px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 15px;
  border-radius: 8px;
  border: 1px solid #dee0e2;

  &-in {
    margin-left: 8px;
  }

  &-out {
    margin-right: 8px;
  }

  &-icon {
    font-size: 32px;
  }

  &-content {
    margin-left: 15px;
    max-width: 200rpx;
    min-width: 0;
  }

  &-title {
    color: #333;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &-size {
    color: #999;
    font-size: 10px;
    margin-top: 4px;
  }
}
</style>
