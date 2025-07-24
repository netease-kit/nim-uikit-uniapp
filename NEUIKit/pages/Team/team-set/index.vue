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

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue'
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed, onUnmounted } from 'vue'
import { autorun } from 'mobx'
import { t } from '../../../utils/i18n'
import { isDiscussionFunc } from '../../../utils'
import {
  customNavigateTo,
  customSwitchTab,
} from '../../../utils/customNavigate'
import {
  V2NIMTeam,
  V2NIMTeamMember,
} from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMTeamService'
import { V2NIMConst } from '../../../utils/nim'
import {
  V2NIMConversationForUI,
  V2NIMLocalConversationForUI,
} from '@xkit-yx/im-store-v2/dist/types/types'

let teamId = ''
/** 群成员*/
const teamMembers = ref<V2NIMTeamMember[]>([])
/** 会话 */
const conversation = ref<V2NIMConversationForUI | V2NIMLocalConversationForUI>()
const team = ref<V2NIMTeam>()
/** 群聊免打扰 */
const teamMuteMode = ref<V2NIMConst.V2NIMTeamMessageMuteMode>()

/**是否是云端会话 */
const enableV2CloudConversation =
  uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation

/** 是否是群主 */
const isGroupOwner = computed(() => {
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return (
    (team.value ? team.value.ownerAccountId : '') ===
    (myUser ? myUser.accountId : '')
  )
})

/** 是否是讨论组 */
const isDiscussion = computed(() => {
  let serverExtension = team.value?.serverExtension
  return isDiscussionFunc(serverExtension)
})

/** 是否是管理员 */
const isGroupManager = computed(() => {
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return teamMembers.value
    .filter(
      (item) =>
        //@ts-ignore
        item.memberRole ===
        V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
    )
    .some((member) => member.accountId === (myUser ? myUser.accountId : ''))
})

/** 是否可以添加成员 */
const canAddMember = computed(() => {
  if (
    //@ts-ignore
    team.value?.inviteMode ===
    V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_ALL
  ) {
    return true
  }
  return isGroupOwner.value || isGroupManager.value
})

/** 群详情 */
const handleInfoClick = () => {
  customNavigateTo({
    url: `/pages/Team/team-set/team-info-edit?id=${teamId}`,
  })
}

/** 返回聊天 */
const goBackChat = () => {
  customSwitchTab({
    url: '/pages/Conversation/index',
  })
}

/** 群管理员 */
const goTeamManage = () => {
  customNavigateTo({
    url: `/pages/Team/team-set/team-manage?id=${teamId}`,
  })
}

/** 群昵称 */
const goNickInTeam = () => {
  customNavigateTo({
    url: `/pages/Team/team-set/nick-in-team?id=${teamId}`,
  })
}

/** 群标记 */
const goPinInTeam = () => {
  const conversationId =
    uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(teamId)
  customNavigateTo({
    url: `/pages/Chat/message/pin-list?conversationId=${conversationId}`,
  })
}

/** 添加群成员 */
const addTeamMember = () => {
  if (!canAddMember.value) {
    uni.showToast({
      title: t('noPermission'),
      icon: 'error',
    })
    return
  }
  customNavigateTo({
    url: `/pages/Team/team-add/index?teamId=${teamId}`,
  })
}

/** 群成员 */
const gotoTeamMember = () => {
  customNavigateTo({
    url: `/pages/Team/team-member/index?teamId=${teamId}`,
  })
}

