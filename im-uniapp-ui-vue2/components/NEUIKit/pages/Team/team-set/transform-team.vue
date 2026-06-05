<template>
  <div>
    <NavBar :title="t('transformTeam')" />
    <div class="subtitle">{{ t('transformTeamText') }}</div>
    <div
      class="member-item"
      v-for="item in teamMemberList"
      :key="item.accountId"
      @tap="onTapItem(item)"
    >
      <Avatar :account="item.accountId" :teamId="item.teamId" size="32" />
      <Appellation
        class="user-name"
        :account="item.accountId"
        :teamId="item.teamId"
        :fontSize="14"
      />
      <div
        v-if="
          item.memberRole ===
          V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_OWNER
        "
        class="user-tag"
      >
        {{ t('teamOwner') }}
      </div>
      <div
        v-else-if="
          item.memberRole ===
          V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
        "
        class="user-tag"
      >
        {{ t('manager') }}
      </div>
    </div>
  </div>
</template>

<script>
import Avatar from '../../../components/Avatar.vue'
import Appellation from '../../../components/Appellation.vue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { autorun } from "../../../utils/store.js"
import { customRedirectTo } from '../../../utils/customNavigate'
import { V2NIMConst } from '../../../utils/nim'
import { toRenderSafeData } from '../../../utils'

export default {
  components: {
    Avatar,
    Appellation,
    NavBar,
  },
  data() {
    return {
      V2NIMConst,
      teamMemberList: [],
      teamId: '',
      teamMembersWatch: function () {},
    }
  },
  onLoad(props) {
    this.teamId = props ? props.id || '' : ''

    this.teamMembersWatch = autorun(() => {
      const members = uni.$UIKitStore.teamMemberStore
        .getTeamMember(this.teamId)
        .filter((item) => {
          return item.accountId !== uni.$UIKitStore.userStore.myUserInfo.accountId
        })

      const manager = members
        .filter(
          (item) =>
            item.memberRole ===
            V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
        )
        .sort((a, b) => a.joinTime - b.joinTime)

      const other = members
        .filter(
          (item) =>
            ![
              V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_OWNER,
              V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER,
            ].includes(item.memberRole)
        )
        .sort((a, b) => a.joinTime - b.joinTime)

      this.teamMemberList = toRenderSafeData([...manager, ...other]) || []
    })
  },
  beforeDestroy() {
    this.teamMembersWatch()
  },
  methods: {
    t,
    onTapItem(item) {
      const nick = uni.$UIKitStore.uiStore.getAppellation({
        account: item.accountId,
        teamId: item.teamId,
      })
      uni.showModal({
        title: t('transformTeam'),
        content: `${t('transformTeamContent')} ${nick} ${t('doubt')}`,
        success: (res) => {
          if (res.confirm) {
            uni.$UIKitStore.teamStore
              .transferTeamActive({
                teamId: this.teamId,
                account: item.accountId,
                leave: false,
              })
              .then(() => {
                uni.showToast({
                  title: t('transformTeamSuccessText'),
                  icon: 'none',
                })
                customRedirectTo({
                  url: `/pages/Team/team-set/index?id=${this.teamId}`,
                })
              })
              .catch((error) => {
                switch (error?.code) {
                  case 109427:
                    uni.showToast({
                      title: t('noPermission'),
                      icon: 'error',
                    })
                    break
                  default:
                    uni.showToast({
                      title: t('transformTeamFailedText'),
                      icon: 'error',
                    })
                    break
                }
              })
          }
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.subtitle {
  padding: 16px 20px;
  font-size: 16px;
  color: #333;
}

.member-item {
  padding: 8px 20px;
  display: flex;
  align-items: center;
}

.user-name {
  margin-left: 12px;
  margin-right: 8px;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-tag {
  padding: 4px 8px;
  background: #f7f7f7;

  border: 1px solid #d6d8db;
  border-radius: 50px;
  color: #656a72;
  font-size: 12px;
  margin-left: 8px;
  white-space: nowrap;
  word-break: keep-all;
}
</style>
