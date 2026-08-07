<template>
  <div class="forward-selector">
    <template v-if="!showSelectedDetail">
      <NavBar :title="t('chooseText')" :show-left="true">
        <template #left>
          <text class="forward-nav-button forward-cancel-button" @tap="emit('cancel')">
            {{ t('cancelText') }}
          </text>
        </template>
        <template #right>
          <text
            v-if="!multiSelect"
            class="forward-nav-button"
            @tap="toggleMultiSelect"
          >
            {{ t('multiSelectText') }}
          </text>
          <text
            v-else
            class="forward-nav-button"
            :class="{ disabled: selectedIds.length === 0 }"
            @tap="handleMultiSend"
          >
            {{ t('yesText') }}
          </text>
        </template>
      </NavBar>

      <div
        class="forward-selector-content"
        :class="{ 'forward-selector-content-wx': isWxApp }"
      >
        <div class="forward-search-wrapper">
          <div class="forward-search-box">
            <Icon type="icon-sousuo" :size="16" />
            <input
              class="forward-search-input"
              :value="searchText"
              :placeholder="t('searchText')"
              @input="handleSearchInput"
            />
            <div v-if="searchText" class="forward-search-clear" @tap="clearSearch">
              <Icon type="icon-shandiao" :size="16" />
            </div>
          </div>
        </div>

        <div
          v-if="multiSelect && selectedTargets.length"
          class="forward-selected-bar"
          @tap="showSelectedDetail = true"
        >
          <scroll-view class="forward-selected-scroll" scroll-x>
            <div class="forward-selected-scroll-inner">
              <Avatar
                v-for="item in selectedTargets"
                :key="item.id"
                :account="item.id"
                :avatar="item.avatar"
                size="36"
              />
            </div>
          </scroll-view>
          <text class="forward-selected-arrow">›</text>
        </div>

        <div
          v-if="!searchText && recentForwardTargets.length"
          class="forward-recent-bar"
        >
          <div class="forward-recent-label">{{ t('recentForwardText') }}</div>
          <scroll-view class="forward-recent-scroll" scroll-x>
            <div class="forward-recent-scroll-inner">
              <div
                v-for="item in recentForwardTargets"
                :key="`recent-forward-${item.type}-${item.id}`"
                class="forward-recent-item"
                :class="{ selected: multiSelect && selectedIds.includes(item.id) }"
                @tap="handleItemClick(item)"
              >
                <div class="forward-recent-avatar">
                  <Avatar
                    :account="item.id"
                    :avatar="item.avatar"
                    size="36"
                  />
                  <div
                    v-if="multiSelect"
                    class="forward-checkbox forward-checkbox-small"
                    :class="{ checked: selectedIds.includes(item.id) }"
                  >
                    <text v-if="selectedIds.includes(item.id)">✓</text>
                  </div>
                </div>
                <Appellation
                  v-if="item.type === p2pConversationType"
                  class="forward-recent-name"
                  :account="item.id"
                  :font-size="13"
                />
                <text v-else class="forward-recent-name">{{ item.name }}</text>
              </div>
            </div>
          </scroll-view>
        </div>

        <div class="forward-tabs">
          <div
            v-for="tab in tabs"
            :key="tab.key"
            class="forward-tab-item"
            :class="{ active: currentTab === tab.key }"
            @tap="handleTabChange(tab.key)"
          >
            {{ tab.label }}
          </div>
        </div>

        <scroll-view class="forward-list" scroll-y :scroll-top="listScrollTop">
          <Empty v-if="!searchText && currentList.length === 0" :text="currentEmptyText" />
          <div v-else-if="searchText && filteredCurrentList.length === 0">
            <Empty :text="searchEmptyText" />
          </div>
          <div v-else class="forward-list-section">
            <div
              v-for="item in filteredCurrentList"
              :key="`${item.type}-${item.id}`"
              class="forward-list-item"
              :class="{ selected: multiSelect && selectedIds.includes(item.id) }"
              @tap="handleItemClick(item)"
            >
              <div
                v-if="multiSelect"
                class="forward-checkbox"
                :class="{ checked: selectedIds.includes(item.id) }"
              >
                <text v-if="selectedIds.includes(item.id)">✓</text>
              </div>
              <Avatar
                :account="item.id"
                :avatar="item.avatar"
                size="40"
              />
              <div class="forward-item-name">
                <Appellation
                  v-if="item.type === p2pConversationType"
                  :account="item.id"
                  :font-size="15"
                />
                <template v-else>
                  <text class="forward-item-name-text">{{ item.name }}</text>
                  <text v-if="item.memberCount != null" class="forward-item-count">
                    ({{ item.memberCount }})
                  </text>
                </template>
              </div>
            </div>
          </div>
        </scroll-view>
      </div>
    </template>

    <template v-else>
      <NavBar
        :title="`${t('selectedText')}(${selectedTargets.length})`"
        :show-left="true"
      >
        <template #left>
          <text
            class="forward-nav-button forward-cancel-button"
            @tap="showSelectedDetail = false"
          >
            {{ t('cancelText') }}
          </text>
        </template>
      </NavBar>
      <scroll-view
        class="forward-selected-detail"
        :class="{ 'forward-selector-content-wx': isWxApp }"
        scroll-y
      >
        <div
          v-for="item in selectedTargets"
          :key="`${item.type}-${item.id}`"
          class="forward-selected-detail-item"
        >
          <Avatar :account="item.id" :avatar="item.avatar" size="40" />
          <div class="forward-selected-detail-name">
            <Appellation
              v-if="item.type === p2pConversationType"
              :account="item.id"
              :font-size="15"
            />
            <template v-else>
              <text>{{ item.name }}</text>
              <text v-if="item.memberCount != null" class="forward-item-count">
                ({{ item.memberCount }})
              </text>
            </template>
          </div>
          <div class="forward-selected-detail-remove" @tap.stop="removeTarget(item.id)">
            <Icon type="icon-shandiao" :size="16" />
          </div>
        </div>
      </scroll-view>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import Appellation from '../../../../components/Appellation.vue'
