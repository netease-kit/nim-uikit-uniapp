import type {
  RootStore,
  V2NIMMessageForUI,
} from './module/im-store-v2/types/src'
import type { V2NIMMessage } from './module/nim-web-sdk/esm/nim/src/V2NIMMessageService'
import { V2NIMConst } from './nim'
import { getMsgContentTipByType } from './msg'
import { t } from './i18n'

export const MERGED_FORWARD_TYPE = 101

export interface MergedForwardAbstract {
  senderNick: string
  content: string
  userAccId: string
}

export interface MergedForwardPayload {
  type: typeof MERGED_FORWARD_TYPE
  data: {
    abstracts?: MergedForwardAbstract[]
    depth?: number
    md5?: string
    sessionId?: string
    sessionName?: string
    url?: string
  }
}

export interface MergedForwardFileAdapter {
  create(content: string): Promise<{
    source: File | string
    cleanup: () => Promise<void>
  }>
  download(url: string): Promise<string>
}

interface SendMergedForwardOptions {
  store: RootStore
  nim: any
  messages: V2NIMMessageForUI[]
  targetConversationId: string
  sourceConversationId: string
  appVersion: string
  sdkVersion: string
  chatHistoryText: string
  comment?: string
  fileAdapter?: MergedForwardFileAdapter
}

interface LoadMergedForwardOptions {
  store: RootStore
  payload: MergedForwardPayload
  fileAdapter?: MergedForwardFileAdapter
}

interface SendOneByOneForwardOptions {
  store: RootStore
  messages: V2NIMMessageForUI[]
  targetConversationId: string
  comment?: string
}

const parseJson = (value: unknown): any => {
  if (!value) {
    return undefined
  }
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch {
      return undefined
    }
  }
  return typeof value === 'object' ? value : undefined
}

export const parseMergedForwardPayload = (
  msg?: Partial<V2NIMMessageForUI> & { content?: unknown }
): MergedForwardPayload | undefined => {
  if (
    !msg ||
    msg.messageType !==
      V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM
  ) {
    return undefined
  }

  const candidates = [(msg.attachment as any)?.raw, msg.content, msg.text]
  for (const candidate of candidates) {
    const payload = parseJson(candidate)
    if (
      payload?.type === MERGED_FORWARD_TYPE &&
      payload.data &&
      typeof payload.data === 'object'
    ) {
      return payload as MergedForwardPayload
    }
  }
  return undefined
}

export const isMergedForwardMessage = (
  store: RootStore,
  msg: V2NIMMessageForUI
) =>
  !!(
    store.msgStore.isChatMergedForwardMsg(msg) &&
    parseMergedForwardPayload(msg)
  )

export const getMergedForwardDepth = (msg: V2NIMMessageForUI) =>
  Number(parseMergedForwardPayload(msg)?.data.depth || 0)

export const normalizeMergedForwardText = (content: string) =>
  (content || '').replace(/("12"\s*:\s*)(\d+)/g, '$1"$2"')

const utf8Bytes = (input: string) => {
  const bytes: number[] = []
  for (let index = 0; index < input.length; index += 1) {
    const point = input.codePointAt(index) || 0
    if (point > 0xffff) {
      index += 1
    }
    if (point <= 0x7f) {
      bytes.push(point)
    } else if (point <= 0x7ff) {
      bytes.push(0xc0 | (point >> 6), 0x80 | (point & 0x3f))
    } else if (point <= 0xffff) {
      bytes.push(
        0xe0 | (point >> 12),
        0x80 | ((point >> 6) & 0x3f),
        0x80 | (point & 0x3f)
      )
    } else {
      bytes.push(
        0xf0 | (point >> 18),
        0x80 | ((point >> 12) & 0x3f),
        0x80 | ((point >> 6) & 0x3f),
        0x80 | (point & 0x3f)
      )
    }
  }
  return bytes
}

