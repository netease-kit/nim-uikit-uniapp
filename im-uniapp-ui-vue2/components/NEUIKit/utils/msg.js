import { V2NIMConst } from './nim'
import { t } from './i18n'

const translate = (key) => {
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

export const getMsgContentTipByType = (msg) => {
  const { messageType, text, needSlice } = msg
  switch (messageType) {
    case V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT:
      return needSlice && text ? text?.slice(0, 100) : text || translate('textMsgText')
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

export const setTabUnread = () => {
  const routes = getCurrentPages()
  const curRoute = routes[routes.length - 1].route
  const tabPaths = [
    'pages/User/my/index',
    'pages/Contact/index',
    'pages/Conversation/index',
  ]
  if (curRoute && !tabPaths.includes(curRoute)) {
    return
  }

  const store = uni.$UIKitStore
  const enableV2CloudConversation = store?.sdkOptions?.enableV2CloudConversation
  const unread =
    (enableV2CloudConversation
      ? store?.conversationStore?.totalUnreadCount
      : store?.localConversationStore?.totalUnreadCount) || 0
  if (unread === 0) {
    uni.hideTabBarRedDot({
      index: 0,
    })
  } else {
    uni.showTabBarRedDot({
      index: 0,
    })
  }
}

export const setContactTabUnread = () => {
  const routes = getCurrentPages()
  const curRoute = routes[routes.length - 1].route
  const tabPaths = [
    'pages/User/my/index',
    'pages/Contact/index',
    'pages/Conversation/index',
  ]
  if (curRoute && !tabPaths.includes(curRoute)) {
    return
  }
  const unread = uni.$UIKitStore?.sysMsgStore?.getTotalUnreadMsgsCount()
  if (unread === 0) {
    uni.hideTabBarRedDot({
      index: 1,
    })
  } else {
    uni.showTabBarRedDot({
      index: 1,
    })
  }
}
