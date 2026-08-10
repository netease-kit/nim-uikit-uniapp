const preUrl = ''

export function customNavigateTo(options: { url: string }) {
  uni.navigateTo({ ...options, url: preUrl + options.url })
}

export function customRedirectTo(options: { url: string }) {
  uni.redirectTo({ ...options, url: preUrl + options.url })
}

export function customSwitchTab(options: { url: string }) {
  uni.switchTab({ ...options, url: preUrl + options.url })
}

export function customReLaunch(options: { url: string }) {
  uni.reLaunch({ ...options, url: preUrl + options.url })
}
