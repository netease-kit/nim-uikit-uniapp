<template>
  <div>
    <div v-if="props.replyMsg?.messageClientId" class="reply-msg-wrapper">
      <!-- replyMsg 不存在 说明回复的消息被删除或者撤回 -->
      <div v-if="!isReplyMsgExist">
        <span>{{ t('replyNotFindText') }}</span>
      </div>
      <div v-else class="reply-msg" @tap="showFullReplyMsg">
        <div class="reply-msg-name-wrapper">
          <div class="reply-msg-name-line">|</div>
          <div class="reply-msg-name-content">{{ repliedTo }}</div>
          <div class="reply-msg-name-to">:</div>
        </div>
        <message-one-line
          v-if="
            props.replyMsg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
          "
          :text="props.replyMsg.text"
        ></message-one-line>
        <div
          v-else-if="
            props.replyMsg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE
          "
          class="other-msg-wrapper"
        >
          <uni-link
            v-if="!isHarmonyOs"
            :href="downloadUrl"
            :download="name"
            :showUnderLine="false"
          >
            {{ t('fileMsgTitleText') }}
          </uni-link>
          <span
            v-else
            class="other-msg-wrapper"
            @click="() => openInBrowser(downloadUrl)"
          >
            {{ t('fileMsgTitleText') }}
          </span>
        </div>
        <div class="other-msg-wrapper" v-else>
          {{ '[' + REPLY_MSG_TYPE_MAP[props.replyMsg.messageType] + ']' }}
        </div>
      </div>
    </div>
    <!-- 点击被回复的消息需要全屏显示 -->
    <div v-if="isFullScreen" class="reply-full-screen" @tap="closeFullReplyMsg">
      <!-- #ifdef MP -->
      <div class="reply-message-close-mp" @tap="closeFullReplyMsg">
        <Icon
          color="#929299"
          :iconStyle="{ fontWeight: '200' }"
          :size="18"
          type="icon-guanbi"
        />
      </div>
      <!-- #endif -->
      <!-- #ifndef MP -->
      <div class="reply-message-close" @tap="closeFullReplyMsg">
        <Icon
          color="#929299"
          :iconStyle="{ fontWeight: '200' }"
          :size="18"
          type="icon-guanbi"
        />
      </div>
      <!-- #endif -->
      <div
        v-if="
          props.replyMsg.messageType ==
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
        "
        class="reply-message-content"
      >
        <message-text :msg="replyMsg" :fontSize="22"></message-text>
      </div>
      <div
        v-else-if="
          props.replyMsg.messageType ==
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
        "
        class="msg-common"
        :style="{
          flexDirection: props.replyMsg.isSelf ? 'row-reverse' : 'row',
          backgroundColor: props.replyMsg.isSelf ? '#d6e5f6' : '#e8eaed',
          borderRadius: props.replyMsg.isSelf ? '8px 0px 8px 8px' : '0 8px 8px',
        }"
        @click.stop="() => {}"
      >
        <MessageAudio :msg="replyMsg" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/** 回复消息组件 */

import { t } from '../../../utils/i18n'
import MessageOneLine from '../../../components/MessageOneLine.vue'
import {
  ref,
  onMounted,
  computed,
  defineProps,
  withDefaults,
  onUnmounted,
} from '../../../utils/transformVue'
import MessageText from './message-text.vue'
// @ts-ignore
import UniLink from '../../../components/uni-components/uni-link/components/uni-link/uni-link.vue'
import { REPLY_MSG_TYPE_MAP } from '../../../utils/constants'
import { events } from '../../../utils/constants'
import { isHarmonyOs, stopAllAudio } from '../../../utils'
import { autorun } from 'mobx'
import { customNavigateTo } from '../../../utils/customNavigate'
import { V2NIMMessageForUI } from '@xkit-yx/im-store-v2/dist/types/types'
//@ts-ignore
import { V2NIMConst } from '../../../utils/nim'
import MessageAudio from './message-audio.vue'
import Icon from '../../../components/Icon.vue'

