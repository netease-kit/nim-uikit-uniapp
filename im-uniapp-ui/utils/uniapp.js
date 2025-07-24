import EventEmitter from 'eventemitter3'
import axios from 'axios'

var request$1 = function (_a) {
  var _b = _a.method,
    method = _b === void 0 ? 'POST' : _b,
    url = _a.url,
    data = _a.data,
    headers = _a.headers
  return new Promise(function (resolve, reject) {
    uni.request({
      url: url,
      method: method,
      data: data,
      header: headers,
      success: function (res) {
        var data = res.data
        if (data.code !== 200) {
          return reject(data.msg)
        }
        resolve(data)
      },
      fail: function (err) {
        reject(err)
      },
    })
  })
}
var uniappRequestHelper = request$1

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function (d, b) {
  extendStatics =
    Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array &&
      function (d, b) {
        d.__proto__ = b
      }) ||
    function (d, b) {
      for (var p in b)
        if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]
    }
  return extendStatics(d, b)
}

function __extends(d, b) {
  if (typeof b !== 'function' && b !== null)
    throw new TypeError(
      'Class extends value ' + String(b) + ' is not a constructor or null'
    )
  extendStatics(d, b)
  function __() {
    this.constructor = d
  }
  d.prototype =
    b === null ? Object.create(b) : ((__.prototype = b.prototype), new __())
}

var __assign = function () {
  __assign =
    Object.assign ||
    function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i]
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
      }
      return t
    }
  return __assign.apply(this, arguments)
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P
      ? value
      : new P(function (resolve) {
          resolve(value)
        })
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value))
      } catch (e) {
        reject(e)
      }
    }
    function rejected(value) {
      try {
        step(generator['throw'](value))
      } catch (e) {
        reject(e)
      }
    }
    function step(result) {
      result.done
        ? resolve(result.value)
        : adopt(result.value).then(fulfilled, rejected)
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next())
  })
}

function __generator(thisArg, body) {
  var _ = {
      label: 0,
      sent: function () {
        if (t[0] & 1) throw t[1]
        return t[1]
      },
      trys: [],
      ops: [],
    },
    f,
    y,
    t,
    g
  return (
    (g = { next: verb(0), throw: verb(1), return: verb(2) }),
    typeof Symbol === 'function' &&
      (g[Symbol.iterator] = function () {
        return this
      }),
    g
  )
  function verb(n) {
    return function (v) {
      return step([n, v])
    }
  }
  function step(op) {
    if (f) throw new TypeError('Generator is already executing.')
    while ((g && ((g = 0), op[0] && (_ = 0)), _))
      try {
        if (
          ((f = 1),
          y &&
            (t =
              op[0] & 2
                ? y['return']
                : op[0]
                ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                : y.next) &&
            !(t = t.call(y, op[1])).done)
        )
          return t
        if (((y = 0), t)) op = [op[0] & 2, t.value]
        switch (op[0]) {
          case 0:
          case 1:
            t = op
            break
          case 4:
            _.label++
            return { value: op[1], done: false }
          case 5:
            _.label++
            y = op[1]
            op = [0]
            continue
          case 7:
            op = _.ops.pop()
            _.trys.pop()
            continue
          default:
            if (
              !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
              (op[0] === 6 || op[0] === 2)
            ) {
              _ = 0
              continue
            }
            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
              _.label = op[1]
              break
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1]
              t = op
              break
            }
            if (t && _.label < t[2]) {
              _.label = t[2]
              _.ops.push(op)
              break
            }
            if (t[2]) _.ops.pop()
            _.trys.pop()
            continue
        }
        op = body.call(thisArg, _)
      } catch (e) {
        op = [6, e]
        y = 0
      } finally {
        f = t = 0
      }
    if (op[0] & 5) throw op[1]
    return { value: op[0] ? op[1] : void 0, done: true }
  }
}

function __values(o) {
  var s = typeof Symbol === 'function' && Symbol.iterator,
    m = s && o[s],
    i = 0
  if (m) return m.call(o)
  if (o && typeof o.length === 'number')
    return {
      next: function () {
        if (o && i >= o.length) o = void 0
        return { value: o && o[i++], done: !o }
      },
    }
  throw new TypeError(
    s ? 'Object is not iterable.' : 'Symbol.iterator is not defined.'
  )
}

function __read(o, n) {
  var m = typeof Symbol === 'function' && o[Symbol.iterator]
  if (!m) return o
  var i = m.call(o),
    r,
    ar = [],
    e
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value)
  } catch (error) {
    e = { error: error }
  } finally {
    try {
      if (r && !r.done && (m = i['return'])) m.call(i)
    } finally {
      if (e) throw e.error
    }
  }
  return ar
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar) ar = Array.prototype.slice.call(from, 0, i)
        ar[i] = from[i]
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from))
}

typeof SuppressedError === 'function'
  ? SuppressedError
  : function (error, suppressed, message) {
      var e = new Error(message)
      return (
        (e.name = 'SuppressedError'),
        (e.error = error),
        (e.suppressed = suppressed),
        e
      )
    }

