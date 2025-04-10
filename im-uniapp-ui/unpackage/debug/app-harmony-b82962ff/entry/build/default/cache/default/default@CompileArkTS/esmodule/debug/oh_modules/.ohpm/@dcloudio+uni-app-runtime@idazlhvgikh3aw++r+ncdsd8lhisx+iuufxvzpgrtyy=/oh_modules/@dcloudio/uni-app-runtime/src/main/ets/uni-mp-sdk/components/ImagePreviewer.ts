if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ImagePreviewer_Params {
    urls?: string[];
    state?: PreviewImageState;
    controller?: CustomDialogController;
}
interface ImageView_Params {
    url?: string;
    showmenu?: boolean;
    offsetX?: number;
    offsetY?: number;
    scaleRatio?: number;
    offsetXStart?: number;
    offsetYStart?: number;
    scaleRatioStart?: number;
    scaleCenterX?: number;
    scaleCenterY?: number;
    loadComplete?: boolean;
    componentWidth?: number;
    componentHeight?: number;
    contentWidth?: number;
    contentHeight?: number;
}
import promptAction from "@ohos:promptAction";
import { ObservedArray } from "@normalized:N&&&@dcloudio/uni-mp-sdk/utils/index&1.0.0";
import { uni, getResourceStr } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
/**
 * customDialog参考文档，经评估决定使用自定义弹窗方案
 * - [自定义弹窗](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-common-components-custom-dialog-0000001813575884)
 * - [promptAction.openCustomDialog](https://developer.huawei.com/consumer/cn/doc/harmonyos-references/js-apis-promptaction-0000001821000749#ZH-CN_TOPIC_0000001857916061__promptactionopencustomdialog11)
 *
 * 手势相关文档
 * - [多层级手势事件](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides/arkts-gesture-events-multi-level-gesture-0000001839307337)
 *
 * 微信小程序previewImage效果如下
 * - 图片默认contain大小，这也是最小尺寸
 * - 图片放大时滑动到图片边界与屏幕边界重合时再触发切换图片
 *
 * TODO 待解决手势冲突后实现微信小程序的效果，目前禁用PanGesture
 */
