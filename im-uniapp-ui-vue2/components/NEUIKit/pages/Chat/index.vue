<template>
  <!-- 处理滚动穿透  此为官方推荐做法 https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html#%E4%BB%8B%E7%BB%8D -->
  <page-meta
    :page-style="'overflow:' + (moveThrough ? 'hidden' : 'visible')"
  ></page-meta>
  <div :class="isH5 ? 'msg-page-wrapper-h5' : 'msg-page-wrapper'">
    <NavBar :title="title" :subTitle="subTitle" :showLeft="true">
      <template v-slot:left>
        <div @click="backToConversation">
          <Icon type="icon-zuojiantou" :size="22"></Icon>
        </div>
      </template>
    </NavBar>
    <div class="msg-alert">
      <NetworkAlert />
    </div>
    <div :class="isH5 ? 'msg-wrapper-h5' : 'msg-wrapper'">
      <MessageList
        :conversationType="conversationType"
        :to="to"
        :msgs="msgs"
        :loading-more="loadingMore"
        :no-more="noMore"
        :reply-msgs-map="replyMsgsMap"
      />
    </div>
    <div class="msg-input-wrapper">
      <MessageInput
        :reply-msgs-map="replyMsgsMap"
        :conversation-type="conversationType"
        :to="to"
      />
    </div>
  </div>
</template>

<script>
import { events } from "../../utils/constants";
import { trackInit } from "../../utils/reporter";
import { autorun } from "../../utils/store.js";
import {
  getUniPlatform,
  stopAllAudio,
  toRenderSafeData,
  toRenderSafeMessageList,
} from "../../utils";
import { customSwitchTab } from "../../utils/customNavigate";
import NetworkAlert from "../../components/NetworkAlert.vue";
import NavBar from "./message/nav-bar.vue";
import Icon from "../../components/Icon.vue";
import MessageList from "./message/message-list.vue";
import MessageInput from "./message/message-input.vue";
import { HISTORY_LIMIT } from "../../utils/constants";
import { t } from "../../utils/i18n";
import { V2NIMConst } from "../../utils/nim";

trackInit("ChatUIKit");

const REPLY_MSG_REFER_RETRY_INTERVAL = 30 * 1000;

