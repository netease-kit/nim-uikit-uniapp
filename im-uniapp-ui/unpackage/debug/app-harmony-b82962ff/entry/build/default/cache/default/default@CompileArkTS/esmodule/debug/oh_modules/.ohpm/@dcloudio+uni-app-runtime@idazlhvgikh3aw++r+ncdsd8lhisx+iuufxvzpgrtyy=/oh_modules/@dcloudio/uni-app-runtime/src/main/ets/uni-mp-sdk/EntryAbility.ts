import UIAbility from "@ohos:app.ability.UIAbility";
import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import type Want from "@ohos:app.ability.Want";
import type window from "@ohos:window";
import { setOSRuntime, initUniApi, init, openUniApp, appAbilityEmitter } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
import { initUniExtApi } from "@normalized:N&&&@dcloudio/uni-app-harmony/index&1.0.0";
import { WebBuilder } from "@normalized:N&&&@dcloudio/uni-mp-sdk/WebBuilder&1.0.0";
import { createSubPageState, createTabBarState, createTabBarItem } from "@normalized:N&&&@dcloudio/uni-mp-sdk/Page&1.0.0";
import "@normalized:N&&&@dcloudio/uni-mp-sdk/WebViewBuilder&1.0.0";
import "@normalized:N&&&@dcloudio/uni-mp-sdk/MapBuilder&1.0.0";
import "@normalized:N&&&@dcloudio/uni-mp-sdk/PickerBuilder&1.0.0";
import { previewImage, closePreviewImage } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/ImagePreviewer&1.0.0";
import { showLoading, hideLoading } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/ShowLoading&1.0.0";
import type { IInitConfig } from './types';
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
});
initUniApi(initUniExtApi());
let entryAbilityAppID: string;
let entryAbilityConfig: IInitConfig | undefined;
export default class EntryAbility extends UIAbility {
    constructor(appID: string, config?: IInitConfig) {
        super();
        entryAbilityAppID = appID;
        entryAbilityConfig = config;
    }
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        appAbilityEmitter.emit('create', want, launchParam);
    }
    onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        appAbilityEmitter.emit('newWant', want, launchParam);
    }
    onShare(wantParam: Record<string, Object>): void {
        appAbilityEmitter.emit('share', wantParam);
    }
    onWindowStageCreate(windowStage: window.WindowStage) {
        init(this, windowStage, entryAbilityConfig);
        openUniApp(entryAbilityAppID);
    }
}
