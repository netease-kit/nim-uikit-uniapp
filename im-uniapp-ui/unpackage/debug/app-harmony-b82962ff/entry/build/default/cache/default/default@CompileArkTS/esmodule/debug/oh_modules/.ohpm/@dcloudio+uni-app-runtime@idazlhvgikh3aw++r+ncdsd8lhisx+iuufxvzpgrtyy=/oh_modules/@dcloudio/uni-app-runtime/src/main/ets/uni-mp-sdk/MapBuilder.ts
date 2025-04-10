import { defineNativeEmbed } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
import { Map } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/Map&1.0.0";
import { NodeRenderType } from "@ohos:arkui.node";
import type { NativeEmbedBuilderOptions } from './types';
interface MapBuilderOptions extends NativeEmbedBuilderOptions {
    longitude: number;
    latitude: number;
    zoom: number;
}
function MapBuilder(options: MapBuilderOptions, parent = null) {
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
                let componentCall = new Map(parent ? parent : this, options, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/MapBuilder.ets", line: 14, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return options;
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "Map" });
    }
    __Common__.pop();
}
defineNativeEmbed('map', {
    builder: MapBuilder,
    controller: null,
    nodeRenderType: NodeRenderType.RENDER_TYPE_TEXTURE
});
