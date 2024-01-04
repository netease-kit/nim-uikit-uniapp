<template>
  <div>
    <NavBar :title="t('addFriendText')" />
    <div class="search-input-wrapper">
      <Icon iconClassName="search-icon" :size="20" color="#A6ADB6" type="icon-sousuo"></Icon>
      <input class="search-input" type="text" @input="onInputValueChange" @confirm="handleSearch"
        placeholder-class="placeholder" confirm-type="search" :placeholder="t('enterAccount')" />
    </div>
    <Empty :text="t('noExistUser')" v-if="searchResState == 'searchEmpty'"></Empty>
    <div class="user-wrapper" v-else-if="searchResState === 'searchResult'">
      <Avatar class="user-avatar" :account="userInfo.account || ''" />
      <div class="user-info">
        <div class="user-nick">{{ userInfo.nick || userInfo.account }}</div>
        <div class="user-id">{{ userInfo.account }}</div>
      </div>
      <button v-if="relation !== 'stranger'" class="go-chat-button" type='primary' @click="gotoChat">{{
        t('chatButtonText') }}</button>
      <button v-else class="go-chat-button" type='primary' @click="applyFriend">{{ t('addText')
      }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '../../../utils/transformVue'
import Avatar from '../../../components/Avatar.vue';
import NavBar from '../../../components/NavBar.vue';
import Icon from '../../../components/Icon.vue';
import Empty from '../../../components/Empty.vue';
import { t } from '../../../utils/i18n'
import { customRedirectTo } from '../../../utils/customNavigate';
import type { Relation, UserNameCard } from '@xkit-yx/im-store';
import { autorun } from 'mobx';
import { deepClone } from '../../../utils'

const searchResState = ref<"beginSearch" | "searchEmpty" | "searchResult">('beginSearch')
const userInfo = ref({})
const relation = ref<Relation>('stranger')

autorun(() => {
  // 这行打印用于触发 autorun 执行，不能删除
  console.log('friends: ', uni.$UIKitStore.uiStore.friends)
  if (userInfo.value.account) {
    relation.value = uni.$UIKitStore.uiStore
      .getRelation(
        userInfo.value.account,
      ).relation
  }
})

const handleSearch = async (event) => {
  try {
    const user = deepClone(await uni.$UIKitStore.userStore.getUserActive(event.detail.value))
    if (!user) {
      searchResState.value = 'searchEmpty'
    } else {
      userInfo.value = user
      relation.value = uni.$UIKitStore.uiStore
        .getRelation(
          user.account,
        ).relation
      searchResState.value = 'searchResult'
    }
  } catch (error) {
    searchResState.value = 'searchEmpty'
    uni.showToast({
      title: t('searchFailText'),
      icon: 'error'
    })
  }
}

const applyFriend = async () => {
  const account = userInfo.value.account
  if (account) {
    try {
      await uni.$UIKitStore.friendStore.applyFriendActive(account)
      // 发送申请成功后解除黑名单
      await uni.$UIKitStore.relationStore.setBlackActive({ account, isAdd: false })
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
}

const gotoChat = async () => {
  const sessionId = userInfo.value.account
  if (sessionId) {
    try {
      await uni.$UIKitStore.uiStore.selectSession('p2p-' + sessionId)
      customRedirectTo({
        url: '/pages/Chat/index'
      })
    } catch (error) {
      uni.showToast({
        title: t('gotoChatFailText'),
        icon: 'error'
      })
    }
  }
}

const onInputValueChange = (event) => {
  //删除搜索内容,页面回到最原始状态，搜索结果都清空
  if (event.detail.value === '') {
    searchResState.value = "beginSearch"
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";

.search-input-wrapper {
  display: flex;
  align-items: center;
  background-color: #F2F4F5;
  box-sizing: border-box;
  margin: 10px;
  padding: 3px;
  border-radius: 3px;

  .search-icon {
    color: #A6ADB6;
    font-family: iconfont;
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    font-size: 20px;
    padding-left: 10px;
    padding-bottom: 5px;
    display: inline-block;
  }

  .search-input {
    display: inline-block;
    background-color: #F2F4F5;
    width: 85%;
    padding: 4px;
  }

  .placeholder {
    color: #A6ADB6;
  }
}

.user-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 10px;
  box-sizing: border-box;

  .user-avatar {
    flex: 0 0 40px;
    height: 40px;
    border-radius: 50%;
    display: inline-block;
  }

  .user-info {
    flex: 1;
    margin-left: 15px;
    overflow: hidden;

    .user-nick {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .user-id {
      width: 100%;
      font-size: 14px;
      color: #b5b6b8;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .go-chat-button {
    height: 30px;
    font-size: 14px;
    line-height: 30px;
    margin: 5px;
    flex: 0 0 70px;
  }
}
</style>
