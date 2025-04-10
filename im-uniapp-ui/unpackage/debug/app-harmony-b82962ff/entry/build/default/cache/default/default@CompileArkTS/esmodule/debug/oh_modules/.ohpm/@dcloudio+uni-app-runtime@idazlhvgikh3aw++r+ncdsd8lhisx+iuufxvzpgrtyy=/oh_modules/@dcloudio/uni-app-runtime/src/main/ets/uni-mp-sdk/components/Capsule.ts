if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Capsule_Params {
    style?: ICapsuleStyle;
    safeAreaInsetsTop?: number;
    closeButtonBackground?: string | undefined;
    menuButtonBackground?: string | undefined;
    onSafeAreaInsetsChange?;
}
interface CapsuleButton_Params {
    text?: string;
    textColor?: string | undefined;
    highlightColor?: string | undefined;
    onButtonClick?: (() => void) | undefined;
    styleBackgroundColor?: string | undefined;
}
import font from "@ohos:font";
import { getSafeAreaInsets, onSafeAreaInsetsChange, offSafeAreaInsetsChange, getCurrentMP } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
import { UniSystemIcons } from "@normalized:N&&&@dcloudio/uni-mp-sdk/utils/index&1.0.0";
import type { ICapsuleStyle, UniMP } from '../types/index';
interface SafeAreaInsets {
    top?: number;
    bottom?: number;
}
class CapsuleButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__text = new SynchedPropertySimpleOneWayPU(params.text, this, "text");
        this.__textColor = new SynchedPropertyObjectOneWayPU(params.textColor, this, "textColor");
        this.__highlightColor = new SynchedPropertyObjectOneWayPU(params.highlightColor, this, "highlightColor");
        this.__onButtonClick = new SynchedPropertyObjectOneWayPU(params.onButtonClick, this, "onButtonClick");
        this.__styleBackgroundColor = new ObservedPropertyObjectPU(undefined, this, "styleBackgroundColor");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: CapsuleButton_Params) {
        if (params.text === undefined) {
            this.__text.set('');
        }
        if (params.textColor === undefined) {
            this.__textColor.set(undefined);
        }
        if (params.highlightColor === undefined) {
            this.__highlightColor.set(undefined);
        }
        if (params.onButtonClick === undefined) {
            this.__onButtonClick.set(undefined);
        }
        if (params.styleBackgroundColor !== undefined) {
            this.styleBackgroundColor = params.styleBackgroundColor;
        }
    }
    updateStateVars(params: CapsuleButton_Params) {
        this.__text.reset(params.text);
        this.__textColor.reset(params.textColor);
        this.__highlightColor.reset(params.highlightColor);
        this.__onButtonClick.reset(params.onButtonClick);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__text.purgeDependencyOnElmtId(rmElmtId);
        this.__textColor.purgeDependencyOnElmtId(rmElmtId);
        this.__highlightColor.purgeDependencyOnElmtId(rmElmtId);
        this.__onButtonClick.purgeDependencyOnElmtId(rmElmtId);
        this.__styleBackgroundColor.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        this.__textColor.aboutToBeDeleted();
        this.__highlightColor.aboutToBeDeleted();
        this.__onButtonClick.aboutToBeDeleted();
        this.__styleBackgroundColor.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __text: SynchedPropertySimpleOneWayPU<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __textColor: SynchedPropertySimpleOneWayPU<string | undefined>;
    get textColor() {
        return this.__textColor.get();
    }
    set textColor(newValue: string | undefined) {
        this.__textColor.set(newValue);
    }
    private __highlightColor: SynchedPropertySimpleOneWayPU<string | undefined>;
    get highlightColor() {
        return this.__highlightColor.get();
    }
    set highlightColor(newValue: string | undefined) {
        this.__highlightColor.set(newValue);
    }
    private __onButtonClick: SynchedPropertySimpleOneWayPU<(() => void) | undefined>;
    get onButtonClick() {
        return this.__onButtonClick.get();
    }
    set onButtonClick(newValue: (() => void) | undefined) {
        this.__onButtonClick.set(newValue);
    }
    private __styleBackgroundColor: ObservedPropertyObjectPU<string | undefined>;
    get styleBackgroundColor() {
        return this.__styleBackgroundColor.get();
    }
    set styleBackgroundColor(newValue: string | undefined) {
        this.__styleBackgroundColor.set(newValue);
    }
    aboutToAppear() {
        font.registerFont({
            familyName: UniSystemIcons,
            familySrc: { "id": 0, "type": 30000, params: ['uni-app/iconfont.ttf'], "bundleName": "com.netease.yunxin.app.hm.im", "moduleName": "entry" }
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
            Stack.align(Alignment.Center);
            Stack.backgroundColor(ObservedObject.GetRawObject(this.styleBackgroundColor));
            Stack.onTouch((event) => {
                switch (event.type) {
                    case TouchType.Down: {
                        this.styleBackgroundColor = this.highlightColor || '#CBCCCD';
                        break;
                    }
                    case TouchType.Up:
                    case TouchType.Cancel: {
                        this.styleBackgroundColor = undefined;
                        break;
                    }
                }
            });
            Stack.onHover((isHover) => {
                if (isHover) {
                    this.styleBackgroundColor = this.highlightColor || '#CBCCCD';
                    return;
                }
                this.styleBackgroundColor = undefined;
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            Text.fontFamily(UniSystemIcons);
            Text.fontSize('22vp');
            Text.fontColor(this.textColor || '#000000');
        }, Text);
        Text.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class Capsule extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__style = new SynchedPropertyObjectOneWayPU(params.style, this, "style");
        this.__safeAreaInsetsTop = new ObservedPropertySimplePU(0, this, "safeAreaInsetsTop");
        this.__closeButtonBackground = new ObservedPropertyObjectPU(undefined, this, "closeButtonBackground");
        this.__menuButtonBackground = new ObservedPropertyObjectPU(undefined, this, "menuButtonBackground");
        this.onSafeAreaInsetsChange = (safeAreaInsets: SafeAreaInsets) => {
            if (typeof safeAreaInsets.top === 'number') {
                this.safeAreaInsetsTop = safeAreaInsets.top;
            }
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Capsule_Params) {
        if (params.safeAreaInsetsTop !== undefined) {
            this.safeAreaInsetsTop = params.safeAreaInsetsTop;
        }
        if (params.closeButtonBackground !== undefined) {
            this.closeButtonBackground = params.closeButtonBackground;
        }
        if (params.menuButtonBackground !== undefined) {
            this.menuButtonBackground = params.menuButtonBackground;
        }
        if (params.onSafeAreaInsetsChange !== undefined) {
            this.onSafeAreaInsetsChange = params.onSafeAreaInsetsChange;
        }
    }
    updateStateVars(params: Capsule_Params) {
        this.__style.reset(params.style);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__safeAreaInsetsTop.purgeDependencyOnElmtId(rmElmtId);
        this.__closeButtonBackground.purgeDependencyOnElmtId(rmElmtId);
        this.__menuButtonBackground.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__style.aboutToBeDeleted();
        this.__safeAreaInsetsTop.aboutToBeDeleted();
        this.__closeButtonBackground.aboutToBeDeleted();
        this.__menuButtonBackground.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __style: SynchedPropertySimpleOneWayPU<ICapsuleStyle>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: ICapsuleStyle) {
        this.__style.set(newValue);
    }
    private __safeAreaInsetsTop: ObservedPropertySimplePU<number>;
    get safeAreaInsetsTop() {
        return this.__safeAreaInsetsTop.get();
    }
    set safeAreaInsetsTop(newValue: number) {
        this.__safeAreaInsetsTop.set(newValue);
    }
    private __closeButtonBackground: ObservedPropertyObjectPU<string | undefined>;
    get closeButtonBackground() {
        return this.__closeButtonBackground.get();
    }
    set closeButtonBackground(newValue: string | undefined) {
        this.__closeButtonBackground.set(newValue);
    }
    private __menuButtonBackground: ObservedPropertyObjectPU<string | undefined>;
    get menuButtonBackground() {
        return this.__menuButtonBackground.get();
    }
    set menuButtonBackground(newValue: string | undefined) {
        this.__menuButtonBackground.set(newValue);
    }
    private onSafeAreaInsetsChange;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                direction: FlexDirection.Row,
                alignItems: ItemAlign.Center
            });
            Flex.height('32vp');
            Flex.width('88vp');
            Flex.margin({
                top: this.safeAreaInsetsTop + vp2px(12) + 'px',
                right: '10vp'
            });
            Flex.borderStyle(BorderStyle.Solid);
            Flex.borderWidth('1vp');
            Flex.borderColor(this.style.borderColor || '#FFE5E5E5');
            Flex.borderRadius('16vp');
            Flex.align(Alignment.TopEnd);
            Flex.clip(true);
            Flex.backgroundColor(this.style.backgroundColor || '#FFFFFF');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.flexGrow(1);
            __Common__.onClick(() => {
                const currentMP = getCurrentMP() as UniMP;
                currentMP.capsuleMenuButtonClick?.();
            });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // menu
                    CapsuleButton(this, {
                        text: '\ue606',
                        textColor: this.style.textColor,
                        highlightColor: this.style.highlightColor
                    }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/Capsule.ets", line: 83, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: '\ue606',
                            textColor: this.style.textColor,
                            highlightColor: this.style.highlightColor
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: '\ue606',
                        textColor: this.style.textColor,
                        highlightColor: this.style.highlightColor
                    });
                }
            }, { name: "CapsuleButton" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Line.create({
                width: '1vp',
                height: '20vp'
            });
            Line.backgroundColor(this.style.borderColor || '#FFE5E5E5');
        }, Line);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.flexGrow(1);
            __Common__.onClick(() => {
                const currentMP = getCurrentMP() as UniMP;
                currentMP.capsuleCloseButtonClick?.();
            });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // close
                    CapsuleButton(this, {
                        text: '\ue650',
                        textColor: this.style.textColor,
                        highlightColor: this.style.highlightColor
                    }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/Capsule.ets", line: 100, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: '\ue650',
                            textColor: this.style.textColor,
                            highlightColor: this.style.highlightColor
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: '\ue650',
                        textColor: this.style.textColor,
                        highlightColor: this.style.highlightColor
                    });
                }
            }, { name: "CapsuleButton" });
        }
        __Common__.pop();
        Flex.pop();
    }
    aboutToAppear(): void {
        const safeAreaInsets: SafeAreaInsets = getSafeAreaInsets(true);
        this.onSafeAreaInsetsChange(safeAreaInsets);
        onSafeAreaInsetsChange(this.onSafeAreaInsetsChange, true);
    }
    aboutToDisappear(): void {
        offSafeAreaInsetsChange(this.onSafeAreaInsetsChange);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