var request = uniappRequestHelper
var Storage = /** @class */ (function () {
  function Storage(type, salt) {
    this.store = new Map()
    this.type = 'memory'
    this.salt = '__salt__'
    type && (this.type = type)
    salt && (this.salt = salt)
  }
  Storage.prototype.get = function (key) {
    var value
    switch (this.type) {
      case 'memory':
        return this.store.get(key)
      case 'localStorage':
      case 'sessionStorage':
        value = uni.getStorageSync(''.concat(this.salt).concat(key))
        return value
    }
  }
  Storage.prototype.set = function (key, value) {
    switch (this.type) {
      case 'memory':
        this.store.set(key, value)
        break
      case 'localStorage':
      case 'sessionStorage':
        uni.setStorageSync(''.concat(this.salt).concat(key), value)
        break
    }
  }
  Storage.prototype.remove = function (key) {
    switch (this.type) {
      case 'memory':
        this.store.delete(key)
        break
      case 'localStorage':
      case 'sessionStorage':
        uni.removeStorageSync(''.concat(this.salt).concat(key))
        break
    }
  }
  return Storage
})()
var uniappStorage = Storage

var index = uniappStorage
var url$1 = 'https://statistic.live.126.net/statics/report/xkit/action'
var EventTracking = /** @class */ (function () {
  function EventTracking(_a) {
    var appKey = _a.appKey,
      version = _a.version,
      component = _a.component,
      nertcVersion = _a.nertcVersion,
      imVersion = _a.imVersion,
      _b = _a.os,
      os = _b === void 0 ? '' : _b,
      _c = _a.framework,
      framework = _c === void 0 ? '' : _c,
      _d = _a.language,
      language = _d === void 0 ? '' : _d,
      _e = _a.container,
      container = _e === void 0 ? '' : _e,
      _f = _a.platform,
      platform = _f === void 0 ? 'Web' : _f,
      _g = _a.channel,
      channel = _g === void 0 ? 'netease' : _g
    this.platform = platform
    this.appKey = appKey
    this.version = version
    this.component = component
    this.nertcVersion = nertcVersion
    this.imVersion = imVersion
    this.channel = channel
    this.os = os
    this.framework = framework
    this.language = language
    this.container = container
  }
  EventTracking.prototype.track = function (reportType, data) {
    return __awaiter(this, void 0, void 0, function () {
      var _a,
        appKey,
        version,
        component,
        nertcVersion,
        imVersion,
        platform,
        channel,
        os,
        framework,
        language,
        container,
        timeStamp
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            ;(_a = this),
              (appKey = _a.appKey),
              (version = _a.version),
              (component = _a.component),
              (nertcVersion = _a.nertcVersion),
              (imVersion = _a.imVersion),
              (platform = _a.platform),
              (channel = _a.channel),
              (os = _a.os),
              (framework = _a.framework),
              (language = _a.language),
              (container = _a.container)
            timeStamp = Date.now()
            _c.label = 1
          case 1:
            _c.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              request({
                method: 'POST',
                url: url$1,
                data: {
                  appKey: appKey,
                  version: version,
                  component: component,
                  timeStamp: timeStamp,
                  nertcVersion: nertcVersion,
                  imVersion: imVersion,
                  platform: platform,
                  reportType: reportType,
                  data: data,
                  channel: channel,
                  os: os,
                  framework: framework,
                  language: language,
                  container: container,
                },
              }),
            ]
          case 2:
            _c.sent()
            return [3 /*break*/, 4]
          case 3:
            _c.sent()
            return [3 /*break*/, 4]
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  return EventTracking
})()
var EventTracking$1 = EventTracking

/**
 * 判断元素是否可见
 * 融合了 IntersectionObserver 与 visibilityChange 事件
 */
var VisibilityObserver = /** @class */ (function (_super) {
  __extends(VisibilityObserver, _super)
  // 入参说明参考：https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API
  function VisibilityObserver(options) {
    var _this = _super.call(this) || this
    _this.visibilityState = document.visibilityState
    _this.entries = []
    _this._visibilitychange = function () {
      _this.visibilityState = document.visibilityState
      _this._trigger()
    }
    _this.intersectionObserver = new IntersectionObserver(
      _this._intersectionObserverHandler.bind(_this),
      options
    )
    document.addEventListener('visibilitychange', _this._visibilitychange)
    return _this
  }
  VisibilityObserver.prototype.observe = function (target) {
    return this.intersectionObserver.observe(target)
  }
  VisibilityObserver.prototype.unobserve = function (target) {
    return this.intersectionObserver.unobserve(target)
  }
  VisibilityObserver.prototype.destroy = function () {
    this.intersectionObserver.disconnect()
    document.removeEventListener('visibilitychange', this._visibilitychange)
    this.entries = []
  }
  VisibilityObserver.prototype._intersectionObserverHandler = function (
    entries
  ) {
    this.entries = entries
    this._trigger()
  }
  VisibilityObserver.prototype._trigger = function () {
    var _this = this
    this.entries.forEach(function (item) {
      if (_this.visibilityState !== 'visible' || item.intersectionRatio <= 0) {
        _this.emit('visibleChange', {
          visible: false,
          target: item.target,
        })
        return
      }
      _this.emit('visibleChange', {
        visible: true,
        target: item.target,
      })
    })
  }
  return VisibilityObserver
})(EventEmitter)
var VisibilityObserver$1 = VisibilityObserver

var commonjsGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {}

function createCommonjsModule(fn, module) {
  return (module = { exports: {} }), fn(module, module.exports), module.exports
}

var loglevel = createCommonjsModule(function (module) {
  /*
   * loglevel - https://github.com/pimterry/loglevel
   *
   * Copyright (c) 2013 Tim Perry
   * Licensed under the MIT license.
   */
  ;(function (root, definition) {
    if (module.exports) {
      module.exports = definition()
    } else {
      root.log = definition()
    }
  })(commonjsGlobal, function () {
    // Slightly dubious tricks to cut down minimized file size
    var noop = function () {}
    var undefinedType = 'undefined'
    var isIE =
      typeof window !== undefinedType &&
      typeof window.navigator !== undefinedType &&
      /Trident\/|MSIE /.test(window.navigator.userAgent)

    var logMethods = ['trace', 'debug', 'info', 'warn', 'error']

    var _loggersByName = {}
    var defaultLogger = null

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
      var method = obj[methodName]
      if (typeof method.bind === 'function') {
        return method.bind(obj)
      } else {
        try {
          return Function.prototype.bind.call(method, obj)
        } catch (e) {
          // Missing bind shim or IE8 + Modernizr, fallback to wrapping
          return function () {
            return Function.prototype.apply.apply(method, [obj, arguments])
          }
        }
      }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
      if (console.log) {
        if (console.log.apply) {
          console.log.apply(console, arguments)
        } else {
          // In old IE, native console methods themselves don't have apply().
          Function.prototype.apply.apply(console.log, [console, arguments])
        }
      }
      if (console.trace) console.trace()
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
      if (methodName === 'debug') {
        methodName = 'log'
      }

      if (typeof console === undefinedType) {
        return false // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
      } else if (methodName === 'trace' && isIE) {
        return traceForIE
      } else if (console[methodName] !== undefined) {
        return bindMethod(console, methodName)
      } else if (console.log !== undefined) {
        return bindMethod(console, 'log')
      } else {
        return noop
      }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods() {
      /*jshint validthis:true */
      var level = this.getLevel()

      // Replace the actual methods.
      for (var i = 0; i < logMethods.length; i++) {
        var methodName = logMethods[i]
        this[methodName] =
          i < level ? noop : this.methodFactory(methodName, level, this.name)
      }

      // Define log.log as an alias for log.debug
      this.log = this.debug

      // Return any important warnings.
      if (typeof console === undefinedType && level < this.levels.SILENT) {
        return 'No console available for logging'
      }
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName) {
      return function () {
        if (typeof console !== undefinedType) {
          replaceLoggingMethods.call(this)
          this[methodName].apply(this, arguments)
        }
      }
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, _level, _loggerName) {
      /*jshint validthis:true */
      return (
        realMethod(methodName) ||
        enableLoggingWhenConsoleArrives.apply(this, arguments)
      )
    }

    function Logger(name, factory) {
      // Private instance variables.
      var self = this
      /**
       * The level inherited from a parent logger (or a global default). We
       * cache this here rather than delegating to the parent so that it stays
       * in sync with the actual logging methods that we have installed (the
       * parent could change levels but we might not have rebuilt the loggers
       * in this child yet).
       * @type {number}
       */
      var inheritedLevel
      /**
       * The default level for this logger, if any. If set, this overrides
       * `inheritedLevel`.
       * @type {number|null}
       */
      var defaultLevel
      /**
       * A user-specific level for this logger. If set, this overrides
       * `defaultLevel`.
       * @type {number|null}
       */
      var userLevel

      var storageKey = 'loglevel'
      if (typeof name === 'string') {
        storageKey += ':' + name
      } else if (typeof name === 'symbol') {
        storageKey = undefined
      }

      function persistLevelIfPossible(levelNum) {
        var levelName = (logMethods[levelNum] || 'silent').toUpperCase()

        if (typeof window === undefinedType || !storageKey) return

        // Use localStorage if available
        try {
          window.localStorage[storageKey] = levelName
          return
        } catch (ignore) {}

        // Use session cookie as fallback
        try {
          window.document.cookie =
            encodeURIComponent(storageKey) + '=' + levelName + ';'
        } catch (ignore) {}
      }

      function getPersistedLevel() {
        var storedLevel

        if (typeof window === undefinedType || !storageKey) return

        try {
          storedLevel = window.localStorage[storageKey]
        } catch (ignore) {}

        // Fallback to cookies if local storage gives us nothing
        if (typeof storedLevel === undefinedType) {
          try {
            var cookie = window.document.cookie
            var cookieName = encodeURIComponent(storageKey)
            var location = cookie.indexOf(cookieName + '=')
            if (location !== -1) {
              storedLevel = /^([^;]+)/.exec(
                cookie.slice(location + cookieName.length + 1)
              )[1]
            }
          } catch (ignore) {}
        }

        // If the stored level is not valid, treat it as if nothing was stored.
        if (self.levels[storedLevel] === undefined) {
          storedLevel = undefined
        }

        return storedLevel
      }

      function clearPersistedLevel() {
        if (typeof window === undefinedType || !storageKey) return

        // Use localStorage if available
        try {
          window.localStorage.removeItem(storageKey)
        } catch (ignore) {}

        // Use session cookie as fallback
        try {
          window.document.cookie =
            encodeURIComponent(storageKey) +
            '=; expires=Thu, 01 Jan 1970 00:00:00 UTC'
        } catch (ignore) {}
      }

      function normalizeLevel(input) {
        var level = input
        if (
          typeof level === 'string' &&
          self.levels[level.toUpperCase()] !== undefined
        ) {
          level = self.levels[level.toUpperCase()]
        }
        if (
          typeof level === 'number' &&
          level >= 0 &&
          level <= self.levels.SILENT
        ) {
          return level
        } else {
          throw new TypeError(
            'log.setLevel() called with invalid level: ' + input
          )
        }
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name

      self.levels = {
        TRACE: 0,
        DEBUG: 1,
        INFO: 2,
        WARN: 3,
        ERROR: 4,
        SILENT: 5,
      }

      self.methodFactory = factory || defaultMethodFactory

      self.getLevel = function () {
        if (userLevel != null) {
          return userLevel
        } else if (defaultLevel != null) {
          return defaultLevel
        } else {
          return inheritedLevel
        }
      }

      self.setLevel = function (level, persist) {
        userLevel = normalizeLevel(level)
        if (persist !== false) {
          // defaults to true
          persistLevelIfPossible(userLevel)
        }

        // NOTE: in v2, this should call rebuild(), which updates children.
        return replaceLoggingMethods.call(self)
      }

      self.setDefaultLevel = function (level) {
        defaultLevel = normalizeLevel(level)
        if (!getPersistedLevel()) {
          self.setLevel(level, false)
        }
      }

      self.resetLevel = function () {
        userLevel = null
        clearPersistedLevel()
        replaceLoggingMethods.call(self)
      }

      self.enableAll = function (persist) {
        self.setLevel(self.levels.TRACE, persist)
      }

      self.disableAll = function (persist) {
        self.setLevel(self.levels.SILENT, persist)
      }

      self.rebuild = function () {
        if (defaultLogger !== self) {
          inheritedLevel = normalizeLevel(defaultLogger.getLevel())
        }
        replaceLoggingMethods.call(self)

        if (defaultLogger === self) {
          for (var childName in _loggersByName) {
            _loggersByName[childName].rebuild()
          }
        }
      }

      // Initialize all the internal levels.
      inheritedLevel = normalizeLevel(
        defaultLogger ? defaultLogger.getLevel() : 'WARN'
      )
      var initialLevel = getPersistedLevel()
      if (initialLevel != null) {
        userLevel = normalizeLevel(initialLevel)
      }
      replaceLoggingMethods.call(self)
    }

    /*
     *
     * Top-level API
     *
     */

    defaultLogger = new Logger()

    defaultLogger.getLogger = function getLogger(name) {
      if (
        (typeof name !== 'symbol' && typeof name !== 'string') ||
        name === ''
      ) {
        throw new TypeError('You must supply a name when creating a logger.')
      }

      var logger = _loggersByName[name]
      if (!logger) {
        logger = _loggersByName[name] = new Logger(
          name,
          defaultLogger.methodFactory
        )
      }
      return logger
    }

    // Grab the current global log variable in case of overwrite
    var _log = typeof window !== undefinedType ? window.log : undefined
    defaultLogger.noConflict = function () {
      if (typeof window !== undefinedType && window.log === defaultLogger) {
        window.log = _log
      }

      return defaultLogger
    }

    defaultLogger.getLoggers = function getLoggers() {
      return _loggersByName
    }

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger

    return defaultLogger
  })
})

var log = loglevel

function createLoggerDecorator(MODULE_NAME, logger) {
  return function (__, propKey, descriptor) {
    var method = descriptor.value
    descriptor.value = function () {
      var args = []
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i]
      }
      return __awaiter(this, void 0, void 0, function () {
        var methodName, res, err_1
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!logger) {
                // @ts-ignore
                logger = this.logger
              }
              if (
                ['log', 'error'].some(function (item) {
                  return !logger[item]
                })
              ) {
                console.warn(
                  'loggerDecorator warning: your logger is not complete'
                )
              }
              methodName = method.name || propKey || ''
              _a.label = 1
            case 1:
              _a.trys.push([1, 3, , 4])
              logger === null || logger === void 0
                ? void 0
                : logger.log.apply(
                    logger,
                    __spreadArray(
                      [MODULE_NAME, methodName],
                      __read(args),
                      false
                    )
                  )
              return [4 /*yield*/, method.apply(this, args)]
            case 2:
              res = _a.sent()
              logger === null || logger === void 0
                ? void 0
                : logger.log(
                    MODULE_NAME,
                    ''.concat(methodName, ' success: '),
                    res
                  )
              return [2 /*return*/, res]
            case 3:
              err_1 = _a.sent()
              logger === null || logger === void 0
                ? void 0
                : logger.error(
                    MODULE_NAME,
                    ''.concat(methodName, ' failed: '),
                    err_1
                  )
              throw err_1
            case 4:
              return [2 /*return*/]
          }
        })
      })
    }
  }
}

