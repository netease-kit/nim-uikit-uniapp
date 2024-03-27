export const getUniPlatform = () => {
  // @ts-ignore
  return uni.getSystemInfoSync().uniPlatform
}

export const getPlatform = () => {
  // @ts-ignore
  return uni.getSystemInfoSync().platform
}

export function deepClone(source, visited = new WeakMap()) {
  if (source === null || typeof source !== 'object') {
    return source
  }

  if (visited.has(source)) {
    return visited.get(source)
  }

  let clone

  if (source instanceof Date) {
    clone = new Date(source.getTime())
  } else if (source instanceof RegExp) {
    clone = new RegExp(source)
  } else if (source instanceof Map) {
    clone = new Map()
    visited.set(source, clone)
    source.forEach((value, key) => {
      clone.set(key, deepClone(value, visited))
    })
  } else if (source instanceof Set) {
    clone = new Set()
    visited.set(source, clone)
    source.forEach((value) => {
      clone.add(deepClone(value, visited))
    })
  } else if (Array.isArray(source)) {
    clone = []
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
  try {
    // @ts-ignore
    if (uni.$currentAudioContext) {
      // @ts-ignore
      uni.$currentAudioContext?.stop()
    }
  } catch (error) {
    console.log('stopAllAudio error', error)
  }
}

// 暂停并销毁音频
export function pauseAndDestroyAudio() {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    if (uni.$currentAudioContext) {
      // @ts-ignore
      uni.$currentAudioContext.pause()
      setTimeout(() => {
        // @ts-ignore
        uni.$currentAudioContext.destroy()
        console.log('======stopAllAudio destroy success========')
        resolve(0)
      }, 300) // 比如1秒后执行
    } else {
      resolve(0)
    }
  })
}

export function destoryAllAudio() {
  try {
    // @ts-ignore
    if (uni.$currentAudioContext) {
      // @ts-ignore
      uni.$currentAudioContext?.destroy()
      console.log('======destoryAllAudio success========')
    }
  } catch (error) {
    console.log('destoryAllAudio error', error)
  }
}
