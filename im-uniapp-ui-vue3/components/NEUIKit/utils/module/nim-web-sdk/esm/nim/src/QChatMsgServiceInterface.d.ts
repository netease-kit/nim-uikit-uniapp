import { ChannelInfo } from './QChatChannelServiceInterface';
import { MemberInfo, ServerInfo, TQChatSearchOrder } from './QChatServerServiceInterface';
import { StrAnyObj } from './types';
/**
 * 调用方式:
 * ```js
 * qchat.qchatMsg.sendMessage(options)
 * ```
 */
export interface QChatMsgServiceInterface {
    /**
     * 在频道中发送消息。此接口即包含文本消息，又包含图片、音视频、位置、提示、自定义消息等。
     *
     * - 发送方必要拥有发送消息的权限
     * - 如果您希望在发送消息前提前得到QChatMessage以便于插入界面中，请使用 SendMessageOptions.onSendBefore  回调方法。
     * - 更多文档请参考: [圈组消息收发](https://doc.yunxin.163.com/messaging-enhanced/docs/DcyMTA4Nzg?platform=web)
     *
     * #### 影响范围
     * - 频道中用户收到 {@link QChatEventInterface.message | message} 事件
     * - 频道中用户收到 {@link QChatEventInterface.unreadInfos | unreadInfos} 事件
     * - 频道中用户收到 {@link QChatEventInterface.serverUnreadInfo | serverUnreadInfo} 事件
     *
     * @example
     * ```js
     * // 接收方
     * qchat.on('message', message => {})
     *
     * // 发送方
     * const msg1 = await qchat.qchatMsg.sendMessage({
     *   "serverId": "{{YOUR_SERVERID}}",
     *   "channelId": "{{YOUR_CHANNELID}}",
     *   "type": "text",
     *   "body": "This is a test message",
     *   "mentionAccids": ["accountId1", "accountId2"]
     * })
     * ```
     */
    sendMessage(options: SendMessageOptions & IUploadFileOptions): Promise<QChatMessage>;
    /**
     * 如果因为网络等原因发送消息失败（deliveryStatus 为 failed），可调用 resendMessage 方法（调用时传入发送失败的完整的消息体），实现消息重发。
     *
     * 注意：只有当 QChatMessage 的 deliveryStatus 字段为 failed 时才可以进行重发消息。
     */
    resendMessage(options: QChatMessage): Promise<QChatMessage>;
    /**
     * 更新某条消息
     *
     * - 只有消息的发送者才可以更新这个消息。更新的字段
     *
     * #### 影响范围
     * - 频道中用户收到 {@link QChatEventInterface.messageUpdate | messageUpdate} 事件
     */
    updateMessage(options: UpdateMessageOptions): Promise<Partial<QChatMessage>>;
    /**
     * 撤回某条消息
     *
     * 注意：
     *
     * 1. 只有消息的发送者才可以更新这个消息。更新的字段
     *
     * 2. 返回的内容只是部分的消息体字段
     */
    revokeMessage(options: RovokeMessageOptions): Promise<Partial<QChatMessage>>;
    /**
     * 删除某条消息
     *
     * 注意：
     *
     * 1. 只有消息的发送者才可以更新这个消息。更新的字段
     *
     * 2. 返回的内容只是部分的消息体字段
     */
    deleteMessage(options: DeleteMessageOptions): Promise<Partial<QChatMessage>>;
    /**
     * 回复消息
     */
    replyMessage(options: ReplyMessageOptions): Promise<QChatMessage>;
    /**
     * 标记消息已读
     */
    markMessageRead(options: MarkMesaageReadOptions): Promise<void>;
    /**
     * 发送自定义系统通知
     *
     * 自定义系统通知属于系统通知, 可用于更自由的离线通知某些账号。SDK 不会解析这些通知, SDK 仅仅负责传递这些通知。
     *
     * 那么系统消息的接收者会收到 {@link QChatEventInterface.systemNotification | systemNotification} 事件
     */
    sendSystemNotification(options: SendSystemNotificationOptions): Promise<QChatSystemNotification>;
    /**
     * 更新系统通知
     *
     * 注意：满足三个条件才可以更新通知，否则返回 414
     *
     * 1. 该系统通知存离线(msgIdServer 不为 0，且 persistEnable 为 true);
     *
     * 2. 该系统通知有 toAccids 字段，指定了通知的接收者
     *
     * 3. 操作人是系统通知的接收者
     */
    updateSystemNotification(options: UpdateSystemNotificationOptions): Promise<QChatSystemNotification>;
    /**
     * 标记系统消息已读，下次登陆不会再同步到此通知
     *
     * 注意：标记已读后，也无法再次修改这条通知。
     */
    markSystemNotificationsRead(options: MarkSystemNotificationsReadOptions): Promise<void>;
    /**
     * 分页获取指定频道的历史消息。
     *
     * @example
     * ```js
     * const messages = await qchat.qchatMsg.getHistoryMessage({
     *  serverId: 'serverId',
     *  channelId: 'channelId',
     *  limit: 100
     * })
     * ```
     */
    getHistoryMessage(options: GetHistoryMessageOptions): Promise<QChatMessage[]>;
    /**
     * 根据消息的 msgIdServer 查询历史消息，不分页，一次最多查询 100 条
     */
    getMessageHistoryByIds(options: GetMessageHistoryByIdsOptions): Promise<QChatMessage[]>;
    /**
     * 分页获取某个频道中 @ 当前用户的未读消息列表
     *
     * - timestamp 为查询起始时间，传入 0 表示当前时间。查询 ack 到 timestamp时间范围内 at 当前用户的未读消息
     * - 默认倒序查询
     *
     * @example
     * ```js
     * const messages = await qchat.qchatMsg.getMentionedMeMessages({
     *   "serverId": "YOUR_SERVERID",
     *   "channelId": "YOUR_CHANNELID",
     *   "timestamp": 0,
     *   "limit": 200
     * })
     * ```
     */
    getMentionedMeMessages(options: NIMEQChatGetMentionedMeMessagesOptions): Promise<NIMEQChatGetMentionedMeMessagesResults>;
    /**
     * 批量查询消息是否 @ 当前用户
     *
     * - 自己发出的消息为 false
     * - at 所有人返回 true
     * - 被 at 的账号包含本账号返回为 true
     * - 被 at 的身份组的账号中的包含自己返回为 true
     *
     * 注2: 待查询的消息必须为同一服务器下的消息，否则会返回 10414 错误码
     */
    areMentionedMeMessages(options: NIMEQChatAreMentionedMeMessagesOptions): Promise<NIMEQChatAreMentionedMeMessagesResult>;
    /**
     * 查询某消息的 “回复消息” 以及 “根消息”
     */
    getReferMessages(options: GetReferMessagesOptions): Promise<GetReferMessagesResult>;
    /**
     * 查询 thread 聊天的历史，结果分页
     */
    getThreadMessages(options: GetThreadMessagesOptions): Promise<GetThreadMessagesResult>;
    /**
     * 批量查询 thread 根消息的 meta 信息
     */
    getThreadRootMessagesMeta(options: GetThreadRootMessagesMetaOptions): Promise<GetThreadRootMessagesMetaResult>;
    /**
     * 添加一条快捷评论。
     *
     * - 快捷评论是一个操作功能，并非一种消息类型。评论内容并非一条消息，而是一个 number 类型，由开发者指定评论内容与界面展示之间的联系。
     * - 圈组的快捷评论功能需要在开通圈组功能的基础上额外开通后才能使用。
     *
     * #### 影响范围
     * - 频道中用户收到 {@link QChatEventInterface.updateQuickComment | updateQuickComment} 圈组内置系统通知
     * - 系统通知的 attach.notify.opeType = 1，表示新增快捷评论
     *
     * @example
     * ```js
     * await qchat.qchatMsg.addQuickComment({
     *    "commentMessage": msg,
     *    "type": 1
     * })
     *
     * // 接收方
     * qchat.on('systemNotification', notification => {
     *     console.log(notification.systemNotifications.map(_ => _.type))
     * })
     * ```
     */
    addQuickComment(options: QChatUpdateQuickCommentOptions): Promise<void>;
    /**
     * 删除一条快捷评论
     *
     * #### 影响范围
     * - 频道中用户收到 {@link QChatEventInterface.updateQuickComment | updateQuickComment} 圈组内置系统通知
     * - 系统通知的 attach.notify.opeType = 2，表示删除快捷评论
     *
     * @example
     * ```js
     * await qchat.qchatMsg.removeQuickComment({
     *    "commentMessage": msg,
     *    "type": 1
     * })
     *
     * // 接收方
     * qchat.on('systemNotification', notification => {
     *     console.log(notification.systemNotifications.map(_ => _.type))
     * })
     * ```
     */
    removeQuickComment(options: QChatUpdateQuickCommentOptions): Promise<void>;
    /**
     * 批量查询快捷评论
     *
     * @example
     * ```js
     * const result = await qchat.qchatMsg.getQuickComments({
     *   serverId: "serverId",
     *   channelId: "channelId",
     *   msgList: [msg1, msg2]
     * })
     * ```
     */
    getQuickComments(options: QChatGetQuickCommentsOptions): Promise<QChatGetQuickCommentsResult>;
    /**
     * 发送正在输入事件
     *
     * 注1：API 有节流操作，相同频道每 3s 仅发送一次。
     *
     * 注2：接收方需要调用 subscribeChannel 来订阅正在输入事件后，才能收到指定频道的正在输入事件
     */
    sendTypingEvent(options: QChatSendTypingEventOptions): Promise<void>;
    /**
     * 获取指定服务器下，若干个频道的最后一条消息
     *
     * 注：被撤回的消息仍旧能被查到，而被删除的消息无法查到
     *
     * @example
     * ```js
     * qchat.qchatMsg.getLastMessageOfChannels({
     *   "serverId": "serverId",
     *   "channelIdList": [
     *     "channel1", "channel2"
     *   ]
     * })
     * ```
     */
    getLastMessageOfChannels(options: QChatGetLastMessageOfChannelsOptions): Promise<QChatGetLastMessageOfChannelsResult>;
    /**
     * 检索消息
     */
    searchMsgByPage(options: QChatSearchMsgByPageOptions): Promise<QChatSearchMsgByPageResult>;
}
export interface IUploadFileOptions {
    /**
     * JS 的 File 对象。
     *
     * 浏览器专用
     */
    file?: File;
    /**
     * 即将弃用！！存储文件的 DOM 元素，与上面的 file 只要选填一个就可以了。
     *
     * 浏览器专用。
     *
     * 如果传字符串，最后会以 document.getElementById('fileInput').files[0] 拿到 File 对象
     * 如果传的是 DOM 节点，最后以 fileInput.files[0] 拿到 File 对象
     *
     */
    fileInput?: string | HTMLInputElement;
    /**
     * 临时文件路径
     *
     * uni-app，RN，小程序等特殊的 JS 运行环境专用（chooseImage 拿到的临时路径）
     */
    filePath?: string;
    /**
     * maxSize 限制文件大小。
     *
     * 对浏览器生效(v10.0.0+)
     *
     * 而在 uni-app、小程序等 filePath 上传场景中，调用 stat 方法检测生效 (v10.9.90+)。
     *
     * 若宿主环境不支持文件大小探查，则仍建议开发者在选择文件后自行判断，参考 wx.chooseImage、uni.chooseImage 等端能力。
     */
    maxSize?: number;
    /**
     * 存储场景，不传默认实例化配置，默认为"im"
     */
    nosScenes?: string;
    /**
     * 存储有效时间，不传则默认实例化配置
     *
     * 不得小于一天，单位秒
     */
    nosSurvivalTime?: number;
    /**
     * 上传进度
     */
    onUploadProgress?: (obj: FileProgressObject) => void;
    /**
     * 上传前回调事件
     */
    onUploadStart?: (task: {
        abort: () => void;
        [key: string]: any;
    }) => void;
    /**
     * 上传完成的回调
     */
    onUploadDone?: (file: UploadFileResult) => void;
}
export interface FileProgressObject {
    /**
     * 总大小
     */
    total: number;
    /**
     * 已上传大小
     */
    loaded: number;
    /**
     * 已上传进度
     */
    percentage: number;
    /**
     * 已上传进度的文本描述
     */
    percentageText: string;
}
export interface UploadFileResult {
    /**
     * 文件名
     */
    name: string;
    /**
     * 文件 url
     */
    url: string;
    /**
     * 文件后缀
     */
    ext: string;
    /**
     * 文件大小，单位字节
     */
    size?: number;
    /**
     * 宽度。
     */
    w?: number;
    /**
     * 高度
     */
    h?: number;
    /**
     * 音频/视频 文件的时长
     */
    dur?: number;
    md5?: string;
    /**
     * 图片的转向
     */
    orientation?: string;
    /**
     * 音频解码格式
     */
    audioCodec?: string;
    /**
     * 视频解码格式
     */
    videoCodec?: string;
    /**
     * 音视频文件的容器
     */
    container?: string;
}
export declare const enum ESystemNotificationEventFeature {
    /**
     * 默认，在线接到的
     */
    default = 1,
    /**
     * 同步时接到的离线系统通知
     */
    sync = 2
}
/**
 * qchatMsg 模块的监听事件
 *
 * Example：
 *
 * const instance = new SDK()
 *
 * instance.qchatMsg.on('message', msg => { console.log(msg) }
 */
