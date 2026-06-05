<template>
  <div class="input-root">
    <div class="msg-input-wrapper">
      <div v-if="isReplyMsg" class="reply-message-wrapper">
        <div class="reply-message-close" @tap="removeReplyMsg">
          <Icon
            color="#929299"
            :iconStyle="{ fontWeight: '200' }"
            :size="13"
            type="icon-guanbi1"
          />
        </div>
        <div class="reply-line">｜</div>
        <div class="reply-title">{{ t("replyText") }}</div>
        <div class="reply-to">
          <Appellation
            :account="replyMsg && replyMsg.senderId"
            :team-id="
              conversationType ===
              V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
                ? to
                : ''
            "
            color="#929299"
            :fontSize="13"
          >
          </Appellation>
        </div>
        <div class="reply-to-colon">:</div>
        <div
          v-if="replyMsg && replyMsg.messageClientId === 'noFind'"
          class="reply-noFind"
        >
          {{ t("replyNotFindText") }}
        </div>
        <div class="reply-message" v-else>
          <message-one-line
            v-if="
              replyMsg &&
              replyMsg.messageType ===
                V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
            "
            :text="replyMsg && replyMsg.text"
          ></message-one-line>
          <div v-else>
            {{
              replyMsg
                ? "[" + REPLY_MSG_TYPE_MAP[replyMsg.messageType] + "]"
                : ""
            }}
          </div>
        </div>
      </div>
      <div class="msg-button-group">
        <div
          @tap="handleAudioVisible"
          v-if="!(isWeb || isHarmonyOs)"
          class="msg-input-button"
        >
          <Icon
            v-if="audioPanelVisible"
            :size="20"
            type="audio-btn-selected"
            key="audio-btn-selected"
          />
          <Icon v-else :size="20" type="icon-audio" key="icon-audio" />
        </div>
        <div class="msg-input-button" @tap="handleEmojiVisible">
          <Icon :size="20" type="icon-biaoqing" />
        </div>
        <div class="msg-input-button">
          <div @tap="handleSendImageMsg">
            <Icon :size="20" type="icon-tupian" />
          </div>
        </div>
        <div class="msg-input-button" @tap="handleSendMoreVisible">
          <Icon type="send-more" :size="20" />
        </div>
        <div class="msg-input-button" @tap="handleSetting">
          <Icon type="icon-shezhi" :size="20" />
        </div>
      </div>
      <div v-if="inputVisible" class="msg-input">
        <div
          v-show="showEmojiInput"
          @click="onClickEmojiInput"
          class="input-emoji"
        >
          <div v-if="inputText" class="input-text">{{ inputText }}</div>
          <div v-else class="input-placeholder">
            {{
              isTeamMute ? t("teamMutePlaceholder") : t("chatInputPlaceHolder")
            }}
          </div>
        </div>
        <input
          v-show="!showEmojiInput"
          :focus="isFocus"
          class="msg-input-input"
          :maxlength="-1"
          :placeholder="
            isTeamMute ? t('teamMutePlaceholder') : t('chatInputPlaceHolder')
          "
          v-model="inputText"
          type="text"
          :disabled="isTeamMute"
          :confirm-hold="true"
          cursor-spacing="20"
          adjust-position="true"
          confirm-type="send"
          @confirm="handleSendTextMsg"
          @blur="handleInputBlur"
          @input="handleInput"
          id="msg-input"
        />
      </div>
      <div v-if="emojiVisible" class="msg-emoji-panel" @click.stop="() => {}">
        <Face
          @emojiClick="handleEmoji"
          @emojiDelete="handleEmojiDelete"
          @emojiSend="handleSendTextMsg"
        />
      </div>
      <div
        v-if="audioPanelVisible"
        class="msg-audio-panel"
        @click.stop="() => {}"
      >
        <VoicePanel @handleSendAudioMsg="handleSendAudioMsg"></VoicePanel>
      </div>
      <div
        v-if="sendMoreVisible"
        class="send-more-panel"
        @click.stop="() => {}"
      >
        <div class="send-more-panel-item-wrapper">
          <div
            class="send-more-panel-item"
            @tap="handleSendVideoMsg('camera', $event)"
          >
            <Icon type="icon-paishe" :size="30"></Icon>
          </div>
          <div class="icon-text">{{ t("shootText") }}</div>
        </div>
        <div class="send-more-panel-item-wrapper">
          <div
            class="send-more-panel-item"
            @tap="handleSendVideoMsg('album', $event)"
          >
            <Icon type="icon-shipin2" :size="30"></Icon>
          </div>
          <div class="icon-text">{{ t("albumText") }}</div>
        </div>
        <div
          class="send-more-panel-item-wrapper"
          v-if="
            isAndroidOrIosApp &&
            conversationType !==
              V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
          "
        >
          <div class="send-more-panel-item" @tap="handleCall(1)">
            <Icon type="icon-audio-call" :size="30"></Icon>
          </div>
          <div class="icon-text">{{ t("voiceCallText") }}</div>
        </div>

        <div
          class="send-more-panel-item-wrapper"
          v-if="
            isAndroidOrIosApp &&
            conversationType !==
              V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
          "
        >
          <div class="send-more-panel-item" @tap="handleCall(2)">
            <Icon type="icon-video-call" :size="30"></Icon>
          </div>
          <div class="icon-text">{{ t("videoCallText") }}</div>
        </div>
        <div
          v-if="isWeb"
          class="send-more-panel-item-wrapper"
          @tap="handleSendFileMsg"
        >
          <div class="send-more-panel-item">
            <Icon type="icon-file" :size="30"></Icon>
          </div>
          <div class="icon-text">{{ t("fileText") }}</div>
        </div>
      </div>
    </div>
    <UniPopup
      ref="popupRef"
      background-color="#ffffff"
      type="bottom"
      mask-background-color="rgba(0,0,0,0.4)"
      @change="onPopupChange"
    >
      <MentionMemberList
        :team-id="to"
        :team="team"
        :team-members="teamMembers"
      ></MentionMemberList>
    </UniPopup>
  </div>
