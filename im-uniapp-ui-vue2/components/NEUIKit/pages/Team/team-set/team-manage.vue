<template>
  <div>
    <NavBar :title="t('teamManagerText')" />
    <div class="team-set-container" v-if="team">
      <div class="team-set-card">
        <div class="team-set-item">
          <div class="team-members-info-item" @tap="goTeamManagerList">
            <div class="team-members-info">
              <div class="team-info-title">
                {{ t('teamManagerSettingText') }}
              </div>
              <div class="team-info-subtitle">
                {{ teamManagerNum }}
              </div>
            </div>
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </div>
      </div>
      <div class="team-set-card">
        <picker
          @change="onUpdateTeamMode"
          :value="updateTeamMode.value"
          :range="rangeArr"
        >
          <div class="team-set-item team-set-item-flex">
            <div>
              <div>{{ t('updateTeamInfoText') }}</div>
              <div class="team-item-value-text">{{ updateTeamMode.text }}</div>
            </div>
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </picker>
        <picker
          @change="onUpdateInviteMode"
          :value="inviteMode.value"
          :range="rangeArr"
        >
          <div class="team-set-item team-set-item-flex">
            <div>
              <div>{{ t('updateTeamInviteText') }}</div>
              <div class="team-item-value-text">{{ inviteMode.text }}</div>
            </div>
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </picker>
        <picker
          @change="onUpdateExt"
          :value="teamAtMode.value"
          :range="rangeArr"
        >
          <div class="team-set-item team-set-item-flex">
            <div>
              <div>{{ t('updateTeamAtText') }}</div>
              <div class="team-item-value-text">{{ teamAtMode.text }}</div>
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

<script>
import NavBar from '../../../components/NavBar.vue'
import Icon from '../../../components/Icon.vue'
import { autorun } from "../../../utils/store.js"
import { t } from '../../../utils/i18n'
import { customNavigateTo } from '../../../utils/customNavigate'
import { ALLOW_AT } from '../../../utils/constants'
import { V2NIMConst } from '../../../utils/nim'
import { toRenderSafeData } from '../../../utils'

const rangeArr = [t('teamAll'), t('teamOwnerAndManagerText')]

export default {
  components: {
    NavBar,
    Icon,
  },
  data() {
    return {
      V2NIMConst,
      rangeArr,
      teamId: '',
      team: undefined,
      teamMembers: [],
      uninstallTeamWatch: function () {},
    }
  },
  computed: {
    isGroupOwner() {
      const myUser = uni.$UIKitStore.userStore.myUserInfo
      return (this.team ? this.team.ownerAccountId : '') === (myUser ? myUser.accountId : '')
    },
    teamManagerNum() {
      return this.teamMembers.filter(
        (item) =>
          item.memberRole ===
          V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
      ).length
    },
    updateTeamMode() {
      return {
        value:
          this.team?.updateInfoMode ===
          V2NIMConst.V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER
            ? 1
            : 0,
        text:
          this.team?.updateInfoMode ===
          V2NIMConst.V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER
            ? t('teamOwnerAndManagerText')
            : t('teamAll'),
      }
    },
    inviteMode() {
      return {
        value:
          this.team?.inviteMode ===
          V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_MANAGER
            ? 1
            : 0,
        text:
          this.team?.inviteMode ===
          V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_MANAGER
            ? t('teamOwnerAndManagerText')
            : t('teamAll'),
      }
    },
    teamAtMode() {
      let ext = {}
      try {
        ext = JSON.parse(this.team?.serverExtension || '{}')
      } catch (error) {
        // ignore
      }
      return {
        value: ext[ALLOW_AT] === 'manager' ? 1 : 0,
        text: ext[ALLOW_AT] === 'manager' ? t('teamOwnerAndManagerText') : t('teamAll'),
      }
    },
  },
  onLoad(option) {
    this.teamId = option ? option.id || '' : ''
    this.uninstallTeamWatch = autorun(() => {
      if (this.teamId) {
        this.team = toRenderSafeData(
          uni.$UIKitStore.teamStore.teams.get(this.teamId)
        )
        this.teamMembers = toRenderSafeData(uni.$UIKitStore.teamMemberStore.getTeamMember(
          this.teamId
        )) || []
      }
    })
  },
  beforeDestroy() {
    this.uninstallTeamWatch()
  },
  methods: {
    t,
    onUpdateTeamMode(e) {
      this.onUpdateTeamInfo(
        'updateInfoMode',
        e.detail.value == 0 ? 'all' : 'manager'
      )
    },
    onUpdateInviteMode(e) {
      this.onUpdateTeamInfo('inviteMode', e.detail.value == 0 ? 'all' : 'manager')
    },
    onUpdateExt(e) {
      this.onUpdateTeamInfo(
        'serverExtension',
        e.detail.value == 0 ? 'all' : 'manager'
      )
    },
    async onUpdateTeamInfo(key, value) {
      const info = {}
      switch (key) {
        case 'updateInfoMode':
          info.updateInfoMode =
            value === 'all'
              ? V2NIMConst.V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_ALL
              : V2NIMConst.V2NIMTeamUpdateInfoMode
                  .V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER
          break
        case 'inviteMode':
          info.inviteMode =
            value === 'all'
              ? V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_ALL
              : V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_MANAGER
          break
        case 'serverExtension': {
          let ext = {}
          try {
            ext = JSON.parse(this.team?.serverExtension || '{}')
          } catch (error) {
            // ignore
          }
          ext[ALLOW_AT] = value
          info.serverExtension = JSON.stringify(ext)
          break
        }
      }

      try {
        await uni.$UIKitStore.teamStore.updateTeamActive({
          teamId: this.teamId,
          info,
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
              title: t('updateTeamFailedText'),
              icon: 'error',
            })
            break
        }
      }
    },
    goTransformTeam() {
      customNavigateTo({
        url: `/pages/Team/team-set/transform-team?id=${this.teamId}`,
      })
    },
    goTeamManagerList() {
      customNavigateTo({
        url: `/pages/Team/team-set/team-manager-list?id=${this.teamId}`,
      })
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

.group-set-button {
  text-align: center;
  background: #ffffff;
  border-radius: 8px;
  color: #e6605c;
  height: 40px;
  line-height: 40px;
}

.team-item-value-text {
  color: #999;
  font-size: 14px;
}

.team-set-item {
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

.group-info-item {
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

.group-members-item {
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

  .team-info-subtitle {
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
