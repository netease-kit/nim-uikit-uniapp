const preUrl = ''
export function customNavigateTo(options) {
  uni.navigateTo({ ...options, url: preUrl + options.url })
}

export function customRedirectTo(options) {
  uni.redirectTo({ ...options, url: preUrl + options.url })
}

export function customSwitchTab(options) {
  uni.switchTab({ ...options, url: preUrl + options.url })
}

export function customReLaunch(options) {
  uni.reLaunch({ ...options, url: preUrl + options.url })
}
