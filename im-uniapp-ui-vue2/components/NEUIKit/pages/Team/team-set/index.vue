<template>
  <div>
    <NavBar :title="t('setText')" />
    <div class="team-set-container" v-if="team">
      <div class="team-set-card">
        <div class="team-set-item">
          <div class="team-info-item" @tap="handleInfoClick">
            <Avatar
              :account="team && team.teamId"
              :avatar="team && team.avatar"
            />
            <div class="team-info-title">{{ team && team.name }}</div>
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </div>
        <div class="team-set-item">
          <div class="team-members-item">
            <div class="team-members-info-item" @tap="gotoTeamMember">
              <div class="team-members-info">
                <div class="team-info-title">
                  {{
                    isDiscussion
                      ? t('discussionMemberText')
                      : t('teamMemberText')
                  }}
                </div>
                <div class="group-info-subtitle">
                  {{ team && team.memberCount }}
                </div>
              </div>
              <Icon
                iconClassName="more-icon"
                color="#999"
                type="icon-jiantou"
              />
            </div>
            <div class="member-list">
              <div class="member-add">
                <div @tap="addTeamMember" :style="{ display: 'flex' }">
                  <Icon type="icon-tianjiaanniu" />
                </div>
              </div>
              <div
                class="member-item"
                v-for="member in teamMembers"
                :key="member.accountId"
              >
                <Avatar
                  :account="member.accountId"
                  size="32"
                  :key="member.accountId"
                  font-size="10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="team-set-card">
        <div class="team-set-item team-set-item-flex" @tap="goPinInTeam">
          <div>{{ t('pinText') }}</div>
          <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
        </div>
        <div class="team-set-item team-set-item-flex">
          <div>{{ t('stickTopText') }}</div>
          <switch
            :checked="conversation && !!conversation.stickTop"
            @change="changeStickTopInfo"
          />
        </div>
        <div class="team-set-item team-set-item-flex">
          <div>{{ t('sessionMuteText') }}</div>
          <switch
            :checked="
              team &&
              teamMuteMode !==
                V2NIMConst.V2NIMTeamMessageMuteMode
                  .V2NIM_TEAM_MESSAGE_MUTE_MODE_ON
            "
            @change="changeTeamMute"
          />
        </div>
        <div
          v-if="!isDiscussion"
          class="team-set-item team-set-item-flex"
          @tap="goNickInTeam"
        >
          <div>{{ t('nickInTeam') }}</div>
          <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
        </div>
      </div>
      <div
        v-if="!isDiscussion && (isGroupOwner || isGroupManager)"
        class="team-set-card"
      >
        <div class="team-set-item team-set-item-flex">
          <div>{{ t('teamBannedText') }}</div>
          <switch
            :checked="
              team &&
              team.chatBannedMode !==
                V2NIMConst.V2NIMTeamChatBannedMode
                  .V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN
            "
            @change="setTeamChatBanned"
          />
        </div>
        <div class="team-set-item team-set-item-flex" @tap="goTeamManage">
          <div>{{ t('teamManagerText') }}</div>
          <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
        </div>
      </div>
      <div
        class="team-set-button"
        v-if="isGroupOwner"
        @tap="showDismissConfirm"
      >
        {{ isDiscussion ? t('leaveDiscussionTitle') : t('dismissTeamText') }}
      </div>
      <div class="team-set-button" v-else @tap="showLeaveConfirm">
        {{ isDiscussion ? t('leaveDiscussionTitle') : t('leaveTeamTitle') }}
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../../components/NavBar.vue'
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'
import { autorun } from "../../../utils/store.js"
import { t } from '../../../utils/i18n'
import { isDiscussionFunc, toRenderSafeData } from '../../../utils'
import {
  customNavigateTo,
  customSwitchTab,
} from '../../../utils/customNavigate'
import { V2NIMConst } from '../../../utils/nim'

