if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface UniPage_Params {
    currentMP?;
    router?;
    showCapsuleButton?;
    capsuleButtonStyle?;
}
interface Page_Params {
    name?: string;
    pages?: SubPageState[];
    safeArea?: SafeArea | undefined;
    tabBar?: TabBarState | undefined;
    navBar?: NavBarState | undefined;
}
interface SubPage_Params {
    subPage?: SubPageState;
    style?: ObservedPageStyle;
    refreshState?: RefreshState;
    safeArea?: SafeArea | undefined;
}
interface PageContainer_Params {
    subPage?: SubPageState;
    style?: ObservedPageStyle;
    webNode?: IWebNodeController | null;
}
interface PageChildren_Params {
    children?: ObservedChildren;
}
import { WebNodeController, callPageLifeCycle, getCurrentMP, } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
import { TabBar, createTabBarState, createTabBarItem } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/TabBar&1.0.0";
import type { TabBarState, OnTabItemClickOptions } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/TabBar&1.0.0";
import { NavBar } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/NavBar&1.0.0";
import type { ITitleNView } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/NavBar&1.0.0";
import { NodeController } from "@ohos:arkui.node";
import { SafeAreaOffset } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/SafeAreaOffset&1.0.0";
import { Capsule } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/Capsule&1.0.0";
import type { UniMP } from './types/index';
@Observed
class PullToRefresh {
    support?: boolean;
    constructor(pullToRefresh?: PullToRefresh) {
        this.support = pullToRefresh?.support;
    }
}
@Observed
class ObservedPageStyle {
    titleNView?: ITitleNView;
    pullToRefresh?: PullToRefresh;
    background?: string;
    backgroundTextStyle?: 'light' | 'dark';
    marginTop?: number;
    paddingBottom?: number;
    constructor(style: ObservedPageStyle) {
        this.titleNView = style.titleNView;
        this.pullToRefresh = new PullToRefresh(style.pullToRefresh);
        this.background = style.background;
        this.backgroundTextStyle = style.backgroundTextStyle;
        this.marginTop = style.marginTop;
        this.paddingBottom = style.paddingBottom;
    }
}
@Observed
class ObservedChildren extends Array<NodeController> {
}
@Observed
class RefreshState {
    refreshing?: boolean;
    onRefreshing?: () => void;
    onRefreshStateChange?: (state?: RefreshStatus) => void;
    constructor(state?: RefreshState) {
        this.refreshing = state?.refreshing;
        this.onRefreshing = state?.onRefreshing;
        this.onRefreshStateChange = state?.onRefreshStateChange;
    }
}
@Observed
class SubPageState {
    id: string;
    style: ObservedPageStyle;
    embedChildren: ObservedChildren;
    stackChildren: ObservedChildren;
    refreshState: RefreshState;
    constructor(id: string, style: ObservedPageStyle, embedChildren: NodeController[], stackChildren: NodeController[], refreshState?: RefreshState) {
        this.id = id;
        this.style = new ObservedPageStyle(style);
        this.embedChildren = new ObservedChildren(...embedChildren);
        this.stackChildren = new ObservedChildren(...stackChildren);
        this.refreshState = new RefreshState(refreshState);
    }
}
export function createSubPageState(options: SubPageState) {
    return new SubPageState(options.id, options.style, options.embedChildren, options.stackChildren, options.refreshState);
}
export { createTabBarState, createTabBarItem };
interface NavBarState extends ITitleNView {
    onBackClick?: (options: OnTabItemClickOptions) => void;
}
class PageChildren extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__children = new SynchedPropertyNesedObjectPU(params.children, this, "children");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PageChildren_Params) {
        this.__children.set(params.children);
    }
    updateStateVars(params: PageChildren_Params) {
        this.__children.set(params.children);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__children.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__children.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __children: SynchedPropertyNesedObjectPU<ObservedChildren>;
    get children() {
        return this.__children.get();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopStart });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const child = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    NodeContainer.create(child);
                }, NodeContainer);
            };
            this.forEachUpdateFunction(elmtId, this.children, forEachItemGenFunction, (_: object, index: number) => {
                return '' + index;
            }, false, true);
        }, ForEach);
        ForEach.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
