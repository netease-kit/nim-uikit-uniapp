import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import window from '@ohos.window';
import './WebViewBuilder';
import './MapBuilder';
import './PickerBuilder';
import { IInitConfig } from './types';
export default class EntryAbility extends UIAbility {
    constructor(appID: string, config?: IInitConfig);
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void;
    onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam): void;
    onShare(wantParam: Record<string, Object>): void;
    onWindowStageCreate(windowStage: window.WindowStage): void;
}
