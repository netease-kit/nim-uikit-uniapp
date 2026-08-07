import type { V2NIMMessageForUI } from './module/im-store-v2/types/src'

export const getMessageSelectKey = (
  msg?: Partial<V2NIMMessageForUI>
): string => {
  if (!msg) {
    return ''
  }
  if (msg.messageServerId && msg.messageServerId !== '0') {
    return `server-${msg.messageServerId}`
  }
  if (msg.messageClientId) {
    return `client-${msg.messageClientId}`
  }
  return `local-${msg.conversationId || ''}-${msg.senderId || ''}-${
    msg.createTime || 0
  }`
}
