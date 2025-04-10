if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Ad_Params {
    adpid?: string;
    oaid?: string;
    onLoad?: (detail?: CustomEvent) => void;
    onClose?: (detail?: CustomEvent) => void;
    onError?: (detail?: CustomEvent) => void;
    onResize?: (detail?: CustomEvent) => void;
    onAdOpen?: (detail?: CustomEvent) => void;
    onAdClick?: (detail?: CustomEvent) => void;
    ads?: Array<advertising.Advertisement>;
    adDisplayOptions?: advertising.AdDisplayOptions;
    adVisibilityState?: Visibility;
    adid?;
}
import { getAbilityContext } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
import { AdComponent } from "@ohos:advertising.AdComponent";
import advertising from "@ohos:advertising";
import identifier from "@ohos:identifier.oaid";
interface Detail {
    errCode?: number;
    errMsg?: string;
}
export interface CustomEvent {
    detail: Detail;
}
let getAdId: ((adpid: string) => Promise<Object>) | null = () => Promise.resolve<Object>(() => { });
export class Ad extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__adpid = new SynchedPropertySimpleOneWayPU(params.adpid, this, "adpid");
        this.__oaid = new SynchedPropertySimpleOneWayPU(params.oaid, this, "oaid");
        this.onLoad = undefined;
        this.onClose = undefined;
        this.onError = undefined;
        this.onResize = undefined;
        this.onAdOpen = undefined;
        this.onAdClick = undefined;
        this.__ads = new ObservedPropertyObjectPU([], this, "ads");
        this.__adDisplayOptions = new ObservedPropertyObjectPU({
            refreshTime: 120000
        }, this, "adDisplayOptions");
        this.__adVisibilityState = new ObservedPropertySimplePU(Visibility.Visible, this, "adVisibilityState");
        this.adid = '';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Ad_Params) {
        if (params.adpid === undefined) {
            this.__adpid.set('');
        }
        if (params.oaid === undefined) {
            this.__oaid.set('');
        }
        if (params.onLoad !== undefined) {
            this.onLoad = params.onLoad;
        }
        if (params.onClose !== undefined) {
            this.onClose = params.onClose;
        }
        if (params.onError !== undefined) {
            this.onError = params.onError;
        }
        if (params.onResize !== undefined) {
            this.onResize = params.onResize;
        }
        if (params.onAdOpen !== undefined) {
            this.onAdOpen = params.onAdOpen;
        }
        if (params.onAdClick !== undefined) {
            this.onAdClick = params.onAdClick;
        }
        if (params.ads !== undefined) {
            this.ads = params.ads;
        }
        if (params.adDisplayOptions !== undefined) {
            this.adDisplayOptions = params.adDisplayOptions;
        }
        if (params.adVisibilityState !== undefined) {
            this.adVisibilityState = params.adVisibilityState;
        }
        if (params.adid !== undefined) {
            this.adid = params.adid;
        }
    }
    updateStateVars(params: Ad_Params) {
        this.__adpid.reset(params.adpid);
        this.__oaid.reset(params.oaid);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__adpid.purgeDependencyOnElmtId(rmElmtId);
        this.__oaid.purgeDependencyOnElmtId(rmElmtId);
        this.__ads.purgeDependencyOnElmtId(rmElmtId);
        this.__adDisplayOptions.purgeDependencyOnElmtId(rmElmtId);
        this.__adVisibilityState.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__adpid.aboutToBeDeleted();
        this.__oaid.aboutToBeDeleted();
        this.__ads.aboutToBeDeleted();
        this.__adDisplayOptions.aboutToBeDeleted();
        this.__adVisibilityState.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __adpid?: SynchedPropertySimpleOneWayPU<string>;
    get adpid() {
        return this.__adpid.get();
    }
    set adpid(newValue: string) {
        this.__adpid.set(newValue);
    }
    private __oaid?: SynchedPropertySimpleOneWayPU<string>;
    get oaid() {
        return this.__oaid.get();
    }
    set oaid(newValue: string) {
        this.__oaid.set(newValue);
    }
    private onLoad?: (detail?: CustomEvent) => void;
    private onClose?: (detail?: CustomEvent) => void;
    private onError?: (detail?: CustomEvent) => void;
    private onResize?: (detail?: CustomEvent) => void;
    private onAdOpen?: (detail?: CustomEvent) => void;
    private onAdClick?: (detail?: CustomEvent) => void;
    private __ads: ObservedPropertyObjectPU<Array<advertising.Advertisement>>;
    get ads() {
        return this.__ads.get();
    }
    set ads(newValue: Array<advertising.Advertisement>) {
        this.__ads.set(newValue);
    }
    private __adDisplayOptions: ObservedPropertyObjectPU<advertising.AdDisplayOptions>;
    get adDisplayOptions() {
        return this.__adDisplayOptions.get();
    }
    set adDisplayOptions(newValue: advertising.AdDisplayOptions) {
        this.__adDisplayOptions.set(newValue);
    }
    private __adVisibilityState: ObservedPropertySimplePU<Visibility>;
    get adVisibilityState() {
        return this.__adVisibilityState.get();
    }
    set adVisibilityState(newValue: Visibility) {
        this.__adVisibilityState.set(newValue);
    }
    private adid;
    aboutToAppear() {
        if (!this.adpid) {
            return;
        }
        getAdId!(this.adpid).then((res) => {
            let adid = res as string;
            if (adid.length > 0) {
                this.adid = adid;
                return identifier.getOAID().then((data) => {
                    this.oaid = data;
                }).catch(() => { });
            }
            else {
                throw Error('adid invalid');
            }
        }, (err: Error) => {
            this.onError?.({
                detail: {
                    errMsg: err.message
                }
            });
        }).then((res) => {
            this.loadAdData(this.adid);
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.adVisibilityState == Visibility.Visible) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.ads.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    __Common__.create();
                                    __Common__.onAreaChange((oldArea: Area, newArea: Area) => {
                                        this.onResize?.({
                                            detail: {}
                                        });
                                    });
                                }, __Common__);
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new AdComponent(this, {
                                                ads: [this.ads[0]],
                                                displayOptions: this.adDisplayOptions,
                                                interactionListener: {
                                                    onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
                                                        switch (status) {
                                                            case 'onAdOpen':
                                                                this.onAdOpen?.({
                                                                    detail: {}
                                                                });
                                                                break;
                                                            case 'onAdClick':
                                                                this.onAdClick?.({
                                                                    detail: {}
                                                                });
                                                                break;
                                                            case 'onAdClose':
                                                                this.onClose?.({
                                                                    detail: {}
                                                                });
                                                                break;
                                                            default:
                                                        }
                                                    }
                                                }
                                            }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/Ad.ets", line: 63, col: 9 });
                                            ViewPU.create(componentCall);
                                            let paramsLambda = () => {
                                                return {
                                                    ads: [this.ads[0]],
                                                    displayOptions: this.adDisplayOptions,
                                                    interactionListener: {
                                                        onStatusChanged: (status: string, ad: advertising.Advertisement, data: string) => {
                                                            switch (status) {
                                                                case 'onAdOpen':
                                                                    this.onAdOpen?.({
                                                                        detail: {}
                                                                    });
                                                                    break;
                                                                case 'onAdClick':
                                                                    this.onAdClick?.({
                                                                        detail: {}
                                                                    });
                                                                    break;
                                                                case 'onAdClose':
                                                                    this.onClose?.({
                                                                        detail: {}
                                                                    });
                                                                    break;
                                                                default:
                                                            }
                                                        }
                                                    }
                                                };
                                            };
                                            componentCall.paramsGenerator_ = paramsLambda;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                                        }
                                    }, { name: "AdComponent" });
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
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    private loadAdData(adid: string): void {
        const adOptions: advertising.AdOptions = {
            allowMobileTraffic: 0,
            tagForChildProtection: -1,
            tagForUnderAgeOfPromise: -1,
            adContentClassification: 'A'
        };
        const adReqParams: advertising.AdRequestParams[] = [{
                adId: adid,
                adType: 3,
                adCount: 1,
                enableDirectReturnVideoAd: true,
                oaid: this.oaid
            }];
        const adLoaderListener: advertising.MultiSlotsAdLoadListener = {
            onAdLoadSuccess: (ads: Map<string, Array<advertising.Advertisement>>) => {
                ads.forEach((adsArray) => this.ads.push(...adsArray));
            },
            onAdLoadFailure: (errorCode: number, errorMsg: string) => {
                console.log(errorMsg);
                this.onError?.({
                    detail: {
                        errCode: errorCode,
                        errMsg: errorMsg
                    }
                });
            },
        };
        const load: advertising.AdLoader = new advertising.AdLoader(getAbilityContext());
        load.loadAdWithMultiSlots(adReqParams, adOptions, adLoaderListener);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export function setAdServer(getFeedAdData: ((adpid: string) => Promise<Object>) | null): void {
    getAdId = getFeedAdData;
}
