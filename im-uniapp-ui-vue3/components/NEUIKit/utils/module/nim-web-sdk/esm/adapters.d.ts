import { UploadFileOptions } from './qchat/src/CloudStorageServiceInterface';
import { NIMEStrAnyObj } from './types';
export declare type ReporterHookCloudStorageUpdateTraceData = {
    user_id?: string;
    trace_id?: string;
    action?: number;
    state?: number;
    duration?: number;
    start_time?: number;
    offset?: number;
    full_size?: number;
    transferred_size?: number;
    operation_type?: number;
    remote_addr?: string;
    local_file?: string;
    retry_times?: number;
    index?: number;
    part_size?: number;
    transfer_latency?: number;
    http_code?: number;
    external_code?: number;
    exception?: string | object;
    req_headers?: string | object;
    rsp_headers?: string | object;
};
/**
 * 嵌套版本的 Partial。支持嵌套类行为父类型嵌套类型的一部分。比如 RecursivePartial<AdaptersInterface>，允许 net 为 Partial
 */
export declare type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};
/**
 * SDKType(HostEnv): https://docs.popo.netease.com/team/pc/MMC/pageDetail/4e0ea6fc8d37470eb5dc857c5c55d1c7
 */
export declare const enum HostEnvTypes {
    Unset = 0,
    RN = 2,
    UNIAPP = 3,
    FLUTTER = 4,
    Electron = 5,
    WeiXin = 6,
    BROWSER = 100,
    H5 = 101,
    Ali = 102,
    Baidu = 103,
    Tiktok = 104,
    OtherMiniProgram = 105,
    QQ = 106,
    JD = 107,
    KS = 108,
    APP = 110,
    NODEJS = 111
}
export declare type GetAdapterType = () => RecursivePartial<AdaptersInterface>;
export interface AdaptersInterface {
    getFileUploadInformation(options: UploadFileOptions): null | {
        uploadInfo: AdapterUploadFileResult;
        complete: boolean;
    };
    setLogger(logger: any): void;
    platform: string;
    WebSocket: typeof AdapterWebSocketWrapper;
    localStorage: AdapterStorage;
    request(url: string, params?: AdapterRequestParams, otherOptions?: {
        exception_service?: number;
    }): Promise<AdapterRequestResult>;
    uploadFile(options: AdapterUploadFileOptions): Promise<AdapterUploadFileResult>;
    getSystemInfo(): AdapterSystemInfo;
    /**
     * 环境相关的任意数据。
     * 第一次引入是为了在 RN 的 Adapters 中引入 AppState。
     *
     * AppState 从 'react-native' 中引入。它不能来自于 src 文件夹，否则会被其它环境的产物中按照 externals 的方式引入。
     * 其它环境在客户环境中最终打包时，因为缺少 'react-native' 会报错。
     *
     * 因此，这里在 Adaters 中添加一些环境相关的特殊数据
     */
    envPayload: NIMEStrAnyObj;
    net: AdapterNet;
    powerMonitor: {
        on: (event: string, fn: () => void) => void;
        off: (event: string, fn?: () => void) => void;
    } & AdapterPowerMonitor;
    logStorage: typeof AdapterLogStorageWrapper;
}
declare let AdapterLogStorageWrapper: {
    prototype: AdapterLogStorage;
    new (param: AdapterLogStorageConstructorParam): AdapterLogStorage;
};
export interface AdapterLogStorageConstructorParam {
    /**
     * 持久存储日志的标识名(数据库名/文件名). v10.9.60+ 支持.
     *
     * 默认为 nim_logs
     */
    logDirPath: string;
    /**
     * 日志存储天数. v10.9.60+ 支持
     *
     * 注: 仅浏览器与 uniapp 编 APP 环境支持. 单位天, 最小值 1, 最大值 30. 默认值 10 天.
     */
    logRetentionDays: number;
    /**
     * 日志存储大小. v10.9.60+ 支持
     *
     * 注: 仅在微信小程序环境与 uniapp 编 APP 环境里支持. 单位 MB, 最小值10, 最大 500MB. 默认值 200MB.
     */
    totalLogSizeInMB: number;
    /**
     * 单个文件存储大小. v10.9.60+ 支持
     *
     * 注: 仅在微信小程序环境与 uniapp 编 APP 环境里支持. 单位 MB, 最小值 1, 最大值 200MB. 默认值 10MB.
     */
    maxLogFileSizeInMB: number;
}
/**
 * 日志存储能力
 */
