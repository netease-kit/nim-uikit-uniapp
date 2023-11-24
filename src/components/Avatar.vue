<template>
  <div
    class="avatar"
    :style="{ width: size + 'px', height: size + 'px' }"
    @tap="handleAvatarClick"
    @longpress="longpress"
    @touchend="touchend"
  > 
    <!-- 使用遮罩层避免android长按头像会出现保存图片的弹窗 -->
    <div class="img-mask"></div>
    <image
      :lazy-load="true"
      class="avatar-img"
      v-if="avatar"
      :src="avatar"
      mode="aspectFill"
    />
    <div class="avatar-name-wrapper" v-else :style="{ backgroundColor: color }">
      <text
        class="avatar-name-text"
        :style="{ fontSize: fontSize + 'px' }"
        v-text="
          store.uiStore
            .getAppellation({
              account: props.account,
              teamId: props.teamId,
            })
            ?.slice(-2)
        "
      ></text>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { customNavigateTo } from '../utils/customNavigate'
import type { UserNameCard } from '@xkit-yx/im-store'
import { autorun } from 'mobx'
import { computed, defineProps, ref, onMounted } from 'vue'

const props = defineProps<{
  account: string
  teamId?: string
  avatar?: string
  size?: string
  gotoUserCard?: boolean
  fontSize?: string
}>()
const $emit = defineEmits(["longpress"]);

const size = props.size || 42
const store = uni.$UIKitStore
const user = ref<UserNameCard>()
let isLongPress = false // uniapp 长按事件也会触发点击事件，此时需要处理

autorun(async () => {
  const data = await store.userStore.getUserActive(props.account)
  user.value = data
})

const avatar = computed(() => {
  user.value = store.userStore.users.get(props.account)
  return props.avatar || user.value?.avatar
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

const handleAvatarClick = () => {
  if (props.gotoUserCard && !isLongPress) {
    if (props.account === store.userStore.myUserInfo.account) {
      customNavigateTo({
        url: `/pages/user-card/my-detail/index`,
      })
    } else {
      customNavigateTo({
        url: `/pages/user-card/friend/index?account=${props.account}`,
      })
    }
  }
}

const longpress = () => {
  isLongPress = true
  $emit("longpress");
}

const touchend = () => {
  setTimeout(() => {
    isLongPress = false
  }, 200)
}
</script>

<style scoped lang="scss">
.avatar {
  overflow: hidden;
  border-radius: 50%;
  flex-shrink: 0;
  position: relative;
}

.img-mask{
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
