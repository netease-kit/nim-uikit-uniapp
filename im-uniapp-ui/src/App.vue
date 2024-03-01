<script>
import RootStore from '@xkit-yx/im-store'
import { NimKitCore } from '@xkit-yx/core-kit/dist/uniapp-nim-core'
import { getMsgContentTipByType } from './pages/NEUIKit/utils/msg'
import { getUniPlatform } from './pages/NEUIKit/utils'
// #ifdef APP-PLUS
const nimPushPlugin = uni.requireNativePlugin('NIMUniPlugin-PluginModule')
// #endif
export default {
  onLaunch: function () {
    const isWeixinApp = getUniPlatform() === 'mp-weixin'
    // @ts-ignore
    const nim = uni.$UIKitNIM = new NimKitCore({
      initOptions: {
        "appkey": "", // 请填写你的appkey
        "account": "", // 请填写你的account
        "token": "", // 请填写你的token
        "lbsUrls": isWeixinApp ? [
          "https://lbs.netease.im/lbs/wxwebconf.jsp"
        ] : [
          "https://lbs.netease.im/lbs/webconf.jsp"
        ],
        "linkUrl": "weblink.netease.im",
        "needReconnect": true,
        /**
         * 使用固定设备ID，
         */
        isFixedDeviceId: true,
        // "reconnectionAttempts": 5,
        debugLevel: 'debug',
      },
      platform: 'UniApp',
    })
    // @ts-ignore
    const store = uni.$UIKitStore = new RootStore(nim, {
      addFriendNeedVerify: false,
      teamBeInviteMode: 'noVerify',
      teamJoinMode: 'noVerify',
      teamUpdateExtMode: 'all',
      teamUpdateTeamMode: 'all',
      teamInviteMode: 'all',
      sendMsgBefore: async (options, type) => {
        const pushContent = getMsgContentTipByType({ body: options.body, type })
        const yxAitMsg = options.ext ? options.ext.yxAitMsg : { forcePushIDsList: '[]', needForcePush: false }

        // 如果是 at 消息，需要走离线强推
        const { forcePushIDsList, needForcePush } = yxAitMsg
          // @ts-ignore
          ? store.msgStore._formatExtAitToPushInfo(yxAitMsg, options.body)
          : { forcePushIDsList: '[]', needForcePush: false }

        console.log('forcePushIDsList: ', forcePushIDsList)

        // 不同产商的推送消息体
        const { scene, to } = options
        const pushPayload = JSON.stringify({
          // oppo
          oppoField: {
            "click_action_type": 4, // 参考 oppo 官网
            "click_action_activity": '', // 各端不一样 TODO
            "action_parameters": { "sessionId": scene, "sessionType": to } // 自定义
          },

          // vivo
          vivoField: {
            "pushMode": 0 //推送模式 0：正式推送；1：测试推送，不填默认为0
          },

          // huawei
          hwField: {
            click_action: {
              'type': 1,
              'action': '' // 各端不一样 TODO
            },
            androidConfig: {
              'category': 'IM',
              'data': JSON.stringify({ 'sessionId': to, 'sessionType': scene })
            }
          },

          // 通用
          sessionId: to,
          sessionType: scene
        })

        const pushInfo = {
          needPush: true,
          needPushBadge: true,
          pushPayload: '{}',
          pushContent,
          needForcePush,
          forcePushIDsList,
          forcePushContent: pushContent,
        }
        return { ...options, pushInfo }
      },
    })
    // #ifdef APP-PLUS
    // 注册推送
    nim.getNIM().offlinePush.setOfflinePushConfig({
      plugin: nimPushPlugin,
      authConfig: {
        // xiaomi
        xmAppId: "",
        xmAppKey: "",
        xmCertificateName: "KIT_UNIAPP_MI_PUSH",

        // huawei
        hwAppId: "",
        hwCertificateName: "KIT_UNIAPP_HW_PUSH",

        // oppo
        oppoAppId: "",
        oppoAppKey: "",
        oppoAppSecret: "",
        oppoCertificateName: "KIT_UNIAPP_OPPO_PUSH",

        /**
        * 注意vivo的appid和appkey需要同时在此处，以及manifest.json(即插件参数配置)中配置
        */
        vivoAppId: "",
        vivoAppKey: "",
        vivoCertificateName: "KIT_UNIAPP_VIVO_PUSH",

        // fcm
        fcmCertificateName: "KIT_UNIAPP_FCM_PUSH",

        // meizu
        mzAppId: "",
        mzAppKey: "",
        mzCertificateName: "KIT_UNIAPP_MZ_PUSH",

        // iOS
        apnsCertificateName: "dis_im_uniapp"
      }
    })
    // #endif

    nim.connect()

  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
</style>



