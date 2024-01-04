<template>
  <div class="group-list-container">
    <NavBar :title="$t('teamMenuText')" />
    <div class="group-list-content">
      <Empty v-if="teamList.length === 0" :text="$t('teamEmptyText')" />
      <div v-else class="group-item" v-for="team in teamList" :key="team.teamId" @click="handleClick(team)">
        <Avatar :account="team.teamId" :avatar="team.avatar" />
        <span class="group-name">{{ team.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Team } from '@xkit-yx/im-store';
import { autorun } from 'mobx';
import { ref } from 'vue';

import Empty from '../../../components/Empty.vue'
import Avatar from '../../../components/Avatar.vue'
import NavBar from '../../../components/NavBar.vue'
import { customNavigateTo } from '../../../utils/customNavigate';

const store = uni.$UIKitStore
const teamList = ref<Team[]>([])

const handleClick = async (team: Team) => {
  await store.uiStore.selectSession(`team-${team.teamId}`)
  customNavigateTo({
    url: '/pages/Chat/index'
  })
}

autorun(() => {
  teamList.value = store.uiStore.teamList
})

</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.group-list-container {
  height: 100vh;
  box-sizing: border-box;
}

.group-list-content {
  height: calc(100% - 60px - var(--status-bar-height));
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.group-item {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}

.group-name {
  margin-left: 10px;
  font-size: 16px;
  padding-right: 20px;
  color: #333333;
  flex: 1;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}
</style>
