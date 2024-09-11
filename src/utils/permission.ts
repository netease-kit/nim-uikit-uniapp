import { t } from './i18n'

export const handleNoPermission = (res: any): void => {
  if (
    uni.getSystemInfoSync().platform == 'android' ||
    uni.getSystemInfoSync().platform == 'ios'
  ) {
    const appAuthorizeSetting = uni.getAppAuthorizeSetting()
    //点击取消时不出现弹窗
    const isCameraDenied = appAuthorizeSetting.cameraAuthorized === 'denied'
    const isUserCancelled =
      res.errMsg === 'chooseImage:fail User cancelled' ||
      res.errMsg === 'chooseImage:fail cancel' ||
      res.errMsg === 'chooseVideo:fail cancel' ||
      res.errMsg === 'chooseVideo:fail User cancelled'
    if (
      (res.code === 11 && isCameraDenied && !isUserCancelled) ||
      (res.code === 12 && isCameraDenied && !isUserCancelled) ||
      (res.code === 2 && !isUserCancelled)
    ) {
      uni.showToast({
        icon: 'none',
        title: t('addPermissionText'),
      })
    }
  }
}
