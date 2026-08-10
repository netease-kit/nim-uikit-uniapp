/**
 * NIM SDK 默认导出 UMD（Universal Module Definition）格式的产物，这种格式的文件可以在多种环境中使用。
 * 当应用对包体积有更严格的要求，例如小程序应用，则可以使用 ESM（ECMAScript Module）格式的 SDK。ESM 是 JavaScript 的原生模块系统，
 * 允许更细粒度的模块控制和更有效的打包。再配合 webpack 实现 tree-shaking（一种去除代码中未引用部分的方式），从而进一步降低 NIM SDK 产物体积。
 * 具体参考文档 https://doc.yunxin.163.com/messaging2/guide/DcyMjA1Njk?platform=client
 */
//@ts-ignore
import { V2NIMConst, NIM } from './module/nim-web-sdk/nim-web-sdk-ng_10.9.81_esm.js'
import type * as V2NIMConstTypes from './module/nim-web-sdk/esm/nim/src/V2NIMConst'

export const NIM_WEB_SDK_VERSION =
  NIM.sdkVersionFormat || String(NIM.sdkVersion || '')

export { NIM, V2NIMConst }

export namespace V2NIMConst {
  export type V2NIMConversationType = V2NIMConstTypes.V2NIMConversationType
  export type V2NIMTeamChatBannedMode = V2NIMConstTypes.V2NIMTeamChatBannedMode
  export type V2NIMTeamMessageMuteMode =
    V2NIMConstTypes.V2NIMTeamMessageMuteMode
  export type V2NIMMessageType = V2NIMConstTypes.V2NIMMessageType
}
