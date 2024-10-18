import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK'
import { t } from './i18n'
import { V2NIMMessageType } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMMessageService'

const translate = (key: string): string => {
  const text =
    {
      textMsgText: t('textMsgText'),
      customMsgText: t('customMsgText'),
      audioMsgText: t('audioMsgText'),
      videoMsgText: t('videoMsgText'),
      fileMsgText: t('fileMsgText'),
      callMsgText: t('callMsgText'),
      geoMsgText: t('geoMsgText'),
      imgMsgText: t('imgMsgText'),
      notiMsgText: t('notiMsgText'),
      robotMsgText: t('robotMsgText'),
      tipMsgText: t('tipMsgText'),
      unknowMsgText: t('unknowMsgText'),
    }[key] || ''
  return `[${text}]`
}

export const getMsgContentTipByType = (msg: {
  messageType?: V2NIMMessageType
  text?: string
}): string => {
  const { messageType, text } = msg
  switch (messageType) {
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT:
      return text || translate('textMsgText')
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE:
      return translate('fileMsgText')
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE:
      return translate('imgMsgText')
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM:
      return text || translate('customMsgText')
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO:
      return translate('audioMsgText')
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL:
      return translate('callMsgText')
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_LOCATION:
      return translate('geoMsgText')
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION:
      return translate('notiMsgText')
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_ROBOT:
      return translate('robotMsgText')
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TIPS:
      return translate('tipMsgText')
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO:
      return translate('videoMsgText')
    default:
      return translate('unknowMsgText')
  }
}

export const setTabUnread = (): void => {
  const routes = getCurrentPages()
  const curRoute = routes[routes.length - 1].route
  const tabPaths = [
    'pages/user-card/my/index',
    'pages/Contact/index',
    'pages/Conversation/index',
  ]
  if (curRoute && !tabPaths.includes(curRoute)) {
    // 不是首页和聊天页，不需要设置tabbar的badge
    return
  }

  const store = uni.$UIKitStore
  const unread = store?.conversationStore.totalUnreadCount || 0
  if (unread === 0) {
    uni.hideTabBarRedDot({
      //隐藏数字
      index: 0, //tabbar下标
    })
  } else {
    uni.showTabBarRedDot({
      index: 0, //tabbar下标
    })
  }
  /**
   * 此为展示tabbar的未读消息数字的写法
  if (unread === 0) {
    uni.removeTabBarBadge({
      //隐藏数字
      index: 0, //tabbar下标
    })
  } else {
    uni.setTabBarBadge({
      //显示数字
      index: 0, //tabbar下标
      text: unread > 99 ? '99+' : unread.toString(), //显示的数字
    })
  }
   */
}

export const setContactTabUnread = (): void => {
  const routes = getCurrentPages()
  const curRoute = routes[routes.length - 1].route
  const tabPaths = [
    'pages/user-card/my/index',
    'pages/Contact/index',
    'pages/Conversation/index',
  ]
  if (curRoute && !tabPaths.includes(curRoute)) {
    // 不是首页和聊天页，不需要设置tabbar的badge
    return
  }
  const unread = uni.$UIKitStore?.sysMsgStore?.getTotalUnreadMsgsCount()
  if (unread === 0) {
    uni.hideTabBarRedDot({
      //隐藏数字
      index: 1, //tabbar下标
    })
  } else {
    uni.showTabBarRedDot({
      index: 1, //tabbar下标
    })
  }
  // if (unread === 0) {
  //   uni.hideTabBarRedDot({
  //     //隐藏数字
  //     index: 1, //tabbar下标
  //   })
  // } else {
  //   uni.showTabBarRedDot({
  //     index: 1, //tabbar下标
  //   })
  // }
}
