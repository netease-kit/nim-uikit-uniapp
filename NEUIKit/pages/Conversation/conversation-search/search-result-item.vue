<template>
  <div class="search-result-list-item" @click="handleItemClick">
    <div class="result-item-avatar">
      <Avatar :account="to" :avatar="teamAvatar" />
    </div>
    <div v-if="!isTeam" class="result-item-title">
      <Appellation :account="to" />
      <div class="result-item-account">{{ to }}</div>
    </div>
    <div v-else class="result-item-title">
      {{ teamName }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  defineProps,
  withDefaults,
  computed,
} from '../../../utils/transformVue'
import { t } from '../../../utils/i18n'
import Avatar from '../../../components/Avatar.vue'
import Appellation from '../../../components/Appellation.vue'
import { customNavigateTo } from '../../../utils/customNavigate'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK'

const props = withDefaults(
  defineProps<{
    item: any
  }>(),
  {}
)

// 群头像
const teamAvatar = computed(() => {
  if (props.item.teamId) {
    return props.item.avatar
  }
})

// 对话方
const to = computed(() => {
  if (props.item.teamId) {
    return props.item.teamId
  }
  return props.item.accountId
})

// 是否是群
const isTeam = computed(() => {
  return !!props.item.teamId
})

// 群名
const teamName = computed(() => {
  if (props.item.teamId) {
    return props.item.name
  }
  return ''
})

let flag = false

const handleItemClick = async () => {
  if (flag) return
  try {
    flag = true
    let conversationType
    let receiverId
    let item = props.item
    if (item.accountId) {
      conversationType =
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
      receiverId = item.accountId
    } else if (item.teamId) {
      conversationType =
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
      receiverId = item.teamId
    } else {
      throw Error('unknow scene')
    }
    await uni.$UIKitStore.conversationStore.insertConversationActive(
      conversationType,
      receiverId
    )

    customNavigateTo({
      url: '/pages/Chat/index',
    })
  } catch {
    uni.showToast({
      title: t('selectSessionFailText'),
      icon: 'error',
    })
  } finally {
    flag = false
  }
}
</script>

<style lang="scss" scoped>
.search-result-list-item {
  display: flex;
  align-items: center;
  height: 50px;
  margin: 10px 0;
}

.result-item-avatar {
  width: 42px;
}

.result-item-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: 10px;
  font-size: 14px;
}
.result-item-account {
  font-size: 13px;
  color: #b5b6b8;
}
</style>