function sensitiveInfoFilter(content) {
  var regexs = [
    'scene/apps/[a-z0-9]{32}/',
    '"rtcKey":"[a-z0-9]{32}"',
    '"imKey":"[a-z0-9]{32}"',
    '"appkey":"[a-z0-9]{32}"',
    '"appkey": "[a-z0-9]{32}"',
    'appkey:"[a-z0-9]{32}"',
    'appkey: "[a-z0-9]{32}"',
    '"appkey":[a-z0-9]{32}',
    '"appkey": [a-z0-9]{32}',
    'appkey:[a-z0-9]{32}',
    'appkey: [a-z0-9]{32}',
  ]
  var templates = [
    'scene/apps/***/',
    '"rtcKey":"***"',
    '"imKey":"***"',
    '"appkey":"***"',
    '"appkey": "***"',
    'appkey:"***"',
    'appkey: "***"',
    '"appkey":***',
    '"appkey": ***',
    'appkey:***',
    'appkey: ***',
  ]
  regexs.forEach(function (regex, index) {
    var reg = new RegExp(regex, 'gi')
    content = content.replace(reg, templates[index])
  })
  return content
}
var logDebug = function (_a) {
  var _b =
      _a === void 0
        ? {
            appName: '',
            version: '',
            storeWindow: false,
            needStringify: true,
          }
        : _a,
    level = _b.level,
    _c = _b.appName,
    appName = _c === void 0 ? '' : _c,
    _d = _b.storeWindow,
    storeWindow = _d === void 0 ? false : _d,
    _e = _b.needStringify,
    needStringify = _e === void 0 ? true : _e
  var genTime = function () {
    var now = new Date()
    var year = now.getFullYear()
    var month = now.getMonth() + 1
    var day = now.getDate()
    var hour = now.getHours() < 10 ? '0'.concat(now.getHours()) : now.getHours()
    var min =
      now.getMinutes() < 10 ? '0'.concat(now.getMinutes()) : now.getMinutes()
    var s =
      now.getSeconds() < 10 ? '0'.concat(now.getSeconds()) : now.getSeconds()
    var nowString = ''
      .concat(year, '-')
      .concat(month, '-')
      .concat(day, ' ')
      .concat(hour, ':')
      .concat(min, ':')
      .concat(s)
    return nowString
  }
  var genUserAgent = function () {
    try {
      var ua = navigator.userAgent.toLocaleLowerCase()
      var re = /(msie|firefox|chrome|opera|version).*?([\d.]+)/
      var m = ua.match(re) || []
      var browser = m[1].replace(/version/, 'safari')
      var ver = m[2]
      return {
        browser: browser,
        ver: ver,
      }
    } catch (error) {
      return null
    }
  }
  var proxyLog = function () {
    var _log = new Proxy(log, {
      get: function (target, prop) {
        var _a, _b
        if (!(prop in target)) {
          return
        }
        var func = target[prop]
        if (
          !['log', 'info', 'warn', 'error', 'trace', 'debug'].includes(prop)
        ) {
          return func
        }
        var prefix = genTime()
        if (genUserAgent()) {
          prefix += '['
            .concat(
              (_a = genUserAgent()) === null || _a === void 0
                ? void 0
                : _a.browser,
              ' '
            )
            .concat(
              (_b = genUserAgent()) === null || _b === void 0 ? void 0 : _b.ver,
              ']'
            )
        }
        prefix +=
          '['.concat(
            {
              log: 'L',
              info: 'I',
              warn: 'W',
              error: 'E',
              trace: 'E',
              debug: 'D',
            }[prop],
            ']'
          ) +
          '['.concat(appName, ']') +
          ':'
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var that = this
        return function () {
          var args = []
          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i]
          }
          if (needStringify) {
            for (var i = 0; i < args.length; i++) {
              if (typeof args[i] === 'object') {
                try {
                  args[i] = JSON.stringify(args[i])
                } catch (_a) {
                  console.warn('[日志打印对象无法序列化]', args[i])
                }
              }
              if (typeof args[i] === 'string') {
                args[i] = sensitiveInfoFilter(args[i])
              }
            }
          }
          return func.apply(that, __spreadArray([prefix], __read(args), false))
        }
      },
    })
    return _log
  }
  var logger = proxyLog()
  if (level) {
    logger.setLevel(level)
  }
  if (storeWindow) {
    // @ts-ignore
    window.__LOGGER__ = logger
  }
  return logger
}
var logDebug$1 = logDebug

