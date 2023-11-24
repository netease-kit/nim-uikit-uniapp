<template>
  <Tooltip :placement="placement" ref="tooltipRef" v-if="!isSelf" color="white">
    <template #content>
      <div class="msg-action-groups" v-if="!isUnknownMsg">
        <div class="msg-action-btn" v-if="msg.type === 'text'" @tap="handleCopy">
          <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-fuzhi1"></Icon>
          <text class="msg-action-btn-text">{{ $t('copyText') }}</text>
        </div>
        <div class="msg-action-btn" @tap="handleDeleteMsg">
          <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-shanchu"></Icon>
          <text class="msg-action-btn-text">{{ $t('deleteText') }}</text>
        </div>
        <div class="msg-action-btn" @tap="handleForwardMsg">
          <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-zhuanfa"></Icon>
          <text class="msg-action-btn-text">{{ $t('forwardText') }}</text>
        </div>
        <div class="msg-action-btn" @tap="handleReplyMsg">
          <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-huifu"></Icon>
          <text class="msg-action-btn-text">{{ $t('replyText') }}</text>
        </div>
      </div>
      <!-- 未知消息体 -->
      <div class="msg-action-groups-unknown" v-else>
        <div class="msg-action-btn" @tap="handleDeleteMsg">
          <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-shanchu"></Icon>
          <text class="msg-action-btn-text">{{ $t('deleteText') }}</text>
        </div>
      </div>
    </template>
    <div v-if="bgVisible" class="msg-bg msg-bg-in">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </Tooltip>
  <div class="msg-status-wrapper" v-else-if="msg.status === 'sending'">
    <Icon :size="21" color="#337EFF" class="msg-status-icon icon-loading" type="icon-a-Frame8"></Icon>
    <Tooltip :placement="placement" ref="tooltipRef" color="white">
      <template #content>
        <div class="msg-action-groups">
          <div class="msg-action-btn" v-if="msg.type === 'text'" @tap="handleCopy">
            <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-fuzhi1"></Icon>
            <text class="msg-action-btn-text">{{ $t('copyText') }}</text>
          </div>
          <div class="msg-action-btn" @tap="handleDeleteMsg">
            <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-shanchu"></Icon>
            <text class="msg-action-btn-text">{{ $t('deleteText') }}</text>
          </div>
        </div>
      </template>
      <div v-if="bgVisible" class="msg-bg msg-bg-out">
        <slot></slot>
      </div>
      <slot v-else></slot>
    </Tooltip>
  </div>
  <div class="msg-failed-wrapper" v-else-if="msg.status === 'sendFailed' || msg.status === 'refused'">
   <div class="msg-status-wrapper">
     <Icon :size="21" color="#FC596A" class="msg-status-icon icon-fail" type="icon-a-Frame7" @tap="handleResendMsg"></Icon>
    <Tooltip :placement="placement" ref="tooltipRef" color="white">
      <template #content>
        <div class="msg-action-groups" :style="{width: '110px'}">
          <div class="msg-action-btn" v-if="msg.type === 'text'" @tap="handleCopy">
            <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-fuzhi1"></Icon>
            <text class="msg-action-btn-text">{{ $t('copyText') }}</text>
          </div>
          <div class="msg-action-btn" @tap="handleDeleteMsg">
            <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-shanchu"></Icon>
            <text class="msg-action-btn-text">{{ $t('deleteText') }}</text>
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
      {{ $t('sendFailWithInBlackText') }}
    </div>
    <div class="friend-delete" v-else-if="!isFriend && msg.scene !== 'team'">
      {{ $t('sendFailWithDeleteText') }} 
      <span @tap="addFriend" class="friend-verification">{{ $t('friendVerificationText') }}</span>
    </div>
  </div>
  <Tooltip :placement="placement" ref="tooltipRef" v-else-if="tooltipVisible" color="white">
    <template #content>
      <div class="msg-action-groups" v-if="!isUnknownMsg">
        <div class="msg-action-btn" v-if="msg.type === 'text'" @tap="handleCopy">
          <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-fuzhi1"></Icon>
          <text class="msg-action-btn-text">{{ $t('copyText') }}</text>
        </div>
        <div class="msg-action-btn" v-if="msg.attach?.canRecall" @tap="handleRecallMsg">
          <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-chehui"></Icon>
          <text class="msg-action-btn-text">{{ $t('recallText') }}</text>
        </div>
        <div class="msg-action-btn" @tap="handleDeleteMsg">
          <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-shanchu"></Icon>
          <text class="msg-action-btn-text">{{ $t('deleteText') }}</text>
        </div>
        <div class="msg-action-btn" @tap="handleForwardMsg">
          <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-zhuanfa"></Icon>
          <text class="msg-action-btn-text">{{ $t('forwardText') }}</text>
        </div>
        <div class="msg-action-btn" @tap="handleReplyMsg">
          <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-huifu"></Icon>
          <text class="msg-action-btn-text">{{ $t('replyText') }}</text>
        </div>
      </div>
      <!-- 未知消息体 -->
      <div class="msg-action-groups-unknown" v-else>
        <div class="msg-action-btn" @tap="handleDeleteMsg">
          <Icon :size="18" color="#656A72" class="msg-action-btn-icon" type="icon-shanchu"></Icon>
          <text class="msg-action-btn-text">{{ $t('deleteText') }}</text>
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
  <slot v-else></slot>
