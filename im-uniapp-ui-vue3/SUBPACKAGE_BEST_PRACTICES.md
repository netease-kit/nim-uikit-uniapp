# uni-app 工程分包最佳实践指南

本指南基于当前 `NEUIKit` 项目的分包实践整理，旨在提供一套清晰、可维护的工程化分包方案。

## 1. 核心架构设计

本项目采用 **"Shell + Feature Module"** 的架构模式：

- **主包 (Main Package)**: 仅保留极其轻量的启动页 (`pages/index/index`)，负责环境初始化、权限引导或分流逻辑。
- **业务分包 (Subpackage)**: 将核心业务逻辑（如 IM UIKit）完整封装在一个独立的目录下 (`NEUIKit`)。

### 优势

- **启动速度快**: 首屏仅加载极少资源。
- **解耦**: 业务模块与宿主工程解耦，便于迁移或作为 SDK 嵌入其他项目。
- **突破限制**: 有效解决小程序主包体积限制（如微信小程序 2MB 限制）。

## 2. 关键配置详解

### 2.1 目录结构

建议将分包的所有资源（页面、组件、工具类、静态资源）收敛到同一个目录下。

```
├── pages/
│   └── index/              # 宿主启动页
├── NEUIKit/                # 分包根目录
│   ├── pages/              # 分包页面
│   ├── components/         # 分包组件
│   ├── utils/              # 分包工具
│   └── modules/            # 依赖模块
├── pages.json              # 路由配置
└── manifest.json
```

### 2.2 pages.json 配置

#### 分包声明 (`subPackages`)

使用 `root` 指定分包根目录，并开启 `independent` (独立分包) 模式，提高加载效率。

```json
"subPackages": [
  {
    "root": "NEUIKit",
    "independent": true, // 关键：独立分包，不依赖主包逻辑即可运行
    "pages": [
      {
        "path": "pages/Conversation/index",
        "style": { "navigationStyle": "custom" }
      },
      // ... 其他页面
    ]
  }
]
```

#### 预加载配置 (`preloadRule`)

为了避免用户点击跳转时的加载延迟（转圈或白屏），在用户进入启动页时静默预加载分包。

```json
"preloadRule": {
  "pages/index/index": {
    "network": "all",      // 在所有网络环境下都预加载
    "packages": ["NEUIKit"] // 指定预加载的分包 root
  }
}
```

## 3. 路由跳转最佳实践

由于分包页面的路径需要加上分包根目录前缀（如 `/NEUIKit/pages/...`），直接写死路径会导致代码难以维护。建议封装统一的 **Navigation Wrapper**。

### 3.1 封装路由工具 (`customNavigate.ts`)

在 `NEUIKit/utils/customNavigate.ts` 中集中管理路由逻辑：

```typescript
// 定义统一的前缀，方便后续重构（例如修改分包目录名）
const preUrl = "/NEUIKit";

export function customNavigateTo(options: { url: string }) {
  // 自动拼接前缀
  uni.navigateTo({ ...options, url: preUrl + options.url });
}

export function customRedirectTo(options: { url: string }) {
  uni.redirectTo({ ...options, url: preUrl + options.url });
}

// ... 其他 switchTab, reLaunch 封装
```

### 3.2 业务中使用

在业务代码中，只需关注分包内的相对路径，无需关心分包的具体挂载位置。

```typescript
import { customNavigateTo } from "../../utils/customNavigate";

// ✅ 推荐：只需写内部路径
customNavigateTo({
  url: "/pages/Conversation/index",
});

// ❌ 不推荐：硬编码完整路径
// uni.navigateTo({ url: "/NEUIKit/pages/Conversation/index" })
```

## 4. 常见问题与排查

### 4.1 编译报错 `navigateTo:fail timeout`

- **原因**: 分包体积过大未编译完成，或代码有语法错误导致编译失败。
- **解决**:
  1.  检查 `preloadRule` 是否生效。
  2.  **关键**: 检查分包内代码是否有编译错误。如本次遇到的 `WXML` 编译错误（Vue 模板中 `style="height: "auto""` 写法错误），会导致分包加载失败，从而抛出 timeout 错误。

### 4.2 独立分包 (`independent: true`) 注意事项

- 独立分包不能引用主包的资源（JS/CSS）。
- `App.vue` 中的 `onLaunch` 在进入独立分包时可能不会执行（视具体小程序平台而定）。
- 建议将公共样式和逻辑下沉到分包内部或 uni_modules 中。

## 5. 总结

1.  **结构**: 独立目录 `NEUIKit`。
2.  **配置**: `pages.json` 设置 `subPackages` + `preloadRule`。
3.  **工具**: 使用 `customNavigate` 统一管理跳转。
4.  **调试**: 关注控制台编译错误，任何分包内的语法错误都可能表现为“导航超时”。
