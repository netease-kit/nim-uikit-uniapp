import { defineNativeEmbed } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
import { NodeRenderType } from "@ohos:arkui.node";
import type { NativeEmbedBuilderOptions } from './types';
import { Ad, setAdServer } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/Ad&1.0.0";
import type { CustomEvent } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/Ad&1.0.0";
export { setAdServer };
interface On {
    load?: (detail?: CustomEvent) => void;
    close?: (detail?: CustomEvent) => void;
    error?: (detail?: CustomEvent) => void;
    click?: (detail?: CustomEvent) => void;
    adOpen?: (detail?: CustomEvent) => void;
    adClick?: (detail?: CustomEvent) => void;
    resize?: (detail?: CustomEvent) => void;
}
interface AdBuilderOptions extends NativeEmbedBuilderOptions {
    adpid: string;
    disabled?: boolean;
    click: number;
    on?: On;
}
function AdBuilder(options: AdBuilderOptions, parent = null) {
    const __options__ = options;
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, options = __options__) => {
        __Common__.create();
        __Common__.position({
            x: options.x,
            y: options.y,
        });
        __Common__.width(options.width);
        __Common__.height(options.height ? options.height : 300);
    }, __Common__);
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender, options = __options__) => {
            if (isInitialRender) {
                let componentCall = new Ad(parent ? parent : this, {
                    adpid: options.adpid,
                    onLoad: options.on?.load,
                    onClose: options.on?.close,
                    onError: options.on?.error,
                    onResize: options.on?.resize,
                }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/AdBuilder.ets", line: 28, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {
                        adpid: options.adpid,
                        onLoad: options.on?.load,
                        onClose: options.on?.close,
                        onError: options.on?.error,
                        onResize: options.on?.resize
                    };
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                    adpid: options.adpid
                });
            }
        }, { name: "Ad" });
    }
    __Common__.pop();
}
defineNativeEmbed('ad', {
    builder: AdBuilder,
    nodeRenderType: NodeRenderType.RENDER_TYPE_DISPLAY
});
