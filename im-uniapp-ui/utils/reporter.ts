import { EventTracking } from '@xkit-yx/utils/dist/uniapp'
//@ts-ignore
import imPkg from 'nim-web-sdk-ng/package.json'

export const trackInit = (
  component: 'ChatUIKit' | 'ContactUIKit' | 'ConversationUIKit' | 'SearchUIKit'
): void => {
  if (uni.$UIKitNIM?.options?.appkey) {
    const eventTracking = new EventTracking({
      appKey: uni.$UIKitNIM.options.appkey,
      version: '10.4.0',
      component,
      imVersion: imPkg.version,
      platform: 'UniApp',
      os: uni.getSystemInfoSync().platform.toUpperCase(),
      framework: 'UniApp',
      language: 'Vue3',
      container: uni.getSystemInfoSync().uniPlatform.toUpperCase(),
    })

    eventTracking.track('init', '')
  }
}
