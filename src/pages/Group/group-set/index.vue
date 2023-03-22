<template>
  <NavBar :title="$t('setText')" />
  <div class="group-set-container" v-if="team">
    <div class="group-set-card">
      <div class="group-set-item">
        <div class="group-info-item" @click="handleInfoClick">
          <Avatar :account="team.teamId" :avatar="team.avatar" />
          <div class="group-info-title">{{ team.name }}</div>
          <Icon class="more-icon" type="icon-jiantou" />
        </div>
      </div>
      <div class="group-set-item">
        <div class="group-members-item">
          <div class="group-members-info-item">
            <div class="group-members-info">
              <div class="group-info-title">{{ $t('teamMemberText') }}</div>
              <div class="group-info-subtitle">
                {{ team.memberNum }}
              </div>
            </div>
            <Icon @click="gotoTeamMember" class="more-icon" type="icon-jiantou" />
          </div>
          <div class="member-list">
            <div class="member-add">
              <Icon @click="addTeamMember" type="icon-tianjiaanniu" />
            </div>
            <div class="member-item" v-for="member in teamMembers" :key="member.account">
              <Avatar :account="member.account" size="32" :key="member.account" font-size="10"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="group-set-button" v-if="isGroupOwner" @click="showDismissConfirm">
      {{ $t('dismissTeamText') }}
    </div>
    <div class="group-set-button" v-else @click="showLeaveConfirm">
      {{ $t('leaveTeamTitle') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue';
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'

import type { Team, TeamMember } from '@xkit-yx/im-store';
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from 'vue';
import { autorun } from 'mobx';
import { t } from '../../../utils/i18n'
import { customNavigateTo } from '../../../utils/customNavigate';


const store = uni.$UIKitStore

let teamId = ''
const team = ref<Team>()
const teamMembers = ref<TeamMember[]>([])

const isGroupOwner = computed(() => {
  const myUser = store.userStore.myUserInfo
  return team.value?.owner === myUser?.account
})

const handleInfoClick = () => {
  customNavigateTo({
    url: `/pages/Group/group-set/group-info-edit?id=${teamId}`
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
          uni.navigateBack()
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
          uni.navigateBack()
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
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100%;
  overflow: hidden;
}

.group-set-container {
  height: 100%;
  background-color: #eff1f4;
  padding: 10px 20px;
}

.group-set-card {
  background: #FFFFFF;
  border-radius: 8px;
  padding-left: 16px;
}

.group-set-button {
  text-align: center;
  background: #FFFFFF;
  border-radius: 8px;
  color: #E6605C;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
}

.group-set-item {
  border-bottom: 1rpx solid #F5F8FC;
}

.group-set-item:nth-last-child {
  border: none;
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
