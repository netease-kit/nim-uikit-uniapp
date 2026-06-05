<template>
  <div
    :class="[
      'conversation-item-container',
      {
        'show-action-list': showMoreActions,
        'stick-on-top': conversation.stickTop,
      },
    ]"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @click="handleConversationItemClick()"
  >
    <div class="conversation-item-content">
      <div class="conversation-item-left">
        <!-- 会话Item未读数 -->
        <div class="unread" v-if="unread">
          <div class="dot" v-if="isMute"></div>
          <div class="badge" v-else>{{ unread }}</div>
        </div>
        <!-- 会话头像 -->
        <Avatar :account="to" :avatar="teamAvatar" />
        <!-- 用户在线离线状态 -->
        <div
          class="login-state-icon"
          v-if="
            loginStateVisible &&
            !isAiUser &&
            conversation.type ===
              V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P &&
            status
          "
        ></div>
        <div
          class="unlogin-state-icon"
          v-if="
            loginStateVisible &&
            !isAiUser &&
            conversation.type ===
              V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P &&
            !status
          "
        ></div>
      </div>
      <div class="conversation-item-right">
        <!-- 会话名称 -->
        <div :key="conversation.updateTime" class="conversation-item-top">
          <Appellation
            class="conversation-item-title"
            v-if="
              conversation.type ===
              V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
            "
            :account="to"
          />
          <span v-else class="conversation-item-title">
            {{ sessionName }}
          </span>
          <span class="conversation-item-time">{{ date }}</span>
        </div>
        <div class="conversation-item-desc">
          <!-- 是否有人@ -->
          <span v-if="beMentioned" class="beMentioned">
            {{ "[" + t("someoneText") + "@" + t("meText") + "]" }}
          </span>
          <!-- 会话最后一条消息是否已读 -->
          <ConversationItemIsRead
            v-if="showConversationUnread"
            :conversation="conversation"
          ></ConversationItemIsRead>
          <!-- 会话最后一条消息外露 -->
          <span
            v-if="conversation.lastMessage"
            class="conversation-item-desc-content"
          >
            <LastMsgContent :lastMessage="conversation.lastMessage" />
          </span>
          <!-- 消息免打扰 -->
          <span class="conversation-item-desc-ait">
            <Icon
              v-if="isMute"
              iconClassName="conversation-item-desc-state"
              type="icon-xiaoximiandarao"
              color="#ccc"
            />
          </span>
        </div>
      </div>
    </div>
    <!-- 消息右键操作列表 -->
    <div class="right-action-list">
      <div
        v-for="action in moreActions"
        :key="action.type"
        :class="['right-action-item', action.class]"
        @click="() => handleClick(action.type)"
      >
        {{ action.name }}
      </div>
    </div>
  </div>
</template>

<script>
/** 会话列表Item组件 */
import Avatar from "../../../components/Avatar.vue";
import Appellation from "../../../components/Appellation.vue";
import Icon from "../../../components/Icon.vue";
import { formatRecentDateTime } from "../../../utils";
import { t } from "../../../utils/i18n";
import { V2NIMConst } from "../../../utils/nim";
import ConversationItemIsRead from "./conversation-item-isRead.vue";
import LastMsgContent from "./conversation-item-last-msg-content.vue";
import { autorun } from "../../../utils/store.js";

const max = 99;

