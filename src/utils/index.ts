import { events } from './constants'

export const getUniPlatform = () => {
  // @ts-ignore
  return uni.getSystemInfoSync().uniPlatform
}

export const getPlatform = () => {
  // @ts-ignore
  return uni.getSystemInfoSync().platform
}
// 是否是android app
export const isAndroidApp =
  uni.getSystemInfoSync().platform == 'android' &&
  uni.getSystemInfoSync().uniPlatform == 'app'

// 是否是Ios app
export const isIosApp =
  uni.getSystemInfoSync().platform == 'ios' &&
  uni.getSystemInfoSync().uniPlatform == 'app'

// 是否是Ios web
export const isIosWeb =
  uni.getSystemInfoSync().uniPlatform === 'web' &&
  uni.getSystemInfoSync().platform === 'ios'

// 是否是App
export const isApp = uni.getSystemInfoSync().uniPlatform == 'app'

// 是否是微信小程序
export const isWxApp = uni.getSystemInfoSync().uniPlatform == 'mp-weixin'

// 是否是web
export const isWeb = uni.getSystemInfoSync().uniPlatform === 'web'

// @ts-ignore
export function deepClone(source: any, visited = new WeakMap()) {
  if (source === null || typeof source !== 'object') {
    return source
  }

  if (visited.has(source)) {
    return visited.get(source)
  }
  // @ts-ignore
  let clone

  if (source instanceof Date) {
    clone = new Date(source.getTime())
  } else if (source instanceof RegExp) {
    clone = new RegExp(source)
  } else if (source instanceof Map) {
    clone = new Map()
    visited.set(source, clone)
    source.forEach((value, key) => {
      // @ts-ignore
      clone.set(key, deepClone(value, visited))
    })
  } else if (source instanceof Set) {
    clone = new Set()
    visited.set(source, clone)
    source.forEach((value) => {
      // @ts-ignore
      clone.add(deepClone(value, visited))
    })
  } else if (Array.isArray(source)) {
    clone = []
    // @ts-ignore
    visited.set(source, clone)
    for (let i = 0; i < source.length; i++) {
      clone[i] = deepClone(source[i], visited)
    }
  } else {
    clone = Object.create(Object.getPrototypeOf(source))
    visited.set(source, clone)
    for (const prop in source) {
      if (source.hasOwnProperty(prop)) {
        clone[prop] = deepClone(source[prop], visited)
      }
    }
  }

  return clone
}

export function stopAllAudio() {
  uni.$emit(events.AUDIO_URL_CHANGE, '')
}

/**
 * 秒转换为时分秒
 */
export const convertSecondsToTime = (seconds: number): string | null => {
  if (!seconds) {
    return null
  }
  const hours: number = Math.floor(seconds / 3600)
  const minutes: number = Math.floor((seconds - hours * 3600) / 60)
  const remainingSeconds: number = seconds - hours * 3600 - minutes * 60

  let timeString = ''

  const includeHours = seconds >= 3600
  if (includeHours) {
    if (hours < 10) {
      timeString += '0'
    }
    timeString += hours.toString() + ':'
  }

  if (minutes < 10) {
    timeString += '0'
  }
  timeString += minutes.toString() + ':'

  if (remainingSeconds < 10) {
    timeString += '0'
  }
  timeString += remainingSeconds.toString()

  return timeString
}

export const startCall = (options: {
  remoteUserAccid: string
  currentUserAccid: string
  type: number
  remoteShowName: string
}) => {
  try {
    // @ts-ignore
    uni.$UIKitCallKit.toCallPage(
      {
        calledAccount: options.remoteUserAccid,
        // currentUserAccid: options.currentUserAccid,
        type: options.type,
        calledShowName: options.remoteShowName,
      },
      () => {
        console.log('toCallPage: ', {
          remoteUserAccid: options.remoteUserAccid,
          currentUserAccid: options.currentUserAccid,
          type: options.type,
          remoteShowName: options.remoteShowName,
        })
      }
    )
  } catch (error) {
    console.log('handleVideoCall error', error)
  }
}
