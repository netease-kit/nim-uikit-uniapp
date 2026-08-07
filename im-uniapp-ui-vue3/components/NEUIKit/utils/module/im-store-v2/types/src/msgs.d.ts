import RootStore from ".";
import { LocalOptions, V2NIMMessage, V2NIMSendMessageParams, V2NIMMessageForUI } from "./types";
import { QueueMap } from "./queueMap";
import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import { V2NIMCollectionOption, V2NIMAddCollectionParams, V2NIMCollection, V2NIMMessageAIConfigParams, V2NIMMessageRefer, V2NIMTeamMessageReadReceiptDetail, V2NIMMessageAIStreamStopParams, V2NIMMessageAIRegenParams } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMMessageService";
import * as storeUtils from "./utils";
import PinMsgsMap, { PinInfo, PinInfos } from "./pinMsgsMap";
import { V2NIMConversationType } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMConversationService";
/**
 * 管理消息列表和消息相关业务动作的数据存储。
 *
 * 业务前端通常直接通过它完成发消息、回复、撤回、Pin、历史消息加载等操作。
 * 其中 `...Active` 方法大多会调用 SDK 或服务端接口；`addMsg`、`removeMsg`、`getMsg` 这类方法只维护本地内存，适合做即时界面更新。
 */
export declare class MsgStore {
    private rootStore;
    private nim;
    private localOptions;
    /** 当前会话消息缓存，按会话维度管理历史消息与新消息。 */
    msgs: QueueMap<V2NIMMessageForUI>;
    /** 各会话当前“正在回复”的消息缓存，key 为 `conversationId`。 */
    replyMsgs: Map<string, V2NIMMessage>;
    /** 调试日志实例；用于记录消息相关操作、发送流程和事件回调。 */
    logger: typeof storeUtils.logger | null;
    /** 当前会话的固定消息缓存，按会话维度保存固定消息及其展示状态。 */
    pinMsgs: PinMsgsMap;
    /** 已拉取到本地的收藏消息缓存，key 为消息客户端 ID。 */
    collectionMsgs: Map<string, V2NIMMessage>;
    constructor(rootStore: RootStore, nim: NIM, localOptions: LocalOptions);
    /**
     * 清空本地消息缓存、回复态和 Pin 缓存。
     *
     * 适合在退出登录、切换账号或重建业务状态时调用。
     */
    resetState(): void;
    /**
     * 销毁消息 store，并注销消息相关事件监听。
     */
    destroy(): void;
    /**
     * 为会话设置当前“正在回复”的消息。
     *
     * 这是纯内存状态，常用于输入框上方的回复引用区，不会调用 SDK。
     * @param msg 消息对象
     */
    replyMsgActive(msg: V2NIMMessage): void;
    /**
     * 清除会话当前的回复状态。
     *
     * 这是纯内存操作，通常在发送成功、取消回复或切换会话时调用。
     * @param conversationId 会话 id
     */
    removeReplyMsgActive(conversationId: string): void;
    /**
     * 获取会话当前正在回复的那条消息。
     *
     * 返回值来自本地内存，适合业务界面渲染回复引用区，不会请求服务端。
     * @param conversationId 会话 id
     */
    getReplyMsgActive(conversationId: string): V2NIMMessage | void;
    /**
     * 撤回一条已发送消息。
     *
     * 会调用 SDK 撤回消息；成功后会先从本地消息列表移除原消息，再插入一条撤回提示消息，方便界面直接刷新。
     * @param msg 消息对象
     */
    reCallMsgActive(msg: V2NIMMessage): Promise<void>;
    /**
     * 单向删除消息。
     *
     * 会调用 SDK 删除当前账号视角下的消息；成功后同步清理本地内存中的对应消息。
     * @param msgs 消息对象数组
     */
    deleteMsgActive(msgs: V2NIMMessage[]): Promise<void>;
    /**
     * 发送一条线程回复消息。
     *
     * 适用于业务侧的“回复某条消息”场景。该方法会调用 SDK 的回复能力，成功后清除本地回复态并把结果消息写回消息列表。
     * @param message 要发送的消息对象
     * @param repliedMessage 被回复的消息对象
     * @param conversationId 会话 id
     */
    replyMessageByThreadActive(message: V2NIMMessage, repliedMessage: V2NIMMessage, conversationId: string, params?: V2NIMSendMessageParams): Promise<void>;
    /**
     * 发送一条消息。
     *
     * 这是聊天页最常用的发送入口。调用时会先把消息写入本地内存，便于界面立即上屏；
     * 随后再调用 SDK 真正发送，并在成功或失败后回写发送态、上传进度、回复态等展示字段。
     * @param params 发送消息所需参数
     * @param params.msg 待发送的原始消息对象
     * @param params.conversationId 目标会话 ID
     * @param params.conversationType 目标会话类型；不传时会尽量从会话 ID 推断
     * @param params.progress 附件上传进度回调，返回 `false` 可中断上传流程
     * @param params.sendBefore 消息正式发送前的本地回调，适合先更新界面状态
     * @param params.serverExtension 要附加到消息里的业务扩展字段
     * @param params.previewImg 上传类消息在发送前展示的本地预览图地址
     * @param params.onAISend AI 消息发出前的回调，可读取最终 AI 配置并驱动界面展示
     */
    sendMessageActive(params: {
        msg: V2NIMMessage;
        conversationId: string;
        conversationType?: V2NIMConversationType;
        progress?: (percentage: number) => boolean;
        sendBefore?: (msg: V2NIMMessageForUI) => void;
        serverExtension?: Record<string, unknown>;
        previewImg?: string;
        onAISend?: (msg: V2NIMMessageForUI, aiConfig: V2NIMMessageAIConfigParams) => void;
    }): Promise<V2NIMMessage | void>;
    /**
     * 取消附件消息上传。
     *
     * 会调用 SDK 终止上传，并把这条仍处于发送中的本地消息从内存移除。
     * @param msg 消息对象
     */
    cancelMessageAttachmentUploadActive(msg: V2NIMMessage): Promise<void>;
    /**
     * 发送 p2p 消息已读回执
     * @param msg 消息对象
     */
    sendMsgReceiptActive(msg: V2NIMMessage): Promise<void>;
    /**
     * 添加一个收藏
     * @param params 添加收藏的相关参数
     */
    addCollectionActive(params: V2NIMAddCollectionParams): Promise<void>;
    /**
     * 移除相关收藏
     * @param collections 需要移除的相关收藏
     */
    removeCollectionsActive(collections: V2NIMCollection[]): Promise<void>;
    /**
     * 获取收藏列表
     * @param option 查询参数
     */
    getCollectionListByOptionActive(option: V2NIMCollectionOption): Promise<Array<V2NIMCollection>>;
    /**
     * 发送群组消息已读回执
     * @param msgs 消息数组
     */
    sendTeamMsgReceiptActive(msgs: V2NIMMessage[]): Promise<void>;
    /**
     * 获取群消息已读未读详情
     * @param message 消息
     */
    getTeamMessageReceiptDetailsActive(message: V2NIMMessage, memberAccountIds?: string[]): Promise<V2NIMTeamMessageReadReceiptDetail>;
    /**
     * 拉取会话历史消息。
     *
     * 适合聊天页上拉分页加载更多。该方法会调用 SDK 获取历史记录，并把结果合并到本地消息内存；
     * 如果是群会话，还会补充当前账号已发送消息的已读未读统计。
     * @param options.conversationId 消息所属的会话 ID
     * @param options.endTime 结束时间戳，精确到 ms，默认可传当前时间
     * @param options.lastMsgId 上次查询返回的最后一条消息 `messageServerId`，首次查询可不传
     * @param options.limit 本次查询数量限制，最多 100，默认 100
     */
    getHistoryMsgActive(options: {
        conversationId: string;
        endTime: number;
        lastMsgId?: string;
        limit: number;
    }): Promise<V2NIMMessage[]>;
    /**
     * 转发一条消息到指定会话。
     *
     * 会先清理原消息里不适合转发的 UI 扩展字段，再调用消息创建器生成转发消息并重新发送；
     * 如果传入 `comment`，还会在转发后补发一条文本说明。
     * @param msg 原始消息对象
     * @param conversationId 目标会话 ID
     * @param comment 转发附言
     */
    forwardMsgActive(msg: V2NIMMessageForUI, conversationId: string, comment?: string): Promise<void>;
    /**
     * 获取群消息的已读人数和未读人数。
     *
     * 适合群消息已读回执场景，查询结果会回写到本地消息缓存中的 `yxRead` / `yxUnread` 字段。
     * @param msgs 消息数组
     * @param conversationId 会话 id
     */
    getTeamMsgReadsActive(msgs: V2NIMMessage[], conversationId: string): Promise<void>;
    /**
     * 固定一条消息。
     *
     * 会调用 SDK 修改服务端固定状态，适合业务在聊天页固定重点消息。
     * @param message 需要被固定的消息体
     * @param serverExtension 固定消息相关扩展字段
     */
    pinMessageActive(message: V2NIMMessage, serverExtension?: string): Promise<void>;
    /**
     * 取消固定一条消息。
     *
     * 会调用 SDK 更新服务端状态；成功后该消息不应继续出现在当前会话的固定消息列表中。
     * @param messageRefer 需要取消固定的消息摘要
     * @param serverExtension 固定消息相关扩展字段
     */
    unpinMessageActive(messageRefer: V2NIMMessageRefer, serverExtension?: string): Promise<void>;
    /**
     * 更新一条已固定消息的扩展信息。
     *
     * 会调用 SDK 修改服务端保存的固定消息扩展字段，适合业务给固定消息补充备注或展示配置。
     * @param message 需要更新固定信息的消息体
     * @param serverExtension 固定消息相关扩展字段
     */
    updatePinMessageActive(message: V2NIMMessage, serverExtension?: string): Promise<void>;
    /**
     * 获取会话下的固定消息列表。
     *
     * 优先复用本地 `pinMsgs` 缓存；如果内存里没有，再调用 SDK 对应能力获取并补全消息体。
     * @param conversationId 会话 id
     * @param forceUpdate 是否强制从服务器中获取数据 (断网重连需要强刷来保障获取到更新的部分)
     */
    getPinnedMessageListActive(conversationId: string, forceUpdate?: boolean): Promise<PinInfos>;
    /**
     * 停止流式输出
     * @param message 消息体
     * @param params 停止模式等入参
     */
    stopAIStreamMessageActive(message: V2NIMMessage, params: V2NIMMessageAIStreamStopParams): Promise<void>;
    /**
     * 重新生成 ai 消息
     *
     * 注: 若是流式消息, 必须等到流式分片输出完毕, 才允许调用此 API
     *
     * 此外他支持两种配置
     *
     * 1. 更新，新消息覆盖老消息---只允许更新3天内的消息
     * 2. 新消息，产生一条新消息
     *
     * @param message 需要重新输出的原始数字人消息
     * @param params 确定重新输出的操作类型
     */
    regenAIMessageActive(message: V2NIMMessage, params: V2NIMMessageAIRegenParams): Promise<void>;
    /**
     * 将语音消息转换为文字。
     *
     * 仅适用于音频消息。该方法会调用 SDK 的语音转文字能力；
     * 如果业务已经在消息的 `textOfVoice` 中拿到结果，通常不需要重复请求。
     * 转换成功后，会把识别结果回写到本地消息状态的 `textOfVoice` 字段，方便聊天界面直接展示。
     */
    voiceToTextActive(message: V2NIMMessageForUI): Promise<void>;
    /**
     * 往本地消息内存中写入或覆盖消息。
     *
     * 不会调用 SDK，适合业务在发送前先上屏、在收到通知后补齐界面字段，或做纯前端态修正。
     * @param conversationId 消息所属的会话 ID
     * @param msgs 消息对象数组
     */
    addMsg(conversationId: string, msgs: V2NIMMessageForUI[]): void;
    /**
     * 从本地消息内存中删除消息。
     *
     * 不会调用 SDK，通常用于发送取消、撤回后的本地整理，或业务主动移除某些临时消息。
     * @param conversationId 消息所属的会话 ID
     * @param idClients 端侧生成的消息 ID 数组
     */
    removeMsg(conversationId?: string, idClients?: string[]): void;
    deletePinInfoByMessageClientId(conversationId: string, messageClientIds: string[]): void;
    /**
     * 从本地消息内存中读取消息。
     *
     * 这是纯本地读取，不保证一定是服务端最新状态，适合聊天列表渲染和发送态查询。
     * @param conversationId 消息所属的会话 ID
     * @param idClients 端侧生成的消息 ID 数组
     */
    getMsg(conversationId?: string, idClients?: string[]): V2NIMMessageForUI[];
    updateMsg(conversationId: string, idClient: string, updateParam: Partial<V2NIMMessageForUI>): void;
    handleReceiveAIMsg(msg: V2NIMMessageForUI): V2NIMMessageForUI;
    /** 处理消息的 pinState */
    handleMsgPinState(msg: V2NIMMessageForUI, curPinMsgsMap: Map<string, PinInfo>): V2NIMMessageForUI;
    handleMsgForSDK(msg: V2NIMMessageForUI): V2NIMMessage;
    /**
     * 将多条消息序列化为合并转发消息体。
     *
     * 适合在构造“聊天记录”类型消息前调用，返回值可直接作为自定义消息内容持久化。
     */
    serializeMergeMsgs(msgs: V2NIMMessage[], { appVersion, sdkVersion }: {
        appVersion: string;
        sdkVersion: string;
    }): {
        content: string;
        depth: number;
    };
    /**
     * 将合并转发消息体反序列化为原始消息列表。
     *
     * 适合在聊天记录详情页展开查看原始消息时调用。
     */
    deserializeMergeMsgs(mergeMsg: string): V2NIMMessage[];
    /**
     * 判断一条消息是否为聊天记录合并转发消息。
     *
     * 适合消息列表渲染时决定是否展示“聊天记录卡片”样式。
     */
    isChatMergedForwardMsg(msg: V2NIMMessageForUI): boolean;
    private _getMessageListByRefer;
    /** 从服务器拉 pin 消息列表 */
    private _getPinnedMessageListByServer;
    /** 补全被 pin 的消息 */
    private completePinnedMessageList;
    private _handleSendMsgSuccess;
    private _handleSendMsgFail;
    private _handleClearMsgTimer;
    private _onReceiveMessages;
    private _onReceiveMessagesModified;
    private _onClearHistoryNotifications;
    private _onMessageDeletedNotifications;
    private _onMessagePinNotification;
    private _updateMsgsPinState;
    private _resetMsgsPinState;
    private _onMessageQuickCommentNotification;
    private _onMessageRevokeNotifications;
    private _onReceiveP2PMessageReadReceipts;
    private _onReceiveTeamMessageReadReceipts;
    private _formatExtField;
    private _updateReceiptMsg;
    private _formatExtAitToPushInfo;
    private _createReCallMsg;
    private _createBeReCallMsg;
    private _getAIConfig;
    private _findMinStart;
}
