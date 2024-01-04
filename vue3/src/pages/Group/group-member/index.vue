<template>
  <NavBar :title="$t('teamMemberText')" />
  <div class="group-item" v-for=" item in groupMembers" :key="item.account">
    <Avatar :goto-user-card="true" :account="item.account" size="48" />
    <div class="user-name">{{ item.name }}</div>
    <div v-if="item.type === 'owner'" class="owner">{{ $t('teamOwner') }}</div>
    <div v-else-if="item.type === 'manager'" class="manager">{{ $t('teamManager') }}</div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '../../../components/Avatar.vue'
import { ref } from 'vue'
import NavBar from '../../../components/NavBar.vue';
import { onLoad } from '@dcloudio/uni-app';
import { autorun } from 'mobx';
const groupMembers = ref()
const store = uni.$UIKitStore

onLoad((props) => {
  const teamId = props?.teamId

  autorun(() => {
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

    groupMembers.value = sortGroupMembers(store.teamMemberStore.getTeamMember(teamId), teamId)
  })

  store.teamMemberStore.getTeamMemberActive(teamId)
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
