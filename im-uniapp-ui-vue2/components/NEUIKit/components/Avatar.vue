<template>
  <div
    class="avatar"
    :style="{ width: avatarSize + 'px', height: avatarSize + 'px' }"
    @click="handleAvatarClick"
    @longpress="longpress"
    @touchend="touchend"
  >
    <!-- 使用遮罩层避免android长按头像会出现保存图片的弹窗 -->
    <div class="img-mask"></div>
    <image
      :lazy-load="true"
      class="avatar-img"
      v-if="avatarUrl"
      :src="avatarUrl"
      mode="aspectFill"
    />
    <div class="avatar-name-wrapper" :style="{ backgroundColor: color }">
      <div class="avatar-name-text" :style="{ fontSize: fontSize + 'px' }">
        {{ appellation }}
      </div>
    </div>
  </div>
</template>

<script>
import { customNavigateTo, customRedirectTo } from '../utils/customNavigate'
import { autorun } from "../utils/store.js"

function getAvatarColor(account) {
  const key = `__yx_avatar_color_${account || ''}__`
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
    const nextColor = colorMap[Math.floor(Math.random() * 7)]
    uni.setStorageSync(key, nextColor)
    color = nextColor
  }

  return color
}

export default {
  props: {
    account: {
      type: null,
      default: '',
    },
    teamId: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number],
      default: '',
    },
    gotoUserCard: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: [String, Number],
      default: '',
    },
    isRedirect: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      userAvatar: '',
      isLongPress: false,
      appellation: '',
      color: getAvatarColor(this.normalizedAccount),
      uninstallAppellationWatch: function () {},
      uninstallUserInfoWatch: function () {},
    }
  },
  computed: {
    avatarSize() {
      return this.size || 42
    },
    avatarUrl() {
      return this.avatar || this.userAvatar || ''
    },
    normalizedAccount() {
      return this.account || ''
    },
  },
  created() {
    this.initAvatarWatchers()
  },
  watch: {
    account() {
      this.initAvatarWatchers()
    },
  },
  beforeDestroy() {
    this.disposeAvatarWatchers()
  },
  methods: {
    initAvatarWatchers() {
      const account = this.normalizedAccount

      this.disposeAvatarWatchers()
      this.resetAvatarState()
      if (!account) {
        return
      }

      this.watchAppellation(account)
      this.watchUserAvatar(account)
      this.fetchUserInfo(account)
    },
    watchAppellation(account) {
      this.uninstallAppellationWatch = autorun(() => {
        const text = uni.$UIKitStore.uiStore.getAppellation({
          account,
          ignoreAlias: false,
        })
        this.appellation = text ? text.slice(0, 2) : ''
      })
    },
    watchUserAvatar(account) {
      // Vue2 不会追踪 MobX Map 在 computed 里的变化，必须同步到 data 才能触发视图更新。
      this.uninstallUserInfoWatch = autorun(() => {
        const user = uni.$UIKitStore?.userStore?.users?.get(account)
        this.userAvatar = (user && user.avatar) || ''
      })
    },
    fetchUserInfo(account) {
      // getUserActive 会补齐本地没有的用户资料；后续资料变化仍由上面的 autorun 接管。
      const userInfoPromise = uni.$UIKitStore?.userStore?.getUserActive(account)
      if (userInfoPromise && typeof userInfoPromise.then === 'function') {
        userInfoPromise.then((data) => {
          if (this.account === account) {
            this.userAvatar = data?.avatar || ''
          }
        })
      }
    },
    disposeAvatarWatchers() {
      this.uninstallUserInfoWatch()
      this.uninstallAppellationWatch()
      this.uninstallUserInfoWatch = function () {}
      this.uninstallAppellationWatch = function () {}
    },
    resetAvatarState() {
      this.userAvatar = ''
      this.appellation = ''
      this.color = getAvatarColor(this.normalizedAccount)
    },
    handleAvatarClick() {
      const account = this.normalizedAccount
      if (!account) {
        return
      }

      if (this.gotoUserCard && !this.isLongPress) {
        const isSelf = account === uni.$UIKitStore?.userStore?.myUserInfo.accountId
        const url = isSelf
          ? '/pages/User/my-detail/index'
          : `/pages/User/friend/index?account=${account}`

        if (this.isRedirect) {
          customRedirectTo({ url })
        } else {
          customNavigateTo({ url })
        }
      }
    },
    longpress() {
      this.isLongPress = true
      this.$emit('onLongpress')
    },
    touchend() {
      const timeOut = setTimeout(() => {
        this.isLongPress = false
        clearTimeout(timeOut)
      }, 200)
    },
  },
}
</script>

<style scoped lang="scss">
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
