<template>
  <div>
    <NavBar
      :title="isDiscussion ? t('discussionMemberText') : t('teamMemberText')"
    />
    <div v-if="isShowAddBtn" class="add-item" @tap="goAddMember">
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
          <div
            v-if="
              item.memberRole ===
                V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_OWNER &&
              !isDiscussion
            "
            class="user-tag"
          >
            {{ t('teamOwner') }}
          </div>
          <div
            v-else-if="
              item.memberRole ===
                V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER &&
              !isDiscussion
            "
            class="user-tag"
          >
            {{ t('manager') }}
          </div>
        </div>
        <div
          v-if="isShowRemoveBtn(item)"
          class="btn-remove"
          @tap="
            () => {
              removeTeamMember(item.accountId)
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
import { ref, computed, onUnmounted } from 'vue'
import NavBar from '../../../components/NavBar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { autorun } from 'mobx'
import { t } from '../../../utils/i18n'
import Appellation from '../../../components/Appellation.vue'
import Icon from '../../../components/Icon.vue'
import Empty from '../../../components/Empty.vue'
import { customNavigateTo } from '../../../utils/customNavigate'
import {
  V2NIMTeam,
  V2NIMTeamMember,
} from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMTeamService'
import { V2NIMConst } from '../../../utils/nim'
import { isDiscussionFunc } from '../../../utils'

const groupMembers = ref<V2NIMTeamMember[]>([])
const team = ref<V2NIMTeam>()
let teamId = ''

/** 是否是讨论组 */
const isDiscussion = computed(() => {
  let serverExtension = team.value?.serverExtension
  return isDiscussionFunc(serverExtension)
})

// 跳转到添加群成员页面
const goAddMember = () => {
  customNavigateTo({
    url: `/pages/Team/team-add/index?teamId=${teamId}`,
  })
}

// 移除群成员
const removeTeamMember = (account: string) => {
  uni.showModal({
    title: t('confirmRemoveText'),
    content: t('removeMemberExplain'),
    confirmText: t('removeText'),
    success: (res) => {
      if (res.cancel) return

      uni.$UIKitStore.teamMemberStore
        .removeTeamMemberActive({
          teamId,
          accounts: [account],
        })
        .then(() => {
          uni.showToast({
            title: t('removeSuccessText'),
            icon: 'none',
          })
        })
        .catch((error: any) => {
          switch (error?.code) {
            // 没权限
            case 109306:
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

// 是否是群主
const isGroupOwner = computed(() => {
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return (
    (team.value ? team.value.ownerAccountId : '') ===
    (myUser ? myUser.accountId : '')
  )
})

// 是否是管理员
const isGroupManager = computed(() => {
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return groupMembers.value
    .filter(
      (item) =>
        item.memberRole ===
        V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
    )
    .some((member) => member.accountId === (myUser ? myUser.accountId : ''))
})

// 是否可以添加成员
const isShowAddBtn = computed(() => {
  if (
    team.value?.inviteMode ===
    V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_ALL
  ) {
    return true
  }
  return isGroupOwner.value || isGroupManager.value
})

// 是否可以移除成员
const isShowRemoveBtn = (target: V2NIMTeamMember) => {
  if (isDiscussion.value) {
    return false
  }

  if (target.accountId === uni.$UIKitStore.userStore.myUserInfo.accountId) {
    return false
  }

  if (isGroupOwner.value) {
    return true
  }

  if (isGroupManager.value) {
    return (
      target.memberRole !==
        V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_OWNER &&
      target.memberRole !==
        V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
    )
  }
  return false
}

let groupMembersWatch = () => {}

onLoad((props) => {
  teamId = props ? props.teamId : ''

  groupMembersWatch = autorun(() => {
    team.value = uni.$UIKitStore.teamStore.teams.get(teamId)

    // 对群成员进行排序，群主在前，管理员在后，其他成员按加入时间排序
    const sortGroupMembers = (members: V2NIMTeamMember[]) => {
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
      return [...owner, ...manager, ...other]
    }

    groupMembers.value = sortGroupMembers(
      uni.$UIKitStore.teamMemberStore.getTeamMember(teamId)
    )
  })
})

onUnmounted(() => {
  groupMembersWatch()
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