const add = (x: number, y: number) => {
  const lsw = (x & 0xffff) + (y & 0xffff)
  return ((((x >> 16) + (y >> 16) + (lsw >> 16)) << 16) | (lsw & 0xffff))
}

const rotate = (value: number, count: number) =>
  (value << count) | (value >>> (32 - count))

const round = (
  value: number,
  a: number,
  b: number,
  x: number,
  shift: number,
  constant: number
) => add(rotate(add(add(a, value), add(x, constant)), shift), b)

const ff = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  shift: number,
  constant: number
) => round((b & c) | (~b & d), a, b, x, shift, constant)

const gg = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  shift: number,
  constant: number
) => round((b & d) | (c & ~d), a, b, x, shift, constant)

const hh = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  shift: number,
  constant: number
) => round(b ^ c ^ d, a, b, x, shift, constant)

const ii = (
  a: number,
  b: number,
  c: number,
  d: number,
  x: number,
  shift: number,
  constant: number
) => round(c ^ (b | ~d), a, b, x, shift, constant)

const toHex = (value: number) => {
  let result = ''
  for (let index = 0; index < 4; index += 1) {
    result += ((value >> (index * 8)) & 0xff)
      .toString(16)
      .padStart(2, '0')
  }
  return result
}

export const md5Text = (input: string) => {
  const bytes = utf8Bytes(input)
  const blocks: number[] = []
  bytes.forEach((byte, index) => {
    blocks[index >> 2] =
      (blocks[index >> 2] || 0) | (byte << ((index % 4) * 8))
  })
  blocks[bytes.length >> 2] =
    (blocks[bytes.length >> 2] || 0) |
    (0x80 << ((bytes.length % 4) * 8))
  const finalLength = (((bytes.length + 8) >> 6) + 1) * 16
  blocks[finalLength - 2] = bytes.length * 8
  blocks[finalLength - 1] = Math.floor(bytes.length / 0x20000000)

  let a = 0x67452301
  let b = -0x10325477
  let c = -0x67452302
  let d = 0x10325476

  for (let index = 0; index < blocks.length; index += 16) {
    const oldA = a
    const oldB = b
    const oldC = c
    const oldD = d
    const x = (offset: number) => blocks[index + offset] || 0

    a = ff(a, b, c, d, x(0), 7, -680876936)
    d = ff(d, a, b, c, x(1), 12, -389564586)
    c = ff(c, d, a, b, x(2), 17, 606105819)
    b = ff(b, c, d, a, x(3), 22, -1044525330)
    a = ff(a, b, c, d, x(4), 7, -176418897)
    d = ff(d, a, b, c, x(5), 12, 1200080426)
    c = ff(c, d, a, b, x(6), 17, -1473231341)
    b = ff(b, c, d, a, x(7), 22, -45705983)
    a = ff(a, b, c, d, x(8), 7, 1770035416)
    d = ff(d, a, b, c, x(9), 12, -1958414417)
    c = ff(c, d, a, b, x(10), 17, -42063)
    b = ff(b, c, d, a, x(11), 22, -1990404162)
    a = ff(a, b, c, d, x(12), 7, 1804603682)
    d = ff(d, a, b, c, x(13), 12, -40341101)
    c = ff(c, d, a, b, x(14), 17, -1502002290)
    b = ff(b, c, d, a, x(15), 22, 1236535329)

    a = gg(a, b, c, d, x(1), 5, -165796510)
    d = gg(d, a, b, c, x(6), 9, -1069501632)
    c = gg(c, d, a, b, x(11), 14, 643717713)
    b = gg(b, c, d, a, x(0), 20, -373897302)
    a = gg(a, b, c, d, x(5), 5, -701558691)
    d = gg(d, a, b, c, x(10), 9, 38016083)
    c = gg(c, d, a, b, x(15), 14, -660478335)
    b = gg(b, c, d, a, x(4), 20, -405537848)
    a = gg(a, b, c, d, x(9), 5, 568446438)
    d = gg(d, a, b, c, x(14), 9, -1019803690)
    c = gg(c, d, a, b, x(3), 14, -187363961)
    b = gg(b, c, d, a, x(8), 20, 1163531501)
    a = gg(a, b, c, d, x(13), 5, -1444681467)
    d = gg(d, a, b, c, x(2), 9, -51403784)
    c = gg(c, d, a, b, x(7), 14, 1735328473)
    b = gg(b, c, d, a, x(12), 20, -1926607734)

    a = hh(a, b, c, d, x(5), 4, -378558)
    d = hh(d, a, b, c, x(8), 11, -2022574463)
    c = hh(c, d, a, b, x(11), 16, 1839030562)
    b = hh(b, c, d, a, x(14), 23, -35309556)
    a = hh(a, b, c, d, x(1), 4, -1530992060)
    d = hh(d, a, b, c, x(4), 11, 1272893353)
    c = hh(c, d, a, b, x(7), 16, -155497632)
    b = hh(b, c, d, a, x(10), 23, -1094730640)
    a = hh(a, b, c, d, x(13), 4, 681279174)
    d = hh(d, a, b, c, x(0), 11, -358537222)
    c = hh(c, d, a, b, x(3), 16, -722521979)
    b = hh(b, c, d, a, x(6), 23, 76029189)
    a = hh(a, b, c, d, x(9), 4, -640364487)
    d = hh(d, a, b, c, x(12), 11, -421815835)
    c = hh(c, d, a, b, x(15), 16, 530742520)
    b = hh(b, c, d, a, x(2), 23, -995338651)

    a = ii(a, b, c, d, x(0), 6, -198630844)
    d = ii(d, a, b, c, x(7), 10, 1126891415)
    c = ii(c, d, a, b, x(14), 15, -1416354905)
    b = ii(b, c, d, a, x(5), 21, -57434055)
    a = ii(a, b, c, d, x(12), 6, 1700485571)
    d = ii(d, a, b, c, x(3), 10, -1894986606)
    c = ii(c, d, a, b, x(10), 15, -1051523)
    b = ii(b, c, d, a, x(1), 21, -2054922799)
    a = ii(a, b, c, d, x(8), 6, 1873313359)
    d = ii(d, a, b, c, x(15), 10, -30611744)
    c = ii(c, d, a, b, x(6), 15, -1560198380)
    b = ii(b, c, d, a, x(13), 21, 1309151649)
    a = ii(a, b, c, d, x(4), 6, -145523070)
    d = ii(d, a, b, c, x(11), 10, -1120210379)
    c = ii(c, d, a, b, x(2), 15, 718787259)
    b = ii(b, c, d, a, x(9), 21, -343485551)

    a = add(a, oldA)
    b = add(b, oldB)
    c = add(c, oldC)
    d = add(d, oldD)
  }

  return `${toHex(a)}${toHex(b)}${toHex(c)}${toHex(d)}`
}

