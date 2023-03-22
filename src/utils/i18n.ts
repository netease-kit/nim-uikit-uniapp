import { createI18n } from 'vue-i18n'
import en from '../locale/en'
import zh from '../locale/zh-Hans'
const messages = {
  en,
  zh,
}
const i18nConfig = {
  locale: uni.getLocale(), // 获取已设置的语言
  fallbackLocale: 'zh', //  设置备用语言
  messages,
}
const i18n = createI18n(i18nConfig)
export const t = i18n.global.t
export default i18n
