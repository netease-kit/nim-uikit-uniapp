@CustomDialog
export declare struct ImagePreviewer {
    @Prop
    urls: string[];
    @Prop
    state: PreviewImageState;
    controller: CustomDialogController;
    build(): void;
}
interface IPreviewImageState {
    currentIndex: number;
    showmenu: boolean;
}
@Observed
declare class PreviewImageState {
    currentIndex: number;
    showmenu: boolean;
    constructor(options: IPreviewImageState);
}
interface IPreviewImageOptions {
    urls: string[];
    current?: string;
    showmenu?: boolean;
}
export declare function previewImage(options: IPreviewImageOptions, page: Object): void;
export declare function closePreviewImage(): void;
export {};
