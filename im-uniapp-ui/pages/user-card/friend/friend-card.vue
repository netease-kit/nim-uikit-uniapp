<template>
  <div class="user-wrapper">
    <div class="avatar-wrapper">
      <!-- <Avatar v-if="props.account" size="70" :account="props.account"></Avatar> -->
      <div
        class="avatar"
        :style="{ width: avatarSize + 'px', height: avatarSize + 'px' }"
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
        {{ t('accountText') }}:{{ props.account }}
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

<script lang="ts" setup>
import Icon from '../../../components/Icon.vue'
import { onUnmounted, defineProps, withDefaults, ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { autorun } from 'mobx'
import { t } from '../../../utils/i18n'
import { V2NIMUser } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMUserService'

const props = withDefaults(
  defineProps<{
    account?: string
    nick?: string
  }>(),
  {
    account: '',
    nick: '',
  }
)
const alias = ref<string>()
let friendsWatch = () => {}

onLoad((props) => {
  let account = props ? props.account : ''
  friendsWatch = autorun(() => {
    const friend = { ...uni.$UIKitStore.friendStore.friends.get(account) }
    alias.value = friend ? friend.alias : ''
  })
})

const $emit = defineEmits(['onLongpress'])

const avatarSize = 70
const user = ref<V2NIMUser>()
const appellation = ref<string>('')

const userInfoWatch = autorun(async () => {
  uni.$UIKitStore?.userStore?.getUserActive(props.account).then((data) => {
    user.value = data
  })
})

const appellationWatch = autorun(() => {
  appellation.value = uni.$UIKitStore.uiStore
    .getAppellation({
      account: props.account,
      ignoreAlias: false,
    })
    ?.slice(0, 2)
})

const avatarUrl = computed(() => {
  user.value = uni.$UIKitStore?.userStore?.users?.get(props.account)
  return user.value?.avatar
})

const key = `__yx_avatar_color_${props.account}__`
let color = uni.getStorageSync(key)
if (!color) {
  const colorMap: { [key: number]: string } = {
    0: '#60CFA7',
    1: '#53C3F3',
    2: '#537FF4',
    3: '#854FE2',
    4: '#BE65D9',
    5: '#E9749D',
    6: '#F9B751',
  }
  const _color = colorMap[Math.floor(Math.random() * 7)]
  uni.setStorageSync(key, _color)
  color = _color
}

onUnmounted(() => {
  friendsWatch()
  userInfoWatch()
  appellationWatch()
})

const copyAccount = () => {
  uni.setClipboardData({
    data: props.account,
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
