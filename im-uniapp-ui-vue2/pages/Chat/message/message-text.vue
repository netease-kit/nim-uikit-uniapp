<template>
  <div class="msg-text" :style="{ fontSize: (fontSize || 16) + 'px' }">
    <template v-for="item in textArr">
      <template v-if="item.type === 'text'">
        <text class="msg-text" v-text="item.value"></text>
      </template>
      <template v-else-if="item.type === 'Ait'">
        <text class="msg-text" :style="{ color: '#1861df' }">
          {{ ' ' + item.value }}
        </text>
      </template>
      <template v-else-if="item.type === 'emoji'">
        <Icon
          :type="emojiMap[item.value]"
          :size="fontSize || 22"
          :style="{ margin: '0 2px 2px 2px', verticalAlign: 'bottom' }"
        />
      </template>
      <template v-else-if="item.type === 'link'">
        <UniLink
          :href="item.value"
          :style="{ color: '#1861df', fontSize: (fontSize || 16) + 'px' }"
          :showUnderLine="false"
        >
          {{ item.value }}
        </UniLink>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import Icon from '../../../components/Icon.vue'
// @ts-ignore
import UniLink from '../../../components/uni-components/uni-link/components/uni-link/uni-link.vue'
import { parseText } from '../../../utils/parseText'
import { emojiMap } from '../../../utils/emoji'
const props = defineProps({
  msg: {
    type: Object, // Assuming IMMessage is a custom object type
    required: true,
    default: () => ({
      body: '',
      ext: '',
    }),
  },
  fontSize: {
    type: Number,
    default: undefined,
  },
})
const textArr = parseText(props?.msg?.body, props?.msg?.ext)
</script>

<style lang="scss" scoped>
.msg-text {
  word-break: break-all;
  color: #333;
  text-align: left;
  overflow-y: auto;
}
</style>
