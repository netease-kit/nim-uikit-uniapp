<template>
  <div class="wrapper">
    <template v-if="isMergedForward">[{{ t('chatHistoryText') }}]</template>
    <template v-else v-for="item in textArr" :key="item.key">
      <template v-if="item.type === 'text'" class="msg-reply-text">
        {{ item.value }}
      </template>
      <template class="icon" v-else-if="item.type === 'emoji'">
        <Icon
          :type="EMOJI_ICON_MAP_CONFIG[item.value]"
          :size="14"
          :iconStyle="{
            margin: '3px',
            verticalAlign: 'bottom',
            display: 'inline-block',
          }"
        />
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Icon from './Icon.vue'
import { EMOJI_ICON_MAP_CONFIG, emojiRegExp } from '../utils/emoji'
import { computed, withDefaults } from 'vue'
import { t } from '../utils/i18n'
import type { V2NIMMessageForUI } from '../utils/module/im-store-v2/types/src'
import { parseMergedForwardPayload } from '../utils/mergedForward'

const props = withDefaults(
  defineProps<{ text?: string; msg?: V2NIMMessageForUI }>(),
  { text: '' }
)

// 筛选出文本和表情
const parseText = (text: string) => {
  if (!text) return []
  const regexEmoji = emojiRegExp
  const matches: {
    type: 'emoji' | 'text'
    value: string
    index: number
  }[] = []
  let match

  while ((match = regexEmoji.exec(text)) !== null) {
    matches.push({
      type: 'emoji',
      value: match[0],
      index: match.index,
    })
    const fillText = ' '.repeat(match[0].length)
    text = text.replace(match[0], fillText)
  }

  text = text.replace(regexEmoji, ' ')

  if (text) {
    text
      .split(' ')
      .filter((item) => item.trim())
      .map((item) => {
        const index = text?.indexOf(item)
        matches.push({
          type: 'text',
          value: item,
          index,
        })
        const fillText = ' '.repeat(item.length)
        text = text.replace(item, fillText)
      })
  }

  return matches
    .sort((a, b) => a.index - b.index)
    .map((item, index) => {
      return {
        ...item,
        key: index + item.type,
      }
    })
}

const textArr = computed(() => {
  return parseText(props.text)
})

const isMergedForward = computed(() =>
  Boolean(props.msg && parseMergedForwardPayload(props.msg))
)
</script>

<style lang="scss" scoped>
.wrapper {
  flex: 1;
  font-size: 13px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.msg-reply-text {
  font-size: 13px !important;
  height: 18px;
  line-height: 18px;
  width: 100%;
  display: inline;
}
.ellipsis {
  display: inline-block;
  flex-basis: 25px;
  font-size: 13px;
}
</style>
