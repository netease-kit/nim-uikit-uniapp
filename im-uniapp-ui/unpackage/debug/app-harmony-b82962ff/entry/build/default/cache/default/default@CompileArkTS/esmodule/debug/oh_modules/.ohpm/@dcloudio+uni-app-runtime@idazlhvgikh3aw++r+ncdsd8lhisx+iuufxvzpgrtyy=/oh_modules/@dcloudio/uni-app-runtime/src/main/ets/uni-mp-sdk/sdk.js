var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/tiny-emitter@2.1.0/node_modules/tiny-emitter/index.js
var require_tiny_emitter = __commonJS({
  "node_modules/.pnpm/tiny-emitter@2.1.0/node_modules/tiny-emitter/index.js"(exports, module) {
    function E() {
    }
    E.prototype = {
      on: function(name, callback, ctx) {
        var e = this.e || (this.e = {});
        (e[name] || (e[name] = [])).push({
          fn: callback,
          ctx
        });
        return this;
      },
      once: function(name, callback, ctx) {
        var self2 = this;
        function listener() {
          self2.off(name, listener);
          callback.apply(ctx, arguments);
        }
        ;
        listener._ = callback;
        return this.on(name, listener, ctx);
      },
      emit: function(name) {
        var data = [].slice.call(arguments, 1);
        var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
        var i = 0;
        var len = evtArr.length;
        for (i; i < len; i++) {
          evtArr[i].fn.apply(evtArr[i].ctx, data);
        }
        return this;
      },
      off: function(name, callback) {
        var e = this.e || (this.e = {});
        var evts = e[name];
        var liveEvents = [];
        if (evts && callback) {
          for (var i = 0, len = evts.length; i < len; i++) {
            if (evts[i].fn !== callback && evts[i].fn._ !== callback)
              liveEvents.push(evts[i]);
          }
        }
        liveEvents.length ? e[name] = liveEvents : delete e[name];
        return this;
      }
    };
    module.exports = E;
    module.exports.TinyEmitter = E;
  }
});

// packages/uni-mp-sdk/src/plus/index.ts
var plus_exports = {};
__export(plus_exports, {
  geolocation: () => geolocation,
  globalEvent: () => globalEvent,
  io: () => io,
  key: () => key,
  nativeUI: () => nativeUI,
  navigator: () => navigator,
  runtime: () => runtime,
  webview: () => webview
});

// packages/uni-mp-sdk/src/harmony.ts
import window3 from "@ohos:window";
import harmonyWebView2 from "@ohos:web.webview";

// packages/uni-mp-sdk/src/plus/WebView.ts
import harmonyWebView from "@ohos:web.webview";

// packages/uni-mp-sdk/src/plus/io.ts
import buffer from "@ohos:buffer";

// packages/uni-mp-sdk/src/Runtime.ts
import jsRuntime from "@normalized:Y&&&libjsruntime.so&";

// packages/uni-mp-sdk/src/utils.ts
var freeze = Object.freeze;
var objectToString = Object.prototype.toString;
var toTypeString = (value) => objectToString.call(value);
var isPlainObject = (val) => toTypeString(val) === "[object Object]";
var capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
function getType(val) {
  return toTypeString(val).slice(8, -1).toLowerCase();
}
function disableEnumerable(obj, properties) {
  const propertyDescriptorMap = {};
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i];
    propertyDescriptorMap[property] = {
      enumerable: false,
      value: obj[property]
    };
  }
  Object.defineProperties(obj, propertyDescriptorMap);
}
function hasOwn(obj, key2) {
  return Object.prototype.hasOwnProperty.call(obj, key2);
}

// packages/uni-mp-sdk/src/uts.ts
var storeId = 0;
var store = {};
var UTS_PROXY_TYPE = {
  OBJECT: "UTSProxyObject",
  FUNCTION: "UTSProxyFunction"
};
function setStoreValue(id, value) {
  store[id] = {
    __type: UTS_PROXY_TYPE.OBJECT,
    value
  };
}
function createStoreReference(value) {
  if (typeof value !== "object" || value === null || value instanceof ArrayBuffer) {
    return value;
  }
  if (Array.isArray(value)) {
    const id2 = storeId++;
    setStoreValue(id2, value);
    return value.map((item) => createStoreReference(item));
  }
  const id = storeId++;
  setStoreValue(id, value);
  const keyInfo = getStoreValueKeyInfo(value);
  return {
    __type: UTS_PROXY_TYPE.OBJECT,
    id,
    keyInfo
  };
}
function revokeStoreReference(id) {
  delete store[id];
}
function normalizeArgument(arg, callbacks) {
  if (isPlainObject(arg) && arg.__type === UTS_PROXY_TYPE.FUNCTION) {
    return callbacks[arg.id];
  } else if (isPlainObject(arg)) {
    const keys = Object.keys(arg);
    const argsClone = {};
    for (let i = 0; i < keys.length; i++) {
      const key2 = keys[i];
      argsClone[key2] = normalizeArgument(arg[key2], callbacks);
    }
    return argsClone;
  } else if (Array.isArray(arg)) {
    return arg.map((item) => normalizeArgument(item, callbacks));
  } else {
    return arg;
  }
}
function normalizeArguments(args, callbacks) {
  return normalizeArgument(args, callbacks);
}
function _invokeStoreReference(id, method, args) {
  const storeInfo = store[id];
  if (!storeInfo) {
    return;
  }
  const storeValue = storeInfo.value;
  switch (method) {
    case "__get":
      return storeValue[args[0]];
    case "__set":
      storeValue[args[0]] = args[1];
      return true;
    case "__delete":
      return delete storeValue[args[0]];
    case "__invoke": {
      const method2 = args[0];
      const normalizedArgs = normalizeArguments(args[1], args[2]);
      return storeValue[method2](...normalizedArgs);
    }
    default:
      return storeValue[method](...args);
  }
}
function invokeStoreReference(id, method, args) {
  return createStoreReference(_invokeStoreReference(id, method, args));
}
function traversePrototypeChain(instance, keyInfos) {
  let proto = Object.getPrototypeOf(instance);
  while (proto !== null && proto !== Object.prototype) {
    const keys = Object.getOwnPropertyNames(proto);
    classifyKeys(proto, keys, keyInfos);
    proto = Object.getPrototypeOf(proto);
  }
}
function classifyKeys(val, keys, keyInfos) {
  for (let i = 0; i < keys.length; i++) {
    const key2 = keys[i];
    if (key2 === "constructor") {
      continue;
    }
    if (keyInfos[key2]) {
      continue;
    }
    const descriptor = Object.getOwnPropertyDescriptor(val, key2);
    if (!descriptor) {
      continue;
    }
    const keyInfo = {
      type: "property",
      writable: !!descriptor.writable,
      enumerable: !!descriptor.enumerable,
      configurable: !!descriptor.configurable
    };
    if (typeof descriptor.value === "function") {
      keyInfo.type = "method";
    }
    keyInfos[key2] = keyInfo;
  }
}
function getStoreValueKeyInfo(val) {
  const keys = Object.getOwnPropertyNames(val);
  const keyInfos = {};
  classifyKeys(val, keys, keyInfos);
  traversePrototypeChain(val, keyInfos);
  return keyInfos;
}
var UTS_PLUGIN = {};
setStoreValue("__UTSPlugin" /* __UTSPlugin */, UTS_PLUGIN);
function registerUTSPlugin(name, define) {
  UTS_PLUGIN[name] = define;
}
function requireUTSPlugin(name) {
  const define = UTS_PLUGIN[name];
  if (!define) {
    console.error(`${name} is not found`);
  }
  return define;
}
var NATIVE_MODULE = {};
setStoreValue("__NativeModule" /* __NativeModule */, NATIVE_MODULE);
function registerModule(name, module) {
  NATIVE_MODULE[name] = module;
}

// packages/uni-mp-sdk/src/Runtime.ts
var Runtime = class {
  constructor(mp) {
    this.version = "";
    this.mp = null;
    /**
     * @internal
     */
    this.beforeDestroy = {
      [0 /* TIMEOUT */]: {},
      [1 /* INTERVAL */]: {}
    };
    this.mp = mp;
    function wrapCurrentMP(fn) {
      return function(...args) {
        const restore = setCurrentMP(mp);
        try {
          const res = fn(...args);
          restore();
          return res;
        } catch (error) {
          restore();
          throw error;
        }
      };
    }
    const wrapTimer = (type, timer, clear) => {
      return (cb, time) => {
        const callbacks = this.beforeDestroy[type];
        const id2 = timer(() => {
          if (type === 0 /* TIMEOUT */) {
            delete callbacks[id2];
          }
          cb();
        }, time);
        callbacks[id2] = () => {
          delete callbacks[id2];
          clear(id2);
        };
        return id2;
      };
    };
    const wrapClearTimer = (type) => {
      return (id2) => {
        const callbacks = this.beforeDestroy[type];
        const clear = callbacks[id2];
        if (clear) {
          clear();
        }
      };
    };
    const id = this.id = jsRuntime.create();
    jsRuntime.registerFunction(id, "uniconsole_log", (...args) => {
      console.log(...args);
    });
    jsRuntime.registerFunction(id, "uniconsole_warn", (...args) => {
      console.warn(...args);
    });
    jsRuntime.registerFunction(id, "uniconsole_error", (...args) => {
      console.error(...args);
    });
    const consoleStr = `
(function () {
  globalThis.uniconsole = {}
  const methods = ['log', 'warn', 'error']
  methods.forEach((key) => {
    uniconsole[key] = globalThis['uniconsole_' + key]
  })
})()
`;
    jsRuntime.runJavaScript(id, consoleStr);
    jsRuntime.registerFunction(
      id,
      "setTimeout",
      wrapTimer(0 /* TIMEOUT */, setTimeout, clearTimeout)
    );
    jsRuntime.registerFunction(id, "clearTimeout", wrapClearTimer(0 /* TIMEOUT */));
    jsRuntime.registerFunction(
      id,
      "setInterval",
      wrapTimer(1 /* INTERVAL */, setInterval, clearInterval)
    );
    jsRuntime.registerFunction(
      id,
      "clearInterval",
      wrapClearTimer(1 /* INTERVAL */)
    );
    jsRuntime.registerFunction(
      id,
      "UTSProxyObject_invokeUniApi",
      (name, args, callbacks = []) => {
        const [success, fail, complete] = callbacks;
        if (success || fail || complete) {
          args[0] = {
            ...args[0],
            success,
            fail,
            complete
          };
        }
        return createStoreReference(globalThis.uni[name](...args));
      }
    );
    jsRuntime.registerFunction(
      id,
      "UTSProxyObject_invokeSync",
      (id2, method, args) => {
        return invokeStoreReference(id2, method, args);
      }
    );
    jsRuntime.registerFunction(
      id,
      "UTSProxyObject_revoke",
      wrapCurrentMP((id2) => {
        return revokeStoreReference(id2);
      })
    );
    setStoreValue("__sdkServiceMethod" /* __sdkServiceMethod */, getServiceMethod());
    jsRuntime.registerFunction(
      id,
      "harmonyChannel_invokeSync",
      wrapCurrentMP((name, args = []) => {
        const array = name.split(".");
        let res;
        let obj = globalThis;
        let method = obj;
        let methodName = "";
        for (let i = 0; i < array.length; i++) {
          methodName = array[i];
          obj = method;
          method = obj[methodName];
        }
        if (typeof method === "function") {
          res = obj[methodName](...args);
        } else {
          res = method;
        }
        if (res instanceof WebView) {
          res = {
            id: res.id
          };
        }
        return res;
      })
    );
    const harmonyChannelStr = `
(function () {
  globalThis.harmonyChannel = {}
  const methods = ['invokeSync']
  methods.forEach((key) => {
    harmonyChannel[key] = globalThis['harmonyChannel_' + key]
  })
})()
`;
    jsRuntime.runJavaScript(id, harmonyChannelStr);
    const uniProxyCode = `
(function () {
  globalThis.__sdkServiceMethodList = ${JSON.stringify(Object.keys(getServiceMethod()))}
  globalThis.__uniExtApiList = ${JSON.stringify(getExtUniApiList())}
  globalThis.__uniApiList = ${JSON.stringify(getUniApiList())}
  globalThis.UTSProxyObject = {
    invokeUniApi: globalThis.UTSProxyObject_invokeUniApi,
    invokeSync: globalThis.UTSProxyObject_invokeSync,
    revoke: globalThis.UTSProxyObject_revoke
  }
})()
`;
    jsRuntime.runJavaScript(id, uniProxyCode);
    this.href = getFileURL(PRIVATE_WWW);
    const locationCode = `
(function () {
  globalThis.location = {
    href: ${JSON.stringify(`${this.href}/jsRuntime.js`)}
  }
})()
`;
    jsRuntime.runJavaScript(id, locationCode);
    this.run();
  }
  async run() {
    const href = this.href;
    function getJSContent(path) {
      return getRawFileContent(path, true);
    }
    function getUserJSContent(path) {
      const url = href + "/" + path;
      return getContent(url, true);
    }
    const pandoraStr = await getJSContent("uni-app/pdr.js");
    let frameworkPath = "uni-app/uni-app-harmony-framework";
    if (globalConfig.debug) {
      frameworkPath += "-dev";
    }
    const frameworkStr = await getJSContent(frameworkPath + ".js");
    const frameworkInfoComment = frameworkStr.slice(
      0,
      frameworkStr.indexOf("\n")
    );
    const frameworkInfo = JSON.parse(
      frameworkInfoComment.slice(frameworkInfoComment.indexOf("{"))
    );
    this.mp && (this.mp.runtimeVersion = frameworkInfo.version);
    const appConfigServiceJSFileName = `app-config-service.js`;
    const appConfigServiceStr = await getUserJSContent(
      appConfigServiceJSFileName
    );
    const appServiceJSFileName = `app-service.js`;
    const appServiceStr = await getUserJSContent(appServiceJSFileName);
    if (globalConfig.debug) {
      jsRuntime.openInspector(this.id, false);
    }
    jsRuntime.runJavaScript(this.id, pandoraStr);
    jsRuntime.runJavaScript(this.id, frameworkStr);
    jsRuntime.runJavaScript(
      this.id,
      appConfigServiceStr,
      appConfigServiceJSFileName
    );
    jsRuntime.runJavaScript(this.id, appServiceStr, appServiceJSFileName);
  }
  destroy() {
    Object.values(this.beforeDestroy).forEach((callbacks) => {
      Object.values(callbacks).forEach((cb) => {
        cb();
      });
    });
    jsRuntime.destroy(this.id);
    this.mp = null;
  }
};

// packages/uni-mp-sdk/src/MP.ts
var import_tiny_emitter2 = __toESM(require_tiny_emitter());
import OHWindow from "@ohos:window";

