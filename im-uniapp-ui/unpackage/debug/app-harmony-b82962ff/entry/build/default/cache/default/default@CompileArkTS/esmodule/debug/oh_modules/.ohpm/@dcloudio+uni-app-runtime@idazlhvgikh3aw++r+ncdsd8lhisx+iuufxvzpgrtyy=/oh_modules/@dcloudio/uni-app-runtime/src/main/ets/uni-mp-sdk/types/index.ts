import type { NodeRenderType } from "@ohos:arkui.node";
export * from "@normalized:N&&&@dcloudio/uni-mp-sdk/types/mp&1.0.0";
export interface NativeEmbedBuilderOptions {
    controller?: object;
    width: number;
    height: number;
    x: number;
    y: number;
    visibility: Visibility;
    on?: Object;
}
export interface DefineNativeEmbedOptions {
    builder: (...args: Object[]) => void;
    controller?: object;
    nodeRenderType: NodeRenderType;
}
