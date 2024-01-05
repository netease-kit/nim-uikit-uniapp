export const getUniPlatform = () => {
  return uni.getSystemInfoSync().uniPlatform
}

export const getPlatform = () => {
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