</template>

<script lang="ts" setup>
import type { IMMessage } from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface';
import { defineProps, ref } from 'vue'
import Tooltip from '../../../uni_modules/zb-tooltip/components/zb-tooltip/zb-tooltip.vue'
import Icon from '../../../components/Icon.vue';
import { t } from '../../../utils/i18n';
import { customNavigateTo, customRedirectTo } from '../../../utils/customNavigate';
import { events } from '../../../utils/constants'
import { autorun } from 'mobx';

const tooltipRef = ref(null)
const props = defineProps<{
  msg: IMMessage
  tooltipVisible?: boolean
  bgVisible?: boolean
  placement?: string
}>()

const store = uni.$UIKitStore

const isSelf = props.msg.from === store.userStore.myUserInfo.account
 
const isFriend = ref(true)

const isUnknownMsg = ref(false)

const closeTooltip = () => {
  // @ts-ignore
  tooltipRef.value.close()
}

const handleCopy = () => {
  uni.setClipboardData({
    data: props.msg.body,
    showToast: true,
    complete() {
      closeTooltip()
    },
  })
}

const handleResendMsg = () => {
  store.msgStore.resendMsgActive(props.msg)
}

const handleForwardMsg = () => {
  uni.showActionSheet({
    itemList: [t('forwardToTeamText'), t('forwardToFriendText')],
    success(data) {
      if (data.tapIndex === 0) {
        customRedirectTo({
          url: `/pages/Chat/forward?forwardScene=team&msgIdClient=${props.msg.idClient}`
        })
      } else if (data.tapIndex === 1) {
        customRedirectTo({
          url: `/pages/Chat/forward?forwardScene=p2p&msgIdClient=${props.msg.idClient}`
        })
      }
    },
    complete() {
      closeTooltip()
    },
  })
}

const handleReplyMsg = async () => {
  await store.msgStore.replyMsgActive(props.msg)
  closeTooltip()
  uni.$emit(events.REPLY_MSG, props.msg)
  // 在群里回复其他人的消息，也是@被回复人
  if (props.msg.scene === 'team' && !isSelf) {
    uni.$emit(events.AIT_TEAM_MEMBER, {
      account: props.msg.from,  
      appellation: store.uiStore.getAppellation({
        account: props.msg.from,
        teamId: props.msg.to,
        ignoreAlias: true,
      }),
    })
  }
}

const handleRecallMsg = () => {
  uni.showModal(({
    title: t('recallText'),
    content: t('recall3'),
    showCancel: true,
    confirmText: t('recallText'),
    confirmColor: '#1861df',
    success(data) {
      if (data.confirm) {
        store.msgStore.reCallMsgActive(props.msg).catch(err => {
          uni.showToast({
            title: t('recallMsgFailText'),
            icon: 'error'
          })
        })
      }
    },
    complete() {
      closeTooltip()
    },
  }))
}

const handleDeleteMsg = () => {
  uni.showModal(({
    title: t('deleteText'),
    content: t('delete'),
    showCancel: true,
    confirmText: t('deleteText'),
    confirmColor: '#1861df',
    success(data) {
      if (data.confirm) {
        store.msgStore.deleteMsgActive([props.msg]).then(() => {
          uni.showToast({
            title: t('deleteMsgSuccessText'),
            icon: 'success'
          })
        }).catch(err => {
          uni.showToast({
            title: t('deleteMsgFailText'),
            icon: 'error'
          })
        })
      }
    },
    complete() {
      closeTooltip()
    },
  }))
}

const addFriend = () => {
  customNavigateTo({
    url: `/pages/user-card/friend/index?account=${props.msg.to}`
  })
}

autorun(() => {
  const _isFriend = store.uiStore.friendsWithoutBlacklist.some(item => item.account === props.msg.to)
  isFriend.value = _isFriend
})

autorun(() => {
  // 当前版本仅支持文本、图片、文件消息，其他消息类型统一为未知消息
  isUnknownMsg.value = !(props.msg.type == 'text' || props.msg.type == 'image' || props.msg.type == 'file')
})
</script>

<style scoped lang="scss">
@import "../../styles/common.scss";

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
  width: 160px;
}

.msg-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 12px 0 12px;

  &-icon {
    color: #656A72;
    font-size: 18px;
  }

  &-text {
    color: #333;
    font-size: 14px;
    word-break: keep-all;
  }
}

.msg-failed-wrapper{
  display: flex; 
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  .in-blacklist{
    color: #B3B7BC;
    font-size: 14px;
    position: relative;
    right: 20%;
    margin: 10px 0;
  }

  .friend-delete{
    color: #B3B7BC;
    font-size: 14px;
    margin: 10px 0;
    .friend-verification{
      color: #337EFF;
      font-size: 14px;
    }
  }
}

.msg-status-wrapper {
  max-width: 390rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
  .msg-bg-out {
    margin-right: 0;
    flex: 1;
  }
}

.msg-status-icon {
  margin-right: 8px;
  font-size: 21px;

  &.icon-loading {
    color: #337EFF;
    animation: loadingCircle 1s infinite linear;
  }

  &.icon-fail {
    color: #FC596A;
  }
}
</style>
