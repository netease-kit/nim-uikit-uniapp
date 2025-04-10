import { defineNativeEmbed } from './sdk'
import { Map } from './components/Map'
import { NodeRenderType } from '@kit.ArkUI'
import { NativeEmbedBuilderOptions } from './types'

interface MapBuilderOptions extends NativeEmbedBuilderOptions {
  longitude: number
  latitude: number
  zoom: number
}

@Builder
function MapBuilder(options: MapBuilderOptions) {
  Map(options).position({
    x: options.x,
    y: options.y,
  }).width(options.width).height(options.height).visibility(options.visibility)
}

defineNativeEmbed('map', {
  builder: MapBuilder,
  controller: null,
  nodeRenderType: NodeRenderType.RENDER_TYPE_TEXTURE
})