var EventPriority
;(function (EventPriority) {
  EventPriority[(EventPriority['LOW'] = 0)] = 'LOW'
  EventPriority[(EventPriority['NORMAL'] = 1)] = 'NORMAL'
  EventPriority[(EventPriority['HIGH'] = 2)] = 'HIGH'
})(EventPriority || (EventPriority = {}))
var ReportEvent = /** @class */ (function () {
  // private _report: XKitReporter
  function ReportEvent(options) {
    // static appInfo: AppInfo
    this.appKey = ''
    this.component = ''
    this.data = {}
    this.framework = ''
    this.version = ''
    this.startTime = 0
    this.endTime = 0
    this.duration = 0
    this.data.startTime = new Date().getTime()
    this.data.timeStamp = this.data.startTime
    this.eventId = options.eventId
    this.priority = options.priority
  }
  ReportEvent.prototype.end = function () {
    // 如果已经end过 不再end
    if (this.data.endTime && this.data.duration) {
      return
    }
    this.data.endTime = this.data.endTime || new Date().getTime()
    this.data.duration =
      this.data.duration || this.data.endTime - this.data.startTime
  }
  ReportEvent.prototype.setAppInfo = function (appInfo) {
    this.appKey = appInfo.appKey
    this.component = appInfo.component
    this.version = appInfo.version
    if (appInfo.framework) {
      this.framework = appInfo.framework
    }
  }
  ReportEvent.prototype.endWith = function (data) {
    var code = data.code,
      msg = data.msg,
      requestId = data.requestId,
      serverCost = data.serverCost
    // 过滤code非number类型
    if (typeof code != 'number') {
      this.data.code = -2
    } else {
      this.data.code = code
    }
    this.data.message = msg
    this.data.requestId = requestId
    this.data.serverCost = serverCost
    this.end()
  }
  ReportEvent.prototype.endWithSuccess = function (data) {
    if (data) {
      var requestId = data.requestId,
        serverCost = data.serverCost
      this.data.requestId = requestId
      this.data.serverCost = serverCost
    }
    this.data.code = 0
    this.data.message = 'success'
    this.end()
  }
  ReportEvent.prototype.endWithFailure = function (data) {
    if (data) {
      var requestId = data.requestId,
        serverCost = data.serverCost
      this.data.requestId = requestId
      this.data.serverCost = serverCost
    }
    this.data.code = -1
    this.data.message = 'failure'
    this.end()
  }
  ReportEvent.prototype.setParams = function (params) {
    this.data.params = __assign({}, params)
    return this
  }
  ReportEvent.prototype.addParams = function (params) {
    this.data.params = __assign(__assign({}, this.data.params), params)
    return this
  }
  ReportEvent.prototype.setData = function (data) {
    this.data = __assign(__assign({}, this.data), data)
  }
  ReportEvent.prototype.setUserId = function (userId) {
    this.data.userId = userId
  }
  return ReportEvent
})()
var EventStep = /** @class */ (function (_super) {
  __extends(EventStep, _super)
  function EventStep(options) {
    return _super.call(this, options) || this
  }
  return EventStep
})(ReportEvent)
var IntervalEvent = /** @class */ (function (_super) {
  __extends(IntervalEvent, _super)
  function IntervalEvent(options) {
    var _this = _super.call(this, options) || this
    _this._stepMap = new Map()
    return _this
  }
  IntervalEvent.prototype.beginStep = function (name) {
    if (this._stepMap.has(name)) {
      return this._stepMap[name]
    }
    var step = new EventStep({ eventId: name, priority: this.priority })
    step.setData({ step: name })
    this._stepMap.set(name, step)
    return step
  }
  IntervalEvent.prototype.addStep = function (data) {
    this._stepMap.set(data.eventId, data)
  }
  IntervalEvent.prototype.removeStep = function (eventId) {
    this._stepMap.delete(eventId)
  }
  IntervalEvent.prototype.endWith = function (data) {
    _super.prototype.endWith.call(this, data)
    this.end()
  }
  IntervalEvent.prototype.endWithSuccess = function (data) {
    _super.prototype.endWithSuccess.call(this, data)
    this.end()
  }
  IntervalEvent.prototype.endWithFailure = function (data) {
    _super.prototype.endWithFailure.call(this, data)
    this.end()
  }
  IntervalEvent.prototype.end = function () {
    var e_1, _a
    var steps = []
    _super.prototype.end.call(this)
    try {
      for (
        var _b = __values(this._stepMap.values()), _c = _b.next();
        !_c.done;
        _c = _b.next()
      ) {
        var step = _c.value
        // step.end()
        step.data.index = steps.length
        steps.push(step.data)
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 }
    } finally {
      try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b)
      } finally {
        if (e_1) throw e_1.error
      }
    }
    if (steps.length > 0) {
      this.data.steps = steps
    }
  }
  return IntervalEvent
})(EventStep)

