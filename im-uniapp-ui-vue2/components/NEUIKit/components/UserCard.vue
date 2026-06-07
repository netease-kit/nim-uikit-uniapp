<template>
  <div class="user-wrapper">
    <div class="avatar-wrapper">
      <Avatar v-if="account" size="70" :account="account"></Avatar>
    </div>
    <div class="account-wrapper">
      <div v-if="alias">
        <div class="main">{{ alias }}</div>
        <div class="deputy">{{ t('name') }}:{{ nick || account }}</div>
      </div>
      <div v-else class="main">{{ nick || account }}</div>
      <div class="deputy">
        {{ t('accountText') }}:{{ account }}
        <div @tap.stop="copyAccount">
          <Icon
            class="copy-icon"
            type="icon-fuzhi1"
            color="#A6ADB6"
            :size="20"
          ></Icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'
import { autorun } from "../utils/store.js"
import { t } from '../utils/i18n'

export default {
  components: {
    Avatar,
    Icon,
  },
  props: {
    account: {
      type: String,
      default: '',
    },
    nick: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      alias: '',
      uninstallFriendsWatch: function () {},
    }
  },
  watch: {
    account() {
      this.setupFriendWatch()
    },
  },
  mounted() {
    this.setupFriendWatch()
  },
  beforeDestroy() {
    this.uninstallFriendsWatch()
  },
  methods: {
    t,
    setupFriendWatch() {
      this.uninstallFriendsWatch()
      if (!this.account) {
        this.alias = ''
        this.uninstallFriendsWatch = function () {}
        return
      }

      this.uninstallFriendsWatch = autorun(() => {
        const friend = uni.$UIKitStore?.friendStore?.friends?.get(this.account)
        this.alias = friend ? friend.alias : ''
      })
    },
    copyAccount() {
      uni.setClipboardData({
        data: this.account,
        showToast: false,
        success: () => {
          uni.showToast({
            title: t('copySuccessText'),
            icon: 'none',
          })
        },
        fail: () => {
          uni.showToast({
            title: t('copyFailText'),
            icon: 'none',
          })
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../pages/styles/common.scss';

.user-wrapper {
  background-color: #fff;
  display: flex;
  height: 140px;
  align-items: center;

  .avatar-wrapper {
    margin: 0 15px;
    flex: 0 0 70px;
  }

  .account-wrapper {
    flex: 1;
    overflow: hidden;
    padding-right: 40px;

    .main {
      font-size: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 500;
    }

    .deputy {
      font-size: 14px;
      display: flex;
      align-items: center;
    }

    .copy-icon {
      margin-left: 2px;
    }
  }
}
</style>
