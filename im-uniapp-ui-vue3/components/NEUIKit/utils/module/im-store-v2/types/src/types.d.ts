import type {
  V2NIMMessage as NIMMessage,
  V2NIMP2PMessageReadReceipt,
  V2NIMSendMessageParams,
} from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMMessageService";
import type {
  V2NIMTeam as NIMTeam,
  V2NIMTeamAgreeMode,
  V2NIMTeamJoinActionInfo as NIMTeamJoinActionInfo,
  V2NIMTeamInviteMode,
  V2NIMTeamJoinActionInfoQueryOption,
  V2NIMTeamJoinActionInfoResult,
  V2NIMTeamJoinMode,
  V2NIMTeamMember as NIMTeamMember,
  V2NIMTeamMemberListResult,
  V2NIMTeamMemberQueryOption,
  V2NIMTeamType,
  V2NIMTeamUpdateExtensionMode,
  V2NIMTeamUpdateInfoMode,
  V2NIMUpdateSelfMemberInfoParams,
  V2NIMUpdateTeamInfoParams,
} from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMTeamService";
import type {
  V2NIMFriend as NIMFriend,
  V2NIMFriendAddApplication as NIMFriendAddApplication,
  V2NIMFriendAddApplicationQueryOption,
  V2NIMFriendAddApplicationResult,
  V2NIMFriendAddParams,
  V2NIMFriendSetParams,
} from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMFriendService";
import type {
  V2NIMConversation as NIMConversation,
  V2NIMConversationResult,
} from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMConversationService";
import type { V2NIMAIUser } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMAIService";
import { V2NIMConst } from "nim-web-sdk-ng/dist/esm/nim";
import type {
  V2NIMLocalConversation as NIMLocalConversation,
  V2NIMLocalConversationResult,
} from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMLocalConversationService";
import type {
  V2NIMUser as NIMUser,
  V2NIMUserUpdateParams,
} from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMUserService";
/**
 * SDK 原始消息对象。
 *
 * 业务侧在消息详情、发送结果处理、消息扩展字段解析等场景中经常会直接用到该类型。
 */
export interface V2NIMMessage extends NIMMessage {}
/**
 * SDK 原始用户资料对象。
 *
 * 适用于用户资料展示、资料卡弹层、头像昵称渲染等场景。
 */
export interface V2NIMUser extends NIMUser {}
/**
 * SDK 原始好友对象。
 *
 * 适用于好友备注、好友关系展示和好友列表渲染等场景。
 */
export interface V2NIMFriend extends NIMFriend {}
/**
 * SDK 原始群组对象。
 *
 * 适用于群资料页、群列表、群设置和群管理能力相关场景。
 */
export interface V2NIMTeam extends NIMTeam {}
/**
 * SDK 原始群成员对象。
 *
 * 适用于群成员列表、群成员资料卡、群角色和群昵称展示等场景。
 */
export interface V2NIMTeamMember extends NIMTeamMember {}
/**
 * SDK 原始云端会话对象。
 *
 * 适用于业务需要直接读取 SDK 会话原始字段的场景。
 */
export interface V2NIMConversation extends NIMConversation {}
/**
 * SDK 原始本地会话对象。
 *
 * 适用于本地会话模式下直接读取 SDK 原始会话字段的场景。
 */
export interface V2NIMLocalConversation extends NIMLocalConversation {}
/**
 * SDK 原始好友申请对象。
 *
 * 适用于系统消息、好友申请审批和申请详情展示等场景。
 */
export interface V2NIMFriendAddApplication extends NIMFriendAddApplication {}
/**
 * SDK 原始入群申请 / 邀请动作对象。
 *
 * 适用于群申请审批、邀请处理和系统消息页相关场景。
 */
