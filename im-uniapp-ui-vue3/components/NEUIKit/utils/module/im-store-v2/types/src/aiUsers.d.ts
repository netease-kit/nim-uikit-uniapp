import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import { V2NIMAIModelCallContent, V2NIMAIUser, V2NIMProxyAIModelCallParams, V2NIMCreateUserAIBotParams, V2NIMCreateUserAIBotResult, V2NIMGetUserAIBotListParams, V2NIMGetUserAIBotListResult, V2NIMGetUserAIBotParams, V2NIMUserAIBot, V2NIMUpdateUserAIBotParams, V2NIMDeleteUserAIBotParams, V2NIMRefreshUserAIBotTokenParams, V2NIMRefreshUserAIBotTokenResult, V2NIMBindUserAIBotTokenParams } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMAIService";
import RootStore from ".";
import { AIUserServerExt, LocalOptions } from "./types";
import * as storeUtils from "./utils";
/**
 * 管理 AI 用户、AI Bot，以及 AI 代理对话过程状态的数据存储。
 *
 * 业务前端通常通过它读取可用 AI 用户列表、选择默认的搜索 / 翻译 AI 账号、
 * 管理用户创建的 AI Bot，并在 AI 代理请求过程中读取请求态与回复态。
 */
export declare class AIUserStore {
    private rootStore;
    private nim;
    private localOptions;
    /** 可用 AI 用户列表，key 为 AI 用户账号。 */
    aiUsers: Map<string, V2NIMAIUser>;
    /** 当前用户创建或绑定的 AI Bot 列表，key 为 Bot 账号。 */
    aiBots: Map<string, V2NIMUserAIBot>;
    /** 正在进行中的 AI 请求消息片段列表。 */
    aiReqMsgs: V2NIMAIModelCallContent[];
    /** 已收到的 AI 回复文本片段列表。 */
    aiResMsgs: string[];
    /** 调试日志实例；用于记录 AI 用户、AI Bot 和 AI 代理请求流程。 */
    logger: typeof storeUtils.logger | null;
    /**
     * 代理 AI 请求失败时的错误回调。
     *
     * 业务侧可覆写该方法，在特定错误码下展示登录失效、额度不足等提示。
     */
    onSendAIProxyErrorHandler: (errorCode: number) => void;
    private requestIds;
    private proxyAccountId;
    constructor(rootStore: RootStore, nim: NIM, localOptions: LocalOptions);
    /**
     * 当前是否仍处于 AI 代理回复中。
     *
     * 常用于输入框、发送按钮、停止生成按钮等 UI 的状态切换。
     */
    get aiProxying(): boolean;
    /**
     * 清空 AI 用户、AI Bot，以及当前会话中的 AI 请求 / 回复状态缓存。
     *
     * 适合在退出登录、切换账号或重新进入 AI 能力页面时调用。
     */
    resetState(): void;
    /**
     * 销毁 AI store，并注销 AI 代理相关事件监听。
     */
    destroy(): void;
    /**
     * 往本地缓存中写入用户级 AI Bot。
     *
     * 不会请求服务端，适合承接分页查询、单个查询或创建 / 更新成功后的结果同步。
     * @param bots AI Bot 列表
     */
    addAIBots(bots: V2NIMUserAIBot[]): void;
    /**
     * 从本地缓存中移除用户级 AI Bot。
     *
     * 这是纯内存操作，适合删除成功后同步界面状态。
     * @param accids 需要移除的 AI Bot 账号列表
     */
    removeAIBots(accids: string[]): void;
    /**
     * 往本地缓存中写入 AI 用户资料。
     *
     * 不会请求服务端，适合承接 AI 用户列表查询结果或业务预加载结果。
     * @param aiUsers AI 用户列表
     */
    addAIUsers(aiUsers: V2NIMAIUser[]): void;
    /**
     * 从本地缓存中移除 AI 用户资料。
     *
     * 这是纯内存操作，通常用于业务侧主动清理缓存。
     * @param accounts 需要移除的 AI 用户账号列表
     */
    removeAIUsers(accounts: string[]): void;
    /**
     * 获取 AI 用户列表。
     *
     * 可按账号过滤；默认会按创建时间倒序返回，适合 AI 用户选择器或 AI 会话入口直接使用。
     */
    getAIUserList(accountIds?: string[]): V2NIMAIUser[];
    /**
     * 获取业务侧配置的默认 AI 搜索 / 划词用户。
     *
     * 返回值来自 `LocalOptions.aiUserAgentProvider` 的自定义策略。
     */
    getAISearchUser(): V2NIMAIUser | void;
    /**
     * 获取业务侧配置的默认 AI 翻译用户。
     *
     * 返回值来自 `LocalOptions.aiUserAgentProvider` 的自定义策略。
     */
    getAITranslateUser(): V2NIMAIUser | void;
    /**
     * 获取当前默认翻译 AI 支持的语言列表。
     *
     * 返回值来自 `LocalOptions.aiUserAgentProvider` 的自定义策略。
     */
    getAITranslateLangs(): string[];
    /**
     * 获取指定 AI 用户资料中的 `serverExtension` 解析结果。
     *
     * 适合读取 AI 数字人的业务扩展配置，例如是否支持 AI 聊、是否默认置顶等能力。
     * @param accountId AI 用户账号
     */
    getAIUserServerExt(accountId: string): AIUserServerExt;
    /**
     * 获取支持 AI 聊能力的数字人列表。
     *
     * 这里的 AI 聊指可在会话中被 `@` 的数字人，筛选依据来自 `serverExtension.aiChat`。
     */
    getAIChatUser(): V2NIMAIUser[];
    /**
     * 获取配置为“默认置顶”的数字人列表。
     *
     * 这里只表示数字人配置中声明了默认置顶，不代表当前用户界面上一定仍然置顶。
     */
    getAIPinDefaultUser(): V2NIMAIUser[];
    /**
     * 获取当前应展示为置顶的数字人列表。
     *
     * 会在默认置顶配置基础上，结合当前登录用户的取消置顶配置做最终过滤。
     */
    getAIPinUser(): V2NIMAIUser[];
    /**
     * 判断某个数字人当前是否应处于置顶状态。
     * @param accountId AI 用户账号
     */
    isAIPinUser(accountId: string): boolean;
    /**
     * 判断当前是否处于 AI 划词处理中。
     *
     * 常用于驱动划词弹层、加载态和停止生成按钮展示。
     */
    isAISearching(): boolean;
    /**
     * 判断当前是否处于 AI 翻译处理中。
     *
     * 常用于驱动翻译弹层、加载态和停止生成按钮展示。
     */
    isAITranslating(): boolean;
    /**
     * 判断指定账号是否为已缓存的 AI 用户。
     * @param accountId 用户账号
     */
    isAIUser(accountId: string): boolean;
    /**
     * 重置当前 AI 代理会话的本地状态。
     *
     * 会清空请求 ID、请求内容、回复片段和错误回调，适合开始新一轮 AI 请求前调用。
     */
    resetAIProxy(): void;
    /**
     * 从 SDK 拉取 AI 用户列表并同步到本地缓存。
     *
     * 适合在初始化 AI 能力页、打开 AI 入口或登录后预加载时调用。
     */
    getAIUserListActive(): Promise<void>;
    /**
     * 发起一次 AI 代理请求。
     *
     * 适合 AI 对话、AI 划词、AI 翻译等需要通过代理能力获取回复的场景。
     * 如果传入 `requestId`，会视为开启一轮新的代理会话并重置上一轮的本地流式状态。
     * @param params AI 代理请求参数
     * @param params.requestId 本次请求 ID；传入时表示新一轮请求，不传则内部自动生成
     * @param params.onSendAIProxyErrorHandler 发送失败或流式返回异常时的错误处理回调
     */
    sendAIProxyActive(params: Omit<V2NIMProxyAIModelCallParams, "requestId"> & {
        requestId?: string;
        onSendAIProxyErrorHandler?: (errorCode: number) => void;
    }): Promise<void>;
    /**
     * 创建一个用户级 AI Bot。
     *
     * 创建成功后会自动拉取该 Bot 的最新资料并写入本地缓存。
     * @param params AI Bot 创建参数
     */
    createUserAIBotActive(params: V2NIMCreateUserAIBotParams): Promise<V2NIMCreateUserAIBotResult>;
    /**
     * 分页查询当前用户的 AI Bot 列表。
     *
     * 返回结果会同步写入本地缓存，适合 Bot 管理页直接使用。
     * @param params 分页查询参数；不传时使用 SDK 默认分页配置
     */
    getUserAIBotListActive(params?: V2NIMGetUserAIBotListParams): Promise<V2NIMGetUserAIBotListResult>;
    /**
     * 查询单个用户级 AI Bot 详情。
     *
     * 返回结果会同步写入本地缓存，适合进入 Bot 详情页前强制刷新。
     * @param params 查询参数
     */
    getUserAIBotActive(params: V2NIMGetUserAIBotParams): Promise<V2NIMUserAIBot>;
    /**
     * 更新一个用户级 AI Bot。
     *
     * 更新成功后会重新拉取最新 Bot 详情并覆盖本地缓存。
     * @param params 更新参数
     */
    updateUserAIBotActive(params: V2NIMUpdateUserAIBotParams): Promise<void>;
    /**
     * 删除一个用户级 AI Bot。
     *
     * 成功后会同步从本地缓存中移除该 Bot。
     * @param params 删除参数
     */
    deleteUserAIBotActive(params: V2NIMDeleteUserAIBotParams): Promise<void>;
    /**
     * 刷新用户级 AI Bot 的登录 token。
     *
     * 适合 Bot token 即将过期或需要重新绑定前调用。
     * @param params token 刷新参数
     */
    refreshUserAIBotTokenActive(params: V2NIMRefreshUserAIBotTokenParams): Promise<V2NIMRefreshUserAIBotTokenResult>;
    /**
     * 绑定用户级 AI Bot 的账号 token。
     *
     * 适合业务已拿到 token 后，把 Bot 账号与当前用户进行关联。
     * @param params token 绑定参数
     */
    bindUserAIBotTokenActive(params: V2NIMBindUserAIBotTokenParams): Promise<void>;
    private _onProxyAIModelCall;
}