export interface NIMEQChatMsgServiceListener {
    /**
     * 收到消息
     */
    message: [msg: QChatMessage];
    /**
     * 收到消息更新
     */
    messageUpdate: [msg: QChatMessage, updateOperatorInfo: QChatMessageUpdateOperatorInfo];
    /**
     * 收到系统通知
     */
    systemNotification: [
        notificationEvent: {
            /**
             * 此事件的特性，用于区别接到的是：同步阶段的离线的系统通知、在线接到的系统通知
             */
            feature: keyof typeof ESystemNotificationEventFeature;
            systemNotifications: QChatSystemNotification[];
        }
    ];
    /**
     * 收到系统通知更新
     *
     * 注: 是本账号多端同步收到的事件
     */
    systemNotificationUpdate: [sysNotification: QChatSystemNotification];
    /**
     * 收到“正在输入”事件
     */
    recvTypingEvent: [event: QChatRecvTypingEventResult];
}
export interface QChatRecvTypingEventResult {
    /**
     * 服务器id
     */
    serverId: string;
    /**
     * 频道id
     */
    channelId: string;
    /**
     * 扩展字段，推荐使用 JSON 格式字符串。
     */
    ext?: string;
    /**
     * 事件发送者的 account id
     */
    fromAccount: string;
    /**
     * 发送者的昵称
     */
    fromNick?: string;
    /**
     * 发送时间戳
     */
    time: number;
}
export interface NIMEQChatAreMentionedMeMessagesResult {
    /**
     * key 为消息的客户端 id, value 用于判定消息是否 @ 当前用户.
     */
    [key: string]: boolean;
}
export interface NIMEQChatAreMentionedMeMessagesOptions {
    /**
     * 待查询的消息列表
     */
    messages: QChatMessage[];
}
export interface NIMEQChatGetMentionedMeMessagesOptions {
    /**
     * 服务器 id
     */
    serverId: string;
    /**
     * 频道 id
     */
    channelId: string;
    /**
     * 查询的起始时间位置. 默认 0, 为最早的一条被艾特且未读的消息的时间
     */
    timestamp?: number;
    /**
     * 分页的页码大小, 默认 200
     */
    limit?: number;
}
export interface NIMEQChatGetMentionedMeMessagesResults {
    /**
     * 分页信息
     */
    pageInfo: {
        /**
         * 是否还有下一页的数据
         */
        hasMore: boolean;
        /**
         * 下一次翻页时的起始时间戳
         */
        nextTimetag: number;
        /**
         * 查询游标，下次查询的起始位置
         */
        cursor?: string;
    };
    /**
     * 消息数据
     */
    messages: QChatMessage[];
}
export interface QChatSearchMsgByPageResult {
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
    datas: QChatMessage[];
}
export declare type TSortType = keyof typeof QChatEServerSortType;
export declare enum QChatEServerSortType {
    sendTime = 1
}
export interface QChatSearchMsgByPageOptions {
    /**
     * 检索关键字
     */
    keyword?: string;
    /**
     * 消息所属的服务器的id
     */
    serverId: string;
    /**
     * 消息所属的频道的id
     */
    channelId?: string;
    /**
     * 消息发送者账号
     */
    fromAccid?: string;
    /**
     * 开始时间
     */
    fromTime?: number;
    /**
     * 结束时间
     */
    toTime?: number;
    /**
     * 消息类型，必选 0-TEXT、 1-PICTURE、 3-VIDEO、 6-FILE 例：['0','1']
     */
    msgTypes: string[];
    /**
     * 消息子类型
     */
    subTypes?: number[];
    /**
     * 可选、包含自己的消息， 默认不包含. 该字段如果为true，那么搜索的结果是包含自己的除subType限制之外条件的所有符合条件的消息。如果该字段为空，则搜索的结果是包含自己的受其他所有条件限制的消息
     */
    includeSelf?: boolean;
    /**
     * 排序规则：ASC-升序 ,DESC-倒序 默认DESC
     */
    order?: TQChatSearchOrder;
    /**
     * 查询数量, 默认100
     */
    limit?: number;
    /**
     * sendTime-发送时间（默认）
     */
    sort?: TSortType;
    /**
     * 查询游标
     */
    cursor?: string;
}
export declare enum EMsgType {
    text = 0,
    image = 1,
    audio = 2,
    video = 3,
    geo = 4,
    notification = 5,
    file = 6,
    tip = 10,
    robot = 11,
    g2 = 12,
    custom = 100
}
export declare type TMsgType = keyof typeof EMsgType;
/**
 * 消息的送达状态，区分发送中，发送失败，发送成功三种。
 */
