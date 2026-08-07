/**
 * 调用方式:
 * ```js
 * const time = await nim.misc.getServerTime()
 * ```
 */
export interface MiscServiceInterface {
    /**
     * @Multi_Lang_Tag
     * @locale cn
     * 获取服务器时间
     * @locale
     *
     * @locale en
     * @locale
     *
     * @example
     * ```ts
     * const serverTime = await nim.misc.getServerTime()
     * console.log('Server time:', new Date(serverTime))
     * ```
     */
    getServerTime(): Promise<number>;
}
