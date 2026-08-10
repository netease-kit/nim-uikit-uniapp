import RootStore from ".";
import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import * as storeUtils from "./utils";
import { V2NIMFriend, V2NIMFriendAddApplication, V2NIMFriendAddApplicationQueryOption, V2NIMFriendAddApplicationResult, V2NIMFriendAddParams, V2NIMFriendSetParams } from "./types";
/**
 * 管理好友关系、好友申请和好友资料缓存的数据存储。
 *
 * 业务前端通常通过它完成好友列表加载、发起好友申请、处理申请、删除好友，以及维护好友资料的本地展示状态。
 * 其中 `...Active` 方法大多会调用 SDK；`addFriend`、`removeFriend` 负责同步本地内存和用户缓存。
 */
export declare class FriendStore {
    private rootStore;
    private nim;
    /** 好友资料缓存，key 为好友账号。 */
    friends: Map<string, V2NIMFriend>;
    /** 调试日志实例；用于记录好友相关操作和 SDK 事件。 */
    logger: typeof storeUtils.logger | null;
    constructor(rootStore: RootStore, nim: NIM);
    /**
     * 清空本地好友缓存。
     *
     * 适合在退出登录、切换账号或重新初始化业务状态时调用。
     */
    resetState(): void;
    /**
     * 销毁好友 store，并注销好友相关事件监听。
     */
    destroy(): void;
    /**
     * 获取当前账号的好友列表。
     *
     * 会调用 SDK 查询，并把结果写入本地好友缓存和 `userStore`，适合通讯录好友页初始化。
     */
    getFriendListActive(): Promise<V2NIMFriend[]>;
    /**
     * 按账号批量查询好友关系信息。
     *
     * 会调用 SDK 查询指定好友，并同步更新本地好友缓存。
     */
    getFriendByIdsActive(ids: string[]): Promise<V2NIMFriend[]>;
    /**
     * 获取好友申请列表。
     *
     * 会调用 SDK 拉取好友申请记录，并同步写入 `sysMsgStore`，适合系统消息页直接展示。
     * @param options 好友申请查询参数
     */
    getAddApplicationListActive(options: V2NIMFriendAddApplicationQueryOption): Promise<V2NIMFriendAddApplicationResult>;
    /**
     * 发起好友申请。
     *
     * 会调用 SDK 向目标账号发送好友申请；是否立即成为好友取决于对方设置和后续处理结果。
     * @param accountId 目标账号
     * @param params 添加好友的配置参数
     */
    addFriendActive(accountId: string, params: V2NIMFriendAddParams): Promise<void>;
    /**
     * 接受一条好友申请。
     *
     * 会调用 SDK 处理待办申请；成功后通常会收到好友新增事件，并同步进入本地好友列表。
     * @param application 申请添加好友的相关信息
     */
    acceptAddApplicationActive(application: V2NIMFriendAddApplication): Promise<void>;
    /**
     * 拒绝一条好友申请。
     *
     * 会调用 SDK 更新申请状态，常用于系统消息页的“拒绝”操作。
     * @param application 申请添加好友的相关信息
     * @param postscript 拒绝好友申请的附言
     */
    rejectAddApplicationActive(application: V2NIMFriendAddApplication, postscript?: string): Promise<void>;
    /**
     * 删除一个好友。
     *
     * 会调用 SDK 删除好友关系；成功后会同步清理本地好友缓存。
     * @param accountId 账号
     */
    deleteFriendActive(accountId: string): Promise<void>;
    /**
     * 更新好友关系上的备注等信息。
     *
     * 会调用 SDK 修改好友关系资料，适合好友详情页或通讯录备注编辑场景。
     * @param accountId 账号
     * @param params 设置好友信息的配置参数
     */
    setFriendInfoActive(accountId: string, params: V2NIMFriendSetParams): Promise<void>;
    /**
     * 往本地好友缓存中写入或合并好友资料。
     *
     * 这是纯内存更新，同时会把好友资料同步写入 `userStore`，便于消息列表和资料卡共用同一份用户缓存。
     * @param data 好友数组
     */
    addFriend(data: V2NIMFriend[]): void;
    /**
     * 从本地好友缓存中删除好友。
     *
     * 不会调用 SDK，适合承接删除好友成功后的本地清理。
     * @param accounts 好友账号数组
     */
    removeFriend(accounts: string[]): void;
    /**
     * 监听添加好友
     */
    private _onFriendAdded;
    /**
     * 监听删除好友
     */
    private _onFriendDeleted;
    /**
     * 申请添加好友的相关信息，其他端向本端发送好友申请,会触发该事件
     */
    private _onFriendAddApplication;
    /**
     * 对端拒绝本端好友申请，本端会触发该事件
     */
    private _onFriendAddRejected;
    /**
     * 好友信息更新回调，返回变更的好友信息，包括本端直接更新的好友信息和其他端同步更新的好友信息
     */
    private _onFriendInfoChanged;
}
