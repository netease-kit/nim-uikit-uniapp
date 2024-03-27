<template>
  <div
    :class="[
      'conversation-item-container',
      { 'show-action-list': showMoreActions, 'stick-on-top': isStickOnTop },
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
        <Avatar :account="avatarId" :avatar="teamAvatar" />
      </div>
      <div class="conversation-item-right">
        <div class="conversation-item-top">
          <Appellation
            class="conversation-item-title"
            v-if="session.scene === 'p2p'"
            :account="session.to"
          />
          <span v-else class="conversation-item-title">{{ sessionName }}</span>
          <span class="conversation-item-time">{{ date }}</span>
        </div>
        <div class="conversation-item-desc">
          <span v-if="beMentioned" class="beMentioned">{{
            '[' + t('someoneText') + '@' + t('meText') + ']'
          }}</span>
          <span class="conversation-item-desc-content">{{ content }}</span>
          <Icon
            v-if="isMute"
            iconClassName="conversation-item-desc-state"
            type="icon-xiaoximiandarao"
            color="#ccc"
          />
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
import Avatar from '../../../components/Avatar.vue'
import Appellation from '../../../components/Appellation.vue'
import Icon from '../../../components/Icon.vue'
import { getMsgContentTipByType } from '../../../utils/msg'
import { computed, onUpdated } from '../../../utils/transformVue'
import type { NimKitCoreTypes } from '@xkit-yx/core-kit'
import dayjs from 'dayjs'
import { t } from '../../../utils/i18n'

const props = defineProps({
  session: {
    type: Object,
    default: () => {
      return {
        ack: 0,
        scene: '',
        id: '',
        to: '',
        lastMsg: {
          time: 0,
          type: '',
          body: '',
          status: '',
        },
        unread: 0,
        isMute: false,
        beMentioned: false,
      }
    },
  },
  showMoreActions: {
    type: Boolean,
    default: () => false,
  },
})

const emit = defineEmits(['click', 'delete', 'stickyToTop', 'leftSlide'])

const isStickOnTop = computed(() => {
  return props.session.stickTopInfo?.isStickOnTop
})

const moreActions = computed(() => {
  return [
    {
      name: props.session.stickTopInfo?.isStickOnTop
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

const handleClick = (type: string) => {
  if (type === 'action-top') {
    emit('stickyToTop', props.session)
  } else {
    emit('delete', props.session)
  }
}

const teamAvatar = computed(() => {
  const { session } = props
  if (session.scene === 'team') {
    const { avatar } = props.session as NimKitCoreTypes.TeamSession
    return avatar
  }
})

const sessionName = computed(() => {
  const { session } = props
  if (session.name) {
    return session.name
  } else {
    return session.teamId
  }
})

const avatarId = computed(() => {
  const { session } = props
  if (session.scene === 'p2p') {
    const { to } = props.session as NimKitCoreTypes.P2PSession
    return to
  }
  const { teamId } = props.session as NimKitCoreTypes.TeamSession
  return teamId
})

const content = computed(() => {
  const lastMsg = props.session.lastMsg
  if (lastMsg) {
    const { status } = lastMsg
    if (status === 'sending' || lastMsg.type === 'notification') {
      return ''
    }
    if (status === 'sendFailed' || status === 'refused') {
      // TODO:
      return '[发送失败]'
    }
    return getMsgContentTipByType(lastMsg)
  }
  return ''
})

const date = computed(() => {
  const time = props.session.lastMsg?.time || props.session.updateTime
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

const unread = computed(() => {
  return props.session.unread > 0
    ? props.session.unread > max
      ? `${max}+`
      : props.session.unread + ''
    : ''
})

const isMute = computed(() => {
  return props.session.isMute
})

const beMentioned = computed(() => {
  return props.session.beMentioned
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
    emit('leftSlide', props.session)
  }
}

function handleConversationItemClick() {
  if (props.showMoreActions) {
    emit('leftSlide', null)
    return
  }
  emit('click', props.session)
}

onUpdated(() => {
  console.log('onUpdated', props.session.unread)
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
  margin-bottom: 5px;
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
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

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
  right: 0;
  z-index: 99;
}
</style>
