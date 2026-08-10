import { NEDeviceBaseInfo, NEDeviceSwitchInfo } from 'neroom-web-sdk';
/**
 * 调用方式:
 * ```js
 * qchat.qchatMedia.initQChatMedia(options)
 * ```
 */
export interface QChatMediaServiceInterface {
    /**
     * 初始化
     *
     * @example
     * ```ts
     * await qchat.qchatMedia.initQChatMedia({ debug: false })
     * ```
     */
    initQChatMedia(options: InitOptions): Promise<void>;
    /**
     * 登录圈组多媒体服务，必须先初始化后在调用该接口
     *
     * @example
     * ```ts
     * await qchat.qchatMedia.loginByIM()
     * ```
     */
    loginByIM(): Promise<void>;
    /**
     * 连接圈组多媒体频道（房间）,必须先登录后再调用该接口
     *
     * @example
     * ```ts
     * await qchat.qchatMedia.connectChannel({
     *   serverId: '123456',
     *   channelId: '789'
     * })
     * ```
     */
    connectChannel(options: ConnectOptions): Promise<void>;
    /**
     * 修改音视频频道的房间相关参数
     */
    updateRTCChannelInfo(options: UpdateRTCChannelInfoOptions): Promise<void>;
    /**
     * 查询音视频频道的房间相关参数
     */
    getRTCChannelInfo(options: GetRTCChannelInfoOptions): Promise<GetRTCChannelInfoResult>;
    /**
     * 查询音视频频道的房间在线成员
     */
    getRTCChannelOnlineMembers(options: GetRTCChannelOnlineMembersOptions): Promise<QChatMediaMemberInfo[]>;
    /**
     * 移除成员
     */
    kickMemberOut(options: KickMemberOutOptions): Promise<void>;
    /**
     * 取消连接多媒体频道
     */
    disconnectChannel(): Promise<void>;
    /**
     * 关闭成员音频,如果accid为当前用户，则关闭本端音频发送，操作其他成员会进行权限校验
     */
    muteAudio(options: MuteAudioOptions): Promise<void>;
    /**
     * 打开成员音频,如果accid为当前用户，则打开本端音频发送，操作其他成员会进行权限校验
     */
    unMuteAudio(options: UnMuteAudioOptions): Promise<void>;
    /**
     * 关闭成员视频,如果accid为当前用户，则关闭本端视频，操作其他成员会进行权限校验
     */
    muteVideo(options: MuteVideoOptions): Promise<void>;
    /**
     * 打开成员视频,如果accid为当前用户，则打开本端视频，操作其他成员会进行权限校验
     */
    unMuteVideo(options: UnMuteVideoOptions): Promise<void>;
    /**
     *  打开本端屏幕共享
     */
    startScreenShare(): Promise<void>;
    /**
     *  关闭本端屏幕共享
     */
    stopScreenShare(): Promise<void>;
    /**
     * 关闭RTC频道内成员的屏幕共享，会进行权限校验
     */
    stopMemberScreenShare(options: StopMemberScreenShareOptions): Promise<void>;
    /**
     * 订阅指定远端用户的视频流
     */
    subscribeRemoteVideoStream(options: SubscribeRemoteVideoStreamOptions): Promise<void>;
    /**
     * 取消订阅指定远端用户的视频流
     */
    unSubscribeRemoteVideoStream(options: UnSubscribeRemoteVideoStreamOptions): Promise<void>;
    /**
     * 订阅指定远端用户辅流视频
     */
    subscribeRemoteVideoSubStream(options: SubscribeRemoteVideoSubStreamOptions): Promise<void>;
    /**
     * 取消订阅指定远端用户辅流视频
     */
    unsubscribeRemoteVideoSubStream(options: UnSubScribeRemoteVideoSubStreamOptions): Promise<void>;
    /**
     *  设置用户视图,如果accid为当前登录用户，则设置本端视图
     */
    setupVideoCanvas(options: SetupVideoCanvasOptions): number;
    /**
     *  设置远端的辅流视频画布
     */
    setupRemoteVideoSubStreamCanvas(options: SetupRemoteVideoSubStreamCanvasOptions): number;
    /**
     * 调节本地播放的指定远端用户的信号音量
     */
    /**
     * 查询屏幕共享者的userUuid
     */
    getScreenSharingUserUuid(): string;
    /**
     * 添加RTC频道事件监听
     */
    addRTCChannelListener(): void;
    /**
     * 移除RTC频道监听
     */
    removeRTCChannelListener(): void;
    /**
     * 获取当前麦克风列表
     */
    enumRecordDevices(): Promise<enumDevicesResult[] | null>;
    /**
     * 获取当前摄像头列表
     */
    enumCameraDevices(): Promise<enumDevicesResult[] | null>;
    /**
     * 获取当前扬声器列表
     */
    enumPlayoutDevices(): Promise<enumDevicesResult[] | null>;
    /**
     * 切换麦克风设备
     */
    setSelectedRecordDevice(options: SetSelectedRecordDeviceOptions): Promise<setDeviceInfoResult | null>;
    /**
     * 切换摄像头设备
     */
    setSelectedCameraDevice(options: SetSelectedCameraDeviceOptions): Promise<setDeviceInfoResult | null>;
    /**
     * 切换扬声器设备
     */
    setSelectedPlayoutDevice(options: SetSelectedPlayoutDeviceOptions): Promise<setDeviceInfoResult | null>;
    /**
     * 获取远端成员列表 返回远端成员列表
     */
    getRTCMembers(): QChatMediaMember[];
    /**
     * 关闭所有成员音频
     */
    muteAllAudio(): Promise<void>;
    /**
     * 打开所有成员音频
     */
    unMuteAllAudio(): Promise<void>;
    /**
     * 关闭所有成员视频
     */
    muteAllVideo(): Promise<void>;
    /**
     * 打开所有成员视频
     */
    unMuteAllVideo(): Promise<void>;
}
/**
 * qchatMedia 模块的监听事件
 *
 * Example：
 *
 * const instance = new SDK()
 *
 * instance.qchatMedia.on('connectChannel', msg => { console.log(msg) }
 */
