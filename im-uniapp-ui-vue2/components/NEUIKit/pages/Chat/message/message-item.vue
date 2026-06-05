<template>
  <div
    :class="
      'msg-item-wrapper ' +
      (msg.pinState &&
      !(
        msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
        msg.timeValue !== undefined
      ) &&
      !msg.recallType
        ? 'msg-pin'
        : '')
    "
    :id="MSG_ID_FLAG + msg.messageClientId"
  >
    <!-- 消息时间 -->
    <div
      class="msg-time"
      v-if="
        msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
        msg.timeValue !== undefined
      "
    >
      {{ msg.timeValue }}
    </div>
    <!-- 撤回消息 可重新编辑 -->
    <div
      class="msg-common"
      :style="{
        flexDirection: !msg.isSelf ? 'row' : 'row-reverse',
      }"
      v-else-if="
        msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
        msg.recallType === 'reCallMsg' &&
        msg.canEdit
      "
    >
      <Avatar
        :account="msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="true"
      />
      <MessageBubble :msg="msg" :bg-visible="true">
        {{ t("recall2") }}
        <text
          class="msg-recall-btn"
          @tap="
            () => {
              handleReeditMsg(msg);
            }
          "
        >
          {{ t("reeditText") }}
        </text>
      </MessageBubble>
    </div>
    <!-- 撤回消息 不可重新编辑 主动撤回 -->
    <div
      class="msg-common"
      :style="{ flexDirection: !msg.isSelf ? 'row' : 'row-reverse' }"
      v-else-if="
        msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
        msg.recallType === 'reCallMsg' &&
        !msg.canEdit
      "
    >
      <Avatar
        :account="msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="true"
      />
      <MessageBubble :msg="msg" :bg-visible="true">
        <div class="recall-text">{{ t("you") + t("recall") }}</div>
      </MessageBubble>
    </div>
    <!-- 撤回消息 对方撤回-->
    <div
      class="msg-common"
      :style="{ flexDirection: !msg.isSelf ? 'row' : 'row-reverse' }"
      v-else-if="
        msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
        msg.recallType === 'beReCallMsg'
      "
    >
      <Avatar
        :account="msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!msg.isSelf">
          {{ appellation }}
        </div>
        <div :class="msg.isSelf ? 'self-msg-recall' : 'msg-recall'">
          <text class="msg-recall2">
            {{ !msg.isSelf ? t("recall2") : t("you") + t("recall") }}
          </text>
        </div>
      </div>
    </div>
    <!-- 文本消息-->
    <div
      class="msg-common"
      v-else-if="
        msg.messageType === V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
      "
      :style="{ flexDirection: !msg.isSelf ? 'row' : 'row-reverse' }"
    >
      <Avatar
        :account="msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble :msg="msg" :tooltip-visible="true" :bg-visible="true">
          <ReplyMessage v-if="!!replyMsg" :replyMsg="replyMsg"></ReplyMessage>
          <MessageText :msg="msg"></MessageText>
        </MessageBubble>
      </div>
      <MessageIsRead v-if="msg.isSelf" :msg="msg"></MessageIsRead>
    </div>
    <!-- 图片消息-->
    <div
      class="msg-common"
      v-else-if="
        msg.messageType === V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE
      "
      :style="{ flexDirection: !msg.isSelf ? 'row' : 'row-reverse' }"
    >
      <Avatar
        :account="msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble
          :msg="msg"
          :tooltip-visible="true"
          :bg-visible="true"
          style="cursor: pointer"
        >
          <div
            @tap="
              () => {
                handleImageTouch(msg.attachment && msg.attachment.url);
              }
            "
          >
            <image
              class="msg-image"
              :lazy-load="true"
              mode="aspectFill"
              :src="imageUrl"
            ></image>
          </div>
        </MessageBubble>
      </div>
      <MessageIsRead v-if="msg.isSelf" :msg="msg"></MessageIsRead>
    </div>
    <!-- 视频消息-->
    <div
      class="msg-common"
      v-else-if="
        msg.messageType === V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO
      "
      :style="{ flexDirection: !msg.isSelf ? 'row' : 'row-reverse' }"
    >
      <Avatar
        :account="msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble
          :msg="msg"
          :tooltip-visible="true"
          :bg-visible="true"
          style="cursor: pointer"
        >
          <div class="video-msg-wrapper" @tap="() => handleVideoTouch(msg)">
            <div class="video-play-button">
              <div class="video-play-icon"></div>
            </div>
            <image
              class="msg-image"
              :lazy-load="true"
              mode="aspectFill"
              :src="videoFirstFrameDataUrl"
            ></image>
          </div>
        </MessageBubble>
      </div>
      <MessageIsRead v-if="msg.isSelf" :msg="msg"></MessageIsRead>
    </div>
    <!-- 音视频消息-->
    <div
      class="msg-common"
      v-else-if="
        msg.messageType === V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
      "
      :style="{ flexDirection: !msg.isSelf ? 'row' : 'row-reverse' }"
    >
      <Avatar
        :account="msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble :msg="msg" :tooltip-visible="true" :bg-visible="true">
          <MessageG2 :msg="msg" />
        </MessageBubble>
      </div>
    </div>
    <!-- 文件消息-->
    <div
      class="msg-common"
      v-else-if="
        msg.messageType === V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE
      "
      :style="{ flexDirection: !msg.isSelf ? 'row' : 'row-reverse' }"
    >
      <Avatar
        :account="msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble :msg="msg" :tooltip-visible="true" :bg-visible="false">
          <MessageFile :msg="msg" />
        </MessageBubble>
      </div>
      <MessageIsRead v-if="msg.isSelf" :msg="msg"></MessageIsRead>
    </div>
    <!-- 语音消息-->
    <div
      class="msg-common"
      v-else-if="
        msg.messageType === V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
      "
      :style="{
        flexDirection: !msg.isSelf ? 'row' : 'row-reverse',
      }"
    >
      <Avatar
        :account="msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble
          :msg="msg"
          :tooltip-visible="true"
          :bg-visible="true"
          style="cursor: pointer"
        >
          <MessageAudio
            :msg="msg"
            :broadcastNewAudioSrc="broadcastNewAudioSrc"
          />
        </MessageBubble>
      </div>
      <MessageIsRead v-if="msg.isSelf" :msg="msg"></MessageIsRead>
    </div>
    <!-- 通知消息-->
    <MessageNotification
      v-else-if="
        msg.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION
      "
      :msg="msg"
    />
    <div
      class="msg-common"
      :style="{ flexDirection: !msg.isSelf ? 'row' : 'row-reverse' }"
      v-else
    >
      <Avatar
        :account="msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble :msg="msg" :tooltip-visible="true" :bg-visible="true">
          [{{ t("unknowMsgText") }}]
        </MessageBubble>
      </div>
    </div>
    <!-- 消息标记 不展示 pinState 为 0 、时间消息以及撤回消息的标记样式 -->
    <div
      class="msg-pin-tip"
      v-if="
        msg.pinState &&
        !(
          msg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
          msg.timeValue !== undefined
        ) &&
        !msg.recallType
      "
      :style="{ justifyContent: !msg.isSelf ? 'flex-start' : 'flex-end' }"
    >
      <Icon :size="11" type="icon-green-pin"></Icon>&nbsp;<span
        v-if="msg.operatorId === accountId"
        >{{ t("you") }}</span
      >
      <Appellation
        v-else
        :account="msg.operatorId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        color="#3EAF96"
        fontSize="11"
      ></Appellation
      >&nbsp;{{ t("pinThisText") }}
    </div>
  </div>
