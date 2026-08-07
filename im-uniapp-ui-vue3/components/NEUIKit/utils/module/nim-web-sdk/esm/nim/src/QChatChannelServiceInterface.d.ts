import { QChatServerRole } from './QChatRoleServiceInterface';
import { MemberInfo, AntispamTag, TQChatSearchOrder } from './QChatServerServiceInterface';
/**
 * 调用方式:
 * ```js
 * qchat.qchatChannel.createChannel(options)
 * ```
 */
export interface QChatChannelServiceInterface {
    /**
     * 在服务器中创建频道。仅有管理员 + 频道分组可见用户有权限调用。
     *
     * #### 影响范围
     * - 仅频道可见用户会被影响
     * - 可见成员收到 type = {@link ESystemMessageType.channelCreate} 的圈组内置系统通知
     * - 可见成员收到 type = {@link ESystemMessageType.channelVisibilityUpdate} 的圈组内置系统通知
     * - 可见成员收到 type = {@link QChatEventInterface.unreadInfos} 频道未读数变更通知
     * - 可见成员收到 type = {@link QChatEventInterface.serverUnreadInfo} 服务器未读数变更通知
     * @example
     * ```js
     * const channel = await qchat.qchatChannel.createChannel({
     *  serverId: '11111',
     *  // 消息频道、音视频频道、或者自定义频道
     *  type: 'message',
     *  name: '频道名称',
     *  topic: '频道主题'
     * })
     * ```
     */
    createChannel(options: CreateChannelOptions): Promise<ChannelInfo>;
    /**
     * 删除建频道。仅有管理员 + 频道分组可见用户有权限调用。
     *
     * #### 影响范围
     * - 可见用户收到 type = {@link ESystemMessageType.channelRemove} 的圈组内置系统通知
     * - 可见用户收到 type = {@link ESystemMessageType.channelVisibilityUpdate} 的圈组内置系统通知
     *
     * @example
     * ```js
     * await qchat.qchatChannel.deleteChannel({
     *   channelId: '11111'
     * })
     * ```
     */
    deleteChannel(options: DeleteChannelOptions): Promise<void>;
    /**
     * 更新频道基本信息。仅有管理员 + 频道分组可见用户有权限调用。
     *
     * #### 影响范围
     * - 可见用户收到 type = {@link ESystemMessageType.channelUpdate} 的圈组内置系统通知
     */
    updateChannel(options: UpdateChannelOptions): Promise<ChannelInfo>;
    /**
     * 根据频道ID查询频道信息。注意，当前 appkey 下面所有的频道都可以被查询到，无论该频道对于当前用户是否可见。
     *
     * ```js
     * const channels = await qchat.qchatChannel.getChannels({
     *  channelIds = ['channelId1', 'channelId2']
     * })
     * ```
     */
    getChannels(options: GetChannelsOptions): Promise<ChannelInfo[]>;
    /**
     * 分页查询当前服务器，对该用户可见的频道列表
     *
     * ```js
     * const limit = 10
     * const serverId = '11111'
     * let list = []
     *
     * // 第一页。timetag设置为0，表示最新时间
     * let res = await qchat.qchatChannel.getChannelsByPage({
     *  "serverId": serverId,
     *  "timetag": 0,
     *  "limit": limit
     * })
     *
     * list = [...list, ...res.datas]
     * while (res.listQueryTag.hasMore) {
     *  res = await qchat.qchatChannel.getChannelsByPage({
     *    "serverId": serverId,
     *    "timetag": res.listQueryTag.nextTimetag,
     *    "limit": limit
     *  })
     *  list = [...list, ...res.datas]
     * }
     * ```
     */
    getChannelsByPage(options: GetChannelsByPageOptions): Promise<GetChannelsByPageResult>;
    /**
     * 订阅频道
     *
     * 注：仅当 type 为 5 时返回 undefined，而 type 为 1，2，3 时返回 UnreadInfo[]。
     */
    subscribeChannel(options: SubscribeChannelOptions): Promise<SubscribeChannelResult | void>;
    /**
     * 批量查询若干个频道的未读数数据
     *
     * @example
     * ```js
     * const res = await qchat.qchatChannel.getChannelUnreadInfos({
     *  channels: [{
     *    serverId: '11111',
     *    channelId: '22222'
     *  }]
     * })
     *
     * res.forEach(entry => {
     *   // 该频道的已读时间戳
     *   console.log(res.ackTimestamp)
     *   // 该频道最后一条消息时间
     *   console.log(res.lastMsgTime)
     *   // 该频道的最大未读数
     *   console.log(res.maxCount)
     *   // 该频道的未读数
     *   console.log(res.unreadCount)
     *   // at我的未读数
     *   console.log(res.mentionedCount)
     * })
     * ```
     */
    getChannelUnreadInfos(options: GetUnreadInfoOptions): Promise<QChatChannelUnreadInfo[]>;
    /**
     * 分页获取频道的成员列表。
     *
     * @example
     * ```js
     * const limit = 10
     * const serverId = '11111'
     * const channelId = '22222'
     * let list = []
     *
     * // 第一页。timetag设置为0，表示最新时间
     * let res = await qchat.qchatChannel.getMembersByPage({
     *  "serverId": serverId,
     *  "channelId": channelId,
     *  "timetag": 0,
     *  "limit": limit
     * })
     *
     * list = [...list, ...res.datas]
     * while (res.listQueryTag.hasMore) {
     *  res = await qchat.qchatChannel.getMembersByPage({
     *    "serverId": serverId,
     *    "channelId": channelId,
     *    "timetag": res.listQueryTag.nextTimetag,
     *    "limit": limit
     *  })
     *  list = [...list, ...res.datas]
     * }
     * ```
     */
    getMembersByPage(options: GetMembersByPageOptions): Promise<GetMembersByPageResult>;
    /**
     * 更新频道的白/黑名单身份组
     *
     * 1. 针对公开的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 0，那么设置的身份组在此公开频道的黑名单。此身份组用户将无法查到此频道的信息
     *
     * 2. 针对私密的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 1，那么设置的身份组在此私密频道的白名单。此身份组用户将可以查到此频道的信息
     */
    updateWhiteBlackRole(options: UpdateWhiteBlackRoleOptions): Promise<void>;
    /**
     * 更新频道的白/黑名单成员
     *
     * 1. 针对公开的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 0，那么设置的成员在此公开频道的黑名单。此成员将无法查到此频道的信息
     *
     * 2. 针对私密的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 1，那么设置的成员在此私密频道的白名单。此成员将可以查到此频道的信息
     *
     * #### 影响范围
     * - 服务器内用户收到 type = {@link ESystemMessageType.channelUpdateWhiteBlackIdentifyUser} 的圈组内置系统通知
     */
    updateWhiteBlackMembers(options: UpdateWhiteBlackMembersOptions): Promise<void>;
    /**
     * 分页查询频道的白/黑名单身份组
     */
    getWhiteBlackRolesPage(options: GetWhiteBlackRolesPageOptions): Promise<GetWhiteBlackRolesPageResult>;
    /**
     * 分页查询频道的白/黑名单成员
     *
     * @example
     * ```js
     * const limit = 10
     * const serverId = '11111'
     * const channelId = '22222'
     * const type = "white"
     * let list = []
     *
     * // 第一页。timetag设置为0，表示最新时间
     * let res = await qchat.qchatChannel.getWhiteBlackMembersPage({
     *  "serverId": serverId,
     *  "channelId": channelId,
     *  "type": type,
     *  "timetag": 0,
     *  "limit": limit
     * })
     *
     * list = [...list, ...res.datas]
     * while (res.listQueryTag.hasMore) {
     *  res = await qchat.qchatChannel.getWhiteBlackMembersPage({
     *    "serverId": serverId,
     *    "channelId": channelId,
     *    "type": type,
     *    "timetag": res.listQueryTag.nextTimetag,
     *    "limit": limit
     *  })
     *  list = [...list, ...res.datas]
     * }
     * ```
     */
    getWhiteBlackMembersPage(options: GetWhiteBlackMembersPageOptions): Promise<GetWhiteBlackMembersPageResult>;
    /**
     * 根据身份组ID查询已存在的白/黑名单身份组
     */
    getExistingWhiteBlackRoles(options: GetExistingWhiteBlackRolesOptions): Promise<GetExistingWhiteBlackRolesResult>;
    /**
     * 查询某个频道下，指定用户是否在白/黑名单中。
     *
     * - 若频道 viewMode = 0，只能查询黑名单
     * - 若频道 viewMode = 1，只能查询白名单
     *
     * @example
     * ```js
     * const res = await qchat.qchatChannel.getExistingWhiteBlackMembers({
     *  "serverId": "11111",
     *  "channelId": "22222",
     *  "type": "black",
     *  "accids": ["test1", "test2"]
     * })
     * ```
     */
    getExistingWhiteBlackMembers(options: GetExistingWhiteBlackMembersOptions): Promise<GetExistingWhiteBlackMembersResult>;
    /**
     * 修改频道信息中的"频道分组"相关字段
     *
     * #### 影响范围
     * - 可见用户收到 type = {@link ESystemMessageType.channelUpdate} 的圈组内置系统通知
     */
    updateCategoryInfoOfChannel(options: UpdateCategoryInfoOfChannelOptions): Promise<ChannelInfo>;
    /**
     * 创建"频道分组"。频道分组说明请查看 [频道分组文档](https://doc.yunxin.163.com/messaging-enhanced/docs/jMzNjY4OTg?platform=web)
     *
     * 只有拥有管理员权限才可以创建频道分组
     *
     * #### 频道分组可见机制
     * - 如果频道分组为公开频道分组，那么只要用户未被加入频道分组黑名单，频道分组就对其可见
     * - 如果频道分组为私密频道分组，那么用户需被加入频道分组白名单，频道分组才对其可见
     *
     * #### 频道分组对游客是否可见
     * - 频道分组是否对游客可见，取决于频道分组内是否有频道对游客可见。如果频道分组内有频道对游客可见，则该频道分组对游客也可见。
     * - 频道是否对游客可见由visitorMode决定，可在创建频道和修改频道时设置
     *
     * #### 频道管理可见
     * - 频道分组对用户可见
     * - 拥有管理频道的权限（QChatRoleAuth枚举中的manageChannel）。
     *
     * #### 影响范围
     * - 可见用户收到 type = {@link ESystemMessageType.channelCategoryCreate} 的圈组内置系统通知
     *
     * @example
     * ```js
     * const channelCategory = await qchat.qchatChannel.createChannelCategory({
     *   "serverId": "10390563",
     *   "name": "category-1",
     *   "viewMode": 0
     * })
     * ```
     */
    createChannelCategory(options: CreateChannelCategoryOptions): Promise<QChatChannelCategoryInfo>;
    /**
     * 更新"频道分组"的属性。比如更新频道分组的 viewMode，ext等字段
     */
    updateChannelCategory(options: UpdateChannelCategoryOptions): Promise<QChatChannelCategoryInfo>;
    /**
     * 删除"频道分组"
     *
     * #### 影响范围
     * - 可见用户收到 type = {@link ESystemMessageType.channelCategoryRemove} 的圈组内置系统通知
     */
    removeChannelCategory(options: RemoveChannelCategoryOptions): Promise<void>;
    /**
     * 根据分组ID查询"频道分组"
     *
     * @example
     * ```js
     * const res = await qchat.qchatChannel.getChannelCategoriesByID({
     *  categoryIds: ['11111', '22222']
     * })
     * ```
     */
    getChannelCategoriesByID(options: GetChannelCategoriesByIDOptions): Promise<QChatChannelCategoryInfo[]>;
    /**
     * 更新"频道分组"白/黑名单身份组
     */
    updateChannelCategoryWhiteBlackRole(options: UpdateChannelCategoryWhiteBlackRoleOptions): Promise<void>;
    /**
     * 查询"频道分组"白/黑名单身份组列表(分页)
     *
     * @example
     * ```js
     * qchat.qchatChannel.getChannelCategoryWhiteBlackRolesPage({
     *   "categoryId": "5803432",
     *   "serverId": "10636686",
     *   "type": "black",
     *   "timetag": 0,
     *   "limit": 10
     * })
     * ```
     */
    getChannelCategoryWhiteBlackRolesPage(options: GetChannelCategoryWhiteBlackRolesPageOptions): Promise<GetChannelCategoryWhiteBlackRolesPageResult>;
    /**
     * 更新"频道分组"白/黑名单成员
     *
     * #### 影响范围
     * - 服务器内用户收到 type = {@link ESystemMessageType.channelCategoryUpdateWhiteBlackIdentifyUser} 的圈组内置系统通知
     */
    updateChannelCategoryWhiteBlackMembers(options: UpdateChannelCategoryWhiteBlackMembersOptions): Promise<void>;
    /**
     * 分页查询"频道分组"白/黑名单成员列表。通过该接口查询频道分组下的完整黑白名单
     *
     * @example
     * ```js
     * const limit = 10
     * const serverId = '11111'
     * const categoryId = '22222'
     * const type = 'white'
     * let list = []
     *
     * // 第一页。timetag设置为0，表示最新时间
     * let res = await qchat.qchatChannel.getChannelCategoryWhiteBlackMembersPage({
     *  "serverId": serverId,
     *  "categoryId": categoryId,
     *  "type": type,
     *  "timetag": 0,
     *  "limit": limit
     * })
     *
     * list = [...list, ...res.datas]
     * while (res.listQueryTag.hasMore) {
     *  res = await qchat.qchatChannel.getChannelCategoryWhiteBlackMembersPage({
     *    "serverId": serverId,
     *    "categoryId": categoryId,
     *    "type": type,
     *    "timetag": res.listQueryTag.nextTimetag,
     *    "limit": limit
     *  })
     *  list = [...list, ...res.datas]
     * }
     * ```
     */
    getChannelCategoryWhiteBlackMembersPage(options: GetChannelCategoryWhiteBlackMembersPageOptions): Promise<GetChannelCategoryWhiteBlackMembersPageResult>;
    /**
     * 根据身份组ID查询"频道分组"白/黑名单身份组列表
     */
    getChannelCategoryWhiteBlackRoles(options: GetChannelCategoryWhiteBlackRolesOptions): Promise<QChatServerRole[]>;
    /**
     * 根据成员ID查询"频道分组"白/黑名单成员列表
     *
     * - 若分组的 viewMode = 0, 则只能查询 type = 'black' 的名单
     * - 若分组的 viewMode = 1, 则只能查询 type = 'white' 的名单
     *
     * @example
     * ```js
     * // 分组为 viewMode = 1，默认私密的分组名单。此类型只有白名单
     * const res = await qchat.qchatChannel.getChannelCategoryWhiteBlackMembers({
     *   "categoryId": "5754730",
     *   "serverId": "10390563",
     *   "type": "white",
     *   "accids": ["test1", "test2"]
     * })
     * ```
     */
    getChannelCategoryWhiteBlackMembers(options: GetChannelCategoryWhiteBlackMembersOptions): Promise<MemberInfo[]>;
    /**
     * 分页查询指定服务器下的"频道分组"列表
     *
     * @example
     * ```js
     * const limit = 10
     * const serverId = '11111'
     * let list = []
     *
     * // 第一页。timetag设置为0，表示最新时间
     * let res = await qchat.qchatChannel.getChannelCategoriesPage({
     *  "serverId": serverId,
     *  "timetag": 0,
     *  "limit": limit
     * })
     *
     * list = [...list, ...res.datas]
     * while (res.listQueryTag.hasMore) {
     *  res = await qchat.qchatChannel.getChannelCategoriesPage({
     *    "serverId": serverId,
     *    "timetag": res.listQueryTag.nextTimetag,
     *    "limit": limit
     *  })
     *  list = [...list, ...res.datas]
     * }
     * ```
     */
    getChannelCategoriesPage(options: GetChannelCategoriesPageOptions): Promise<GetChannelCategoriesPageResult>;
    /**
     * 查询某个频道分组下的频道列表(分页)
     *
     * @example
     * ```js
     * const limit = 10
     * const serverId = '11111'
     * const categoryId = '22222'
     * let list = []
     *
     * // 第一页。timetag设置为0，表示最新时间
     * let res = await qchat.qchatChannel.getChannelCategoryChannelsPage({
     *  "serverId": serverId,
     *  "categoryId": categoryId,
     *  "timetag": 0,
     *  "limit": limit
     * })
     *
     * list = [...list, ...res.datas]
     * while (res.listQueryTag.hasMore) {
     *  res = await qchat.qchatChannel.getChannelCategoryChannelsPage({
     *    "serverId": serverId,
     *    "categoryId": categoryId,
     *    "timetag": res.listQueryTag.nextTimetag,
     *    "limit": limit
     *  })
     *  list = [...list, ...res.datas]
     * }
     * ```
     */
    getChannelCategoryChannelsPage(options: GetChannelCategoryChannelsPageOptions): Promise<GetChannelCategoryChannelsPageResult>;
    /**
     * 根据关键词检索频道
     *
     * @example
     * ```js
     * const res = await qchat.qchatChannel.getChannelSearchByPage({
     *  keyword: '关键词',
     *  startTime: 0,
     *  limit: 100,
     *  serverId: '11111',
     *  sort: 'createTime'
     * })
     * ```
     */
    getChannelSearchByPage(options: GetChannelSearchByPageOptions): Promise<GetChannelSearchByPageResult>;
    /**
     * 根据关键词，检索频道内的成员信息
     *
     * @example
     * ```js
     * const res = await qchat.qchatChannel.channelMemberSearch({
     *    serverId: '11111',
     *    channelId: '22222',
     *    keyword: '关键词',
     *    limit: 100
     * })
     * ```
     */
    channelMemberSearch(options: QChatChannelMemberSearchOptions): Promise<QChatChannelMemberInfo[]>;
    /**
     * 以游客身份订阅频道
     */
    subscribeAsVisitor(options: NIMEQChatChannelSubscribeAsVisitorOptions): Promise<NIMEQChatChannelSubscribeAsVisitorResult>;
}
/**
 * qchatChannel 模块的监听事件
 *
 * Example：
 *
 * const instance = new SDK()
 *
 * instance.qchatChannel.on('unreadInfos', msg => { console.log(msg) }
 */
