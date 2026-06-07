<template>
  <div class="user-wrapper">
    <div class="avatar-wrapper">
      <div
        class="avatar"
        :style="{ width: avatarSize + 'px', height: avatarSize + 'px' }"
      >
        <div class="img-mask"></div>
        <image
          :lazy-load="true"
          class="avatar-img"
          v-if="avatarUrl"
          :src="avatarUrl"
          mode="aspectFill"
        />
        <div class="avatar-name-wrapper" :style="{ backgroundColor: color }">
          <div class="avatar-name-text" :style="{ fontSize: 18 + 'px' }">
            {{ appellation }}
          </div>
        </div>
      </div>
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
import Icon from '../../../components/Icon.vue'
import { autorun } from "../../../utils/store.js"
import { t } from '../../../utils/i18n'

export default {
  components: {
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
      userAvatar: '',
      appellation: '',
      color: '',
      friendsWatch: function () {},
      userInfoWatch: function () {},
      appellationWatch: function () {},
    }
  },
  computed: {
    avatarSize() {
      return 70
    },
    avatarUrl() {
      const storeUser = uni.$UIKitStore?.userStore?.users?.get(this.account)
      return (storeUser && storeUser.avatar) || this.userAvatar || ''
    },
  },
  created() {
    this.setColor()
    this.setupWatches()
  },
  watch: {
    account() {
      this.setColor()
      this.setupWatches()
    },
  },
  beforeDestroy() {
    this.friendsWatch()
    this.userInfoWatch()
    this.appellationWatch()
  },
  methods: {
    t,
    setupWatches() {
      this.friendsWatch()
      this.userInfoWatch()
      this.appellationWatch()

      if (!this.account) {
        this.alias = ''
        this.userAvatar = ''
        this.appellation = ''
        this.friendsWatch = function () {}
        this.userInfoWatch = function () {}
        this.appellationWatch = function () {}
        return
      }

      this.friendsWatch = autorun(() => {
        const friend = uni.$UIKitStore.friendStore.friends.get(this.account)
        this.alias = friend ? friend.alias : ''
      })

      this.userInfoWatch = autorun(() => {
        uni.$UIKitStore?.userStore?.getUserActive(this.account).then((data) => {
          this.userAvatar = data?.avatar || ''
        })
      })

      this.appellationWatch = autorun(() => {
        const text = uni.$UIKitStore.uiStore.getAppellation({
          account: this.account,
          ignoreAlias: false,
        })
        this.appellation = text ? text.slice(0, 2) : ''
      })
    },
    setColor() {
      if (!this.account) {
        this.color = ''
        return
      }
      const key = `__yx_avatar_color_${this.account}__`
      let color = uni.getStorageSync(key)
      if (!color) {
        const colorMap = {
          0: '#60CFA7',
          1: '#53C3F3',
          2: '#537FF4',
          3: '#854FE2',
          4: '#BE65D9',
          5: '#E9749D',
          6: '#F9B751',
        }
        const newColor = colorMap[Math.floor(Math.random() * 7)]
        uni.setStorageSync(key, newColor)
        color = newColor
      }
      this.color = color
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
@import '../../styles/common.scss';

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
.avatar {
  overflow: hidden;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
}

.img-mask {
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.avatar-name-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-name-text {
  color: #fff;
  size: 14px;
}
</style>
