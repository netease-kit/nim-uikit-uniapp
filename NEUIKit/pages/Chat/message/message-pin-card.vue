<template>
  <div class="pincard-wrapper">
    <div class="info-wrapper">
      <div class="info" @tap="gotoChat">
        <div class="info-left">
          <Avatar size="32" :account="props.msg.senderId"></Avatar>
        </div>
        <div class="info-right">
          <div class="name">
            <Appellation
              :account="props.msg.senderId"
              :teamId="
                conversationType ===
                V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
                  ? to
                  : ''
              "
            ></Appellation>
          </div>
          <div class="createtime">
            {{ timeFormat() }}
          </div>
        </div>
      </div>
      <Icon type="icon-More" @tap="handlePinMsg" />
    </div>
    <div class="content-wrapper">
      <div
        class="msg-text"
        v-if="
          msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
        "
      >
        <MessageText :msg="props.msg"></MessageText>
      </div>
      <div class="file-wrapper">
        <div
          v-if="
            msg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE
          "
        >
          <div
            @tap="
              () => {
                handleImageTouch(props.msg.attachment.url)
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
          v-else-if="
            props.msg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO
          "
        >
          <div
            class="video-msg-wrapper"
            @tap="() => handleVideoTouch(props.msg)"
          >
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
          class="extra"
          v-else-if="
            props.msg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE
          "
        >
          <MessageFile :msg="props.msg" />
        </div>
        <div
          v-else-if="
            props.msg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
          "
        >
          <div class="audio-wrapper">
            <MessageAudio :msg="props.msg" mode="audio-in" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, withDefaults } from 'vue'
import { stopAllAudio } from '../../../utils'
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'
import { V2NIMMessageForUI } from '@xkit-yx/im-store-v2/dist/types/types'
import { V2NIMConst } from '../../../utils/nim'
import Appellation from '../../../components/Appellation.vue'
import dayjs from 'dayjs'
import { customNavigateTo } from '../../../utils/customNavigate'
import MessageFile from './message-file.vue'
import MessageAudio from './message-audio.vue'
import { t } from '../../../utils/i18n'
import { customRedirectTo } from '../../../utils/customNavigate'
import MessageText from './message-text.vue'
const props = withDefaults(
  defineProps<{
    msg: V2NIMMessageForUI
    handleUnPinMsg: any
  }>(),
  {}
)

const conversationType =
  uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(
    props.msg.conversationId
  )
const to = uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationTargetId(
  props.msg.conversationId
)

const gotoChat = async () => {
  await uni.$UIKitStore.uiStore.selectConversation(props.msg.conversationId)
  customRedirectTo({
    url: '/pages/Chat/index',
  })
}

const handleCopy = () => {
  uni.setClipboardData({
    //@ts-ignore
    data: props.msg.text,
    showToast: false,
    success: () => {
      uni.showToast({
        title: t('copySuccessText'),
        icon: 'none',
      })
    },
    fail: () => {
      uni.showToast({
        title: t('copyFailText'),
        icon: 'none',
      })
    },
  })
}

// pin 消息操作
const handlePinMsg = () => {
  let itemList = [t('unpinText')]
  if (
    props.msg.messageType ===
    V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
  ) {
    itemList = itemList.concat([
      t('copyText'),
      t('forwardToTeamText'),
      t('forwardToFriendText'),
    ])
  } else if (
    props.msg.messageType !==
    V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
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
        props.msg.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
      ) {
        if (data.tapIndex === 0) {
          props.handleUnPinMsg()
        } else if (data.tapIndex === 1) {
          handleCopy()
        } else if (data.tapIndex === 2) {
          customNavigateTo({
            url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM}&msgIdClient=${props.msg.messageClientId}&origin=pin`,
          })
        } else if (data.tapIndex === 3) {
          customNavigateTo({
            url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P}&msgIdClient=${props.msg.messageClientId}&origin=pin`,
          })
        }
      } else if (
        props.msg.messageType !==
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
      ) {
        if (data.tapIndex === 0) {
          props.handleUnPinMsg()
        } else if (data.tapIndex === 1) {
          customNavigateTo({
            url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM}&msgIdClient=${props.msg.messageClientId}&origin=pin`,
          })
        } else if (data.tapIndex === 2) {
          customNavigateTo({
            url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P}&msgIdClient=${props.msg.messageClientId}&origin=pin`,
          })
        }
      } else {
        if (data.tapIndex === 0) {
          props.handleUnPinMsg()
        }
      }
    },
    complete() {},
  })
}

const imageUrl = computed(() => {
  return props.msg?.attachment?.url || props.msg.attachment?.file
})

// 获取视频首帧
const videoFirstFrameDataUrl = computed(() => {
  const url = props.msg.attachment?.url
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
  const createTime = props.msg.createTime
  if (isToday(createTime)) {
    return dayjs(createTime).format('HH:mm')
  } else if (isThisYear(createTime)) {
    return dayjs(createTime).format('MM月DD日 HH:mm')
  } else {
    return dayjs(createTime).format('YYYY年MM月DD日 HH:mm')
  }
}
</script>

<style lang="scss" scoped>
.pincard-wrapper {
  background-color: #fff;
  margin: 0 20px;
  margin-top: 12px;
  overflow: hidden;
  border-radius: 8px;
  .info-wrapper {
    display: flex;
    margin: 0 16px;
    padding: 16px 0 12px 0;
    border-bottom: 1px solid #e4e9f2;
    justify-content: space-between;
    align-items: center;
    .info {
      display: flex;
      flex-grow: 1;

      .info-left {
        margin-right: 8px;
      }
      .info-right {
        font-size: 12px;
        .createtime {
          color: #999999;
        }
      }
    }
  }
  .content-wrapper {
    padding: 12px 16px 16px 16px;
    word-break: break-all;
    word-wrap: break-word;
    white-space: break-spaces;
    .file-wrapper {
      position: relative;
      width: 50%;
      .extra {
        width: 200%;
      }
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
        width: fit-content;
        opacity: 1;
        background: #d6e5f6;
        overflow: hidden;
        padding: 10px 12px;
        border-radius: 0 8px 8px 8px;
        background-color: #e8eaed;
      }
    }
    .msg-text {
      word-break: break-all;
      word-wrap: break-word;
      white-space: break-spaces;
    }
  }
}
</style>
