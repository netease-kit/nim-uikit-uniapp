import { t } from './i18n'

export const handleNoPermission = (res: any): void => {
  if (
    uni.getSystemInfoSync().platform == 'android' ||
    uni.getSystemInfoSync().platform == 'ios'
  ) {
    const appAuthorizeSetting = uni.getAppAuthorizeSetting()
    //点击取消时不出现弹窗
    if (
      (res.code == 11 &&
        appAuthorizeSetting.cameraAuthorized === 'denied' &&
        res.errMsg !== 'chooseImage:fail User cancelled') ||
      (res.code == 12 &&
        appAuthorizeSetting.cameraAuthorized === 'denied' &&
        res.errMsg !== 'chooseImage:fail User cancelled') ||
      (res.code == 2 && res.errMsg !== 'chooseImage:fail cancel')
    ) {
      uni.showToast({
        icon: 'none',
        title: t('addPermissionText'),
      })
    }
  }
}