export default {
  components: {
    Avatar,
    Appellation,
    Icon,
    ConversationItemIsRead,
    LastMsgContent,
  },
  props: {
    conversation: {
      type: Object,
      default: function () {
        return {};
      },
    },
    showMoreActions: {
      type: Boolean,
      default: false,
    },
    beMentionedVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      V2NIMConst,
      loginStateVisible: uni.$UIKitStore.localOptions.loginStateVisible,
      status: false,
      isAiUser: false,
      startX: 0,
      startY: 0,
      isAiUserWatch: function () {},
      statusWatch: function () {},
    };
  },
  computed: {
    moreActions() {
      return [
        {
          name: this.conversation.stickTop
            ? t("deleteStickTopText")
            : t("addStickTopText"),
          class: "action-top",
          type: "action-top",
        },
        {
          name: t("deleteSessionText"),
          class: "action-delete",
          type: "action-delete",
        },
      ];
    },
    to() {
      return uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationTargetId(
        this.conversation.conversationId,
      );
    },
    teamAvatar() {
      if (
        this.conversation.type ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
      ) {
        return this.conversation.avatar || "";
      }
      return "";
    },
    sessionName() {
      if (this.conversation.name) {
        return this.conversation.name;
      }
      return this.conversation.conversationId;
    },
    date() {
      const time =
        this.conversation.lastMessage?.messageRefer?.createTime ||
        this.conversation.updateTime;
      if (!time) {
        return "";
      }
      return formatRecentDateTime(time, {
        other: "YYYY-MM-DD",
      });
    },
    unread() {
      return this.conversation.unreadCount > 0
        ? this.conversation.unreadCount > max
          ? `${max}+`
          : this.conversation.unreadCount + ""
        : "";
    },
    isMute() {
      return !!this.conversation.mute;
    },
    beMentioned() {
      if (this.beMentionedVisible) {
        return true;
      }
      try {
        return !!this.conversation.aitMsgs?.length;
      } catch {
        return false;
      }
    },
    showConversationUnread() {
      const myUserAccountId = uni.$UIKitNIM.V2NIMLoginService.getLoginUser();
      if (
        this.conversation.type ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
      ) {
        return (
          this.conversation?.lastMessage?.messageRefer?.senderId ===
            myUserAccountId &&
          this.conversation?.lastMessage?.messageType !==
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL &&
          this.conversation?.lastMessage?.messageType !==
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION &&
          this.conversation?.lastMessage?.sendingState ===
            V2NIMConst.V2NIMMessageSendingState
              .V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED &&
          this.conversation?.lastMessage?.lastMessageState !==
            V2NIMConst.V2NIMLastMessageState.V2NIM_MESSAGE_STATUS_REVOKE
        );
      }
      return false;
    },
  },
  created() {
    this.isAiUserWatch = autorun(() => {
      this.isAiUser = uni.$UIKitStore.aiUserStore.isAIUser(this.to);
    });

    this.statusWatch = autorun(() => {
      if (
        this.conversation.type ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
      ) {
        const stateMap = uni.$UIKitStore?.subscriptionStore?.stateMap;
        if (
          stateMap.get(this.to) &&
          uni.$UIKitStore.localOptions.loginStateVisible
        ) {
          this.status =
            stateMap.get(this.to)?.statusType ===
            V2NIMConst.V2NIMUserStatusType.V2NIM_USER_STATUS_TYPE_LOGIN;
        } else {
          this.status = false;
        }
      }
    });
  },
  beforeDestroy() {
    this.isAiUserWatch();
    this.statusWatch();
  },
  methods: {
    t,
    handleClick(type) {
      if (type === "action-top") {
        this.$emit("stickyToTop", this.conversation);
      } else {
        this.$emit("delete", this.conversation);
      }
    },
    handleTouchStart(event) {
      const touch = event.changedTouches && event.changedTouches[0];
      if (!touch) {
        return;
      }
      this.startX = touch.pageX;
      this.startY = touch.pageY;
    },
    handleTouchMove(event) {
      const touch = event.changedTouches && event.changedTouches[0];
      if (!touch) {
        return;
      }
      const moveEndX = touch.pageX;
      const moveEndY = touch.pageY;
      const X = moveEndX - this.startX + 20;
      const Y = moveEndY - this.startY;
      if (Math.abs(X) > Math.abs(Y) && X > 0) {
        this.$emit("leftSlide", null);
      } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
        this.$emit("leftSlide", this.conversation);
      }
    },
    handleConversationItemClick() {
      if (this.showMoreActions) {
        this.$emit("leftSlide", null);
        return;
      }
      this.$emit("click", this.conversation);
    },
  },
};
</script>

<style lang="scss" scoped>
$cellHeight: 72px;

.conversation-item-container {
  position: relative;
  transition: transform 0.3s;

  &.show-action-list {
    transform: translateX(-200px);
  }

  &.stick-on-top {
    background: #f3f5f7;
  }

  .beMentioned {
    color: #ff4d4f;
  }

  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.right-action-list {
  position: absolute;
  top: 0;
  right: -200px;
  bottom: 0;
  width: 200px;
  white-space: nowrap;

  .right-action-item {
    width: 100px;
    display: inline-block;
    color: #fff;
    text-align: center;
    height: $cellHeight;
    line-height: $cellHeight;
  }

  .action-top {
    background: #337eff;
  }

  .action-delete {
    background: #a8abb6;
  }
}

.conversation-item-content {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  height: $cellHeight;
  box-sizing: border-box;
}

.conversation-item-left {
  position: relative;

  .conversation-item-badge {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 10;
  }
}

.conversation-item-right {
  flex: 1;
  width: 0;
  margin-left: 10px;
}

.conversation-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .conversation-item-title {
    flex: 1;
    min-width: 0;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }

  .conversation-item-time {
    font-size: 12px;
    color: #cccccc;
    text-align: right;
    min-width: 90px;
    flex-shrink: 0;
    margin-left: 8px;
    white-space: nowrap;
  }
}

.conversation-item-desc {
  font-size: 13px;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 22px;

  .conversation-item-desc-content {
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    flex: 1;
  }

  .conversation-item-desc-state {
    margin-left: 10px;
  }
}

.dot {
  background-color: #ff4d4f;
  color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 99;
}

.badge {
  background-color: #ff4d4f;
  color: #fff;
  font-size: 12px;
  min-width: 20px;
  height: 20px;
  line-height: 19px;
  border-radius: 10px;
  padding: 0 5px;
  box-sizing: border-box;
  text-align: center;
  z-index: 99;
  position: relative;
}

.unread {
  position: absolute;
  right: -4px;
  top: -2px;
  z-index: 99;
}
.conversation-item-desc-ait {
  display: inline-block;
}

.login-state-icon {
  width: 8px;
  height: 8px;
  box-sizing: content-box;
  background-color: #84ed85;
  border: 2px solid #fff;
  position: absolute;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
}

.unlogin-state-icon {
  width: 8px;
  height: 8px;
  box-sizing: content-box;
  background-color: #d4d9da;
  border: 2px solid #fff;
  position: absolute;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
}
</style>
