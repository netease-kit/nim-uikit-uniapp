if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MultiSelectorPicker_Params {
    range?: TextCascadePickerRangeContent[];
    value?: string[];
    selected?: number[];
    currentValue?: string | string[];
    currentIndex?: number | number[];
    controller?: CustomDialogController;
    onChange?: (value: string | string[], index: number | number[]) => void;
    onAccept?: (value: TextPickerResult) => void;
    onCancel?: () => void;
    onDidDisappear?: () => void;
}
interface Picker_Params {
    controller?: PickerController;
    mode?: 'selector' | 'multiSelector' | 'time' | 'date';
    range?: Range;
    realRange?: TextCascadePickerRangeContent[];
    value?: string | number | number[];
    rangeKey?: string;
    start?: string;
    end?: string;
    fields?: 'year' | 'month' | 'day';
    disabled?: boolean;
    lastValue?: number[];
    changeOrCancel?: boolean;
    onCancel?: (detail?: CustomEvent) => void;
    onChange?: (detail?: CustomEvent) => void;
    onColumnchange?: (detail?: CustomEvent) => void;
}
import { ObservedArray } from "@normalized:N&&&@dcloudio/uni-mp-sdk/utils/index&1.0.0";
import { nativePagesManager } from "@normalized:N&&&@dcloudio/uni-mp-sdk/sdk&1.0.0";
interface Detail {
    column?: number;
    value?: string | number | number[];
}
interface CustomEvent {
    detail: Detail;
}
type Range = string[] | string[][] | object[] | object[][];
// #region MultiSelectorPicker
interface MultiSelectorPickerEvent {
    onChange?: (value: string | string[], index: number | number[]) => void;
    onAccept?: (value: TextPickerResult) => void;
    onCancel?: () => void;
    onDidDisappear?: () => void;
}
@Observed
class MultiSelectorPickerState {
    value: string[] = new ObservedArray<string>();
    selected: number[] = new ObservedArray<number>();
    range: TextCascadePickerRangeContent[] = new ObservedArray<TextCascadePickerRangeContent>();
}
@Observed
export class ObservedTextCascadePickerRangeContent implements TextCascadePickerRangeContent {
    text: string;
    children: TextCascadePickerRangeContent[];
    constructor(text: string = '') {
        this.text = text;
        this.children = new ObservedArray<TextCascadePickerRangeContent>();
    }
}
let multiSelectorPickerDialogController: CustomDialogController | null = null;
const multiSelectorPickerState = new MultiSelectorPickerState();
function initControllerOnce(event: MultiSelectorPickerEvent): CustomDialogController {
    if (multiSelectorPickerDialogController) {
        return multiSelectorPickerDialogController;
    }
    multiSelectorPickerDialogController = new CustomDialogController({
        builder: () => {
            let jsDialog = new MultiSelectorPicker(this, {
                range: multiSelectorPickerState.range,
                value: multiSelectorPickerState.value,
                selected: multiSelectorPickerState.selected,
                controller: multiSelectorPickerDialogController!,
                onChange: event.onChange,
                onAccept: event.onAccept,
                onCancel: event.onCancel,
                onDidDisappear: event.onDidDisappear
            }, undefined, -1, () => { }, { page: "oh_modules/.ohpm/@dcloudio+uni-app-runtime@idazlhvgikh3aw++r+ncdsd8lhisx+iuufxvzpgrtyy=/oh_modules/@dcloudio/uni-app-runtime/src/main/ets/uni-mp-sdk/components/Picker.ets", line: 50, col: 14 });
            jsDialog.setController(multiSelectorPickerDialogController);
            ViewPU.create(jsDialog);
            let paramsLambda = () => {
                return {
                    range: multiSelectorPickerState.range,
                    value: multiSelectorPickerState.value,
                    selected: multiSelectorPickerState.selected,
                    controller: multiSelectorPickerDialogController!,
                    onChange: event.onChange,
                    onAccept: event.onAccept,
                    onCancel: event.onCancel,
                    onDidDisappear: event.onDidDisappear
                };
            };
            jsDialog.paramsGenerator_ = paramsLambda;
        },
        alignment: DialogAlignment.Center,
        backgroundColor: '#FFFFFF',
        cancel: event.onDidDisappear
    }, this);
    return multiSelectorPickerDialogController;
}
class CustomMultiSelectorPickerDialog {
    open(page: object, event: MultiSelectorPickerEvent = {}) {
        initControllerOnce.bind(page)(event).open();
    }
    createObservedRange(range: string[][], selected: number[], children: TextCascadePickerRangeContent[], index: number = 0) {
        const len = range.length - 1;
        const selectedIndex = selected[index];
        range[index].forEach((item, index) => {
            children.splice(index, 1, new ObservedTextCascadePickerRangeContent(item));
        });
        if (index !== len && index <= len && children[selectedIndex].children) {
            this.createObservedRange(range, selected, children[selectedIndex].children!, index + 1);
        }
    }
}
const customMultiSelectorPickerDialog = new CustomMultiSelectorPickerDialog();
// #endregion
export class PickerController {
    private instance?: Picker;
    init(instance?: Picker) {
        this.instance = instance;
    }
    show(): void {
        this.instance?.show();
    }
    updateRange(range: Range): void {
        this.instance?.setMultiSelectorRange(range);
    }
}
interface ICustomTextCascadePickerRangeContent extends TextCascadePickerRangeContent {
    value: number | string;
    children: ICustomTextCascadePickerRangeContent[];
}
export class Picker extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.__mode = new SynchedPropertySimpleOneWayPU(params.mode, this, "mode");
        this.__range = new SynchedPropertyObjectOneWayPU(params.range, this, "range");
        this.__realRange = new SynchedPropertyObjectOneWayPU(params.realRange, this, "realRange");
        this.__value = new SynchedPropertyObjectOneWayPU(params.value, this, "value");
        this.__rangeKey = new SynchedPropertySimpleOneWayPU(params.rangeKey, this, "rangeKey");
        this.__start = new SynchedPropertySimpleOneWayPU(params.start, this, "start");
        this.__end = new SynchedPropertySimpleOneWayPU(params.end, this, "end");
        this.__fields = new SynchedPropertySimpleOneWayPU(params.fields, this, "fields");
        this.__disabled = new SynchedPropertySimpleOneWayPU(params.disabled, this, "disabled");
        this.__lastValue = new ObservedPropertyObjectPU([], this, "lastValue");
        this.__changeOrCancel = new SynchedPropertySimpleOneWayPU(params.changeOrCancel, this, "changeOrCancel");
        this.onCancel = undefined;
        this.onChange = undefined;
        this.onColumnchange = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Picker_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.mode === undefined) {
            this.__mode.set('selector');
        }
        if (params.realRange === undefined) {
            this.__realRange.set([]);
        }
        if (params.rangeKey === undefined) {
            this.__rangeKey.set('');
        }
        if (params.start === undefined) {
            this.__start.set('');
        }
        if (params.end === undefined) {
            this.__end.set('');
        }
        if (params.fields === undefined) {
            this.__fields.set('day');
        }
        if (params.disabled === undefined) {
            this.__disabled.set(false);
        }
        if (params.lastValue !== undefined) {
            this.lastValue = params.lastValue;
        }
        if (params.changeOrCancel === undefined) {
            this.__changeOrCancel.set(false);
        }
        if (params.onCancel !== undefined) {
            this.onCancel = params.onCancel;
        }
        if (params.onChange !== undefined) {
            this.onChange = params.onChange;
        }
        if (params.onColumnchange !== undefined) {
            this.onColumnchange = params.onColumnchange;
        }
    }
    updateStateVars(params: Picker_Params) {
        this.__mode.reset(params.mode);
        this.__range.reset(params.range);
        this.__realRange.reset(params.realRange);
        this.__value.reset(params.value);
        this.__rangeKey.reset(params.rangeKey);
        this.__start.reset(params.start);
        this.__end.reset(params.end);
        this.__fields.reset(params.fields);
        this.__disabled.reset(params.disabled);
        this.__changeOrCancel.reset(params.changeOrCancel);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__mode.purgeDependencyOnElmtId(rmElmtId);
        this.__range.purgeDependencyOnElmtId(rmElmtId);
        this.__realRange.purgeDependencyOnElmtId(rmElmtId);
        this.__value.purgeDependencyOnElmtId(rmElmtId);
        this.__rangeKey.purgeDependencyOnElmtId(rmElmtId);
        this.__start.purgeDependencyOnElmtId(rmElmtId);
        this.__end.purgeDependencyOnElmtId(rmElmtId);
        this.__fields.purgeDependencyOnElmtId(rmElmtId);
        this.__disabled.purgeDependencyOnElmtId(rmElmtId);
        this.__lastValue.purgeDependencyOnElmtId(rmElmtId);
        this.__changeOrCancel.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__mode.aboutToBeDeleted();
        this.__range.aboutToBeDeleted();
        this.__realRange.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__rangeKey.aboutToBeDeleted();
        this.__start.aboutToBeDeleted();
        this.__end.aboutToBeDeleted();
        this.__fields.aboutToBeDeleted();
        this.__disabled.aboutToBeDeleted();
        this.__lastValue.aboutToBeDeleted();
        this.__changeOrCancel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller?: PickerController;
    private __mode?: SynchedPropertySimpleOneWayPU<'selector' | 'multiSelector' | 'time' | 'date'>;
    get mode() {
        return this.__mode.get();
    }
    set mode(newValue: 'selector' | 'multiSelector' | 'time' | 'date') {
        this.__mode.set(newValue);
    }
    private __range?: SynchedPropertySimpleOneWayPU<Range>;
    get range() {
        return this.__range.get();
    }
    set range(newValue: Range) {
        this.__range.set(newValue);
    }
    private __realRange: SynchedPropertySimpleOneWayPU<TextCascadePickerRangeContent[]>;
    get realRange() {
        return this.__realRange.get();
    }
    set realRange(newValue: TextCascadePickerRangeContent[]) {
        this.__realRange.set(newValue);
    }
    private __value?: SynchedPropertySimpleOneWayPU<string | number | number[]>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string | number | number[]) {
        this.__value.set(newValue);
    }
    private __rangeKey?: SynchedPropertySimpleOneWayPU<string>;
    get rangeKey() {
        return this.__rangeKey.get();
    }
    set rangeKey(newValue: string) {
        this.__rangeKey.set(newValue);
    }
    private __start?: SynchedPropertySimpleOneWayPU<string>;
    get start() {
        return this.__start.get();
    }
    set start(newValue: string) {
        this.__start.set(newValue);
    }
    private __end?: SynchedPropertySimpleOneWayPU<string>;
    get end() {
        return this.__end.get();
    }
    set end(newValue: string) {
        this.__end.set(newValue);
    }
    private __fields?: SynchedPropertySimpleOneWayPU<'year' | 'month' | 'day'>;
    get fields() {
        return this.__fields.get();
    }
    set fields(newValue: 'year' | 'month' | 'day') {
        this.__fields.set(newValue);
    }
    private __disabled?: SynchedPropertySimpleOneWayPU<boolean>;
    get disabled() {
        return this.__disabled.get();
    }
    set disabled(newValue: boolean) {
        this.__disabled.set(newValue);
    }
    private __lastValue: ObservedPropertyObjectPU<number[]>;
    get lastValue() {
        return this.__lastValue.get();
    }
    set lastValue(newValue: number[]) {
        this.__lastValue.set(newValue);
    }
    private __changeOrCancel: SynchedPropertySimpleOneWayPU<boolean>;
    get changeOrCancel() {
        return this.__changeOrCancel.get();
    }
    set changeOrCancel(newValue: boolean) {
        this.__changeOrCancel.set(newValue);
    }
    private onCancel?: (detail?: CustomEvent) => void;
    private onChange?: (detail?: CustomEvent) => void;
    private onColumnchange?: (detail?: CustomEvent) => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.onClick(() => {
                this.show();
            });
        }, Stack);
        Stack.pop();
    }
    aboutToAppear(): void {
        this.controller?.init(this);
    }
    aboutToDisappear(): void {
        multiSelectorPickerDialogController = null;
    }
    setMultiSelectorRange(range: Range): void {
        this.range = range;
        const realRange = this.getPickerShowRange() as string[][];
        const realValue = this.getPickerShowValue(realRange) as string[];
        customMultiSelectorPickerDialog.createObservedRange(realRange, this.value as number[], multiSelectorPickerState.range);
        realValue.forEach((v, i) => multiSelectorPickerState.value.splice(i, 1, v));
        (this.value as number[]).forEach((v, i) => multiSelectorPickerState.selected.splice(i, 1, v));
    }
    getPickerShowRange(): string[] | string[][] {
        if (this.mode === 'multiSelector') {
            return (this.range as (string | object)[][]).map(column => {
                return column.map(item => {
                    if (this.rangeKey) {
                        return (item as object)[this.rangeKey] as string;
                    }
                    return item + '' as string;
                });
            });
        }
        else {
            return (this.range as (string | object)[]).map(item => {
                if (this.rangeKey) {
                    return (item as object)[this.rangeKey] as string;
                }
                return item + '' as string;
            });
        }
    }
    getPickerShowValue(realRange: string[] | string[][]): string | string[] | undefined {
        if (!this.value) {
            return;
        }
        switch (this.mode) {
            case 'multiSelector':
                return (realRange as string[][]).map((column, index) => {
                    return column[(this.value as number[])[index]];
                });
            case 'selector':
            default:
                return (realRange as string[])[this.value as number];
        }
    }
    show() {
        if (this.disabled) {
            return;
        }
        this.changeOrCancel = false;
        const onChange = (value: string | number | number[]) => {
            this.changeOrCancel = true;
            this.onChange?.({
                detail: {
                    value
                }
            });
        };
        const onCancel = () => {
            this.changeOrCancel = true;
            this.onCancel?.({
                detail: {}
            });
        };
        const onDidDisappear = () => {
            if (!this.changeOrCancel) {
                this.onCancel?.({
                    detail: {}
                });
            }
        };
        if (this.mode === 'date') {
            // TODO 国际化
            if (this.fields === 'year') {
                const currentYear = new Date().getFullYear();
                const startYear = this.start ? new Date(this.start).getFullYear() : currentYear - 150;
                const endYear = this.end ? new Date(this.end).getFullYear() : currentYear + 150;
                const range: string[] = [];
                for (let i = startYear; i <= endYear; i++) {
                    range.push(i.toString());
                }
                this.getUIContext().showTextPickerDialog({
                    range: range.map(item => item + '年'),
                    value: (this.value as string || currentYear) + '年',
                    canLoop: false,
                    onAccept: (e) => {
                        onChange(range[e.index as number]);
                    },
                    onCancel,
                    onDidDisappear
                });
                return;
            }
            if (this.fields === 'month') {
                const currentDate = new Date();
                const startDate = this.start ? new Date(this.start) : new Date((currentDate.getFullYear() - 150) + '-01');
                const endDate = this.end ? new Date(this.end) : new Date((currentDate.getFullYear() + 150) + '-12');
                const startDateYear = startDate.getFullYear();
                const startDateMonth = startDate.getMonth() + 1;
                const endDateYear = endDate.getFullYear();
                const endDateMonth = endDate.getMonth() + 1;
                const realRange: ICustomTextCascadePickerRangeContent[] = [];
                const tempValue: number[] = (this.value ? (this.value as string).split('-').map(item => parseInt(item)) :
                    [currentDate.getFullYear(), currentDate.getMonth() + 1]);
                const selected = [0, 0];
                for (let y = startDateYear; y <= endDateYear; y++) {
                    const rangeItem = {
                        text: y + '年',
                        value: y,
                        children: [] as ICustomTextCascadePickerRangeContent[]
                    } as ICustomTextCascadePickerRangeContent;
                    if (y === tempValue[0]) {
                        selected[0] = y - startDateYear;
                    }
                    let startMonth = 0;
                    for (let m = 1; m <= 12; m++) {
                        if (y === startDateYear && m < startDateMonth) {
                            continue;
                        }
                        if (y === endDateYear && m > endDateMonth) {
                            break;
                        }
                        if (startMonth === 0) {
                            startMonth = m;
                        }
                        if (y === tempValue[0] && m === tempValue[1]) {
                            selected[1] = m - startMonth;
                        }
                        rangeItem.children!.push({
                            text: ('' + m).padStart(2, '0') + '月',
                            value: m,
                            children: []
                        } as ICustomTextCascadePickerRangeContent);
                    }
                    realRange.push(rangeItem);
                }
                this.getUIContext().showTextPickerDialog({
                    range: realRange,
                    selected,
                    canLoop: false,
                    onAccept: (e) => {
                        const index = e.index as number[];
                        const yearIndex = index[0];
                        const monthIndex = index[1];
                        const yearRangeItem = realRange[yearIndex];
                        const year = yearRangeItem.value;
                        const month = yearRangeItem.children![monthIndex]?.value || 1;
                        onChange(year + '-' + ('' + month).padStart(2, '0'));
                    },
                    onCancel,
                    onDidDisappear
                });
                return;
            }
            this.getUIContext().showDatePickerDialog({
                showTime: false,
                selected: new Date(this.value as string),
                start: new Date(this.start),
                end: new Date(this.end),
                onDateAccept: (e: Date) => {
                    onChange(e.getFullYear().toString().padStart(2, '0') + '-' + (e.getMonth() + 1).toString().padStart(2, '0') + '-' +
                        e.getDate().toString().padStart(2, '0'));
                },
                onCancel,
                onDidDisappear
            });
            return;
        }
        if (this.mode === 'time') {
            const selected = new Date();
            if (typeof this.value === 'string' && this.value.includes(':')) {
                const splitValue = this.value.split(':');
                selected.setHours(parseInt(splitValue[0]));
                selected.setMinutes(parseInt(splitValue[1]));
            }
            this.getUIContext().showTimePickerDialog({
                useMilitaryTime: true,
                selected,
                format: TimePickerFormat.HOUR_MINUTE,
                onAccept: (e: TimePickerResult) => {
                    onChange(e.hour.toString().padStart(2, '0') + ':' + e.minute.toString().padStart(2, '0'));
                },
                onCancel,
                onDidDisappear
            });
            return;
        }
        const pickerEvents: TextPickerDialogOptions = {
            range: [],
            onAccept: (e: TextPickerResult) => {
                onChange(e.index);
            },
            onCancel,
            onDidDisappear
        };
        if (this.mode === 'multiSelector') {
            this.lastValue = (this.value || []) as number[];
            this.setMultiSelectorRange(this.range!);
            customMultiSelectorPickerDialog.open(nativePagesManager.pages[nativePagesManager.pages.length - 1], {
                onChange: (value: string[], currentValue: number[]) => {
                    this.value = currentValue;
                    let changedColumn = 0;
                    let changedValue: number = 0;
                    for (let i = 0; i < currentValue.length; i++) {
                        if (this.lastValue[i] !== currentValue[i]) {
                            changedColumn = i;
                            changedValue = currentValue[i];
                            break;
                        }
                    }
                    this.onColumnchange?.({
                        detail: {
                            column: changedColumn,
                            value: changedValue
                        }
                    });
                    this.lastValue = currentValue;
                },
                onAccept: pickerEvents.onAccept,
                onCancel: pickerEvents.onCancel,
                onDidDisappear: pickerEvents.onDidDisappear
            } as MultiSelectorPickerEvent);
        }
        else {
            const realRange = this.getPickerShowRange();
            const realValue = this.getPickerShowValue(realRange);
            this.getUIContext().showTextPickerDialog({
                range: realRange,
                value: realValue,
                canLoop: false,
                onAccept: pickerEvents.onAccept,
                onCancel: pickerEvents.onCancel,
                onDidDisappear: pickerEvents.onDidDisappear
            });
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class MultiSelectorPicker extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__range = new SynchedPropertyObjectOneWayPU(params.range, this, "range");
        this.__value = new SynchedPropertyObjectOneWayPU(params.value, this, "value");
        this.__selected = new SynchedPropertyObjectOneWayPU(params.selected, this, "selected");
        this.currentValue = [];
        this.currentIndex = [];
        this.controller = undefined;
        this.onChange = () => {
        };
        this.onAccept = () => {
        };
        this.onCancel = () => {
        };
        this.onDidDisappear = () => {
        };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MultiSelectorPicker_Params) {
        if (params.currentValue !== undefined) {
            this.currentValue = params.currentValue;
        }
        if (params.currentIndex !== undefined) {
            this.currentIndex = params.currentIndex;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onChange !== undefined) {
            this.onChange = params.onChange;
        }
        if (params.onAccept !== undefined) {
            this.onAccept = params.onAccept;
        }
        if (params.onCancel !== undefined) {
            this.onCancel = params.onCancel;
        }
        if (params.onDidDisappear !== undefined) {
            this.onDidDisappear = params.onDidDisappear;
        }
    }
    updateStateVars(params: MultiSelectorPicker_Params) {
        this.__range.reset(params.range);
        this.__value.reset(params.value);
        this.__selected.reset(params.selected);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__range.purgeDependencyOnElmtId(rmElmtId);
        this.__value.purgeDependencyOnElmtId(rmElmtId);
        this.__selected.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__range.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__selected.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __range: SynchedPropertySimpleOneWayPU<TextCascadePickerRangeContent[]>;
    get range() {
        return this.__range.get();
    }
    set range(newValue: TextCascadePickerRangeContent[]) {
        this.__range.set(newValue);
    }
    private __value: SynchedPropertySimpleOneWayPU<string[]>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string[]) {
        this.__value.set(newValue);
    }
    private __selected: SynchedPropertySimpleOneWayPU<number[]>;
    get selected() {
        return this.__selected.get();
    }
    set selected(newValue: number[]) {
        this.__selected.set(newValue);
    }
    private currentValue: string | string[];
    private currentIndex: number | number[];
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private onChange?: (value: string | string[], index: number | number[]) => void;
    private onAccept?: (value: TextPickerResult) => void;
    private onCancel?: () => void;
    private onDidDisappear?: () => void;
    // TODO 国际化、暗黑模式
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.backgroundColor(Color.Transparent);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextPicker.create({ range: multiSelectorPickerState.range, /*value: this.value*/ selected: this.selected });
            TextPicker.onChange((value: string | string[], index: number | number[]) => {
                this.currentValue = value;
                this.currentIndex = index;
                this.onChange?.(value, index);
            });
            TextPicker.canLoop(false);
        }, TextPicker);
        TextPicker.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Flex.create({ alignItems: ItemAlign.Center, justifyContent: FlexAlign.SpaceAround });
            Flex.padding(15);
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.flexGrow(1);
            Button.buttonStyle(ButtonStyleMode.TEXTUAL);
            Button.onClick(() => {
                this.onCancel?.();
                this.controller.close();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.vertical(true);
            Divider.height(26);
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('确认');
            Button.flexGrow(1);
            Button.buttonStyle(ButtonStyleMode.TEXTUAL);
            Button.onClick(() => {
                this.onAccept?.({ value: this.currentValue, index: this.currentIndex });
                this.controller.close();
            });
        }, Button);
        Button.pop();
        Flex.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
