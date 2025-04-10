<template>
  <div class="mention-member-list-wrapper">
    <div class="header">
      <div @tap="onClosePopup" class="close">
        <Icon color="#000" type="icon-jiantou" />
      </div>
      <div class="title">{{ t('chooseMentionText') }}</div>
    </div>
    <div class="member-list-content">
      <div style="display: none">{{ teamExt }}</div>
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

<script lang="ts" setup>
/**@ 列表组件，用于在群里@ 成员列表 */
import {
  ref,
  computed,
  onUnmounted,
  withDefaults,
} from '../../../utils/transformVue'
import { t } from '../../../utils/i18n'
import { autorun } from 'mobx'
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'
import { ALLOW_AT, AT_ALL_ACCOUNT } from '../../../utils/constants'
import { events } from '../../../utils/constants'
import Appellation from '../../../components/Appellation.vue'

import {
  V2NIMTeam,
  V2NIMTeamMember,
} from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMTeamService'

import { V2NIMConst } from '../../../utils/nim'
import { MentionedMember } from './message-input.vue'

const props = withDefaults(
  defineProps<{
    teamId: string
  }>(),
  {}
)

const team = ref<V2NIMTeam>()
const teamMembers = ref<V2NIMTeamMember[]>([])
const teamExt = ref('')

/** 群成员 不包括当前登录用户 */
const teamMembersWithoutSelf = computed(() => {
  return teamMembers.value.filter(
    (item) => item.accountId !== uni.$UIKitStore.userStore.myUserInfo.accountId
  )
})

/** 是否是群主 */
const isGroupOwner = computed(() => {
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return (
    (team.value ? team.value.ownerAccountId : '') ===
    (myUser ? myUser.accountId : '')
  )
})

/** 是否是群管理员 */
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

/** 是否允许@ 所有人 */
const allowAtAll = computed(() => {
  let ext: any = {}
  try {
    ext = JSON.parse(teamExt.value || '{}')
  } catch (error) {
    //
  }
  if (ext[ALLOW_AT] === 'manager') {
    return isGroupOwner.value || isGroupManager.value
  }
  return true
})

/** 群成员排序 群主 > 管理员 > 成员 */
const sortGroupMembers = (members: V2NIMTeamMember[], teamId: string) => {
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
  const result = [...owner, ...manager, ...other].map((item) => {
    return {
      ...item,

      name: uni.$UIKitStore.uiStore.getAppellation({
        account: item.accountId,
        teamId,
      }),
    }
  })
  return result
}

/**
 * 群成员点击函数
 */
const handleItemClick = (member: V2NIMTeamMember | MentionedMember) => {
  const _member: MentionedMember =
    member.accountId === AT_ALL_ACCOUNT
      ? (member as MentionedMember)
      : {
          accountId: member.accountId,
          appellation: uni.$UIKitStore.uiStore.getAppellation({
            account: member.accountId,
            teamId: (member as V2NIMTeamMember).teamId,
            ignoreAlias: true,
          }),
        }
  uni.$emit(events.HANDLE_AIT_MEMBER, _member)
}

const onClosePopup = () => {
  uni.$emit(events.CLOSE_AIT_POPUP)
}
/** 监听群成员 */
const teamMemberWatch = autorun(() => {
  if (props.teamId) {
    teamMembers.value = sortGroupMembers(
      //@ts-ignore
      uni.$UIKitStore.teamMemberStore.getTeamMember(props.teamId),
      props.teamId
    )
    // @ts-ignore
    const _team: V2NIMTeam = uni.$UIKitStore.teamStore.teams.get(props.teamId)
    if (team) {
      team.value = _team
      teamExt.value = _team?.serverExtension || ''
    }
  }
})

onUnmounted(() => {
  /** 移除监听 */
  teamMemberWatch()
})
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
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
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
