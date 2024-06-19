## 关于 im-uikit-uniapp

im-uikit-uniapp 是基于网易云信 IM SDK 的一款 uniapp UI 组件库，它提供了一些通用的 UI 组件，包含会话、聊天、群组等功能。基于 UI 组件您可以像搭积木一样快速搭建起自己的业务逻辑。im-uikit-uniapp 本身基于 `UIKitStore` 开发，API 参考 [UIKitStore](https://doc.yunxin.163.com/docs/interface/messaging/web/typedoc/UIKit/Latest/zh/modules.html)。
im-uikit-uniapp 界面效果如下图所示：

<img src="https://yx-web-nosdn.netease.im/common/7ffe6a8afe28b48405b41fb3313d1fa2/uniapp.png" width="800" height="500" />
<br>
<img src="https://yx-web-nosdn.netease.im/common/895963a051a2ae1fae685cfd1682a6bf/%E9%80%9A%E8%AE%AF%E6%A8%A1%E5%9D%97%E4%B8%BB%E8%A6%81%E7%95%8C%E9%9D%A2.png" width="800" height="500" />
## im-uikit-uniapp 支持平台

- Android
- iOS
- h5
- 微信小程序

## 项目集成

[项目集成详见官网](https://doc.yunxin.163.com/messaging-enhanced/docs/TQyNDE5OTQ?platform=uniapp)

## 运行 demo

- 进入 im-uniapp-ui-vue2（vue2 版本） 或 im-uniapp-ui-vue3（vue3 版本） 工程下，npm i 安装依赖，在 app.vue 中的 new NimKitCore、nimCallKit.initConfig、nimCallKit.login 方法中填入 appkey、account、token 后,使用 HBuilderX 运行项目即可（demo 体验音视频功能，需要使用 HBuilderX 制定自定义基座后运行项目）。
- NEUIKit 为 demo 源码
- [创建应用并获取 AppKey](https://doc.yunxin.163.com/console/docs/TIzMDE4NTA?platform=console)
- [注册云信账号，获取 account、token](https://doc.yunxin.163.com/messaging/docs/DQ3Nzk1MTY?platform=server)
