import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'
import {
  copyAgreementLink,
  openAgreement,
  resolveAgreement,
} from '../components/NEUIKit/pages/User/my/agreement'

test('resolves the user agreement to the approved URL', () => {
  assert.deepEqual(resolveAgreement('user'), {
    title: '用户协议',
    url: 'https://yunxin.163.com/clauses?serviceType=0',
    webViewUrl: 'https://yunxin.163.com/clause-detail?serviceType=0',
  })
})

test('resolves the privacy agreement to the approved URL', () => {
  assert.deepEqual(resolveAgreement('privacy'), {
    title: '隐私协议',
    url: 'https://yunxin.163.com/clauses?serviceType=3',
    webViewUrl: 'https://yunxin.163.com/clause-detail?serviceType=3',
  })
})

test('defaults unsupported values to the user agreement', () => {
  assert.deepEqual(
    resolveAgreement('https://example.com'),
    resolveAgreement('user')
  )
})

test('copies the approved link and prompts the user to open a browser', () => {
  let clipboardOptions: any
  let toastOptions: any
  const originalUni = (globalThis as any).uni

  ;(globalThis as any).uni = {
    setClipboardData(options: any) {
      clipboardOptions = options
      options.success()
    },
    showToast(options: any) {
      toastOptions = options
    },
  }

  try {
    copyAgreementLink('privacy')
  } finally {
    ;(globalThis as any).uni = originalUni
  }

  assert.equal(
    clipboardOptions.data,
    'https://yunxin.163.com/clauses?serviceType=3'
  )
  assert.equal(clipboardOptions.showToast, false)
  assert.deepEqual(toastOptions, {
    title: '已复制链接，请在浏览器打开链接',
    icon: 'none',
  })
})

test('opens the agreement web-view in WeChat Mini Program', () => {
  let navigateOptions: any
  let clipboardCalled = false
  const originalUni = (globalThis as any).uni

  ;(globalThis as any).uni = {
    getSystemInfoSync() {
      return { uniPlatform: 'mp-weixin' }
    },
    navigateTo(options: any) {
      navigateOptions = options
    },
    setClipboardData() {
      clipboardCalled = true
    },
  }

  try {
    openAgreement('privacy')
  } finally {
    ;(globalThis as any).uni = originalUni
  }

  assert.deepEqual(navigateOptions, {
    url: '/components/NEUIKit/pages/User/my/agreement-webview?type=privacy',
  })
  assert.equal(clipboardCalled, false)
})

test('keeps copying the agreement link on every non-WeChat platform', () => {
  const originalUni = (globalThis as any).uni
  const nonWeChatPlatforms = [
    'web',
    'app',
    'mp-alipay',
    'mp-baidu',
    'mp-toutiao',
  ]

  try {
    for (const uniPlatform of nonWeChatPlatforms) {
      let clipboardOptions: any
      let toastOptions: any
      let navigateCalled = false

      ;(globalThis as any).uni = {
        getSystemInfoSync() {
          return { uniPlatform }
        },
        navigateTo() {
          navigateCalled = true
        },
        setClipboardData(options: any) {
          clipboardOptions = options
          options.success()
        },
        showToast(options: any) {
          toastOptions = options
        },
      }

      openAgreement('user')

      assert.equal(
        clipboardOptions.data,
        'https://yunxin.163.com/clauses?serviceType=0',
        uniPlatform
      )
      assert.deepEqual(
        toastOptions,
        {
          title: '已复制链接，请在浏览器打开链接',
          icon: 'none',
        },
        uniPlatform
      )
      assert.equal(navigateCalled, false, uniPlatform)
    }
  } finally {
    ;(globalThis as any).uni = originalUni
  }
})

test('me page exposes both agreement entries outside the about page', () => {
  const meSource = readFileSync(resolve('components/NEUIKit/pages/User/my/index.vue'), 'utf8')
  const aboutSource = readFileSync(resolve('components/NEUIKit/pages/User/my/about.vue'), 'utf8')

  assert.match(meSource, /用户协议/)
  assert.match(meSource, /隐私协议/)
  assert.match(meSource, /openAgreement\('user'\)/)
  assert.match(meSource, /openAgreement\('privacy'\)/)
  assert.match(
    meSource,
    /@click="openAgreement\('user'\)">\s*<div class="item-left">\s*<Icon iconClassName="guanyu" type="icon-guanyu"><\/Icon>\s*用户协议/
  )
  assert.match(
    meSource,
    /@click="openAgreement\('privacy'\)">\s*<div class="item-left">\s*<Icon iconClassName="guanyu" type="icon-guanyu"><\/Icon>\s*隐私协议/
  )
  assert.doesNotMatch(aboutSource, /openAgreement/)
})

test('registers the agreement web-view page only for WeChat Mini Program', () => {
  const pagesSource = readFileSync(resolve('pages.json'), 'utf8')
  const pagePath = '"path": "components/NEUIKit/pages/User/my/agreement-webview"'
  const pageIndex = pagesSource.indexOf(pagePath)
  const guardStart = pagesSource.lastIndexOf('// #ifdef MP-WEIXIN', pageIndex)
  const guardEnd = pagesSource.indexOf('// #endif', pageIndex)
  const webViewPath = resolve('components/NEUIKit/pages/User/my/agreement-webview.vue')

  assert.notEqual(pageIndex, -1)
  assert.notEqual(guardStart, -1)
  assert.ok(guardStart < pageIndex)
  assert.ok(guardEnd > pageIndex)
  assert.equal(existsSync(webViewPath), true)

  const weChatPagesSource = pagesSource.replace(
    /^\s*\/\/ #(ifdef MP-WEIXIN|endif)\s*$/gm,
    ''
  )
  const nonWeChatPagesSource = pagesSource.replace(
    /^\s*\/\/ #ifdef MP-WEIXIN\s*$[\s\S]*?^\s*\/\/ #endif\s*$/gm,
    ''
  )

  assert.doesNotThrow(() => JSON.parse(weChatPagesSource))
  assert.doesNotThrow(() => JSON.parse(nonWeChatPagesSource))

  const source = readFileSync(webViewPath, 'utf8')

  assert.match(source, /<web-view\s+:src="agreementUrl"><\/web-view>/)
  assert.match(source, /resolveAgreement\(options\?\.type\)/)
  assert.match(source, /agreementUrl\.value = agreement\.webViewUrl/)
  assert.doesNotMatch(source, /agreementUrl\.value = agreement\.url/)
  assert.match(source, /setNavigationBarTitle/)
})

test('login page opens both agreements through the shared platform handler', () => {
  const source = readFileSync(
    resolve('components/NEUIKit/pages/Login/components/login-form.vue'),
    'utf8'
  )

  assert.match(source, /《用户协议》/)
  assert.match(source, /《隐私协议》/)
  assert.match(source, /openAgreement\('user'\)/)
  assert.match(source, /openAgreement\('privacy'\)/)
  assert.doesNotMatch(source, /<uni-link/)
  assert.doesNotMatch(source, /customNavigateTo/)
})
