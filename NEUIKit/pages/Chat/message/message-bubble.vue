<template>
  <Tooltip v-if="!isSelf" :placement="placement" ref="tooltipRef" color="white">
    <template #content>
      <div class="msg-action-groups" v-if="!isUnknownMsg">
        <div
          class="msg-action-btn"
          v-if="msg.type === 'text'"
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
        <div
          v-if="msg.type !== 'audio' && msg.type !== 'g2'"
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
          v-if="msg.type !== 'g2'"
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
  <div v-else-if="msg.status === 'sending'" class="msg-status-wrapper">
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
      :align="isSelf"
    >
      <template #content>
        <div class="msg-action-groups">
          <div
            class="msg-action-btn"
            v-if="msg.type === 'text'"
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
    v-else-if="msg.status === 'sendFailed' || msg.status === 'refused'"
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
        :align="isSelf"
      >
        <template #content>
          <div
            class="msg-action-groups"
            :style="{ width: msg.type === 'text' ? '110px' : '55px' }"
          >
            <div
              class="msg-action-btn"
              v-if="msg.type === 'text'"
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
    <div class="in-blacklist" v-if="msg.status === 'refused'">
      {{ t('sendFailWithInBlackText') }}
    </div>
    <div class="friend-delete" v-else-if="!isFriend && msg.scene !== 'team'">
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
    :align="isSelf"
  >
    <template #content>
      <div class="msg-action-groups" v-if="!isUnknownMsg">
        <div
          class="msg-action-btn"
          v-if="msg.type === 'text'"
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
          class="msg-action-btn"
          v-if="msg.attach && msg.attach.canRecall"
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
          v-if="msg.type !== 'audio' && msg.type !== 'g2'"
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
          v-if="msg.type !== 'g2'"
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
import { onMounted, onUnmounted, ref } from '../../../utils/transformVue'
// @ts-ignore
import Tooltip from '../../../components/Tooltip.vue'
import Icon from '../../../components/Icon.vue'
import { t } from '../../../utils/i18n'
import { customNavigateTo } from '../../../utils/customNavigate'
import { events } from '../../../utils/constants'
import { autorun } from 'mobx'
import { deepClone } from '../../../utils'

const tooltipRef = ref(null)
const props = defineProps({
  msg: {
    type: Object, // Assuming IMMessage is a custom object type
    default: () => ({
      idClient: undefined,
      body: undefined,
      attach: {
        type: undefined,
        value: undefined,
        url: undefined,
        canEdit: false,
        canRecall: false,
      },
    }),
    required: true,
  },
  tooltipVisible: {
    type: Boolean,
    default: undefined,
  },
  bgVisible: {
    type: Boolean,
    default: undefined,
  },
  placement: {
    type: String,
    default: undefined,
  },
})

const isSelf = ref(false)

onMounted(() => {
  // @ts-ignore
  isSelf.value = props.msg.from === uni.$UIKitStore.userStore.myUserInfo.account

  // 当前版本仅支持文本、图片、文件、语音、视频 话单消息，其他消息类型统一为未知消息
  isUnknownMsg.value = !(
    props.msg.type == 'text' ||
    props.msg.type == 'image' ||
    props.msg.type == 'file' ||
    props.msg.type == 'audio' ||
    props.msg.type == 'video' ||
    props.msg.type == 'g2'
  )
})

