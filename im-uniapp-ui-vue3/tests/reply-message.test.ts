import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'
import {
  ReplyMessageReferResolver,
  getReplyMessageReferKey,
  normalizeLegacyReplyMessageRefer,
  type ReplyMessageRefer,
} from '../components/NEUIKit/utils/replyMessage'

type Message = ReplyMessageRefer & {
  messageClientId: string
  messageServerId: string
  text?: string
  recallType?: 'beReCallMsg' | 'reCallMsg'
  isDelete?: boolean
}

const refer: ReplyMessageRefer = {
  conversationType: 1,
  conversationId: 'p2p|alice|bob',
  senderId: 'alice',
  receiverId: 'bob',
  messageServerId: 'server-a',
  messageClientId: 'client-a',
  createTime: 1,
}

const replyBinding = {
  replyMessageClientId: 'reply-client-id',
  refer,
}

const originalMessage: Message = {
  ...refer,
  messageClientId: 'client-a',
  messageServerId: 'server-a',
  text: 'message A',
}

const flushPromises = async () => {
  await Promise.resolve()
  await Promise.resolve()
}

const waitFor = async (condition: () => boolean, timeout = 1000) => {
  const deadline = Date.now() + timeout
  while (Date.now() < deadline) {
    if (condition()) return
    await new Promise((resolve) => setTimeout(resolve, 5))
  }
  assert.fail('Timed out while waiting for the expected reply resolution')
}

test('normalizes idClient-only legacy reply payloads into queryable refers', () => {
  const legacyRefer = normalizeLegacyReplyMessageRefer({
    idClient: 'client-a',
    scene: 1,
    from: 'alice',
    receiverId: 'bob',
    to: 'p2p|alice|bob',
    idServer: 'server-a',
    time: 1,
  })

  assert.deepEqual(legacyRefer, refer)
})

test('does not render a recalled placeholder while an out-of-list reply is loading', async () => {
  let resolveRequest: ((messages: Message[]) => void) | undefined
  let requestCount = 0
  const resolver = new ReplyMessageReferResolver<Message>({
    fetchByRefers: async () => {
      requestCount += 1
      return new Promise<Message[]>((resolve) => {
        resolveRequest = resolve
      })
    },
  })

  const initial = resolver.resolve([], [replyBinding])
  const repeated = resolver.resolve([], [replyBinding])

  assert.equal(initial[replyBinding.replyMessageClientId], undefined)
  assert.equal(repeated[replyBinding.replyMessageClientId], undefined)
  assert.equal(requestCount, 1)

  resolveRequest?.([originalMessage])
  await flushPromises()

  const resolved = resolver.resolve([], [replyBinding])
  assert.equal(resolved[replyBinding.replyMessageClientId], originalMessage)
  assert.equal(requestCount, 1)
})

test('renders the recalled placeholder only after a successful lookup returns no message', async () => {
  const resolver = new ReplyMessageReferResolver<Message>({
    fetchByRefers: async () => [],
  })

  const initial = resolver.resolve([], [replyBinding])
  assert.equal(initial[replyBinding.replyMessageClientId], undefined)

  await flushPromises()

  const resolved = resolver.resolve([], [replyBinding])
  assert.deepEqual(resolved[replyBinding.replyMessageClientId], {
    messageClientId: 'noFind',
  })
})

test('does not render a cached reply after its recalled placeholder is in the message list', async () => {
  const resolver = new ReplyMessageReferResolver<Message>({
    fetchByRefers: async () => [originalMessage],
  })
  const recalledMessage: Message = {
    ...refer,
    messageClientId: 'recall-client-a',
    messageServerId: 'server-a',
    recallType: 'beReCallMsg',
  }

  resolver.resolve([], [replyBinding])
  await flushPromises()

  const cached = resolver.resolve([], [replyBinding])
  assert.equal(cached[replyBinding.replyMessageClientId], originalMessage)

  const afterRecall = resolver.resolve([recalledMessage], [replyBinding])
  assert.deepEqual(afterRecall[replyBinding.replyMessageClientId], {
    messageClientId: 'noFind',
  })
})

test('keeps a remotely invalidated reply unavailable when an earlier lookup resolves', async () => {
  let resolveRequest: ((messages: Message[]) => void) | undefined
  const resolver = new ReplyMessageReferResolver<Message>({
    fetchByRefers: async () =>
      new Promise<Message[]>((resolve) => {
        resolveRequest = resolve
      }),
  })

  resolver.resolve([], [replyBinding])
  resolver.invalidate([refer])

  const invalidated = resolver.resolve([], [replyBinding])
  assert.deepEqual(invalidated[replyBinding.replyMessageClientId], {
    messageClientId: 'noFind',
  })

  const staleLocalMessage = resolver.resolve([originalMessage], [replyBinding])
  assert.deepEqual(staleLocalMessage[replyBinding.replyMessageClientId], {
    messageClientId: 'noFind',
  })

  resolveRequest?.([originalMessage])
  await flushPromises()

  const afterEarlierLookup = resolver.resolve([], [replyBinding])
  assert.deepEqual(afterEarlierLookup[replyBinding.replyMessageClientId], {
    messageClientId: 'noFind',
  })
})

