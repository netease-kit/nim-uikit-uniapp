<template>
  <div class="msg-face-wrapper">
    <div class="msg-face">
      <div class="msg-face-row" v-for="(emojiRow, rowIndex) in emojiMatrix">
        <div
          @tap.stop="
            () => {
              handleEmojiClick({ key, type: emojiMap[key] })
            }
          "
          v-for="key in emojiRow"
          :key="key"
          class="msg-face-item"
        >
          <Icon :size="27" :type="emojiMap[key]"></Icon>
        </div>
        <!-- 下面放三个看不到的 Icon 占个位 -->
        <Icon
          v-if="rowIndex + 1 === Math.ceil(emojiArr.length / emojiColNum)"
          class="msg-face-delete"
          :size="27"
          type="icon-tuigejian"
        ></Icon>
        <Icon
          v-if="rowIndex + 1 === Math.ceil(emojiArr.length / emojiColNum)"
          class="msg-face-delete"
          :size="27"
          type="icon-tuigejian"
        ></Icon>
        <Icon
          v-if="rowIndex + 1 === Math.ceil(emojiArr.length / emojiColNum)"
          class="msg-face-delete"
          :size="27"
          type="icon-tuigejian"
        ></Icon>
      </div>
    </div>
    <div class="emoji-block"></div>
    <div class="msg-face-control">
      <div @tap="handleEmojiDelete" class="msg-delete-btn">
        <Icon type="icon-tuigejian" :size="25" :color="'#333'" />
      </div>
      <div @tap="handleEmojiSend" class="msg-send-btn">{{ t('sendText') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { emojiMap } from '../../../utils/emoji'
import { culculateMatrix } from '../../../utils/matrix'
import Icon from '../../../components/Icon.vue'
import { t } from '../../../utils/i18n'
// 七个一行
const emojiArr = Object.keys(emojiMap)
const emojiColNum = 7
const emojiMatrix = culculateMatrix(emojiArr, emojiColNum)

const emit = defineEmits(['emojiClick', 'emojiSend', 'emojiDelete'])

const handleEmojiClick = (emoji: any) => {
  emit('emojiClick', emoji)
}

const handleEmojiDelete = () => {
  emit('emojiDelete')
}

const handleEmojiSend = () => {
  emit('emojiSend')
}
</script>

<style scoped lang="scss">
.msg-face-wrapper {
  box-sizing: border-box;
}
.msg-face-control {
  position: fixed;
  bottom: 8px;
  right: 10px;
  z-index: 8;
}

.emoji-block {
  width: 100%;
  height: 40px;
  background-color: transparent;
}

.msg-face {
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  // flex-wrap: wrap;

  &-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px 12px;

    &:last-child {
      flex-basis: 57.14%;
    }
  }

  &-item {
    font-size: 27px;
  }

  &-delete {
    font-size: 27px;
    visibility: hidden;
  }
}

.msg-face-control {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.msg-send-btn {
  padding: 6px 16px;
  color: #fff;
  background-color: #337eff;
}

.msg-delete-btn {
  background-color: #fff;
  margin-right: 10px;
  padding: 0 16px;
}
</style>
