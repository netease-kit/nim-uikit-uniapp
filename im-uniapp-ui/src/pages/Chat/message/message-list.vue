<template>
  <div class="msg-list-wrapper" @touchstart="handleTapMessageList">
    <scroll-view
      id="message-scroll-list"
      scroll-y="true"
      :scroll-top="scrollTop"
      class="message-scroll-list"
    >
      <div v-show="!noMore" @click="onLoadMore" class="view-more-text">
        {{ t('viewMoreText') }}
      </div>
      <view class="msg-tip" v-show="noMore">{{ t('noMoreText') }}</view>
      <div v-for="(item, index) in finalMsgs" :key="item.renderKey">
        <MessageItem
          :msg="item"
          :index="index"
          :key="item.renderKey"
          :reply-msg="
            props.replyMsgsMap && props.replyMsgsMap[item.messageClientId]
          "
          :broadcastNewAudioSrc="broadcastNewAudioSrc"
        >
        </MessageItem>
      </div>
    </scroll-view>
  </div>
</template>

<script lang="ts" setup>
import {
  ref,
  computed,
  onBeforeMount,
  onUnmounted,
  defineProps,
  withDefaults,
} from '../../../utils/transformVue'
import MessageItem from './message-item.vue'
import { events } from '../../../utils/constants'
import { caculateTimeago } from '../../../utils/date'
import { t } from '../../../utils/i18n'
import { V2NIMMessageForUI } from '@xkit-yx/im-store-v2/dist/types/types'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK'
import { V2NIMConversationType } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMConversationService'
import { V2NIMTeam } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMTeamService'
import { autorun } from 'mobx'
import { deepClone } from '../../../utils'

const props = withDefaults(
  defineProps<{
    msgs: V2NIMMessageForUI[]
    conversationType: V2NIMConversationType
    to: string
    loadingMore?: boolean
    noMore?: boolean
    replyMsgsMap?: {
      [key: string]: V2NIMMessageForUI
    }
  }>(),
  {}
)

onBeforeMount(() => {
  let team: V2NIMTeam | undefined = undefined

  autorun(() => {
    team = deepClone(uni.$UIKitStore.teamStore.teams.get(props.to))
  })

  if (
    props.conversationType ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
  ) {
    uni.$UIKitStore.teamMemberStore.getTeamMemberActive({
      teamId: props.to,
      queryOption: {
        limit: Math.max((team as unknown as V2NIMTeam)?.memberLimit || 0, 200),
        roleQueryType: 0,
      },
    })
  }

  uni.$on(events.AUDIO_URL_CHANGE, (url) => {
    broadcastNewAudioSrc.value = url
  })

  uni.$on(events.ON_SCROLL_BOTTOM, () => {
    scrollToBottom()
  })

  uni.$on(events.ON_LOAD_MORE, () => {
    const msg = finalMsgs.value.filter(
      (item) =>
        !(
          item.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
          ['beReCallMsg', 'reCallMsg'].includes(item.recallType || '')
        )
    )[0]
    if (msg) {
      uni.$emit(events.GET_HISTORY_MSG, msg)
    }
  })
})

onUnmounted(() => {
  uni.$off(events.ON_SCROLL_BOTTOM)

  uni.$off(events.ON_LOAD_MORE)

  uni.$off(events.AUDIO_URL_CHANGE)
})

const scrollTop = ref(99999)
const finalMsgs = computed(() => {
  const res: V2NIMMessageForUI[] = []
  props.msgs.forEach((item, index) => {
    // 如果两条消息间隔超过5分钟，插入一条自定义时间消息
    if (
      index > 0 &&
      item.createTime - props.msgs[index - 1].createTime > 5 * 60 * 1000
    ) {
      res.push({
        ...item,
        messageClientId: 'time-' + item.createTime,
        messageType: V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM,
        sendingState:
          V2NIMConst.V2NIMMessageSendingState
            .V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED,
        // @ts-ignore
        timeValue: caculateTimeago(item.createTime),
        renderKey: `${item.createTime + 1}`,
      })
    }
    res.push({
      ...item,
      // @ts-ignore
      renderKey: `${item.createTime}`,
    })
  })
  return res
})

const broadcastNewAudioSrc = ref<string>('')

// 消息滑动到底部，建议搭配 nextTick 使用
const scrollToBottom = () => {
  scrollTop.value += 3000
  const timer = setTimeout(() => {
    scrollTop.value += 1
    clearTimeout(timer)
  }, 300)
}

const onLoadMore = () => {
  const msg = finalMsgs.value.filter(
    (item) =>
      !(
        item.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
        ['beReCallMsg', 'reCallMsg'].includes(item.recallType || '')
      )
  )[0]
  if (msg) {
    uni.$emit(events.GET_HISTORY_MSG, msg)
  }
}

const handleTapMessageList = () => {
  uni.$emit(events.CLOSE_PANEL)
  setTimeout(() => {
    uni.$emit(events.CLOSE_PANEL)
  }, 300)
}
</script>

<style scoped lang="scss">
.msg-list-wrapper {
  flex: 1;
  overflow: hidden;
  display: flex;
  height: 100%;
  box-sizing: border-box;
  padding: 16px 0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

// .msg-list {
//   padding: 0 16px 20px 16px;
//   box-sizing: border-box;
//   transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
//   overflow-x: hidden;
//   // height: 100%;
// }

.msg-tip {
  text-align: center;
  color: #b3b7bc;
  font-size: 12px;
  margin-top: 10px;
}

.block {
  width: 100%;
  height: 40px;
}

.message-scroll-list {
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 1px;
}

.view-more-text {
  text-align: center;
  color: #b3b7bc;
  font-size: 15px;
  margin-top: 20px;
}
page > view > message > view > message-list {
  height: 100%;
}
</style>
