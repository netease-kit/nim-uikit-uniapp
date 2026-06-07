import { t } from './i18n'

const isPermissionDenied = (error) => {
  const errMsg = error?.errMsg || error?.message || ''
  return /auth|authorize|permission|denied|scope\.writePhotosAlbum/i.test(errMsg)
}

const showDownloadFailedToast = () => {
  uni.showToast({
    title: t('downloadFailedText'),
    icon: 'none',
  })
}

const showAlbumPermissionModal = () => {
  uni.showModal({
    title: t('downloadFailedText'),
    content: t('albumPermissionDeniedText'),
    confirmText: t('goAuthorizeText'),
    cancelText: t('cancelText'),
    confirmColor: '#1861df',
    success: (res) => {
      if (res.confirm) {
        if (typeof uni.openAppAuthorizeSetting === 'function') {
          uni.openAppAuthorizeSetting({})
        } else if (typeof uni.openSetting === 'function') {
          uni.openSetting({})
        }
      }
    },
  })
}

const downloadImage = (url) => {
  if (/^https?:\/\//i.test(url)) {
    return new Promise((resolve, reject) => {
      uni.downloadFile({
        url,
        success: (res) => {
          if (res.statusCode >= 200 && res.statusCode < 300 && res.tempFilePath) {
            resolve(res.tempFilePath)
          } else {
            reject(res)
          }
        },
        fail: reject,
      })
    })
  }

  return Promise.resolve(url)
}

export const saveImageToAlbum = async (url) => {
  try {
    const filePath = await downloadImage(url)
    await new Promise((resolve, reject) => {
      uni.saveImageToPhotosAlbum({
        filePath,
        success: resolve,
        fail: reject,
      })
    })
    uni.showToast({
      title: t('saveSuccessText'),
      icon: 'none',
    })
  } catch (error) {
    showDownloadFailedToast()

    if (isPermissionDenied(error)) {
      const timer = setTimeout(() => {
        showAlbumPermissionModal()
        clearTimeout(timer)
      }, 1200)
    }
  }
}

export const previewImageWithSave = (url) => {
  if (!url) {
    return
  }

  uni.previewImage({
    urls: [url],
    longPressActions: {
      itemList: [t('saveImageText')],
      success: (data) => {
        if (data.tapIndex === 0) {
          saveImageToAlbum(url)
        }
      },
    },
  })
}
