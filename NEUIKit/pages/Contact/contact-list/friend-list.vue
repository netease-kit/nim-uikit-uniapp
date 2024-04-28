<template>
  <div class="friend-list-container">
    <div class="friend-group-list">
      <Empty v-if="friendGroupList.length === 0" :text="t('noFriendText')" />
      <div
        class="friend-group-item"
        v-for="friendGroup in friendGroupList"
        :key="friendGroup.key"
      >
        <div class="friend-group-title">
          {{ friendGroup.key }}
        </div>
        <div
          class="friend-item"
          v-for="friend in friendGroup.data"
          :key="friend.account"
          @click="handleFriendItemClick(friend)"
        >
          <Avatar :account="friend.account" />
          <div class="friend-name">{{ friend.appellation }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '../../../components/Avatar.vue'
import { autorun } from 'mobx'
import { onUnmounted, ref } from '../../../utils/transformVue'
import { friendGroupByPy } from '../../../utils/friend'
import { customNavigateTo } from '../../../utils/customNavigate'
import type { IFriendInfo } from '@xkit-yx/core-kit/dist/types/nim-kit-core/types'
import Empty from '../../../components/Empty.vue'
import { deepClone } from '../../../utils'
import { t } from '../../../utils/i18n'

type FriendItem = IFriendInfo & { appellation: string }

const friendGroupList = ref<{ key: string; data: FriendItem[] }[]>([])

function handleFriendItemClick(friend: FriendItem) {
  customNavigateTo({
    url: `/pages/user-card/friend/index?account=${friend.account}`,
  })
}

const uninstallFriendListWatch = autorun(() => {
  // @ts-ignore
  const data = uni.$UIKitStore.uiStore.friendsWithoutBlacklist.map((item) => ({
    ...item,
    // @ts-ignore
    appellation: uni.$UIKitStore.uiStore.getAppellation({
      account: item.account,
    }),
  }))
  friendGroupList.value = deepClone(
    friendGroupByPy(
      data,
      {
        firstKey: 'appellation',
      },
      false
    )
  )
})

onUnmounted(() => {
  uninstallFriendListWatch()
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.friend-group-item {
  padding-left: 20px;
}

.friend-group-title {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #b3b7bc;
  border-bottom: 1rpx solid #dbe0e8;
}

.friend-item {
  margin-top: 16px;
  display: flex;
  align-items: center;

  .friend-name {
    margin-left: 12px;
    padding-right: 20px;
    color: #333333;
    flex: 1;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
}
</style>
