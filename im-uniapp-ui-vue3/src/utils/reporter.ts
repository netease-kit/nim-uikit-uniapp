import { EventTracking } from '@xkit-yx/utils/dist/uniapp'

export const trackInit = (
  component: 'ChatUIKit' | 'ContactUIKit' | 'ConversationUIKit' | 'SearchUIKit'
): void => {
  // @ts-ignore
  if (uni.$UIKitNIM?.initOptions?.appkey) {
    const eventTracking = new EventTracking({
      // @ts-ignore
      appKey: uni.$UIKitNIM?.initOptions?.appkey,
      version: '1.5.0',
      component,
      // @ts-ignore
      imVersion: uni.$UIKitNIM.version,
      platform: 'UniApp',
    })
    eventTracking.track('init', '')
  }
}
