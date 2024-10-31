<template>
  <div>
    <NavBar :title="t('createTeamText')" />
    <PersonSelect
      :personList="friendList"
      @checkboxChange="checkboxChange"
      :showBtn="true"
      :btnText="t('createButtonText') + '(' + groupMembers.length + ')'"
    >
    </PersonSelect>
  </div>
</template>

<script lang="ts" setup>
import PersonSelect, {
  type PersonSelectItem,
} from '../../../components/PersonSelect.vue'
import { ref, computed } from '../../../utils/transformVue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { customRedirectTo } from '../../../utils/customNavigate'
import { events } from '../../../utils/constants'

const friendList = ref<PersonSelectItem[]>([])

const groupMembers = computed(() => {
  return friendList.value
    .filter((item) => item.checked)
    .map((item) => item.accountId)
})

let p2pConversationId = ''

onLoad((options) => {
  p2pConversationId = options?.p2pConversationId
  const list = uni.$UIKitStore.uiStore.friends.filter(
    (item) => !uni.$UIKitStore.relationStore.blacklist.includes(item.accountId)
  )
  friendList.value = list
    .map((item) => ({ accountId: item.accountId }))
    .filter((item) => {
      return item.accountId !== p2pConversationId
    })

  uni.$on(events.FRIEND_SELECT, () => {
    createGroup()
  })
})

const checkboxChange = (selectList: string[]) => {
  friendList.value = friendList.value.map((item) => {
    return {
      accountId: item.accountId,
      checked: selectList.includes(item.accountId),
    }
  })
  if (selectList.length >= 200) {
    uni.showToast({
      title: t('maxSelectedText'),
      icon: 'none',
    })
    return
  }
}

const createGroupName = (groupMembers: string[]) => {
  const _memberNickArr: string[] = []
  groupMembers.map((item) => {
    _memberNickArr.push(
      uni.$UIKitStore.uiStore.getAppellation({ account: item })
    )
  })

  const _ownerName =
    uni.$UIKitStore.userStore.myUserInfo.name ||
    uni.$UIKitStore.userStore.myUserInfo.accountId
  const _groupName = (_ownerName + '、' + _memberNickArr.join('、')).slice(
    0,
    30
  )
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
    if (groupMembers?.value?.length == 0) {
      uni.showToast({
        title: t('friendSelect'),
        icon: 'none',
      })
      return
    }

    if (groupMembers?.value?.length > 200) {
      uni.showToast({
        title: t('maxSelectedText'),
        icon: 'none',
      })
      return
    }
    flag = true

    const team = await uni.$UIKitStore?.teamStore.createTeamActive({
      // 这里需要判断是否是从单聊设置页跳转到创建群聊页面，如果是的话，需要将单聊的账号添加创建群的账号列表中
      accounts: p2pConversationId
        ? [...groupMembers.value, p2pConversationId]
        : [...groupMembers.value],
      avatar: createTeamAvatar(),
      name: createGroupName(groupMembers.value),
    })
    uni.$UIKitStore.uiStore.selectConversation(
      uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(team.teamId)
    )
    customRedirectTo({
      url: '/pages/Chat/index',
    })
    uni.showToast({
      title: t('createTeamSuccessText'),
      icon: 'success',
    })
  } catch (error) {
    uni.showToast({
      title: t('createTeamFailedText'),
      icon: 'error',
    })
  } finally {
    flag = false
  }
}

onUnload(() => {
  uni.$off(events.FRIEND_SELECT)
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

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
    background-color: #f2f4f5;
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
  color: #a6adb6;
}
</style>
