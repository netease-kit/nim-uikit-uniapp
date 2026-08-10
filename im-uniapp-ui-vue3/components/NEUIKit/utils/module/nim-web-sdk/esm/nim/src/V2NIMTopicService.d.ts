import type { NIMEBaseServiceClass } from './types';
import { V2NIMMessage, V2NIMSendMessageParams, V2NIMSendMessageResult } from './V2NIMMessageService';
import { V2NIMQueryDirection } from './V2NIMConst';
/**
 * v2 Topic 会话模块
 *
 * 注: 使用 dist/esm 产物时，需要动态引入 V2NIMTopicService 后使用
 *
 * @example
 * ```
 * import { NIM, V2NIMTopicService } from '..'
 * NIM.registerService(V2NIMTopicService, 'V2NIMTopicService')
 * ```
 */
export declare class V2NIMTopicService extends NIMEBaseServiceClass<V2NIMTopicListener> {
    /**
     * 批量删除 Topic
     *
     * @param params 删除 Topic 参数
     *
     * @example
     * ```ts
     * await nim.V2NIMTopicService.removeTopics({ topicList: [topic] })
     * ```
     */
    removeTopics(params: V2NIMRemoveTopicsParams): Promise<void>;
    /**
     * 更新 Topic
     *
     * @param params 更新 Topic 参数
     * @returns 更新后的 Topic
     *
     * @example
     * ```ts
     * const updatedTopic = await nim.V2NIMTopicService.updateTopic({ topic, topicName: '新名称' })
     * ```
     */
    updateTopic(params: V2NIMUpdateTopicParams): Promise<V2NIMTopic>;
    /**
     * 分页查询 Topic 列表
     *
     * @param option 查询参数
     * @returns Topic 列表查询结果
     *
     * @example
     * ```ts
     * const result = await nim.V2NIMTopicService.getTopicListByOption({ conversationId: 'cid' })
     * ```
     */
    getTopicListByOption(option: V2NIMTopicListOption): Promise<V2NIMTopicListResult>;
    /**
     * 查询 Topic 关联消息列表（Web 端全走服务器查询）
     *
     * @param option 查询参数
     * @returns Topic 消息列表查询结果
     *
     * @example
     * ```ts
     * const result = await nim.V2NIMTopicService.getTopicMessageList({ topic })
     * ```
     */
    getTopicMessageList(option: V2NIMTopicMessageListOption): Promise<V2NIMTopicMessageListResult>;
    /**
     * 发送 Topic 消息
     *
     * - 当 `topic` 为 null 时，通过 CID=28 原子操作新建 Topic 并发送消息
     * - 当 `topic` 不为 null 时，复用 SendUtil 发送消息并写入 topicId 字段
     *
     * @param message 需要发送的消息体，由 V2NIMMessageCreator 对应方法创建
     * @param conversationId 会话 id
     * @param topic 已有 Topic，传 null 表示新建 Topic
     * @param params 发送 Topic 消息参数
     * @param progress 发送进度回调
     *
     * @example
     * ```ts
     * // 新建 Topic 并发送
     * const result = await nim.V2NIMTopicService.sendTopicMessage(message, conversationId, null, {
     *   createTopicParams: { topicName: '我的话题' }
     * })
     * // 向已有 Topic 发消息
     * const result = await nim.V2NIMTopicService.sendTopicMessage(message, conversationId, topic)
     * ```
     */
    sendTopicMessage(message: V2NIMMessage, conversationId: string, topic: V2NIMTopic | null, params?: V2NIMSendTopicMessageParams, progress?: (percentage: number) => void): Promise<V2NIMSendMessageResult>;
    /**
     * 回复 Topic 消息
     *
     * @param message 需要发送的消息体
     * @param replyMessage 被回复的消息
     * @param topic 所属 Topic
     * @param params 发送消息相关配置参数
     * @param progress 发送进度回调
     *
     * @example
     * ```ts
     * const result = await nim.V2NIMTopicService.replyTopicMessage(message, originalMessage, topic)
     * ```
     */
    replyTopicMessage(message: V2NIMMessage, replyMessage: V2NIMMessage, topic: V2NIMTopic, params?: V2NIMSendMessageParams, progress?: (percentage: number) => void): Promise<V2NIMSendMessageResult>;
    /**
     * 根据 Topic 引用查询完整 Topic 信息（CID=27）
     *
     * Web 端实现语义为 mixed：优先查本地 Topic 库（Web 无 DB，直接走服务端），
     * 未命中时回退到 CID 27 查询 Topic 详情。
     *
     * @param topicRefer Topic 引用（可直接传 V2NIMMessage.topicRefer，也可传完整 V2NIMTopic）
     * @returns 完整 Topic 信息，若不存在则返回 null
     *
     * @example
     * ```ts
     * // 新建 Topic 并发送后，通过返回消息的 topicRefer 查询 Topic 详情
     * const result = await nim.V2NIMTopicService.sendTopicMessage(message, conversationId, null, {
     *   createTopicParams: { topicName: '我的话题' }
     * })
     * const topic = await nim.V2NIMTopicService.getTopicByRefer(result.message.topicRefer)
     * ```
     */
    getTopicByRefer(topicRefer: V2NIMTopicRefer): Promise<V2NIMTopic>;
}
/**
 * Topic 引用（Topic 的最小定位信息）
 *
 * 用于消息侧快速判断与定位 Topic，`V2NIMTopic` 继承此结构。
 *
 * 使用约定：
 * - `V2NIMMessage.topicRefer != null`：表示当前消息是 Topic 消息
 * - `V2NIMMessage.topicRefer == null`：表示当前消息不是 Topic 消息
 */
