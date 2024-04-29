<template>
  <div class="g2-message-wrapper" @click="handleCall">
    <Icon :type="iconType" :size="28"></Icon>
    <div class="g2-message-status">{{ status }}</div>
    <div v-if="duration" class="g2-message-duration">{{ duration }}</div>
  </div>
</template>

<script lang="ts" setup>
import Icon from '../../../components/Icon.vue'
import { t } from '../../../utils/i18n'
import { convertSecondsToTime, startCall, isApp } from '../../../utils'
import { g2StatusMap, STORAGE_KEY } from '../../../utils/constants'
const props = defineProps({
  msg: {
    type: Object,
    required: true,
  },
})

const attach = props.msg.attach
const duration = convertSecondsToTime(attach?.durations[0]?.duration)
const status = g2StatusMap[attach?.status]
const iconType = attach?.type == 1 ? 'icon-yuyin8' : 'icon-shipin8'

// 发起呼叫
const handleCall = () => {
  if (isApp) {
    const callType = attach?.type
    // @ts-ignore
    const myAccount = uni.$UIKitStore.userStore.myUserInfo.account
    const isSelfMsg = props.msg.from === myAccount

    if (isSelfMsg) {
      // @ts-ignore
      const remoteShowName = uni.$UIKitStore.uiStore.getAppellation({
        account: props.msg.to,
      })
      console.log('===========remoteShowName=========', remoteShowName)

      startCall({
        remoteUserAccid: props.msg.to,
        currentUserAccid: myAccount,
        type: callType,
        remoteShowName: remoteShowName,
      })
    } else {
      // @ts-ignore
      const remoteShowName = uni.$UIKitStore.uiStore.getAppellation({
        account: props.msg.from,
      })
      startCall({
        remoteUserAccid: props.msg.from,
        currentUserAccid: myAccount,
        type: callType,
        remoteShowName: remoteShowName,
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