import Avatar from '../../../../components/Avatar.vue'
import Empty from '../../../../components/Empty.vue'
import Icon from '../../../../components/Icon.vue'
import NavBar from '../../../../components/NavBar.vue'
import { friendGroupByPy } from '../../../../utils/friend'
import {
  collectForwardTargets,
  getRecentForwardTargets,
  toggleForwardTargetSelection,
  type ForwardTarget,
} from '../../../../utils/forwardTarget'
import { t } from '../../../../utils/i18n'
import { isWxApp } from '../../../../utils'
import { V2NIMConst } from '../../../../utils/nim'
import { autorun } from '../../../../utils/module/im-store-v2/uniapp/index.esm.js'

type ForwardTab = 'recent' | 'friend' | 'team'

const emit = defineEmits<{
  (event: 'cancel'): void
  (event: 'select', targets: ForwardTarget[]): void
}>()

const p2pConversationType =
  V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
const teamConversationType =
  V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
const enableV2CloudConversation =
  uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation

const searchText = ref('')
const currentTab = ref<ForwardTab>('recent')
const multiSelect = ref(false)
const selectedIds = ref<string[]>([])
const showSelectedDetail = ref(false)
const listScrollTop = ref(0)
const conversations = ref<any[]>([])
const friendList = ref<ForwardTarget[]>([])
const teamList = ref<ForwardTarget[]>([])
const recentForwardItems = ref(
  getRecentForwardTargets(
    uni,
    uni.$UIKitStore?.userStore?.myUserInfo?.accountId || ''
  )
)

const conversationListWatch = autorun(() => {
  const list = enableV2CloudConversation
    ? uni.$UIKitStore?.uiStore?.conversations
    : uni.$UIKitStore?.uiStore?.localConversations
  conversations.value = (list || []).slice(0, 100)
})

const friendListWatch = autorun(() => {
  const list = (uni.$UIKitStore?.uiStore?.friends || [])
    .filter(
      (item: { accountId: string }) =>
        !uni.$UIKitStore?.relationStore?.blacklist.includes(item.accountId)
    )
    .map((item: { accountId: string }) => ({
      id: item.accountId,
      type: p2pConversationType,
      name:
        uni.$UIKitStore?.uiStore?.getAppellation({ account: item.accountId }) ||
        item.accountId,
    }))
  friendList.value = friendGroupByPy<ForwardTarget>(
    list,
    { firstKey: 'name' },
    false
  ).flatMap((group) => group.data)
})

const teamListWatch = autorun(() => {
  teamList.value = (uni.$UIKitStore?.uiStore?.teamList || []).map((team: any) => ({
    id: team.teamId,
    type: teamConversationType,
    name: team.name || team.teamId,
    avatar: team.avatar,
    memberCount: team.memberCount,
  }))
})