abstract class IWebNodeController extends NodeController {
    abstract update: (options: Object) => void;
}
interface IWebNodeStyle {
    backgroundColor: string;
}
class PageContainer extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__subPage = new SynchedPropertyNesedObjectPU(params.subPage, this, "subPage");
        this.__style = new SynchedPropertyObjectOneWayPU(params.style, this, "style");
        this.webNode = null;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("style", this.pageStyleChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PageContainer_Params) {
        this.__subPage.set(params.subPage);
        if (params.webNode !== undefined) {
            this.webNode = params.webNode;
        }
    }
    updateStateVars(params: PageContainer_Params) {
        this.__subPage.set(params.subPage);
        this.__style.reset(params.style);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__subPage.purgeDependencyOnElmtId(rmElmtId);
        this.__style.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__subPage.aboutToBeDeleted();
        this.__style.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __subPage: SynchedPropertyNesedObjectPU<SubPageState>;
    get subPage() {
        return this.__subPage.get();
    }
    private __style: SynchedPropertySimpleOneWayPU<ObservedPageStyle>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: ObservedPageStyle) {
        this.__style.set(newValue);
    }
    private webNode: IWebNodeController | null;
    pageStyleChange(style: ObservedPageStyle) {
        this.updateWebNodeBackground({
            backgroundColor: style.background
        } as IWebNodeStyle);
    }
    updateWebNodeBackground(style: IWebNodeStyle) {
        if (this.webNode) {
            this.webNode.update({
                backgroundColor: style.backgroundColor || Color.Transparent
            } as IWebNodeStyle);
        }
    }
    aboutToAppear(): void {
        this.webNode = new WebNodeController(this.subPage.id) as IWebNodeController;
        this.updateWebNodeBackground({
            backgroundColor: this.style.background
        } as IWebNodeStyle);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.clip(true);
            Stack.width('100%');
            Stack.height('100%');
            Stack.padding({
                bottom: this.style.paddingBottom
            });
            Stack.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.width('100%');
            Stack.height('100%');
            Stack.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
            Stack.margin({
                top: this.style.marginTop
            });
        }, Stack);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageChildren(this, { children: this.subPage.embedChildren }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page.ets", line: 143, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            children: this.subPage.embedChildren
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        children: this.subPage.embedChildren
                    });
                }
            }, { name: "PageChildren" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NodeContainer.create(this.webNode);
            NodeContainer.width('100%');
            NodeContainer.height('100%');
            NodeContainer.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, NodeContainer);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width(0);
            __Common__.height(0);
            __Common__.clip(false);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PageChildren(this, { children: this.subPage.stackChildren }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page.ets", line: 148, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            children: this.subPage.stackChildren
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        children: this.subPage.stackChildren
                    });
                }
            }, { name: "PageChildren" });
        }
        __Common__.pop();
        Stack.pop();
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class SubPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__subPage = new SynchedPropertyNesedObjectPU(params.subPage, this, "subPage");
        this.__style = new SynchedPropertyObjectOneWayPU(params.style, this, "style");
        this.__refreshState = new SynchedPropertyNesedObjectPU(params.refreshState, this, "refreshState");
        this.__safeArea = new SynchedPropertyObjectOneWayPU(params.safeArea, this, "safeArea");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SubPage_Params) {
        this.__subPage.set(params.subPage);
        this.__refreshState.set(params.refreshState);
    }
    updateStateVars(params: SubPage_Params) {
        this.__subPage.set(params.subPage);
        this.__style.reset(params.style);
        this.__refreshState.set(params.refreshState);
        this.__safeArea.reset(params.safeArea);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__subPage.purgeDependencyOnElmtId(rmElmtId);
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__refreshState.purgeDependencyOnElmtId(rmElmtId);
        this.__safeArea.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__subPage.aboutToBeDeleted();
        this.__style.aboutToBeDeleted();
        this.__refreshState.aboutToBeDeleted();
        this.__safeArea.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __subPage: SynchedPropertyNesedObjectPU<SubPageState>;
    get subPage() {
        return this.__subPage.get();
    }
    private __style: SynchedPropertySimpleOneWayPU<ObservedPageStyle>;
    get style() {
        return this.__style.get();
    }
    set style(newValue: ObservedPageStyle) {
        this.__style.set(newValue);
    }
    private __refreshState: SynchedPropertyNesedObjectPU<RefreshState>;
    get refreshState() {
        return this.__refreshState.get();
    }
    private __safeArea: SynchedPropertySimpleOneWayPU<SafeArea | undefined>;
    get safeArea() {
        return this.__safeArea.get();
    }
    set safeArea(newValue: SafeArea | undefined) {
        this.__safeArea.set(newValue);
    }
    customRefreshComponent(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width("100%");
            Stack.align(Alignment.Center);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            LoadingProgress.create();
            LoadingProgress.height(32);
            LoadingProgress.color(this.style.backgroundTextStyle === 'light' ? Color.White : '#5f5f5f');
        }, LoadingProgress);
        Row.pop();
        Stack.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                direction: FlexDirection.Column,
            });
            Flex.width('100%');
            Flex.height('100%');
            Flex.backgroundColor(this.style.background || '#FFFFFF');
            Flex.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.style.titleNView) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new NavBar(this, {
                                    titleNView: this.style.titleNView,
                                    onBackClick: () => {
                                        callPageLifeCycle('onBackPress', this);
                                    }
                                }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page.ets", line: 190, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        titleNView: this.style.titleNView,
                                        onBackClick: () => {
                                            callPageLifeCycle('onBackPress', this);
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    titleNView: this.style.titleNView
                                });
                            }
                        }, { name: "NavBar" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.clip(true);
            Stack.width('100%');
            Stack.flexGrow(1);
            Stack.flexBasis(1);
            Stack.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.style.pullToRefresh?.support) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Refresh.create({
                            refreshing: { value: this.refreshState.refreshing, changeEvent: newValue => { this.refreshState.refreshing = newValue; } },
                            builder: this.customRefreshComponent.bind(this)
                        });
                        Refresh.backgroundColor(this.style.background);
                        Refresh.onStateChange(status => {
                            this.refreshState.onRefreshStateChange?.(status);
                        });
                        Refresh.onRefreshing(() => {
                            this.refreshState.refreshing = true;
                            this.refreshState.onRefreshing?.();
                        });
                    }, Refresh);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new PageContainer(this, { subPage: this.subPage, style: this.style }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page.ets", line: 204, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        subPage: this.subPage,
                                        style: this.style
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    subPage: this.subPage, style: this.style
                                });
                            }
                        }, { name: "PageContainer" });
                    }
                    Refresh.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new PageContainer(this, { subPage: this.subPage, style: this.style }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page.ets", line: 215, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        subPage: this.subPage,
                                        style: this.style
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    subPage: this.subPage, style: this.style
                                });
                            }
                        }, { name: "PageContainer" });
                    }
                });
            }
        }, If);
        If.pop();
        Stack.pop();
        Flex.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
