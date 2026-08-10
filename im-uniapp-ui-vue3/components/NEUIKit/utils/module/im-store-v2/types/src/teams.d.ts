import RootStore from ".";
import { LocalOptions, V2NIMTeam, V2NIMTeamJoinActionInfo, V2NIMTeamJoinActionInfoQueryOption, V2NIMTeamJoinActionInfoResult, V2NIMUpdateTeamInfoParams } from "./types";
import { NIM, V2NIMConst } from "nim-web-sdk-ng/dist/esm/nim";
import { V2NIMTeamAgreeMode, V2NIMTeamChatBannedMode, V2NIMTeamInviteMode, V2NIMTeamJoinMode, V2NIMTeamMemberRole, V2NIMTeamType, V2NIMTeamUpdateExtensionMode, V2NIMTeamUpdateInfoMode } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMTeamService";
import * as storeUtils from "./utils";
/**
 * 管理群组资料和群组常见业务动作的数据存储。
 *
 * 业务前端通常通过它完成建群、申请入群、退群、解散群、修改群资料、处理邀请与申请等流程。
 * 其中 `...Active` 方法大多会调用 SDK / 服务端；`addTeam`、`updateTeam`、`removeTeam` 主要负责同步本地内存状态。
 */
export declare class TeamStore {
    private rootStore;
    private nim;
    private localOptions;
    /** 群资料缓存，key 为 `teamId`。 */
    teams: Map<string, V2NIMTeam>;
    /** 调试日志实例；用于记录群资料同步、群操作和群事件回调。 */
    logger: typeof storeUtils.logger | null;
    constructor(rootStore: RootStore, nim: NIM, localOptions: LocalOptions);
    /**
     * 清空本地群资料缓存。
     *
     * 适合在退出登录、切换账号或重建业务状态时调用。
     */
    resetState(): void;
    /**
     * 销毁群组 store，并注销群组相关事件监听。
     */
    destroy(): void;
    /**
     * 往本地内存中写入群组资料。
     *
     * 不会请求服务端，通常在群组同步回调、建群成功回调或列表查询后调用。
     * @param teams 群组数据
     */
    addTeam(teams: V2NIMTeam[]): void;
    /**
     * 从本地内存中移除群组资料。
     *
     * 适用于退群、解散群或同步得知当前账号不再属于该群后的本地清理。
     * @param teamIds 群 id 数组
     */
    removeTeam(teamIds: string[]): void;
    /**
     * 更新本地内存中的群组资料。
     *
     * 这是纯内存更新，适合承接群资料变更回调后的界面刷新。
     * @param data 群组信息
     */
    updateTeam(data: Partial<V2NIMTeam>[]): void;
    /**
     * 创建一个新群组。
     *
     * 会调用 SDK 发起建群请求，适合业务“发起群聊”或“创建项目群”场景。
     * 成功后群资料会通过返回值和后续同步事件进入本地缓存。
     * @param __namedParameters.accounts 首批拉入群的成员账号列表
     * @param __namedParameters.type 群类型，默认高级群
     * @param __namedParameters.avatar 群头像
     * @param __namedParameters.name 群名称
     * @param __namedParameters.intro 群简介
     * @param __namedParameters.serverExtension 群扩展字段
     * @param __namedParameters.joinMode 入群方式，不传时使用本地初始化配置中的默认入群策略
     * @param __namedParameters.agreeMode 邀请或申请后的通过方式，不传时使用本地初始化配置中的默认审批策略
     * @param __namedParameters.inviteMode 邀请权限配置，决定成员是否可直接邀请他人入群，不传时使用本地初始化配置
     * @param __namedParameters.updateInfoMode 群资料编辑权限配置，决定谁可以修改群名称等基础资料，不传时使用本地初始化配置
     * @param __namedParameters.updateExtensionMode 群扩展字段编辑权限配置，决定谁可以修改业务扩展字段，不传时使用本地初始化配置
     */
    createTeamActive({ accounts, type, avatar, name, intro, serverExtension, joinMode, agreeMode, inviteMode, updateInfoMode, updateExtensionMode, }: {
        accounts: string[];
        type?: V2NIMTeamType;
        avatar: string;
        name: string;
        intro?: V2NIMTeam["intro"];
        serverExtension?: V2NIMTeam["serverExtension"];
        joinMode?: V2NIMTeamJoinMode;
        agreeMode?: V2NIMTeamAgreeMode;
        inviteMode?: V2NIMTeamInviteMode;
        updateInfoMode?: V2NIMTeamUpdateInfoMode;
        updateExtensionMode?: V2NIMTeamUpdateExtensionMode;
    }): Promise<V2NIMTeam>;
    /**
     * 发起入群申请。
     *
     * 会调用 SDK 提交申请；是否立即入群取决于群的入群策略，后续结果通常通过系统消息或群事件体现。
     * @param teamId 群 id
     * @param type 群类型，默认高级群
     */
    applyTeamActive(teamId: string, type?: V2NIMTeamType): Promise<V2NIMTeam>;
    /**
     * 主动退群。
     *
     * 会调用 SDK 离开群组；成功后群资料和群成员等本地数据会通过后续事件被清理。
     * @param teamId 群 id
     * @param type 群类型，默认高级群
     */
    leaveTeamActive(teamId: string, type?: V2NIMTeamType): Promise<void>;
    /**
     * 解散群组。
     *
     * 适合群主执行“解散群聊”操作。会调用 SDK，成功后依赖后续群解散事件清理本地状态。
     * @param teamId 群 id
     * @param type 群类型，默认高级群
     */
    dismissTeamActive(teamId: string, type?: V2NIMTeamType): Promise<void>;
    /**
     * 转让群主身份。
     *
     * 会调用 SDK 修改群主；`leave` 未传时使用本地默认配置，适合业务提供“转让并退出”或“仅转让”两种流程。
     * @param options 转让群主参数
     * @param options.teamId 群 id
     * @param options.type 群类型，默认高级群
     * @param options.account 目标新群主账号
     * @param options.leave 转让后自己是否退出群；不传时使用本地默认配置
     */
    transferTeamActive({ teamId, type, account, leave, }: {
        teamId: string;
        type?: V2NIMTeamType;
        account: string;
        leave?: boolean;
    }): Promise<void>;
    /**
     * 设置群禁言模式。
     *
     * 会调用 SDK 修改群级别的发言限制，适合群管理页直接操作。
     * @param options.teamId 群 id
     * @param options.type 群类型，默认高级群
     * @param options.chatBannedMode 禁言模式
     */
    setTeamChatBannedActive(options: {
        teamId: string;
        type?: V2NIMTeamType;
        chatBannedMode: V2NIMTeamChatBannedMode;
    }): Promise<void>;
    /**
     * 更新群资料。
     *
     * 会调用 SDK 修改群名称、头像、公告或扩展字段等信息；成功后的最终群资料以后续同步事件回写为准。
     * @param options.teamId 群 id
     * @param options.type 群类型，默认高级群
     * @param options.info 待更新的群资料
     */
    updateTeamActive(options: {
        teamId: string;
        type?: V2NIMTeamType;
        info: V2NIMUpdateTeamInfoParams;
    }): Promise<void>;
    /**
     * 获取群资料，优先读本地内存。
     *
     * 如果当前账号已经在本地缓存中持有该群资料，会直接返回；否则会退化到服务端拉取。
     * @param teamId 群 id
     * @param type 群类型，默认高级群
     */
    getTeamActive(teamId: string, type?: V2NIMTeamType): Promise<V2NIMTeam>;
    /**
     * 强制从服务端获取最新群资料。
     *
     * 适合业务打开群详情页时拉取最新数据。注意该方法不会自动把结果写入 `teams`，因为查询目标可能是当前未加入的群。
     * @param teamId 群 id
     * @param type 群类型，默认高级群
     */
    getTeamForceActive(teamId: string, type?: V2NIMTeamType): Promise<V2NIMTeam>;
    /**
     * 设置群消息免打扰模式。
     *
     * 会调用 SDK 更新当前账号对该群的消息提醒配置，常用于群详情页的提醒开关。
     * @param teamId 群 id
     * @param teamType 群类型，默认高级群
     * @param muteMode 消息免打扰模式
     */
    setTeamMessageMuteModeActive(teamId: string, teamType: V2NIMTeamType, muteMode: V2NIMConst.V2NIMTeamMessageMuteMode): Promise<void>;
    /**
     * 受邀方接受入群邀请。
     *
     * 会调用 SDK 处理一条待办邀请；成功后通常会收到入群事件并同步本地群资料。
     * @param options 邀请动作信息
     */
    acceptTeamInviteActive(options: V2NIMTeamJoinActionInfo): Promise<void>;
    /**
     * 受邀方拒绝入群邀请。
     *
     * 会调用 SDK 处理一条待办邀请，常用于系统消息页或群邀请卡片。
     * @param options 邀请动作信息
     */
    rejectTeamInviteActive(options: V2NIMTeamJoinActionInfo): Promise<void>;
    /**
     * 管理员通过一条入群申请。
     *
     * 会调用 SDK 处理待审核申请，成功后申请人会加入群组。
     * @param options 入群申请动作信息
     */
    acceptJoinApplicationActive(options: V2NIMTeamJoinActionInfo): Promise<void>;
    /**
     * 管理员拒绝一条入群申请。
     *
     * 会调用 SDK 更新申请状态，适合群管理后台或群申请列表页。
     * @param options 入群申请动作信息
     */
    rejectTeamApplyActive(options: V2NIMTeamJoinActionInfo): Promise<void>;
    /**
     * 批量设置群成员角色。
     *
     * 会调用 SDK 更新成员角色，适合群主管理员页做设为管理员、取消管理员等操作。
     * @param options.teamId 群 id
     * @param options.type 群类型，默认高级群
     * @param options.accounts 需要更新角色的成员账号列表
     * @param options.role 目标角色
     */
    updateTeamMemberRoleActive(options: {
        teamId: string;
        type?: V2NIMTeamType;
        accounts: string[];
        role: V2NIMTeamMemberRole;
    }): Promise<void>;
    /**
     * 获取群组邀请 / 申请动作列表。
     *
     * 会调用 SDK 拉取系统侧的入群动作记录，并同步写入 `sysMsgStore`，适合系统消息页直接使用。
     */
    getTeamJoinActionInfoListActive(options: V2NIMTeamJoinActionInfoQueryOption): Promise<V2NIMTeamJoinActionInfoResult>;
    /**
     * 获取当前账号已加入的群组列表。
     *
     * 会调用 SDK 查询，并把结果写入本地 `teams` 缓存，适合初始化通讯录或群列表页面。
     */
    getJoinedTeamListActive(): Promise<V2NIMTeam[]>;
    /**
     * 获取当前账号在某个群里的消息免打扰状态。
     *
     * 返回值来自 SDK 当前状态，适合群详情页初始化提醒开关。
     * @param teamId 群 id
     * @param teamType 群组类型，包括高级群和超大群
     */
    getTeamMessageMuteModeActive(teamId: any, teamType: V2NIMTeamType): Promise<V2NIMConst.V2NIMTeamMessageMuteMode>;
    private _onReceiveTeamJoinActionInfo;
    private _onSyncFailed;
    private _onSyncFinished;
    private _onSyncStarted;
    private _onTeamCreated;
    private _onTeamDismissed;
    private _onTeamInfoUpdated;
    private _onTeamJoined;
    private _onTeamLeft;
    private _onTeamMemberInfoUpdated;
    private _onTeamMemberJoined;
    private _onTeamMemberKicked;
    private _onTeamMemberLeft;
    private _handleRemoveTeam;
    private _onTeamMessageMuteModeChanged;
}
