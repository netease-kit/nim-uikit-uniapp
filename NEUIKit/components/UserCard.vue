<template>
  <div class="user-wrapper">
    <div class="avatar-wrapper">
      <Avatar v-if="props.account" size="70" :account="props.account"></Avatar>
    </div>
    <div class="account-wrapper">
      <div class="nick">{{ nick || account }}</div>
      <div class="account">
        {{ props.account }}
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
import { defineProps, withDefaults } from '../utils/transformVue'

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

    .nick {
      font-size: 20px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: 500;
    }

    .account {
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
