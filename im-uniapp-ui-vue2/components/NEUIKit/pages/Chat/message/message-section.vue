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

<script>
import messageItem from './message-item.vue'
import { MSG_ID_FLAG } from '../../../utils/constants'
import { caculateTimeago } from '../../../utils/date'
import { V2NIMConst } from '../../../utils/nim'

export default {
  components: {
    messageItem,
  },
  props: {
    msgs: {
      type: Array,
      required: true,
    },
    scene: {
      type: Object,
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
  },
  data() {
    return {
      V2NIMConst,
      MSG_ID_FLAG,
    }
  },
  computed: {
    sliceMsgs() {
      const res = []
      const msgs = this.msgs || []
      const _slice = msgs.slice(this.start, this.end)
      _slice.forEach((item, index) => {
        const msgIndex = this.start + index
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
    },
  },
}
</script>

<style lang="scss" scoped></style>