export interface NIMEQChatMediaServiceListener {
    /**
     * 断开rtc房间连接
     */
    qchatMediaDisconnect: [];
    /**
     * rtc房间连接成功
     */
    connectChannel: [];
    /**
     * 成员进入RTC频道
     */
    memberJoinRTCChannel: [accids: string[]];
    /**
     * 成员离开RTC频道
     */
    memberLeaveRTCChannel: [accids: string[]];
    /**
     * RTC频道错误
     */
    RTCChannelError: [code: number | string];
    /**
     * RTC 频道结束
     */
    RTCChannelEnded: [data: string];
    /**
     * 提示房间内谁正在说话及说话者瞬时音量的回调，不包含本端，如果列表为空，则表示此时远端没有人说话。
     */
    onRtcAudioVolumeIndication: [data: {
        serUuid: string;
        volume: number;
    }[]];
    /**
     * 成员音频状态回调
     */
    memberAudioMuteChanged: [data: {
        memberAccId: string;
        mute: boolean;
        operateByAccId: string;
    }];
    /**
     * 成员屏幕共享状态回调
     */
    memberScreenShareStateChanged: [data: {
        memberAccId: string;
        isSharing: boolean;
        operateByAccId: string;
    }];
    /**
     * 成员视频状态回调
     */
    memberVideoMuteChanged: [data: {
        memberAccId: string;
        mute: boolean;
        operateByAccId: string;
    }];
}
export declare type enumDevicesResult = NEDeviceBaseInfo;
export declare type setDeviceInfoResult = NEDeviceSwitchInfo;
export interface QChatMediaMember {
    accid: string;
    isAudioOn: boolean;
    isVideoOn: boolean;
    isSharingScreen: boolean;
    properties: Record<string, any>;
}
/**
 *  RTC频道事件监听器
 */