/** 离开讨论组 */
const leaveDiscussion = () => {
  uni.showModal({
    title: t('leaveDiscussionTitle'),
    content: t('leaveDiscussionConfirmText'),
    cancelText: t('cancelText'),
    confirmText: t('okText'),
    showCancel: true,
    success: async function (res) {
      try {
        if (res.confirm && team.value?.teamId) {
          if (isGroupOwner.value) {
            const myUser = uni.$UIKitStore.userStore.myUserInfo
            const teamMembersWithoutAiUserAndMySelf = teamMembers.value
              .filter(
                (item: V2NIMTeamMember) =>
                  !uni.$UIKitStore.aiUserStore.aiUsers.has(item.accountId)
              )
              .filter(
                (item: V2NIMTeamMember) => item.accountId !== myUser?.accountId
              )

            if (teamMembersWithoutAiUserAndMySelf.length === 0) {
              await uni.$UIKitStore.teamStore.dismissTeamActive(
                team.value.teamId
              )
            } else {
              await uni.$UIKitStore.teamStore.transferTeamActive({
                teamId: team.value.teamId,
                account: teamMembersWithoutAiUserAndMySelf[0].accountId,
                leave: true,
                type: V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED,
              })
            }
          } else {
            await uni.$UIKitStore.teamStore.leaveTeamActive(team.value.teamId)
          }
          uni.showToast({
            title: t('leaveDiscussionSuccessText'),
            icon: 'none',
          })
          goBackChat()
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
}

/** 解散群/讨论组 */
const showDismissConfirm = () => {
  if (isDiscussion.value) {
    leaveDiscussion()
  } else {
    uni.showModal({
      title: t('dismissTeamText'),
      content: t('dismissTeamConfirmText'),
      cancelText: t('cancelText'),
      confirmText: t('okText'),
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          uni.$UIKitStore.teamStore
            .dismissTeamActive(teamId)
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
}

/** 离开群/讨论组 */
const showLeaveConfirm = () => {
  if (isDiscussion.value) {
    leaveDiscussion()
  } else {
    uni.showModal({
      title: t('leaveTeamTitle'),
      content: t('leaveTeamConfirmText'),
      cancelText: t('cancelText'),
      confirmText: t('okText'),
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          uni.$UIKitStore.teamStore
            .leaveTeamActive(teamId)
            .then(() => {
              uni.showToast({
                title: t('leaveTeamSuccessText'),
                icon: 'none',
              })
              goBackChat()
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
}
let teamWatch = () => {}
let conversationWatch = () => {}

/** 群聊天置顶 */
const changeStickTopInfo = async (e: any) => {
  const checked = e.detail.value
  const conversationId =
    uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(teamId)
  try {
    if (enableV2CloudConversation) {
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
}

/** 群免打扰 */
const changeTeamMute = (e: any) => {
  const checked = e.detail.value

  uni.$UIKitStore.teamStore
    .setTeamMessageMuteModeActive(
      teamId,
      V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED,
      checked
        ? V2NIMConst.V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF
        : V2NIMConst.V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_ON
    )
    .then(() => {
      teamMuteMode.value = checked
        ? V2NIMConst.V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF
        : V2NIMConst.V2NIMTeamMessageMuteMode.V2NIM_TEAM_MESSAGE_MUTE_MODE_ON
    })
    .catch((error: any) => {
      switch (error?.code) {
        // 无权限
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
}

/** 群禁言 */
const setTeamChatBanned = async (e: any) => {
  const checked = e.detail.value
  try {
    await uni.$UIKitStore.teamStore.setTeamChatBannedActive({
      teamId,
      chatBannedMode: checked
        ? V2NIMConst.V2NIMTeamChatBannedMode
            .V2NIM_TEAM_CHAT_BANNED_MODE_BANNED_NORMAL
        : V2NIMConst.V2NIMTeamChatBannedMode.V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN,
    })
  } catch (error: any) {
    switch (error?.code) {
      // 无权限
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
            : t('sessionUnMuteFailText'),
          icon: 'error',
        })
        break
    }
  }
}

onLoad((option) => {
  teamId = option ? option.id : ''
  const conversationId =
    uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(teamId)

  // 查询当前群是否开启免打扰
  uni.$UIKitStore.teamStore
    .getTeamMessageMuteModeActive(teamId, 1)
    .then((res: V2NIMConst.V2NIMTeamMessageMuteMode) => {
      teamMuteMode.value = res
    })

  teamWatch = autorun(() => {
    if (teamId) {
      team.value = uni.$UIKitStore.teamStore.teams.get(teamId)
      teamMembers.value = uni.$UIKitStore.teamMemberStore.getTeamMember(teamId)
    }
  })

  conversationWatch = autorun(() => {
    conversation.value = enableV2CloudConversation
      ? uni.$UIKitStore.conversationStore?.conversations.get(conversationId)
      : uni.$UIKitStore.localConversationStore?.conversations.get(
          conversationId
        )
  })
})

/** 移除监听 */
onUnmounted(() => {
  teamWatch()
  conversationWatch()
})
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