// packages/uni-mp-sdk/src/UTSHarmony/appAbility.ts
var import_tiny_emitter = __toESM(require_tiny_emitter());
var appAbilityEmitter = new import_tiny_emitter.TinyEmitter();
function onAppAbilityCreate(callback) {
  appAbilityEmitter.on("create", callback);
}
function onAppAbilityNewWant(callback) {
  appAbilityEmitter.on("newWant", callback);
}
function onAppAbilityShare(callback) {
  appAbilityEmitter.on("share", callback);
}
function onAppAbilityWindowStageCreate(callback) {
  appAbilityEmitter.on("windowStageCreate", callback);
}

// packages/uni-mp-sdk/src/MP.ts
var currentMP = null;
function setCurrentMP(instance) {
  const origin = currentMP;
  currentMP = instance;
  return function() {
    currentMP = origin;
  };
}
function getCurrentRenderingMP() {
  return LocalStorage.getShared()?.get("storage")?.mp || null;
}
function getCurrentMP() {
  return currentMP || getCurrentRenderingMP();
}
var mainMP = null;
function getCurrentWindow() {
  return getCurrentMP()?.window;
}
function initUserAgentOnce(manifest, userAgent) {
  Object.assign(userAgent, manifest["app-harmony"]?.useragent);
}
function getManifest(appID) {
  const url = getFileURL(PRIVATE_WWW + "/manifest.json", appID);
  const text = getContentSync(url, true);
  const manifest = JSON.parse(text);
  return manifest;
}
function getAppVersionInfo(appId) {
  try {
    const manifest = getManifest(appId);
    if (!manifest) {
      return null;
    }
    return {
      name: manifest.version.name,
      code: manifest.version.code
    };
  } catch (error) {
    return null;
  }
}
function getCurrentManifest() {
  const mp = getCurrentMP();
  if (!mp) {
    return;
  }
  return mp.manifest;
}
var store2 = {};
var BASE_HOST = "uniapp.dcloud.io";
var WEB_VIEW_PROTOCOL = "file://" /* FILE */;
var MPBridge = {
  onNativeEventReceive(callback) {
    const appId = getCurrentMP()?.id;
    appId && store2[appId]?.on("_nativeEventReceive", callback);
  },
  offNativeEventReceive(callback) {
    const appId = getCurrentMP()?.id;
    appId && store2[appId]?.off("_nativeEventReceive", callback);
  },
  sendNativeEvent(event, data, callback) {
    const appId = getCurrentMP()?.id;
    appId && store2[appId]?.emit(
      "uniMPEvent",
      event,
      JSON.parse(data),
      (...args) => {
        callback(...args.map((arg) => JSON.stringify(arg)));
      }
    );
  }
};
setStoreValue("__MPBridge" /* __MPBridge */, MPBridge);
var UniMP = class {
  constructor(id, config) {
    /**
     * @internal
     */
    this.window = null;
    /**
     * @internal
     */
    this.context = null;
    /**
     * @internal
     */
    this.router = new NavPathStack();
    /**
     * @internal
     */
    this.showCapsuleButton = true;
    /**
     * @internal
     */
    this.capsuleMenuActionSheetItems = [];
    /**
     * @internal
     */
    this.capsuleButtonStyle = {};
    /**
     * @internal
     */
    this.runtimeVersion = "";
    /**
     * @internal
     */
    this.waitForRestart = false;
    /**
     * @internal
     */
    this._emitter = new import_tiny_emitter2.TinyEmitter();
    /**
     * @internal
     */
    this._runtime = null;
    /**
     * @internal
     * 禁止自动显示窗口
     */
    this._disableAutoShow = false;
    /**
     * @internal
     * 最小化窗口（隐藏状态）
     */
    this._minimize = true;
    /**
     * @internal
     */
    this._onBackground = () => {
      this._setMinimize(true);
    };
    /**
     * @internal
     */
    this._onForeground = () => {
      this._setMinimize(false);
    };
    this.userAgent = {
      value: "",
      concatenate: true,
      fullUserAgent: ""
    };
    this._closed = false;
    this.id = id;
    this.isMain = !!config?.isMain;
    this.host = config?.host ?? `${id.toLowerCase()}.${BASE_HOST}`;
    this.showCapsuleButton = config?.showCapsuleButton ?? !this.isMain;
    this.capsuleMenuActionSheetItems = config?.capsuleMenuActionSheetItems ?? [];
    this.capsuleButtonStyle = config?.capsuleButtonStyle ?? {};
    const redirectPath = config?.redirectPath;
    const launchOptions = {
      channel: config?.channel || "",
      launcher: config?.launcher || "default"
    };
    launchOptions.redirectInfo = {
      extraData: config?.extraData
    };
    const redirectInfo = launchOptions.redirectInfo;
    if (typeof redirectPath === "string") {
      let path = redirectPath;
      const queryIndex = redirectPath.indexOf("?");
      if (queryIndex >= 0) {
        path = redirectPath.slice(0, queryIndex);
        const query = redirectPath.slice(queryIndex + 1);
        redirectInfo.query = query;
      }
      if (path.startsWith("/")) {
        path = path.substring(1);
      }
      redirectInfo.path = path;
    }
    launchOptions.arguments = config?.arguments;
    this.launchOptions = launchOptions;
    const windowStage2 = getWindowStage();
    if (!windowStage2) {
      throw new Error("windowStage is required");
    }
    const restore = setCurrentMP(this);
    this.manifest = getManifest(id);
    initUserAgentOnce(this.manifest, this.userAgent);
    const initWindow = (err, window4) => {
      if (err.code) {
        console.error(err);
        return;
      }
      const restore2 = setCurrentMP(this);
      this.window = window4;
      window4.setSubWindowModal(true);
      window4.setWindowLayoutFullScreen(true);
      window4.on("keyboardHeightChange", (size) => {
        appLifeCycle.emit("keyboardHeightChange", size);
      });
      try {
        window4.on("subWindowClose", () => {
          setTimeout(() => {
            this.close();
          }, 0);
          return true;
        });
      } catch (_) {
        console.warn("window.on subWindowClose not supported");
      }
      const windowStatusChange = (status) => {
        const minimize = status === OHWindow.WindowStatusType.MINIMIZE;
        this._setMinimize(minimize);
      };
      window4.on("windowStatusChange", windowStatusChange);
      windowStatusChange(window4.getWindowStatus());
      appLifeCycle.on("onForeground", this._onForeground);
      appLifeCycle.on("onBackground", this._onBackground);
      const storage = new LocalStorage();
      storage.setOrCreate("storage", {
        mp: this
      });
      window4.loadContentByName(TEMPLATE_PAGE_NAME, storage, (err2) => {
        if (err2.code) {
          console.error(err2);
          return;
        }
        const restore3 = setCurrentMP(this);
        this.context = window4.getUIContext();
        const webView = createLaunchWebView(this.manifest);
        webView.addEventListener("controllerAttached", () => {
          const restore4 = setCurrentMP(this);
          this._runtime = new Runtime(this);
          restore4();
        });
        if (!this._disableAutoShow) {
          window4.showWindow();
        }
        restore3();
      });
      restore2();
    };
    if (this.isMain) {
      windowStage2.getMainWindow(initWindow);
    } else {
      windowStage2.createSubWindow(`uni-mp-${id}`, initWindow);
    }
    this.capsuleMenuButtonClick = () => {
      if (!this.window || this.capsuleMenuActionSheetItems.length === 0) {
        return;
      }
      this.window.getUIContext().getPromptAction().showActionMenu({
        title: "",
        // @ts-expect-error this.capsuleMenuActionSheetItems.length > 0
        buttons: this.capsuleMenuActionSheetItems.map((item) => {
          return {
            text: item.title,
            // TODO color参数为必传参数，但是可能需要适配主题
            color: "#000000"
          };
        })
      }).then((showActionSheetRes) => {
        this._emitter.emit(
          "menuItemClick",
          this.capsuleMenuActionSheetItems[showActionSheetRes.index].id
        );
      });
    };
    this.capsuleCloseButtonClick = () => {
      this.close();
    };
    restore();
    store2[id] = this;
  }
  close() {
    const restore = setCurrentMP(this);
    const window4 = this.window;
    if (!window4) {
      throw new Error("waiting for window");
    }
    this._emitter.emit("beforeClose");
    appLifeCycle.off("onForeground", this._onForeground);
    appLifeCycle.off("onBackground", this._onBackground);
    this._runtime?.destroy();
    window4.destroyWindow();
    webview.clear();
    delete store2[this.id];
    restore();
    this._emitter.emit("close");
    this._closed = true;
  }
  isRunning() {
    return !this._closed;
  }
  hide() {
    this._disableAutoShow = true;
    const window4 = this.window;
    if (!window4) {
      return;
    }
    window4.minimize();
  }
  show() {
    this._disableAutoShow = false;
    const window4 = this.window;
    if (!window4) {
      return;
    }
    window4.showWindow();
  }
  on(name, callback) {
    this._emitter.on(name, callback);
  }
  off(name, callback) {
    this._emitter.off(name, callback);
  }
  /**
   * @internal
   */
  emit(name, ...args) {
    this._emitter.emit(name, ...args);
  }
  sendUniMPEvent(event, data) {
    this._emitter.emit("_nativeEventReceive", event, data);
  }
  /**
   * @internal
   */
  _setMinimize(minimize) {
    if (minimize === this._minimize) {
      return;
    }
    this._minimize = minimize;
    this._emitter.emit(minimize ? "hide" : "show");
  }
};
function openUniMP(appID, config) {
  let mp = getUniMP(appID);
  if (mp) {
    throw new Error(`UniMP: ${appID} already opened`);
  }
  mp = new UniMP(appID, config);
  return mp;
}
function getUniMP(appID) {
  const mp = store2[appID];
  return mp;
}
function closeUniMP(appID) {
  const mp = getUniMP(appID);
  mp.waitForRestart = true;
  if (!mp) {
    throw new Error(`UniMP: ${appID} not found`);
  }
  mp.close();
}
function openUniApp(appID, config) {
  const mp = openUniMP(appID, {
    redirectPath: config?.redirectPath,
    isMain: true,
    arguments: getLaunchArguments(lastWant)
  });
  mp.on("close", () => {
    mainMP = null;
    if (!mp.waitForRestart) {
      getAbilityContext().terminateSelf();
    }
  });
  mainMP = mp;
}
function hmrRestartUniApp() {
  let currentPageUrl = "";
  if (mainMP) {
    mainMP.waitForRestart = true;
    const webview2 = getCurrentWebview(mainMP);
    if (webview2 && webview2.style.uniPageUrl) {
      const { path, query } = webview2.style.uniPageUrl;
      currentPageUrl = path + "?" + query;
    }
    mainMP.close();
  }
  const mainMPId = mainMP?.id || "HBuilder";
  return openUniApp(mainMPId, {
    redirectPath: currentPageUrl || void 0
  });
}
function getLaunchArguments(want) {
  let args;
  if (want) {
    const params = want.parameters;
    let hasParams = false;
    if (params) {
      args = {};
      for (const key2 in params) {
        if (key2.startsWith("ohos.")) {
          continue;
        }
        hasParams = true;
        args[key2] = params[key2];
      }
    }
    if (!hasParams) {
      args = want.uri;
    }
  }
  return args;
}
var lastWant = void 0;
appAbilityEmitter.on(
  "create",
  (want, launchParam) => {
    lastWant = want;
  }
);
appAbilityEmitter.on(
  "newWant",
  (want, launchParam) => {
    lastWant = want;
    if (mainMP) {
      mainMP.launchOptions.arguments = getLaunchArguments(want);
    }
  }
);

// packages/uni-mp-sdk/src/plus/io.ts
import fs from "@ohos:file.fs";
var PRIVATE_WWW = "_www";
var PRIVATE_DOC = "_doc";
var PUBLIC_DOCUMENTS = "_documents";
var PUBLIC_DOWNLOADS = "_downloads";
var filesDir = "";
function getFilesDir() {
  if (!filesDir) {
    const context = getAbilityContext();
    if (context && context.getApplicationContext) {
      filesDir = context.getApplicationContext().filesDir;
    }
  }
  return filesDir;
}
var resourceDir = "";
function getResourceDir() {
  if (!resourceDir) {
    const context = getAbilityContext();
    if (context) {
      resourceDir = context.resourceDir;
    }
  }
  return resourceDir;
}
function getPrivateDir(appID) {
  if (!appID) {
    const mp = getCurrentMP();
    appID = mp.id;
  }
  const filesDir2 = getFilesDir();
  return `${filesDir2}/apps/${appID}`;
}
function convertLocalFileSystemURL(url, appID) {
  const filesDir2 = getFilesDir();
  const privateDir = getPrivateDir(appID);
  if (url.startsWith(PRIVATE_WWW) || url.startsWith(PRIVATE_DOC)) {
    url = url.replace("_", privateDir + "/");
  } else if (url.startsWith(PUBLIC_DOCUMENTS) || url.startsWith(PUBLIC_DOWNLOADS)) {
    url = url.replace("_", filesDir2 + "/");
  }
  return url;
}
function getFileURL(url, appID) {
  return getResourceStr(url, true, appID);
}
var RAW_PATH = "resource://rawfile";
function isWgtRelease(appID) {
  const www = getWWWPath(appID);
  return fs.accessSync(www);
}
function isInRaw(appID) {
  appID = appID ?? getCurrentMP().id;
  const resourceManager = getAbilityContext().resourceManager;
  try {
    return resourceManager.isRawDir(`apps/${appID}/www`);
  } catch (error) {
    return false;
  }
}
function getWWWPath(appID) {
  const privateDir = getPrivateDir(appID);
  return privateDir + "/" + PRIVATE_WWW.replace("_", "");
}
function getResourceStr(filepath, forceStr, appID) {
  if (filepath.indexOf("/") === 0) {
    if (!filepath.startsWith("/data/storage/")) {
      filepath = PRIVATE_WWW + filepath;
    }
  }
  filepath = convertLocalFileSystemURL(filepath, appID);
  const filesDir2 = getFilesDir();
  if (!isWgtRelease(appID) && filepath.startsWith(getWWWPath(appID))) {
    filepath = filepath.replace(
      filesDir2,
      isInRaw(appID) ? RAW_PATH : getResourceDir()
    );
  }
  if (filepath.startsWith("/")) {
    filepath = "file://" + filepath;
  }
  if (!forceStr && filepath.startsWith(RAW_PATH)) {
    return $rawfile(filepath.replace(RAW_PATH + "/", ""));
  }
  return filepath;
}
function getRealPath(url) {
  return getResourceStr(url, true);
}
function getEnv() {
  const context = getAbilityContext().getApplicationContext();
  const mp = getCurrentMP();
  const appId = mp.id;
  return {
    USER_DATA_PATH: context.filesDir + "/" + appId,
    TEMP_PATH: context.tempDir + "/" + appId,
    CACHE_PATH: context.cacheDir + "/" + appId
  };
}
function getRawFileContentSync(url, isText) {
  const resourceManager = getAbilityContext().resourceManager;
  const path = url.replace(RAW_PATH + "/", "");
  const data = resourceManager.getRawFileContentSync(path);
  return isText ? buffer.from(data).toString("utf8") : data.buffer;
}
async function getRawFileContent(url, isText) {
  const resourceManager = getAbilityContext().resourceManager;
  const path = url.replace(RAW_PATH + "/", "");
  const data = await resourceManager.getRawFileContent(path);
  return isText ? buffer.from(data).toString("utf8") : data.buffer;
}
function getFileContentSync(url, isText) {
  const path = url.replace("file://", "");
  const { fd } = fs.openSync(path, fs.OpenMode.READ_ONLY);
  const { size } = fs.statSync(fd);
  const data = new ArrayBuffer(size);
  fs.readSync(fd, data);
  return isText ? buffer.from(data).toString("utf8") : data;
}
async function getFileContent(url, isText) {
  const path = url.startsWith("file:///") ? url.replace("file://", "") : url;
  const { fd } = await fs.open(path, fs.OpenMode.READ_ONLY);
  const { size } = await fs.stat(fd);
  const data = new ArrayBuffer(size);
  await fs.read(fd, data);
  return isText ? buffer.from(data).toString("utf8") : data;
}
function getContentSync(url, isText) {
  if (url.startsWith(RAW_PATH)) {
    return getRawFileContentSync(url, isText);
  }
  return getFileContentSync(url, isText);
}
function getContent(url, isText) {
  if (url.startsWith(RAW_PATH)) {
    return getRawFileContent(url, isText);
  }
  return getFileContent(url, isText);
}
function isLocalPath(url) {
  return url.startsWith("file:/") || url.startsWith("resource:/");
}
var io = {
  PRIVATE_WWW: 1 /* PRIVATE_WWW */,
  PRIVATE_DOC: 2 /* PRIVATE_DOC */,
  PUBLIC_DOCUMENTS: 3 /* PUBLIC_DOCUMENTS */,
  PUBLIC_DOWNLOADS: 4 /* PUBLIC_DOWNLOADS */,
  // @ts-expect-error getEnv for plus
  getEnv,
  convertLocalFileSystemURL
};

