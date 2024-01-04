<template>
  <div class="msg-text" :style="{fontSize: (fontSize || 16) + 'px'}">
    <template v-for="item in textArr">
      <template v-if="item.type === 'text'">
        <text class="msg-text" v-text="item.value"></text>
      </template>
      <template v-else-if="item.type === 'Ait'">
        <text class="msg-text" :style="{ color: '#1861df' }">
          {{' ' +  item.value }}
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
import UniLink from '../../../uni_modules/uni-link/components/uni-link/uni-link.vue'
import { parseText } from '../../../utils/parseText'
import { emojiMap } from '../../../utils/emoji'
import type { IMMessage } from '@xkit-yx/im-store';
const props = defineProps<{
  msg: IMMessage
  fontSize?: number
}>()
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
