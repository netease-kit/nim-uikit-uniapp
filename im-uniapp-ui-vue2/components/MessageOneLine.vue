<template>
  <!-- 回复消息时，被回复的消息需要在一行展示，超出显示省略号, 需要适配表情和文字 -->
  <div>
    <div class="wrapper">
    <template v-for="item in textArr">
      <template v-if="item.type === 'text'">
        <div class="msg-reply-text">{{ item.value }}</div>
      </template>
      <template v-else-if="item.type === 'emoji'">
       <div class="icon">
         <Icon
          :type="emojiMap[item.value]"
          :size="14"
          :style="{ margin: '3px', verticalAlign: 'bottom' }"
        />
       </div>
      </template>
    </template>
  </div>
  <div class="ellipsis" v-if="text.length > 15 ">...</div>
  </div>
</template>

<script lang="ts" setup> 
import Icon from './Icon.vue'
import { emojiMap, emojiRegExp } from '../utils/emoji'
import { ref, computed } from '../utils/transformVue';

const props = defineProps({
  text: {
    type: String,
    default: '',
    required: true
  }
})

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
    text.split(' ').filter(item => item.trim()).map((item) => {
      const index = text.indexOf(item)
      matches.push({
        type: 'text',
        value: item,
        index,
      })
      const fillText = ' '.repeat(item.length)
      text = text.replace(item, fillText)
    })
  }

  return matches.sort((a, b) => a.index - b.index)
}

const textArr = computed(() => {
  return parseText(props.text)
})

</script>

<style lang="scss" scoped>
.wrapper{
  display: inline-flex;
  font-size: 13px;
  flex-wrap: nowrap;
  overflow: hidden;
  align-items: center;
  max-width: 125px;
  box-sizing: border-box;
}

.msg-reply-text{
  font-size: 13px!important;
  height: 18px;
  line-height: 18px;
  width: fit-content;
}
.ellipsis{
  display: inline-block;
  flex-basis: 25px;
  font-size: 13px;
}
</style>
