<script lang="ts">
import RootStore, { type IMMessage } from "@xkit-yx/im-store";
import { NimKitCore } from "@xkit-yx/core-kit/dist/uniapp-nim-core";
import {
  customRedirectTo,
  customReLaunch,
  customSwitchTab,
} from "./utils/customNavigate";
import { getMsgContentTipByType } from "./utils/msg";
import { STORAGE_KEY } from "./utils/constants";
import { getUniPlatform } from "./utils";

// #ifdef APP-PLUS
const nimPushPlugin = uni.requireNativePlugin("NIMUniPlugin-PluginModule");
// #endif

export default {
  onLaunch() {
    // #ifdef APP-PLUS
    // 关闭启动画面，锁定竖屏
    plus.navigator.closeSplashscreen();
    plus.screen.lockOrientation("portrait-primary");
    // #endif
    // @ts-ignore
    if (
      uni.$UIKitStore &&
      uni.$UIKitStore?.connectStore?.connectState === "connected"
    ) {
      return;
    }
    const imOptions = uni.getStorageSync(STORAGE_KEY);
    if (imOptions) {
      this.initNim(imOptions);
    } else {
      // 需要登录 im
      customRedirectTo({
        url: "/pages/Login/index",
      });
    }
  },
  onShow() {
    // #ifdef APP-PLUS
    // @ts-ignore
    const nimSdk = uni?.$UIKitNIM?.getNIM();
    nimSdk?.offlinePush?.updateAppBackground({
      isBackground: false,
    });
    // #endif
  },
  onHide() {
    // #ifdef APP-PLUS
    // @ts-ignore
    const nimSdk = uni?.$UIKitNIM?.getNIM();
    nimSdk?.offlinePush?.updateAppBackground({
      isBackground: true,
    });
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
      const isWeixinApp = getUniPlatform() === "mp-weixin";
      // @ts-ignore
      const nim = (uni.$UIKitNIM = new NimKitCore({
        initOptions: {
          appkey: "",
          lbsUrls: isWeixinApp
            ? ["https://lbs.netease.im/lbs/wxwebconf.jsp"]
            : ["https://lbs.netease.im/lbs/webconf.jsp"],
          linkUrl: isWeixinApp ? "wlnimsc0.netease.im" : "weblink.netease.im",
          needReconnect: true,
          /**
           * 使用固定设备ID，
           */
          isFixedDeviceId: true,
          // "reconnectionAttempts": 5,
          debugLevel: "debug",
          ...opts,
        },
        platform: "UniApp",
      }));

      // @ts-ignore
      const store = (uni.$UIKitStore = new RootStore(nim, {
        addFriendNeedVerify: false,
        teamBeInviteMode: "noVerify",
        teamJoinMode: "noVerify",
        teamUpdateExtMode: "manager",
        teamUpdateTeamMode: "manager",
        teamInviteMode: "manager",
        sendMsgBefore: async (options: any, type: IMMessage["type"]) => {
          const pushContent = getMsgContentTipByType({
            body: options.body,
            type,
          });
          const yxAitMsg = options.ext
            ? options.ext.yxAitMsg
            : { forcePushIDsList: "[]", needForcePush: false };

          // 如果是 at 消息，需要走离线强推
          const { forcePushIDsList, needForcePush } = yxAitMsg
            ? // @ts-ignore
              store.msgStore._formatExtAitToPushInfo(yxAitMsg, options.body)
            : { forcePushIDsList: "[]", needForcePush: false };

          console.log("forcePushIDsList: ", forcePushIDsList);

          // 不同产商的推送消息体
          const { scene, to } = options;
          const pushPayload = JSON.stringify({
            // oppo
            oppoField: {
              click_action_type: 4, // 参考 oppo 官网
              click_action_activity: "", // 各端不一样 TODO
              action_parameters: { sessionId: scene, sessionType: to }, // 自定义
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
                data: JSON.stringify({ sessionId: to, sessionType: scene }),
              },
            },

            // 通用
            sessionId: to,
            sessionType: scene,
          });

          const pushInfo = {
            needPush: true,
            needPushBadge: true,
            pushPayload: "{}",
            pushContent,
            needForcePush,
            forcePushIDsList,
            forcePushContent: pushContent,
          };
          return { ...options, pushInfo };
        },
      }));

      // #ifdef APP-PLUS
      // 注册推送
      nim.getNIM().offlinePush.setOfflinePushConfig({
        plugin: nimPushPlugin,
        authConfig: {
          // xiaomi
          xmAppId: "",
          xmAppKey: "",
          xmCertificateName: "",

          // huawei
          hwAppId: "",
          hwCertificateName: "",

          // oppo
          oppoAppId: "",
          oppoAppKey: "",
          oppoAppSecret: "",
          oppoCertificateName: "",

          /**
           * 注意vivo的appid和appkey需要同时在此处，以及manifest.json(即插件参数配置)中配置
           */
          vivoAppId: "",
          vivoAppKey: "",
          vivoCertificateName: "",

          // fcm
          fcmCertificateName: "",

          // meizu
          mzAppId: "",
          mzAppKey: "",
          mzCertificateName: "",

          // iOS
          apnsCertificateName: "",
        },
      });
      // #endif

      nim.connect();
      customSwitchTab({
        url: "/pages/Conversation/index",
      });
    },
    logout() {
      uni.removeStorageSync(STORAGE_KEY);
      customReLaunch({
        url: "/pages/Login/index",
      });
      // @ts-ignore
      uni.$UIKitNIM.disconnect();
      // @ts-ignore
      uni.$UIKitStore.destroy();
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
