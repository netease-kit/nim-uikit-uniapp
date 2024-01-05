<template>
  <div class="conversation-wrapper">
    <div
      class="dropdown-mark"
      v-if="addDropdownVisible"
      @touchstart="addDropdownVisible = false"
    ></div>
    <div class="navigation-bar">
      <div class="logo-box">
        <image src="https://yx-web-nosdn.netease.im/common/bbcd9929e31bfee02663fc0bcdabe1c5/yx-logo.png" class="logo-img" />
        <div>{{ t('appText') }}</div>
      </div>
      <div :class="buttonClass">
        <!-- #ifdef MP -->
        <image
          src="https://yx-web-nosdn.netease.im/common/9ae07d276ba2833b678a4077960e2d1e/Group 1899.png"
          class="button-icon"
          @tap="addDropdownVisible = true"
        />
        <!-- #endif -->
        <!-- #ifndef MP -->
        <div class="button-icon-add" @tap="addDropdownVisible = true">
          <Icon type="icon-More" />
        </div>
        <!-- #endif -->
        <div v-if="addDropdownVisible" class="dropdown-container">
          <div class="add-menu-list">
            <div class="add-menu-item" @tap="onDropdownClick('addFriend')">
              <Icon type="icon-tianjiahaoyou" :style="{ marginRight: '5px' }" />
              {{ t('addFriendText') }}
            </div>
            <div class="add-menu-item" @tap="onDropdownClick('createGroup')">
              <Icon
                type="icon-chuangjianqunzu"
                :iconStyle="{ marginRight: '5px' }"
              />
              {{ t('createTeamText') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block"></div>
    <NetworkAlert />
    <Empty
      v-if="sessionList.length === 0"
      :text="t('conversationEmptyText')"
    />
    <div v-else class="conversation-list-wrapper">
      <ConversationItem
        :showMoreActions="currentMoveSessionId === session.id"
        v-for="session in sessionList"
        :session="session"
        :key="session.id"
        @delete="handleSessionItemDeleteClick"
        @skictyToTop="handleSessionItemStickTopChange"
        @click="handleSessionItemClick"
        @leftSlide="handleSessionItemLeftSlide"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { NimKitCoreTypes } from '@xkit-yx/core-kit'

import { ref } from '../../../utils/transformVue'
import { autorun } from 'mobx'
import { onHide } from '@dcloudio/uni-app'

import Icon from '../../../components/Icon.vue'
import NetworkAlert from '../../../components/NetworkAlert.vue'
import Empty from '../../../components/Empty.vue'
import ConversationItem from './conversation-item.vue'
import { setContactTabUnread, setTabUnread } from '../../../utils/msg'
import { t } from '../../../utils/i18n'
import { customNavigateTo } from '../../../utils/customNavigate'
import { deepClone } from '../../../utils'
import { IMMessage } from '@xkit-yx/im-store'
const sessionList = ref<NimKitCoreTypes.ISession[]>([])
const addDropdownVisible = ref(false)

const currentMoveSessionId = ref('')

const handleSessionItemLeftSlide = (
  session: NimKitCoreTypes.ISession | null
) => {
  // 微信小程序点击也会触发左滑事件，但此时 session 为 null
  if (session) {
    currentMoveSessionId.value = session.id
  } else {
    currentMoveSessionId.value = ''
  }
}

let flag = false
// 点击会话
const handleSessionItemClick = async (session: NimKitCoreTypes.ISession) => {
  if (flag) return
  currentMoveSessionId.value = ''
  try {
    flag = true
    await uni.$UIKitStore.uiStore.selectSession(session.id)
    customNavigateTo({
      url: '/pages/Chat/index',
    })
  } catch {
    uni.showToast({
      title: t('selectSessionFailText'),
      icon: 'error',
    })
  } finally {
    flag = false
  }
}
// 删除会话
const handleSessionItemDeleteClick = async (
  session: NimKitCoreTypes.ISession
) => {
  try {
    await uni.$UIKitStore.sessionStore.deleteSessionActive(session.id)
  } catch {
    uni.showToast({
      title: t('deleteSessionFailText'),
      icon: 'error',
    })
  }
}
// 置顶会话
const handleSessionItemStickTopChange = async (
  session: NimKitCoreTypes.ISession
) => {
  if (session.stickTopInfo?.isStickOnTop) {
    try {
      await uni.$UIKitStore.sessionStore.deleteStickTopSessionActive(session.id)
    } catch {
      uni.showToast({
        title: t('deleteStickTopFailText'),
        icon: 'error',
      })
    }
  } else {
    try {
      await uni.$UIKitStore.sessionStore.addStickTopSessionActive(session.id)
    } catch {
      uni.showToast({
        title: t('addStickTopFailText'),
        icon: 'error',
      })
    }
  }
}

const onDropdownClick = (urlType: string) => {
  const urlMap = {
    // 添加好友
    addFriend: '/pages/Friend/add-friend/index',
    // 创建群聊
    createGroup: '/pages/Group/group-create/index',
  }
  addDropdownVisible.value = false
  customNavigateTo({
    // @ts-ignore
    url: urlMap[urlType],
  })
}

let buttonClass = 'button-box'
// #ifdef MP
buttonClass = 'button-box-mp'
// #endif

onHide(() => {
  addDropdownVisible.value = false
})

const needShowBeMentioned = (msgs: IMMessage[]) => {
  let flag = false
  msgs.forEach((msg) => {
    if (msg?.ext) {
      try {
        const extObj = JSON.parse(msg.ext)
        const yxAitMsg = extObj.yxAitMsg
        const account = uni.$UIKitStore.userStore.myUserInfo.account
        if (yxAitMsg) {
          Object.keys(yxAitMsg).forEach((key) => {
            if (key === account || key === 'ait_all') {
              flag = true
            }
          })
        }
      } catch {}
    }
  })
  return flag
}

autorun(() => {
  sessionList.value = deepClone(uni.$UIKitStore.uiStore.sessionList).map((session: NimKitCoreTypes.ISession )=> {
    return {
      ...session,
      beMentioned: needShowBeMentioned(session.unreadMsgs || [])
    }
  })
  setTabUnread()
})

autorun(() => {
  // 为了监听会触发得留着这个 console
  console.log(
    'unreadSysMsgCount:',
    uni.$UIKitStore.sysMsgStore.unreadSysMsgCount
  )
  setContactTabUnread()
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.conversation-wrapper{
  height: 100vh;
  overflow: hidden;
}

.navigation-bar {
  position: fixed;
  height: 60px;
  border-bottom: 1rpx solid #e9eff5;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--status-bar-height);
  background-color: #fff;
  width: 100%;
  opacity: 1;
  z-index: 999;
}

.block{
  height: 60px;
  width: 100%;
  display: block;
  padding-top: var(--status-bar-height);
}

.conversation-list-wrapper {
  height: calc(100% - 60px - var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.logo-box {
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 500;

  .logo-img {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
}

.button-icon-add{
  position: relative;
  right: 20px;
}
.dropdown-mark {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.dropdown-container {
  position: absolute;
  // #ifdef MP
  top: -105px;
  // #endif
  // #ifndef MP
  top: 100%;
  // #endif
  right: 30px;
  min-width: 122px;
  min-height: 40px;
  background-color: #fff;
  border: 1px solid #e6e6e6;
  box-shadow: 0px 4px 7px rgba(133, 136, 140, 0.25);
  border-radius: 8px;
  z-index: 99;
}

.add-menu-list {
  padding: 15px 10px;

  .add-menu-item {
    white-space: nowrap;
    font-size: 16px;
    padding-left: 5px;
    margin-bottom: 10px;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
.conversation-block{
  width: 100%;
  height: 72px;
}
</style>
