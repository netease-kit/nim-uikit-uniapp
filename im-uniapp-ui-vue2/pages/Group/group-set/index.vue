<template>
  <div>
    <NavBar :title="t('setText')" />
    <div class="group-set-container" v-if="team">
      <div class="group-set-card">
        <div class="group-set-item">
          <div class="group-info-item" @tap="handleInfoClick">
            <Avatar :account="team.teamId" :avatar="team.avatar" />
            <div class="group-info-title">{{ team.name }}</div>
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </div>
        <div class="group-set-item">
          <div class="group-members-item">
            <div class="group-members-info-item" @tap="gotoTeamMember">
              <div class="group-members-info">
                <div class="group-info-title">{{ t('teamMemberText') }}</div>
                <div class="group-info-subtitle">
                  {{ team.memberNum }}
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
                :key="member.account"
              >
                <Avatar
                  :account="member.account"
                  size="32"
                  :key="member.account"
                  font-size="10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="group-set-card">
        <div class="group-set-item group-set-item-flex">
          <div>{{ t('stickTopText') }}</div>
          <switch
            :checked="
              session &&
              session.stickTopInfo &&
              session.stickTopInfo.isStickOnTop
            "
            @change="changeStickTopInfo"
          />
        </div>
        <div class="group-set-item group-set-item-flex" @tap="goNickInTeam">
          <div>{{ t('nickInTeam') }}</div>
          <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
        </div>
      </div>
      <div class="group-set-card" v-if="isGroupOwner || isGroupManager">
        <div class="group-set-item group-set-item-flex">
          <div>{{ t('teamMuteText') }}</div>
          <switch :checked="team && team.mute" @change="changeTeamMute" />
        </div>
        <div class="group-set-item group-set-item-flex" @tap="goTeamManage">
          <div>{{ t('teamManagerText') }}</div>
          <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
        </div>
      </div>
      <div
        class="group-set-button"
        v-if="isGroupOwner"
        @tap="showDismissConfirm"
      >
        {{ t('dismissTeamText') }}
      </div>
      <div class="group-set-button" v-else @tap="showLeaveConfirm">
        {{ t('leaveTeamTitle') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue'
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'

import type { Team, TeamMember } from '@xkit-yx/im-store'
// @ts-ignore
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from '../../../utils/transformVue'
import { autorun } from 'mobx'
import { t } from '../../../utils/i18n'
import { deepClone } from '../../../utils'
import {
  customNavigateTo,
  customRedirectTo,
} from '../../../utils/customNavigate'

let teamId = ''
const team = ref<Team>()
const teamMembers = ref<TeamMember[]>([])
const session = ref({
  stickTopInfo: {
    isStickOnTop: false,
  },
})

const isGroupOwner = computed(() => {
  // @ts-ignore
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return (team.value ? team.value.owner : '') === (myUser ? myUser.account : '')
})

const isGroupManager = computed(() => {
  // @ts-ignore
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return teamMembers.value
    .filter((item) => item.type === 'manager')
    .some((member) => member.account === (myUser ? myUser.account : ''))
})

const canAddMember = computed(() => {
  if (team.value?.inviteMode === 'all') {
    return true
  }
  return isGroupOwner.value || isGroupManager.value
})

const handleInfoClick = () => {
  customNavigateTo({
    url: `/pages/Group/group-set/group-info-edit?id=${teamId}`,
  })
}

const goBackChat = () => {
  customRedirectTo({
    url: '/pages/Conversation/index',
  })
}

const goTeamManage = () => {
  customNavigateTo({
    url: `/pages/Group/group-set/group-manage?id=${teamId}`,
  })
}

const goNickInTeam = () => {
  customNavigateTo({
    url: `/pages/Group/group-set/nick-in-team?id=${teamId}`,
  })
}

const addTeamMember = () => {
  if (!canAddMember.value) {
    uni.showToast({
      title: t('noPermission'),
      icon: 'error',
    })
    return
  }
  customNavigateTo({
    url: `/pages/Group/group-add/index?teamId=${teamId}`,
  })
}

const gotoTeamMember = () => {
  customNavigateTo({
    url: `/pages/Group/group-member/index?teamId=${teamId}`,
  })
}

const showDismissConfirm = () => {
  uni.showModal({
    title: t('dismissTeamText'),
    content: t('dismissTeamConfirmText'),
    cancelText: t('cancelText'),
    confirmText: t('okText'),
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        // @ts-ignore
        uni.$UIKitStore.teamStore
          .dismissTeamActive(teamId)
          .then(() => {
            uni.showToast({
              title: t('dismissTeamSuccessText'),
              icon: 'success',
            })
            // customSwitchTab({ url: '/pages/Conversation/index' })
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

const showLeaveConfirm = () => {
  uni.showModal({
    title: t('leaveTeamTitle'),
    content: t('leaveTeamConfirmText'),
    cancelText: t('cancelText'),
    confirmText: t('okText'),
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        // @ts-ignore
        uni.$UIKitStore.teamStore
          .leaveTeamActive(teamId)
          .then(() => {
            uni.showToast({
              title: t('leaveTeamSuccessText'),
              icon: 'success',
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

onLoad((option) => {
  teamId = option ? option.id : ''
  autorun(() => {
    if (teamId) {
      // @ts-ignore
      team.value = deepClone(uni.$UIKitStore.teamStore.teams.get(teamId))
      teamMembers.value = deepClone(
        // @ts-ignore
        uni.$UIKitStore.teamMemberStore.getTeamMember(teamId)
      )
    }
  })

  autorun(() => {
    // @ts-ignore
    session.value = deepClone(
      uni.$UIKitStore.sessionStore.sessions.get('team-' + teamId)
    )
  })
})

const changeStickTopInfo = async (e: any) => {
  const checked = e.detail.value
  const sessionId = 'team-' + teamId
  try {
    if (checked) {
      // @ts-ignore
      await uni.$UIKitStore.sessionStore.addStickTopSessionActive(sessionId)
    } else {
      // @ts-ignore
      await uni.$UIKitStore.sessionStore.deleteStickTopSessionActive(sessionId)
    }
  } catch (error) {
    uni.showToast({
      title: checked ? t('addStickTopFailText') : t('deleteStickTopFailText'),
      icon: 'error',
    })
  }
}

const changeTeamMute = async (e: any) => {
  const checked = e.detail.value
  try {
    // @ts-ignore
    await uni.$UIKitStore.teamStore.muteTeamActive({ teamId, mute: checked })
  } catch (error) {
    switch (error?.code) {
      // 无权限
      case 802:
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
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.group-set-container {
  height: 100vh;
  box-sizing: border-box;
  background-color: #eff1f4;
  padding: 10px 20px;
}

.group-set-card {
  background: #ffffff;
  border-radius: 8px;
  padding-left: 16px;
  margin-bottom: 10px;
}

.group-set-button {
  text-align: center;
  background: #ffffff;
  border-radius: 8px;
  color: #e6605c;
  height: 40px;
  line-height: 40px;
}

.group-set-item:not(:last-child) {
  border-bottom: 1rpx solid #f5f8fc;
}

.group-set-item-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.more-icon {
  margin: 0 16px;
  color: #999999;
}

.group-info-item {
  height: 70px;
  display: flex;
  align-items: center;

  .group-info-title {
    font-size: 16px;
    margin-left: 10px;
    width: 0;
    flex: 1;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
}

.group-members-item {
  height: 90px;
}

.group-members-info-item {
  display: flex;
  align-items: center;
}

.group-members-info {
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
