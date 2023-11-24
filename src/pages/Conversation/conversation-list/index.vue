<template>
  <div class="dropdown-mark" v-if="addDropdownVisible" @touchstart="addDropdownVisible = false" />
  <div class="navigation-bar">
    <div class="logo-box">
      <image src="../../../static/logo.png" class="logo-img" />
      <div>{{ $t('appText') }}</div>
    </div>
    <div :class="buttonClass">
      <!-- #ifdef MP -->
      <image src="https://yx-web-nosdn.netease.im/common/9ae07d276ba2833b678a4077960e2d1e/Group 1899.png"
        class="button-icon" @tap="addDropdownVisible = true" />
      <!-- #endif -->
      <!-- #ifndef MP -->
      <Icon class="button-icon" type="icon-More" @tap="addDropdownVisible = true" />
      <!-- #endif -->
      <div v-if="addDropdownVisible" class="dropdown-container">
        <div class="add-menu-list">
          <div class="add-menu-item" @tap="onDropdownClick('addFriend')">
            <Icon type="icon-tianjiahaoyou" :style="{ marginRight: '5px' }" />
            {{ $t('addFriendText') }}
          </div>
          <div class="add-menu-item" @tap="onDropdownClick('createGroup')">
            <Icon type="icon-chuangjianqunzu" :style="{ marginRight: '5px' }" />
            {{ $t('createTeamText') }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <NetworkAlert />
  <div class="conversation-list">
    <Empty v-if="sessionList.length === 0" :text="$t('conversationEmptyText')" />
    <ConversationItem :showMoreActions="moreActionsSession === session" v-else v-for="session in sessionList"
      :session="session" :key="session.id" @delete="handleSessionItemDeleteClick"
      @skicty-to-top="handleSessionItemStickTopChange" @click="handleSessionItemClick"
      @left-slide="handleSessionItemLeftSlide" />
  </div>
</template>

<script lang="ts" setup>
import type { NimKitCoreTypes } from '@xkit-yx/core-kit';

import { ref } from 'vue'
import { autorun } from 'mobx'
import { onHide, onShow } from '@dcloudio/uni-app';

import Icon from '../../../components/Icon.vue'
import NetworkAlert from '../../../components/NetworkAlert.vue'
import Empty from '../../../components/Empty.vue'
import ConversationItem from './conversation-item.vue'
import { setContactTabUnread, setTabUnread } from '../../../utils/msg';
import { t } from '../../../utils/i18n';
import { customNavigateTo } from '../../../utils/customNavigate';
import { H5_HAS_LOGIN_KEY } from '../../../utils/constants';

const store = uni.$UIKitStore
const sessionList = ref<NimKitCoreTypes.ISession[]>([])
const addDropdownVisible = ref(false)
const moreActionsSession = ref<NimKitCoreTypes.ISession | null>(null)

const handleSessionItemLeftSlide = (session: NimKitCoreTypes.ISession | null) => {
  moreActionsSession.value = session
}

let flag = false
// 点击会话
const handleSessionItemClick = async (
  session: NimKitCoreTypes.ISession
) => {
  if (flag) return
  moreActionsSession.value = null
  try {
    flag = true
    await store.uiStore.selectSession(session.id)
    customNavigateTo({
      url: '/pages/Chat/index'
    })
  } catch {
    uni.showToast({
      title: t('selectSessionFailText'),
      icon: 'error'
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
    await store.sessionStore.deleteSessionActive(session.id)
  } catch {
    uni.showToast({
      title: t('deleteSessionFailText'),
      icon: 'error'
    })
  }
}
// 置顶会话
const handleSessionItemStickTopChange = async (
  session: NimKitCoreTypes.ISession,
) => {
  if (session.stickTopInfo?.isStickOnTop) {
    try {
      await store.sessionStore.deleteStickTopSessionActive(session.id)
    } catch {
      uni.showToast({
        title: t('deleteStickTopFailText'),
        icon: 'error'
      })
    }
  } else {
    try {
      await store.sessionStore.addStickTopSessionActive(session.id)
    } catch {
      uni.showToast({
        title: t('addStickTopFailText'),
        icon: 'error'
      })
    }
  }
}

const onDropdownClick = (urlType: string) => {
  const urlMap = {
    // 添加好友
    addFriend: '/pages/Friend/add-friend/index',
    // 创建群聊
    createGroup: '/pages/Group/group-create/index'
  }
  addDropdownVisible.value = false
  customNavigateTo({
    url: urlMap[urlType]
  })
}

let buttonClass = 'button-box'
// #ifdef MP
buttonClass = 'button-box-mp'
// #endif

onHide(() => {
  addDropdownVisible.value = false
})

onShow(() => {
  // 重置选中会话
  store.uiStore.selectSession('')
  setTabUnread()
  setContactTabUnread()
  // #ifdef H5 
  uni.getStorage({
    key: H5_HAS_LOGIN_KEY,
    success: function (res) {
      if (!res.data) {
        setTimeout(() => {
          window.location.reload();
        }, 500)
        uni.setStorageSync(H5_HAS_LOGIN_KEY,true)
      }
    },
    fail: function (error) {
      uni.setStorageSync(H5_HAS_LOGIN_KEY,true)
    }
  })
  // #endif
})

autorun(() => {
  sessionList.value = store.uiStore.sessionList
  setTabUnread()
})

autorun(() => {
  // 为了监听会触发得留着这个 console
  console.log('unreadSysMsgCount:', store.sysMsgStore.unreadSysMsgCount)
  setContactTabUnread()
})

</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.navigation-bar {
  height: 60px;
  border-bottom: 1rpx solid #E9EFF5;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--status-bar-height);
}

.conversation-list {
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
  right: 0;
  min-width: 122px;
  min-height: 40px;
  background-color: #fff;
  border: 1px solid #E6E6E6;
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
</style>
