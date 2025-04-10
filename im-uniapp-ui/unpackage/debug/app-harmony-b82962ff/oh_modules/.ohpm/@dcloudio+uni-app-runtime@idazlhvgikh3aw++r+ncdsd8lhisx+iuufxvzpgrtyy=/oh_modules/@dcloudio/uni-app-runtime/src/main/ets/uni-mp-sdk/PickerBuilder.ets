import { defineNativeEmbed } from './sdk'
import { Picker, PickerController } from './components/Picker'
import { NodeRenderType } from '@kit.ArkUI'
import { NativeEmbedBuilderOptions } from './types'

interface On {
  cancel?: () => void
  change?: () => void
  columnchange?: () => void
}

interface PickerBuilderOptions extends NativeEmbedBuilderOptions {
  controller: PickerController
  range: string[] | string[][]
  value: string | number | number[]
  rangeKey?: string
  start?: string
  end?: string
  fields?: 'year' | 'month' | 'day',
  disabled?: boolean
  mode?: 'selector' | 'multiSelector' | 'time' | 'date'
  click: number
  on?: On
}

@Builder
function PickerBuilder(options: PickerBuilderOptions) {
  Picker({
    controller: options.controller,
    range: options.range,
    value: options.value,
    rangeKey: options.rangeKey,
    start: options.start,
    end: options.end,
    fields: options.fields,
    disabled: options.disabled,
    mode: options.mode,
    onCancel: options.on?.cancel,
    onChange: options.on?.change,
    onColumnchange: options.on?.columnchange
  }).position({
    x: options.x,
    y: options.y,
  }).width(options.width).height(options.height).visibility(options.visibility)
}

defineNativeEmbed('picker', {
  builder: PickerBuilder,
  controller: PickerController,
  nodeRenderType: NodeRenderType.RENDER_TYPE_TEXTURE
})
