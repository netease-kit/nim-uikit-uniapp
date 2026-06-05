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

<script>
/** 文件消息组件 */

import { getFileType, parseFileSize } from '../../../utils'
import Icon from '../../../components/Icon.vue'
import UniLink from '../../../components/uni-components/uni-link/components/uni-link/uni-link.vue'
import { isWxApp } from '../../../utils'
import { t } from '../../../utils/i18n'

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

export default {
  components: {
    Icon,
    UniLink,
  },
  props: {
    msg: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isWxApp,
    }
  },
  computed: {
    attachment() {
      return this.msg.attachment || {}
    },
    name() {
      return this.attachment.name || ''
    },
    url() {
      return this.attachment.url || ''
    },
    ext() {
      return this.attachment.ext || ''
    },
    size() {
      return this.attachment.size || 0
    },
    iconType() {
      return fileIconMap[getFileType(this.ext)] || 'icon-weizhiwenjian'
    },
    prefixName() {
      const index =
        this.name.lastIndexOf('.') > -1 ? this.name.lastIndexOf('.') : this.name.length
      return this.name.slice(0, Math.max(index - 5, 0))
    },
    suffixName() {
      const index =
        this.name.lastIndexOf('.') > -1 ? this.name.lastIndexOf('.') : this.name.length
      return this.name.slice(Math.max(index - 5, 0))
    },
    downloadUrl() {
      return this.url + (this.url.includes('?') ? '&' : '?') + `download=${this.name}`
    },
  },
  methods: {
    parseFileSize,
    mpDownload() {
      uni.setClipboardData({
        data: this.downloadUrl,
      })
      uni.showModal({
        content: t('wxAppFileCopyText'),
        showCancel: false,
      })
    },
    openInBrowser(url) {
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
    },
  },
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
