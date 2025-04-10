if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TabBar_Params {
    onTabItemClick?: (options: OnTabItemClickOptions) => void;
    onMidButtonClick?: () => void;
    style?: TabBarStyle;
    selectedIndex?: number;
    items?: ObservedArray<TabBarItem>;
    midButton?: ITabBarMidButton;
}
interface TabBarMidButton_Params {
    text?: string;
    textColor?: string;
    iconPath?: string;
    iconWidth?: string;
    iconHeight?: string;
}
interface TabBarItemComponent_Params {
    item?: TabBarItem;
    selectedIndex?: number;
    index?: number;
    style?: TabBarStyle;
}
import { getResourceStr } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
import { SafeAreaOffset } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/SafeAreaOffset&1.0.0";
import { ObservedArray } from "@normalized:N&&&@dcloudio/uni-mp-sdk/utils/index&1.0.0";
@Observed
export class TabBarStyle {
    backgroundColor: string;
    borderColor: string;
    color: string;
    selectedColor: string;
    constructor(style: TabBarStyle) {
        this.backgroundColor = style.backgroundColor;
        this.borderColor = style.borderColor;
        this.color = style.color;
        this.selectedColor = style.selectedColor;
    }
}
export interface OnTabItemClickOptions {
    index: number;
}
export function createTabBarState(options: TabBarState) {
    return new TabBarState(options);
}
export function createTabBarItem(options: TabBarItem) {
    return new TabBarItem(options);
}
@Observed
export class TabBarItem {
    text?: string;
    iconPath?: string;
    selectedIconPath?: string;
    pagePath: string;
    visible: boolean;
    badgeType?: undefined | 'dot' | 'number';
    badgeText?: string;
    constructor(options: TabBarItem) {
        this.text = options.text;
        this.iconPath = options.iconPath;
        this.selectedIconPath = options.selectedIconPath;
        this.pagePath = options.pagePath;
        this.visible = options.visible;
        this.badgeType = options.badgeType;
        this.badgeText = options.badgeText;
    }
}
// MidButton不支持动态修改暂不另行创建Observed Class
export interface ITabBarMidButtonIconfont {
    text?: string;
    selectedText?: string;
    fontSize?: string;
    color?: string;
    selectedColor?: string;
}
export interface ITabBarMidButton {
    width?: string;
    height?: string;
    text?: string;
    iconPath?: string;
    iconWidth?: string;
    backgroundImage?: string;
    iconfont?: ITabBarMidButtonIconfont;
}
@Observed
export class TabBarState extends TabBarStyle {
    selectedIndex: number;
    list: ObservedArray<TabBarItem>;
    midButton?: ITabBarMidButton;
    onClick?: ((options: OnTabItemClickOptions) => void) | undefined;
    onMidButtonClick?: (() => void) | undefined;
    visible: boolean;
    constructor(options: TabBarState) {
        super(options);
        this.selectedIndex = options.selectedIndex;
        this.list = new ObservedArray(...(options.list || []));
        this.midButton = options.midButton;
        this.onClick = options.onClick;
        this.onMidButtonClick = options.onMidButtonClick;
        this.visible = options.visible;
    }
}
class TabBarItemComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__item = new SynchedPropertyNesedObjectPU(params.item, this, "item");
        this.__selectedIndex = new SynchedPropertySimpleOneWayPU(params.selectedIndex, this, "selectedIndex");
        this.__index = new SynchedPropertySimpleOneWayPU(params.index, this, "index");
        this.__style = new SynchedPropertyNesedObjectPU(params.style, this, "style");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabBarItemComponent_Params) {
        this.__item.set(params.item);
        this.__style.set(params.style);
    }
    updateStateVars(params: TabBarItemComponent_Params) {
        this.__item.set(params.item);
        this.__selectedIndex.reset(params.selectedIndex);
        this.__index.reset(params.index);
        this.__style.set(params.style);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__item.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__index.purgeDependencyOnElmtId(rmElmtId);
        this.__style.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__item.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        this.__index.aboutToBeDeleted();
        this.__style.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __item: SynchedPropertyNesedObjectPU<TabBarItem>;
    get item() {
        return this.__item.get();
    }
    private __selectedIndex: SynchedPropertySimpleOneWayPU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private __index: SynchedPropertySimpleOneWayPU<number>;
    get index() {
        return this.__index.get();
    }
    set index(newValue: number) {
        this.__index.set(newValue);
    }
    private __style: SynchedPropertyNesedObjectPU<TabBarStyle>;
    get style() {
        return this.__style.get();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Column, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Center });
            Flex.width('100%');
            Flex.height('100%');
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                direction: FlexDirection.Column,
                alignItems: ItemAlign.Center,
                justifyContent: FlexAlign.Center
            });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.item.iconPath) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(getResourceStr(this.selectedIndex == this.index ? (this.item.selectedIconPath || this.item.iconPath) :
                            this.item.iconPath));
                        Image.objectFit(ImageFit.Contain);
                        Image.width(24);
                        Image.height(24);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.item.text) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.item.text);
                        Text.fontSize(10);
                        Text.fontColor(this.selectedIndex == this.index ? this.style.selectedColor : this.style.color);
                        Text.margin({ top: 3 });
                        Text.lineHeight(10);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.item.badgeType == 'dot') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Circle.create({ width: 12, height: 12 });
                        Circle.fill('#f43530');
                        Circle.position({ top: 2, right: 0 });
                        Circle.translate({ x: '50%' });
                    }, Circle);
                });
            }
            else if (this.item.badgeType == 'number') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.item.badgeText?.toString());
                        Text.fontColor('#fff');
                        Text.fontSize(12);
                        Text.textAlign(TextAlign.Center);
                        Text.backgroundColor('#f43530');
                        Text.border({ radius: 16 });
                        Text.padding({ left: 4, right: 4 });
                        Text.constraintSize({ minWidth: 16 });
                        Text.lineHeight(16);
                        Text.position({ top: 2, right: 0 });
                        Text.translate({ x: '50%' });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                });
            }
        }, If);
        If.pop();
        Flex.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class TabBarMidButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__text = new SynchedPropertySimpleOneWayPU(params.text, this, "text");
        this.__textColor = new SynchedPropertySimpleOneWayPU(params.textColor, this, "textColor");
        this.__iconPath = new SynchedPropertySimpleOneWayPU(params.iconPath, this, "iconPath");
        this.__iconWidth = new SynchedPropertySimpleOneWayPU(params.iconWidth, this, "iconWidth");
        this.__iconHeight = new ObservedPropertySimplePU('', this, "iconHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabBarMidButton_Params) {
        if (params.text === undefined) {
            this.__text.set('');
        }
        if (params.textColor === undefined) {
            this.__textColor.set('');
        }
        if (params.iconPath === undefined) {
            this.__iconPath.set('');
        }
        if (params.iconWidth === undefined) {
            this.__iconWidth.set('');
        }
        if (params.iconHeight !== undefined) {
            this.iconHeight = params.iconHeight;
        }
    }
    updateStateVars(params: TabBarMidButton_Params) {
        this.__text.reset(params.text);
        this.__textColor.reset(params.textColor);
        this.__iconPath.reset(params.iconPath);
        this.__iconWidth.reset(params.iconWidth);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__text.purgeDependencyOnElmtId(rmElmtId);
        this.__textColor.purgeDependencyOnElmtId(rmElmtId);
        this.__iconPath.purgeDependencyOnElmtId(rmElmtId);
        this.__iconWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__iconHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__text.aboutToBeDeleted();
        this.__textColor.aboutToBeDeleted();
        this.__iconPath.aboutToBeDeleted();
        this.__iconWidth.aboutToBeDeleted();
        this.__iconHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __text?: SynchedPropertySimpleOneWayPU<string>;
    get text() {
        return this.__text.get();
    }
    set text(newValue: string) {
        this.__text.set(newValue);
    }
    private __textColor?: SynchedPropertySimpleOneWayPU<string>;
    get textColor() {
        return this.__textColor.get();
    }
    set textColor(newValue: string) {
        this.__textColor.set(newValue);
    }
    private __iconPath?: SynchedPropertySimpleOneWayPU<string>;
    get iconPath() {
        return this.__iconPath.get();
    }
    set iconPath(newValue: string) {
        this.__iconPath.set(newValue);
    }
    private __iconWidth?: SynchedPropertySimpleOneWayPU<string>;
    get iconWidth() {
        return this.__iconWidth.get();
    }
    set iconWidth(newValue: string) {
        this.__iconWidth.set(newValue);
    }
    private __iconHeight?: ObservedPropertySimplePU<string>;
    get iconHeight() {
        return this.__iconHeight.get();
    }
    set iconHeight(newValue: string) {
        this.__iconHeight.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.iconPath) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(getResourceStr(this.iconPath));
                        Image.width(this.iconWidth ? this.iconWidth.replace('px', 'vp') : '24vp');
                        Image.height(this.iconHeight);
                        Image.onComplete((e) => {
                            if (!e) {
                                return;
                            }
                            const componentWidthVp = parseInt(this.iconWidth ? this.iconWidth.replace('px', '') : '24');
                            const componentHeightVp = e.height / e.width * componentWidthVp;
                            this.iconHeight = componentHeightVp + 'vp';
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.text) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.layoutWeight(1);
                        Column.justifyContent(FlexAlign.Center);
                        Column.alignItems(HorizontalAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.text);
                        Text.foregroundColor(this.textColor || undefined);
                        Text.fontSize(10);
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class TabBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.onTabItemClick = undefined;
        this.onMidButtonClick = undefined;
        this.__style = new SynchedPropertyNesedObjectPU(params.style, this, "style");
        this.__selectedIndex = new SynchedPropertySimpleOneWayPU(params.selectedIndex, this, "selectedIndex");
        this.__items = new SynchedPropertyNesedObjectPU(params.items, this, "items");
        this.__midButton = new SynchedPropertyObjectOneWayPU(params.midButton, this, "midButton");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TabBar_Params) {
        if (params.onTabItemClick !== undefined) {
            this.onTabItemClick = params.onTabItemClick;
        }
        if (params.onMidButtonClick !== undefined) {
            this.onMidButtonClick = params.onMidButtonClick;
        }
        this.__style.set(params.style);
        this.__items.set(params.items);
    }
    updateStateVars(params: TabBar_Params) {
        this.__style.set(params.style);
        this.__selectedIndex.reset(params.selectedIndex);
        this.__items.set(params.items);
        this.__midButton.reset(params.midButton);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__items.purgeDependencyOnElmtId(rmElmtId);
        this.__midButton.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__style.aboutToBeDeleted();
        this.__selectedIndex.aboutToBeDeleted();
        this.__items.aboutToBeDeleted();
        this.__midButton.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private onTabItemClick?: (options: OnTabItemClickOptions) => void;
    private onMidButtonClick?: () => void;
    private __style: SynchedPropertyNesedObjectPU<TabBarStyle>;
    get style() {
        return this.__style.get();
    }
    private __selectedIndex: SynchedPropertySimpleOneWayPU<number>;
    get selectedIndex() {
        return this.__selectedIndex.get();
    }
    set selectedIndex(newValue: number) {
        this.__selectedIndex.set(newValue);
    }
    private __items: SynchedPropertyNesedObjectPU<ObservedArray<TabBarItem>>;
    get items() {
        return this.__items.get();
    }
    private __midButton?: SynchedPropertySimpleOneWayPU<ITabBarMidButton>;
    get midButton() {
        return this.__midButton.get();
    }
    set midButton(newValue: ITabBarMidButton) {
        this.__midButton.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor(this.style.backgroundColor);
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.BOTTOM]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Row });
            Flex.height(50);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.position({ x: 0, y: 0 });
            Divider.margin(0);
            Divider.padding(0);
            Divider.strokeWidth(0.5);
            Divider.color(this.style.borderColor);
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (item.visible !== false) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                __Common__.create();
                                __Common__.layoutWeight(1);
                                __Common__.onClick(() => {
                                    this.onTabItemClick?.({
                                        index
                                    } as OnTabItemClickOptions);
                                });
                            }, __Common__);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new TabBarItemComponent(this, {
                                            item: item!,
                                            index,
                                            selectedIndex: this.selectedIndex,
                                            style: this.style
                                        }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/TabBar.ets", line: 203, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                item: item!,
                                                index,
                                                selectedIndex: this.selectedIndex,
                                                style: this.style
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            item: item!,
                                            index,
                                            selectedIndex: this.selectedIndex,
                                            style: this.style
                                        });
                                    }
                                }, { name: "TabBarItemComponent" });
                            }
                            __Common__.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.midButton && this.items.length / 2 === index + 1) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                __Common__.create();
                                __Common__.width(this.midButton?.width ? this.midButton.width.replace('px', 'vp') : '80vp');
                                __Common__.height(this.midButton?.height ? this.midButton.height.replace('px', 'vp') : '50vp');
                                __Common__.backgroundImage(this.midButton?.backgroundImage ? getResourceStr(this.midButton.backgroundImage) :
                                    undefined, ImageRepeat.NoRepeat);
                                __Common__.backgroundImageSize({
                                    width: '100%',
                                    height: '100%'
                                });
                                __Common__.alignSelf(ItemAlign.End);
                                __Common__.onClick(() => {
                                    this.onMidButtonClick?.();
                                });
                            }, __Common__);
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new TabBarMidButton(this, {
                                            text: this.midButton?.text,
                                            textColor: this.style.color,
                                            iconPath: this.midButton?.iconPath,
                                            iconWidth: this.midButton?.iconWidth,
                                        }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/TabBar.ets", line: 219, col: 13 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                text: this.midButton?.text,
                                                textColor: this.style.color,
                                                iconPath: this.midButton?.iconPath,
                                                iconWidth: this.midButton?.iconWidth
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            text: this.midButton?.text,
                                            textColor: this.style.color,
                                            iconPath: this.midButton?.iconPath,
                                            iconWidth: this.midButton?.iconWidth
                                        });
                                    }
                                }, { name: "TabBarMidButton" });
                            }
                            __Common__.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.items, forEachItemGenFunction, undefined, true, false);
        }, ForEach);
        ForEach.pop();
        Flex.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SafeAreaOffset(this, { type: 'bottom' }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/TabBar.ets", line: 243, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            type: 'bottom'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        type: 'bottom'
                    });
                }
            }, { name: "SafeAreaOffset" });
        }
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
