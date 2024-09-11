## 关于 im-uikit-uniapp

im-uikit-uniapp 是基于网易云信 IM SDK 的一款 uniapp UI 组件库，它提供了一些通用的 UI 组件，包含会话、聊天、群组等功能。基于 UI 组件您可以像搭积木一样快速搭建起自己的业务逻辑。im-uikit-uniapp 本身基于 `UIKitStore` 开发，API 参考 [UIKitStore](https://doc.yunxin.163.com/docs/interface/messaging/web/typedoc/UIKit/Latest/zh/modules.html)。
im-uikit-uniapp 界面效果如下图所示：

<img src="https://yx-web-nosdn.netease.im/common/3d776209da6741a45cffa83bed579ecb/WechatIMG212.jpeg" width="300" height="700" /> <img src="https://yx-web-nosdn.netease.im/common/0093da7314856cb7e4679cb2d26f1dbe/WechatIMG213.jpeg" width="300" height="700" />
<br>
<img src="https://yx-web-nosdn.netease.im/common/f4ae4fa2df6966fe8215be65c6676fe0/8a51677b-bede-4955-aadb-665294fcf5c5.jpeg" width="300" height="700" /> <img src="https://yx-web-nosdn.netease.im/common/f52c0b5df528c7c9283dc83dcb0cac71/169914c4-64ea-4381-a9bf-e96adf6ed572.jpeg"  width="300" height="700">

## im-uikit-uniapp 支持平台

- Android
- iOS

## 运行 demo

- [创建应用并获取 AppKey](https://doc.yunxin.163.com/console/docs/TIzMDE4NTA?platform=console)
- [注册云信账号，获取 account、token](https://doc.yunxin.163.com/messaging/docs/DQ3Nzk1MTY?platform=server)
- `执行 npm install 安装依赖 && App.vue 中填入 appkey、account 和 token，最后使用 HBuilderX 启动项目`

## 产品体验

- Android <br>
  <img src="https://yx-web-nosdn.netease.im/common/642fb37550cdfade2892cb0462ba4648/POPO20230322-185537.webp" width="300" height="300" >

- iOS <br>
  <img src="https://yx-web-nosdn.netease.im/common/f479aecb78e0b9365d48476687a6f76d/POPO20230322-190238.webp" width="300" height="300" >

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
npm i @xkit-yx/core-kit @xkit-yx/im-store @xkit-yx/utils dayjs mobx pinyin vue-i18n --save

# 在自己的项目根目录下执行以下命令，将组件需要的图片复制到static目录下
# macOS
mv pages/NEUIKit/src/static static/YX_IMG
# windows
move pages/NEUIKit/src/static static/YX_IMG
```

#### 步骤 4：引入 NEUIKit 组件

在 App.vue 文件引用 NEUIKit 组件

```javascript
<script>
import RootStore from '@xkit-yx/im-store'
import { NimKitCore } from '@xkit-yx/core-kit/dist/uniapp-nim-core'

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
  teamUpdateTeamMode: 'all',
  teamInviteMode: 'all',
})
nim.connect()

export default {
  // ……
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
      "path": "pages/NEUIKit/src/pages/Conversation/conversation-start/index",
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

#### 步骤 6：运行效果

Andriod：<br>

<img src="https://yx-web-nosdn.netease.im/common/30c0079906c71d71c65e7e97a7817dce/WechatIMG1943.jpeg" width="300" height="700" />

iOS：<br>
<img src="https://yx-web-nosdn.netease.im/common/f87b51d52682338cc5427e84e8876695/WechatIMG215.jpeg" width="300" height="700" />

## 目录结构详解

```
.
├── components // 组件
│   ├── Avatar.vue // 头像
│   ├── Empty.vue // 空白页
│   ├── FormInput.vue // 表单
│   ├── FriendSelect.vue // 好友选择
│   ├── Icon.vue // Icon 图标
│   ├── NavBar.vue // 标题栏
│   ├── NetworkAlert.vue // 网络横幅
│   ├── Svg.vue // Icon 图标的 SVG，需要使用 iconfont 的模块必须要引入此组件
│   └── UserCard.vue // 用户卡片
├── env.d.ts
├── locale // 国际化文案配置
│   ├── en.json
│   ├── en.ts
│   ├── zh-Hans.json
│   └── zh-Hans.ts
├── pages
│   ├── Chat // 聊天页
│   │   ├── index.vue
│   │   └── message
│   │       ├── face.vue // 表情选择
│   │       ├── index.vue
│   │       ├── message-bubble.vue // 消息气泡
│   │       ├── message-file.vue // 文件消息
│   │       ├── message-input.vue // 消息输入框
│   │       ├── message-item.vue // 单条消息
│   │       ├── message-list.vue // 消息列表
│   ├── Contact // 通讯录页
│   │   ├── contact-list
│   │   │   ├── friend-list.vue // 好友列表
│   │   │   ├── group-list.vue // 群组列表
│   │   │   └── index.vue
│   │   └── index.vue
│   ├── Conversation // 会话页
│   │   ├── conversation-list // 会话列表
│   │   │   ├── conversation-item.vue // 单条会话
│   │   │   └── index.vue
│   │   ├── conversation-start // 发起聊天
│   │   │   └── index.vue
│   │   └── index.vue
│   ├── Group
│   │   ├── group-add // 群聊拉人页
│   │   │   └── index.vue
│   │   ├── group-create // 创建群聊页
│   │   │   └── index.vue
│   │   ├── group-member // 群成员页
│   │   │   └── index.vue
│   │   └── group-set // 群设置页
│   │       ├── group-info-edit.vue
│   │       └── index.vue
│   ├── Login // 云信登录页，请替换成自己的登录页或者删除
│   │   ├── components
│   │   │   ├── form-input.vue
│   │   │   ├── login-form.vue
│   │   │   └── welcome.vue
│   │   ├── i18n
│   │   │   └── zh-cn.ts
│   │   ├── index.vue
│   │   ├── static
│   │   │   ├── welcome-bottom.png
│   │   │   └── welcome.png
│   │   └── utils
│   │       └── api.ts
│   ├── index
│   │   └── index.vue // 空白首页
│   ├── styles
│   │   └── common.scss // 公共样式
│   └── user-card
│       ├── detail-item // 个人信息编辑页
│       │   └── index.vue
│       ├── friend // 好友卡片页
│       │   └── index.vue
│       ├── my // 我的页面
│       │   ├── index.vue
│       │   └── setting.vue
│       └── my-detail // 我的详情页
│           └── index.vue
├── pages.json // 需要在根目录项目下添加这里的配置
├── static // 静态图片资源
│   ├── contact-selected.png
│   ├── contact.png
│   ├── conversation-selected.png
│   ├── conversation.png
│   ├── empty.png
│   ├── logo.png
│   ├── me-selected.png
│   ├── me.png
│   ├── welcome-bottom.png
│   └── welcome.png
├── uni.scss // uni 自带的样式，可以忽略或者使用项目中已有的
├── uni_modules // NEUIKit 用到的三方库（对比应用市场下载的有改动）
│   ├── uni-link
│   │   ├── changelog.md
│   │   ├── components
│   │   │   └── uni-link
│   │   │       └── uni-link.vue
│   │   ├── package.json
│   │   └── readme.md
│   ├── uni-scss
│   │   ├── changelog.md
│   │   ├── index.scss
│   │   ├── package.json
│   │   ├── readme.md
│   │   ├── styles
│   │   │   ├── index.scss
│   │   │   ├── setting
│   │   │   │   ├── _border.scss
│   │   │   │   ├── _color.scss
│   │   │   │   ├── _radius.scss
│   │   │   │   ├── _space.scss
│   │   │   │   ├── _styles.scss
│   │   │   │   ├── _text.scss
│   │   │   │   └── _variables.scss
│   │   │   └── tools
│   │   │       └── functions.scss
│   │   ├── theme.scss
│   │   └── variables.scss
│   └── zb-tooltip
│       ├── changelog.md
│       ├── components
│       │   └── zb-tooltip
│       │       └── zb-tooltip.vue
│       ├── package.json
│       └── readme.md
└── utils // 工具函数
    ├── constants.ts // 一些常量
    ├── date.ts // 时间处理
    ├── emoji.ts // 表情相关
    ├── encodeText.ts // 文本编码，防 xss
    ├── friend.ts // 好友相关
    ├── i18n.ts // 国际化相关
    ├── matrix.ts // 数组转矩阵
    ├── msg.ts // 消息相关
    ├── permission.ts // 设备权限相关
    ├── reporter.ts // 埋点上报
    ├── parseText.ts // 文本消息解析
    └── svgString.ts // iconfont Symbol 的 js 内容，注意从 symbol 标签开始替换，不要从 svg 标签开始替换
```

## 常见问题

- 相册拒绝授权后再次开启授权，由于 uniapp api 兼容问题，部分 Android 机型无法正常打开相册，需要用户自行处理
- 如何替换您自己的 iconfont
  - 1. 进入到你的 iconfont 项目中，找到 symbol 的 js，点击打开 js
       ![https://yx-web-nosdn.netease.im/common/cf17e1bea265ae60bebd7b57b5f6d5a8/WechatIMG209.png](https://yx-web-nosdn.netease.im/common/cf17e1bea265ae60bebd7b57b5f6d5a8/WechatIMG209.png)
  - 2. 找到 symbol 标签，将内容 copy 下来，替换到 utils/svgString.ts 中相应的位置上
       ![https://yx-web-nosdn.netease.im/common/5317df9885b852fbcdc4bfafd9f4b5f9/WechatIMG210.png](https://yx-web-nosdn.netease.im/common/5317df9885b852fbcdc4bfafd9f4b5f9/WechatIMG210.png)
       ![https://yx-web-nosdn.netease.im/common/8248e72516ce6c4adb6f253d58a129d5/WechatIMG211.png](https://yx-web-nosdn.netease.im/common/8248e72516ce6c4adb6f253d58a129d5/WechatIMG211.png)
  - 3. 引用 components/Icon 组件，填入 type 即可，例如 `<Icon type="icon-time" />`
- 如果 iOS 低版本构建后无法运行，需要在构建出的资源 dist/build/app/app-service.js 文件最前面添加 `var globalThis = Function('return this')();`
