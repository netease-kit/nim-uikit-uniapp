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

<script>
import PersonSelect from '../../../components/PersonSelect.vue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { customRedirectTo } from '../../../utils/customNavigate'
import { V2NIMConst } from '../../../utils/nim'
import { toRenderSafeData } from '../../../utils'

export default {
  components: {
    PersonSelect,
    NavBar,
  },
  data() {
    return {
      V2NIMConst,
      p2pConversationId: '',
      createDiscussion: false,
      friendList: [],
      flag: false,
    }
  },
  computed: {
    teamMembers() {
      return this.friendList
        .filter((item) => item.checked)
        .map((item) => item.accountId)
    },
  },
  onLoad(options) {
    this.p2pConversationId = options?.p2pConversationId || ''
    this.createDiscussion = !!options?.createDiscussion

    const list = uni.$UIKitStore.uiStore.friends.filter(
      (item) => !uni.$UIKitStore.relationStore.blacklist.includes(item.accountId)
    )

    this.friendList = toRenderSafeData(list
      .map((item) => ({ accountId: item.accountId }))
      .filter((item) => item.accountId !== this.p2pConversationId)) || []
  },
  methods: {
    t,
    checkboxChange(selectList) {
      this.friendList = this.friendList.map((item) => {
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
      }
    },
    createTeamName(teamMembers) {
      const memberNickArr = []
      teamMembers.forEach((item) => {
        memberNickArr.push(uni.$UIKitStore.uiStore.getAppellation({ account: item }))
      })

      const ownerName =
        uni.$UIKitStore.userStore.myUserInfo.name ||
        uni.$UIKitStore.userStore.myUserInfo.accountId
      return (ownerName + '、' + memberNickArr.join('、')).slice(0, 30)
    },
    createTeamAvatar() {
      const teamAvatarArr = [
        'https://yx-web-nosdn.netease.im/common/2425b4cc058e5788867d63c322feb7ac/groupAvatar1.png',
        'https://yx-web-nosdn.netease.im/common/62c45692c9771ab388d43fea1c9d2758/groupAvatar2.png',
        'https://yx-web-nosdn.netease.im/common/d1ed3c21d3f87a41568d17197760e663/groupAvatar3.png',
        'https://yx-web-nosdn.netease.im/common/e677d8551deb96723af2b40b821c766a/groupAvatar4.png',
        'https://yx-web-nosdn.netease.im/common/fd6c75bb6abca9c810d1292e66d5d87e/groupAvatar5.png',
      ]
      const index = Math.floor(Math.random() * 5)
      return teamAvatarArr[index]
    },
    async createTeam() {
      try {
        if (this.flag) return
        if (this.teamMembers.length === 0) {
          uni.showToast({
            title: t('friendSelect'),
            icon: 'none',
          })
          return
        }

        if (this.teamMembers.length > 200) {
          uni.showToast({
            title: t('maxSelectedText'),
            icon: 'none',
          })
          return
        }
        this.flag = true

        let team = {}

        if (this.createDiscussion) {
          team = await uni.$UIKitStore?.teamStore.createTeamActive({
            type: V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED,
            accounts: [...this.teamMembers],
            avatar: this.createTeamAvatar(),
            name: this.createTeamName(this.teamMembers),
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
            accounts: this.p2pConversationId
              ? [...this.teamMembers, this.p2pConversationId]
              : [...this.teamMembers],
            avatar: this.createTeamAvatar(),
            name: this.createTeamName(this.teamMembers),
          })
        }

        const conversationId =
          uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(team.teamId)
        uni.$UIKitStore.uiStore.selectConversation(conversationId)
        customRedirectTo({
          url: `/pages/Chat/index?conversationId=${encodeURIComponent(
            conversationId
          )}`,
        })
        uni.showToast({
          title: this.createDiscussion
            ? t('createDiscussionSuccessText')
            : t('createTeamSuccessText'),
          icon: 'none',
        })
      } catch (error) {
        uni.showToast({
          title: this.createDiscussion
            ? t('createDiscussionFailedText')
            : t('createTeamFailedText'),
          icon: 'error',
        })
      } finally {
        this.flag = false
      }
    },
  },
}
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
