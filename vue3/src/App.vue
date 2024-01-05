<script>
    import RootStore from '@xkit-yx/im-store'
    import { NimKitCore } from '@xkit-yx/core-kit/dist/uniapp-nim-core'
    import { getMsgContentTipByType } from './utils/msg'
    export default {
        onLaunch: function() {
            const nim = uni.$UIKitNIM = new NimKitCore({
              initOptions: {
                "appkey": "", //您在云信控制台注册的appkey
               "account": "", //云信控制台上的account
               "token": "",
                "lbsUrls": [
                  "https://lbs.netease.im/lbs/webconf.jsp"
                ],
                "linkUrl": "weblink.netease.im",
                "needReconnect": true,
                // "reconnectionAttempts": 5,
                debugLevel: 'debug'
              },
              platform: 'UniApp',
            })
            uni.$UIKitStore = new RootStore(nim, {
              addFriendNeedVerify: false,
              teamBeInviteMode: 'noVerify',
              teamJoinMode: 'noVerify',
              teamUpdateExtMode: 'all',
              teamUpdateTeamMode: 'all',
              teamInviteMode: 'all',
              sendMsgBefore: async (options, type) => {
                const pushContent = getMsgContentTipByType({ body: options.body, type })
            
                // 如果是 at 消息，需要走离线强推
                const { forcePushIDsList, needForcePush } = options.ext?.yxAitMsg
                  // @ts-ignore
                  ? store.msgStore._formatExtAitToPushInfo(options.ext?.yxAitMsg, options.body)
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
            nim.connect()
            
        },
        onShow: function() {
            console.log('App Show')
        },
        onHide: function() {
            console.log('App Hide')
        }
    }
</script>

<style>
    /*每个页面公共css */
</style>