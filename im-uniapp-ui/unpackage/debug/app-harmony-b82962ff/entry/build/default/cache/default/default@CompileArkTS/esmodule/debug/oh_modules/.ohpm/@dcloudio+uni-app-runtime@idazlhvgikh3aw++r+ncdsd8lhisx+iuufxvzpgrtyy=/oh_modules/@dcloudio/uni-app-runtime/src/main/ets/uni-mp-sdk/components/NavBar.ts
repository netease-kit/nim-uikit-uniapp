if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NavBar_Params {
    onBackClick?: () => void;
    titleNView?: ITitleNView;
}
import { SafeAreaOffset } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/SafeAreaOffset&1.0.0";
export interface ITitleNView {
    titleText?: string;
    backgroundColor?: string;
    titleColor?: string;
    autoBackButton?: boolean;
    loading?: boolean;
}
export class NavBar extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.onBackClick = undefined;
        this.__titleNView = new SynchedPropertyObjectOneWayPU(params.titleNView, this, "titleNView");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NavBar_Params) {
        if (params.onBackClick !== undefined) {
            this.onBackClick = params.onBackClick;
        }
    }
    updateStateVars(params: NavBar_Params) {
        this.__titleNView.reset(params.titleNView);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__titleNView.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__titleNView.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private onBackClick?: () => void;
    private __titleNView: SynchedPropertySimpleOneWayPU<ITitleNView>;
    get titleNView() {
        return this.__titleNView.get();
    }
    set titleNView(newValue: ITitleNView) {
        this.__titleNView.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor(this.titleNView.backgroundColor || '#F8F8F8');
            Column.expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP]);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SafeAreaOffset(this, { type: 'top' }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/NavBar.ets", line: 18, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            type: 'top'
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        type: 'top'
                    });
                }
            }, { name: "SafeAreaOffset" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ direction: FlexDirection.Row, alignItems: ItemAlign.Center, justifyContent: FlexAlign.Start });
            Flex.height(56);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.titleNView.autoBackButton) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create();
                        Stack.width(40);
                        Stack.height(40);
                        Stack.onClick(() => {
                            this.onBackClick?.();
                        });
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(' ');
                        Text.fontSize(24);
                        Text.fontColor(this.titleNView.titleColor);
                        Text.margin({ left: 16, right: 16 });
                        Text.width(15);
                        Text.height(15);
                        Text.border({
                            width: {
                                left: 2,
                                bottom: 2,
                                top: 0,
                                right: 0
                            },
                            color: this.titleNView.titleColor,
                            style: BorderStyle.Solid,
                            radius: {
                                bottomLeft: 2
                            }
                        });
                        Text.rotate({
                            angle: 45
                        });
                    }, Text);
                    Text.pop();
                    Stack.pop();
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
            if (this.titleNView.titleText) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.titleNView.titleText);
                        Text.fontSize(20);
                        Text.fontColor(this.titleNView.titleColor);
                        Text.maxLines(1);
                        Text.textOverflow({
                            overflow: TextOverflow.Ellipsis
                        });
                        Text.margin({ left: this.titleNView.autoBackButton ? 0 : 16 });
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
            if (this.titleNView.loading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(32);
                        LoadingProgress.margin(4);
                        LoadingProgress.color(this.titleNView.titleColor);
                    }, LoadingProgress);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Flex.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