</template>

<script>
/** 消息页面输入框组件 */
import Face from "./face.vue";
import VoicePanel from "./voice-panel.vue";
import Icon from "../../../components/Icon.vue";
import {
  ALLOW_AT,
  AT_ALL_ACCOUNT,
  events,
  REPLY_MSG_TYPE_MAP,
} from "../../../utils/constants";
import { emojiMap } from "../../../utils/emoji";
import { t } from "../../../utils/i18n";
import { handleNoPermission } from "../../../utils/permission";
import { customNavigateTo } from "../../../utils/customNavigate";
import MessageOneLine from "../../../components/MessageOneLine.vue";
import {
  isAndroidApp,
  stopAllAudio,
  isIosWeb,
  isWeb,
  isWxApp,
  startCall,
  isAndroidOrIosApp,
  isHarmonyOs,
  toRenderSafeData,
  replaceEmoji,
} from "../../../utils";
import UniPopup from "../../../components/uni-components/uni-popup/components/uni-popup/uni-popup.vue";
import MentionMemberList from "./mention-member-list.vue";
import Appellation from "../../../components/Appellation.vue";
import { autorun } from "../../../utils/store.js";
import { V2NIMConst } from "../../../utils/nim";

export default {
  components: {
    Face,
    VoicePanel,
    Icon,
    UniPopup,
    MentionMemberList,
    Appellation,
    MessageOneLine,
  },
  props: {
    conversationType: {
      type: [Number, String],
      default: "",
    },
    to: {
      type: String,
      default: "",
    },
    replyMsgsMap: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      V2NIMConst,
      REPLY_MSG_TYPE_MAP,
      isAndroidOrIosApp,
      isHarmonyOs,
      isWeb,
      inputText: "",
      extVisible: false,
      audioPanelVisible: false,
      sendMoreVisible: false,
      emojiVisible: false,
      showEmojiInput: false,
      isReplyMsg: false,
      isFocus: false,
      replyMsg: undefined,
      selectedAtMembers: [],
      team: undefined,
      teamMembers: [],
      teamMute:
        V2NIMConst.V2NIMTeamChatBannedMode.V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN,
      isGroupOwner: false,
      isGroupManager: false,
      isTeamMute: false,
      disposeTeamWatch: function () {},
    };
  },
  computed: {
    conversationId() {
      return this.conversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
        ? uni.$UIKitNIM.V2NIMConversationIdUtil.p2pConversationId(this.to)
        : uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(this.to);
    },
    inputVisible() {
      return !(this.audioPanelVisible || this.sendMoreVisible);
    },
    allowAtAll() {
      let ext = {};
      try {
        ext = JSON.parse((this.team || {}).serverExtension || "{}");
      } catch (error) {
        //
      }
      if (ext[ALLOW_AT] === "manager") {
        return this.isGroupOwner || this.isGroupManager;
      }
      return true;
    },
  },
  mounted() {
    this.disposeTeamWatch = autorun(() => {
      if (
        this.conversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
      ) {
        const team = uni.$UIKitStore.teamStore.teams.get(this.to);

        this.teamMembers =
          toRenderSafeData(
            uni.$UIKitStore.teamMemberStore.getTeamMember(this.to),
          ) || [];

        const myUser = uni.$UIKitStore.userStore.myUserInfo;
        this.isGroupOwner = team?.ownerAccountId == myUser.accountId;
        this.isGroupManager = this.teamMembers
          .filter(
            (item) =>
              item.memberRole ===
              V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER,
          )
          .some(
            (member) => member.accountId === (myUser ? myUser.accountId : ""),
          );
        this.team = toRenderSafeData(team);
        if (team) {
          this.teamMute = team.chatBannedMode;
        }
        this.updateTeamMute();
      }
    });

    uni.$on(events.ON_REEDIT_MSG, this.handleReeditEvent);
    uni.$on(events.REPLY_MSG, this.handleReplyEvent);
    uni.$on(events.AIT_TEAM_MEMBER, this.handleAitTeamMemberEvent);
    uni.$on(events.CLOSE_PANEL, this.handleClosePanelEvent);
    uni.$on(events.HANDLE_AIT_MEMBER, this.handleHandleAitMemberEvent);
    uni.$on(events.CLOSE_AIT_POPUP, this.handleCloseAitPopupEvent);
    uni.$on(events.EMOJI_CLICK, this.handleEmojiClickEvent);
    uni.$on(events.EMOJI_DELETE, this.handleEmojiDeleteEvent);
    uni.$on(events.EMOJI_SEND, this.handleEmojiSendEvent);

    if (uni.onKeyboardHeightChange) {
      uni.onKeyboardHeightChange(this.handleKeyboardHeightChange);
    }
  },
  beforeDestroy() {
    uni.$off(events.ON_REEDIT_MSG, this.handleReeditEvent);
    uni.$off(events.REPLY_MSG, this.handleReplyEvent);
    uni.$off(events.AIT_TEAM_MEMBER, this.handleAitTeamMemberEvent);
    uni.$off(events.CLOSE_PANEL, this.handleClosePanelEvent);
    uni.$off(events.HANDLE_AIT_MEMBER, this.handleHandleAitMemberEvent);
    uni.$off(events.CLOSE_AIT_POPUP, this.handleCloseAitPopupEvent);
    uni.$off(events.EMOJI_CLICK, this.handleEmojiClickEvent);
    uni.$off(events.EMOJI_DELETE, this.handleEmojiDeleteEvent);
    uni.$off(events.EMOJI_SEND, this.handleEmojiSendEvent);
    this.removeReplyMsg();
    this.disposeTeamWatch();
  },
  methods: {
    t,
    updateTeamMute() {
      if (
        this.teamMute ===
        V2NIMConst.V2NIMTeamChatBannedMode.V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN
      ) {
        this.isTeamMute = false;
        return;
      }

      if (this.isGroupOwner || this.isGroupManager) {
        this.isTeamMute = false;
        return;
      }
      this.isTeamMute = true;
    },
    onPopupChange(e) {
      uni.$emit(events.HANDLE_MOVE_THROUGH, e.value);
    },
    handleMentionItemClick(member) {
      const popupRef = this.$refs.popupRef;
      if (popupRef && typeof popupRef.close === "function") {
        popupRef.close();
      }
      uni.$emit(events.HANDLE_MOVE_THROUGH, false);
      const nickInTeam = member.appellation;
      this.selectedAtMembers = [
        ...this.selectedAtMembers.filter(
          (item) => item.accountId !== member.accountId,
        ),
        member,
      ];
      this.inputText = this.inputText + nickInTeam + " ";
    },
    closePopup() {
      const popupRef = this.$refs.popupRef;
      if (popupRef && typeof popupRef.close === "function") {
        popupRef.close();
      }
    },
    onClickEmojiInput() {
      this.showEmojiInput = false;
      this.extVisible = false;
      this.emojiVisible = false;
      if (isIosWeb) {
        const timeout = setTimeout(() => {
          this.showKeyboard();
          clearTimeout(timeout);
        }, 100);
      } else if (!isHarmonyOs) {
        const timeout = setTimeout(() => {
          this.showKeyboard();
          clearTimeout(timeout);
        }, 500);
      }
    },
    handleInputBlur() {
      this.isFocus = false;
    },
    scrollBottom(options = {}) {
      if (!isWeb) {
        setTimeout(() => {
          uni.$emit(events.ON_SCROLL_BOTTOM, options);
        }, 300);
      } else {
        uni.$emit(events.ON_SCROLL_BOTTOM, options);
      }
    },
    handleInput(event) {
      const text = event?.detail?.value || "";
      const isAit = text.endsWith("@") || text.endsWith("@\n");
      if (
        this.conversationType ==
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM &&
        isAit
      ) {
        uni.hideKeyboard();
        const popupRef = this.$refs.popupRef;
        if (popupRef && typeof popupRef.open === "function") {
          popupRef.open("bottom");
        }
        this.isFocus = false;
        uni.$emit(events.HANDLE_MOVE_THROUGH, true);
      }
    },
    handleSendTextMsg() {
      if (this.inputText.trim() === "") return;
      const ext = this.onAtMembersExtHandler();
      const text = replaceEmoji(this.inputText);
      const textMsg = uni.$UIKitNIM.V2NIMMessageCreator.createTextMessage(text);

      uni.$UIKitStore.msgStore
        .sendMessageActive({
          msg: textMsg,
          conversationId: this.conversationId,
          serverExtension: this.selectedAtMembers.length && ext,
          sendBefore: () => {
            uni.$emit(events.ON_SCROLL_BOTTOM, { singleScroll: true });
          },
        })
        .catch(() => {
          uni.showToast({
            icon: "error",
            title: t("sendMsgFailedText"),
          });
        });

      this.inputText = "";
      this.isReplyMsg = false;
      this.replyMsg = undefined;
      this.selectedAtMembers = [];
    },
    handleSendFileMsg() {
      stopAllAudio();
      uni.chooseFile({
        count: 1,
        type: "all",
        success: (res) => {
          const filePath = res?.tempFilePaths?.[0];
          const fileName = res?.tempFiles?.[0]?.name;
          if (filePath && fileName) {
            const fileMsg = uni.$UIKitNIM.V2NIMMessageCreator.createFileMessage(
              filePath,
              fileName,
            );
            uni.$UIKitStore.msgStore.sendMessageActive({
              msg: fileMsg,
              conversationId: this.conversationId,
              sendBefore: () => {
                this.scrollBottom();
              },
            });
          }
        },
        fail: () => {
          uni.showToast({
            title: t("sendFileFailedText"),
            icon: "none",
          });
        },
      });
    },
    removeReplyMsg() {
      if (this.replyMsg?.conversationId) {
        uni.$UIKitStore.msgStore.removeReplyMsgActive(
          this.replyMsg.conversationId,
        );
      }
      this.isReplyMsg = false;
    },
    handleEmojiVisible() {
      if (this.isTeamMute) return;
      if (isWxApp || isAndroidApp || isHarmonyOs) {
        const timeout = setTimeout(() => {
          this.emojiVisible = true;
          this.extVisible = true;
          uni.$emit(events.ON_SCROLL_BOTTOM);
          clearTimeout(timeout);
        }, 300);
      } else {
        this.emojiVisible = true;
        this.extVisible = true;
      }
      this.showEmojiInput = true;
      this.audioPanelVisible = false;
      this.sendMoreVisible = false;
      uni.$emit(events.ON_SCROLL_BOTTOM);
    },
    handleSendMoreVisible() {
      if (this.isTeamMute) return;
      this.audioPanelVisible = false;
      this.emojiVisible = false;
      this.sendMoreVisible = !this.sendMoreVisible;
      setTimeout(() => {
        uni.$emit(events.ON_SCROLL_BOTTOM);
      }, 300);
    },
    handleEmoji(emoji) {
      this.inputText += emoji.key;
    },
    handleEmojiDelete() {
      let target = "";
      const isEmojiEnd = Object.keys(emojiMap).reduce((prev, cur) => {
        const isEnd = this.inputText.endsWith(cur);
        if (isEnd) {
          target = cur;
        }
        return prev || isEnd;
      }, false);
      if (isEmojiEnd && target) {
        this.inputText = this.inputText.replace(target, "");
      } else {
        this.inputText = this.inputText.slice(0, -1);
      }
    },
    handleAudioVisible() {
      if (this.isTeamMute) return;
      this.audioPanelVisible = !this.audioPanelVisible;
      this.emojiVisible = false;
      setTimeout(() => {
        uni.$emit(events.ON_SCROLL_BOTTOM);
      }, 300);
    },
    handleSendImageMsg() {
      if (this.isTeamMute) return;
      try {
        stopAllAudio();
      } catch (error) {}
      uni.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success: (res) => {
          const imgMsg = uni.$UIKitNIM.V2NIMMessageCreator.createImageMessage(
            res.tempFilePaths[0],
          );

          uni.$UIKitStore.msgStore
            .sendMessageActive({
              msg: imgMsg,
              conversationId: this.conversationId,
              progress: () => true,
              sendBefore: () => {
                this.scrollBottom();
              },
            })
            .catch((error) => {
              uni.showToast({
                icon: "error",
                title: t("sendImageFailedText"),
              });
            });
        },
        fail: (error) => {
          console.log("chooseImage", error);
        },
        complete: handleNoPermission,
      });
    },
    handleSendVideoMsg(type, event) {
      if (this.isTeamMute) return;
      stopAllAudio();
      if (isWxApp && event?.type == "blur") {
        return;
      }

      uni.chooseVideo({
        sourceType: [type],
        compressed: true,
        maxDuration: 60,
        success: async (res) => {
          const videoMsg = uni.$UIKitNIM.V2NIMMessageCreator.createVideoMessage(
            res.tempFilePath,
          );

          uni.$UIKitStore.msgStore
            .sendMessageActive({
              msg: videoMsg,
              conversationId: this.conversationId,
              progress: () => true,
              sendBefore: () => {
                this.scrollBottom();
              },
            })
            .catch(() => {
              uni.showToast({
                icon: "error",
                title: t("sendVideoFailedText"),
              });
            });
        },
        complete: handleNoPermission,
      });
    },
    handleSendAudioMsg(filePath, duration) {
      const audioMsg =
        uni.$UIKitNIM.V2NIMMessageCreator.createAudioMessage(filePath);

      uni.$UIKitStore.msgStore
        .sendMessageActive({
          msg: audioMsg,
          conversationId: this.conversationId,
          progress: () => true,
          sendBefore: (msg) => {
            this.scrollBottom();
            uni.$UIKitStore.msgStore.addMsg(msg.conversationId, [
              {
                ...msg,
                attachment: {
                  duration,
                },
              },
            ]);
          },
        })
        .catch(() => {
          uni.showToast({
            icon: "error",
            title: t("sendAudioFailedText"),
          });
          this.scrollBottom();
        });
    },
    handleSetting() {
      uni.hideKeyboard();
      stopAllAudio();
      if (
        this.conversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
      ) {
        customNavigateTo({
          url: `/pages/Chat/message/p2p-set?id=${this.to}`,
        });
      } else if (
        this.conversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
      ) {
        customNavigateTo({
          url: `/pages/Team/team-set/index?id=${this.to}`,
        });
      }
    },
    handleCall(type) {
      const myAccount = uni.$UIKitStore.userStore.myUserInfo.accountId;
      if (myAccount) {
        startCall({
          remoteUserAccid: this.to,
          type,
        });
      } else {
        uni.showToast({
          title: t("callFailedText"),
          icon: "none",
        });
      }
    },
    showKeyboard() {
      this.isFocus = true;
    },
    getReplyMsgForSend(replyMsg) {
      if (!replyMsg?.messageClientId) {
        return undefined;
      }

      const sourceMsg =
        uni.$UIKitStore.msgStore.getMsg(replyMsg.conversationId, [
          replyMsg.messageClientId,
        ])?.[0] || replyMsg;

      return {
        ...sourceMsg,
        conversationId: sourceMsg.conversationId || this.conversationId,
        conversationType:
          sourceMsg.conversationType !== undefined
            ? sourceMsg.conversationType
            : this.conversationType,
        receiverId: sourceMsg.receiverId || this.to,
      };
    },
    handleReeditEvent(msg) {
      const replyMsg =
        this.replyMsgsMap && this.replyMsgsMap[msg.messageClientId];

      if (msg.conversationId) {
        uni.$UIKitStore.msgStore.removeReplyMsgActive(msg.conversationId);
        this.isReplyMsg = false;
      }

      if (replyMsg?.messageClientId) {
        const replyMsgForSend = this.getReplyMsgForSend(replyMsg);
        if (replyMsgForSend) {
          uni.$UIKitStore.msgStore.replyMsgActive(replyMsgForSend);
        }
        this.replyMsg = toRenderSafeData(replyMsg);
        this.isReplyMsg = true;
      }

      if (msg.serverExtension) {
        try {
          const extObj = JSON.parse(msg.serverExtension);
          const yxAitMsg = extObj.yxAitMsg;
          if (yxAitMsg) {
            const mentionedMembers = [];
            Object.keys(yxAitMsg).forEach((key) => {
              if (key == AT_ALL_ACCOUNT) {
                mentionedMembers.push({
                  accountId: key,
                  appellation: t("teamAll"),
                });
              } else {
                mentionedMembers.push({
                  accountId: key,
                  appellation: uni.$UIKitStore.uiStore.getAppellation({
                    account: key,
                    teamId: this.to,
                    ignoreAlias: true,
                  }),
                });
              }
            });
            this.selectedAtMembers = mentionedMembers;
          }
        } catch (error) {
          //
        }
      }
      this.inputText = msg?.oldText || "";
      if (!isHarmonyOs) {
        this.showKeyboard();
      }
    },
    handleReplyEvent(msg) {
      this.isReplyMsg = true;
      this.replyMsg = toRenderSafeData(msg);
      if (!isHarmonyOs) {
        this.showKeyboard();
      }
    },
    handleAitTeamMemberEvent(member) {
      this.selectedAtMembers = [
        ...this.selectedAtMembers.filter(
          (item) => item.accountId !== member.accountId,
        ),
        member,
      ];
      this.inputText = this.inputText + "@" + member.appellation + " ";
    },
    handleClosePanelEvent() {
      this.emojiVisible = false;
      this.extVisible = false;
      this.audioPanelVisible = false;
      this.sendMoreVisible = false;
    },
    handleHandleAitMemberEvent(member) {
      this.handleMentionItemClick(member);
    },
    handleCloseAitPopupEvent() {
      this.closePopup();
    },
    handleEmojiClickEvent(emoji) {
      this.handleEmoji(emoji);
    },
    handleEmojiDeleteEvent() {
      this.handleEmojiDelete();
    },
    handleEmojiSendEvent() {
      this.emojiVisible = false;
      this.extVisible = false;
      this.handleSendTextMsg();
    },
    handleKeyboardHeightChange(res) {
      const isAndroidWxapp =
        uni.getSystemInfoSync().platform == "android" && isWxApp;
      if (
        (res.height === 0 && isAndroidApp) ||
        (res.height === 0 && isAndroidWxapp)
      ) {
        this.emojiVisible = false;
        this.extVisible = false;
      }
    },
    onAtMembersExtHandler() {
      let ext;
      if (this.selectedAtMembers.length) {
        this.selectedAtMembers
          .filter((member) => {
            if (!this.allowAtAll && member.accountId === AT_ALL_ACCOUNT) {
              return false;
            }
            return true;
          })
          .forEach((member) => {
            const substr = `@${member.appellation}`;
            const positions = [];
            let pos = this.inputText?.indexOf(substr);
            while (pos !== -1) {
              positions.push(pos);
              pos = this.inputText?.indexOf(substr, pos + 1);
            }
            if (positions.length) {
              if (!ext) {
                ext = {
                  yxAitMsg: {
                    [member.accountId]: {
                      text: substr,
                      segments: [],
                    },
                  },
                };
              } else {
                ext.yxAitMsg[member.accountId] = {
                  text: substr,
                  segments: [],
                };
              }
              positions.forEach((position) => {
                const start = position;
                ext.yxAitMsg[member.accountId].segments.push({
                  start,
                  end: start + substr.length,
                  broken: false,
                });
              });
            }
          });
      }
      return ext;
    },
  },
};
</script>

