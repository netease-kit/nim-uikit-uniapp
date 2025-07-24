<template>
  <div class="friend-item-container">
    <div class="friend-avatar" @click="handleClick">
      <Avatar :account="friend.accountId" />
      <!-- 用户在线离线状态 -->
      <div class="login-state-icon" v-if="loginStateVisible && isOnline"></div>
      <div
        class="unlogin-state-icon"
        v-if="loginStateVisible && !isOnline"
      ></div>
    </div>
    <div class="friend-name">{{ friend.appellation }}</div>
  </div>
</template>

<script lang="ts" setup>
/** 好友列表组件 */
import Avatar from '../../../../components/Avatar.vue'
import { autorun } from 'mobx'
import { onUnmounted, ref } from 'vue'
import { V2NIMConst } from '../../../../utils/nim'

const props = defineProps<{
  friend: {
    accountId: string
    appellation: string
    isOnline: boolean
  }
}>()

const emit = defineEmits(['click'])

const isOnline = ref<boolean>(false)

const handleClick = () => {
  emit('click')
}
/** 读取是否需要显示在线离线的全局配置，默认true*/
const loginStateVisible = uni.$UIKitStore.localOptions.loginStateVisible

/** 监听会话方在线离线状态 */
const statusWatch = autorun(() => {
  const stateMap = uni.$UIKitStore?.subscriptionStore.stateMap

  if (uni.$UIKitStore.localOptions.loginStateVisible) {
    isOnline.value =
      stateMap.get(props.friend.accountId)?.statusType ===
      V2NIMConst.V2NIMUserStatusType.V2NIM_USER_STATUS_TYPE_LOGIN
  }
})

onUnmounted(() => {
  statusWatch()
})
</script>

<style lang="scss" scoped>
@import '../../../styles/common.scss';

.friend-item-container {
  display: flex;
  align-items: center;
}

.friend-name {
  margin-left: 12px;
  padding-right: 20px;
  color: #333333;
  flex: 1;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}

.friend-avatar {
  position: relative;
  width: 42px;
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
