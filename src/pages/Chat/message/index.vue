<template>
  <NavBar :title="title">
    <template v-if="scene !== 'p2p'" v-slot:right>
      <Icon class="button-icon" type="icon-More" @tap="handleTeamSetting" />
    </template>
  </NavBar>
  <div class="msg-wrapper">
    <div class="msg-alert">
      <NetworkAlert />
    </div>
    <messageList :scene="scene as TMsgScene" :to="to" :msgs="msgs" :loading-more="loadingMore" :no-more="noMore"
      :on-load-more="handleLoadMore" />
    <messageInput :scene="scene as TMsgScene" :to="to" />
  </div>
</template>

<script lang="ts" setup>
import type { IMMessage, TMsgScene } from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import { ref } from 'vue'
import messageList from './message-list.vue'
import messageInput from './message-input.vue'
import { events, HISTORY_LIMIT } from '../../../utils/constants'
import { autorun } from 'mobx'
import NavBar from '../../../components/NavBar.vue'
import NetworkAlert from '../../../components/NetworkAlert.vue'
import Icon from '../../../components/Icon.vue'
import { t } from '../../../utils/i18n'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { storeUtils } from '@xkit-yx/im-store'

let isMounted = false

const loadingMore = ref(false)
const noMore = ref(false)
const title = ref('')

const store = uni.$UIKitStore
const sessionId = store.uiStore.selectedSession
const myAccount = store.userStore.myUserInfo.account

const [scene, ...other] = sessionId.split('-')
const to = other.join('-')

uni.$UIKitNIM.on('msg', (msg) => {
  uni.$emit(events.ON_MSG, msg)
})

const handleDismissTeam = (data) => {
  if (data.teamId === to) {
    uni.showModal({
      content: t('onDismissTeamText'),
      showCancel: false,
      success(data) {
        if (data.confirm) {
          backToConversation()
        }
      }
    })
  }
}

const handleRemoveTeamMembers = (data) => {
  if (data.team.teamId === to && data.accounts.includes(myAccount)) {
    uni.showModal({
      content: t('onRemoveTeamText'),
      showCancel: false,
      success(data) {
        if (data.confirm) {
          backToConversation()
        }
      }
    })
  }
}

onLoad(() => {
  uni.$UIKitNIM.on('dismissTeam', handleDismissTeam)
  uni.$UIKitNIM.on('removeTeamMembers', handleRemoveTeamMembers)
})

onUnload(() => {
  uni.$UIKitNIM.off('dismissTeam', handleDismissTeam)
  uni.$UIKitNIM.off('removeTeamMembers', handleRemoveTeamMembers)

  // 销毁时清空内存
  // store.msgStore.removeMsg(sessionId)
})

const getHistroy = async (endTime: number, lastMsgId?: string) => {
  try {
    if (noMore.value) {
      return []
    }
    if (loadingMore.value) {
      return []
    }
    loadingMore.value = true
    const historyMsgs = await store.msgStore.getHistoryMsgActive({
      sessionId,
      endTime,
      lastMsgId,
      limit: HISTORY_LIMIT,
    })
    loadingMore.value = false
    if (historyMsgs.length < HISTORY_LIMIT) {
      noMore.value = true
    }
    return historyMsgs
  } catch (error) {
    loadingMore.value = false
    uni.showToast({
      title: t('getHistoryMsgFailedText'),
      icon: 'error',
      duration: 2000,
    })
    throw error
  }
}

const handleLoadMore = async (lastMsg: IMMessage) => {
  const res = await getHistroy(lastMsg.time, lastMsg.idServer)
  return res
}

const msgs = ref<IMMessage[]>([])

const back = () => {
  uni.navigateBack({
    delta: 1
  })
}

const backToConversation = () => {
  uni.switchTab({ url: "/pages/Conversation/index" })
}

const handleTeamSetting = () => {
  uni.navigateTo({
    url: `/pages/Group/group-set/index?id=${to}`
  })
}

autorun(() => {
  if (store.connectStore.connectState === 'connected') {
    getHistroy(Date.now()).then(msgs => {
      if (!isMounted) {
        uni.$emit(events.ON_CHAT_MOUNTED, msgs[0])
        isMounted = true
      }
    })
  }
})

autorun(() => {
  msgs.value = storeUtils.getFilterMsgs(store.msgStore.getMsg(sessionId), item => item.type !== 'notification')
})

autorun(() => {
  let _title = ''
  if (scene === 'p2p') {
    _title = store.uiStore.getAppellation({ account: to })
  } else if (scene === 'team') {
    const team = store.teamStore.teams.get(to)
    _title = team?.name || ''
    _title += `(${team?.memberNum || 0})`
  }
  title.value = _title
})

// onMounted(async () => {
//   const msgs = await getHistroy(Date.now())
//   uni.$emit(events.ON_CHAT_MOUNTED, msgs[0])
// })
</script>

<style scoped lang="scss">
.msg-wrapper {
  display: flex;
  flex-direction: column;
}

.msg-alert {
  position: fixed;
  top: calc(45px + var(--status-bar-height));
  left: 0;
  width: 100vw;
  z-index: 100;
}

.button-icon {
  font-size: 22px;
  color: #333;
}
</style>
