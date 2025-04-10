import webview from "@ohos:web.webview";
interface JavaScriptProxy {
    object: object;
    name: string;
    methodList: Array<string>;
    controller: WebviewController;
}
interface pageStyle {
    backgroundColor: string;
}
interface WebBuilderOptions extends WebOptions {
    darkmode: boolean;
    controller: webview.WebviewController;
    javaScriptProxy: JavaScriptProxy;
    safeAreaEdges: Array<SafeAreaEdge>;
    backgroundColor?: string;
    onPageBegin: () => void;
    onPageEnd: () => void;
    onFocus: () => void;
    onBlur: () => void;
    onPageVisible: () => void;
    onInterceptRequest: () => WebResourceResponse;
    onNativeEmbedLifecycleChange: (event: NativeEmbedDataInfo) => void;
    onNativeEmbedGestureEvent: (event: NativeEmbedTouchInfo) => void;
    onAreaChange: (oldValue: Area, newValue: Area) => void;
    onControllerAttached: () => void;
}
export function WebBuilder(options: WebBuilderOptions, parent = null) {
    const __options__ = options;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, options = __options__) => {
        Web.create(options);
        Web.darkMode(options.darkmode ? WebDarkMode.Auto : WebDarkMode.Off);
        Web.keyboardAvoidMode(WebKeyboardAvoidMode.OVERLAYS_CONTENT);
        Web.backgroundColor(options.backgroundColor || Color.Transparent);
        Web.javaScriptProxy(options.javaScriptProxy);
        Web.onFocus(() => {
            options.onFocus();
        });
        Web.onBlur(() => {
            options.onBlur();
        });
        Web.onConsole(event => {
            if (event) {
                console.log(event.message.getMessage());
            }
            return false;
        });
        Web.onErrorReceive(event => {
            if (event) {
                console.error(event.error.getErrorInfo());
            }
        });
        Web.onDisAppear(() => {
            webview.WebCookieManager.saveCookieAsync();
        });
        Web.nestedScroll({
            scrollForward: NestedScrollMode.PARENT_FIRST,
            scrollBackward: NestedScrollMode.PARENT_FIRST
        });
        Web.onSslErrorEventReceive((event) => {
            event.handler.handleConfirm();
        });
        Web.onPageBegin(options.onPageBegin);
        Web.onPageEnd(options.onPageEnd);
        Web.onPageVisible(options.onPageVisible);
        Web.onInterceptRequest(options.onInterceptRequest);
        Web.enableNativeEmbedMode(true);
        Web.onNativeEmbedLifecycleChange(options.onNativeEmbedLifecycleChange);
        Web.onNativeEmbedGestureEvent(options.onNativeEmbedGestureEvent);
        Web.fileAccess(true);
        Web.imageAccess(true);
        Web.onlineImageAccess(true);
        Web.domStorageAccess(true);
        Web.overScrollMode(OverScrollMode.NEVER);
        Web.expandSafeArea([SafeAreaType.SYSTEM, SafeAreaType.KEYBOARD], options.safeAreaEdges);
        Web.metaViewport(true);
        Web.mediaPlayGestureAccess(false);
        Web.onAreaChange(options.onAreaChange);
        Web.onControllerAttached(options.onControllerAttached);
    }, Web);
}
