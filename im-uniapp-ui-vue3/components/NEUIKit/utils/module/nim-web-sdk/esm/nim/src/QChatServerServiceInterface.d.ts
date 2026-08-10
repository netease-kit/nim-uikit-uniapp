import { QChatChannelUnreadInfo, QChatServerUnreadInfo } from './QChatChannelServiceInterface';
/**
 * 调用方式:
 * ```js
 * qchat.qchatServer.createServer(options)
 * ```
 */
export interface QChatServerServiceInterface {
    /**
     * 创建服务器，返回值为服务器基本信息
     *
     * #### 影响范围
     * - 服务器创建者，及多端同步账号，收到 type = {@link ESystemMessageType.serverCreate} 的圈组内置系统通知
     * - 服务器创建者，及多端同步账号，收到 type = {@link ESystemMessageType.serverEnterLeave} 的圈组内置系统通知
     *
     * @example
     * ```js
     * const serverInfo = await qchat.qchatServer.createServer({
     *    name: '美食圈',
     *    // 邀请用户加入时，是否需要用户同意。0: 需要，1: 不需要
     *    inviteMode: 0,
     *    // 申请加入时，是否需要管理员同意。0: 不需要，1: 需要
     *    applyMode: 1
     * })
     * ```
     */
    createServer(options: CreateServerOptions): Promise<ServerInfo>;
    /**
     * 删除服务器。仅服务器创建者可删除服务器。
     *
     * #### 影响范围
     * - 服务器内所有成员收到 type = {@link ESystemMessageType.serverRemove} 的圈组内置系统通知
     * - 服务器内所有成员收到 type = {@link ESystemMessageType.serverEnterLeave} 的圈组内置系统通知
     */
    deleteServer(options: DeleteServerOptions): Promise<void>;
    /**
     * 更新服务器信息。仅服务器创建者可更新服务器信息。
     *
     * #### 影响范围
     * - 服务器内所有成员收到 type = {@link ESystemMessageType.serverUpdate} 的圈组内置系统通知
     */
    updateServer(options: UpdateServerOptions): Promise<ServerInfo>;
    /**
     * 根据服务器ID，查询服务器信息
     *
     * - 可以查询当前账号并未加入的服务器
     * - 只有存在的服务器才会在结果中返回
     */
    getServers(options: GetServersOptions): Promise<ServerInfo[]>;
    /**
     * 分页查询服务器列表。
     *
     * - 该函数只会查询当前账号加入的服务器
     * - 查询从 `options.timestamp` 开始查，查找 `createTime` 小于 `options.timestamp` 的服务器，直到查完，或者达到 `options.limit`
     *
     * @example
     * ```js
     * const limit = 10
     * let list = []
     *
     * // 第一页。timetag设置为0，表示最新时间
     * let res = await qchat.qchatServer.getServersByPage({
     *  "timestamp": 0,
     *  "limit": limit
     * })
     *
     * list = [...list, ...res.datas]
     * while (res.listQueryTag.hasMore) {
     *  res = await qchat.qchatServer.getServersByPage({
     *    "timestamp": res.listQueryTag.nextTimetag,
     *    "limit": limit
     *  })
     *  list = [...list, ...res.datas]
     * }
     * ```
     */
    getServersByPage(options: GetServersByPageOptions): Promise<GetServersByPageResult>;
    /**
     * 邀请用户进入服务器
     *
     * #### 影响范围
     * - 若服务器邀请模式为无须同意
     *     - 被邀请人加入服务器
     *     - 服务器内所有成员收到 type = {@link ESystemMessageType.serverMemberInviteDone} 的圈组内置系统通知
     *     - 被邀请者收到 type = {@link ESystemMessageType.serverEnterLeave} 的圈组内置系统通知
     * - 若服务器邀请模式为需要同意
     *     - 被邀请者收到 type = {@link ESystemMessageType.serverMemberInvite} 的圈组内置系统通知
     *     - 被邀请者通过 {@link QChatServerServiceInterface.acceptServerInvite}，或者 {@link QChatServerServiceInterface.rejectInviteServer} 回应
     */
    inviteServerMembers(options: InviteServerMembersOptions): Promise<InviteServerMembersResult>;
    /**
     * 接受进入服务器邀请
     *
     * 管理员调用 {@link QChatServerServiceInterface.inviteServerMembers | inviteServerMembers} 邀请用户进入服务器
     * 被邀请人收到 type = {@link ESystemMessageType.serverMemberInvite} 的圈组内置系统通知。随后，被邀请人通过该接口同意申请
     *
     * #### 影响范围
     * - 服务器内所有成员收到 type = {@link ESystemMessageType.serverMemberInviteAccept} 的圈组内置系统通知
     * - 接收邀请者收到 type = {@link ESystemMessageType.serverEnterLeave} 的圈组内置系统通知
     *
     * @example
     * ```js
     * qchat.qchatServer.acceptServerInvite({
     *  // 圈组服务器ID
     *  "serverId": "10390564",
     *  // 邀请者accid
     *  "accid": "zk1",
     *  "recordInfo": {
     *    // 系统通知的 requestId
     *    "requestId": "14159103"
     *  }
     * })
     * ```
     */
    acceptServerInvite(options: AcceptServerInviteOptions): Promise<void>;
    /**
     * 拒绝入群邀请
     *
     * 管理者通过 {@link QChatServerServiceInterface.inviteServerMembers | inviteServerMembers} 邀请用户进入服务器后，被邀请人可以通过该函数拒绝邀请
     *
     * #### 影响范围
     * - 邀请者收到 type = {@link ESystemMessageType.serverMemberInviteReject} 的圈组内置系统通知
     */
    rejectInviteServer(options: RejectServerInviteOptions): Promise<void>;
    /**
     * 申请加入服务器。如果申请人被封禁 {@link QChatServerServiceInterface.banServerMember}，调用此函数会收到 403 错误
     *
     * #### 影响范围
     * - 若服务器模式为申请者可以直接加入
     *     - 申请人加入服务器
     *     - 服务器内所有成员收到 type = {@link ESystemMessageType.serverMemberApplyDone} 的圈组内置系统通知
     *     - 申请人收到 type = {@link ESystemMessageType.serverEnterLeave} 的圈组内置系统通知
     * - 若服务器模式为申请者需要同意才可以加入
     *     - 服务器内拥有 “服务器申请权限” 的用户，会收到 type = {@link ESystemMessageType.serverMemberApply} 的圈组内置系统通知
     *     - 拥有权限的用户，通过 {@link QChatServerServiceInterface.acceptServerApply | acceptServerApply}同意申请，或者通过 {@link QChatServerServiceInterface.rejectServerApply | rejectServerApply} 拒绝申请
     */
    applyServerJoin(options: ApplyServerJoinOptions): Promise<QChatServerApplyRecordInfo>;
    /**
     * 同意服务器加入申请
     *
     * 申请人调用 {@link QChatServerServiceInterface.applyServerJoin | applyServerJoin} 申请加入服务器。
     * 拥有 “服务器申请权限” 的用户，收到 type = {@link ESystemMessageType.serverMemberApply} 的圈组内置系统通知。随后，权限用户通过该接口同意申请
     *
     * #### 影响范围
     * - 同意申请后，服务器内所有用户收到 type = {@link ESystemMessageType.serverMemberApplyAccept} 的圈组内置系统通知
     * - 申请人收到 type = {@link ESystemMessageType.serverEnterLeave} 的圈组内置系统通知
     *
     * @example
     * ```js
     * qchat.qchatServer.acceptServerApply({
     *  // 圈组服务器ID
     *  "serverId": "10390563",
     *  // 申请人accid
     *  "accid": "zk2",
     *  "recordInfo": {
     *    // 系统通知的 requestId
     *    "requestId": "14159101"
     *  }
     * })
     * ```
     */
    acceptServerApply(options: AcceptServerApplyOptions): Promise<void>;
    /**
     * 拒绝入群申请
     *
     * 申请人调用 {@link QChatServerServiceInterface.applyServerJoin | applyServerJoin} 申请加入服务器后，群管理者可以通过该函数拒绝申请
     *
     * #### 影响范围
     * - 申请人收到 type = {@link ESystemMessageType.serverMemberApplyReject} 的圈组内置系统通知
     */
    rejectServerApply(options: RejectServerApplyOptions): Promise<void>;
    /**
     * 踢除服务器成员
     *
     * #### 影响范围
     * - 服务器内成员收到 type = {@link ESystemMessageType.serverMemberKick} 的圈组内置系统通知
     * - 被踢者收到 type = {@link ESystemMessageType.serverEnterLeave} 的圈组内置系统通知
     */
    kickServerMembers(options: KickServerMembersOptions): Promise<void>;
    /**
     * 主动离开服务器。服务器创建者离群会报 403 错误。
     *
     * #### 影响范围
     * - 服务器内成员收到 type = {@link ESystemMessageType.serverMemberLeave} 的内置系统通知
     * - 主动离群者收到 type = {@link ESystemMessageType.serverEnterLeave} 的内置系统通知
     */
    leaveServer(options: LeaveServerOptions): Promise<void>;
    /**
     * 订阅服务器的人员变更、权限变更等消息
     */
    subscribeServer(options: SubscribeServerOptions): Promise<SubscribeServerResult | void>;
    /**
     * 修改他人服务器成员信息。仅管理员可操作，管理员用于修改他人在服务器中的成员信息
     *
     * #### 影响范围
     * - 服务器内成员收到 type = {@link ESystemMessageType.serverMemberUpdate} 的内置系统通知
     */
    updateServerMemberInfo(options: UpdateServerMemberInfoOptions): Promise<MemberInfo>;
    /**
     * 修改自己在服务器中的成员信息
     *
     * #example
     * ```js
     * const res = await qchat.qchatServer.updateMyMemberInfo({
     *   "serverId": "10390609",
     *   "accid": qchat.account,
     *   "nick": "my nick",
     *   "avatar": "https://avatar.com/xxx.png",
     *   "ext": "extension"
     * })
     * ```
     */
    updateMyMemberInfo(options: UpdateMyMemberInfoOptions): Promise<MemberInfo>;
    /**
     * 根据用户ID，查询服务器下该用户的具体信息
     *
     * @example
     * ```js
     * const members = await qchat.qchatServer.getServerMemberInfo({
     *   "accids": [
     *     {
     *       "accid": "autotest1",
     *       "serverId": "10390582"
     *     },
     *     {
     *       "accid": "autotest2",
     *       "serverId": "10390582"
     *     }
     *   ]
     * })
     * ```
     */
    getServerMembers(options: GetServerMembersOptions): Promise<MemberInfo[]>;
    /**
     * 分页查询服务器成员。从 timetag 开始逆序查找。查找 createTime 小于 timetag 的成员，直到查完，或者达到 limit。
     *
     * 若 timetag = 0，表示从服务器当前时间开始逆序查询。注意，被ban成员不会被查到
     *
     * @example
     * ```js
     * const serverId = '10390581'
     * const limit = 10
     * let list = []
     *
     * // 第一页。timetag设置为0，表示最新时间
     * let res = await qchat.qchatServer.getServerMembersByPage({
     *  "serverId": serverId,
     *  "timetag": 0,
     *  "limit": limit
     * })
     *
     * list = [...list, ...res.datas]
     * while (res.listQueryTag.hasMore) {
     *  res = await qchat.qchatServer.getServerMembersByPage({
     *    "serverId": serverId,
     *    "timetag": res.listQueryTag.nextTimetag,
     *    "limit": limit
     *  })
     *  list = [...list, ...res.datas]
     * }
     * ```
     */
    getServerMembersByPage(options: GetServerMembersByPageOptions): Promise<GetServerMembersByPageResult>;
    /**
     * 拥有封禁他人权限（QChatRoleAuth.banServerMember）的用户可调用 {@link QChatServerServiceInterface.banServerMember | banServerMember} 封禁服务器成员。
     *
     * - 不在服务器内的成员不能通过此方法禁止
     * - 游客也无法通过此方法禁止
     *
     * #### 影响范围
     * - 被封禁的成员将直接被踢出服务器，且不能再申请加入服务器或被邀请加入服务器。
     * - 服务器内所有成员收到 type = {@link ESystemMessageType.serverMemberKick} 的圈组内置系统通知
     * - 被封禁者收到 type = {@link ESystemMessageType.serverEnterLeave} 的圈组内置系统通知
     */
    banServerMember(options: BanServerMemberOptions): Promise<void>;
    /**
     * 解封服务器成员。解除封禁后，需要重新通过申请，或者邀请的方式加入服务器
     */
    unbanServerMember(options: UnbanServerMemberOptions): Promise<void>;
    /**
     * 分页获取封禁成员。从 timetag 开始逆序查找。查找 createTime 小于 timetag 的封禁记录，直到查完，或者达到 limit。
     *
     * 若 timetag = 0，表示从服务器当前时间开始逆序查找
     *
     * @example
     * ```js
     * const serverId = '10390581'
     * const limit = 10
     * let list = []
     *
     * // 第一页。timetag设置为0，表示最新时间
     * let res = await qchat.qchatServer.getBannedMembersByPage({
     *  "serverId": serverId,
     *  "timetag": 0,
     *  "limit": limit
     * })
     *
     * list = [...list, ...res.datas]
     * while (res.listQueryTag.hasMore) {
     *  res = await qchat.qchatServer.getBannedMembersByPage({
     *    "serverId": serverId,
     *    "timetag": res.listQueryTag.nextTimetag,
     *    "limit": limit
     *  })
     *  list = [...list, ...res.datas]
     * }
     *
     * ```
     */
    getBannedMembersByPage(options: GetBannedMembersByPageOptions): Promise<GetBannedMembersByPageResult>;
    /**
     * 通过关键词、时间范围、服务器类型等条件，搜索所有符合要求的服务器
     *
     * @example
     * ```
     * const res = await qchat.qchatServer.serverSearchByPage({
     *   "keyword": "网易云信",
     *   "startTime": 0,
     *   "endTime": 1698911671817,
     *   "limit": 100,
     *   // 即 createServer 时设置的 searchType
     *   "serverType": [0, 1],
     *   "order": "ASC",
     *   // square 表示全局搜索服务器
     *   // person 表示搜索个人加入的服务器
     *   "searchType": "square",
     *   "sort": "createTime"
     * })
     * ```
     */
    serverSearchByPage(options: ServerSearchByPageOptions): Promise<ServerSearchByPageResult>;
    /**
     * 通过keyword，搜索服务器内的群成员
     *
     * @example
     * ```js
     * const res = await qchat.qchatServer.serverMemberSearchByPage({
     *   "serverId": "10390605",
     *   "keyword": "abc",
     *   "limit": 100
     * })
     * ```
     */
    serverMemberSearchByPage(options: ServerMemberSearchByPageOptions): Promise<MemberInfo[]>;
    /**
     * 生成一个邀请码。可以通过 `ttl` 设置邀请码有效时间。若不设置，默认有效期为 30 天。
     *
     * 有效期内，任何人都可以通过 {@link QChatServerServiceInterface.joinByInviteCode | joinByInviteCode} 加入服务器。过期后，邀请码失效。
     *
     * @example
     * ```js
     * const res = await qchat.qchatServer.generateInviteCode({
     *  "serverId": "10390581",
     *  "ttl": 86400000
     * })
     *
     * // 将 Code 发给其它端后，其它端加入频道
     * await qchat.qchatServer.joinByInviteCode({
     *    "serverId": res.serverId,
     *    "inviteCode": res.inviteCode,
     *    "ps": "xxx"
     * })
     * ```
     */
    generateInviteCode(options: QChatServerGenerateInviteCodeOptions): Promise<QChatServerInviteCode>;
    /**
     * 根据邀请码加入服务器。如果邀请码过期，会收到 508 错误
     *
     * #### 影响范围
     * - 无论服务器申请模式如何，通过邀请码都可以直接加入服务器
     * - 服务器内所有成员收到 type = {@link ESystemMessageType.serverMemberJoinByInviteCode} 的圈组内置系统通知
     * - 申请者收到 type = {@link ESystemMessageType.serverEnterLeave} 的圈组内置系统通知
     *
     * @example
     * ```js
     * qchat.qchatServer.joinByInviteCode({
     *  "serverId": "10390581",
     *  "inviteCode": "2F027WFKEN",
     *  "ps": "xxx"
     * })
     * ```
     */
    joinByInviteCode(options: QChatServerJoinByInviteCodeOptions): Promise<void>;
    /**
     * 下面这个接口不确定怎么用，测试了一下，返回的数据都是空的
     */
    /**
     * 查询某服务器下的申请和邀请进入的历史记录
     */
    getInviteApplyRecordOfServer(options: QChatServerGetInviteApplyRecordOfServerOptions): Promise<QChatServerInviteApplyRecord[]>;
    /**
     * 查询自己申请加入服务器，以及被邀请加入服务器的历史记录。
     *
     * 初次请求时，cursor 可以不填写。下次请求时，使用返回纪录的 `recordId` 作为 `cursor`。
     */
    getInviteApplyRecordOfSelf(options: QChatServerGetInviteApplyRecordOfSelfOptions): Promise<QChatServerInviteApplyRecord[]>;
    /**
     * 清空服务器下所有频道的未读数
     */
    markRead(options: QChatServerMarkReadOptions): Promise<QChatServerMarkReadResult>;
    /**
     * 订阅服务器下的所有频道。
     *
     * 圈组订阅机制请查看文档: [圈组订阅机制](https://doc.yunxin.163.com/messaging-enhanced/docs/jc0Mzg1NDA?platform=web)
     */
    subscribeAllChannel(options: SubscribeAllChannelOptions): Promise<SubscribeAllChannelResult>;
    /**
     * 以游客身份加入服务器。请查看文档：[游客功能](https://doc.yunxin.163.com/messaging-enhanced/docs/zEyMjgyMzQ?platform=web)
     *
     * 注: 目前 IM 服务端限定最多加 10 个
     *
     * #### 影响范围
     * - 以游客身份加入服务器并不会触发圈组内置系统回调
     */
    enterAsVisitor(options: {
        serverIds: string[];
    }): Promise<{
        failedServers: string[];
    }>;
    /**
     * 以游客身份离开服务器。请查看文档：[游客功能](https://doc.yunxin.163.com/messaging-enhanced/docs/zEyMjgyMzQ?platform=web)
     *
     * 注: 目前 IM 服务端限定最多加 10 个
     *
     * #### 影响范围
     * - 以游客身份离开服务器并不会触发圈组内置系统回调
     */
    leaveAsVisitor(options: {
        serverIds: string[];
    }): Promise<{
        failedServers: string[];
    }>;
    /**
     * 以游客身份订阅服务器
     *
     * 圈组订阅机制请查看文档: [圈组订阅机制](https://doc.yunxin.163.com/messaging-enhanced/docs/jc0Mzg1NDA?platform=web)
     */
    subscribeAsVisitor(options: NIMEQChatServerSubscribeAsVisitorOptions): Promise<{
        failedServers: string[];
    }>;
}
/**
 * qchatServer 模块的监听事件
 *
 * Example：
 *
 * const instance = new SDK()
 *
 * instance.qchatServer.on('serverUnreadInfo', msg => { console.log(msg) }
 */