export interface AdapterLogStorage {
    /**
     * 打开: 打开文件 or 打开数据库
     * @param name 文件 or 数据库名
     */
    open(): Promise<void>;
    /**
     * 销毁: 关闭文件 or 关闭数据库
     */
    close(): void;
    /**
     * 存储日志
     * @param log 日志内容
     */
    addLogs(logs: AdapterLogStorageData[]): Promise<void>;
    /**
     * 提取日志.
     *
     * 1. 浏览器环境返回 File, 把日志组装为 File 内容返回.
     * 2. 小程序环境返回 filePath 作为临时上传路径.
     * 3. 返回 undefined 则代表没有提取到内容, 就不要上传.
     */
    extractLogs(): Promise<string | File | void>;
    /**
     * 日志上传完毕的钩子. (后续需要处理一些临时文件)
     */
    afterUpload(): Promise<void>;
}
export declare type AdapterLogStorageData = {
    iid: number;
    level: string;
    text: string;
    time: number;
};
/**
 * 网络能力
 */
export declare type AdapterNet = {
    /**
     * 获取数据上报用的 网络字段
     */
    getNetworkStatus: () => Promise<{
        net_type: NIMENetworkType;
        net_connect: boolean;
    }>;
    /**
     * 网络监听事件
     */
    onNetworkStatusChange: (fn: (res: NIMENetworkStatusEvent) => void) => void;
    /**
     * 取消网络监听
     */
    offNetworkStatusChange: () => void;
};
export declare const enum V2NIMPowerMonitorStatus {
    /**
     * 活动状态
     */
    V2NIM_POWER_MONITOR_STATUS_ACTIVE = 0,
    /**
     * 休眠状态
     */
    V2NIM_POWER_MONITOR_STATUS_SUSPEND = 1
}
/**
 * 电源监听能力，用于判断当前是否处于休眠状态
 */
export declare type AdapterPowerMonitor = {
    /**
     * 获取当前是否活跃
     */
    isActive: () => boolean;
    /**
     * 获取状态
     */
    getStatus: () => number;
    /**
     * 设置状态
     */
    setStatus: (status: V2NIMPowerMonitorStatus) => void;
    /**
     * 销毁
     */
    destroy: () => void;
};
/**
 * 网络监听事件的回调的回参
 */
