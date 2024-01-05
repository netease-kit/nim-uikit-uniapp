import { EventTracking } from '@xkit-yx/utils/dist/uniapp'

export const trackInit = (
  component: 'ChatUIKit' | 'ContactUIKit' | 'ConversationUIKit' | 'SearchUIKit'
): void => {
  const eventTracking = new EventTracking({
    appKey: uni.$UIKitNIM.initOptions.appkey,
    version: '1.0.0',
    component,
    imVersion: uni.$UIKitNIM.version,
    platform: 'UniApp',
  })

  eventTracking.track('init', '')
}
