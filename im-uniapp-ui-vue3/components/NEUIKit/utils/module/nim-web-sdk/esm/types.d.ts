export declare type NIMEStrAnyObj = {
    [key: string]: any;
};
export declare type NIMEStrNumObj = {
    [key: string]: number;
};
export declare type NIMEStrObj = {
    [key: string]: string;
};
export declare const enum NIMEEnumClientType {
    Android = 1,
    iOS = 2,
    PC = 4,
    WindowsPhone = 8,
    Web = 16,
    Server = 32,
    Mac = 64,
    HarmonyOS = 65
}
export declare type NIMEClientType = keyof typeof NIMEEnumClientType;
export interface V2NIMError extends Error {
    /**
     * 错误码
     *
     * 注: 客户端错误码范围: 190000 ~ 199999
     */
    code: number;
    /**
     * 错误描述
     */
    desc: string;
    /**
     * 错误详情
     */
    detail: {
        /**
         * 可能的详细错误描述
         */
        reason?: string;
        /**
         * 原始错误
         */
        rawError?: Error;
        /**
         * 请求返回的原始数据
         */
        rawData?: string;
        /**
         * 错误发生的时间
         */
        timetag?: number;
        [key: string]: any;
    };
    /**
     * 错误格式化输出函数
     */
    toString: () => string;
}
/**
 * 易盾反垃圾配置
 *
 * 使用场景: 未使用云信安全通, 直接对接了易盾
 */
export declare type V2NIMAntispamConfig = {
    /**
     * 指定易盾业务ID，而不使用云信后台配置的安全通
     *
     * @example
     * ```
     * '{"textbid":"","picbid":""}'
     * ```
     */
    antispamBusinessId: string;
};
export declare const enum V2NIMDisconnectReason {
    Destroy = "destroy",
    Logout = "logout"
}
