export interface ReplyMessageRefer {
  conversationType?: number | string
  conversationId?: string
  senderId?: string
  receiverId?: string
  messageServerId?: string
  messageClientId?: string
  createTime?: number
}

export interface LegacyReplyMessageRefer {
  scene?: number | string
  from?: string
  receiverId?: string
  to?: string
  idServer?: string
  idClient?: string
  messageClientId?: string
  time?: number
}

export interface ReplyMessageLike extends ReplyMessageRefer {
  messageClientId: string
  recallType?: unknown
  isDelete?: boolean
}

export interface ReplyMessageBinding {
  replyMessageClientId: string
  refer: ReplyMessageRefer
  localMessageClientId?: string
}

export type ReplyMessageNotFound = {
  messageClientId: 'noFind'
}

export type ResolvedReplyMessage<T extends ReplyMessageLike> =
  | T
  | ReplyMessageNotFound

export interface ReplyMessageReferResolverOptions<
  T extends ReplyMessageLike,
> {
  fetchByRefers: (refers: ReplyMessageRefer[]) => Promise<T[]>
  onResolved?: () => void
  now?: () => number
  retryInterval?: number
}

const REPLY_MESSAGE_REFER_FIELDS: Array<keyof ReplyMessageRefer> = [
  'conversationType',
  'conversationId',
  'senderId',
  'receiverId',
  'messageServerId',
  'messageClientId',
  'createTime',
]

const REPLY_MESSAGE_REFER_IDENTITY_FIELDS = REPLY_MESSAGE_REFER_FIELDS.filter(
  (field) => field !== 'messageClientId'
)

const REPLY_MESSAGE_NOT_FOUND: ReplyMessageNotFound = {
  messageClientId: 'noFind',
}

export const getReplyMessageReferKey = (refer: ReplyMessageRefer) =>
  REPLY_MESSAGE_REFER_FIELDS.map((field) => String(refer[field] ?? '')).join(
    '|'
  )

const getReplyMessageReferIdentityKey = (refer: ReplyMessageRefer) =>
  REPLY_MESSAGE_REFER_IDENTITY_FIELDS.map((field) =>
    String(refer[field] ?? '')
  ).join('|')

const isUnavailableReplyMessage = (message: ReplyMessageLike) =>
  Boolean(message.recallType || message.isDelete)

export const normalizeLegacyReplyMessageRefer = (
  refer: LegacyReplyMessageRefer
): ReplyMessageRefer => ({
  conversationType: refer.scene,
  conversationId: refer.to,
  senderId: refer.from,
  receiverId: refer.receiverId,
  messageServerId: refer.idServer,
  messageClientId: refer.messageClientId || refer.idClient,
  createTime: refer.time,
})

export const isCompleteReplyMessageRefer = (
  refer: ReplyMessageRefer
): refer is Required<ReplyMessageRefer> =>
  REPLY_MESSAGE_REFER_FIELDS.every((field) => {
    const value = refer[field]
    return value !== undefined && value !== null && value !== ''
  })

type RequestGroup = {
  refer: ReplyMessageRefer
}

/**
 * Resolves reply references without treating an in-flight request as a recalled
 * message. The cache is scoped to one chat page and is discarded on unmount.
 */
export class ReplyMessageReferResolver<T extends ReplyMessageLike> {
  private readonly replyMessageCache = new Map<
    string,
    ResolvedReplyMessage<T>
  >()

  private readonly requestingKeys = new Set<string>()

  private readonly failedAt = new Map<string, number>()

  private readonly fetchByRefers: (refers: ReplyMessageRefer[]) => Promise<T[]>

  private readonly onResolved?: () => void

  private readonly now: () => number

  private readonly retryInterval: number

  private retryTimer?: ReturnType<typeof setTimeout>

  private disposed = false

  private generation = 0

  constructor(options: ReplyMessageReferResolverOptions<T>) {
    this.fetchByRefers = options.fetchByRefers
    this.onResolved = options.onResolved
    this.now = options.now || Date.now
    this.retryInterval = options.retryInterval ?? 30 * 1000
  }

  resolve(
    messages: T[],
    bindings: ReplyMessageBinding[]
  ): Record<string, ResolvedReplyMessage<T>> {
    if (this.disposed) return {}

    const unavailableReferKeys = new Set(
      messages
        .filter(isUnavailableReplyMessage)
        .filter(isCompleteReplyMessageRefer)
        .map(getReplyMessageReferIdentityKey)
    )
    const messagesByClientId = new Map(
      messages
        .filter((message) => !isUnavailableReplyMessage(message))
        .map((message) => [message.messageClientId, message])
    )
    const resolved: Record<string, ResolvedReplyMessage<T>> = {}
    const requestGroups = new Map<string, RequestGroup>()

    bindings.forEach((binding) => {
      const requestKey = getReplyMessageReferKey(binding.refer)
      if (
        isCompleteReplyMessageRefer(binding.refer) &&
        unavailableReferKeys.has(
          getReplyMessageReferIdentityKey(binding.refer)
        )
      ) {
        this.markReplyMessageNotFound(requestKey)
        resolved[binding.replyMessageClientId] = REPLY_MESSAGE_NOT_FOUND
        return
      }

      const cachedReplyMessage = this.replyMessageCache.get(requestKey)
      if (cachedReplyMessage === REPLY_MESSAGE_NOT_FOUND) {
        resolved[binding.replyMessageClientId] = cachedReplyMessage
        return
      }

      const localMessageClientId =
        binding.localMessageClientId || binding.refer.messageClientId
      const localMessage = localMessageClientId
        ? messagesByClientId.get(localMessageClientId)
        : undefined

      if (localMessage) {
        resolved[binding.replyMessageClientId] = localMessage
        return
      }

      if (cachedReplyMessage) {
        resolved[binding.replyMessageClientId] = cachedReplyMessage
        return
      }

      if (
        this.requestingKeys.has(requestKey) ||
        !this.canRequest(requestKey)
      ) {
        return
      }

      requestGroups.set(requestKey, { refer: binding.refer })
    })

    this.requestReplyMessages(requestGroups)
    return resolved
  }

