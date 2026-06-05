<template>
  <Tooltip v-if="!msg.isSelf" ref="tooltipRef" color="white">
    <template #content>
      <div class="msg-action-groups" v-if="!isUnknownMsg">
        <div
          class="msg-action-btn"
          v-if="
            msg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
          "
          @tap="handleCopy"
        >
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-fuzhi1"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('copyText') }}</text>
        </div>
        <div
          v-if="
            msg.messageType !==
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
          "
          class="msg-action-btn"
          @tap="handleReplyMsg"
        >
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-huifu"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('replyText') }}</text>
        </div>
        <div
          v-if="
            msg.messageType !==
              V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO &&
            msg.messageType !==
              V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
          "
          class="msg-action-btn"
          @tap="handleForwardMsg"
        >
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-zhuanfa"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('forwardText') }}</text>
        </div>
        <div
          class="msg-action-btn"
          v-if="
            msg.messageType !==
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
          "
          @tap="handlePinMsg"
        >
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-pin"
          ></Icon>
          <text class="msg-action-btn-text">{{
            msg.pinState ? t('unpinText') : t('pinText')
          }}</text>
        </div>
        <div class="msg-action-btn" @tap="handleDeleteMsg">
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-shanchu"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('deleteText') }}</text>
        </div>
        <div
          class="msg-action-btn"
          v-if="
            msg.messageType !==
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
          "
          @tap="handleCollectionMsg"
        >
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-collection"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('collectionText') }}</text>
        </div>
      </div>
      <div class="msg-action-groups-unknown" v-else>
        <div class="msg-action-btn" @tap="handleDeleteMsg">
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-shanchu"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('deleteText') }}</text>
        </div>
      </div>
    </template>
    <div v-if="bgVisible" class="msg-bg msg-bg-in">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </Tooltip>
  <div
    v-else-if="
      msg.sendingState ===
      V2NIMConst.V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_SENDING
    "
    class="msg-status-wrapper"
  >
    <Icon
      :size="21"
      color="#337EFF"
      class="msg-status-icon icon-loading"
      type="icon-a-Frame8"
    ></Icon>
    <Tooltip ref="tooltipRef" color="white" :align="msg.isSelf">
      <template #content>
        <div class="msg-action-groups">
          <div
            class="msg-action-btn"
            v-if="
              msg.messageType ===
              V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
            "
            @tap="handleCopy"
          >
            <Icon
              :size="18"
              color="#656A72"
              class="msg-action-btn-icon"
              type="icon-fuzhi1"
            ></Icon>
            <text class="msg-action-btn-text">{{ t('copyText') }}</text>
          </div>
          <div class="msg-action-btn" @tap="handleDeleteMsg">
            <Icon
              :size="18"
              color="#656A72"
              class="msg-action-btn-icon"
              type="icon-shanchu"
            ></Icon>
            <text class="msg-action-btn-text">{{ t('deleteText') }}</text>
          </div>
        </div>
      </template>
      <div v-if="bgVisible" class="msg-bg msg-bg-out">
        <slot></slot>
      </div>
      <slot v-else></slot>
    </Tooltip>
  </div>
  <div
    v-else-if="
      msg.sendingState ===
        V2NIMConst.V2NIMMessageSendingState
          .V2NIM_MESSAGE_SENDING_STATE_FAILED ||
      messageErrorCode === 102426 ||
      messageErrorCode === 104404
    "
    class="msg-failed-wrapper"
  >
    <div class="msg-failed">
      <div class="msg-status-wrapper" @tap="handleResendMsg">
        <div class="icon-fail">!</div>
      </div>
      <Tooltip ref="tooltipRef" color="white" :align="msg.isSelf">
        <template #content>
          <div
            class="msg-action-groups"
            :style="{
              width:
                msg.messageType ===
                V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
                  ? '112px'
                  : '56px',
            }"
          >
            <div
              class="msg-action-btn"
              v-if="
                msg.messageType ===
                V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
              "
              @tap="handleCopy"
            >
              <Icon
                :size="18"
                color="#656A72"
                class="msg-action-btn-icon"
                type="icon-fuzhi1"
              ></Icon>
              <text class="msg-action-btn-text">{{ t('copyText') }}</text>
            </div>
            <div class="msg-action-btn" @tap="handleDeleteMsg">
              <Icon
                :size="18"
                color="#656A72"
                class="msg-action-btn-icon"
                type="icon-shanchu"
              ></Icon>
              <text class="msg-action-btn-text">{{ t('deleteText') }}</text>
            </div>
          </div>
        </template>
        <div v-if="bgVisible" class="msg-bg msg-bg-out">
          <slot></slot>
        </div>
        <slot v-else></slot>
      </Tooltip>
    </div>
    <div class="in-blacklist" v-if="messageErrorCode === 102426">
      {{ t('sendFailWithInBlackText') }}
    </div>
    <div class="friend-delete" v-else-if="messageErrorCode === 104404">
      {{ t('sendFailWithDeleteText') }}
      <span @tap="addFriend" class="friend-verification">{{
        t('friendVerificationText')
      }}</span>
    </div>
  </div>
  <Tooltip
    v-else-if="tooltipVisible"
    ref="tooltipRef"
    color="white"
    :align="msg.isSelf"
  >
    <template #content>
      <div class="msg-action-groups" v-if="!isUnknownMsg">
        <div
          class="msg-action-btn"
          v-if="
            msg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
          "
          @tap="handleCopy"
        >
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-fuzhi1"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('copyText') }}</text>
        </div>
        <div
          v-if="
            msg.messageType !==
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
          "
          class="msg-action-btn"
          @tap="handleReplyMsg"
        >
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-huifu"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('replyText') }}</text>
        </div>
        <div
          v-if="
            msg.messageType !==
              V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO &&
            msg.messageType !==
              V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
          "
          class="msg-action-btn"
          @tap="handleForwardMsg"
        >
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-zhuanfa"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('forwardText') }}</text>
        </div>
        <div
          class="msg-action-btn"
          v-if="
            msg.messageType !==
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
          "
          @tap="handlePinMsg"
        >
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-pin"
          ></Icon>
          <text class="msg-action-btn-text">{{
            msg.pinState ? t('unpinText') : t('pinText')
          }}</text>
        </div>
        <div class="msg-action-btn" @tap="handleDeleteMsg">
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-shanchu"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('deleteText') }}</text>
        </div>
        <div
          v-if="
            msg.messageType !==
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
          "
          class="msg-action-btn"
          @tap="handleRecallMsg"
        >
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-chehui"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('recallText') }}</text>
        </div>
        <div
          class="msg-action-btn"
          v-if="
            msg.messageType !==
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
          "
          @tap="handleCollectionMsg"
        >
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-collection"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('collectionText') }}</text>
        </div>
      </div>
      <div class="msg-action-groups-unknown" v-else>
        <div class="msg-action-btn" @tap="handleDeleteMsg">
          <Icon
            :size="18"
            color="#656A72"
            class="msg-action-btn-icon"
            type="icon-shanchu"
          ></Icon>
          <text class="msg-action-btn-text">{{ t('deleteText') }}</text>
        </div>
      </div>
    </template>
    <div v-if="bgVisible" class="msg-bg msg-bg-out">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </Tooltip>
  <div v-else-if="bgVisible" class="msg-bg msg-bg-out">
    <slot></slot>
  </div>
  <div v-else>
    <slot></slot>
  </div>
