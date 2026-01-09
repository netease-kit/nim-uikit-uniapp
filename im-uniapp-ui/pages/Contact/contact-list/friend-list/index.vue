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
        >
          <FriendItem
            :friend="friend"
            @click="handleFriendItemClick(friend)"
          ></FriendItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/** 好友列表组件 */
import Avatar from '../../../../components/Avatar.vue'
import { onShow } from '@dcloudio/uni-app'
import { autorun } from 'mobx'
import { onUnmounted, ref, watch } from 'vue'
import { friendGroupByPy } from '../../../../utils/friend'
import { customNavigateTo } from '../../../../utils/customNavigate'
import Empty from '../../../../components/Empty.vue'
import { V2NIMConst } from '../../../../utils/nim'
import { t } from '../../../../utils/i18n'

import FriendItem from './friend-item.vue'

/** 好友分组列表 */
const friendGroupList = ref<
  {
    key: string
    data: { accountId: string; appellation: string }[]
  }[]
>([])

/** 好友列表 */
const friendListWithAccount = ref<string[]>([])

/** 读取是否需要显示在线离线的全局配置，默认true*/
const loginStateVisible = uni.$UIKitStore.localOptions.loginStateVisible

/** 点击跳转好友名片页 */
function handleFriendItemClick(friend: {
  accountId: string
  appellation: string
}) {
  customNavigateTo({
    url: `/pages/User/friend/index?account=${friend.accountId}`,
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

  friendListWithAccount.value = data.map((item) => item.accountId)

  friendGroupList.value = friendGroupByPy(
    data,
    {
      firstKey: 'appellation',
    },
    false
  )
})

/** 连接状态监听 断网重连后重新订阅 */
const connectWatch = autorun(() => {
  if (
    uni.$UIKitStore?.connectStore.connectStatus ===
    V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED
  ) {
    subscribeUserStatus(friendListWithAccount.value)
  }
})

/** 订阅好友在线离线状态 */
const subscribeUserStatus = (friends: string[]) => {
  if (loginStateVisible) {
    // 将 friends 拆分成多个长度不超过 100 的子数组
    const chunkSize = 100

    const length = friends.length

    for (let i = 0; i < length; i += chunkSize) {
      const chunk = friends.slice(i, i + chunkSize)

      if (chunk.length > 0) {
        uni.$UIKitStore?.subscriptionStore?.subscribeUserStatusActive(chunk)
      }
    }
  }
}

// 监听数组长度变化
watch(
  () => friendListWithAccount.value.length, // 监听 length 属性
  () => {
    subscribeUserStatus(friendListWithAccount.value)
  }
)

onShow(() => {
  if (friendListWithAccount.value.length) {
    subscribeUserStatus(friendListWithAccount.value)
  }
})

// 组件销毁时取消监听
onUnmounted(() => {
  friendListWatch()
  connectWatch()
})
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';

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

.friend-avatar {
  position: relative;
}
.login-state-icon {
  width: 8px;
  height: 8px;
  box-sizing: content-box;
  background-color: #84ed85;
  border: 2px solid #fff;
  position: absolute;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
}

.unlogin-state-icon {
  width: 8px;
  height: 8px;
  box-sizing: content-box;
  background-color: #d4d9da;
  border: 2px solid #fff;
  position: absolute;
  right: -2px;
  bottom: -2px;
  border-radius: 50%;
}
</style>