/**
 * 异步频率控制
 * 一段时间内只请求一次，多余的用这一次执行的结果做为结果
 * @param fn
 * @param delay
 */
var frequencyControl = function (fn, delay) {
  var queue = []
  var last = 0
  var timer
  return function () {
    var _this = this
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    return new Promise(function (resolve, reject) {
      queue.push({ resolve: resolve, reject: reject })
      var cur = Date.now()
      var consumer = function (success, res) {
        while (queue.length) {
          var _a = queue.shift(),
            resolve_1 = _a.resolve,
            reject_1 = _a.reject
          success ? resolve_1(res) : reject_1(res)
        }
      }
      var excute = function () {
        last = cur
        if (!queue.length) return
        // @ts-ignore
        fn.apply(_this, args).then(
          function (res) {
            consumer(true, res)
          },
          function (err) {
            consumer(false, err)
          }
        )
      }
      if (cur - last > delay) {
        excute()
      } else {
        clearTimeout(timer)
        timer = setTimeout(function () {
          excute()
        }, delay)
      }
    })
  }
}
function getFileType(filename) {
  var fileMap = {
    img: /(png|gif|jpg)/i,
    pdf: /pdf$/i,
    word: /(doc|docx)$/i,
    excel: /(xls|xlsx)$/i,
    ppt: /(ppt|pptx)$/i,
    zip: /(zip|rar|7z)$/i,
    audio: /(mp3|wav|wmv)$/i,
    video: /(mp4|mkv|rmvb|wmv|avi|flv|mov)$/i,
  }
  return (
    Object.keys(fileMap).find(function (type) {
      return fileMap[type].test(filename)
    }) || ''
  )
}
/**
 * 解析输入的文件大小
 * @param size 文件大小，单位b
 * @param level 递归等级，对应fileSizeMap
 */
