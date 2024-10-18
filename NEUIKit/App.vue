<script lang="ts">
import RootStore from "@xkit-yx/im-store-v2";

import V2NIM, { V2NIMConst } from "nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK";
import {
  customRedirectTo,
  customReLaunch,
  customSwitchTab,
} from "./utils/customNavigate";
import { getMsgContentTipByType } from "./utils/msg";
import { STORAGE_KEY } from "./utils/constants";
import { isWxApp } from "./utils";
import {
  V2NIMMessage,
  V2NIMMessagePushConfig,
} from "nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMMessageService";

// #ifdef APP-PLUS
// 推送插件
const nimPushPlugin = uni.requireNativePlugin("NIMUniPlugin-PluginModule");
// 音视频通话插件
const nimCallKit = (uni.$UIKitCallKit =
  uni.requireNativePlugin("netease-CallKit"));
// #endif

export default {
  onLaunch() {
    // #ifdef APP-PLUS
    // 关闭启动画面，锁定竖屏
    plus.navigator.closeSplashscreen();
    plus.screen.lockOrientation("portrait-primary");
    // #endif
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
      // 需要登录 im
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
      // 保存登录信息

      uni.setStorage({
        key: STORAGE_KEY,
        data: opts,
        success: function () {
          console.log("保存登录信息success");
        },
      });

      const nim = (uni.$UIKitNIM = V2NIM.getInstance(
        {
          appkey: "",
          needReconnect: true,
          // "reconnectionAttempts": 5,
          debugLevel: "debug",
          apiVersion: "v2",
        },
        {
          V2NIMLoginServiceConfig: {
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

      const store = (uni.$UIKitStore = new RootStore(
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
          sendMsgBefore: async (options: {
            msg: V2NIMMessage;
            conversationId: string;
            serverExtension?: Record<string, unknown>;
          }) => {
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

            const pushConfig: V2NIMMessagePushConfig = {
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

      // #ifdef APP-PLUS
      // 注册推送
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

      // 初始化音视频通话插件
      console.log("-------------callkit init 开始", opts.account, opts.token);
      nimCallKit.initConfig(
        {
          appKey: "", // 请填写你的appkey
          account: opts.account, // 请填写你的account
          token: opts.token, // 请填写你的token
          apnsCername: "",
          pkCername: "",
        },
        (ret: any) => {
          console.log("-------------callkit 回调", ret);
          if (ret.code != 200) {
            console.log("-------------callkit init失败\n错误码：");
          } else {
            console.log("-------------callkit 开始登录------------");

            nimCallKit.login(
              {
                account: opts.account,
                token: opts.token,
              },
              function (ret: any) {
                if (ret.code != 200) {
                  console.log("-------------callkit 登录失败------------", ret);
                } else {
                  console.log(
                    "-------------callkit 登录成功------------ ",
                    ret
                  );
                }
              }
            );
          }
        }
      );
      // #endif
      nim.V2NIMLoginService.login(opts.account, opts.token).then(() => {
        customSwitchTab({
          url: "/pages/Conversation/index",
        });
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