  dispose() {
    this.disposed = true
    this.generation += 1
    this.requestingKeys.clear()
    this.clearRetryTimer()
  }

  invalidate(refers: ReplyMessageRefer[]) {
    if (this.disposed) return

    let hasInvalidatedReplyMessage = false
    refers.forEach((refer) => {
      if (!isCompleteReplyMessageRefer(refer)) return
      this.markReplyMessageNotFound(getReplyMessageReferKey(refer))
      hasInvalidatedReplyMessage = true
    })

    if (hasInvalidatedReplyMessage) {
      this.onResolved?.()
    }
  }

  private canRequest(requestKey: string) {
    const failedAt = this.failedAt.get(requestKey)
    return (
      failedAt === undefined || this.now() - failedAt >= this.retryInterval
    )
  }

  private requestReplyMessages(requestGroups: Map<string, RequestGroup>) {
    if (!requestGroups.size || this.disposed) return

    const requestKeys = [...requestGroups.keys()]
    const requestGeneration = this.generation
    requestKeys.forEach((requestKey) => this.requestingKeys.add(requestKey))

    let request: Promise<T[]>
    try {
      request = this.fetchByRefers(
        requestKeys.map((requestKey) => requestGroups.get(requestKey)!.refer)
      )
    } catch {
      this.handleRequestFailure(requestKeys, requestGeneration)
      return
    }

    request
      .then((messages) => {
        if (!this.isCurrentGeneration(requestGeneration)) return

        const requestKeysByServerId = new Map<string, string[]>()
        requestKeys.forEach((requestKey) => {
          const messageServerId = requestGroups.get(requestKey)?.refer
            .messageServerId
          if (!messageServerId) return
          const serverIdKey = String(messageServerId)
          const keys = requestKeysByServerId.get(serverIdKey) || []
          keys.push(requestKey)
          requestKeysByServerId.set(serverIdKey, keys)
        })

        const foundKeys = new Set<string>()
        messages.forEach((message) => {
          const exactRequestKey = getReplyMessageReferKey(message)
          const matchedRequestKeys = requestGroups.has(exactRequestKey)
            ? [exactRequestKey]
            : requestKeysByServerId.get(String(message.messageServerId)) || []

          matchedRequestKeys.forEach((requestKey) => {
            if (
              this.replyMessageCache.get(requestKey) ===
              REPLY_MESSAGE_NOT_FOUND
            ) {
              return
            }
            this.replyMessageCache.set(requestKey, message)
            foundKeys.add(requestKey)
          })
        })

        requestKeys.forEach((requestKey) => {
          if (!foundKeys.has(requestKey)) {
            this.replyMessageCache.set(requestKey, REPLY_MESSAGE_NOT_FOUND)
          }
          this.failedAt.delete(requestKey)
          this.requestingKeys.delete(requestKey)
        })
        this.refreshRetryTimer()
        this.onResolved?.()
      })
      .catch(() => {
        this.handleRequestFailure(requestKeys, requestGeneration)
      })
  }

  private handleRequestFailure(requestKeys: string[], requestGeneration: number) {
    if (!this.isCurrentGeneration(requestGeneration)) return

    const failedAt = this.now()
    requestKeys.forEach((requestKey) => {
      this.failedAt.set(requestKey, failedAt)
      this.requestingKeys.delete(requestKey)
    })
    this.scheduleRetry()
    this.onResolved?.()
  }

  private markReplyMessageNotFound(requestKey: string) {
    this.replyMessageCache.set(requestKey, REPLY_MESSAGE_NOT_FOUND)
    this.failedAt.delete(requestKey)
    this.requestingKeys.delete(requestKey)
    this.refreshRetryTimer()
  }

  private scheduleRetry() {
    if (this.retryTimer || this.disposed || !this.failedAt.size) return

    const nextRetryAt = Math.min(
      ...[...this.failedAt.values()].map(
        (failedAt) => failedAt + this.retryInterval
      )
    )
    const delay = Math.max(0, nextRetryAt - this.now())
    this.retryTimer = setTimeout(() => {
      this.retryTimer = undefined
      if (!this.disposed && this.failedAt.size) {
        this.onResolved?.()
      }
    }, delay)
  }

  private refreshRetryTimer() {
    this.clearRetryTimer()
    this.scheduleRetry()
  }

  private clearRetryTimer() {
    if (this.retryTimer === undefined) return
    clearTimeout(this.retryTimer)
    this.retryTimer = undefined
  }

  private isCurrentGeneration(requestGeneration: number) {
    return !this.disposed && requestGeneration === this.generation
  }
}
