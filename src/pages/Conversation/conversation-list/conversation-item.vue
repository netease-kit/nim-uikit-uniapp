<template>
  <div :class="['conversation-item-container', { 'show-action-list': showMoreActions, 'stick-on-top': isStickOnTop }]"
    @touchstart="handleTouchStart" @touchmove="handleTouchMove" @click="handleConversationItemClick()">
    <div class="conversation-item-content">
      <div class="conversation-item-left">
        <div v-if="session.unread !== 0" class="conversation-item-badge">{{ unread }}</div>
        <Avatar :account="avatarId" :avatar="teamAvatar" />
      </div>
      <div class="conversation-item-right">
        <div class="conversation-item-top">
          <span class="conversation-item-title">{{ title }}</span>
          <span class="conversation-item-time">{{ date }}</span>
        </div>
        <div class="conversation-item-desc">
          <span>{{ content }}</span>
        </div>
      </div>
    </div>
    <div class="right-action-list">
      <div v-for="action in moreActions" :class="['right-action-item', action.class]" @click="action.handleClick()">{{
        action.name }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '../../../components/Avatar.vue'
import { getMsgContentTipByType } from '../../../utils/msg'
import { computed, ref } from 'vue'
import type { NimKitCoreTypes } from '@xkit-yx/core-kit';
import dayjs from 'dayjs'
import { t } from '../../../utils/i18n';
const props = defineProps<{
  session: NimKitCoreTypes.ISession
  showMoreActions: boolean
}>()

const store = uni.$UIKitStore

const $emit = defineEmits<{
  (event: 'click', session: NimKitCoreTypes.ISession): void,
  (event: 'delete', session: NimKitCoreTypes.ISession): void,
  (event: 'skictyToTop', session: NimKitCoreTypes.ISession): void
  (event: 'leftSlide', session: NimKitCoreTypes.ISession | null): void
}>()

const isStickOnTop = computed(() => {
  return props.session.stickTopInfo?.isStickOnTop
})

const moreActions = computed(() => {
  return [
    {
      name: isStickOnTop.value ? t('deleteStickTopText') : t('addStickTopText'),
      class: 'action-top',
      handleClick: () => {
        $emit('skictyToTop', props.session)
      }
    },
    {
      name: t('deleteSessionText'),
      class: 'action-delete',
      handleClick: () => {
        $emit('delete', props.session)
      }
    }
  ]
})

const teamAvatar = computed(() => {
  const { session } = props
  if (session.scene === 'team') {
    const { avatar } = props.session as NimKitCoreTypes.TeamSession
    return avatar
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
const unread = computed(() => {
  return props.session.unread > 99 ? '99+' : props.session.unread
})

const title = computed(() => {
  const { session } = props
  if (session.scene === 'p2p') {
    const { to } = props.session as NimKitCoreTypes.P2PSession
    const store = uni.$UIKitStore
    return store.uiStore.getAppellation({ account: to })
  }
  const { name, teamId } = props.session as NimKitCoreTypes.TeamSession
  return name || teamId
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
  const _d = dayjs(time)
  const isCurrentDay = _d.isSame(dayjs(), 'day')
  const isCurrentYear = _d.isSame(dayjs(), 'year')
  return _d.format(
    isCurrentDay ? 'HH:mm' : isCurrentYear ? 'MM-DD HH:mm' : 'YYYY-MM-DD HH:mm'
  )
})
// 左滑显示 action 动画
let startX = 0, startY = 0
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
    $emit('leftSlide', null)
  }
  else if (Math.abs(X) > Math.abs(Y) && X < 0) {
    $emit('leftSlide', props.session)
  }
}

function handleConversationItemClick() {
  if (props.showMoreActions) {
    $emit('leftSlide', null)
    return
  }
  $emit('click', props.session)
}

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
    background: #F3F5F7;
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
    background: #337EFF;
  }

  .action-delete {
    background: #A8ABB6;
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
    top: -5px;
    right: -5px;
    background-color: #FF4D4F;
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
    color: #CCCCCC;
    text-align: right;
    width: 90px;
    flex-shrink: 0;
  }
}

.conversation-item-desc {
  font-size: 13px;
  color: #999999;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}
</style>
