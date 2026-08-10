export const FORWARD_TARGET_LIMIT = 9
const RECENT_FORWARD_LIMIT = 5
const RECENT_FORWARD_STORAGE_KEY = 'nim_recent_forwards_v2'

export interface ForwardTarget {
  id: string
  type: number
  name: string
  avatar?: string
  memberCount?: number
}

export interface RecentForwardTarget {
  id: string
  type: 'p2p' | 'team'
  name: string
}

export interface ForwardTargetStorage {
  getStorageSync(key: string): unknown
  setStorageSync(key: string, value: unknown): unknown
}

export const toggleForwardTargetSelection = (
  selectedIds: string[],
  targetId: string
) => {
  if (selectedIds.includes(targetId)) {
    return {
      selectedIds: selectedIds.filter((id) => id !== targetId),
      limited: false,
    }
  }
  if (selectedIds.length >= FORWARD_TARGET_LIMIT) {
    return { selectedIds, limited: true }
  }
  return { selectedIds: [...selectedIds, targetId], limited: false }
}

export const collectForwardTargets = (
  selectedIds: string[],
  targetLists: ForwardTarget[][]
) => {
  const targetMap = new Map<string, ForwardTarget>()
  targetLists.flat().forEach((target) => targetMap.set(target.id, target))
  return selectedIds.reduce<ForwardTarget[]>((targets, id) => {
    const target = targetMap.get(id)
    if (target) targets.push(target)
    return targets
  }, [])
}

const getStorageKey = (accountId?: string) =>
  accountId
    ? `${RECENT_FORWARD_STORAGE_KEY}_${accountId}`
    : RECENT_FORWARD_STORAGE_KEY

export const getRecentForwardTargets = (
  storage: ForwardTargetStorage,
  accountId?: string
): RecentForwardTarget[] => {
  try {
    const stored = storage.getStorageSync(getStorageKey(accountId))
    const value = typeof stored === 'string' ? JSON.parse(stored) : stored
    if (!Array.isArray(value)) return []
    return value.filter(
      (item): item is RecentForwardTarget =>
        !!item &&
        typeof item.id === 'string' &&
        (item.type === 'p2p' || item.type === 'team') &&
        typeof item.name === 'string'
    )
  } catch {
    return []
  }
}

export const addRecentForwardTargets = (
  storage: ForwardTargetStorage,
  targets: ForwardTarget[],
  accountId: string | undefined,
  p2pConversationType: number
) => {
  const recentTargets = getRecentForwardTargets(storage, accountId)
  targets.forEach((target) => {
    const existingIndex = recentTargets.findIndex((item) => item.id === target.id)
    if (existingIndex >= 0) recentTargets.splice(existingIndex, 1)
    recentTargets.unshift({
      id: target.id,
      type: target.type === p2pConversationType ? 'p2p' : 'team',
      name: target.name,
    })
    if (recentTargets.length > RECENT_FORWARD_LIMIT) recentTargets.pop()
  })
  storage.setStorageSync(getStorageKey(accountId), recentTargets)
}
