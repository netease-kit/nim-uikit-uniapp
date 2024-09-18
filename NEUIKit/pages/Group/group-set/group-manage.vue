<template>
  <div>
    <NavBar :title="t('teamManagerText')" />
    <div class="group-set-container" v-if="team">
      <div class="group-set-card">
        <div class="group-set-item">
          <div class="group-members-info-item" @tap="goTeamManagerList">
            <div class="group-members-info">
              <div class="group-info-title">
                {{ t('teamManagerSettingText') }}
              </div>
              <div class="group-info-subtitle">
                {{ teamManagerNum }}
              </div>
            </div>
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </div>
      </div>
      <div class="group-set-card">
        <picker
          @change="onUpdateTeamMode"
          :value="updateTeamMode.value"
          :range="rangeArr"
        >
          <div class="group-set-item group-set-item-flex">
            <div>
              <div>{{ t('updateTeamInfoText') }}</div>
              <div class="group-item-value-text">{{ updateTeamMode.text }}</div>
            </div>
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </picker>
        <picker
          @change="onUpdateInviteMode"
          :value="inviteMode.value"
          :range="rangeArr"
        >
          <div class="group-set-item group-set-item-flex">
            <div>
              <div>{{ t('updateTeamInviteText') }}</div>
              <div class="group-item-value-text">{{ inviteMode.text }}</div>
            </div>
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </picker>
        <picker
          @change="onUpdateExt"
          :value="teamAtMode.value"
          :range="rangeArr"
        >
          <div class="group-set-item group-set-item-flex">
            <div>
              <div>{{ t('updateTeamAtText') }}</div>
              <div class="group-item-value-text">{{ teamAtMode.text }}</div>
            </div>
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </picker>
      </div>
      <div class="group-set-button" v-if="isGroupOwner" @tap="goTransformTeam">
        {{ t('transformTeam') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue'
import Icon from '../../../components/Icon.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed, onUnmounted } from '../../../utils/transformVue'
import { autorun } from 'mobx'
import { t } from '../../../utils/i18n'
import { deepClone } from '../../../utils'
import { customNavigateTo } from '../../../utils/customNavigate'
import { ALLOW_AT } from '../../../utils/constants'
import {
  V2NIMTeam,
  V2NIMTeamMember,
} from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMTeamService'
import { YxServerExt } from '@xkit-yx/im-store-v2/dist/types/types'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK'

const rangeArr = [t('teamAll'), t('teamOwnerAndManagerText')]

let teamId = ''
const team = ref<V2NIMTeam>()
const teamMembers = ref<V2NIMTeamMember[]>([])

const isGroupOwner = computed(() => {
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return (
    (team.value ? team.value.ownerAccountId : '') ===
    (myUser ? myUser.accountId : '')
  )
})

const isGroupManager = computed(() => {
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return teamMembers.value
    .filter(
      (item) =>
        item.memberRole ===
        V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
    )
    .some((member) => member.accountId === (myUser ? myUser.accountId : ''))
})

const teamManagerNum = computed(() => {
  return teamMembers.value.filter(
    (item) =>
      item.memberRole ===
      V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
  ).length
})

const updateTeamMode = computed(() => {
  return {
    value:
      team.value?.updateInfoMode ===
      V2NIMConst.V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER
        ? 1
        : 0,
    text:
      team.value?.updateInfoMode ===
      V2NIMConst.V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER
        ? t('teamOwnerAndManagerText')
        : t('teamAll'),
  }
})

const inviteMode = computed(() => {
  return {
    value:
      team.value?.inviteMode ===
      V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_MANAGER
        ? 1
        : 0,
    text:
      team.value?.inviteMode ===
      V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_MANAGER
        ? t('teamOwnerAndManagerText')
        : t('teamAll'),
  }
})

const teamAtMode = computed(() => {
  let ext: YxServerExt = {}
  try {
    ext = JSON.parse(team.value?.serverExtension || '{}')
  } catch (error) {
    //
  }
  return {
    value: ext[ALLOW_AT] === 'manager' ? 1 : 0,
    text:
      ext[ALLOW_AT] === 'manager' ? t('teamOwnerAndManagerText') : t('teamAll'),
  }
})

const onUpdateTeamMode = (e: any) => {
  onUpdateTeamInfo('updateInfoMode', e.detail.value == 0 ? 'all' : 'manager')
}

const onUpdateInviteMode = (e: any) => {
  onUpdateTeamInfo('inviteMode', e.detail.value == 0 ? 'all' : 'manager')
}

const onUpdateExt = (e: any) => {
  onUpdateTeamInfo('serverExtension', e.detail.value == 0 ? 'all' : 'manager')
}

const onUpdateTeamInfo = async (
  key: keyof V2NIMTeam,
  value: 'manager' | 'all'
) => {
  const params: Partial<V2NIMTeam> = {
    teamId,
  }
  switch (key) {
    case 'updateInfoMode':
      params.updateInfoMode =
        value === 'all'
          ? V2NIMConst.V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_ALL
          : V2NIMConst.V2NIMTeamUpdateInfoMode
              .V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER
      break
    case 'inviteMode':
      params.inviteMode =
        value === 'all'
          ? V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_ALL
          : V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_MANAGER
      break
    case 'serverExtension': {
      let ext: YxServerExt = {}
      try {
        ext = JSON.parse(team.value?.serverExtension || '{}')
      } catch (error) {
        //
      }
      ext[ALLOW_AT] = value
      params.serverExtension = JSON.stringify(ext)
      break
    }
  }

  try {
    await uni.$UIKitStore.teamStore.updateTeamActive({ teamId, info: params })
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
          title: t('updateTeamFailedText'),
          icon: 'error',
        })
        break
    }
  }
}

const goTransformTeam = () => {
  customNavigateTo({
    url: `/pages/Group/group-set/transform-team?id=${teamId}`,
  })
}

const goTeamManagerList = () => {
  customNavigateTo({
    url: `/pages/Group/group-set/group-manager-list?id=${teamId}`,
  })
}
let uninstallTeamWatch = () => {}
onLoad((option) => {
  teamId = option ? option.id : ''
  autorun(() => {
    if (teamId) {
      team.value = deepClone(uni.$UIKitStore.teamStore.teams.get(teamId))
      teamMembers.value = deepClone(
        uni.$UIKitStore.teamMemberStore.getTeamMember(teamId)
      )
    }
  })
})

onUnmounted(() => {
  uninstallTeamWatch()
})
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

.group-item-value-text {
  color: #999;
  font-size: 14px;
}

.group-set-item {
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
