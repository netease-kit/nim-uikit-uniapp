import harmonyWebView from '@ohos.web.webview'
import { defineNativeEmbed } from './sdk'
import { WebView } from './components/WebView'
import { NodeRenderType } from '@kit.ArkUI'
import { NativeEmbedBuilderOptions } from './types'

interface WebViewBuilderOptions extends NativeEmbedBuilderOptions {
  controller: harmonyWebView.WebviewController
  src: string
  onMessage: () => void
  onTitleUpdate: () => void
  onPostMessageToService: () => void
}

@Builder
function WebViewBuilder(options: WebViewBuilderOptions) {
  WebView({
    controller: options.controller,
    src: options.src,
    onMessage: options.onMessage,
    onTitleUpdate: options.onTitleUpdate,
    onPostMessageToService: options.onPostMessageToService,
  }).position({
    x: options.x,
    y: options.y,
  }).width(options.width).height(options.height).visibility(options.visibility)
}

defineNativeEmbed('webview', {
  builder: WebViewBuilder,
  controller: harmonyWebView.WebviewController,
  nodeRenderType: NodeRenderType.RENDER_TYPE_DISPLAY
})
