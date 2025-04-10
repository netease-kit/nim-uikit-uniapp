import harmonyWebView from '@ohos.web.webview';
interface Detail {
}
interface Event {
    detail: Detail;
}
interface TitleUpdateEventDetail {
    title?: string;
}
interface TitleUpdateEvent extends Event {
    detail: TitleUpdateEventDetail;
}
@Component
export declare struct WebView {
    @Prop
    src: string;
    onMessage?: (event: Event) => void;
    onTitleUpdate?: (event: TitleUpdateEvent) => void;
    onPostMessageToService?: (event: Event) => void;
    controller?: harmonyWebView.WebviewController;
    build(): void;
    setSrc(): void;
}
export {};