export default {
  components: {
    NetworkAlert,
    NavBar,
    Icon,
    MessageList,
    MessageInput,
  },
  data() {
    const conversationId = uni.$UIKitStore.uiStore.selectedConversation;
    return {
      title: "",
      subTitle: "",
      conversationId,
      isH5: getUniPlatform() === "web",
      moveThrough: false,
      teamManagerVisible: uni.$UIKitStore.localOptions.teamMsgReceiptVisible,
      p2pMsgReceiptVisible: uni.$UIKitStore.localOptions.p2pMsgReceiptVisible,
      loginStateVisible: uni.$UIKitStore.localOptions.loginStateVisible,
      isMounted: false,
      loadingMore: false,
      noMore: false,
      msgs: [],
      replyMsgsMap: {},
      // 大图上传时消息进度会频繁刷新，避免重复补查同一个被回复消息。
      replyMsgReferCache: {},
      replyMsgReferRequesting: {},
      replyMsgReferFailedAt: {},
      connectedWatch: function () {},
      msgsWatch: function () {},
      statusWatch: function () {},
      conversationTypeWatch: function () {},
    };
  },
  computed: {
    conversationType() {
      return uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(
        this.conversationId,
      );
    },
    to() {
      return uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationTargetId(
        this.conversationId,
      );
    },
  },
  onShow() {
    this.setNavTitle();
    const messages = [...uni.$UIKitStore.msgStore.getMsg(this.conversationId)];
    if (messages.length) {
      const msgs = messages.reverse();
      this.handleHistoryMsgReceipt(msgs);
    }
  },
  onLoad(options) {
    if (options?.conversationId) {
      this.conversationId = decodeURIComponent(options.conversationId);
      uni.$UIKitStore.uiStore.selectConversation(this.conversationId);
    }
    uni.$on(events.HANDLE_MOVE_THROUGH, this.handleMoveThrough);
  },
  mounted() {
    this.setNavTitle();
    this.scrollToBottom();
    this.subscribeUserStatus();

    this.connectedWatch = autorun(() => {
      if (
        uni.$UIKitStore.connectStore.connectStatus ===
        V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED
      ) {
        if (
          uni.$UIKitStore.connectStore.loginStatus ==
          V2NIMConst.V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED
        ) {
          this.getHistory(Date.now()).then(() => {
            if (!this.isMounted) {
              uni.$emit(events.ON_SCROLL_BOTTOM);
              this.isMounted = true;
            }
          });
        }
      }
    });

    this.msgsWatch = autorun(() => {
      const messages = [
        ...uni.$UIKitStore.msgStore.getMsg(this.conversationId),
      ];
      // 删除最后一条消息时也要同步空数组，否则页面会继续渲染旧的最后一条。
      this.msgs = toRenderSafeMessageList(messages) || [];

      this.handleReplyMsg(messages);

      if (messages.length < 6) {
        uni.hideKeyboard();
      }
    });

    this.statusWatch = autorun(() => {
      const stateMap = uni.$UIKitStore?.subscriptionStore.stateMap;
      if (
        uni.$UIKitStore.localOptions.loginStateVisible &&
        this.conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
      ) {
        this.subTitle =
          stateMap.get(this.to)?.statusType ===
          V2NIMConst.V2NIMUserStatusType.V2NIM_USER_STATUS_TYPE_LOGIN
            ? `(${t("userOnlineText")})`
            : `(${t("userOfflineText")})`;
      }
    });

    this.conversationTypeWatch = autorun(() => {
      this.setNavTitle();
    });

    uni.$UIKitNIM.V2NIMMessageService.on(
      "onReceiveMessages",
      this.onReceiveMessages,
    );
    uni.$UIKitNIM.V2NIMTeamService.on("onTeamDismissed", this.onTeamDismissed);
    uni.$UIKitNIM.V2NIMTeamService.on("onTeamLeft", this.onTeamLeft);
    uni.$on(events.GET_HISTORY_MSG, this.loadMoreMsgs);
    uni.$on(events.DELETE_MSG_SUCCESS, this.handleDeleteMsgSuccess);
  },
  beforeDestroy() {
    uni.$UIKitNIM.V2NIMTeamService.off("onTeamDismissed", this.onTeamDismissed);
    uni.$UIKitNIM.V2NIMTeamService.off("onTeamLeft", this.onTeamLeft);
    uni.$UIKitNIM.V2NIMMessageService.off(
      "onReceiveMessages",
      this.onReceiveMessages,
    );

    uni.$off(events.GET_HISTORY_MSG, this.loadMoreMsgs);
    uni.$off(events.DELETE_MSG_SUCCESS, this.handleDeleteMsgSuccess);
    uni.$off(events.HANDLE_MOVE_THROUGH, this.handleMoveThrough);
    this.connectedWatch();
    this.msgsWatch();
    this.statusWatch();
    this.conversationTypeWatch();
    this.replyMsgReferCache = {};
    this.replyMsgReferRequesting = {};
    this.replyMsgReferFailedAt = {};
  },
  onHide() {
    uni.hideKeyboard();
    stopAllAudio();
  },
  onUnload() {
    uni.$off(events.CONFIRM_FORWARD_MSG);
    uni.$off(events.CANCEL_FORWARD_MSG);
  },
  methods: {
    t,
    safeReplyMsgsMap(data) {
      return toRenderSafeData(data) || {};
    },
    handleMoveThrough(flag) {
      this.moveThrough = flag;
    },
    backToConversation() {
      customSwitchTab({
        url: "/pages/Conversation/index",
      });
    },
    async removeCurrentConversation() {
      try {
        if (uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation) {
          await uni.$UIKitStore.conversationStore?.deleteConversationActive(
            this.conversationId,
          );
        } else {
          await uni.$UIKitStore.localConversationStore?.deleteConversationActive(
            this.conversationId,
          );
        }
      } catch (error) {
        // 群已解散时会话清理是返回前的兜底动作，失败不阻断返回会话列表。
      }
    },
    onTeamDismissed(data) {
      if (data.teamId === this.to) {
        uni.showModal({
          content: t("onDismissTeamText"),
          showCancel: false,
          success: async (data) => {
            if (data.confirm) {
              await this.removeCurrentConversation();
              this.backToConversation();
            }
          },
        });
      }
    },
    onTeamLeft() {
      uni
        .showToast({
          title: t("onRemoveTeamText"),
          icon: "none",
          duration: 1000,
        })
        .then(() => {
          this.backToConversation();
        });
    },
    onReceiveMessages(msgs) {
      const routes = getCurrentPages();
      const curRoute = routes[routes.length - 1].route;

      if (
        msgs.length &&
        !msgs[0]?.isSelf &&
        msgs[0].conversationId == this.conversationId &&
        curRoute?.includes("Chat/index")
      ) {
        this.handleMsgReceipt(msgs);
      }
      uni.$emit(events.ON_SCROLL_BOTTOM, msgs);
    },
    handleMsgReceipt(msg) {
      if (
        msg[0].conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P &&
        this.p2pMsgReceiptVisible
      ) {
        uni.$UIKitStore.msgStore.sendMsgReceiptActive(msg[0]);
      } else if (
        msg[0].conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM &&
        this.teamManagerVisible
      ) {
        uni.$UIKitStore.msgStore.sendTeamMsgReceiptActive(msg);
      }
    },
    handleHistoryMsgReceipt(msgs) {
      if (
        this.conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P &&
        this.p2pMsgReceiptVisible
      ) {
        const myUserAccountId = uni.$UIKitNIM.V2NIMLoginService.getLoginUser();
        const othersMsgs = msgs
          .filter(
            (item) =>
              !["beReCallMsg", "reCallMsg"].includes(item.recallType || ""),
          )
          .filter((item) => item.senderId !== myUserAccountId);

        if (othersMsgs.length > 0) {
          uni.$UIKitStore.msgStore.sendMsgReceiptActive(othersMsgs?.[0]);
        }
      } else if (
        this.conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM &&
        this.teamManagerVisible
      ) {
        const myUserAccountId = uni.$UIKitNIM.V2NIMLoginService.getLoginUser();
        const myMsgs = msgs
          .filter(
            (item) =>
              !["beReCallMsg", "reCallMsg"].includes(item.recallType || ""),
          )
          .filter((item) => item.senderId === myUserAccountId);

        uni.$UIKitStore.msgStore.getTeamMsgReadsActive(
          myMsgs,
          this.conversationId,
        );

        const othersMsgs = msgs
          .filter(
            (item) =>
              !["beReCallMsg", "reCallMsg"].includes(item.recallType || ""),
          )
          .filter((item) => item.senderId !== myUserAccountId);

        if (othersMsgs.length > 0 && othersMsgs.length < 50) {
          uni.$UIKitStore.msgStore.sendTeamMsgReceiptActive(othersMsgs);
        }
      }
    },
    async getHistory(endTime, lastMsgId) {
      try {
        if (this.noMore || this.loadingMore) {
          return [];
        }
        this.loadingMore = true;
        if (this.conversationId) {
          const historyMsgs =
            await uni.$UIKitStore.msgStore.getHistoryMsgActive({
              conversationId: this.conversationId,
              endTime,
              lastMsgId,
              limit: HISTORY_LIMIT,
            });
          await uni.$UIKitStore.msgStore.getPinnedMessageListActive(
            this.conversationId,
            true,
          );

          this.loadingMore = false;
          if (historyMsgs.length < HISTORY_LIMIT) {
            this.noMore = true;
          }
          this.handleHistoryMsgReceipt(historyMsgs);
          return historyMsgs;
        }
        this.loadingMore = false;
        return [];
      } catch (error) {
        if (error && error.code === 109404) {
          uni.showModal({
            content: t("onDismissTeamText"),
            showCancel: false,
            success: async (data) => {
              if (data.confirm) {
                await this.removeCurrentConversation();
                this.backToConversation();
              }
            },
          });
        }

        this.loadingMore = false;
        throw error;
      }
    },
    loadMoreMsgs(lastMsg) {
      if (lastMsg) {
        this.getHistory(lastMsg.createTime, lastMsg.messageServerId);
      } else {
        this.getHistory(Date.now());
      }
    },
    handleDeleteMsgSuccess(deletedMsg) {
      if (deletedMsg?.conversationId !== this.conversationId) {
        return;
      }

      const messages = uni.$UIKitStore.msgStore.getMsg(this.conversationId);
      if (messages.length || this.noMore) {
        return;
      }

      this.getHistory(deletedMsg.createTime, deletedMsg.messageServerId).then(
        () => {
          this.scrollToBottom();
        },
      );
    },
    setNavTitle() {
      if (
        this.conversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
      ) {
        if (this.loginStateVisible) {
          this.subTitle =
            uni.$UIKitStore?.subscriptionStore?.stateMap?.get(this.to)
              ?.statusType ===
            V2NIMConst.V2NIMUserStatusType.V2NIM_USER_STATUS_TYPE_LOGIN
              ? `(${t("userOnlineText")})`
              : `(${t("userOfflineText")})`;
        }

        this.title = uni.$UIKitStore.uiStore.getAppellation({
          account: this.to,
        });
      } else if (
        this.conversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
      ) {
        const team = uni.$UIKitStore.teamStore.teams.get(this.to);
        this.subTitle = `(${team?.memberCount || 0})`;
        this.title = team?.name || "";
      }
    },
    getReplyMsgReferKey(refer) {
      return [
        refer.conversationType || "",
        refer.conversationId || "",
        refer.senderId || "",
        refer.receiverId || "",
        refer.messageServerId || "",
        refer.messageClientId || "",
        refer.createTime || "",
      ].join("|");
    },
    canRequestReplyMsgRefer(requestKey) {
      if (this.replyMsgReferRequesting[requestKey]) {
        return false;
      }

      const failedAt = this.replyMsgReferFailedAt[requestKey] || 0;
      return Date.now() - failedAt > REPLY_MSG_REFER_RETRY_INTERVAL;
    },
    addReplyMsgRequest(messageClientIds, requestKey, messageClientId) {
      if (!messageClientIds[requestKey]) {
        messageClientIds[requestKey] = [];
      }
      messageClientIds[requestKey].push(messageClientId);
    },
    requestReplyMsgsByRefers(requestMsgs, messageClientIds, replyMsgsMap) {
      if (requestMsgs.length === 0) {
        return;
      }

      // 同一轮渲染里可能有多条消息引用同一个 refer，先合并成一次 SDK 请求。
      const requestMsgMap = {};
      requestMsgs.forEach((item) => {
        const requestKey = this.getReplyMsgReferKey(item);
        if (!requestMsgMap[requestKey]) {
          requestMsgMap[requestKey] = item;
        }
      });

      const requestKeys = Object.keys(requestMsgMap);
      const uniqueRequestMsgs = requestKeys.map(
        (requestKey) => requestMsgMap[requestKey],
      );
      // SDK 返回的是消息对象，用服务端 id 反查到本次请求的缓存 key。
      const messageServerIdToRequestKeys = {};
      requestKeys.forEach((requestKey) => {
        const messageServerId = requestMsgMap[requestKey].messageServerId;
        if (messageServerId) {
          const serverIdKey = String(messageServerId);
          if (!messageServerIdToRequestKeys[serverIdKey]) {
            messageServerIdToRequestKeys[serverIdKey] = [];
          }
          messageServerIdToRequestKeys[serverIdKey].push(requestKey);
        }
      });

      requestKeys.forEach((requestKey) => {
        this.replyMsgReferRequesting[requestKey] = true;
      });

      const clearRequesting = () => {
        requestKeys.forEach((requestKey) => {
          delete this.replyMsgReferRequesting[requestKey];
        });
      };

      uni.$UIKitNIM.V2NIMMessageService.getMessageListByRefers(
        uniqueRequestMsgs,
      )
        .then((res) => {
          const foundKeys = {};

          if (res?.length > 0) {
            res.forEach((item) => {
              if (item.messageServerId) {
                const requestKeysByServerId =
                  messageServerIdToRequestKeys[String(item.messageServerId)] ||
                  [];
                requestKeysByServerId.forEach((requestKey) => {
                  foundKeys[requestKey] = true;
                  this.replyMsgReferCache[requestKey] = item;
                  (messageClientIds[requestKey] || []).forEach(
                    (messageClientId) => {
                      replyMsgsMap[messageClientId] = item;
                    },
                  );
                });
              }
            });
          }

          requestKeys.forEach((requestKey) => {
            if (!foundKeys[requestKey]) {
              // 查不到也缓存 noFind，避免上传进度触发时反复查询同一条已不存在的消息。
              this.replyMsgReferCache[requestKey] = {
                messageClientId: "noFind",
              };
            }
            (messageClientIds[requestKey] || []).forEach((messageClientId) => {
              replyMsgsMap[messageClientId] =
                this.replyMsgReferCache[requestKey];
            });
          });

          this.replyMsgsMap = {
            ...this.replyMsgsMap,
            ...this.safeReplyMsgsMap(replyMsgsMap),
          };
          clearRequesting();
        })
        .catch(() => {
          const now = Date.now();
          requestKeys.forEach((requestKey) => {
            this.replyMsgReferFailedAt[requestKey] = now;
          });
          this.replyMsgsMap = {
            ...this.replyMsgsMap,
            ...this.safeReplyMsgsMap(replyMsgsMap),
          };
          clearRequesting();
        });
    },
    handleReplyMsg(messages) {
      if (messages.length !== 0) {
        const replyMsgsMapForExt = {};
        const replyMsgsMapForThreadReply = {};
        const extReqMsgs = [];
        const threadReplyReqMsgs = [];
        const extMessageClientIds = {};
        const threadReplyMessageClientIds = {};
        this.msgs.forEach((msg) => {
          if (msg.serverExtension) {
            try {
              const { yxReplyMsg } = JSON.parse(msg.serverExtension);
              if (yxReplyMsg) {
                const replyMsg = this.msgs.find(
                  (item) => item.messageClientId === yxReplyMsg.idClient,
                );
                if (replyMsg) {
                  replyMsgsMapForExt[msg.messageClientId] = replyMsg;
                } else {
                  const {
                    scene,
                    from,
                    to,
                    idServer,
                    messageClientId,
                    time,
                    receiverId,
                  } = yxReplyMsg;

                  if (
                    scene &&
                    from &&
                    to &&
                    idServer &&
                    messageClientId &&
                    time &&
                    receiverId
                  ) {
                    const refer = {
                      senderId: from,
                      receiverId,
                      messageClientId,
                      messageServerId: idServer,
                      createTime: time,
                      conversationType: scene,
                      conversationId: to,
                    };
                    const requestKey = this.getReplyMsgReferKey(refer);
                    const cachedReplyMsg = this.replyMsgReferCache[requestKey];

                    if (cachedReplyMsg) {
                      replyMsgsMapForExt[msg.messageClientId] = cachedReplyMsg;
                    } else {
                      replyMsgsMapForExt[msg.messageClientId] = {
                        messageClientId: "noFind",
                      };
                      if (this.canRequestReplyMsgRefer(requestKey)) {
                        if (!extMessageClientIds[requestKey]) {
                          extReqMsgs.push(refer);
                        }
                        this.addReplyMsgRequest(
                          extMessageClientIds,
                          requestKey,
                          msg.messageClientId,
                        );
                      }
                    }
                  } else {
                    replyMsgsMapForExt[msg.messageClientId] = {
                      messageClientId: "noFind",
                    };
                  }
                }
              }
            } catch {}
          }

          if (msg.threadReply) {
            const beReplyMsg = this.msgs.find(
              (item) =>
                item.messageClientId === msg.threadReply?.messageClientId,
            );

            if (beReplyMsg) {
              replyMsgsMapForThreadReply[msg.messageClientId] = beReplyMsg;
            } else {
              const requestKey = this.getReplyMsgReferKey(msg.threadReply);
              const cachedReplyMsg = this.replyMsgReferCache[requestKey];

              if (cachedReplyMsg) {
                replyMsgsMapForThreadReply[msg.messageClientId] =
                  cachedReplyMsg;
              } else {
                replyMsgsMapForThreadReply[msg.messageClientId] = {
                  messageClientId: "noFind",
                };
                if (this.canRequestReplyMsgRefer(requestKey)) {
                  if (!threadReplyMessageClientIds[requestKey]) {
                    threadReplyReqMsgs.push(msg.threadReply);
                  }
                  this.addReplyMsgRequest(
                    threadReplyMessageClientIds,
                    requestKey,
                    msg.messageClientId,
                  );
                }
              }
            }
          }
        });

        this.requestReplyMsgsByRefers(
          extReqMsgs,
          extMessageClientIds,
          replyMsgsMapForExt,
        );

        this.replyMsgsMap = {
          ...this.replyMsgsMap,
          ...this.safeReplyMsgsMap(replyMsgsMapForExt),
          ...this.safeReplyMsgsMap(replyMsgsMapForThreadReply),
        };

        this.requestReplyMsgsByRefers(
          threadReplyReqMsgs,
          threadReplyMessageClientIds,
          replyMsgsMapForThreadReply,
        );
      }
    },
    scrollToBottom() {
      const timer = setTimeout(() => {
        uni.$emit(events.ON_SCROLL_BOTTOM);
        clearTimeout(timer);
      }, 300);
    },
    subscribeUserStatus() {
      if (
        this.loginStateVisible &&
        this.conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
      ) {
        uni.$UIKitStore.subscriptionStore.subscribeUserStatusActive([this.to]);
      }
    },
  },
};
</script>

<style scoped lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.msg-page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.msg-page-wrapper-h5 {
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
}

.msg-alert {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  z-index: 1;
}

.msg-wrapper {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1;
}

.msg-wrapper-h5 {
  width: 100%;
  height: 100%;
  max-width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  position: relative;
}

.msg-wrapper > message-list {
  height: 100%;
}
.msg-input-wrapper {
  height: auto !important;
}
</style>