export interface NIMEQChatServerServiceListener {
    /**
     * 收到服务器总消息未读通知
     */
    serverUnreadInfo: [msg: QChatServerUnreadInfo];
}
export interface NIMEQChatServerSubscribeAsVisitorOptions {
    /**
     * 操作类型. 1 订阅; 2 取消订阅
     */
    opeType: 1 | 2;
    /**
     * 订阅模式
     *
     * 注: 订阅服务器目前默认且只能固定传 7
     */
    type?: 7;
    /**
     * 要订阅的服务器信息
     */
    serverIds: string[];
}
export interface SubscribeAllChannelOptions {
    /**
     * 订阅类型 :
     *
     * 1.订阅某个channel的【消息】/【通知】
     *
     * 2.订阅某个channel的【消息未读数】/【通知】
     *
     * 3.订阅某个channel的【消息未读状态】/【通知】
     */
    type: number;
    /**
     * 服务器id列表,最多十个
     */
    serverIds: string[];
}
export interface SubscribeAllChannelResult {
    /**
     * 订阅成功频道的未读数详情
     */
    unreadInfos: QChatChannelUnreadInfo[];
    /**
     * 订阅失败服务器id列表
     */
    failServerIds: string[];
}
export interface QChatServerMarkReadOptions {
    /**
     * 需要清空服务器id列表
     */
    serverIds: string[];
}
export interface QChatServerMarkReadResult {
    /**
     * 清空成功服务器id列表
     */
    successServerIds: string[];
    /**
     * 清空失败服务器id列表
     */
    failServerIds: string[];
    /**
     * 清空未读的服务器时间戳，这个时间戳之前的频道消息都认为是已读
     */
    ackTimestamp: number;
}
export declare type TQChatSearchOrder = keyof typeof QChatChannelEOrder;
export declare enum QChatChannelEOrder {
    ASC = 1,
    DESC = 2
}
export declare type TSearchType = keyof typeof ESearchType;
export declare enum QChatEServerSortType {
    reorderWeight = 0,
    createTime = 1,
    totalMember = 2
}
export declare type TSortType = keyof typeof QChatEServerSortType;
export declare enum ESearchType {
    /**
     * 广场
     */
    square = 1,
    /**
     * 个人
     */
    person = 2
}
export interface ServerSearchByPageOptions {
    /**
     * 搜索关键字
     */
    keyword: string;
    /**
     * 查询时间范围的开始时间
     */
    startTime?: number;
    /**
     * 查询时间范围的结束时间，要求比开始时间大
     */
    endTime?: number;
    /**
     * 排序规则：ASC-升序 ,DESC-倒序 默认DESC
     */
    order?: TQChatSearchOrder;
    /**
     * 返回结果的记录数，最大和默认都是100
     */
    limit?: number;
    /**
     * 搜索的服务器类型,例如[1,2,3]。即 createServer 时的 searchType
     */
    serverType?: number[];
    /**
     * 搜索场景：square-广场,person-个人服务器。
     *
     * square 是指全局搜索服务器
     * person 是指个人已加入的服务器
     */
    searchType: TSearchType;
    /**
     * 排序条件 reorderWeight-自定义权重排序、createTime-创建时间（默认）、totalMember-服务器总人数
     */
    sort?: TSortType;
    /**
     * 排序条件 查询游标，查询的起始位置，上一次查询结果中的listQueryTag字段会返回cursor字段。
     */
    cursor?: string;
}
export interface ServerSearchByPageResult {
    /**
     * 分页便捷选项
     */
    listQueryTag: {
        /**
         * 是否还有下一页
         */
        hasMore: boolean;
        /**
         * 下一次翻页时的起始时间戳
         */
        nextTimetag: number;
        /**
         * 查询游标，下次查询的起始位置
         */
        cursor: string;
    };
    datas: ServerInfo[];
}
export interface ServerMemberSearchByPageOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 关键字
     */
    keyword: string;
    /**
     * 查询数量 最大和默认都是100
     */
    limit?: number;
}
export interface ServerMemberSearchByPageResult {
    /**
     * 分页便捷选项
     */
    listQueryTag: {
        /**
         * 是否还有下一页
         */
        hasMore: boolean;
        /**
         * 下一次翻页时的起始时间戳
         */
        nextTimetag: number;
    };
    datas: MemberInfo[];
}
export interface BanServerMemberOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 目标用户accid
     */
    accid: string;
    /**
     * 自定义扩展
     */
    ext?: string;
}
export interface UnbanServerMemberOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 目标用户accid
     */
    accid: string;
    /**
     * 自定义扩展
     */
    ext?: string;
}
export interface GetBannedMembersByPageOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 查询从该时间开始，寻找比该时间更早的纪录。第一次查询可以传入0，0会解析为服务器的当前时间
     */
    timetag: number;
    /**
     * 数量, 默认 100
     */
    limit?: number;
}
export interface GetBannedMembersByPageResult {
    /**
     * 分页便捷选项
     */
    listQueryTag: {
        /**
         * 是否还有下一页
         */
        hasMore: boolean;
        /**
         * 下一次翻页时的起始时间戳
         */
        nextTimetag: number;
    };
    datas: ServerMemberBanInfo[];
}
export interface ServerMemberBanInfo {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 用户accid
     */
    accid: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 封禁时间
     */
    banTime: string;
    /**
     * 有效标志：true-有效，false-无效
     */
    validFlag: boolean;
    /**
     * 创建时间
     */
    createTime: number;
    /**
     * 更新时间
     */
    updateTime: number;
}
export interface CreateServerOptions {
    /**
     * 名称
     */
    name: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 邀请模式. 指服务器里的有权限者邀请某人员进入, 是否需要该人的同意
     *
     * 注: 0-需要同意(默认), 1-不需要同意
     */
    inviteMode?: 0 | 1;
    /**
     * 申请模式. 指人员申请进入服务器是否需要有权限者的同意
     *
     * 注: 0-不需要同意(默认)，1-需要同意
     */
    applyMode?: 0 | 1;
    /**
     * 反垃圾相关字段
     */
    antispamTag?: AntispamTag;
    /**
     * 服务器搜索类型，客户自定义，大于等于0的整数 0代表无类型 参见 {@link ServerInfo.searchType | searchType}
     */
    searchType?: number;
    /**
     * 服务器是否允许被搜索，true允许，false不允许，默认允许
     */
    searchEnable?: boolean;
}
/**
 * 反垃圾相关字段
 */