// packages/uni-mp-sdk/src/plus/key.ts
import inputMethod from "@ohos:inputMethod";
var key = {
  addEventListener(event, listener, capture) {
    if (event === "backbutton") {
      const mp = getCurrentMP();
      let callbacks = onBackPressCallbacks.get(mp);
      if (!callbacks) {
        callbacks = [];
        onBackPressCallbacks.set(mp, callbacks);
      }
      callbacks.push(listener);
    }
  },
  removeEventListener(event, listener) {
    if (event === "backbutton") {
      const mp = getCurrentMP();
      const callbacks = onBackPressCallbacks.get(mp);
      if (callbacks) {
        const index3 = callbacks.indexOf(listener);
        if (index3 !== -1) {
          callbacks.splice(index3, 1);
        }
      }
    }
  },
  showSoftKeybord() {
    const controller = inputMethod.getController();
    controller.attach(true, {
      inputAttribute: {
        textInputType: -1,
        enterKeyType: 0
      }
    }).then(() => {
      controller.showTextInput();
    });
  },
  hideSoftKeybord() {
    inputMethod.getController().hideTextInput();
  }
};

// packages/uni-mp-sdk/src/plus/WebView.ts
import {
  NodeRenderType as NodeRenderType2,
  NodeController as NodeController2,
  BuilderNode as BuilderNode2
} from "@ohos:arkui.node";

// packages/uni-mp-sdk/src/plus/navigator.ts
var import_tiny_emitter3 = __toESM(require_tiny_emitter());
import window2 from "@ohos:window";
var safeAreasEvents = /* @__PURE__ */ new WeakMap();
function toValue(value, px) {
  if (!px) {
    value = Math.floor(px2vp(value));
  }
  return value;
}
function getSafeAreaInsets(px) {
  const safeAreaInsets = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  };
  const currentWindow = getCurrentMP()?.window;
  if (currentWindow) {
    const systemArea = currentWindow.getWindowAvoidArea(
      window2.AvoidAreaType.TYPE_SYSTEM
    );
    const navArea = currentWindow.getWindowAvoidArea(
      window2.AvoidAreaType.TYPE_NAVIGATION_INDICATOR
    );
    const keyboard = currentWindow.getWindowAvoidArea(
      window2.AvoidAreaType.TYPE_KEYBOARD
    );
    safeAreaInsets.top = toValue(systemArea.topRect.height, px);
    safeAreaInsets.bottom = toValue(navArea.bottomRect.height, px);
    safeAreaInsets.keyboardHeight = toValue(keyboard.bottomRect.height, px);
  }
  return safeAreaInsets;
}
function onSafeAreaInsetsChange(callback, px) {
  const mp = getCurrentMP();
  if (!mp) {
    throw new Error("current mp not found");
  }
  let safeAreasEvent = safeAreasEvents.get(mp);
  if (!safeAreasEvent) {
    safeAreasEvent = new import_tiny_emitter3.TinyEmitter();
    safeAreasEvents.set(mp, safeAreasEvent);
    const safeAreaInsetsChangeCallback = function(options) {
      const safeAreaInsets = {};
      switch (options.type) {
        case window2.AvoidAreaType.TYPE_KEYBOARD:
          safeAreaInsets.keyboardHeight = toValue(
            options.area.bottomRect.height,
            px
          );
          break;
        case window2.AvoidAreaType.TYPE_SYSTEM:
          safeAreaInsets.top = toValue(options.area.topRect.height, px);
          break;
        case window2.AvoidAreaType.TYPE_NAVIGATION_INDICATOR:
          safeAreaInsets.bottom = toValue(options.area.bottomRect.height, px);
          break;
        default:
          break;
      }
      safeAreasEvent.emit("safeAreaInsetsChange", safeAreaInsets);
    };
    const currentWindow = mp.window;
    currentWindow.on("avoidAreaChange", safeAreaInsetsChangeCallback);
  }
  safeAreasEvent.on("safeAreaInsetsChange", callback);
}
function offSafeAreaInsetsChange(callback) {
  const mp = getCurrentMP();
  if (mp) {
    const safeAreasEvent = safeAreasEvents.get(mp);
    safeAreasEvent?.off("safeAreaInsetsChange", callback);
  }
}
function setWindowSystemBarProperties(systemBarProperties) {
  try {
    const windowStage2 = getWindowStage();
    const promise = windowStage2.getMainWindowSync().setWindowSystemBarProperties(systemBarProperties);
    return promise.catch((err) => {
      console.error(
        "Failed to set the system bar properties. Cause: " + JSON.stringify(err)
      );
    });
  } catch (exception) {
    return Promise.reject(exception);
  }
}
var navigator = {
  setStatusBarStyle: (style, statusBarBackground) => {
    const systemBarProperties = {};
    if (statusBarBackground)
      systemBarProperties.statusBarColor = statusBarBackground;
    switch (style) {
      case "dark":
        systemBarProperties.statusBarContentColor = "#000000";
        break;
      case "light":
        systemBarProperties.statusBarContentColor = "#FFFFFF";
        break;
      default:
        return;
    }
    setWindowSystemBarProperties(systemBarProperties);
  },
  getSafeAreaInsets() {
    const res = getSafeAreaInsets();
    delete res.keyboardHeight;
    return res;
  },
  getOrientation() {
    const map2 = {
      // PORTRAIT
      1: 0,
      // LANDSCAPE
      2: 90,
      // PORTRAIT_INVERTED
      3: 180,
      // LANDSCAPE_INVERTED
      4: -90
    };
    let currentWindow = getCurrentMP()?.window;
    if (!currentWindow) {
      const windowStage2 = getWindowStage();
      currentWindow = windowStage2.getMainWindowSync();
    }
    const orientation = currentWindow.getPreferredOrientation();
    return map2[orientation] || 0;
  }
};

// packages/uni-mp-sdk/src/plus/WebView.ts
var import_tiny_emitter4 = __toESM(require_tiny_emitter());

// packages/uni-mp-sdk/src/UTSHarmony/mimeType.ts
import uniformTypeDescriptor from "@ohos:data.uniformTypeDescriptor";
function getExtensionFromMimeType(mimeType) {
  const typeId = uniformTypeDescriptor.getUniformDataTypeByMIMEType(mimeType);
  const typeObj = uniformTypeDescriptor.getTypeDescriptor(typeId);
  const filenameExtensions = typeObj.filenameExtensions;
  return filenameExtensions[0] ? filenameExtensions[0].replace(/^./, "") : null;
}
function getMimeTypeFromExtension(extension) {
  const typeId = uniformTypeDescriptor.getUniformDataTypeByFilenameExtension(
    "." + extension
  );
  const typeObj = uniformTypeDescriptor.getTypeDescriptor(typeId);
  const mimeTypes = typeObj.mimeTypes;
  return mimeTypes[0] || null;
}

// packages/uni-mp-sdk/src/plus/mime.ts
function lookupContentTypeWithUri(uri) {
  const uriArr = uri.split(".");
  if (uriArr.length <= 1) {
    return void 0;
  }
  const ext = uriArr.pop();
  return getMimeTypeFromExtension(ext) || void 0;
}

// packages/uni-mp-sdk/src/plus/WebView.ts
import buffer2 from "@ohos:buffer";

// packages/uni-mp-sdk/src/NativeEmbed.ts
import {
  NodeController,
  BuilderNode
} from "@ohos:arkui.node";
var store3 = {};
function defineNativeEmbed(name, options) {
  store3["native/" + name] = options;
}
var NativeEmbedNodeController = class extends NodeController {
  constructor(parent, id, info, surfaceId, embedId, elId) {
    super();
    /**
     * @internal
     */
    this.isDestroy = false;
    /**
     * @internal
     */
    this.isDetached = false;
    /**
     * @internal
     */
    this.rootNode = null;
    this.parent = parent;
    this.id = id;
    this.elId = elId;
    this.type = info.type;
    const defineNativeEmbedOptions = this._defineNativeEmbedOptions = store3[this.type];
    this.renderType = defineNativeEmbedOptions.nodeRenderType;
    this.surfaceId = surfaceId;
    this.embedId = embedId;
    this.options = this.parseOptions(info);
    if (this._defineNativeEmbedOptions.controller) {
      this.controller = this.options.controller = new this._defineNativeEmbedOptions.controller();
    }
    if (this.type === "native/webview") {
      const WEB_INVOKE_APPSERVICE = "WEB_INVOKE_APPSERVICE";
      const options = this.options;
      options.onMessage = ({ detail }) => {
        if (this.isDetached) {
          return;
        }
        this.parent.mp.emit("plusMessage", {
          data: {
            type: WEB_INVOKE_APPSERVICE,
            args: {
              data: {
                name: "postMessage",
                arg: detail.data
              },
              webviewIds: [this.id.split("-")[0]]
            }
          }
        });
      };
      options.onTitleUpdate = ({ detail }) => {
        if (this.isDetached) {
          return;
        }
        if (options.updateTitle) {
          const view = this.parent;
          if (view.getStyle().titleNView) {
            view.setStyle({
              titleNView: {
                titleText: detail.title || ""
              }
            });
          }
        }
      };
      options.onPostMessageToService = ({ detail }) => {
        if (this.isDetached) {
          return;
        }
        this.parent.mp.emit("plusMessage", {
          data: detail
        });
      };
    }
  }
  parseOptions(info) {
    const options = {
      width: px2vp(info.width || 0),
      height: px2vp(info.height || 0),
      x: px2vp(info.position?.x || 0),
      y: px2vp(info.position?.y || 0),
      visibility: Visibility.Visible
    };
    let hash = "";
    if (info.src != null) {
      options.src = info.src;
      hash = info.src.split("#")[1] || "";
    }
    try {
      const newOptions = hash ? JSON.parse(decodeURIComponent(hash)) || {} : {};
      Object.keys(newOptions).forEach((key2) => {
        const value = newOptions[key2];
        if (key2 === "on") {
          const on = options.on = {};
          const events = value;
          events.forEach((key3) => {
            on[key3] = (event) => {
              if (this.isDetached) {
                return;
              }
              this.parent.evalJS(
                `document.querySelector('[el-id="${this.elId}"]')?.dispatchEvent(new CustomEvent('${key3}',{detail:${JSON.stringify(event?.detail)}}))`
              );
            };
          });
        } else if (key2 === "src") {
          if (this.type === "native/webview") {
            options.src = fromWebURL(this.parent.mp, value);
          } else {
            options.src = value;
          }
        } else {
          options[key2] = value;
        }
      });
    } catch (error) {
      console.warn("parse options error", error);
    }
    return options;
  }
  makeNode(uiContext) {
    if (this.isDestroy) {
      return null;
    }
    if (!this.rootNode) {
      const rootNode = this.rootNode = new BuilderNode(uiContext, { surfaceId: this.surfaceId, type: this.renderType });
      const warp = wrapBuilder(this._defineNativeEmbedOptions.builder);
      rootNode.build(warp, this.options);
    }
    return this.rootNode.getFrameNode();
  }
  update(info) {
    const newOptions = this.parseOptions(info);
    Object.assign(this.options, newOptions);
    this.rootNode?.update(this.options);
    this.rootNode?.updateConfiguration();
  }
  invoke(method, args) {
    this.controller?.[method](...args);
  }
  postTouchEvent(event) {
    if (!event) {
      return false;
    }
    return !!this.rootNode?.postTouchEvent(event);
  }
  detach() {
    this.isDetached = true;
  }
  destroy() {
    if (this.rootNode) {
      this.rootNode.dispose();
      this.rootNode = null;
    }
    this.isDestroy = true;
  }
};

