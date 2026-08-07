import { ContactType, Relation, V2NIMFriend, V2NIMConversationForUI, V2NIMFriendAddApplicationForUI, V2NIMLocalConversationForUI, V2NIMTeam, V2NIMUser } from "./types";
import RootStore from ".";
import * as storeUtils from "./utils";
/**
 * 面向业务 UI 的轻量级视图 store。
 *
 * 这里聚合了界面层最常直接读取的选中状态、联系人视图状态和展示用派生数据，
 * 适合组件渲染时直接读取；它本身不承载 SDK 主数据，只维护本地 UI 状态或基于其他 store 计算出的结果。
 */
export declare class UiStore {
    private rootStore;
    /**
     * 当前通讯录页选中的分类类型。
     *
     * 通讯录 UI 可直接读取它来判断当前显示的是好友、群组、申请等哪一种视图；
     * 该值只属于本地界面状态，不会影响 SDK 或业务主数据。
     */
    selectedContactType: ContactType | "";
    /**
     * 当前界面选中的会话 ID。
     *
     * 会话页、消息面板切换时读取；属于本地 UI 状态，不等同于 SDK 会话对象本身。
     */
    selectedConversation: string;
    /**
     * 当前消息列表是否处于多选模式。
     *
     * 聊天页进入批量转发、批量删除等操作时读取；只影响本地 UI 状态。
     */
    isMultiSelectMode: boolean;
    /**
     * 当前多选模式下已选中的消息端侧 ID 列表。
     *
     * 仅保存 `messageClientId`，具体消息内容仍从消息 store 读取。
     */
    selectedMessageIds: string[];
    /** 调试日志实例；用于记录 UI 视图切换和派生状态查询。 */
    logger: typeof storeUtils.logger | null;
    constructor(rootStore: RootStore);
    /**
     * 重置当前 UI 视图状态。
     *
     * 适合在登出、切租户或需要清空界面选中态时调用；只影响本地 UI 状态。
     */
    resetState(): void;
    /**
     * 销毁前清空 UI 相关状态。
     *
     * 适合业务侧卸载整套 IM 界面时调用；不会删除 SDK 数据，只做本地界面重置。
     */
    destroy(): void;
    /**
     * 选中通讯录当前展示的导航类型。
     *
     * 通讯录页面切换“好友 / 群组 / 申请”等视图时调用；属于本地 UI 状态。
     * @param contactType - 导航类型
     */
    selectContactType(contactType: ContactType): void;
    /**
     * 清空通讯录当前选中的导航类型。
     *
     * 通讯录页需要回到未选中状态时调用；只影响本地 UI 状态。
     */
    unselectContactType(): void;
    /**
     * 切换当前界面正在查看的会话。
     *
     * 会话列表点击、路由切换到新会话时调用。该方法会同步重置消息分页状态，
     * 并根据当前会话体系清理对应未读/提醒；选中结果仍属于本地 UI 状态。
     * @param conversationId - 会话ID
     */
    selectConversation(conversationId: string): Promise<void>;
    /**
     * 清空当前选中的会话。
     *
     * 关闭会话面板或离开聊天页时调用；只重置本地选中态和消息列表分页状态。
     */
    unselectConversation(): void;
    /**
     * 设置消息多选模式。
     *
     * 关闭多选模式时会同步清空已选消息，避免切换会话或退出操作栏后残留选择状态。
     * @param isMultiSelectMode 是否开启多选
     */
    setMultiSelectMode(isMultiSelectMode: boolean): void;
    /**
     * 选中一条消息。
     *
     * 重复选择同一条消息时会自动去重。
     * @param messageClientId 消息端侧 ID
     */
    selectMessage(messageClientId: string): void;
    /**
     * 取消选中一条消息。
     *
     * @param messageClientId 消息端侧 ID
     */
    unselectMessage(messageClientId: string): void;
    /**
     * 获取某个账号在当前界面可展示的关系信息。
     *
     * 适合联系人卡片、会话头部、操作面板决定展示文案或按钮时读取；
     * 返回值是基于现有 store 计算出的派生结果，不会触发远端请求。
     * @param account - 账号
     */
    getRelation(account: string): {
        relation: Relation;
        isInBlacklist: boolean;
    };
    /**
     * 获取适合联系人详情页展示的好友信息与用户资料合并结果。
     *
     * 联系人详情、资料抽屉等需要同时展示好友备注和用户基础信息时读取；
     * 返回值来自本地缓存拼装，不会修改原始数据。
     * @param account - 账号
     */
    getFriendWithUserNameCard(account: string): V2NIMFriend & V2NIMUser;
    /**
     * 获取界面上展示给用户看的称谓文本。
     *
     * 会话列表、消息气泡、联系人名称等 UI 展示时优先调用。
     * 返回值按本地已有数据做优先级兜底，不会拉取远端资料。
     * @param options 查询参数
     * @param options.account 目标账号
     * @param options.teamId 群组 ID；传入后会优先尝试读取群昵称
     * @param options.ignoreAlias 是否忽略好友备注
     * @param options.nickFromMsg 从消息体上透传过来的昵称兜底值
     */
    getAppellation({ account, teamId, ignoreAlias, nickFromMsg, }: {
        account: string;
        teamId?: string;
        ignoreAlias?: boolean;
        nickFromMsg?: string;
    }): string;
    /**
     * 当前好友列表的 UI 友好只读视图。
     *
     * 适合通讯录好友页、好友选择器等界面直接渲染读取；返回值来自本地好友缓存映射。
     */
    get friends(): V2NIMFriend[];
    /**
     * 当前云端会话列表的 UI 友好只读视图。
     *
     * 适合云端会话模式下的会话列表直接渲染读取；这里返回的是从其他 store 映射出的派生数组。
     */
    get conversations(): V2NIMConversationForUI[];
    /**
     * 当前本地会话列表的 UI 友好只读视图。
     *
     * 适合本地会话模式下的会话列表直接渲染读取；这里返回的是从其他 store 映射出的派生数组。
     */
    get localConversations(): V2NIMLocalConversationForUI[];
    /**
     * 当前已缓存的用户资料列表。
     *
     * 适合联系人、成员选择器等组件直接读取；仅反映本地缓存内容。
     */
    get users(): V2NIMUser[];
    /**
     * 当前可展示的有效群组列表。
     *
     * 群组列表页、群组选择器等界面读取时使用；返回值基于本地群组数据过滤并排序后生成。
     */
    get teamList(): V2NIMTeam[];
    /**
     * 当前好友申请消息列表的 UI 汇总视图。
     *
     * 适合申请通知页直接读取；数据来源于系统消息 store，这里只负责对外暴露界面层可直接消费的数据。
     */
    get applyMsgs(): V2NIMFriendAddApplicationForUI[];
}
