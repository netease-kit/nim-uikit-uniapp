## 关于 im-uikit-uniapp

im-uikit-uniapp 是基于网易云信 IM SDK 的一款 uniapp UI 组件库，它提供了一些通用的 UI 组件，包含会话、聊天、群组等功能。基于 UI 组件您可以像搭积木一样快速搭建起自己的业务逻辑。
im-uikit-uniapp 界面效果如下图所示：
![](TODO)

## im-uikit-uniapp 支持平台

- Android
- iOS

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
git clone xxx(TODO)
```

```shell
mkdir -p ./pages/NEUIKit && cp -r ${刚才 clone 的路径}/src ./pages/NEUIKit
```

成功后目录结构如图所示：  
![](TODO)

#### 步骤 3：在项目根目录下添加依赖

```sh
npm i @xkit-yx/core-kit @xkit-yx/im-store @xkit-yx/utils dayjs mobx pinyin --save
```

#### 步骤 4：引入 NEUIKit 组件

在 App.vue 文件引用 NEUIKit 组件

```javascript
<script>
import RootStore from '@xkit-yx/im-store'
import { NimKitCore } from '@xkit-yx/core-kit/dist/uniapp-nim-core'

const nim = uni.$UIKitNIM = new NimKitCore({
  initOptions: {
    "appkey": "3e215d27b6a6a9e27dad7ef36dd5b65c",
    "lbsUrls": [
      "https://lbs.netease.im/lbs/webconf.jsp"
    ],
    "linkUrl": "weblink.netease.im",
    "needReconnect": true,
    // "reconnectionAttempts": 5,
    debugLevel: 'debug',
    ...opts,
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

#### 步骤 5：配置 pages 路由

在 pages.json 文件中的更新 pages 路由：

```javascript
{
  "pages": [
    {
      "path": "pages/NEUIKit/pages/Conversation/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/Group/group-set/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/Group/group-set/group-info-edit",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/Contact/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/Contact/contact-list/group-list",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/Chat/index",
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
      "path": "pages/NEUIKit/pages/Group/group-member/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/Group/group-create/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/Group/group-add/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/Conversation/conversation-start/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/user-card/friend/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/user-card/my/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/user-card/my/setting",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/user-card/my-detail/index",
      "style": {
        "navigationStyle": "custom"
      }
    },
    {
      "path": "pages/NEUIKit/pages/user-card/detail-item/index",
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
        "text": "%messageText%",
        "iconPath": "static/conversation.png",
        "selectedIconPath": "static/conversation-selected.png",
        "pagePath": "pages/NEUIKit/pages/Conversation/index"
      },
      {
        "text": "%cantactsText%",
        "iconPath": "static/contact.png",
        "selectedIconPath": "static/contact-selected.png",
        "pagePath": "pages/NEUIKit/pages/Contact/index"
      },
      {
        "text": "%mineText%",
        "pagePath": "pages/NEUIKit/pages/user-card/my/index",
        "iconPath": "static/me.png",
        "selectedIconPath": "static/me-selected.png"
      }
    ]
  }
}

```

#### 步骤 6： 云信控制台的一些操作

TODO

#### 步骤 7：运行效果

![](TODO)

## 常见问题

- 相册拒绝授权后再次开启授权，由于 uniapp api 兼容问题，部分 Android 机型无法正常打开相册，需要用户自行处理