const getSourceSessionInfo = (
  store: RootStore,
  nim: any,
  conversationId: string
) => {
  const sessionId =
    nim.V2NIMConversationIdUtil.parseConversationTargetId(conversationId)
  const conversationType =
    nim.V2NIMConversationIdUtil.parseConversationType(conversationId)
  const sessionName =
    conversationType ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
      ? store.teamStore.teams.get(sessionId)?.name || sessionId
      : store.userStore.users.get(sessionId)?.name || sessionId
  return { sessionId, sessionName }
}

const getCallAbstract = (msg: V2NIMMessageForUI) =>
  (msg.attachment as any)?.type == 1
    ? `[${t('voiceCallText')}]`
    : `[${t('videoCallText')}]`

const getAbstractContent = (
  store: RootStore,
  msg: V2NIMMessageForUI,
  chatHistoryText: string
) => {
  if (
    msg.messageType ===
    V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
  ) {
    return `[${t('audioMsgText')}]`
  }
  if (
    msg.messageType === V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
  ) {
    return getCallAbstract(msg)
  }
  return getMsgContentTipByType({
    messageType: msg.messageType,
    text: isMergedForwardMessage(store, msg)
      ? `[${chatHistoryText}]`
      : msg.text || '',
  })
}

const getAbstracts = (
  store: RootStore,
  messages: V2NIMMessageForUI[],
  chatHistoryText: string
): MergedForwardAbstract[] =>
  messages.slice(0, 3).map((msg) => {
    const senderId = (msg as any).__kit__senderId || msg.senderId
    return {
      senderNick: store.userStore.users.get(senderId)?.name || senderId,
      content: getAbstractContent(store, msg, chatHistoryText),
      userAccId: senderId,
    }
  })

