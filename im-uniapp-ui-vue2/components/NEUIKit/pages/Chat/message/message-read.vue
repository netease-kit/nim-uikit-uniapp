<template>
  <div
    v-if="
      msg.sendingState ==
      V2NIMConst.V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED
    "
    class="msg-read-wrapper"
  >
    <div
      v-if="
        conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P &&
        p2pMsgReceiptVisible
      "
    >
      <div v-if="p2pMsgRotateDeg == 360" class="icon-read-wrapper">
        <Icon type="icon-read" :size="18"></Icon>
      </div>
      <div v-else class="sector">
        <span
          class="cover-1"
          :style="{ transform: 'rotate(' + p2pMsgRotateDeg + 'deg)' }"
        ></span>
        <span
          :class="p2pMsgRotateDeg >= 180 ? 'cover-2 cover-3' : 'cover-2'"
        ></span>
      </div>
    </div>
    <div
      v-if="
        conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM &&
        teamManagerVisible
      "
    >
      <div class="icon-read-wrapper" v-if="teamMsgRotateDeg == 360">
        <Icon type="icon-read" :size="18"></Icon>
      </div>
      <div v-else class="sector" @click="jumpToTeamMsgReadInfo">
        <span
          class="cover-1"
          :style="{ transform: 'rotate(' + teamMsgRotateDeg + 'deg)' }"
        ></span>
        <span
          :class="teamMsgRotateDeg >= 180 ? 'cover-2 cover-3' : 'cover-2'"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
/** 消息已读未读组件 */

import Icon from "../../../components/Icon.vue";
import { V2NIMConst } from "../../../utils/nim";
import { customNavigateTo } from "../../../utils/customNavigate";
import { t } from "../../../utils/i18n";
import { autorun } from "../../../utils/store.js";

export default {
  components: {
    Icon,
  },
  props: {
    msg: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      V2NIMConst,
      teamManagerVisible: uni.$UIKitStore.localOptions.teamMsgReceiptVisible,
      p2pMsgReceiptVisible: uni.$UIKitStore.localOptions.p2pMsgReceiptVisible,
      p2pMsgRotateDeg: 0,
      enableV2CloudConversation:
        uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation,
      disposeP2pMsgReadWatch: function () {},
    };
  },
  computed: {
    conversationType() {
      return uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(
        this.msg.conversationId,
      );
    },
    teamMsgRotateDeg() {
      if (
        this.conversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
      ) {
        const percentage =
          (this.msg?.yxRead || 0) /
            ((this.msg?.yxUnread || 0) + (this.msg?.yxRead || 0)) || 0;
        return percentage * 360;
      }
      return 0;
    },
  },
  created() {
    this.setP2pMsgRotateDeg();
    this.disposeP2pMsgReadWatch = autorun(() => {
      this.setP2pMsgRotateDeg();
    });
  },
  beforeDestroy() {
    this.disposeP2pMsgReadWatch();
  },
  methods: {
    setP2pMsgRotateDeg() {
      if (
        this.conversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
      ) {
        const conversation = this.enableV2CloudConversation
          ? uni.$UIKitStore.conversationStore?.conversations.get(
              this.msg.conversationId,
            )
          : uni.$UIKitStore.localConversationStore?.conversations.get(
              this.msg.conversationId,
            );

        this.p2pMsgRotateDeg =
          this.msg?.createTime <= (conversation?.msgReceiptTime || 0) ? 360 : 0;
      }
    },
    jumpToTeamMsgReadInfo() {
      if (
        uni.$UIKitStore.connectStore.connectStatus !==
        V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED
      ) {
        uni.showToast({
          title: t("offlineText"),
          icon: "none",
        });
        return;
      }
      if (this.msg?.messageClientId && this.msg?.conversationId) {
        customNavigateTo({
          url: `/pages/Chat/message-read-info?messageClientId=${this.msg.messageClientId}&conversationId=${this.msg.conversationId}`,
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.msg-read-wrapper {
  align-self: flex-end;
}
.icon-read-wrapper {
  margin: 0px 10px 5px 0;
}
.sector {
  display: inline-block;
  position: relative;
  overflow: hidden;
  border: 1.5px solid #4c84ff;
  width: 14px;
  height: 14px;
  background-color: #eeeeee;
  border-radius: 50%;
  margin: 0px 10px 0 0;

  .cover-1,
  .cover-2 {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    background-color: #eeeeee;
  }

  .cover-1 {
    background-color: #4c84ff;
    transform-origin: right;
  }

  .cover-3 {
    right: 0;
    background-color: #4c84ff;
  }
}
</style>