export interface V2NIMTeamJoinActionInfo extends NIMTeamJoinActionInfo {}
/** SDK 发送消息参数。 */
export type { V2NIMSendMessageParams };
/** SDK 点对点消息已读回执对象。 */
export type { V2NIMP2PMessageReadReceipt };
/** SDK 用户资料更新参数。 */
export type { V2NIMUserUpdateParams };
/** SDK 好友申请查询参数。 */
export type { V2NIMFriendAddApplicationQueryOption };
/** SDK 好友申请查询结果。 */
export type { V2NIMFriendAddApplicationResult };
/** SDK 添加好友参数。 */
export type { V2NIMFriendAddParams };
/** SDK 设置好友资料参数。 */
export type { V2NIMFriendSetParams };
/** SDK 云端会话列表查询结果。 */
export type { V2NIMConversationResult };
/** SDK 本地会话列表查询结果。 */
export type { V2NIMLocalConversationResult };
/** SDK 群成员列表查询参数。 */
export type { V2NIMTeamMemberQueryOption };
/** SDK 群成员列表查询结果。 */
export type { V2NIMTeamMemberListResult };
/** SDK 更新自己群成员信息的参数。 */
export type { V2NIMUpdateSelfMemberInfoParams };
/** SDK 群资料更新参数。 */
export type { V2NIMUpdateTeamInfoParams };
/** SDK 入群申请记录查询参数。 */
export type { V2NIMTeamJoinActionInfoQueryOption };
/** SDK 入群申请记录查询结果。 */
export type { V2NIMTeamJoinActionInfoResult };
/** SDK 群类型。 */
export type { V2NIMTeamType };
/** SDK 群邀请权限模式。 */
export type { V2NIMTeamInviteMode };
/** SDK 入群模式。 */
export type { V2NIMTeamJoinMode };
/** SDK 入群同意模式。 */
export type { V2NIMTeamAgreeMode };
/** SDK 群资料修改权限模式。 */
export type { V2NIMTeamUpdateInfoMode };
/** SDK 群扩展字段修改权限模式。 */
export type { V2NIMTeamUpdateExtensionMode };
/**
 * 开启云端会话能力时，UI Kit 业务层直接使用的会话对象。
 *
 * 它在 SDK 原始会话对象基础上补充了更适合 UI 展示的字段，便于处理未读、@ 提醒、已读回执等场景。
 */
export interface V2NIMConversationForUI extends V2NIMConversation {
  /** 点对点消息已读时间戳，可用于会话列表中的已读状态展示。 */
  msgReceiptTime?: number;
  /** 当前会话中提及登录用户的消息 id 列表。 */
  aitMsgs?: string[];
  /**
   * 兼容旧业务代码保留的“是否有人@我”标记。
   *
   * 新的 UI 代码更建议优先使用 `aitMsgs`，通过其是否为空来判断是否存在 @ 提醒。
   */
  beMentioned?: boolean;
}
/**
 * 使用本地会话模式时，UI Kit 业务层直接使用的会话对象。
 *
 * 它保留了 SDK 本地会话字段，并补充了会话列表和 @ 提醒展示所需的 UI 扩展字段。
 */
export interface V2NIMLocalConversationForUI extends V2NIMLocalConversation {
  /** 点对点消息已读时间戳，可用于会话列表中的已读状态展示。 */
  msgReceiptTime?: number;
  /** 当前会话中提及登录用户的消息 id 列表。 */
  aitMsgs?: string[];
  /**
   * 兼容旧业务代码保留的“是否有人@我”标记。
   *
   * 新的 UI 代码更建议优先使用 `aitMsgs`，通过其是否为空来判断是否存在 @ 提醒。
   */
  beMentioned?: boolean;
}
/**
 * UI Kit 业务页面中使用的入群申请记录。
 *
 * 适用于入群申请列表、审批流程等场景，既保留 SDK 原始字段，也补充本地 UI 已读状态。
 */
