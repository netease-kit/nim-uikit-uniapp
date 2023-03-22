// 自定义的一些事件常量
export const events = {
  // 自己发出一条消息
  SEND_MSG: 'sendMsg',
  // 收到一条消息
  ON_MSG: 'onMsg',
  // 加载更多
  ON_LOAD_MORE: 'onLoadMore',
  // 首次进入聊天页并获取历史记录
  ON_CHAT_MOUNTED: 'onChatMounted',
  // 重新编辑撤回消息
  ON_REEDIT_MSG: 'onReEditMsg',
  // 页面触底
  ON_REACH_BOTTOM: 'onReachBottom',
  // 页面触顶
  ON_REACH_TOP: 'onReactTop',
}

export const HISTORY_LIMIT = 15

export const MSG_ID_FLAG = 'message-item-'
