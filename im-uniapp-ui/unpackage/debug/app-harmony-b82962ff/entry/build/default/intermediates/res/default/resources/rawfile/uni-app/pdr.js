"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // packages/uni-pandora/src/plus/index.ts
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

  // packages/uni-pandora/src/utils.ts
  function wrapMethod(name) {
    return function(...args) {
      return harmonyChannel.invokeSync(name, args);
    };
  }
  function addMethods(obj, methods10, prefix) {
    methods10.forEach((key2) => {
      obj[key2] = wrapMethod(prefix + "." + key2);
    });
  }
  function addGetters(obj, getters2, prefix) {
    getters2.forEach((key2) => {
      Object.defineProperty(obj, key2, {
        get() {
          return harmonyChannel.invokeSync(prefix + "." + key2, []);
        }
      });
    });
  }

  // packages/uni-pandora/src/plus/runtime.ts
  var runtime = {};
  var methods = ["quit", "install", "getProperty", "openURL"];
  addMethods(runtime, methods, "plus.runtime");
  var getters = [
    /**
     * @deprecated
     */
    "arguments",
    "channel",
    "launcher"
  ];
  addGetters(runtime, getters, "plus.runtime");

  // packages/uni-pandora/src/plus/webview.ts
  var MODULE_NAME = "plus.webview";
  var store = {};
  function wrapWebViewMethod(method) {
    return function(...args) {
      const id = this.id;
      const elId = this.elId;
      return webview.invokeWebview(id, elId, method, ...args);
    };
  }
  function wrapWebView(webView) {
    if (!webView) {
      return webView;
    }
    const id = webView.id;
    const isChild = "elId" in webView;
    if (!isChild) {
      const cached = store[id];
      if (cached) {
        return cached;
      }
      store[id] = webView;
    }
    const methods10 = [
      "addEventListener",
      "beginPullToRefresh",
      "children",
      "close",
      "endPullToRefresh",
      "evalJS",
      "evalJSAsync",
      "getSafeAreaInsets",
      "getStyle",
      "getURL",
      "removeEventListener",
      "setPullToRefresh",
      "setSoftinputTemporary",
      "setStyle",
      "show",
      "canBack",
      "back"
    ];
    methods10.forEach(function(key2) {
      webView[key2] = wrapWebViewMethod(key2);
    });
    const childrenFn = webView.children.bind(webView);
    webView.children = function() {
      return childrenFn().map(wrapWebView);
    };
    if (!isChild) {
      const callback = function() {
        webView.removeEventListener("close", callback);
        delete store[id];
      };
      webView.addEventListener("close", callback);
    }
    return webView;
  }
  var webview = {
    create(url, id, styles, extras) {
      return wrapWebView(
        wrapMethod(MODULE_NAME + ".create")(url, id, styles, extras)
      );
    },
    getWebviewById(id) {
      return wrapWebView(wrapMethod(MODULE_NAME + ".getWebviewById")(id));
    },
    getLaunchWebview() {
      return wrapWebView(wrapMethod(MODULE_NAME + ".getLaunchWebview")());
    },
    getTopWebview() {
      return wrapWebView(wrapMethod(MODULE_NAME + ".getTopWebview")());
    },
    invokeWebview(id, elId, method, ...options) {
      return wrapMethod(MODULE_NAME + ".invokeWebview")(
        id,
        elId,
        method,
        ...options
      );
    }
  };

  // packages/uni-pandora/src/plus/globalEvent.ts
  var globalEvent = {};
  var methods2 = ["addEventListener"];
  addMethods(globalEvent, methods2, "plus.globalEvent");

  // packages/uni-pandora/src/plus/key.ts
  var key = {};
  var methods3 = ["addEventListener", "removeEventListener"];
  addMethods(key, methods3, "plus.key");

  // packages/uni-pandora/src/plus/nativeUI.ts
  var nativeUI = {};
  var methods4 = ["toast"];
  addMethods(nativeUI, methods4, "plus.nativeUI");

  // packages/uni-pandora/src/plus/io.ts
  var io = {};
  var methods5 = ["convertLocalFileSystemURL", "getEnv"];
  addMethods(io, methods5, "plus.io");

  // packages/uni-pandora/src/plus/navigator.ts
  var navigator = {};
  var methods6 = ["setStatusBarStyle", "getSafeAreaInsets", "getOrientation"];
  addMethods(navigator, methods6, "plus.navigator");

  // packages/uni-pandora/src/plus/geolocation.ts
  var geolocation = {};
  var methods7 = ["getCurrentPosition", "watchPosition", "clearWatch"];
  addMethods(geolocation, methods7, "plus.geolocation");

  // packages/uni-pandora/src/weex/index.ts
  var weex_exports = {};
  __export(weex_exports, {
    requireModule: () => requireModule
  });

  // packages/uni-pandora/src/weex/tabview.ts
  var tabview = {};
  var methods8 = [
    "onMaskClick",
    "onClick",
    "onMidButtonClick",
    "showTabBarRedDot",
    "hideTabBarRedDot",
    "setTabBarBadge",
    "removeTabBarBadge",
    "setTabBarItems",
    "setTabBarItem",
    "setTabBarStyle",
    "hideTabBar",
    "showTabBar",
    "append",
    "setMask",
    "switchSelect"
  ];
  addMethods(tabview, methods8, "weex.tabview");

  // packages/uni-pandora/src/weex/plus.ts
  var plus = {};
  var methods9 = ["getLanguage", "setLanguage", "getRedirectInfo"];
  addMethods(plus, methods9, "weex.plus");

  // packages/uni-pandora/src/weex/index.ts
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
        moduleObj = globalThis.uni.requireNativePlugin(name);
        break;
    }
    return moduleObj;
  }

  // packages/uni-pandora/src/harmony/index.ts
  var vp2px = wrapMethod("vp2px");
  var lpx2px = wrapMethod("lpx2px");

  // packages/uni-pandora/src/index.ts
  globalThis.plus = plus_exports;
  globalThis.weex = weex_exports;
  globalThis.vp2px = vp2px;
  globalThis.lpx2px = lpx2px;
})();
