/**
 * ESM 的模块定义
 */
import { GetAdapterType } from './adapters';
export { default as NIM, V2NIMConst } from './nim/src/index';
declare let uniAppAdapters: GetAdapterType;
declare let browserAdapters: GetAdapterType;
declare let miniappAdapters: GetAdapterType;
declare let wxAdapters: GetAdapterType;
declare let aliAdapters: GetAdapterType;
declare let baiduAdapters: GetAdapterType;
declare let ttAdapters: GetAdapterType;
export { uniAppAdapters, browserAdapters, miniappAdapters, wxAdapters, aliAdapters, baiduAdapters, ttAdapters };
export { setAdapters } from './adapters';
export { V2NIMLocalConversationService } from './nim/src/V2NIMLocalConversationService';
export { V2NIMConversationService } from './nim/src/V2NIMConversationService';
export { V2NIMConversationGroupService } from './nim/src/V2NIMConversationGroupService';
export { V2NIMMessageService, V2NIMMessageConverter, V2NIMMessageLogUtil, V2NIMMessageExtendUtil } from './nim/src/V2NIMMessageService';
export { V2NIMNotificationService } from './nim/src/V2NIMNotificationService';
export { V2NIMStorageService } from './nim/src/V2NIMStorageService';
export { V2NIMTeamService } from './nim/src/V2NIMTeamService';
export { V2NIMUserService } from './nim/src/V2NIMUserService';
export { V2NIMFriendService } from './nim/src/V2NIMFriendService';
export { V2NIMSettingService } from './nim/src/V2NIMSettingService';
export { V2NIMAIService } from './nim/src/V2NIMAIService';
export { V2NIMSignallingService } from './nim/src/V2NIMSignallingService';
export { V2NIMSubscriptionService } from './nim/src/V2NIMSubscriptionService';
export { V2NIMPassthroughService } from './nim/src/V2NIMPassthroughService';
export { YSFService } from './nim/src/YSFService';
