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
    const imOptions = uni.getStorageSync(STORAGE_KEY);
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
    // #endif
  },
  onHide() {
    // #ifdef APP-PLUS
    uni?.$UIKitNIM?.V2NIMSettingService?.setAppBackground(true);
    // #endif
  },
  methods: {
    initNim(opts: { account: string; token: string }) {
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
          appkey: "",
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
      const store = (uni.$UIKitStore = new RootStore(
        // @ts-ignore
        nim,
        {
          // 添加好友是否需要验证
          addFriendNeedVerify: false,
          // 是否需要显示 p2p 消息、p2p会话列表消息已读未读，默认 false
          p2pMsgReceiptVisible: true,
          // 是否需要显示群组消息已读未读，默认 false
          teamMsgReceiptVisible: true,
          // 群组被邀请模式，默认需要验证
          teamAgreeMode:
            V2NIMConst.V2NIMTeamAgreeMode.V2NIM_TEAM_AGREE_MODE_NO_AUTH,
          // 发送消息前回调, 可对消息体进行修改，添加自定义参数
          sendMsgBefore: async (options: any) => {
            const pushContent = getMsgContentTipByType({
              text: options.msg.text,
              messageType: options.msg.messageType,
            });
            const yxAitMsg = options.serverExtension
              ? options.serverExtension.yxAitMsg
              : { forcePushIDsList: "[]", needForcePush: false };

            // 如果是 at 消息，需要走离线强推

            const { forcePushIDsList, needForcePush } = yxAitMsg
              ? // @ts-ignore
                store.msgStore._formatExtAitToPushInfo(
                  yxAitMsg,
                  options.msg.text
                )
              : { forcePushIDsList: "[]", needForcePush: false };

            console.log("forcePushIDsList: ", forcePushIDsList);

            const { conversationId } = options;
            const conversationType =
              nim.V2NIMConversationIdUtil.parseConversationType(conversationId);
            const targetId =
              nim.V2NIMConversationIdUtil.parseConversationTargetId(
                conversationId
              );

            const pushPayload = JSON.stringify({
              // oppo
              oppoField: {
                click_action_type: 4, // 参考 oppo 官网
                click_action_activity: "", // 各端不一样 TODO
                action_parameters: {
                  sessionId: targetId,
                  sessionType: conversationType,
                }, // 自定义
              },

              // vivo
              vivoField: {
                pushMode: 0, //推送模式 0：正式推送；1：测试推送，不填默认为0
              },

              // huawei
              hwField: {
                click_action: {
                  type: 1,
                  action: "", // 各端不一样 TODO
                },
                androidConfig: {
                  category: "IM",
                  data: JSON.stringify({
                    sessionId: targetId,
                    sessionType: conversationType,
                  }),
                },
              },

              // 通用
              sessionId: targetId,
              sessionType: conversationType,
            });

            const pushConfig = {
              pushEnabled: true,
              pushNickEnabled: true,
              forcePush: needForcePush,
              forcePushContent: pushContent,
              forcePushAccountIds: forcePushIDsList,
              pushPayload: "{}",
              pushContent,
            };

            return { ...options, pushConfig };
          },
        },
        "UniApp"
      ));
      /** nim sdk 登录 */
      nim.V2NIMLoginService.login(opts.account, opts.token).then(() => {
        // #ifdef APP-PLUS
        /** 初始化音视频通话插件*/
        nimCallKit.initConfig(
          {
            appKey: "", // 请填写你的appkey
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
        customSwitchTab({
          url: "/pages/Conversation/index",
        });
      });
      // #ifdef APP-PLUS
      /** 注册推送 */
      nim.V2NIMSettingService.setOfflinePushConfig(nimPushPlugin, {
        miPush: {
          appId: "",
          appKey: "",
          certificateName: "",
        },

        hwPush: {
          appId: "",
          certificateName: "",
        },

        oppoPush: {
          appId: "",
          appKey: "",
          certificateName: "",
          secret: "",
        },

        vivoPush: {
          appId: "",
          appKey: "",
          certificateName: "",
        },

        fcmPush: {
          certificateName: "",
        },

        mzPush: {
          appId: "",
          appKey: "",
          certificateName: "",
        },

        apns: {
          certificateName: "",
        },
      });
      // #endif
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
