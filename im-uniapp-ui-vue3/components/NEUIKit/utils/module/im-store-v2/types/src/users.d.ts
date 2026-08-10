import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import RootStore from ".";
import { MyUserServerExt, V2NIMUser, V2NIMUserUpdateParams } from "./types";
import * as storeUtils from "./utils";
/**
 * 管理用户资料的数据存储，包含当前登录用户、好友资料和陌生人资料缓存。
 *
 * 业务前端通常通过它完成用户资料读取、个人资料更新、头像点击后的强制刷新等场景。
 * `addUsers`、`removeUsers` 只维护本地缓存；`...Active` 方法会调用 SDK 获取或更新真实资料。
 */
export declare class UserStore {
    private rootStore;
    private nim;
    /** 用户资料缓存，key 为用户账号。 */
    users: Map<string, V2NIMUser>;
    /** 当前登录用户自己的资料快照。 */
    myUserInfo: V2NIMUser;
    /** 调试日志实例；用于记录用户资料查询、更新和同步事件。 */
    logger: typeof storeUtils.logger | null;
    private _getUserInfo;
    constructor(rootStore: RootStore, nim: NIM);
    /**
     * 清空本地用户资料缓存，并重置当前登录用户资料快照。
     *
     * 适合在退出登录、切换账号或重新初始化用户资料状态时调用。
     */
    resetState(): void;
    /**
     * 销毁 UserStore，并取消用户资料相关事件监听。
     */
    destroy(): void;
    /**
     * 往本地用户缓存中写入资料。
     *
     * 不会请求服务端，适合承接资料查询结果、好友同步结果或资料变更事件。
     * @param users 用户数组
     */
    addUsers(users: V2NIMUser[]): void;
    /**
     * 从本地用户缓存中删除资料。
     *
     * 这是纯内存操作，通常用于业务主动清理临时用户缓存。
     * @param accounts 账号数组
     */
    removeUsers(accounts: string[]): void;
    /**
     * 获取当前登录用户资料中的 `serverExtension`。
     *
     * 返回值来自本地 `myUserInfo` 缓存，不会请求服务端，适合读取业务自定义资料字段。
     */
    getMyUserServerExt(): MyUserServerExt;
    /**
     * 更新当前登录用户自己的资料。
     *
     * 会调用 SDK 更新服务端资料；如果传入 `fileObj`，会先上传头像文件，再把上传结果写入 `avatar` 字段后提交。
     * 成功后的最新资料通常会通过用户资料变更事件回写到本地缓存。
     * @param updateParams 待更新的资料字段
     * @param fileObj 头像文件对象，或小程序中的文件路径
     */
    updateSelfUserProfileActive(updateParams: V2NIMUserUpdateParams, fileObj?: File | string): Promise<void>;
    /**
     * 获取用户资料，优先读本地缓存。
     *
     * 如果本地已经有该账号资料，会直接返回；否则会退化到 SDK 查询，适合聊天列表、消息气泡等高频展示场景。
     * @param accountId 账号 id
     */
    getUserActive(accountId: string): Promise<V2NIMUser>;
    /**
     * 强制获取某个用户的最新资料。
     *
     * 会调用 SDK 查询并更新本地缓存，适合业务明确需要最新资料时使用。
     * @param accountId 账号 id
     */
    getUserForceActive(accountId: string): Promise<V2NIMUser>;
    /**
     * 批量从服务端拉取最新用户资料。
     *
     * 不依赖本地缓存，适合用户点开头像、进入资料页等必须展示最新资料的场景。
     * @param accountIds 账号 id 数组
     */
    getUserListFromCloudActive(accountIds: string[]): Promise<V2NIMUser[]>;
    /**
     * 获取当前登录用户自己的资料。
     *
     * 会调用 SDK 查询并刷新 `myUserInfo` 与通用用户缓存，适合应用初始化、个人中心首次进入时调用。
     */
    getMyUserInfoActive(): Promise<V2NIMUser>;
    private _getUserInfos;
    private _onUserProfileChanged;
}