const props = withDefaults(
  defineProps<{ replyMsg: V2NIMMessageForUI | undefined }>(),
  {}
)

/**是否全屏展示 */
const isFullScreen = ref(false)

const repliedTo = ref('')

//@ts-ignore
const { name = '', url = '' } = props.replyMsg?.attachment || {}

/**下载地址 */
const downloadUrl =
  url + ((url as string).includes('?') ? '&' : '?') + `download=${name}`

/**被回复消息是否存在 */
const isReplyMsgExist = computed(() => {
  return props.replyMsg?.messageClientId !== 'noFind'
})

onMounted(() => {
  repliedTo.value = uni.$UIKitStore.uiStore.getAppellation({
    account: props.replyMsg?.senderId as string,
    teamId: props.replyMsg?.receiverId,
  })
})

/**回复消息昵称 */
const repliedToWatch = autorun(() => {
  repliedTo.value = uni.$UIKitStore.uiStore.getAppellation({
    account: props.replyMsg?.senderId as string,
    teamId: props.replyMsg?.receiverId,
  })
})

/**全屏展示回复消息 */
const showFullReplyMsg = () => {
  if (
    props.replyMsg?.messageType ===
    V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE
  ) {
    uni.previewImage({
      //@ts-ignore
      urls: [props.replyMsg?.attachment?.url as string],
    })
  } else if (
    props.replyMsg?.messageType ===
    V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
  ) {
    isFullScreen.value = true
    uni.$emit(events.HANDLE_MOVE_THROUGH, true)
  } else if (
    props.replyMsg?.messageType ===
    V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO
  ) {
    //@ts-ignore
    const url = props.replyMsg?.attachment?.url
    stopAllAudio()
    if (url) {
      customNavigateTo({
        url: `/pages/Chat/video-play?videoUrl=${encodeURIComponent(url)}`,
      })
    }
  } else if (
    props.replyMsg?.messageType ===
    V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
  ) {
    isFullScreen.value = true
  }
}

/**点击全屏的回复消息，关闭全屏 */
const closeFullReplyMsg = () => {
  isFullScreen.value = false
  stopAllAudio()
  uni.$emit(events.HANDLE_MOVE_THROUGH, false)
}

/**复制下载链接 */
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

onUnmounted(() => {
  repliedToWatch()
})
</script>

<style lang="scss" scoped>
.reply-msg-wrapper {
  display: flex;
  align-items: center;
  color: #929299;
  font-size: 13px;
  white-space: nowrap;

  .reply-msg {
    display: flex;
    align-items: center;
    width: 100%;
    message-one-line {
      flex: 1;
      font-size: 13px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .reply-msg-name-wrapper {
    margin-right: 5px;
    max-width: 125px;
    flex: 0 0 auto;
    display: flex;
    white-space: nowrap;
  }
  .reply-msg-name-line {
    flex-basis: 0 0 3px;
    margin-right: 2px;
  }
  .reply-msg-name-to {
    flex-basis: 0 0 3px;
  }
  .reply-msg-name-content {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .reply-msg-content {
    // display: flex;
    // align-items: center;
    flex: 1;
  }
}

.reply-full-screen {
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  justify-content: center;
  touch-action: none;
  z-index: 999999999;
  box-sizing: border-box;
}

.reply-message-content {
  height: 85vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 30px 30px 100px 30px;
  touch-action: none;
  display: flex;
  align-items: center;
}
.other-msg-wrapper {
  flex-wrap: nowrap;
}

.reply-message-close {
  position: fixed;
  right: 20px;
  z-index: 999999;
  top: 60px;
}

.reply-message-close-mp {
  position: fixed;
  right: 20px;
  top: 100px;
  z-index: 999999;
}

.msg-common {
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  max-width: 360rpx;
  overflow: hidden;
  padding: 16px 20px;
}
</style>
