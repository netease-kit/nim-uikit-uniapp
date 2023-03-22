<template>
  <div class="card-wrapper" @click="navigatorToMydetail">
    <UserCard :account="myUserInfo.account" :nick="myUserInfo.nick"></UserCard>
    <Icon class="arrow" type="icon-jiantou"></Icon>
  </div>
  <div class="box-shadow"></div>
  <div class="userInfo-item-wrapper">
    <uni-link href="https://yunxin.163.com/" :showUnderLine="false" color="#000000">
      <div class="userInfo-item">
        <div class="item-left">
          <Icon class="guanyu" type="icon-guanyu"></Icon>
          {{ $t('commsEaseText') }}
        </div>
        <Icon class="icon-arrow" type="icon-jiantou"></Icon>
      </div>
    </uni-link>
    <div class="shadow"></div>
    <div class="userInfo-item" @click="gotoSetting">
      <div class="item-left">
        <Icon class="guanyu" type="icon-shezhi1"></Icon>
        {{ $t('setText') }}
      </div>
      <Icon class="icon-arrow" type="icon-jiantou"></Icon>
    </div>
  </div>
</template>
    
<script lang="ts" setup>
import { onLoad, onShow } from '@dcloudio/uni-app';
import UserCard from '../../../components/UserCard.vue';
import { ref } from 'vue';
import Icon from '../../../components/Icon.vue';
import UniLink from '../../../uni_modules/uni-link/components/uni-link/uni-link.vue';
import { autorun } from 'mobx';
import { setTabUnread } from '@/utils/msg';
const myUserInfo = ref()
autorun(() => {
  const store = uni.$UIKitStore
  myUserInfo.value = store.userStore.myUserInfo
})

onLoad(() => {
  const store = uni.$UIKitStore
  myUserInfo.value = store.userStore.myUserInfo
})

onShow(() => {
  setTabUnread()
})

const gotoSetting = () => {
  uni.navigateTo({
    url: '/pages/user-card/my/setting'
  })
}

const navigatorToMydetail = () => {
  console.log('myUserInfo.value.account', myUserInfo.value.account);
  uni.navigateTo({
    url: `/pages/user-card/my-detail/index?account=${myUserInfo.value.account}`
  })
}
</script>
   
<style lang="scss" scoped>
@import "../../styles/common.scss";
page {
  height: 100%;
  overflow: hidden;
}
.card-wrapper {
  background-color: rgb(255, 253, 253);
  padding-right: 10px;
  padding-top: var(--status-bar-height);
  .arrow{
    position: absolute;
    right: 10px;
    top: 12%;
  }
}

.box-shadow {
  height: 5px;
  background: none;
  box-shadow: 0 5px 0 rgb(245, 246, 247);
}

.avatar-wrapper {
  background-color: #fff;
  display: flex;
  height: 140px;
  align-items: center;

  .avatar {
    margin: 0 30px;
  }

  .nick {
    font-size: 20px;
  }

  .account {
    font-size: 14px;
    color: #A6ADB6;
  }

  .copy-icon {
    color: #A6ADB6;
    font-family: iconfont;
    background-size: 100% 100%;
    width: 60rpx;
    height: 60rpx;
    font-size: 40rpx;
    padding-left: 15rpx;
    display: inline-block;
  }
}

.userInfo-item-wrapper {
  background-color: #fff;
  margin-top: 8px;

  .userInfo-item {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 20px;

    .item-left {
      font-size: 16px;

      .guanyu {
        margin-right: 5px;
      }
    }
  }

  .shadow {
    height: 1px;
    background: none;
    box-shadow: 0 1px 0 rgb(245, 246, 247);
  }
}

.icon-arrow {
  font-size: 16px;
}</style>
  