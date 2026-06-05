<template>
  <div class="g2-message-wrapper" @click="handleCall">
    <Icon :type="iconType" :size="28"></Icon>
    <div class="g2-message-status">{{ status }}</div>
    <div v-if="duration" class="g2-message-duration">{{ duration }}</div>
  </div>
</template>

<script>
/** 音视频消息组件 */

import Icon from '../../../components/Icon.vue'
import { t } from '../../../utils/i18n'
import { convertSecondsToTime, startCall, isApp } from '../../../utils'
import { g2StatusMap } from '../../../utils/constants'

export default {
  components: {
    Icon,
  },
  props: {
    msg: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    duration() {
      return convertSecondsToTime(this.msg.attachment?.durations?.[0]?.duration)
    },
    status() {
      return g2StatusMap[this.msg.attachment?.status]
    },
    iconType() {
      return this.msg.attachment?.type == 1 ? 'icon-yuyin8' : 'icon-shipin8'
    },
  },
  methods: {
    handleCall() {
      if (isApp) {
        const callType = this.msg.attachment?.type
        const myAccount = uni.$UIKitStore.userStore.myUserInfo.accountId
        const isSelfMsg = this.msg.senderId === myAccount

        if (isSelfMsg) {
          startCall({
            remoteUserAccid: this.msg.receiverId,
            type: callType,
          })
        } else {
          startCall({
            remoteUserAccid: this.msg.senderId,
            type: callType,
          })
        }
      } else {
        uni.showToast({
          title: t('callFailedText'),
          icon: 'none',
        })
      }
    },
  },
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
