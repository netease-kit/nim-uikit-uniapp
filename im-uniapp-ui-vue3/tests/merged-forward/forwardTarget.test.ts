import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import {
  FORWARD_TARGET_LIMIT,
  addRecentForwardTargets,
  collectForwardTargets,
  getRecentForwardTargets,
  toggleForwardTargetSelection,
  type ForwardTarget,
  type ForwardTargetStorage,
} from '../../components/NEUIKit/utils/forwardTarget'

const target = (id: string, type = 1): ForwardTarget => ({
  id,
  type,
  name: id,
})

const createStorage = (): ForwardTargetStorage & {
  data: Map<string, unknown>
} => {
  const data = new Map<string, unknown>()
  return {
    data,
    getStorageSync: (key) => data.get(key),
    setStorageSync: (key, value) => data.set(key, value),
  }
}

describe('forwardTarget', () => {
  it('limits multi-target forwarding to nine conversations', () => {
    let selectedIds: string[] = []
    for (let index = 0; index < FORWARD_TARGET_LIMIT; index += 1) {
      const result = toggleForwardTargetSelection(selectedIds, `target-${index}`)
      expect(result.limited).toBe(false)
      selectedIds = result.selectedIds
    }

    const limited = toggleForwardTargetSelection(selectedIds, 'target-10')
    expect(limited.limited).toBe(true)
    expect(limited.selectedIds).toEqual(selectedIds)

    const removed = toggleForwardTargetSelection(selectedIds, 'target-0')
    expect(removed.limited).toBe(false)
    expect(removed.selectedIds).not.toContain('target-0')
  })

  it('collects targets across tabs in selection order without duplicates', () => {
    expect(
      collectForwardTargets(
        ['team-1', 'friend-1', 'recent-1'],
        [
          [target('recent-1')],
          [target('friend-1')],
          [target('team-1', 2), target('friend-1')],
        ]
      ).map((item) => item.id)
    ).toEqual(['team-1', 'friend-1', 'recent-1'])
  })

  it('stores five recent targets per account in newest-first order', () => {
    const storage = createStorage()
    addRecentForwardTargets(
      storage,
      [target('a'), target('b', 2), target('c'), target('d'), target('e')],
      'account-1',
      1
    )
    addRecentForwardTargets(storage, [target('f'), target('b', 2)], 'account-1', 1)
    addRecentForwardTargets(storage, [target('other')], 'account-2', 1)

    expect(
      getRecentForwardTargets(storage, 'account-1').map((item) => item.id)
    ).toEqual(['b', 'f', 'e', 'd', 'c'])
    expect(getRecentForwardTargets(storage, 'account-1')[0].type).toBe('team')
    expect(getRecentForwardTargets(storage, 'account-2')[0].id).toBe('other')
  })

  it('renders the H5-aligned selector and multi-target confirmation contracts', () => {
    const selector = readFileSync(
      resolve(
        process.cwd(),
        'components/NEUIKit/pages/Chat/message/forward/forward-selector.vue'
      ),
      'utf8'
    )
    const page = readFileSync(resolve(process.cwd(), 'components/NEUIKit/pages/Chat/forward.vue'), 'utf8')
    const modal = readFileSync(
      resolve(process.cwd(), 'components/NEUIKit/pages/Chat/message/forward/forward-modal.vue'),
      'utf8'
    )

    for (const marker of [
      'recentSessionText',
      'myFriendText',
      'teamChooseText',
      'recentForwardText',
      'forward-search-input',
      'forward-selected-detail',
      'toggleForwardTargetSelection',
      'handleTabChange',
    ]) {
      expect(selector).toContain(marker)
    }
    expect(page).toContain("import ForwardSelector from './message/forward/forward-selector.vue'")
    expect(page).toContain('forwardTargets')
    expect(modal).toContain('forwardTargets?: ForwardTarget[]')
    expect(modal).toContain('multi-targets-wrapper')
  })

  it('provides the forwarding failure key used by the page in both locales', () => {
    const english = readFileSync(resolve(process.cwd(), 'components/NEUIKit/locale/en.ts'), 'utf8')
    const chinese = readFileSync(
      resolve(process.cwd(), 'components/NEUIKit/locale/zh-Hans.ts'),
      'utf8'
    )

    expect(english).toContain('forwardFailedText:')
    expect(chinese).toContain('forwardFailedText:')
  })
})
