<template>
  <div class="mention-member-list-wrapper">
    <div class="header">
    <div @tap="onClosePopup" class="close">
      <Icon color="#000" type="icon-jiantou" />
    </div>
    <div class="title">{{ t('chooseMentionText') }}</div>
    </div>
    <div class="member-list-content">
      <div class="member-item" @tap="() => handleItemClick({
        account: AT_ALL_ACCOUNT,
        appellation: t('teamAll')
      })">
        <Icon :size="42" type="icon-team2" color="#fff" />
        <span class="member-name">
          {{ t('teamAll') }}
        </span>
      </div>
      <div
        class="member-item"
        v-for=" member in groupMembers"
        :key="member.account"
        @tap="() => handleItemClick(member)"
      >
        <Avatar :account="member.account"/>
        <div class="member-name">
          <Appellation :account="member.account" :teamId="member.teamId"></Appellation>
        </div>
        <div v-if="member.type === 'owner'" class="owner">{{ t('teamOwner') }}</div>
        <div v-else-if="member.type === 'manager'" class="manager">{{ t('teamManager') }}</div>
      </div>
      <div class="member-item-block"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '../../../utils/transformVue'
import { t } from '../../../utils/i18n'
import type { TeamMember } from '@xkit-yx/im-store'
import { autorun } from 'mobx'
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'
import { AT_ALL_ACCOUNT } from '../../../utils/constants'
import { deepClone } from '../../../utils'
import { events } from '../../../utils/constants'
import Appellation from '../../../components/Appellation.vue'
const props = defineProps({
  teamId: {
    type: String,
    required: true
  }
})

const groupMembers = ref<TeamMember[]>([])

const sortGroupMembers = (members: TeamMember[] , teamId: string) => {
  const owner = members.filter((item) => item.type === 'owner')
  const manager = members.filter((item) => item.type === 'manager').sort((a, b) => a.joinTime - b.joinTime)
  const other = members.filter(
    (item) => !['owner', 'manager'].includes(item.type)
  ).sort((a, b) => a.joinTime - b.joinTime)
  const result = [...owner, ...manager, ...other].map(item => {
    return { ...item, name: uni.$UIKitStore.uiStore.getAppellation({ account: item.account, teamId }) }
  })
  return result
}

const handleItemClick = (member: any) => {
  const _member = member.account === AT_ALL_ACCOUNT ?
    member : {
      account: member.account,
      appellation: uni.$UIKitStore.uiStore.getAppellation({
        account: member.account,
        teamId: member.teamId,
        ignoreAlias: true,
      })
    };
  uni.$emit(events.HANDLE_AIT_MEMBER, _member)
}

const onClosePopup = () => {
  uni.$emit(events.CLOSE_AIT_POPUP)
}

autorun(() => {
  if(props.teamId) {
    uni.$UIKitStore.teamMemberStore.getTeamMemberActive(props.teamId).then((res) => {
      const _groupMember = deepClone(res.filter((item) => item.account !== uni.$UIKitStore.userStore.myUserInfo.account))
      groupMembers.value = sortGroupMembers(_groupMember, props.teamId)
    })
  }
})
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';

.mention-member-list-wrapper{
  z-index: 9999;
  touch-action: none;
}
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

.member-item-block{
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
