import type { V2NIMMessageForUI } from './store'
import { getMessageSelectKey } from './messageKey'

export type ForwardMode = 'single' | 'oneByOne' | 'merged'

export interface ForwardTask {
  id: string
  mode: ForwardMode
  sourceConversationId: string
  messageKeys: string[]
  createdAt: number
}

export interface MergedViewerTask {
  id: string
  title: string
  messages: V2NIMMessageForUI[]
  createdAt: number
}

const FORWARD_TASK_TTL = 10 * 60 * 1000

let taskSequence = 0
let activeForwardTask: ForwardTask | undefined
const viewerTasks = new Map<string, MergedViewerTask>()

const createTaskId = (prefix: string) => {
  taskSequence += 1
  return `${prefix}-${Date.now()}-${taskSequence}`
}

export const createForwardTask = (
  input: Omit<ForwardTask, 'id' | 'createdAt'>
) => {
  const task: ForwardTask = {
    ...input,
    id: createTaskId('forward'),
    createdAt: Date.now(),
  }
  activeForwardTask = task
  return task.id
}

export const getForwardTask = (id: string) => {
  if (!activeForwardTask || activeForwardTask.id !== id) {
    return undefined
  }
  if (Date.now() - activeForwardTask.createdAt > FORWARD_TASK_TTL) {
    activeForwardTask = undefined
    return undefined
  }
  return activeForwardTask
}

export const completeForwardTask = (id: string) => {
  if (!activeForwardTask || activeForwardTask.id !== id) {
    return false
  }
  activeForwardTask = undefined
  return true
}

export const resolveForwardTaskMessages = (
  task: ForwardTask,
  messages: V2NIMMessageForUI[]
) => {
  const selectedKeys = new Set(task.messageKeys)
  return messages.filter((message) =>
    selectedKeys.has(getMessageSelectKey(message))
  )
}

export const createMergedViewerTask = (
  input: Omit<MergedViewerTask, 'id' | 'createdAt'>
) => {
  const task: MergedViewerTask = {
    ...input,
    id: createTaskId('viewer'),
    createdAt: Date.now(),
  }
  viewerTasks.set(task.id, task)
  return task.id
}

export const getMergedViewerTask = (id: string) => viewerTasks.get(id)

export const removeMergedViewerTask = (id: string) => {
  viewerTasks.delete(id)
}

export const clearForwardTasks = () => {
  activeForwardTask = undefined
  viewerTasks.clear()
}
