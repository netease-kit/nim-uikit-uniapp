<template>
  <NavBar :title="$t('createTeamText')">
    <template v-slot:left>
      <Icon @click="back" type="icon-zuojiantou"></Icon>
    </template>
    <template v-slot:right>
      <div class="nav-bar-right" @click="createGroup">{{ $t('createButtonText') + '(' + groupMembers.length + ')' }}</div>
    </template>
  </NavBar>
  <FriendSelect :friendList="friendList" @checkboxChange="checkboxChange"></FriendSelect>
</template>

<script lang="ts" setup>
import FriendSelect from '../../../components/FriendSelect.vue';
import { ref } from 'vue'
import NavBar from '../../../components/NavBar.vue';
import { t } from '../../../utils/i18n';
import { onLoad } from '@dcloudio/uni-app';
import { debounce } from '@xkit-yx/utils';
import Icon from '../../../components/Icon.vue';
import { customRedirectTo } from '../../../utils/customNavigate';
const friendList = ref()
const groupMembers = ref<string[]>([])
const store = uni.$UIKitStore

onLoad(() => {
  const list = store.uiStore.friendsWithoutBlacklist.map(item => {
    return { 
      ...item,
      nick: store.uiStore.getAppellation({account: item.account})
    }
  })
  friendList.value = list
})

const checkboxChange = (selectList: string[]) => {
  groupMembers.value = selectList
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

const createGroup = debounce(() => {
  try {
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
    store.teamStore.createTeamActive({
      accounts: [...groupMembers.value],
      avatar: createTeamAvatar(),
      name: createGroupName(groupMembers.value)
    }).then(async (res) => {
      customRedirectTo({
        url: '/pages/Chat/index'
      })
      uni.showToast({
        title: t('createTeamSuccessText'),
        icon: "success"
      })
    }).catch(() => {
      uni.showToast({
        title: t('createTeamFailedText'),
        icon: "error"
      })
    })
  } catch (error) {
    uni.showToast({
      title: t('createTeamFailedText'),
      icon: "error"
    })
  }
}, 800)

const back = () => {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";

.nav-bar-right {
  color: rgb(20, 146, 209);
  ;
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