export declare enum EDeliveryStatus {
    sending = 1,
    success = 2,
    failed = 3
}
/**
 * 消息的送达状态，区分发送中，发送失败，发送成功三种。
 */
export declare type TDeliveryStatus = keyof typeof EDeliveryStatus;
/**
 * 通知下发的原因 1为本消息发给了channel里的所有人 2为本消息只发给订阅的人。
 */
export declare enum ENotifyReason {
    notifyAll = 1,
    notifySubscribe = 2
}
export declare type TNotifyReason = keyof typeof ENotifyReason;
export declare enum EClientType {
    Android = 1,
    iOS = 2,
    PC = 4,
    WindowsPhone = 8,
    Web = 16,
    Server = 32,
    Mac = 64,
    HarmonyOS = 65
}
export declare type TClientType = keyof typeof EClientType;
export interface QChatMessageForGEOAttach {
    /**
     * GEO 地理位置信息专属：纬度
     */
    lat?: number;
    /**
     * GEO 地理位置信息专属：经度
     */
    lng?: number;
    /**
     * GEO 地理位置信息专属：所在地名称
     */
    title?: string;
}
export interface QChatMessage {
    /**
     * 消息所属的服务器的id
     */
    serverId: string;
    /**
     * 消息所属的频道的id
     */
    channelId: string;
    /**
     * 消息类型
     */
    type: TMsgType;
    /**
     * 消息的内容，type 为 text，tip 时有此值，其他的类型不一定有。
     */
    body?: string;
    /**
     * 附加内容，type 为 custom，image，video，audio，file，geo 等类型都会附带这个
     *
     * 其中 image，video，audio，file 作为文件类型，返回值是 UploadFileResult
     *
     * 而 geo 的返回是 QChatMessageForGEOAttach
     *
     * 而 custom 的返回一个可以随意 key-value 的对象
     */
    attach?: UploadFileResult & QChatMessageForGEOAttach & {
        /**
         * custom 自定义类型的消息可以随意填写对象属性
         */
        [key: string]: any;
    };
    /**
     * 扩展字段
     */
    ext?: string;
    /**
     * SDK 端测生成的消息id，消息唯一凭证，主键
     */
    msgIdClient: string;
    /**
     * IM 服务端生成的消息 id，如果消息发送成功，服务器将会赋予这个值.
     *
     * 注意：不要和上面的 serverId 概念混起来
     */
    msgIdServer: string;
    /**
     * 是否为重发的消息
     */
    resendFlag?: boolean;
    /**
     * 消息的状态
     *
     * 0: 一般状态，默认。
     * 1: 被撤回。
     * 2: 被删除。
     * 大于 10000 ，用户自定义。
     */
    status?: number;
    /**
     * 消息的送达状态，区分发送中，发送失败，发送成功三种。
     */
    deliveryStatus?: TDeliveryStatus;
    /**
     * 移动端 APP 推送相关-推送属性
     */
    pushPayload?: StrAnyObj;
    /**
     * 移动端 APP 推送相关-推送内容
     */
    pushContent?: string;
    /**
     * 是否 “艾特” 了所有人
     */
    mentionAll?: boolean;
    /**
     * 被 “艾特” 的人的 account id 列表
     */
    mentionAccids?: string[];
    /**
     * 抄送相关-环境变量
     *
     * 注：开发者可以根据不同的 env 配置不同的抄送和回调地址。仅当 routeEnable 为 true 时生效
     */
    env?: string;
    /**
     * 抄送相关-第三方回调扩展字段
     */
    callbackExt?: string;
    /**
     * 消息发送方, 帐号
     */
    fromAccount: string;
    /**
     * 发送方的设备类型
     */
    fromClientType?: TClientType;
    /**
     * 发送端设备id
     */
    fromDeviceId?: string;
    /**
     * 消息发送方的昵称
     */
    fromNick?: string;
    /**
     * 消息发送成功的时间戳(单位毫秒)
     */
    time: number;
    /**
     * 最后更新时间
     */
    updateTime: number;
    /**
     * 是否触发反垃圾，而被拦截。默认 false
     */
    isAntispam?: boolean;
    /**
     * 反垃圾相关字段
     */
    antiSpamInfo?: QChatMessageAntiSpamInfo;
    /**
     * “回复消息”的引用
     */
    replyRefer?: QChatMessageRefer;
    /**
     * ”thread 根消息“引用
     */
    threadRefer?: QChatMessageRefer;
    /**
     * 是否存云端消息历史，缺省则 true
     */
    historyEnable?: boolean;
    /**
     * 开关位-推送相关：是否开启推送
     *
     * 注意：该参数设置作用于服务器推送给移动端设备，JS SDK 只作设置
     */
    pushEnable?: boolean;
    /**
     * 开关位-推送相关：是否需要消息计数（APP 的角标计数）
     *
     */
    needBadge?: boolean;
    /**
     * 开关位-推送相关：是否需要推送昵称
     */
    needPushNick?: boolean;
    /**
     * 下发通知的原因
     */
    notifyReason?: TNotifyReason;
    /**
     * 开关位-抄送相关：消息是否需要抄送。
     *
     * 默认为 true
     */
    routeEnable?: boolean;
    /**
     * 消息在上次更新后的内容，当消息曾被更新过/删除过/撤回过时存在。
     */
    updateContent?: {
        /**
         * 消息更新后的状态，定义同上文的  {@link QChatMessage.status | status}
         *
         * 注，存在条件为：撤回，删除，或者更新消息为自定义状态。
         */
        status?: number;
        /**
         * 消息更新后的 ext 内容
         *
         * 注，存在条件为：若消息更新时，有 ext 的变动。
         */
        ext?: string;
        /**
         * 消息更新后的 body 内容
         *
         * 注，存在条件为：若消息更新时，有 body 的变动。
         */
        body?: string;
    };
    /**
     * 消息在上次更新后的操作信息
     */
    updateOperatorInfo?: QChatMessageUpdateOperatorInfo;
    /**
     * 消息子类型
     */
    subType?: number;
    /**
     * 被艾特的身份组的 roleId 列表
     *
     * 注: 大 server 的场景下, IM 服务端返回这个这个用于判定收到消息的账号是否包含在被艾特的身份组成员中, 来做被艾特的未读数更新, 开发者并不需要关心.
     */
    mentionRoleIds?: string[];
    /**
     * 被艾特的身份组的成员的账号列表
     *
     * 注: 小 server 场景下，IM 服务端会直接计算得到艾特的身份组下包含的成员, 用于做被艾特的未读数更新, 开发者并不需要关心.
     */
    accidsOfMentionedRoles?: string[];
}
/**
 * 消息引用结构，用于存在回复消息的情况
 */
