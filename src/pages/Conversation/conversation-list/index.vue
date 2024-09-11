<template>
  <div class="conversation-wrapper">
    <div
      class="dropdown-mark"
      v-if="addDropdownVisible"
      @touchstart="hideAddDropdown"
    ></div>
    <div class="navigation-bar">
      <div class="logo-box">
        <image
          src="https://yx-web-nosdn.netease.im/common/bbcd9929e31bfee02663fc0bcdabe1c5/yx-logo.png"
          class="logo-img"
        />
        <div>{{ t('appText') }}</div>
      </div>
      <div :class="buttonClass">
        <!-- #ifdef MP -->
        <image
          src="https://yx-web-nosdn.netease.im/common/9ae07d276ba2833b678a4077960e2d1e/Group 1899.png"
          class="button-icon"
          @tap="showAddDropdown"
        />
        <!-- #endif -->
        <!-- #ifndef MP -->
        <div class="button-icon-add" @tap="showAddDropdown">
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
                :style="{ marginRight: '5px' }"
              />
              {{ t('createTeamText') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block"></div>
    <NetworkAlert />
    <!-- 页面初始化的过程中，sessionList编译到小程序和h5出现sessionList为undefined的情况，即使给了默认值为空数组，故在此处进行判断 -->
    <Empty
      v-if="!conversationList || conversationList.length === 0"
      :text="t('conversationEmptyText')"
    />
    <div v-else class="conversation-list-wrapper">
      <!-- 此处的key如果用session.id，会在ios上渲染存在问题，会出现会话列表显示undefined -->
      <div
        v-for="(conversation, index) in conversationList"
        :key="conversation.renderKey"
      >
        <ConversationItem
          :key="conversation.renderKey"
          :showMoreActions="
            currentMoveSessionId === conversation.conversationId
          "
          :conversation="conversation"
          @delete="handleSessionItemDeleteClick"
          @stickyToTop="handleSessionItemStickTopChange"
          @click="handleSessionItemClick"
          @leftSlide="handleSessionItemLeftSlide"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
import { V2NIMConversation } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMConversationService'

const conversationList = ref<V2NIMConversation[]>([])
const addDropdownVisible = ref(false)

const currentMoveSessionId = ref('')

let buttonClass = 'button-box'
// #ifdef MP
buttonClass = 'button-box-mp'
// #endif

const handleSessionItemLeftSlide = (conversation: V2NIMConversation | null) => {
  // 微信小程序点击也会触发左滑事件，但此时 conversation 为 null
  if (conversation) {
    currentMoveSessionId.value = conversation.conversationId
  } else {
    currentMoveSessionId.value = ''
  }
}

let flag = false
// 点击会话
const handleSessionItemClick = async (conversation: V2NIMConversation) => {
  if (flag) return
  currentMoveSessionId.value = ''
  try {
    flag = true

    await uni.$UIKitStore.uiStore.selectConversation(
      conversation.conversationId
    )
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

  if (uni.$currentAudioContext) {
    uni.$currentAudioContext?.destroy()
    uni.$currentAudioContext = null
  }
}
// 删除会话
const handleSessionItemDeleteClick = async (
  conversation: V2NIMConversation
) => {
  try {
    await uni.$UIKitStore.conversationStore.deleteConversationActive(
      conversation.conversationId
    )
  } catch {
    uni.showToast({
      title: t('deleteSessionFailText'),
      icon: 'error',
    })
  }
}
// 置顶会话
const handleSessionItemStickTopChange = async (
  conversation: V2NIMConversation
) => {
  if (conversation.stickTop) {
    try {
      await uni.$UIKitStore.conversationStore.stickTopConversationActive(
        conversation.conversationId,
        false
      )
    } catch {
      uni.showToast({
        title: t('deleteStickTopFailText'),
        icon: 'error',
      })
    }
  } else {
    try {
      await uni.$UIKitStore.conversationStore.stickTopConversationActive(
        conversation.conversationId,
        true
      )
    } catch {
      uni.showToast({
        title: t('addStickTopFailText'),
        icon: 'error',
      })
    }
  }
}

const showAddDropdown = () => {
  addDropdownVisible.value = true
}

const hideAddDropdown = () => {
  addDropdownVisible.value = false
}

const onDropdownClick = (urlType: 'addFriend' | 'createGroup') => {
  const urlMap = {
    // 添加好友
    addFriend: '/pages/Friend/add-friend/index',
    // 创建群聊
    createGroup: '/pages/Group/group-create/index',
  }
  addDropdownVisible.value = false
  customNavigateTo({
    url: urlMap[urlType],
  })
}

onHide(() => {
  addDropdownVisible.value = false
})

autorun(() => {
  conversationList.value = deepClone(uni.$UIKitStore?.uiStore?.conversations)
    ?.map((conversation: V2NIMConversation) => {
      return {
        ...conversation,
        renderKey: conversation.conversationId,
      }
    })
    .sort(
      (a: V2NIMConversation, b: V2NIMConversation) => b.sortOrder - a.sortOrder
    )

  setTabUnread()
})

autorun(() => {
  // 为了监听会触发得留着这个 console
  console.log(
    'unreadSysMsgCount:',

    uni.$UIKitStore?.sysMsgStore?.getTotalUnreadMsgsCount()
  )
  setContactTabUnread()
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.conversation-wrapper {
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

.block {
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

.button-icon-add {
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

.conversation-block {
  width: 100%;
  height: 72px;
}
</style>
