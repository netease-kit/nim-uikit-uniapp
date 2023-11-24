## 关于 im-uikit-uniapp

im-uikit-uniapp 是基于网易云信 IM SDK 的一款 uniapp UI 组件库，它提供了一些通用的 UI 组件，包含会话、聊天、群组等功能。基于 UI 组件您可以像搭积木一样快速搭建起自己的业务逻辑。im-uikit-uniapp 本身基于 `UIKitStore` 开发，API 参考 [UIKitStore](https://doc.yunxin.163.com/docs/interface/messaging/web/typedoc/UIKit/Latest/zh/modules.html)。
im-uikit-uniapp 界面效果如下图所示：


<br>

<img src="https://yx-web-nosdn.netease.im/common/7ffe6a8afe28b48405b41fb3313d1fa2/uniapp.png">
<br>

<img src="https://yx-web-nosdn.netease.im/common/895963a051a2ae1fae685cfd1682a6bf/%E9%80%9A%E8%AE%AF%E6%A8%A1%E5%9D%97%E4%B8%BB%E8%A6%81%E7%95%8C%E9%9D%A2.png"/>


## im-uikit-uniapp 支持平台

- Android
- iOS
- 微信小程序
- h5
## 产品体验

- Android <br>
  <img src="https://yx-web-nosdn.netease.im/common/823ebcbed18d3390cbe18a01b618965e/Androidapp.png" width="300" height="300" >

- iOS <br>
  <img src="https://yx-web-nosdn.netease.im/common/a8c7ec47f13932087a4371e1b2894326/iOSapp.png" width="300" height="300" >

- h5 <br>
  https://yiyong.netease.im/yiyong-static/statics/uniapp-h5/index.html#/pages/Login/index

## 前提条件

##### 创建应用并获取 App Key 和 App Secret

1. 在左侧导航栏中找到“应用”，并单击“创建” <br>
   <br>
   <img src="https://yx-web-nosdn.netease.im/quickhtml%2Fassets%2Fyunxin%2Fdoc%2FG2-GettingStarted-CreateApplication1.png"/>

2. 填写应用的基本信息后，单击“创建” <br>
   <br>
   <img src="https://yx-web-nosdn.netease.im/quickhtml%2Fassets%2Fyunxin%2Fdoc%2FG2-GettingStarted-CreateApplication2.png"/>

3. 创建应用后，可以在左侧导航栏中查看该应用，并单击 “App Key 管理”，并获取 App Key 和 App Secret <br>
   <br>
   <img src="https://yx-web-nosdn.netease.im/quickhtml%2Fassets%2Fyunxin%2Fdoc%2FG2-GettingStarted-AppKey.png"/>

##### 注册云信 IM 账号，获取 accid 和 token。accid 和 token 将用于登录云信服务端。

1. 在左侧导航栏中单击指定应用名称，进入该应用的详情页面
2. 在“功能管理”中单击“账号管理” <br>
   <img src="https://yx-web-nosdn.netease.im/common/477a10a40bf615d9c1b2a22bfc7ff9f0/%E8%B4%A6%E5%8F%B7%E7%AE%A1%E7%90%86.png"/>

3. 在测试页面，单击“新建账号”，并填写账号（即 accid）、昵称（即 name）、密码（即 Token）后，单击“确定”<br>
   <br>
   <img src="https://yx-web-nosdn.netease.im/common/98ecdd505fbb9f194ff59d8cf2a53bc8/%E7%A1%AE%E5%AE%9A.png"/>

## 发送您的第一条消息

### 开发环境要求

- HBuilderX
- Vue 3
- TypeScript
- sass（sass-loader 版本 <= 10.1.1）
- node（12.13.0 <= node 版本 <= 17.0.0, 推荐使用 Node.js 官方 LTS 版本 16.17.0）
- npm（版本请与 node 版本匹配）

### NEUIKit 源码集成

#### 步骤 1：创建项目 （已有项目可忽略）

参考 [uniapp 官网](https://uniapp.dcloud.net.cn/quickstart-hx.html)

#### 步骤 2：下载 NEUIKit 组件

```sh
# 找一个目录，clone 组件项目
git clone https://github.com/netease-kit/nim-uikit-uniapp.git

# 在自己的项目根目录下执行以下命令，将组件 copy 过来
mkdir -p ./pages/NEUIKit
# macOS
mv ${组件项目路径}/src ./pages/NEUIKit
# windows
move ${组件项目路径}/src .\pages\NEUIKit
```

成功后目录结构如图所示：<br>
<img src="https://yx-web-nosdn.netease.im/common/dbad6532f172811c30d6c621ffcb4111/WechatIMG216.png" width="500" height="500" />

#### 步骤 3：在项目根目录下添加依赖和图片引入

```sh
npm init -y
npm i @xkit-yx/core-kit@0.10.8  @xkit-yx/im-store@0.0.14  @xkit-yx/utils@0.5.6 dayjs mobx pinyin vue-i18n --save

# 在自己的项目根目录下执行以下命令，将组件需要的图片复制到static目录下，若命令执行不成功，请按照路径手动复制
mkdir -p static
# macOS
cp -r pages/NEUIKit/src/static static/YX_IMG
# windows
xcopy /E pages\NEUIKit\src\static static\YX_IMG
```

#### 步骤 4：引入 NEUIKit 组件

在 App.vue 文件引用 NEUIKit 组件,并完成uikit初始化

```javascript
<script>
    import RootStore from '@xkit-yx/im-store'
    import { NimKitCore } from '@xkit-yx/core-kit/dist/uniapp-nim-core'
    import { getMsgContentTipByType } from './pages/NEUIKit/src/utils/msg'
    export default {
        onLaunch: function() {
            const nim = uni.$UIKitNIM = new NimKitCore({
              initOptions: {
                "appkey": "", //您在云信控制台注册的appkey
                 "account": "", //云信控制台上的account
                 "token": "", //云信控制台的账号token
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

```

```sh
# 在main.ts 中引入国际化
import i18n from './pages/NEUIKit/src/utils/i18n'
export function createApp() {
  const app = createSSRApp(App)
  app.use(i18n)
  return {
    app,
  }
}
```

#### 步骤 5：配置 pages 路由

在 NEUIKit/src/utils/customNavigate.ts 中，修改 preUrl

```javascript
const preUrl = '/pages/NEUIKit/src'
```

在 pages.json 文件中的更新 pages 路由：

```javascript
   {
  "pages": [
    {
      "path": "pages/NEUIKit/src/pages/Conversation/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/Group/group-set/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/Group/group-set/group-info-edit",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/Contact/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/Contact/contact-list/group-list",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/Chat/index",
      "style": {
        "navigationStyle": "custom",
        "navigationBarTextStyle": "black",
        "enablePullDownRefresh": true,
        "app-plus": {
          "softinputMode": "adjustResize"
        }
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/Group/group-member/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/Group/group-create/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/Group/group-add/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/user-card/friend/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/user-card/my/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/user-card/my/setting",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/user-card/my-detail/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/src/pages/user-card/detail-item/index",
      "style": {
        "navigationStyle": "custom"
      }
    }
  ],
  "globalStyle": {
    "navigationBarTextStyle": "black"
  },
  "tabBar": {
    "backgroundColor": "#F6F8FA",
    "color": "#999999",
    "selectedColor": "#337EFF",
    "height": "60px",
    "list": [
      {
        "text": "消息",
        "iconPath": "static/YX_IMG/conversation.png",
        "selectedIconPath": "static/YX_IMG/conversation-selected.png",
        "pagePath": "pages/NEUIKit/src/pages/Conversation/index"
      },
      {
        "text": "通讯录",
        "iconPath": "static/YX_IMG/contact.png",
        "selectedIconPath": "static/YX_IMG/contact-selected.png",
        "pagePath": "pages/NEUIKit/src/pages/Contact/index"
      },
      {
        "text": "我的",
        "pagePath": "pages/NEUIKit/src/pages/user-card/my/index",
        "iconPath": "static/YX_IMG/me.png",
        "selectedIconPath": "static/YX_IMG/me-selected.png"
      }
    ]
  }
}


```

#### 步骤 6：运行demo


## 常见问题

- 相册拒绝授权后再次开启授权，由于 uniapp api 兼容问题，部分 Android 机型无法正常打开相册，需要用户自行处理
- 如果 iOS 低版本构建后无法运行，需要在构建出的资源 dist/build/app/app-service.js 文件最前面添加 `var globalThis = Function('return this')();`
- 部分uniapp兼容问题，已在代码中说明
- 由于uniapp uni.setNavigationBarTitle限制，chat页面的NavigationBarTitle，需要您自行调整page结构设置
- 推送相关请参考 https://doc.yunxin.163.com/messaging-enhanced/docs/TE1NjY4Nzk?platform=uniapp