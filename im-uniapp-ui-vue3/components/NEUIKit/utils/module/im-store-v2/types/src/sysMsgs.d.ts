import RootStore from ".";
import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import { V2NIMFriendAddApplicationForUI, V2NIMTeamJoinActionInfoForUI } from "./types";
import * as storeUtils from "./utils";
/**
 * 管理好友申请和入群申请这两类系统消息的数据存储。
 *
 * 业务前端通常通过它驱动“新的好友申请”“新的入群申请”列表、红点角标、未读统计等界面。
 * 这里保存的是适合 UI 展示的系统消息快照，不负责直接调用 SDK 拉数据。
 */
export declare class SysMsgStore {
    private rootStore;
    private nim;
    /** 好友申请消息缓存，key 为申请双方账号组合。 */
    friendApplyMsg: Map<string, V2NIMFriendAddApplicationForUI>;
    /** 入群申请 / 邀请处理消息。 */
    teamJoinActionMsg: Map<string, V2NIMTeamJoinActionInfoForUI>;
    /** 调试日志实例；用于记录系统消息列表的本地更新。 */
    logger: typeof storeUtils.logger | null;
    constructor(rootStore: RootStore, nim: NIM);
    /**
     * 清空本地系统消息缓存。
     *
     * 适合在退出登录、切换账号或重新进入系统消息页前重置内存状态。
     */
    resetState(): void;
    /**
     * 销毁系统消息 store，并清空本地系统消息缓存。
     */
    destroy(): void;
    /**
     * 按时间倒序返回好友申请消息列表。
     *
     * 适合系统消息页直接渲染，不需要业务侧再自行排序。
     */
    get friendApplyMsgs(): V2NIMFriendAddApplicationForUI[];
    /**
     * 按时间倒序返回入群申请 / 邀请处理消息列表。
     *
     * 适合系统消息页直接渲染，不需要业务侧再自行排序。
     */
    get teamJoinActionMsgs(): V2NIMTeamJoinActionInfoForUI[];
    /**
     * 往本地缓存中写入好友申请消息。
     *
     * 不会请求服务端，适合承接好友申请列表查询结果或新增申请事件。
     * @param msgs 好友申请消息列表
     */
    addFriendApplyMsg(msgs: V2NIMFriendAddApplicationForUI[]): void;
    /**
     * 从本地缓存中移除好友申请消息。
     * @param msgs 需要删除的好友申请消息列表
     */
    deleteFriendApplyMsg(msgs: V2NIMFriendAddApplicationForUI[]): void;
    /**
     * 更新本地缓存中的好友申请消息字段。
     *
     * 这是纯内存更新，适合把已读态、处理状态等展示字段同步到界面。
     * @param msgs 待更新的好友申请消息列表
     */
    updateFriendApplyMsg(msgs: V2NIMFriendAddApplicationForUI[]): void;
    /**
     * 往本地缓存中写入入群申请或邀请处理消息。
     *
     * 不会请求服务端，适合承接入群申请列表查询结果或新增申请事件。
     * @param msgs 入群申请消息列表
     */
    addTeamJoinActionMsg(msgs: V2NIMTeamJoinActionInfoForUI[]): void;
    /**
     * 从本地缓存中移除入群申请或邀请处理消息。
     * @param msgs 需要删除的入群申请消息列表
     */
    deleteTeamJoinActionMsg(msgs: V2NIMTeamJoinActionInfoForUI[]): void;
    /**
     * 更新本地缓存中的入群申请或邀请处理消息字段。
     *
     * 这是纯内存更新，适合同步已读态、审批状态等展示字段。
     * @param msgs 待更新的入群申请消息列表
     */
    updateTeamJoinActionMsg(msgs: V2NIMTeamJoinActionInfoForUI[]): void;
    /** 获取当前未读的好友申请消息数量。 */
    getUnreadFriendApplyMsgsCount(): number;
    /** 获取当前未读的入群申请 / 邀请处理消息数量。 */
    getUnreadTeamJoinActionMsgsCount(): number;
    /** 获取系统消息总未读数。 */
    getTotalUnreadMsgsCount(): number;
    /**
     * 将当前所有系统申请消息统一标记为已读。
     *
     * 这是纯内存更新，适合用户进入系统消息页后直接调用。
     */
    setAllApplyMsgRead(): void;
    /** 为入群申请或邀请处理消息生成本地缓存 key。 */
    createTeamJoinActionMsgKey(msg: V2NIMTeamJoinActionInfoForUI): string;
    /** 为好友申请消息生成本地缓存 key。 */
    createFriendApplyMsgKey(msg: V2NIMFriendAddApplicationForUI): string;
}
