<template>
  <div class="msg-text" :style="{ fontSize: (fontSize || 16) + 'px' }">
    <template v-for="item in textArr">
      <template v-if="item.type === 'text'">
        <span class="msg-text">{{ item.value }}</span>
      </template>
      <template v-else-if="item.type === 'Ait'">
        <text class="msg-text" :style="{ color: '#1861df' }">
          {{ ' ' + item.value + ' ' }}
        </text>
      </template>
      <template v-else-if="item.type === 'emoji'">
        <Icon
          :type="EMOJI_ICON_MAP_CONFIG[item.value]"
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
import { EMOJI_ICON_MAP_CONFIG } from '../../../utils/emoji'
import { V2NIMMessageForUI } from '@xkit-yx/im-store-v2/dist/types/types'
import { defineProps, withDefaults } from '../../../utils/transformVue'

const props = withDefaults(
  defineProps<{
    msg: V2NIMMessageForUI
    fontSize?: number
  }>(),
  {}
)

const textArr = parseText(props.msg?.text || '', props.msg?.serverExtension)
</script>

<style lang="scss" scoped>
.msg-text {
  color: #333;
  text-align: left;
  overflow-y: auto;
  word-break: break-all;
  word-wrap: break-word;
  white-space: break-spaces;
}
</style>
