import EntryAbility from './EntryAbility'
import { IInternalUniMP } from './types/index'

import './Page'
import { getCurrentMP as SDKGetCurrentMP, } from './sdk'

export {
  uni,
  isPlainObject,
  getType,
  hasOwn,
  disableEnumerable,
  setUniRuntime,
  defineAsyncApi,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
  defineTaskApi,
  getWindowInfo,
  getDeviceId,
  UTSHarmony,
  getCurrentWebview,
  navigator,
  getEnv,
  getOSRuntime,
  onNativePageReady,
  getRealPath,
  getResourceStr,
  getAbilityContext,
  getTabBar,
  Emitter,
  startPullDownRefresh,
  stopPullDownRefresh,
  WebNodeController,
  callPageLifeCycle,
  init,
  openUniApp,
  openUniMP,
  releaseWgtToRunPath,
  isExistsApp,
  getUniMPRunPath,
  getCurrentWindow,
  defineNativeEmbed,
  getAppVersionInfo,
  registerModule,
  hmrGetUniAppWWWPath,
  hmrRestartUniApp
} from './sdk'

export {
  EntryAbility as UniEntryAbility
}

export function getCurrentMP(): IInternalUniMP {
  return SDKGetCurrentMP() as IInternalUniMP
}