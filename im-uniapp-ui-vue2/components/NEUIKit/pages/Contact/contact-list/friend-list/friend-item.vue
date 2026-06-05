<template>
  <div class="friend-item-container">
    <div class="friend-avatar" @click="handleClick">
      <Avatar :account="friend.accountId" />
      <div class="login-state-icon" v-if="loginStateVisible && isOnline"></div>
      <div
        class="unlogin-state-icon"
        v-if="loginStateVisible && !isOnline"
      ></div>
    </div>
    <div class="friend-name">{{ friend.appellation }}</div>
  </div>
</template>

<script>
/** 好友列表组件 */
import Avatar from '../../../../components/Avatar.vue'
import { autorun } from "../../../../utils/store.js"
import { V2NIMConst } from '../../../../utils/nim'

export default {
  components: {
    Avatar,
  },
  props: {
    friend: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      V2NIMConst,
      isOnline: false,
      loginStateVisible: uni.$UIKitStore.localOptions.loginStateVisible,
      statusWatch: function () {},
    }
  },
  created() {
    this.statusWatch = autorun(() => {
      const stateMap = uni.$UIKitStore?.subscriptionStore?.stateMap
      if (uni.$UIKitStore.localOptions.loginStateVisible) {
        this.isOnline =
          stateMap.get(this.friend.accountId)?.statusType ===
          V2NIMConst.V2NIMUserStatusType.V2NIM_USER_STATUS_TYPE_LOGIN
      }
    })
  },
  beforeDestroy() {
    this.statusWatch()
  },
  methods: {
    handleClick() {
      this.$emit('click')
    },
  },
}
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
