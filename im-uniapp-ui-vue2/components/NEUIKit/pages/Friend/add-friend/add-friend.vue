<template>
  <div>
    <NavBar :title="t('addFriendText')" />
    <div class="search-input-wrapper">
      <Icon
        iconClassName="search-icon"
        :size="20"
        color="#A6ADB6"
        type="icon-sousuo"
      ></Icon>
      <input
        class="search-input"
        type="text"
        @input="onInputValueChange"
        @confirm="handleSearch"
        placeholder-class="placeholder"
        confirm-type="search"
        :placeholder="t('enterAccount')"
      />
    </div>
    <Empty
      :text="t('noExistUser')"
      v-if="searchResState == 'searchEmpty'"
    ></Empty>
    <div class="user-wrapper" v-else-if="searchResState === 'searchResult'">
      <Avatar
        class="user-avatar"
        :account="(userInfo && userInfo.accountId) || ''"
      />
      <div class="user-info">
        <div class="user-nick">
          {{ (userInfo && userInfo.name) || (userInfo && userInfo.accountId) }}
        </div>
        <div class="user-id">{{ userInfo && userInfo.accountId }}</div>
      </div>
      <button
        v-if="relation !== 'stranger'"
        class="go-chat-button"
        type="primary"
        @click="gotoChat"
      >
        {{ t('chatButtonText') }}
      </button>
      <button v-else class="go-chat-button" type="primary" @click="applyFriend">
        {{ t('addText') }}
      </button>
    </div>
  </div>
</template>

<script>
import Avatar from '../../../components/Avatar.vue'
import NavBar from '../../../components/NavBar.vue'
import Icon from '../../../components/Icon.vue'
import Empty from '../../../components/Empty.vue'
import { t } from '../../../utils/i18n'
import { customRedirectTo } from '../../../utils/customNavigate'
import { autorun } from "../../../utils/store.js"
import { V2NIMConst } from '../../../utils/nim'
import { toRenderSafeData } from '../../../utils'

export default {
  components: {
    Avatar,
    NavBar,
    Icon,
    Empty,
  },
  data() {
    return {
      V2NIMConst,
      searchResState: 'beginSearch',
      userInfo: null,
      relation: 'stranger',
      uninstallRelationWatch: function () {},
    }
  },
  created() {
    this.uninstallRelationWatch = autorun(() => {
      console.log('friends: ', uni.$UIKitStore.uiStore.friends)
      if (this.userInfo && this.userInfo.accountId) {
        this.relation = uni.$UIKitStore.uiStore.getRelation(
          this.userInfo.accountId
        ).relation
      }
    })
  },
  beforeDestroy() {
    this.uninstallRelationWatch()
  },
  methods: {
    t,
    async handleSearch(event) {
      try {
        const user = await uni.$UIKitStore.userStore.getUserActive(
          event.detail.value
        )

        if (!user) {
          this.searchResState = 'searchEmpty'
        } else {
          this.userInfo = toRenderSafeData(user)
          this.relation = uni.$UIKitStore.uiStore.getRelation(
            user.accountId
          ).relation
          this.searchResState = 'searchResult'
        }
      } catch (error) {
        this.searchResState = 'searchEmpty'
        uni.showToast({
          title: t('searchFailText'),
          icon: 'error',
        })
      }
    },
    async applyFriend() {
      const account = this.userInfo && this.userInfo.accountId
      if (account) {
        try {
          await uni.$UIKitStore.friendStore.addFriendActive(account, {
            addMode: V2NIMConst.V2NIMFriendAddMode.V2NIM_FRIEND_MODE_TYPE_APPLY,
            postscript: '',
          })

          await uni.$UIKitStore.relationStore.removeUserFromBlockListActive(
            account
          )
          uni.showToast({
            title: t('applyFriendSuccessText'),
            icon: 'none',
          })
        } catch (error) {
          uni.showToast({
            title: t('applyFriendFailText'),
            icon: 'error',
          })
        }
      }
    },
    async gotoChat() {
      const to = this.userInfo && this.userInfo.accountId
      if (to) {
        try {
          const conversationId =
            uni.$UIKitNIM.V2NIMConversationIdUtil.p2pConversationId(to)
          await uni.$UIKitStore.uiStore.selectConversation(conversationId)
          customRedirectTo({
            url: `/pages/Chat/index?conversationId=${encodeURIComponent(
              conversationId
            )}`,
          })
        } catch (error) {
          uni.showToast({
            title: t('gotoChatFailText'),
            icon: 'error',
          })
        }
      }
    },
    onInputValueChange(event) {
      if (event.detail.value === '') {
        this.searchResState = 'beginSearch'
        this.userInfo = null
        this.relation = 'stranger'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.search-input-wrapper {
  display: flex;
  align-items: center;
  background-color: #f2f4f5;
  box-sizing: border-box;
  margin: 10px;
  padding: 3px;
  border-radius: 3px;

  .search-icon {
    color: #a6adb6;
    font-family: iconfont;
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    font-size: 20px;
    padding-left: 10px;
    padding-bottom: 5px;
    display: inline-block;
  }

  .search-input {
    display: inline-block;
    background-color: #f2f4f5;
    width: 85%;
    padding: 4px;
  }

  .placeholder {
    color: #a6adb6;
  }
}

.user-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 10px;
  box-sizing: border-box;

  .user-avatar {
    flex: 0 0 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-block;
  }

  .user-info {
    flex: 1;
    margin-left: 15px;
    overflow: hidden;

    .user-nick {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .user-id {
      width: 100%;
      font-size: 14px;
      color: #b5b6b8;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .go-chat-button {
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    margin: 5px;
    flex: 0 0 70px;
  }
}
</style>