var parseFileSize = function (size, level) {
  if (level === void 0) {
    level = 0
  }
  var fileSizeMap = {
    0: 'B',
    1: 'KB',
    2: 'MB',
    3: 'GB',
    4: 'TB',
  }
  var handler = function (size, level) {
    if (level >= Object.keys(fileSizeMap).length) {
      return 'the file is too big'
    }
    if (size < 1024) {
      return ''.concat(size).concat(fileSizeMap[level])
    }
    return handler(Math.round(size / 1024), level + 1)
  }
  return handler(size, level)
}
var addUrlSearch = function (url, search) {
  var urlObj = new URL(url)
  urlObj.search += (urlObj.search.startsWith('?') ? '&' : '?') + search
  return urlObj.href
}
function debounce(fn, wait) {
  var timer = null
  return function () {
    var _this = this
    var args = []
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i]
    }
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(function () {
      // @ts-ignore
      fn.apply(_this, args)
    }, wait)
  }
}
function getOperatingSystem() {
  try {
    var userAgent = navigator.userAgent
    if (userAgent.includes('Windows')) {
      return 'Windows'
    } else if (userAgent.includes('Mac OS')) {
      return 'Mac OS'
    } else if (userAgent.includes('Linux')) {
      return 'Linux'
    } else if (userAgent.includes('Android')) {
      return 'Android'
    } else if (userAgent.includes('iOS')) {
      return 'iOS'
    } else {
      return 'Unknown'
    }
  } catch (_a) {
    return 'Unknown'
  }
}
function getBrowserInfo() {
  var browserName = 'Unknown'
  var browserVersion = ''
  try {
    var userAgent = navigator.userAgent
    // 判断是否为Chrome浏览器
    if (userAgent.indexOf('Chrome') !== -1) {
      browserName = 'Chrome'
      var start = userAgent.indexOf('Chrome') + 7
      var end = userAgent.indexOf(' ', start)
      browserVersion = userAgent.substring(start, end)
    }
    // 判断是否为Firefox浏览器
    else if (userAgent.indexOf('Firefox') !== -1) {
      browserName = 'Firefox'
      var start = userAgent.indexOf('Firefox') + 8
      browserVersion = userAgent.substring(start)
    }
    // 判断是否为Safari浏览器
    else if (userAgent.indexOf('Safari') !== -1) {
      browserName = 'Safari'
      var start = userAgent.indexOf('Version') + 8
      var end = userAgent.indexOf(' ', start)
      browserVersion = userAgent.substring(start, end)
    }
    // 判断是否为Edge浏览器
    else if (userAgent.indexOf('Edg') !== -1) {
      browserName = 'Edge'
      var start = userAgent.indexOf('Edg') + 4
      browserVersion = userAgent.substring(start)
    }
    // 判断是否为IE浏览器（IE11及以下版本）
    else if (userAgent.indexOf('MSIE') !== -1) {
      browserName = 'Internet Explorer'
      var start = userAgent.indexOf('MSIE') + 5
      var end = userAgent.indexOf(';', start)
      browserVersion = userAgent.substring(start, end)
    }
  } catch (error) {
    console.error('getBrowserInfo error:', error)
  }
  return {
    name: browserName,
    version: browserVersion,
  }
}