// packages/uni-mp-sdk/src/plus/WebView.ts
var JS_REGISTER_NAME = "harmonyChannel";
var cache = /* @__PURE__ */ new WeakMap();
function getShowStack(mp) {
  mp = mp || getCurrentMP();
  const stack = cache.get(mp)?.stack || [];
  return stack.filter((webView) => webView.isRendering);
}
function getCurrentWebview(mp) {
  return getShowStack(mp).pop();
}
var mpTabs = /* @__PURE__ */ new WeakMap();
function getCurrentTabs() {
  const mp = getCurrentMP();
  if (mpTabs.has(mp)) {
    return mpTabs.get(mp);
  }
  const tabs = [];
  mpTabs.set(mp, tabs);
  return tabs;
}
function isTabBarPage(id) {
  const tabs = getCurrentTabs();
  return tabs.includes(id);
}
var index = 0;
var pullDownRefreshWebview = null;
function setPullDownRefreshWebview(webview2) {
  pullDownRefreshWebview = webview2;
}
function getPullDownRefreshWebview() {
  return pullDownRefreshWebview;
}
var tabBarStyles = /* @__PURE__ */ new WeakMap();
function getCurrentTabBarStyle() {
  const mp = getCurrentMP();
  let style = tabBarStyles.get(mp);
  if (!style) {
    const manifest = mp.manifest;
    const tabBarCopy = { ...manifest.plus.tabBar || {} };
    delete tabBarCopy.list;
    style = getOSRuntime().createTabBarState(tabBarCopy);
    tabBarStyles.set(mp, style);
  }
  return style;
}
function createWebNode(mp, id, options) {
  const { store: store4, createCallback } = cache.get(mp).node;
  const node = new BuilderNode2(mp.context);
  const builder = wrapBuilder(getOSRuntime().WebBuilder);
  node.build(builder, options);
  const array = store4[id];
  if (!array) {
    store4[id] = [node, null, options];
  } else {
    array[0] = node;
    array[1].rebuild();
  }
  const callback = createCallback[id];
  if (callback) {
    delete createCallback[id];
    callback();
  }
  return node;
}
function removeWebNode(mp, id) {
  const mpCache = cache.get(mp);
  const mpStore = mpCache.store;
  const { store: store4, createCallback } = mpCache.node;
  const array = store4[id];
  if (array) {
    array[0]?.dispose();
    delete store4[id];
  }
  delete createCallback[id];
  delete mpStore[id];
}
function getWebNode(mp, id, nodeController) {
  const { store: store4 } = cache.get(mp).node;
  let array = store4[id];
  if (!array) {
    array = store4[id] = [null, nodeController, null];
  } else {
    array[1] = nodeController;
  }
  const node = array[0];
  return node;
}
var WebNodeController = class extends NodeController2 {
  constructor(id) {
    super();
    this.isDisappear = false;
    this.id = id;
    this.mp = getCurrentMP();
  }
  makeNode(uiContext) {
    const node = getWebNode(this.mp, this.id, this);
    return node ? node.getFrameNode() : null;
  }
  aboutToDisappear() {
    const { store: store4 } = cache.get(this.mp).node;
    const array = store4[this.id];
    if (array) {
      if (array[1] === this) {
        array[1] = null;
      }
    }
  }
  update(options) {
    const { store: store4 } = cache.get(this.mp).node;
    const array = store4[this.id];
    if (array && array[0] && array[2]) {
      array[0].update(Object.assign(array[2], options));
    }
  }
};
function toWebURL(mp, url) {
  if (WEB_VIEW_PROTOCOL !== "http://" /* HTTP */) {
    return url;
  }
  if (isLocalPath(url)) {
    const path = url.replace(":/", "");
    url = `http://${mp.host}/${path}`;
  }
  return url;
}
function fromWebURL(mp, url) {
  if (WEB_VIEW_PROTOCOL !== "http://" /* HTTP */) {
    return url;
  }
  const pre = `http://${mp.host}/`;
  if (url.startsWith(pre)) {
    url = url.substring(pre.length);
    url = url.replace(/(file|resource)/, "$1:/");
  }
  return url;
}
function createSchemeResponse(mimeType, set) {
  const response = new harmonyWebView.WebSchemeHandlerResponse();
  response.setMimeType(mimeType);
  response.setStatus(200);
  response.setStatusText("OK");
  set(response);
  return true;
}
function createSchemeResponseWithURL(url, handler) {
  const mimeType = lookupContentTypeWithUri(url) || "application/octet-stream";
  return createSchemeResponse(mimeType, async (response) => {
    handler.didReceiveResponse(response);
    const content = await getContent(url);
    if (content.byteLength > 0) {
      handler.didReceiveResponseBody(content);
    }
    handler.didFinish();
  });
}
var EVENT_NAMES = [
  "pullToRefresh",
  "resize",
  "loading",
  "loaded",
  "controllerAttached",
  "close",
  // 暂不支持，仅用于避免 组件库 使用后报错
  "hide",
  "show"
];
var UniFileProxy = "file://unifileproxy/";
harmonyWebView.WebCookieManager.putAcceptCookieEnabled(true);
harmonyWebView.WebCookieManager.putAcceptThirdPartyCookieEnabled(true);
var WebView = class {
  constructor(src, id, style, extras) {
    /**
     * 是否开始渲染
     */
    this.isRendering = false;
    this._emitter = new import_tiny_emitter4.TinyEmitter();
    this._isFocused = false;
    this._children = {};
    this._manifestSafeArea = {};
    this.isCloseCalled = false;
    const mp = getCurrentMP();
    this.mp = mp;
    const manifest = mp.manifest;
    this._manifestSafeArea = manifest["app-harmony"]?.safearea || {};
    this.page = {
      pages: [],
      tabBar: {},
      safeArea: this._manifestSafeArea
    };
    src = src ? toWebURL(this.mp, getFileURL(src)) : "about:blank";
    id = id || (index++).toString();
    this.id = id;
    let data = cache.get(mp);
    if (!data) {
      data = {
        store: {},
        stack: [],
        node: {
          store: {},
          createCallback: {}
        }
      };
      cache.set(mp, data);
    }
    const { store: store4, stack } = data;
    store4[id] = this;
    stack.push(this);
    this._emitter.on("refreshStateChange", (state) => {
      if (state !== RefreshStatus.Inactive && state !== RefreshStatus.Done) {
        setPullDownRefreshWebview(this);
      }
    });
    this.pageState = getOSRuntime().createSubPageState({
      id,
      style: style || {},
      embedChildren: [],
      stackChildren: [],
      refreshState: {
        refreshing: false,
        onRefreshing: () => {
          this._emitter.emit("pullToRefresh");
        },
        onRefreshStateChange: (state) => {
          this._emitter.emit("refreshStateChange", state);
        }
      }
    });
    const controller = new harmonyWebView.WebviewController();
    const javaScriptProxy = {
      object: {
        invokeSync: (name, args = []) => {
          args = args.map((arg) => {
            return arg ? JSON.parse(arg) : void 0;
          });
          switch (name) {
            case "currentWebview":
              return { id };
            case "postMessageToUniNView":
              if (!this.isCloseCalled) {
                this.mp.emit("plusMessage", { data: args[0] });
              }
              break;
            case "getStyle":
              return this.getStyle();
            case "convertLocalFileSystemURL":
              return io.convertLocalFileSystemURL(args[0]);
            case "setSoftinputTemporary":
              this.setSoftinputTemporary(args[0]);
              break;
            case "hideSoftKeybord":
              key.hideSoftKeybord();
              break;
            case "showSoftKeybord":
              key.showSoftKeybord();
              break;
            case "getSameOriginUrl": {
              return args[0].replace(/^file:\/\//, UniFileProxy);
            }
            case "onNativeEmbedLifecycleChange": {
              const src2 = args[0];
              const elId = src2?.split("#")[0];
              const nodeController = this.getCurrentNodeController(elId);
              nodeController?.update({
                src: src2,
                position: {
                  x: vp2px(nodeController.options.x),
                  y: vp2px(nodeController.options.y)
                },
                width: vp2px(nodeController.options.width),
                height: vp2px(nodeController.options.height)
              });
              break;
            }
            case "invokeNativeEmbed": {
              const [elId, method, subArgs] = args;
              const nodeController = this.getCurrentNodeController(elId);
              nodeController?.invoke(method, subArgs);
              break;
            }
            default:
              break;
          }
        }
      },
      name: JS_REGISTER_NAME,
      methodList: ["invokeSync"],
      controller
    };
    const safeAreaEdges = [SafeAreaEdge.TOP];
    if (this._manifestSafeArea?.bottom?.offset !== "auto") {
      safeAreaEdges.push(SafeAreaEdge.BOTTOM);
    }
    this.node = createWebNode(this.mp, id, {
      src,
      controller,
      javaScriptProxy,
      safeAreaEdges,
      darkmode: manifest["app-harmony"]?.darkmode ?? false,
      onFocus: () => {
        this._isFocused = true;
      },
      onBlur: () => {
        this._isFocused = false;
      },
      onPageBegin: () => {
        this._emitter.emit("loading");
      },
      onPageEnd: () => {
        this._emitter.emit("loaded");
      },
      onPageVisible() {
      },
      onInterceptRequest(event) {
        if (WEB_VIEW_PROTOCOL === "http://" /* HTTP */) {
          return;
        }
      },
      onNativeEmbedLifecycleChange: (event) => {
        const childrenMap = this._children;
        const embedId = event.embedId;
        const storeId2 = `${this.id}-${embedId}`;
        const pageState = this.pageState;
        const elId = event.info?.src?.split("#")[0];
        if (event.status == NativeEmbedStatus.CREATE) {
          const nodeController = new NativeEmbedNodeController(
            this,
            storeId2,
            event.info,
            event.surfaceId,
            embedId,
            elId
          );
          const children = nodeController.renderType === NodeRenderType2.RENDER_TYPE_TEXTURE ? pageState.embedChildren : pageState.stackChildren;
          children.push(nodeController);
          childrenMap[storeId2] = nodeController;
        } else if (event.status == NativeEmbedStatus.DESTROY) {
          const nodeController = childrenMap[storeId2];
          if (nodeController) {
            nodeController.destroy();
            childrenMap[storeId2];
            const children = nodeController.renderType === NodeRenderType2.RENDER_TYPE_TEXTURE ? pageState.embedChildren : pageState.stackChildren;
            const index3 = children.indexOf(nodeController);
            if (index3 > -1) {
              children.splice(index3, 1);
            }
          }
        } else if (event.status == NativeEmbedStatus.UPDATE) {
          const nodeController = childrenMap[storeId2];
          if (nodeController) {
            const { position, width, height } = event.info;
            nodeController.update({
              // WebView 非 static 定位时 position 可能不准确，后续反馈给鸿蒙官方，暂不在框架进行特殊处理
              position,
              width,
              height
            });
          }
        }
      },
      onNativeEmbedGestureEvent: (event) => {
        const embedId = event.embedId;
        const storeId2 = `${this.id}-${embedId}`;
        const nodeController = this._children[storeId2];
        if (nodeController) {
          const res = nodeController.postTouchEvent(event.touchEvent);
          event.result?.setGestureEventResult(res);
        }
      },
      onAreaChange: (_, newValue) => {
        this._emitter.emit("resize", {
          width: newValue.width,
          height: newValue.height
        });
      },
      onControllerAttached: () => {
        this.controller = controller;
        const delegate = createDownloadDelegate();
        controller.setDownloadDelegate(delegate);
        const userAgent = mp.userAgent;
        if (!userAgent.fullUserAgent) {
          if (userAgent.concatenate) {
            const currentUserAgent = controller.getUserAgent();
            userAgent.fullUserAgent = currentUserAgent + " " + userAgent.value;
          } else {
            userAgent.fullUserAgent = userAgent.value;
          }
        }
        controller.setCustomUserAgent(userAgent.fullUserAgent);
        const schemeHandler = new harmonyWebView.WebSchemeHandler();
        schemeHandler.onRequestStart((request, handler) => {
          let url = request.getRequestUrl();
          url = fromWebURL(this.mp, url);
          if (url.startsWith(UniFileProxy)) {
            const path = url.replace(UniFileProxy, "file://");
            return createSchemeResponseWithURL(path, handler);
          }
          if (isLocalPath(url)) {
            if (url.endsWith("/www/uni-app-view.umd.js")) {
              return createSchemeResponseWithURL(
                RAW_PATH + "/uni-app/uni-app-view.umd.js",
                handler
              );
            }
            if (url.endsWith("/www/app.css")) {
              return createSchemeResponse("text/css", async (response) => {
                handler.didReceiveResponse(response);
                const styleCss = await getRawFileContent(
                  "uni-app/style.css",
                  true
                );
                const appCss = await getContent(url, true);
                handler.didReceiveResponseBody(
                  buffer2.from(styleCss + "\n" + appCss).buffer
                );
                handler.didFinish();
              });
            }
            if (url.endsWith("__uniappchooselocation.css") || url.endsWith("__uniappopenlocation.css")) {
              return createSchemeResponse("text/css", async (response) => {
                handler.didReceiveResponse(response);
                handler.didReceiveResponseBody(buffer2.from("/* */").buffer);
                handler.didFinish();
              });
            }
            if (WEB_VIEW_PROTOCOL === "http://" /* HTTP */) {
              return createSchemeResponseWithURL(url, handler);
            }
          }
          return false;
        });
        if (WEB_VIEW_PROTOCOL === "http://" /* HTTP */) {
          controller.setWebSchemeHandler("http", schemeHandler);
        } else {
          controller.setWebSchemeHandler("file", schemeHandler);
        }
        controller.setWebSchemeHandler("tel", telSchemeHandler);
        this._emitter.emit("controllerAttached");
      }
    });
    this._safeAreaInsetsChangeHandler = (res) => {
      if (!this._isFocused) {
        return;
      }
      let keyboardHeight = res.keyboardHeight;
      const topView = webview.getTopWebview();
      if (typeof keyboardHeight === "number" && topView === this) {
        const options = this._softinputTemporary;
        keyboardHeight = px2vp(keyboardHeight);
        const mode = options?.mode || "adjustResize";
        if (mode === "adjustPan") {
          const position = options?.position;
          const top = position?.top || 0;
          const height = position?.height || 0;
          const info = this.getSafeAreaInsets();
          const marginTop = Math.min(
            info.screenHeight - keyboardHeight - (top + height + info.screenTop),
            0
          );
          this.pageState.style.paddingBottom = 0;
          this.pageState.style.marginTop = marginTop;
        } else if (mode === "adjustResize") {
          console.warn("adjustResize is deprecated.");
          this.pageState.style.marginTop = 0;
          this.pageState.style.paddingBottom = keyboardHeight;
        }
      }
    };
    onSafeAreaInsetsChange(this._safeAreaInsetsChangeHandler, true);
    this._keyboardHeightChangeHandler = (size) => {
      this.evalJS(
        `(function(e){e.height=${px2vp(size)};document.dispatchEvent(e)})(new Event('keyboardchange'))`
      );
    };
    appLifeCycle.on("keyboardHeightChange", this._keyboardHeightChangeHandler);
  }
  /**
   * 页面样式配置
   */
  get style() {
    return this.pageState.style;
  }
  getCurrentNodeController(elId) {
    return Object.values(this._children).find(
      (item) => item.elId === elId && item.id.split("-")[0] === this.id
    );
  }
  addEventListener(event, listener, capture) {
    if (EVENT_NAMES.includes(event)) {
      this._emitter.on(event, listener);
    } else {
      throw new Error(`event ${event} is not supported.`);
    }
  }
  append(webview2) {
    throw new Error("Method not implemented.");
  }
  appendJsFile(file) {
    throw new Error("Method not implemented.");
  }
  animate(options, callback) {
    throw new Error("Method not implemented.");
  }
  back() {
    throw new Error("Method not implemented.");
  }
  beginPullToRefresh() {
    if (!this.pageState.style?.pullToRefresh?.support) {
      return;
    }
    this.pageState.refreshState.refreshing = true;
  }
  canBack(queryCallback) {
    throw new Error("Method not implemented.");
  }
  canForward(queryCallback) {
    throw new Error("Method not implemented.");
  }
  checkRenderedContent(options, successCallback, errorCallback) {
    throw new Error("Method not implemented.");
  }
  children() {
    return this.pageState.stackChildren.filter((item) => item.type === "native/webview").map((item) => {
      return new ChildWebview(item);
    });
  }
  clear() {
    throw new Error("Method not implemented.");
  }
  close(aniClose, duration, extras) {
    this.isCloseCalled = true;
    this.pageState.stackChildren.forEach(
      (item) => item.detach()
    );
    duration = aniClose === "none" ? 0 : duration || 300;
    const showStack = getShowStack();
    const showIndex = showStack.indexOf(this);
    const tabs = getCurrentTabs();
    const isTabPage = tabs.includes(this.id);
    if (isTabPage) {
      const index4 = tabs.indexOf(this.id);
      if (index4 > -1) {
        tabs.splice(index4, 1);
      }
    }
    if (this.isRendering) {
      const router = this.mp.router;
      if (!isTabPage || tabs.length === 0) {
        if (showIndex === showStack.length - 1) {
          router.pop(duration !== 0);
        } else {
          router.removeByName(this.page.name);
        }
      }
    } else {
      duration = 0;
    }
    this._emitter.emit("close");
    const { store: store4, stack } = cache.get(this.mp);
    delete store4[this.id];
    const index3 = stack.indexOf(this);
    stack.splice(index3, 1);
    this.isRendering = false;
    this._emitter.off("pullToRefresh");
    offSafeAreaInsetsChange(this._safeAreaInsetsChangeHandler);
    appLifeCycle.off("keyboardHeightChange", this._keyboardHeightChangeHandler);
    const clear = () => {
      EVENT_NAMES.forEach((event) => {
        this._emitter.off(event);
      });
      const pages = this.page.pages;
      const index4 = pages.findIndex((page) => page.id === this.id);
      pages.splice(index4, 1);
      removeWebNode(this.mp, this.id);
    };
    if (duration) {
      setTimeout(clear, duration);
    } else {
      clear();
    }
  }
  drag(options, otherView, callback) {
    throw new Error("Method not implemented.");
  }
  draw(bitmap, successCallback, errorCallback, options) {
    throw new Error("Method not implemented.");
  }
  endPullToRefresh() {
    if (!this.pageState.style?.pullToRefresh?.support) {
      return;
    }
    this.pageState.refreshState.refreshing = false;
  }
  evalJS(js) {
    this.controller?.runJavaScript(js);
  }
  evalJSAsync(js) {
    const controller = this.controller;
    return controller ? controller.runJavaScript(js) : Promise.reject(new Error("controller is not ready"));
  }
  forward() {
    throw new Error("Method not implemented.");
  }
  getFavoriteOptions() {
    throw new Error("Method not implemented.");
  }
  getSafeAreaInsets() {
    const frameNode = this.node.getFrameNode();
    const size = frameNode.getMeasuredSize();
    const position = frameNode.getPositionToWindow();
    const currentWindow = this.mp.window;
    const props = currentWindow.getWindowProperties();
    const windowRect = props.windowRect;
    const safeAreaInsets = getSafeAreaInsets(true);
    if (size.width === 0 && size.height === 0) {
      size.width = windowRect.width;
      let height = windowRect.height;
      if (this.pageState.style.titleNView) {
        height = height - safeAreaInsets.top - vp2px(56);
      }
      if (isTabBarPage(this.id)) {
        height = height - safeAreaInsets.bottom - vp2px(50);
      }
      size.height = height;
    }
    const y = vp2px(position.y);
    const top = Math.max(Math.floor(px2vp(safeAreaInsets.top - y)), 0);
    const bottom = Math.max(
      Math.floor(
        px2vp(safeAreaInsets.bottom - (windowRect.height - (y + size.height)))
      ),
      0
    );
    return {
      top,
      bottom,
      left: 0,
      right: 0,
      // 微信规范下下面的属性定义有点绕
      statusBarHeight: Math.floor(px2vp(safeAreaInsets.top)),
      screenTop: Math.floor(position.y),
      // webview顶部到window顶部的高度
      windowHeight: Math.floor(px2vp(size.height)),
      // webview高度
      windowWidth: Math.floor(px2vp(size.width)),
      // webview宽度
      screenWidth: Math.floor(px2vp(windowRect.width)),
      // window宽度
      screenHeight: Math.floor(px2vp(windowRect.height))
      // window高度
    };
  }
  getShareOptions() {
    throw new Error("Method not implemented.");
  }
  getStyle() {
    return JSON.parse(JSON.stringify(this.style));
  }
  getSubNViews() {
    throw new Error("Method not implemented.");
  }
  getTitle() {
    throw new Error("Method not implemented.");
  }
  getTitleNView() {
    throw new Error("Method not implemented.");
  }
  getTitleNViewSearchInputText() {
    throw new Error("Method not implemented.");
  }
  getURL() {
    const controller = this.controller;
    return controller ? controller.getUrl() : "";
  }
  hide(aniHide, duration, extras) {
    throw new Error("Method not implemented.");
  }
  hideTitleNViewButtonRedDot(options) {
    throw new Error("Method not implemented.");
  }
  interceptTouchEvent(intercept) {
    throw new Error("Method not implemented.");
  }
  isHardwareAccelerated() {
    throw new Error("Method not implemented.");
  }
  isPause() {
    throw new Error("Method not implemented.");
  }
  isVisible() {
    throw new Error("Method not implemented.");
  }
  listenResourceLoading(options, callback) {
    throw new Error("Method not implemented.");
  }
  loadData(data, options) {
    throw new Error("Method not implemented.");
  }
  loadURL(url, additionalHttpHeaders) {
    throw new Error("Method not implemented.");
  }
  nativeInstanceObject() {
    throw new Error("Method not implemented.");
  }
  opened() {
    throw new Error("Method not implemented.");
  }
  opener() {
    throw new Error("Method not implemented.");
  }
  overrideResourceRequest(options) {
    throw new Error("Method not implemented.");
  }
  overrideUrlLoading(options, callback) {
    throw new Error("Method not implemented.");
  }
  parent() {
    throw new Error("Method not implemented.");
  }
  pause() {
    throw new Error("Method not implemented.");
  }
  reload(force) {
    throw new Error("Method not implemented.");
  }
  resetBounce() {
    throw new Error("Method not implemented.");
  }
  restore() {
    throw new Error("Method not implemented.");
  }
  remove(webview2) {
    throw new Error("Method not implemented.");
  }
  removeEventListener(event, listener) {
    if (EVENT_NAMES.includes(event)) {
      this._emitter.off(event, listener);
    } else {
      throw new Error(`event ${event} is not supported.`);
    }
  }
  removeFromParent() {
    throw new Error("Method not implemented.");
  }
  removeTitleNViewButtonBadge(options) {
    throw new Error("Method not implemented.");
  }
  resume() {
    throw new Error("Method not implemented.");
  }
  setBounce(style) {
    throw new Error("Method not implemented.");
  }
  setBlockNetworkImage(block) {
    throw new Error("Method not implemented.");
  }
  setContentVisible(visible) {
    throw new Error("Method not implemented.");
  }
  setCssFile(file) {
    throw new Error("Method not implemented.");
  }
  setCssText(text) {
    throw new Error("Method not implemented.");
  }
  setFavoriteOptions(options) {
    throw new Error("Method not implemented.");
  }
  setFixBottom(height) {
    throw new Error("Method not implemented.");
  }
  setJsFile(file) {
    throw new Error("Method not implemented.");
  }
  setPullToRefresh(style, refreshCB) {
    this.pageState.style.pullToRefresh = style;
  }
  setRenderedEventOptions(options) {
    throw new Error("Method not implemented.");
  }
  setSoftinputTemporary(options) {
    this._softinputTemporary = options;
    this._safeAreaInsetsChangeHandler?.(getSafeAreaInsets(true));
  }
  setStyle(styles) {
    const newStyleKeys = Object.keys(styles);
    newStyleKeys.forEach((key2) => {
      const curStyle = styles[key2];
      if (isPlainObject(curStyle) && isPlainObject(this.style[key2])) {
        this.style[key2] = Object.assign({}, this.style[key2], curStyle);
      } else {
        this.style[key2] = curStyle;
      }
    });
  }
  setShareOptions(options) {
    throw new Error("Method not implemented.");
  }
  setTitleNViewButtonBadge(options) {
    throw new Error("Method not implemented.");
  }
  setTitleNViewButtonStyle(index3, styles) {
    throw new Error("Method not implemented.");
  }
  setTitleNViewSearchInputFocus(focus) {
    throw new Error("Method not implemented.");
  }
  setTitleNViewSearchInputText(text) {
    throw new Error("Method not implemented.");
  }
  setVisible(visible) {
    throw new Error("Method not implemented.");
  }
  show(aniShow, duration, showedCB, extras) {
    duration = aniShow === "none" ? 0 : duration || 300;
    const pages = this.page.pages;
    const pageIndex = pages.findIndex((page) => page.id === this.id);
    const pageState = pages[pageIndex] || this.pageState;
    if (pageIndex > -1) {
      pages.splice(pageIndex, 1);
    }
    pages.push(pageState);
    const { stack } = cache.get(this.mp);
    const stackIndex = stack.indexOf(this);
    if (stackIndex > -1) {
      stack.splice(stackIndex, 1);
      stack.push(this);
    }
    const router = this.mp.router;
    if (!this.isRendering) {
      router.pushPathByName(this.id, void 0, duration !== 0);
    } else {
      duration = 0;
      router.moveToTop(this.page.name, false);
    }
    this.isRendering = true;
    if (showedCB) {
      setTimeout(showedCB, duration);
    }
  }
  showBehind(webview2) {
    throw new Error("Method not implemented.");
  }
  showTitleNViewButtonRedDot(options) {
    throw new Error("Method not implemented.");
  }
  stop() {
    throw new Error("Method not implemented.");
  }
  updateSubNViews(styles) {
    throw new Error("Method not implemented.");
  }
};
function createLaunchWebView(manifest) {
  const id = manifest.plus.launchwebview.id;
  let path = manifest.launch_path;
  const wwwDir = PRIVATE_WWW + "/";
  if (!path.startsWith(wwwDir)) {
    path = wwwDir + path;
  }
  const launchWebview = new WebView(path, id);
  launchWebview.show("none", 0);
  const data = cache.get(launchWebview.mp);
  data.launchWebview = launchWebview;
  return launchWebview;
}
var webview = {
  create(url, id, styles, extras) {
    const webView = new WebView(url, id, styles, extras);
    return webView;
  },
  // @ts-expect-error 返回值定义有误
  getWebviewById(id) {
    const mp = getCurrentMP();
    const data = cache.get(mp);
    if (data) {
      return data.store[id];
    }
  },
  // @ts-expect-error 返回值定义有误
  getLaunchWebview() {
    const mp = getCurrentMP();
    const data = cache.get(mp);
    if (data) {
      return data.launchWebview;
    }
  },
  getTopWebview() {
    const stack = getShowStack();
    const top = stack[stack.length - 1];
    return top;
  },
  invokeWebview(id, elId, method, ...options) {
    const mp = getCurrentMP();
    const data = cache.get(mp);
    if (data) {
      let webView = data.store[id];
      if (!webView) {
        throw new Error(`webview ${id} is not found.`);
      }
      if (typeof elId === "string") {
        webView = webView.children().find((item) => item.elId === elId);
      }
      const value = webView[method];
      if (typeof value === "function") {
        return webView[method](...options);
      } else {
        return value;
      }
    }
  },
  clear() {
    const mp = getCurrentMP();
    const data = cache.get(mp);
    if (data) {
      const { stack } = data;
      for (let i = stack.length - 1; i >= 0; i--) {
        const view = stack[i];
        view.isRendering = false;
        view.close();
      }
    }
  }
};
var ChildWebview = class {
  constructor(controller) {
    this.nodeController = () => controller;
    this.id = controller.parent.id;
    this.elId = controller.elId;
  }
  canBack(callback) {
    try {
      const canBack = this.nodeController().controller?.accessBackward();
      callback({ canBack });
    } catch (error) {
      callback({ canBack: false });
    }
  }
  back() {
    this.nodeController().controller?.backward();
  }
};

// packages/uni-mp-sdk/src/harmony.ts
var import_tiny_emitter5 = __toESM(require_tiny_emitter());
import picker from "@ohos:file.picker";
import fs2 from "@ohos:file.fs";
import call from "@ohos:telephony.call";
import bundleManager from "@ohos:bundle.bundleManager";
var TEMPLATE_PAGE_NAME = "UniPage";
var sdkServiceMethod = {};
function registerServiceMethod(name, fn) {
  sdkServiceMethod[name] = fn;
}
function getServiceMethod() {
  return sdkServiceMethod;
}
var OSRuntime;
function setOSRuntime(options) {
  OSRuntime = options;
}
function getOSRuntime() {
  return OSRuntime;
}
var abilityContext = null;
function getAbilityContext() {
  return abilityContext;
}
var windowStage = null;
function getWindowStage() {
  return windowStage;
}
var onBackPressCallbacks = /* @__PURE__ */ new WeakMap();
function initPage(page, id) {
  const view = webview.getWebviewById(id);
  if (view && view.page) {
    page.pages.push(...view.page.pages);
    page.tabBar = view.page.tabBar;
    page.safeArea = view.page.safeArea;
  }
  view.page = page;
}
var pageLifeCycle = new import_tiny_emitter5.TinyEmitter();
var NativePagesManager = class {
  constructor() {
    this.pages = [];
    this.ready = false;
    this._onReadyCallbacks = [];
  }
  push(page) {
    if (!this.ready) {
      this._onReadyCallbacks.forEach((cb) => cb(page));
      this.ready = true;
    }
    this.pages.push(page);
  }
  remove(page) {
    const index3 = this.pages.indexOf(page);
    if (index3 !== -1) {
      this.pages.splice(index3, 1);
    }
  }
  onNativePageReady(callback) {
    if (this.ready) {
      callback(this.pages[this.pages.length - 1]);
      return;
    }
    this._onReadyCallbacks.push(callback);
  }
};
var nativePagesManager = new NativePagesManager();
function callPageLifeCycle(name, page) {
  let res = false;
  switch (name) {
    case "aboutToAppear": {
      nativePagesManager.push(page);
      const id = page.name;
      initPage(page, id);
      break;
    }
    case "aboutToDisappear":
      nativePagesManager.remove(page);
      break;
    case "onBackPress": {
      const mp = getCurrentMP();
      const callbacks = onBackPressCallbacks.get(mp);
      if (callbacks && callbacks.length) {
        callbacks.forEach((cb) => cb({}));
        res = true;
      }
      break;
    }
    default:
      break;
  }
  pageLifeCycle.emit(name, page);
  return res;
}
var appLifeCycle = new import_tiny_emitter5.TinyEmitter();
var globalConfig = {};
function init(ability, stage, config = {}) {
  Object.assign(globalConfig, config);
  if (globalConfig.debug) {
    harmonyWebView2.WebviewController.setWebDebuggingAccess(true);
  }
  abilityContext = ability.context;
  windowStage = stage;
  stage.on("windowStageEvent", (type) => {
    switch (type) {
      case window3.WindowStageEventType.SHOWN:
        appLifeCycle.emit("onForeground");
        break;
      case window3.WindowStageEventType.HIDDEN:
        appLifeCycle.emit("onBackground");
        break;
      default:
        break;
    }
  });
  appAbilityEmitter.emit("windowStageCreate", windowStage);
}
var uniqueDownloadId = 0;
var downloadTaskMap = /* @__PURE__ */ new Map();
function createDownloadDelegate() {
  const delegate = new harmonyWebView2.WebDownloadDelegate();
  delegate.onBeforeDownload(
    (webDownloadItem) => {
      const documentSaveOptions = new picker.DocumentSaveOptions();
      const suggestedFileName = webDownloadItem.getSuggestedFileName();
      documentSaveOptions.newFileNames = [suggestedFileName];
      const documentPicker = new picker.DocumentViewPicker(getAbilityContext());
      documentPicker.save(documentSaveOptions).then((documentSaveResult) => {
        const downloadItemSaveUri = documentSaveResult[0];
        const downloadTmpPath = getEnv().TEMP_PATH + "/download/" + suggestedFileName + "." + uniqueDownloadId++;
        const downloadGuid = webDownloadItem.getGuid();
        downloadTaskMap.set(downloadGuid, {
          downloadItemSaveUri,
          downloadTmpPath
        });
        webDownloadItem.start(downloadTmpPath);
      }).catch((err) => {
        webDownloadItem.cancel();
      });
    }
  );
  delegate.onDownloadFailed((webDownloadItem) => {
    const downloadGuid = webDownloadItem.getGuid();
    downloadTaskMap.delete(downloadGuid);
  });
  delegate.onDownloadFinish(async (webDownloadItem) => {
    const downloadGuid = webDownloadItem.getGuid();
    const downloadTask = downloadTaskMap.get(downloadGuid);
    downloadTaskMap.delete(downloadGuid);
    if (!downloadTask) {
      return;
    }
    const downloadItemSaveUri = downloadTask.downloadItemSaveUri;
    const downloadTmpPath = downloadTask.downloadTmpPath;
    const fromFile = await fs2.open(downloadTmpPath, fs2.OpenMode.READ_ONLY);
    const toFile = await fs2.open(
      downloadItemSaveUri,
      fs2.OpenMode.CREATE | fs2.OpenMode.WRITE_ONLY
    );
    await fs2.copyFile(fromFile.fd, toFile.fd);
    await fs2.close(fromFile);
    await fs2.close(toFile);
  });
  return delegate;
}
var telSchemeHandler = new harmonyWebView2.WebSchemeHandler();
telSchemeHandler.onRequestStart((request) => {
  const url = request.getRequestUrl();
  const phoneNumber = url.replace("tel:", "").trim();
  call.makeCall(phoneNumber);
  return true;
});
function getEntryMetadata() {
  const flags = bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_HAP_MODULE | bundleManager.BundleFlag.GET_BUNDLE_INFO_WITH_METADATA;
  const bundleInfo = bundleManager.getBundleInfoForSelfSync(flags);
  return bundleInfo.hapModulesInfo.find(
    (module) => module.type === bundleManager.ModuleType.ENTRY
  ).metadata;
}

// packages/uni-mp-sdk/src/wgt.ts
import zlib from "@ohos:zlib";
import fs3 from "@ohos:file.fs";
function getRealWgtPath(wgtPath) {
  return wgtPath.replace(/^file:\/\//, "");
}
async function _releaseWgtToRunPath(appId, wgtPath) {
  const realWgtPath = getRealWgtPath(wgtPath);
  const wgtReleasePath = getWWWPath(appId);
  if (fs3.accessSync(wgtReleasePath)) {
    await fs3.rmdir(wgtReleasePath);
  }
  await fs3.mkdir(wgtReleasePath, true);
  await zlib.decompressFile(realWgtPath, wgtReleasePath);
}
function releaseWgtToRunPath(appId, wgtPath, callback) {
  _releaseWgtToRunPath(appId, wgtPath).then(
    () => {
      callback(1);
    },
    (e) => {
      callback(-1, e);
    }
  );
}
function isExistsApp(appId) {
  return isWgtRelease(appId);
}
function getUniMPRunPath(appId) {
  return getPrivateDir(appId);
}
function hmrGetUniAppWWWPath() {
  return getPrivateDir("HBuilder") + "/www";
}
function releaseCurrentWgtToRunPath(wgtPath, callback) {
  const currentAppId = getCurrentMP().id;
  if (currentAppId) {
    const realWgtPath = getRealWgtPath(getRealPath(wgtPath));
    const { TEMP_PATH } = getEnv();
    const tempWgtPath = `${TEMP_PATH}/__temp_wgt`;
    (async () => {
      if (fs3.accessSync(tempWgtPath)) {
        await fs3.rmdirSync(tempWgtPath);
      }
      await fs3.mkdirSync(tempWgtPath, true);
      await zlib.decompressFile(realWgtPath, tempWgtPath);
    })().then(async () => {
      return fs3.readText(`${tempWgtPath}/manifest.json`).then(async (fileString) => {
        const { id: appId } = JSON.parse(fileString);
        if (currentAppId === "HBuilder" || currentAppId === appId) {
          const wgtReleasePath = getWWWPath(currentAppId);
          if (!fs3.accessSync(wgtReleasePath)) {
            await fs3.mkdirSync(wgtReleasePath, true);
          }
          await fs3.rename(tempWgtPath, wgtReleasePath);
          callback(1);
        } else {
          throw new Error("WGT \u5B89\u88C5\u5305\u4E2D manifest.json \u6587\u4EF6\u7684 appid \u4E0D\u5339\u914D");
        }
      }).catch((e) => {
        if (e.code === 13900002) {
          throw new Error("wgt manifest.json is not found");
        } else {
          throw new Error(e.message);
        }
      });
    }).catch((e) => {
      callback(-1, e);
    });
  } else {
    callback(-1, {
      message: "Current appId is not found"
    });
  }
}

// packages/uni-mp-sdk/src/plus/runtime.ts
var runtime = {
  quit() {
    const mp = getCurrentMP();
    mp.close();
  },
  // only install wgt
  install(wgtPath, options, installSuccessCB, installErrorCB) {
    releaseCurrentWgtToRunPath(wgtPath, (code, e) => {
      if (code === 1) {
        installSuccessCB?.({});
      } else {
        installErrorCB?.({ errMsg: e.message });
      }
    });
  },
  getProperty(appId, callback) {
    const { manifest } = getCurrentMP();
    if (appId === manifest.id) {
      callback({
        appid: manifest.id,
        name: manifest.name,
        description: manifest.description ?? "",
        version: manifest.version.name,
        versionCode: manifest.version.code
      });
    } else {
      callback({
        appid: "",
        name: "",
        description: "",
        version: "",
        versionCode: ""
      });
    }
  },
  // 通过AppLinking启动UIAbility，如果不存在与AppLinking相匹配的UIAbility，AppLinking会退化为DeepLink
  openURL(url, errorCB, identity) {
    getAbilityContext()?.openLink(url).catch((err) => {
      errorCB?.(err);
    });
  },
  /**
   * @deprecated
   */
  get arguments() {
    const mp = getCurrentMP();
    const args = mp.launchOptions.arguments;
    return typeof args === "string" ? args : JSON.stringify(args);
  },
  get channel() {
    const mp = getCurrentMP();
    return mp.launchOptions.channel;
  },
  get launcher() {
    const mp = getCurrentMP();
    return mp.launchOptions.launcher;
  }
};

// packages/uni-mp-sdk/src/plus/globalEvent.ts
var globalEvent = {
  addEventListener(name, callback) {
    const mp = getCurrentMP();
    switch (name) {
      case "pause":
        mp.on("hide", callback);
        break;
      case "resume":
        mp.on("show", callback);
        break;
      case "plusMessage":
        mp.on("plusMessage", callback);
        break;
      case "KeyboardHeightChange": {
        const fn = (size) => {
          const height = px2vp(size);
          callback({
            height
          });
        };
        appLifeCycle.on("keyboardHeightChange", fn);
        mp.on("beforeClose", () => {
          appLifeCycle.off("keyboardHeightChange", fn);
        });
        break;
      }
      default:
        break;
    }
  }
};

// packages/uni-mp-sdk/src/plus/nativeUI.ts
import promptAction from "@ohos:promptAction";
var nativeUI = {
  toast(message, styles) {
    const duration = styles?.duration === "long" ? 3500 : 2e3;
    promptAction.showToast({ message, duration });
  }
};

// packages/uni-mp-sdk/src/plus/geolocation.ts
import geoLocationManager from "@ohos:geoLocationManager";
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import mapCommon from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/mapCommon";
import map from "@bundle:com.huawei.hms.mapservice.kit/mapLibrary/ets/map";
import bundleManager2 from "@ohos:bundle.bundleManager";
import promptAction2 from "@ohos:promptAction";
var ErrorCodeMap = {
  3301e3: [1505602, "location fail: request error"],
  3301100: [1505003, "maybe not turn on the system location permission."],
  PERMISSION_ERROR: [1505004, "maybe not obtain GPS Permission."],
  COORDS_TYPE_ERROR: [1505601, "coords type only support wgs84 and gcj02."],
  default: [1505602, "location fail: request error"]
};
function createError(harmonyCode) {
  const [code, message] = ErrorCodeMap[harmonyCode] || ErrorCodeMap.default;
  return {
    code,
    message
  };
}
async function requestPermission(permissions) {
  const context = getContext();
  const atManager = abilityAccessCtrl.createAtManager();
  const permissionRequestResult = await atManager.requestPermissionsFromUser(
    context,
    permissions
  );
  const isGranted = permissionRequestResult.authResults.every(
    (item) => item === 0
  );
  return isGranted;
}
function getCurrentPosition(successCallback, failCallback, options) {
  const {
    enableHighAccuracy = false,
    timeout = void 0,
    coordsType = "wgs84"
  } = options || {};
  if (coordsType !== "wgs84" && coordsType !== "gcj02") {
    setTimeout(() => {
      failCallback?.(createError("COORDS_TYPE_ERROR"));
    }, 1);
    return;
  }
  const permissions = ["ohos.permission.APPROXIMATELY_LOCATION"];
  if (enableHighAccuracy) {
    permissions.push("ohos.permission.LOCATION");
  }
  requestPermission(permissions).then((isGranted) => {
    if (!isGranted) {
      failCallback?.(createError("PERMISSION_ERROR"));
      return;
    }
    const currentLocationRequest = {
      priority: enableHighAccuracy ? geoLocationManager.LocationRequestPriority.ACCURACY : geoLocationManager.LocationRequestPriority.FIRST_FIX,
      scenario: geoLocationManager.LocationRequestScenario.UNSET
    };
    if (timeout) {
      currentLocationRequest.timeoutMs = timeout;
    }
    try {
      geoLocationManager.getCurrentLocation(
        currentLocationRequest,
        (err, location) => {
          if (err) {
            failCallback?.(createError(err.code));
            return;
          }
          if (coordsType === "gcj02") {
            map.convertCoordinate(
              mapCommon.CoordinateType.WGS84,
              mapCommon.CoordinateType.GCJ02,
              {
                latitude: location.latitude,
                longitude: location.longitude
              }
            ).then(
              (gcj02Posion) => {
                successCallback({
                  coords: {
                    latitude: gcj02Posion.latitude,
                    longitude: gcj02Posion.longitude,
                    altitude: location.altitude,
                    accuracy: location.accuracy,
                    speed: location.speed
                  },
                  timestamp: Date.now()
                });
              },
              (err2) => {
                failCallback?.(createError(err2.code));
              }
            );
            return;
          }
          successCallback({
            coords: {
              latitude: location.latitude,
              longitude: location.longitude,
              altitude: location.altitude,
              accuracy: location.accuracy,
              speed: location.speed
            },
            timestamp: Date.now()
          });
        }
      );
    } catch (err) {
      failCallback?.(createError("default"));
    }
  });
}
var watchId = 0;
var PositionWatchStores = {};
function getCurrentPositionWatchStore() {
  const currentMP2 = getCurrentMP();
  if (!currentMP2) {
    return {};
  }
  const id = currentMP2.id;
  if (!PositionWatchStores[id]) {
    PositionWatchStores[id] = {};
  }
  return PositionWatchStores[id];
}
var MPBeforeCloseRecord = /* @__PURE__ */ new WeakMap();
function onMPBeforeClose(currentMP2) {
  if (!currentMP2) {
    return;
  }
  const id = currentMP2.id;
  const positionWatchStore = PositionWatchStores[id];
  for (const watchId2 in positionWatchStore) {
    clearWatch(Number(watchId2));
  }
  delete PositionWatchStores[id];
}
async function checkBackgroundPermission() {
  const bundleInfo = bundleManager2.getBundleInfoForSelfSync(
    bundleManager2.BundleFlag.GET_BUNDLE_INFO_WITH_APPLICATION
  );
  const tokenId = bundleInfo.appInfo.accessTokenId;
  const atManager = abilityAccessCtrl.createAtManager();
  const grantStatus = await atManager.checkAccessToken(
    tokenId,
    "ohos.permission.LOCATION_IN_BACKGROUND"
  );
  const isGranted = grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
  if (!isGranted) {
    const context = getAbilityContext();
    if (!context) {
      return false;
    }
    promptAction2.showDialog({
      title: "\u63D0\u793A",
      message: "\u9700\u8981\u5141\u8BB8\u5E94\u7528\u5728\u540E\u53F0\u83B7\u53D6\u4F4D\u7F6E\u4FE1\u606F\u65B9\u53EF\u7EE7\u7EED\uFF0C\u70B9\u51FB\u786E\u8BA4\u524D\u5F80\u8BBE\u7F6E\u3002",
      buttons: [
        {
          text: "\u53D6\u6D88",
          color: "#000000"
        },
        {
          text: "\u786E\u8BA4",
          color: "#000000"
        }
      ]
    }).then((data) => {
      if (data.index === 1) {
        const want = {
          bundleName: "com.huawei.hmos.settings",
          abilityName: "com.huawei.hmos.settings.MainAbility",
          uri: "application_info_entry",
          parameters: {
            pushParams: bundleManager2.getBundleInfoForSelfSync(
              bundleManager2.BundleFlag.GET_BUNDLE_INFO_DEFAULT
            ).name
          }
        };
        context.startAbility(want);
      }
    });
  }
  return isGranted;
}
function watchPosition(successCB, errorCB, options) {
  const currentWatchId = watchId + 1;
  const {
    enableHighAccuracy = false,
    coordsType = "wgs84",
    background = false
  } = options || {};
  if (coordsType !== "wgs84" && coordsType !== "gcj02") {
    setTimeout(() => {
      errorCB?.(createError("COORDS_TYPE_ERROR"));
    }, 1);
    return -1;
  }
  function locationChangeHandler(location) {
    if (coordsType === "gcj02") {
      map.convertCoordinate(
        mapCommon.CoordinateType.WGS84,
        mapCommon.CoordinateType.GCJ02,
        {
          latitude: location.latitude,
          longitude: location.longitude
        }
      ).then(
        (gcj02Posion) => {
          successCB({
            coords: {
              latitude: gcj02Posion.latitude,
              longitude: gcj02Posion.longitude,
              altitude: location.altitude,
              accuracy: location.accuracy,
              speed: location.speed
            },
            timestamp: Date.now()
          });
        },
        (err) => {
          errorCB?.(createError(err.code));
        }
      );
      return;
    }
    successCB({
      coords: {
        latitude: location.latitude,
        longitude: location.longitude,
        altitude: location.altitude,
        accuracy: location.accuracy,
        speed: location.speed
      },
      timestamp: Date.now()
    });
  }
  const permission = ["ohos.permission.APPROXIMATELY_LOCATION"];
  if (enableHighAccuracy) {
    permission.push("ohos.permission.LOCATION");
  }
  const currentMP2 = getCurrentMP();
  requestPermission(permission).then((isGranted) => {
    if (!isGranted) {
      return Promise.resolve(false);
    }
    if (!background) {
      return Promise.resolve(true);
    }
    return checkBackgroundPermission();
  }).then((isGranted) => {
    if (!isGranted) {
      errorCB?.(createError("PERMISSION_ERROR"));
      return Promise.resolve(false);
    }
    getCurrentPositionWatchStore()[currentWatchId] = locationChangeHandler;
    try {
      if (!MPBeforeCloseRecord.has(currentMP2)) {
        const mpBeforeCloseHandler = () => {
          onMPBeforeClose(currentMP2);
        };
        MPBeforeCloseRecord.set(currentMP2, mpBeforeCloseHandler);
        currentMP2.on("beforeClose", mpBeforeCloseHandler);
      }
      geoLocationManager.on(
        "locationChange",
        {
          interval: 1,
          locationScenario: geoLocationManager.PowerConsumptionScenario.HIGH_POWER_CONSUMPTION
        },
        locationChangeHandler
      );
    } catch (err) {
      errorCB?.(createError("default"));
      return;
    }
  });
  return currentWatchId;
}
function clearWatch(watchId2) {
  const positionWatchStore = getCurrentPositionWatchStore();
  const locationChangeHandler = positionWatchStore[watchId2];
  if (!locationChangeHandler) {
    return;
  }
  geoLocationManager.off("locationChange", locationChangeHandler);
  delete positionWatchStore[watchId2];
}
var geolocation = {
  getCurrentPosition,
  watchPosition,
  clearWatch
};

// packages/uni-mp-sdk/src/weex/index.ts
var weex_exports = {};
__export(weex_exports, {
  plus: () => plus,
  requireModule: () => requireModule,
  tabview: () => tabview
});

// packages/uni-mp-sdk/src/weex/tabview.ts
var SCHEME_RE = /^([a-z-]+:)?\/\//i;
var DATA_RE = /^data:.*,.*/;
function normalizeFilepath(filepath) {
  if (!(SCHEME_RE.test(filepath) || DATA_RE.test(filepath)) && filepath.indexOf("/") !== 0) {
    return "/" + filepath;
  }
  return filepath;
}
function formatTabBarItem(item) {
  const realItem = {};
  if (item.text) {
    realItem.text = item.text;
  }
  if (item.iconPath) {
    realItem.iconPath = normalizeFilepath(item.iconPath);
  }
  if (item.selectedIconPath) {
    realItem.selectedIconPath = normalizeFilepath(item.selectedIconPath);
  }
  if (item.pagePath) {
    realItem.pagePath = item.pagePath;
  }
  if (item.visible !== void 0) {
    realItem.visible = item.visible;
  }
  return realItem;
}
var tabview = {
  get style() {
    return getCurrentTabBarStyle();
  },
  onMaskClick() {
  },
  onClick(callback) {
    this.style.onClick = callback;
  },
  onMidButtonClick(callback) {
    this.style.onMidButtonClick = callback;
  },
  showTabBarRedDot({ index: index3 }) {
    const style = this.style;
    if (!style.list[index3]) {
      return;
    }
    style.list[index3].badgeType = "dot";
  },
  hideTabBarRedDot({ index: index3 }) {
    const style = this.style;
    if (!style.list[index3]) {
      return;
    }
    style.list[index3].badgeType = void 0;
  },
  setTabBarBadge({ index: index3, text }) {
    const style = this.style;
    if (!style.list[index3]) {
      return;
    }
    style.list[index3].badgeType = "number";
    style.list[index3].badgeText = text;
  },
  removeTabBarBadge({ index: index3 }) {
    const style = this.style;
    if (!style.list[index3]) {
      return;
    }
    style.list[index3].badgeType = void 0;
  },
  setTabBarItems(tabBarState) {
    if (!tabBarState.list) {
      return;
    }
    for (let i = 0; i < tabBarState.list.length; i++) {
      const item = tabBarState.list[i];
      this.setTabBarItem({ ...item, index: i });
    }
  },
  setTabBarItem(item) {
    const style = this.style;
    const tabBarItem = style.list?.[item.index];
    if (style.list) {
      style.list[item.index] = getOSRuntime().createTabBarItem(
        Object.assign(tabBarItem ?? {}, formatTabBarItem(item))
      );
    }
  },
  setTabBarStyle(style) {
    Object.assign(this.style, style);
  },
  hideTabBar() {
    this.style.visible = false;
  },
  showTabBar() {
    this.style.visible = true;
  },
  append({ id }) {
    const tabs = getCurrentTabs();
    const style = this.style;
    tabs.push(id);
    const firstTab = tabs[0];
    const currentView = webview.getWebviewById(id);
    currentView.page.tabBar = style;
    const firstView = webview.getWebviewById(firstTab);
    if (firstTab !== id) {
      currentView.page = firstView.page;
      currentView.isRendering = firstView.isRendering;
    } else {
      const manifest = currentView.mp.manifest;
      this.setTabBarItems(manifest.plus.tabBar);
    }
  },
  setMask() {
    throw new Error("setMask not implemented");
  },
  switchSelect({ index: index3 }) {
    this.style.selectedIndex = index3;
  }
};

// packages/uni-mp-sdk/src/weex/plus.ts
import I18n from "@ohos:i18n";
function getLanguage() {
  return I18n.System.getAppPreferredLanguage();
}
function setLanguage(lang) {
  I18n.System.setAppPreferredLanguage(lang);
}
function getRedirectInfo() {
  const mp = getCurrentMP();
  return mp.launchOptions.redirectInfo;
}
var plus = {
  getLanguage,
  setLanguage,
  getRedirectInfo
};

// packages/uni-mp-sdk/src/weex/index.ts
function requireModule(name) {
  let moduleObj = null;
  switch (name) {
    case "uni-tabview":
      moduleObj = tabview;
      break;
    case "plus":
      moduleObj = plus;
      break;
    default:
      break;
  }
  return moduleObj;
}

// packages/uni-mp-sdk/src/subscriber/getMapConfig.ts
function getMapConfig() {
  const metadata = getEntryMetadata().find(
    (data) => data.name === "TENCENT_MAP_KEY" /* TENCENT_MAP_KEY */
  );
  const qqMapKey = metadata?.value;
  return {
    qqMapKey
  };
}
function subscribeGetMapConfig() {
  registerServiceMethod(
    "getMapConfig",
    (_, resolve) => {
      resolve(getMapConfig());
    }
  );
}

// packages/uni-mp-sdk/src/subscriber/canvas.ts
import fs4 from "@ohos:file.fs";
import buffer3 from "@ohos:buffer";
var index2 = 0;
function subscribeBase64ToTempFilePath() {
  registerServiceMethod("base64ToTempFilePath", (args, resolve) => {
    const { dataURL, dirname } = args;
    const id = `${Date.now()}_${index2++}`;
    const array = dataURL.split(",");
    const scheme = array[0];
    const base64 = array[1];
    const format = (scheme.match(/data:image\/(\S+?);/) || [
      "",
      "png"
    ])[1].replace("jpeg", "jpg");
    const fileName = `${id}.${format}`;
    const tempFilePath = `${dirname}/${fileName}`;
    try {
      if (!fs4.accessSync(dirname)) {
        fs4.mkdirSync(dirname, true);
      }
    } catch (error) {
      resolve(error);
      return;
    }
    fs4.createStream(
      tempFilePath,
      "w",
      (err, stream) => {
        if (err) {
          stream.closeSync();
          return resolve(err);
        }
        stream.write(
          buffer3.from(base64, "base64").buffer,
          (err2) => {
            if (err2) {
              stream.closeSync();
              return resolve(err2);
            }
            stream.closeSync();
            return resolve({ tempFilePath });
          }
        );
      }
    );
  });
}

// packages/uni-mp-sdk/src/subscriber/index.ts
function initSubscribeHandlers() {
  subscribeBase64ToTempFilePath();
  subscribeGetMapConfig();
}

// ../uni-app-next/node_modules/.pnpm/@vue+shared@3.4.21/node_modules/@vue/shared/dist/shared.esm-bundler.js
function makeMap(str, expectsLowerCase) {
  const set = new Set(str.split(","));
  return expectsLowerCase ? (val) => set.has(val.toLowerCase()) : (val) => set.has(val);
}
var EMPTY_OBJ = true ? Object.freeze({}) : {};
var EMPTY_ARR = true ? Object.freeze([]) : [];
var extend = Object.assign;
var remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn2 = (val, key2) => hasOwnProperty.call(val, key2);
var isArray = Array.isArray;
var isFunction = (val) => typeof val === "function";
var isString = (val) => typeof val === "string";
var isObject = (val) => val !== null && typeof val === "object";
var isPromise = (val) => {
  return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
};
var objectToString2 = Object.prototype.toString;
var toTypeString2 = (value) => objectToString2.call(value);
var toRawType = (value) => {
  return toTypeString2(value).slice(8, -1);
};
var isPlainObject2 = (val) => toTypeString2(val) === "[object Object]";
var cacheStringFunction = (fn) => {
  const cache2 = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache2[str];
    return hit || (cache2[str] = fn(str));
  };
};
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
var capitalize2 = cacheStringFunction((str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
});
var toHandlerKey = cacheStringFunction((str) => {
  const s = str ? `on${capitalize2(str)}` : ``;
  return s;
});
var specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
var isBooleanAttr = /* @__PURE__ */ makeMap(
  specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,inert,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`
);

// ../uni-app-next/packages/uni-app-harmony/dist/uni.api.js
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key2 in protocol) {
    const errMsg = validateProp(key2, data[key2], protocol[key2], !hasOwn2(data, key2));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp(name, value, prop, isAbsent) {
  if (!isPlainObject2(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
var isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType(value, type) {
  let valid;
  const expectedType = getType2(type);
  if (isSimpleType(expectedType)) {
    const t = typeof value;
    valid = t === expectedType.toLowerCase();
    if (!valid && t === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    if (__PLATFORM__ === "app") {
      valid = value instanceof type || toRawType(value) === getType2(type);
    } else {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize2).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType2(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      console.error(e);
    }
  };
}
var invokeCallbackId = 1;
var invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
function findInvokeCallbackByName(name) {
  for (const key2 in invokeCallbacks) {
    if (invokeCallbacks[key2].name === name) {
      return true;
    }
  }
  return false;
}
function removeKeepAliveApiCallback(name, callback) {
  for (const key2 in invokeCallbacks) {
    const item = invokeCallbacks[key2];
    if (item.callback === callback && item.name === name) {
      delete invokeCallbacks[key2];
    }
  }
}
function offKeepAliveApiCallback(name) {
  UniServiceJSBridge.off("api." + name);
}
function onKeepAliveApiCallback(name) {
  UniServiceJSBridge.on("api." + name, (res) => {
    for (const key2 in invokeCallbacks) {
      const opts = invokeCallbacks[key2];
      if (opts.name === name) {
        opts.callback(res);
      }
    }
  });
}
function createKeepAliveApiCallback(name, callback) {
  return addInvokeCallback(invokeCallbackId++, name, callback, true);
}
var API_SUCCESS = "success";
var API_FAIL = "fail";
var API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject2(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
var HOOK_SUCCESS = "success";
var HOOK_FAIL = "fail";
var HOOK_COMPLETE = "complete";
var globalInterceptors = {};
var scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue(hooks, data, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject2(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !options.formatArgs || !isPlainObject2(options.formatArgs) && isPlainObject2(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn2(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  const result = {
    errMsg: name + ":ok"
  };
  {
    result.errSubject = name;
  }
  return invokeCallback(id, extend(res || {}, result));
}
function invokeFail(id, name, errMsg, errRes = {}) {
  const errMsgPrefix = name + ":fail";
  let apiErrMsg = "";
  if (!errMsg) {
    apiErrMsg = errMsgPrefix;
  } else if (errMsg.indexOf(errMsgPrefix) === 0) {
    apiErrMsg = errMsg;
  } else {
    apiErrMsg = errMsgPrefix + " " + errMsg;
  }
  let res = extend({ errMsg: apiErrMsg }, errRes);
  {
    if (typeof UniError !== "undefined") {
      res = typeof errRes.errCode !== "undefined" ? new UniError(name, errRes.errCode, apiErrMsg) : new UniError(apiErrMsg, errRes);
    }
  }
  return invokeCallback(id, res);
}
function beforeInvokeApi(name, args, protocol, options) {
  if (true) {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function checkCallback(callback) {
  if (!isFunction(callback)) {
    throw new Error('Invalid args: type check failed for args "callback". Expected Function');
  }
}
function wrapperOnApi(name, fn, options) {
  return (callback) => {
    checkCallback(callback);
    const errMsg = beforeInvokeApi(name, [callback], void 0, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    const isFirstInvokeOnApi = !findInvokeCallbackByName(name);
    createKeepAliveApiCallback(name, callback);
    if (isFirstInvokeOnApi) {
      onKeepAliveApiCallback(name);
      fn();
    }
  };
}
function wrapperOffApi(name, fn, options) {
  return (callback) => {
    checkCallback(callback);
    const errMsg = beforeInvokeApi(name, [callback], void 0, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    name = name.replace("off", "on");
    removeKeepAliveApiCallback(name, callback);
    const hasInvokeOnApi = findInvokeCallbackByName(name);
    if (!hasInvokeOnApi) {
      offKeepAliveApiCallback(name);
      fn();
    }
  };
}
function parseErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, parseErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineOnApi(name, fn, options) {
  return wrapperOnApi(name, fn, options);
}
function defineOffApi(name, fn, options) {
  return wrapperOffApi(name, fn, options);
}
function defineTaskApi(name, fn, protocol, options) {
  return promisify(name, wrapperTaskApi(name, fn, true ? protocol : void 0, options));
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, true ? protocol : void 0, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify(name, wrapperAsyncApi(name, fn, true ? protocol : void 0, options));
}
var API_ADD_INTERCEPTOR = "addInterceptor";
var API_REMOVE_INTERCEPTOR = "removeInterceptor";
var AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
var RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors[hook] = mergeHook(interceptors[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors, interceptor) {
  if (!interceptors || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
var addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject2(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject2(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
var removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject2(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject2(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);

// ../uni-app-next/packages/uni-app-harmony/src/compiler/standalone-ext-apis.json
var standalone_ext_apis_default = [
  {
    type: "extapi",
    plugin: "uni-facialRecognitionVerify",
    apis: [
      "startFacialRecognitionVerify",
      "getFacialRecognitionMetaInfo"
    ],
    version: "1.0.2"
  },
  {
    type: "provider",
    plugin: "uni-oauth-huawei",
    provider: "huawei",
    service: "oauth",
    version: "1.0.1"
  },
  {
    type: "provider",
    plugin: "uni-payment-alipay",
    provider: "alipay",
    service: "payment",
    version: "1.0.1"
  },
  {
    type: "provider",
    plugin: "uni-payment-huawei",
    provider: "huawei",
    service: "payment",
    version: "1.0.0"
  },
  {
    type: "extapi",
    plugin: "uni-push",
    apis: [
      "getPushClientId",
      "onPushMessage",
      "offPushMessage",
      "createPushMessage",
      "setAppBadgeNumber"
    ],
    version: "1.0.1"
  }
];

// packages/uni-mp-sdk/src/setup.ts
var _uni = {
  registerUTSPlugin,
  requireUTSPlugin,
  addInterceptor,
  removeInterceptor
};
var ignoreUniApiList = [
  "registerUTSPlugin",
  "requireUTSPlugin",
  "addInterceptor",
  "removeInterceptor"
];
function getUniApiList() {
  return Object.keys(_uni).filter((key2) => !ignoreUniApiList.includes(key2));
}
var extUniApiList = [];
function getExtUniApiList() {
  return extUniApiList;
}
var standaloneExtApiNames = [];
for (const pkg of standalone_ext_apis_default) {
  if (pkg.type !== "extapi") {
    continue;
  }
  standaloneExtApiNames.push(...pkg.apis);
}
var uni = new Proxy(_uni, {
  set(target, key2, value) {
    _uni[key2] = value;
    if (typeof key2 !== "string" || standaloneExtApiNames.includes(key2)) {
      return true;
    }
    extUniApiList.push(key2);
    return true;
  }
});
function initUniApi(api) {
  return Object.assign(_uni, api);
}
function setUniRuntime(runtime2) {
  globalThis.UTSJSONObject = runtime2.UTSJSONObject;
  globalThis.UniError = runtime2.UniError;
}
function setup() {
  globalThis.plus = plus_exports;
  globalThis.weex = weex_exports;
  globalThis.uni = uni;
  initSubscribeHandlers();
}

// packages/uni-mp-sdk/src/UTSHarmony/index.ts
var UTSHarmony_exports = {};
__export(UTSHarmony_exports, {
  appLifeCycle: () => appLifeCycle2,
  devicePX2px: () => devicePX2px,
  exit: () => exit,
  getAppId: () => getAppId,
  getAppName: () => getAppName,
  getAppTheme: () => getAppTheme,
  getAppVersion: () => getAppVersion,
  getCurrentWindow: () => getCurrentWindow2,
  getExtensionFromMimeType: () => getExtensionFromMimeType,
  getMimeTypeFromExtension: () => getMimeTypeFromExtension,
  getOsTheme: () => getOsTheme,
  getUIAbilityContext: () => getUIAbilityContext,
  getUniCompilerVersion: () => getUniCompilerVersion,
  getUniRuntimeVersion: () => getUniRuntimeVersion,
  getWindowStage: () => getWindowStage2,
  isUniAppX: () => isUniAppX,
  isUniMp: () => isUniMp,
  onAppAbilityCreate: () => onAppAbilityCreate,
  onAppAbilityNewWant: () => onAppAbilityNewWant,
  onAppAbilityShare: () => onAppAbilityShare,
  onAppAbilityWindowStageCreate: () => onAppAbilityWindowStageCreate,
  requestSystemPermission: () => requestSystemPermission
});

// packages/uni-mp-sdk/src/UTSHarmony/devicePX2px.ts
function devicePX2px(px) {
  return px2vp(px);
}

// packages/uni-mp-sdk/src/UTSHarmony/getAppId.ts
function getAppId() {
  const mp = getCurrentMP();
  return mp.manifest.id;
}

// packages/uni-mp-sdk/src/UTSHarmony/getAppTheme.ts
function getAppTheme() {
  return "light";
}

// packages/uni-mp-sdk/src/UTSHarmony/getAppName.ts
function getAppName() {
  return getCurrentManifest()?.name || "";
}

// packages/uni-mp-sdk/src/UTSHarmony/getAppVersion.ts
function getAppVersion() {
  const mp = getCurrentMP();
  const manifest = mp.manifest;
  return manifest.version;
}

// packages/uni-mp-sdk/src/UTSHarmony/getOsTheme.ts
import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
function getOsTheme() {
  switch (getAbilityContext()?.config?.colorMode) {
    case ConfigurationConstant.ColorMode.COLOR_MODE_DARK:
      return "dark";
    case ConfigurationConstant.ColorMode.COLOR_MODE_LIGHT:
    default:
      return "light";
  }
}

// packages/uni-mp-sdk/src/UTSHarmony/getUniCompilerVersion.ts
function getUniCompilerVersion() {
  const manifest = getCurrentManifest();
  if (!manifest) {
    return;
  }
  return manifest?.plus?.["uni-app"]?.compilerVersion;
}

// packages/uni-mp-sdk/src/UTSHarmony/getUniRuntimeVersion.ts
function getUniRuntimeVersion() {
  const mp = getCurrentMP();
  return mp && mp.runtimeVersion;
}

// packages/uni-mp-sdk/src/UTSHarmony/getWindowStage.ts
function getWindowStage2() {
  return getWindowStage();
}

// packages/uni-mp-sdk/src/UTSHarmony/isUniMp.ts
function isUniMp() {
  const currentMP2 = getCurrentMP();
  return !!(currentMP2 && !currentMP2.isMain);
}

// packages/uni-mp-sdk/src/UTSHarmony/isUniAppX.ts
function isUniAppX() {
  return false;
}

// packages/uni-mp-sdk/src/UTSHarmony/requestSystemPermission.ts
import abilityAccessCtrl2 from "@ohos:abilityAccessCtrl";
function tryExec(fn, args) {
  if (!fn) {
    return;
  }
  try {
    fn(...args);
  } catch (error) {
    console.error(error);
  }
}
function requestSystemPermission(permissions, success, fail) {
  const atm = abilityAccessCtrl2.createAtManager();
  atm.requestPermissionsFromUser(
    getAbilityContext(),
    permissions,
    (err, data) => {
      if (err) {
        fail && fail(false, []);
        return;
      }
      const grantedList = permissions.filter((_, index3) => {
        return data.authResults[index3] === 0;
      });
      const doNotAskAgain = data.dialogShownResults && data.dialogShownResults.some((v) => !v);
      if (grantedList.length === permissions.length) {
        tryExec(success, [true, grantedList]);
      } else if (grantedList.length === 0) {
        tryExec(fail, [doNotAskAgain, grantedList]);
      } else {
        tryExec(success, [false, grantedList]);
        tryExec(fail, [doNotAskAgain, grantedList]);
      }
    }
  );
}

// packages/uni-mp-sdk/src/UTSHarmony/exit.ts
function exit() {
  runtime.quit();
}

// packages/uni-mp-sdk/src/UTSHarmony/appLifeCycle.ts
var appLifeCycle2 = appLifeCycle;

// packages/uni-mp-sdk/src/UTSHarmony/getUIAbilityContext.ts
function getUIAbilityContext() {
  return getAbilityContext();
}

// packages/uni-mp-sdk/src/UTSHarmony/getCurrentWindow.ts
function getCurrentWindow2() {
  return getCurrentWindow();
}

// packages/uni-mp-sdk/src/platform/getWindowInfo.ts
function getWindowInfoWithoutPage() {
  const safeAreaInsets = navigator.getSafeAreaInsets();
  return {
    safeAreaInsets: {
      top: safeAreaInsets.top,
      bottom: safeAreaInsets.bottom,
      left: safeAreaInsets.left,
      right: safeAreaInsets.right
    },
    safeArea: {
      top: safeAreaInsets.top,
      bottom: 0,
      left: 0,
      right: 0,
      width: 0,
      height: 0
    },
    statusBarHeight: safeAreaInsets.top,
    pixelRatio: vp2px(1),
    screenHeight: 0,
    screenTop: safeAreaInsets.top,
    screenWidth: 0,
    windowHeight: 0,
    windowWidth: 0,
    windowTop: 0,
    windowBottom: 0
  };
}
function getWindowInfoWithPage() {
  const currentWebview = getCurrentWebview();
  const safeAreaInsets = navigator.getSafeAreaInsets();
  const safeAreaInsetsWithWindowInfo = currentWebview.getSafeAreaInsets();
  const {
    statusBarHeight,
    screenTop,
    windowHeight,
    windowWidth,
    screenWidth,
    screenHeight
  } = safeAreaInsetsWithWindowInfo;
  return {
    safeAreaInsets: {
      top: safeAreaInsetsWithWindowInfo.top,
      bottom: safeAreaInsetsWithWindowInfo.bottom,
      left: safeAreaInsetsWithWindowInfo.left,
      right: safeAreaInsetsWithWindowInfo.right
    },
    safeArea: {
      top: safeAreaInsets.top,
      bottom: screenHeight - safeAreaInsets.bottom,
      left: safeAreaInsets.left,
      right: screenWidth - safeAreaInsets.right,
      width: screenWidth - safeAreaInsets.left - safeAreaInsets.right,
      height: screenHeight - safeAreaInsets.top - safeAreaInsets.bottom
    },
    statusBarHeight,
    pixelRatio: vp2px(1),
    screenHeight,
    screenTop,
    screenWidth,
    windowHeight,
    windowWidth,
    windowTop: 0,
    windowBottom: 0
  };
}
function getWindowInfo() {
  const currentWebview = getCurrentWebview();
  if (!currentWebview) {
    return getWindowInfoWithoutPage();
  }
  return getWindowInfoWithPage();
}

// packages/uni-mp-sdk/src/platform/_systemStore.ts
import dataPreferences from "@ohos:data.preferences";
var STORE_KEY_DEVICE_ID = "deviceId";
var SystemStorage = null;
function createSystemRootStorage() {
  if (!SystemStorage) {
    SystemStorage = dataPreferences.getPreferencesSync(getAbilityContext(), {
      name: `storage.system.root`
    });
  }
  return SystemStorage;
}

// packages/uni-mp-sdk/src/platform/getDeviceId.ts
import util from "@ohos:util";
import deviceInfo from "@ohos:deviceInfo";
import cryptoFramework from "@ohos:security.cryptoFramework";
import buffer4 from "@ohos:buffer";
function md5(str) {
  const md = cryptoFramework.createMd("MD5");
  md.updateSync({
    data: new Uint8Array(buffer4.from(str, "utf8").buffer)
  });
  return buffer4.from(md.digestSync().data).toString("hex").toUpperCase();
}
function getDeviceId() {
  const systemStorage = createSystemRootStorage();
  const systemStoreDeviceId = systemStorage.getSync(STORE_KEY_DEVICE_ID, "");
  if (systemStoreDeviceId) {
    return systemStoreDeviceId;
  }
  let deviceId = "";
  const ODID = deviceInfo.ODID;
  if (ODID) {
    deviceId = ODID;
  } else {
    deviceId = util.generateRandomUUID();
  }
  deviceId = md5(deviceId);
  systemStorage.putSync(STORE_KEY_DEVICE_ID, deviceId);
  systemStorage.flush();
  return deviceId;
}

// packages/uni-mp-sdk/src/platform/onNativePageReady.ts
function onNativePageReady() {
  return new Promise((resolve) => {
    nativePagesManager.onNativePageReady(function(page) {
      resolve(page);
    });
  });
}

// packages/uni-mp-sdk/src/platform/pullDownRefresh.ts
function startPullDownRefresh() {
  const webview2 = getPullDownRefreshWebview();
  if (webview2) {
    webview2.endPullToRefresh();
  }
  const currentWebview = getCurrentWebview();
  if (!currentWebview) {
    return;
  }
  currentWebview.beginPullToRefresh();
}
function stopPullDownRefresh() {
  const webview2 = getPullDownRefreshWebview();
  if (webview2) {
    webview2.endPullToRefresh();
  }
}

// packages/uni-mp-sdk/src/platform/getTabBar.ts
function getTabBar() {
  const currentWebview = getCurrentWebview();
  if (!currentWebview) {
    return;
  }
  if (!isTabBarPage(currentWebview.id)) {
    return;
  }
  return tabview;
}

// packages/uni-mp-sdk/src/index.ts
var import_tiny_emitter6 = __toESM(require_tiny_emitter());
setup();
var export_Emitter = import_tiny_emitter6.TinyEmitter;
export {
  export_Emitter as Emitter,
  TEMPLATE_PAGE_NAME,
  UTSHarmony_exports as UTSHarmony,
  WebNodeController,
  appAbilityEmitter,
  appLifeCycle,
  callPageLifeCycle,
  capitalize,
  closeUniMP,
  createDownloadDelegate,
  defineAsyncApi,
  defineNativeEmbed,
  defineOffApi,
  defineOnApi,
  defineSyncApi,
  defineTaskApi,
  disableEnumerable,
  freeze,
  getAbilityContext,
  getAppVersionInfo,
  getCurrentMP,
  getCurrentWebview,
  getCurrentWindow,
  getDeviceId,
  getEntryMetadata,
  getEnv,
  getOSRuntime,
  getRealPath,
  getResourceStr,
  getSafeAreaInsets,
  getServiceMethod,
  getTabBar,
  getType,
  getUniMP,
  getUniMPRunPath,
  getWindowInfo,
  getWindowStage,
  globalConfig,
  hasOwn,
  hmrGetUniAppWWWPath,
  hmrRestartUniApp,
  init,
  initUniApi,
  isExistsApp,
  isPlainObject,
  nativePagesManager,
  navigator,
  offSafeAreaInsetsChange,
  onBackPressCallbacks,
  onNativePageReady,
  onSafeAreaInsetsChange,
  openUniApp,
  openUniMP,
  pageLifeCycle,
  registerModule,
  registerServiceMethod,
  releaseCurrentWgtToRunPath,
  releaseWgtToRunPath,
  setOSRuntime,
  setUniRuntime,
  startPullDownRefresh,
  stopPullDownRefresh,
  telSchemeHandler,
  uni
};
/*! Bundled license information:

@vue/shared/dist/shared.esm-bundler.js:
  (**
  * @vue/shared v3.4.21
  * (c) 2018-present Yuxi (Evan) You and Vue contributors
  * @license MIT
  **)
*/
