import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import RootStore from ".";
import * as storeUtils from "./utils";
import { V2NIMUserStatus } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMSubscriptionService";
/**
 * 管理在线状态等订阅类能力的数据存储。
 *
 * 业务前端通常通过它订阅好友在线状态，并在联系人列表、会话列表、资料卡中读取在线 / 离线展示所需的数据。
 */
export declare class SubscriptionStore {
    private rootStore;
    private nim;
    /** 已订阅用户的状态缓存，key 为用户账号。 */
    stateMap: Map<string, V2NIMUserStatus>;
    /** 调试日志实例；用于记录在线状态订阅和状态变化事件。 */
    logger: typeof storeUtils.logger | null;
    constructor(rootStore: RootStore, nim: NIM);
    /**
     * 清空当前已订阅用户的在线状态缓存。
     *
     * 适合在退出登录、切换账号或断线重连前后重置本地订阅状态。
     */
    resetState(): void;
    /**
     * 销毁订阅 store，并注销用户状态订阅相关监听。
     */
    destroy(): void;
    /**
     * 获取指定账号当前缓存的在线状态。
     *
     * 返回值来自本地订阅缓存，不会触发远端请求。
     * @param accountId 用户 ID
     */
    getUserStatus(accountId: string): V2NIMUserStatus | undefined;
    /**
     * 获取当前已订阅用户的全部在线状态列表。
     */
    getUserStatusList(): V2NIMUserStatus[];
    /**
     * 订阅用户状态，包括在线状态或用户自定义的状态。
     * 成功订阅用户状态后，当订阅的用户状态有变更时，会触发 onUserStatusChanged 回调。
     * @param accountIds 要订阅的用户 ID 列表。
     */
    subscribeUserStatusActive(accountIds: string[]): Promise<Array<string> | undefined>;
    /**
     * 注册用户状态订阅相关监听。
     */
    private _onUserStatusChanged;
}