export interface QChatMessageRefer {
    /**
     * 消息发送者的账号
     */
    fromAccount: string;
    /**
     * 消息发送时间
     */
    time: number;
    /**
     * 消息的 msgIdServer
     */
    msgIdServer: string;
    /**
     * 消息的 msgIdClient
     */
    msgIdClient: string;
}
export declare const enum NIMEQChatEnumSystemMsgToType {
    /**
     * 默认值，需要由用户修改，否则报错 414 参数错误
     */
    unknown = 0,
    /**
     * 发送到 Server
     *
     * 仅 Server ID 必定存在
     */
    server = 1,
    /**
     * 发送到 Channel
     *
     * serverId / channelId 必定存在
     */
    channel = 2,
    /**
     * 发送到某 server 下的某账号
     *
     * serverId / toAccids 必定存在
     */
    serverAccids = 3,
    /**
     * 发送到某 Channel 下的某账号
     *
     * serverId / channelId / toAccids 必填
     */
    channelAccids = 4,
    /**
     * 发送到某账号
     *
     * 系统通知内必定存在 toAccids, 而 serverId 与 channelId 为空
     */
    accids = 5
}
export declare enum ESystemMessageType {
    /**
     * (有权限者)邀请服务器成员
     *
     * 注：若邀请动作需要被邀请者的同意，下发此通知。
     */
    serverMemberInvite = 1,
    /**
     * (普通用户)拒绝邀请
     */
    serverMemberInviteReject = 2,
    /**
     * (普通用户)申请加入服务器
     *
     * 注：若申请动作需要有权限者的同意，下发此通知。
     */
    serverMemberApply = 3,
    /**
     * (有权限者)拒绝申请
     */
    serverMemberApplyReject = 4,
    /**
     * 创建服务器
     */
    serverCreate = 5,
    /**
     * 删除服务器
     */
    serverRemove = 6,
    /**
     * 修改服务器信息
     */
    serverUpdate = 7,
    /**
     * (有权限者)已邀请服务器成员。
     *
     * 注：若邀请动作需要被邀请者的同意，才会下发此通知。
     */
    serverMemberInviteDone = 8,
    /**
     * (普通用户)接受邀请
     */
    serverMemberInviteAccept = 9,
    /**
     * (普通用户)已申请加入服务器
     *
     * 注：若申请动作不需要有权限者的同意，下发此通知。
     */
    serverMemberApplyDone = 10,
    /**
     * (有权限者)接受申请
     */
    serverMemberApplyAccept = 11,
    /**
     * 踢除服务器成员
     */
    serverMemberKick = 12,
    /**
     * 主动离开服务器
     */
    serverMemberLeave = 13,
    /**
     * 修改服务器成员信息
     */
    serverMemberUpdate = 14,
    /**
     * 创建频道
     */
    channelCreate = 15,
    /**
     * 删除频道
     */
    channelRemove = 16,
    /**
     * 修改频道信息
     */
    channelUpdate = 17,
    /**
     * 频道修改黑白名单身份组
     */
    channelUpdateWhiteBlackIdentify = 18,
    /**
     * 频道修改黑白名单成员
     */
    channelUpdateWhiteBlackIdentifyUser = 19,
    /**
     * 更新了快捷评论表情
     *
     * 该通知的 attach 里的 notify 参见 {@link QChatQuickCommentRequest | QChatQuickCommentRequest}
     */
    updateQuickComment = 20,
    /**
     * 创建了“频道分组”
     *
     * 该通知的 attach 里将会返回 categoryInfo，格式参见 {@link QChatChannelCategoryInfo | QChatChannelCategoryInfo}
     */
    channelCategoryCreate = 21,
    /**
     * 删除了“频道分组”
     *
     * 该通知的 attach 里将会返回 categoryId
     */
    channelCategoryRemove = 22,
    /**
     * 更新了“频道分组”
     *
     * 该通知的 attach 里将会返回 categoryInfo，格式参见 {@link QChatChannelCategoryInfo | QChatChannelCategoryInfo}
     */
    channelCategoryUpdate = 23,
    /**
     * 修改“频道分组”的黑白名单里的身份组
     */
    channelCategoryUpdateWhiteBlackIdentify = 24,
    /**
     * 修改“频道分组”的黑白名单里的成员
     */
    channelCategoryUpdateWhiteBlackIdentifyUser = 25,
    /**
     * 加入服务器身份组
     */
    serverIdentifyAdd = 26,
    /**
     * 移出服务器身份组
     */
    serverIdentifyRemove = 27,
    /**
     * 更新服务器身份组权限
     */
    serverIdentifyUpdate = 28,
    /**
     * 更新频道身份组权限
     */
    channelIdentifyUpdate = 29,
    /**
     * 更新频道个人定制权限
     */
    userIdentifyUpdate = 30,
    /**
     * 频道对当前用户可见性变更
     */
    channelVisibilityUpdate = 31,
    /**
     * 当前用户进入/离开服务器
     */
    serverEnterLeave = 32,
    /**
     * 用户通过邀请码加入服务器
     *
     * attach 字段: type, serverInfo, requestId, inviteCode
     */
    serverMemberJoinByInviteCode = 33,
    /**
     * 频道对游客可见性变更
     */
    channelVisibilityToVisitorUpdate = 34,
    /**
     * 当前用户服务器成员信息对 IM 资料的联动变更
     */
    myMemberInfoUpdated = 35,
    /**
     * 自定义系统通知相关
     */
    custom = 100,
    /**
     * 正在输入
     *
     * 注：不主动抛给开发者这个类型的系统通知，改而通知事件 {@link QChatEventInterface.recvTypingEvent | recvTypingEvent}
     */
    msgTyping = 101
}
export declare type TSystemMessageType = keyof typeof ESystemMessageType;
/**
 * 通知类型为 myMemberInfoUpdated 的系统通知的附加信息
 */
