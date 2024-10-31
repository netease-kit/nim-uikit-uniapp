<template>
  <div class="collection-card-wrapper">
    <div class="info-wrapper">
      <div class="info" @tap="gotoChat">
        <div class="info-left">
          <image
            :lazy-load="true"
            class="avatar-img"
            v-if="collectionData.avatar"
            :src="collectionData.avatar"
            mode="aspectFill"
          />
        </div>
        <div class="info-right">
          <div class="name">
            {{ collectionData.senderName }}
          </div>
          <div class="conversation">
            来自于 {{ collectionData.conversationName }}
          </div>
        </div>
      </div>
      <div class="info-icon">
        <Icon type="icon-More" @tap="handleCollection" />
      </div>
    </div>
    <div class="content-wrapper">
      <div
        class="file-wrapper"
        v-if="
          msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE
        "
      >
        <div
          @tap="
            () => {
              handleImageTouch(msg.attachment.url)
            }
          "
        >
          <image
            class="msg-image"
            :lazy-load="true"
            mode="aspectFill"
            :src="imageUrl"
          ></image>
        </div>
      </div>
      <div
        class="file-wrapper"
        v-else-if="
          msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO
        "
      >
        <div class="video-msg-wrapper" @tap="() => handleVideoTouch(msg)">
          <div class="video-play-button">
            <div class="video-play-icon"></div>
          </div>
          <image
            class="msg-image"
            :lazy-load="true"
            mode="aspectFill"
            :src="videoFirstFrameDataUrl"
          ></image>
        </div>
      </div>
      <div
        class="file-wrapper extra"
        v-else-if="
          msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE
        "
      >
        <MessageFile :msg="msg" />
      </div>
      <div
        class="file-wrapper"
        v-else-if="
          msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
        "
      >
        <div class="audio-wrapper">
          <MessageAudio :msg="msg" mode="audio-in" />
        </div>
      </div>
      <div
        v-else-if="
          msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
        "
        class="text-wrapper"
      >
        <template v-for="item in textArr">
          <template v-if="item.type === 'text'">
            {{ item.value }}
          </template>

          <template v-else-if="item.type === 'emoji'">
            <Icon
              :type="emojiMap[item.value]"
              :size="fontSize || 22"
              :style="{ margin: '0 2px 2px 2px', verticalAlign: 'bottom' }"
            />
          </template>
        </template>
      </div>

      <div v-else>[{{ t('unknowMsgText') }}]</div>
    </div>
    <div class="updatetime">
      {{ timeFormat() }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from '../../../utils/transformVue'
import { stopAllAudio } from '../../../utils'
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'
import { defineProps, withDefaults } from '../../../utils/transformVue'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK'
import { V2NIMMessageForUI } from '@xkit-yx/im-store-v2/dist/types/types'

import dayjs from 'dayjs'
import { customNavigateTo } from '../../../utils/customNavigate'
import MessageFile from '../../../pages/Chat/message/message-file.vue'
import MessageAudio from '../../../pages/Chat/message/message-audio.vue'
import { t } from '../../../utils/i18n'
import { customRedirectTo } from '../../../utils/customNavigate'
import { parseText } from '../../../utils/parseText'
import { emojiMap } from '../../../utils/emoji'
import { V2NIMCollection } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMMessageService'

const props = withDefaults(
  defineProps<{
    data: V2NIMCollection
    handleRemoveCollection: any
  }>(),
  {}
)

const collectionData = JSON.parse(props.data.collectionData)

collectionData.message =
  uni.$UIKitNIM.V2NIMMessageConverter.messageDeserialization(
    collectionData.message
  )

const msg = collectionData.message

const textArr = parseText(msg?.text || '')

const handleCopy = () => {
  uni.setClipboardData({
    data: msg.text,
  })
}

const handleCollection = () => {
  let itemList = [t('deleteCollectionText')]
  if (msg.messageType === V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT) {
    itemList = itemList.concat([
      t('copyText'),
      t('forwardToTeamText'),
      t('forwardToFriendText'),
    ])
  } else if (
    msg.messageType !== V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
  ) {
    itemList = itemList.concat([
      t('forwardToTeamText'),
      t('forwardToFriendText'),
    ])
  }
  uni.showActionSheet({
    itemList,
    success(data) {
      if (
        msg.messageType === V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
      ) {
        if (data.tapIndex === 0) {
          props.handleRemoveCollection()
        } else if (data.tapIndex === 1) {
          handleCopy()
        } else if (data.tapIndex === 2) {
          customNavigateTo({
            url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM}&msgIdClient=${msg.messageClientId}&origin=collection`,
          })
        } else if (data.tapIndex === 3) {
          customNavigateTo({
            url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P}&msgIdClient=${msg.messageClientId}&origin=collection`,
          })
        }
      } else if (
        msg.messageType !== V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
      ) {
        if (data.tapIndex === 0) {
          props.handleRemoveCollection()
        } else if (data.tapIndex === 1) {
          customNavigateTo({
            url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM}&msgIdClient=${msg.messageClientId}&origin=collection`,
          })
        } else if (data.tapIndex === 2) {
          customNavigateTo({
            url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P}&msgIdClient=${msg.messageClientId}&origin=collection`,
          })
        }
      } else {
        if (data.tapIndex === 0) {
          props.handleRemoveCollection()
        }
      }
    },
    complete() {},
  })
}