const uninstallMyUserInfoWatch = autorun(() => {
  // @ts-ignore
  isSelf.value = props.msg.from === uni.$UIKitStore.userStore.myUserInfo.account
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
    data: props.msg.body,
    showToast: true,
    complete() {
      closeTooltip()
    },
  })
}
// 重发消息
const handleResendMsg = () => {
  const _msg = deepClone(props.msg)
  // 当filePath存在时，说明此次发送失败是由于断网导致的，而不是因为拉黑
  const filePath = props.msg?.uploadFileInfo?.filePath
  if (props.msg.type === 'video' && filePath) {
    // @ts-ignore
    uni.$UIKitStore.msgStore.removeMsg(props.msg.sessionId, [
      props.msg.idClient,
    ])
    // @ts-ignore
    uni.$UIKitStore.msgStore
      .sendVideoMsgActive({
        scene: props.msg.scene,
        to: props.msg.to,
        filePath: props.msg.uploadFileInfo.filePath,
        onUploadStart: () => {
          setTimeout(() => {
            uni.$emit(events.ON_SCROLL_BOTTOM)
          }, 100)
        },
      })
      .catch(() => {
        uni.showToast({
          title: t('resendMsgFailText'),
          icon: 'error',
        })
      })
      .finally(() => {
        // sendingImg.value = false
        setTimeout(() => {
          uni.$emit(events.ON_SCROLL_BOTTOM)
        }, 100)
      })
  } else if (props.msg.type === 'audio' && filePath) {
    // @ts-ignore
    uni.$UIKitStore.msgStore.removeMsg(props.msg.sessionId, [
      props.msg.idClient,
    ])
    // @ts-ignore
    uni.$UIKitStore.msgStore
      .sendAudioMsgActive({
        scene: props.msg.scene,
        to: props.msg.to,
        filePath: props.msg.uploadFileInfo.filePath,
        onUploadStart: () => {
          setTimeout(() => {
            uni.$emit(events.ON_SCROLL_BOTTOM)
          }, 100)
        },
      })
      .catch(() => {
        uni.showToast({
          title: t('resendMsgFailText'),
          icon: 'error',
        })
      })
      .finally(() => {
        setTimeout(() => {
          uni.$emit(events.ON_SCROLL_BOTTOM)
        }, 100)
      })
  } else if (props.msg.type === 'image' && filePath) {
    // @ts-ignore
    uni.$UIKitStore.msgStore.removeMsg(props.msg.sessionId, [
      props.msg.idClient,
    ])
    // @ts-ignore
    uni.$UIKitStore.msgStore
      .sendImageMsgActive({
        scene: props.msg.scene,
        to: props.msg.to,
        filePath: props.msg.uploadFileInfo.filePath,
      })
      .catch(() => {
        uni.showToast({
          title: t('resendMsgFailText'),
          icon: 'error',
        })
      })
      .finally(() => {
        setTimeout(() => {
          uni.$emit(events.ON_SCROLL_BOTTOM)
        }, 300)
      })
  } else {
    // @ts-ignore
    uni.$UIKitStore.msgStore.resendMsgActive(_msg).catch((error) => {
      uni.showToast({
        title: t('resendMsgFailText'),
        icon: 'error',
      })
    })
  }
}

// 转发消息
const handleForwardMsg = () => {
  uni.showActionSheet({
    itemList: [t('forwardToTeamText'), t('forwardToFriendText')],
    success(data) {
      if (data.tapIndex === 0) {
        customNavigateTo({
          url: `/pages/Chat/forward?forwardScene=team&msgIdClient=${props.msg.idClient}`,
        })
      } else if (data.tapIndex === 1) {
        customNavigateTo({
          url: `/pages/Chat/forward?forwardScene=p2p&msgIdClient=${props.msg.idClient}`,
        })
      }
    },
    complete() {
      closeTooltip()
    },
  })
}

// 回复消息
const handleReplyMsg = async () => {
  const _msg = deepClone(props.msg)
  // @ts-ignore
  await uni.$UIKitStore.msgStore.replyMsgActive(_msg)
  closeTooltip()
  uni.$emit(events.REPLY_MSG, props.msg)

  // 在群里回复其他人的消息，也是@被回复人
  if (props.msg.scene === 'team' && !isSelf.value) {
    uni.$emit(events.AIT_TEAM_MEMBER, {
      account: props.msg.from,
      // @ts-ignore
      appellation: uni.$UIKitStore.uiStore.getAppellation({
        account: props.msg.from,
        teamId: props.msg.to,
        ignoreAlias: true,
      }),
    })
  }
}

// 撤回消息
const handleRecallMsg = () => {
  uni.showModal({
    title: t('recallText'),
    content: t('recall3'),
    showCancel: true,
    confirmText: t('recallText'),
    confirmColor: '#1861df',
    success(data) {
      if (data.confirm) {
        const _msg = deepClone(props.msg)
        // @ts-ignore
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
        // @ts-ignore
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
    url: `/pages/user-card/friend/index?account=${props.msg.to}`,
  })
}

const uninstallFriendsWatch = autorun(() => {
  // @ts-ignore
  const _isFriend = uni.$UIKitStore.uiStore.friendsWithoutBlacklist.some(
    (item: any) => item.account === props.msg.to
  )
  isFriend.value = _isFriend
})

onUnmounted(() => {
  uninstallMyUserInfoWatch()
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
  // flex-wrap: wrap;
  // width: 120px;
}

.msg-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 12px 0 12px;
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
