<template>
  <div
    @touchstart="handleTapMessageList"
    id="msg-list"
    class="msg-list"
    :style="{
      position: 'relative',
      bottom: ((isKeyboardUp && finalMsgs.length > 10 )? keyboardHeight : 0) + 'px',
    }"
  >
    <view class="msg-tip" v-show="loadingMore && uniPlatform == 'web'">{{ $t('loadingMoreText') + '...' }}</view>
    <view class="msg-tip" v-show="noMore">{{ $t('noMoreText') }}</view>
    <MessageItem
      v-for="(item, index) in finalMsgs"
      :id="MSG_ID_FLAG + item.idClient"
      :scene="scene"
      :to="to"
      :msg="item"
      :key="item.idClient"
      :msg-index="index"
      :reply-msg="replyMsgsMap?.[item.idClient]"
    >
    </MessageItem>
    <!-- <messageSection :msgs="msgs" :scene="scene" :to="to" :start="start" :end="end"></messageSection> -->
  </div>
</template>

<script lang="ts" setup>
import type {
  IMMessage,
  TMsgScene,
} from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import { defineProps, computed, ref, getCurrentInstance } from 'vue'
import MessageItem from './message-item.vue'
import { events, HISTORY_LIMIT, MSG_ID_FLAG } from '../../../utils/constants'
import { caculateTimeago } from '../../../utils/date'
import { onPageScroll } from '@dcloudio/uni-app'
import { onLoad } from '@dcloudio/uni-app'
import { getUniPlatform } from '../../../utils'
import { debounce } from '@xkit-yx/utils'
const props = defineProps<{
  msgs: IMMessage[]
  scene: TMsgScene
  to: string
  loadingMore?: boolean
  noMore?: boolean
  onLoadMore?: (lastMsg: IMMessage) => Promise<IMMessage[] | undefined>
  replyMsgsMap?: Record<string, IMMessage>
}>()

const isKeyboardUp = ref(false)
const keyboardHeight = ref(0)
const isKeyboardFocus = ref(false)
const uniPlatform = getUniPlatform()
const finalMsgs = computed(() => {
  const res: IMMessage[] = []
  props.msgs.forEach((item, index) => {
    // 如果两条消息间隔超过5分钟，插入一条自定义时间消息
    if (index > 0 && item.time - props.msgs[index - 1].time > 5 * 60 * 1000) {
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
  })
  return res
})

// const start = ref(0)
// const end = computed(() => start.value + HISTORY_LIMIT)

// let lock = false

const ins = getCurrentInstance()

const scrollTo = (
  cb: (height: number) => {
    scrollTop?: number
    selector?: string
    duration?: number
  }
) => {
  const msgList = uni.createSelectorQuery().in(ins).select('#msg-list')
  msgList
    .boundingClientRect((data) => {
      const {
        scrollTop,
        selector,
        duration = 100,
      } = cb((data as UniApp.NodeInfo).height || 0)
      uni.pageScrollTo({
        scrollTop,
        selector,
        duration,
        fail: (error) => {
          console.log('========= error =========', error);
        },
      })
    })
    .exec()
}

onPageScroll(() => {
  isKeyboardUp.value = false
})

const scrollToBottom = () => {
  if (finalMsgs.value.length) {
    scrollTo((height) => ({ scrollTop: height, duration: 0 }))
  }
}

const handleTapMessageList = () => {
  isKeyboardUp.value = false
  isKeyboardFocus.value = false
  // 处理滚动穿透
  uni.$emit(events.CLOSE_EMOJI, false)
}

onLoad(() => {
  if(props.scene === 'team') {
    uni.$UIKitStore.teamMemberStore.getTeamMemberActive(props.to)
  }
  uni.$on(events.SEND_MSG, () => {
    scrollToBottom()
  })

  uni.$on(events.ON_CHAT_MOUNTED, (msg: IMMessage) => {
    if(uniPlatform === 'mp-weixin') {
      scrollToBottom()
    } else {
      setTimeout(() => {
        scrollToBottom()
      }, 100);
    }
  })

  uni.$on(events.EMOJI_AREA_CHANGE, (info) => {
    isKeyboardUp.value = info.flag
    keyboardHeight.value = info.height
  })

   uni.$on(events.ON_INPUT_BLUR, () => {
    isKeyboardFocus.value = false
  })

  uni.$on(events.ON_MSG, (msg: IMMessage) => {
    // 当收到新消息且键盘弹起时，uni.pageScrollTo 存在兼容问题
    const isIOSWeb = uniPlatform === 'web' && uni.getSystemInfoSync().platform === 'ios' && isKeyboardFocus.value
    if (!isIOSWeb) {
      setTimeout(() => {
        scrollToBottom()
      }, 100);
    } 
  })

  uni.$on(events.ON_SCROLL_BOTTOM, () => {
    scrollToBottom()
    // 另一种滚动到底部的方法
    // if (finalMsgs.value.length) {
    //   console.log('========= finalMsgs =========', finalMsgs.value[finalMsgs.value.length-1].idClient);
    //     uni.pageScrollTo({
    //       selector: `#message-item-${finalMsgs.value[finalMsgs.value.length - 1].idClient}`,
    //       duration: 0,
    //     })
    // }
  })

  uni.$on(events.ON_LOAD_MORE, () => {
    const msg = finalMsgs.value.filter(
      (item) =>
        !(
          item.type === 'custom' &&
          ['beReCallMsg', 'reCallMsg'].includes(item.attach?.type || '')
        )
    )[0]
    if (msg) {
      props.onLoadMore?.(msg).then((res) => {
        if (res?.[0]) {
          // uni.pageScrollTo 微信小程序指定滚动位置不起作用 https://ask.dcloud.net.cn/question/173874?item_id=258278&rf=false
          setTimeout(() => {
            scrollTo(() => ({
              selector: `#${MSG_ID_FLAG + res[0].idClient}`,
              duration: 0,
            }))
          }, 0);
          //  try {
          //    wx.pageScrollTo({
          //     selector: `#${MSG_ID_FLAG + res[0].idClient}`,
          //     duration: 0,
          //   })
          //  } catch (error) {
          //   console.log('========= error =========', error);
          //  }
         try {
          //  uni.createSelectorQuery().in(ins).select( `#${MSG_ID_FLAG + res[0].idClient}`).boundingClientRect(function (rect) {
          //   if (rect) {
          //     var height = rect.top; // 获取元素的高度
          //     console.log('===============：', height+30);
          //     uni.pageScrollTo({
          //       scrollTop: height+30,
          //       duration: 0,
          //     })
          //   }
          // }).exec();
         } catch (error) {
           console.log('========= error =========', error);
         }
        }
      }).finally(() => {
        uni.stopPullDownRefresh();
      })
    }
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

  uni.$on(events.ON_INPUT_FOCUS, () => {
    isKeyboardUp.value = true
    isKeyboardFocus.value = true
  })

  if (uniPlatform === 'app') {
    uni.onKeyboardHeightChange((res) => {
      keyboardHeight.value = res.height - 20
    })
  }
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
  padding: 0 16px 120px;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  overflow-x: hidden;
}

.msg-tip {
  text-align: center;
  color: #b3b7bc;
  font-size: 12px;
}

</style>
