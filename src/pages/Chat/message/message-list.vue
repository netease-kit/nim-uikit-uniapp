<template>
  <div class="msg-list">
    <!-- <view class="msg-tip" v-show="loadingMore">{{ $t('loadingMoreText') }}</view> -->
    <!-- <view class="msg-tip" v-show="noMore">{{ $t('noMoreText') }}</view> -->
    <messageItem :id="MSG_ID_FLAG + item.idClient" :scene="scene" :to="to" :msg="item" v-for="item, index in finalMsgs"
      :key="item.idClient" :msg-index="index">
    </messageItem>
    <!-- <messageSection :msgs="msgs" :scene="scene" :to="to" :start="start" :end="end"></messageSection> -->
  </div>
</template>

<script lang="ts" setup>
import type { IMMessage, TMsgScene } from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface';
import { defineProps, computed, ref } from 'vue'
import messageItem from './message-item.vue';
import { events, HISTORY_LIMIT, MSG_ID_FLAG } from '../../../utils/constants';
import { caculateTimeago } from '../../../utils/date';

const props = defineProps<{
  msgs: IMMessage[]
  scene: TMsgScene
  to: string
  loadingMore?: boolean
  noMore?: boolean
  onLoadMore?: (lastMsg: IMMessage) => Promise<IMMessage[]>
}>()

const finalMsgs = computed(() => {
  const res: IMMessage[] = []
  props.msgs.forEach((item, index) => {
    // 如果两条消息间隔超过5分钟，插入一条自定义时间消息
    if (index > 0 && (item.time - props.msgs[index - 1].time > 5 * 60 * 1000)) {
      // @ts-ignore
      res.push({
        idClient: 'time-' + item.time,
        type: 'custom',
        attach: {
          type: 'time',
          value: caculateTimeago(item.time),
        },
        status: 'sent',
      })
    }
    res.push(item)
  });
  return res
})

// const start = ref(0)
// const end = computed(() => start.value + HISTORY_LIMIT)

// let lock = false

const scrollTo = (cb: (height: number) => {
  scrollTop?: number
  selector?: string
  duration?: number
}) => {
  const msgList = uni.createSelectorQuery().select('.msg-list')
  msgList.boundingClientRect((data) => {
    const { scrollTop, selector, duration = 100 } = cb((data as UniApp.NodeInfo).height || 0)
    uni.pageScrollTo({
      scrollTop,
      selector,
      duration,
    })
  }).exec()
}

const scrollToBottom = () => {
  if (finalMsgs.value.length) {
    scrollTo((height) => ({ scrollTop: height, duration: 0 }))
  }
}

uni.$on(events.SEND_MSG, () => {
  scrollToBottom()
})

uni.$on(events.ON_CHAT_MOUNTED, (msg: IMMessage) => {
  scrollToBottom()
})

uni.$on(events.ON_MSG, (msg: IMMessage) => {
  // TODO
  // scrollToBottom()
})

uni.$on(events.ON_LOAD_MORE, () => {
  const msg = finalMsgs.value.filter((item) =>
    !(
      item.type === 'custom' &&
      ['beReCallMsg', 'reCallMsg'].includes(item.attach?.type || '')
    ))[0]
  if (msg) {
    props.onLoadMore?.(msg).then((res) => {
      uni.stopPullDownRefresh();
      if (res[0]) {
        scrollTo(() => ({ selector: `#${MSG_ID_FLAG + res[0].idClient}`, duration: 0 }))
      }
    })
  }

  // props.onLoadMore?.(props.msgs[start.value]).then((res) => {
  //   uni.stopPullDownRefresh();
  //   start.value -= HISTORY_LIMIT
  //   if (res[0]) {
  //     scrollTo(() => ({ selector: `#${MSG_ID_FLAG + res[0].idClient}`, duration: 0 }))
  //   }
  // })
})

uni.$on(events.ON_REACH_BOTTOM, () => {
  // if (end.value < props.msgs.length && !lock) {
  //   lock = true
  //   start.value += HISTORY_LIMIT
  //   setTimeout(() => {
  //     lock = false
  //   }, 1500)
  // }
  // console.log('========= 到底了！！！！', 'start: ', start.value, 'lock: ', lock, 'msg.lenght: ', props.msgs.length)
})

// uni.$on(events.ON_REACH_TOP, () => {
//   if (start.value > 0 && !lock) {
//     lock = true
//     start.value -= HISTORY_LIMIT
//     setTimeout(() => {
//       lock = false
//     }, 1500)
//   }
//   console.log('========= 到顶了！！！！', 'start: ', start.value, 'lock: ', lock, 'msg.lenght: ', props.msgs.length)
// })
</script>

<style scoped lang="scss">
.msg-list {
  padding: 0 16px 151px;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

.msg-tip {
  text-align: center;
  color: #B3B7BC;
  font-size: 12px;
}
</style>
