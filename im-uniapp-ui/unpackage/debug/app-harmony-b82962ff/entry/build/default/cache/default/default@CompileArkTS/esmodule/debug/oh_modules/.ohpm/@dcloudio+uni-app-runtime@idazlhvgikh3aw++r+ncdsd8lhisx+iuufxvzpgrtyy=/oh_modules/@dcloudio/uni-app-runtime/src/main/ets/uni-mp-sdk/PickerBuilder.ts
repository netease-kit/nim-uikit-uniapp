import { defineNativeEmbed } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
import { Picker, PickerController } from "@normalized:N&&&@dcloudio/uni-mp-sdk/components/Picker&1.0.0";
import { NodeRenderType } from "@ohos:arkui.node";
import type { NativeEmbedBuilderOptions } from './types';
interface On {
    cancel?: () => void;
    change?: () => void;
    columnchange?: () => void;
}
interface PickerBuilderOptions extends NativeEmbedBuilderOptions {
    controller: PickerController;
    range: string[] | string[][];
    value: string | number | number[];
    rangeKey?: string;
    start?: string;
    end?: string;
    fields?: 'year' | 'month' | 'day';
    disabled?: boolean;
    mode?: 'selector' | 'multiSelector' | 'time' | 'date';
    click: number;
    on?: On;
}
function PickerBuilder(options: PickerBuilderOptions, parent = null) {
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
                let componentCall = new Picker(parent ? parent : this, {
                    controller: options.controller,
                    range: options.range,
                    value: options.value,
                    rangeKey: options.rangeKey,
                    start: options.start,
                    end: options.end,
                    fields: options.fields,
                    disabled: options.disabled,
                    mode: options.mode,
                    onCancel: options.on?.cancel,
                    onChange: options.on?.change,
                    onColumnchange: options.on?.columnchange
                }, undefined, elmtId, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/PickerBuilder.ets", line: 28, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {
                        controller: options.controller,
                        range: options.range,
                        value: options.value,
                        rangeKey: options.rangeKey,
                        start: options.start,
                        end: options.end,
                        fields: options.fields,
                        disabled: options.disabled,
                        mode: options.mode,
                        onCancel: options.on?.cancel,
                        onChange: options.on?.change,
                        onColumnchange: options.on?.columnchange
                    };
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                    range: options.range,
                    value: options.value,
                    rangeKey: options.rangeKey,
                    start: options.start,
                    end: options.end,
                    fields: options.fields,
                    disabled: options.disabled,
                    mode: options.mode
                });
            }
        }, { name: "Picker" });
    }
    __Common__.pop();
}
defineNativeEmbed('picker', {
    builder: PickerBuilder,
    controller: PickerController,
    nodeRenderType: NodeRenderType.RENDER_TYPE_TEXTURE
});
