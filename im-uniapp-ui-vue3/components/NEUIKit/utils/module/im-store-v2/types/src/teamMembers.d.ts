import RootStore from ".";
import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import { V2NIMTeamType } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMTeamService";
import { V2NIMTeamMember, V2NIMTeamMemberListResult, V2NIMTeamMemberQueryOption, V2NIMUpdateSelfMemberInfoParams } from "./types";
import * as storeUtils from "./utils";
/**
 * 管理群成员列表和群成员管理动作的数据存储。
 *
 * 业务前端通常通过它完成拉取群成员、邀请成员入群、移除成员、更新自己的群昵称或群名片等场景。
 * 它按 `teamId -> accountId -> member` 的结构缓存群成员数据，方便群详情页和成员列表页直接读取。
 */
export declare class TeamMemberStore {
    private rootStore;
    private nim;
    /** 群成员缓存，第一层 key 为 `teamId`，第二层 key 为成员账号。 */
    teamMembers: Map<string, Map<string, V2NIMTeamMember>>;
    /** 调试日志实例；用于记录群成员查询和管理动作。 */
    logger: typeof storeUtils.logger | null;
    constructor(rootStore: RootStore, nim: NIM);
    /**
     * 清空当前缓存的群成员数据。
     *
     * 适合在退出登录、切换账号或重新拉取群成员前调用。
     */
    resetState(): void;
    /**
     * 销毁群成员 store，并清空当前缓存的群成员数据。
     */
    destroy(): void;
    /**
     * 邀请成员加入群组。
     *
     * 会调用 SDK 发起邀请；成功后的成员变更通常由群成员事件回调同步到本地缓存。
     * @param options 入群邀请参数
     * @param options.teamId 群组 ID
     * @param options.type 群类型，默认高级群
     * @param options.accounts 待邀请加入群的账号列表
     * @param options.ps 邀请附言
     */
    addTeamMemberActive(options: {
        teamId: string;
        type?: V2NIMTeamType;
        accounts: string[];
        ps?: string;
    }): Promise<void>;
    /**
     * 将指定成员移出群组。
     *
     * 会调用 SDK 执行踢人操作；成功后的成员列表更新通常由群成员事件回调同步到本地缓存。
     * @param options 踢人参数
     * @param options.teamId 群组 ID
     * @param options.type 群类型，默认高级群
     * @param options.accounts 待移出群的账号列表
     */
    removeTeamMemberActive(options: {
        teamId: string;
        type?: V2NIMTeamType;
        accounts: string[];
    }): Promise<void>;
    /**
     * 获取指定群组的成员列表。
     *
     * 会调用 SDK 拉取成员数据，并把返回结果写入本地 `teamMembers` 缓存。
     * @param options 查询参数
     * @param options.teamId 群组 ID
     * @param options.queryOption 成员查询选项
     * @param options.type 群类型，默认高级群
     */
    getTeamMemberActive(options: {
        teamId: string;
        queryOption: V2NIMTeamMemberQueryOption;
        type?: V2NIMTeamType;
    }): Promise<V2NIMTeamMemberListResult>;
    /**
     * 更新当前登录用户在群中的成员信息。
     *
     * 常用于修改自己的群昵称、群名片、扩展字段等资料。
     * @param options 更新参数
     * @param options.teamId 群组 ID
     * @param options.type 群类型，默认高级群
     * @param options.memberInfo 待更新的个人群成员资料
     */
    updateMyMemberInfoActive(options: {
        teamId: string;
        type?: V2NIMTeamType;
        memberInfo: V2NIMUpdateSelfMemberInfoParams;
    }): Promise<void>;
    /**
     * 直接覆盖设置某个群的本地成员缓存。
     *
     * 不会请求服务端，通常用于成员列表查询结果整体回填。
     * @param teamId 群组 ID
     * @param members 群成员列表
     */
    setTeamMembers(teamId: string, members: V2NIMTeamMember[]): void;
    /**
     * 向某个群的本地成员缓存中追加成员。
     *
     * 适合承接邀请入群、成员加入等事件回调的本地同步。
     * @param teamId 群组 ID
     * @param members 群成员列表
     */
    addTeamMember(teamId: string, members: V2NIMTeamMember[]): void;
    /**
     * 从某个群的本地成员缓存中移除成员。
     *
     * 不传 `accounts` 时会直接清空该群的全部成员缓存。
     * @param teamId 群组 ID
     * @param accounts 待移除的成员账号列表
     */
    removeTeamMember(teamId: string, accounts?: string[]): void;
    /**
     * 更新某个群的本地成员缓存字段。
     *
     * 这是纯内存更新，适合承接成员资料变更事件后的界面刷新。
     * @param teamId 群组 ID
     * @param members 待合并更新的群成员字段列表
     */
    updateTeamMember(teamId: string, members: Partial<V2NIMTeamMember>[]): void;
    /**
     * 从本地缓存中读取群成员信息。
     *
     * 不传 `accounts` 时返回该群当前已缓存的全部成员。
     * @param teamId 群组 ID
     * @param accounts 待筛选的成员账号列表
     */
    getTeamMember(teamId: string, accounts?: string[]): V2NIMTeamMember[];
}
