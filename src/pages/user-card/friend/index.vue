<template>
  <div class="wrapper">
    <NavBar :title="$t('FriendPageText')" />
    <UserCard :account="userInfo?.account!" :nick="userInfo?.nick"></UserCard>
    <template v-if="relation === 'stranger'">
      <div class="userInfo-item-wrapper">
        <div class="userInfo-item">
          <div class="item-left">{{ $t('addBlacklist') }}</div>
          <switch :checked="isInBlacklist" @change="handleSwitchChange" />
        </div>
      </div>
      <div class="button" :style="{ marginTop: '10px' }" @click="addFriend">{{
        $t('addFriendText') }}</div>
    </template>
    <template v-else>
      <div class="userInfo-item-wrapper">
        <div class="userInfo-item">
          <div class="item-left">{{ $t('genderText') }}</div>
          <div class="item-right">{{ userInfo?.gender === "unknown" ? $t('unknow') : userInfo?.gender === 'male' ?
            $t('man')
            : $t('woman') }}</div>
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
        <div class="userInfo-item">
          <div class="item-left">{{ $t('signature') }}</div>
          <div class="item-right">{{ userInfo?.signature || $t('unknow') }}</div>
        </div>
      </div>
      <div class="userInfo-item-wrapper">
        <div class="userInfo-item">
          <div class="item-left">{{ $t('addBlacklist') }}</div>
          <switch :checked="isInBlacklist" @change="handleSwitchChange" />
        </div>
      </div>
      <div class="button" @click="gotoChat">{{ $t('chatWithFriendText') }}</div>
      <div class="box-shadow"></div>
      <div class="button button-red" @click="deleteFriend">{{ $t('deleteFriendText') }}</div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import UserCard from '../../../components/UserCard.vue';
import { ref } from 'vue';
import { t } from '../../../utils/i18n'
import NavBar from '../../../components/NavBar.vue';
import { autorun } from 'mobx';
import { customNavigateTo } from '../../../utils/customNavigate';
import type { IFriendInfo } from '@xkit-yx/core-kit/dist/types/nim-kit-core/types';
import type { Relation } from '@xkit-yx/im-store';
const props = defineProps<{
  account: string
}>()

const store = uni.$UIKitStore

const userInfo = ref<IFriendInfo>()
const relation = ref<Relation>('stranger')
const isInBlacklist = ref(false)

onLoad(() => {
  store.userStore.getUserForceActive(props.account)
})

autorun(() => {
  userInfo.value = store.uiStore.getFriendWithUserNameCard(props.account)
})

autorun(() => {
  const { relation: _relation, isInBlacklist: _isInBlacklist } = store.uiStore.getRelation(props.account)
  relation.value = _relation
  isInBlacklist.value = _isInBlacklist
})

const handleSwitchChange = async (e: any) => {
  const isAdd = e.detail.value
  try {
    await store.relationStore.setBlackActive({ account: props.account, isAdd })
  } catch (error) {
    uni.showToast({
      title: isAdd ? t('setBlackFailText') : t('removeBlackFailText'),
      icon: 'error'
    })
  }
}

const deleteFriend = () => {
  uni.showModal({
    title: t('deleteFriendText'),
    content: t('deleteFriendConfirmText') + '“' + store.uiStore.getAppellation({ account: props.account }) + '”?',
    success: (res) => {
      if (res.confirm) {
        store.friendStore.deleteFriendActive(props.account).then(() => {
          uni.showToast({
            title: t('deleteFriendSuccessText'),
            icon: 'success'
          })
        }).then(() => {
          return store.sessionStore.deleteSessionActive('p2p-' + props.account)
        }).catch(err => {
          uni.showToast({
            title: t('deleteFriendFailText'),
            icon: 'error'
          })
        })
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  })
}

const addFriend = async () => {
  try {
    await store.friendStore.applyFriendActive(props.account)
    // 发送申请成功后解除黑名单
    await store.relationStore.setBlackActive({ account: props.account, isAdd: false })
    uni.showToast({
      title: t('applyFriendSuccessText'),
      icon: 'success'
    })
  } catch (error) {
    uni.showToast({
      title: t('applyFriendFailText'),
      icon: 'error'
    })
  }
}

const gotoChat = async () => {
  await store.uiStore.selectSession('p2p-' + userInfo?.value?.account)
  customNavigateTo({
    url: '/pages/Chat/index'
  })
}

</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.wrapper {
  background-color: rgb(245, 246, 247);
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 50px;

  .userInfo-item-wrapper {
    background-color: #fff;
    margin: 10px 0;

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
  }

  .button {
    // margin-top: 150px;
    display: block;
    width: 100%;
    background-color: #fff;
    color: rgb(25, 146, 239);
    text-align: center;
    height: 50px;
    font-size: 16px;
    line-height: 50px;
  }

  .button-red {
    color: #E6605C;
  }

  .box-shadow {
    height: 1px;
    background: none;
    padding: 0 25px;
    box-shadow: 0 0.5px 0 rgb(247, 244, 244);
  }
}
</style>
