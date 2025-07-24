<template>
  <div class="group-list-container">
    <NavBar :title="t('teamMenuText')" />
    <div class="group-list-content">
      <Empty v-if="teamList.length === 0" :text="t('teamEmptyText')" />
      <div
        v-else
        class="group-item"
        v-for="team in teamList"
        :key="team.teamId"
        @click="handleClick(team)"
      >
        <Avatar :account="team.teamId" :avatar="team.avatar" />
        <span class="group-name">{{ team.name }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/** 群列表组件 */
import { autorun } from 'mobx'
import { onUnmounted, ref } from 'vue'
import Empty from '../../../components/Empty.vue'
import Avatar from '../../../components/Avatar.vue'
import NavBar from '../../../components/NavBar.vue'
import { customNavigateTo } from '../../../utils/customNavigate'
import { t } from '../../../utils/i18n'
import { V2NIMTeam } from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMTeamService'
import { V2NIMConst } from '../../../utils/nim'

/** 群列表 */
const teamList = ref<V2NIMTeam[]>([])

/** 点击群聊 */
const handleClick = async (team: V2NIMTeam) => {
  if (uni.$UIKitStore.sdkOptions?.enableV2CloudConversation) {
    await uni.$UIKitStore.conversationStore?.insertConversationActive(
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM,
      team.teamId,
      true
    )
  } else {
    await uni.$UIKitStore.localConversationStore?.insertConversationActive(
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM,
      team.teamId,
      true
    )
  }

  customNavigateTo({
    url: '/pages/Chat/index',
  })
}

/** 群列表监听 */
const teamListWatch = autorun(() => {
  teamList.value = uni.$UIKitStore.uiStore.teamList
})

onUnmounted(() => {
  teamListWatch()
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
