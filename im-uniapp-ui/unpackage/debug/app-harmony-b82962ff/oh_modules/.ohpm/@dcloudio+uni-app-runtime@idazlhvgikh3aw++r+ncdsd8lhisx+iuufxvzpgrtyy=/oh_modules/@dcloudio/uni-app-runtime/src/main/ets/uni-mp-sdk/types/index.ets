import {
  NodeRenderType,
} from '@ohos.arkui.node'

export * from './mp'

export interface NativeEmbedBuilderOptions {
  controller?: object
  width: number
  height: number
  x: number
  y: number
  visibility: Visibility
  on?: Object
}

export interface DefineNativeEmbedOptions {
  builder: (...args: Object[]) => void
  controller?: object
  nodeRenderType: NodeRenderType
}