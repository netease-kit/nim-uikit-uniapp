import { afterEach, describe, expect, it, vi } from 'vitest'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

vi.mock('../../utils/nim', () => ({
  V2NIMConst: {
    V2NIMConversationType: {
      V2NIM_CONVERSATION_TYPE_P2P: 1,
      V2NIM_CONVERSATION_TYPE_TEAM: 2,
    },
    V2NIMMessageType: {
      V2NIM_MESSAGE_TYPE_TEXT: 0,
      V2NIM_MESSAGE_TYPE_IMAGE: 1,
      V2NIM_MESSAGE_TYPE_AUDIO: 2,
      V2NIM_MESSAGE_TYPE_VIDEO: 3,
      V2NIM_MESSAGE_TYPE_FILE: 6,
      V2NIM_MESSAGE_TYPE_CALL: 12,
      V2NIM_MESSAGE_TYPE_CUSTOM: 100,
    },
  },
}))

vi.mock('../../utils/i18n', () => ({
  t: (key: string) =>
    ({
      audioMsgText: '语音消息',
      voiceCallText: '语音通话',
      videoCallText: '视频通话',
    } as Record<string, string>)[key] || key,
}))

vi.mock('../../utils/msg', () => ({
  getMsgContentTipByType: ({ text, messageType }: any) =>
    messageType === 0 ? text : `[type-${messageType}]`,
}))

import {
  createMergedForwardTempFileName,
  loadMergedForwardMessages,
  md5Text,
  normalizeMergedForwardText,
  parseMergedForwardPayload,
  sendOneByOneForwardMessages,
  sendMergedForwardMessage,
} from '../../components/NEUIKit/utils/mergedForward'

const payload = {
  type: 101 as const,
  data: {
    abstracts: [],
    depth: 1,
    md5: '',
    sessionId: 'you',
    sessionName: 'You',
    url: 'https://example.test/merged.txt',
  },
}

const message = (overrides: Record<string, unknown> = {}) =>
  ({
    messageClientId: 'm1',
    messageServerId: 's1',
    conversationId: 'me|1|you',
    conversationType: 1,
    senderId: 'alice',
    receiverId: 'you',
    createTime: 1,
    messageType: 0,
    text: 'hello',
    ...overrides,
  }) as any