interface Image {
    url: string;
    translateX: number;
    translateY: number;
    scale: number;
}
interface IOffset {
    offsetX: number;
    offsetY: number;
    reachTop: boolean;
    reachBottom: boolean;
    reachLeft: boolean;
    reachRight: boolean;
}
const TAG_IMAGE_PAN = 'IMAGE_PAN';
class ImageView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__url = new SynchedPropertySimpleOneWayPU(params.url, this, "url");
        this.__showmenu = new SynchedPropertySimpleOneWayPU(params.showmenu, this, "showmenu");
        this.__offsetX = new ObservedPropertySimplePU(0, this, "offsetX");
        this.__offsetY = new ObservedPropertySimplePU(0, this, "offsetY");
        this.__scaleRatio = new ObservedPropertySimplePU(1, this, "scaleRatio");
        this.__offsetXStart = new ObservedPropertySimplePU(0, this, "offsetXStart");
        this.__offsetYStart = new ObservedPropertySimplePU(0, this, "offsetYStart");
        this.__scaleRatioStart = new ObservedPropertySimplePU(1, this, "scaleRatioStart");
        this.__scaleCenterX = new ObservedPropertySimplePU(0, this, "scaleCenterX");
        this.__scaleCenterY = new ObservedPropertySimplePU(0, this, "scaleCenterY");
        this.__loadComplete = new ObservedPropertySimplePU(false, this, "loadComplete");
        this.__componentWidth = new ObservedPropertySimplePU(0, this, "componentWidth");
        this.__componentHeight = new ObservedPropertySimplePU(0, this, "componentHeight");
        this.__contentWidth = new ObservedPropertySimplePU(0, this, "contentWidth");
        this.__contentHeight = new ObservedPropertySimplePU(0, this, "contentHeight");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("url", this.urlChange);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ImageView_Params) {
        if (params.url === undefined) {
            this.__url.set('');
        }
        if (params.offsetX !== undefined) {
            this.offsetX = params.offsetX;
        }
        if (params.offsetY !== undefined) {
            this.offsetY = params.offsetY;
        }
        if (params.scaleRatio !== undefined) {
            this.scaleRatio = params.scaleRatio;
        }
        if (params.offsetXStart !== undefined) {
            this.offsetXStart = params.offsetXStart;
        }
        if (params.offsetYStart !== undefined) {
            this.offsetYStart = params.offsetYStart;
        }
        if (params.scaleRatioStart !== undefined) {
            this.scaleRatioStart = params.scaleRatioStart;
        }
        if (params.scaleCenterX !== undefined) {
            this.scaleCenterX = params.scaleCenterX;
        }
        if (params.scaleCenterY !== undefined) {
            this.scaleCenterY = params.scaleCenterY;
        }
        if (params.loadComplete !== undefined) {
            this.loadComplete = params.loadComplete;
        }
        if (params.componentWidth !== undefined) {
            this.componentWidth = params.componentWidth;
        }
        if (params.componentHeight !== undefined) {
            this.componentHeight = params.componentHeight;
        }
        if (params.contentWidth !== undefined) {
            this.contentWidth = params.contentWidth;
        }
        if (params.contentHeight !== undefined) {
            this.contentHeight = params.contentHeight;
        }
    }
    updateStateVars(params: ImageView_Params) {
        this.__url.reset(params.url);
        this.__showmenu.reset(params.showmenu);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__url.purgeDependencyOnElmtId(rmElmtId);
        this.__showmenu.purgeDependencyOnElmtId(rmElmtId);
        this.__offsetX.purgeDependencyOnElmtId(rmElmtId);
        this.__offsetY.purgeDependencyOnElmtId(rmElmtId);
        this.__scaleRatio.purgeDependencyOnElmtId(rmElmtId);
        this.__offsetXStart.purgeDependencyOnElmtId(rmElmtId);
        this.__offsetYStart.purgeDependencyOnElmtId(rmElmtId);
        this.__scaleRatioStart.purgeDependencyOnElmtId(rmElmtId);
        this.__scaleCenterX.purgeDependencyOnElmtId(rmElmtId);
        this.__scaleCenterY.purgeDependencyOnElmtId(rmElmtId);
        this.__loadComplete.purgeDependencyOnElmtId(rmElmtId);
        this.__componentWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__componentHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__contentWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__contentHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__url.aboutToBeDeleted();
        this.__showmenu.aboutToBeDeleted();
        this.__offsetX.aboutToBeDeleted();
        this.__offsetY.aboutToBeDeleted();
        this.__scaleRatio.aboutToBeDeleted();
        this.__offsetXStart.aboutToBeDeleted();
        this.__offsetYStart.aboutToBeDeleted();
        this.__scaleRatioStart.aboutToBeDeleted();
        this.__scaleCenterX.aboutToBeDeleted();
        this.__scaleCenterY.aboutToBeDeleted();
        this.__loadComplete.aboutToBeDeleted();
        this.__componentWidth.aboutToBeDeleted();
        this.__componentHeight.aboutToBeDeleted();
        this.__contentWidth.aboutToBeDeleted();
        this.__contentHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __url: SynchedPropertySimpleOneWayPU<string>;
    get url() {
        return this.__url.get();
    }
    set url(newValue: string) {
        this.__url.set(newValue);
    }
    private __showmenu: SynchedPropertySimpleOneWayPU<boolean>;
    get showmenu() {
        return this.__showmenu.get();
    }
    set showmenu(newValue: boolean) {
        this.__showmenu.set(newValue);
    }
    private __offsetX: ObservedPropertySimplePU<number>;
    get offsetX() {
        return this.__offsetX.get();
    }
    set offsetX(newValue: number) {
        this.__offsetX.set(newValue);
    }
    private __offsetY: ObservedPropertySimplePU<number>;
    get offsetY() {
        return this.__offsetY.get();
    }
    set offsetY(newValue: number) {
        this.__offsetY.set(newValue);
    }
    private __scaleRatio: ObservedPropertySimplePU<number>;
    get scaleRatio() {
        return this.__scaleRatio.get();
    }
    set scaleRatio(newValue: number) {
        this.__scaleRatio.set(newValue);
    }
    private __offsetXStart: ObservedPropertySimplePU<number>;
    get offsetXStart() {
        return this.__offsetXStart.get();
    }
    set offsetXStart(newValue: number) {
        this.__offsetXStart.set(newValue);
    }
    private __offsetYStart: ObservedPropertySimplePU<number>;
    get offsetYStart() {
        return this.__offsetYStart.get();
    }
    set offsetYStart(newValue: number) {
        this.__offsetYStart.set(newValue);
    }
    private __scaleRatioStart: ObservedPropertySimplePU<number>;
    get scaleRatioStart() {
        return this.__scaleRatioStart.get();
    }
    set scaleRatioStart(newValue: number) {
        this.__scaleRatioStart.set(newValue);
    }
    private __scaleCenterX: ObservedPropertySimplePU<number>;
    get scaleCenterX() {
        return this.__scaleCenterX.get();
    }
    set scaleCenterX(newValue: number) {
        this.__scaleCenterX.set(newValue);
    }
    private __scaleCenterY: ObservedPropertySimplePU<number>;
    get scaleCenterY() {
        return this.__scaleCenterY.get();
    }
    set scaleCenterY(newValue: number) {
        this.__scaleCenterY.set(newValue);
    }
    private __loadComplete: ObservedPropertySimplePU<boolean>;
    get loadComplete() {
        return this.__loadComplete.get();
    }
    set loadComplete(newValue: boolean) {
        this.__loadComplete.set(newValue);
    }
    private __componentWidth: ObservedPropertySimplePU<number>;
    get componentWidth() {
        return this.__componentWidth.get();
    }
    set componentWidth(newValue: number) {
        this.__componentWidth.set(newValue);
    }
    private __componentHeight: ObservedPropertySimplePU<number>;
    get componentHeight() {
        return this.__componentHeight.get();
    }
    set componentHeight(newValue: number) {
        this.__componentHeight.set(newValue);
    }
    private __contentWidth: ObservedPropertySimplePU<number>;
    get contentWidth() {
        return this.__contentWidth.get();
    }
    set contentWidth(newValue: number) {
        this.__contentWidth.set(newValue);
    }
    private __contentHeight: ObservedPropertySimplePU<number>;
    get contentHeight() {
        return this.__contentHeight.get();
    }
    set contentHeight(newValue: number) {
        this.__contentHeight.set(newValue);
    }
    private urlChange() {
        this.loadComplete = false;
        this.resetPosition();
    }
    private resetPosition() {
        this.offsetX = 0;
        this.offsetY = 0;
        this.scaleRatio = 1;
    }
    private getLimitedOffset(offsetX: number, offsetY: number): IOffset {
        const oversizeX = Math.max(this.contentWidth * this.scaleRatio - this.componentWidth, 0);
        const oversizeY = Math.max(this.contentHeight * this.scaleRatio - this.componentHeight, 0);
        const minOffsetX = -oversizeX / 2;
        const maxOffsetX = -minOffsetX;
        const minOffsetY = -oversizeY / 2;
        const maxOffsetY = -minOffsetY;
        const limitedOffsetX = Math.min(Math.max(minOffsetX, offsetX), maxOffsetX);
        const limitedOffsetY = Math.min(Math.max(minOffsetY, offsetY), maxOffsetY);
        return {
            offsetX: limitedOffsetX,
            offsetY: limitedOffsetY,
            reachTop: limitedOffsetY === maxOffsetY,
            reachBottom: limitedOffsetY === minOffsetY,
            reachLeft: limitedOffsetX === maxOffsetX,
            reachRight: limitedOffsetX === minOffsetX,
        };
    }
    private resetScaleCenter(newCenterX: number, newCenterY: number) {
        const offsetX = this.offsetX + (newCenterX - this.scaleCenterX) * (this.scaleRatio - 1);
        const offsetY = this.offsetY + (newCenterY - this.scaleCenterY) * (this.scaleRatio - 1);
        const limitedOffset = this.getLimitedOffset(offsetX, offsetY);
        this.offsetX = limitedOffset.offsetX;
        this.offsetY = limitedOffset.offsetY;
        this.scaleCenterX = newCenterX;
        this.scaleCenterY = newCenterY;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.width('100%');
            Stack.height('100%');
            Stack.clip(true);
            Gesture.create(GesturePriority.Low);
            LongPressGesture.create();
            LongPressGesture.onAction(() => {
                if (!this.showmenu) {
                    return;
                }
                promptAction.showActionMenu({
                    title: '',
                    buttons: [
                        {
                            text: '保存图片',
                            color: '#000000'
                        }
                    ]
                }, async (err, data) => {
                    if (!data || data.index !== 0) {
                        return;
                    }
                    let uri = this.url;
                    if (/^https?:\/\//.test(uri)) {
                        uri = await new Promise<string>((resolve, reject) => {
                            uni.downloadFile({
                                url: uri,
                                success(res: any) {
                                    resolve(res.tempFilePath);
                                },
                                fail(err: any) {
                                    reject();
                                }
                            });
                        });
                    }
                    uni.saveImageToPhotosAlbum({
                        filePath: uri
                    });
                });
            });
            LongPressGesture.pop();
            Gesture.pop();
            Gesture.create(GesturePriority.Low);
            GestureGroup.create(GestureMode.Parallel);
            PanGesture.create({
                fingers: 1
            });
            PanGesture.onActionStart(() => {
                this.offsetXStart = this.offsetX;
                this.offsetYStart = this.offsetY;
            });
            PanGesture.onActionUpdate((e) => {
                /**
                 * 图片scale后如果宽度小于component宽度则不可左右移动
                 * 图片scale后如果高度小于component高度则不可上下移动
                 * 图片scale后如果宽度大于component宽度则左右移动范围为图片宽度与component宽度差值的一半
                 * 图片scale后如果高度大于component高度则上下移动范围为图片高度与component高度差值的一半
                 */
                const limitedOffset = this.getLimitedOffset(this.offsetXStart + e.offsetX * this.scaleRatio, this.offsetYStart + e.offsetY * this.scaleRatio);
                this.offsetX = limitedOffset.offsetX;
                this.offsetY = limitedOffset.offsetY;
            });
            PanGesture.tag(TAG_IMAGE_PAN);
            PanGesture.pop();
            PinchGesture.create();
            PinchGesture.onActionStart((e) => {
                this.scaleRatioStart = this.scaleRatio;
                const newCenterX = (-this.offsetX) / this.scaleRatio + e.pinchCenterX;
                const newCenterY = (-this.offsetY) / this.scaleRatio + e.pinchCenterY;
                this.resetScaleCenter(newCenterX, newCenterY);
            });
            PinchGesture.onActionUpdate((e) => {
                this.scaleRatio = Math.min(Math.max(1, this.scaleRatioStart * e.scale), 4);
            });
            PinchGesture.onActionEnd((e) => {
                // 重设放大中心点为图片中心
                const newCenterX = (this.componentWidth!) / 2;
                const newCenterY = (this.componentHeight!) / 2;
                this.resetScaleCenter(newCenterX, newCenterY);
            });
            PinchGesture.onActionCancel(() => {
                // 重设放大中心点为图片中心
                const newCenterX = (this.componentWidth!) / 2;
                const newCenterY = (this.componentHeight!) / 2;
                this.resetScaleCenter(newCenterX, newCenterY);
            });
            PinchGesture.pop();
            GestureGroup.pop();
            Gesture.pop();
            Stack.hitTestBehavior(this.loadComplete ? HitTestMode.Default : HitTestMode.None);
            Stack.onGestureJudgeBegin((gestureInfo: GestureInfo, event: BaseGestureEvent) => {
                const tag = gestureInfo.tag;
                if (tag !== TAG_IMAGE_PAN) {
                    return GestureJudgeResult.CONTINUE;
                }
                const offsetX = (event as GestureEvent).offsetX;
                const limit = this.getLimitedOffset(this.offsetX, this.offsetY);
                if (offsetX > 0 && limit.reachLeft || offsetX < 0 && limit.reachRight) {
                    return GestureJudgeResult.REJECT;
                }
                return GestureJudgeResult.CONTINUE;
            });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(getResourceStr(this.url) as string | Resource);
            Image.objectFit(ImageFit.Contain);
            Image.width('100%');
            Image.height('100%');
            Image.draggable(false);
            Image.onComplete((e) => {
                if (!e) {
                    return;
                }
                this.loadComplete = !!(e.componentWidth &&
                    e.componentHeight &&
                    e.contentWidth &&
                    e.contentHeight);
                if (this.loadComplete) {
                    this.componentWidth = px2vp(e?.componentWidth!);
                    this.componentHeight = px2vp(e?.componentHeight!);
                    this.contentWidth = px2vp(e?.contentWidth!);
                    this.contentHeight = px2vp(e?.contentHeight!);
                    this.scaleCenterX = (this.componentWidth!) / 2;
                    this.scaleCenterY = (this.componentHeight!) / 2;
                }
            });
            Image.translate({
                x: this.offsetX,
                y: this.offsetY,
            });
            Image.scale({
                x: this.scaleRatio,
                y: this.scaleRatio,
                centerX: this.scaleCenterX,
                centerY: this.scaleCenterY,
            });
        }, Image);
        Stack.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class ImagePreviewer extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__urls = new SynchedPropertyObjectOneWayPU(params.urls, this, "urls");
        this.__state = new SynchedPropertyObjectOneWayPU(params.state, this, "state");
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ImagePreviewer_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: ImagePreviewer_Params) {
        this.__urls.reset(params.urls);
        this.__state.reset(params.state);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__urls.purgeDependencyOnElmtId(rmElmtId);
        this.__state.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__urls.aboutToBeDeleted();
        this.__state.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __urls: SynchedPropertySimpleOneWayPU<string[]>;
    get urls() {
        return this.__urls.get();
    }
    set urls(newValue: string[]) {
        this.__urls.set(newValue);
    }
    private __state: SynchedPropertySimpleOneWayPU<PreviewImageState>;
    get state() {
        return this.__state.get();
    }
    set state(newValue: PreviewImageState) {
        this.__state.set(newValue);
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.align(Alignment.Center);
            Column.backgroundColor('#FF000000');
            Column.justifyContent(FlexAlign.Center);
            Column.onClick(() => {
                this.controller.close();
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Swiper.create();
            Swiper.width('100%');
            Swiper.height('100%');
            Swiper.loop(false);
            Swiper.effectMode(EdgeEffect.None);
            Swiper.index(this.state.currentIndex);
        }, Swiper);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const url = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new ImageView(this, {
                                url,
                                showmenu: this.state.showmenu
                            }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/ImagePreviewer.ets", line: 251, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    url,
                                    showmenu: this.state.showmenu
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                url,
                                showmenu: this.state.showmenu
                            });
                        }
                    }, { name: "ImageView" });
                }
            };
            this.forEachUpdateFunction(elmtId, this.urls, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Swiper.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
interface IPreviewImageState {
    currentIndex: number;
    showmenu: boolean;
}
@Observed
class PreviewImageState {
    currentIndex: number = 0;
    showmenu: boolean = true;
    constructor(options: IPreviewImageState) {
        this.currentIndex = options.currentIndex;
        this.showmenu = options.showmenu;
    }
}
const previewImageUrls: string[] = new ObservedArray();
const previewImageState = new PreviewImageState({
    currentIndex: 0,
    showmenu: true
});
let imagePreviewerController: CustomDialogController;
function initImagePreviewerOnce(): CustomDialogController {
    if (imagePreviewerController) {
        return imagePreviewerController;
    }
    // new CustomDialogController所在的作用域的this必须指向Component
    imagePreviewerController = new CustomDialogController({
        builder: () => {
            let jsDialog = new ImagePreviewer(this, {
                urls: previewImageUrls,
                state: previewImageState
            }, undefined, -1, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/ImagePreviewer.ets", line: 302, col: 14 });
            jsDialog.setController(
            // new CustomDialogController所在的作用域的this必须指向Component
            imagePreviewerController);
            ViewPU.create(jsDialog);
            let paramsLambda = () => {
                return {
                    urls: previewImageUrls,
                    state: previewImageState
                };
            };
            jsDialog.paramsGenerator_ = paramsLambda;
        },
        alignment: DialogAlignment.Center,
        // backgroundColor: '#FF000000', // 此属性在customStyle: true时无效果
        customStyle: true
    }, this);
    return imagePreviewerController;
}
interface IPreviewImageOptions {
    urls: string[];
    current?: string;
    showmenu?: boolean;
}
export function previewImage(options: IPreviewImageOptions, page: Object) {
    // 切页面relaunch到其他页面不影响预览界面显示
    initImagePreviewerOnce.bind(page)();
    imagePreviewerController.close();
    previewImageUrls.splice(0, previewImageUrls.length);
    const urls = options.urls;
    const currentUrl = options.current || urls[0] || '';
    previewImageState.currentIndex = Math.max(0, urls.indexOf(currentUrl));
    previewImageState.showmenu = options.showmenu === false ? false : true;
    urls.forEach(url => {
        previewImageUrls.push(url);
    });
    imagePreviewerController.open();
}
export function closePreviewImage() {
    imagePreviewerController.close();
}