export interface NIMEQChatSystemNotificationAttachMyMemberInfoUpdated {
    type: TSystemMessageType;
    /**
     * 变更后的用户资料信息, 若通知类型为 myMemberInfoUpdated 时存在.
     */
    updatedInfos: {
        /**
         * 服务器 ID
         */
        serverId: string;
        /**
         * 用户昵称
         */
        nick?: string;
        /**
         * 昵称是否有更新
         */
        nickChanged?: boolean;
        /**
         * 头像
         */
        avatar?: string;
        /**
         * 头像是否有更新
         */
        avatarChanged?: boolean;
    }[];
}
export interface QChatSystemNotification {
    /**
     * 通知所属的服务器的id
     */
    serverId: string;
    /**
     * 通知所属的频道的id
     */
    channelId: string;
    /**
     * SDK 端测生成的消息id，自定义的系统通知里才存在。可以用于去重
     */
    msgIdClient?: string;
    /**
     * IM 服务端生成的系统通知 id，作为系统消息的唯一凭证。
     *
     * 注意，只有当这条系统通知存离线 (persistEnable = true)，才会有此字段，否则都为 "0"
     */
    msgIdServer: string;
    /**
     * 系统通知类型
     *
     * 频道相关的有 ...
     * 服务器相关的 ....
     * 其他的如自定义的系统通知等类型。
     */
    type: TSystemMessageType;
    /**
     * 系统通知目标。
     *
     * 注: 提供的是一个枚举，开发者真实接收的 toType 内容是一个数字.
     */
    toType: NIMEQChatEnumSystemMsgToType;
    /**
     * 系统通知的附加信息
     */
    attach: {
        type: TSystemMessageType;
        /**
         * 若 type 为 serverMemberKick，把某人踢出服务器，那么通知里 attach 里携带被踢人的账号
         */
        kickedAccids?: string[];
        /**
         * 举例加入某个服务器，那么通知里 attach 里携带想要加入的服务器信息
         */
        serverInfo?: ServerInfo;
        /**
         * 举例若是修改了服务器上自己或者其他人的信息，那么通知里 attach 携带变更后的成员信息
         */
        serverMember?: MemberInfo;
        /**
         * 举例若是更新了某个频道，那么通知里 attach 携带要更新的频道的信息
         */
        channelInfo?: ChannelInfo;
        /**
         * 服务器/频道的进出标识(或者可见性)
         *
         * event 为 1 表示进入(或者说恢复可见)服务器/频道, 2表示退出(或者说设置为不可见)服务器/频道
         *
         * 举例:
         * 1. type 为 channelVisibilityUpdate, event 字段代表频道能力变更时，这个频道对用户的可见性.
         * 2. type 为 serverEnterLeave, event 字段代表服务器进出.
         * 3. type 为 channelVisibilityToVisitorUpdate, event 字段代表频道对游客的可见性变更。
         */
        event?: number;
        [key: string]: any;
    } & NIMEQChatSystemNotificationAttachMyMemberInfoUpdated;
    /**
     * 自定义系统通知可追加的扩展字段
     */
    ext?: string;
    /**
     * 是否为重发的
     */
    resendFlag?: boolean;
    /**
     * 系统通知的目标账号 account id 列表 即收到这条消息的账号列表
     */
    toAccids?: string[];
    /**
     * 系统通知状态，0 为 默认。大于 10000 为用户自定义的状态
     */
    status?: number;
    /**
     * 系统通知的来源, account id
     */
    fromAccount: string;
    /**
     * 发送方的设备类型
     */
    fromClientType?: TClientType;
    /**
     * 发送端设备id
     */
    fromDeviceId?: string;
    /**
     * 消息发送方的昵称
     */
    fromNick?: string;
    /**
     * 第三方自定义的推送属性，限制 json
     */
    pushPayload?: StrAnyObj;
    /**
     * 自定义推送文案
     */
    pushContent?: string;
    /**
     * 开关位：是否可以存入离线通知。默认 false
     *
     * 注意：只有 toAccids 不为空，才能设置为存离线。
     */
    persistEnable?: boolean;
    /**
     * 开关位-推送相关：是否需要推送。默认 false
     */
    pushEnable?: boolean;
    /**
     * 开关位-推送相关：是否需要消息计数
     */
    needBadge?: boolean;
    /**
     * 开关位-推送相关：是否需要推送昵称
     */
    needPushNick?: boolean;
    /**
     * 通知发送成功的时间戳(单位毫秒)
     */
    time: number;
    /**
     * 最后更新时间
     */
    updateTime: number;
}
export interface SendMessageOptions {
    /**
     * 消息所属的服务器的id
     */
    serverId: string;
    /**
     * 消息所属的频道的id
     */
    channelId: string;
    /**
     * 消息类型
     */
    type: TMsgType;
    /**
     * 消息的内容（若是文件类型的消息，那么这个字段可以不用填）
     */
    body?: string;
    /**
     * 附加内容（自定义，geo 等类型的消息需要附带这个）
     */
    attach?: UploadFileResult & QChatMessageForGEOAttach & {
        /**
         * custom 自定义类型的消息可以随意填写对象属性
         */
        [key: string]: any;
    };
    /**
     * 扩展字段，推荐传递 JSON 格式化的字符串
     */
    ext?: string;
    /**
     * 抄送相关-环境变量
     *
     * 注：开发者可以根据不同的 env 配置不同的抄送和回调地址。仅当 routeEnable 为 true 时生效
     */
    env?: string;
    /**
     * 抄送相关-第三方回调扩展字段
     */
    callbackExt?: string;
    /**
     * 移动端 APP 推送相关-推送属性
     */
    pushPayload?: StrAnyObj;
    /**
     * 移动端 APP 推送相关-推送内容
     */
    pushContent?: string;
    /**
     * 是否 “艾特” 了所有人
     */
    mentionAll?: boolean;
    /**
     * 被 “艾特” 的人的 account id 列表
     */
    mentionAccids?: string[];
    /**
     * 是否存云端消息历史，缺省则 true
     */
    historyEnable?: boolean;
    /**
     * 开关位-推送相关：是否开启推送
     *
     * 注意：该参数设置作用于服务器推送给移动端设备，JS SDK 只作设置
     */
    pushEnable?: boolean;
    /**
     * 开关位-推送相关：是否需要消息计数（APP 的角标计数）
     *
     * 注意：该参数设置作用于服务器推送给移动端设备，JS SDK 只作设置
     */
    needBadge?: boolean;
    /**
     * 开关位-推送相关：是否需要推送昵称
     */
    needPushNick?: boolean;
    /**
     * 开关位-抄送相关：消息是否需要抄送。
     *
     * 默认为 true
     */
    routeEnable?: boolean;
    /**
     * 发送前的回调函数，用于发送前拿到这个消息对象
     * 此时这个消息对象还没有 idServer 和准确的 time，并且 status 也只是在 sending
     */
    onSendBefore?: (msg: QChatMessage) => void;
    /**
     * 反垃圾相关字段
     */
    antiSpamInfo?: QChatMessageAntiSpamInfo;
    /**
     * 消息子类型
     */
    subType?: number;
    /**
     * 被艾特的身份组的roleId列表（大server场景下使用）
     */
    mentionRoleIds?: string[];
}
export interface QChatMessageAntiSpamInfo {
    /**
     * 指定是否需要使用自定义反垃圾字段(即antiSpamContent) true:需要,false:不需要,默认不需要
     */
    useCustomContent: boolean;
    /**
     * 开发者自定义的反垃圾字段, 如果提供了这个字段, 在过反垃圾时不会再使用content或者attach
     */
    antiSpamContent: string;
    /**
     * 用户配置的对某些单条消息另外的反垃圾的业务ID
     */
    antiSpamBusinessId: string;
    /**
     * 单条消息是否使用易盾反垃圾, 0:(在开通易盾的情况下)不过易盾反垃圾, 其他都是按照原来的规则
     */
    antiSpamUsingYidun: boolean;
    /**
     * 易盾check的回调URL, 目前仅支持Audio类型的消息, 最长256个字符, 如果不合法则忽略该参数
     */
    yidunCallback: string;
    /**
     * 易盾反垃圾增强反作弊专属字段, 限制json, 长度限制1024
     */
    yidunAntiCheating: string;
    /**
     * 易盾反垃圾扩展字段, 限制json, 长度限制1024
     */
    yidunAntiSpamExt: string;
    /**
     * 易盾反垃圾返回的结果字段
     */
    yidunAntiSpamRes: string;
}
export interface SendSystemNotificationOptions {
    /**
     * 通知所属的服务器的id
     */
    serverId: string;
    /**
     * 通知所属的频道的id
     */
    channelId: string;
    /**
     * 通知的目标, account id 列表
     */
    toAccids?: string[];
    /**
     * 通知内容
     */
    body: string;
    /**
     * 内建系统通知的附加信息, JSON 对象
     */
    attach?: {
        [key: string]: any;
    };
    /**
     * 自定义系统通知可追加的扩展字段
     */
    ext?: string;
    /**
     * 是否为重发的
     */
    resendFlag?: boolean;
    /**
     * 抄送相关-环境变量
     *
     * 注：开发者可以根据不同的 env 配置不同的抄送和回调地址。仅当 routeEnable 为 true 时生效
     */
    env?: string;
    /**
     * 第三方自定义的推送属性，限制 json
     */
    pushPayload?: StrAnyObj;
    /**
     * 自定义推送文案
     */
    pushContent?: string;
    /**
     * 开关位：是否可以存入离线通知。默认 false
     *
     * 注意：只有 toAccids 不为空，才能设置为存离线。
     */
    persistEnable?: boolean;
    /**
     * 开关位-抄送相关：消息是否需要抄送。
     *
     * 默认为 true
     */
    routeEnable?: boolean;
}
export interface GetHistoryMessageOptions {
    /**
     * 所属的服务器的id
     */
    serverId: string;
    /**
     * 所属的频道的id
     */
    channelId: string;
    /**
     * 查询条件-开始时间，默认 0，代表不限制
     *
     */
    beginTime?: number;
    /**
     * 查询条件-结束时间，默认 0，代表不限制
     *
     */
    endTime?: number;
    /**
     * 查询条件-上一条 msgIdServer（服务器生成的消息id）。
     *
     * 注意：这个值只是辅助 beginTime 和 endTime 区间范围使用的，他的用处是在发送时间相同的两条消息里区分出来，而自身其实不能起到分页排序的关键。
     *
     * 总之想要达成分页获取的目的，请传上一次获取到的消息体的 time 作为 beginTime/endTime，消息体的 msgIdServer 作为 excludeMsgId
     */
    excludeMsgId?: string;
    /**
     * 分页参数。默认获取 100 条
     */
    limit?: number;
    /**
     * 是否反向查询。
     *
     * 默认 false 表示从 endTime 开始往前查找历史消息，
     *
     * true 表示从 beginTime 开始往后查找历史消息
     */
    reverse?: boolean;
}
export interface MarkSystemNotificationsReadOptions {
    systemNotifications: QChatSystemNotification[];
}
export interface UpdateMessageOptions {
    /**
     * 操作附言
     */
    ps?: string;
    /**
     * 扩展字段
     */
    ext?: string;
    /**
     * 推送相关-推送内容
     */
    pushContent?: string;
    /**
     * 推送相关-推送参数
     */
    pushPayload?: StrAnyObj;
    /**
     * 抄送相关-环境变量
     *
     * 注：开发者可以根据不同的 env 配置不同的抄送和回调地址。仅当 routeEnable 为 true 时生效
     */
    env?: string;
    /**
     * 开关位-抄送相关：消息是否需要抄送。
     *
     * 默认为 true
     */
    routeEnable?: boolean;
    /**
     * 要更新的消息内容
     *
     * 其中必填 serverId、channelId、msgIdServer、time 用于区分消息
     *
     * 其中选填 body、ext、作为可更新的内容
     */
    message: {
        /**
         * 消息所属的服务器的id
         */
        serverId: string;
        /**
         * 消息所属的频道的id
         */
        channelId: string;
        /**
         * IM 服务端生成的消息 id，如果消息发送成功，服务器将会赋予这个值.
         *
         * 注意：不要和上面的 serverId 概念混起来
         */
        msgIdServer: string;
        /**
         * 消息发送成功的时间戳(单位毫秒)
         */
        time: number;
        /**
         * 消息的内容
         */
        body?: string;
        /**
         * 附加内容，自定义，文件，geo 等类型都会附带这个
         */
        /**
         * 扩展字段
         */
        ext?: string;
        /**
         * 消息的状态，必须大于等于 10000，视为自定义状态
         */
        status?: number;
        /**
         * 反垃圾相关字段
         */
        antiSpamInfo?: QChatMessageAntiSpamInfo;
        /**
         * 消息子类型
         */
        subType?: number;
    };
}
export interface RovokeMessageOptions {
    /**
     * 操作附言
     */
    ps?: string;
    /**
     * 扩展字段
     */
    ext?: string;
    /**
     * 推送相关-推送内容
     */
    pushContent?: string;
    /**
     * 推送相关-推送参数
     */
    pushPayload?: StrAnyObj;
    /**
     * 抄送相关-环境变量
     *
     * 注：开发者可以根据不同的 env 配置不同的抄送和回调地址。仅当 routeEnable 为 true 时生效
     */
    env?: string;
    /**
     * 开关位-抄送相关：消息是否需要抄送。
     *
     * 默认为 true
     */
    routeEnable?: boolean;
    /**
     * 要撤回的消息内容
     *
     * 其中必填 serverId、channelId、msgIdServer、time
     */
    message: Partial<QChatMessage>;
}
export interface DeleteMessageOptions {
    /**
     * 操作附言
     */
    ps?: string;
    /**
     * 扩展字段
     */
    ext?: string;
    /**
     * 推送相关-推送内容
     */
    pushContent?: string;
    /**
     * 推送相关-推送参数
     */
    pushPayload?: StrAnyObj;
    /**
     * 抄送相关-环境变量
     *
     * 注：开发者可以根据不同的 env 配置不同的抄送和回调地址。仅当 routeEnable 为 true 时生效
     */
    env?: string;
    /**
     * 开关位-抄送相关：消息是否需要抄送。
     *
     * 默认为 true
     */
    routeEnable?: boolean;
    /**
     * 要删除的消息内容
     *
     * 其中必填 serverId、channelId、msgIdServer、time
     */
    message: Partial<QChatMessage>;
}
export interface MarkMesaageReadOptions {
    /**
     * 服务器id
     */
    serverId: string;
    /**
     * 频道id
     */
    channelId: string;
    /**
     * 时间戳，此频道你读过最新的消息的时间戳
     */
    time: number;
}
export interface UpdateSystemNotificationOptions {
    /**
     * 操作附言
     */
    ps?: string;
    /**
     * 扩展字段
     */
    ext?: string;
    /**
     * 推送相关-推送内容
     */
    pushContent?: string;
    /**
     * 推送相关-推送参数
     */
    pushPayload?: StrAnyObj;
    /**
     * 抄送相关-环境变量
     *
     * 注：开发者可以根据不同的 env 配置不同的抄送和回调地址。仅当 routeEnable 为 true 时生效
     */
    env?: string;
    /**
     * 开关位-抄送相关：消息是否需要抄送。
     *
     * 默认为 true
     */
    routeEnable?: boolean;
    /**
     * 要更新的系统通知内容
     *
     * 其中必填 msgIdServer、type
     *
     * 其中选填 body、ext、status 作为可更新的内容
     */
    systemNotification: Partial<QChatSystemNotification>;
}
/**
 * 回复消息的入参 = 普通消息类型定义 + 文件类型的扩展 + 回复消息的扩展
 */