export interface AntispamTag {
    /**
     * 用户配置的对某些资料内容另外的反垃圾的业务ID, Json结构, {"textbid":"","picbid":""}
     * http://doc.hz.netease.com/display/MMC/AntispamTag
     */
    antiSpamBusinessId: {
        textbid: string;
        picbid: string;
    };
}
export interface DeleteServerOptions {
    /**
     * 服务器ID
     */
    serverId: string;
}
export interface UpdateServerOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 邀请模式. 指服务器里的有权限者邀请某人员进入, 是否需要该人的同意
     *
     * 注: 0-需要同意(默认), 1-不需要同意
     */
    inviteMode?: 0 | 1;
    /**
     * 申请模式. 指人员申请进入服务器是否需要有权限者的同意
     *
     * 注: 0-不需要同意(默认)，1-需要同意
     */
    applyMode?: 0 | 1;
    /**
     * 反垃圾相关字段
     */
    antispamTag?: AntispamTag;
    /**
     * 服务器搜索类型，客户自定义，大于等于0的整数 0代表无类型 参见 {@link ServerInfo.searchType | searchType}
     */
    searchType?: number;
    /**
     * 服务器是否允许被搜索，true允许，false不允许，默认允许
     */
    searchEnable?: boolean;
}
export interface GetServersOptions {
    /**
     * 服务器ID列表
     */
    serverIds: string[];
}
export interface GetServersByPageOptions {
    /**
     * 时间戳
     *
     * 传 0 等于取当前时间
     */
    timestamp: number;
    /**
     * 条数
     */
    limit?: number;
}
export interface GetServersByPageResult {
    /**
     * 分页便捷选项
     */
    listQueryTag: {
        /**
         * 是否还有下一页
         */
        hasMore: boolean;
        /**
         * 下一次翻页时的起始时间戳
         */
        nextTimetag: number;
    };
    datas: ServerInfo[];
}
export interface InviteServerMembersOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 用户账号列表
     */
    accids: string[];
    /**
     * 附言(最长5000)
     */
    ps: string;
    /**
     * 本邀请记录的额外参数
     */
    params: {
        /**
         * 有效时长，单位: 毫秒
         */
        ttl: number;
    };
}
export interface InviteServerMembersResult {
    /**
     * 因为用户服务器数量超限导致失败的accid列表
     */
    failByOverAccids: string[];
    /**
     * 因为用户被服务器封禁导致失败的accid列表
     */
    failByBanAccids: string[];
    /**
     * 邀请记录的信息
     */
    recordInfo: {
        /**
         * 邀请记录唯一标识
         */
        requestId: string;
        /**
         * 时间戳，表示邀请过期的截止日期
         */
        expireTime: number;
    };
}
export interface AcceptServerInviteOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 邀请者的accid
     */
    accid: string;
    /**
     * 邀请记录的信息
     */
    recordInfo: {
        /**
         * 邀请记录的唯一标识
         */
        requestId: string;
    };
}
export interface RejectServerInviteOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 邀请者accid
     */
    accid: string;
    /**
     * 附言(最长5000)
     */
    ps: string;
    /**
     * 邀请记录的信息
     */
    recordInfo: {
        /**
         * 邀请记录的唯一标识
         */
        requestId: string;
    };
}
export interface ApplyServerJoinOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 附言(最长5000)
     */
    ps: string;
    /**
     * 本申请记录的额外参数
     */
    params: {
        /**
         * 有效时长，单位: 毫秒
         */
        ttl: number;
    };
}
export interface AcceptServerApplyOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 申请账号ID
     */
    accid: string;
    /**
     * 申请记录的信息
     */
    recordInfo: {
        /**
         * 申请记录的唯一标识。见 type = {@link ESystemMessageType.serverMemberApply} 圈组系统通知的 requestId
         */
        requestId: string;
    };
}
export interface RejectServerApplyOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 用户账号
     */
    accid: string;
    /**
     * 附言(最长5000)
     */
    ps: string;
    /**
     * 申请记录的信息
     */
    recordInfo: {
        /**
         * 申请记录的唯一标识
         */
        requestId: string;
    };
}
export interface KickServerMembersOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 用户账号列表
     */
    accids: string[];
}
export interface LeaveServerOptions {
    /**
     * 服务器ID
     */
    serverId: string;
}
export interface UpdateServerMemberInfoOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 用户accid
     */
    accid: string;
    /**
     * 昵称
     */
    nick?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 反垃圾相关字段
     */
    antispamTag?: AntispamTag;
}
export interface UpdateMyMemberInfoOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 用户accid。填自己的accid。
     */
    accid: string;
    /**
     * 昵称
     */
    nick?: string;
    /**
     * 头像
     */
    avatar?: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 反垃圾相关字段
     */
    antispamTag?: AntispamTag;
}
export interface GetServerMembersOptions {
    accids: {
        accid: string;
        serverId: string;
    }[];
}
export interface GetServerMembersByPageOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 时间戳 传0取当前时间
     */
    timetag: number;
    /**
     * 数量, 默认 100
     */
    limit?: number;
}
export interface GetServerMembersByPageResult {
    /**
     * 分页便捷选项
     */
    listQueryTag: {
        /**
         * 是否还有下一页
         */
        hasMore: boolean;
        /**
         * 下一次翻页时的起始时间戳
         */
        nextTimetag: number;
    };
    datas: MemberInfo[];
}
export interface MemberInfo {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 用户accid
     */
    accid: string;
    /**
     * 昵称
     */
    nick: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 类型：0-普通成员，1-所有者
     */
    type: 0 | 1;
    /**
     * 加入时间
     */
    joinTime: number;
    /**
     * 邀请模人
     */
    inviter: string;
    /**
     * 有效标志：0-无效，1-有效
     */
    validFlag: 0 | 1;
    /**
     * 创建时间
     */
    createTime: number;
    /**
     * 更新时间
     */
    updateTime: number;
}
export interface ServerInfo {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 图标
     */
    icon?: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 所有者
     */
    owner: string;
    /**
     * 成员数量
     */
    memberNumber: string;
    /**
     * 邀请模式. 指服务器里的有权限者邀请某人员进入, 是否需要该人的同意
     *
     * 注: 0-需要同意(默认), 1-不需要同意
     */
    inviteMode: 0 | 1;
    /**
     * 申请模式. 指人员申请进入服务器是否需要有权限者的同意
     *
     * 注: 0-不需要同意(默认)，1-需要同意
     */
    applyMode: 0 | 1;
    /**
     * 有效标志：0-无效，1-有效
     */
    validFlag: 0 | 1;
    /**
     * 创建时间
     */
    createTime: number;
    /**
     * 更新时间
     */
    updateTime: number;
    /**
     * 频道数
     */
    channelNumber: number;
    /**
     * 频道分组的数量
     */
    categoryNumber?: number;
    /**
     * 服务器搜索类型，客户自定义，大于0的整数 参见 {@link ServerInfo.searchType | searchType}
     */
    searchType: number;
    /**
     * 服务器是否允许被搜索.
     *
     * true 允许, false 不允许
     */
    searchEnable: boolean;
    /**
     * 自定义排序权重值
     *
     * 注: IM 服务端下发的自定义顺序权重, 下发时已经排好，客户端不需要干预。
     *
     * 注2: 这个值目前只能通过 IM 服务端提供的 HTTP API 接口去更改
     */
    reorderWeight: string;
}
export interface SubscribeServerOptions {
    /**
     * 订阅类型 :
     *
     * 4.订阅某个server的【消息】/【通知】，如server基本信息修改、人员进出、权限变更、创建channel等
     */
    type: 4;
    /**
     * 操作类型 1订阅 2取消订阅
     */
    opeType: 1 | 2;
    /**
     * 要订阅的服务器信息
     */
    servers: {
        serverId: string;
    }[];
}
export interface QChatServerInviteApplyRecord {
    /**
     * 这条数据的唯一标识，仅用于分页查询使用。
     */
    recordId: string;
    /**
     * account ID，操作者/申请者的账号 id
     */
    accid: string;
    /**
     * 邀请/申请的类型：
     *
     * 1 表示申请，也能表示申请记录的拒绝与同意
     *
     * 2 表示邀请记录，仅查询服务器下的记录能查到这种类型, 接口为 {@link QChatServerServiceInterface.getInviteAndApplyRecord | getInviteAndApplyRecord}
     *
     * 3 表示邀请记录的同意/拒绝的记录
     *
     * 4 表示邀请码生成，仅查询服务器下的记录能查到这种类型, 接口为 {@link QChatServerServiceInterface.getInviteAndApplyRecord | getInviteAndApplyRecord}
     *
     * 5 表示通过邀请码加入
     */
    type: number;
    /**
     * 服务器 id
     */
    serverId: string;
    /**
     * 状态。0表示初始状态
     *
     * 1 表示同意
     *
     * 2 表示拒绝
     *
     * 3 表示通过其他 申请/邀请 同意了，
     *
     * 4 表示通过其他 申请/邀请 拒绝了
     *
     * 5 表示邀请/申请时自动加入
     *
     * 6 表示过期
     */
    status: number;
    /**
     * 申请/邀请的唯一标识
     */
    requestId: string;
    /**
     * 创建时间
     */
    createTime: number;
    /**
     * 修改时间
     */
    updateTime: number;
    /**
     * 过期时间
     */
    expireTime: number;
    /**
     * 内容数据，对应上文 type 的类型有以下四种定义
     */
    data: QChatServerInviteAndApplyDataWithType1 & QChatServerInviteAndApplyDataWithType2 & QChatServerInviteAndApplyDataWithType3 & QChatServerInviteAndApplyDataWithType4 & QChatServerInviteAndApplyDataWithType5;
}
export interface QChatServerInviteAndApplyDataWithType1 {
    /**
     * 申请时的附言
     */
    applyPostscript?: string;
    /**
     * 该申请的同意人
     */
    updateAccid?: string;
    /**
     * 同意/拒绝申请时的附言
     */
    updatePostscript?: string;
}
export interface QChatServerInviteAndApplyDataWithType2 {
    /**
     * 邀请时的附加信息
     */
    invitePostscript?: string;
    /**
     * 受邀请者的信息
     */
    inviteUsers: {
        /**
         * 受邀者的账号 id
         */
        accid: string;
        /**
         * 受邀者的状态，0表示初始状态。定义同 {@link QChatServerInviteApplyRecord.status | status}
         */
        status: number;
        /**
         * 受到拒绝时的附言
         */
        updatePostscript?: string;
        /**
         * 更新时间
         */
        updateTime: number;
    }[];
}
export interface QChatServerInviteAndApplyDataWithType3 {
    /**
     * 邀请时的附加信息
     */
    invitePostscript?: string;
    /**
     * 同意/拒绝时的附加信息
     */
    updatePostscript?: string;
}
export interface QChatServerInviteAndApplyDataWithType4 {
    /**
     * 邀请码的附加信息
     */
    invitePostscript?: string;
    /**
     * 邀请码
     */
    inviteCode: string;
    /**
     * 该邀请码的使用人数
     */
    inviteUserCount?: number;
}
export interface QChatServerInviteAndApplyDataWithType5 {
    /**
     * 附言
     */
    updatePostscript?: string;
    /**
     * 邀请码
     */
    inviteCode: string;
}
export interface QChatServerGetInviteApplyRecordOfSelfOptions {
    /**
     * 开始时间戳
     */
    fromTime: number;
    /**
     * 结束时间戳
     */
    toTime: number;
    /**
     * 排列顺序。默认为 false
     *
     * 为 true 则代表按时间戳升序查询，从 fromTime 开始查询到 toTime 之间的 limit 条记录
     *
     * 为 false 则代表按时间戳降序查询，从 toTime 开始查询到 fromTime 之间的 limit 条记录
     */
    reverse?: boolean;
    /**
     * 分页大小
     */
    limit?: number;
    /**
     * 游标 id，id 的来源参照 {@link QChatServerInviteApplyRecord.recordId | recordId}
     *
     * 注：若有多条记录有相同的时间，需要借助这个参数才能精准的分页。
     */
    cursor?: string;
}
export interface QChatServerGetInviteApplyRecordOfServerOptions {
    /**
     * 服务器 id
     */
    serverId: string;
    /**
     * 开始时间戳
     */
    fromTime: number;
    /**
     * 结束时间戳
     */
    toTime: number;
    /**
     * 排列顺序。默认为 false
     *
     * 为 true 则代表按时间戳升序查询，从 fromTime 开始查询到 toTime 之间的 limit 条记录
     *
     * 为 false 则代表按时间戳降序查询，从 toTime 开始查询到 fromTime 之间的 limit 条记录
     */
    reverse?: boolean;
    /**
     * 分页大小
     */
    limit?: number;
    /**
     * 游标 id，id 的来源参照 {@link QChatServerInviteApplyRecord.recordId | recordId}
     *
     * 注：若有多条记录有相同的时间，需要借助这个参数才能精准的分页。
     */
    cursor?: string;
}
export interface QChatServerJoinByInviteCodeOptions {
    /**
     * 服务器 id
     */
    serverId: string;
    /**
     * 邀请码
     */
    inviteCode: string;
    /**
     * 附言
     */
    ps?: string;
}
export interface QChatServerGenerateInviteCodeOptions {
    /**
     * 服务器 id
     */
    serverId: string;
    /**
     * 有效时长，单位: 毫秒。默认 30 天
     */
    ttl?: number;
}
export interface QChatServerInviteCode {
    /**
     * 服务器 id
     */
    serverId: string;
    /**
     * 唯一标识
     */
    requestId: string;
    /**
     * 邀请码
     */
    inviteCode: string;
    /**
     * 时间戳，表示邀请过期的截止日期
     */
    expireTime: number;
}
/**
 * 申请加入服务器的记录的信息
 */
export interface QChatServerApplyRecordInfo {
    /**
     * 申请记录的唯一标识
     */
    requestId: string;
    /**
     * 时间戳，表示邀请过期的截止日期
     */
    expireTime: number;
}
export interface SubscribeServerResult {
    /**
     * 订阅失败的服务器列表
     */
    failedServers: {
        serverId: string;
    }[];
}
