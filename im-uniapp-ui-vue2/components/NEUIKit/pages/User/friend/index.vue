<template>
  <div class="wrapper">
    <NavBar :title="t('FriendPageText')" />
    <UserCard
      :account="userInfo && userInfo.accountId"
      :nick="userInfo && userInfo.name"
    ></UserCard>
    <template v-if="relation === 'stranger'">
      <div class="userInfo-item-wrapper">
        <div class="userInfo-item">
          <div class="item-left">{{ t('addBlacklist') }}</div>
          <switch :checked="isInBlacklist" @change="handleSwitchChange" />
        </div>
      </div>

      <div class="button" :style="{ marginTop: '10px' }" @click="addFriend">
        {{ t('addFriendText') }}
      </div>
    </template>
    <template v-else>
      <div class="userInfo-item-wrapper">
        <div class="userInfo-item" @tap="handleAliasClick">
          <div class="item-left">{{ t('remarkText') }}</div>
          <div class="item-right">
            {{ userInfo && userInfo.alias }}
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </div>
        <div class="userInfo-item">
          <div class="item-left">{{ t('genderText') }}</div>
          <div class="item-right">
            {{
              userInfo && userInfo.gender === 0
                ? t('unknow')
                : userInfo && userInfo.gender === 1
                ? t('man')
                : t('woman')
            }}
          </div>
        </div>
        <div class="box-shadow"></div>
        <div class="userInfo-item">
          <div class="item-left">{{ t('birthText') }}</div>
          <div class="item-right">
            {{ (userInfo && userInfo.birthday) || t('unknow') }}
          </div>
        </div>
        <div class="box-shadow"></div>
        <div class="userInfo-item">
          <div class="item-left">{{ t('mobile') }}</div>
          <div class="item-right">
            {{ (userInfo && userInfo.mobile) || t('unknow') }}
          </div>
        </div>
        <div class="box-shadow"></div>
        <div class="userInfo-item">
          <div class="item-left">{{ t('email') }}</div>
          <div class="item-right">
            {{ (userInfo && userInfo.email) || t('unknow') }}
          </div>
        </div>
        <div class="userInfo-item">
          <div class="item-left">{{ t('sign') }}</div>
          <div class="item-right">
            {{ (userInfo && userInfo.sign) || t('unknow') }}
          </div>
        </div>
      </div>
      <div class="userInfo-item-wrapper">
        <div class="userInfo-item">
          <div class="item-left">{{ t('addBlacklist') }}</div>
          <switch :checked="isInBlacklist" @change="handleSwitchChange" />
        </div>
      </div>
      <div class="button" @click="gotoChat">{{ t('chatWithFriendText') }}</div>
      <div class="box-shadow"></div>
      <div class="button button-red" @click="deleteFriend">
        {{ t('deleteFriendText') }}
      </div>
    </template>
  </div>
</template>

<script>
import UserCard from '../../../components/UserCard.vue'
import { t } from '../../../utils/i18n'
import NavBar from '../../../components/NavBar.vue'
import { autorun } from "../../../utils/store.js"
import {
  customRedirectTo,
  customNavigateTo,
} from '../../../utils/customNavigate'
import { V2NIMConst } from '../../../utils/nim'
import Icon from '../../../components/Icon.vue'
import { toRenderSafeData } from '../../../utils'

