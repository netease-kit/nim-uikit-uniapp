<template>
  <div class="msg-page-wrapper">
    <div class="msg-nav">
      <NavBar :title="t('msgReadPageTitleText')" :showLeft="true">
        <template v-slot:left>
          <div @click="backToConversation">
            <Icon type="icon-zuojiantou" :size="22"></Icon>
          </div>
        </template>
      </NavBar>
    </div>
    <div class="msg-alert">
      <NetworkAlert />
    </div>
    <div class="msg-read-header">
      <div
        class="msg-read-header-item"
        :class="selectedType === 'read' ? 'active' : ''"
        @click="selectedType = 'read'"
      >
        {{ `${t('readText')}(${readCount})` }}
      </div>
      <div
        class="msg-read-header-item"
        :class="selectedType === 'unread' ? 'active' : ''"
        @click="selectedType = 'unread'"
      >
        {{ `${t('unreadText')}(${unReadCount})` }}
      </div>
    </div>
    <div v-show="selectedType === 'read'" class="list-wrapper">
      <div
        v-if="readList.length"
        class="list-item"
        v-for="item in readList"
        :key="item"
      >
        <div class="avatar-wrapper">
          <Avatar
            size="40"
            :account="item"
            :goto-user-card="true"
            :teamId="teamId"
            :goto-team-card="false"
          />
        </div>
        <Appellation :account="item" :teamId="teamId"></Appellation>
      </div>
      <div v-else>
        <Empty :text="t('allUnReadText')"></Empty>
      </div>
    </div>
    <div v-show="selectedType === 'unread'" class="list-wrapper">
      <div
        v-if="unReadList.length"
        class="list-item"
        v-for="item in unReadList"
        :key="item"
      >
        <div class="avatar-wrapper">
          <Avatar
            size="40"
            :account="item"
            :goto-user-card="true"
            :teamId="teamId"
            :goto-team-card="false"
          />
        </div>
        <Appellation :account="item" :teamId="teamId"></Appellation>
      </div>
      <div v-else>
        <Empty :text="t('allReadText')"></Empty>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/** 消息已读未读详情页面 */
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import NetworkAlert from '../../components/NetworkAlert.vue'
import NavBar from './message/nav-bar.vue'
import Icon from '../../components/Icon.vue'
import { t } from '../../utils/i18n'
import Avatar from '../../components/Avatar.vue'
import Appellation from '../../components/Appellation.vue'
import Empty from '../../components/Empty.vue'

/** 已读人数 */
const readCount = ref(0)
/** 未读人数 */
const unReadCount = ref(0)
/** 已读列表 */
const readList = ref<string[]>([])
/** 未读列表 */
const unReadList = ref<string[]>([])
/** 已读未读类型 */
const selectedType = ref<string>('read')
/** 群ID */
const teamId = ref<string>('')

/** 返回会话列表 */
const backToConversation = () => {
  uni.navigateBack({
    delta: 1,
  })
}

onLoad((props) => {
  const messageClientId = props?.messageClientId
  const conversationId = props?.conversationId
  if (messageClientId && conversationId) {
    teamId.value =
      uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationTargetId(
        conversationId
      )
    const msg = uni.$UIKitStore.msgStore.getMsg(conversationId, [
      messageClientId,
    ])
    if (msg.length) {
      // 获取当前消息的已读未读详情
      uni.$UIKitStore.msgStore
        .getTeamMessageReceiptDetailsActive(msg[0])
        .then((res) => {
          readCount.value = res?.readReceipt.readCount
          unReadCount.value = res?.readReceipt.unreadCount
          readList.value = res?.readAccountList
          setTimeout(() => {
            unReadList.value = res?.unreadAccountList
          })
        })
    }
  }
})
</script>

<style scoped lang="scss">
.msg-page-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
}
.msg-nav {
  flex-basis: 45px;
}
.msg-read-header {
  display: flex;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 5px;
  margin-bottom: 10px;
  .msg-read-header-item {
    flex: 1;
    text-align: center;
    line-height: 40px;
  }
  .active {
    border-bottom: 1px solid #007aff;
  }
}
.list-wrapper {
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
}
.list-item {
  height: 50px;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.avatar-wrapper {
  margin-right: 10px;
}
</style>
