import type RootStore from './store'
import type { V2NIMMessageForUI } from './store'
import { ref } from 'vue'
import { V2NIMConst } from './nim'
import {
  getMergedForwardDepth,
  isMergedForwardMessage,
} from './mergedForward'
import { getMessageSelectKey } from './messageKey'

export { getMessageSelectKey } from './messageKey'

export const ONE_BY_ONE_FORWARD_LIMIT = 10
export const MERGED_FORWARD_LIMIT = 100
export const MULTI_DELETE_LIMIT = 50
export const MERGED_FORWARD_MAX_DEPTH = 3

const ONE_BY_ONE_FORWARDABLE_MESSAGE_TYPES = [
  V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT,
  V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE,
  V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO,
  V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE,
]

const MERGED_FORWARDABLE_MESSAGE_TYPES = [
  ...ONE_BY_ONE_FORWARDABLE_MESSAGE_TYPES,
  V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO,
  V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL,
]

export const isSelectableMessage = (
  msg?: V2NIMMessageForUI & { timeValue?: number }
) =>
  !!(
    msg?.messageClientId &&
    msg.timeValue === undefined &&
    !msg.recallType &&
    msg.messageType !==
      V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION
  )

const hasForwardableBaseState = (msg: V2NIMMessageForUI) => {
  const errorCode = msg.messageStatus?.errorCode
  return (
    isSelectableMessage(msg) &&
    msg.sendingState ===
      V2NIMConst.V2NIMMessageSendingState
        .V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED &&
    (errorCode === undefined || errorCode === 200)
  )
}

const isRecognizedMergedMessage = (
  store: RootStore,
  msg: V2NIMMessageForUI
) =>
  msg.messageType ===
    V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
  isMergedForwardMessage(store, msg)

export const isOneByOneForwardableMessage = (
  store: RootStore,
  msg: V2NIMMessageForUI
) => {
  if (!hasForwardableBaseState(msg)) {
    return false
  }
  if (
    msg.messageType ===
    V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM
  ) {
    return isRecognizedMergedMessage(store, msg)
  }
  return ONE_BY_ONE_FORWARDABLE_MESSAGE_TYPES.includes(msg.messageType)
}

export const isMergeForwardableMessage = (
  store: RootStore,
  msg: V2NIMMessageForUI
) => {
  if (!hasForwardableBaseState(msg)) {
    return false
  }
  if (
    msg.messageType ===
    V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM
  ) {
    return (
      isRecognizedMergedMessage(store, msg) &&
      getMergedForwardDepth(msg) < MERGED_FORWARD_MAX_DEPTH
    )
  }
  return MERGED_FORWARDABLE_MESSAGE_TYPES.includes(msg.messageType)
}

export const useMessageMultiSelect = () => {
  const isMultiSelecting = ref(false)
  const selectedMessageKeys = ref<string[]>([])

  const enter = (msg: V2NIMMessageForUI) => {
    if (!isSelectableMessage(msg)) {
      return
    }
    isMultiSelecting.value = true
    selectedMessageKeys.value = [getMessageSelectKey(msg)]
  }

  const toggle = (msg: V2NIMMessageForUI) => {
    if (!isSelectableMessage(msg)) {
      return
    }
    const key = getMessageSelectKey(msg)
    selectedMessageKeys.value = selectedMessageKeys.value.includes(key)
      ? selectedMessageKeys.value.filter((item) => item !== key)
      : [...selectedMessageKeys.value, key]
  }

  const exit = () => {
    isMultiSelecting.value = false
    selectedMessageKeys.value = []
  }

  const getSelectedMessages = (messages: V2NIMMessageForUI[]) =>
    messages.filter((msg) =>
      selectedMessageKeys.value.includes(getMessageSelectKey(msg))
    )

  return {
    isMultiSelecting,
    selectedMessageKeys,
    enter,
    toggle,
    exit,
    getSelectedMessages,
  }
}

export const syncConversationLastMessageAfterDelete = (
  store: RootStore,
  conversationId: string
) => {
  const messages = store.msgStore.getMsg(conversationId) || []
  const conversation = store.sdkOptions.enableV2CloudConversation
    ? store.conversationStore?.conversations.get(conversationId)
    : store.localConversationStore?.conversations.get(conversationId)

  if (!conversation) {
    return
  }
  if (!messages.length) {
    conversation.lastMessage = undefined
    return
  }

  const message = messages[messages.length - 1]
  conversation.lastMessage = {
    ...conversation.lastMessage,
    messageRefer: {
      senderId: message.senderId,
      receiverId: message.receiverId,
      messageClientId: message.messageClientId,
      messageServerId: message.messageServerId,
      conversationId: message.conversationId,
      conversationType: message.conversationType,
      createTime: message.createTime,
    },
    messageType: message.messageType,
    subType: message.subType,
    sendingState: message.sendingState,
    text: message.text,
    attachment: message.attachment,
    serverExtension: message.serverExtension,
    callbackExtension: message.callbackExtension,
    lastMessageState:
      V2NIMConst.V2NIMLastMessageState.V2NIM_MESSAGE_STATUS_DEFAULT,
  }
}