export default {
  components: {
    NavBar,
    Avatar,
    Icon,
  },
  data() {
    return {
      teamId: '',
      teamMembers: [],
      conversation: undefined,
      team: undefined,
      teamMuteMode: undefined,
      enableV2CloudConversation:
        uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation,
      teamWatch: function () {},
      conversationWatch: function () {},
      V2NIMConst,
    }
  },
  computed: {
    isGroupOwner() {
      const myUser = uni.$UIKitStore.userStore.myUserInfo
      return (this.team ? this.team.ownerAccountId : '') === (myUser ? myUser.accountId : '')
    },
    isDiscussion() {
      return isDiscussionFunc(this.team?.serverExtension)
    },
    isGroupManager() {
      const myUser = uni.$UIKitStore.userStore.myUserInfo
      return this.teamMembers
        .filter(
          (item) =>
            item.memberRole ===
            V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
        )
        .some((member) => member.accountId === (myUser ? myUser.accountId : ''))
    },
    canAddMember() {
      if (
        this.team?.inviteMode ===
        V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_ALL
      ) {
        return true
      }
      return this.isGroupOwner || this.isGroupManager
    },
  },
  onLoad(option) {
    this.teamId = option ? option.id || '' : ''
    const conversationId =
      uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(this.teamId)

    uni.$UIKitStore.teamStore
      .getTeamMessageMuteModeActive(this.teamId, 1)
      .then((res) => {
        this.teamMuteMode = res
      })

    this.teamWatch = autorun(() => {
      if (this.teamId) {
        this.team = toRenderSafeData(
          uni.$UIKitStore.teamStore.teams.get(this.teamId)
        )
        this.teamMembers = toRenderSafeData(uni.$UIKitStore.teamMemberStore.getTeamMember(
          this.teamId
        )) || []
      }
    })

    this.conversationWatch = autorun(() => {
      const conversation = this.enableV2CloudConversation
        ? uni.$UIKitStore.conversationStore?.conversations.get(conversationId)
        : uni.$UIKitStore.localConversationStore?.conversations.get(
            conversationId
          )
      this.conversation = toRenderSafeData(conversation)
    })
  },
  beforeDestroy() {
    this.teamWatch()
    this.conversationWatch()
  },
  methods: {
    t,
    handleInfoClick() {
      customNavigateTo({
        url: `/pages/Team/team-set/team-info-edit?id=${this.teamId}`,
      })
    },
    goBackChat() {
      customSwitchTab({
        url: '/pages/Conversation/index',
      })
    },
    goTeamManage() {
      customNavigateTo({
        url: `/pages/Team/team-set/team-manage?id=${this.teamId}`,
      })
    },
    goNickInTeam() {
      customNavigateTo({
        url: `/pages/Team/team-set/nick-in-team?id=${this.teamId}`,
      })
    },
    goPinInTeam() {
      const conversationId =
        uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(this.teamId)
      customNavigateTo({
        url: `/pages/Chat/message/pin-list?conversationId=${conversationId}`,
      })
    },
    addTeamMember() {
      if (!this.canAddMember) {
        uni.showToast({
          title: t('noPermission'),
          icon: 'error',
        })
        return
      }
      customNavigateTo({
        url: `/pages/Team/team-add/index?teamId=${this.teamId}`,
      })
    },
    gotoTeamMember() {
      customNavigateTo({
        url: `/pages/Team/team-member/index?teamId=${this.teamId}`,
      })
    },
    leaveDiscussion() {
      uni.showModal({
        title: t('leaveDiscussionTitle'),
        content: t('leaveDiscussionConfirmText'),
        cancelText: t('cancelText'),
        confirmText: t('okText'),
        showCancel: true,
        success: async (res) => {
          try {
            if (res.confirm && this.team?.teamId) {
              if (this.isGroupOwner) {
                const myUser = uni.$UIKitStore.userStore.myUserInfo
                const teamMembersWithoutAiUserAndMySelf = this.teamMembers
                  .filter((item) => !uni.$UIKitStore.aiUserStore.aiUsers.has(item.accountId))
                  .filter((item) => item.accountId !== myUser?.accountId)

                if (teamMembersWithoutAiUserAndMySelf.length === 0) {
                  await uni.$UIKitStore.teamStore.dismissTeamActive(this.team.teamId)
                } else {
                  await uni.$UIKitStore.teamStore.transferTeamActive({
                    teamId: this.team.teamId,
                    account: teamMembersWithoutAiUserAndMySelf[0].accountId,
                    leave: true,
                    type: V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED,
                  })
                }
              } else {
                await uni.$UIKitStore.teamStore.leaveTeamActive(this.team.teamId)
              }
              uni.showToast({
                title: t('leaveDiscussionSuccessText'),
                icon: 'none',
              })
              this.goBackChat()
            }
          } catch (error) {
            uni.showToast({
              title: t('leaveDiscussionFailedText'),
              icon: 'error',
            })
          }
        },
        cancel: function () {},
      })
    },
    showDismissConfirm() {
      if (this.isDiscussion) {
        this.leaveDiscussion()
      } else {
        uni.showModal({
          title: t('dismissTeamText'),
          content: t('dismissTeamConfirmText'),
          cancelText: t('cancelText'),
          confirmText: t('okText'),
          showCancel: true,
          success: (res) => {
            if (res.confirm) {
              uni.$UIKitStore.teamStore
                .dismissTeamActive(this.teamId)
                .then(() => {
                  uni.showToast({
                    title: t('dismissTeamSuccessText'),
                    icon: 'none',
                  })
                })
                .catch(() => {
                  uni.showToast({
                    title: t('dismissTeamFailedText'),
                    icon: 'error',
                  })
                })
            }
          },
        })
      }
    },
    showLeaveConfirm() {
      if (this.isDiscussion) {
        this.leaveDiscussion()
      } else {
        uni.showModal({
          title: t('leaveTeamTitle'),
          content: t('leaveTeamConfirmText'),
          cancelText: t('cancelText'),
          confirmText: t('okText'),
          showCancel: true,
          success: (res) => {
            if (res.confirm) {
              uni.$UIKitStore.teamStore
                .leaveTeamActive(this.teamId)
                .then(() => {
                  uni.showToast({
                    title: t('leaveTeamSuccessText'),
                    icon: 'none',
                  })
                  this.goBackChat()
                })
                .catch(() => {
                  uni.showToast({
                    title: t('leaveTeamFailedText'),
                    icon: 'error',
                  })
                })
            }
          },
        })
      }
    },
    async changeStickTopInfo(e) {
      const checked = e.detail.value
      const conversationId =
        uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(this.teamId)
      try {
        if (this.enableV2CloudConversation) {
          await uni.$UIKitStore.conversationStore?.stickTopConversationActive(
            conversationId,
            checked
          )
        } else {
          await uni.$UIKitStore.localConversationStore?.stickTopConversationActive(
            conversationId,
            checked
          )
        }
      } catch (error) {
        uni.showToast({
          title: checked ? t('addStickTopFailText') : t('deleteStickTopFailText'),
          icon: 'error',
        })
      }
    },
    changeTeamMute(e) {
      const checked = e.detail.value

      uni.$UIKitStore.teamStore
        .setTeamMessageMuteModeActive(
          this.teamId,
          V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED,
          checked
            ? V2NIMConst.V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF
            : V2NIMConst.V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_ON
        )
        .then(() => {
          this.teamMuteMode = checked
            ? V2NIMConst.V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF
            : V2NIMConst.V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_ON
        })
        .catch((error) => {
          switch (error?.code) {
            case 109432:
              uni.showToast({
                title: t('noPermission'),
                icon: 'none',
              })
              break
            default:
              uni.showToast({
                title: checked
                  ? t('sessionMuteFailText')
                  : t('sessionUnMuteFailText'),
                icon: 'none',
              })
              break
          }
        })
    },
    async setTeamChatBanned(e) {
      const checked = e.detail.value
      try {
        await uni.$UIKitStore.teamStore.setTeamChatBannedActive({
          teamId: this.teamId,
          chatBannedMode: checked
            ? V2NIMConst.V2NIMTeamChatBannedMode
                .V2NIM_TEAM_CHAT_BANNED_MODE_BANNED_NORMAL
            : V2NIMConst.V2NIMTeamChatBannedMode.V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN,
        })
      } catch (error) {
        switch (error?.code) {
          case 109432:
            uni.showToast({
              title: t('noPermission'),
              icon: 'error',
            })
            break
          default:
            uni.showToast({
              title: checked
                ? t('muteAllTeamFailedText')
                : t('unmuteAllTeamFailedText'),
              icon: 'error',
            })
            break
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.team-set-container {
  height: 100vh;
  box-sizing: border-box;
  background-color: #eff1f4;
  padding: 10px 20px;
}

.team-set-card {
  background: #ffffff;
  border-radius: 8px;
  padding-left: 16px;
  margin-bottom: 10px;
}

.team-set-button {
  text-align: center;
  background: #ffffff;
  border-radius: 8px;
  color: #e6605c;
  height: 40px;
  line-height: 40px;
}

.team-set-item:not(:last-child) {
  border-bottom: 1rpx solid #f5f8fc;
}

.team-set-item-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.more-icon {
  margin: 0 16px;
  color: #999999;
}

.team-info-item {
  height: 70px;
  display: flex;
  align-items: center;

  .team-info-title {
    font-size: 16px;
    margin-left: 10px;
    width: 0;
    flex: 1;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
}

.team-members-item {
  height: 90px;
}

.team-members-info-item {
  display: flex;
  align-items: center;
}

.team-members-info {
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  .group-info-subtitle {
    color: #999999;
  }
}

.member-list {
  white-space: nowrap;
  overflow-x: hidden;
  margin-right: 30px;
  height: 50px;
  display: flex;
  align-items: center;
}

.member-add {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  border: 1px dashed #999999;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  flex-shrink: 0;
}

.member-item {
  margin-right: 10px;
  display: inline-block;
  flex-shrink: 0;
}
</style>