export interface V2NIMTopicRefer {
    /**
     * Topic 所属会话 ID
     */
    conversationId: string;
    /**
     * Topic ID（对应协议层 collectId）
     */
    topicId: number;
    /**
     * Topic 创建时间（对应 ConversationCollectInfoTag.collectTime(4)）
     */
    createTime: number;
}
/**
 * Topic 数据结构（继承 V2NIMTopicRefer）
 */
export interface V2NIMTopic extends V2NIMTopicRefer {
    /**
     * 所属会话 id
     */
    conversationId: string;
    /**
     * Topic id（对应协议层 collectId）
     */
    topicId: number;
    /**
     * Topic 名称（从 data JSON 中解析）
     */
    topicName: string;
    /**
     * Topic 关联消息的客户端 id（从 data JSON 中解析）
     */
    messageClientId: string;
    /**
     * Topic 关联消息的服务端 id（从 data JSON 中解析）
     */
    messageServerId: string;
    /**
     * Topic 关联消息的时间戳（从 data JSON 中解析）
     */
    messageTime: number;
    /**
     * 服务器扩展字段
     */
    serverExtension?: string;
    /**
     * Topic 创建时间（对应协议层 collectTime）
     */
    createTime: number;
    /**
     * Topic 更新时间
     */
    updateTime: number;
}
/**
 * 批量删除 Topic 参数
 */
export interface V2NIMRemoveTopicsParams {
    /**
     * 需要删除的 Topic 列表
     */
    topicList: V2NIMTopic[];
}
/**
 * 更新 Topic 参数
 */
export interface V2NIMUpdateTopicParams {
    /**
     * 需要更新的 Topic（包含 conversationId、topicId、createTime）
     */
    topic: V2NIMTopic;
    /**
     * 新的 Topic 名称，不传则保持原值
     */
    topicName?: string;
    /**
     * 新的服务器扩展字段，不传则保持原值
     */
    serverExtension?: string;
}
/**
 * 查询 Topic 列表参数
 */
export interface V2NIMTopicListOption {
    /**
     * 会话 id
     */
    conversationId: string;
    /**
     * 查询开始时间，默认为 0
     */
    beginTime?: number;
    /**
     * 查询结束时间，默认为 0（表示不限制）
     */
    endTime?: number;
    /**
     * 分页 token，首次查询传空字符串
     */
    nextToken?: string;
    /**
     * 每页返回数量，默认为 50
     */
    limit?: number;
    /**
     * 查询方向，默认为 DESC
     */
    direction?: V2NIMQueryDirection;
}
/**
 * 查询 Topic 列表结果
 */
export interface V2NIMTopicListResult {
    /**
     * Topic 列表
     */
    topicList: V2NIMTopic[];
    /**
     * 下一页分页 token
     */
    nextToken: string;
    /**
     * 是否还有更多数据
     */
    hasMore: boolean;
}
/**
 * 查询 Topic 消息列表参数
 */
export interface V2NIMTopicMessageListOption {
    /**
     * 所属 Topic（必须包含 messageServerId 和 messageTime）
     */
    topic: V2NIMTopic;
    /**
     * 查询开始时间，默认为 0
     */
    beginTime?: number;
    /**
     * 查询结束时间，默认为 0
     */
    endTime?: number;
    /**
     * 锚点消息（用于排除该消息）
     */
    anchorMessage?: V2NIMMessage;
    /**
     * 查询数量，默认为 50
     */
    limit?: number;
    /**
     * 查询方向，默认为 DESC
     */
    direction?: V2NIMQueryDirection;
    /**
     * 结果排序方向，默认为 DESC
     */
    sortOrder?: V2NIMQueryDirection;
}
/**
 * 查询 Topic 消息列表结果
 */
export interface V2NIMTopicMessageListResult {
    /**
     * 消息回复列表
     */
    replyList: V2NIMMessage[];
    /**
     * 是否还有更多数据
     */
    hasMore: boolean;
    /**
     * 锚点消息
     */
    anchorMessage?: V2NIMMessage;
}
/**
 * 新建 Topic 参数（在 sendTopicMessage topic=null 时使用）
 */
export interface V2NIMCreateTopicParams {
    /**
     * Topic 名称
     */
    topicName?: string;
    /**
     * 服务器扩展字段
     */
    serverExtension?: string;
}
/**
 * 发送 Topic 消息参数
 */
export interface V2NIMSendTopicMessageParams {
    /**
     * 原有消息发送参数
     */
    sendMessageParams?: V2NIMSendMessageParams;
    /**
     * 创建 Topic 参数；仅在 topic == null 时生效，可以为 null。
     * 不为 null 时会进行参数合法性校验：
     * - topicName 写入 data.client.topicName，限 128 字符
     */
    createTopicParams?: V2NIMCreateTopicParams | null;
}
/**
 * Topic 事件监听器
 */
export interface V2NIMTopicListener {
    /**
     * 收到 Topic 新增通知（多端同步）
     *
     * @param topic 新增的 Topic
     */
    onTopicAdded?: (topic: V2NIMTopic) => void;
    /**
     * 收到 Topic 删除通知（多端同步）
     *
     * @param topics 被删除的 Topic 引用列表
     */
    onTopicsRemoved?: (topics: V2NIMTopicRefer[]) => void;
    /**
     * 收到 Topic 更新通知（多端同步）
     *
     * @param topic 更新后的 Topic
     */
    onTopicUpdated?: (topic: V2NIMTopic) => void;
}
