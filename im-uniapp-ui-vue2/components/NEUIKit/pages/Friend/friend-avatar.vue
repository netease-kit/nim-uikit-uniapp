<template>
  <view
    class="avatar"
    :style="{ width: avatarSize + 'px', height: avatarSize + 'px' }"
    @click="handleAvatarClick"
    @longpress="longpress"
    @touchend="touchend"
  >
    <!-- 使用遮罩层避免android长按头像会出现保存图片的弹窗 -->
    <view class="img-mask"></view>
    <image
      :lazy-load="true"
      class="avatar-img"
      v-if="avatarUrl"
      :src="avatarUrl"
      mode="aspectFill"
    />
    <view class="avatar-name-wrapper" :style="{ backgroundColor: color }">
      <view class="avatar-name-text" :style="{ fontSize: fontSize + 'px' }">
        <Appellation
          :account="account"
          :team-id="teamId"
          :ignore-alias="false"
          color="#fff"
        ></Appellation>
      </view>
    </view>
  </view>
</template>

<script>
import { customNavigateTo, customRedirectTo } from '../utils/customNavigate'
import { autorun } from "../utils/store.js"
import Appellation from './Appellation.vue'

export default {
  components: {
    Appellation,
  },
  props: {
    account: {
      type: String,
      required: true,
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
      const nextColor = colorMap[Math.floor(Math.random() * 7)]
      uni.setStorageSync(key, nextColor)
      color = nextColor
    }

    return {
      userAvatar: '',
      isLongPress: false,
      color,
      uninstallUserInfoWatch: function () {},
    }
  },
  computed: {
    avatarSize() {
      return this.size || 42
    },
    avatarUrl() {
      const storeUser = uni.$UIKitStore?.userStore?.users?.get(this.account)
      return this.avatar || (storeUser && storeUser.avatar) || this.userAvatar || ''
    },
  },
  created() {
    this.uninstallUserInfoWatch = autorun(() => {
      uni.$UIKitStore?.userStore?.getUserActive(this.account).then((data) => {
        this.userAvatar = data?.avatar || ''
      })
    })
  },
  beforeDestroy() {
    this.uninstallUserInfoWatch()
  },
  methods: {
    handleAvatarClick() {
      if (this.gotoUserCard && !this.isLongPress) {
        const isSelf = this.account === uni.$UIKitStore?.userStore?.myUserInfo.accountId
        const url = isSelf
          ? '/pages/User/my-detail/index'
          : `/pages/User/friend/index?account=${this.account}`

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
