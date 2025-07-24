<template>
  <div>
    <NavBar :title="t('chooseText')" />
    <PersonSelect
      :personList="friendList"
      @checkboxChange="checkboxChange"
      @onBtnClick="createTeam"
      :showBtn="true"
      :btnText="t('createButtonText') + '(' + teamMembers.length + ')'"
    >
    </PersonSelect>
  </div>
</template>

<script lang="ts" setup>
import PersonSelect, {
  type PersonSelectItem,
} from '../../../components/PersonSelect.vue'
import { ref, computed } from 'vue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { onLoad } from '@dcloudio/uni-app'
import { customRedirectTo } from '../../../utils/customNavigate'
import { V2NIMTeam } from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMTeamService'
import { V2NIMConst } from '../../../utils/nim'

// 如果有这个值，代表着从单聊页面跳转而来
let p2pConversationId = ''

// 如果有这个值，代表着从会话列表点击创建讨论组跳转而来
let createDiscussion = false

// 好友列表
const friendList = ref<PersonSelectItem[]>([])

// 群成员
const teamMembers = computed(() => {
  return friendList.value
    .filter((item) => item.checked)
    .map((item) => item.accountId)
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

// 构建群名
const createTeamName = (teamMembers: string[]) => {
  const _memberNickArr: string[] = []
  teamMembers.map((item) => {
    _memberNickArr.push(
      uni.$UIKitStore.uiStore.getAppellation({ account: item })
    )
  })

  const _ownerName =
    uni.$UIKitStore.userStore.myUserInfo.name ||
    uni.$UIKitStore.userStore.myUserInfo.accountId
  const _teamName = (_ownerName + '、' + _memberNickArr.join('、')).slice(0, 30)
  return _teamName
}

// 群头像
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

// 创建群聊/讨论组
const createTeam = async () => {
  try {
    if (flag) return
    if (teamMembers?.value?.length == 0) {
      uni.showToast({
        title: t('friendSelect'),
        icon: 'none',
      })
      return
    }

    if (teamMembers?.value?.length > 200) {
      uni.showToast({
        title: t('maxSelectedText'),
        icon: 'none',
      })
      return
    }
    flag = true

    let team = {} as V2NIMTeam

    // 创建讨论组
    if (createDiscussion) {
      team = await uni.$UIKitStore?.teamStore.createTeamActive({
        type: V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED,
        accounts: [...teamMembers.value],
        avatar: createTeamAvatar(),
        name: createTeamName(teamMembers.value),
        joinMode: V2NIMConst.V2NIMTeamJoinMode.V2NIM_TEAM_JOIN_MODE_FREE,
        agreeMode: V2NIMConst.V2NIMTeamAgreeMode.V2NIM_TEAM_AGREE_MODE_NO_AUTH,
        inviteMode: V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_ALL,
        updateInfoMode:
          V2NIMConst.V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_ALL,
        updateExtensionMode:
          V2NIMConst.V2NIMTeamUpdateExtensionMode
            .V2NIM_TEAM_UPDATE_EXTENSION_MODE_ALL,
        serverExtension: JSON.stringify({
          im_ui_kit_group: true,
        }),
      })
    } else {
      team = await uni.$UIKitStore?.teamStore.createTeamActive({
        // 这里需要判断是否是从单聊设置页跳转到创建群聊页面，如果是的话，需要将单聊的账号添加创建群的账号列表中
        accounts: p2pConversationId
          ? [...teamMembers.value, p2pConversationId]
          : [...teamMembers.value],
        avatar: createTeamAvatar(),
        name: createTeamName(teamMembers.value),
      })
    }

    uni.$UIKitStore.uiStore.selectConversation(
      uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(team.teamId)
    )
    // 创建完成调整至聊天页面
    customRedirectTo({
      url: '/pages/Chat/index',
    })
    uni.showToast({
      title: createDiscussion
        ? t('createDiscussionSuccessText')
        : t('createTeamSuccessText'),
      icon: 'none',
    })
  } catch (error) {
    uni.showToast({
      title: createDiscussion
        ? t('createDiscussionFailedText')
        : t('createTeamFailedText'),
      icon: 'error',
    })
  } finally {
    flag = false
  }
}

onLoad((options) => {
  // 获取路由跳转参数
  p2pConversationId = options?.p2pConversationId
  // 是否是创建讨论组
  createDiscussion = options?.createDiscussion

  const list = uni.$UIKitStore.uiStore.friends.filter(
    (item) => !uni.$UIKitStore.relationStore.blacklist.includes(item.accountId)
  )

  friendList.value = list
    .map((item) => ({ accountId: item.accountId }))
    .filter((item) => {
      return item.accountId !== p2pConversationId
    })
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