export declare type ReplyMessageOptions = SendMessageOptions & IUploadFileOptions & {
    /**
     * 回复的消息对象
     */
    replyMessage: QChatMessage;
};
export interface GetMessageHistoryByIdsOptions {
    /**
     * 服务器id
     */
    serverId: string;
    /**
     * 频道id
     */
    channelId: string;
    /**
     * “回复消息”列表
     */
    messageReferList: QChatMessageRefer[];
}
export declare enum EQChatMessageReferType {
    reply = 1,
    thread = 2,
    all = 3
}
export declare type TQChatMessageReferType = keyof typeof EQChatMessageReferType;
export interface GetReferMessagesOptions {
    /**
     * 某消息
     */
    message: QChatMessage;
    /**
     * 回复消息的类型
     *
     * 默认 "all"，即查询被回复的消息以及根消息
     *
     * "reply"，只查询被回复的消息
     *
     * "thread"，只查询根消息
     *
     */
    referType: TQChatMessageReferType;
}
export interface GetReferMessagesResult {
    /**
     * 被回复的消息
     */
    replyMessage?: QChatMessage;
    /**
     * thread 根消息
     */
    threadMessage?: QChatMessage;
}
export interface GetThreadMessagesOptions {
    /**
     * 要查询的消息
     *
     * 注：可以是根消息，也可以是子消息
     */
    message: QChatMessage;
    /**
     * 查询条件 QChatMessageQueryOption
     */
    messageQueryOption: {
        /**
         * 查询条件-开始时间，默认 0，代表不限制
         *
         */
        beginTime?: number;
        /**
         * 查询条件-结束时间，默认 0，代表不限制
         *
         */
        endTime?: number;
        /**
         * 查询条件-上一条 msgIdServer（服务器生成的消息id）。
         *
         * 注意：这个值只是辅助 beginTime 和 endTime 区间范围使用的，他的用处是在发送时间相同的两条消息里区分出来，而自身其实不能起到分页排序的关键。
         *
         * 总之想要达成分页获取的目的，请传上一次获取到的消息体的 time 作为 beginTime/endTime，消息体的 msgIdServer 作为 excludeMsgId
         */
        excludeMsgId?: string;
        /**
         * 分页参数。默认获取 100 条
         */
        limit?: number;
        /**
         * 是否反向查询。
         *
         * 默认 false 表示从 endTime 开始往前查找历史消息，
         *
         * true 表示从 beginTime 开始往后查找历史消息
         */
        reverse?: boolean;
    };
}
export interface GetThreadMessagesResult {
    /**
     * thread 根消息的消息引用结构
     */
    thread: QChatMessageRefer;
    /**
     * thread聊天信息  QChatMessageThreadInfo
     */
    threadInfo: {
        /**
         * 总回复数
         */
        messageCount: number;
        /**
         * 最后一条消息的时间戳
         */
        lastMessageTimestamp: number;
    };
    /**
     * 查询到的thread历史消息
     */
    messages: QChatMessage[];
}
export interface QChatUpdateQuickCommentOptions {
    /**
     * 被评论消息
     */
    commentMessage: QChatMessage;
    /**
     * 评论类型
     */
    type: number;
}
export interface QChatGetQuickCommentsOptions {
    /**
     * 消息所属的服务器的id
     */
    serverId: string;
    /**
     * 消息所属的频道的id
     */
    channelId: string;
    /**
     * 消息列表，1次最多10条
     */
    msgList: QChatMessage[];
}
/**
 * 快捷评论的内容
 */
