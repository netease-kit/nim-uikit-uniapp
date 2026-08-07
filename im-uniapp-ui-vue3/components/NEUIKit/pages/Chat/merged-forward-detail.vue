<template>
  <div class="merged-forward-detail">
    <NavBar :title="t('chatHistoryText')" :show-left="true">
      <template v-slot:left>
        <div class="merged-forward-back" @tap="back">
          <Icon type="icon-zuojiantou" :size="22" />
        </div>
      </template>
    </NavBar>
    <div class="merged-forward-list">
      <MessageList
        class="merged-forward-message-list"
        :msgs="messages"
        :conversation-type="conversationType"
        :to="''"
        :no-more="true"
        :loading-more="false"
        readonly
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
// @ts-ignore
import { onLoad, onUnload } from '@dcloudio/uni-app'
import NavBar from './message/nav-bar.vue'
import Icon from '../../components/Icon.vue'
import MessageList from './message/message-list.vue'
import { t } from '../../utils/i18n'
import { V2NIMConst } from '../../utils/nim'
import type { V2NIMMessageForUI } from '../../utils/store'
import {
  getMergedViewerTask,
  removeMergedViewerTask,
} from '../../utils/forwardTask'

const messages = ref<V2NIMMessageForUI[]>([])
let taskId = ''

const conversationType = computed(
  () =>
    (messages.value[0]?.conversationType as V2NIMConst.V2NIMConversationType) ||
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
)

const back = () => uni.navigateBack({ delta: 1 })

onLoad((query: { taskId?: string }) => {
  taskId = query?.taskId ? decodeURIComponent(query.taskId) : ''
  const task = getMergedViewerTask(taskId)
  if (!task?.messages.length) {
    uni.showToast({
      title: t('getMergedForwardMsgFailedText'),
      icon: 'error',
      duration: 1000,
    })
    setTimeout(back, 1000)
    return
  }
  messages.value = task.messages
})

onUnload(() => {
  if (taskId) removeMergedViewerTask(taskId)
})
</script>

<style lang="scss" scoped>
.merged-forward-detail {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  overflow: hidden;
  background: #f6f8fa;
}

.merged-forward-back {
  padding: 8px;
}

.merged-forward-list {
  display: flex;
  min-height: 0;
  flex: 1;
}

.merged-forward-message-list {
  flex: 1;
  min-width: 0;
  width: 100%;
}
</style>