const getRuntime = () => globalThis as any

const getPlatformRuntimes = () => {
  const runtime = getRuntime()
  return [runtime.uni, runtime.wx, runtime.my, runtime.tt, runtime.swan]
}

const getMiniProgramFileRuntime = () => {
  return getPlatformRuntimes().find(
    (platform) =>
      typeof platform?.getFileSystemManager === 'function' &&
      typeof platform?.env?.USER_DATA_PATH === 'string' &&
      platform.env.USER_DATA_PATH
  )
}

let mergedForwardTempFileSequence = 0

export const createMergedForwardTempFileName = () => {
  mergedForwardTempFileSequence += 1
  return `merged-forward-${Date.now()}-${mergedForwardTempFileSequence}.txt`
}

const createMiniProgramFile = async (content: string) => {
  const platform = getMiniProgramFileRuntime()
  const fileSystem = platform?.getFileSystemManager()
  const userDataPath = platform?.env.USER_DATA_PATH
  if (!fileSystem || !userDataPath) {
    return undefined
  }
  const filePath = `${userDataPath}/${createMergedForwardTempFileName()}`
  await new Promise<void>((resolve, reject) => {
    fileSystem.writeFile({
      filePath,
      data: content,
      encoding: 'utf8',
      success: () => resolve(),
      fail: reject,
    })
  })
  return {
    source: filePath,
    cleanup: () =>
      new Promise<void>((resolve) => {
        fileSystem.unlink({
          filePath,
          success: () => resolve(),
          fail: () => resolve(),
        })
      }),
  }
}

const createAppPlusFile = async (content: string) => {
  const plus = getRuntime().plus
  if (!plus?.io) {
    return undefined
  }
  return new Promise<{ source: string; cleanup: () => Promise<void> }>(
    (resolve, reject) => {
      plus.io.requestFileSystem(
        plus.io.PRIVATE_DOC,
        (fileSystem: any) => {
          fileSystem.root.getFile(
            createMergedForwardTempFileName(),
            { create: true },
            (entry: any) => {
              entry.createWriter(
                (writer: any) => {
                  writer.onwrite = () =>
                    resolve({
                      source: entry.toLocalURL(),
                      cleanup: () =>
                        new Promise<void>((cleanupResolve) => {
                          entry.remove(cleanupResolve, cleanupResolve)
                        }),
                    })
                  writer.onerror = reject
                  writer.write(content)
                },
                reject
              )
            },
            reject
          )
        },
        reject
      )
    }
  )
}

const createH5File = (content: string) => {
  const runtime = getRuntime()
  if (
    typeof runtime.File !== 'function' ||
    typeof runtime.URL?.createObjectURL !== 'function'
  ) {
    return undefined
  }
  const source = runtime.URL.createObjectURL(
    new runtime.File([content], 'mergedMsgs.txt', { type: 'text/plain' })
  )
  return {
    source,
    cleanup: async () => runtime.URL.revokeObjectURL?.(source),
  }
}