export interface V2NIMTeamJoinActionInfoForUI extends V2NIMTeamJoinActionInfo {
  /** 用于 UI 展示的本地已读标记，该状态由 UI Kit 维护，不属于 SDK 原始字段。 */
  isRead?: boolean;
}
/**
 * UI Kit 业务页面中使用的好友申请记录。
 *
 * 适用于好友申请列表、角标提醒等场景，在 SDK 原始申请数据之外补充本地 UI 已读状态。
 */
export interface V2NIMFriendAddApplicationForUI extends V2NIMFriendAddApplication {
  /** 用于 UI 展示的本地已读标记，该状态由 UI Kit 维护，不属于 SDK 原始字段。 */
  isRead?: boolean;
}
/**
 * 业务侧接入 AI 能力时可选的提供器配置。
 *
 * 当你的产品需要为搜索、翻译等 AI 入口指定使用哪个 AI 账号时，可以实现这些回调。
 */
export interface AIUserAgentProvider {
  /**
   * 返回用于处理应用内搜索或划词助手场景的 AI 用户。
   *
   * 当业务侧需要暴露 AI 搜索入口时实现该回调。可从可用 AI 用户列表中返回一个用户；
   * 返回 `void` 表示不启用该能力。
   */
  getAISearchUser?(user: V2NIMAIUser[]): V2NIMAIUser | void;
  /**
   * 返回用于处理翻译场景的 AI 用户。
   *
   * 当业务侧需要暴露 AI 翻译入口时实现该回调。可从可用 AI 用户列表中返回一个用户；
   * 返回 `void` 表示不展示翻译能力。
   */
  getAITranslateUser?(user: V2NIMAIUser[]): V2NIMAIUser | void;
  /**
   * 返回当前翻译 AI 用户支持的语言编码列表。
   *
   * 当业务侧需要展示翻译语言选择器时，通常配合 `getAITranslateUser` 一起实现。
   */
  getAITranslateLangs?(user: V2NIMAIUser[]): string[];
}
/**
 * UI Kit 业务层直接使用的消息对象。
 *
 * 它在 SDK 原始消息对象基础上补充了上传态、撤回态、编辑态、已读人数、Pin 状态等 UI 展示辅助字段。
 */
export interface V2NIMMessageForUI extends V2NIMMessage {
  /** 文件、图片、视频等上传类消息的上传进度百分比。 */
  uploadProgress?: number;
  /** 上传完成前用于本地预览的图片地址。 */
  previewImg?: string;
  /** 当前业务规则下，该消息是否仍允许撤回。 */
  canRecall?: boolean;
  /** 撤回相关 UI 使用的剩余时间或定时器标记。 */
  reCallTimer?: number;
  /** 发送方是否可以在撤回后重新编辑并发送该消息。 */
  canEdit?: boolean;
  /** 当前消息是否应按“已撤回消息”进行展示。 */
  isRecallMsg?: boolean;
  /** 撤回后重新编辑相关 UI 使用的剩余时间或定时器标记。 */
  canEditTimer?: number;
  /** 区分该消息是被自己撤回，还是被其他参与者撤回。 */
  recallType?: "beReCallMsg" | "reCallMsg";
  /** 重新编辑场景下保留的原始文本内容。 */
  oldText?: string;
  /** 群消息未读人数，用于已读回执相关 UI 展示。 */
  yxUnread?: number;
  /** 群消息已读人数，用于已读回执相关 UI 展示。 */
  yxRead?: number;
  /** 发送失败时的错误码，可用于重试和错误提示。 */
  errorCode?: number;
  /** 消息列表 UI 使用的 Pin 状态：`0` 未 Pin，`1` 已 Pin，`2` Pin 状态更新中。 */
  pinState?: number;
  /** 执行 Pin 或取消 Pin 操作的用户 ID。 */
  operatorId?: string;
  /** 语音消息转文字后的结果，仅在音频消息场景下可能存在。 */
  textOfVoice?: string;
  /** SDK 发送返回中的反垃圾原因；UI 可基于它解析并展示敏感内容提示。 */
  antispamReason?: string;
  /** 从原始消息中复制出的发送者 ID，供 kit 侧渲染逻辑使用。 */
  __kit__senderId?: string;
  /** 从原始消息中复制出的是否本人发送标记，供 kit 侧渲染逻辑使用。 */
  __kit__isSelf?: boolean;
  isSelf?: boolean;
}
/**
 * UI Kit 本地业务行为配置。
 *
 * 当业务侧希望在不修改底层 SDK 初始化参数的前提下，调整功能可见性、群管理默认行为、
 * AI 能力或消息发送规则时，可通过 `RootStore.getInstance` 传入该配置。
 */
