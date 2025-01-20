<template>
  <Tooltip
    v-if="!props.msg.isSelf"
    :placement="placement"
    ref="tooltipRef"
    color="white"
  >
    <template #content>
      <div class="msg-action-groups" v-if="!isUnknownMsg">
        <div
          class="msg-action-btn"
          v-if="
            props.msg.messageType ===
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
            props.msg.messageType !==
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
            props.msg.messageType !==
              V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO &&
            props.msg.messageType !==
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
            props.msg.messageType !==
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
          <!-- pinState 为 0 或者 undefined，显示“标记”，其他显示“取消标记” -->
          <text class="msg-action-btn-text">{{
            props.msg.pinState ? t('unpinText') : t('pinText')
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
            props.msg.messageType !==
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
      <!-- 未知消息体 -->
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
      props.msg.sendingState ===
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
    <Tooltip
      :placement="placement"
      ref="tooltipRef"
      color="white"
      :align="props.msg.isSelf"
    >
      <template #content>
        <div class="msg-action-groups">
          <div
            class="msg-action-btn"
            v-if="
              props.msg.messageType ===
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
      props.msg.sendingState ===
        V2NIMConst.V2NIMMessageSendingState
          .V2NIM_MESSAGE_SENDING_STATE_FAILED ||
      props.msg.errorCode === 102426 ||
      props.msg.errorCode === 104404
    "
    class="msg-failed-wrapper"
  >
    <div class="msg-failed">
      <div class="msg-status-wrapper" @tap="handleResendMsg">
        <div class="icon-fail">!</div>
      </div>
      <Tooltip
        :placement="placement"
        ref="tooltipRef"
        color="white"
        :align="props.msg.isSelf"
      >
        <template #content>
          <div
            class="msg-action-groups"
            :style="{
              width:
                props.msg.messageType ===
                V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
                  ? '112px'
                  : '56px',
            }"
          >
            <div
              class="msg-action-btn"
              v-if="
                props.msg.messageType ===
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
    <div class="in-blacklist" v-if="props.msg.errorCode === 102426">
      {{ t('sendFailWithInBlackText') }}
    </div>
    <div class="friend-delete" v-else-if="props.msg.errorCode === 104404">
      {{ t('sendFailWithDeleteText') }}
      <span @tap="addFriend" class="friend-verification">{{
        t('friendVerificationText')
      }}</span>
    </div>
  </div>
  <Tooltip
    v-else-if="tooltipVisible"
    :placement="placement"
    ref="tooltipRef"
    color="white"
    :align="props.msg.isSelf"
  >
    <template #content>
      <div class="msg-action-groups" v-if="!isUnknownMsg">
        <div
          class="msg-action-btn"
          v-if="
            props.msg.messageType ===
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
            props.msg.messageType !==
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
            props.msg.messageType !==
              V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO &&
            props.msg.messageType !==
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
            props.msg.messageType !==
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
          <!-- pinState 为 0 或者 undefined，显示“标记”，其他显示“取消标记” -->
          <text class="msg-action-btn-text">{{
            props.msg.pinState ? t('unpinText') : t('pinText')
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
        <div class="msg-action-btn" @tap="handleRecallMsg">
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
            props.msg.messageType !==
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
      <!-- 未知消息体 -->
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

<script lang="ts" setup>
import {
  onMounted,
  onUnmounted,
  ref,
  withDefaults,
  defineProps,
} from '../../../utils/transformVue'
// @ts-ignore
import Tooltip from '../../../components/Tooltip.vue'
import Icon from '../../../components/Icon.vue'
import { t } from '../../../utils/i18n'
import { customNavigateTo } from '../../../utils/customNavigate'
import { events } from '../../../utils/constants'
import { autorun } from 'mobx'
import { deepClone } from '../../../utils'
import { V2NIMMessageForUI } from '@xkit-yx/im-store-v2/dist/types/types'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/esm/nim'
import { msgRecallTime } from '../../../utils/constants'
const tooltipRef = ref(null)

const props = withDefaults(
  defineProps<{
    msg: V2NIMMessageForUI
    tooltipVisible?: boolean
    bgVisible?: boolean
    placement?: string
  }>(),
  {}
)
const conversationType =
  uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(
    props.msg.conversationId
  ) as unknown as V2NIMConst.V2NIMConversationType

onMounted(() => {
  // 当前版本仅支持文本、图片、文件、语音、视频 话单消息，其他消息类型统一为未知消息
  isUnknownMsg.value = !(
    props.msg.messageType ==
      V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT ||
    props.msg.messageType ==
      V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE ||
    props.msg.messageType ==
      V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE ||
    props.msg.messageType ==
      V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO ||
    props.msg.messageType ==
      V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO ||
    props.msg.messageType == V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
  )
})

const isFriend = ref(true)

// 未知消息
const isUnknownMsg = ref(false)

const closeTooltip = () => {
  // @ts-ignore
  tooltipRef.value.close()
}

// 复制消息
const handleCopy = () => {
  uni.setClipboardData({
    data: props.msg.text || '',
    showToast: true,
    complete() {
      closeTooltip()
    },
  })
}

const scrollBottom = () => {
  setTimeout(() => {
    uni.$emit(events.ON_SCROLL_BOTTOM)
  }, 100)
}

// 重发消息
const handleResendMsg = async () => {
  const _msg = deepClone(props.msg) as V2NIMMessageForUI
  uni.$UIKitStore.msgStore.removeMsg(_msg.conversationId, [
    _msg.messageClientId,
  ])

  try {
    switch (_msg.messageType) {
      case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE:
      case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO:
        await uni.$UIKitStore.msgStore.sendMessageActive({
          msg: _msg,
          conversationId: _msg.conversationId,
          progress: () => true,
          sendBefore: () => {
            scrollBottom()
          },
        })
        break
      case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT:
        await uni.$UIKitStore.msgStore.sendMessageActive({
          msg: _msg,
          conversationId: _msg.conversationId,
          sendBefore: () => {
            scrollBottom()
          },
        })
        break
      default:
        await uni.$UIKitStore.msgStore.sendMessageActive({
          msg: _msg,
          conversationId: _msg.conversationId,
          sendBefore: () => {
            scrollBottom()
          },
        })
        break
    }

    scrollBottom()
  } catch (error) {
    //
  }
}

// 转发消息
const handleForwardMsg = () => {
  uni.showActionSheet({
    itemList: [t('forwardToTeamText'), t('forwardToFriendText')],
    success(data) {
      if (data.tapIndex === 0) {
        customNavigateTo({
          url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM}&msgIdClient=${props.msg.messageClientId}`,
        })
      } else if (data.tapIndex === 1) {
        customNavigateTo({
          url: `/pages/Chat/forward?forwardConversationType=${V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P}&msgIdClient=${props.msg.messageClientId}`,
        })
      }
    },
    complete() {
      closeTooltip()
    },
  })
}
// pin消息
const handlePinMsg = () => {
  const _msg = deepClone(props.msg)
  if (_msg.pinState) {
    // 取消标记
    uni.$UIKitStore.msgStore.unpinMessageActive(_msg).catch((err: any) => {
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
    // 显示标记
    uni.$UIKitStore.msgStore.pinMessageActive(_msg).catch((err: any) => {
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
  closeTooltip()
}

// 收藏消息
const handleCollectionMsg = () => {
  const _msg = deepClone(props.msg)

  const conversation = uni.$UIKitStore.conversationStore.conversations.get(
    _msg.conversationId
  )
  const collectionDataObj = {
    message: uni.$UIKitNIM.V2NIMMessageConverter.messageSerialization(_msg), // 序列化
    avatar: uni.$UIKitStore.userStore.users.get(_msg.senderId)?.avatar,
    conversationName: conversation?.name,
    senderName: uni.$UIKitStore.uiStore.getAppellation({
      account: _msg.senderId,
      teamId:
        conversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
          ? _msg.receiverId
          : '',
    }),
  }
  const addCollectionParams = {
    collectionType: 1000 + _msg.messageType, // 和移动端对齐
    collectionData: JSON.stringify(collectionDataObj),
    uniqueId: _msg.messageServerId,
  }

  uni.$UIKitStore.msgStore
    .addCollectionActive(addCollectionParams)
    .then(() => {
      uni.showToast({
        title: t('addCollectionSuccessText'),
        icon: 'success',
      })
    })
    .catch((err: any) => {
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
  closeTooltip()
}

// 回复消息
const handleReplyMsg = async () => {
  const _msg = deepClone(props.msg)

  uni.$UIKitStore.msgStore.replyMsgActive(_msg)
  closeTooltip()
  uni.$emit(events.REPLY_MSG, props.msg)

  // 在群里回复其他人的消息，也是@被回复人
  if (
    conversationType ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM &&
    !props.msg.isSelf
  ) {
    uni.$emit(events.AIT_TEAM_MEMBER, {
      accountId: props.msg.senderId,
      appellation: uni.$UIKitStore.uiStore.getAppellation({
        account: props.msg.senderId,
        teamId: props.msg.receiverId,
        ignoreAlias: true,
      }),
    })
  }
}

// 撤回消息
const handleRecallMsg = () => {
  const diff = Date.now() - props.msg.createTime
  if (diff > msgRecallTime) {
    uni.showToast({
      title: t('msgRecallTimeErrorText'),
      icon: 'none',
    })
    closeTooltip()
    return
  }
  uni.showModal({
    title: t('recallText'),
    content: t('recall3'),
    showCancel: true,
    confirmText: t('recallText'),
    confirmColor: '#1861df',
    success(data) {
      if (data.confirm) {
        const _msg = deepClone(props.msg)

        uni.$UIKitStore.msgStore.reCallMsgActive(_msg).catch(() => {
          uni.showToast({
            title: t('recallMsgFailText'),
            icon: 'error',
          })
        })
      }
    },
    complete() {
      closeTooltip()
    },
  })
}

// 删除消息
const handleDeleteMsg = () => {
  const _msg = deepClone(props.msg)
  uni.showModal({
    title: t('deleteText'),
    content: t('delete'),
    showCancel: true,
    confirmText: t('deleteText'),
    confirmColor: '#1861df',
    success(data) {
      if (data.confirm) {
        uni.$UIKitStore.msgStore
          .deleteMsgActive([_msg])
          .then(() => {
            uni.showToast({
              title: t('deleteMsgSuccessText'),
              icon: 'success',
            })
          })
          .catch((error: any) => {
            uni.showToast({
              title: t('deleteMsgFailText'),
              icon: 'error',
            })
          })
      }
    },
    complete() {
      closeTooltip()
    },
  })
}

// 添加好友
const addFriend = () => {
  customNavigateTo({
    url: `/pages/user-card/friend/index?account=${props.msg.receiverId}`,
  })
}

const uninstallFriendsWatch = autorun(() => {
  const _isFriend = uni.$UIKitStore.uiStore.friends
    .filter(
      (item) =>
        !uni.$UIKitStore.relationStore.blacklist.includes(item.accountId)
    )
    .map((item) => item.accountId)
    .some((item: any) => item.account === props.msg.receiverId)
  isFriend.value = _isFriend
})

onUnmounted(() => {
  uninstallFriendsWatch()
})
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';

.msg-bg {
  max-width: 360rpx;
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
  // max-width: 450rpx;
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
