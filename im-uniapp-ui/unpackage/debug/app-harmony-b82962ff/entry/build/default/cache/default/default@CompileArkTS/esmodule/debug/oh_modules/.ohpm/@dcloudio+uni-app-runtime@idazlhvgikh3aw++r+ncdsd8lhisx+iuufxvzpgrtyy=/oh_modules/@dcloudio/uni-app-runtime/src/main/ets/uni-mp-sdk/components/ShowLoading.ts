if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Loading_Params {
    title?: string;
    controller?: CustomDialogController;
}
class Loading extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__title = new SynchedPropertySimpleOneWayPU(params.title, this, "title");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Loading_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: Loading_Params) {
        this.__title.reset(params.title);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__title.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__title.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __title: SynchedPropertySimpleOneWayPU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Center);
            Column.justifyContent(FlexAlign.Center);
            Column.width('120vp');
            Column.height('120vp');
            Column.backgroundColor('#ff4c4c4c');
            Column.borderRadius('5vp');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            LoadingProgress.create();
            LoadingProgress.width('38vp');
            LoadingProgress.height('38vp');
            LoadingProgress.margin('8vp');
            LoadingProgress.color(Color.White);
        }, LoadingProgress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.title) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.title);
                        Text.fontColor(Color.White);
                        Text.fontSize('14vp');
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
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
interface IShowLoadingOptions {
    title: string;
    mask: boolean;
}
const showLoadingControllers: CustomDialogController[] = [];
function createShowLoadingController(options: IShowLoadingOptions) {
    const controller = new CustomDialogController({
        builder: () => {
            let jsDialog = new Loading(this, {
                title: options.title || '',
            }, undefined, -1, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/ShowLoading.ets", line: 36, col: 14 });
            jsDialog.setController(this.controller);
            ViewPU.create(jsDialog);
            let paramsLambda = () => {
                return {
                    title: options.title || ''
                };
            };
            jsDialog.paramsGenerator_ = paramsLambda;
        },
        alignment: DialogAlignment.Center,
        customStyle: true,
        isModal: options.mask == undefined ? false : options.mask,
        autoCancel: false,
        onWillDismiss: () => {
            hideLoading();
        }
    }, this);
    return controller;
}
export function showLoading(options: IShowLoadingOptions, page: Object) {
    const controller: CustomDialogController = createShowLoadingController.bind(page)(options);
    showLoadingControllers.push(controller);
    controller.open();
}
export function hideLoading() {
    showLoadingControllers.forEach((controller) => {
        controller.close();
    });
    showLoadingControllers.splice(0, showLoadingControllers.length);
}
