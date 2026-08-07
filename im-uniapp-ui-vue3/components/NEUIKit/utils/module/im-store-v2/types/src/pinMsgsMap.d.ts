import { V2NIMMessage, V2NIMMessagePin } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMMessageService";
export type PinInfo = V2NIMMessagePin & {
    operatorId?: string;
    pinState: number;
    message?: V2NIMMessage;
};
export type PinInfos = Array<PinInfo>;
export default class PinMsgsMap {
    map: Map<string, Map<string, PinInfo>>;
    pinConversationLimit: number;
    constructor(limit?: number);
    set(conversationId: string, pinInfos: PinInfos): void;
    get(conversationId: string): Map<string, PinInfo>;
    delete(conversationId: string, messageClientIds: string[]): void;
    clear(conversationId?: string): void;
}
