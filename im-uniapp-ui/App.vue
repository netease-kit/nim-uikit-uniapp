<script lang="ts">
import RootStore from "@xkit-yx/im-store-v2";
/** esm 版本 */
//@ts-ignore
// import { V2NIMConst, NIM } from './esmNim.js'
/** 常规版本*/
import NIM from "nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK";
import { V2NIMConst } from "nim-web-sdk-ng/dist/esm/nim";

import {
  customRedirectTo,
  customReLaunch,
  customSwitchTab,
} from "./utils/customNavigate";
import { getMsgContentTipByType } from "./utils/msg";
import { STORAGE_KEY } from "./utils/constants";
import { isWxApp } from "./utils";
/** 国际化*/
import { setLanguage } from "./utils/i18n";

// #ifdef APP-PLUS
/** 推送插件 */
const nimPushPlugin = uni.requireNativePlugin("NIMUniPlugin-PluginModule");
/** 音视频通话插件 */
const nimCallKit = (uni.$UIKitCallKit =
  uni.requireNativePlugin("netease-CallKit"));
// #endif

let startByNotificationId = "";

export default {
  onLaunch() {
    // #ifdef APP-PLUS
    /** 关闭启动画面，锁定竖屏 */
    plus.navigator.closeSplashscreen();
    plus.screen.lockOrientation("portrait-primary");
    // #endif

    /** 设置语言 （此处为了方便demo切换语言，将其存到本地，实际需根据业务情况设置）*/
    setLanguage(
      uni.getStorageSync("switchToEnglishFlag") == "en" ? "en" : "zh"
    );
    /** 已经登录了 不用走初始化逻辑*/
    if (
      uni?.$UIKitStore?.connectStore?.connectStatus ===
      V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED
    ) {
      return;
    }

    const imOptions = {
      appkey: "", // 请填写你的appkey
      account: "", // 请填写你的account
      token: "", // 请填写你的token
    };
    if (imOptions) {
      this.initNim(imOptions);
    } else {
      /** 未登录 跳转登录页 */
      customRedirectTo({
        url: isWxApp ? "/pages/index/index" : "/pages/Login/index",
      });
    }
  },
  onShow() {
    // #ifdef APP-PLUS
    uni?.$UIKitNIM?.V2NIMSettingService?.setAppBackground(false);

    // 点击通知栏推送监听
    nimPushPlugin.addOpenNotificationListener((res: any) => {
      if (typeof res == "object" && res?.sessionId && res?.sessionType) {
        // 当前登录账号id 具体获取根据您的业务逻辑调整
        const imOptions = uni.getStorageSync(STORAGE_KEY);
        // 会话类型
        const type = res?.sessionType;
        // 拼装会话ID
        startByNotificationId = `${imOptions.account}|${type}|${res?.sessionId}`;
      }
    });
    // #endif
  },
  onHide() {
    // #ifdef APP-PLUS
    uni?.$UIKitNIM?.V2NIMSettingService?.setAppBackground(true);
    // #endif

    // 重置推送 startByNotificationId
    startByNotificationId = "";
  },
  methods: {
    initNim(opts: { account: string; token: string; appkey: string }) {
      /** 保存登录信息  demo 层逻辑 具体根据您的业务调整*/
      uni.setStorage({
        key: STORAGE_KEY,
        data: opts,
      });

      /** 是否开启云端会话（此处为了方便demo切换云端/本地会话，将其存到本地，实际需根据业务情况设置）*/
      const enableV2CloudConversation =
        uni.getStorageSync("enableV2CloudConversation") === "on";

      /** 初始化 nim sdk */
      //@ts-ignore
      const nim = (uni.$UIKitNIM = NIM.getInstance(
        {
          appkey: opts.appkey,
          needReconnect: true,
          debugLevel: "debug",
          apiVersion: "v2",
          enableV2CloudConversation: enableV2CloudConversation,
        },
        {
          V2NIMLoginServiceConfig: {
            /**
             * 微信小程序需要使用单独的lbsUrls和linkUrl
             */
            lbsUrls: isWxApp
              ? ["https://lbs.netease.im/lbs/wxwebconf.jsp"]
              : ["https://lbs.netease.im/lbs/webconf.jsp"],
            linkUrl: isWxApp ? "wlnimsc0.netease.im" : "weblink.netease.im",
            /**
             * 使用固定设备ID，
             */
            isFixedDeviceId: true,
          },
        }
      ));

      /** 初始化 im store */
      // @ts-ignore
      const store = (uni.$UIKitStore = new RootStore(
        // @ts-ignore
        nim,
        {
          // 添加好友是否需要验证
          addFriendNeedVerify: true,
          // 是否需要显示 p2p 消息、p2p会话列表消息已读未读，默认 false
          p2pMsgReceiptVisible: true,
          // 是否需要显示群组消息已读未读，默认 false
          teamMsgReceiptVisible: true,
          // 是否显示在线离线
          loginStateVisible: true,
          // 群组被邀请模式，默认需要验证
          teamAgreeMode:
            V2NIMConst.V2NIMTeamAgreeMode.V2NIM_TEAM_AGREE_MODE_NO_AUTH,
          // 发送消息前回调, 可对消息体进行修改，添加自定义参数
          // @ts-ignore
          sendMsgBefore: async (options: any) => {
            const pushContent = getMsgContentTipByType({
              text: options.msg.text,
              messageType: options.msg.messageType,
            });
            const yxAitMsg = options.serverExtension
              ? options.serverExtension.yxAitMsg
              : { forcePushIDsList: "[]", needForcePush: false };

            // 如果是 at 消息，需要走离线强推
            // @ts-ignore
            const { forcePushIDsList, needForcePush } = yxAitMsg
              ? // @ts-ignore
                store.msgStore._formatExtAitToPushInfo(
                  yxAitMsg,
                  options.msg.text
                )
              : { forcePushIDsList: "[]", needForcePush: false };

            const { conversationId } = options;
            const conversationType =
              nim.V2NIMConversationIdUtil.parseConversationType(conversationId);
            const targetId =
              nim.V2NIMConversationIdUtil.parseConversationTargetId(
                conversationId
              );

            // 设置离线强推，厂商相关推送在此处配置
            // 具体参考文档 https://doc.yunxin.163.com/messaging2/guide/zc4MTg5MDY?platform=client#%E7%AC%AC%E4%B8%80%E6%AD%A5%E4%B8%8A%E4%BC%A0%E6%8E%A8%E9%80%81%E8%AF%81%E4%B9%A6
            const pushPayload = JSON.stringify({
              pushTitle: "", // 必填，推送消息标题
              notify_effect: "2", //可选项，预定义通知栏消息的点击行为。1：通知栏点击后打开app的Launcher Activity，2：通知栏点击后打开app的任一Activity（开发者还需要传入intent_uri），3：通知栏点击后打开网页（开发者还需要传入web_uri）
              intent_uri:
                "intent:#Intent;action=com.netease.nimlib.uniapp.push.NotificationClickActivity;component=com.netease.nim.demo/com.netease.nimlib.uniapp.push.NotificationClickActivity;launchFlags=0x04000000;i.sessionType=0;S.sessionId=cs1;end", //可选项，打开当前app的任一组件。
              hwField: {
                click_action: {
                  //必填，消息点击行为
                  type: 1, //必填，消息点击行为类型，取值如下：1：打开应用自定义页面 2：点击后打开特定URL 3：点击后打开应用
                  // 自定义页面中intent的实现，请参见指定intent参数​。当type为1时，字段intent和action至少二选一。scheme方式和指定activity方式都可以
                  intent:
                    "intent:#Intent;action=com.netease.nimlib.uniapp.push.NotificationClickActivity;component=com.netease.nim.demo/com.netease.nimlib.uniapp.push.NotificationClickActivity;launchFlags=0x04000000;i.sessionType=0;S.sessionId=cs1;end",
                },
                androidConfig: {
                  category: "IM", //可选项，标识消息类型，用于标识高优先级透传场景，详见官方文档 AndroidConfig.category
                },
              },
              honorField: {
                notification: {
                  // AndroidNotification
                  clickAction: {
                    //必填，消息点击行为
                    type: 1, //必填，消息点击行为类型，取值如下：1：打开应用自定义页面 2：点击后打开特定URL 3：点击后打开应用
                    //自定义页面中intent的实现，请参见指定intent参数。当type为1时，字段intent和action至少二选一。
                    intent: "",
                  },
                  importance: "NORMAL", //可选项，Android通知消息分类，决定用户设备消息通知行为，取值如下：LOW：资讯营销类消息 NORMAL：服务与通讯类消息
                },
              },
              vivoField: {
                skipType: "4", //必填，点击跳转类型 1：打开APP首页 2：打开链接 3：自定义 4:打开app内指定页面，默认为1
                skipContent: "",
                classification: "1", //可选项，消息类型 0：运营类消息，1：系统类消息。默认为0
                category: "IM", // 可选项，二级分类
              },
              oppoField: {
                channel_id: "", //可选项，指定下发的通道ID
                category: "IM", //可选项，通道类别名
                notify_level: 2, //通知栏消息提醒等级，1-通知栏；2-通知栏+锁屏；16-通知栏+锁屏+横幅+震动+铃声
                click_action_type: "1", //点击通知栏后触发的动作类型。0（默认0.启动应用；1.跳转指定应用内页（action标签名）；2.跳转网页；4.跳转指定应用内页（全路径类名）；5.跳转Intent scheme URL: "",
                click_action_activity: "",
                action_parameters: "",
              },
              fcmFieldV1: {
                message: {
                  android: {
                    priority: "",
                    data: {
                      sessionType: "0",
                      sessionId: "cs1",
                    },
                    notification: {
                      click_action: "",
                    },
                  },
                },
              },

              // IOS apns
              sessionId:
                conversationType == 1
                  ? uni.$UIKitStore.userStore.myUserInfo.accountId
                  : targetId,
              sessionType: conversationType,
            });

            // @ts-ignore
            const pushConfig = {
              pushEnabled: true,
              pushNickEnabled: true,
              forcePush: needForcePush,
              forcePushContent: pushContent,
              forcePushAccountIds: forcePushIDsList,
              pushPayload,
              pushContent,
            };

            return { ...options, pushConfig };
          },
        },
        "UniApp"
      ));

      // #ifdef APP-PLUS
      /** 注册推送 实际根据您在推送厂商申请的证书进行配置，具体参考文档 https://doc.yunxin.163.com/messaging2/guide/zc4MTg5MDY?platform=client#%E7%AC%AC%E4%B8%80%E6%AD%A5%E4%B8%8A%E4%BC%A0%E6%8E%A8%E9%80%81%E8%AF%81%E4%B9%A6
       */
      nim.V2NIMSettingService.setOfflinePushConfig(nimPushPlugin, {
        // miPush: {
        //   appId: "",
        //   appKey: "",
        //   certificateName: "",
        // },
        // hwPush: {
        //   appId: "",
        //   certificateName: "",
        // },
        // oppoPush: {
        //   appId: "",
        //   appKey: "",
        //   certificateName: "",
        //   secret: "",
        // },
        // vivoPush: {
        //   appId: "",
        //   appKey: "",
        //   certificateName: "",
        // },
        // fcmPush: {
        //   certificateName: "",
        // },
        // mzPush: {
        //   appId: "",
        //   appKey: "",
        //   certificateName: "",
        // },
        // apns: {
        //   certificateName: "",
        // },
      });
      // #endif

      /** nim sdk 登录 */
      nim.V2NIMLoginService.login(opts.account, opts.token).then(async () => {
        // #ifdef APP-PLUS
        /** 初始化音视频通话插件*/
        nimCallKit.initConfig(
          {
            appKey: opts.appkey, // 请填写你的appkey
            account: opts.account, // 请填写你的account
            token: opts.token, // 请填写你的token
            apnsCername: "",
            pkCername: "",
          },
          (ret: any) => {
            if (ret.code != 200) {
              // callkit init失败
            } else {
              nimCallKit.login(
                {
                  account: opts.account,
                  token: opts.token,
                },
                function (ret: any) {
                  if (ret.code != 200) {
                    // 登录失败
                  } else {
                    // 登录成功
                  }
                }
              );
            }
          }
        );

        // #endif
        // 判断时手动点击唤起 还是 点击推送通知栏唤起,点击通知栏唤起直接跳转到聊天页面
        if (!startByNotificationId) {
          customSwitchTab({
            url: "/pages/Conversation/index",
          });
        } else {
          if (startByNotificationId) {
            await uni.$UIKitStore.uiStore.selectConversation(
              startByNotificationId
            );

            uni.navigateTo({
              url: `/pages/Chat/index?conversationId=${startByNotificationId}`,
            });
            startByNotificationId = "";
          }
        }
      });
    },
    logout() {
      uni.removeStorageSync(STORAGE_KEY);
      try {
        nimCallKit.logout({}, (ret: any) => {
          if (ret.code != 200) {
            console.log("音视频通话插件退出失败");
          } else {
            console.log("音视频通话插件退出成功");
          }
        });
      } catch (error) {
        console.log("音视频通话插件退出失败", error);
      }
      // 退出登录
      uni.$UIKitNIM.V2NIMLoginService.logout().then(() => {
        uni.$UIKitStore.destroy();
        customReLaunch({
          url: "/pages/Login/index",
        });
      });
    },
  },
};
</script>
<style>
uni-page-body {
  height: 100%;
}
uni-page-body > uni-view {
  height: 100%;
}
</style>
