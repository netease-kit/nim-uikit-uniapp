import webview from '@ohos.web.webview';
import { BusinessError } from '@kit.BasicServicesKit';
interface JavaScriptProxy {
  object: object;
  name: string;
  methodList: Array<string>;
  controller: WebviewController;
}

interface pageStyle {
  backgroundColor: string
}

interface WebBuilderOptions extends WebOptions {
  darkmode: boolean
  controller: webview.WebviewController
  javaScriptProxy: JavaScriptProxy
  safeAreaEdges: Array<SafeAreaEdge>
  backgroundColor?: string
  onPageBegin: () => void
  onPageEnd: () => void
  onFocus: () => void
  onBlur: () => void
  onPageVisible: () => void
  onInterceptRequest: () => WebResourceResponse
  onNativeEmbedLifecycleChange: (event: NativeEmbedDataInfo) => void
  onNativeEmbedGestureEvent: (event: NativeEmbedTouchInfo) => void
  onAreaChange: (oldValue: Area, newValue: Area) => void
  onControllerAttached: () => void
}

@Builder
export function WebBuilder(options: WebBuilderOptions) {
  Web(options)
    .darkMode(options.darkmode ? WebDarkMode.Auto : WebDarkMode.Off)
    .keyboardAvoidMode(WebKeyboardAvoidMode.OVERLAYS_CONTENT)
    .backgroundColor(options.backgroundColor || Color.Transparent)
    .javaScriptProxy(options.javaScriptProxy)
    .onFocus(() => {
      options.onFocus()
    })
    .onBlur(() => {
      options.onBlur()
    })
    .onConsole(event => {
      if (event) {
        console.log(event.message.getMessage())
      }
      return false
    })
    .onErrorReceive(event => {
      if (event) {
        console.error(event.error.getErrorInfo())
      }
    })
    .onDisAppear(() => {
      webview.WebCookieManager.saveCookieAsync()
    })
    .nestedScroll({
      scrollForward: NestedScrollMode.PARENT_FIRST,
      scrollBackward: NestedScrollMode.PARENT_FIRST
    })
    .onSslErrorEventReceive((event) => {
      event.handler.handleConfirm()
    })
    .onPageBegin(options.onPageBegin)
    .onPageEnd(options.onPageEnd)
    .onPageVisible(options.onPageVisible)
    .onInterceptRequest(options.onInterceptRequest)
    .enableNativeEmbedMode(true)
    .onNativeEmbedLifecycleChange(options.onNativeEmbedLifecycleChange)
    .onNativeEmbedGestureEvent(options.onNativeEmbedGestureEvent)
    .fileAccess(true)
    .imageAccess(true)
    .onlineImageAccess(true)
    .domStorageAccess(true)
    .overScrollMode(OverScrollMode.NEVER)
    .expandSafeArea([SafeAreaType.SYSTEM, SafeAreaType.KEYBOARD], options.safeAreaEdges)
    .metaViewport(true)
    .mediaPlayGestureAccess(false)
    .onAreaChange(options.onAreaChange)
    .onControllerAttached(options.onControllerAttached)
}
