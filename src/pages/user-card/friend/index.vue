<template>
  <div class="wrapper">
    <NavBar :title="$t('FriendPageText')">
      <template v-slot:left>
        <Icon @click="back" type="icon-zuojiantou"></Icon> 
      </template>
    </NavBar>
    <UserCard :account="userInfo?.account" :nick="userInfo?.nick"></UserCard>
    <div class="userInfo-item-wrapper">
      <div class="userInfo-item">
        <div class="item-left">{{ $t('genderText') }}</div>
        <div class="item-right">{{ userInfo?.gender === "unknown" ? $t('unknow') : userInfo?.gender === 'male' ? $t('man') : $t('woman')}}</div>
      </div>
      <div class="box-shadow"></div>
      <div class="userInfo-item">
        <div class="item-left">{{ $t('birthText') }}</div>
        <div class="item-right">{{ userInfo?.birth || $t('unknow') }}</div>
      </div>
      <div class="box-shadow"></div>
      <div class="userInfo-item">
        <div class="item-left">{{ $t('tel') }}</div>
        <div class="item-right">{{ userInfo?.tel || $t('unknow') }}</div>
      </div>
      <div class="box-shadow"></div>
      <div class="userInfo-item">
        <div class="item-left">{{ $t('email') }}</div>
        <div class="item-right">{{ userInfo?.email || $t('unknow') }}</div>
      </div>
    </div>
    <div class="signature-wrapper">
      <div class="signature-left">{{ $t('signature') }}</div>
      <div class="signature-right">{{ userInfo?.signature || $t('unknow') }}</div>
    </div>
    <div class="button" @click="gotoChat">{{ $t('chatWithFriendText') }}</div>
  </div>
</template>
   
<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import UserCard from '../../../components/UserCard.vue';
import { ref } from 'vue';
import NavBar from '../../../components/NavBar.vue';
import Icon from '../../../components/Icon.vue';
import { autorun } from 'mobx';
const props = defineProps<{
  account: string
}>()
const userInfo = ref()
const store = uni.$UIKitStore

onLoad(() => {
  store.userStore.getUserForceActive(props.account)
})

autorun(async () => {
  userInfo.value = await store.userStore.getUserActive(props.account)
})

const gotoChat = async () => {
  await store.uiStore.selectSession('p2p-'+ userInfo.value.account)
  uni.navigateTo({ url: '/pages/Chat/index' })
}
const back = () => {
  uni.navigateBack({
		delta: 1
	})
}

</script>
  
<style lang="scss" scoped>
@import "../../styles/common.scss";

page {
  height: 100%;
  overflow: hidden;
}

.wrapper {
  background-color: rgb(245, 246, 247);;
  height: 100%;
  padding-bottom: 50px;
  .userInfo-item-wrapper {
    background-color: #fff;
    margin-top: 20px;

    .userInfo-item {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      padding: 0 25px;

      .item-left {
        font-size: 16px;
      }

      .item-right {
        font-size: 15px;
        width: 200px;
        text-align: right;
        color: #A6ADB6;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .box-shadow {
      height: 1px;
      background: none;
      padding: 0 25px;
      box-shadow: 0 0.5px 0 rgb(247, 244, 244);
    }
  }
  .signature-wrapper{
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      padding: 0 25px;
      margin-top: 30px;
      background-color: #fff;
      margin-top: 20px;
      .signature-right {
        width: 200px;
        font-size: 15px;
        color: #A6ADB6;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .signature-left {
        font-size: 16px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 200px;
      }
    }
    
  .button {
    margin-top: 150px;
    display: block;
    width: 100%;
    background-color: #fff;
    color: rgb(25, 146, 239);
    text-align: center;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
  }
}
</style>
  