</template>

<script>
/** 消息组件 */
import Avatar from "../../../components/Avatar.vue";
import MessageBubble from "./message-bubble.vue";
import ReplyMessage from "./message-reply.vue";
import MessageFile from "./message-file.vue";
import MessageText from "./message-text.vue";
import MessageAudio from "./message-audio.vue";
import MessageNotification from "./message-notification.vue";
import MessageG2 from "./message-g2.vue";
import { customNavigateTo } from "../../../utils/customNavigate";
import MessageIsRead from "./message-read.vue";
import Icon from "../../../components/Icon.vue";
import Appellation from "../../../components/Appellation.vue";
import { events, MSG_ID_FLAG } from "../../../utils/constants";
import { autorun } from "../../../utils/store.js";
import { stopAllAudio } from "../../../utils";
import { t } from "../../../utils/i18n";
import { V2NIMConst } from "../../../utils/nim";
import { previewImageWithSave } from "../../../utils/image";

export default {
  components: {
    Avatar,
    MessageBubble,
    ReplyMessage,
    MessageFile,
    MessageText,
    MessageAudio,
    MessageNotification,
    MessageG2,
    MessageIsRead,
    Icon,
    Appellation,
  },
  props: {
    msg: {
      type: Object,
      default: () => ({}),
    },
    index: {
      type: Number,
      default: 0,
    },
    replyMsgsMap: {
      type: Object,
      default: () => ({}),
    },
    broadcastNewAudioSrc: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      V2NIMConst,
      MSG_ID_FLAG,
      appellation: "",
      accountId: uni.$UIKitStore?.userStore?.myUserInfo.accountId,
      disposeAppellationWatch: function () {},
    };
  },
  computed: {
    replyMsg() {
      return this.replyMsgsMap && this.replyMsgsMap[this.msg.messageClientId];
    },
    conversationType() {
      return uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(
        this.msg.conversationId,
      );
    },
    to() {
      return uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationTargetId(
        this.msg.conversationId,
      );
    },
    videoFirstFrameDataUrl() {
      const url = this.msg.attachment?.url;
      return url ? `${url}${url.includes("?") ? "&" : "?"}vframe&offset=1` : "";
    },
    imageUrl() {
      if (this.msg.messageStatus?.errorCode == 102426) {
        return "https://yx-web-nosdn.netease.im/common/c1f278b963b18667ecba4ee9a6e68047/img-fail.png";
      }

      if (this.msg.messageStatus?.errorCode == 104404) {
        return "https://yx-web-nosdn.netease.im/common/c1f278b963b18667ecba4ee9a6e68047/img-fail.png";
      }

      return this.msg?.attachment?.url || this.msg.attachment?.file;
    },
  },
  created() {
    this.disposeAppellationWatch = autorun(() => {
      this.appellation = uni.$UIKitStore.uiStore.getAppellation({
        account: this.msg.senderId,
        teamId:
          this.conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? this.to
            : "",
      });
    });
  },
  beforeDestroy() {
    this.disposeAppellationWatch();
  },
  methods: {
    t,
    handleImageTouch(url) {
      previewImageWithSave(url);
    },
    handleVideoTouch(msg) {
      stopAllAudio();
      const url = msg.attachment?.url;
      if (url) {
        const { width, height } = msg.attachment || {};
        customNavigateTo({
          url: `/pages/Chat/video-play?videoUrl=${encodeURIComponent(url)}&width=${width || ""}&height=${height || ""}`,
        });
      }
    },
    handleReeditMsg(msg) {
      uni.$emit(events.ON_REEDIT_MSG, msg);
    },
  },
};
</script>