test('does not turn a failed lookup into a recalled placeholder', async () => {
  const resolver = new ReplyMessageReferResolver<Message>({
    fetchByRefers: async () => {
      throw new Error('network unavailable')
    },
  })

  resolver.resolve([], [replyBinding])
  await flushPromises()

  const resolved = resolver.resolve([], [replyBinding])
  assert.equal(resolved[replyBinding.replyMessageClientId], undefined)
  resolver.dispose()
})

test('retries a failed lookup after cooldown without a message-store update', async () => {
  let requestCount = 0
  let latestResolution: Record<string, Message | { messageClientId: 'noFind' }> = {}
  let resolver: ReplyMessageReferResolver<Message>
  const resolveCurrentReply = () => {
    latestResolution = resolver.resolve([], [replyBinding])
  }

  resolver = new ReplyMessageReferResolver<Message>({
    fetchByRefers: async () => {
      requestCount += 1
      if (requestCount === 1) throw new Error('network unavailable')
      return [originalMessage]
    },
    onResolved: resolveCurrentReply,
    retryInterval: 5,
  })

  resolveCurrentReply()
  await waitFor(
    () => latestResolution[replyBinding.replyMessageClientId] === originalMessage
  )

  assert.equal(requestCount, 2)
  resolver.dispose()
})

test('starts the first lookup when the clock begins at zero', () => {
  let requestCount = 0
  const resolver = new ReplyMessageReferResolver<Message>({
    fetchByRefers: async () => {
      requestCount += 1
      return []
    },
    now: () => 0,
  })

  resolver.resolve([], [replyBinding])

  assert.equal(requestCount, 1)
})

test('uses the complete refer identity to merge duplicate reply lookups', async () => {
  let requestedRefers: ReplyMessageRefer[] = []
  const resolver = new ReplyMessageReferResolver<Message>({
    fetchByRefers: async (refers) => {
      requestedRefers = refers
      return [originalMessage]
    },
  })
  const secondBinding = {
    replyMessageClientId: 'reply-client-id-2',
    refer: { ...refer },
  }

  resolver.resolve([], [replyBinding, secondBinding])
  await flushPromises()

  const resolved = resolver.resolve([], [replyBinding, secondBinding])
  assert.equal(requestedRefers.length, 1)
  assert.equal(
    getReplyMessageReferKey(requestedRefers[0]),
    getReplyMessageReferKey(refer)
  )
  assert.equal(resolved[replyBinding.replyMessageClientId], originalMessage)
  assert.equal(resolved[secondBinding.replyMessageClientId], originalMessage)
})

test('does not notify after disposal when an earlier request completes', async () => {
  let resolveRequest: ((messages: Message[]) => void) | undefined
  let updates = 0
  const resolver = new ReplyMessageReferResolver<Message>({
    fetchByRefers: async () =>
      new Promise<Message[]>((resolve) => {
        resolveRequest = resolve
      }),
    onResolved: () => {
      updates += 1
    },
  })

  resolver.resolve([], [replyBinding])
  resolver.dispose()
  resolveRequest?.([originalMessage])
  await flushPromises()

  assert.equal(updates, 0)
})

test('chat delegates reply lookup state to the resolver instead of publishing a loading noFind value', () => {
  const chatPage = readFileSync(resolve('components/NEUIKit/pages/Chat/index.vue'), 'utf8')

  assert.match(chatPage, /new ReplyMessageReferResolver/)
  assert.match(chatPage, /onResolved:\s*\(\)\s*=>\s*handleReplyMsg\(msgs\.value\)/)
  assert.match(chatPage, /replyMessageResolver\.dispose\(\)/)
  assert.match(chatPage, /onMessageRevokeNotifications/)
  assert.match(chatPage, /onMessageDeletedNotifications/)
  assert.match(chatPage, /replyMessageResolver\.invalidate\(references\)/)
  assert.doesNotMatch(chatPage, /messageClientId:\s*'noFind'/)
  assert.doesNotMatch(chatPage, /replyMsgsMapForExt/)
  assert.doesNotMatch(chatPage, /replyMsgsMapForThreadReply/)
})
