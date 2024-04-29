<template>
  <div>
    <NavBar :title="t('teamMemberText')" />
    <div v-if="isShowAddBtn" class="add-item" @tap="goAddMember">
      <span class="add-item-label">{{ t('addMemberText') }}</span>
      <Icon color="#999" type="icon-jiantou" />
    </div>
    <div v-if="groupMembers.length">
      <div class="group-item" v-for="item in groupMembers" :key="item.account">
        <div class="group-member">
          <Avatar
            :goto-user-card="true"
            :account="item.account"
            :team-id="item.teamId"
            size="32"
          />
          <Appellation
            class="user-name"
            :account="item.account"
            :team-id="item.teamId"
            :font-size="14"
          />
          <div v-if="item.type === 'owner'" class="user-tag">
            {{ t('teamOwner') }}
          </div>
          <div v-else-if="item.type === 'manager'" class="user-tag">
            {{ t('manager') }}
          </div>
        </div>
        <div
          v-if="isShowRemoveBtn(item)"
          class="btn-remove"
          @tap="
            () => {
              removeTeamMember(item.account)
            }
          "
        >
          {{ t('removeText') }}
        </div>
      </div>
    </div>
    <Empty v-else :text="t('noTeamMember')" />
  </div>
</template>

<script lang="ts" setup>
import Avatar from '../../../components/Avatar.vue'
import { ref, computed, onUnmounted } from '../../../utils/transformVue'
import NavBar from '../../../components/NavBar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { autorun } from 'mobx'
import { deepClone } from '../../../utils'
import { t } from '../../../utils/i18n'
import type { TeamMember, Team } from '@xkit-yx/im-store'
import Appellation from '../../../components/Appellation.vue'
import Icon from '../../../components/Icon.vue'
import Empty from '../../../components/Empty.vue'
import { customNavigateTo } from '../../../utils/customNavigate'

const groupMembers = ref<TeamMember[]>([])
const team = ref<Team>()
let teamId = ''

const goAddMember = () => {
  customNavigateTo({
    url: `/pages/Group/group-add/index?teamId=${teamId}`,
  })
}

const removeTeamMember = (account: string) => {
  uni.showModal({
    title: t('confirmRemoveText'),
    content: t('removeMemberExplain'),
    confirmText: t('removeText'),
    success: (res) => {
      if (res.cancel) return
      // @ts-ignore
      uni.$UIKitStore.teamMemberStore
        .removeTeamMemberActive({
          teamId,
          accounts: [account],
        })
        .then(() => {
          uni.showToast({
            title: t('removeSuccessText'),
            icon: 'success',
          })
        })
        .catch((error: any) => {
          switch (error?.code) {
            // 操作的人不在群中
            case 804:
              uni.showToast({
                title: t('userNotInTeam'),
                icon: 'error',
              })
              break
            // 没权限
            case 802:
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
}

const isGroupOwner = computed(() => {
  // @ts-ignore
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return (team.value ? team.value.owner : '') === (myUser ? myUser.account : '')
})

const isGroupManager = computed(() => {
  // @ts-ignore
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return groupMembers.value
    .filter((item) => item.type === 'manager')
    .some((member) => member.account === (myUser ? myUser.account : ''))
})

const isShowAddBtn = computed(() => {
  if (team.value?.inviteMode === 'all') {
    return true
  }
  return isGroupOwner.value || isGroupManager.value
})

const isShowRemoveBtn = (target: TeamMember) => {
  // @ts-ignore
  if (target.account === uni.$UIKitStore.userStore.myUserInfo.account) {
    return false
  }
  if (isGroupOwner.value) {
    return true
  }
  if (isGroupManager.value) {
    return target.type !== 'owner' && target.type !== 'manager'
  }
  return false
}

let uninstallGroupMembersWatch = () => {}

onLoad((props) => {
  teamId = props ? props.teamId : ''

  uninstallGroupMembersWatch = autorun(() => {
    // @ts-ignore
    team.value = deepClone(uni.$UIKitStore.teamStore.teams.get(teamId))

    // 对群成员进行排序，群主在前，管理员在后，其他成员按加入时间排序
    const sortGroupMembers = (members: any) => {
      const owner = members.filter((item: any) => item.type === 'owner')
      const manager = members
        .filter((item: any) => item.type === 'manager')
        .sort((a: any, b: any) => a.joinTime - b.joinTime)
      const other = members
        .filter((item: any) => !['owner', 'manager'].includes(item.type))
        .sort((a: any, b: any) => a.joinTime - b.joinTime)
      return [...owner, ...manager, ...other]
    }

    groupMembers.value = deepClone(
      // @ts-ignore
      sortGroupMembers(uni.$UIKitStore.teamMemberStore.getTeamMember(teamId))
    )
  })
})

onUnmounted(() => {
  uninstallGroupMembersWatch()
})
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

.group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  padding: 8px 0;
  border-top: 1px solid #f5f8fc;

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

  .group-member {
    display: flex;
    align-items: center;
    width: 70%;
  }

  .user-name {
    margin-left: 12px;
    max-width: 70%;
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
