<template>
  <div class="wrapper">
    <span v-for="item in textArr" :key="item.key">
      <span
        v-if="item.type === 'text'"
        class="msg-reply-text"
        :style="{ fontSize: fontSize + 'px' }"
      >
        {{ item.value }}
      </span>
      <Icon
        v-else-if="item.type === 'emoji'"
        :type="EMOJI_ICON_MAP_CONFIG[item.value]"
        :size="14"
        :iconStyle="{
          margin: '3px',
          verticalAlign: 'bottom',
          display: 'inline-block',
        }"
      />
    </span>
  </div>
</template>

<script>
import Icon from './Icon.vue'
import { EMOJI_ICON_MAP_CONFIG, emojiRegExp } from '../utils/emoji'

export default {
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    fontSize: {
      type: Number,
      default: 13,
    },
  },
  data() {
    return {
      EMOJI_ICON_MAP_CONFIG,
    }
  },
  computed: {
    textArr() {
      return this.parseText(this.text)
    },
  },
  methods: {
    parseText(text) {
      if (!text) return []
      const regexEmoji = emojiRegExp
      const matches = []
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
          .forEach((item) => {
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

      return matches.sort((a, b) => a.index - b.index).map((item, index) => {
        return {
          ...item,
          key: index + item.type,
        }
      })
    },
  },
}
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
  font-size: 13px;
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
