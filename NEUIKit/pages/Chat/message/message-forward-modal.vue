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
        props.forwardConversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
      "
      class="avatar-wrapper"
    >
      <Avatar
        :account="
          (props.forwardToTeamInfo && props.forwardToTeamInfo.teamId) || ''
        "
        :avatar="props.forwardToTeamInfo && props.forwardToTeamInfo.avatar"
        size="36"
      />
      <div class="name">
        {{ (props.forwardToTeamInfo && props.forwardToTeamInfo.name) || '' }}
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

<script lang="ts" setup>
import { t } from '../../../utils/i18n'
import {
  ref,
  computed,
  defineProps,
  withDefaults,
} from '../../../utils/transformVue'
import Modal from '../../../components/Modal.vue'
import Avatar from '../../../components/Avatar.vue'
import { deepClone } from '../../../utils'
import { V2NIMMessageForUI } from '@xkit-yx/im-store-v2/dist/types/types'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/esm/nim'

interface ForwardToTeamInfo {
  teamId: string
  name: string
  avatar: string
}

const props = withDefaults(
  defineProps<{
    forwardModalVisible: boolean
    forwardTo: string
    forwardMsg: V2NIMMessageForUI
    forwardConversationType: V2NIMConst.V2NIMConversationType
    forwardToTeamInfo?: ForwardToTeamInfo
  }>(),
  {}
)

const emit = defineEmits(['confirm', 'cancel'])

const forwardComment = ref('')

const handleForwardInputChange = (event: any) => {
  forwardComment.value = event.detail.value
}

const handleCancel = () => {
  emit('cancel')
}

const handleConfirm = () => {
  emit('confirm', forwardComment.value)
}

const forwardToNick = computed(() => {
  return deepClone(
    uni.$UIKitStore.uiStore.getAppellation({
      account: props.forwardTo,
    })
  )
})

const forwardFromNick = computed(() => {
  return deepClone(
    uni.$UIKitStore.uiStore.getAppellation({
      account: props.forwardMsg?.senderId,
    })
  )
})
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
