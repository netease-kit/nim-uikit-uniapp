<template>
  <div>
    <div v-if="replyMsg.idClient" class="reply-msg-wrapper">
      <!-- replyMsg 不存在 说明回复的消息被删除或者撤回 -->
      <div v-if="!isReplyMsgExist">
        <span>{{ t('replyNotFindText') }}</span>
      </div>
      <div v-else class="reply-msg"  @tap="showFullReplyMsg">
        <div class="reply-msg-name">
           |{{ repliedTo }}:
        </div>
        <div v-if="replyMsg.type === 'text'" class="reply-msg-content">
          <message-one-line :text="replyMsg.body" :maxWidth="260"></message-one-line>
        </div>
        <div v-else-if="replyMsg.type === 'file'" class="other-msg-wrapper">
          <uni-link :href="downloadUrl" :download="name" :showUnderLine="false">
             [文件消息]
          </uni-link>
        </div>
        <div class="other-msg-wrapper" v-else>
           {{ '['  + REPLY_MSG_TYPE_MAP[replyMsg.type] + ']' }}
        </div>
      </div>
    </div>
    <!-- 点击被回复的消息需要全屏显示 -->
    <div class="reply-full-screen" v-if="isFullScreen" @tap="closeFullReplyMsg">
      <!-- #ifdef MP -->
        <div class="reply-message-close-mp"  @tap="closeFullReplyMsg" >
          <Icon color="#929299" :iconStyle="{ fontWeight: '200' }" :size="18" type="icon-guanbi"/>
        </div>
      <!-- #endif -->
      <!-- #ifndef MP -->
      <div class="reply-message-close"  @tap="closeFullReplyMsg" >
          <Icon color="#929299" :iconStyle="{ fontWeight: '200' }" :size="18" type="icon-guanbi"/>
        </div>
      <!-- #endif -->
      <div class="reply-message-content">
        <message-text :msg="replyMsg" :fontSize="22"></message-text>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { t } from '../../../utils/i18n'
import MessageOneLine from '../../../components/MessageOneLine.vue'
import { ref, onMounted, computed } from '../../../utils/transformVue';
import MessageText from './message-text.vue'
// @ts-ignore
import UniLink from '../../../uni_modules/uni-link/components/uni-link/uni-link.vue'
import { REPLY_MSG_TYPE_MAP } from '../../../utils/constants'
import { events } from '../../../utils/constants'
import { deepClone } from '../../../utils';
import { autorun } from 'mobx'
import Icon from '../../../components/Icon.vue'
const props = defineProps({
  replyMsg: { 
    type: Object, 
    default: () => ({
      idClient: undefined,
      body: undefined,
      type: undefined,
      attach: {
        type: undefined,
        value: undefined,
        url: undefined,
        canEdit: false,
        canRecall: false,
      },
    }),
  }})

const isFullScreen = ref(false)
const repliedTo = ref('')

const { name = '', url = '' } = props?.replyMsg?.attach || {}
const downloadUrl = url + ((url as string).includes('?') ? '&' : '?') + `download=${name}`

const isReplyMsgExist = computed(() => {
  return props.replyMsg?.idClient !== 'noFind'
})

onMounted(() => {
  repliedTo.value = deepClone(uni.$UIKitStore.uiStore.getAppellation({
    account: props.replyMsg?.from,
    teamId: props.replyMsg?.to,
  }))
})

autorun(() => {
  repliedTo.value = deepClone(uni.$UIKitStore.uiStore.getAppellation({
    account: props.replyMsg?.from,
    teamId: props.replyMsg?.to,
  }))
})


const showFullReplyMsg = () => {
  if(props.replyMsg?.type === 'image') {
    uni.previewImage({
      urls: [props.replyMsg?.attach?.url as string],
    })
  } else if(props.replyMsg?.type === 'text') {
    isFullScreen.value = true
    uni.$emit(events.HANDLE_MOVE_THROUGH, (true))
  }
}

// 点击全屏的回复消息，关闭全屏
const closeFullReplyMsg = () => {
  isFullScreen.value = false
  uni.$emit(events.HANDLE_MOVE_THROUGH, (false))
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

.reply-message-content{
  height: 85vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 30px 30px 100px 30px;
  touch-action: none;
  display: flex;
  align-items: center;
}
.other-msg-wrapper{
  flex-wrap: nowrap;
}

.reply-message-close {
  position: fixed;
  right: 20px;
  z-index: 999999;
  top: 40px;
}

.reply-message-close-mp{
  position: fixed;
  right: 20px;
  top: 100px;
  z-index: 999999;
}
</style>
