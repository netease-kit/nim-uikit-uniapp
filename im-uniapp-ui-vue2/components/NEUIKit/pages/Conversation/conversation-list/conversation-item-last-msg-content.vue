<template>
  <div>
    <div
      v-if="
        lastMessage.lastMessageState ===
        V2NIMConst.V2NIMLastMessageState.V2NIM_MESSAGE_STATUS_REVOKE
      "
    >
      {{ t("recall") }}
    </div>
    <div
      v-else-if="
        lastMessage.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION
      "
    >
      {{ t("conversationNotificationText") }}
    </div>
    <div
      v-else-if="
        lastMessage.sendingState ===
        V2NIMConst.V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_FAILED
      "
    >
      {{ t("conversationSendFailText") }}
    </div>

    <div
      v-else-if="
        lastMessage.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE
      "
    >
      {{ translateMsg("fileMsgText") }}
    </div>
    <div
      v-else-if="
        lastMessage.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE
      "
    >
      {{ translateMsg("imgMsgText") }}
    </div>
    <div
      v-else-if="
        lastMessage.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM
      "
    >
      {{ lastMessage.text || translateMsg("customMsgText") }}
    </div>
    <div
      v-else-if="
        lastMessage.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
      "
    >
      {{ translateMsg("audioMsgText") }}
    </div>
    <div
      v-else-if="
        lastMessage.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
      "
    >
      {{ translateMsg("callMsgText") }}
    </div>
    <div
      v-else-if="
        lastMessage.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION
      "
    >
      {{ translateMsg("geoMsgText") }}
    </div>

    <div
      v-else-if="
        lastMessage.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_ROBOT
      "
    >
      {{ translateMsg("robotMsgText") }}
    </div>
    <div
      v-else-if="
        lastMessage.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TIPS
      "
    >
      {{ translateMsg("tipMsgText") }}
    </div>
    <div
      v-else-if="
        lastMessage.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO
      "
    >
      {{ translateMsg("videoMsgText") }}
    </div>
    <div
      v-else-if="
        lastMessage.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
      "
      class="msg-conversation-text-wrap"
    >
      <template v-for="item in textArr">
        <span
          v-if="item.type === 'text'"
          :key="item.key"
          class="msg-conversation-text"
          >{{ item.value }}</span
        >
        <span
          v-else-if="item.type === 'emoji'"
          :key="item.key"
          :class="
            isWxApp
              ? 'msg-conversation-text-emoji-wx'
              : 'msg-conversation-text-emoji'
          "
        >
          <Icon :type="EMOJI_ICON_MAP_CONFIG[item.value]" :size="16" />
        </span>
      </template>
    </div>
  </div>
</template>

<script>
/** 会话列表Item 外漏消息组件 */
import Icon from "../../../components/Icon.vue";
import { V2NIMConst } from "../../../utils/nim";
import { t } from "../../../utils/i18n";
import { EMOJI_ICON_MAP_CONFIG, emojiRegExp } from "../../../utils/emoji";
import { isWxApp } from "../../../utils/index";

export default {
  components: {
    Icon,
  },
  props: {
    lastMessage: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      V2NIMConst,
      isWxApp,
      EMOJI_ICON_MAP_CONFIG,
    };
  },
  computed: {
    textArr() {
      return this.parseTextWithEmoji(this.lastMessage.text || "");
    },
  },
  methods: {
    t,
    parseTextWithEmoji(text) {
      if (!text) return [];
      const matches = [];
      let match;
      const regexEmoji = emojiRegExp;

      while ((match = regexEmoji.exec(text)) !== null) {
        matches.push({
          type: "emoji",
          value: match[0],
          index: match.index,
        });
        const fillText = " ".repeat(match[0].length);
        text = text.replace(match[0], fillText);
      }

      text = text.replace(regexEmoji, " ");

      if (text) {
        text
          .split(" ")
          .filter((item) => item.trim())
          .map((item) => {
            const index = text.indexOf(item);
            matches.push({
              type: "text",
              value: item,
              index,
            });
            const fillText = " ".repeat(item.length);
            text = text.replace(item, fillText);
          });
      }

      return matches
        .sort((a, b) => a.index - b.index)
        .map((item, index) => {
          return {
            ...item,
            key: index + item.type,
          };
        });
    },
    translateMsg(key) {
      const text =
        {
          textMsgText: t("textMsgText"),
          customMsgText: t("customMsgText"),
          audioMsgText: t("audioMsgText"),
          videoMsgText: t("videoMsgText"),
          fileMsgText: t("fileMsgText"),
          callMsgText: t("callMsgText"),
          geoMsgText: t("geoMsgText"),
          imgMsgText: t("imgMsgText"),
          notiMsgText: t("notiMsgText"),
          robotMsgText: t("robotMsgText"),
          tipMsgText: t("tipMsgText"),
          unknowMsgText: t("unknowMsgText"),
        }[key] || "";
      return `[${text}]`;
    },
  },
};
</script>

<style scoped lang="scss">
.wrapper {
  flex: 1;
  font-size: 13px;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.msg-conversation-text {
  font-size: 13px !important;
  height: 22px;
  line-height: 22px;
  width: 100%;
  display: inline;
}

.msg-conversation-text-wrap {
  width: 80%;
  line-height: 22px;
  height: 22px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  overflow: hidden;
}
.msg-conversation-text-emoji {
  display: inline-flex;
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
}

.msg-conversation-text-emoji-wx {
  display: inline-flex;
  width: 18px;
  height: 18px;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  position: relative;
  bottom: 4px;
}
</style>
