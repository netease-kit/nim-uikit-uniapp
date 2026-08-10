import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  clearForwardTasks,
  completeForwardTask,
  createForwardTask,
  createMergedViewerTask,
  getForwardTask,
  getMergedViewerTask,
  removeMergedViewerTask,
  resolveForwardTaskMessages,
} from '../../components/NEUIKit/utils/forwardTask'

describe('forwardTask', () => {
  beforeEach(() => {
    clearForwardTasks()
    vi.useRealTimers()
  })

  it('keeps only the latest forward task', () => {
    const first = createForwardTask({
      mode: 'oneByOne',
      sourceConversationId: 'a|1|b',
      messageKeys: ['client-1'],
    })
    const second = createForwardTask({
      mode: 'merged',
      sourceConversationId: 'a|1|b',
      messageKeys: ['client-2'],
    })

    expect(getForwardTask(first)).toBeUndefined()
    expect(getForwardTask(second)?.mode).toBe('merged')
  })

  it('expires a forward task after ten minutes', () => {
    vi.useFakeTimers()
    const id = createForwardTask({
      mode: 'merged',
      sourceConversationId: 'a|1|b',
      messageKeys: ['client-1'],
    })

    vi.advanceTimersByTime(10 * 60 * 1000 + 1)

    expect(getForwardTask(id)).toBeUndefined()
  })

  it('consumes only the matching task on completion', () => {
    const id = createForwardTask({
      mode: 'merged',
      sourceConversationId: 'a|1|b',
      messageKeys: ['client-1'],
    })

    expect(completeForwardTask('wrong')).toBe(false)
    expect(completeForwardTask(id)).toBe(true)
    expect(getForwardTask(id)).toBeUndefined()
  })

  it('stores and removes a viewer task without persistence', () => {
    const id = createMergedViewerTask({
      title: '聊天记录',
      messages: [{ messageClientId: 'm1' }] as any,
    })

    expect(getMergedViewerTask(id)?.messages[0].messageClientId).toBe('m1')
    removeMergedViewerTask(id)
    expect(getMergedViewerTask(id)).toBeUndefined()
  })

  it('resolves selected messages in source-list order by stable key', () => {
    const id = createForwardTask({
      mode: 'oneByOne',
      sourceConversationId: 'a|1|b',
      messageKeys: ['server-s2', 'server-s1'],
    })
    const first = { messageServerId: 's1' }
    const second = { messageServerId: 's2' }
    const unselected = { messageServerId: 's3' }

    expect(
      resolveForwardTaskMessages(getForwardTask(id)!, [
        first,
        unselected,
        second,
      ] as any)
    ).toEqual([first, second])
  })
})