export interface LocalOptions {
  /**
     添加好友时是否需要验证，默认 `true`。
     关闭后，业务侧发起好友申请时，目标用户会直接进入好友列表。
     */
  addFriendNeedVerify?: boolean;
  /**
     kit 中展示和执行的群邀请权限模式，默认仅管理员可邀请。
     会直接影响群详情页、群管理页中“邀请成员”相关能力是否对普通成员开放。
     */
  teamInviteMode?: V2NIMTeamInviteMode;
  /**
     入群流程使用的入群模式，默认无需验证。
     适合业务控制“用户申请入群”时是直接进群，还是进入待审批流程。
     */
  teamJoinMode?: V2NIMTeamJoinMode;
  /**
     被邀请用户是否需要同意才能入群，默认无需同意。
     会影响业务侧邀请入群后，是立即生效还是等待被邀请人确认。
     */
  teamAgreeMode?: V2NIMTeamAgreeMode;
  /**
     群资料修改权限模式，默认仅管理员可修改。
     主要影响群名称、群头像、群公告等基础资料是否允许普通成员编辑。
     */
  teamUpdateTeamMode?: V2NIMTeamUpdateInfoMode;
  /**
     群自定义字段修改权限模式，默认所有成员可修改。
     适合业务把群扩展字段作为自定义配置时，限制哪些角色可以修改。
     */
  teamUpdateExtMode?: V2NIMTeamUpdateExtensionMode;
  /**
     kit 是否跟踪并暴露 @ 提醒能力，默认 `true`。
     关闭后，会话列表和聊天页中的“有人@我”提示能力会一并失效。
     */
  needMention?: boolean;
  /**
     转让群主后，原群主是否同时退群，默认 `false`。
     会作为转让群主流程的默认行为，被 `transferTeamActive` 等业务动作复用。
     */
  leaveOnTransfer?: boolean;
  /**
     业务 UI 是否展示转让群主相关操作，默认 `false`。
     打开后通常会在群管理页面暴露“转让群主”入口。
     */
  allowTransferTeamOwner?: boolean;
  /**
     UI 是否展示用户在线/离线状态，默认 `true`。
     适用于会话页头像、联系人资料卡等有在线状态展示需求的页面。
     */
  loginStateVisible?: boolean;
  /**
   * 是否在消息和会话列表中展示点对点消息已读回执，默认 `false`。
   * 打开后，P2P 会话中可基于 `msgReceiptTime` 等字段展示“已读 / 未读”状态。
   */
  p2pMsgReceiptVisible?: boolean;
  /**
   * 是否展示群消息已读回执，默认 `false`。
   * 打开后，群消息可展示已读人数、未读人数等统计信息。
   */
  teamMsgReceiptVisible?: boolean;
  /**
   * 是否在业务 UI 中展示群管理员专属操作，默认 `false`。
   * 例如设置管理员、禁言、审批申请等通常仅管理员可执行的功能入口。
   */
  teamManagerVisible?: boolean;
  /**
   * 是否启用 kit 中的 AI 用户能力，默认 `true`。
   * 关闭后，AI 用户相关入口、会话能力和展示逻辑通常都应被隐藏。
   */
  aiVisible?: boolean;
  /**
   * 是否启用 kit 中的 AI 机器人能力，默认 `true`。
   * 适用于业务需要单独控制机器人能力是否对终端用户可见。
   */
  aiBotsVisible?: boolean;
  /**
   * 是否启用群组相关业务能力；若为 `false`，则隐藏群组相关 UI 与操作。
   * 适合业务只保留单聊场景，不开放群聊入口时使用。
   */
  enableTeam?: boolean;
  /**
   * 单个群默认允许的管理员数量上限，默认 `10`。
   * 主要用于业务 UI 在设置管理员时做前置数量限制。
   */
  teamManagerLimit?: number;
  /**
   * 业务 UI 是否允许切换入群模式，默认 `true`。
   * 关闭后，群资料页通常不再提供“允许任何人加入 / 需审批”等切换入口。
   */
  enableChangeTeamJoinMode?: boolean;
  /**
   * 业务 UI 是否允许切换邀请同意模式，默认 `true`。
   * 关闭后，群资料页通常不再提供“邀请是否需要同意”的切换入口。
   */
  enableChangeTeamAgreeMode?: boolean;
  /**
   * kit 发送消息前触发的异步钩子。
   *
   * 可用于注入或校验业务字段；返回 `false` 表示阻止发送，返回处理后的发送参数表示继续发送。
   */
  sendMsgBefore?: (params: any) => Promise<V2NIMSendMessageParams | false>;
  /**
   * AI 用户选择和翻译能力的提供器配置。
   * 当业务侧有多个 AI 账号，且希望按场景决定默认使用哪个账号时，可通过它接入自定义策略。
   */
  aiUserAgentProvider?: AIUserAgentProvider;
  /**
   * 会话列表每次拉取的数量，默认 `100`。
   * 数值越大，首次加载覆盖范围越广，但首屏列表初始化成本也会更高。
   */
  conversationLimit?: number;
  /**
   * 是否开启 kit 调试日志。
   * 适合开发调试阶段排查状态同步和消息发送流程问题。
   */
  debug?: "off" | "debug";
  /**
   * 私有化部署场景下使用的自定义 iconfont 地址列表。
   * 当默认字体资源不可直接访问时，可通过这里替换成业务自己的资源地址。
   */
  iconfontUrl?: string[];
  /**
   * AI 消息是否使用流式输出模式。
   * 打开后，AI 回复可以边生成边展示；关闭后通常在整条回复完成后一次性展示。
   */
  aiStream?: boolean;
}
/**
 * 联系人相关页面和筛选场景中使用的联系人分类。
 */