describe('mergedForward', () => {
  it('creates unique temp file names for parallel target uploads', () => {
    const now = vi.spyOn(Date, 'now').mockReturnValue(1000)

    const first = createMergedForwardTempFileName()
    const second = createMergedForwardTempFileName()

    expect(first).not.toBe(second)
    expect(first).toMatch(/^merged-forward-1000-\d+\.txt$/)
    expect(second).toMatch(/^merged-forward-1000-\d+\.txt$/)
    now.mockRestore()
  })

  it('parses type 101 payloads from attachment, content, or text', () => {
    const raw = JSON.stringify(payload)

    expect(
      parseMergedForwardPayload({ messageType: 100, attachment: { raw } } as any)
        ?.data.sessionName
    ).toBe('You')
    expect(
      parseMergedForwardPayload({ messageType: 100, content: raw } as any)?.data
        .sessionName
    ).toBe('You')
    expect(
      parseMergedForwardPayload({ messageType: 100, text: raw } as any)?.data
        .sessionName
    ).toBe('You')
    expect(
      parseMergedForwardPayload({
        messageType: 100,
        attachment: { raw: '{"type":102}' },
      } as any)
    ).toBeUndefined()
  })

  it('computes UTF-8 MD5 without browser or Node crypto APIs', () => {
    expect(md5Text('hello')).toBe('5d41402abc4b2a76b9719d911017c592')
    expect(md5Text('聊天记录')).toBe('71f3e3ee9baf6d3364add16dd3114fcd')
    expect(md5Text('A😀B')).toBe('7e986f64b1b2b0279bc2cada722558a1')
  })

  it('normalizes numeric messageServerId field 12', () => {
    expect(normalizeMergedForwardText('{"12":123,"text":"ok"}')).toBe(
      '{"12":"123","text":"ok"}'
    )
  })

  it('serializes in source order, restores nickname lookup, and cleans files', async () => {
    const originalGetAppellation = vi.fn(() => 'alias')
    const cleanup = vi.fn(async () => undefined)
    const serializeMergeMsgs = vi.fn((messages: any[]) => {
      expect(messages.map((item) => item.messageClientId)).toEqual(['m1', 'm2'])
      expect(store.uiStore.getAppellation({ account: 'alice' })).toBe('Alice')
      return { content: 'serialized-content', depth: 1 }
    })
    const sendMessageActive = vi.fn(async () => undefined)
    const store: any = {
      uiStore: { getAppellation: originalGetAppellation },
      userStore: {
        users: new Map([
          ['alice', { name: 'Alice' }],
          ['bob', { name: 'Bob' }],
          ['you', { name: 'You' }],
        ]),
      },
      teamStore: { teams: new Map() },
      msgStore: {
        serializeMergeMsgs,
        sendMessageActive,
        isChatMergedForwardMsg: () => false,
      },
      storageStore: {
        uploadFileActive: vi.fn(async () => 'https://example.test/file'),
      },
    }
    const nim: any = {
      V2NIMConversationIdUtil: {
        parseConversationTargetId: () => 'you',
        parseConversationType: () => 1,
      },
      V2NIMMessageCreator: {
        createCustomMessage: (text: string, rawAttachment: string) => ({
          kind: 'custom',
          text,
          rawAttachment,
        }),
        createTextMessage: (text: string) => ({ kind: 'text', text }),
      },
    }
    const fileAdapter = {
      create: vi.fn(async () => ({ source: '/tmp/merged.txt', cleanup })),
      download: vi.fn(),
    }

    await sendMergedForwardMessage({
      store,
      nim,
      messages: [
        message({ messageClientId: 'm2', senderId: 'bob', createTime: 2 }),
        message({ messageClientId: 'm1', senderId: 'alice', createTime: 1 }),
      ],
      targetConversationId: 'me|1|target',
      sourceConversationId: 'me|1|you',
      appVersion: '10.6.0',
      sdkVersion: '10.9.81',
      chatHistoryText: '聊天记录',
      comment: 'comment',
      fileAdapter,
    })

    expect(store.uiStore.getAppellation).toBe(originalGetAppellation)
    expect(cleanup).toHaveBeenCalledOnce()
    expect(sendMessageActive).toHaveBeenCalledTimes(2)
    const custom = (sendMessageActive.mock.calls as any)[0][0].msg
    const sentPayload = JSON.parse(custom.rawAttachment)
    expect(custom.text).toBe('[聊天记录]')
    expect(sentPayload).toMatchObject({
      type: 101,
      data: {
        depth: 1,
        sessionId: 'you',
        sessionName: 'You',
        url: 'https://example.test/file',
      },
    })
    expect(sentPayload.data.md5).toBe(md5Text('serialized-content'))
  })

  it('cleans the upload source and restores nickname lookup after failure', async () => {
    const originalGetAppellation = vi.fn(() => 'alias')
    const cleanup = vi.fn(async () => undefined)
    const store: any = {
      uiStore: { getAppellation: originalGetAppellation },
      userStore: { users: new Map() },
      teamStore: { teams: new Map() },
      msgStore: {
        serializeMergeMsgs: () => ({ content: 'serialized', depth: 1 }),
      },
      storageStore: {
        uploadFileActive: vi.fn(async () => {
          throw new Error('upload failed')
        }),
      },
    }
    const fileAdapter = {
      create: vi.fn(async () => ({ source: '/tmp/merged.txt', cleanup })),
      download: vi.fn(),
    }

    await expect(
      sendMergedForwardMessage({
        store,
        nim: {} as any,
        messages: [message()],
        targetConversationId: 'target',
        sourceConversationId: 'source',
        appVersion: '10.6.0',
        sdkVersion: '10.9.81',
        chatHistoryText: '聊天记录',
        fileAdapter,
      })
    ).rejects.toThrow('upload failed')

    expect(store.uiStore.getAppellation).toBe(originalGetAppellation)
    expect(cleanup).toHaveBeenCalledOnce()
  })

  it('uploads a temporary blob path on H5 and revokes it afterward', async () => {
    const createObjectURL = vi
      .spyOn(URL, 'createObjectURL')
      .mockReturnValue('blob:merged-forward')
    const revokeObjectURL = vi
      .spyOn(URL, 'revokeObjectURL')
      .mockImplementation(() => undefined)
    const uploadFileActive = vi.fn(async () => 'https://example.test/file')
    const store: any = {
      uiStore: { getAppellation: vi.fn(() => 'Alice') },
      userStore: { users: new Map([['alice', { name: 'Alice' }]]) },
      teamStore: { teams: new Map() },
      msgStore: {
        serializeMergeMsgs: () => ({ content: 'serialized', depth: 1 }),
        sendMessageActive: vi.fn(async () => undefined),
        isChatMergedForwardMsg: () => false,
      },
      storageStore: { uploadFileActive },
    }
    const nim: any = {
      V2NIMConversationIdUtil: {
        parseConversationTargetId: () => 'alice',
        parseConversationType: () => 1,
      },
      V2NIMMessageCreator: {
        createCustomMessage: (text: string, rawAttachment: string) => ({
          text,
          rawAttachment,
        }),
      },
    }

    await sendMergedForwardMessage({
      store,
      nim,
      messages: [message()],
      targetConversationId: 'target',
      sourceConversationId: 'source',
      appVersion: '10.6.0',
      sdkVersion: '10.9.81',
      chatHistoryText: '聊天记录',
    })

    expect(createObjectURL).toHaveBeenCalledOnce()
    expect(uploadFileActive).toHaveBeenCalledWith('blob:merged-forward')
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:merged-forward')
  })

  it('uploads through the native WeChat file system when uni is not global', async () => {
    const writeFile = vi.fn(({ success }) => success())
    const unlink = vi.fn(({ success }) => success())
    const uploadFileActive = vi.fn(async () => 'https://example.test/file')
    vi.stubGlobal('uni', undefined)
    vi.stubGlobal('wx', {
      env: { USER_DATA_PATH: 'wxfile://usr' },
      getFileSystemManager: () => ({ writeFile, unlink }),
    })
    vi.stubGlobal('File', undefined)

    const store: any = {
      uiStore: { getAppellation: vi.fn(() => 'Alice') },
      userStore: { users: new Map([['alice', { name: 'Alice' }]]) },
      teamStore: { teams: new Map() },
      msgStore: {
        serializeMergeMsgs: () => ({ content: 'serialized', depth: 1 }),
        sendMessageActive: vi.fn(async () => undefined),
        isChatMergedForwardMsg: () => false,
      },
      storageStore: { uploadFileActive },
    }
    const nim: any = {
      V2NIMConversationIdUtil: {
        parseConversationTargetId: () => 'alice',
        parseConversationType: () => 1,
      },
      V2NIMMessageCreator: {
        createCustomMessage: (text: string, rawAttachment: string) => ({
          text,
          rawAttachment,
        }),
      },
    }

    await sendMergedForwardMessage({
      store,
      nim,
      messages: [message()],
      targetConversationId: 'target',
      sourceConversationId: 'source',
      appVersion: '10.6.0',
      sdkVersion: '10.9.81',
      chatHistoryText: '聊天记录',
    })

    expect(writeFile).toHaveBeenCalledWith(
      expect.objectContaining({
        filePath: expect.stringMatching(
          /^wxfile:\/\/usr\/merged-forward-\d+-\d+\.txt$/
        ),
        data: 'serialized',
        encoding: 'utf8',
      })
    )
    const filePath = writeFile.mock.calls[0][0].filePath
    expect(uploadFileActive).toHaveBeenCalledWith(filePath)
    expect(unlink).toHaveBeenCalledWith(
      expect.objectContaining({ filePath })
    )
  })

  it('loads, verifies, and deserializes merged messages', async () => {
    const content = '{"header":true}\n{"message":true}'
    const messages = [message()]
    const store: any = {
      msgStore: { deserializeMergeMsgs: vi.fn(() => messages) },
    }
    const fileAdapter = {
      create: vi.fn(),
      download: vi.fn(async () => content),
    }

    const result = await loadMergedForwardMessages({
      store,
      payload: {
        ...payload,
        data: { ...payload.data, md5: md5Text(content) },
      },
      fileAdapter,
    })

    expect(result).toEqual(messages)
    await expect(
      loadMergedForwardMessages({
        store,
        payload: { ...payload, data: { ...payload.data, md5: 'bad' } },
        fileAdapter,
      })
    ).rejects.toThrow('md5')
  })

  it('downloads through the cross-platform UniApp request API', async () => {
    const content = '{"message":true}'
    const messages = [message()]
    const request = vi.fn(({ success }) =>
      success({ statusCode: 200, data: content })
    )
    vi.stubGlobal('uni', { request })

    const result = await loadMergedForwardMessages({
      store: {
        msgStore: { deserializeMergeMsgs: vi.fn(() => messages) },
      } as any,
      payload: {
        ...payload,
        data: { ...payload.data, md5: md5Text(content) },
      },
    })

    expect(result).toEqual(messages)
    expect(request).toHaveBeenCalledWith(
      expect.objectContaining({
        url: payload.data.url,
        method: 'GET',
        responseType: 'text',
      })
    )
  })

  it('verifies the downloaded source before normalizing numeric field 12', async () => {
    const rawContent = '{"12":123,"text":"hello"}\n'
    const normalizedContent = '{"12":"123","text":"hello"}\n'
    const messages = [message()]
    const deserializeMergeMsgs = vi.fn(() => messages)

    const result = await loadMergedForwardMessages({
      store: { msgStore: { deserializeMergeMsgs } } as any,
      payload: {
        ...payload,
        data: { ...payload.data, md5: md5Text(rawContent) },
      },
      fileAdapter: {
        create: vi.fn(),
        download: vi.fn(async () => rawContent),
      },
    })

    expect(result).toEqual(messages)
    expect(deserializeMergeMsgs).toHaveBeenCalledWith(normalizedContent)
  })

  it('forwards messages sequentially and attaches the comment only once', async () => {
    let releaseFirst: (() => void) | undefined
    const firstPending = new Promise<void>((resolve) => {
      releaseFirst = resolve
    })
    const forwardMsgActive = vi
      .fn()
      .mockImplementationOnce(() => firstPending)
      .mockResolvedValue(undefined)
    const messages = [
      message({ messageClientId: 'first' }),
      message({ messageClientId: 'second' }),
    ]

    const pending = sendOneByOneForwardMessages({
      store: { msgStore: { forwardMsgActive } } as any,
      messages,
      targetConversationId: 'me|1|target',
      comment: 'comment',
    })
    await Promise.resolve()

    expect(forwardMsgActive).toHaveBeenCalledTimes(1)
    expect(forwardMsgActive).toHaveBeenNthCalledWith(
      1,
      messages[0],
      'me|1|target',
      undefined
    )

    releaseFirst?.()
    await pending

    expect(forwardMsgActive).toHaveBeenNthCalledWith(
      2,
      messages[1],
      'me|1|target',
      'comment'
    )
  })
})
