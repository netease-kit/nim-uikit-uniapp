<template>
  <div>
    <NavBar :title="t('teamManager')" />
    <div v-if="isGroupOwner" class="add-item" @tap="goAddManager">
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
        </div>
        <div
          v-if="isGroupOwner"
          class="btn-remove"
          @tap="
            () => {
              removeTeamManager(item.account)
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

const goAddManager = () => {
  customNavigateTo({
    url: `/pages/Group/group-set/add-group-manager?id=${teamId}`,
  })
}

const removeTeamManager = (account: string) => {
  uni.showModal({
    title: t('confirmRemoveText'),
    content: t('removeManagerExplain'),
    confirmText: t('removeText'),
    success: (res) => {
      if (res.cancel) return
      // @ts-ignore
      uni.$UIKitStore.teamStore
        .removeTeamManagersActive({
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
let uninstallGroupMembersWatch = () => {}
onLoad((props) => {
  teamId = props ? props.id : ''

  uninstallGroupMembersWatch = autorun(() => {
    // @ts-ignore
    team.value = deepClone(uni.$UIKitStore.teamStore.teams.get(teamId))
    groupMembers.value = deepClone(
      // @ts-ignore
      uni.$UIKitStore.teamMemberStore
        .getTeamMember(teamId)
        .filter((item: any) => item.type === 'manager')
        .sort((a: any, b: any) => a.joinTime - b.joinTime)
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

  .group-member {
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
