import { t } from '../../../utils/i18n'
import { customNavigateTo } from '../../../utils/customNavigate'

export type AgreementType = 'user' | 'privacy'

export interface Agreement {
  title: string
  url: string
  webViewUrl: string
}

const agreements: Record<AgreementType, Agreement> = {
  user: {
    title: '用户协议',
    url: 'https://yunxin.163.com/clauses?serviceType=0',
    webViewUrl: 'https://yunxin.163.com/clause-detail?serviceType=0',
  },
  privacy: {
    title: '隐私协议',
    url: 'https://yunxin.163.com/clauses?serviceType=3',
    webViewUrl: 'https://yunxin.163.com/clause-detail?serviceType=3',
  },
}

export function resolveAgreement(type?: string): Agreement {
  return type === 'privacy' ? agreements.privacy : agreements.user
}

export function copyAgreementLink(type: AgreementType) {
  const agreement = resolveAgreement(type)

  uni.setClipboardData({
    data: agreement.url,
    showToast: false,
    success: () => {
      uni.showToast({
        title: t('openUrlText'),
        icon: 'none',
      })
    },
  })
}

export function openAgreement(type: AgreementType) {
  if (uni.getSystemInfoSync().uniPlatform === 'mp-weixin') {
    customNavigateTo({
      url: `/pages/User/my/agreement-webview?type=${type}`,
    })
    return
  }

  copyAgreementLink(type)
}
