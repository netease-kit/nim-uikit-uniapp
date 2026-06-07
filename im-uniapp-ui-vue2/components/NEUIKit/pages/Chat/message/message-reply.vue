<template>
  <div>
    <div v-if="replyMsg && replyMsg.messageClientId" class="reply-msg-wrapper">
      <!-- replyMsg 不存在 说明回复的消息被删除或者撤回 -->
      <div v-if="!isReplyMsgExist">
        <span>{{ t("replyNotFindText") }}</span>
      </div>
      <div v-else class="reply-msg" @tap="showFullReplyMsg">
        <div class="reply-msg-name-wrapper">
          <div class="reply-msg-name-line">|</div>
          <div class="reply-msg-name-content">
            <Appellation
              class="reply-msg-name-appellation"
              :account="replyMsg && replyMsg.senderId"
              :teamId="replyMsg && replyMsg.receiverId"
              color="#929299"
              :fontSize="14"
            ></Appellation>
          </div>
          <div class="reply-msg-name-to">:</div>
        </div>
        <message-one-line
          v-if="
            replyMsg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
          "
          class="reply-msg-content"
          :fontSize="14"
          :text="replyMsg.text"
        ></message-one-line>
        <div
          v-else-if="
            replyMsg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE
          "
          class="reply-msg-type-content other-msg-wrapper"
        >
          <uni-link
            v-if="!isHarmonyOs"
            :href="downloadUrl"
            :download="fileName"
            :showUnderLine="false"
          >
            {{ t("fileMsgTitleText") }}
          </uni-link>
          <span v-else @click="openInBrowser(downloadUrl)">
            {{ t("fileMsgTitleText") }}
          </span>
        </div>
        <div class="reply-msg-type-content other-msg-wrapper" v-else>
          {{ "[" + REPLY_MSG_TYPE_MAP[replyMsg.messageType] + "]" }}
        </div>
      </div>
    </div>
    <!-- 点击被回复的消息需要全屏显示 -->
    <div v-if="isFullScreen" class="reply-full-screen" @tap="closeFullReplyMsg">
      <!-- #ifdef MP -->
      <div class="reply-message-close-mp" @tap="closeFullReplyMsg">
        <Icon
          color="#929299"
          :iconStyle="{ fontWeight: '200' }"
          :size="18"
          type="icon-guanbi"
        />
      </div>
      <!-- #endif -->
      <!-- #ifndef MP -->
      <div class="reply-message-close" @tap="closeFullReplyMsg">
        <Icon
          color="#929299"
          :iconStyle="{ fontWeight: '200' }"
          :size="18"
          type="icon-guanbi"
        />
      </div>
      <!-- #endif -->
      <div
        v-if="
          replyMsg &&
          replyMsg.messageType ==
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
        "
        class="reply-message-content"
      >
        <message-text :msg="replyMsg" :fontSize="22"></message-text>
      </div>
      <div
        v-else-if="
          replyMsg &&
          replyMsg.messageType ==
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
        "
        class="msg-common"
        :style="{
          flexDirection: replyMsg.isSelf ? 'row-reverse' : 'row',
          backgroundColor: replyMsg.isSelf ? '#d6e5f6' : '#e8eaed',
          borderRadius: replyMsg.isSelf ? '8px 0px 8px 8px' : '0 8px 8px',
        }"
        @click.stop="() => {}"
      >
        <MessageAudio :msg="replyMsg" />
      </div>
    </div>
  </div>
</template>

<script>
/** 回复消息组件 */
import { t } from "../../../utils/i18n";
import MessageOneLine from "../../../components/MessageOneLine.vue";
import MessageText from "./message-text.vue";
import UniLink from "../../../components/uni-components/uni-link/components/uni-link/uni-link.vue";
import { REPLY_MSG_TYPE_MAP, events } from "../../../utils/constants";
import { isHarmonyOs, stopAllAudio } from "../../../utils";
import { autorun } from "../../../utils/store.js";
import { customNavigateTo } from "../../../utils/customNavigate";
import { V2NIMConst } from "../../../utils/nim";
import MessageAudio from "./message-audio.vue";
import Icon from "../../../components/Icon.vue";
import Appellation from "../../../components/Appellation.vue";
import { previewImageWithSave } from "../../../utils/image";

