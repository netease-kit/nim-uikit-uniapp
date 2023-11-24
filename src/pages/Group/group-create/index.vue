<template>
  <NavBar :title="$t('createTeamText')" />
  <FriendSelect :friendList="friendList" @checkboxChange="checkboxChange" :showBtn="true"
    :btnText="$t('createButtonText') + '(' + groupMembers.length + ')'" :onBtnClick="createGroup"></FriendSelect>
</template>

<script lang="ts" setup>
import FriendSelect, { type FriendSelectItem } from '../../../components/FriendSelect.vue';
import { computed, ref } from 'vue'
import NavBar from '../../../components/NavBar.vue';
import { t } from '../../../utils/i18n';
import { onLoad } from '@dcloudio/uni-app';
import { customRedirectTo } from '../../../utils/customNavigate';

const friendList = ref<FriendSelectItem[]>([])
const store = uni.$UIKitStore

const groupMembers = computed(() => {
  return friendList.value.filter(item => item.checked).map(item => item.account)
})

onLoad((options) => {
  const defaultCheckedAccount = options?.account
  const list = store.uiStore.friendsWithoutBlacklist.map(item => {
    return {
      ...item,
      nick: store.uiStore.getAppellation({ account: item.account }),
      checked: defaultCheckedAccount === item.account
    }
  })
  friendList.value = list
})

const checkboxChange = (selectList: string[]) => {
  friendList.value = friendList.value.map(item => {
    return {
      ...item,
      checked: selectList.includes(item.account)
    }
  })
  if (selectList.length >= 200) {
    uni.showToast({
      title: t('maxSelectedText'),
      icon: "none"
    })
    return
  }
}

const createGroupName = (groupMembers: string[]) => {
  const _memberNickArr: string[] = []
  groupMembers.map(item => {
    _memberNickArr.push(store.uiStore.getAppellation({ account: item }))
  })
  const _ownerName = store.userStore.myUserInfo.nick || store.userStore.myUserInfo.account
  const _groupName = (_ownerName + '、' + _memberNickArr.join('、')).slice(0, 15)
  return _groupName
}

const createTeamAvatar = () => {
  const teamAvatarArr = [
    'https://yx-web-nosdn.netease.im/common/2425b4cc058e5788867d63c322feb7ac/groupAvatar1.png',
    'https://yx-web-nosdn.netease.im/common/62c45692c9771ab388d43fea1c9d2758/groupAvatar2.png',
    'https://yx-web-nosdn.netease.im/common/d1ed3c21d3f87a41568d17197760e663/groupAvatar3.png',
    'https://yx-web-nosdn.netease.im/common/e677d8551deb96723af2b40b821c766a/groupAvatar4.png',
    'https://yx-web-nosdn.netease.im/common/fd6c75bb6abca9c810d1292e66d5d87e/groupAvatar5.png',
  ]
  const _index = Math.floor(Math.random() * 5)
  return teamAvatarArr[_index]
}

let flag = false

const createGroup = async () => {
  try {
    if (flag) return
    if (groupMembers.value.length == 0) {
      uni.showToast({
        title: t('friendSelect'),
        icon: "none"
      })
      return
    }

    if (groupMembers.value.length > 200) {
      uni.showToast({
        title: t('maxSelectedText'),
        icon: "none"
      })
      return
    }
    flag = true
    await store.teamStore.createTeamActive({
      accounts: [...groupMembers.value],
      avatar: createTeamAvatar(),
      name: createGroupName(groupMembers.value)
    })
    customRedirectTo({
      url: '/pages/Chat/index'
    })
    uni.showToast({
      title: t('createTeamSuccessText'),
      icon: "success"
    })
  } catch (error) {
    uni.showToast({
      title: t('createTeamFailedText'),
      icon: "error"
    })
  } finally {
    flag = false
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";

.create-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.select-wrapper {
  // height: calc(100vh - var(--status-bar-height) - 42px);
  flex: 1;
}

.create-btn {
  color: #fff;
  background-color: rgb(20, 146, 209);
  padding: 10px;
  font-size: 16px;
  text-align: center;
}

.group-input-wrapper {
  display: flex;
  align-items: center;

  .group-input {
    margin: 10px;
    background-color: #F2F4F5;
    padding: 4px;
    border-radius: 5px;
    flex: 1;
  }

  .button {
    width: 65px;
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    margin-right: 5px;
    padding: 0;
    color: #5c9bed;
  }
}

.placeholder {
  color: #A6ADB6;
}
</style>
