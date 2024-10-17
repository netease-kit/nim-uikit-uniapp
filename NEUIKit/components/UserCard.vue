<template>
  <div class="user-wrapper">
    <div class="avatar-wrapper">
      <Avatar v-if="props.account" size="70" :account="props.account"></Avatar>
    </div>
    <div class="account-wrapper">
      <div v-if="alias">
        <div class="main">{{ alias }}</div>
        <div class="deputy">昵称:{{ nick || account }}</div>
      </div>
      <div v-else class="main">{{ nick || account }}</div>
      <div class="deputy">
        账号:{{ props.account }}
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
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'
import {
  onUnmounted,
  defineProps,
  withDefaults,
  ref,
} from '../utils/transformVue'
import { onLoad } from '@dcloudio/uni-app'
import { autorun } from 'mobx'
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
let uninstallFriendsWatch = () => {}

onLoad((props) => {
  let account = props ? props.account : ''
  uninstallFriendsWatch = autorun(() => {
    const friend = { ...uni.$UIKitStore.friendStore.friends.get(account) }
    alias.value = friend ? friend.alias : ''
  })
})

onUnmounted(() => {
  uninstallFriendsWatch()
})

const copyAccount = () => {
  uni.setClipboardData({
    data: props.account,
  })
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
