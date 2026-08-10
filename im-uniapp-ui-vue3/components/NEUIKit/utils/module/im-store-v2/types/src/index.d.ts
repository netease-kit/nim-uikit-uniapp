import { ConnectStore } from "./connect";
import { FriendStore } from "./friends";
import { MsgStore } from "./msgs";
import { RelationStore } from "./relations";
import { ConversationStore } from "./conversations";
import { TeamStore } from "./teams";
import { TeamMemberStore } from "./teamMembers";
import { SysMsgStore } from "./sysMsgs";
import { UserStore } from "./users";
import { AIUserStore } from "./aiUsers";
import { UiStore } from "./ui";
import { StorageStore } from "./storage";
import { ContactType, Relation, LocalOptions, V2NIMConversation, V2NIMConversationForUI, V2NIMFriend, V2NIMFriendAddApplication, V2NIMLocalConversationForUI, V2NIMLocalConversation, V2NIMMessage, V2NIMTeamJoinActionInfoForUI, V2NIMTeam, V2NIMTeamJoinActionInfo, V2NIMTeamMember, V2NIMP2PMessageReadReceipt, V2NIMSendMessageParams, V2NIMUser, V2NIMUserUpdateParams, V2NIMFriendAddApplicationQueryOption, V2NIMFriendAddApplicationResult, V2NIMFriendAddParams, V2NIMFriendSetParams, V2NIMConversationResult, V2NIMLocalConversationResult, V2NIMTeamMemberQueryOption, V2NIMTeamMemberListResult, V2NIMUpdateSelfMemberInfoParams, V2NIMUpdateTeamInfoParams, V2NIMTeamJoinActionInfoQueryOption, V2NIMTeamJoinActionInfoResult, V2NIMTeamType, V2NIMTeamInviteMode, V2NIMTeamJoinMode, V2NIMTeamAgreeMode, V2NIMTeamUpdateInfoMode, V2NIMTeamUpdateExtensionMode, V2NIMFriendAddApplicationForUI, V2NIMMessageForUI, AIUserAgentProvider, AIUserServerExt, MyUserServerExt, YxAitMsg, YxTopMessage, YxServerExt, YxReplyMsg } from "./types";
import * as storeUtils from "./utils";
import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import { LocalConversationStore } from "./localConversation";
import { NIMInitializeOptions } from "nim-web-sdk-ng/dist/v2/NIM_BROWSER_SDK/NIMInterface";
import { SubscriptionStore } from "./subscription";
import { PinInfo, PinInfos } from "./pinMsgsMap";
import { Flow } from "./queueMap";
import { IEventTracking } from "./utils";
/**
 * UI Kit 业务状态层的根入口。
 *
 * 业务代码通常会在 NIM SDK 初始化完成后创建一次该实例，并在整个应用生命周期内复用。
 * 它聚合了会话、消息、联系人、群组等各个业务 store，方便页面和组件从统一入口访问共享状态。
 */
