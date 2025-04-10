import harmonyWebView from "@ohos:web.webview";
import { defineNativeEmbed } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
import { WebView } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/WebView&1.0.0";
import { NodeRenderType } from "@ohos:arkui.node";
import type { NativeEmbedBuilderOptions } from './types';
interface WebViewBuilderOptions extends NativeEmbedBuilderOptions {
    controller: harmonyWebView.WebviewController;
    src: string;
    onMessage: () => void;
    onTitleUpdate: () => void;
    onPostMessageToService: () => void;
}
function WebViewBuilder(options: WebViewBuilderOptions, parent = null) {
    const __options__ = options;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, options = __options__) => {
        __Common__.create();
        __Common__.position({
            x: options.x,
            y: options.y,
        });
        __Common__.width(options.width);
        __Common__.height(options.height);
        __Common__.visibility(options.visibility);
    }, __Common__);
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, options = __options__) => {
            if (isInitialRender) {
                let componentCall = new WebView(parent ? parent : this, {
                    controller: options.controller,
                    src: options.src,
                    onMessage: options.onMessage,
                    onTitleUpdate: options.onTitleUpdate,
                    onPostMessageToService: options.onPostMessageToService,
                }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/WebViewBuilder.ets", line: 17, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {
                        controller: options.controller,
                        src: options.src,
                        onMessage: options.onMessage,
                        onTitleUpdate: options.onTitleUpdate,
                        onPostMessageToService: options.onPostMessageToService
                    };
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                    src: options.src
                });
            }
        }, { name: "WebView" });
    }
    __Common__.pop();
}
defineNativeEmbed('webview', {
    builder: WebViewBuilder,
    controller: harmonyWebView.WebviewController,
    nodeRenderType: NodeRenderType.RENDER_TYPE_DISPLAY
});
