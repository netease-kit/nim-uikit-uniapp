<template>
  <div class="user-wrapper">
    <div class="avatar-wrapper">
      <Avatar v-if="props.account" size="70" :account="props.account"></Avatar>
    </div>
    <div class="account-wrapper">
      <div class="nick">{{ nick || account }}</div>
      <div class="account">
        {{ props.account }}
        <div @click.stop="copyAccount" class="copy-icon">
          <Icon type="icon-fuzhi1"></Icon>
        </div>
      </div>
    </div>
  </div>
</template>
     
<script lang="ts" setup>
import Avatar from './Avatar.vue'
import Icon from './Icon.vue'
import { defineProps } from 'vue'

const props = defineProps<{
  account: string
  nick?: string
}>()

const copyAccount = () => {
  uni.setClipboardData({
    data: props.account
  });
}

</script>
    
<style lang="scss" scoped>
@import "../pages/styles/common.scss";

.user-wrapper {
  background-color: #fff;
  display: flex;
  height: 140px;
  align-items: center;

  .avatar-wrapper {
    margin: 0 15px;
    flex: 0 0 70px;
  }
  .account-wrapper{
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
  }

  .copy-icon {
    color: #A6ADB6;
    font-family: iconfont;
    font-size: 20px;
    display: inline-block;
  }
  }
 
}
</style>
    