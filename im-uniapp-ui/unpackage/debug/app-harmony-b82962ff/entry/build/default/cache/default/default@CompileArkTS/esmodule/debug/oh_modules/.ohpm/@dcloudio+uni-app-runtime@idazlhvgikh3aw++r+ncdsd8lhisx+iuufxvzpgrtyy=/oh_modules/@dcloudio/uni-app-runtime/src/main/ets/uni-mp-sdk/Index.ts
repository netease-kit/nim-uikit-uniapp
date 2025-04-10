import EntryAbility from "@normalized:N&&&@dcloudio/uni-mp-sdk/EntryAbility&1.0.0";
import type { IInternalUniMP } from './types/index';
import "@normalized:N&&&@dcloudio/uni-mp-sdk/Page&1.0.0";
import { getCurrentMP as SDKGetCurrentMP, } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
export { uni, isPlainObject, getType, hasOwn, disableEnumerable, setUniRuntime, defineAsyncApi, defineOffApi, defineOnApi, defineSyncApi, defineTaskApi, getWindowInfo, getDeviceId, UTSHarmony, getCurrentWebview, navigator, getEnv, getOSRuntime, onNativePageReady, getRealPath, getResourceStr, getAbilityContext, getTabBar, Emitter, startPullDownRefresh, stopPullDownRefresh, WebNodeController, callPageLifeCycle, init, openUniApp, openUniMP, releaseWgtToRunPath, isExistsApp, getUniMPRunPath, getCurrentWindow, defineNativeEmbed, getAppVersionInfo, registerModule, hmrGetUniAppWWWPath, hmrRestartUniApp } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
export { EntryAbility as UniEntryAbility };
export function getCurrentMP(): IInternalUniMP {
    return SDKGetCurrentMP() as IInternalUniMP;
}
