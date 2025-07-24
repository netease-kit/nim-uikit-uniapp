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

<script lang="ts" setup>
import Avatar from '../../../components/Avatar.vue'
import { ref, computed, onUnmounted } from 'vue'
import NavBar from '../../../components/NavBar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { autorun } from 'mobx'
import { t } from '../../../utils/i18n'
import Appellation from '../../../components/Appellation.vue'
import Icon from '../../../components/Icon.vue'
import Empty from '../../../components/Empty.vue'
import { customNavigateTo } from '../../../utils/customNavigate'

import { V2NIMConst } from '../../../utils/nim'
import {
  V2NIMTeam,
  V2NIMTeamMember,
} from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMTeamService'

const teamMembers = ref<V2NIMTeamMember[]>([])
const team = ref<V2NIMTeam>()
let teamId = ''

/** 添加群管理员 */
const goAddManager = () => {
  customNavigateTo({
    url: `/pages/Team/team-set/add-team-manager?id=${teamId}`,
  })
}

/** 移除群管理员 */
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
            icon: 'none',
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

/** 是否是群主 */
const isGroupOwner = computed(() => {
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return (
    (team.value ? team.value.ownerAccountId : '') ===
    (myUser ? myUser.accountId : '')
  )
})
// 监听群成员变化
let teamMembersWatch = () => {}

onLoad((props) => {
  teamId = props ? props.id : ''

  teamMembersWatch = autorun(() => {
    team.value = uni.$UIKitStore.teamStore.teams.get(teamId)
    teamMembers.value = uni.$UIKitStore.teamMemberStore
      .getTeamMember(teamId)
      .filter(
        (item) =>
          item.memberRole ===
          V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
      )
      .sort((a, b) => a.joinTime - b.joinTime)
  })
})

onUnmounted(() => {
  teamMembersWatch()
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
