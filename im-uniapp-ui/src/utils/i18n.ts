import en from '../locale/en'
import zh from '../locale/zh-Hans'
const messages = {
  en,
  zh,
}
const localeMap = {
  'zh-Hans': 'zh',
  'zh-Hant': 'zh',
  en: 'en',
}

export const t = (key) => {
  return zh[key]
}
