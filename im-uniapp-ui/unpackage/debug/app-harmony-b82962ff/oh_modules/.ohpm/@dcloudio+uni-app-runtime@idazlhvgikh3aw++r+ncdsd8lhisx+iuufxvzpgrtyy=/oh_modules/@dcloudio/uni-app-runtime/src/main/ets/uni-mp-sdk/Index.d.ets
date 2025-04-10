import EntryAbility from './EntryAbility';
import { IInternalUniMP } from './types/index';
import './Page';
export { uni, isPlainObject, getType, hasOwn, disableEnumerable, setUniRuntime, defineAsyncApi, defineOffApi, defineOnApi, defineSyncApi, defineTaskApi, getWindowInfo, getDeviceId, UTSHarmony, getCurrentWebview, navigator, getEnv, getOSRuntime, onNativePageReady, getRealPath, getResourceStr, getAbilityContext, getTabBar, Emitter, startPullDownRefresh, stopPullDownRefresh, WebNodeController, callPageLifeCycle, init, openUniApp, openUniMP, releaseWgtToRunPath, isExistsApp, getUniMPRunPath, getCurrentWindow, defineNativeEmbed, getAppVersionInfo, registerModule, hmrGetUniAppWWWPath, hmrRestartUniApp } from './sdk';
export { EntryAbility as UniEntryAbility };
export declare function getCurrentMP(): IInternalUniMP;