export declare type NIMENetworkStatusEvent = {
    /**
     * 当前是否有网络连接
     */
    isConnected: boolean;
    /**
     * 网络类型
     */
    networkType: NIMENetworkType;
};
export declare const enum NIMENetworkType {
    /**
     * 未知
     */
    kStatNetTypeUnkonw = 0,
    /**
     * 有线网络
     */
    kStatNetTypeEthernet = 1,
    kStatNetTypeWifi = 2,
    kStatNetType2G = 3,
    kStatNetType3G = 4,
    kStatNetType4G = 5,
    kStatNetType5G = 6
}
declare let AdapterWebSocketWrapper: {
    prototype: AdapterWebSocket;
    new (url: string, protocols?: string): AdapterWebSocket;
};
export interface AdapterWebSocket {
    close(code?: number, reason?: string): void;
    /** Transmits data using the WebSocket connection. data can be a string, a Blob, an ArrayBuffer, or an ArrayBufferView. */
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
    onclose: ((this: AdapterWebSocket, ev: CloseEvent) => any) | null;
    onerror: ((this: AdapterWebSocket, ev: Event) => any) | null;
    onmessage: ((this: AdapterWebSocket, ev: MessageEvent) => any) | null;
    onopen: ((this: AdapterWebSocket, ev: Event) => any) | null;
    binaryType: string;
    readonly CLOSED: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly OPEN: number;
}
export interface AdapterStorage {
    clear(): void;
    getItem(key: string): string | null;
    removeItem(key: string): void;
    setItem(key: string, value: string): void;
}
export declare type AdapterRequestMethodNames = 'GET' | 'POST' | 'PUT' | 'OPTIONS' | 'DELETE' | 'OPTIONS' | 'CONNECT';
export interface AdapterRequestResult {
    data: any;
    headers: any;
    status: number;
    [key: string]: any;
}
export interface AdapterSystemInfo {
    /**
     * https://docs.popo.netease.com/lingxi/d722dd9717d940a6bff97b207bc06cb4
     *
     * 登录 44 号字段。客户使用的 SDK 产物为，取值有: BROWSER, UNIAPP, MINIAPP, React Native, NodeJs
     */
    libEnv: 'BROWSER' | 'UNIAPP' | 'MINIAPP' | 'React Native' | 'NodeJs';
    /**
     * 登录时的 42 号字段
     *
     * https://docs.popo.netease.com/lingxi/d722dd9717d940a6bff97b207bc06cb4?xyz=1703642388639
     */
    userAgent: string;
    os: string;
    osVer: string;
    browser: string;
    browserVer: string;
    /**
     * 和 hostEnvEnum 一样，但是是字符串，表示脚本的运行环境。取值有：
     *
     * BROWSER, ELECTRON, H5, Weixin, Baidu, Ali, Tiktok, RN
     */
    hostEnv: keyof typeof HostEnvTypes;
    /**
     * 登录时的 41 号字段
     *
     * https://docs.popo.netease.com/lingxi/d722dd9717d940a6bff97b207bc06cb4?xyz=1703642388639
     */
    hostEnvEnum: HostEnvTypes;
    /**
     * 宿主环境的版本号
     * - 浏览器：浏览器版本
     * - 小程序：宿主App版本。比如微信、支付宝版本
     */
    hostEnvVer: string;
    /**
     * 宿主环境版本号
     * - 浏览器：浏览器版本
     * - 小程序：基础库版本
     */
    model: string;
    /**
     * 和 hostEnv 一样，但是更为精细。
     * - 浏览器：platform.name
     * - 小程序：等于 hostEnv
     */
    manufactor: string;
    /**
     * 端设备时区。仅在 adapter 能稳定获取端设备时区时填写，不支持时返回空字符串。
     */
    timeZone?: string;
    pushDeviceInfo?: {
        PRODUCT: string;
        DEVICE: string;
        MANUFACTURER: string;
    };
}
declare type AdapterFileProgressObject = {
    total: number;
    loaded: number;
    percentage: number;
    percentageText: string;
};
export interface AdapterUploadFileResult {
    name: string;
    ext: string;
    bucketName: string;
    ctx: string;
    objectName: string;
    token: string;
    type: string;
    size: number;
    w?: number;
    h?: number;
    dur?: number;
}
export interface AdapterFileUploadInfo {
    bucketName: string;
    objectName: string;
    token: string;
    md5?: string;
    ctx?: string;
    payload?: any;
}
export interface AdapterUploadFileOptions {
    payload?: any;
    type?: 'image' | 'audio' | 'video' | 'file';
    file?: File;
    fileInput?: string | HTMLInputElement;
    filePath?: string;
    blob?: Blob;
    dataURL?: string;
    maxSize?: number;
    nosScenes?: string;
    nosSurvivalTime?: number;
    md5?: string;
    nosToken: any;
    chunkUploadHost: string;
    chunkUploadHostBackupList: string[];
    commonUploadHost: string;
    commonUploadHostBackupList: string[];
    headers?: {
        [key: string]: string;
    };
    timeout?: number;
    uploadHostCandidates?: Array<{
        url: string;
        source?: 'lbs' | 'default';
    }>;
    maxRetry?: number;
    onUploadAttemptFail?: (info: {
        url: string;
        source: 'lbs' | 'default';
        error: any;
        kind: 'network' | 'business' | 'communication' | 'server';
    }) => void;
    onUploadStart?: (task: {
        abort: () => void;
        [key: string]: any;
    }) => void;
    onUploadProgress?: (obj: AdapterFileProgressObject) => void;
    onUploadInfo?: (info: ReporterHookCloudStorageUpdateTraceData) => void;
}
export interface AdapterRequestParams {
    method: AdapterRequestMethodNames;
    headers?: {
        [key: string]: string;
    };
    data?: {
        [key: string]: string | number | any;
    };
    params?: {
        [key: string]: string | number | any;
    };
    timeout?: number;
    /**
     * 支付宝需要传 dataType: text 才能让 socket io 嗅探请求不挂
     */
    dataType: string;
}
export declare function setAdapters(newAdapters: GetAdapterType): void;
export {};
