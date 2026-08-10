import RootStore from ".";
import { NIM } from "nim-web-sdk-ng/dist/esm/nim";
import { V2NIMConnectStatus, V2NIMLoginStatus } from "nim-web-sdk-ng/dist/esm/nim/src/V2NIMLoginService";
import { LocalOptions } from "./types";
import * as storeUtils from "./utils";
/**
 * 管理登录态、连接态和 SDK 初始化后首轮数据同步流程的数据存储。
 *
 * 业务前端通常不直接用它执行复杂业务动作，而是通过它感知当前是否已登录、是否已连上长连接、
 * 是否发生断线重连，以及何时触发资料、会话、关系等基础数据的首轮拉取。
 */
export declare class ConnectStore {
    private rootStore;
    private nim;
    private localOptions;
    /** 当前 SDK 连接状态，可用于界面展示“连接中 / 已连接 / 断开”。 */
    connectStatus: V2NIMConnectStatus;
    /** 当前 SDK 登录状态，可用于决定是否允许继续进入 IM 业务页面。 */
    loginStatus: V2NIMLoginStatus;
    /** 调试日志实例；当 `LocalOptions.debug` 关闭时可能为 `null`。 */
    logger: typeof storeUtils.logger | null;
    constructor(rootStore: RootStore, nim: NIM, localOptions: LocalOptions);
    /**
     * 销毁连接 store，并注销登录与连接相关监听。
     *
     * 适合在整个 RootStore 生命周期结束时调用，用于释放当前实例绑定的 SDK 事件。
     */
    destroy(): void;
    private _onLoginStatus;
    private _onLoginFailed;
    private _onKickedOffline;
    private _onLoginClientChanged;
    private _onConnectStatus;
    private _onDisconnected;
    private _onConnectFailed;
    private _onDataSync;
}
