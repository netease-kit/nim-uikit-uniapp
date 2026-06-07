<template>
  <div class="msg-list-wrapper" @touchstart="handleTapMessageList">
    <scroll-view
      id="message-scroll-list"
      scroll-y="true"
      :scroll-top="scrollTop"
      class="message-scroll-list"
    >
      <!-- 查看更多 -->
      <div v-show="!noMore" @click="onLoadMore" class="view-more-text">
        {{ t("viewMoreText") }}
      </div>
      <view class="msg-tip" v-show="noMore">{{ t("noMoreText") }}</view>
      <div v-for="(item, index) in finalMsgs" :key="item.renderKey">
        <MessageItem
          :msg="item"
          :index="index"
          :key="item.renderKey"
          :reply-msgs-map="replyMsgsMap"
          :broadcastNewAudioSrc="broadcastNewAudioSrc"
        >
        </MessageItem>
      </div>
      <div v-if="isAndroid" class="message-input-placeholder"></div>
    </scroll-view>
  </div>
</template>

<script>
/** 消息列表组件 */

import MessageItem from "./message-item.vue";
import { events } from "../../../utils/constants";
import { caculateTimeago } from "../../../utils/date";
import { t } from "../../../utils/i18n";
import { V2NIMConst } from "../../../utils/nim";

export default {
  components: {
    MessageItem,
  },
  props: {
    msgs: {
      type: Array,
      default: () => [],
    },
    conversationType: {
      type: [Number, String],
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    loadingMore: {
      type: Boolean,
      default: false,
    },
    noMore: {
      type: Boolean,
      default: false,
    },
    replyMsgsMap: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      V2NIMConst,
      scrollTop: 99999,
      broadcastNewAudioSrc: "",
      isAndroid: uni.getSystemInfoSync().platform === "android",
    };
  },
  computed: {
    finalMsgs() {
      const res = [];
      this.msgs.forEach((item, index) => {
        if (
          index > 0 &&
          item.createTime - this.msgs[index - 1].createTime > 5 * 60 * 1000
        ) {
          res.push({
            ...item,
            messageClientId: "time-" + item.createTime,
            messageType: V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM,
            sendingState:
              V2NIMConst.V2NIMMessageSendingState
                .V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED,
            timeValue: caculateTimeago(item.createTime),
            renderKey: `time-${item.messageClientId || item.createTime}`,
          });
        }
        res.push({
          ...item,
          renderKey: item.messageClientId || `${item.createTime}-${index}`,
        });
      });

      return res;
    },
  },
  created() {
    if (
      this.conversationType ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
    ) {
      const team = uni.$UIKitStore.teamStore.teams.get(this.to);
      uni.$UIKitStore.teamMemberStore.getTeamMemberActive({
        teamId: this.to,
        queryOption: {
          limit: Math.max(team?.memberLimit || 0, 200),
          roleQueryType: 0,
        },
      });
    }

    uni.$on(events.AUDIO_URL_CHANGE, this.handleAudioUrlChange);
    uni.$on(events.ON_SCROLL_BOTTOM, this.scrollToBottom);
    uni.$on(events.ON_LOAD_MORE, this.handleLoadMoreEvent);
  },
  beforeDestroy() {
    uni.$off(events.ON_SCROLL_BOTTOM, this.scrollToBottom);
    uni.$off(events.ON_LOAD_MORE, this.handleLoadMoreEvent);
    uni.$off(events.AUDIO_URL_CHANGE, this.handleAudioUrlChange);
  },
  methods: {
    t,
    handleAudioUrlChange(url) {
      this.broadcastNewAudioSrc = url;
    },
    scrollToBottom(options = {}) {
      if (options && options.singleScroll) {
        this.$nextTick(() => {
          this.scrollTop += 9999999;
        });
        return;
      }
      this.scrollTop += 9999999;
      const timer = setTimeout(() => {
        this.scrollTop += 1;
        clearTimeout(timer);
      }, 300);
    },
    getFirstHistoryMsg() {
      return this.finalMsgs.filter(
        (item) =>
          !(
            item.messageType ===
              V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
            ["beReCallMsg", "reCallMsg"].includes(item.recallType || "")
          ),
      )[0];
    },
    handleLoadMoreEvent() {
      const msg = this.getFirstHistoryMsg();
      if (msg) {
        uni.$emit(events.GET_HISTORY_MSG, msg);
      }
    },
    onLoadMore() {
      const msg = this.getFirstHistoryMsg();
      uni.$emit(events.GET_HISTORY_MSG, msg);
    },
    handleTapMessageList() {
      uni.$emit(events.CLOSE_PANEL);
      setTimeout(() => {
        uni.$emit(events.CLOSE_PANEL);
      }, 300);
    },
  },
};
</script>

<style scoped lang="scss">
.msg-list-wrapper {
  flex: 1;
  overflow: hidden;
  display: flex;
  height: 100%;
  box-sizing: border-box;
  padding: 16px 0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.msg-tip {
  text-align: center;
  color: #b3b7bc;
  font-size: 12px;
  margin-top: 10px;
}

.block {
  width: 100%;
  height: 40px;
}

.message-scroll-list {
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 1px;
}

.message-input-placeholder {
  height: 64px;
}

.view-more-text {
  text-align: center;
  color: #b3b7bc;
  font-size: 15px;
  margin-top: 20px;
}

page > view > message > view > message-list {
  height: 100%;
}
</style>
