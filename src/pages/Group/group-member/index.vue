<template>
  <NavBar title="群成员">
    <template v-slot:left>
      <Icon @click="back" type="icon-zuojiantou"></Icon>
    </template>
  </NavBar>
  <div class="group-item" v-for=" item in groupMembers" :key="item.account">
    <Avatar :goto-user-card="true" :account="item.account" size="48" />
    <div class="user-name">{{ item.name }}</div>
    <div v-if="item.type === 'owner'" class="owner">{{ $t('teamOwner') }}</div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '../../../components/Avatar.vue'
import { ref } from 'vue'
import NavBar from '../../../components/NavBar.vue';
import { onLoad } from '@dcloudio/uni-app';
import Icon from '../../../components/Icon.vue';
const groupMembers = ref()
const store = uni.$UIKitStore

onLoad((props) => {
  const teamId = props?.teamId
  store.teamMemberStore.getTeamMemberActive(teamId).then((res) => {
    groupMembers.value = sortGroupMembers(res, teamId)
  })
})

const sortGroupMembers = (members, teamId) => {
  const owner = members.filter((item) => item.type === 'owner')
  const manager = members.filter((item) => item.type === 'manager')
  const other = members.filter(
    (item) => !['owner', 'manager'].includes(item.type)
  )
  const result = [...owner, ...manager, ...other].map(item => {
    return { ...item, name: store.uiStore.getAppellation({ account: item.account, teamId }) }
  })
  return result
}

const back = () => {
  uni.navigateBack({
    delta: 1
  })
}
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

  .owner {
    color: rgb(6, 155, 235);
    background-color: rgb(210, 229, 246);
    width: 35px;
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