const recentList = computed<ForwardTarget[]>(() =>
  conversations.value
    .filter(
      (conversation) =>
        conversation.type === p2pConversationType ||
        conversation.type === teamConversationType
    )
    .map((conversation) => {
      const id = uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationTargetId(
        conversation.conversationId
      )
      const team = uni.$UIKitStore?.teamStore?.teams.get(id)
      return {
        id,
        type: conversation.type,
        name:
          conversation.type === p2pConversationType
            ? uni.$UIKitStore?.uiStore?.getAppellation({ account: id }) || id
            : conversation.name || team?.name || id,
        avatar: conversation.avatar || team?.avatar,
        memberCount:
          conversation.type === teamConversationType
            ? team?.memberCount
            : undefined,
      }
    })
)

const allKnownTargets = computed(() => [
  recentList.value,
  friendList.value,
  teamList.value,
])

const recentForwardTargets = computed<ForwardTarget[]>(() => {
  const knownTargets = collectForwardTargets(
    recentForwardItems.value.map((item) => item.id),
    allKnownTargets.value
  )
  const knownTargetMap = new Map(knownTargets.map((target) => [target.id, target]))
  return recentForwardItems.value.map((item) => {
    const knownTarget = knownTargetMap.get(item.id)
    return {
      id: item.id,
      type: item.type === 'p2p' ? p2pConversationType : teamConversationType,
      name: item.name || knownTarget?.name || item.id,
      avatar: knownTarget?.avatar,
      memberCount: knownTarget?.memberCount,
    }
  })
})

const selectedTargets = computed(() =>
  collectForwardTargets(selectedIds.value, [
    recentForwardTargets.value,
    ...allKnownTargets.value,
  ])
)

const tabs = computed(() => [
  { key: 'recent' as const, label: t('recentSessionText') },
  { key: 'friend' as const, label: t('myFriendText') },
  { key: 'team' as const, label: t('teamChooseText') },
])

const currentList = computed(() => {
  if (currentTab.value === 'friend') return friendList.value
  if (currentTab.value === 'team') return teamList.value
  return recentList.value
})

const filteredCurrentList = computed(() => {
  const keyword = searchText.value.trim().toLowerCase()
  if (!keyword) return currentList.value
  return currentList.value.filter((item) =>
    (item.name || item.id).toLowerCase().includes(keyword)
  )
})

const currentEmptyText = computed(() => {
  if (currentTab.value === 'friend') return t('noFriendText')
  if (currentTab.value === 'team') return t('teamEmptyText')
  return t('conversationEmptyText')
})

const searchEmptyText = computed(
  () => `${t('searchNoResultPrefix')}${searchText.value}${t('searchNoResultSuffix')}`
)

const toggleMultiSelect = () => {
  multiSelect.value = !multiSelect.value
  if (!multiSelect.value) selectedIds.value = []
}

const handleItemClick = (item: ForwardTarget) => {
  if (!multiSelect.value) {
    emit('select', [item])
    return
  }
  const result = toggleForwardTargetSelection(selectedIds.value, item.id)
  if (result.limited) {
    uni.showToast({ title: t('forwardMultiSelectLimitText'), icon: 'none' })
    return
  }
  selectedIds.value = result.selectedIds
}

const handleMultiSend = () => {
  if (!selectedTargets.value.length) return
  emit('select', selectedTargets.value)
}

const removeTarget = (targetId: string) => {
  selectedIds.value = selectedIds.value.filter((id) => id !== targetId)
  if (!selectedIds.value.length) showSelectedDetail.value = false
}

const resetListScroll = async () => {
  listScrollTop.value = 1
  await nextTick()
  listScrollTop.value = 0
}

const handleTabChange = (tab: ForwardTab) => {
  currentTab.value = tab
  resetListScroll()
}

const handleSearchInput = (event: any) => {
  searchText.value = event.detail.value
  resetListScroll()
}

const clearSearch = () => {
  searchText.value = ''
}

onMounted(async () => {
  try {
    const result = enableV2CloudConversation
      ? await uni.$UIKitStore?.conversationStore?.getConversationListActive(0, 100)
      : await uni.$UIKitStore?.localConversationStore?.getConversationListActive(
          0,
          100
        )
    if (result?.conversationList) conversations.value = result.conversationList
  } catch {
    // Keep the in-memory conversation list when an explicit refresh fails.
  }
})

