import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import RootStore from ".";
import { V2NIMP2PMessageMuteMode } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMSettingService";
import * as storeUtils from "./utils";
/**
 * 管理黑名单和点对点免打扰名单的数据存储。
 *
 * 业务前端通常通过它判断某个用户是否被拉黑、是否处于单聊免打扰状态，
 * 并完成黑名单管理、免打扰开关等联系人关系类操作。
 */
export declare class RelationStore {
    private rootStore;
    private nim;
    /** 当前账号的黑名单账号列表。 */
    blacklist: string[];
    /** 当前账号已开启单聊消息免打扰的账号列表。 */
    mutes: string[];
    /** 调试日志实例；用于记录黑名单和免打扰相关操作。 */
    logger: typeof storeUtils.logger | null;
    constructor(rootStore: RootStore, nim: NIM);
    /**
     * 清空本地黑名单和点对点免打扰缓存。
     *
     * 适合在退出登录、切换账号或重新初始化业务状态时调用。
     */
    resetState(): void;
    /**
     * 销毁关系 store，并注销黑名单和免打扰相关监听。
     */
    destroy(): void;
    /**
     * 内存中增加黑名单列表
     * @param accounts - 账号数组
     */
    addBlacklist(accounts: string[]): void;
    /**
     * 内存中删除黑名单列表
     * @param accounts - 账号数组
     */
    removeBlacklist(accounts: string[]): void;
    /**
     * 是否在黑名单列表
     */
    isInBlacklist(account: string): boolean;
    /**
     * 内存中增加静音列表
     * @param accounts - 账号数组
     */
    addMutes(accounts: string[]): void;
    /**
     * 内存中删除静音列表
     * @param accounts - 账号数组
     */
    removeMutes(accounts: string[]): void;
    /**
     * 获取当前账号的黑名单列表。
     *
     * 会调用 SDK 查询，并把结果同步到本地 `blacklist` 缓存。
     */
    getBlockListActive(): Promise<string[]>;
    /**
     * 获取当前账号的点对点消息免打扰列表。
     *
     * 会调用 SDK 查询，并把结果同步到本地 `mutes` 缓存。
     */
    getP2PMuteListActive(): Promise<string[]>;
    /**
     * 加入 黑名单
     * @param accountId 账号
     */
    addUserToBlockListActive(accountId: string): Promise<void>;
    /**
     * 移除 黑名单
     * @param accountId 账号
     */
    removeUserFromBlockListActive(accountId: string): Promise<void>;
    /**
     * 设置/取消 单聊（点对点）消息免打扰模式
     * @param accountId 账号
     * @param muteMode  消息免打扰模式：免打扰开启或免打扰关闭
     */
    setP2PMessageMuteModeActive(accountId: string, muteMode: V2NIMP2PMessageMuteMode): Promise<void>;
    /**
     * 黑名单新增用户回调，返回新加入黑名单的用户列表。当客户端本端添加用户到黑名单，或者其他端同步添加用户到黑名单时触发该回调
     */
    private _onBlockListAdded;
    /**
     * 黑名单移除用户回调，返回移出黑名单的用户列表。当客户端本端从黑名单移除用户，或者其他端同步从黑名单移除用户时触发该回调。
     */
    private _onBlockListRemoved;
    /**
     * 单聊消息免打扰模式变更事件
     */
    private _onP2PMessageMuteModeChanged;
}