<style scoped lang="scss">
.msg-item-wrapper {
  padding: 0 15px 15px;
}

.msg-common {
  padding-top: 8px;
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  message-is-read {
    align-self: flex-end;
  }
}
.msg-pin {
  opacity: 1;
  background: #fffbea;
}
.msg-pin-tip {
  font-size: 11px;
  font-weight: normal;
  color: #3eaf96;
  margin: 8px 50px 0 50px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
}

.msg-content {
  display: flex;
  flex-direction: column;
}

.msg-name {
  font-size: 12px;
  color: #999;
  text-align: left;
  margin-bottom: 4px;
  max-width: 300rpx;
  padding-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.msg-image {
  max-width: 100%;
}

.msg-time {
  margin-top: 8px;
  text-align: center;
  color: #b3b7bc;
  font-size: 12px;
}

.msg-recall-btn {
  margin-left: 5px;
  color: #1861df;
}

.msg-recall2 {
  font-size: 16px;
}

.self-msg-recall {
  max-width: 380rpx;
  overflow: hidden;
  padding: 12px 16px;
  border-radius: 8px 0px 8px 8px;
  margin-right: 8px;
  background-color: #d6e5f6;
  color: #666666;
}

.msg-recall {
  max-width: 380rpx;
  overflow: hidden;
  padding: 12px 16px;
  border-radius: 0px 8px 8px 8px;
  margin-left: 8px;
  background-color: #e8eaed;
  color: #666666;
}

.recall-text {
  color: #666666;
}

.video-play-button {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  z-index: 9;
}

.video-play-icon {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 18px solid #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
}

.video-msg-wrapper {
  box-sizing: border-box;
  max-width: 380rpx;
}
</style>
