import { EventTracking } from '@xkit-yx/utils/dist/uniapp'
import imPkg from 'nim-web-sdk-ng/package.json'

export const trackInit = (
  component: 'ChatUIKit' | 'ContactUIKit' | 'ConversationUIKit' | 'SearchUIKit'
): void => {
  if (uni.$UIKitNIM?.options?.appkey) {
    const eventTracking = new EventTracking({
      appKey: uni.$UIKitNIM.options.appkey,
      version: '10.3.0',
      component,
      imVersion: imPkg.version,
      platform: 'UniApp',
    })
    eventTracking.track('init', '')
  }
}
