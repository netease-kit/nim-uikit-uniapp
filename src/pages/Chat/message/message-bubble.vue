<template>
  <Tooltip :placement="placement" ref="tooltipRef" v-if="msg.flow === 'in'" color="white">
    <template #content>
      <div class="msg-action-groups">
        <div class="msg-action-btn" v-if="msg.type === 'text'" @tap="handleCopy">
          <Icon class="msg-action-btn-icon" type="icon-fuzhi1"></Icon>
          <text class="msg-action-btn-text">{{ $t('copyText') }}</text>
        </div>
        <div class="msg-action-btn" @tap="handleDeleteMsg">
          <Icon class="msg-action-btn-icon" type="icon-shanchu"></Icon>
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
    <Icon class="msg-status-icon icon-loading" type="icon-a-Frame8"></Icon>
    <Tooltip :placement="placement" ref="tooltipRef" color="white">
      <template #content>
        <div class="msg-action-groups">
          <div class="msg-action-btn" v-if="msg.type === 'text'" @tap="handleCopy">
            <Icon class="msg-action-btn-icon" type="icon-fuzhi1"></Icon>
            <text class="msg-action-btn-text">{{ $t('copyText') }}</text>
          </div>
          <div class="msg-action-btn" @tap="handleDeleteMsg">
            <Icon class="msg-action-btn-icon" type="icon-shanchu"></Icon>
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
  <div class="msg-status-wrapper" v-else-if="msg.status === 'sendFailed'">
    <Icon class="msg-status-icon icon-fail" type="icon-a-Frame7" @tap="handleResendMsg"></Icon>
    <Tooltip :placement="placement" ref="tooltipRef" color="white">
      <template #content>
        <div class="msg-action-groups">
          <div class="msg-action-btn" v-if="msg.type === 'text'" @tap="handleCopy">
            <Icon class="msg-action-btn-icon" type="icon-fuzhi1"></Icon>
            <text class="msg-action-btn-text">{{ $t('copyText') }}</text>
          </div>
          <div class="msg-action-btn" @tap="handleDeleteMsg">
            <Icon class="msg-action-btn-icon" type="icon-shanchu"></Icon>
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
  <Tooltip :placement="placement" ref="tooltipRef" v-else-if="tooltipVisible" color="white">
    <template #content>
      <div class="msg-action-groups">
        <div class="msg-action-btn" v-if="msg.type === 'text'" @tap="handleCopy">
          <Icon class="msg-action-btn-icon" type="icon-fuzhi1"></Icon>
          <text class="msg-action-btn-text">{{ $t('copyText') }}</text>
        </div>
        <div class="msg-action-btn" v-if="msg.attach?.canRecall" @tap="handleRecallMsg">
          <Icon class="msg-action-btn-icon" type="icon-chehui"></Icon>
          <text class="msg-action-btn-text">{{ $t('recallText') }}</text>
        </div>
        <div class="msg-action-btn" @tap="handleDeleteMsg">
          <Icon class="msg-action-btn-icon" type="icon-shanchu"></Icon>
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

const tooltipRef = ref(null)

const props = defineProps<{
  msg: IMMessage
  tooltipVisible?: boolean
  bgVisible?: boolean
  placement?: string
}>()

const store = uni.$UIKitStore

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

</script>

<style scoped lang="scss">
@import "../../styles/common.scss";

.msg-bg {
  max-width: 360rpx;
  overflow: hidden;
  padding: 12px 16px;
  display: flex;
  flex-direction: row;

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
}

.msg-action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;

  &:not(:last-child) {
    margin-right: 32px;
  }

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