const defaultFileAdapter: MergedForwardFileAdapter = {
  async create(content) {
    const miniProgramFile = await createMiniProgramFile(content)
    if (miniProgramFile) {
      return miniProgramFile
    }
    const appFile = await createAppPlusFile(content)
    if (appFile) {
      return appFile
    }
    const h5File = createH5File(content)
    if (h5File) {
      return h5File
    }
    throw new Error('Merged forward file system is unavailable')
  },
  download(url) {
    return new Promise<string>((resolve, reject) => {
      uni.request({
        url,
        method: 'GET',
        responseType: 'text',
        success: (response: any) => {
          if (response.statusCode < 200 || response.statusCode >= 300) {
            reject(new Error(`Merged forward download failed: ${response.statusCode}`))
            return
          }
          resolve(
            typeof response.data === 'string'
              ? response.data
              : String(response.data || '')
          )
        },
        fail: reject,
      })
    })
  },
}

export const sendMergedForwardMessage = async ({
  store,
  nim,
  messages,
  targetConversationId,
  sourceConversationId,
  appVersion,
  sdkVersion,
  chatHistoryText,
  comment,
  fileAdapter = defaultFileAdapter,
}: SendMergedForwardOptions) => {
  const sortedMessages = [...messages].sort(
    (left, right) => left.createTime - right.createTime
  )
  const originalGetAppellation = store.uiStore.getAppellation
  let content = ''
  let depth = 1

  try {
    store.uiStore.getAppellation = ({ account }: { account: string }) =>
      store.userStore.users.get(account)?.name || account
    const serialized = store.msgStore.serializeMergeMsgs(
      sortedMessages as unknown as V2NIMMessage[],
      { appVersion, sdkVersion }
    )
    content = serialized.content
    depth = serialized.depth
  } finally {
    store.uiStore.getAppellation = originalGetAppellation
  }

  const uploadSource = await fileAdapter.create(content)
  let url = ''
  try {
    url = await store.storageStore.uploadFileActive(uploadSource.source)
  } finally {
    await uploadSource.cleanup()
  }

  const { sessionId, sessionName } = getSourceSessionInfo(
    store,
    nim,
    sourceConversationId
  )
  const payload: MergedForwardPayload = {
    type: MERGED_FORWARD_TYPE,
    data: {
      abstracts: getAbstracts(store, sortedMessages, chatHistoryText),
      depth,
      md5: md5Text(content),
      sessionId,
      sessionName,
      url,
    },
  }
  const customMessage = nim.V2NIMMessageCreator.createCustomMessage(
    `[${chatHistoryText}]`,
    JSON.stringify(payload)
  )
  const requests = [
    store.msgStore.sendMessageActive({
      msg: customMessage,
      conversationId: targetConversationId,
    }),
  ]
  if (comment) {
    requests.push(
      store.msgStore.sendMessageActive({
        msg: nim.V2NIMMessageCreator.createTextMessage(comment),
        conversationId: targetConversationId,
      })
    )
  }
  await Promise.all(requests)
}

export const sendOneByOneForwardMessages = async ({
  store,
  messages,
  targetConversationId,
  comment,
}: SendOneByOneForwardOptions) => {
  for (let index = 0; index < messages.length; index += 1) {
    await store.msgStore.forwardMsgActive(
      messages[index],
      targetConversationId,
      index === messages.length - 1 ? comment : undefined
    )
  }
}

export const loadMergedForwardMessages = async ({
  store,
  payload,
  fileAdapter = defaultFileAdapter,
}: LoadMergedForwardOptions) => {
  const url = payload.data.url
  if (!url) {
    throw new Error('Merged forward url missing')
  }
  const downloadedContent = await fileAdapter.download(url)
  if (payload.data.md5 && md5Text(downloadedContent) !== payload.data.md5) {
    throw new Error('Merged forward md5 mismatch')
  }
  const content = normalizeMergedForwardText(downloadedContent)
  const messages = store.msgStore.deserializeMergeMsgs(
    content
  ) as V2NIMMessageForUI[]
  if (!messages?.length) {
    throw new Error('Merged forward deserialize failed')
  }
  return messages
}
