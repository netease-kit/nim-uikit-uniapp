# Changelog

## 2.3.19

- 修复打印部分对象时崩溃的 Bug
- 修复启动后首次 hide 事件不触发的 Bug

## 2.3.18

- 修复 部分情况下使用了调用 plus 的接口导致小程序启动崩溃的 Bug
- 修复 uni.setTabbarItem 无法设置图标的 Bug
- 修复 sendNativeEvent 接口传输部分特殊数据类型崩溃的 Bug
- 修复部分情况下键盘收回后视图显示异常的 Bug

## 2.3.17

- 新增支持 web-view 组件可以打开 scheme，如 `mailto:` 需要配置 [querySchemes](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/module-configuration-file-V5#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E6%A0%87%E7%AD%BE)
- 修复页面启动时键盘状态变化可能导致崩溃的 Bug
- 修复部分情况下 TabBar 图标不显示的 Bug

## 2.3.16

- 修复 传递数组的 proxy 到原生层时会被原生层当做对象处理的 Bug
- 修复 setTabBarItem 不生效的 Bug [详情](https://ask.dcloud.net.cn/question/201288)
- 修复 web-view 组件报错`The type of "permissionList" must be Array<string>`的 Bug
- 修复 CanvasContext.measureText 不生效的 Bug
- 修复 chooseVide 可以选择多个视频的 Bug
- 修复 connectSocket 传入 header 会在控制台告警的 Bug
- 修复 onLocationChange 部分情况下不触发的 Bug
- 调整 startSoterAuthentication 时 challenge 属性必填

## 2.3.15

- 修复 2.3.14版本引发的部分情况下由 jsvm 传入 arkts 的对象包含非预期的 key 的 Bug

## 2.3.14

- 修复 用户代码编译产物过大导致应用崩溃的 Bug
- 修复 websocket 传 ArrayBuffer 作为 data 无效的 Bug [详情](https://ask.dcloud.net.cn/question/200725)
- 调整 WebviewContext evalJs 方法重命名为 evalJS，旧方法暂时保留但不推荐使用
- 调整 Picker 组件 mode="multiSelector" 时在宽屏上的显示效果

## 2.3.13

- 新增 支持 uni.upx2px
- 修复 web-view 组件无法加载沙盒中 html 文件的 Bug
- 修复 canvas 组件绘制本地图片时因画布污染导致无法调用 canvasToTempFilePath 的 Bug
- 修复 页面内表单元素的 auto-focus 无法拉起键盘的 Bug

## 2.3.12

- 调整 web-view 组件支持加载 https、http 混合内容
- 修复 uni.previewImage 在图片放大后无法移动的 Bug
- 修复 clearInterval 无效的 Bug
- 修复 调用 web-view 组件 evalJs 等方法不生效的Bug

## 2.3.11

- 修复 2.3.8版本引发的 service 层抛出错误导致应用崩溃的 Bug
- 修复 不同小程序之间的 uni.$on uni.$emit 会互相影响的 Bug

## 2.3.10

- 修复 部分情况下 rpx 单位显示大小不正确的 Bug

## 2.3.9

- 修复 原生层返回的数组在 jsvm 内变成对象的 Bug
- 调整 manifest 配置 darkmode 才对页面 webview 启用 darkMode

## 2.3.8

- 修复 jsvm 和 napi 数据转换时 null 丢失的 Bug
- 修复 网络请求返回非法 cookie 导致应用崩溃的 Bug
- 修复 网络请求重定向时返回的 cookie 被设置到错误的 url 的 Bug
- 修复 网络请求 api 访问 http 链接返回的 cookie 无法保存的 Bug
- 修复 网络请求 api 在 url 非法时未进入任何回调的 Bug
- 修复 ArkTs 内 hideLoading 与 JSVM 内 Api 定义不一致的 Bug
- 修复 web-view 组件内请求摄像头、麦克风权限不生效的 Bug
- 调整 web-view 组件内请求定位权限时不再额外弹窗
- 调整 web-view 组件内请求定位权限时自动申请 ohos.permission.LOCATION 权限
- 调整 构造 UTSJSONObject 时不再递归所有属性的值

## 2.3.7

- 修复 websocket 部分情况意外中断的 Bug
- 修复 页面 onPullDownRefresh 不生效的 Bug
- 修复 对部分 arkts 返回的值执行 Object.keys 无法获取正确的 key 列表的 Bug
- 修复 部分接口错误信息内包含重复内容的 Bug
- 优化 uni.getClipboardData 在没有权限时的报错信息
- 优化 移除 uni.setNavigationBarColor 的 log 信息
- 优化 用户代码在运行时报错信息

## 2.3.6

- 修复 访问部分全局对象导致应用白屏的 Bug

## 2.3.5

- 修复 使用 import 引用 uts api 导致应用白屏的 Bug

## 2.3.4

- 新增 支持 tabBar midButton
- 新增 支持 getAppVersionInfo 获取小程序版本
- 新增 支持 UniMP.isRunning 判断小程序是否正在运行
- 新增 picker fields 属性支持 month 和 year
- 新增 启动小程序支持 extraData 参数
- 新增 支持 registerModule、uni.requireNativePlugin [详情](https://nativesupport.dcloud.net.cn/UniMPDocs/Extension/harmony.html)
- 新增 支持 uni.setBackgroundColor [详情](https://uniapp.dcloud.net.cn/api/ui/bgcolor.html#setbackgroundcolor)
- 新增 支持 uni.setBackgroundTextStyle [详情](https://uniapp.dcloud.net.cn/api/ui/bgcolor.html#setbackgroundtextstyle)
- 新增 支持 uni.startLocationUpdateBackground [详情](https://uniapp.dcloud.net.cn/api/location/location-change.html#startlocationupdatebackground)
- 新增 支持 uni.showNavigationBarLoading [详情](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#shownavigationbarloading)
- 新增 支持 uni.hideNavigationBarLoading [详情](https://uniapp.dcloud.net.cn/api/ui/navigationbar.html#hidenavigationbarloading)
- 新增 支持 uni.offWindowResize [详情](https://uniapp.dcloud.net.cn/api/ui/window.html#offwindowresize)
- 调整 downloadFile、saveFile 接口返回的 tempFilePath 不再添加 file 协议
- 修复 部分情况下运行项目白屏的 Bug
- 修复 chooseImage 未勾选原图时未压缩图片的 Bug
- 修复 部分情况下 uni.getSystemInfo 获取到的 windowHeight 为0的 Bug
- 修复 jsvm 内调用原生 api 取到的返回的对象无法正确 JSON.stringify 的 Bug
- 修复 jsvm 内调用原生 api 取到的返回值部分情况无法打印的 Bug
- 修复 console api 参数超过9个会崩溃的 Bug
- 修复 getLocation 接口部分情况下无法返回正确位置信息的 Bug
- 优化 用户代码报错信息

## 2.3.3

- 修复 MapContext 上的方法回调不触发的 Bug
- 修复 部分情况下快速返回页面应用报错的 Bug
- 调整 uni-app 页面改为使用 file 协议加载

## 2.3.2

- 修复 使用 uni.addPhoneContact 添加后查看联系人有大片空白的 Bug
- 修复 小程序拦截器互相影响的 Bug
- 修复 showLoading 点击 mask 自动关闭的 Bug
- 修复 chooseImage sizeType 不生效的 Bug
- 调整 腾讯地图 key 配置方式

## 2.3.1

- 修复 uni.request 设置的 cookie 对 webview 内部的资源请求无效的 Bug
- 修复 网络请求返回多个 cookie 时 uni.request 返回的 cookies 字段格式错误的 Bug

## 2.3.0

- 新增 openUniMP 支持 redirectPath、arguments 参数
- 新增 uni.login 支持华为登录 [详情](https://uniapp.dcloud.net.cn/api/plugins/login.html#login)
- 新增 uni.getProvider oauth 支持华为 [详情](https://uniapp.dcloud.net.cn/api/plugins/provider.html)
- 调整 统一 userAgent 配置，webview、网络请求遵循同一个 userAgent
- 调整 web-view 允许加载 https 证书过期、错误的资源
- 调整 picker 组件禁用循环滚动
- 调整 分离支付宝支付、华为登录功能为独立 ohpm 包
- 调整 navigateBack api 不再判断页面有没有 webview 组件，直接返回。
- 修复 uni api fail 回调内无法获取 errMsg 属性的 Bug
- 修复 uni.scanCode 返回的 code 类型不正确的 Bug
- 修复 组件 data-xxx 属性层级较深时，无法在事件内的 dataset 中获取的 Bug
- 修复 部分场景下下拉刷新引发应用崩溃的 Bug
- 修复 uni.openLocation 进入导航页面后点击页面自带的返回按钮白屏的 Bug
- 修复 web-view 支持点击 tel 协议的 url
- 修复 uni.uploadFile 仅传递 files 参数不传 filePath 参数时报错的 Bug
- 修复 picker 组件 mode="multiSelector" 数据变更时不联动的 Bug [详情](https://ask.dcloud.net.cn/question/198236)
- 修复 picker 组件 mode="time" 时打开不显示 value 显示当前时间的 Bug
- 修复 picker 组件 mode="date" 时选择日期后再打开日期不改变的 Bug
- 修复 uni.canvasToTempFilePath 调用报错的 Bug
- 修复 uni.compressImage 调用报错的 Bug
- 修复 web-view 组件接收消息格式错误的 Bug

## 2.2.1

- 新增 支持 x86_64 设备
- 新增 支持 webview 下载能力
- 新增 getImageInfo 支持网络图片
- 修复 webview 组件在自定义组件内无法获取 context 的 Bug
- 修复 多个页面包含 webview 组件时，webviewContext 方法混乱的 bug
- 调整 saveImageToPhotosAlbum、saveVideoToPhotosAlbum 不再申请权限

## 2.2.0

- 新增 Debug 配置
- 新增 小程序和宿主通讯
- 新增 释放 wgt 包及从本地启动小程序实例
- 新增 uni.getAppAuthorizeSetting Api [详情](https://uniapp.dcloud.net.cn/api/system/getappauthorizesetting.html#getappauthorizesetting)
- 新增 uni.getSystemSetting Api [详情](https://uniapp.dcloud.net.cn/api/system/getsystemsetting.html)
- 新增 uni.compressImage Api [详情](https://uniapp.dcloud.net.cn/api/media/image.html#compressimage)
- 新增 uni.shareWithSystem Api [详情](https://uniapp.dcloud.net.cn/api/plugins/share.html#sharewithsystem)
- 新增 webview 组件支持位置大小配置
- 新增 网络请求相关接口持久化保存 cookie，并且发送请求时会自动携带
- 修复 存在多个小程序实例时，侧滑关闭应用崩溃的问题
- 修复 支付宝支付成功未触发成功回调的 Bug
- 修复 web-view 组件部分操作导致崩溃
- 修复 uni.getImageInfo 获取某些图片的信息时报错
- 修复 部分情况下 tabBar 页面导航栏文字重叠

## 2.1.0

- 支持显示胶囊按钮
- 支持隐藏和显示小程序
- 优化页面路由

## 2.0.2

- 修复了部分情况下异常崩溃的问题

## 2.0.1

- 修复了小程序实例关闭后无法重新打开的问题

## 2.0.0

- init
