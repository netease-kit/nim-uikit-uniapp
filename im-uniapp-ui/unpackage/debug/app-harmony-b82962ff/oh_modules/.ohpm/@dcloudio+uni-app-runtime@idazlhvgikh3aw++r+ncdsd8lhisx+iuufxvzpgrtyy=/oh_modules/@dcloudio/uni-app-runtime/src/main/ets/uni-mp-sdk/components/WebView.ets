import harmonyWebView from '@ohos.web.webview'
import { BusinessError } from '@ohos.base';
import { abilityAccessCtrl, common, Permissions } from '@kit.AbilityKit';
import { bundleManager } from '@kit.AbilityKit';
import { createDownloadDelegate, getCurrentMP, telSchemeHandler, getAbilityContext } from '../sdk'

interface Detail {}

interface Event {
  detail: Detail
}

interface TitleUpdateEventDetail {
  title?: string
}

interface TitleUpdateEvent extends Event {
  detail: TitleUpdateEventDetail
}

@Component
export struct WebView {
  @Prop @Watch('setSrc') src: string
  onMessage?: (event: Event) => void = undefined
  onTitleUpdate?: (event: TitleUpdateEvent) => void = undefined
  onPostMessageToService?: (event: Event) => void = undefined
  controller?: harmonyWebView.WebviewController

  build() {
    Web({
      src: this.src,
      controller: this.controller
    })
      .overScrollMode(OverScrollMode.NEVER)
      .keyboardAvoidMode(WebKeyboardAvoidMode.RESIZE_VISUAL)
      .geolocationAccess(true)
      .domStorageAccess(true)
      .fileAccess(true)
      .imageAccess(true)
      .onlineImageAccess(true)
      .darkMode(WebDarkMode.Auto)
      .mixedMode(MixedMode.All)
      .onPermissionRequest((event) => {
        const request = event.request
        const requestedResources = request.getAccessibleResource()
        const permissions: Permissions[] = []
        const resources: ProtectedResourceType[] = []
        if (requestedResources.includes(ProtectedResourceType.VIDEO_CAPTURE)) {
          permissions.push('ohos.permission.CAMERA')
          resources.push(ProtectedResourceType.VIDEO_CAPTURE)
        }
        if (requestedResources.includes(ProtectedResourceType.AUDIO_CAPTURE)) {
          permissions.push('ohos.permission.MICROPHONE')
          resources.push(ProtectedResourceType.AUDIO_CAPTURE)
        }
        if (permissions.length > 0) {
          const context = getContext(this) as common.UIAbilityContext;
          const atManager = abilityAccessCtrl.createAtManager();
          atManager.requestPermissionsFromUser(context, permissions).then((data) => {
            const granted: ProtectedResourceType[] =
              resources.filter((resource, index) => data.authResults[index] === 0)
            if (granted.length === 0) {
              request.deny()
              return
            }
            request.grant(granted)
          }).catch((error: BusinessError) => {
            console.error(`Failed to request permissions from user. Code is ${error.code}, message is ${error.message}`);
            request.deny()
          })
        }
      })
      .onControllerAttached(() => {
        const delegate = createDownloadDelegate() as harmonyWebView.WebDownloadDelegate
        this.controller?.setDownloadDelegate(delegate)
        const userAgent = getCurrentMP().userAgent.fullUserAgent as string
        this.controller?.setCustomUserAgent(userAgent)
        this.controller?.setWebSchemeHandler('tel', telSchemeHandler)
      })
      .onLoadIntercept((event) => {
        let url = event.data.getRequestUrl()
        if (
          url.startsWith('file:/') &&
            (url.includes(getContext()!.tempDir) || url.includes(getContext()!.getApplicationContext().tempDir) ||
            url.includes(getContext()!.cacheDir) || url.includes(getContext()!.getApplicationContext().cacheDir))
        ) {
          this.controller?.setPathAllowingUniversalAccess([])
        } else {
          const internalHtmlDirs = [
            getContext()!.filesDir,
            getContext()!.getApplicationContext().filesDir,
            getContext()!.resourceDir,
            getContext()!.getApplicationContext().resourceDir
          ].filter(item =>!!item).map(item => item + '/apps')
          this.controller?.setPathAllowingUniversalAccess(internalHtmlDirs)
          if (!(url.startsWith('http://') || url.startsWith('https://') || url.startsWith('file:/')) &&
          /\w+:/.test(url)) {
            const scheme = (url.match(/(\w+:)\w/) ?? [])[1]
            if (scheme) {
              url = url.replace(scheme, scheme + '//')
            }
            try {
              let canOpen = bundleManager.canOpenLink(url);
              if (canOpen) {
                getAbilityContext()?.openLink(url)
                return true
              } else {
                console.error('Webview failed to open link: ' + url)
              }
            } catch (e) {
              console.error('Webview failed to open link: ' + url + '. ' + e)
            }
          }
        }
        return false
      })
      .onTitleReceive(event => {
        this.onTitleUpdate?.({
          detail: {
            title: event?.title
          }
        })
      })
      .onConsole(event => {
        if (event) {
          console.log('getMessage: ' + JSON.stringify(event.message.getMessage()))
        }
        return false
      })
      .onErrorReceive(event => {
        if (event) {
          console.error(event.error.getErrorInfo())
        }
      })
      .onSslErrorEventReceive((event) => {
        event.handler.handleConfirm()
      })
      .javaScriptProxy({
        object: {
          postMessage: (data: string) => {
            if (this.onMessage) {
              this.onMessage({ detail: JSON.parse(data) })
            }
          },
          postMessageToService: (data: string) => {
            if (this.onPostMessageToService) {
              this.onPostMessageToService({ detail: JSON.parse(data) })
            }
          }
        },
        name: '__uniapp_x_',
        methodList: ['postMessage', 'postMessageToService'],
        controller: this.controller
      })
      .onGeolocationShow((event) => {
        const context = getContext(this) as common.UIAbilityContext;
        const atManager = abilityAccessCtrl.createAtManager();
        atManager.requestPermissionsFromUser(context,
          ["ohos.permission.APPROXIMATELY_LOCATION", "ohos.permission.LOCATION"]).then((data) => {
          if (data.authResults.some(item => item === 0)) {
            event.geolocation.invoke(event.origin, true, true);
          } else {
            event.geolocation.invoke(event.origin, false, false);
          }
        }).catch((error: BusinessError) => {
          console.error(`Failed to request permissions from user. Code is ${error.code}, message is ${error.message}`);
          event.geolocation.invoke(event.origin, false, false);
        })
      })
  }

  setSrc() {
    if (!this.src) {
      return
    }
    this.controller?.loadUrl(this.src)
  }
}
