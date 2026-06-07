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
          <div class="friend-avatar">
            <Avatar :account="friend.accountId" />
            <div
              class="login-state-icon"
              v-if="loginStateVisible && friend.isOnline"
            ></div>
            <div
              class="unlogin-state-icon"
              v-if="loginStateVisible && !friend.isOnline"
            ></div>
          </div>
          <div class="friend-name">{{ friend.appellation }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/** 好友列表组件 */
import Avatar from '../../../../components/Avatar.vue'
import { autorun } from "../../../../utils/store.js"
import { friendGroupByPy } from '../../../../utils/friend'
import { customNavigateTo } from '../../../../utils/customNavigate'
import Empty from '../../../../components/Empty.vue'
import { V2NIMConst } from '../../../../utils/nim'
import { t } from '../../../../utils/i18n'
import { toRenderSafeData } from '../../../../utils'

export default {
  components: {
    Avatar,
    Empty,
  },
  data() {
    return {
      V2NIMConst,
      friendGroupList: [],
      friendListWithAccount: [],
      loginStateVisible: uni.$UIKitStore.localOptions.loginStateVisible,
      friendListWatch: function () {},
      connectWatch: function () {},
      previousFriendListCount: 0,
    }
  },
  watch: {
    friendListWithAccount: {
      handler(newVal, oldVal) {
        const oldLength = oldVal ? oldVal.length : this.previousFriendListCount
        if (newVal.length !== oldLength) {
          this.subscribeUserStatus(newVal)
        }
        this.previousFriendListCount = newVal.length
      },
      deep: false,
    },
  },
  created() {
    this.friendListWatch = autorun(() => {
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
          isOnline:
            uni.$UIKitStore?.subscriptionStore.stateMap.get(item.accountId)
              ?.statusType ===
            V2NIMConst.V2NIMUserStatusType.V2NIM_USER_STATUS_TYPE_LOGIN,
        }))

      this.friendListWithAccount = data.map((item) => item.accountId)
      this.friendGroupList = toRenderSafeData(friendGroupByPy(
        data,
        {
          firstKey: 'appellation',
        },
        false
      )) || []
    })

    this.connectWatch = autorun(() => {
      if (
        uni.$UIKitStore?.connectStore.connectStatus ===
        V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED
      ) {
        this.subscribeUserStatus(this.friendListWithAccount)
      }
    })
  },
  onShow() {
    if (this.friendListWithAccount.length) {
      this.subscribeUserStatus(this.friendListWithAccount)
    }
  },
  beforeDestroy() {
    this.friendListWatch()
    this.connectWatch()
  },
  methods: {
    t,
    handleFriendItemClick(friend) {
      customNavigateTo({
        url: `/pages/User/friend/index?account=${friend.accountId}`,
      })
    },
    subscribeUserStatus(friends) {
      if (this.loginStateVisible) {
        const chunkSize = 100
        const length = friends.length

        for (let i = 0; i < length; i += chunkSize) {
          const chunk = friends.slice(i, i + chunkSize)

          if (chunk.length > 0) {
            uni.$UIKitStore?.subscriptionStore.subscribeUserStatusActive(chunk)
          }
        }
      }
    },
  },
}
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