<style scoped lang="scss">
@import "../../styles/common.scss";

.input-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 300px;
}

.input-root-h5 {
  height: auto;
  position: relative;
  order: 1;
}

.msg-input-wrapper {
  width: 100%;
  height: 100%;
  background-color: #eff1f3;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 999;
}

.msg-input {
  overflow-x: hidden;
  padding: 7px;
  background-color: #eff1f3;

  &-input {
    background-color: #fff;
    height: 40px;
    font-size: 16px;
    padding: 0 12px;
    border-radius: 6px;
    margin-bottom: 5px;

    &::placeholder {
      padding: 0 12px;
    }
  }
}

.msg-button-group {
  padding: 12px 20px 2px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.msg-input-button {
  flex: 1;

  &.msg-input-loading {
    animation: loadingCircle 1s infinite linear;
    z-index: 1;
    width: 20px;
    height: 20px;
    margin-top: 4px;

    .loading {
      width: 100%;
      height: 100%;
    }
  }
}

.msg-ext {
  overflow-y: auto;
  width: 100%;
  height: 300px;
  background-color: #eff1f3;
  z-index: 1;
}

.msg-emoji-panel {
  overflow-y: auto;
  width: 100%;
  height: 246px;
  background-color: #eff1f3;
  z-index: 1;
}

.msg-audio-panel {
  overflow-y: hidden;
  width: 100%;
  height: 300px;
  background-color: #eff1f3;
  z-index: 1;
}

.send-more-panel {
  padding: 15px;
  overflow-y: hidden;
  width: 100%;
  height: 300px;
  background-color: #eff1f3;
  z-index: 1;
  flex-wrap: wrap;
  box-sizing: border-box;
}

.send-more-panel-item-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  display: inline-block;
  margin-bottom: 10px;
  .send-more-panel-item {
    background-color: #fff;
    border-radius: 8px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    margin: 0 15px;
    justify-content: center;
  }
  .icon-text {
    font-size: 12px;
    color: #747475;
    margin-top: 8px;
    text-align: center;
  }
}

.reply-message-wrapper {
  display: flex;
  font-size: 13px;
  background-color: #eff1f2;
  height: 25px;
  padding-top: 6px;
  align-items: center;
  color: #929299;

  .reply-noFind {
    width: fit-content;
  }

  .reply-to-colon {
    flex-basis: 3px;
    margin-right: 2px;
  }

  .reply-message-close {
    flex-basis: 14px;
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  .reply-message {
    flex: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    message-one-line {
      flex: 1;
      font-size: 13px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .reply-title {
    flex-basis: 30px;
    white-space: nowrap;
    margin-right: 5px;
  }

  .reply-to {
    max-width: 120px;
    flex: 0 0 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
  }
}

.input-emoji {
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding: 0 12px;
  border-radius: 6px;
}

.input-text {
  white-space: nowrap;
}

.input-placeholder {
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding: 0 12px;
  border-radius: 6px;
  color: gray;
}
.file-picker-wrapper {
  position: absolute;
  width: 60px;
  height: 60px;
  z-index: 1;
  .files-button {
    width: 60px;
    height: 60px;
  }
}
</style>