var url = 'https://statistic.live.126.net/statics/report/common/form'
var HEADER_VALUE_SDK_TYPE = 'NEXKitStatistics'
var HEADER_VALUE_REPORTER_VERSION = '1.0.0'
var HEADER_VALUE_CONTENT_TYPE = 'application/json;charset=utf-8'
var EVENT_REPORT_INTERVAL = 5000
var MAX_EVENT_CACHE_SIZE = 100
var LOW_PRIORITY_RETRY = 0
var NORMAL_PRIORITY_RETRY = 2
var HIGH_PRIORITY_RETRY = 5
var MAX_RETRY_COUNT = 3
var XKitReporter = /** @class */ (function () {
  function XKitReporter(options) {
    this._eventsCache = []
    this._noReport = false // 是否上报数据
    this._configMap = new Map()
    this._retryCount = 0
    var browserInfo = getBrowserInfo()
    var appInfo = window.__XKitReporter__
    var userAgent = ''
    try {
      userAgent = navigator.userAgent
    } catch (_a) {
      console.log('navigator is not defined')
    }
    this.common = {
      imVersion: options.imVersion,
      nertcVersion: options.nertcVersion,
      platform: 'Web',
      osVer: browserInfo.version,
      userAgent: userAgent,
      manufacturer: '',
      model: browserInfo.name,
      packageId:
        (appInfo === null || appInfo === void 0 ? void 0 : appInfo.packageId) ||
        '',
      appVer:
        (appInfo === null || appInfo === void 0 ? void 0 : appInfo.appVer) ||
        '',
      appName:
        (appInfo === null || appInfo === void 0 ? void 0 : appInfo.appName) ||
        '',
      deviceId: options.deviceId,
    }
    this._logger = logDebug$1({
      level: 'debug',
      appName: 'XKitReporter',
      version: '2.0.0',
    })
  }
  XKitReporter.prototype.getConfig = function (appKey) {
    return __awaiter(this, void 0, void 0, function () {
      var _this = this
      return __generator(this, function (_a) {
        return [
          2 /*return*/,
          axios({
            method: 'GET',
            url: 'https://yiyong.netease.im/report_conf',
            headers: {
              platform: 'web',
              appKey: appKey,
            },
          })
            .then(function (res) {
              _this._configMap.set(appKey, res.data)
            })
            .catch(function () {
              _this._retryCount += 1
              if (_this._retryCount > MAX_RETRY_COUNT) {
                _this._retryCount = 0
                return
              }
              _this.getConfig(appKey)
            }),
        ]
      })
    })
  }
  XKitReporter.prototype.setNoReport = function (noReport) {
    this._noReport = noReport
  }
  XKitReporter.prototype.reportEvent = function (event, options) {
    // 如果禁止上包则返回
    if (this._noReport) {
      return
    }
    if (this._eventsCache.length >= MAX_EVENT_CACHE_SIZE) {
      this._evictEvent(event)
    } else {
      this._eventsCache.push(event)
    }
    this._scheduleReportEventsTask(
      options === null || options === void 0 ? void 0 : options.immediate
    )
  }
  XKitReporter.prototype._evictEvent = function (event) {
    var index = this._eventsCache.findIndex(function (item) {
      return item.priority < event.priority
    })
    this._eventsCache.push(event)
    if (index !== -1) {
      this._evictEvent(this._eventsCache[index])
    } else {
      this._logger.debug('Full event cache, evict event:', event)
      this._eventsCache = this._eventsCache.filter(function (item) {
        return item !== event
      })
    }
  }
  XKitReporter.prototype._scheduleReportEventsTask = function (immediate) {
    var _this = this
    if (immediate === void 0) {
      immediate = false
    }
    var execute = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var groupByAppKey, _a, _b, _i, appKey, config
        return __generator(this, function (_c) {
          switch (_c.label) {
            case 0:
              groupByAppKey = this._eventsCache.reduce(function (acc, obj) {
                var key = obj.appKey
                if (!acc[key]) {
                  acc[key] = []
                }
                acc[key].push(obj)
                return acc
              }, {})
              _a = []
              for (_b in groupByAppKey) _a.push(_b)
              _i = 0
              _c.label = 1
            case 1:
              if (!(_i < _a.length)) return [3 /*break*/, 5]
              appKey = _a[_i]
              if (!!this._configMap.has(appKey)) return [3 /*break*/, 3]
              return [4 /*yield*/, this.getConfig(appKey)]
            case 2:
              _c.sent()
              _c.label = 3
            case 3:
              if (this._configMap.has(appKey)) {
                config = this._configMap.get(appKey)
                if (
                  !(config === null || config === void 0
                    ? void 0
                    : config.enabled)
                ) {
                  return [2 /*return*/]
                }
              }
              this._reportEventsToServer(appKey, groupByAppKey[appKey])
              _c.label = 4
            case 4:
              _i++
              return [3 /*break*/, 1]
            case 5:
              this._eventsCache = []
              return [2 /*return*/]
          }
        })
      })
    }
    if (immediate) {
      execute()
    }
    if (this._queueTimer) {
      return
    }
    this._queueTimer = setInterval(function () {
      if (_this._eventsCache.length === 0) {
        _this._queueTimer && clearInterval(_this._queueTimer)
        _this._queueTimer = undefined
        return
      }
      execute()
    }, EVENT_REPORT_INTERVAL)
  }
  XKitReporter.prototype._determineMaxRetry = function (events) {
    var e_1, _a
    var retry = LOW_PRIORITY_RETRY
    try {
      for (
        var events_1 = __values(events), events_1_1 = events_1.next();
        !events_1_1.done;
        events_1_1 = events_1.next()
      ) {
        var event_1 = events_1_1.value
        if (event_1.priority === EventPriority.HIGH) {
          retry = HIGH_PRIORITY_RETRY
          break
        }
        if (event_1.priority === EventPriority.NORMAL) {
          retry = NORMAL_PRIORITY_RETRY
        }
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 }
    } finally {
      try {
        if (events_1_1 && !events_1_1.done && (_a = events_1.return))
          _a.call(events_1)
      } finally {
        if (e_1) throw e_1.error
      }
    }
    return retry
  }
  XKitReporter.prototype._reportEventsToServer = function (appKey, events) {
    return __awaiter(this, void 0, void 0, function () {
      var config, groupByEventId, maxRetry, retry, data, networkRequest
      var _this = this
      return __generator(this, function (_a) {
        if (!this._configMap.has(appKey)) {
          return [2 /*return*/]
        }
        config = this._configMap.get(appKey)
        groupByEventId = events.reduce(function (acc, obj) {
          var _a, _b, _c, _d
          if (
            ((_a =
              config === null || config === void 0
                ? void 0
                : config.blacklist) === null || _a === void 0
              ? void 0
              : _a.length) > 0 &&
            ((_b =
              config === null || config === void 0
                ? void 0
                : config.blacklist) === null || _b === void 0
              ? void 0
              : _b.includes(obj.component))
          ) {
            return acc
          }
          //blacklist 不包含A，whitelist 为空 ： 允许 A 上报
          if (
            ((_c =
              config === null || config === void 0
                ? void 0
                : config.whitelist) === null || _c === void 0
              ? void 0
              : _c.length) > 0 &&
            !((_d =
              config === null || config === void 0
                ? void 0
                : config.whitelist) === null || _d === void 0
              ? void 0
              : _d.includes(obj.component))
          ) {
            return acc
          }
          var key = obj.eventId
          if (!acc[key]) {
            acc[key] = []
          }
          acc[key].push(
            __assign(__assign({}, obj.data), {
              appKey: obj.appKey,
              component: obj.component,
              version: obj.version,
              framework: obj.framework,
            })
          )
          return acc
        }, {})
        maxRetry = this._determineMaxRetry(events)
        retry = 0
        data = {
          common: this.common,
          event: groupByEventId,
        }
        networkRequest = function () {
          request({
            method: 'POST',
            url: url,
            headers: {
              appkey: appKey,
              sdktype: HEADER_VALUE_SDK_TYPE,
              ver: HEADER_VALUE_REPORTER_VERSION,
              'Content-Type': HEADER_VALUE_CONTENT_TYPE,
            },
            data: data,
          }).catch(function () {
            if (retry <= maxRetry) {
              setTimeout(networkRequest, 2000 * retry)
            } else {
              _this._logger.debug(
                'Failed to report events to server after '.concat(
                  retry,
                  ' retries.'
                ),
                data
              )
            }
            retry++
          })
        }
        networkRequest()
        return [2 /*return*/]
      })
    })
  }
  XKitReporter.setAppInfo = function (info) {
    window.__XKitReporter__ = {
      packageId: info === null || info === void 0 ? void 0 : info.packageId,
      appName: info === null || info === void 0 ? void 0 : info.appName,
      appVer: info === null || info === void 0 ? void 0 : info.appVer,
    }
  }
  XKitReporter.getInstance = function (options) {
    if (!options) {
      if (!this.instance) {
        throw new Error('XKitReporter not initialized')
      }
      return this.instance
    }
    if (!this.instance) {
      this.instance = new XKitReporter(options)
    }
    return this.instance
  }
  return XKitReporter
})()
var XKitReporter$1 = XKitReporter

export {
  EventPriority,
  EventStep,
  EventTracking$1 as EventTracking,
  IntervalEvent,
  ReportEvent,
  index as Storage,
  VisibilityObserver$1 as VisibilityObserver,
  XKitReporter$1 as XKitReporter,
  addUrlSearch,
  createLoggerDecorator,
  debounce,
  frequencyControl,
  getBrowserInfo,
  getFileType,
  getOperatingSystem,
  logDebug$1 as logDebug,
  parseFileSize,
  request,
}