onUnmounted(() => {
  conversationListWatch()
  friendListWatch()
  teamListWatch()
})
</script>

<style lang="scss" scoped>
.forward-selector {
  min-height: 100vh;
  color: #1f2329;
  background: #fff;
}

.forward-nav-button {
  display: block;
  min-width: 42px;
  padding: 4px 0;
  color: #337eff;
  font-size: 14px;
  text-align: right;

  &.disabled {
    color: #b3cff7;
  }
}

.forward-cancel-button {
  color: #1f2329;
  text-align: left;
}

.forward-selector-content,
.forward-selected-detail {
  display: flex;
  height: calc(100vh - 45px - var(--status-bar-height));
  flex-direction: column;
  overflow: hidden;
}

.forward-selector-content-wx {
  height: calc(100vh - 55px - var(--status-bar-height));
}

.forward-search-wrapper {
  flex: 0 0 auto;
  padding: 8px 16px;
}

.forward-search-box {
  display: flex;
  height: 36px;
  align-items: center;
  padding: 0 12px;
  border-radius: 5px;
  background: #f3f5f7;
  box-sizing: border-box;
}

.forward-search-input {
  flex: 1;
  min-width: 0;
  height: 36px;
  padding: 0 8px;
  border: 0;
  background: transparent;
  color: #333;
  font-size: 14px;
}

.forward-search-clear {
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
}

.forward-selected-bar {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid #edf0f3;
}

.forward-selected-scroll {
  min-width: 0;
  flex: 1;
  white-space: nowrap;
}

.forward-selected-scroll-inner,
.forward-recent-scroll-inner {
  display: inline-flex;
  gap: 8px;
}

.forward-selected-arrow {
  margin-left: 8px;
  color: #b3b7bc;
  font-size: 20px;
}

.forward-recent-bar {
  flex: 0 0 auto;
  padding: 12px 0 8px 16px;
  border-bottom: 4px solid #edf0f3;
}

.forward-recent-label {
  margin-bottom: 8px;
  color: #b3b7bc;
  font-size: 12px;
}

.forward-recent-scroll {
  width: 100%;
  white-space: nowrap;
}

.forward-recent-scroll-inner {
  gap: 12px;
  padding-right: 16px;
}

.forward-recent-item {
  display: flex;
  width: 52px;
  flex-direction: column;
  align-items: center;

  &.selected {
    opacity: 0.7;
  }
}

.forward-recent-avatar {
  position: relative;
}

.forward-recent-name {
  display: block;
  width: 52px;
  margin-top: 4px;
  overflow: hidden;
  color: #333;
  font-size: 13px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.forward-tabs {
  display: flex;
  flex: 0 0 auto;
  border-bottom: 1px solid #edf0f3;
}

.forward-tab-item {
  position: relative;
  flex: 1;
  padding: 12px 0;
  color: #656a72;
  font-size: 14px;
  text-align: center;

  &.active {
    color: #337eff;
    font-weight: 500;

    &::after {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2px;
      background: #337eff;
      content: '';
    }
  }
}

.forward-list {
  min-height: 0;
  flex: 1;
}

.forward-list-section {
  padding: 8px 0;
}

.forward-list-item,
.forward-selected-detail-item {
  display: flex;
  min-height: 64px;
  align-items: center;
  padding: 10px 16px;
  box-sizing: border-box;

  &.selected {
    background: #ecf2fe;
  }
}

.forward-item-name,
.forward-selected-detail-name {
  display: flex;
  min-width: 0;
  flex: 1;
  align-items: center;
  margin-left: 12px;
  overflow: hidden;
  color: #1f2329;
  font-size: 15px;
}

.forward-item-name-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.forward-item-count {
  flex: 0 0 auto;
  margin-left: 2px;
  color: #b3b7bc;
  font-size: 13px;
}

.forward-checkbox {
  display: flex;
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border: 2px solid #cdd1d6;
  border-radius: 50%;
  box-sizing: border-box;
  color: #fff;
  font-size: 12px;

  &.checked {
    border-color: #337eff;
    background: #337eff;
  }
}

.forward-checkbox-small {
  position: absolute;
  right: -5px;
  bottom: -3px;
  width: 16px;
  height: 16px;
  margin: 0;
}

.forward-selected-detail {
  display: block;
}

.forward-selected-detail-remove {
  display: flex;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}
</style>
