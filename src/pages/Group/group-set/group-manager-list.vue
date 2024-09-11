<template>
  <div>
    <NavBar :title="t('teamManager')" />
    <div v-if="isGroupOwner" class="add-item" @tap="goAddManager">
      <span class="add-item-label">{{ t('addMemberText') }}</span>
      <Icon color="#999" type="icon-jiantou" />
    </div>
    <div v-if="groupMembers.length">
      <div
        class="group-item"
        v-for="item in groupMembers"
        :key="item.accountId"
      >
        <div class="group-member">
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

<script lang="ts" setup>
import Avatar from '../../../components/Avatar.vue'
import { ref, computed, onUnmounted } from '../../../utils/transformVue'
import NavBar from '../../../components/NavBar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { autorun } from 'mobx'
import { deepClone } from '../../../utils'
import { t } from '../../../utils/i18n'
import Appellation from '../../../components/Appellation.vue'
import Icon from '../../../components/Icon.vue'
import Empty from '../../../components/Empty.vue'
import { customNavigateTo } from '../../../utils/customNavigate'
import {
  V2NIMTeam,
  V2NIMTeamMember,
} from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMTeamService'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK'

const groupMembers = ref<V2NIMTeamMember[]>([])
const team = ref<V2NIMTeam>()
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

      uni.$UIKitStore.teamStore
        .updateTeamMemberRoleActive({
          teamId,
          accounts: [account],
          role: V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_NORMAL,
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
            case 191004:
              uni.showToast({
                title: t('userNotInTeam'),
                icon: 'error',
              })
              break
            // 没权限
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
}

const isGroupOwner = computed(() => {
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return (
    (team.value ? team.value.ownerAccountId : '') ===
    (myUser ? myUser.accountId : '')
  )
})
let uninstallGroupMembersWatch = () => {}
onLoad((props) => {
  teamId = props ? props.id : ''

  uninstallGroupMembersWatch = autorun(() => {
    team.value = deepClone(uni.$UIKitStore.teamStore.teams.get(teamId))
    groupMembers.value = deepClone(
      uni.$UIKitStore.teamMemberStore
        .getTeamMember(teamId)
        .filter(
          (item) =>
            item.memberRole ===
            V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
        )
        .sort((a, b) => a.joinTime - b.joinTime)
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