</template>

<script>
/** 消息操作组件 */
import Tooltip from '../../../components/Tooltip.vue'
import Icon from '../../../components/Icon.vue'
import { customNavigateTo } from '../../../utils/customNavigate'
import { events, msgRecallTime } from '../../../utils/constants'
import { V2NIMConst } from '../../../utils/nim'
import { t } from '../../../utils/i18n'

export default {
  components: {
    Tooltip,
    Icon,
  },
  props: {
    msg: {
      type: Object,
      default: () => ({}),
    },
    tooltipVisible: {
      type: Boolean,
      default: false,
    },
    bgVisible: {
      type: Boolean,
      default: false,
    },
    placement: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      V2NIMConst,
      enableV2CloudConversation:
        uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation,
    }
  },
  computed: {
    conversationType() {
      return uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(
        this.msg.conversationId
      )
    },
    isUnknownMsg() {
      return !(
        this.msg.messageType ==
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT ||
        this.msg.messageType ==
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE ||
        this.msg.messageType ==
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE ||
        this.msg.messageType ==
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO ||
        this.msg.messageType ==
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO ||
        this.msg.messageType ==
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
      )
    },
    messageErrorCode() {
      return this.msg.messageStatus?.errorCode
    },
  },
  methods: {
    t,
    closeTooltip() {
      const tooltipRef = this.$refs.tooltipRef
      if (tooltipRef && typeof tooltipRef.close === 'function') {
        tooltipRef.close()
      }
    },
    scrollBottom() {
      setTimeout(() => {
        uni.$emit(events.ON_SCROLL_BOTTOM)
      }, 100)
    },
    handleCopy() {
      uni.setClipboardData({
        data: this.msg.text || '',
        showToast: false,
        success: () => {
          uni.showToast({
            title: t('copySuccessText'),
            icon: 'none',
          })
        },
        fail: () => {
          uni.showToast({
            title: t('copyFailText'),
            icon: 'none',
          })
        },
        complete: () => {
          this.closeTooltip()
        },
      })
    },
    async handleResendMsg() {
      const msg = this.msg
      uni.$UIKitStore.msgStore.removeMsg(msg.conversationId, [msg.messageClientId])

      try {
        if (msg.threadReply) {
          const beReplyMsg =
            await uni.$UIKitNIM.V2NIMMessageService.getMessageListByRefers([
              msg.threadReply,
            ])
          if (beReplyMsg.length > 0) {
            uni.$UIKitStore.msgStore.replyMsgActive(beReplyMsg[0])
          }
        }

        uni.$UIKitStore.msgStore.sendMessageActive({
          msg,
          conversationId: msg.conversationId,
          progress: () => true,
          sendBefore: () => {
            this.scrollBottom()
          },
        })

        this.scrollBottom()
      } catch (error) {
        console.log(error)
      }
    },
    handleForwardMsg() {
      uni.showActionSheet({
        itemList: [t('forwardToTeamText'), t('forwardToFriendText')],
        success: (data) => {
          if (data.tapIndex === 0) {
            customNavigateTo({
              url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM}&msgIdClient=${this.msg.messageClientId}`,
            })
          } else if (data.tapIndex === 1) {
            customNavigateTo({
              url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P}&msgIdClient=${this.msg.messageClientId}`,
            })
          }
        },
        complete: () => {
          this.closeTooltip()
        },
      })
    },
    handlePinMsg() {
      const msg = this.msg
      if (msg.pinState) {
        uni.$UIKitStore.msgStore.unpinMessageActive(msg).catch((err) => {
          if (err?.code && typeof t(`${err.code}`) !== 'undefined') {
            uni.showToast({
              title: t(`${err.code}`),
              icon: 'error',
              duration: 1000,
            })
          } else {
            uni.showToast({
              title: t('unpinFailedText'),
              icon: 'error',
              duration: 1000,
            })
          }
        })
      } else {
        uni.$UIKitStore.msgStore.pinMessageActive(msg).catch((err) => {
          if (err?.code && typeof t(`${err.code}`) !== 'undefined') {
            uni.showToast({
              title: t(`${err.code}`),
              icon: 'error',
              duration: 1000,
            })
          } else {
            uni.showToast({
              title: t('pinFailedText'),
              icon: 'error',
              duration: 1000,
            })
          }
        })
      }
      this.closeTooltip()
    },
    handleCollectionMsg() {
      const msg = this.msg
      const conversation = this.enableV2CloudConversation
        ? uni.$UIKitStore.conversationStore?.conversations.get(msg.conversationId)
        : uni.$UIKitStore.localConversationStore?.conversations.get(
            msg.conversationId
          )
      const collectionDataObj = {
        message: uni.$UIKitNIM.V2NIMMessageConverter.messageSerialization(msg),
        avatar: uni.$UIKitStore.userStore.users.get(msg.senderId)?.avatar,
        conversationName: conversation?.name,
        senderName: uni.$UIKitStore.uiStore.getAppellation({
          account: msg.senderId,
          teamId:
            this.conversationType ===
            V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
              ? msg.receiverId
              : '',
        }),
      }
      const addCollectionParams = {
        collectionType: 1000 + msg.messageType,
        collectionData: JSON.stringify(collectionDataObj),
        uniqueId: msg.messageServerId,
      }

      uni.$UIKitStore.msgStore
        .addCollectionActive(addCollectionParams)
        .then(() => {
          uni.showToast({
            title: t('addCollectionSuccessText'),
            icon: 'none',
          })
        })
        .catch((err) => {
          if (err?.code && typeof t(`${err.code}`) !== 'undefined') {
            uni.showToast({
              title: t(`${err.code}`),
              icon: 'error',
              duration: 1000,
            })
          } else {
            uni.showToast({
              title: t('addCollectionFailedText'),
              icon: 'error',
              duration: 1000,
            })
          }
        })
      this.closeTooltip()
    },
    handleReplyMsg() {
      const msg =
        uni.$UIKitStore.msgStore.getMsg(this.msg.conversationId, [
          this.msg.messageClientId,
        ])?.[0] || this.msg
      uni.$UIKitStore.msgStore.replyMsgActive(msg)
      this.closeTooltip()
      uni.$emit(events.REPLY_MSG, this.msg)

      if (
        this.conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM &&
        !this.msg.isSelf
      ) {
        uni.$emit(events.AIT_TEAM_MEMBER, {
          accountId: this.msg.senderId,
          appellation: uni.$UIKitStore.uiStore.getAppellation({
            account: this.msg.senderId,
            teamId: this.msg.receiverId,
            ignoreAlias: true,
          }),
        })
      }
    },
    handleRecallMsg() {
      const diff = Date.now() - this.msg.createTime
      if (diff > msgRecallTime) {
        uni.showToast({
          title: t('msgRecallTimeErrorText'),
          icon: 'none',
        })
        this.closeTooltip()
        return
      }
      uni.showModal({
        title: t('recallText'),
        content: t('recall3'),
        showCancel: true,
        confirmText: t('recallText'),
        confirmColor: '#1861df',
        success: (data) => {
          if (data.confirm) {
            uni.$UIKitStore.msgStore.reCallMsgActive(this.msg).catch(() => {
              uni.showToast({
                title: t('recallMsgFailText'),
                icon: 'error',
              })
            })
          }
        },
        complete: () => {
          this.closeTooltip()
        },
      })
    },
    handleDeleteMsg() {
      const msg = this.msg
      uni.showModal({
        title: t('deleteText'),
        content: t('delete'),
        showCancel: true,
        confirmText: t('deleteText'),
        confirmColor: '#1861df',
        success: (data) => {
          if (data.confirm) {
            uni.$UIKitStore.msgStore
              .deleteMsgActive([msg])
              .then(() => {
                uni.$emit(events.DELETE_MSG_SUCCESS, msg)
                uni.showToast({
                  title: t('deleteMsgSuccessText'),
                  icon: 'none',
                })
              })
              .catch(() => {
                uni.showToast({
                  title: t('deleteMsgFailText'),
                  icon: 'error',
                })
              })
          }
        },
        complete: () => {
          this.closeTooltip()
        },
      })
    },
    addFriend() {
      customNavigateTo({
        url: `/pages/User/friend/index?account=${this.msg.receiverId}`,
      })
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';

.msg-bg {
  max-width: 380rpx;
  overflow: hidden;
  padding: 12px 16px;

  &-in {
    border-radius: 0 8px 8px 8px;
    background-color: #e8eaed;
    margin-left: 8px;
  }

  &-out {
    border-radius: 8px 0 8px 8px;
    background-color: #d6e5f6;
    margin-right: 8px;
  }
}

.msg-action-groups {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  max-width: 224px;
  width: max-content;
}

.msg-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  width: 56px;
  &-icon {
    color: #656a72;
    font-size: 18px;
  }

  &-text {
    color: #333;
    font-size: 14px;
    word-break: keep-all;
  }
}

.msg-failed-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;

  .in-blacklist {
    color: #b3b7bc;
    font-size: 14px;
    position: relative;
    right: 20%;
    margin: 10px 0;
  }

  .friend-delete {
    color: #b3b7bc;
    font-size: 14px;
    margin: 10px 0;

    .friend-verification {
      color: #337eff;
      font-size: 14px;
    }
  }
}

.msg-status-wrapper {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  box-sizing: border-box;
  .msg-bg-out {
    margin-right: 0;
    flex: 1;
  }
}

.msg-status-icon {
  margin-right: 8px;
  font-size: 21px;
  position: absolute;
  bottom: 2px;
  left: -30px;

  &.icon-loading {
    color: #337eff;
    animation: loadingCircle 1s infinite linear;
  }
}

.icon-fail {
  background: #fc596a;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  margin-right: 5px;
  font-size: 15px;
}

.msg-failed {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>
