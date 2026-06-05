<template>
  <div>
    <NavBar :title="t('teamManager')" />
    <div v-if="isGroupOwner" class="add-item" @tap="goAddManager">
      <span class="add-item-label">{{ t('addMemberText') }}</span>
      <Icon color="#999" type="icon-jiantou" />
    </div>
    <div v-if="teamMembers.length">
      <div class="team-item" v-for="item in teamMembers" :key="item.accountId">
        <div class="team-member">
          <Avatar
            :goto-user-card="true"
            :account="item.accountId"
            :team-id="item.teamId"
            size="32"
          />
          <Appellation
            class="user-name"
            :account="item.accountId"
            :team-id="item.teamId"
            :font-size="14"
          />
        </div>
        <div
          v-if="isGroupOwner"
          class="btn-remove"
          @tap="
            () => {
              removeTeamManager(item.accountId)
            }
          "
        >
          {{ t('removeText') }}
        </div>
      </div>
    </div>
    <Empty v-else :text="t('noTeamManager')" />
  </div>
</template>

<script>
import Avatar from '../../../components/Avatar.vue'
import NavBar from '../../../components/NavBar.vue'
import { autorun } from "../../../utils/store.js"
import { t } from '../../../utils/i18n'
import Appellation from '../../../components/Appellation.vue'
import Icon from '../../../components/Icon.vue'
import Empty from '../../../components/Empty.vue'
import { customNavigateTo } from '../../../utils/customNavigate'
import { V2NIMConst } from '../../../utils/nim'
import { toRenderSafeData } from '../../../utils'

export default {
  components: {
    Avatar,
    NavBar,
    Appellation,
    Icon,
    Empty,
  },
  data() {
    return {
      V2NIMConst,
      teamMembers: [],
      team: undefined,
      teamId: '',
      teamMembersWatch: function () {},
    }
  },
  computed: {
    isGroupOwner() {
      const myUser = uni.$UIKitStore.userStore.myUserInfo
      return (this.team ? this.team.ownerAccountId : '') === (myUser ? myUser.accountId : '')
    },
  },
  onLoad(props) {
    this.teamId = props ? props.id || '' : ''

    this.teamMembersWatch = autorun(() => {
      this.team = toRenderSafeData(uni.$UIKitStore.teamStore.teams.get(this.teamId))
      const teamMembers = uni.$UIKitStore.teamMemberStore
        .getTeamMember(this.teamId)
        .filter(
          (item) =>
            item.memberRole ===
            V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
        )
        .sort((a, b) => a.joinTime - b.joinTime)
      this.teamMembers = toRenderSafeData(teamMembers) || []
    })
  },
  beforeDestroy() {
    this.teamMembersWatch()
  },
  methods: {
    t,
    goAddManager() {
      customNavigateTo({
        url: `/pages/Team/team-set/add-team-manager?id=${this.teamId}`,
      })
    },
    removeTeamManager(account) {
      uni.showModal({
        title: t('confirmRemoveText'),
        content: t('removeManagerExplain'),
        confirmText: t('removeText'),
        success: (res) => {
          if (res.cancel) return

          uni.$UIKitStore.teamStore
            .updateTeamMemberRoleActive({
              teamId: this.teamId,
              accounts: [account],
              role: V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_NORMAL,
            })
            .then(() => {
              uni.showToast({
                title: t('removeSuccessText'),
                icon: 'none',
              })
            })
            .catch((error) => {
              switch (error?.code) {
                case 191004:
                  uni.showToast({
                    title: t('userNotInTeam'),
                    icon: 'error',
                  })
                  break
                case 109432:
                  uni.showToast({
                    title: t('noPermission'),
                    icon: 'error',
                  })
                  break
                default:
                  uni.showToast({
                    title: t('removeFailText'),
                    icon: 'error',
                  })
                  break
              }
            })
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.add-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-top: 1px solid #f5f8fc;

  .add-item-label {
    color: #333;
    font-size: 16px;
  }
}

.team-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  padding: 8px 0;
  border-top: 1px solid #f5f8fc;

  .team-member {
    display: flex;
    align-items: center;
    width: 70%;
  }

  .user-name {
    margin-left: 12px;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .btn-remove {
    padding: 4px 8px;
    color: #e6605c;
    border-radius: 4px;
    border: 1px solid #e6605c;
    cursor: pointer;
    font-size: 14px;
  }
}
</style>
