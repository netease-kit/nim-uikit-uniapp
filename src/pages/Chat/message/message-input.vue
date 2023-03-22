<template>
  <div class="msg-input-wrapper" :style="{ transform: `translateY(${extVisible ? '0' : '300px'})` }">
    <div class="msg-input">
      <input class="msg-input-input" :maxlength="-1" :placeholder="$t('chatInputPlaceHolder')" v-model="inputText"
        type="text" @confirm="handleSendTextMsg" @focus="handleInputFoucus" />
    </div>
    <div class="msg-button-group">
      <Icon class="msg-input-button" type="icon-biaoqing" @tap="handleEmojiVisible" />
      <Icon v-if="!sendingImg" class="msg-input-button" type="icon-tupian" @tap="handleSendImageMsg" />
      <Icon v-else class="msg-input-button msg-input-loading" type="icon-a-Frame8" />
      <!-- <Icon class="msg-input-button" type="icon-wenjian" @tap="handleSendFileMsg" /> -->
    </div>
    <div class="msg-ext">
      <Face v-if="emojiVisible" :on-emoji-click="handleEmoji" :on-emoji-delete="handleEmojiDelete"
        :on-emoji-send="handleSendTextMsg" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TMsgScene } from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import Face from './face.vue'
import Icon from '../../../components/Icon.vue';
import { ref, defineProps } from 'vue'
import { events } from '../../../utils/constants'
import { emojiMap } from '../../../utils/emoji';
import { t } from '../../../utils/i18n';
import { handleNoPermission } from '../../../utils/permission';
const props = defineProps<{
  scene: TMsgScene
  to: string
}>()
const store = uni.$UIKitStore
const inputText = ref('')
const extVisible = ref(false)
const emojiVisible = ref(false)
const sendingImg = ref(false)

const handleInputFoucus = () => {
  emojiVisible.value = false
  extVisible.value = false
}

const handleSendTextMsg = () => {
  store.msgStore.sendTextMsgActive({
    scene: props.scene,
    to: props.to,
    body: inputText.value,
  }).then(() => {
    uni.$emit(events.SEND_MSG)
    emojiVisible.value = false
    extVisible.value = false
  })
  inputText.value = ''
}

const handleEmojiVisible = () => {
  emojiVisible.value = !emojiVisible.value
  extVisible.value = !extVisible.value
}

const handleEmoji = (emoji: { key: string; type: string }) => {
  inputText.value += emoji.key
}

const handleEmojiDelete = () => {
  let target = ''
  const isEmojiEnd = Object.keys(emojiMap).reduce((prev, cur) => {
    const isEnd = inputText.value.endsWith(cur)
    if (isEnd) {
      target = cur
    }
    return prev || isEnd
  }, false)
  if (isEmojiEnd && target) {
    inputText.value = inputText.value.replace(target, '')
  } else {
    inputText.value = inputText.value.slice(0, -1)
  }
}

const handleSendImageMsg = () => {
  uni.chooseImage({
    count: 1,
    success: (res) => {
      sendingImg.value = true
      store.msgStore.sendImageMsgActive({
        scene: props.scene,
        to: props.to,
        filePath: res.tempFilePaths[0],
      }).catch(err => {
        uni.showToast({
          icon: 'error',
          title: t('sendImageFailedText')
        })
      }).finally(() => {
        sendingImg.value = false
      })
    },
    //没有开启权限时，提示开启权限
    complete: handleNoPermission
  })
}

const handleSendFileMsg = () => {
  uni.chooseFile({
    count: 1,
    success: (res) => {
      store.msgStore.sendFileMsgActive({
        scene: props.scene,
        to: props.to,
        filePath: res.tempFilePaths[0],
      })
    },
  })
}

uni.$on(events.ON_REEDIT_MSG, (body: string) => {
  inputText.value = body
})
</script>

<style scoped lang="scss">
@import "../../styles/common.scss";

.msg-input-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #eff1f3;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.msg-input {
  padding: 7px;

  &-input {
    background-color: #fff;
    height: 40px;
    font-size: 16px;
    padding: 0 12px;

    &::placeholder {
      padding: 0 12px;
    }
  }
}

.msg-button-group {
  padding: 17px 20px;
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  // align-items: flex-start;
}

.msg-input-button {
  font-size: 20px;

  &:not(:last-child) {
    margin-right: 60px;
  }

  &.msg-input-loading {
    color: #337EFF;
    animation: loadingCircle 1s infinite linear;
  }
}

.msg-ext {
  height: 300px;
  overflow-y: auto;
}
</style>
