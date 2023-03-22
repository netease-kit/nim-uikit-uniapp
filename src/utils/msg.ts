import type { IMMessage } from '@xkit-yx/im-store'
import { t } from './i18n'

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

export const getMsgContentTipByType = (
  msg: Pick<IMMessage, 'type' | 'body'>
): string => {
  const { type, body } = msg
  switch (type) {
    case 'text':
      return body || translate('textMsgText')
    case 'file':
      return translate('fileMsgText')
    case 'image':
      return translate('imgMsgText')
    /*
    case 'custom':
      return body || translate('customMsgText')
    case 'audio':
      return translate('audioMsgText')
    case 'g2':
      return translate('callMsgText')
    case 'geo':
      return translate('geoMsgText')
    case 'notification':
      return translate('notiMsgText')
    case 'robot':
      return translate('robotMsgText')
    case 'tip':
      return translate('tipMsgText')
    case 'video':
      return translate('videoMsgText')
      */
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
  const unread = store.uiStore.sessionUnread || 0
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
}
