import RootStore from ".";
import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import { V2NIMConversationType } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMConversationService";
import { V2NIMLocalConversationForUI, V2NIMLocalConversationResult, V2NIMMessage, V2NIMP2PMessageReadReceipt } from "./types";
import * as storeUtils from "./utils";
/**
 * 管理本地会话列表的数据存储。
 *
 * 它与 `ConversationStore` 的区别是：这里走的是本地会话能力，适合只依赖本端缓存的会话列表场景；
 * 如果业务需要以云端同步状态为准，应优先使用 `ConversationStore`。当前选中的会话仍由 `uiStore.selectedConversation` 维护。
 */
export declare class LocalConversationStore {
    private rootStore;
    private nim;
    /** 本地会话缓存，key 为 `conversationId`。 */
    conversations: Map<string, V2NIMLocalConversationForUI>;
    /** 当前全部本地会话的总未读数。 */
    totalUnreadCount: number;
    /** 调试日志实例；用于记录本地会话同步、未读数变化和列表操作。 */
    logger: typeof storeUtils.logger | null;
    constructor(rootStore: RootStore, nim: NIM);
    /**
     * 清空本地会话缓存和总未读数。
     *
     * 适合在退出登录、切换账号或重建业务状态时调用。
     */
    resetState(): void;
    /**
     * 销毁当前本地会话数据存储实例。
     *
     * 调用后会重置本地会话状态、清空未读统计，并注销当前实例注册的本地会话事件监听，用于释放当前生命周期占用的资源。
     */
    destroy(): void;
    /**
     * 往本地会话内存中新增或合并会话。
     *
     * 这是纯内存更新，不会调用 SDK，通常配合本地会话同步回调或列表查询结果一起使用。
     * @param conversations 会话数组
     */
    addConversation(conversations: V2NIMLocalConversationForUI[]): void;
    /**
     * 更新本地会话内存中的字段。
     *
     * 适合处理未读数、已读时间、@ 提醒等本地展示状态，不会请求服务端。
     * @param conversations 会话数组
     */
    updateConversation(conversations: V2NIMLocalConversationForUI[]): void;
    /**
     * 从本地会话内存中移除会话。
     *
     * 如果移除的是当前选中会话，会同时清空 `uiStore.selectedConversation`。
     * @param conversationIds 会话 ID 数组
     */
    removeConversation(conversationIds: string[]): void;
    /**
     * 重置本地会话未读数。
     *
     * 会先清理本地内存中的未读数，再调用本地会话 SDK 能力更新缓存状态，适合进入会话页后调用。
     * @param conversationId 消息所属的会话 ID
     */
    resetConversation(conversationId: string): Promise<void>;
    /**
     * 创建或补齐一条本地会话记录。
     *
     * 常用于业务从联系人或群资料页发起聊天前，确保本地最近会话列表里存在该会话；
     * 如果 `isSelected` 为 `true`，成功后还会联动选中这个会话。
     * @param conversationType 会话类型
     * @param receiverId 接收方账号或群 id
     * @param isSelected 创建后是否顺便选中
     */
    insertConversationActive(conversationType: V2NIMConversationType, receiverId: string, isSelected?: boolean): Promise<void>;
    /**
     * 删除一条本地会话记录。
     *
     * 会调用本地会话 SDK 删除缓存中的会话，同时先从内存列表移除；这里不会删除历史消息内容。
     * @param conversationId 消息所属的会话 ID
     */
    deleteConversationActive(conversationId: string): Promise<void>;
    /**
     * 设置本地会话是否置顶。
     *
     * 会调用本地会话 SDK 更新排序状态，适合只依赖本地会话列表的置顶交互。
     * @param conversationId 消息所属的会话 ID
     * @param stickTop 是否置顶
     */
    stickTopConversationActive(conversationId: string, stickTop: boolean): Promise<void>;
    /**
     * 拉取本地会话列表。
     *
     * 返回结果来自本地会话缓存，不依赖云端同步；查询结果会写回本地内存，并为 P2P 会话补充消息已读回执时间。
     * @param offset 分页偏移量
     * @param limit 分页拉取数量
     */
    getConversationListActive(offset: number, limit: number): Promise<V2NIMLocalConversationResult>;
    /**
     * 获取 P2P 会话最后一条消息的已读回执时间。
     *
     * 这里仍会调用消息 SDK 获取回执结果，再把结果回写到本地会话内存中的 `msgReceiptTime` 字段。
     */
    getP2PMessageReceipt(conversationIds: string[]): Promise<V2NIMP2PMessageReadReceipt[]>;
    private _resetMemoryConversationUnreadCount;
    /**
     * 获取本地会话的已读时间戳。
     *
     * 该时间由本地会话 SDK 维护，适合业务判断当前端缓存下的已读进度。
     */
    getConversationReadTimeActive(conversationId: string): Promise<number>;
    /**
     * 标记本地会话已读时间戳。
     *
     * 会调用本地会话 SDK 更新本端缓存的已读时间；适合本地会话列表模式下在进入聊天页后调用。
     */
    markConversationReadActive(conversationId: string): Promise<number>;
    /**
     * 根据消息内容更新本地会话里的 @ 提醒状态。
     *
     * 这是依赖本地缓存和已读时间做的内存计算，不会直接修改服务端会话状态。
     */
    handleConversationWithAit(msgs: V2NIMMessage[]): void;
    /**
     * 清空本地会话中的 @ 提醒标记。
     *
     * 这是纯内存操作，适合业务在用户进入会话并消费完提醒后调用。
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