declare class RootStore {
    /** 全局共享的 `RootStore` 单例实例。 */
    static ins: RootStore;
    /**
     * 当前业务层使用的 NIM SDK 实例。
     *
     * 只有当页面需要直接调用 UI Kit 尚未封装的 SDK 能力时，业务代码才需要直接访问它。
     */
    nim: NIM;
    /**
     * UI Kit 的本地业务配置和功能开关。
     *
     * 可通过它控制群组相关 UI、已读回执展示、AI 能力、发送前钩子等 kit 级行为。
     */
    localOptions: Required<LocalOptions>;
    /**
     * SDK 初始化选项的只读快照。
     *
     * 主要用于判断当前是否启用了云端会话等能力，便于各子 store 选择不同实现分支。
     */
    sdkOptions: Partial<NIMInitializeOptions>;
    /**
     * 连接与登录相关 store。
     *
     * 适合读取 SDK 登录态、连接态和数据同步进度，并承接登录后的首轮基础数据拉取。
     */
    connectStore: ConnectStore;
    /**
     * 好友相关 store。
     *
     * 适合用于好友列表、好友申请、好友资料备注等业务场景。
     */
    friendStore: FriendStore;
    /**
     * 消息业务 store。
     *
     * 业务 UI 通常通过它完成发消息、拉取历史消息、撤回消息、Pin 消息等消息级操作。
     */
    msgStore: MsgStore;
    /**
     * 黑名单和免打扰相关 store。
     *
     * 适合读取或修改联系人黑名单状态、点对点免打扰状态。
     */
    relationStore: RelationStore;
    /**
     * 云端会话业务 store。
     *
     * 仅在 SDK 开启云端会话能力时可用，适合用于基于云端会话的会话列表、未读数等场景。
     */
    conversationStore: ConversationStore | null;
    /**
     * 本地会话业务 store。
     *
     * 仅在 SDK 使用本地会话而非云端会话时可用，适合用于本地会话列表相关场景。
     */
    localConversationStore: LocalConversationStore | null;
    /**
     * 群组业务 store。
     *
     * 当业务页面需要管理群组、修改群设置、处理群成员相关动作时，通常通过它完成。
     */
    teamStore: TeamStore;
    /**
     * 群成员业务 store。
     *
     * 适合用于成员列表查询、邀请成员、移除成员、更新个人群名片等场景。
     */
    teamMemberStore: TeamMemberStore;
    /**
     * 系统消息 store。
     *
     * 适合用于展示好友申请、入群申请列表及其未读数。
     */
    sysMsgStore: SysMsgStore;
    /**
     * 用户业务 store。
     *
     * 业务代码通常通过它读取或更新用户资料，用于会话、联系人、成员列表等展示场景。
     */
    userStore: UserStore;
    /**
     * AI 用户与 AI Bot 相关 store。
     *
     * 适合用于 AI 会话入口、AI 用户选择、AI Bot 管理和 AI 回复状态展示。
     */
    aiUserStore: AIUserStore;
    /**
     * 在线状态订阅 store。
     *
     * 适合用于联系人在线状态展示，以及按需订阅用户状态变化。
     */
    subscriptionStore: SubscriptionStore;
    /**
     * 纯 UI 视图状态 store。
     *
     * 适合用于当前选中会话、当前通讯录页签等界面层状态管理。
     */
    uiStore: UiStore;
    /** 调试日志实例；为所有子 store 共享，用于统一输出业务日志。 */
    logger: typeof storeUtils.logger | null;
    /**
     * 文件上传与存储相关 store。
     *
     * 适合用于头像、图片、文件等资源上传场景。
     */
    storageStore: StorageStore;
    /**
     * 创建一个新的根 store 实例。
     *
     * 一般不建议业务侧直接 `new RootStore()`；更推荐通过 `RootStore.getInstance()` 获取并复用单例。
     * @param nim 已初始化完成的 NIM SDK 实例
     * @param localOptions 本地业务配置和功能开关
     * @param platform 当前运行平台名称，用于埋点上报
     */
    constructor(nim: NIM, localOptions?: Partial<LocalOptions>, platform?: string);
    /**
     * 重置各业务 store 的状态，但保留当前 `RootStore` 实例。
     *
     * 常用于退出登录、切换账号，或希望复用同一个根实例重新进入业务页面的场景。
     */
    resetState(): void;
    /**
     * 销毁根 store，并释放各子 store 持有的资源。
     *
     * 当当前 UI Kit 生命周期结束、且该实例后续不再复用时调用，例如应用彻底退出或 SDK 被永久释放。
     */
    destroy(): void;
    /**
     * 获取共享的 `RootStore` 实例。
     *
     * 建议在应用启动、且 NIM SDK 已准备完成后调用一次；后续业务代码持续复用返回的同一个实例，
     * 而不是重复创建新的根 store。
     *
     * @param nim 已初始化完成的 NIM SDK 实例。
     * @param localOptions 可选的业务配置，用于控制 kit 级功能和默认行为。
     * @param platform 运行平台名称，用于埋点上报，默认值为 `Web`。
     */
    static getInstance(nim: NIM, localOptions?: Partial<LocalOptions>, platform?: string): RootStore;
}
export default RootStore;
export type { ContactType, Relation, LocalOptions, V2NIMMessage, V2NIMSendMessageParams, V2NIMUser, V2NIMUserUpdateParams, V2NIMFriend, V2NIMFriendAddApplication, V2NIMFriendAddApplicationQueryOption, V2NIMFriendAddApplicationResult, V2NIMFriendAddParams, V2NIMFriendSetParams, V2NIMConversation, V2NIMConversationResult, V2NIMConversationForUI, V2NIMLocalConversation, V2NIMLocalConversationResult, V2NIMLocalConversationForUI, V2NIMTeam, V2NIMTeamMember, V2NIMTeamJoinActionInfo, V2NIMTeamJoinActionInfoQueryOption, V2NIMTeamJoinActionInfoResult, V2NIMTeamType, V2NIMTeamInviteMode, V2NIMTeamJoinMode, V2NIMTeamAgreeMode, V2NIMTeamUpdateInfoMode, V2NIMTeamUpdateExtensionMode, V2NIMUpdateTeamInfoParams, V2NIMTeamMemberQueryOption, V2NIMTeamMemberListResult, V2NIMUpdateSelfMemberInfoParams, V2NIMP2PMessageReadReceipt, V2NIMTeamJoinActionInfoForUI, V2NIMFriendAddApplicationForUI, V2NIMMessageForUI, AIUserAgentProvider, AIUserServerExt, MyUserServerExt, YxAitMsg, YxTopMessage, YxServerExt, YxReplyMsg, PinInfo, PinInfos, Flow, IEventTracking, };
export { observable, action, computed, autorun, reaction, when, runInAction, makeAutoObservable, } from "./mobx";
export { RootStore, ConnectStore, FriendStore, MsgStore, RelationStore, ConversationStore, LocalConversationStore, TeamStore, TeamMemberStore, SysMsgStore, UserStore, AIUserStore, UiStore, StorageStore, SubscriptionStore, };
