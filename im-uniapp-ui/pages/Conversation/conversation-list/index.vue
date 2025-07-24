<template>
  <div class="conversation-wrapper">
    <div
      v-if="addDropdownVisible"
      class="dropdown-mark"
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
      <div :class="isWxApp ? 'button-box-mp' : 'button-box'">
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
            <div
              class="add-menu-item"
              @tap="onDropdownClick('createDiscussion')"
            >
              <Icon
                type="icon-chuangjianqunzu"
                :style="{ marginRight: '5px' }"
              />
              {{ t('createDiscussionText') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="block"></div>
    <NetworkAlert />
    <div v-if="!conversationList || conversationList.length === 0">
      <div class="security-tip">
        <div>
          {{ t('securityTipText') }}
        </div>
      </div>
      <div class="conversation-search" @tap="goToSearchPage">
        <div class="search-input-wrapper">
          <div class="search-icon-wrapper">
            <Icon
              iconClassName="search-icon"
              :size="16"
              color="#A6ADB6"
              type="icon-sousuo"
            ></Icon>
          </div>
          <div class="search-input">{{ t('searchText') }}</div>
        </div>
      </div>
      <!-- 页面初始化的过程中，sessionList编译到小程序和h5出现sessionList为undefined的情况，即使给了默认值为空数组，故在此处进行判断 -->
      <Empty
        v-if="!conversationList || conversationList.length === 0"
        :text="t('conversationEmptyText')"
      />
    </div>
    <div v-else class="conversation-list-wrapper">
      <div class="security-tip">
        <div>
          {{ t('securityTipText') }}
        </div>
      </div>
      <div class="conversation-search" @click="goToSearchPage">
        <div class="search-input-wrapper">
          <div class="search-icon-wrapper">
            <Icon
              iconClassName="search-icon"
              :size="16"
              color="#A6ADB6"
              type="icon-sousuo"
            ></Icon>
          </div>
          <div class="search-input">{{ t('searchText') }}</div>
        </div>
      </div>
      <!-- 此处的key如果用conversationId，会在ios上渲染存在问题，会出现会话列表显示undefined -->
      <div
        v-for="conversation in conversationList"
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
/** 会话列表主界面 */
import { onUnmounted, ref, watch } from 'vue'
import { autorun } from 'mobx'
import { onShow, onHide } from '@dcloudio/uni-app'
import Icon from '../../../components/Icon.vue'
import NetworkAlert from '../../../components/NetworkAlert.vue'
import Empty from '../../../components/Empty.vue'
import ConversationItem from './conversation-item.vue'
import { setContactTabUnread, setTabUnread } from '../../../utils/msg'
import { t } from '../../../utils/i18n'
import { customNavigateTo } from '../../../utils/customNavigate'
import { V2NIMConst } from '../../../utils/nim'
import { isWxApp } from '../../../utils'
import { trackInit } from '../../../utils/reporter'

import {
  V2NIMConversationForUI,
  V2NIMLocalConversationForUI,
} from '@xkit-yx/im-store-v2/dist/types/types'

/**会话列表 */
const conversationList = ref<
  (
    | (V2NIMConversationForUI & { renderKey: string })
    | (V2NIMLocalConversationForUI & { renderKey: string })
  )[]
>([])

/** 右上角更多 */
const addDropdownVisible = ref(false)

/** 当前左滑会话ID */
const currentMoveSessionId = ref('')

/**是否是云端会话 */
const enableV2CloudConversation =
  uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation

/** 会话左滑 */
const handleSessionItemLeftSlide = (
  conversation: V2NIMConversationForUI | V2NIMLocalConversationForUI | null
) => {
  // 微信小程序点击也会触发左滑事件，但此时 conversation 为 null
  if (conversation) {
    currentMoveSessionId.value = conversation.conversationId
  } else {
    currentMoveSessionId.value = ''
  }
}

let flag = false

// 点击会话
const handleSessionItemClick = async (
  conversation: V2NIMConversationForUI | V2NIMLocalConversationForUI
) => {
  if (flag) return
  currentMoveSessionId.value = ''
  try {
    flag = true
    // 处理@消息相关
    if (
      conversation.type ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM ||
      conversation.type ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM
    ) {
      if (enableV2CloudConversation) {
        await uni.$UIKitStore.conversationStore?.markConversationReadActive(
          conversation.conversationId
        )
      } else {
        await uni.$UIKitStore.localConversationStore?.markConversationReadActive(
          conversation.conversationId
        )
      }
    }

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
}

// 删除会话
const handleSessionItemDeleteClick = async (
  conversation: V2NIMConversationForUI | V2NIMLocalConversationForUI
) => {
  try {
    if (enableV2CloudConversation) {
      await uni.$UIKitStore.conversationStore?.deleteConversationActive(
        conversation.conversationId
      )
    } else {
      await uni.$UIKitStore.localConversationStore?.deleteConversationActive(
        conversation.conversationId
      )
    }
    currentMoveSessionId.value = ''
  } catch {
    uni.showToast({
      title: t('deleteSessionFailText'),
      icon: 'error',
    })
  }
}

// 置顶会话
const handleSessionItemStickTopChange = async (
  conversation: V2NIMConversationForUI | V2NIMLocalConversationForUI
) => {
  if (conversation.stickTop) {
    try {
      if (enableV2CloudConversation) {
        await uni.$UIKitStore?.conversationStore?.stickTopConversationActive(
          conversation.conversationId,
          false
        )
      } else {
        await uni.$UIKitStore?.localConversationStore?.stickTopConversationActive(
          conversation.conversationId,
          false
        )
      }
    } catch {
      uni.showToast({
        title: t('deleteStickTopFailText'),
        icon: 'error',
      })
    }
  } else {
    try {
      if (enableV2CloudConversation) {
        await uni.$UIKitStore?.conversationStore?.stickTopConversationActive(
          conversation.conversationId,
          true
        )
      } else {
        await uni.$UIKitStore?.localConversationStore?.stickTopConversationActive(
          conversation.conversationId,
          true
        )
      }
    } catch {
      uni.showToast({
        title: t('addStickTopFailText'),
        icon: 'error',
      })
    }
  }
}

/** 显示添加好友、群聊 Dropdown */
const showAddDropdown = () => {
  addDropdownVisible.value = true
}

/** 隐藏添加好友、群聊 Dropdown */
const hideAddDropdown = () => {
  addDropdownVisible.value = false
}

/** 点击Dropdown */
const onDropdownClick = (
  urlType: 'addFriend' | 'createGroup' | 'createDiscussion'
) => {
  const urlMap = {
    // 添加好友
    addFriend: '/pages/User/friend/add-friend',
    // 创建群聊
    createGroup: '/pages/Team/team-create/index',
    // 创建讨论组和创建群聊复用一个页面，仅在创建群接口时，群扩展字段添加im_ui_kit_group参数区分，讨论组本质也是群，只是少了群的一些能力，旨在于快速创建讨论
    createDiscussion: `/pages/Team/team-create/index?createDiscussion=${true}`,
  }
  addDropdownVisible.value = false
  customNavigateTo({
    url: urlMap[urlType],
  })
}

/** 跳转至搜索页面 */
const goToSearchPage = () => {
  customNavigateTo({
    url: '/pages/Conversation/conversation-search/index',
  })
}

/** 订阅当前会话方在线离线状态 */
const subscribeUserStatus = (
  conversations: (V2NIMConversationForUI | V2NIMLocalConversationForUI)[]
) => {
  const loginStateVisible = uni.$UIKitStore.localOptions.loginStateVisible
  if (loginStateVisible) {
    // 订阅会话列表中 单聊的在线离线状态
    const accounts = conversations
      .filter(
        (item) =>
          item.type ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
      )
      .map((item) => {
        return uni.$UIKitNIM?.V2NIMConversationIdUtil.parseConversationTargetId(
          item.conversationId
        )
      })
    // 将 accounts 拆分成多个长度不超过 100 的子数组
    const chunkSize = 100

    const length = accounts.length

    for (let i = 0; i < length; i += chunkSize) {
      const chunk = accounts.slice(i, i + chunkSize)

      if (chunk.length > 0) {
        uni.$UIKitStore.subscriptionStore.subscribeUserStatusActive(chunk)
      }
    }
  }
}

trackInit('ConversationUIKit')

/** 监听会话列表数据变更，实时更新 conversationList */
const conversationListWatch = autorun(() => {
  const _conversationList = enableV2CloudConversation
    ? uni.$UIKitStore?.uiStore?.conversations
    : uni.$UIKitStore?.uiStore?.localConversations

  conversationList.value = _conversationList
    ?.map(
      (conversation: V2NIMConversationForUI | V2NIMLocalConversationForUI) => {
        return {
          ...conversation,
          // 为什么要加一个renderKey 直接在渲染的时候写 :key = conversation.conversationId 不就行了吗？
          // 如果不加，在渲染的时候，就会出现会话列表显示undefined，uniapp 很奇怪的问题
          renderKey: conversation.conversationId,
        }
      }
    )
    .sort(
      (
        a: V2NIMConversationForUI | V2NIMLocalConversationForUI,
        b: V2NIMConversationForUI | V2NIMLocalConversationForUI
      ) => b.sortOrder - a.sortOrder
    )

  setTabUnread()
})

/** 连接状态监听 断网重连后重新订阅 */
const connectWatch = autorun(() => {
  if (
    uni.$UIKitStore?.connectStore.loginStatus ===
      V2NIMConst.V2NIMLoginStatus.V2NIM_LOGIN_STATUS_LOGINED &&
    uni.$UIKitStore?.connectStore.connectStatus ===
      V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED
  ) {
    subscribeUserStatus(conversationList?.value)
  }
})

/** 监听系统消息未读 */
const getTotalUnreadMsgsCountWatch = autorun(() => {
  // 为了监听会触发
  uni.$UIKitStore?.sysMsgStore?.getTotalUnreadMsgsCount()
  setContactTabUnread()
})

// 监听数组长度变化
watch(
  () => conversationList?.value?.length, // 监听 length 属性
  () => {
    subscribeUserStatus(conversationList?.value)
  }
)

// 监听会话列表数据变更，实时订阅在线离线状态
onShow(() => {
  if (conversationList.value?.length) {
    subscribeUserStatus(conversationList?.value)
  }
})

onHide(() => {
  addDropdownVisible.value = false
  currentMoveSessionId.value = ''
})

/**卸载监听 */
onUnmounted(() => {
  conversationListWatch()
  getTotalUnreadMsgsCountWatch()
  connectWatch()
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
.conversation-search {
  display: flex;
  align-items: center;
  height: 54px;
  box-sizing: border-box;
  overflow: hidden;
  padding: 10px;
}
.security-tip {
  padding: 0 10px;
  background: #fff5e1;
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  font-size: 14px;
  text-align: center;
  white-space: wrap;
  color: #eb9718;
  text-align: left;
  display: flex;
  align-items: center;
}
.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  height: 34px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 8px 10px;
  background: #f3f5f7;
  border-radius: 5px;
}
.search-input {
  margin-left: 5px;
  color: #999999;
  font-size: 14px;
}
.search-icon-wrapper {
  height: 22px;
  display: flex;
  align-items: center;
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
