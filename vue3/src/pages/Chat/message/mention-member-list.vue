<template>
  <div class="header">
    <Icon @tap="onClosePopup" class="close" color="#000" type="icon-jiantou" />
    <div class="title">{{ $t('chooseMentionText') }}</div>
  </div>
  <div class="member-list-content">
    <div class="member-item" @tap="() => handleItemClick({
      account: AT_ALL_ACCOUNT,
      appellation: $t('teamAll')
    })">
      <Icon class="contact-item-icon contact-group-icon" :size="20" type="icon-team" color="#fff" />
      <span class="member-name">
        {{
          $t('teamAll')
        }}
      </span>
    </div>
    <div 
      class="member-item" 
      v-for=" member in groupMembers" 
      :key="member.account"
      @tap="() => handleItemClick({
        account: member.account,
        appellation: store.uiStore.getAppellation({
          account: member.account,
          teamId: member.teamId,
          ignoreAlias: true,
        })
      })"
    >
      <Avatar :account="member.account"/>
      <div class="member-name"> 
        {{
          store.uiStore.getAppellation({
            account: member.account,
            teamId: member.teamId,
          })
        }}
      </div>
      <div v-if="member.type === 'owner'" class="owner">{{ $t('teamOwner') }}</div>
      <div v-else-if="member.type === 'manager'" class="manager">{{ $t('teamManager') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
import type { TeamMember } from '@xkit-yx/im-store'
import { autorun } from 'mobx'
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'
import { AT_ALL_ACCOUNT } from '../../../utils/constants'
const props = defineProps<{
  teamId: string
  handleItemClick: (member: TeamMember | { appellation: string }) => void
  onClosePopup: () => void
}>()
const store = uni.$UIKitStore
const groupMembers = ref<TeamMember[]>([])

const sortGroupMembers = (members, teamId) => {
  const owner = members.filter((item) => item.type === 'owner')
  const manager = members.filter((item) => item.type === 'manager').sort((a, b) => a.joinTime - b.joinTime)
  const other = members.filter(
    (item) => !['owner', 'manager'].includes(item.type)
  ).sort((a, b) => a.joinTime - b.joinTime)
  const result = [...owner, ...manager, ...other].map(item => {
    return { ...item, name: store.uiStore.getAppellation({ account: item.account, teamId }) }
  })
  return result
}

autorun(() => {
  store.teamMemberStore.getTeamMemberActive(props.teamId).then((res) => {
    const _groupMember = res.filter((item) => item.account !== store.userStore.myUserInfo.account)
    groupMembers.value = sortGroupMembers(_groupMember, props.teamId)
  })
})
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';

.title{
  text-align: center;
  font-weight: 500;
  margin: 0 auto;
}
.header{
  display: flex;
  align-items: center;
  height: 60px;
}
.close{
  transform: rotate(90deg);
  margin-left: 15px;
}

.member-list-content {
  height: 1000rpx;
  box-sizing: border-box;
  overflow-y: auto;
}
.member-item {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 8px 20px;
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
