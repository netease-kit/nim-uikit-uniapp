export interface IUniError {
    errSubject: string;
    errCode: number;
    errMsg?: string;
    cause?: Error;
    data?: ESObject;
}
export declare class UniError extends Error implements IUniError {
    errSubject: string;
    errCode: number;
    errMsg?: string;
    cause?: Error;
    data?: ESObject;
    constructor(errSubject?: string, errCode?: number | Record<string, ESObject>, errMsg?: string);
    toString(): string;
    toJSON(): Record<string, ESObject>;
}
export declare namespace HBuilderX {
}
export declare namespace string {
    type ImageURIString = string;
    type VideoURIString = string;
    type URIString = string;
    type WebviewIdString = string;
    type IDString = string;
    type ColorString = string;
    type PageURIString = string;
}
export interface ComponentPublicInstance {
}
export interface ComponentInternalInstance {
}
export interface SourceError {
}
