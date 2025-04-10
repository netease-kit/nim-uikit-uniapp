export interface ICapsuleStyle {
    backgroundColor?: string;
    textColor?: string;
    highlightColor?: string;
    borderColor?: string;
}
export interface ICapsuleMenuActionSheetItem {
    id: string;
    title: string;
}
export interface IOpenUniMPConfig {
    showCapsuleButton?: boolean;
    capsuleMenuActionSheetItems?: ICapsuleMenuActionSheetItem[];
    capsuleButtonStyle?: ICapsuleStyle;
    redirectPath?: string;
    /**
     * @deprecated
     */
    arguments?: Object | string;
    extraData?: Object;
}
export interface IUniMP {
    hide(): void;
    show(): void;
    close(): void;
    isRunning(): boolean;
    sendUniMPEvent: (event: string, data: ESObject) => void;
    on(event: 'uniMPEvent', callback: (event: string, data: ESObject, notify: (...args: ESObject[]) => void) => void): void;
    on(event: 'menuItemClick', callback: (id: string) => void): void;
    on(event: 'close' | 'show' | 'hide', callback: () => void): void;
    off(name: string, callback: Function): void;
}
interface IUniMPUserAgent {
    fullUserAgent: string;
}
export interface IInternalUniMP extends IUniMP {
    id: string;
    userAgent: IUniMPUserAgent;
    on(event: 'uniMPEvent', callback: (event: string, data: ESObject, notify: (...args: ESObject[]) => void) => void): void;
    on(event: 'menuItemClick', callback: (id: string) => void): void;
    on(event: 'close' | 'show' | 'hide', callback: () => void): void;
    on(event: 'beforeClose', callback: Function): void;
}
export declare abstract class UniMP implements IUniMP {
    abstract router: NavPathStack;
    abstract showCapsuleButton: boolean;
    abstract capsuleMenuActionSheetItems: ICapsuleMenuActionSheetItem[];
    abstract capsuleButtonStyle: ICapsuleStyle;
    abstract capsuleMenuButtonClick: () => void;
    abstract capsuleCloseButtonClick: () => void;
    hide(): void;
    show(): void;
    close(): void;
    abstract isRunning: () => boolean;
    abstract sendUniMPEvent: (event: string, data: ESObject) => void;
    abstract on(event: 'uniMPEvent', callback: (event: string, data: ESObject, notify: (...args: ESObject[]) => void) => void): void;
    abstract on(event: 'menuItemClick', callback: (id: string) => void): void;
    abstract on(event: 'close' | 'show' | 'hide', callback: () => void): void;
    abstract off(name: string, callback: Function): void;
    abstract emit(name: string, ...args: Object[]): void;
}
export interface IInitConfig {
    debug?: boolean;
}
export type ReleaseWgtToRunPathCallback = (code: 1 | -1, error?: Error) => void;
export interface IAppVersionInfo {
    name: string;
    code: string;
}
export {};
