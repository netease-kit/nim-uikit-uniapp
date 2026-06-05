<template>
  <Modal
    :title="t('sendToText')"
    :visible="forwardModalVisible"
    :confirmText="t('sendText')"
    :cancelText="t('cancelText')"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <div
      v-if="
        forwardConversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
      "
      class="avatar-wrapper"
    >
      <Avatar
        :account="(forwardToTeamInfo && forwardToTeamInfo.teamId) || ''"
        :avatar="forwardToTeamInfo && forwardToTeamInfo.avatar"
        size="36"
      />
      <div class="name">
        {{ (forwardToTeamInfo && forwardToTeamInfo.name) || '' }}
      </div>
    </div>
    <div v-else class="avatar-wrapper">
      <Avatar :account="forwardTo" size="36" />
      <div class="name">
        <span>{{ forwardToNick }}</span>
      </div>
    </div>
    <div class="description">
      {{ '[' + t('forwardText') + ']' }}
      {{ forwardFromNick }}
      {{ t('sessionRecordText') }}
    </div>
    <input
      class="forward-input"
      @input="handleForwardInputChange"
      :placeholder="t('forwardComment')"
    />
  </Modal>
</template>

<script>
/** 消息转发弹窗组件 */

import { t } from '../../../utils/i18n'
import Modal from '../../../components/Modal.vue'
import Avatar from '../../../components/Avatar.vue'
import { V2NIMConst } from '../../../utils/nim'

export default {
  components: {
    Modal,
    Avatar,
  },
  props: {
    forwardModalVisible: {
      type: Boolean,
      default: false,
    },
    forwardTo: {
      type: String,
      default: '',
    },
    forwardMsg: {
      type: Object,
      default: () => ({}),
    },
    forwardConversationType: {
      type: Number,
      default: 0,
    },
    forwardToTeamInfo: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      V2NIMConst,
      forwardComment: '',
    }
  },
  computed: {
    forwardToNick() {
      return uni.$UIKitStore.uiStore.getAppellation({
        account: this.forwardTo,
      })
    },
    forwardFromNick() {
      return uni.$UIKitStore.uiStore.getAppellation({
        account: this.forwardMsg?.senderId,
      })
    },
  },
  methods: {
    t,
    handleForwardInputChange(event) {
      this.forwardComment = event.detail.value
    },
    handleCancel() {
      this.$emit('cancel')
    },
    handleConfirm() {
      this.$emit('confirm', this.forwardComment)
    },
  },
}
</script>

<style lang="scss" scoped>
.description {
  font-size: 14px;
  height: 32px;
  color: #000000;
  background-color: #f2f4f5;
  margin: 16px;
  padding: 0 16px;
  line-height: 32px;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.forward-input {
  height: 32px;
  border: 1px solid #e1e6e8;
  border-radius: 4px;
  margin: 10px 16px 0 16px;
  padding: 5px 8px;
  box-sizing: border-box;
}

.avatar-wrapper {
  display: flex;
  align-items: center;
  height: 36px;
  margin: 13px 16px;
  .name {
    margin-left: 10px;
    font-size: 14px;
    color: #333333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
