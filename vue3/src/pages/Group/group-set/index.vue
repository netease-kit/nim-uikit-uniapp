<template>
  <NavBar :title="$t('setText')" />
  <div class="group-set-container" v-if="team">
    <div class="group-set-card">
      <div class="group-set-item">
        <div class="group-info-item" @tap="handleInfoClick">
          <Avatar :account="team.teamId" :avatar="team.avatar" />
          <div class="group-info-title">{{ team.name }}</div>
          <Icon class="more-icon" color="#999" type="icon-jiantou" />
        </div>
      </div>
      <div class="group-set-item">
        <div class="group-members-item">
          <div class="group-members-info-item" @tap="gotoTeamMember">
            <div class="group-members-info">
              <div class="group-info-title">{{ $t('teamMemberText') }}</div>
              <div class="group-info-subtitle">
                {{ team.memberNum }}
              </div>
            </div>
            <Icon class="more-icon" color="#999" type="icon-jiantou" />
          </div>
          <div class="member-list">
            <div class="member-add">
              <Icon @tap="addTeamMember" type="icon-tianjiaanniu" />
            </div>
            <div class="member-item" v-for="member in teamMembers" :key="member.account">
              <Avatar :account="member.account" size="32" :key="member.account" font-size="10" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="group-set-card">
      <div class="group-set-item group-set-item-flex">
        <div>{{ $t('stickTopText') }}</div>
        <switch :checked="session?.stickTopInfo?.isStickOnTop" @change="changeStickTopInfo" />
      </div>
    </div>
    <div class="group-set-button" v-if="isGroupOwner" @tap="showDismissConfirm">
      {{ $t('dismissTeamText') }}
    </div>
    <div class="group-set-button" v-else @tap="showLeaveConfirm">
      {{ $t('leaveTeamTitle') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue';
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'

import type { Session, Team, TeamMember } from '@xkit-yx/im-store';
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from 'vue';
import { autorun } from 'mobx';
import { t } from '../../../utils/i18n'
import { customNavigateTo, customRedirectTo, customSwitchTab } from '../../../utils/customNavigate';


const store = uni.$UIKitStore

let teamId = ''
const team = ref<Team>()
const teamMembers = ref<TeamMember[]>([])
const session = ref<Session>()

const isGroupOwner = computed(() => {
  const myUser = store.userStore.myUserInfo
  return team.value?.owner === myUser?.account
})

const handleInfoClick = () => {
  customNavigateTo({
    url: `/pages/Group/group-set/group-info-edit?id=${teamId}`
  })
}

const goBackChat = () => {
  customRedirectTo({
    url: '/pages/Conversation/index',
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
        store.teamStore.dismissTeamActive(teamId).then(() => {
          uni.showToast({
            title: t('dismissTeamSuccessText'),
            icon: 'success'
          })
          customSwitchTab({ url: '/pages/Conversation/index' })
        }).catch(() => {
          uni.showToast({
            title: t('dismissTeamFailedText'),
            icon: 'error'
          })
        })
      }
    }
  });
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
        store.teamStore.leaveTeamActive(teamId).then(() => {
          uni.showToast({
            title: t('leaveTeamSuccessText'),
            icon: 'success'
          })
          goBackChat()
        }).catch(() => {
          uni.showToast({
            title: t('leaveTeamFailedText'),
            icon: 'error'
          })
        })
      }
    }
  });
}

onLoad((option) => {
  teamId = option?.id
  autorun(() => {
    store.teamStore.getTeamActive(teamId).then((res) => {
      team.value = res
    })
    store.teamMemberStore.getTeamMemberActive(teamId).then((members) => {
      teamMembers.value = members
    })
  })

  autorun(() => {
    session.value = store.sessionStore.sessions.get('team-' + teamId)
  })
})

const addTeamMember = () => {
  customNavigateTo({
    url: `/pages/Group/group-add/index?teamId=${teamId}`
  })
}

const gotoTeamMember = () => {
  customNavigateTo({
    url: `/pages/Group/group-member/index?teamId=${teamId}`
  })
}

const changeStickTopInfo = async (e: any) => {
  const checked = e.detail.value
  const sessionId = 'team-' + teamId
  try {
    if (checked) {
      await store.sessionStore.addStickTopSessionActive(sessionId)
    } else {
      await store.sessionStore.deleteStickTopSessionActive(sessionId)
    }
  } catch (error) {
    uni.showToast({
      title: checked ? t('addStickTopFailText') : t('deleteStickTopFailText'),
      icon: 'error'
    })
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
  background: #FFFFFF;
  border-radius: 8px;
  padding-left: 16px;
  margin-bottom: 10px;
}

.group-set-button {
  text-align: center;
  background: #FFFFFF;
  border-radius: 8px;
  color: #E6605C;
  height: 40px;
  line-height: 40px;
}

.group-set-item:not(:last-child) {
  border-bottom: 1rpx solid #F5F8FC;
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
