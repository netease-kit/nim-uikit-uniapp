<template>
  <div>
    <NavBar :title="t('teamMemberText')" />
    <div class="group-item" v-for=" item in groupMembers" :key="item.account">
      <Avatar 
        :goto-user-card="true" 
        :account="item.account" 
        size="48" />
      <div class="user-name">{{ item.name }}</div>
      <div v-if="item.type === 'owner'" class="owner">{{ t('teamOwner') }}</div>
      <div v-else-if="item.type === 'manager'" class="manager">{{ t('teamManager') }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '../../../components/Avatar.vue'
import { ref } from '../../../utils/transformVue'
import NavBar from '../../../components/NavBar.vue';
// @ts-ignore
import { onLoad } from '@dcloudio/uni-app';
import { autorun } from 'mobx';
import { deepClone } from '../../../utils';
import { t } from '../../../utils/i18n';
const groupMembers = ref()

onLoad((props) => {
  const teamId = props ? props.teamId : ''

  autorun(() => {
    // 对群成员进行排序，群主在前，管理员在后，其他成员按加入时间排序
    const sortGroupMembers = (members, teamId) => {
      const owner = members.filter((item) => item.type === 'owner')
      const manager = members.filter((item) => item.type === 'manager').sort((a, b) => a.joinTime - b.joinTime)
      const other = members.filter(
        (item) => !['owner', 'manager'].includes(item.type)
      ).sort((a, b) => a.joinTime - b.joinTime)
      const result = [...owner, ...manager, ...other].map(item => {
        // @ts-ignore
        return { ...item, name: uni.$UIKitStore.uiStore.getAppellation({ account: item.account, teamId }) }
      })
      return result
    }
     // @ts-ignore
    groupMembers.value = deepClone(sortGroupMembers(uni.$UIKitStore.teamMemberStore.getTeamMember(teamId), teamId))
  })

  if(teamId) {
     // @ts-ignore
    uni.$UIKitStore.teamMemberStore.getTeamMemberActive(teamId)
  }
})
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";

.group-item {
  display: flex;
  align-items: center;
  margin: 20px;

  .user-name {
    margin-left: 20px;
    width: 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
    position: absolute;
    right: 10px;
  }
}
</style>
