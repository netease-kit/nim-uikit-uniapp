import RootStore from ".";
import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import { V2NIMConversationType } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMConversationService";
import { V2NIMConversationForUI, V2NIMConversationResult, V2NIMMessage, V2NIMP2PMessageReadReceipt } from "./types";
import * as storeUtils from "./utils";
/**
 * 管理云端会话列表的数据存储。
 *
 * 这里的会话数据以 SDK 的云端会话能力为准，适合业务联系人列表、最近会话列表、未读数和会话已读时间管理等场景。
 * 当前选中的会话 ID 由 `uiStore.selectedConversation` 维护；这里的部分方法会在会话删除或插入后联动更新选中状态。
 */
export declare class ConversationStore {
    private rootStore;
    private nim;
    /** 云端会话缓存，key 为 `conversationId`。 */
    conversations: Map<string, V2NIMConversationForUI>;
    /** 当前全部云端会话的总未读数。 */
    totalUnreadCount: number;
    /** 调试日志实例；用于记录会话同步、未读数变化和列表操作。 */
    logger: typeof storeUtils.logger | null;
    constructor(rootStore: RootStore, nim: NIM);
    /**
     * 清空云端会话缓存和总未读数。
     *
     * 适合在退出登录、切换账号或重建业务状态时调用。
     */
    resetState(): void;
    /**
     * 销毁当前会话数据存储实例。
     *
     * 调用后会重置本地会话状态、清空未读统计，并注销当前实例注册的会话事件监听，用于释放当前生命周期占用的资源。
     */
    destroy(): void;
    /**
     * 往本地会话内存中新增或合并会话。
     *
     * 这是纯内存更新，不会调用 SDK，适合在同步回调、列表查询后统一写入界面所需会话数据。
     * @param conversations 会话数组
     */
    addConversation(conversations: V2NIMConversationForUI[]): void;
    /**
     * 更新本地会话内存中的会话字段。
     *
     * 不会请求服务端，常用于收到未读数、已读时间、@ 提醒等变化后的前端态修正。
     * @param conversations 会话数组
     */
    updateConversation(conversations: V2NIMConversationForUI[]): void;
    /**
     * 从本地会话内存中移除会话。
     *
     * 如果移除的是当前选中会话，会同时清空 `uiStore.selectedConversation`。
     * @param conversationIds 会话 ID 数组
     */
    removeConversation(conversationIds: string[]): void;
    /**
     * 重置会话未读数。
     *
     * 会先修改本地内存中的未读数，再调用 SDK 清空该会话未读计数，适合业务在进入聊天页后主动执行。
     * @param conversationId 消息所属的会话 ID
     */
    resetConversation(conversationId: string): Promise<void>;
    /**
     * 创建或补齐一条会话记录。
     *
     * 常用于业务从通讯录、群资料页发起聊天前，确保最近会话列表中存在该会话。
     * 如果 `isSelected` 为 `true`，成功后还会联动选中这个会话。
     * @param conversationType 会话类型
     * @param receiverId 接收方账号或群 id
     * @param isSelected 创建后是否顺便选中
     */
    insertConversationActive(conversationType: V2NIMConversationType, receiverId: string, isSelected?: boolean): Promise<void>;
    /**
     * 删除一条会话记录。
     *
     * 会调用 SDK 删除云端会话，同时先从本地列表移除；这里不会删除历史消息，表现与线上默认聊天产品一致。
     * @param conversationId 消息所属的会话 ID
     */
    deleteConversationActive(conversationId: string): Promise<void>;
    /**
     * 设置会话是否置顶。
     *
     * 会调用 SDK 更新服务端会话排序状态，适合最近会话列表的置顶/取消置顶操作。
     * @param conversationId 消息所属的会话 ID
     * @param stickTop 是否置顶
     */
    stickTopConversationActive(conversationId: string, stickTop: boolean): Promise<void>;
    /**
     * 拉取云端会话列表。
     *
     * 会调用 SDK 获取会话分页数据，并同步写入本地会话内存；对 P2P 会话还会补充消息已读回执时间，方便会话列表直接展示。
     * @param offset 分页偏移量
     * @param limit 分页拉取数量
     */
    getConversationListActive(offset: number, limit: number): Promise<V2NIMConversationResult>;
    /**
     * 获取 P2P 会话最后一条消息的已读回执时间。
     *
     * 会调用 SDK 查询服务端状态，并把结果回写到本地会话内存中的 `msgReceiptTime` 字段。
     */
    getP2PMessageReceipt(conversationIds: string[]): Promise<V2NIMP2PMessageReadReceipt[]>;
    private _resetMemoryConversationUnreadCount;
    /**
     * 获取会话已读时间戳。
     *
     * 该时间由 SDK / 服务端维护，包含多端已读同步结果，适合业务判断某条消息是否已被当前账号读过。
     */
    getConversationReadTimeActive(conversationId: string): Promise<number>;
    /**
     * 标记会话已读时间戳。
     *
     * 该方法会调用 SDK 更新服务端已读时间，通常在聊天页真正读完消息后调用；
     * 调用后 SDK 可能向多端同步新的已读时间事件。
     */
    markConversationReadActive(conversationId: string): Promise<number>;
    /**
     * 根据消息内容更新会话里的 @ 提醒状态。
     *
     * 这是基于当前本地会话数据和 SDK 已读时间做的内存计算，不会直接修改服务端会话状态。
     */
    handleConversationWithAit(msgs: V2NIMMessage[]): void;
    /**
     * 清空会话中的 @ 提醒标记。
     *
     * 这是纯内存操作，通常在业务进入会话并消费完提醒后调用。
     */
    resetConversationAit(conversationId: string): void;
    private hasAitMsg;
    private _onSyncStarted;
    private _onSyncFinished;
    private _onSyncFailed;
    private _onConversationCreated;
    private _onConversationDeleted;
    private _onConversationChanged;
    private _onTotalUnreadCountChanged;
}
