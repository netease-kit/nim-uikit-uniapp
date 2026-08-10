import { V2NIMMessageForUI } from "./types";
import type { V2NIMMessage, V2NIMSendMessageResult } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMMessageService";
type SendMessageResultWithAntispamReason = V2NIMSendMessageResult & {
    antispamReason?: unknown;
};
export declare const normalizeAntispamReason: (reason: unknown) => string | undefined;
export declare const withSendResultAntispamReason: <T extends V2NIMMessage>(message: T, result: Partial<SendMessageResultWithAntispamReason> | undefined) => T & {
    antispamReason?: string;
};
export declare const logDebug: ({ appName, needStringify, }?: {
    level?: string;
    appName?: string;
    version?: string;
    needStringify?: boolean;
}) => {
    log: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    trace: (...args: any[]) => void;
    setLevel: (_level: any) => void;
};
export interface IEventTracking {
    appKey: string;
    version: string;
    component: string;
    platform?: string;
    nertcVersion?: string;
    imVersion?: string;
    channel?: string;
    os?: string;
    framework?: string;
    language?: string;
    container?: string;
}
export declare class EventTracking {
    appKey: string;
    version: string;
    component: string;
    platform: string;
    nertcVersion?: string;
    imVersion?: string;
    channel?: string;
    os?: string;
    framework?: string;
    language?: string;
    container?: string;
    constructor({ appKey, version, component, nertcVersion, imVersion, os, framework, language, container, platform, channel, }: IEventTracking);
    track(reportType: string, data: any): Promise<void>;
}
export declare const logger: {
    log: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn: (...args: any[]) => void;
    error: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    trace: (...args: any[]) => void;
    setLevel: (_level: any) => void;
};
export declare const frequencyControl: <P extends string, R extends {
    accountId: string;
}>(fn: (params: P[]) => Promise<R[]>, delay: number, limit: number) => (params: P) => Promise<R>;
/**
 * 过滤消息，处理了撤回消息的过滤
 */
export declare const getFilterMsgs: (msgs: V2NIMMessageForUI[], filterFn?: (msg: V2NIMMessageForUI, index?: number) => boolean) => V2NIMMessageForUI[];
export declare const batchRequest: <P>(fn: (params: P[], ...args: any) => Promise<void>, max: number) => (params: P[]) => Promise<void>;
export declare function detectLanguage(): "Vue2" | "Vue3" | "React";
export declare function detectContainer(platform: string): any;
export {};