export declare const enum QChatMediaEndReason {
    UNKNOWN = "UNKNOWN",
    LOGIN_STATE_ERROR = "LOGIN_STATE_ERROR",
    CLOSE_BY_BACKEND = "CLOSE_BY_BACKEND",
    ALL_MEMBERS_OUT = "ALL_MEMBERS_OUT",
    END_OF_LIFE = "END_OF_LIFE",
    CLOSE_BY_MEMBER = "CLOSE_BY_MEMBER",
    KICK_OUT = "KICK_OUT",
    SYNC_DATA_ERROR = "SYNC_DATA_ERROR",
    LEAVE_BY_SELF = "LEAVE_BY_SELF",
    kICK_BY_SELF = "kICK_BY_SELF"
}
export interface QChatMemberVolumeInfo {
    userUuid: string;
    volume: number;
}
export declare type QChatMediaVideoView = HTMLElement | string;
export interface UpdateRTCChannelInfoOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道ID
     */
    channelId: string;
    /**
     * 房间配置下的roleConfigs的人数限制
     */
    limit: number;
    /**
     * 房间配置下的roleConfigs的音频质量
     */
    audio: {
        profile: string;
        scenario: string;
    };
    /**
     * 房间配置下的roleConfigs的视频质量
     */
    video: {
        width: number;
        height: number;
        fps: number;
    };
}
export interface updateRTCChannelInfoResult {
    /**
     * 房间配置下的roleConfigs的人数限制
     */
    limit: number;
    /**
     * 房间配置下的roleConfigs的音频质量
     */
    audio: {
        profile: string;
        scenario: string;
    };
    /**
     * 房间配置下的roleConfigs的视频质量
     */
    video: {
        width: number;
        height: number;
        fps: number;
    };
}
export interface GetRTCChannelInfoOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道ID
     */
    channelId: string;
}
export interface GetRTCChannelInfoResult {
    /**
     * 房间配置下的roleConfigs的人数限制
     */
    limit: number;
    /**
     * 房间配置下的roleConfigs的音频质量
     */
    audio: {
        profile: string;
        scenario: string;
    };
    /**
     * 房间配置下的roleConfigs的视频质量
     */
    video: {
        width: number;
        height: number;
        fps: number;
    };
}
export interface GetRTCChannelOnlineMembersOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道ID
     */
    channelId: string;
}
export interface ConnectOptions {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 频道ID
     */
    channelId: string;
}
export interface KickMemberOutOptions {
    /**
     * 移除成员的用户id
     */
    accid: string;
}
export interface MuteAudioOptions {
    /**
     * 关闭成员音频的用户id
     */
    accid: string;
}
export interface UnMuteAudioOptions {
    /**
     * 打开成员音频的用户id
     */
    accid: string;
}
export interface MuteVideoOptions {
    /**
     * 关闭成员视频的accid
     */
    accid: string;
}
export interface UnMuteVideoOptions {
    /**
     * 打开成员视频的accid
     */
    accid: string;
}
export interface StopMemberScreenShareOptions {
    /**
     * 成员accid
     */
    accid: string;
}
export interface SubscribeRemoteVideoStreamOptions {
    /**
     * 成员accid
     */
    accid: string;
    /**
     * 大小流 0-大流，1-小流
     *
     * 注: 小流即是本账号的本端端，大流是远端
     */
    streamType: number;
}
export interface UnSubscribeRemoteVideoStreamOptions {
    /**
     * 成员accid
     */
    accid: string;
    /**
     * 大小流 0-大流，1-小流
     *
     * 注: 小流即是本账号的本端端，大流是远端
     */
    streamType: number;
}
export interface SubscribeRemoteVideoSubStreamOptions {
    /**
     * 成员accid
     */
    accid: string;
}
export interface UnSubScribeRemoteVideoSubStreamOptions {
    /**
     * 成员accid
     */
    accid: string;
}
export interface SetupVideoCanvasOptions {
    /**
     * dom元素或‘#id’，‘.class’
     */
    videoView: QChatMediaVideoView;
    /**
     * 成员accid
     */
    accid: string;
}
export interface SetupRemoteVideoSubStreamCanvasOptions {
    /**
     * dom元素或‘#id’，‘.class’
     */
    videoView: QChatMediaVideoView;
    /**
     * 成员accid
     */
    accid: string;
}
export interface SetSelectedRecordDeviceOptions {
    /**
     * 设备Id
     */
    deviceId: string;
}
export interface SetSelectedCameraDeviceOptions {
    /**
     * 设备Id
     */
    deviceId: string;
}
export interface SetSelectedPlayoutDeviceOptions {
    /**
     * 设备Id
     */
    deviceId: string;
}
export interface InitOptions {
    /**
     * 该参数对应着RoomKit组件initialize函数的<a href="https://doc.yunxin.163.com/messaging-enhanced/api-refer/web/typedoc/Latest/zh/QChat/modules/src_QChatMediaServiceInterface.html#InitOptions">serverConfig</a>字段
     */
    serverConfig: {
        roomKitServerConfig: {
            roomServer: string;
        };
        imServerConfig?: {
            /**
             * lbs连接地址
             */
            lbs: string;
            /**
             * link连接地址
             */
            link: string;
            /**
             * 是否对link连接进行https处理
             */
            linkSslWeb: boolean;
            /**
             * nos上传地址
             */
            nosUploader: string;
            /**
             * nos是否开启https
             */
            httpsEnabled: boolean;
            /**
             * nos下载地址 这个是用来接到消息后，要按一定模式替换掉文件链接的。给予一个安全下载链接。
             */
            nosDownloader: string;
        };
        rtcServerConfig?: {
            /**
             * 通道信息服务器地址
             */
            channelServer: string;
            /**
             * 统计上报服务器地址
             */
            statisticsServer: string;
            /**
             * roomServer服务器地址
             */
            roomServer: string;
            /**
             * 是否使用ipv6
             */
            useIPv6: boolean;
        };
        /**
         * 白板相关私有化配置
         */
        whiteboardServerConfig?: {
            /**
             * getChannelInfo接口的地址。用于创建加入白板房间
             */
            roomServer: string;
            /**
             * 白板日志上传接口地址. 默认为: https://statistic.live.126.net/sdklog/getToken
             */
            sdkLogNosServer: string;
            /**
             * 白板日志上报地址. 默认为:  https://statistic.live.126.net/statics/report/common/form
             */
            dataReportServer: string;
            /**
             * nos直传地址. 默认为: https://wanproxy-web.127.net
             */
            directNosServer: string;
            /**
             * 音视频，图片上传地址. 默认为:  https://vcloud.163.com
             */
            mediaUploadServer: string;
            /**
             * 文档转码地址.  默认为: https://vcloud.163.com
             */
            docTransServer: string;
            /**
             *有法律风险，不建议使用，这个地址实际上可能不会被用到
             */
            fontDownloadServer: string;
        };
    };
}
export declare const enum AttendeeOffType {
    offNotAllowSelfOn = "offNotAllowSelfOn",
    offAllowSelfOn = "offAllowSelfOn",
    disable = "disable"
}
export interface QChatMediaMemberInfo {
    /**
     * 服务器ID
     */
    serverId: string;
    /**
     * 用户accid
     */
    accid: string;
    /**
     * 昵称
     */
    nick: string;
    /**
     * 头像
     */
    avatar: string;
    /**
     * 自定义扩展
     */
    ext?: string;
    /**
     * 类型：0-普通成员，1-所有者
     */
    type: 0 | 1;
    /**
     * 加入时间
     */
    joinTime: number;
    /**
     * 邀请模人
     */
    inviter: string;
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
}
export declare type NIMEQChatMediaConfig = {
    /**
     * NERoom SDK
     *
     * QChatMedia 配合 NERoom SDK 使用
     */
    neroom?: any;
};