export default {
  components: {
    MessageOneLine,
    MessageText,
    UniLink,
    MessageAudio,
    Icon,
    Appellation,
  },
  props: {
    replyMsg: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      V2NIMConst,
      REPLY_MSG_TYPE_MAP,
      isHarmonyOs,
      isFullScreen: false,
      repliedTo: "",
      repliedToWatch: function () {},
    };
  },
  computed: {
    fileName() {
      return this.replyMsg?.attachment?.name || "";
    },
    downloadUrl() {
      const name = this.replyMsg?.attachment?.name || "";
      const url = this.replyMsg?.attachment?.url || "";
      if (!url) {
        return "";
      }
      return url + (url.includes("?") ? "&" : "?") + `download=${name}`;
    },
    isReplyMsgExist() {
      return this.replyMsg?.messageClientId !== "noFind";
    },
  },
  mounted() {
    this.repliedTo = uni.$UIKitStore.uiStore.getAppellation({
      account: this.replyMsg?.senderId || "",
      teamId: this.replyMsg?.receiverId,
    });

    this.repliedToWatch = autorun(() => {
      this.repliedTo = uni.$UIKitStore.uiStore.getAppellation({
        account: this.replyMsg?.senderId || "",
        teamId: this.replyMsg?.receiverId,
      });
    });
  },
  beforeDestroy() {
    this.repliedToWatch();
  },
  methods: {
    t,
    showFullReplyMsg() {
      if (
        this.replyMsg?.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE
      ) {
        previewImageWithSave(this.replyMsg?.attachment?.url);
      } else if (
        this.replyMsg?.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
      ) {
        this.isFullScreen = true;
        uni.$emit(events.HANDLE_MOVE_THROUGH, true);
      } else if (
        this.replyMsg?.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO
      ) {
        const url = this.replyMsg?.attachment?.url;
        stopAllAudio();
        if (url) {
          const { width, height } = this.replyMsg?.attachment || {};
          customNavigateTo({
            url: `/pages/Chat/video-play?videoUrl=${encodeURIComponent(url)}&width=${width || ""}&height=${height || ""}`,
          });
        }
      } else if (
        this.replyMsg?.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
      ) {
        this.isFullScreen = true;
      }
    },
    closeFullReplyMsg() {
      this.isFullScreen = false;
      stopAllAudio();
      uni.$emit(events.HANDLE_MOVE_THROUGH, false);
    },
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
.reply-msg-wrapper {
  display: flex;
  align-items: center;
  color: #929299;
  font-size: 14px;
  white-space: nowrap;

  .reply-msg {
    display: flex;
    align-items: center;
    width: 100%;
    min-width: 0;
  }
  .reply-msg-name-wrapper {
    margin-right: 5px;
    max-width: 125px;
    flex: 0 1 auto;
    display: flex;
    min-width: 0;
    white-space: nowrap;
  }
  .reply-msg-name-line {
    flex: 0 0 auto;
    margin-right: 2px;
  }
  .reply-msg-name-to {
    flex: 0 0 auto;
  }
  .reply-msg-name-content {
    flex: 0 1 auto;
    min-width: 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .reply-msg-content {
    flex: 1;
    min-width: 0;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .reply-msg-type-content {
    flex: 0 0 auto;
    font-size: 14px;
    line-height: 18px;
    white-space: nowrap;
  }
  .other-msg-wrapper {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    overflow: visible;
    white-space: nowrap;
  }
  .reply-msg-name-appellation {
    display: block;
    max-width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.reply-full-screen {
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  height: 100vh;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  justify-content: center;
  touch-action: none;
  z-index: 999999999;
  box-sizing: border-box;
}

.reply-message-content {
  height: 85vh;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 30px 30px 100px 30px;
  touch-action: none;
  display: flex;
  align-items: center;
}
.reply-message-close {
  position: fixed;
  right: 20px;
  z-index: 999999;
  top: 60px;
}

.reply-message-close-mp {
  position: fixed;
  right: 20px;
  top: 100px;
  z-index: 999999;
}

.msg-common {
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  max-width: 380rpx;
  overflow: hidden;
  padding: 16px 20px;
}
</style>