@Observed
class ObservedPages extends Array<SubPageState> {
}
interface SafeAreaBottom {
    offset?: string;
}
interface SafeArea {
    background?: string;
    bottom?: SafeAreaBottom;
}
class Page extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__name = new SynchedPropertySimpleOneWayPU(params.name, this, "name");
        this.__pages = new ObservedPropertyObjectPU(new ObservedPages(), this, "pages");
        this.__safeArea = new ObservedPropertyObjectPU(undefined, this, "safeArea");
        this.__tabBar = new ObservedPropertyObjectPU(undefined, this, "tabBar");
        this.__navBar = new ObservedPropertyObjectPU(undefined, this, "navBar");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Page_Params) {
        if (params.pages !== undefined) {
            this.pages = params.pages;
        }
        if (params.safeArea !== undefined) {
            this.safeArea = params.safeArea;
        }
        if (params.tabBar !== undefined) {
            this.tabBar = params.tabBar;
        }
        if (params.navBar !== undefined) {
            this.navBar = params.navBar;
        }
    }
    updateStateVars(params: Page_Params) {
        this.__name.reset(params.name);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__name.purgeDependencyOnElmtId(rmElmtId);
        this.__pages.purgeDependencyOnElmtId(rmElmtId);
        this.__safeArea.purgeDependencyOnElmtId(rmElmtId);
        this.__tabBar.purgeDependencyOnElmtId(rmElmtId);
        this.__navBar.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__pages.aboutToBeDeleted();
        this.__safeArea.aboutToBeDeleted();
        this.__tabBar.aboutToBeDeleted();
        this.__navBar.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __name: SynchedPropertySimpleOneWayPU<string>;
    get name() {
        return this.__name.get();
    }
    set name(newValue: string) {
        this.__name.set(newValue);
    }
    private __pages: ObservedPropertyObjectPU<SubPageState[]>;
    get pages() {
        return this.__pages.get();
    }
    set pages(newValue: SubPageState[]) {
        this.__pages.set(newValue);
    }
    private __safeArea: ObservedPropertyObjectPU<SafeArea | undefined>;
    get safeArea() {
        return this.__safeArea.get();
    }
    set safeArea(newValue: SafeArea | undefined) {
        this.__safeArea.set(newValue);
    }
    private __tabBar: ObservedPropertyObjectPU<TabBarState | undefined>;
    get tabBar() {
        return this.__tabBar.get();
    }
    set tabBar(newValue: TabBarState | undefined) {
        this.__tabBar.set(newValue);
    }
    private __navBar: ObservedPropertyObjectPU<NavBarState | undefined>;
    get navBar() {
        return this.__navBar.get();
    }
    set navBar(newValue: NavBarState | undefined) {
        this.__navBar.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({
                direction: FlexDirection.Column,
            });
            Flex.width('100%');
            Flex.height('100%');
            Flex.backgroundColor(this.safeArea?.background);
            Flex.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.flexGrow(1);
            Stack.flexBasis(1);
            Stack.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM]);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const subPage = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SubPage(this, {
                                subPage: subPage,
                                style: subPage.style,
                                refreshState: subPage.refreshState,
                                safeArea: this.safeArea
                            }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page.ets", line: 258, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    subPage: subPage,
                                    style: subPage.style,
                                    refreshState: subPage.refreshState,
                                    safeArea: this.safeArea
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                subPage: subPage,
                                style: subPage.style,
                                refreshState: subPage.refreshState,
                                safeArea: this.safeArea
                            });
                        }
                    }, { name: "SubPage" });
                }
            };
            this.forEachUpdateFunction(elmtId, this.pages, forEachItemGenFunction, (subPage: SubPageState, index: number) => {
                // NOTE: index is not used here, but it is required by the ForEach API return id (HarmonyOS Next Beta6)
                return subPage.id;
            }, true, true);
        }, ForEach);
        ForEach.pop();
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.tabBar && this.tabBar.list && this.tabBar.list.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.visibility(this.tabBar.visible === false ? Visibility.None : Visibility.Visible);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TabBar(this, {
                                    style: this.tabBar,
                                    selectedIndex: this.tabBar.selectedIndex,
                                    items: this.tabBar.list,
                                    midButton: this.tabBar.midButton,
                                    onTabItemClick: (options: OnTabItemClickOptions) => {
                                        this.tabBar?.onClick?.(options);
                                    },
                                    onMidButtonClick: () => {
                                        this.tabBar?.onMidButtonClick?.();
                                    }
                                }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page.ets", line: 275, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        style: this.tabBar,
                                        selectedIndex: this.tabBar.selectedIndex,
                                        items: this.tabBar.list,
                                        midButton: this.tabBar.midButton,
                                        onTabItemClick: (options: OnTabItemClickOptions) => {
                                            this.tabBar?.onClick?.(options);
                                        },
                                        onMidButtonClick: () => {
                                            this.tabBar?.onMidButtonClick?.();
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    style: this.tabBar,
                                    selectedIndex: this.tabBar.selectedIndex,
                                    items: this.tabBar.list,
                                    midButton: this.tabBar.midButton
                                });
                            }
                        }, { name: "TabBar" });
                    }
                    __Common__.pop();
                });
            }
            else if (this.safeArea && this.safeArea?.bottom?.offset === 'auto') {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SafeAreaOffset(this, { type: 'bottom' }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page.ets", line: 289, col: 9 });
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
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                });
            }
        }, If);
        If.pop();
        Flex.pop();
    }
    aboutToAppear() {
        callPageLifeCycle('aboutToAppear', this);
    }
    aboutToDisappear() {
        callPageLifeCycle('aboutToDisappear', this);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class UniPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.currentMP = getCurrentMP() as UniMP;
        this.router = this.currentMP.router;
        this.showCapsuleButton = this.currentMP.showCapsuleButton;
        this.capsuleButtonStyle = this.currentMP.capsuleButtonStyle;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: UniPage_Params) {
        if (params.currentMP !== undefined) {
            this.currentMP = params.currentMP;
        }
        if (params.router !== undefined) {
            this.router = params.router;
        }
        if (params.showCapsuleButton !== undefined) {
            this.showCapsuleButton = params.showCapsuleButton;
        }
        if (params.capsuleButtonStyle !== undefined) {
            this.capsuleButtonStyle = params.capsuleButtonStyle;
        }
    }
    updateStateVars(params: UniPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private currentMP;
    private router;
    private showCapsuleButton;
    private capsuleButtonStyle;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({
                alignContent: Alignment.TopEnd
            });
            Stack.height('100%');
            Stack.width('100%');
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.router, { moduleName: "entry", pagePath: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page", isUserCreateStack: true });
            Navigation.mode(NavigationMode.Stack);
            Navigation.titleMode(NavigationTitleMode.Mini);
            Navigation.navDestination({ builder: this.pageBuilder.bind(this) });
            Navigation.hideTitleBar(true);
        }, Navigation);
        Navigation.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showCapsuleButton) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new Capsule(this, {
                                    style: this.capsuleButtonStyle
                                }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page.ets", line: 325, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        style: this.capsuleButtonStyle
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    style: this.capsuleButtonStyle
                                });
                            }
                        }, { name: "Capsule" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    pageBuilder(name: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new Page(this, { name: name }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page.ets", line: 337, col: 7 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    name: name
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                name: name
                            });
                        }
                    }, { name: "Page" });
                }
            }, { moduleName: "entry", pagePath: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page" });
            NavDestination.hideTitleBar(true);
            NavDestination.onBackPressed(() => {
                return callPageLifeCycle('onBackPress', this);
            });
        }, NavDestination);
        NavDestination.pop();
    }
    onBackPress(): boolean {
        return callPageLifeCycle('onBackPress', this);
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "UniPage";
    }
}
{
    let routeNameNode = 'UniPage';
    registerNamedRoute(() => new UniPage(undefined, {}), routeNameNode, { bundleName: "com.netease.yunxin.app.hm.im", moduleName: "entry", pagePath: "../../../../oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page", pageFullPath: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/Page", integratedHsp: "false", moduleType: "followWithHap" });
}