export interface NIMEQChatChannelServiceListener {
    /**
     * 多个频道收到消息未读通知
     */
    unreadInfos: [msg: QChatChannelUnreadInfo[]];
}
export interface NIMEQChatChannelSubscribeAsVisitorOptions {
    /**
     * 操作类型 1 为订阅； 2 为取消订阅
     */
    opeType: 1 | 2;
    /**
     * 订阅模式
     *
     * 注: 订阅服务器目前默认且只能固定传 6
     */
    type?: 6;
    /**
     * 欲订阅的频道信息
     */
    channels: {
        /**
         * 服务器id
         */
        serverId: string;
        /**
         * 频道id
         */
        channelId: string;
    }[];
}
export interface NIMEQChatChannelSubscribeAsVisitorResult {
    /**
     * 订阅失败频道列表
     */
    failedChannels: {
        /**
         * 服务器id
         */
        serverId: string;
        /**
         * 频道id
         */
        channelId: string;
    }[];
}
export interface QChatChannelMemberInfo {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道 ID
     */
    channelId: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 账号 数组 , 最多100个
     */
    accid: string;
    /**
     * 昵称
     */
    nick: string;
    /**
     * 创建时间
     */
    createTime: string;
    /**
     * 修改时间
     */
    updateTime: string;
}
export interface QChatChannelMemberSearchOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道 ID
     */
    channelId: string;
    /**
     * 关键字
     */
    keyword: string;
    /**
     * 查询数量，默认和最大都是 100 条
     */
    limit?: number;
}
export declare enum QChatEChannelSortType {
    reorderWeight = 0,
    createTime = 1
}
export declare type TSortType = keyof typeof QChatEChannelSortType;
export interface UpdateCategoryInfoOfChannelOptions {
    /**
     * 频道 ID
     */
    channelId: string;
    /**
     * 频道类别id，传0从频道分组中移除频道
     */
    categoryId?: string;
    /**
     * 同步模式：0-不与类别同步模式(默认)，1-与类别同步模式
     */
    syncMode?: number;
}
export interface GetChannelCategoryWhiteBlackMembersPageOptions {
    /**
     * 分组ID
     */
    categoryId: string;
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 分页条件-上一次查询的时间戳，0等同于表示当前时间。
     */
    timetag: number;
    /**
     * 分页页码，默认 100 条
     */
    limit?: number;
}
export interface GetChannelCategoryWhiteBlackMembersPageResult {
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
export interface UpdateChannelCategoryWhiteBlackMembersOptions {
    /**
     * 分组ID
     */
    categoryId: string;
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 操作类型。新增传 "add", 移除传 "remove"
     */
    opeType: keyof typeof EWhiteBlackOpeType;
    /**
     * 成员的 account ID，一次最多传入 100 个
     */
    toAccids: string[];
}
export interface GetChannelCategoryChannelsPageOptions {
    /**
     * 分组ID
     */
    categoryId: string;
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 分页条件-上一次查询的时间戳。默认0，0等同于表示当前时间。
     */
    timetag: number;
    /**
     * 分页页码，默认 100 条
     */
    limit?: number;
}
export interface GetChannelCategoryChannelsPageResult {
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
    datas: ChannelInfo[];
}
export interface GetChannelSearchByPageOptions {
    /**
     * 关键字
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
     * 不填时查询所有服务器，填写时查询指定服务器
     */
    serverId?: string;
    /**
     * 排序条件 reorderWeight-自定义权重排序、createTime-创建时间（默认）
     */
    sort?: TSortType;
    /**
     * 排序条件 查询游标，查询的起始位置，上一次查询结果中的listQueryTag字段会返回cursor字段。
     */
    cursor?: string;
}
export interface GetChannelSearchByPageResult {
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
    datas: ChannelInfo[];
}
export interface GetChannelCategoriesPageOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 创建时间 必填 按照创建时间逆序，0等同于表示当前时间。
     */
    timetag: number;
    /**
     * 分页页码，默认 100 条
     */
    limit?: number;
}
export interface GetChannelCategoriesPageResult {
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
    datas: QChatChannelCategoryInfo[];
}
export interface GetChannelCategoryWhiteBlackMembersOptions {
    /**
     * 分组ID
     */
    categoryId: string;
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 账号列表 , 最多100个
     */
    accids: string[];
}
export interface GetChannelCategoryWhiteBlackMembersResult {
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
export interface GetChannelCategoryWhiteBlackRolesOptions {
    /**
     * 分组ID
     */
    categoryId: string;
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 身份组ID列表，最多100个
     */
    roleIds: string[];
}
export interface GetChannelCategoryWhiteBlackRolesResult {
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
    datas: QChatServerRole[];
}
export interface GetChannelCategoryWhiteBlackRolesPageOptions {
    /**
     * 分组ID
     */
    categoryId: string;
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 分页条件-上一次查询的时间戳，0等同于表示当前时间。
     */
    timetag: number;
    /**
     * 分页页码，默认 100 条
     */
    limit: number;
}
export interface GetChannelCategoryWhiteBlackRolesPageResult {
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
    datas: QChatServerRole[];
}
export interface UpdateChannelCategoryWhiteBlackRoleOptions {
    /**
     * 分组ID
     */
    categoryId: string;
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link QChatChannelCategoryInfo.viewMode | QChatChannelCategoryInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 操作类型。新增传 "add", 移除传 "remove"
     */
    opeType: keyof typeof EWhiteBlackOpeType;
    /**
     * 身份组 ID
     */
    roleId: string;
}
export interface GetChannelCategoriesByIDOptions {
    /**
     * 分组ID 列表
     */
    categoryIds: string[];
}
export interface RemoveChannelCategoryOptions {
    /**
     * 分组ID
     */
    categoryId: string;
}
export interface UpdateChannelCategoryOptions {
    /**
     * 分组ID
     */
    categoryId: string;
    /**
     * 分组名称
     */
    name?: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 查看模式：0-公开模式(默认)，1-私密模式
     */
    viewMode?: number;
}
export interface CreateChannelCategoryOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 分组名称
     */
    name?: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 查看模式：0-公开模式(默认)，1-私密模式
     */
    viewMode?: number;
}
export interface QChatChannelCategoryInfo {
    /**
     * 分组ID
     */
    categoryId: string;
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 名称
     */
    name: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 所有者
     */
    owner: string;
    /**
     * 查看模式：0-公开模式，1-私密模式
     */
    viewMode: number;
    /**
     * 有效标志：false-无效，true-有效
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
    /**
     * 频道数量
     */
    channelNumber: number;
}
export interface GetMembersByPageOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道 ID
     */
    channelId: string;
    /**
     * 分页条件-上一次查询的时间戳。默认0，0等同于表示当前时间。
     */
    timetag?: number;
    /**
     * 分页数量，默认 100 条
     */
    limit?: number;
}
export interface GetMembersByPageResult {
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
export declare enum EWhiteBlackType {
    white = 1,
    black = 2
}
export declare enum EWhiteBlackOpeType {
    add = 1,
    remove = 2
}
export interface UpdateWhiteBlackRoleOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道 ID
     */
    channelId: string;
    /**
     * 身份组 ID
     */
    roleId: string;
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 操作类型。新增传 "add", 移除传 "remove"
     */
    opeType: keyof typeof EWhiteBlackOpeType;
}
export interface UpdateWhiteBlackMembersOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道 ID
     */
    channelId: string;
    /**
     * 成员的 account ID，一次最多传入 100 个
     */
    toAccids: string[];
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 操作类型。新增传 "add", 移除传 "remove"
     */
    opeType: keyof typeof EWhiteBlackOpeType;
}
export interface GetWhiteBlackRolesPageOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道 ID
     */
    channelId: string;
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 分页条件-上一次查询的时间戳。默认0，0等同于表示当前时间。
     */
    timetag?: number;
    /**
     * 分页页码，默认 100 条
     */
    limit?: number;
}
export interface GetWhiteBlackRolesPageResult {
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
    datas: QChatServerRole[];
}
export interface GetWhiteBlackMembersPageOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道 ID
     */
    channelId: string;
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 分页条件-上一次查询的时间戳。默认0，0等同于表示当前时间。
     */
    timetag?: number;
    /**
     * 分页页码，默认 100 条
     */
    limit?: number;
}
export interface GetExistingWhiteBlackRolesOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道 ID
     */
    channelId: string;
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 身份组 id 数组 , 最多100个
     */
    roleIds: string[];
}
export interface GetExistingWhiteBlackRolesResult {
    /**
     * 服务器身份组
     */
    datas: QChatServerRole[];
}
export interface GetExistingWhiteBlackMembersOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道 ID
     */
    channelId: string;
    /**
     * 类型
     *
     * 1. 针对公开的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 0，接口只允许设置黑名单，type 传 "black"
     *
     * 2. 针对私密的频道 {@link ChannelInfo.viewMode | ChannelInfo.viewMode} 为 1，接口只允许设置白名单，type 传 "white"
     */
    type: keyof typeof EWhiteBlackType;
    /**
     * 账号 数组 , 最多100个
     */
    accids: string[];
}
export interface GetExistingWhiteBlackMembersResult {
    /**
     * 成员数组
     */
    datas: MemberInfo[];
}
export interface GetWhiteBlackMembersPageResult {
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
export interface CreateChannelOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 类型：message-消息频道,ext-自定义频道
     */
    type: TChannelInfoType;
    /**
     * 名称
     */
    name?: string;
    /**
     * 主题
     */
    topic?: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 查看模式：0-公开模式(默认)，1-私密模式
     */
    viewMode?: number;
    /**
     * 反垃圾相关字段
     */
    antispamTag?: AntispamTag;
    /**
     * 频道类别id
     */
    categoryId?: string;
    /**
     * 同步模式：0-不与类别同步模式(默认)，1-与类别同步模式
     */
    syncMode?: number;
    /**
     * 游客可见性模式
     *
     * 注: 0 代表对游客可见, 1 代表对游客不可见, 2-跟随模式(默认)
     *
     * 跟随模式: 当频道公开时(viewMode 为 0)对游客可见, 频道私密时(viewMode 为 1)对游客不可见.
     */
    visitorMode?: number;
}
export interface DeleteChannelOptions {
    /**
     * 频道id
     */
    channelId: string;
}
export interface UpdateChannelOptions {
    /**
     * 频道ID
     */
    channelId: string;
    /**
     * 服务器ID
     */
    serverId?: string;
    /**
     * 名称
     */
    name?: string;
    /**
     * 类型：message-消息频道,ext-自定义频道
     */
    type?: TChannelInfoType;
    /**
     * 应用id
     */
    /**
     * 主题
     */
    topic?: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 查看模式：0-公开模式(默认)，1-私密模式
     */
    viewMode?: number;
    /**
     * 反垃圾相关字段
     */
    antispamTag?: AntispamTag;
    /**
     * 游客可见性模式
     *
     * 注: 0 代表对游客可见, 1 代表对游客不可见, 2-跟随模式(默认)
     *
     * 跟随模式: 当频道公开时(viewMode 为 0)对游客可见, 频道私密时(viewMode 为 1)对游客不可见.
     */
    visitorMode?: number;
}
export interface GetChannelsOptions {
    /**
     * 频道id
     */
    channelIds: string[];
}
export declare enum EChannelInfoType {
    message = 0,
    media = 1,
    ext = 100
}
export declare type TChannelInfoType = keyof typeof EChannelInfoType;
export interface ChannelInfo {
    /**
     * 频道id
     */
    channelId: string;
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 应用id
     */
    /**
     * 名称
     */
    name: string;
    /**
     * 主题
     */
    topic: string;
    /**
     * 自定义扩展
     */
    ext: string;
    /**
     * 类型：message-消息频道,ext-自定义频道,media-音视频频道
     */
    type: TChannelInfoType;
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
     * 所有者
     */
    owner: string;
    /**
     * 查看模式：0-公开模式(默认)，1-私密模式
     */
    viewMode: number;
    /**
     * 游客可见性模式
     *
     * 注: 0 代表对游客可见, 1 代表对游客不可见, 2-跟随模式(默认)
     *
     * 跟随模式: 当频道公开时(viewMode 为 0)对游客可见, 频道私密时(viewMode 为 1)对游客不可见.
     */
    visitorMode?: number;
    /**
     * 频道类别id
     */
    categoryId: string;
    /**
     * 同步模式：0-不与类别同步模式(默认)1-与类别同步模式
     */
    syncMode: number;
    /**
     * 自定义排序权重值
     */
    reorderWeight: string;
}
export interface GetChannelsByPageOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 时间戳 传0取当前时间
     */
    timetag: number;
    /**
     * 条数
     */
    limit: number;
}
export interface GetChannelsByPageResult {
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
    datas: ChannelInfo[];
}
export interface SubscribeChannelOptions {
    /**
     * 订阅类型 :
     *
     * 1.订阅某个channel的【消息】/【通知】
     *
     * 2.订阅某个channel的【消息未读数】/【通知】
     *
     * 3.订阅某个channel的【消息未读状态】/【通知】
     *
     * 5.订阅某个频道的消息正在输入的系统通知
     */
    type: number;
    /**
     * 操作类型 1 为订阅； 2 为取消订阅
     */
    opeType: 1 | 2;
    channels: {
        /**
         * 服务器id
         */
        serverId: string;
        /**
         * 频道id
         */
        channelId: string;
    }[];
}
export interface SubscribeChannelResult {
    /**
     * 订阅成功频道的未读数详情
     */
    unreadInfos: QChatChannelUnreadInfo[];
    /**
     * 订阅失败频道列表
     */
    failedChannels: {
        /**
         * 服务器id
         */
        serverId: string;
        /**
         * 频道id
         */
        channelId: string;
    }[];
}
export interface QChatChannelUnreadInfo {
    /**
     * 服务器id
     */
    serverId: string;
    /**
     * 频道id
     */
    channelId: string;
    /**
     * 未读数
     */
    unreadCount: number;
    /**
     * 艾特消息未读数
     */
    mentionedCount: number;
    /**
     * 已读时间戳
     */
    ackTimestamp?: number;
    /**
     * 最大未读数
     */
    maxCount?: number;
    /**
     * 最后一条消息的时间戳
     */
    lastMsgTime?: number;
}
export interface QChatServerUnreadInfo {
    /**
     * 服务器id
     */
    serverId: string;
    /**
     * 未读数
     */
    unreadCount: number;
    /**
     * 艾特消息未读数
     */
    mentionedCount: number;
    /**
     * 最大未读数
     */
    maxCount?: number;
}
export interface GetUnreadInfoOptions {
    channels: {
        /**
         * 服务器id
         */
        serverId: string;
        /**
         * 频道id
         */
        channelId: string;
    }[];
}
export declare type NIMEQChatChannelConfig = {
    /**
     * @Multi_Lang_Tag
     * @locale cn
     * 是否开启自动订阅，默认 false 关闭
     *
     * @locale
     *
     * @locale en
     * Whether automatic subscription is enabled. The default value is false.
     * @locale
     */
    autoSubscribe?: boolean;
};