export interface QChatQuickCommentDetail {
    /**
     * 评论类型
     */
    type: number;
    /**
     * 评论数量
     */
    count: number;
    /**
     * 自己是否添加了该类型评论
     */
    hasSelf: boolean;
    /**
     * 若干个添加了此类型评论的 account id 列表.
     *
     * 注：不是按照操作时间排序的，可以认为是随机取了N个
     */
    severalAccids: string[];
    /**
     * 某个类型快捷评论类型的创建时间
     */
    createTime: number;
}
export interface QChatGetQuickCommentsResult {
    /**
     * key 为 msgIdServer
     */
    [key: string]: {
        /**
         * 消息所属的服务器的id
         */
        serverId: string;
        /**
         * 消息所属的频道的id
         */
        channelId: string;
        /**
         * 服务端给出的消息Id
         */
        msgIdServer: string;
        /**
         * 获取总评论数
         */
        totalCount: number;
        /**
         * 消息评论最后一次操作的时间
         */
        lastUpdateTime: number;
        /**
         * 评论详情列表
         */
        details: QChatQuickCommentDetail[];
    };
}
export interface QChatQuickCommentRequest {
    /**
     * 消息所属的服务器的id
     */
    serverId: string;
    /**
     * 消息所属的频道的id
     */
    channelId: string;
    /**
     * 发送者的账号 id
     */
    fromAccount: string;
    /**
     * 服务端给出的消息Id
     */
    msgIdServer: string;
    /**
     * 消息发送时间
     */
    time: number;
    /**
     * 快捷评论的自定义类型
     */
    type: number;
    /**
     * 该快捷评论的操作类型
     *
     * 注：1 为添加此快捷评论，2 为删除此快捷评论
     */
    opeType: number;
    /**
     * 该快捷评论的操作者的账号 id
     */
    opeAccid: string;
}
export interface GetThreadRootMessagesMetaOptions {
    /**
     * 服务器的id
     */
    serverId: string;
    /**
     * 频道的id
     */
    channelId: string;
    /**
     * 要查询的 thread 根消息的列表
     */
    threadRootMessages: QChatMessage[];
}
export declare type GetThreadRootMessagesMetaResult = {
    /**
     * 总回复数
     */
    total: number;
    /**
     * 最后一次回复的时间戳
     */
    timestamp: number;
    /**
     * thread root消息的消息id
     */
    msgIdServer: string;
    /**
     * thread root消息的发送时间
     */
    msgTime: number;
}[];
export interface QChatSendTypingEventOptions {
    /**
     * 服务器id
     */
    serverId: string;
    /**
     * 频道id
     */
    channelId: string;
    /**
     * 扩展字段，推荐使用 JSON 格式字符串。
     */
    ext?: string;
}
export interface QChatGetLastMessageOfChannelsOptions {
    /**
     * 服务器 ID
     */
    serverId: string;
    /**
     * channelId 列表
     *
     * 注：channelId 要求属于这个 server 的
     */
    channelIdList: string[];
}
export interface QChatGetLastMessageOfChannelsResult {
    /**
     * 其中 key 为 channelId
     */
    [key: string]: QChatMessage;
}
/**
 * 消息更新的操作信息
 */
export interface QChatMessageUpdateOperatorInfo {
    /**
     * 操作者账号 id
     */
    operatorAccount: string;
    /**
     * 操作者客户端类型
     */
    operatorClientType: TClientType;
    /**
     * 操作附言
     */
    ps?: string;
    /**
     * 扩展字段
     */
    ext?: string;
    /**
     * 推送相关-推送内容
     */
    pushContent?: string;
    /**
     * 推送相关-推送参数
     */
    pushPayload?: StrAnyObj;
}
