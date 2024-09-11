<template>
  <div v-for="(item, index) in sliceMsgs">
    <text>{{ start + index }}</text>
    <messageItem
      :id="MSG_ID_FLAG + item.idClient"
      :scene="scene"
      :to="to"
      :msg="item"
      :key="item.idClient"
      :msg-index="start + index"
    >
    </messageItem>
  </div>
</template>

<script lang="ts" setup>
import messageItem from './message-item.vue'
import { computed } from '../../../utils/transformVue'

import { MSG_ID_FLAG } from '../../../utils/constants'
import { caculateTimeago } from '../../../utils/date'
import { V2NIMMessage } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMMessageService'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/index'

const props = defineProps({
  msgs: {
    type: Array,
    required: true,
  },
  scene: {
    type: Object, // Assuming TMsgScene is a custom object type
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  start: {
    type: Number,
    required: true,
  },
  end: {
    type: Number,
    required: true,
  },
})

const sliceMsgs = computed(() => {
  const res: V2NIMMessage[] = []
  const msgs = props.msgs as V2NIMMessage[]
  const _slice = msgs.slice(props.start, props.end)
  _slice.forEach((item, index) => {
    const msgIndex = props.start + index
    // 如果两条消息间隔超过5分钟，插入一条自定义时间消息

    if (
      msgIndex > 0 &&
      item.createTime - msgs[msgIndex - 1].createTime > 5 * 60 * 1000
    ) {
      res.push({
        messageClientId: 'time-' + item.createTime,
        messageType: V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM,
        attachment: {
          type: 'time',

          value: caculateTimeago(item.createTime),
        },
        sendingState:
          V2NIMConst.V2NIMMessageSendingState
            .V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED,
      })
    }

    res.push(item)
  })
  return res.filter((item) => item.type !== 'notification')
})
</script>

<style lang="scss" scoped></style>
