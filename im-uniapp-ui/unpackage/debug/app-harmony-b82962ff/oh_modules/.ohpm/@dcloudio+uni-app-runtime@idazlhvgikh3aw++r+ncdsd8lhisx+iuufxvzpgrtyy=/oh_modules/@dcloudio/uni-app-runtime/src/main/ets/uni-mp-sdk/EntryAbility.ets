import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import window from '@ohos.window';
import { setOSRuntime, initUniApi, init, openUniApp, appAbilityEmitter } from './sdk';
import { initUniExtApi } from '@dcloudio/uni-app-harmony'
import { WebBuilder } from './WebBuilder'
import { createSubPageState, createTabBarState, createTabBarItem } from './Page'
import './WebViewBuilder'
import './MapBuilder'
import './PickerBuilder'
import { previewImage, closePreviewImage } from './components/ImagePreviewer'
import { showLoading, hideLoading } from './components/ShowLoading'
import { IInitConfig } from './types';

setOSRuntime({
  getContext,
  WebBuilder,
  createSubPageState,
  createTabBarState,
  createTabBarItem,
  previewImage,
  closePreviewImage,
  showLoading,
  hideLoading
})

initUniApi(initUniExtApi())

let entryAbilityAppID: string
let entryAbilityConfig: IInitConfig | undefined

export default class EntryAbility extends UIAbility {
  constructor(appID: string, config?: IInitConfig) {
    super()
    entryAbilityAppID = appID
    entryAbilityConfig = config
  }

  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    appAbilityEmitter.emit('create', want, launchParam)
  }

  onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    appAbilityEmitter.emit('newWant', want, launchParam)
  }

  onShare(wantParam: Record<string, Object>): void {
    appAbilityEmitter.emit('share', wantParam)
  }

  onWindowStageCreate(windowStage: window.WindowStage) {
    init(this, windowStage, entryAbilityConfig)
    openUniApp(entryAbilityAppID)
  }
}
