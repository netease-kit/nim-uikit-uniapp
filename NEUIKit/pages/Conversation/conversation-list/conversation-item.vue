<template>
  <div
    :class="[
      'conversation-item-container',
      {
        'show-action-list': showMoreActions,
        'stick-on-top': conversation.stickTop,
      },
    ]"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @click="handleConversationItemClick()"
  >
    <div class="conversation-item-content">
      <div class="conversation-item-left">
        <div class="unread" v-if="unread">
          <div class="dot" v-if="isMute"></div>
          <div class="badge" v-else>{{ unread }}</div>
        </div>
        <Avatar :account="to" :avatar="teamAvatar" />
      </div>
      <div class="conversation-item-right">
        <div class="conversation-item-top">
          <Appellation
            class="conversation-item-title"
            v-if="
              conversation.type ===
              V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
            "
            :account="to"
          />
          <span v-else class="conversation-item-title">
            {{ sessionName }}
          </span>
          <span class="conversation-item-time">{{ date }}</span>
        </div>
        <div class="conversation-item-desc">
          <span v-if="beMentioned" class="beMentioned">
            {{ '[' + t('someoneText') + '@' + t('meText') + ']' }}
          </span>
          <ConversationItemIsRead
            v-if="showConversationUnread"
            :conversation="props.conversation"
          ></ConversationItemIsRead>
          <span
            v-if="props.conversation.lastMessage"
            class="conversation-item-desc-content"
          >
            <LastMsgContent :lastMessage="props.conversation.lastMessage" />
          </span>
          <span class="conversation-item-desc-ait">
            <Icon
              v-if="isMute"
              iconClassName="conversation-item-desc-state"
              type="icon-xiaoximiandarao"
              color="#ccc"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="right-action-list">
      <div
        v-for="action in moreActions"
        :key="action.type"
        :class="['right-action-item', action.class]"
        @click="() => handleClick(action.type)"
      >
        {{ action.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/** 会话列表Item组件 */

import Avatar from '../../../components/Avatar.vue'
import Appellation from '../../../components/Appellation.vue'
import Icon from '../../../components/Icon.vue'
import { computed, onUpdated, withDefaults } from '../../../utils/transformVue'
import dayjs from 'dayjs'
import { t } from '../../../utils/i18n'
import { V2NIMConst } from '../../../utils/nim'
import {
  V2NIMConversationForUI,
  V2NIMLocalConversationForUI,
} from '@xkit-yx/im-store-v2/dist/types/types'
import ConversationItemIsRead from './conversation-item-isRead.vue'
import LastMsgContent from './conversation-item-last-msg-content.vue'

const props = withDefaults(
  defineProps<{
    conversation: V2NIMConversationForUI | V2NIMLocalConversationForUI
    showMoreActions?: boolean
  }>(),
  { showMoreActions: false }
)

const emit = defineEmits(['click', 'delete', 'stickyToTop', 'leftSlide'])

const moreActions = computed(() => {
  return [
    {
      name: props.conversation.stickTop
        ? t('deleteStickTopText')
        : t('addStickTopText'),
      class: 'action-top',
      type: 'action-top',
    },
    {
      name: t('deleteSessionText'),
      class: 'action-delete',
      type: 'action-delete',
    },
  ]
})

/** 右滑操作点击 */
const handleClick = (type: string) => {
  if (type === 'action-top') {
    emit('stickyToTop', props.conversation)
  } else {
    emit('delete', props.conversation)
  }
}

/** 群头像 */
const teamAvatar = computed(() => {
  if (
    props.conversation.type ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
  ) {
    const { avatar } = props.conversation
    return avatar
  }
})

/** 会话昵称 */
const sessionName = computed(() => {
  if (props.conversation.name) {
    return props.conversation.name
  }
  return props.conversation.conversationId
})

/** 对话方 */
const to = computed(() => {
  const res = uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationTargetId(
    props.conversation.conversationId
  )
  return res
})

/** 时间 */
const date = computed(() => {
  const time =
    props.conversation.lastMessage?.messageRefer.createTime ||
    props.conversation.updateTime
  // 如果最后一条消息时间戳不存在，则会话列表不显示
  if (!time) {
    return ''
  }
  const _d = dayjs(time)
  const isCurrentDay = _d.isSame(dayjs(), 'day')
  const isCurrentYear = _d.isSame(dayjs(), 'year')
  return _d.format(
    isCurrentDay ? 'HH:mm' : isCurrentYear ? 'MM-DD HH:mm' : 'YYYY-MM-DD HH:mm'
  )
})

const max = 99

/** 未读数 */
const unread = computed(() => {
  return props.conversation.unreadCount > 0
    ? props.conversation.unreadCount > max
      ? `${max}+`
      : props.conversation.unreadCount + ''
    : ''
})

/** 是否免打扰 */
const isMute = computed(() => {
  return !!props.conversation.mute
})

/** 是否被@ */
const beMentioned = computed(() => {
  return !!props.conversation.aitMsgs?.length
})

/** 是否展示 未读数 */
const showConversationUnread = computed(() => {
  const myUserAccountId = uni.$UIKitNIM.V2NIMLoginService.getLoginUser()
  if (
    props.conversation.type ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
  ) {
    return (
      props?.conversation?.lastMessage?.messageRefer.senderId ===
        myUserAccountId &&
      props?.conversation?.lastMessage?.messageType !==
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL &&
      props?.conversation?.lastMessage?.messageType !==
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION &&
      props?.conversation?.lastMessage?.sendingState ===
        V2NIMConst.V2NIMMessageSendingState
          .V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED &&
      props?.conversation?.lastMessage?.lastMessageState !==
        V2NIMConst.V2NIMLastMessageState.V2NIM_MESSAGE_STATUS_REVOKE
    )
  } else {
    return false
  }
})

// 左滑显示 action 动画
let startX = 0,
  startY = 0
// 开始左滑
function handleTouchStart(event: TouchEvent) {
  startX = event.changedTouches[0].pageX
  startY = event.changedTouches[0].pageY
}

function handleTouchMove(event: TouchEvent) {
  const moveEndX = event.changedTouches[0].pageX
  const moveEndY = event.changedTouches[0].pageY
  const X = moveEndX - startX + 20
  const Y = moveEndY - startY
  if (Math.abs(X) > Math.abs(Y) && X > 0) {
    emit('leftSlide', null)
  } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
    emit('leftSlide', props.conversation)
  }
}

/** 会话列表点击事件 */
function handleConversationItemClick() {
  if (props.showMoreActions) {
    emit('leftSlide', null)
    return
  }
  emit('click', props.conversation)
}

onUpdated(() => {
  console.log('onUpdated', props.conversation.unreadCount)
})
</script>

<style lang="scss" scoped>
$cellHeight: 72px;

.conversation-item-container {
  position: relative;
  transition: transform 0.3s;

  &.show-action-list {
    transform: translateX(-200px);
  }

  &.stick-on-top {
    background: #f3f5f7;
  }

  .beMentioned {
    color: #ff4d4f;
  }

  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.right-action-list {
  position: absolute;
  top: 0;
  right: -200px;
  bottom: 0;
  width: 200px;
  white-space: nowrap;

  .right-action-item {
    width: 100px;
    display: inline-block;
    color: #fff;
    text-align: center;
    height: $cellHeight;
    line-height: $cellHeight;
  }

  .action-top {
    background: #337eff;
  }

  .action-delete {
    background: #a8abb6;
  }
}

.conversation-item-content {
  display: flex;
  align-items: center;
  padding: 10px 20px;
  height: $cellHeight;
  box-sizing: border-box;
}

.conversation-item-left {
  position: relative;

  .conversation-item-badge {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 10;
  }
}

.conversation-item-right {
  flex: 1;
  width: 0;
  margin-left: 10px;
}

.conversation-item-top {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .conversation-item-title {
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }

  .conversation-item-time {
    font-size: 12px;
    color: #cccccc;
    text-align: right;
    width: 90px;
    flex-shrink: 0;
  }
}

.conversation-item-desc {
  font-size: 13px;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 22px;

  .conversation-item-desc-content {
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
    flex: 1;
  }

  .conversation-item-desc-state {
    margin-left: 10px;
  }
}

.dot {
  background-color: #ff4d4f;
  color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 99;
}

.badge {
  background-color: #ff4d4f;
  color: #fff;
  font-size: 12px;
  min-width: 20px;
  height: 20px;
  line-height: 19px;
  border-radius: 10px;
  padding: 0 5px;
  box-sizing: border-box;
  text-align: center;
  z-index: 99;
  position: relative;
}

.unread {
  position: absolute;
  right: -4px;
  top: -2px;
  z-index: 99;
}
.conversation-item-desc-ait {
  display: inline-block;
}
</style>