export type ContactType =
  | "blackList"
  | "groupList"
  | "friendList"
  | "msgList"
  | "aiList";
/**
 * 描述当前登录用户与某个用户之间关系的标签。
 */
export type Relation = "friend" | "stranger" | "myself" | "ai" | "aiBot";
/**
 * UI Kit 中 AI 用户资料使用的服务端扩展字段。
 *
 * 业务代码可读取这些标记，用于控制 AI 入口展示和默认会话行为。
 */
export interface AIUserServerExt {
  /** 该 AI 用户是否应在 AI 相关入口中默认置顶。 */
  pinDefault?: number;
  /** 该 AI 用户是否支持 AI 对话能力。 */
  aiChat?: number;
  /** 与该 AI 用户开始会话时展示的欢迎语。 */
  welcomeText?: string;
}
/**
 * 当前登录用户资料上保存的 AI 相关服务端扩展字段。
 */
export interface MyUserServerExt {
  /** 当前用户选择在 UI 中取消置顶的 AI 用户 ID 列表。 */
  unpinAIUsers?: string[];
}
/**
 * 存储在消息自定义扩展中的 @ 提及元数据。
 *
 * 业务 UI 可据此高亮 @ 区间，并判断当前用户是否被某条消息提及。
 */
export interface YxAitMsg {
  [key: string]: {
    /** 本次 @ 提及在原始消息中的文本内容。 */
    text?: string;
    /** 该账号在消息文本中被提及的位置区间列表。 */
    segments: {
      /** 提及片段在消息文本中的起始位置。 */
      start: number;
      /** 提及片段在消息文本中的结束位置。 */
      end: number;
      /** 当前提及片段是否已被消息编辑、撤回等流程打断。 */
      broken?: boolean;
    }[];
  };
}
/**
 * 存储在服务端扩展中的消息置顶操作数据。
 *
 * 当业务代码需要在会话中展示或同步消息置顶状态时，可使用该结构。
 */
