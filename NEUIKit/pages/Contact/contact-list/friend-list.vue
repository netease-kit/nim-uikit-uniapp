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
          :key="friend.accountId"
          @click="handleFriendItemClick(friend)"
        >
          <Avatar :account="friend.accountId" />
          <div class="friend-name">{{ friend.appellation }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/** 好友列表组件 */
import Avatar from '../../../components/Avatar.vue'
import { autorun } from 'mobx'
import { onUnmounted, ref } from '../../../utils/transformVue'
import { friendGroupByPy } from '../../../utils/friend'
import { customNavigateTo } from '../../../utils/customNavigate'
import Empty from '../../../components/Empty.vue'

import { t } from '../../../utils/i18n'
import { V2NIMFriend } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMFriendService'

type FriendItem = V2NIMFriend & { appellation: string }

const friendGroupList = ref<
  { key: string; data: { accountId: string; appellation: string }[] }[]
>([])

/** 点击跳转好友名片页 */
function handleFriendItemClick(friend: FriendItem) {
  customNavigateTo({
    url: `/pages/user-card/friend/index?account=${friend.accountId}`,
  })
}

/** 好友列表监听 */
const friendListWatch = autorun(() => {
  const data = uni.$UIKitStore.uiStore.friends
    .filter(
      (item) =>
        !uni.$UIKitStore.relationStore.blacklist.includes(item.accountId)
    )
    .map((item) => ({
      accountId: item.accountId,
      appellation: uni.$UIKitStore.uiStore.getAppellation({
        account: item.accountId,
      }),
    }))

  friendGroupList.value = friendGroupByPy(
    data,
    {
      firstKey: 'appellation',
    },
    false
  )
})

onUnmounted(() => {
  friendListWatch()
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
