import { defineNativeEmbed } from './sdk'
import { NodeRenderType } from '@kit.ArkUI'
import { NativeEmbedBuilderOptions } from './types'
import { Ad, CustomEvent, setAdServer } from './components/Ad'
export {
  setAdServer
}

interface On {
  load?: (detail?: CustomEvent) => void
  close?: (detail?: CustomEvent) => void
  error?: (detail?: CustomEvent) => void
  click?: (detail?: CustomEvent) => void
  adOpen?: (detail?: CustomEvent) => void
  adClick?: (detail?: CustomEvent) => void
  resize?: (detail?: CustomEvent) => void
}

interface AdBuilderOptions extends NativeEmbedBuilderOptions {
  adpid: string
  disabled?: boolean
  click: number
  on?: On
}

@Builder
function AdBuilder(options: AdBuilderOptions) {
  Ad({
    adpid: options.adpid,
    onLoad: options.on?.load,
    onClose: options.on?.close,
    onError: options.on?.error,
    onResize: options.on?.resize,
  }).position({
    x: options.x,
    y: options.y,
  }).width(options.width).height(options.height?options.height:300)
}

defineNativeEmbed('ad', {
  builder: AdBuilder,
  nodeRenderType: NodeRenderType.RENDER_TYPE_DISPLAY
})
