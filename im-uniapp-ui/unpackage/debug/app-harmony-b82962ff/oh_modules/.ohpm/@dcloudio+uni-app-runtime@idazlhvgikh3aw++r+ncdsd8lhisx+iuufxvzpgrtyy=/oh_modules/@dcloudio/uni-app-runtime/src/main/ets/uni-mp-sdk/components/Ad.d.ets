import { advertising } from '@kit.AdsKit';
interface Detail {
    errCode?: number;
    errMsg?: string;
}
export interface CustomEvent {
    detail: Detail;
}
@Component
export declare struct Ad {
    @Prop
    adpid?: string;
    @Prop
    oaid?: string;
    onLoad?: (detail?: CustomEvent) => void;
    onClose?: (detail?: CustomEvent) => void;
    onError?: (detail?: CustomEvent) => void;
    onResize?: (detail?: CustomEvent) => void;
    onAdOpen?: (detail?: CustomEvent) => void;
    onAdClick?: (detail?: CustomEvent) => void;
    @State
    ads: Array<advertising.Advertisement>;
    @State
    adDisplayOptions: advertising.AdDisplayOptions;
    @State
    adVisibilityState: Visibility;
    private adid;
    aboutToAppear(): void;
    build(): void;
    private loadAdData;
}
export declare function setAdServer(getFeedAdData: ((adpid: string) => Promise<Object>) | null): void;
export {};
