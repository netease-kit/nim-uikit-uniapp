<template>
  <div class="dropdown-mark" v-if="addDropdownVisible" @touchstart="addDropdownVisible = false" />
  <div class="navigation-bar">
    <div class="logo-box">
      <image src="../../../static/logo.png" class="logo-img" />
      <div>{{ $t('appText') }}</div>
    </div>
    <div class="button-box">
      <Icon class="button-icon" type="icon-More" style="font-size: 22px;color: #333333;"
        @click="addDropdownVisible = true" />
      <div v-if="addDropdownVisible" class="dropdown-container">
        <div class="add-menu-list">
          <div class="add-menu-item" @click="startConversation">
            <Icon type="icon-tianjiahaoyou" />
            {{ $t('createP2PText') }}
          </div>
          <div class="add-menu-item" @click="onCreateGroup">
            <Icon type="icon-chuangjianqunzu" />
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
import { setTabUnread } from '@/utils/msg';
import { t } from '../../../utils/i18n';

const store = uni.$UIKitStore
const sessionList = ref<NimKitCoreTypes.ISession[]>([])
const addDropdownVisible = ref(false)
const moreActionsSession = ref<NimKitCoreTypes.ISession | null>(null)

const handleSessionItemLeftSlide = (session: NimKitCoreTypes.ISession | null) => {
  moreActionsSession.value = session
}
// 点击会话
const handleSessionItemClick = async (
  session: NimKitCoreTypes.ISession
) => {
  moreActionsSession.value = null
  try {
    await store.uiStore.selectSession(session.id)
    uni.navigateTo({ url: '/pages/Chat/index' })
  } catch {
    uni.showToast({
      title: t('selectSessionFailText'),
      icon: 'error'
    })
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
// 发起单聊
const startConversation = () => {
  addDropdownVisible.value = false
  uni.navigateTo({
    url: '/pages/Conversation/conversation-start/index'
  })
}
// 创建群聊
const onCreateGroup = () => {
  addDropdownVisible.value = false
  uni.navigateTo({
    url: '/pages/Group/group-create/index'
  })
}

onHide(() => {
  addDropdownVisible.value = false
})

onShow(() => {
  // 重置选中会话
  store.uiStore.selectSession('')
  setTabUnread()
})

autorun(() => {
  sessionList.value = store.uiStore.sessionList
  setTabUnread()
})

</script>

<style lang="scss" scoped>
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
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.button-box {
  display: flex;
  align-items: center;
  position: relative;

  .button-icon {
    margin-left: 20px;
  }


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
  top: 100%;
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

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
