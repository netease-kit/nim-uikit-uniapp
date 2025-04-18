<template>
  <uni-link
    v-if="!isWxApp"
    class="msg-file-wrapper"
    :href="downloadUrl"
    :download="name"
    :showUnderLine="false"
  >
    <div
      :class="!msg.isSelf ? 'msg-file msg-file-in' : 'msg-file msg-file-out'"
      @click="() => openInBrowser(downloadUrl)"
    >
      <Icon :type="iconType" :size="32"></Icon>
      <div class="msg-file-content">
        <div class="msg-file-title">
          <div class="msg-file-title-prefix">{{ prefixName }}</div>
          <div class="msg-file-title-suffix">{{ suffixName }}</div>
        </div>
        <div class="msg-file-size">{{ parseFileSize(size) }}</div>
      </div>
    </div>
  </uni-link>
  <div v-else @click="mpDownload">
    <div
      :class="!msg.isSelf ? 'msg-file msg-file-in' : 'msg-file msg-file-out'"
    >
      <Icon :type="iconType" :size="32"></Icon>
      <div class="msg-file-content">
        <div class="msg-file-title">
          <div class="msg-file-title-prefix">{{ prefixName }}</div>
          <div class="msg-file-title-suffix">{{ suffixName }}</div>
          <!-- <text class="msg-file-name" v-text="name"></text> -->
        </div>
        <div class="msg-file-size">{{ parseFileSize(size) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/** 文件消息组件 */

import { getFileType, parseFileSize } from '@xkit-yx/utils'
import Icon from '../../../components/Icon.vue'
// @ts-ignore
import UniLink from '../../../components/uni-components/uni-link/components/uni-link/uni-link.vue'
import { isWxApp } from '../../../utils'
import { t } from '../../../utils/i18n'
import { V2NIMMessageForUI } from '@xkit-yx/im-store-v2/dist/types/types'
import { V2NIMMessageFileAttachment } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMMessageService'
import { withDefaults, defineProps } from '../../../utils/transformVue'

const props = withDefaults(defineProps<{ msg: V2NIMMessageForUI }>(), {})

/** 文件图标映射 */
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

const {
  name = '',
  url = '',
  ext = '',
  size = 0,
} = (props.msg.attachment as V2NIMMessageFileAttachment) || {}

//@ts-ignore
const iconType = fileIconMap[getFileType(ext)] || 'icon-weizhiwenjian'

const index = name.lastIndexOf('.') > -1 ? name.lastIndexOf('.') : name.length

const prefixName = name.slice(0, Math.max(index - 5, 0))
const suffixName = name.slice(Math.max(index - 5, 0))

/** 下载地址 */
const downloadUrl =
  url + ((url as string).includes('?') ? '&' : '?') + `download=${name}`

/** 小程序不支持直接下载文件，复制链接到剪切板，浏览器打开 */
const mpDownload = () => {
  uni.setClipboardData({
    data: downloadUrl,
  })
  uni.showModal({
    content: t('wxAppFileCopyText'),
    showCancel: false,
  })
}

const openInBrowser = (url: string) => {
  uni.setClipboardData({
    data: url,
    showToast: false,
    success: () => {
      uni.showToast({
        title: t('openUrlText'),
        icon: 'none',
      })
    },
  })
}
</script>

<style scoped lang="scss">
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

  &-content {
    margin-left: 15px;
    max-width: 300rpx;
    min-width: 0;
  }

  &-title {
    color: #333;
    font-size: 14px;
    font-weight: 400;
    display: flex;

    &-prefix {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    &-suffix {
      white-space: nowrap;
    }
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
