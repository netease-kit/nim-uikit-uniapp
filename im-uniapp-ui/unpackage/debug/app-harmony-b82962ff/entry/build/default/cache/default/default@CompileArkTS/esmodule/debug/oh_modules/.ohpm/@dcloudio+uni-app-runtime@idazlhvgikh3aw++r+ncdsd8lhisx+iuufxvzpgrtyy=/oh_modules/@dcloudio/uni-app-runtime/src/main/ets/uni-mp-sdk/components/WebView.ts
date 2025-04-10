if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface WebView_Params {
    src?: string;
    onMessage?: (event: Event) => void;
    onTitleUpdate?: (event: TitleUpdateEvent) => void;
    onPostMessageToService?: (event: Event) => void;
    controller?: harmonyWebView.WebviewController;
}
import type harmonyWebView from "@ohos:web.webview";
import type { BusinessError } from "@ohos:base";
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type common from "@ohos:app.ability.common";
import type { Permissions } from "@ohos:abilityAccessCtrl";
import bundleManager from "@ohos:bundle.bundleManager";
import { createDownloadDelegate, getCurrentMP, telSchemeHandler, getAbilityContext } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
interface Detail {
}
interface Event {
    detail: Detail;
}
interface TitleUpdateEventDetail {
    title?: string;
}
interface TitleUpdateEvent extends Event {
    detail: TitleUpdateEventDetail;
}
export class WebView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__src = new SynchedPropertySimpleOneWayPU(params.src, this, "src");
        this.onMessage = undefined;
        this.onTitleUpdate = undefined;
        this.onPostMessageToService = undefined;
        this.controller = undefined;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("src", this.setSrc);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: WebView_Params) {
        if (params.onMessage !== undefined) {
            this.onMessage = params.onMessage;
        }
        if (params.onTitleUpdate !== undefined) {
            this.onTitleUpdate = params.onTitleUpdate;
        }
        if (params.onPostMessageToService !== undefined) {
            this.onPostMessageToService = params.onPostMessageToService;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
    }
    updateStateVars(params: WebView_Params) {
        this.__src.reset(params.src);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__src.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__src.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __src: SynchedPropertySimpleOneWayPU<string>;
    get src() {
        return this.__src.get();
    }
    set src(newValue: string) {
        this.__src.set(newValue);
    }
    private onMessage?: (event: Event) => void;
    private onTitleUpdate?: (event: TitleUpdateEvent) => void;
    private onPostMessageToService?: (event: Event) => void;
    private controller?: harmonyWebView.WebviewController;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Web.create({
                src: this.src,
                controller: this.controller
            });
            Web.overScrollMode(OverScrollMode.NEVER);
            Web.keyboardAvoidMode(WebKeyboardAvoidMode.RESIZE_VISUAL);
            Web.geolocationAccess(true);
            Web.domStorageAccess(true);
            Web.fileAccess(true);
            Web.imageAccess(true);
            Web.onlineImageAccess(true);
            Web.darkMode(WebDarkMode.Auto);
            Web.mixedMode(MixedMode.All);
            Web.onPermissionRequest((event) => {
                const request = event.request;
                const requestedResources = request.getAccessibleResource();
                const permissions: Permissions[] = [];
                const resources: ProtectedResourceType[] = [];
                if (requestedResources.includes(ProtectedResourceType.VIDEO_CAPTURE)) {
                    permissions.push('ohos.permission.CAMERA');
                    resources.push(ProtectedResourceType.VIDEO_CAPTURE);
                }
                if (requestedResources.includes(ProtectedResourceType.AUDIO_CAPTURE)) {
                    permissions.push('ohos.permission.MICROPHONE');
                    resources.push(ProtectedResourceType.AUDIO_CAPTURE);
                }
                if (permissions.length > 0) {
                    const context = getContext(this) as common.UIAbilityContext;
                    const atManager = abilityAccessCtrl.createAtManager();
                    atManager.requestPermissionsFromUser(context, permissions).then((data) => {
                        const granted: ProtectedResourceType[] = resources.filter((resource, index) => data.authResults[index] === 0);
                        if (granted.length === 0) {
                            request.deny();
                            return;
                        }
                        request.grant(granted);
                    }).catch((error: BusinessError) => {
                        console.error(`Failed to request permissions from user. Code is ${error.code}, message is ${error.message}`);
                        request.deny();
                    });
                }
            });
            Web.onControllerAttached(() => {
                const delegate = createDownloadDelegate() as harmonyWebView.WebDownloadDelegate;
                this.controller?.setDownloadDelegate(delegate);
                const userAgent = getCurrentMP().userAgent.fullUserAgent as string;
                this.controller?.setCustomUserAgent(userAgent);
                this.controller?.setWebSchemeHandler('tel', telSchemeHandler);
            });
            Web.onLoadIntercept((event) => {
                let url = event.data.getRequestUrl();
                if (url.startsWith('file:/') &&
                    (url.includes(getContext()!.tempDir) || url.includes(getContext()!.getApplicationContext().tempDir) ||
                        url.includes(getContext()!.cacheDir) || url.includes(getContext()!.getApplicationContext().cacheDir))) {
                    this.controller?.setPathAllowingUniversalAccess([]);
                }
                else {
                    const internalHtmlDirs = [
                        getContext()!.filesDir,
                        getContext()!.getApplicationContext().filesDir,
                        getContext()!.resourceDir,
                        getContext()!.getApplicationContext().resourceDir
                    ].filter(item => !!item).map(item => item + '/apps');
                    this.controller?.setPathAllowingUniversalAccess(internalHtmlDirs);
                    if (!(url.startsWith('http://') || url.startsWith('https://') || url.startsWith('file:/')) &&
                        /\w+:/.test(url)) {
                        const scheme = (url.match(/(\w+:)\w/) ?? [])[1];
                        if (scheme) {
                            url = url.replace(scheme, scheme + '//');
                        }
                        try {
                            let canOpen = bundleManager.canOpenLink(url);
                            if (canOpen) {
                                getAbilityContext()?.openLink(url);
                                return true;
                            }
                            else {
                                console.error('Webview failed to open link: ' + url);
                            }
                        }
                        catch (e) {
                            console.error('Webview failed to open link: ' + url + '. ' + e);
                        }
                    }
                }
                return false;
            });
            Web.onTitleReceive(event => {
                this.onTitleUpdate?.({
                    detail: {
                        title: event?.title
                    }
                });
            });
            Web.onConsole(event => {
                if (event) {
                    console.log('getMessage: ' + JSON.stringify(event.message.getMessage()));
                }
                return false;
            });
            Web.onErrorReceive(event => {
                if (event) {
                    console.error(event.error.getErrorInfo());
                }
            });
            Web.onSslErrorEventReceive((event) => {
                event.handler.handleConfirm();
            });
            Web.javaScriptProxy({
                object: {
                    postMessage: (data: string) => {
                        if (this.onMessage) {
                            this.onMessage({ detail: JSON.parse(data) });
                        }
                    },
                    postMessageToService: (data: string) => {
                        if (this.onPostMessageToService) {
                            this.onPostMessageToService({ detail: JSON.parse(data) });
                        }
                    }
                },
                name: '__uniapp_x_',
                methodList: ['postMessage', 'postMessageToService'],
                controller: this.controller
            });
            Web.onGeolocationShow((event) => {
                const context = getContext(this) as common.UIAbilityContext;
                const atManager = abilityAccessCtrl.createAtManager();
                atManager.requestPermissionsFromUser(context, ["ohos.permission.APPROXIMATELY_LOCATION", "ohos.permission.LOCATION"]).then((data) => {
                    if (data.authResults.some(item => item === 0)) {
                        event.geolocation.invoke(event.origin, true, true);
                    }
                    else {
                        event.geolocation.invoke(event.origin, false, false);
                    }
                }).catch((error: BusinessError) => {
                    console.error(`Failed to request permissions from user. Code is ${error.code}, message is ${error.message}`);
                    event.geolocation.invoke(event.origin, false, false);
                });
            });
        }, Web);
    }
    setSrc() {
        if (!this.src) {
            return;
        }
        this.controller?.loadUrl(this.src);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
