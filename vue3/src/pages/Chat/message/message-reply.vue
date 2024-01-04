<template>
  <div v-if="replyMsg" class="reply-msg-wrapper">
    <!-- replyMsg.idClient 不存在 说明回复的消息被删除或者撤回 -->
    <div v-if="!replyMsg?.idClient">
      {{ $t('replyNotFindText') }}
    </div>
    <div v-else class="reply-msg"  @tap="showFullReplyMsg">
      <div class="reply-msg-name">
        |
        {{
          store.uiStore.getAppellation({
            account: replyMsg?.from as string,
            teamId: replyMsg?.to as string,
          })
        }}:
      </div>
      <div v-if="replyMsg?.type === 'text'" class="reply-msg-content">
        <message-one-line :text="(replyMsg?.body as string)" :maxWidth="260"></message-one-line>
      </div>
      <div v-else-if="replyMsg?.type === 'file'" class="other-msg-wrapper">
        <uni-link :href="downloadUrl" :download="name" :showUnderLine="false">
          {{ '[' +  t('fileMsgText') + ']' }}
        </uni-link>
      </div>
      <div class="other-msg-wrapper" v-else>{{ '[' + REPLY_MSG_TYPE_MAP[replyMsg?.type] + ']' }}</div>
    </div>
  </div>
  <!-- 点击被回复的消息需要全屏显示 -->
  <div class="reply-full-screen" v-if="isFullScreen" @tap="closeFullReplyMsg">
    <message-text :msg="(replyMsg as IMMessage)" :fontSize="22"></message-text>
  </div>
</template>

<script lang="ts" setup>
import type { IMMessage } from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import { t } from '../../../utils/i18n'
import MessageOneLine from '../../../components/MessageOneLine.vue'
import { ref } from 'vue'
import MessageText from './message-text.vue'
import UniLink from '../../../uni_modules/uni-link/components/uni-link/uni-link.vue'
import { REPLY_MSG_TYPE_MAP } from '../../../utils/constants'
import { events } from '../../../utils/constants'
const props = defineProps<{
  replyMsg?: IMMessage 
}>()
const store = uni.$UIKitStore

const isFullScreen = ref(false)

const { name = '', url = '' } = props?.replyMsg?.attach || {}
const downloadUrl = url + ((url as string).includes('?') ? '&' : '?') + `download=${name}`

const showFullReplyMsg = () => {
  if(props.replyMsg?.type === 'image') {
    uni.previewImage({
      urls: [props.replyMsg?.attach?.url as string],
    })
  } else if(props.replyMsg?.type === 'text') {
    isFullScreen.value = true
    uni.$emit(events.ON_CLICK_THROUGH, true)
  }
}

// 点击全屏的回复消息，关闭全屏
const closeFullReplyMsg = () => {
  isFullScreen.value = false
  uni.$emit(events.ON_CLICK_THROUGH, false)
}



</script>

<style lang="scss" scoped>
.reply-msg-wrapper {
  display: flex;
  align-items: center;
  color: #929299;
  font-size: 13px;
  white-space: nowrap;
  .reply-msg{
    display: flex;
    align-items: center;
  }
  .reply-msg-name {
    margin-right: 5px;
  }
  .reply-msg-content {
    display: flex;
    align-items: center;
  }
}

.reply-full-screen {
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  background-color: #fff;
  display: flex;
  align-items: center;
  font-size: 24px;
  justify-content: center;
  touch-action: none;
  z-index: 9999;
  padding: 20px;
}
.other-msg-wrapper{
  flex-wrap: nowrap;
}
</style>