const imageUrl = computed(() => {
  return msg?.attachment?.url || msg.attachment?.file
})

// 获取视频首帧
const videoFirstFrameDataUrl = computed(() => {
  const url = msg.attachment?.url
  return url ? `${url}${url.includes('?') ? '&' : '?'}vframe=1` : ''
})
// 点击图片预览
const handleImageTouch = (url: string) => {
  if (url) {
    uni.previewImage({
      urls: [url],
    })
  }
}

// 点击视频播放
const handleVideoTouch = (msg: V2NIMMessageForUI) => {
  stopAllAudio()
  const url = msg.attachment?.url
  if (url) {
    customNavigateTo({
      url: `/pages/Chat/video-play?videoUrl=${encodeURIComponent(url)}`,
    })
  }
}

const isToday = (time) => {
  const createTime = new Date(time)
  const now = new Date()
  return (
    createTime.getFullYear() === now.getFullYear() &&
    createTime.getMonth() === now.getMonth() &&
    createTime.getDate() === now.getDate()
  )
}
const isThisYear = (time) => {
  const createTime = new Date(time)
  const now = new Date()
  return createTime.getFullYear() === now.getFullYear()
}
const timeFormat = () => {
  const updateTime = props.data.updateTime

  if (isToday(updateTime)) {
    return dayjs(updateTime).format('HH:mm')
  } else if (isThisYear(updateTime)) {
    return dayjs(updateTime).format('MM月DD日 HH:mm')
  } else {
    return dayjs(updateTime).format('YYYY年MM月DD日 HH:mm')
  }
}
</script>

<style lang="scss" scoped>
@import '../../../pages/styles/common.scss';

.collection-card-wrapper {
  background-color: #fff;
  margin: 0 20px;
  margin-top: 12px;
  overflow: hidden;
  border-radius: 8px;
  .info-wrapper {
    display: flex;
    margin: 0 16px;
    padding: 16px 0 12px 0;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e9f2;
    .info {
      display: flex;
      overflow: hidden;
      .info-left {
        margin-right: 8px;
        .avatar-img {
          width: 32px;
          height: 32px;
          border-radius: 50%;
        }
      }
      .info-right {
        overflow: hidden;
        font-size: 12px;
        .conversation {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #999999;
        }
      }
    }
    .info-icon {
      width: 16px;
    }
  }
  .updatetime {
    padding: 0 16px 10px 16px;
    color: #999999;
    font-size: 12px;
  }
  .content-wrapper {
    margin: 0 16px;
    padding: 16px 0 12px 0;

    word-wrap: break-word;
    .file-wrapper {
      position: relative;
      width: 50%;

      .msg-image {
        width: 100%;
      }
      .video-msg-wrapper {
        box-sizing: border-box;
        max-width: 360rpx;
      }
      .video-play-button {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        z-index: 9;
      }
      .video-play-icon {
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-bottom: 10px solid transparent;
        border-left: 18px solid #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-40%, -50%);
      }
      .audio-wrapper {
        opacity: 1;
        width: fit-content;
        background: #d6e5f6;
        overflow: hidden;
        padding: 10px 12px;
        border-radius: 0 8px 8px 8px;
        background-color: #e8eaed;
      }
    }
    .extra {
      width: 100%;
      position: relative;
      right: 8px;
    }
  }
}
</style>
