<template>
  <div class="search-result-list-item" :key="renderKey" @click="handleItemClick">
    <div class="result-item-avatar">
      <Avatar :key="renderKey" :account="to" :avatar="teamAvatar" />
    </div>
    <div v-if="!isTeam" class="result-item-title">
      <div>{{ displayName }}</div>
      <div class="result-item-account">{{ to }}</div>
    </div>
    <div v-else class="result-item-title">
      {{ teamName }}
    </div>
  </div>
</template>

<script>
/** 搜索结果Item组件 */
import { t } from '../../../utils/i18n'
import { customNavigateTo } from '../../../utils/customNavigate'

import Avatar from '../../../components/Avatar.vue'

import { V2NIMConst } from '../../../utils/nim'

export default {
  components: {
    Avatar,
  },
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      },
    },
  },
  data() {
    return {
      V2NIMConst,
      flag: false,
      enableV2CloudConversation:
        uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation,
    }
  },
  computed: {
    teamAvatar() {
      if (this.item.teamId) {
        return this.item.avatar
      }
      return ''
    },
    to() {
      if (this.item.teamId) {
        return this.item.teamId
      }
      return this.item.accountId
    },
    isTeam() {
      return !!this.item.teamId
    },
    teamName() {
      if (this.item.teamId) {
        return this.item.name
      }
      return ''
    },
    displayName() {
      if (this.item.accountId) {
        return this.item.alias || this.item.name || this.item.accountId
      }
      return this.teamName
    },
    renderKey() {
      return this.item.renderKey || this.to
    },
  },
  methods: {
    async handleItemClick() {
      if (this.flag) return
      try {
        this.flag = true
        let conversationType
        let receiverId
        const item = this.item
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
        if (this.enableV2CloudConversation) {
          await uni.$UIKitStore.conversationStore?.insertConversationActive(
            conversationType,
            receiverId
          )
        } else {
          await uni.$UIKitStore.localConversationStore?.insertConversationActive(
            conversationType,
            receiverId
          )
        }

        const conversationId =
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
            ? uni.$UIKitNIM.V2NIMConversationIdUtil.p2pConversationId(
                receiverId
              )
            : uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(
                receiverId
              )
        customNavigateTo({
          url: `/pages/Chat/index?conversationId=${encodeURIComponent(
            conversationId
          )}`,
        })
      } catch {
        uni.showToast({
          title: t('selectSessionFailText'),
          icon: 'error',
        })
      } finally {
        this.flag = false
      }
    },
  },
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