export interface YxTopMessage {
  /** 端侧生成的消息 id，用于在本地快速定位被置顶的消息。 */
  idClient: string;
  /** 会话类型，例如点对点会话或群会话。 */
  scene: V2NIMConst.V2NIMConversationType;
  /** 原始消息发送者账号。 */
  from: string;
  /** 原始消息接收方账号或群 id。 */
  receiverId: string;
  /** 执行该置顶操作所属的会话 ID。 */
  to: string;
  /** 服务端生成的消息 id。 */
  idServer: string;
  /** 置顶操作发生的时间戳。 */
  time: number;
  /** 执行置顶或取消置顶操作的账号。 */
  operator: string;
  /** 操作类型：`0` 表示新增置顶，`1` 表示取消置顶。 */
  operation: 0 | 1;
}
/**
 * UI Kit 业务层使用的消息自定义扩展结构。
 *
 * 它在 SDK 原始消息之外承载了 @ 权限、消息置顶、回复关系、群组 UI 标记等附加语义。
 */
export interface YxServerExt {
  /** 群内谁可以使用 @ 全体等能力，通常用于群输入框和发送前权限校验。 */
  yxAllowAt?: "manager" | "all";
  /** 群内谁可以执行消息置顶，常用于群设置页和消息操作菜单的权限控制。 */
  yxAllowTop?: "manager" | "all";
  /** 该扩展结构中最后一次被更新的业务字段，便于业务侧判断最近一次扩展变更的类型。 */
  lastOpt?: "yxAllowAt" | "yxAllowTop" | "yxMessageTop";
  /** 当前的消息置顶操作数据，存在时通常表示该消息参与过置顶或取消置顶流程。 */
  yxMessageTop?: YxTopMessage;
  /** 挂载在消息上的回复关系数据，聊天页可据此展示“回复了某条消息”的引用区。 */
  yxReplyMsg?: YxReplyMsg;
  /** 挂载在消息上的 @ 提及元数据，适合消息列表高亮和会话级 @ 提醒计算。 */
  yxAitMsg?: YxAitMsg;
  /** 业务接入侧使用的群组 UI Kit 标记，可用于识别该群是否启用了特定业务分组能力。 */
  im_ui_kit_group?: boolean;
}
/**
 * 存储在自定义扩展中的回复目标元数据。
 *
 * 业务 UI 可据此渲染回复关系，并跳转回被引用的原始消息。
 */
export interface YxReplyMsg {
  /** 端侧生成的原始被回复消息 id，用于本地消息列表快速定位。 */
  idClient: string;
  /** 会话类型，例如点对点会话或群会话。 */
  scene: V2NIMConst.V2NIMConversationType;
  /** 被回复原始消息的发送者账号，适合在引用区展示“回复了谁”。 */
  from: string;
  /** 被回复原始消息的接收方账号或群 id。 */
  receiverId: string;
  /** 该回复关系所属的会话 ID，用于确保引用关系和当前会话一致。 */
  to: string;
  /** 服务端生成的原始被回复消息 id，适合跨端或重新拉历史消息后继续定位。 */
  idServer: string;
  /** 原始被回复消息的发送时间，可用于引用区排序或补充展示。 */
  time: number;
}
