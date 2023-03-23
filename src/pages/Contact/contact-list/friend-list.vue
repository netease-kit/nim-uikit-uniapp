<template>
  <div class="friend-list-container">
    <div class="friend-group-list">
      <div class="friend-group-item" v-for="friendGroup in friendGroupList" :key="friendGroup.key">
        <div class="friend-group-title">
          {{ friendGroup.key }}
        </div>
        <div class="friend-item" v-for="friend in friendGroup.data" :key="friend.account"
          @click="handleFriendItemClick(friend)">
          <Avatar :account="friend.account" />
          <div class="friend-name">{{ friend.alias || friend.nick || friend.account }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '../../../components/Avatar.vue'
import type { NimKitCoreTypes } from '@xkit-yx/core-kit';
import { autorun } from 'mobx';
import { ref } from 'vue';
import { friendGroupByPy } from '../../../utils/friend'
import { customNavigateTo } from '../../../utils/customNavigate';

const friendGroupList = ref<{ key: string, data: NimKitCoreTypes.IFriendInfo[] }[]>([])
const store = uni.$UIKitStore

function handleFriendItemClick(friend: NimKitCoreTypes.IFriendInfo) {
  customNavigateTo({
    url: `/pages/user-card/friend/index?account=${friend.account}`
  })
}

autorun(() => {
  friendGroupList.value = friendGroupByPy(store.uiStore.friendsWithoutBlacklist, {
    firstKey: 'alias',
    secondKey: 'nick',
    thirdKey: 'account',
  },
    false)
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
  color: #B3B7BC;
  border-bottom: 1rpx solid #DBE0E8;
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