export default {
  components: {
    UserCard,
    NavBar,
    Icon,
  },
  data() {
    return {
      V2NIMConst,
      enableV2CloudConversation:
        uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation,
      userInfo: null,
      relation: 'stranger',
      isInBlacklist: false,
      account: '',
      friendWatch: function () {},
      relationWatch: function () {},
    }
  },
  onLoad(options) {
    this.account = options ? options.account || '' : ''
    uni.$UIKitStore.userStore.getUserListFromCloudActive([this.account])

    this.friendWatch = autorun(() => {
      this.userInfo = toRenderSafeData(
        uni.$UIKitStore.uiStore.getFriendWithUserNameCard(this.account)
      )
    })

    this.relationWatch = autorun(() => {
      const relationInfo = uni.$UIKitStore.uiStore.getRelation(this.account)
      this.relation = relationInfo.relation
      this.isInBlacklist = relationInfo.isInBlacklist
    })
  },
  beforeDestroy() {
    this.friendWatch()
    this.relationWatch()
  },
  methods: {
    t,
    handleAliasClick() {
      customNavigateTo({
        url: `/pages/User/friend/friend-edit?id=${this.account}`,
      })
    },
    async handleSwitchChange(e) {
      const isAdd = e.detail.value
      try {
        if (isAdd) {
          await uni.$UIKitStore.relationStore.addUserToBlockListActive(
            this.account
          )
        } else {
          await uni.$UIKitStore.relationStore.removeUserFromBlockListActive(
            this.account
          )
        }
      } catch (error) {
        uni.showToast({
          title: isAdd ? t('setBlackFailText') : t('removeBlackFailText'),
          icon: 'error',
        })
      }
    },
    deleteFriend() {
      uni.showModal({
        title: t('deleteFriendText'),
        content:
          t('deleteFriendConfirmText') +
          '“' +
          uni.$UIKitStore.uiStore.getAppellation({ account: this.account }) +
          '”?',
        success: (res) => {
          if (res.confirm) {
            uni.$UIKitStore.friendStore
              .deleteFriendActive(this.account)
              .then(() => {
                uni.showToast({
                  title: t('deleteFriendSuccessText'),
                  icon: 'none',
                })
              })
              .then(() => {
                const conversationId =
                  uni.$UIKitNIM.V2NIMConversationIdUtil.p2pConversationId(
                    this.account
                  )
                if (this.enableV2CloudConversation) {
                  return uni.$UIKitStore.conversationStore?.deleteConversationActive(
                    conversationId
                  )
                }
                return uni.$UIKitStore.localConversationStore?.deleteConversationActive(
                  conversationId
                )
              })
              .catch(() => {
                uni.showToast({
                  title: t('deleteFriendFailText'),
                  icon: 'error',
                })
              })
          }
        },
      })
    },
    async addFriend() {
      try {
        await uni.$UIKitStore.friendStore.addFriendActive(this.account, {
          addMode: V2NIMConst.V2NIMFriendAddMode.V2NIM_FRIEND_MODE_TYPE_APPLY,
          postscript: '',
        })

        await uni.$UIKitStore.relationStore.removeUserFromBlockListActive(
          this.account
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
    },
    async gotoChat() {
      const conversationId = uni.$UIKitNIM.V2NIMConversationIdUtil.p2pConversationId(
        (this.userInfo && this.userInfo.accountId) || ''
      )
      await uni.$UIKitStore.uiStore.selectConversation(conversationId)
      customRedirectTo({
        url: `/pages/Chat/index?conversationId=${encodeURIComponent(
          conversationId
        )}`,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.wrapper {
  background-color: rgb(245, 246, 247);
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 50px;

  .userInfo-item-wrapper {
    background-color: #fff;
    margin-top: 10px;
    padding-left: 20px;
  }

  .userInfo-item {
    height: 48px;
    line-height: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding-right: 20px;
    box-sizing: border-box;

    .item-left {
      color: #222222;
    }

    .item-right {
      color: #999999;
      display: flex;
      align-items: center;
      max-width: 65%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .more-icon {
      margin-left: 8px;
    }
  }

  .box-shadow {
    box-shadow: inset 0 -0.5px 0 #ebedf0;
  }

  .button {
    width: calc(100% - 40px);
    margin: 20px auto 0;
    background: #337eff;
    border-radius: 8px;
    color: #fff;
    text-align: center;
    line-height: 44px;
    height: 44px;
  }

  .button-red {
    background: #fff;
    color: #ff4d4f;
  }
}
</style>
