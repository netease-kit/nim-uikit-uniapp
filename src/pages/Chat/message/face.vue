<template>
  <div class="msg-face-wrapper">
    <div class="msg-face">
      <div class="msg-face-row" v-for="emojiRow, rowIndex in emojiMatrix">
        <Icon @tap="() => { props.onEmojiClick({ key, type: emojiMap[key] }) }" class="msg-face-item"
          v-for="key in emojiRow" :key="key" :type="emojiMap[key]"></Icon>
        <!-- 下面放三个看不到的 Icon 占个位 -->
        <Icon v-if="rowIndex + 1 === Math.ceil(emojiArr.length / emojiColNum)" class="msg-face-delete"
          type="icon-tuigejian"></Icon>
        <Icon v-if="rowIndex + 1 === Math.ceil(emojiArr.length / emojiColNum)" class="msg-face-delete"
          type="icon-tuigejian"></Icon>
        <Icon v-if="rowIndex + 1 === Math.ceil(emojiArr.length / emojiColNum)" class="msg-face-delete"
          type="icon-tuigejian"></Icon>
      </div>
    </div>
    <div class="msg-face-control">
      <div @tap="onEmojiDelete" class="msg-delete-btn">
        <Icon type="icon-tuigejian" class="msg-face-delete-btn" />
      </div>
      <div @tap="onEmojiSend" class="msg-send-btn">{{ $t('sendText') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { emojiMap } from '../../../utils/emoji'
import { culculateMatrix } from '../../../utils/matrix'
import Icon from '../../../components/Icon.vue';

// 七个一行
const emojiArr = Object.keys(emojiMap)
const emojiColNum = 7
const emojiMatrix = culculateMatrix(emojiArr, emojiColNum)

const props = defineProps<{
  onEmojiClick: (emoji: { key: string; type: string }) => void
  onEmojiDelete: () => void
  onEmojiSend: () => void
}>()
</script>

<style scoped lang="scss">
.msg-face-control {
  position: fixed;
  bottom: 8px;
  right: 10px;
  z-index: 8;
}

.msg-face {
  display: flex;
  flex-direction: column;
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
  background-color: #337EFF;
}

.msg-delete-btn {
  background-color: #fff;
  margin-right: 10px;
  padding: 0 16px;
}

.msg-face-delete-btn {
  font-size: 25px;
  color: #333;
}
</style>
