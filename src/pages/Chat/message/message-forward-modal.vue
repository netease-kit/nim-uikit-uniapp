<template>
  <Modal
    :title="$t('sendToText')"
    :visible="forwardModalVisible"
    :confirmText="$t('sendText')"
    :cancelText="$t('cancelText')"
    :onCancel="handleCancel"
    :onConfirm="() => handleConfirm(forwardComment)"
  >
    <div v-if="forwardScene === 'team'" class="avatar-wrapper">
      <Avatar
        :account="(forwardToTeamInfo?.teamId as string)"
        :avatar="forwardToTeamInfo?.avatar"
        size="36"
      />
      <div class="name">
        {{ forwardToTeamInfo?.name }}
      </div>
    </div>
    <div v-else class="avatar-wrapper">
      <Avatar :account="forwardId" size="36" />
      <div class="name">
        {{
          store.uiStore.getAppellation({
            account: forwardId,
          })
        }}
      </div>
    </div>
    <div class="description">
      {{ '[' + $t('forwardText') + ']' }}
      {{
        store.uiStore.getAppellation({
          account: forwardMsg?.from as string,
        })
      }}
      {{ $t('sessionRecordText') }}
    </div>
    <input
      class="forward-input"
      @input="handleForwardInputChange"
      placeholder="留言"
    />
  </Modal>
</template>

<script lang="ts" setup>
import { t } from '../../../utils/i18n'
import { ref } from 'vue'
import Modal from '../../../components/Modal.vue'
import type { Team } from '@xkit-yx/im-store'
import type {
  IMMessage,
  TMsgScene,
} from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import Avatar from '../../../components/Avatar.vue'

const props = defineProps < {
    forwardModalVisible: boolean
    handleCancel: () => void
    handleConfirm: (forwardComment: string) => void
    forwardId: string
    forwardMsg: IMMessage | undefined
    forwardScene: TMsgScene
    forwardToTeamInfo: Team | undefined
}>()
const store = uni.$UIKitStore
const forwardComment = ref('')

const handleForwardInputChange = (event) => {
  forwardComment.value = event.detail.value
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
