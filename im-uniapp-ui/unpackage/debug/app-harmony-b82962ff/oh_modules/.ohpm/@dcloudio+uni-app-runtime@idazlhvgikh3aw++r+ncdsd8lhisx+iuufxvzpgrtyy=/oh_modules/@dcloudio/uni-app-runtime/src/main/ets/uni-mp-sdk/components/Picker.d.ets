interface Detail {
    column?: number;
    value?: string | number | number[];
}
interface CustomEvent {
    detail: Detail;
}
type Range = string[] | string[][] | object[] | object[][];
@Observed
export declare class ObservedTextCascadePickerRangeContent implements TextCascadePickerRangeContent {
    text: string;
    children: TextCascadePickerRangeContent[];
    constructor(text?: string);
}
export declare class PickerController {
    private instance?;
    init(instance?: Picker): void;
    show(): void;
    updateRange(range: Range): void;
}
@Component
export declare struct Picker {
    controller?: PickerController;
    @Prop
    mode?: 'selector' | 'multiSelector' | 'time' | 'date';
    @Prop
    range?: Range;
    @Prop
    realRange: TextCascadePickerRangeContent[];
    @Prop
    value?: string | number | number[];
    @Prop
    rangeKey?: string;
    @Prop
    start?: string;
    @Prop
    end?: string;
    @Prop
    fields?: 'year' | 'month' | 'day';
    @Prop
    disabled?: boolean;
    @State
    lastValue: number[];
    @Prop
    changeOrCancel: boolean;
    onCancel?: (detail?: CustomEvent) => void;
    onChange?: (detail?: CustomEvent) => void;
    onColumnchange?: (detail?: CustomEvent) => void;
    build(): void;
    aboutToAppear(): void;
    aboutToDisappear(): void;
    setMultiSelectorRange(range: Range): void;
    getPickerShowRange(): string[] | string[][];
    getPickerShowValue(realRange: string[] | string[][]): string | string[] | undefined;
    show(): void;
}
@CustomDialog
export declare struct MultiSelectorPicker {
    @Prop
    range: TextCascadePickerRangeContent[];
    @Prop
    value: string[];
    @Prop
    selected: number[];
    currentValue: string | string[];
    currentIndex: number | number[];
    controller: CustomDialogController;
    onChange?: (value: string | string[], index: number | number[]) => void;
    onAccept?: (value: TextPickerResult) => void;
    onCancel?: () => void;
    onDidDisappear?: () => void;
    build(): void;
}
export {};
