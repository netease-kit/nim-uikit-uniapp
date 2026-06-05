<template>
  <div class="mention-member-list-wrapper">
    <div class="header">
      <div @tap="onClosePopup" class="close">
        <Icon color="#000" type="icon-jiantou" />
      </div>
      <div class="title">{{ t('chooseMentionText') }}</div>
    </div>
    <div class="member-list-content">
      <div
        v-if="allowAtAll"
        class="member-item"
        @tap="
          () =>
            handleItemClick({
              accountId: AT_ALL_ACCOUNT,
              appellation: t('teamAll'),
            })
        "
      >
        <Icon :size="42" type="icon-team2" color="#fff" />
        <span class="member-name">
          {{ t('teamAll') }}
        </span>
      </div>
      <div
        class="member-item"
        v-for="member in teamMembersWithoutSelf"
        :key="member.accountId"
        @tap="() => handleItemClick(member)"
      >
        <Avatar :account="member.accountId" />
        <div class="member-name">
          <Appellation
            :account="member.accountId"
            :teamId="member.teamId"
          ></Appellation>
        </div>
        <div
          v-if="
            member.memberRole ===
            V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_OWNER
          "
          class="owner"
        >
          {{ t('teamOwner') }}
        </div>
        <div
          v-else-if="
            member.memberRole ===
            V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
          "
          class="manager"
        >
          {{ t('teamManager') }}
        </div>
      </div>
      <div class="member-item-block"></div>
    </div>
  </div>
</template>

<script>
/**@ 列表组件，用于在群里@ 成员列表 */
import { t } from '../../../utils/i18n'
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'
import { ALLOW_AT, AT_ALL_ACCOUNT, events } from '../../../utils/constants'
import Appellation from '../../../components/Appellation.vue'
import { V2NIMConst } from '../../../utils/nim'

export default {
  components: {
    Avatar,
    Icon,
    Appellation,
  },
  props: {
    teamId: {
      type: String,
      default: '',
    },
    team: {
      type: Object,
      default: undefined,
    },
    teamMembers: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      V2NIMConst,
      AT_ALL_ACCOUNT,
    }
  },
  computed: {
    sortedTeamMembers() {
      return this.sortGroupMembers(this.teamMembers, this.teamId)
    },
    teamMembersWithoutSelf() {
      return this.sortedTeamMembers.filter(
        (item) => item.accountId !== uni.$UIKitStore.userStore.myUserInfo.accountId
      )
    },
    isGroupOwner() {
      const myUser = uni.$UIKitStore.userStore.myUserInfo
      return (this.team ? this.team.ownerAccountId : '') ===
        (myUser ? myUser.accountId : '')
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
    allowAtAll() {
      let ext = {}
      try {
        ext = JSON.parse(this.team?.serverExtension || '{}')
      } catch (error) {
        //
      }
      if (ext[ALLOW_AT] === 'manager') {
        return this.isGroupOwner || this.isGroupManager
      }
      return true
    },
  },
  methods: {
    t,
    sortGroupMembers(members, teamId) {
      const owner = members.filter(
        (item) =>
          item.memberRole ===
          V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_OWNER
      )
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
      return [...owner, ...manager, ...other].map((item) => {
        return {
          ...item,
          name: uni.$UIKitStore.uiStore.getAppellation({
            account: item.accountId,
            teamId,
          }),
        }
      })
    },
    handleItemClick(member) {
      const nextMember =
        member.accountId === AT_ALL_ACCOUNT
          ? member
          : {
              accountId: member.accountId,
              appellation: uni.$UIKitStore.uiStore.getAppellation({
                account: member.accountId,
                teamId: member.teamId,
                ignoreAlias: true,
              }),
            }
      uni.$emit(events.HANDLE_AIT_MEMBER, nextMember)
    },
    onClosePopup() {
      uni.$emit(events.CLOSE_AIT_POPUP)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';

.mention-member-list-wrapper {
  z-index: 9999999;
  touch-action: none;
}

.title {
  text-align: center;
  font-weight: 500;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  height: 60px;
}

.close {
  transform: rotate(90deg);
  margin-left: 15px;
}

.member-list-content {
  height: 70vh;
  box-sizing: border-box;
  overflow-y: auto;
}

.member-item {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 8px 20px;
}

.member-item-block {
  height: 100px;
}

.member-name {
  margin-left: 10px;
  font-size: 16px;
  padding-right: 20px;
  color: #333333;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-item-icon {
  height: 42px;
  width: 42px;
  border-radius: 50%;
  text-align: center;
  line-height: 39px;
  font-size: 20px;
  color: #fff;
  background-color: #53c3f4;
}

.owner,
.manager {
  color: rgb(6, 155, 235);
  background-color: rgb(210, 229, 246);
  height: 20px;
  line-height: 20px;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  padding: 2px 4px;
  position: relative;
  right: 10px;
}
</style>
