export const getUniPlatform = () => {
  return uni.getSystemInfoSync().uniPlatform
}

export const getPlatform = () => {
  return uni.getSystemInfoSync().platform
}
