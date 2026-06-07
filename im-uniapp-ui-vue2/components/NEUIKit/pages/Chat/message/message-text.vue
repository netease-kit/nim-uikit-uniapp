<template>
  <div class="msg-text" :style="{ fontSize: (fontSize || 16) + 'px' }">
    <template v-for="item in textArr">
      <span v-if="item.type === 'text'" :key="item.key" class="msg-text">{{
        item.value
      }}</span>
      <text
        v-else-if="item.type === 'Ait'"
        :key="item.key"
        class="msg-text"
        :style="{ color: '#1861df' }"
      >
        {{ " " + item.value + " " }}
      </text>
      <Icon
        v-else-if="item.type === 'emoji'"
        :key="item.key"
        :type="EMOJI_ICON_MAP_CONFIG[item.value]"
        :size="fontSize || 22"
        :style="{ margin: '0 2px 2px 2px', verticalAlign: 'bottom' }"
      />
      <UniLink
        v-else-if="item.type === 'link' && !isHarmonyOs"
        :key="item.key"
        :href="item.value"
        :style="{ color: '#1861df', fontSize: (fontSize || 16) + 'px' }"
        :showUnderLine="false"
      >
        {{ item.value }}
      </UniLink>
      <span
        v-else-if="item.type === 'link'"
        :key="item.harmonyKey"
        :style="{ color: '#1861df', fontSize: (fontSize || 16) + 'px' }"
        @click="openInBrowser(item.value)"
      >
        {{ item.value }}
      </span>
    </template>
  </div>
</template>

<script>
/**文本消息组件 */
import Icon from "../../../components/Icon.vue";
import UniLink from "../../../components/uni-components/uni-link/components/uni-link/uni-link.vue";
import { parseText } from "../../../utils/parseText";
import { EMOJI_ICON_MAP_CONFIG } from "../../../utils/emoji";
import { t } from "../../../utils/i18n";
import { isHarmonyOs } from "../../../utils/index";

export default {
  components: {
    Icon,
    UniLink,
  },
  props: {
    msg: {
      type: Object,
      default: () => ({}),
    },
    fontSize: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      EMOJI_ICON_MAP_CONFIG,
      isHarmonyOs,
    };
  },
  computed: {
    textArr() {
      return parseText(this.msg?.text || "", this.msg?.serverExtension);
    },
  },
  methods: {
    openInBrowser(url) {
      uni.setClipboardData({
        data: url,
        showToast: false,
        success: () => {
          uni.showToast({
            title: t("openUrlText"),
            icon: "none",
          });
        },
      });
    },
  },
};
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
