<template>
  <div class="g2-message-wrapper" @click="handleCall">
    <Icon :type="iconType" :size="28"></Icon>
    <div class="g2-message-status">{{ status }}</div>
    <div v-if="duration" class="g2-message-duration">{{ duration }}</div>
  </div>
</template>

<script lang="ts" setup>
/** 音视频消息组件 */

import Icon from '../../../components/Icon.vue'
import { t } from '../../../utils/i18n'
import { convertSecondsToTime, startCall, isApp } from '../../../utils'
import { g2StatusMap } from '../../../utils/constants'
import { V2NIMMessageForUI } from '@xkit-yx/im-store-v2/dist/types/types'

const props = withDefaults(defineProps<{ msg: V2NIMMessageForUI }>(), {})

/** 通话时长 */
const duration = convertSecondsToTime(
  //@ts-ignore
  props.msg.attachment?.durations[0]?.duration
)
/** 通话状态 */
//@ts-expect-error
const status = g2StatusMap[props.msg.attachment?.status]
const iconType =
  //@ts-expect-error
  props.msg.attachment?.type == 1 ? 'icon-yuyin8' : 'icon-shipin8'

/** 发起呼叫 */
const handleCall = () => {
  if (isApp) {
    //@ts-ignore
    const callType = props.msg.attachment?.type

    const myAccount = uni.$UIKitStore.userStore.myUserInfo.accountId
    const isSelfMsg = props.msg.senderId === myAccount

    if (isSelfMsg) {
      startCall({
        remoteUserAccid: props.msg.receiverId,
        type: callType,
      })
    } else {
      startCall({
        remoteUserAccid: props.msg.senderId,
        type: callType,
      })
    }
  } else {
    uni.showToast({
      title: t('callFailedText'),
      icon: 'none',
    })
  }
}
</script>

<style scoped lang="scss">
.g2-message-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.g2-message-status {
  margin: 0 7px;
}
</style>
