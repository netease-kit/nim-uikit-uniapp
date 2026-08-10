import { describe, expect, it, vi } from 'vitest'

vi.mock('../../utils/nim', () => ({
  V2NIMConst: {
    V2NIMMessageType: {
      V2NIM_MESSAGE_TYPE_TEXT: 0,
      V2NIM_MESSAGE_TYPE_IMAGE: 1,
      V2NIM_MESSAGE_TYPE_AUDIO: 2,
      V2NIM_MESSAGE_TYPE_VIDEO: 3,
      V2NIM_MESSAGE_TYPE_NOTIFICATION: 5,
      V2NIM_MESSAGE_TYPE_FILE: 6,
      V2NIM_MESSAGE_TYPE_CALL: 12,
      V2NIM_MESSAGE_TYPE_CUSTOM: 100,
    },
    V2NIMMessageSendingState: {
      V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED: 1,
      V2NIM_MESSAGE_SENDING_STATE_FAILED: 2,
    },
    V2NIMLastMessageState: {
      V2NIM_MESSAGE_STATUS_DEFAULT: 0,
    },
  },
}))

import {
  MERGED_FORWARD_LIMIT,
  MULTI_DELETE_LIMIT,
  ONE_BY_ONE_FORWARD_LIMIT,
  getMessageSelectKey,
  isMergeForwardableMessage,
  isOneByOneForwardableMessage,
  isSelectableMessage,
  syncConversationLastMessageAfterDelete,
  useMessageMultiSelect,
} from '../../components/NEUIKit/utils/messageMultiSelect'

const msg = (overrides: Record<string, unknown> = {}) =>
  ({
    messageClientId: 'c1',
    messageServerId: 's1',
    conversationId: 'me|1|you',
    conversationType: 1,
    senderId: 'me',
    receiverId: 'you',
    createTime: 1,
    messageType: 0,
    sendingState: 1,
    ...overrides,
  }) as any

const store = (isMerged = false) =>
  ({
    msgStore: {
      isChatMergedForwardMsg: () => isMerged,
    },
  }) as any

describe('messageMultiSelect', () => {
  it('uses server, client, then local identity', () => {
    expect(getMessageSelectKey(msg())).toBe('server-s1')
    expect(getMessageSelectKey(msg({ messageServerId: '0' }))).toBe(
      'client-c1'
    )
    expect(
      getMessageSelectKey(
        msg({ messageServerId: '0', messageClientId: '' })
      )
    ).toBe('local-me|1|you-me-1')
  })

  it('rejects time rows, recalls, and notifications from selection', () => {
    expect(isSelectableMessage(msg({ timeValue: 12 }))).toBe(false)
    expect(isSelectableMessage(msg({ recallType: 'reCallMsg' }))).toBe(false)
    expect(isSelectableMessage(msg({ messageType: 5 }))).toBe(false)
    expect(isSelectableMessage(msg())).toBe(true)
  })

  it('keeps failed messages selectable but not forwardable', () => {
    const failed = msg({ sendingState: 2 })

    expect(isSelectableMessage(failed)).toBe(true)
    expect(isOneByOneForwardableMessage(store(), failed)).toBe(false)
    expect(isMergeForwardableMessage(store(), failed)).toBe(false)
  })

  it('allows audio and call records only for merged forwarding', () => {
    for (const messageType of [2, 12]) {
      const current = msg({ messageType })
      expect(isOneByOneForwardableMessage(store(), current)).toBe(false)
      expect(isMergeForwardableMessage(store(), current)).toBe(true)
    }
  })

  it('allows recognized merged messages and blocks depth three merging', () => {
    const depthTwo = msg({
      messageType: 100,
      attachment: { raw: JSON.stringify({ type: 101, data: { depth: 2 } }) },
    })
    const depthThree = msg({
      messageType: 100,
      attachment: { raw: JSON.stringify({ type: 101, data: { depth: 3 } }) },
    })

    expect(isOneByOneForwardableMessage(store(true), depthThree)).toBe(true)
    expect(isMergeForwardableMessage(store(true), depthTwo)).toBe(true)
    expect(isMergeForwardableMessage(store(true), depthThree)).toBe(false)
    expect(isMergeForwardableMessage(store(false), depthTwo)).toBe(false)
  })

  it('exports limits aligned with the H5 implementation', () => {
    expect([
      ONE_BY_ONE_FORWARD_LIMIT,
      MERGED_FORWARD_LIMIT,
      MULTI_DELETE_LIMIT,
    ]).toEqual([10, 100, 50])
  })

  it('synchronizes the local conversation last message after deletion', () => {
    const lastMessage = msg({ messageClientId: 'last', text: 'last' })
    const conversation: any = { lastMessage: { text: 'deleted' } }
    const rootStore = {
      msgStore: { getMsg: () => [lastMessage] },
      sdkOptions: { enableV2CloudConversation: false },
      localConversationStore: {
        conversations: new Map([['me|1|you', conversation]]),
      },
    } as any

    syncConversationLastMessageAfterDelete(rootStore, 'me|1|you')

    expect(conversation.lastMessage.text).toBe('last')
    expect(conversation.lastMessage.messageRefer.messageClientId).toBe('last')
  })

  it('enters, toggles, orders, and exits multi-select state', () => {
    const first = msg({ messageClientId: 'c1', messageServerId: 's1' })
    const second = msg({ messageClientId: 'c2', messageServerId: 's2' })
    const state = useMessageMultiSelect()

    state.enter(second)
    state.toggle(first)

    expect(state.isMultiSelecting.value).toBe(true)
    expect(state.getSelectedMessages([first, second])).toEqual([first, second])

    state.toggle(second)
    expect(state.getSelectedMessages([first, second])).toEqual([first])

    state.exit()
    expect(state.isMultiSelecting.value).toBe(false)
    expect(state.selectedMessageKeys.value).toEqual([])
  })
})
