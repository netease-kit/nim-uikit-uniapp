/*! For license information please see esmNim.js.LICENSE.txt */
var e = {
  d: (t, i) => {
    for (var r in i)
      e.o(i, r) &&
        !e.o(t, r) &&
        Object.defineProperty(t, r, { enumerable: !0, get: i[r] })
  },
}
;(e.g = (function () {
  if ('object' == typeof globalThis) return globalThis
  try {
    return this || new Function('return this')()
  } catch (e) {
    if ('object' == typeof window) return window
  }
})()),
  (e.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t))
var t = {}
e.d(t, { p: () => sc, K: () => pe })
var i =
  'undefined' != typeof globalThis
    ? globalThis
    : 'undefined' != typeof window
    ? window
    : void 0 !== e.g
    ? e.g
    : 'undefined' != typeof self
    ? self
    : {}
function r(e) {
  var t = { exports: {} }
  return e(t, t.exports), t.exports
}
var s,
  n,
  o,
  a,
  c,
  d,
  l,
  p,
  h,
  u,
  m,
  g,
  v,
  f,
  y,
  I,
  M,
  _,
  E,
  T,
  S,
  C,
  N,
  A,
  R,
  O,
  b,
  k,
  V,
  P,
  L,
  D,
  w,
  U,
  x,
  F,
  B,
  $,
  G,
  j,
  q,
  H,
  Y,
  K,
  W,
  J,
  z,
  X,
  Q,
  Z,
  ee,
  te,
  ie,
  re,
  se,
  ne = r(function (e) {
    var t = Object.prototype.hasOwnProperty,
      i = '~'
    function r() {}
    function s(e, t, i) {
      ;(this.fn = e), (this.context = t), (this.once = i || !1)
    }
    function n(e, t, r, n, o) {
      if ('function' != typeof r)
        throw new TypeError('The listener must be a function')
      var a = new s(r, n || e, o),
        c = i ? i + t : t
      return (
        e._events[c]
          ? e._events[c].fn
            ? (e._events[c] = [e._events[c], a])
            : e._events[c].push(a)
          : ((e._events[c] = a), e._eventsCount++),
        e
      )
    }
    function o(e, t) {
      0 == --e._eventsCount ? (e._events = new r()) : delete e._events[t]
    }
    function a() {
      ;(this._events = new r()), (this._eventsCount = 0)
    }
    Object.create &&
      ((r.prototype = Object.create(null)), new r().__proto__ || (i = !1)),
      (a.prototype.eventNames = function () {
        var e,
          r,
          s = []
        if (0 === this._eventsCount) return s
        for (r in (e = this._events)) t.call(e, r) && s.push(i ? r.slice(1) : r)
        return Object.getOwnPropertySymbols
          ? s.concat(Object.getOwnPropertySymbols(e))
          : s
      }),
      (a.prototype.listeners = function (e) {
        var t = i ? i + e : e,
          r = this._events[t]
        if (!r) return []
        if (r.fn) return [r.fn]
        for (var s = 0, n = r.length, o = new Array(n); s < n; s++)
          o[s] = r[s].fn
        return o
      }),
      (a.prototype.listenerCount = function (e) {
        var t = i ? i + e : e,
          r = this._events[t]
        return r ? (r.fn ? 1 : r.length) : 0
      }),
      (a.prototype.emit = function (e, t, r, s, n, o) {
        var a = i ? i + e : e
        if (!this._events[a]) return !1
        var c,
          d,
          l = this._events[a],
          p = arguments.length
        if (l.fn) {
          switch ((l.once && this.removeListener(e, l.fn, void 0, !0), p)) {
            case 1:
              return l.fn.call(l.context), !0
            case 2:
              return l.fn.call(l.context, t), !0
            case 3:
              return l.fn.call(l.context, t, r), !0
            case 4:
              return l.fn.call(l.context, t, r, s), !0
            case 5:
              return l.fn.call(l.context, t, r, s, n), !0
            case 6:
              return l.fn.call(l.context, t, r, s, n, o), !0
          }
          for (d = 1, c = new Array(p - 1); d < p; d++) c[d - 1] = arguments[d]
          l.fn.apply(l.context, c)
        } else {
          var h,
            u = l.length
          for (d = 0; d < u; d++)
            switch (
              (l[d].once && this.removeListener(e, l[d].fn, void 0, !0), p)
            ) {
              case 1:
                l[d].fn.call(l[d].context)
                break
              case 2:
                l[d].fn.call(l[d].context, t)
                break
              case 3:
                l[d].fn.call(l[d].context, t, r)
                break
              case 4:
                l[d].fn.call(l[d].context, t, r, s)
                break
              default:
                if (!c)
                  for (h = 1, c = new Array(p - 1); h < p; h++)
                    c[h - 1] = arguments[h]
                l[d].fn.apply(l[d].context, c)
            }
        }
        return !0
      }),
      (a.prototype.on = function (e, t, i) {
        return n(this, e, t, i, !1)
      }),
      (a.prototype.once = function (e, t, i) {
        return n(this, e, t, i, !0)
      }),
      (a.prototype.removeListener = function (e, t, r, s) {
        var n = i ? i + e : e
        if (!this._events[n]) return this
        if (!t) return o(this, n), this
        var a = this._events[n]
        if (a.fn)
          a.fn !== t || (s && !a.once) || (r && a.context !== r) || o(this, n)
        else {
          for (var c = 0, d = [], l = a.length; c < l; c++)
            (a[c].fn !== t || (s && !a[c].once) || (r && a[c].context !== r)) &&
              d.push(a[c])
          d.length ? (this._events[n] = 1 === d.length ? d[0] : d) : o(this, n)
        }
        return this
      }),
      (a.prototype.removeAllListeners = function (e) {
        var t
        return (
          e
            ? ((t = i ? i + e : e), this._events[t] && o(this, t))
            : ((this._events = new r()), (this._eventsCount = 0)),
          this
        )
      }),
      (a.prototype.off = a.prototype.removeListener),
      (a.prototype.addListener = a.prototype.on),
      (a.prefixed = i),
      (a.EventEmitter = a),
      (e.exports = a)
  }),
  oe = r(function (e, t) {
    e.exports = (function () {
      function e() {
        e = function () {
          return t
        }
        var t = {},
          i = Object.prototype,
          r = i.hasOwnProperty,
          s = 'function' == typeof Symbol ? Symbol : {},
          n = s.iterator || '@@iterator',
          o = s.asyncIterator || '@@asyncIterator',
          a = s.toStringTag || '@@toStringTag'
        function c(e, t, i) {
          return (
            Object.defineProperty(e, t, {
              value: i,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            }),
            e[t]
          )
        }
        try {
          c({}, '')
        } catch (t) {
          c = function (e, t, i) {
            return (e[t] = i)
          }
        }
        function d(e, t, i, r) {
          var s = t && t.prototype instanceof h ? t : h,
            n = Object.create(s.prototype),
            o = new S(r || [])
          return (
            (n._invoke = (function (e, t, i) {
              var r = 'suspendedStart'
              return function (s, n) {
                if ('executing' === r)
                  throw new Error('Generator is already running')
                if ('completed' === r) {
                  if ('throw' === s) throw n
                  return { value: void 0, done: !0 }
                }
                for (i.method = s, i.arg = n; ; ) {
                  var o = i.delegate
                  if (o) {
                    var a = _(o, i)
                    if (a) {
                      if (a === p) continue
                      return a
                    }
                  }
                  if ('next' === i.method) i.sent = i._sent = i.arg
                  else if ('throw' === i.method) {
                    if ('suspendedStart' === r) throw ((r = 'completed'), i.arg)
                    i.dispatchException(i.arg)
                  } else 'return' === i.method && i.abrupt('return', i.arg)
                  r = 'executing'
                  var c = l(e, t, i)
                  if ('normal' === c.type) {
                    if (
                      ((r = i.done ? 'completed' : 'suspendedYield'),
                      c.arg === p)
                    )
                      continue
                    return { value: c.arg, done: i.done }
                  }
                  'throw' === c.type &&
                    ((r = 'completed'), (i.method = 'throw'), (i.arg = c.arg))
                }
              }
            })(e, i, o)),
            n
          )
        }
        function l(e, t, i) {
          try {
            return { type: 'normal', arg: e.call(t, i) }
          } catch (e) {
            return { type: 'throw', arg: e }
          }
        }
        t.wrap = d
        var p = {}
        function h() {}
        function u() {}
        function m() {}
        var g = {}
        c(g, n, function () {
          return this
        })
        var v = Object.getPrototypeOf,
          f = v && v(v(C([])))
        f && f !== i && r.call(f, n) && (g = f)
        var y = (m.prototype = h.prototype = Object.create(g))
        function I(e) {
          ;['next', 'throw', 'return'].forEach(function (t) {
            c(e, t, function (e) {
              return this._invoke(t, e)
            })
          })
        }
        function M(e, t) {
          function i(s, n, o, a) {
            var c = l(e[s], e, n)
            if ('throw' !== c.type) {
              var d = c.arg,
                p = d.value
              return p && 'object' == typeof p && r.call(p, '__await')
                ? t.resolve(p.__await).then(
                    function (e) {
                      i('next', e, o, a)
                    },
                    function (e) {
                      i('throw', e, o, a)
                    }
                  )
                : t.resolve(p).then(
                    function (e) {
                      ;(d.value = e), o(d)
                    },
                    function (e) {
                      return i('throw', e, o, a)
                    }
                  )
            }
            a(c.arg)
          }
          var s
          this._invoke = function (e, r) {
            function n() {
              return new t(function (t, s) {
                i(e, r, t, s)
              })
            }
            return (s = s ? s.then(n, n) : n())
          }
        }
        function _(e, t) {
          var i = e.iterator[t.method]
          if (void 0 === i) {
            if (((t.delegate = null), 'throw' === t.method)) {
              if (
                e.iterator.return &&
                ((t.method = 'return'),
                (t.arg = void 0),
                _(e, t),
                'throw' === t.method)
              )
                return p
              ;(t.method = 'throw'),
                (t.arg = new TypeError(
                  "The iterator does not provide a 'throw' method"
                ))
            }
            return p
          }
          var r = l(i, e.iterator, t.arg)
          if ('throw' === r.type)
            return (t.method = 'throw'), (t.arg = r.arg), (t.delegate = null), p
          var s = r.arg
          return s
            ? s.done
              ? ((t[e.resultName] = s.value),
                (t.next = e.nextLoc),
                'return' !== t.method &&
                  ((t.method = 'next'), (t.arg = void 0)),
                (t.delegate = null),
                p)
              : s
            : ((t.method = 'throw'),
              (t.arg = new TypeError('iterator result is not an object')),
              (t.delegate = null),
              p)
        }
        function E(e) {
          var t = { tryLoc: e[0] }
          1 in e && (t.catchLoc = e[1]),
            2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
            this.tryEntries.push(t)
        }
        function T(e) {
          var t = e.completion || {}
          ;(t.type = 'normal'), delete t.arg, (e.completion = t)
        }
        function S(e) {
          ;(this.tryEntries = [{ tryLoc: 'root' }]),
            e.forEach(E, this),
            this.reset(!0)
        }
        function C(e) {
          if (e) {
            var t = e[n]
            if (t) return t.call(e)
            if ('function' == typeof e.next) return e
            if (!isNaN(e.length)) {
              var i = -1,
                s = function t() {
                  for (; ++i < e.length; )
                    if (r.call(e, i)) return (t.value = e[i]), (t.done = !1), t
                  return (t.value = void 0), (t.done = !0), t
                }
              return (s.next = s)
            }
          }
          return { next: N }
        }
        function N() {
          return { value: void 0, done: !0 }
        }
        return (
          (u.prototype = m),
          c(y, 'constructor', m),
          c(m, 'constructor', u),
          (u.displayName = c(m, a, 'GeneratorFunction')),
          (t.isGeneratorFunction = function (e) {
            var t = 'function' == typeof e && e.constructor
            return (
              !!t &&
              (t === u || 'GeneratorFunction' === (t.displayName || t.name))
            )
          }),
          (t.mark = function (e) {
            return (
              Object.setPrototypeOf
                ? Object.setPrototypeOf(e, m)
                : ((e.__proto__ = m), c(e, a, 'GeneratorFunction')),
              (e.prototype = Object.create(y)),
              e
            )
          }),
          (t.awrap = function (e) {
            return { __await: e }
          }),
          I(M.prototype),
          c(M.prototype, o, function () {
            return this
          }),
          (t.AsyncIterator = M),
          (t.async = function (e, i, r, s, n) {
            void 0 === n && (n = Promise)
            var o = new M(d(e, i, r, s), n)
            return t.isGeneratorFunction(i)
              ? o
              : o.next().then(function (e) {
                  return e.done ? e.value : o.next()
                })
          }),
          I(y),
          c(y, a, 'Generator'),
          c(y, n, function () {
            return this
          }),
          c(y, 'toString', function () {
            return '[object Generator]'
          }),
          (t.keys = function (e) {
            var t = []
            for (var i in e) t.push(i)
            return (
              t.reverse(),
              function i() {
                for (; t.length; ) {
                  var r = t.pop()
                  if (r in e) return (i.value = r), (i.done = !1), i
                }
                return (i.done = !0), i
              }
            )
          }),
          (t.values = C),
          (S.prototype = {
            constructor: S,
            reset: function (e) {
              if (
                ((this.prev = 0),
                (this.next = 0),
                (this.sent = this._sent = void 0),
                (this.done = !1),
                (this.delegate = null),
                (this.method = 'next'),
                (this.arg = void 0),
                this.tryEntries.forEach(T),
                !e)
              )
                for (var t in this)
                  't' === t.charAt(0) &&
                    r.call(this, t) &&
                    !isNaN(+t.slice(1)) &&
                    (this[t] = void 0)
            },
            stop: function () {
              this.done = !0
              var e = this.tryEntries[0].completion
              if ('throw' === e.type) throw e.arg
              return this.rval
            },
            dispatchException: function (e) {
              if (this.done) throw e
              var t = this
              function i(i, r) {
                return (
                  (o.type = 'throw'),
                  (o.arg = e),
                  (t.next = i),
                  r && ((t.method = 'next'), (t.arg = void 0)),
                  !!r
                )
              }
              for (var s = this.tryEntries.length - 1; s >= 0; --s) {
                var n = this.tryEntries[s],
                  o = n.completion
                if ('root' === n.tryLoc) return i('end')
                if (n.tryLoc <= this.prev) {
                  var a = r.call(n, 'catchLoc'),
                    c = r.call(n, 'finallyLoc')
                  if (a && c) {
                    if (this.prev < n.catchLoc) return i(n.catchLoc, !0)
                    if (this.prev < n.finallyLoc) return i(n.finallyLoc)
                  } else if (a) {
                    if (this.prev < n.catchLoc) return i(n.catchLoc, !0)
                  } else {
                    if (!c)
                      throw new Error('try statement without catch or finally')
                    if (this.prev < n.finallyLoc) return i(n.finallyLoc)
                  }
                }
              }
            },
            abrupt: function (e, t) {
              for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                var s = this.tryEntries[i]
                if (
                  s.tryLoc <= this.prev &&
                  r.call(s, 'finallyLoc') &&
                  this.prev < s.finallyLoc
                ) {
                  var n = s
                  break
                }
              }
              n &&
                ('break' === e || 'continue' === e) &&
                n.tryLoc <= t &&
                t <= n.finallyLoc &&
                (n = null)
              var o = n ? n.completion : {}
              return (
                (o.type = e),
                (o.arg = t),
                n
                  ? ((this.method = 'next'), (this.next = n.finallyLoc), p)
                  : this.complete(o)
              )
            },
            complete: function (e, t) {
              if ('throw' === e.type) throw e.arg
              return (
                'break' === e.type || 'continue' === e.type
                  ? (this.next = e.arg)
                  : 'return' === e.type
                  ? ((this.rval = this.arg = e.arg),
                    (this.method = 'return'),
                    (this.next = 'end'))
                  : 'normal' === e.type && t && (this.next = t),
                p
              )
            },
            finish: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var i = this.tryEntries[t]
                if (i.finallyLoc === e)
                  return this.complete(i.completion, i.afterLoc), T(i), p
              }
            },
            catch: function (e) {
              for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                var i = this.tryEntries[t]
                if (i.tryLoc === e) {
                  var r = i.completion
                  if ('throw' === r.type) {
                    var s = r.arg
                    T(i)
                  }
                  return s
                }
              }
              throw new Error('illegal catch attempt')
            },
            delegateYield: function (e, t, i) {
              return (
                (this.delegate = { iterator: C(e), resultName: t, nextLoc: i }),
                'next' === this.method && (this.arg = void 0),
                p
              )
            },
          }),
          t
        )
      }
      function t(e) {
        return (
          (t =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e
                }),
          t(e)
        )
      }
      function i(e, t) {
        for (var i = 0; i < t.length; i++) {
          var r = t[i]
          ;(r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r)
        }
      }
      var r = {
          isDataReportEnable: !0,
          maxSize: 100,
          msgListMaxSize: 1e3,
          cacheMaxSize: 1e3,
          maxDelay: 3e5,
          maxInterval: 3e4,
          minInterval: 1e4,
          timeout: 5e3,
          autoStart: !0,
          loginFailIgnoreInterval: 72e5,
        },
        s = function () {},
        n = (function () {
          function n(e) {
            ;(function (e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function')
            })(this, n),
              (this.isUploadEnable = !0),
              (this.serverAllowUpload = !1),
              (this.initConfigLoaded = !1),
              (this.loading = !1),
              (this.isDestroyed = !1),
              (this.reportConfig = r),
              (this.configPath = 'dispatcher/req'),
              (this.dataReportPath = 'statics/report/common/form'),
              (this.traceMsgCache = {}),
              (this.reqRetryCount = 0),
              (this.highPriorityMsgList = []),
              (this.msgList = []),
              (this.lowPriorityMsgList = []),
              (this.cacheMsgList = []),
              (this.lastReportTime = Date.now()),
              (this.timer = null),
              (this.endedAsyncMsgByModule = {}),
              (this.lastFailLogin = {}),
              this.setConfig(e),
              this.reportConfig.isDataReportEnable &&
                this.reportConfig.autoStart &&
                this.initUploadConfig()
          }
          return (
            (function (e, t, r) {
              t && i(e.prototype, t),
                Object.defineProperty(e, 'prototype', { writable: !1 })
            })(n, [
              {
                key: 'setConfig',
                value: function (e) {
                  var t = Object.assign({}, this.reportConfig.common, e.common)
                  ;(this.reportConfig = Object.assign(
                    {},
                    this.reportConfig,
                    e
                  )),
                    (this.reportConfig.common = t),
                    this.reportConfig.common.sdk_type ||
                      (this.reportConfig.common.sdk_type = 'im')
                },
              },
              {
                key: 'reportImmediately',
                value: function (e, t) {
                  var i = this
                  this.reportConfig.isDataReportEnable &&
                    this.reportConfig
                      .request(
                        e,
                        Object.assign(
                          {
                            dataType: 'json',
                            method: 'POST',
                            timeout: this.reportConfig.timeout,
                          },
                          t
                        )
                      )
                      .catch(function (e) {
                        var t, r
                        null ===
                          (r =
                            null === (t = i.reportConfig) || void 0 === t
                              ? void 0
                              : t.logger) ||
                          void 0 === r ||
                          r.warn('Reporter immediately upload failed', e)
                      })
                },
              },
              {
                key: 'report',
                value: function (e, t) {
                  var i =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : {}
                  if (
                    (i.priority || (i.priority = this.getEventPriority(e, t)),
                    this.reportConfig.isDataReportEnable && e)
                  ) {
                    if ('login' === e && !1 === t.succeed && t.process_id) {
                      var s =
                          t.extension &&
                          t.extension.find(function (e) {
                            return 'TCP' === e.operation_type
                          }),
                        n = (s && s.target) || '',
                        o = t.process_id + n,
                        a = this.lastFailLogin[o] || 0
                      if (t.start_time - a < r.loginFailIgnoreInterval) return
                      this.lastFailLogin[o] = t.start_time
                    }
                    var c = Date.now()
                    'HIGH' === i.priority
                      ? this.highPriorityMsgList.push({
                          module: e,
                          msg: t,
                          createTime: c,
                        })
                      : 'NORMAL' === i.priority
                      ? this.msgList.push({ module: e, msg: t, createTime: c })
                      : 'LOW' === i.priority &&
                        this.lowPriorityMsgList.push({
                          module: e,
                          msg: t,
                          createTime: c,
                        }),
                      this.highPriorityMsgList.length >
                        this.reportConfig.msgListMaxSize &&
                        this.highPriorityMsgList.shift(),
                      this.msgList.length > this.reportConfig.msgListMaxSize &&
                        this.msgList.shift(),
                      this.lowPriorityMsgList.length >
                        this.reportConfig.msgListMaxSize &&
                        this.lowPriorityMsgList.shift(),
                      this.doReport()
                  }
                },
              },
              {
                key: 'reportTraceStart',
                value: function (e, t) {
                  if (
                    this.reportConfig.isDataReportEnable &&
                    e &&
                    !this.traceMsgCache[e]
                  ) {
                    var i = Object.assign(
                      Object.assign({ start_time: Date.now() }, t),
                      { extension: [] }
                    )
                    this.traceMsgCache[e] = i
                  }
                },
              },
              { key: 'reportTraceUpdate', value: function (e) {} },
              {
                key: 'reportTraceUpdateV2',
                value: function (e, t, i) {
                  var r,
                    s = this
                  if (
                    this.reportConfig.isDataReportEnable &&
                    this.traceMsgCache[e]
                  ) {
                    var n = this.traceMsgCache[e].extension,
                      o = n.length,
                      a = new Date().getTime()
                    0 === o
                      ? (t.duration = a - this.traceMsgCache[e].start_time)
                      : n[o - 1].end_time
                      ? (t.duration = a - n[o - 1].end_time)
                      : (t.duration = a - this.traceMsgCache[e].start_time),
                      n.push(Object.assign({ end_time: a }, t))
                    var c = n.length - 1
                    ;(null == i ? void 0 : i.asyncParams) &&
                      ((r = this.traceMsgCache[e]).asyncPromiseArray ||
                        (r.asyncPromiseArray = []),
                      this.traceMsgCache[e].asyncPromiseArray.push(
                        i.asyncParams.then(function (t) {
                          s.traceMsgCache[e] &&
                            s.traceMsgCache[e].extension[c] &&
                            Object.assign(s.traceMsgCache[e].extension[c], t)
                        })
                      ))
                  }
                },
              },
              {
                key: 'reportTraceEnd',
                value: function (e) {
                  var t,
                    i = this,
                    r =
                      !(arguments.length > 1 && void 0 !== arguments[1]) ||
                      arguments[1]
                  if (
                    this.reportConfig.isDataReportEnable &&
                    this.traceMsgCache[e]
                  )
                    if ('nos' !== e || !1 === r) {
                      'boolean' == typeof r
                        ? (this.traceMsgCache[e].succeed = !!r)
                        : (this.traceMsgCache[e].state = r),
                        (this.traceMsgCache[e].duration =
                          Date.now() - this.traceMsgCache[e].start_time),
                        this.traceMsgCache[e].extension.forEach(function (e) {
                          delete e.end_time
                        })
                      var s = this.traceMsgCache[e]
                      if (
                        ((this.traceMsgCache[e] = null), s.asyncPromiseArray)
                      ) {
                        ;(t = this.endedAsyncMsgByModule)[e] || (t[e] = []),
                          this.endedAsyncMsgByModule[e].push(s)
                        var n = function () {
                          i.endedAsyncMsgByModule[e] &&
                            i.endedAsyncMsgByModule[e].includes(s) &&
                            (delete s.asyncPromiseArray,
                            i.report(e, s, {
                              priority: i.getEventPriority(e, s),
                            }))
                        }
                        Promise.all(s.asyncPromiseArray).then(n).catch(n)
                      } else
                        this.report(e, s, {
                          priority: this.getEventPriority(e, s),
                        })
                    } else this.traceMsgCache[e] = null
                },
              },
              {
                key: 'getEventPriority',
                value: function (e, t) {
                  if ('exceptions' === e) {
                    if (0 === t.action) return 'HIGH'
                    if (2 === t.action) return 'HIGH'
                    if (1 === t.action && 0 !== t.exception_service)
                      return 'HIGH'
                  } else {
                    if ('msgReceive' === e) return 'LOW'
                    if ('nim_api_trace' === e) return 'LOW'
                  }
                  return 'NORMAL'
                },
              },
              {
                key: 'reportTraceCancel',
                value: function (e) {
                  this.reportConfig.isDataReportEnable &&
                    ((this.endedAsyncMsgByModule[e] = []),
                    (this.traceMsgCache[e] = null))
                },
              },
              {
                key: 'pause',
                value: function () {
                  this.reportConfig.isDataReportEnable &&
                    (this.isUploadEnable = !1)
                },
              },
              {
                key: 'restore',
                value: function () {
                  this.reportConfig.isDataReportEnable &&
                    ((this.isUploadEnable = !0),
                    this.initConfigLoaded || this.initUploadConfig())
                },
              },
              {
                key: 'destroy',
                value: function () {
                  var e = this
                  this.reportConfig.isDataReportEnable &&
                    (Object.keys(this.traceMsgCache).forEach(function (t) {
                      e.reportTraceEnd(t, 1)
                    }),
                    null !== this.timer && clearTimeout(this.timer),
                    (this.setConfig = s),
                    (this.report = s),
                    (this.reportTraceStart = s),
                    (this.reportTraceUpdate = s),
                    (this.reportTraceEnd = s),
                    (this.pause = s),
                    (this.restore = s),
                    (this.destroy = s),
                    (this.reqRetryCount = 0),
                    (this.cacheMsgList = []),
                    (this.traceMsgCache = {}),
                    (this.lowPriorityMsgList = []),
                    (this.msgList = []),
                    (this.highPriorityMsgList = []),
                    (this.reportConfig = {}),
                    (this.isDestroyed = !0))
                },
              },
              {
                key: 'initUploadConfig',
                value: function () {
                  var i, r
                  return (function (e, t, i, r) {
                    function s(e) {
                      return e instanceof i
                        ? e
                        : new i(function (t) {
                            t(e)
                          })
                    }
                    return new (i || (i = Promise))(function (t, i) {
                      function n(e) {
                        try {
                          a(r.next(e))
                        } catch (e) {
                          i(e)
                        }
                      }
                      function o(e) {
                        try {
                          a(r.throw(e))
                        } catch (e) {
                          i(e)
                        }
                      }
                      function a(e) {
                        e.done ? t(e.value) : s(e.value).then(n, o)
                      }
                      a((r = r.apply(e, [])).next())
                    })
                  })(
                    this,
                    0,
                    void 0,
                    e().mark(function s() {
                      var n,
                        o,
                        a,
                        c,
                        d,
                        l = this
                      return e().wrap(
                        function (s) {
                          for (;;)
                            switch ((s.prev = s.next)) {
                              case 0:
                                if (!this.loading) {
                                  s.next = 2
                                  break
                                }
                                return s.abrupt('return')
                              case 2:
                                ;(this.loading = !0),
                                  (n = this.reportConfig.common || {}),
                                  (o = this.reportConfig.compassDataEndpoint
                                    .split(',')
                                    .map(function (e) {
                                      return ''
                                        .concat(e, '/')
                                        .concat(l.configPath)
                                    })),
                                  (a = e().mark(function t(s) {
                                    return e().wrap(
                                      function (e) {
                                        for (;;)
                                          switch ((e.prev = e.next)) {
                                            case 0:
                                              if (
                                                !l.initConfigLoaded &&
                                                !l.isDestroyed
                                              ) {
                                                e.next = 2
                                                break
                                              }
                                              return e.abrupt('return', 'break')
                                            case 2:
                                              return (
                                                (e.prev = 2),
                                                (e.next = 5),
                                                l.reportConfig
                                                  .request(o[s], {
                                                    method: 'GET',
                                                    dataType: 'json',
                                                    params: {
                                                      deviceId: n.dev_id,
                                                      sdkVer: n.sdk_ver,
                                                      platform: n.platform,
                                                      hostEnv: n.host_env,
                                                      appkey: n.app_key,
                                                    },
                                                    timeout:
                                                      l.reportConfig.timeout,
                                                  })
                                                  .then(function (e) {
                                                    var t, i
                                                    if (!l.isDestroyed) {
                                                      if (
                                                        200 === e.status &&
                                                        e.data &&
                                                        200 === e.data.code
                                                      ) {
                                                        l.initConfigLoaded = !0
                                                        var r =
                                                          e.data.data || {}
                                                        ;(l.reportConfig.maxSize =
                                                          r.maxSize > 1e3
                                                            ? 1e3
                                                            : r.maxSize),
                                                          (l.reportConfig.maxInterval =
                                                            r.maxInterval > 1e4
                                                              ? 1e4
                                                              : r.maxInterval),
                                                          (l.reportConfig.maxInterval =
                                                            r.maxInterval < 10
                                                              ? 10
                                                              : r.maxInterval),
                                                          (l.reportConfig.minInterval =
                                                            r.minInterval < 2
                                                              ? 2
                                                              : r.minInterval),
                                                          (l.reportConfig.maxDelay =
                                                            r.maxDelay || 300),
                                                          (l.reportConfig.maxInterval =
                                                            1e3 *
                                                            l.reportConfig
                                                              .maxInterval),
                                                          (l.reportConfig.minInterval =
                                                            1e3 *
                                                            l.reportConfig
                                                              .minInterval),
                                                          (l.reportConfig.maxDelay =
                                                            1e3 *
                                                            l.reportConfig
                                                              .maxDelay),
                                                          r.endpoint
                                                            ? (l.dataReportEndpoint =
                                                                r.endpoint)
                                                            : (l.dataReportEndpoint =
                                                                o[s]),
                                                          (l.serverAllowUpload =
                                                            !0),
                                                          (l.loading = !1),
                                                          l.reportHeartBeat()
                                                      } else
                                                        200 === e.status &&
                                                          (l.initConfigLoaded =
                                                            !0)
                                                      null ===
                                                        (i =
                                                          null ===
                                                            (t =
                                                              l.reportConfig) ||
                                                          void 0 === t
                                                            ? void 0
                                                            : t.logger) ||
                                                        void 0 === i ||
                                                        i.log(
                                                          'Get reporter upload config success'
                                                        )
                                                    }
                                                  })
                                                  .catch(function (e) {
                                                    var t, i
                                                    l.isDestroyed ||
                                                      ((l.loading = !1),
                                                      null ===
                                                        (i =
                                                          null ===
                                                            (t =
                                                              l.reportConfig) ||
                                                          void 0 === t
                                                            ? void 0
                                                            : t.logger) ||
                                                        void 0 === i ||
                                                        i.error(
                                                          'Get reporter upload config failed',
                                                          e
                                                        ),
                                                      l.reqRetryCount < 12 &&
                                                        (l.reqRetryCount++,
                                                        setTimeout(function () {
                                                          l.isDestroyed ||
                                                            l.initUploadConfig()
                                                        }, 8e3)))
                                                  })
                                              )
                                            case 5:
                                              e.next = 14
                                              break
                                            case 7:
                                              if (
                                                ((e.prev = 7),
                                                (e.t0 = e.catch(2)),
                                                !l.isDestroyed)
                                              ) {
                                                e.next = 11
                                                break
                                              }
                                              return e.abrupt('return', {
                                                v: void 0,
                                              })
                                            case 11:
                                              ;(l.loading = !1),
                                                null ===
                                                  (r =
                                                    null ===
                                                      (i = l.reportConfig) ||
                                                    void 0 === i
                                                      ? void 0
                                                      : i.logger) ||
                                                  void 0 === r ||
                                                  r.error(
                                                    'Exec reporter request failed',
                                                    e.t0
                                                  ),
                                                l.reqRetryCount < 12 &&
                                                  (l.reqRetryCount++,
                                                  setTimeout(function () {
                                                    l.isDestroyed ||
                                                      l.initUploadConfig()
                                                  }, 8e3))
                                            case 14:
                                            case 'end':
                                              return e.stop()
                                          }
                                      },
                                      t,
                                      null,
                                      [[2, 7]]
                                    )
                                  })),
                                  (c = 0)
                              case 7:
                                if (!(c < o.length)) {
                                  s.next = 17
                                  break
                                }
                                return s.delegateYield(a(c), 't0', 9)
                              case 9:
                                if ('break' !== (d = s.t0)) {
                                  s.next = 12
                                  break
                                }
                                return s.abrupt('break', 17)
                              case 12:
                                if ('object' !== t(d)) {
                                  s.next = 14
                                  break
                                }
                                return s.abrupt('return', d.v)
                              case 14:
                                c++, (s.next = 7)
                                break
                              case 17:
                              case 'end':
                                return s.stop()
                            }
                        },
                        s,
                        this
                      )
                    })
                  )
                },
              },
              {
                key: 'reportHeartBeat',
                value: function () {
                  var e = this
                  this.isDestroyed ||
                    ((this.timer = setTimeout(function () {
                      e.reportHeartBeat()
                    }, this.reportConfig.minInterval)),
                    this.doReport())
                },
              },
              {
                key: 'doReport',
                value: function () {
                  if (!this.isDestroyed) {
                    var e =
                      this.highPriorityMsgList.length +
                        this.msgList.length +
                        this.lowPriorityMsgList.length +
                        this.cacheMsgList.length >
                      2 * this.reportConfig.maxSize
                        ? this.reportConfig.minInterval
                        : this.reportConfig.maxInterval
                    Date.now() - this.lastReportTime >= e && this.upload()
                  }
                },
              },
              {
                key: 'getUploadMsg',
                value: function () {
                  var e = this,
                    t = {},
                    i = Date.now()
                  ;(this.highPriorityMsgList = this.highPriorityMsgList.filter(
                    function (t) {
                      return i - t.createTime < e.reportConfig.maxDelay
                    }
                  )),
                    (this.msgList = this.msgList.filter(function (t) {
                      return i - t.createTime < e.reportConfig.maxDelay
                    })),
                    (this.lowPriorityMsgList = this.lowPriorityMsgList.filter(
                      function (t) {
                        return i - t.createTime < e.reportConfig.maxDelay
                      }
                    )),
                    (this.cacheMsgList = this.cacheMsgList.filter(function (t) {
                      return i - t.createTime < e.reportConfig.maxDelay
                    }))
                  var r = this.highPriorityMsgList.slice(
                    0,
                    this.reportConfig.maxSize
                  )
                  if (
                    ((this.highPriorityMsgList = this.highPriorityMsgList.slice(
                      r.length
                    )),
                    r.length < this.reportConfig.maxSize)
                  ) {
                    var s = this.reportConfig.maxSize - r.length
                    ;(r = r.concat(this.msgList.slice(0, s))),
                      (this.msgList = this.msgList.slice(s))
                  }
                  if (r.length < this.reportConfig.maxSize) {
                    var n = this.reportConfig.maxSize - r.length
                    ;(r = r.concat(this.lowPriorityMsgList.slice(0, n))),
                      (this.lowPriorityMsgList =
                        this.lowPriorityMsgList.slice(n))
                  }
                  if (r.length < this.reportConfig.maxSize) {
                    var o = this.reportConfig.maxSize - r.length
                    ;(r = r.concat(this.cacheMsgList.slice(0, o))),
                      (this.cacheMsgList = this.cacheMsgList.slice(o))
                  }
                  return (
                    r.forEach(function (e) {
                      t[e.module]
                        ? t[e.module].push(e.msg)
                        : (t[e.module] = [e.msg])
                    }),
                    { uploadMsgArr: r, uploadMsg: t }
                  )
                },
              },
              {
                key: 'upload',
                value: function () {
                  var e,
                    t,
                    i = this
                  if (
                    this.isUploadEnable &&
                    this.serverAllowUpload &&
                    !(
                      this.lastReportTime &&
                      Date.now() - this.lastReportTime <
                        this.reportConfig.minInterval
                    )
                  ) {
                    var r = this.getUploadMsg(),
                      s = r.uploadMsgArr,
                      n = r.uploadMsg
                    if (s.length) {
                      this.lastReportTime = Date.now()
                      try {
                        var o = ''
                          .concat(this.dataReportEndpoint, '/')
                          .concat(this.dataReportPath)
                        this.reportConfig
                          .request(o, {
                            dataType: 'json',
                            method: 'POST',
                            data: {
                              common: this.reportConfig.common,
                              event: n,
                            },
                            headers: { sdktype: 'im' },
                            timeout: this.reportConfig.timeout,
                          })
                          .catch(function (e) {
                            var t, r
                            ;(i.cacheMsgList = i.cacheMsgList
                              .concat(s)
                              .slice(0, i.reportConfig.cacheMaxSize)),
                              null ===
                                (r =
                                  null === (t = i.reportConfig) || void 0 === t
                                    ? void 0
                                    : t.logger) ||
                                void 0 === r ||
                                r.warn('Reporter upload failed', e)
                          })
                      } catch (i) {
                        null ===
                          (t =
                            null === (e = this.reportConfig) || void 0 === e
                              ? void 0
                              : e.logger) ||
                          void 0 === t ||
                          t.warn('Exec reporter request failed', i)
                      }
                      clearTimeout(this.timer), this.reportHeartBeat()
                    }
                  }
                },
              },
            ]),
            n
          )
        })()
      return n
    })()
  })
!(function (e) {
  ;(e[(e.V2NIM_DATA_SYNC_TYPE_LEVEL_FULL = 0)] =
    'V2NIM_DATA_SYNC_TYPE_LEVEL_FULL'),
    (e[(e.V2NIM_DATA_SYNC_TYPE_LEVEL_BASIC = 1)] =
      'V2NIM_DATA_SYNC_TYPE_LEVEL_BASIC')
})(s || (s = {})),
  (function (e) {
    ;(e[(e.V2NIM_DATA_SYNC_TYPE_MAIN = 1)] = 'V2NIM_DATA_SYNC_TYPE_MAIN'),
      (e[(e.V2NIM_DATA_SYNC_TYPE_TEAM_MEMBER = 2)] =
        'V2NIM_DATA_SYNC_TYPE_TEAM_MEMBER'),
      (e[(e.V2NIM_DATA_SYNC_TYPE_SUPER_TEAM_MEMBER = 3)] =
        'V2NIM_DATA_SYNC_TYPE_SUPER_TEAM_MEMBER')
  })(n || (n = {})),
  (function (e) {
    ;(e[(e.V2NIM_DATA_SYNC_STATE_WAITING = 1)] =
      'V2NIM_DATA_SYNC_STATE_WAITING'),
      (e[(e.V2NIM_DATA_SYNC_STATE_SYNCING = 2)] =
        'V2NIM_DATA_SYNC_STATE_SYNCING'),
      (e[(e.V2NIM_DATA_SYNC_STATE_COMPLETED = 3)] =
        'V2NIM_DATA_SYNC_STATE_COMPLETED')
  })(o || (o = {})),
  (function (e) {
    ;(e[(e.V2NIM_CONVERSATION_TYPE_UNKNOWN = 0)] =
      'V2NIM_CONVERSATION_TYPE_UNKNOWN'),
      (e[(e.V2NIM_CONVERSATION_TYPE_P2P = 1)] = 'V2NIM_CONVERSATION_TYPE_P2P'),
      (e[(e.V2NIM_CONVERSATION_TYPE_TEAM = 2)] =
        'V2NIM_CONVERSATION_TYPE_TEAM'),
      (e[(e.V2NIM_CONVERSATION_TYPE_SUPER_TEAM = 3)] =
        'V2NIM_CONVERSATION_TYPE_SUPER_TEAM')
  })(a || (a = {})),
  (function (e) {
    ;(e[(e.V2NIM_MESSAGE_STATUS_DEFAULT = 0)] = 'V2NIM_MESSAGE_STATUS_DEFAULT'),
      (e[(e.V2NIM_MESSAGE_STATUS_REVOKE = 1)] = 'V2NIM_MESSAGE_STATUS_REVOKE'),
      (e[(e.V2NIM_MESSAGE_STATUS_BACKFILL = 2)] =
        'V2NIM_MESSAGE_STATUS_BACKFILL')
  })(c || (c = {})),
  (function (e) {
    ;(e[(e.V2NIM_FRIEND_MODE_TYPE_ADD = 1)] = 'V2NIM_FRIEND_MODE_TYPE_ADD'),
      (e[(e.V2NIM_FRIEND_MODE_TYPE_APPLY = 2)] = 'V2NIM_FRIEND_MODE_TYPE_APPLY')
  })(d || (d = {})),
  (function (e) {
    ;(e[(e.V2NIM_FRIEND_ADD_APPLICATION_TYPE_RECEIVED = 1)] =
      'V2NIM_FRIEND_ADD_APPLICATION_TYPE_RECEIVED'),
      (e[(e.V2NIM_FRIEND_ADD_APPLICATION_TYPE_REJECTED = 2)] =
        'V2NIM_FRIEND_ADD_APPLICATION_TYPE_REJECTED')
  })(l || (l = {})),
  (function (e) {
    ;(e[(e.V2NIM_FRIEND_ADD_APPLICATION_STATUS_INIT = 0)] =
      'V2NIM_FRIEND_ADD_APPLICATION_STATUS_INIT'),
      (e[(e.V2NIM_FRIEND_ADD_APPLICATION_STATUS_AGREED = 1)] =
        'V2NIM_FRIEND_ADD_APPLICATION_STATUS_AGREED'),
      (e[(e.V2NIM_FRIEND_ADD_APPLICATION_STATUS_REJECTED = 2)] =
        'V2NIM_FRIEND_ADD_APPLICATION_STATUS_REJECTED'),
      (e[(e.V2NIM_FRIEND_ADD_APPLICATION_STATUS_EXPIRED = 3)] =
        'V2NIM_FRIEND_ADD_APPLICATION_STATUS_EXPIRED'),
      (e[(e.V2NIM_FRIEND_ADD_APPLICATION_STATUS_DIRECT_ADD = 4)] =
        'V2NIM_FRIEND_ADD_APPLICATION_STATUS_DIRECT_ADD')
  })(p || (p = {})),
  (function (e) {
    ;(e[(e.V2NIM_FRIEND_DELETION_TYPE_BY_SELF = 1)] =
      'V2NIM_FRIEND_DELETION_TYPE_BY_SELF'),
      (e[(e.V2NIM_FRIEND_DELETION_TYPE_BY_PEER = 2)] =
        'V2NIM_FRIEND_DELETION_TYPE_BY_PEER')
  })(h || (h = {})),
  (function (e) {
    ;(e[(e.V2NIM_FRIEND_VERIFY_TYPE_ADD = 1)] = 'V2NIM_FRIEND_VERIFY_TYPE_ADD'),
      (e[(e.V2NIM_FRIEND_VERIFY_TYPE_APPLY = 2)] =
        'V2NIM_FRIEND_VERIFY_TYPE_APPLY'),
      (e[(e.V2NIM_FRIEND_VERIFY_TYPE_ACCEPT = 3)] =
        'V2NIM_FRIEND_VERIFY_TYPE_ACCEPT'),
      (e[(e.V2NIM_FRIEND_VERIFY_TYPE_REJECT = 4)] =
        'V2NIM_FRIEND_VERIFY_TYPE_REJECT')
  })(u || (u = {})),
  (function (e) {
    ;(e[(e.V2NIM_LOGIN_AUTH_TYPE_DEFAULT = 0)] =
      'V2NIM_LOGIN_AUTH_TYPE_DEFAULT'),
      (e[(e.V2NIM_LOGIN_AUTH_TYPE_DYNAMIC_TOKEN = 1)] =
        'V2NIM_LOGIN_AUTH_TYPE_DYNAMIC_TOKEN'),
      (e[(e.V2NIM_LOGIN_AUTH_TYPE_THIRD_PARTY = 2)] =
        'V2NIM_LOGIN_AUTH_TYPE_THIRD_PARTY')
  })(m || (m = {})),
  (function (e) {
    ;(e[(e.V2NIM_LOGIN_STATUS_LOGOUT = 0)] = 'V2NIM_LOGIN_STATUS_LOGOUT'),
      (e[(e.V2NIM_LOGIN_STATUS_LOGINED = 1)] = 'V2NIM_LOGIN_STATUS_LOGINED'),
      (e[(e.V2NIM_LOGIN_STATUS_LOGINING = 2)] = 'V2NIM_LOGIN_STATUS_LOGINING'),
      (e[(e.V2NIM_LOGIN_STATUS_UNLOGIN = 3)] = 'V2NIM_LOGIN_STATUS_UNLOGIN')
  })(g || (g = {})),
  (function (e) {
    ;(e[(e.V2NIM_LOGIN_CLIENT_TYPE_UNKNOWN = 0)] =
      'V2NIM_LOGIN_CLIENT_TYPE_UNKNOWN'),
      (e[(e.V2NIM_LOGIN_CLIENT_TYPE_ANDROID = 1)] =
        'V2NIM_LOGIN_CLIENT_TYPE_ANDROID'),
      (e[(e.V2NIM_LOGIN_CLIENT_TYPE_IOS = 2)] = 'V2NIM_LOGIN_CLIENT_TYPE_IOS'),
      (e[(e.V2NIM_LOGIN_CLIENT_TYPE_PC = 4)] = 'V2NIM_LOGIN_CLIENT_TYPE_PC'),
      (e[(e.V2NIM_LOGIN_CLIENT_TYPE_WP = 8)] = 'V2NIM_LOGIN_CLIENT_TYPE_WP'),
      (e[(e.V2NIM_LOGIN_CLIENT_TYPE_WEB = 16)] = 'V2NIM_LOGIN_CLIENT_TYPE_WEB'),
      (e[(e.V2NIM_LOGIN_CLIENT_TYPE_RESTFUL = 32)] =
        'V2NIM_LOGIN_CLIENT_TYPE_RESTFUL'),
      (e[(e.V2NIM_LOGIN_CLIENT_TYPE_MAC_OS = 64)] =
        'V2NIM_LOGIN_CLIENT_TYPE_MAC_OS'),
      (e[(e.V2NIM_LOGIN_CLIENT_TYPE_HARMONY_OS = 65)] =
        'V2NIM_LOGIN_CLIENT_TYPE_HARMONY_OS')
  })(v || (v = {})),
  (function (e) {
    ;(e[(e.V2NIM_KICKED_OFFLINE_REASON_CLIENT_EXCLUSIVE = 1)] =
      'V2NIM_KICKED_OFFLINE_REASON_CLIENT_EXCLUSIVE'),
      (e[(e.V2NIM_KICKED_OFFLINE_REASON_SERVER = 2)] =
        'V2NIM_KICKED_OFFLINE_REASON_SERVER'),
      (e[(e.V2NIM_KICKED_OFFLINE_REASON_CLIENT = 3)] =
        'V2NIM_KICKED_OFFLINE_REASON_CLIENT'),
      (e[(e.V2NIM_KICKED_OFFLINE_REASON_CLIENT_QUIETLY = 4)] =
        'V2NIM_KICKED_OFFLINE_REASON_CLIENT_QUIETLY')
  })(f || (f = {})),
  (function (e) {
    ;(e[(e.V2NIM_LOGIN_CLIENT_CHANGE_LIST = 1)] =
      'V2NIM_LOGIN_CLIENT_CHANGE_LIST'),
      (e[(e.V2NIM_LOGIN_CLIENT_CHANGE_LOGIN = 2)] =
        'V2NIM_LOGIN_CLIENT_CHANGE_LOGIN'),
      (e[(e.V2NIM_LOGIN_CLIENT_CHANGE_LOGOUT = 3)] =
        'V2NIM_LOGIN_CLIENT_CHANGE_LOGOUT')
  })(y || (y = {})),
  (function (e) {
    ;(e[(e.V2NIM_CONNECT_STATUS_DISCONNECTED = 0)] =
      'V2NIM_CONNECT_STATUS_DISCONNECTED'),
      (e[(e.V2NIM_CONNECT_STATUS_CONNECTED = 1)] =
        'V2NIM_CONNECT_STATUS_CONNECTED'),
      (e[(e.V2NIM_CONNECT_STATUS_CONNECTING = 2)] =
        'V2NIM_CONNECT_STATUS_CONNECTING'),
      (e[(e.V2NIM_CONNECT_STATUS_WAITING = 3)] = 'V2NIM_CONNECT_STATUS_WAITING')
  })(I || (I = {})),
  (function (e) {
    ;(e[(e.NIM_MESSAGE_AI_STREAM_STATUS_STREAMING = -1)] =
      'NIM_MESSAGE_AI_STREAM_STATUS_STREAMING'),
      (e[(e.NIM_MESSAGE_AI_STREAM_STATUS_NONE = 0)] =
        'NIM_MESSAGE_AI_STREAM_STATUS_NONE'),
      (e[(e.NIM_MESSAGE_AI_STREAM_STATUS_PLACEHOLDER = 1)] =
        'NIM_MESSAGE_AI_STREAM_STATUS_PLACEHOLDER'),
      (e[(e.NIM_MESSAGE_AI_STREAM_STATUS_CANCEL = 2)] =
        'NIM_MESSAGE_AI_STREAM_STATUS_CANCEL'),
      (e[(e.NIM_MESSAGE_AI_STREAM_STATUS_UPDATE = 3)] =
        'NIM_MESSAGE_AI_STREAM_STATUS_UPDATE'),
      (e[(e.NIM_MESSAGE_AI_STREAM_STATUS_COMPLETE = 4)] =
        'NIM_MESSAGE_AI_STREAM_STATUS_COMPLETE'),
      (e[(e.NIM_MESSAGE_AI_STREAM_STATUS_EXCEPTION = 5)] =
        'NIM_MESSAGE_AI_STREAM_STATUS_EXCEPTION')
  })(M || (M = {})),
  (function (e) {
    ;(e[(e.V2NIM_MESSAGE_AI_STREAM_STOP_OP_DEFAULT = 0)] =
      'V2NIM_MESSAGE_AI_STREAM_STOP_OP_DEFAULT'),
      (e[(e.V2NIM_MESSAGE_AI_STREAM_STOP_OP_REVOKE = 1)] =
        'V2NIM_MESSAGE_AI_STREAM_STOP_OP_REVOKE'),
      (e[(e.V2NIM_MESSAGE_AI_STREAM_STOP_OP_UPDATE = 2)] =
        'V2NIM_MESSAGE_AI_STREAM_STOP_OP_UPDATE')
  })(_ || (_ = {})),
  (function (e) {
    ;(e[(e.V2NIM_MESSAGE_AI_REGEN_OP_UPDATE = 1)] =
      'V2NIM_MESSAGE_AI_REGEN_OP_UPDATE'),
      (e[(e.V2NIM_MESSAGE_AI_REGEN_OP_NEW = 2)] =
        'V2NIM_MESSAGE_AI_REGEN_OP_NEW')
  })(E || (E = {})),
  (function (e) {
    ;(e[(e.V2NIM_MESSAGE_AI_STATUS_UNKNOW = 0)] =
      'V2NIM_MESSAGE_AI_STATUS_UNKNOW'),
      (e[(e.V2NIM_MESSAGE_AI_STATUS_AT = 1)] = 'V2NIM_MESSAGE_AI_STATUS_AT'),
      (e[(e.V2NIM_MESSAGE_AI_STATUS_RESPONSE = 2)] =
        'V2NIM_MESSAGE_AI_STATUS_RESPONSE')
  })(T || (T = {})),
  (function (e) {
    ;(e[(e.V2NIM_MESSAGE_TYPE_INVALID = -1)] = 'V2NIM_MESSAGE_TYPE_INVALID'),
      (e[(e.V2NIM_MESSAGE_TYPE_TEXT = 0)] = 'V2NIM_MESSAGE_TYPE_TEXT'),
      (e[(e.V2NIM_MESSAGE_TYPE_IMAGE = 1)] = 'V2NIM_MESSAGE_TYPE_IMAGE'),
      (e[(e.V2NIM_MESSAGE_TYPE_AUDIO = 2)] = 'V2NIM_MESSAGE_TYPE_AUDIO'),
      (e[(e.V2NIM_MESSAGE_TYPE_VIDEO = 3)] = 'V2NIM_MESSAGE_TYPE_VIDEO'),
      (e[(e.V2NIM_MESSAGE_TYPE_LOCATION = 4)] = 'V2NIM_MESSAGE_TYPE_LOCATION'),
      (e[(e.V2NIM_MESSAGE_TYPE_NOTIFICATION = 5)] =
        'V2NIM_MESSAGE_TYPE_NOTIFICATION'),
      (e[(e.V2NIM_MESSAGE_TYPE_FILE = 6)] = 'V2NIM_MESSAGE_TYPE_FILE'),
      (e[(e.V2NIM_MESSAGE_TYPE_AVCHAT = 7)] = 'V2NIM_MESSAGE_TYPE_AVCHAT'),
      (e[(e.V2NIM_MESSAGE_TYPE_TIPS = 10)] = 'V2NIM_MESSAGE_TYPE_TIPS'),
      (e[(e.V2NIM_MESSAGE_TYPE_ROBOT = 11)] = 'V2NIM_MESSAGE_TYPE_ROBOT'),
      (e[(e.V2NIM_MESSAGE_TYPE_CALL = 12)] = 'V2NIM_MESSAGE_TYPE_CALL'),
      (e[(e.V2NIM_MESSAGE_TYPE_CUSTOM = 100)] = 'V2NIM_MESSAGE_TYPE_CUSTOM')
  })(S || (S = {})),
  (function (e) {
    ;(e[(e.V2NIM_SEARCH_KEYWORD_MATCH_TYPE_OR = 0)] =
      'V2NIM_SEARCH_KEYWORD_MATCH_TYPE_OR'),
      (e[(e.V2NIM_SEARCH_KEYWORD_MATCH_TYPE_AND = 1)] =
        'V2NIM_SEARCH_KEYWORD_MATCH_TYPE_AND')
  })(C || (C = {})),
  (function (e) {
    ;(e[(e.V2NIM_SEARCH_DIRECTION_BACKWARD = 0)] =
      'V2NIM_SEARCH_DIRECTION_BACKWARD'),
      (e[(e.V2NIM_SEARCH_DIRECTION_FORWARD = 1)] =
        'V2NIM_SEARCH_DIRECTION_FORWARD')
  })(N || (N = {})),
  (function (e) {
    ;(e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_UNDEFINED = -1)] =
      'V2NIM_MESSAGE_NOTIFICATION_TYPE_UNDEFINED'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_INVITE = 0)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_INVITE'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_KICK = 1)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_KICK'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_LEAVE = 2)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_LEAVE'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_UPDATE_TINFO = 3)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_UPDATE_TINFO'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_DISMISS = 4)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_DISMISS'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_APPLY_PASS = 5)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_APPLY_PASS'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_OWNER_TRANSFER = 6)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_OWNER_TRANSFER'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_ADD_MANAGER = 7)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_ADD_MANAGER'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_REMOVE_MANAGER = 8)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_REMOVE_MANAGER'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_INVITE_ACCEPT = 9)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_INVITE_ACCEPT'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_BANNED_TEAM_MEMBER = 10)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_BANNED_TEAM_MEMBER'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_INVITE = 401)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_INVITE'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_KICK = 402)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_KICK'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_LEAVE = 403)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_LEAVE'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_UPDATE_TINFO = 404)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_UPDATE_TINFO'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_DISMISS = 405)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_DISMISS'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_APPLY_PASS = 410)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_APPLY_PASS'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_OWNER_TRANSFER = 406)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_OWNER_TRANSFER'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_ADD_MANAGER = 407)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_ADD_MANAGER'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_REMOVE_MANAGER = 408)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_REMOVE_MANAGER'),
      (e[(e.V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_INVITE_ACCEPT = 411)] =
        'V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_INVITE_ACCEPT'),
      (e[
        (e.V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_BANNED_TEAM_MEMBER = 409)
      ] = 'V2NIM_MESSAGE_NOTIFICATION_TYPE_SUPER_TEAM_BANNED_TEAM_MEMBER')
  })(A || (A = {})),
  (function (e) {
    ;(e[(e.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN = 0)] =
      'V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UNKNOWN'),
      (e[(e.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_SUCCESS = 1)] =
        'V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_SUCCESS'),
      (e[(e.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_FAILED = 2)] =
        'V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_FAILED'),
      (e[(e.V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UPLOADING = 3)] =
        'V2NIM_MESSAGE_ATTACHMENT_UPLOAD_STATE_UPLOADING')
  })(R || (R = {})),
  (function (e) {
    ;(e[(e.V2NIM_MESSAGE_SENDING_STATE_UNKNOWN = 0)] =
      'V2NIM_MESSAGE_SENDING_STATE_UNKNOWN'),
      (e[(e.V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED = 1)] =
        'V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED'),
      (e[(e.V2NIM_MESSAGE_SENDING_STATE_FAILED = 2)] =
        'V2NIM_MESSAGE_SENDING_STATE_FAILED'),
      (e[(e.V2NIM_MESSAGE_SENDING_STATE_SENDING = 3)] =
        'V2NIM_MESSAGE_SENDING_STATE_SENDING')
  })(O || (O = {})),
  (function (e) {
    ;(e[(e.V2NIM_QUERY_DIRECTION_DESC = 0)] = 'V2NIM_QUERY_DIRECTION_DESC'),
      (e[(e.V2NIM_QUERY_DIRECTION_ASC = 1)] = 'V2NIM_QUERY_DIRECTION_ASC')
  })(b || (b = {})),
  (function (e) {
    ;(e[(e.V2NIM_CLEAR_HISTORY_MODE_ALL = 0)] = 'V2NIM_CLEAR_HISTORY_MODE_ALL'),
      (e[(e.V2NIM_CLEAR_HISTORY_MODE_LOCAL = 1)] =
        'V2NIM_CLEAR_HISTORY_MODE_LOCAL'),
      (e[(e.V2NIM_CLEAR_HISTORY_MODE_LOCAL_IRREPARABLY = 2)] =
        'V2NIM_CLEAR_HISTORY_MODE_LOCAL_IRREPARABLY')
  })(k || (k = {})),
  (function (e) {
    ;(e[(e.V2NIM_MESSAGE_REVOKE_TYPE_UNDEFINED = 0)] =
      'V2NIM_MESSAGE_REVOKE_TYPE_UNDEFINED'),
      (e[(e.V2NIM_MESSAGE_REVOKE_TYPE_P2P_BOTHWAY = 1)] =
        'V2NIM_MESSAGE_REVOKE_TYPE_P2P_BOTHWAY'),
      (e[(e.V2NIM_MESSAGE_REVOKE_TYPE_TEAM_BOTHWAY = 2)] =
        'V2NIM_MESSAGE_REVOKE_TYPE_TEAM_BOTHWAY'),
      (e[(e.V2NIM_MESSAGE_REVOKE_TYPE_SUPERTEAM_BOTHWAY = 3)] =
        'V2NIM_MESSAGE_REVOKE_TYPE_SUPERTEAM_BOTHWAY'),
      (e[(e.V2NIM_MESSAGE_REVOKE_TYPE_P2P_ONEWAY = 4)] =
        'V2NIM_MESSAGE_REVOKE_TYPE_P2P_ONEWAY'),
      (e[(e.V2NIM_MESSAGE_REVOKE_TYPE_TEAM_ONEWAY = 5)] =
        'V2NIM_MESSAGE_REVOKE_TYPE_TEAM_ONEWAY')
  })(V || (V = {})),
  (function (e) {
    ;(e[(e.V2NIM_MESSAGE_PIN_STATE_NOT_PINNED = 0)] =
      'V2NIM_MESSAGE_PIN_STATE_NOT_PINNED'),
      (e[(e.V2NIM_MESSAGE_PIN_STATE_PINNED = 1)] =
        'V2NIM_MESSAGE_PIN_STATE_PINNED'),
      (e[(e.V2NIM_MESSAGE_PIN_STATE_UPDATED = 2)] =
        'V2NIM_MESSAGE_PIN_STATE_UPDATED')
  })(P || (P = {})),
  (function (e) {
    ;(e[(e.V2NIM_QUICK_COMMENT_STATE_ADD = 1)] =
      'V2NIM_QUICK_COMMENT_STATE_ADD'),
      (e[(e.V2NIM_QUICK_COMMENT_STATE_REMOVE = 2)] =
        'V2NIM_QUICK_COMMENT_STATE_REMOVE')
  })(L || (L = {})),
  (function (e) {
    ;(e[(e.V2NIM_CLIENT_ANTISPAM_OPERATE_NONE = 0)] =
      'V2NIM_CLIENT_ANTISPAM_OPERATE_NONE'),
      (e[(e.V2NIM_CLIENT_ANTISPAM_OPERATE_REPLACE = 1)] =
        'V2NIM_CLIENT_ANTISPAM_OPERATE_REPLACE'),
      (e[(e.V2NIM_CLIENT_ANTISPAM_OPERATE_CLIENT_SHIELD = 2)] =
        'V2NIM_CLIENT_ANTISPAM_OPERATE_CLIENT_SHIELD'),
      (e[(e.V2NIM_CLIENT_ANTISPAM_OPERATE_SERVER_SHIELD = 3)] =
        'V2NIM_CLIENT_ANTISPAM_OPERATE_SERVER_SHIELD')
  })(D || (D = {})),
  (function (e) {
    ;(e[(e.V2NIM_SORT_ORDER_DESC = 0)] = 'V2NIM_SORT_ORDER_DESC'),
      (e[(e.V2NIM_SORT_ORDER_ASC = 1)] = 'V2NIM_SORT_ORDER_ASC')
  })(w || (w = {})),
  (function (e) {
    ;(e[(e.P2P_DELETE_MSG = 7)] = 'P2P_DELETE_MSG'),
      (e[(e.TEAM_DELETE_MSG = 8)] = 'TEAM_DELETE_MSG'),
      (e[(e.SUPERTEAM_DELETE_MSG = 12)] = 'SUPERTEAM_DELETE_MSG'),
      (e[(e.P2P_ONE_WAY_DELETE_MSG = 13)] = 'P2P_ONE_WAY_DELETE_MSG'),
      (e[(e.TEAM_ONE_WAY_DELETE_MSG = 14)] = 'TEAM_ONE_WAY_DELETE_MSG'),
      (e[(e.CUSTOM_P2P_MSG = 100)] = 'CUSTOM_P2P_MSG'),
      (e[(e.CUSTOM_TEAM_MSG = 101)] = 'CUSTOM_TEAM_MSG'),
      (e[(e.CUSTOM_SUPERTEAM_MSG = 103)] = 'CUSTOM_SUPERTEAM_MSG')
  })(U || (U = {})),
  (function (e) {
    ;(e[(e.NIM_MESSAGE_STREAM_STATUS_STREAMING = -1)] =
      'NIM_MESSAGE_STREAM_STATUS_STREAMING'),
      (e[(e.NIM_MESSAGE_STREAM_STATUS_NONE = 0)] =
        'NIM_MESSAGE_STREAM_STATUS_NONE'),
      (e[(e.NIM_MESSAGE_STREAM_STATUS_PLACEHOLDER = 1)] =
        'NIM_MESSAGE_STREAM_STATUS_PLACEHOLDER'),
      (e[(e.NIM_MESSAGE_STREAM_STATUS_CANCEL = 2)] =
        'NIM_MESSAGE_STREAM_STATUS_CANCEL'),
      (e[(e.NIM_MESSAGE_AI_STREAM_STATUS_UPDATE = 3)] =
        'NIM_MESSAGE_AI_STREAM_STATUS_UPDATE'),
      (e[(e.NIM_MESSAGE_STREAM_STATUS_COMPLETE = 4)] =
        'NIM_MESSAGE_STREAM_STATUS_COMPLETE'),
      (e[(e.NIM_MESSAGE_STREAM_STATUS_EXCEPTION = 5)] =
        'NIM_MESSAGE_STREAM_STATUS_EXCEPTION')
  })(x || (x = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF = 0)] =
      'V2NIM_TEAM_MESSAGE_MUTE_MODE_OFF'),
      (e[(e.V2NIM_TEAM_MESSAGE_MUTE_MODE_ON = 1)] =
        'V2NIM_TEAM_MESSAGE_MUTE_MODE_ON'),
      (e[(e.V2NIM_TEAM_MESSAGE_MUTE_MODE_NORMAL_ON = 2)] =
        'V2NIM_TEAM_MESSAGE_MUTE_MODE_NORMAL_ON')
  })(F || (F = {})),
  (function (e) {
    ;(e[(e.V2NIM_P2P_MESSAGE_MUTE_MODE_OFF = 0)] =
      'V2NIM_P2P_MESSAGE_MUTE_MODE_OFF'),
      (e[(e.V2NIM_P2P_MESSAGE_MUTE_MODE_ON = 1)] =
        'V2NIM_P2P_MESSAGE_MUTE_MODE_ON')
  })(B || (B = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_ALL = 0)] =
      'V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_ALL'),
      (e[(e.V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_NORMAL = 1)] =
        'V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_NORMAL'),
      (e[(e.V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_MANAGER = 2)] =
        'V2NIM_TEAM_MEMBER_ROLE_QUERY_TYPE_MANAGER')
  })($ || ($ = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_TYPE_INVALID = 0)] = 'V2NIM_TEAM_TYPE_INVALID'),
      (e[(e.V2NIM_TEAM_TYPE_ADVANCED = 1)] = 'V2NIM_TEAM_TYPE_ADVANCED'),
      (e[(e.V2NIM_TEAM_TYPE_SUPER = 2)] = 'V2NIM_TEAM_TYPE_SUPER')
  })(G || (G = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_JOIN_MODE_FREE = 0)] = 'V2NIM_TEAM_JOIN_MODE_FREE'),
      (e[(e.V2NIM_TEAM_JOIN_MODE_APPLY = 1)] = 'V2NIM_TEAM_JOIN_MODE_APPLY'),
      (e[(e.V2NIM_TEAM_JOIN_MODE_INVITE = 2)] = 'V2NIM_TEAM_JOIN_MODE_INVITE')
  })(j || (j = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_AGREE_MODE_AUTH = 0)] = 'V2NIM_TEAM_AGREE_MODE_AUTH'),
      (e[(e.V2NIM_TEAM_AGREE_MODE_NO_AUTH = 1)] =
        'V2NIM_TEAM_AGREE_MODE_NO_AUTH')
  })(q || (q = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_INVITE_MODE_MANAGER = 0)] =
      'V2NIM_TEAM_INVITE_MODE_MANAGER'),
      (e[(e.V2NIM_TEAM_INVITE_MODE_ALL = 1)] = 'V2NIM_TEAM_INVITE_MODE_ALL')
  })(H || (H = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER = 0)] =
      'V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER'),
      (e[(e.V2NIM_TEAM_UPDATE_INFO_MODE_ALL = 1)] =
        'V2NIM_TEAM_UPDATE_INFO_MODE_ALL')
  })(Y || (Y = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN = 0)] =
      'V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN'),
      (e[(e.V2NIM_TEAM_CHAT_BANNED_MODE_BANNED_NORMAL = 1)] =
        'V2NIM_TEAM_CHAT_BANNED_MODE_BANNED_NORMAL'),
      (e[(e.V2NIM_TEAM_CHAT_BANNED_MODE_BANNED_ALL = 3)] =
        'V2NIM_TEAM_CHAT_BANNED_MODE_BANNED_ALL')
  })(K || (K = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_UPDATE_EXTENSION_MODE_MANAGER = 0)] =
      'V2NIM_TEAM_UPDATE_EXTENSION_MODE_MANAGER'),
      (e[(e.V2NIM_TEAM_UPDATE_EXTENSION_MODE_ALL = 1)] =
        'V2NIM_TEAM_UPDATE_EXTENSION_MODE_ALL')
  })(W || (W = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_MEMBER_ROLE_NORMAL = 0)] =
      'V2NIM_TEAM_MEMBER_ROLE_NORMAL'),
      (e[(e.V2NIM_TEAM_MEMBER_ROLE_OWNER = 1)] =
        'V2NIM_TEAM_MEMBER_ROLE_OWNER'),
      (e[(e.V2NIM_TEAM_MEMBER_ROLE_MANAGER = 2)] =
        'V2NIM_TEAM_MEMBER_ROLE_MANAGER')
  })(J || (J = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_JOIN_ACTION_TYPE_APPLICATION = 0)] =
      'V2NIM_TEAM_JOIN_ACTION_TYPE_APPLICATION'),
      (e[(e.V2NIM_TEAM_JOIN_ACTION_TYPE_REJECT_APPLICATION = 1)] =
        'V2NIM_TEAM_JOIN_ACTION_TYPE_REJECT_APPLICATION'),
      (e[(e.V2NIM_TEAM_JOIN_ACTION_TYPE_INVITATION = 2)] =
        'V2NIM_TEAM_JOIN_ACTION_TYPE_INVITATION'),
      (e[(e.V2NIM_TEAM_JOIN_ACTION_TYPE_REJECT_INVITATION = 3)] =
        'V2NIM_TEAM_JOIN_ACTION_TYPE_REJECT_INVITATION')
  })(z || (z = {})),
  (function (e) {
    ;(e[(e.V2NIM_TEAM_JOIN_ACTION_STATUS_INIT = 0)] =
      'V2NIM_TEAM_JOIN_ACTION_STATUS_INIT'),
      (e[(e.V2NIM_TEAM_JOIN_ACTION_STATUS_AGREED = 1)] =
        'V2NIM_TEAM_JOIN_ACTION_STATUS_AGREED'),
      (e[(e.V2NIM_TEAM_JOIN_ACTION_STATUS_REJECTED = 2)] =
        'V2NIM_TEAM_JOIN_ACTION_STATUS_REJECTED'),
      (e[(e.V2NIM_TEAM_JOIN_ACTION_STATUS_EXPIRED = 3)] =
        'V2NIM_TEAM_JOIN_ACTION_STATUS_EXPIRED')
  })(X || (X = {})),
  (function (e) {
    ;(e[(e.teamApply = 0)] = 'teamApply'),
      (e[(e.teamApplyReject = 1)] = 'teamApplyReject'),
      (e[(e.teamInvite = 2)] = 'teamInvite'),
      (e[(e.teamInviteReject = 3)] = 'teamInviteReject'),
      (e[(e.tlistUpdate = 4)] = 'tlistUpdate'),
      (e[(e.superTeamApply = 15)] = 'superTeamApply'),
      (e[(e.superTeamApplyReject = 16)] = 'superTeamApplyReject'),
      (e[(e.superTeamInvite = 17)] = 'superTeamInvite'),
      (e[(e.superTeamInviteReject = 18)] = 'superTeamInviteReject')
  })(Q || (Q = {})),
  (function (e) {
    ;(e[(e.V2NIM_AI_MODEL_TYPE_UNKNOW = 0)] = 'V2NIM_AI_MODEL_TYPE_UNKNOW'),
      (e[(e.V2NIM_AI_MODEL_TYPE_QWEN = 1)] = 'V2NIM_AI_MODEL_TYPE_QWEN'),
      (e[(e.V2NIM_AI_MODEL_TYPE_AZURE = 2)] = 'V2NIM_AI_MODEL_TYPE_AZURE'),
      (e[(e.V2NIM_AI_MODEL_TYPE_PRIVATE = 3)] = 'V2NIM_AI_MODEL_TYPE_PRIVATE')
  })(Z || (Z = {})),
  (function (e) {
    ;(e[(e.V2NIM_AI_MODEL_STREAM_CALL_STATUS_NONE = 0)] =
      'V2NIM_AI_MODEL_STREAM_CALL_STATUS_NONE'),
      (e[(e.V2NIM_AI_MODEL_STREAM_CALL_STATUS_CANCEL = 2)] =
        'V2NIM_AI_MODEL_STREAM_CALL_STATUS_CANCEL'),
      (e[(e.V2NIM_AI_MODEL_STREAM_CALL_STATUS_COMPLETE = 4)] =
        'V2NIM_AI_MODEL_STREAM_CALL_STATUS_COMPLETE'),
      (e[(e.V2NIM_AI_MODEL_STREAM_CALL_STATUS_EXCEPTION = 5)] =
        'V2NIM_AI_MODEL_STREAM_CALL_STATUS_EXCEPTION')
  })(ee || (ee = {})),
  (function (e) {
    ;(e.V2NIM_AI_MODEL_ROLE_TYPE_SYSTEM = 'system'),
      (e.V2NIM_AI_MODEL_ROLE_TYPE_USER = 'user'),
      (e.V2NIM_AI_MODEL_ROLE_TYPE_ASSISTANT = 'assistant')
  })(te || (te = {})),
  (function (e) {
    ;(e[(e.V2NIM_SIGNALLING_EVENT_TYPE_UNKNOWN = 0)] =
      'V2NIM_SIGNALLING_EVENT_TYPE_UNKNOWN'),
      (e[(e.V2NIM_SIGNALLING_EVENT_TYPE_CLOSE = 1)] =
        'V2NIM_SIGNALLING_EVENT_TYPE_CLOSE'),
      (e[(e.V2NIM_SIGNALLING_EVENT_TYPE_JOIN = 2)] =
        'V2NIM_SIGNALLING_EVENT_TYPE_JOIN'),
      (e[(e.V2NIM_SIGNALLING_EVENT_TYPE_INVITE = 3)] =
        'V2NIM_SIGNALLING_EVENT_TYPE_INVITE'),
      (e[(e.V2NIM_SIGNALLING_EVENT_TYPE_CANCEL_INVITE = 4)] =
        'V2NIM_SIGNALLING_EVENT_TYPE_CANCEL_INVITE'),
      (e[(e.V2NIM_SIGNALLING_EVENT_TYPE_REJECT = 5)] =
        'V2NIM_SIGNALLING_EVENT_TYPE_REJECT'),
      (e[(e.V2NIM_SIGNALLING_EVENT_TYPE_ACCEPT = 6)] =
        'V2NIM_SIGNALLING_EVENT_TYPE_ACCEPT'),
      (e[(e.V2NIM_SIGNALLING_EVENT_TYPE_LEAVE = 7)] =
        'V2NIM_SIGNALLING_EVENT_TYPE_LEAVE'),
      (e[(e.V2NIM_SIGNALLING_EVENT_TYPE_CONTROL = 8)] =
        'V2NIM_SIGNALLING_EVENT_TYPE_CONTROL'),
      (e[(e.V2NIM_SIGNALLING_EVENT_TYPE_KICK = 9)] =
        'V2NIM_SIGNALLING_EVENT_TYPE_KICK')
  })(ie || (ie = {})),
  (function (e) {
    ;(e[(e.V2NIM_SIGNALLING_CHANNEL_TYPE_AUDIO = 1)] =
      'V2NIM_SIGNALLING_CHANNEL_TYPE_AUDIO'),
      (e[(e.V2NIM_SIGNALLING_CHANNEL_TYPE_VIDEO = 2)] =
        'V2NIM_SIGNALLING_CHANNEL_TYPE_VIDEO'),
      (e[(e.V2NIM_SIGNALLING_CHANNEL_TYPE_CUSTOM = 3)] =
        'V2NIM_SIGNALLING_CHANNEL_TYPE_CUSTOM')
  })(re || (re = {})),
  (function (e) {
    ;(e[(e.V2NIM_USER_STATUS_TYPE_UNKNOWN = 0)] =
      'V2NIM_USER_STATUS_TYPE_UNKNOWN'),
      (e[(e.V2NIM_USER_STATUS_TYPE_LOGIN = 1)] =
        'V2NIM_USER_STATUS_TYPE_LOGIN'),
      (e[(e.V2NIM_USER_STATUS_TYPE_LOGOUT = 2)] =
        'V2NIM_USER_STATUS_TYPE_LOGOUT'),
      (e[(e.V2NIM_USER_STATUS_TYPE_DISCONNECT = 3)] =
        'V2NIM_USER_STATUS_TYPE_DISCONNECT')
  })(se || (se = {}))
var ae = {
    V2NIM_ERROR_CODE_UNKNOWN: { code: 0, message: 'unknown error' },
    V2NIM_ERROR_CODE_SUCCESS: { code: 200, message: 'success' },
    V2NIM_ERROR_CODE_HANDSHAKE: { code: 201, message: 'handshake error' },
    V2NIM_ERROR_CODE_REQUEST_TEMPERARY_FORBIDDEN: {
      code: 398,
      message: 'request temprary forbidden',
    },
    V2NIM_ERROR_CODE_SERVER_UNIT_ERROR: {
      code: 399,
      message: 'server unit error',
    },
    V2NIM_ERROR_CODE_FORBIDDEN: { code: 403, message: 'forbidden' },
    V2NIM_ERROR_CODE_NOT_FOUND: { code: 404, message: 'not found' },
    V2NIM_ERROR_CODE_PARAMETER_ERROR: { code: 414, message: 'parameter error' },
    V2NIM_ERROR_CODE_RATE_LIMIT_REACHED: {
      code: 416,
      message: 'rate limit reached',
    },
    V2NIM_ERROR_CODE_MULTI_LOGIN_FORBIDDEN: {
      code: 417,
      message: 'multi login forbidden',
    },
    V2NIM_ERROR_CODE_SERVER_INTERNAL_ERROR: {
      code: 500,
      message: 'server internal error',
    },
    V2NIM_ERROR_CODE_SERVER_BUSY: { code: 503, message: 'server busy' },
    V2NIM_ERROR_CODE_APP_UNREACHABLE: {
      code: 511,
      message: 'app server unreachable',
    },
    V2NIM_ERROR_CODE_SERVICE_UNAVAILABLE: {
      code: 514,
      message: 'service unavailable',
    },
    V2NIM_ERROR_CODE_PROTOCOL_BLACKHOLE_FILTERED: {
      code: 599,
      message: 'protocol filtered by blackhole rule',
    },
    V2NIM_ERROR_CODE_NO_PERMISSION: {
      code: 997,
      message: 'appid has no permission to call the protocol',
    },
    V2NIM_ERROR_CODE_UNPACK_ERROR: { code: 998, message: 'unpack error' },
    V2NIM_ERROR_CODE_PACK_ERROR: { code: 999, message: 'pack error' },
    V2NIM_ERROR_CODE_IM_DISABLED: { code: 101301, message: 'IM disabled' },
    V2NIM_ERROR_CODE_SERVICE_ADDRESS_INVALID: {
      code: 101302,
      message: 'service address invalid',
    },
    V2NIM_ERROR_CODE_APPKEY_NOT_EXIST: {
      code: 101303,
      message: 'appkey not exist',
    },
    V2NIM_ERROR_CODE_BUNDLEID_CHECK_FAILED: {
      code: 101304,
      message: 'bundleid check failed',
    },
    V2NIM_ERROR_CODE_APPKEY_BLOCKED: {
      code: 101403,
      message: 'appkey blocked',
    },
    V2NIM_ERROR_CODE_INVALID_TOKEN: { code: 102302, message: 'invalid token' },
    V2NIM_ERROR_CODE_ROBOT_NOT_ALLOWED: {
      code: 102303,
      message: 'robot not allowed',
    },
    V2NIM_ERROR_CODE_ACCOUNT_NOT_EXIST: {
      code: 102404,
      message: 'account not exist',
    },
    V2NIM_ERROR_CODE_ACCOUNT_CHAT_BANNED: {
      code: 102421,
      message: 'account chat banned',
    },
    V2NIM_ERROR_CODE_ACCOUNT_BANNED: {
      code: 102422,
      message: 'account banned',
    },
    V2NIM_ERROR_CODE_ACCOUNT_IN_BLOCK_LIST: {
      code: 102426,
      message: 'account in block list',
    },
    V2NIM_ERROR_CODE_USER_PROFILE_NOT_EXIST: {
      code: 103404,
      message: 'user profile not exist',
    },
    V2NIM_ERROR_CODE_USER_PROFILE_HIT_ANTISPAM: {
      code: 103451,
      message: 'user profile hit antispam',
    },
    V2NIM_ERROR_CODE_PEER_FRIEND_LIMIT: {
      code: 104301,
      message: 'peer friend limit',
    },
    V2NIM_ERROR_CODE_FRIEND_APPLICATION_NOT_EXIST: {
      code: 104302,
      message: 'friend application not exist',
    },
    V2NIM_ERROR_CODE_FRIEND_NOT_EXIST: {
      code: 104404,
      message: 'friend not exist',
    },
    V2NIM_ERROR_CODE_FRIEND_ALREADY_EXIST: {
      code: 104405,
      message: 'friend already exist',
    },
    V2NIM_ERROR_CODE_SELF_FRIEND_OPERATION_NOT_ALLOWED: {
      code: 104429,
      message: 'self friend operation not allowed',
    },
    V2NIM_ERROR_CODE_FRIEND_LIMIT: { code: 104435, message: 'friend limit' },
    V2NIM_ERROR_CODE_FRIEND_OPERATION_RATE_LIMIT: {
      code: 104449,
      message: 'friend operation rate limit',
    },
    V2NIM_ERROR_CODE_FRIEND_HIT_ANTISPAM: {
      code: 104451,
      message: 'friend hit antispam',
    },
    V2NIM_ERROR_CODE_SELF_MUTE_OPERATION_NOT_ALLOWED: {
      code: 105429,
      message: 'self mute operation not allowed',
    },
    V2NIM_ERROR_CODE_MUTE_LIST_LIMIT: {
      code: 105435,
      message: 'mute list limit',
    },
    V2NIM_ERROR_CODE_SELF_BLOCK_LIST_OPERATION_NOT_ALLOWED: {
      code: 106429,
      message: 'self block list operation not allowed',
    },
    V2NIM_ERROR_CODE_BLOCK_LIST_LIMIT: {
      code: 106435,
      message: 'block list limit',
    },
    V2NIM_ERROR_CODE_REVOKE_THIRD_PARTY_MESSAGE_NOT_ALLOWED: {
      code: 107301,
      message: 'revoke third party message not allowed',
    },
    V2NIM_ERROR_CODE_SHORT_TO_LONG_URL_FAILED: {
      code: 107307,
      message: 'short to long URL failed',
    },
    V2NIM_ERROR_CODE_URL_INVALID: { code: 107308, message: 'URL invalid' },
    V2NIM_ERROR_CODE_DURATION_OUT_OF_RANGE: {
      code: 107309,
      message: 'duration out of range',
    },
    V2NIM_ERROR_CODE_GET_FILE_META_INFO_FAILED: {
      code: 107310,
      message: 'get file meta info failed',
    },
    V2NIM_ERROR_CODE_AUDIO_FILE_SIZE_LIMIT: {
      code: 107311,
      message: 'audio file size limit',
    },
    V2NIM_ERROR_CODE_VOICE_TO_TEXT_TIMEOUT: {
      code: 107312,
      message: 'voice to text timeout',
    },
    V2NIM_ERROR_CODE_VOICE_TO_TEXT_FAILED: {
      code: 107313,
      message: 'voice to text failed',
    },
    V2NIM_ERROR_CODE_REVOKE_EXCEED_TIME_LIMIT: {
      code: 107314,
      message: 'revoke message exceed time limit',
    },
    V2NIM_ERROR_CODE_REVOKE_MESSAGE_NOT_ALLOWED: {
      code: 107315,
      message: 'revoke specific message not allowed',
    },
    V2NIM_ERROR_CODE_FORCE_PUSH_LIST_LIMIT: {
      code: 107316,
      message: 'force push list limit',
    },
    V2NIM_ERROR_CODE_TEAM_MESSAGE_RECEIPT_RATE_LIMIT: {
      code: 107317,
      message: 'team message receipt rate limit',
    },
    V2NIM_ERROR_CODE_SNAPSHOT_NOT_EXIST: {
      code: 107318,
      message: 'snapshot not exist',
    },
    V2NIM_ERROR_CODE_PIN_LIMIT: { code: 107319, message: 'pin limit' },
    V2NIM_ERROR_CODE_PIN_NOT_EXIST: { code: 107320, message: 'pin not exist' },
    V2NIM_ERROR_CODE_QUICK_COMMENT_LIMIT: {
      code: 107321,
      message: 'quick comment limit',
    },
    V2NIM_ERROR_CODE_PIN_ALREADY_EXIST: {
      code: 107322,
      message: 'pin already exist',
    },
    V2NIM_ERROR_CODE_VOICE_TO_TEXT_FUNCTION_DISABLED: {
      code: 107333,
      message: 'voice to text function disabled',
    },
    V2NIM_ERROR_CODE_CLOUD_SEARCH_FUNCTION_DISABLED: {
      code: 107334,
      message: 'cloud search function disabled',
    },
    V2NIM_ERROR_CODE_ONE_WAY_DELETE_FUNCTION_DISABLED: {
      code: 107335,
      message: 'one-way delete function disabled',
    },
    V2NIM_ERRPR_CODE_ONEWAY_DELETION_NOT_ALLOW_FOR_TARGET_MESSAGES: {
      code: 107338,
      message: 'one-way deletion is not allowed for target messages',
    },
    V2NIM_ERRPR_CODE_SENDER_CANNOT_INCLUDED_IN_TARGET_LIST: {
      code: 107339,
      message: 'The message sender cannot be included in the target list',
    },
    V2NIM_ERROR_CODE_ROBOT_CANNOT_SEND_TARGET_MESSAGE: {
      code: 107340,
      message: 'Robot can not send target message',
    },
    V2NIM_ERROR_CODE_PIN_TARGET_MESSAGE_NOT_ALLOWED: {
      code: 107345,
      message: 'Pin target message is not allowed',
    },
    V2NIM_ERROR_CODE_TARGET_MESSAGE_NOT_ALLOWED_REPLY: {
      code: 107346,
      message: 'Target message not allowed reply',
    },
    V2NIM_ERROR_CODE_TARGET_MESSAGE_NOT_ALLOWED_QUICK_COMMENT: {
      code: 107347,
      message: 'Target message not allowed quick comment',
    },
    V2NIM_ERROR_CODE_REVOKE_MESSAGE_TO_SELF_NOT_ALLOWED: {
      code: 107429,
      message: 'revoke message to self not allowed',
    },
    V2NIM_ERROR_CODE_APP_CHAT_BANNED: {
      code: 107410,
      message: 'app chat banned',
    },
    V2NIM_ERROR_CODE_QUICK_COMMENT_FUNCTION_DISABLED: {
      code: 107326,
      message: 'quick comment function disabled',
    },
    V2NIM_ERROR_CODE_PIN_FUNCTION_DISABLED: {
      code: 107327,
      message: 'PIN function disabled',
    },
    V2NIM_ERROR_CODE_TEAM_READ_RECEIPT_FUNCTION_DISABLED: {
      code: 107324,
      message: 'read receipt for team messages function disabled',
    },
    V2NIM_ERROR_CODE_P2P_READ_RECEIPT_FUNCTION_DISABLED: {
      code: 107325,
      message: 'read receipt for p2p messages function disabled',
    },
    V2NIM_ERROR_CODE_RATE_LIMIT_FOR_MESSAGING_REACHED: {
      code: 107323,
      message: 'rate limit for messaging reached',
    },
    V2NIM_ERROR_CODE_MESSAGE_HIT_ANTISPAM: {
      code: 107451,
      message: 'message hit antispam',
    },
    V2NIM_ERROR_CODE_MESSAGE_NOT_EXIST: {
      code: 107404,
      message: 'message not exist',
    },
    V2NIM_ERROR_CODE_UNSENDING_MESSAGE_EXPIRED: {
      code: 107406,
      message: 'unsending message expired',
    },
    V2NIM_ERROR_CODE_TEAM_MARK_READ_FAILED: {
      code: 107302,
      message:
        'sending message failed for marking message read failed for too many team members',
    },
    V2NIM_ERROR_CODE_SENDER_OR_MANAGER_PERMISSION_ONLY_REVOKE: {
      code: 107303,
      message: 'only sender or manager can revoke message',
    },
    V2NIM_ERROR_CODE_DELETE_SELF_MESSAGE_NOT_ALLOWED: {
      code: 107328,
      message: 'delete self message not allowed',
    },
    V2NIM_ERROR_CODE_NOT_CHATBOT_ACCOUNT: {
      code: 107329,
      message: 'is not chatbot account',
    },
    V2NIM_ERROR_CODE_MESSAGE_SENSE_REQUIRED: {
      code: 107330,
      message: 'sender or receiver must sense message',
    },
    V2NIM_ERROR_CODE_HIGH_PRIORITY_MESSAGE_RATE_LIMIT: {
      code: 107304,
      message: 'rate limit of high-priority messages exceeded',
    },
    ACK_MESSAGE_BE_HIGH_PRIORITY: {
      code: 107305,
      message: 'ack message should be high-priority',
    },
    V2NIM_ERROR_CODE_DUPLICATE_CLIENT_MESSAGE_ID: {
      code: 107306,
      message: 'duplicate client message ID',
    },
    V2NIM_ERROR_CODE_INVALID_TIME_RANGE: {
      code: 107439,
      message: 'invalid time range',
    },
    V2NIM_ERROR_CODE_NOT_ADVANCED_TEAM: {
      code: 108302,
      message: 'not advanced team',
    },
    V2NIM_ERROR_CODE_TEAM_MANAGER_LIMIT: {
      code: 108303,
      message: 'team manager limit',
    },
    V2NIM_ERROR_CODE_JOINED_TEAM_LIMIT: {
      code: 108305,
      message: 'joined team limit',
    },
    V2NIM_ERROR_CODE_TEAM_NORMAL_MEMBER_CHAT_BANNED: {
      code: 108306,
      message: 'team normal member chat banned',
    },
    V2NIM_ERROR_CODE_INVITED_ACCOUNT_NOT_FRIEND: {
      code: 108307,
      message: 'invited account not friend',
    },
    V2NIM_ERROR_CODE_REJECT_ALL_TEAM_APPLICATIONS: {
      code: 108308,
      message: 'reject all team applications',
    },
    V2NIM_ERROR_CODE_TARGETING_MESSAGE_FOR_TEAM_DISABLED: {
      code: 108318,
      message: 'Targeting messages for group chat is disabled',
    },
    V2NIM_ERROR_CODE_INCLUSIVE_AS_FALSE_NOT_ALLOWED_FOR_SUPER_TEAM: {
      code: 108319,
      message: 'Setting "inclusive" to false for super teams is not allowed',
    },
    V2NIM_ERROR_CODE_CANNOT_MAKE_SUPER_TEAM_MESSAGE_VISIBLE_TO_NEW_MEMBERS: {
      code: 108320,
      message:
        'Cannot make super team targeted messages visible to new members',
    },
    V2NIM_ERROR_CODE_CANNOT_ALLOW_TARGETED_MESSAGES_INCLUSIVE_TO_NEW_MEMBERS: {
      code: 108321,
      message: 'Cannot allow targeted messages inclusive to new members',
    },
    V2NIM_ERROR_CODE_TEAM_NOT_EXIST: {
      code: 108404,
      message: 'team not exist',
    },
    V2NIM_ERROR_CODE_TEAM_ALREADY_CHAT_BANNED: {
      code: 108420,
      message: 'team already chat banned',
    },
    V2NIM_ERROR_CODE_ALL_TEAM_MEMBER_CHAT_BANNED: {
      code: 108423,
      message: 'all team member chat banned',
    },
    V2NIM_ERROR_CODE_EXTENDED_SUPER_TEAM_LIMIT: {
      code: 108434,
      message: 'extended super team limit',
    },
    V2NIM_ERROR_CODE_CREATED_TEAM_LIMIT: {
      code: 108435,
      message: 'created team limit',
    },
    V2NIM_ERROR_CODE_TEAM_INVITATION_LIMIT: {
      code: 108437,
      message: 'team invitation limit',
    },
    V2NIM_ERROR_CODE_TEAM_HIT_ANTISPAM: {
      code: 108451,
      message: 'team hit antispam',
    },
    V2NIM_ERROR_CODE_EXTENDED_SUPER_TEAM_LIMIT_NOT_CONFIGURED: {
      code: 108304,
      message: 'extended super team limit not configured',
    },
    V2NIM_ERROR_CODE_SUPER_TEAM_SERVICE_DISABLED: {
      code: 108311,
      message: 'super team service disabled',
    },
    V2NIM_ERROR_CODE_TEAM_READ_RECEIPT_RECORD_NOT_FOUND: {
      code: 108301,
      message: 'read receipt record for the team message not found',
    },
    V2NIM_ERROR_CODE_NOT_MANAGER: {
      code: 108430,
      message: 'unable to assign owner manager',
    },
    V2NIM_ERROR_CODE_ONLINE_MEMBER_COUNT_DISABLED: {
      code: 108406,
      message: 'number of online users service disabled',
    },
    V2NIM_ERROR_CODE_TRANSFER_DISABLED: {
      code: 108310,
      message: 'unable to transfer the ownership to owner',
    },
    V2NIM_ERROR_CODE_CREATE_TEAM_DISABLED: {
      code: 108309,
      message: 'unable to create team with more than %s people',
    },
    V2NIM_ERROR_CODE_EXTENDED_SUPER_TEAM_CREATE_FAILED: {
      code: 108313,
      message:
        '/ extended super team creation failed，use open api to create the team',
    },
    V2NIM_ERROR_CODE_TEAM_MESSAGE_READ_RECEIPT_DISABLED: {
      code: 108312,
      message: 'read receipt for team messages function disabled',
    },
    V2NIM_ERROR_CODE_RETRY: {
      code: 108449,
      message: 'an error occurred, try again',
    },
    V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_NOT_TEAM_MEMBER: {
      code: 109301,
      message: 'list of chat banned users contains non team members',
    },
    V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_OPERATOR: {
      code: 109303,
      message: 'list of chat banned users contains the operator',
    },
    V2NIM_ERROR_CODE_CHAT_BAN_LIST_CONTAIN_TEAM_OWNER: {
      code: 109304,
      message: 'list of chat banned users contains the team owner',
    },
    V2NIM_ERROR_CODE_OPERATION_ON_TEAM_MANAGER_NOT_ALLOWED: {
      code: 109305,
      message: 'operation on team manager not allowed',
    },
    V2NIM_ERROR_CODE_NO_TEAM_INVITE_PERMISSION: {
      code: 109306,
      message: 'no team invite permission',
    },
    V2NIM_ERROR_CODE_TEAM_OWNER_QUIT_NOT_ALLOWED: {
      code: 109307,
      message: 'team owner quit not allowed',
    },
    V2NIM_ERROR_CODE_TEAM_OWNER_IN_KICK_LIST: {
      code: 109308,
      message: 'list of kicked user contains the team owner',
    },
    V2NIM_ERROR_CODE_INVITE_ROBOT_ACCOUNT_NOT_ALLOWED: {
      code: 109309,
      message: 'invite robot account not allowed',
    },
    V2NIM_ERROR_CODE_KICK_OPERATOR_NOT_ALLOWED: {
      code: 109310,
      message: 'kick operator not allowed',
    },
    V2NIM_ERROR_CODE_TEAM_MEMBER_ALREADY_EXIST: {
      code: 109311,
      message: 'team member already exist',
    },
    V2NIM_ERROR_CODE_TEAM_INVITATION_OR_APPLICATION_NOT_EXIST: {
      code: 109313,
      message: 'team invitation or application not exist',
    },
    V2NIM_ERROR_CODE_OPERATION_ON_TEAM_OWNER_NOT_ALLOWED: {
      code: 109314,
      message: 'operation on team owner not allowed',
    },
    V2NIM_ERROR_CODE_FORCED_PUSH_LIST_INCLUDES_NON_TARGETED_ACCOUNTS: {
      code: 109318,
      message: 'The forced push list includes non-targeted accounts',
    },
    V2NIM_ERROR_CODE_TEAM_MEMBER_NOT_EXIST: {
      code: 109404,
      message: 'team member not exist',
    },
    V2NIM_ERROR_CODE_TEAM_MEMBER_CHAT_BANNED: {
      code: 109424,
      message: 'team member chat banned',
    },
    V2NIM_ERROR_CODE_TEAM_OWNER_OPERATION_PERMISSION_REQUIRED: {
      code: 109427,
      message: 'team owner operation permission required',
    },
    V2NIM_ERROR_CODE_TEAM_OWNER_OR_MANAGER_OPERATION_PERMISSION_REQUIRED: {
      code: 109432,
      message: 'team owner or manager operation permission required',
    },
    V2NIM_ERROR_CODE_TEAM_MEMBER_CONCURRENT_OPERATION_FAILED: {
      code: 109449,
      message: 'team member concurrent operation failed',
    },
    V2NIM_ERROR_CODE_TEAM_MEMBER_HIT_ANTISPAM: {
      code: 109451,
      message: 'team member hit antispam',
    },
    V2NIM_ERROR_CODE_CONVERSATION_AND_ACCOUNT_MISMATCH: {
      code: 110302,
      message: 'conversation and account mismatch',
    },
    V2NIM_ERROR_CODE_CONVERSATION_STICK_TOP_LIMIT: {
      code: 110303,
      message: 'conversation stick top limit',
    },
    V2NIM_ERROR_CODE_CONVERSATION_BELONGED_GROUP_LIMIT: {
      code: 110304,
      message: 'conversation belonged group limit',
    },
    V2NIM_ERROR_CODE_CONVERSATION_IS_NOT_STICK_TOP: {
      code: 110305,
      message: 'conversation is not stick top',
    },
    V2NIM_ERROR_CODE_STICK_TOP_DISABLED: {
      code: 110306,
      message: 'conversation stick top disabled',
    },
    V2NIM_ERROR_CODE_CONVERSATION_NOT_EXIST: {
      code: 110404,
      message: 'conversation not exist',
    },
    V2NIM_ERROR_CODE_CHATROOM_LINK_UNAVAILABLE: {
      code: 113304,
      message: 'chatroom link unavailable',
    },
    V2NIM_ERROR_CODE_IM_CONNECTION_ABNORMAL: {
      code: 113305,
      message: 'IM connection abnormal',
    },
    V2NIM_ERROR_CODE_CHATROOM_NOT_EXIST: {
      code: 113404,
      message: 'chatroom not exist',
    },
    V2NIM_ERROR_CODE_CHATROOM_CLOSED: {
      code: 113406,
      message: 'chatroom closed',
    },
    V2NIM_ERROR_CODE_CHATROOM_REPEATED_OPERATION: {
      code: 113409,
      message: 'chatroom repeated operation',
    },
    V2NIM_ERROR_CODE_CHATROOM_DISABLED: {
      code: 113410,
      message: 'chatroom disabled',
    },
    V2NIM_ERROR_CODE_ALL_CHATROOM_MEMBER_CHAT_BANNED: {
      code: 113423,
      message: 'all chatroom member chat banned',
    },
    V2NIM_ERROR_CODE_CHATROOM_HIT_ANTISPAM: {
      code: 113451,
      message: 'chatroom hit antispam',
    },
    V2NIM_ERROR_CODE_ANONYMOUS_MEMBER_FORBIDDEN: {
      code: 114303,
      message: 'anonymous member forbidden',
    },
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_NOT_EXIST: {
      code: 114404,
      message: 'chatroom member not exist',
    },
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_REPEATED_OPERATION: {
      code: 114405,
      message: 'chatroom member repeated operation',
    },
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_CHAT_BANNED: {
      code: 114421,
      message: 'chatroom member chat banned',
    },
    V2NIM_ERROR_CODE_ACCOUNT_IN_CHATROOM_BLOCK_LIST: {
      code: 114426,
      message: 'account in chatroom block list',
    },
    V2NIM_ERROR_CODE_CHATROOM_OWNER_OPERATION_PERMISSION_REQUIRED: {
      code: 114427,
      message: 'chatroom owner operation permission required',
    },
    V2NIM_ERROR_CODE_SELF_IN_CHATROOM_MEMBER_OPERATION_LIST: {
      code: 114429,
      message: 'self in chatroom member operation list',
    },
    V2NIM_ERROR_CODE_CHATROOM_OWNER_OR_MANAGER_OPERATION_PERMISSION_REQUIRED: {
      code: 114432,
      message: 'chatroom owner or manager operation permission required',
    },
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_LIMIT: {
      code: 114437,
      message: 'chatroom member limit',
    },
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_CONCURRENT_OPERATION_FAILED: {
      code: 114449,
      message: 'chatroom member concurrent operation failed',
    },
    V2NIM_ERROR_CODE_CHATROOM_MEMBER_HIT_ANTISPAM: {
      code: 114451,
      message: 'chatroom member hit antispam',
    },
    V2NIM_ERROR_CODE_CONVERSATION_GROUP_NOT_EXIST: {
      code: 116404,
      message: 'conversation group not exist',
    },
    V2NIM_ERROR_CODE_CONVERSATION_GROUP_LIMIT: {
      code: 116435,
      message: 'conversation group limit',
    },
    V2NIM_ERROR_CODE_CONVERSATIONS_IN_GROUP_LIMIT: {
      code: 116437,
      message: 'conversations in group limit',
    },
    V2NIM_ERROR_CODE_COLLECTION_LIMIT: {
      code: 189301,
      message: 'collection limit',
    },
    V2NIM_ERROR_CODE_COLLECTION_NOT_EXIST: {
      code: 189302,
      message: 'collection not exist',
    },
    V2NIM_ERROR_CODE_COLLECTION_CONCURRENT_OPERATION_FAILED: {
      code: 189449,
      message: 'collection concurrent operation failed',
    },
    V2NIM_ERROR_CODE_INTERNAL: { code: 190001, message: 'internal error' },
    V2NIM_ERROR_CODE_ILLEGAL_STATE: { code: 190002, message: 'illegal state' },
    V2NIM_ERROR_CODE_MISUSE: { code: 191001, message: 'misuse' },
    V2NIM_ERROR_CODE_CANCELLED: {
      code: 191002,
      message: 'operation cancelled',
    },
    V2NIM_ERROR_CODE_CALLBACK_FAILED: {
      code: 191003,
      message: 'callback failed',
    },
    V2NIM_ERROR_CODE_INVALID_PARAMETER: {
      code: 191004,
      message: 'invalid parameter',
    },
    V2NIM_ERROR_CODE_TIMEOUT: { code: 191005, message: 'timeout' },
    V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST: {
      code: 191006,
      message: 'resource not exist',
    },
    V2NIM_ERROR_CODE_RESOURCE_ALREADY_EXIST: {
      code: 191007,
      message: 'resource already exist',
    },
    V2NIM_ERROR_CODE_CONNECT_FAILED: {
      code: 192001,
      message: 'connect failed',
    },
    V2NIM_ERROR_CODE_CONNECT_TIMEOUT: {
      code: 192002,
      message: 'connect timeout',
    },
    V2NIM_ERROR_CODE_DISCONNECT: { code: 192003, message: 'disconnect' },
    V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT: {
      code: 192004,
      message: 'protocol timeout',
    },
    V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED: {
      code: 192005,
      message: 'protocol send failed',
    },
    V2NIM_ERROR_CODE_REQUEST_FAILED: {
      code: 192006,
      message: 'request failed',
    },
    V2NIM_ERROR_CODE_FILE_NOT_FOUND: {
      code: 194001,
      message: 'file not found',
    },
    V2NIM_ERROR_CODE_FILE_CREATE_FAILED: {
      code: 194002,
      message: 'file create failed',
    },
    V2NIM_ERROR_CODE_FILE_OPEN_FAILED: {
      code: 194003,
      message: 'file open failed',
    },
    V2NIM_ERROR_CODE_FILE_WRITE_FAILED: {
      code: 194004,
      message: 'file write failed',
    },
    V2NIM_ERROR_CODE_FILE_READ_FAILED: {
      code: 194005,
      message: 'file read failed',
    },
    V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED: {
      code: 194006,
      message: 'file upload failed',
    },
    V2NIM_ERROR_CODE_FILE_DOWNLOAD_FAILED: {
      code: 194007,
      message: 'file download failed',
    },
    V2NIM_ERROR_CODE_CLIENT_ANTISPAM: {
      code: 195001,
      message: 'client anti-spam',
    },
    V2NIM_ERROR_CODE_SERVER_ANTISPAM: {
      code: 195002,
      message: 'server anti-spam',
    },
    V2NIM_ERROR_CODE_STREAM_OUTPUT_STOPPED: {
      code: 189318,
      message: 'Streaming text response stopped',
    },
    V2NIM_ERROR_CODE_STREAM_OUTPUT_GENERATED: {
      code: 189319,
      message: 'Streaming text response generated',
    },
    V2NIM_ERROR_CODE_STREAM_OUTPUT_ABORTED: {
      code: 189320,
      message: 'Streaming text response aborted due to exception',
    },
    V2NIM_ERROR_CODE_INTERRUPTION_REJECTED: {
      code: 189321,
      message: 'Non-streaming messages cannot be interrupted',
    },
  },
  ce = Object.keys(ae),
  de = ce.reduce(function (e, t) {
    var i = ae[t]
    return (e[t] = i.code), e
  }, {}),
  le = ce.reduce(function (e, t) {
    var i = ae[t]
    return (e[i.code] = i.message), e
  }, {}),
  pe = Object.freeze({
    __proto__: null,
    V2NIMErrorCode: de,
    V2NIMErrorDesc: le,
    get V2NIMDataSyncLevel() {
      return s
    },
    get V2NIMDataSyncType() {
      return n
    },
    get V2NIMDataSyncState() {
      return o
    },
    get V2NIMConversationType() {
      return a
    },
    get V2NIMLastMessageState() {
      return c
    },
    get V2NIMFriendAddMode() {
      return d
    },
    get V2NIMFriendAddApplicationType() {
      return l
    },
    get V2NIMFriendAddApplicationStatus() {
      return p
    },
    get V2NIMFriendDeletionType() {
      return h
    },
    get V2NIMFriendVerifyType() {
      return u
    },
    get V2NIMLoginAuthType() {
      return m
    },
    get V2NIMLoginStatus() {
      return g
    },
    get V2NIMLoginClientType() {
      return v
    },
    get V2NIMKickedOfflineReason() {
      return f
    },
    get V2NIMLoginClientChange() {
      return y
    },
    get V2NIMConnectStatus() {
      return I
    },
    get V2NIMMessageType() {
      return S
    },
    get V2NIMMessageNotificationType() {
      return A
    },
    get V2NIMMessageAttachmentUploadState() {
      return R
    },
    get V2NIMMessageSendingState() {
      return O
    },
    get V2NIMQueryDirection() {
      return b
    },
    get V2NIMMessageRevokeType() {
      return V
    },
    get V2NIMMessagePinState() {
      return P
    },
    get V2NIMMessageQuickCommentType() {
      return L
    },
    get V2NIMClientAntispamOperateType() {
      return D
    },
    get V2NIMSortOrder() {
      return w
    },
    get V2NIMSystemMessageType() {
      return U
    },
    get V2NIMMessageAIStreamStatus() {
      return M
    },
    get V2NIMMessageAIStreamStopOpType() {
      return _
    },
    get V2NIMMessageAIRegenOpType() {
      return E
    },
    get V2NIMMessageAIStatus() {
      return T
    },
    get V2NIMSearchKeywordMatchType() {
      return C
    },
    get V2NIMClearHistoryMode() {
      return k
    },
    get V2NIMMessageStreamStatus() {
      return x
    },
    get V2NIMTeamMessageMuteMode() {
      return F
    },
    get V2NIMP2PMessageMuteMode() {
      return B
    },
    get V2NIMTeamMemberRoleQueryType() {
      return $
    },
    get V2NIMTeamType() {
      return G
    },
    get V2NIMTeamJoinMode() {
      return j
    },
    get V2NIMTeamAgreeMode() {
      return q
    },
    get V2NIMTeamInviteMode() {
      return H
    },
    get V2NIMTeamUpdateInfoMode() {
      return Y
    },
    get V2NIMTeamChatBannedMode() {
      return K
    },
    get V2NIMTeamUpdateExtensionMode() {
      return W
    },
    get V2NIMTeamJoinActionType() {
      return z
    },
    get V2NIMTeamJoinActionStatus() {
      return X
    },
    get V2NIMTeamNotificationType() {
      return Q
    },
    get V2NIMTeamMemberRole() {
      return J
    },
    get V2NIMAIModelRoleType() {
      return te
    },
    get V2NIMAIModelType() {
      return Z
    },
    get V2NIMAIModelStreamCallStatus() {
      return ee
    },
    get V2NIMSignallingChannelType() {
      return re
    },
    get V2NIMSignallingEventType() {
      return ie
    },
    get V2NIMUserStatusType() {
      return se
    },
  })
class he extends Error {
  constructor(e) {
    super(e.desc),
      (this.name = 'V2NIMError'),
      (this.code = e.code || 0),
      (this.desc = e.desc || le[this.code] || ve[this.code] || ''),
      (this.message = this.desc),
      (this.detail = e.detail || {})
  }
  toString() {
    var e,
      t = `${this.name}\n code: ${this.code}\n message: "${
        this.message
      }"\n detail: ${this.detail ? JSON.stringify(this.detail) : ''}`
    return (
      (null === (e = null == this ? void 0 : this.detail) || void 0 === e
        ? void 0
        : e.rawError) && (t += `\n rawError: ${this.detail.rawError.message}`),
      t
    )
  }
}
class ue extends he {
  constructor(e, t = {}, i) {
    super({
      code: de.V2NIM_ERROR_CODE_PARAMETER_ERROR,
      detail: { reason: e, rules: i, data: t },
    }),
      (this.name = 'validateError'),
      (this.message =
        this.message + '\n' + JSON.stringify(this.detail, null, 2)),
      (this.data = t),
      (this.rules = i)
  }
}
class me extends he {
  constructor(e) {
    var t, i, r
    super({
      code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
      detail: {
        reason: null === (t = e.detail) || void 0 === t ? void 0 : t.reason,
        rules: null === (i = e.detail) || void 0 === i ? void 0 : i.rules,
        data: null === (r = e.detail) || void 0 === r ? void 0 : r.data,
      },
    }),
      (this.name = 'ValidateErrorV2')
  }
}
class ge extends he {
  constructor(e) {
    super(Object.assign({ code: 400 }, e)),
      (this.desc = this.desc || 'upload file error'),
      (this.message = this.desc),
      (this.name = 'uploadError')
  }
}
var ve = {
  200: null,
  406: null,
  808: null,
  810: null,
  302: 'The user name or password is incorrect.',
  405: 'Parameter length too long',
  408: 'Client request timed out',
  415: 'Client network unavailable',
  422: 'Account disabled',
  508: 'Expiration date',
  509: 'Invalid',
  7101: 'Be pulled black',
  700: 'Partial failure of batch operation',
  801: 'The number of people in the team has reached the upper limit',
  802: 'No permission',
  803: 'The team does not exist or has not changed',
  804: 'The user is not in the team',
  805: 'Team type mismatch',
  806: 'The number of teams created has reached the limit',
  807: 'Team member not valid',
  809: 'Already in the team',
  811: 'The number of accounts in the forced push list exceeds the limit',
  812: 'The team is muted',
  813: 'Due to the limited number of team, some pull people successfully',
  814: 'Disable team message read service',
  815: 'Maximum number of team administrators',
  816: 'Batch operation partial failure',
  9102: 'Channel failure',
  9103: 'This call has been answered / rejected at another end',
  10201: 'Signaling: target NIM client is offline',
  10202: 'Signaling: push is unreachable',
  10404: 'Signaling: channel not exists',
  10405: 'Signaling: channel already exists',
  10406: 'Signaling: member of channel not exists',
  10407: 'Signaling: member of channel already exists',
  10408: 'Signaling: the invitation request does not exist or has expired',
  10409: 'Signaling: the invitation request has been rejected',
  10410: 'Signaling: the invitation request has been accepted',
  10414: 'Signaling: request parameter error',
  10417: 'Signaling: uid conflict',
  10419: 'Signaling: the number of members of channel exceed the limit',
  10420: 'Signaling: member is already in the channel on other client',
  10700: 'Signaling: phased success',
  13002: 'Abnormal chatroom status',
  13003: 'In the blacklist',
  13004: 'In the mute list',
  13006: 'All members are muted, and only the administrator can speak',
}
function fe(e, t) {
  return t instanceof RegExp ? '__REGEXP ' + t.toString() : t
}
function ye(e, t = {}, i, r = !1) {
  var s = {}
  return (
    Object.keys(e).forEach((n) => {
      var o = e[n].type,
        a = i ? `In ${i}, ` : ''
      if (null == t) {
        var c = `${a}param is null or undefined`
        throw r
          ? new me({
              detail: { reason: c, data: { key: n }, rules: 'required' },
            })
          : new ue(c, { key: n }, 'required')
      }
      if (void 0 === t[n]) {
        if (!1 === e[n].required) return void (s[n] = t[n])
        var d = `${a}param '${n}' is required`
        throw r
          ? new me({
              detail: { reason: d, data: { key: n }, rules: 'required' },
            })
          : new ue(d, { key: n }, 'required')
      }
      var l = Ie[o]
      if (l && !l(t, n, e[n], r)) {
        var p = `${a}param '${n}' unexpected`,
          h = { key: n, value: t[n] }
        throw r
          ? new me({
              detail: { reason: p, data: h, rules: JSON.stringify(e[n], fe) },
            })
          : new ue(p, h, JSON.stringify(e[n], fe))
      }
      s[n] = t[n]
    }),
    s
  )
}
var Ie = {
  string: function (e, t, i) {
    var { allowEmpty: r, max: s, min: n, regExp: o } = i,
      a = e[t]
    return !(
      'string' != typeof a ||
      (!1 === r && '' === a) ||
      ('number' == typeof s && a.length > s) ||
      ('number' == typeof n && a.length < n) ||
      ((function (e) {
        return '[object RegExp]' === Object.prototype.toString.call(e)
      })(o) &&
        !o.test(a))
    )
  },
  number: function (e, t, i) {
    var { min: r, max: s } = i,
      n = e[t]
    return !(
      'number' != typeof n ||
      ('number' == typeof r && n < r) ||
      ('number' == typeof s && n > s)
    )
  },
  boolean: function (e, t) {
    return 'boolean' == typeof e[t]
  },
  file: function (e, t) {
    return !0
  },
  enum: function (e, t, i) {
    var { values: r } = i,
      s = e[t]
    return !r || r.indexOf(s) > -1
  },
  jsonstr: function (e, t) {
    try {
      var i = JSON.parse(e[t])
      return 'object' == typeof i && null !== i
    } catch (e) {
      return !1
    }
  },
  func: function (e, t) {
    return 'function' == typeof e[t]
  },
  array: function (e, t, i, r = !1) {
    var { itemType: s, itemRules: n, rules: o, min: a, max: c, values: d } = i,
      l = e[t]
    if (!Array.isArray(l)) return !1
    if ('number' == typeof c && l.length > c) return !1
    if ('number' == typeof a && l.length < a) return !1
    if (n)
      l.forEach((e, i) => {
        ye({ [i]: n }, { [i]: e }, `${t}[${i}]`, r)
      })
    else if (o) l.forEach((e, i) => ye(o, e, `${t}[${i}]`, r))
    else if ('enum' === s) {
      if (
        d &&
        (function (e, t) {
          return (t = t || []), (e = e || []).filter((e) => -1 === t.indexOf(e))
        })(l, d).length
      )
        return !1
    } else if (s && !l.every((e) => typeof e === s)) return !1
    return !0
  },
  object: function (e, t, i, r = !1) {
    var { rules: s, allowEmpty: n } = i,
      o = e[t]
    if ('object' != typeof o || null === o) return !1
    if (s) {
      var a = Object.keys(s),
        c = Object.keys(o).filter((e) => a.indexOf(e) > -1)
      if (!1 === n && 0 === c.length) return !1
      ye(s, o, t, r)
    }
    return !0
  },
}
function Me(e, t) {
  if (!e) throw new he({ code: de.V2NIM_ERROR_CODE_ILLEGAL_STATE })
  ye(
    {
      conversationId: {
        type: 'string',
        allowEmpty: !1,
        regExp: new RegExp(`^${e}\\|[1-3]\\|`),
      },
    },
    { conversationId: t },
    '',
    !0
  )
}
class _e {
  constructor() {
    ;(this.timerList = []),
      (this.id = 1),
      (this.timer = null),
      (this.timeout = 0)
  }
  addTimer(e, t = 0, i = 1) {
    var r = new Date().getTime(),
      s = this.id
    return (
      this.timerList.push({
        id: s,
        loop: i,
        count: 0,
        timeout: r + t,
        interval: t,
        callback: e,
      }),
      this.id++,
      this.checkTimer(r),
      s
    )
  }
  checkTimer(e = new Date().getTime()) {
    if (
      (this.removeFinished(), 0 !== this.timerList.length || null == this.timer)
    ) {
      var t = 0
      for (var i of this.timerList)
        (0 === t || t > i.timeout) && (t = i.timeout)
      0 !== this.timerList.length &&
        (null === this.timer || t < this.timeout || this.timeout < e) &&
        ((this.timer = setTimeout(this.nowTime.bind(this), t - e)),
        (this.timeout = t))
    }
  }
  nowTime() {
    var e = new Date().getTime()
    for (var t of this.timerList)
      e >= t.timeout && (t.callback(), t.count++, (t.timeout = e + t.interval))
    this.clerTime(), this.checkTimer(e)
  }
  clerTime() {
    null !== this.timer && (clearTimeout(this.timer), (this.timer = null))
  }
  deleteTimer(e) {
    for (var t = this.timerList.length - 1; t >= 0; t--)
      this.timerList[t].id === e && this.timerList.splice(t, 1)
  }
  removeFinished() {
    for (var e = this.timerList.length - 1; e >= 0; e--) {
      var t = this.timerList[e]
      t.loop >= 0 && t.count >= t.loop && this.timerList.splice(e, 1)
    }
  }
  destroy() {
    this.clerTime(), (this.timerList = []), (this.id = 1), (this.timer = null)
  }
}
function Ee(e, t) {
  var i = {}
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (i[r] = e[r])
  if (null != e && 'function' == typeof Object.getOwnPropertySymbols) {
    var s = 0
    for (r = Object.getOwnPropertySymbols(e); s < r.length; s++)
      t.indexOf(r[s]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[s]) &&
        (i[r[s]] = e[r[s]])
  }
  return i
}
function Te(e, t, i, r) {
  return new (i || (i = Promise))(function (s, n) {
    function o(e) {
      try {
        c(r.next(e))
      } catch (e) {
        n(e)
      }
    }
    function a(e) {
      try {
        c(r.throw(e))
      } catch (e) {
        n(e)
      }
    }
    function c(e) {
      e.done
        ? s(e.value)
        : (function (e) {
            return e instanceof i
              ? e
              : new i(function (t) {
                  t(e)
                })
          })(e.value).then(o, a)
    }
    c((r = r.apply(e, t || [])).next())
  })
}
function Se(e) {
  return (
    null != e &&
    'object' == typeof e &&
    Object.getPrototypeOf(e) == Object.prototype
  )
}
function Ce(e, t) {
  var i = Se(e) || Array.isArray(e),
    r = Se(t) || Array.isArray(t)
  if (i && r) {
    for (var s in t) {
      var n = Ce(e[s], t[s])
      void 0 !== n && (e[s] = n)
    }
    return e
  }
  return t
}
var Ne = {
    getNetworkStatus: () => Promise.resolve({ net_type: 0, net_connect: !0 }),
    onNetworkStatusChange(e) {},
    offNetworkStatusChange() {},
  },
  Ae = {
    setLogger: function (e) {
      throw new Error('setLogger not implemented.')
    },
    platform: '',
    WebSocket: class {
      constructor(e, t) {
        throw (
          ((this.CONNECTING = 0),
          (this.OPEN = 1),
          (this.CLOSING = 2),
          (this.CLOSED = 3),
          (this.binaryType = ''),
          new Error('Method not implemented.'))
        )
      }
      close(e, t) {
        throw new Error('Method not implemented.')
      }
      send(e) {
        throw new Error('Method not implemented.')
      }
      onclose(e) {
        throw new Error('Method not implemented.')
      }
      onerror(e) {
        throw new Error('Method not implemented.')
      }
      onmessage(e) {
        throw new Error('Method not implemented.')
      }
      onopen(e) {
        throw new Error('Method not implemented.')
      }
    },
    localStorage: {},
    request: function (e, t) {
      throw new Error('request not implemented.')
    },
    uploadFile: function (e) {
      throw new Error('uploadFile not implemented.')
    },
    getSystemInfo: function () {
      throw new Error('getSystemInfo not implemented.')
    },
    getFileUploadInformation(e) {
      throw new Error('getFileUploadInformation not implemented.')
    },
    envPayload: {},
    net: Ne,
    logStorage: class {
      constructor(e) {}
      open() {
        return Promise.resolve()
      }
      close() {}
      addLogs(e) {
        return Promise.resolve()
      }
      extractLogs() {
        return Promise.resolve()
      }
      afterUpload() {
        return Promise.resolve()
      }
    },
  },
  Re = ['error', 'warn', 'log', 'debug'],
  Oe = function () {},
  be = ['off', 'error', 'warn', 'log', 'debug']
class ke {
  constructor(e, t = {}) {
    ;(this.storageArr = []),
      (this.debugLevel = 'off'),
      (this.timer = 0),
      (this.strategies = {
        debug: { name: 'debg', func: console.log },
        log: { name: 'info', func: console.log },
        warn: { name: 'warn', func: console.warn },
        error: { name: 'erro', func: console.error },
      }),
      (this.debug = Oe),
      (this.log = Oe),
      (this.warn = Oe),
      (this.error = Oe),
      (this.iid = Math.round(1e3 * Math.random())),
      (this.debugLevel = be.includes(e) ? e : 'off'),
      t.debugLevel &&
        (this.debugLevel = be.includes(t.debugLevel)
          ? t.debugLevel
          : this.debugLevel),
      (this.logStorage =
        !1 === t.storageEnable
          ? null
          : new Ae.logStorage(null == t ? void 0 : t.storageName)),
      this.setOptions(t),
      this.setLogFunc(this.debugLevel),
      this.setTimer(),
      Ae.setLogger(this),
      this.open()
  }
  getDebugMode() {
    return 'debug' === this.debugLevel
  }
  open() {
    this.logStorage &&
      this.logStorage
        .open()
        .then(() => {
          this.log('Logger::open success')
        })
        .catch((e) => {
          this.warn('Logger::open failed', e)
        })
  }
  setOptions(e) {
    if (e && e.logFunc) {
      var t = e.logFunc
      for (var i in t) {
        var r = i,
          s = t[r]
        s && (this.strategies[r].func = s)
      }
    }
  }
  setLogFunc(e, t = 'log') {
    var i = Re.findIndex((t) => t === e),
      r = Re.findIndex((e) => e === t)
    Re.forEach((e, t) => {
      this[e] = function () {
        if (!(t > i && t > r)) {
          var s = Array.prototype.slice.call(arguments),
            n = this.strategies[e],
            o = this.formatArgs(s, n.name)
          t <= r && this.logStorage && this.prepareSaveLog(o, e),
            t <= i && n.func(o)
        }
      }
    })
  }
  extractLogs() {
    var e
    return this.logStorage
      ? null === (e = this.logStorage) || void 0 === e
        ? void 0
        : e.extractLogs()
      : Promise.resolve('')
  }
  afterUpload() {
    var e
    return this.logStorage
      ? null === (e = this.logStorage) || void 0 === e
        ? void 0
        : e.afterUpload()
      : Promise.resolve('')
  }
  prepareSaveLog(e, t) {
    this.storageArr.push({
      text: e,
      level: t,
      time: Date.now(),
      iid: this.iid,
    }),
      this.timer || this.setTimer(),
      this.storageArr.length >= 100 &&
        (this.triggerTimer(), (this.storageArr = []))
  }
  saveLogs() {
    return Te(this, void 0, void 0, function* () {
      if (this.logStorage) {
        var e = this.storageArr
        this.storageArr = []
        try {
          yield this.logStorage.addLogs(e)
        } catch (e) {}
      }
    })
  }
  clearTimer() {
    this.timer && clearTimeout(this.timer), (this.timer = 0)
  }
  setTimer() {
    this.clearTimer(),
      (this.timer = setTimeout(this.triggerTimer.bind(this), 5e3))
  }
  triggerTimer() {
    this.clearTimer(), this.saveLogs()
  }
  formatArgs(e, t) {
    var i = new Date()
    return (
      `[NIM ${this.iid} ${t} ${
        i.getMonth() + 1
      }-${i.getDate()} ${i.getHours()}:${i.getMinutes()}:${i.getSeconds()}:${i.getMilliseconds()}] ` +
      e
        .map((e) =>
          e instanceof he
            ? e.toString()
            : e instanceof Error
            ? e && e.message
              ? e.message
              : e
            : 'object' == typeof e
            ? JSON.stringify(e)
            : e
        )
        .join(' ')
    )
  }
  destroy() {
    ;(this.debug = Oe),
      (this.log = Oe),
      (this.warn = Oe),
      (this.error = Oe),
      this.saveLogs(),
      this.clearTimer(),
      (this.storageArr = []),
      this.logStorage && this.logStorage.close()
  }
}
function Ve(e, t) {
  if ('object' != typeof e || null === e) return e
  for (var i = (t = t || '').split('.'), r = 0; r < i.length; r++) {
    var s = i[r],
      n = e[s],
      o = s.indexOf('['),
      a = s.indexOf(']')
    if (-1 !== o && -1 !== a && o < a) {
      var c = s.slice(0, o),
        d = parseInt(s.slice(o + 1, a))
      ;(n = e[c]), (n = Array.isArray(n) ? n[d] : void 0)
    }
    if (null == n) return n
    e = n
  }
  return e
}
var Pe,
  Le =
    ((Pe = function () {
      return ((65536 * (1 + Math.random())) | 0).toString(16).substring(1)
    }),
    function () {
      return Pe() + Pe() + Pe() + Pe() + Pe() + Pe() + Pe() + Pe()
    })
function De() {
  var { hostEnvEnum: e } = Ae.getSystemInfo()
  return 6 === e || 102 === e || 103 === e || 104 === e
}
function we(e, t) {
  return (function (e, t, i, r) {
    for (var s in ((e = e || {}),
    (i = i || {}),
    (r = r || (() => {})),
    (t = t || {}))) {
      var n = r(e[s], t[s])
      e[s] = void 0 === n ? t[s] : n
    }
    for (var o in i) {
      var a = r(e[o], i[o])
      e[o] = void 0 === a ? i[o] : a
    }
    return e
  })({}, e, t, function (e, t) {
    return void 0 === t ? e : t
  })
}
function Ue() {
  return Promise.resolve()
}
function xe() {}
function Fe(e) {
  var t = e.lastIndexOf('.'),
    i = t > -1 ? e.slice(t + 1) : ''
  return /^\d+$/.test(i.trim()) && (i = ''), i
}
function Be(e, t, i) {
  return 0 === e.length || e[0][t] <= i
    ? 0
    : e[e.length - 1][t] > i
    ? e.length
    : e.findIndex((r, s) => {
        if (e[s - 1] && e[s - 1][t] > i && i >= r[t]) return !0
      })
}
function $e(e, t, i, r) {
  var s = 'number' == typeof Ve(e, 'raw.r[0]') ? `${e.raw.r[0]}` : void 0
  return (t[i] = t[i] || s || r), t
}
class Ge {
  constructor(e) {
    ;(this.lastSuccUploadHost = ''), (this.core = e)
  }
  getFileUploadInformation(e) {
    return Ae.getFileUploadInformation(e)
  }
  request(e, t, i) {
    var r = new Date().getTime(),
      s = (null == i ? void 0 : i.exception_service) || 0
    return Ae.request(e, t).catch((i) => {
      var n,
        o,
        a,
        c,
        d = i
      throw (
        (this.core.reporter.reportTraceStart('exceptions', {
          user_id:
            this.core.options.account ||
            (null ===
              (o =
                null === (n = this.core) || void 0 === n ? void 0 : n.auth) ||
            void 0 === o
              ? void 0
              : o.account),
          trace_id:
            null ===
              (c =
                null === (a = this.core.clientSocket) || void 0 === a
                  ? void 0
                  : a.socket) || void 0 === c
              ? void 0
              : c.sessionId,
          start_time: r,
          action: 1,
          exception_service: s,
        }),
        this.core.reporter.reportTraceUpdateV2(
          'exceptions',
          {
            code: 'number' == typeof d.code ? d.code : 0,
            description: d.message || `${d.code}`,
            operation_type: 0,
            target: e,
            context: t ? JSON.stringify(t) : '',
          },
          { asyncParams: Ae.net.getNetworkStatus() }
        ),
        this.core.reporter.reportTraceEnd('exceptions', 1),
        i)
      )
    })
  }
  uploadFile(e) {
    var t, i, r, s
    return Te(this, void 0, void 0, function* () {
      for (
        var n = 'BROWSER' === Ae.platform,
          o = n ? e.chunkUploadHostBackupList : e.commonUploadHostBackupList,
          a = n ? e.chunkUploadHost : e.commonUploadHost,
          c = o.indexOf(a),
          d = -1 === c ? [a, ...o] : [a, ...o.slice(0, c), ...o.slice(c + 1)],
          l = Math.max(d.indexOf(this.lastSuccUploadHost), 0),
          p = null,
          h = 0;
        h < d.length;
        h++
      ) {
        var u = new Date().getTime(),
          m = d[(h + l) % d.length]
        try {
          var g = yield Ae.uploadFile(
            Object.assign(
              Object.assign({}, e),
              n ? { chunkUploadHost: m } : { commonUploadHost: m }
            )
          )
          return (
            (this.lastSuccUploadHost = m),
            'string' == typeof g.size && (g.size = parseInt(g.size)),
            'string' == typeof g.dur && (g.dur = parseInt(g.dur)),
            'string' == typeof g.w && (g.w = parseInt(g.w)),
            'string' == typeof g.h && (g.h = parseInt(g.h)),
            g
          )
        } catch (e) {
          this.core.cloudStorage.nos.nosErrorCount--, (p = e)
          var v = e
          if (
            (this.core.reporter.reportTraceStart('exceptions', {
              user_id:
                this.core.options.account ||
                (null ===
                  (i =
                    null === (t = this.core) || void 0 === t
                      ? void 0
                      : t.auth) || void 0 === i
                  ? void 0
                  : i.account),
              trace_id:
                null ===
                  (s =
                    null === (r = this.core.clientSocket) || void 0 === r
                      ? void 0
                      : r.socket) || void 0 === s
                  ? void 0
                  : s.sessionId,
              start_time: u,
              action: 1,
              exception_service: 3,
            }),
            this.core.reporter.reportTraceUpdateV2(
              'exceptions',
              {
                code: 'number' == typeof v.code ? v.code : 0,
                description: v.message || `${v.code}`,
                operation_type: 1,
                target: m,
              },
              { asyncParams: Ae.net.getNetworkStatus() }
            ),
            this.core.reporter.reportTraceEnd('exceptions', 1),
            e &&
              (e.code === de.V2NIM_ERROR_CODE_CANCELLED || 10499 === e.errCode))
          )
            throw e
        }
      }
      throw p
    })
  }
}
var je = 'https://abt-online.netease.im/v1/api/abt/client/getExperimentInfo'
class qe {
  constructor(e, t) {
    ;(this.abtInfo = {}),
      (this.core = e),
      (this.config = we(
        {
          isAbtestEnable: !0,
          abtestUrl: je,
          abtestProjectKey: 'imElite_sdk_abtest_web',
        },
        t
      ))
  }
  setOptions(e) {
    this.config = we(this.config, e)
  }
  abtRequest() {
    var e, t
    return Te(this, void 0, void 0, function* () {
      if (
        this.config.isAbtestEnable &&
        !this.abtInfo.experiments &&
        this.config.abtestUrl
      ) {
        var i
        try {
          i = yield this.core.adapters.request(
            this.config.abtestUrl,
            {
              method: 'POST',
              dataType: 'json',
              headers: { sdktype: 'ABTest' },
              data: {
                clientInfo: {
                  projectKey: this.config.abtestProjectKey,
                  appKey: this.core.options.appkey,
                  osType: 'Web',
                  sdkVersion: '10.9.30',
                  deviceId: this.core.config.deviceId,
                },
                useLocalCache: !0,
              },
            },
            { exception_service: 7 }
          )
        } catch (e) {
          this.core.logger.warn('ABTest request failed')
        }
        this.abtInfo =
          (null ===
            (t =
              null === (e = null == i ? void 0 : i.data) || void 0 === e
                ? void 0
                : e.data) || void 0 === t
            ? void 0
            : t.abtInfo) || {}
      }
    })
  }
}
class He {
  constructor() {
    this.abortFns = []
  }
  add(e) {
    var t = (function (e) {
      var t = {},
        i = new Promise(function (e, i) {
          t.abort = i
        })
      return (t.promise = Promise.race([e, i])), t
    })(e)
    return this.abortFns.push(t.abort), t.promise
  }
  clear(e) {
    this.abortFns.forEach((t) =>
      t(
        e ||
          new he({
            code: de.V2NIM_ERROR_CODE_CANCELLED,
            detail: { reason: 'Aborted' },
          })
      )
    ),
      (this.abortFns = [])
  }
  destroy() {
    this.clear()
  }
}
var Ye = { tolerantRTT: 3e3, bestRTT: 100, maxChances: 5, enable: !0 },
  Ke = { timestamp: 0, rtt: 0, baseClock: 0, baseTime: 0 }
class We {
  constructor(e, t, i = 'getServerTime') {
    ;(this.serverOrigin = Ke),
      (this.config = Ye),
      (this.isSettingNTP = !1),
      (this.currentChance = 0),
      (this.failedDelay = 2e3),
      (this.successDelay = 3e5),
      (this.timer = 0),
      (this.cmdName = 'getServerTime'),
      (this.core = e),
      (this.logger = e.logger),
      (this.promiseManager = new He()),
      (this.cmdName = i),
      t && this.setOptions(t)
  }
  setOptions(e) {
    this.config = Object.assign({}, Ye, this.config, e)
  }
  reset() {
    this.timer && clearTimeout(this.timer),
      this.promiseManager.clear(),
      (this.serverOrigin = Ke),
      (this.currentChance = 0)
  }
  setOriginTimetick() {
    return Te(this, void 0, void 0, function* () {
      if (
        this.config.enable &&
        !(this.isSettingNTP || this.currentChance >= this.config.maxChances)
      ) {
        var e = Ve(this.core, 'auth.status'),
          t = Ve(this.core, 'status'),
          i = Ve(this.core, 'V2NIMLoginService.lifeCycle.loginStatus')
        if ('logined' === e || 'logined' === t || 1 === i) {
          ;(this.isSettingNTP = !0),
            this.currentChance++,
            this.timer && clearTimeout(this.timer),
            (this.timer = 0)
          var r,
            s = 'TimeOrigin::setOriginTimetick:',
            n = Date.now()
          this.core.logger.debug(
            `${s} getServerTime start, times ${this.currentChance}`
          )
          try {
            ;(r = Ve(
              yield this.promiseManager.add(this.core.sendCmd(this.cmdName)),
              'content.time'
            )),
              (this.isSettingNTP = !1)
          } catch (e) {
            var o = e
            return (
              (this.isSettingNTP = !1),
              this.logger.warn(
                `${s} Calculate Delay time, getServerTime error`,
                o
              ),
              void (
                o.code !== de.V2NIM_ERROR_CODE_CANCELLED &&
                (clearTimeout(this.timer),
                (this.timer = setTimeout(
                  this.setOriginTimetick.bind(this),
                  this.failedDelay
                )))
              )
            )
          }
          if (!r)
            return (
              this.core.logger.warn(
                `${s} Calculate Delay time incorrect format`
              ),
              void (this.config.enable = !1)
            )
          var a = Date.now() - n
          this.doSet(r, a)
        }
      }
    })
  }
  doSet(e, t) {
    var i = 'TimeOrigin::setOriginTimetick:'
    t > this.config.tolerantRTT
      ? (this.logger.warn(`${i} denied RTT:${t}`),
        clearTimeout(this.timer),
        (this.timer = setTimeout(
          this.setOriginTimetick.bind(this),
          this.failedDelay
        )))
      : t > this.config.bestRTT
      ? (this.serverOrigin.rtt && t >= this.serverOrigin.rtt
          ? this.logger.warn(`${i} ignore RTT:${t}`)
          : (this.setServerOrigin(t, e),
            this.logger.log(`${i} accept reluctantly RTT:${t}`)),
        clearTimeout(this.timer),
        (this.timer = setTimeout(
          this.setOriginTimetick.bind(this),
          this.failedDelay
        )))
      : (this.setServerOrigin(t, e),
        this.logger.debug(`${i} accept best RTT:${t}`),
        (this.currentChance = 0),
        clearTimeout(this.timer),
        (this.timer = setTimeout(
          this.setOriginTimetick.bind(this),
          this.successDelay
        )))
  }
  getNTPTime(e) {
    if ((void 0 === e && (e = this.getTimeNode()), this.checkNodeReliable(e))) {
      var t = Math.floor(e.time - this.serverOrigin.baseTime)
      return this.serverOrigin.timestamp + t
    }
    return Date.now()
  }
  checkNodeReliable(e) {
    if (
      (void 0 === e && (e = this.getTimeNode()), this.serverOrigin.timestamp)
    ) {
      if (0 === this.serverOrigin.baseClock) return !0
      var t = e.clock - this.serverOrigin.baseClock,
        i = e.time - this.serverOrigin.baseTime
      return Math.abs(i - t) < 500
    }
    return !1
  }
  checkPerformance() {
    return (
      'BROWSER' === Ae.platform &&
      !('undefined' == typeof performance || !performance.now)
    )
  }
  static checkPerformance() {
    return (
      'BROWSER' === Ae.platform &&
      !('undefined' == typeof performance || !performance.now)
    )
  }
  getTimeNode() {
    return {
      clock: this.checkPerformance() ? performance.now() : 0,
      time: Date.now(),
    }
  }
  static getTimeNode() {
    return {
      clock: We.checkPerformance() ? performance.now() : 0,
      time: Date.now(),
    }
  }
  setServerOrigin(e, t) {
    this.serverOrigin = {
      timestamp: t + Math.floor(e / 2),
      rtt: e,
      baseClock: this.checkPerformance() ? performance.now() : 0,
      baseTime: Date.now(),
    }
  }
}
var Je = {
  user_id: '',
  trace_id: '',
  action: 7,
  exception_service: 6,
  duration: 0,
  start_time: 0,
  state: 1,
  extension: [],
}
class ze {
  constructor(e, t) {
    ;(this.traceData = Je),
      (this.core = e),
      (this.traceData = Object.assign({}, Je, t)),
      (this.traceData.extension = [])
  }
  reset() {
    ;(this.traceData = Object.assign({}, Je)), (this.traceData.extension = [])
  }
  start() {
    var e, t
    this.reset(),
      (this.traceData.user_id = this.core.account),
      (this.traceData.trace_id =
        (null ===
          (t =
            null === (e = this.core.clientSocket) || void 0 === e
              ? void 0
              : e.socket) || void 0 === t
          ? void 0
          : t.sessionId) || ''),
      (this.traceData.start_time = new Date().getTime())
  }
  update(e) {
    return Te(this, void 0, void 0, function* () {
      var { net_type: t, net_connect: i } = yield Ae.net.getNetworkStatus()
      this.traceData.extension.push(
        Object.assign(
          {
            code: 0,
            foreground: !0,
            foreg_backg_switch: !1,
            net_type: t,
            net_connect: i,
          },
          e
        )
      )
    })
  }
  end(e) {
    var t = this.traceData.extension[0],
      i = this.traceData.extension[1]
    if (t && 0 === t.operation_type && i && 1 === i.operation_type) {
      var r = t.net_type !== i.net_type || t.net_connect !== i.net_connect
      if (e || !r)
        return (
          (this.traceData.duration =
            new Date().getTime() - this.traceData.start_time),
          this.core.reporter.report('exceptions', this.traceData),
          void this.reset()
        )
      this.reset()
    } else this.reset()
  }
}
var Xe = {
  user_id: '',
  trace_id: '',
  net_connect: !0,
  net_type: 0,
  duration: 0,
  start_time: 0,
  history: [],
  succeed: !1,
}
class Qe {
  constructor(e) {
    ;(this.traceData = Xe), (this.core = e), this.reset()
  }
  reset() {
    ;(this.traceData = Object.assign({}, Xe)), (this.traceData.history = [])
  }
  start(e) {
    this.reset(),
      (this.traceData.user_id = e),
      (this.traceData.start_time = Date.now())
  }
  updateBegin(e) {
    this.traceData.history.push(
      Object.assign(
        { head: '', body: '', start_time: Date.now(), httpdns: !1, index: 0 },
        e
      )
    )
  }
  updateComplete(e) {
    this.traceData.history.forEach((t) => {
      t.target === e.target &&
        (Object.assign(t, e), (t.duration = Date.now() - t.start_time))
    })
  }
  end(e) {
    return Te(this, void 0, void 0, function* () {
      if (
        ((this.traceData.succeed = e),
        (this.traceData.history = this.traceData.history.filter(
          (e) => void 0 !== e.code
        )),
        0 !== this.traceData.history.length)
      ) {
        this.traceData.duration = Date.now() - this.traceData.start_time
        var { net_type: t, net_connect: i } = yield Ae.net.getNetworkStatus()
        ;(this.traceData.net_type = t),
          (this.traceData.net_connect = i),
          this.core.reporter.report('nim_sdk_lbs_records', this.traceData),
          this.reset()
      } else this.reset()
    })
  }
}
function Ze(e) {
  var t,
    i,
    r = !0
  return (
    'boolean' ==
    typeof (null === (t = null == e ? void 0 : e.reporterConfig) || void 0 === t
      ? void 0
      : t.enableCompass)
      ? (r = e.reporterConfig.enableCompass)
      : 'boolean' ==
          typeof (null === (i = null == e ? void 0 : e.reporterConfig) ||
          void 0 === i
            ? void 0
            : i.isDataReportEnable) &&
        (r = e.reporterConfig.isDataReportEnable),
    r
  )
}
var et = {
    user_id: '',
    trace_id: '',
    action: 0,
    state: 0,
    duration: 0,
    start_time: 0,
    offset: 0,
    full_size: 0,
    transferred_size: 0,
    operation_type: 0,
    remote_addr: '',
  },
  it = 'ReporterHook::setMonitorForResources:'
class rt {
  constructor(e, t) {
    ;(this.traceData = et),
      (this.core = e),
      (this.traceData = Object.assign({}, et, t))
  }
  reset() {
    this.traceData = Object.assign({}, et)
  }
  start() {
    var e, t
    this.reset(),
      (this.traceData.user_id = this.core.account),
      (this.traceData.trace_id =
        (null ===
          (t =
            null === (e = this.core.clientSocket) || void 0 === e
              ? void 0
              : e.socket) || void 0 === t
          ? void 0
          : t.sessionId) || ''),
      (this.traceData.start_time =
        'timeOrigin' in this.core
          ? this.core.timeOrigin.getNTPTime()
          : Date.now())
  }
  update(e) {
    return Te(this, void 0, void 0, function* () {
      this.traceData.user_id &&
        (this.core.logger.log(`${it} upload update`, e),
        Object.assign(this.traceData, e))
    })
  }
  end(e) {
    this.traceData.user_id &&
      (this.core.logger.log(`${it} upload end cause of ${e}`),
      (this.traceData.state = e),
      (this.traceData.duration =
        ('timeOrigin' in this.core
          ? this.core.timeOrigin.getNTPTime()
          : Date.now()) - this.traceData.start_time),
      this.core.reporter.report('nim_sdk_resources', this.traceData),
      (this.traceData = et))
  }
}
var st = {},
  nt = {},
  ot = {},
  at = {
    apiVersion: 'v1',
    debugLevel: 'off',
    needReconnect: !0,
    reconnectionAttempts: Number.MAX_SAFE_INTEGER,
    lbsUrls: ['https://lbs.netease.im/lbs/webconf.jsp'],
    linkUrl: 'weblink.netease.im:443',
    abtestUrl: je,
    isAbtestEnable: !0,
  }
class ct extends ne {
  constructor(e, t = {}) {
    if (
      (super(),
      (this.instanceName = 'NIM'),
      (this.pluginMap = {}),
      (this.eventBus = new ne()),
      (this.options = {}),
      (this.V2NIMConversationIdUtil = {}),
      (this.V2NIMMessageCreator = {}),
      (this.V2NIMMessageAttachmentCreator = {}),
      (this.V2NIMClientAntispamUtil = {}),
      (this.DataStructureConverter = {}),
      (this.V2NIMMessageConverter = {}),
      (this.V2NIMMessageLogUtil = {}),
      (this.V2NIMMessageExtendUtil = {}),
      (this.V2NIMStorageUtil = {}),
      (this.V2NIMNotificationService = {}),
      (this.V2NIMStorageService = {}),
      (this.auth = {}),
      (this.V1NIMLoginService = {}),
      (this.V2NIMLoginService = {}),
      (this.clientSocket = {}),
      (this.V2NIMSyncService = {}),
      (this.V2NIMLocalConversationService = {}),
      (this.V2NIMConversationService = {}),
      (this.V2NIMConversationGroupService = {}),
      (this.V2NIMMessageService = {}),
      (this.V2NIMTeamService = {}),
      (this.V2NIMUserService = {}),
      (this.V2NIMFriendService = {}),
      (this.V2NIMSettingService = {}),
      (this.V2NIMAIService = {}),
      (this.V2NIMSignallingService = {}),
      (this.V2NIMSubscriptionService = {}),
      (this.V2NIMPassthroughService = {}),
      (this.YSFService = {}),
      (this.offlinePush = {}),
      (this.sync = {}),
      (this.msg = {}),
      (this.msgLog = {}),
      (this.session = {}),
      (this.cloudSession = {}),
      (this.misc = {}),
      (this.user = {}),
      (this.friend = {}),
      (this.systemMessage = {}),
      (this.team = {}),
      (this.event = {}),
      (this.msgExtend = {}),
      (this.cloudStorage = {}),
      (this.passThrough = {}),
      (this.superTeam = {}),
      (this.plugin = {}),
      (this.signaling = {}),
      (this.qchatChannel = {}),
      (this.qchatMedia = {}),
      (this.qchatMsg = {}),
      (this.qchatRole = {}),
      (this.qchatServer = {}),
      (this.pluginMap = ot),
      (this.logger = new ke(e.debugLevel, t.loggerConfig)),
      t.privateConf)
    ) {
      var {
        authConfig: i,
        cloudStorageConfig: r,
        reporterConfig: s,
      } = this.getConfigFromPrivate(t.privateConf)
      Object.assign(e, i),
        this.setInitOptions(e),
        (this.otherOptions = Object.assign(Object.assign({}, t), {
          cloudStorageConfig: Object.assign(
            Object.assign({ storageKeyPrefix: 'NIM' }, t.cloudStorageConfig),
            r
          ),
          reporterConfig: Object.assign(Object.assign({}, t.reporterConfig), s),
          V1NIMLoginServiceConfig: Object.assign(
            Object.assign(Object.assign({}, e), t.V1NIMLoginServiceConfig),
            i
          ),
          V2NIMLoginServiceConfig: Object.assign(
            Object.assign({}, t.V2NIMLoginServiceConfig),
            i
          ),
        }))
    } else
      this.setInitOptions(e),
        (this.otherOptions = Object.assign(Object.assign({}, t), {
          V1NIMLoginServiceConfig: Object.assign(
            Object.assign({}, e),
            t.V1NIMLoginServiceConfig
          ),
          cloudStorageConfig: Object.assign(
            { storageKeyPrefix: 'NIM' },
            t.cloudStorageConfig
          ),
        }))
    ;(this.timerManager = new _e()),
      (this.timeOrigin = new We(this)),
      (this.adapters = new Ge(this)),
      (this.abtest = new qe(
        this,
        Object.assign(
          Object.assign(
            {
              isAbtestEnable: this.options.isAbtestEnable,
              abtestUrl: this.options.abtestUrl,
            },
            this.otherOptions.abtestConfig
          ),
          { abtestProjectKey: 'imElite_sdk_abtest_web' }
        )
      ))
    var n = Ae.getSystemInfo(),
      o = (function (e, t) {
        var i,
          r,
          s =
            null === (i = null == t ? void 0 : t.reporterConfig) || void 0 === i
              ? void 0
              : i.compassDataEndpoint,
          n =
            null === (r = null == t ? void 0 : t.reporterConfig) || void 0 === r
              ? void 0
              : r.reportConfigUrl
        if (s) return s
        if (n) {
          var o = n.match(/^https:\/\/([^/]+)\/*/)
          if (Array.isArray(o) && o.length >= 1) return `https://${o[1]}`
          e.error(`Invalid reportConfigUrl: ${n}`)
        }
        return De()
          ? 'https://statistic.live.126.net'
          : 'https://statistic.live.126.net,https://statistic-overseas.yunxinfw.com'
      })(this.logger, this.otherOptions)
    ;(this.reporter = new oe(
      Object.assign(Object.assign({}, o ? { compassDataEndpoint: o } : {}), {
        isDataReportEnable: Ze(this.otherOptions),
        common: {
          app_key: e.appkey,
          dev_id: '',
          platform: 'Web',
          sdk_ver: '10.9.30',
          env: 'online',
          os_name: n.os,
          os_ver: n.osVer,
          lib_env: n.libEnv,
          host_env: n.hostEnv,
          host_env_ver: n.hostEnvVer,
          manufactor: n.manufactor,
          model: n.model,
          v2: 'v1' !== this.options.apiVersion,
        },
        request: Ae.request,
        logger: this.logger,
        autoStart: !0,
      })
    )),
      (this.reporterHookLinkKeep = new ze(this)),
      (this.reporterHookCloudStorage = new rt(this)),
      (this.reporterHookLBS = new Qe(this)),
      this.getServiceKeys(Object.keys(st)).forEach((e) => {
        if (!this[e] || !this[e].name) {
          var t = st[e]
          this[e] = new t(this)
        }
      }),
      Object.keys(st).forEach((e) => {
        this.callSetOptions(e)
      }),
      Object.keys(nt).forEach((e) => {
        var t = nt[e]
        void 0 !== t && (this[e] = new t(this))
      }),
      (ct.instance = this),
      this.logger.log(
        `NIM init, version:10.9.30, sdk version:100930, appkey:${e.appkey}`
      )
  }
  getServiceKeys(e) {
    var t = e.findIndex((e) => 'V1NIMLoginService' === e)
    if (t > -1) {
      var i = e[t]
      e.splice(t, 1), 'v1' === this.options.apiVersion && e.unshift(i)
    }
    var r = e.findIndex((e) => 'V2NIMLoginService' === e)
    if (r > -1) {
      var s = e[r]
      e.splice(r, 1), 'v2' === this.options.apiVersion && e.unshift(s)
    }
    var n = e.findIndex((e) => 'sync' === e)
    if (n > -1) {
      var o = e[n]
      e.splice(n, 1), 'v1' === this.options.apiVersion && e.push(o)
    }
    var a = e.findIndex((e) => 'V2NIMSyncService' === e)
    if (a > -1) {
      var c = e[a]
      e.splice(a, 1), 'v2' === this.options.apiVersion && e.push(c)
    }
    return e
  }
  static getInstance(e, t) {
    if (!ct.instance) {
      if (e) return new ct(e, t)
      throw new Error('Instance not exist, please input options')
    }
    if (e) {
      if (
        ct.instance.options.account === e.account &&
        ct.instance.options.appkey === e.appkey
      )
        return ct.instance.setOptions(e), ct.instance
      throw new Error('Unexpected login')
    }
    return ct.instance
  }
  setInitOptions(e) {
    ye(
      {
        appkey: { type: 'string' },
        apiVersion: { type: 'enum', values: ['v1', 'v2'], required: !1 },
        binaryWebsocket: { type: 'boolean', required: !1 },
        needReconnect: { type: 'boolean', required: !1 },
        reconnectionAttempts: { type: 'number', required: !1 },
        customClientType: { type: 'number', min: 1, required: !1 },
        authType: { type: 'number', min: 0, max: 2, required: !1 },
        lbsUrls: { type: 'array', itemType: 'string', min: 1, required: !1 },
        linkUrl: { type: 'string', allowEmpty: !1, required: !1 },
      },
      e
    ),
      (this.options = Object.assign(Object.assign({}, at), e))
  }
  getConfigFromPrivate(e) {
    var t
    return e
      ? {
          authConfig: JSON.parse(
            JSON.stringify({
              appkey: e.appkey || void 0,
              lbsUrls: e.weblbsUrl ? [e.weblbsUrl] : void 0,
              linkUrl: e.link_web || void 0,
              linkSSL: null !== (t = e.websdkSsl) && void 0 !== t ? t : void 0,
            })
          ),
          cloudStorageConfig: JSON.parse(
            JSON.stringify({
              chunkUploadHost: e.nos_uploader || void 0,
              commonUploadHost: e.nos_uploader || void 0,
              commonUploadHostBackupList: e.nos_uploader
                ? [e.nos_uploader]
                : void 0,
              chunkUploadHostBackupList: e.nos_uploader
                ? [e.nos_uploader]
                : void 0,
              uploadReplaceFormat: e.nos_downloader_v2
                ? `${e.nosSsl ? 'https://' : 'http://'}${e.nos_downloader_v2}`
                : void 0,
              downloadUrl:
                void 0 !== e.nos_accelerate ? e.nos_accelerate : void 0,
              downloadHostList:
                '' === e.nos_accelerate_host
                  ? []
                  : 'string' == typeof e.nos_accelerate_host
                  ? [e.nos_accelerate_host]
                  : Array.isArray(e.nos_accelerate_host)
                  ? e.nos_accelerate_host
                  : void 0,
            })
          ),
          reporterConfig: JSON.parse(
            JSON.stringify({
              enableCompass:
                'boolean' == typeof e.enableCompass ? e.enableCompass : void 0,
              compassDataEndpoint: e.compassDataEndpoint || void 0,
            })
          ),
        }
      : { authConfig: {}, cloudStorageConfig: {}, reporterConfig: {} }
  }
  connect(e = {}) {
    return this.V1NIMLoginService.login(e)
  }
  setOptions(e) {
    if ('object' == typeof e && null !== e) {
      if (
        (Object.prototype.hasOwnProperty.call(e, 'account') &&
          e.account !== this.options.account) ||
        (Object.prototype.hasOwnProperty.call(e, 'appkey') &&
          e.appkey !== this.options.appkey)
      )
        throw new he({
          code: de.V2NIM_ERROR_CODE_MISUSE,
          detail: {
            reason:
              'NIM::setOptions account and appkey is not allowed to reset',
          },
        })
      if (
        Object.prototype.hasOwnProperty.call(e, 'apiVersion') &&
        e.apiVersion !== this.options.apiVersion
      )
        throw new he({
          code: de.V2NIM_ERROR_CODE_MISUSE,
          detail: {
            reason: 'NIM::setOptions apiVersion is not allowed to reset',
          },
        })
      if (
        Object.prototype.hasOwnProperty.call(e, 'binaryWebsocket') &&
        e.binaryWebsocket !== this.options.binaryWebsocket
      )
        throw new he({
          code: de.V2NIM_ERROR_CODE_MISUSE,
          detail: {
            reason: 'NIM::setOptions binaryWebsocket is not allowed to reset',
          },
        })
      ye(
        {
          token: { type: 'string', required: !1 },
          needReconnect: { type: 'boolean', required: !1 },
          reconnectionAttempts: { type: 'number', required: !1 },
          customClientType: { type: 'number', min: 1, required: !1 },
          authType: { type: 'number', min: 0, max: 2, required: !1 },
          lbsUrls: { type: 'array', itemType: 'string', min: 1, required: !1 },
          linkUrl: { type: 'string', allowEmpty: !1, required: !1 },
        },
        e
      ),
        this.logger.log('NIM::setOptions options is', e),
        (this.options = Object.assign(Object.assign({}, this.options), e)),
        this.V1NIMLoginService.setOptions &&
          this.V1NIMLoginService.setOptions(this.options)
    }
  }
  getOptions() {
    return this.options
  }
  disconnect() {
    return this.V1NIMLoginService.logout()
  }
  _disconnect() {
    return 'v1' === this.options.apiVersion
      ? this.V1NIMLoginService.logout()
      : 'v2' === this.options.apiVersion
      ? 0 === Ve(this.V2NIMLoginService, 'lifeCycle.connectStatus') &&
        0 === Ve(this.V2NIMLoginService, 'lifeCycle.loginStatus')
        ? Promise.resolve()
        : this.V2NIMLoginService.logout()
      : Promise.resolve()
  }
  destroy() {
    return (
      (ct.instance = void 0),
      this._disconnect().then(() => {
        ;(this.status = 'destroyed'),
          this.removeAllListeners(),
          this.eventBus.removeAllListeners(),
          this.logger.destroy(),
          this.reporter.destroy(),
          this.timerManager.destroy(),
          this._clearModuleData('destroy'),
          this._removeAllModuleListeners(),
          (this.connect = Ue),
          (this.disconnect = Ue),
          (this._disconnect = Ue),
          (this.destroy = Ue)
      })
    )
  }
  _clearModuleData(e = 'logout') {
    Object.values(this).forEach((t) => {
      t && 'function' == typeof t.reset && t.reset(e)
    })
  }
  _removeAllModuleListeners() {
    Object.values(this).forEach((e) => {
      e && 'function' == typeof e.removeAllListeners && e.removeAllListeners()
    })
  }
  kick(e) {
    return this.V1NIMLoginService.kick(e)
  }
  sendCmd(e, t, i) {
    return this.clientSocket.sendCmd(e, t, i)
  }
  emit(e, ...t) {
    try {
      var i = Date.now(),
        r = super.emit(e, ...t),
        s = Date.now() - i
      return (
        s >= 10 &&
          this.logger.warn(`Core::emit event: ${e} process takes: ${s}ms`),
        r
      )
    } catch (t) {
      return (
        this.logger.error(`Core::emit event: ${e}. Error: ${t}`),
        setTimeout(() => {
          throw (
            (this.logger.error(
              `Core::emit throw error in setTimeout. event: ${e}. Error: ${t}`
            ),
            t)
          )
        }, 0),
        !1
      )
    }
  }
  get account() {
    return this.auth.account
  }
  get status() {
    return this.V1NIMLoginService.status
  }
  set status(e) {
    this.V1NIMLoginService.status = e
  }
  get config() {
    return { timeout: 8e3, deviceId: this.auth.deviceId }
  }
  _registerDep(e, t) {
    ;(this[t] && this[t].name) ||
      ((this[t] = new e(this)), this.callSetOptions(t))
  }
  callSetOptions(e) {
    var t = `${e}Config`,
      i = `${e}Options`,
      r = this.otherOptions[t] || this.otherOptions[i] || {},
      s = Ve(this, `${e}.setOptions`)
    'function' == typeof s &&
      ('cloudStorage' === e &&
        (r = this.otherOptions[t] || this.otherOptions.serverConfig || {}),
      s.call(this[e], r))
  }
  static registerService(e, t) {
    st[t] = e
  }
  static registerPrivateService(e, t) {
    nt[t] = e
  }
  static registerPlugin(e, t) {
    ot[t] = e
  }
}
;(ct.sdkVersion = 100930), (ct.sdkVersionFormat = '10.9.30')
var dt = {},
  lt = {}
function pt(e, t, i, r) {
  var s = dt[e]
  if (!s) return i.error('createCmd:: can not find cmd config: ', e), null
  var n = { SER: t, SID: s.sid, CID: s.cid, Q: [] }
  return (
    s.params &&
      r &&
      s.params.forEach(function (e) {
        var t = r[e.name]
        if (null != t) {
          var i = e.type,
            { reflectMapper: s, select: o } = e
          switch (e.type) {
            case 'PropertyArray':
              ;(i = 'ArrayMable'),
                (t = t.map((e) => ({ t: 'Property', v: s ? mt(e, s, o) : e })))
              break
            case 'Property':
              t = s ? mt(t, s, o) : t
              break
            case 'Bool':
              t = t ? 'true' : 'false'
          }
          n.Q.push({ t: i, v: t })
        }
      }),
    {
      packet: n,
      hasPacketResponse:
        'boolean' != typeof s.hasPacketResponse || s.hasPacketResponse,
      hasPacketTimer: 'boolean' != typeof s.hasPacketTimer || s.hasPacketTimer,
    }
  )
}
function ht(e, t) {
  var i
  try {
    i = JSON.parse(e)
  } catch (i) {
    return void t.error(`Parse command error:"${e}"`)
  }
  var r = i.sid + '_' + i.cid,
    s = i.r
  if (['4_1', '4_2', '4_10', '4_11'].includes(r)) {
    var n = i.r[1].headerPacket
    ;(r = `${n.sid}_${n.cid}`),
      (i.sid = n.sid),
      (i.cid = n.cid),
      (s = i.r[1].body)
  }
  var o = lt[r],
    a = []
  if (o && o.length > 0) {
    for (var c of o) a.push(ut(i, c.config, c.cmd, s, t))
    return a
  }
  t.error('parseCmd:: mapper not exist', r, i.code)
}
function ut(e, t, i, r, s) {
  var n,
    o = {
      cmd: i,
      raw: e,
      error: null,
      service: null == t ? void 0 : t.service,
      content: {},
      __receiveTimeNode: We.getTimeNode(),
    }
  ;(18 === t.sid || (t.sid >= 26 && t.sid < 100)) &&
    (e.code = (function (e) {
      if ('number' != typeof e || e != e)
        throw new he({
          code: de.V2NIM_ERROR_CODE_INTERNAL,
          detail: { reason: 'Read code failed', rawData: `${e}` },
        })
      if (e < 0 || (e >= 0 && e < 1e3) || (e >= 2e4 && e <= 20099)) return e
      var t = (65535 & e) >> 9
      return 1e5 + 1e3 * (t -= t <= 38 ? 1 : 2) + (511 & e)
    })(e.code))
  var a = (function (e, t) {
    var i = le[e],
      r = ve[e]
    return null === r
      ? null
      : new he({
          code: e,
          desc: i || r || e,
          detail: { cmd: t, timetag: Date.now() },
        })
  })(e.code, i)
  if (((o.error = a), o.error)) {
    if (
      ((o.error.detail.cmd = i),
      !(null === (n = null == t ? void 0 : t.ignoreErrCodes) || void 0 === n
        ? void 0
        : n.includes(e.code)))
    )
      return o
    s.warn('parseCmd:: ignore error ', o.error), (o.error.detail.ignore = !0)
  }
  return (
    t.response &&
      t.response.forEach((e, t) => {
        var i = r[t],
          s = e.type,
          n = e.name,
          a = e.reflectMapper
        if (void 0 !== i)
          switch (s) {
            case 'Property':
              o.content[n] = a ? gt(i, a) : i
              break
            case 'PropertyArray':
              o.content[n] = i.map((e) => (a ? gt(e, a) : e))
              break
            case 'Int':
            case 'Long':
            case 'Byte':
              o.content[n] = +i
              break
            case 'Bool':
              o.content[n] = 'true' === i || !0 === i || 1 === i
              break
            default:
              o.content[n] = i
          }
      }),
    o
  )
}
function mt(e, t, i) {
  var r = {}
  for (var s in ((e = (function (e, t) {
    var i = {}
    for (var r in t) {
      var s = t[r],
        n = 'number' == typeof s ? r : s.access ? s.access : r,
        o = n.split('.'),
        a = e
      for (var c of o) {
        if (void 0 === a[c] || null === a[c]) {
          a = void 0
          break
        }
        a = a[c]
      }
      void 0 !== a && (i[n] = a)
    }
    return i
  })(e, t)),
  t)) {
    var n = t[s],
      o = 'number' == typeof n ? s : n.access ? n.access : s
    if (!i || i.includes(s))
      if (o in e) {
        if ('number' == typeof n) r[n] = e[o]
        else if ('object' == typeof n)
          if (n.converter) {
            var a = n.converter(e[o], e)
            void 0 !== a && (r[n.id] = a)
          } else r[n.id] = e[o]
      } else
        'object' == typeof n &&
          n.def &&
          ('function' == typeof n.def
            ? (r[n.id] = n.def(e))
            : (r[n.id] = n.def))
  }
  return r
}
function gt(e, t) {
  var i = {}
  for (var r in e) {
    var s = t[r]
    if ('string' == typeof s) i[s] = e[r]
    else if ('object' == typeof s && 'prop' in s) {
      var n = s.access ? s.access : s.prop
      if (s.converter) {
        var o = s.converter(e[r], e)
        void 0 !== o && (i[n] = o)
      } else
        s.type && 'number' === s.type
          ? (i[n] = +e[r])
          : s.type && 'boolean' === s.type
          ? (i[n] = !('0' === e[r] || !e[r]))
          : (i[n] = e[r])
    }
  }
  for (var a in t) {
    var c = t[a]
    if (c && void 0 !== c.def) {
      var d = c.access ? c.access : c.prop
      d in i ||
        ('function' == typeof c.def ? (i[d] = c.def(e)) : (i[d] = c.def))
    }
  }
  return (
    (i = (function (e) {
      var t = {},
        i = function (i) {
          var r = i.split('.')
          r.reduce(function (t, s, n) {
            return (
              t[s] ||
              (t[s] = isNaN(Number(r[n + 1]))
                ? r.length - 1 == n
                  ? e[i]
                  : {}
                : [])
            )
          }, t)
        }
      for (var r in e) i(r)
      return t
    })(i)),
    i
  )
}
function vt(e) {
  for (var t in (Object.assign(dt, e.cmdConfig), e.cmdMap)) {
    var i = e.cmdMap[t],
      r = e.cmdConfig[i]
    if (r)
      if (Array.isArray(lt[t])) {
        var s = !1
        for (var n of lt[t])
          if (n.cmd === i && n.config.service === r.service) {
            s = !0
            break
          }
        s || lt[t].push({ config: r, cmd: i })
      } else lt[t] = [{ config: r, cmd: i }]
  }
}
function ft(e) {
  var t = {}
  for (var i in e) {
    var r = e[i]
    'number' == typeof r
      ? (t[r] = i)
      : 'object' == typeof r &&
        (t[r.id] = {
          prop: i,
          type: r.retType,
          access: r.retAccess ? r.retAccess : r.access ? r.access : i,
          def: r.retDef,
          converter: r.retConverter,
        })
  }
  return t
}
function yt(e) {
  return e ? 1 : 0
}
function It(e) {
  return 1 === parseInt(e)
}
function Mt(e) {
  if (e && 'object' == typeof e)
    try {
      return JSON.stringify(e)
    } catch (e) {
      return
    }
}
function _t(e) {
  if (e && 'string' == typeof e)
    try {
      return JSON.parse(e)
    } catch (e) {
      return
    }
}
function Et(e, t) {
  if (!Se(t)) return {}
  var i = JSON.parse(JSON.stringify(t)),
    r = Tt(e, i)
  return JSON.parse(JSON.stringify(Object.assign(Object.assign({}, i), r)))
}
function Tt(e, t) {
  if (!Se(t)) return {}
  var i = {}
  return (
    Object.keys(e).forEach((r) => {
      var s = e[r].type
      if ('string' != typeof s) {
        var n = Tt(e[r], t)
        Object.keys(n).length > 0 && (i[r] = n)
      } else {
        var o = e[r],
          a = o.rawKey || r,
          c = St[s](t, a, o)
        void 0 !== c && ((t[a] = void 0), (i[r] = c))
      }
    }),
    i
  )
}
var St = {
  number: function (e, t) {
    if (void 0 !== e[t]) return +e[t]
  },
  string: function (e, t) {
    if (void 0 !== e[t]) return e[t]
  },
  boolean: function (e, t) {
    return +e[t] > 0 || (0 != +e[t] && void 0)
  },
  enum: function (e, t, i) {
    return i.values[e[t]]
  },
  object: function (e, t) {
    if (void 0 !== e[t])
      try {
        return JSON.parse(e[t])
      } catch (e) {
        return {}
      }
  },
}
function Ct(e) {
  return Et(
    {
      type: { type: 'number' },
      port: { type: 'number' },
      customClientType: { type: 'number' },
      timestamp: { type: 'number' },
      loginType: { type: 'number' },
    },
    e
  )
}
var Nt = {
    '26_3': 'v2Login',
    '26_5': 'v2Logout',
    '26_8': 'v2KickOffline',
    '26_9': 'v2BeKicked',
    '26_10': 'v2LoginClientChange',
    '36_1': 'v2GetChatroomLinkAddress',
  },
  At = {
    '1_2': 'heartbeat',
    '2_7': 'nimLoginClientChange',
    '24_8': 'qchatLoginClientChange',
  },
  Rt = {
    webLoginReqTag: {
      clientType: 3,
      os: 4,
      sdkVersion: 6,
      appLogin: 8,
      protocolVersion: 9,
      pushTokenName: 10,
      pushToken: 11,
      clientId: 13,
      appkey: 18,
      account: 19,
      browser: 24,
      clientSession: 26,
      deviceInfo: 32,
      isReactNative: 112,
      customTag: 38,
      customClientType: 39,
      sdkHumanVersion: 40,
      hostEnv: 41,
      userAgent: 42,
      libEnv: 44,
      authType: 115,
      thirdPartyExtension: 116,
      env: 119,
      isRoutable: 120,
      token: 1e3,
    },
    mixAuthRepTag: {
      clientId: 1,
      consid: 2,
      clientIP: 3,
      port: 4,
      type: 5,
      customClientType: 6,
      timestamp: 7,
      customTag: 8,
      os: 9,
      pushType: 10,
      hasTokenPreviously: 11,
      loginType: 12,
    },
    nimAuthRepTag: {
      type: 3,
      os: 4,
      mac: 5,
      clientId: 13,
      account: 19,
      deviceInfo: 32,
      customTag: 38,
      customClientType: 39,
      consid: 102,
      clientIP: 103,
      port: 104,
      timestamp: 109,
      pushType: 110,
      hasTokenPreviously: 111,
    },
    qchatAuthRepTag: {
      clientId: 8,
      consid: 102,
      clientIP: 103,
      port: 104,
      type: 6,
      customClientType: 13,
      timestamp: 105,
      os: 30,
      pushType: 100,
      hasTokenPreviously: 101,
    },
  },
  Ot = {
    v2Login: {
      sid: 26,
      cid: 3,
      service: 'auth',
      params: [
        { type: 'Property', name: 'tag', reflectMapper: Rt.webLoginReqTag },
      ],
      response: [
        { type: 'Property', name: 'data', reflectMapper: ft(Rt.mixAuthRepTag) },
        {
          type: 'PropertyArray',
          name: 'loginClients',
          reflectMapper: ft(Rt.mixAuthRepTag),
        },
      ],
    },
    v2Logout: { sid: 26, cid: 5, service: 'auth' },
    v2KickOffline: {
      sid: 26,
      cid: 8,
      service: 'auth',
      params: [{ type: 'StrArray', name: 'clientIds' }],
      response: [{ type: 'StrArray', name: 'clientIds' }],
    },
    v2BeKicked: {
      sid: 26,
      cid: 9,
      service: 'auth',
      response: [
        { type: 'Int', name: 'clientType' },
        { type: 'Int', name: 'reason' },
        { type: 'String', name: 'reasonDesc' },
        { type: 'Int', name: 'customClientType' },
      ],
    },
    v2LoginClientChange: {
      sid: 26,
      cid: 10,
      service: 'auth',
      response: [
        { type: 'Byte', name: 'state' },
        {
          type: 'PropertyArray',
          name: 'datas',
          reflectMapper: ft(Rt.mixAuthRepTag),
        },
      ],
    },
    v2GetChatroomLinkAddress: {
      sid: 36,
      cid: 1,
      service: 'auth',
      params: [
        { type: 'Long', name: 'roomId' },
        { type: 'Bool', name: 'miniProgram' },
      ],
      response: [{ type: 'StrArray', name: 'linkAddress' }],
    },
  },
  bt = {
    heartbeat: { sid: 1, cid: 2, service: 'auth' },
    nimLoginClientChange: {
      sid: 2,
      cid: 7,
      service: 'auth',
      response: [
        { type: 'Byte', name: 'state' },
        {
          type: 'PropertyArray',
          name: 'datas',
          reflectMapper: ft(Rt.nimAuthRepTag),
        },
      ],
    },
    qchatLoginClientChange: {
      sid: 24,
      cid: 8,
      service: 'auth',
      response: [
        { type: 'Byte', name: 'state' },
        {
          type: 'Property',
          name: 'data',
          reflectMapper: ft(Rt.qchatAuthRepTag),
        },
      ],
    },
  },
  kt = Vt
function Vt(e) {
  ;(e = e || {}),
    (this.ms = e.min || 100),
    (this.max = e.max || 1e4),
    (this.factor = e.factor || 2),
    (this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0),
    (this.attempts = 0)
}
;(Vt.prototype.duration = function () {
  var e = this.ms * Math.pow(this.factor, this.attempts++)
  if (this.jitter) {
    var t = Math.random(),
      i = Math.floor(t * this.jitter * e)
    e = 1 & Math.floor(10 * t) ? e + i : e - i
  }
  return 0 | Math.min(e, this.max)
}),
  (Vt.prototype.reset = function () {
    this.attempts = 0
  }),
  (Vt.prototype.setMin = function (e) {
    this.ms = e
  }),
  (Vt.prototype.setMax = function (e) {
    this.max = e
  }),
  (Vt.prototype.setJitter = function (e) {
    this.jitter = e
  })
var Pt = function (e) {
    var t
    if (void 0 !== e) return ((t = Ut(e)).sign = 1), t
  },
  Lt = function (e) {
    return '[object Array]' === Object.prototype.toString.call(e)
  },
  Dt = function (e) {
    return [
      'number' == typeof e,
      'string' == typeof e && e.length > 0,
      Lt(e) && e.length > 0,
      e instanceof Ut,
    ].some(function (e) {
      return !0 === e
    })
  },
  wt = 'Invalid Number'
function Ut(e) {
  var t
  if (!(this instanceof Ut)) return new Ut(e)
  if (((this.number = []), (this.sign = 1), (this.rest = 0), Dt(e))) {
    if (Lt(e)) {
      for (
        ((e.length && '-' === e[0]) || '+' === e[0]) &&
          ((this.sign = '+' === e[0] ? 1 : -1), e.shift(0)),
          t = e.length - 1;
        t >= 0;
        t--
      )
        if (!this.addDigit(e[t])) return
    } else
      for (
        ('-' !== (e = e.toString()).charAt(0) && '+' !== e.charAt(0)) ||
          ((this.sign = '+' === e.charAt(0) ? 1 : -1), (e = e.substring(1))),
          t = e.length - 1;
        t >= 0;
        t--
      )
        if (!this.addDigit(parseInt(e.charAt(t), 10))) return
  } else this.number = wt
}
;(Ut.prototype.addDigit = function (e) {
  return (function (e) {
    return /^\d$/.test(e)
  })(e)
    ? (this.number.push(e), this)
    : ((this.number = wt), !1)
}),
  (Ut.prototype._compare = function (e) {
    var t, i
    if (!Dt(e)) return null
    if (((t = Ut(e)), this.sign !== t.sign)) return this.sign
    if (this.number.length > t.number.length) return this.sign
    if (this.number.length < t.number.length) return -1 * this.sign
    for (i = this.number.length - 1; i >= 0; i--) {
      if (this.number[i] > t.number[i]) return this.sign
      if (this.number[i] < t.number[i]) return -1 * this.sign
    }
    return 0
  }),
  (Ut.prototype.gt = function (e) {
    return this._compare(e) > 0
  }),
  (Ut.prototype.gte = function (e) {
    return this._compare(e) >= 0
  }),
  (Ut.prototype.equals = function (e) {
    return 0 === this._compare(e)
  }),
  (Ut.prototype.lte = function (e) {
    return this._compare(e) <= 0
  }),
  (Ut.prototype.lt = function (e) {
    return this._compare(e) < 0
  }),
  (Ut.prototype.subtract = function (e) {
    var t
    return void 0 === e
      ? this
      : ((t = Ut(e)),
        this.sign !== t.sign
          ? ((this.number = Ut._add(this, t)), this)
          : ((this.sign = this.lt(t) ? -1 : 1),
            (this.number = Pt(this).lt(Pt(t))
              ? Ut._subtract(t, this)
              : Ut._subtract(this, t)),
            this))
  }),
  (Ut._add = function (e, t) {
    var i,
      r = 0,
      s = Math.max(e.number.length, t.number.length)
    for (i = 0; i < s || r > 0; i++)
      (e.number[i] = (r += (e.number[i] || 0) + (t.number[i] || 0)) % 10),
        (r = Math.floor(r / 10))
    return e.number
  }),
  (Ut._subtract = function (e, t) {
    var i,
      r = 0,
      s = e.number.length
    for (i = 0; i < s; i++)
      (e.number[i] -= (t.number[i] || 0) + r),
        (e.number[i] += 10 * (r = e.number[i] < 0 ? 1 : 0))
    for (i = 0, s = e.number.length - 1; 0 === e.number[s - i] && s - i > 0; )
      i++
    return i > 0 && e.number.splice(-i), e.number
  }),
  (Ut.prototype.multiply = function (e) {
    if (void 0 === e) return this
    var t,
      i,
      r = Ut(e),
      s = 0,
      n = []
    if (this.isZero() || r.isZero()) return Ut(0)
    for (this.sign *= r.sign, t = 0; t < this.number.length; t++)
      for (s = 0, i = 0; i < r.number.length || s > 0; i++)
        (n[t + i] =
          (s += (n[t + i] || 0) + this.number[t] * (r.number[i] || 0)) % 10),
          (s = Math.floor(s / 10))
    return (this.number = n), this
  }),
  (Ut.prototype.divide = function (e) {
    if (void 0 === e) return this
    var t,
      i,
      r = Ut(e),
      s = [],
      n = Ut(0)
    if (r.isZero())
      return (this.number = 'Invalid Number - Division By Zero'), this
    if (this.isZero()) return (this.rest = Ut(0)), this
    if (
      ((this.sign *= r.sign),
      (r.sign = 1),
      1 === r.number.length && 1 === r.number[0])
    )
      return (this.rest = Ut(0)), this
    for (t = this.number.length - 1; t >= 0; t--)
      for (n.multiply(10), n.number[0] = this.number[t], s[t] = 0; r.lte(n); )
        s[t]++, n.subtract(r)
    for (t = 0, i = s.length - 1; 0 === s[i - t] && i - t > 0; ) t++
    return t > 0 && s.splice(-t), (this.rest = n), (this.number = s), this
  }),
  (Ut.prototype.mod = function (e) {
    return this.divide(e).rest
  }),
  (Ut.prototype.isZero = function () {
    var e
    for (e = 0; e < this.number.length; e++) if (0 !== this.number[e]) return !1
    return !0
  }),
  (Ut.prototype.toString = function () {
    var e,
      t = ''
    if ('string' == typeof this.number) return this.number
    for (e = this.number.length - 1; e >= 0; e--) t += this.number[e]
    return this.sign > 0 ? t : '-' + t
  })
var xt,
  Ft = Math.pow(2, 32)
function Bt(e) {
  for (
    var t = new Uint8Array(5), i = new DataView(t.buffer), r = 0;
    4294967168 & e;

  )
    i.setUint8(r++, (127 & e) | 128), (e >>>= 7)
  return i.setUint8(r++, 127 & e), t.slice(0, r)
}
class $t {
  constructor(e) {
    ;(this.offset = 0),
      (this.buffer = new Uint8Array(e)),
      (this.view = new DataView(e))
  }
  checkBufferBoundaryAccess() {
    return this.offset >= this.buffer.byteLength
  }
  length() {
    var e
    return (
      (null === (e = this.view) || void 0 === e ? void 0 : e.byteLength) || 0
    )
  }
  getBuffer() {
    return this.view.buffer
  }
  getOffset() {
    return this.offset
  }
  popRaw(e) {
    try {
      var t = this.buffer.slice(this.offset, this.offset + e)
      return (this.offset += e), t
    } catch (e) {
      throw new Error(`UnpackException raw ${e && e.message}`)
    }
  }
  popByte() {
    try {
      var e = this.view.getUint8(this.offset)
      return (this.offset += 1), e
    } catch (e) {
      throw new Error(`UnpackException byte ${e && e.message}`)
    }
  }
  popVarbin() {
    return this.popRaw(this.popVarInt())
  }
  popString() {
    try {
      return (function (e) {
        return 'function' == typeof TextDecoder
          ? new TextDecoder('utf-8').decode(e)
          : (function (e) {
              for (var t = '', i = 0; i < e.length; ) {
                var r = e[i],
                  s = 0,
                  n = 0
                if (
                  (r <= 127
                    ? ((s = 0), (n = 255 & r))
                    : r <= 223
                    ? ((s = 1), (n = 31 & r))
                    : r <= 239
                    ? ((s = 2), (n = 15 & r))
                    : r <= 244 && ((s = 3), (n = 7 & r)),
                  e.length - i - s > 0)
                )
                  for (var o = 0; o < s; )
                    (n = (n << 6) | (63 & (r = e[i + o + 1]))), (o += 1)
                else (n = 65533), (s = e.length - i)
                ;(t += String.fromCodePoint(n)), (i += s + 1)
              }
              return t
            })(e)
      })(this.popVarbin())
    } catch (e) {
      throw new Error(`UnpackException string ${e && e.message}`)
    }
  }
  popInt() {
    try {
      var e = this.view.getUint32(this.offset, !0)
      return (this.offset += 4), e
    } catch (e) {
      throw new Error(`UnpackException int ${e && e.message}`)
    }
  }
  popVarInt() {
    var e = 1,
      t = 0,
      i = 0,
      r = 0
    do {
      if (((t += (127 & (i = this.popByte())) * e), (e *= 128), (r += 1) > 5))
        throw new Error('Variable length quantity is too long')
    } while (128 & i)
    return t
  }
  popLong() {
    try {
      var e = (function (e, t = !1) {
        var i = new DataView(e.buffer),
          [r, s] = t ? [4, 0] : [0, 4],
          n = i.getUint32(r, t),
          o = i.getUint32(s, t)
        return n > 0 ? n * Ft + o : o
      })(this.buffer.slice(this.offset, this.offset + 8), !0)
      return (this.offset += 8), Number(e)
    } catch (e) {
      throw new Error(`UnpackException long ${e && e.message}`)
    }
  }
  popShort() {
    try {
      var e = this.view.getUint16(this.offset, !0)
      return (this.offset += 2), e
    } catch (e) {
      throw new Error(`UnpackException short ${e && e.message}`)
    }
  }
  popBoolean() {
    return this.popByte() > 0
  }
  toString() {
    return Array.from(new Uint8Array(this.buffer)).toString()
  }
  reset() {
    ;(this.offset = 0), (this.buffer = null), (this.view = null)
  }
}
class Gt {
  constructor(e) {
    ;(this.packetLength = 0),
      (this.serviceId = 0),
      (this.commandId = 0),
      (this.serialId = 0),
      (this.tag = 0),
      (this.resCode = 200),
      (this.innerHeader = null),
      (this.msgId = 0),
      (this.bodyArr = []),
      (this.unpack = new $t(e))
  }
  reset() {
    ;(this.innerHeader = null), (this.bodyArr = []), this.unpack.reset()
  }
  getBodyDetail() {
    return this.bodyArr.join('')
  }
  unmarshalHeader() {
    var e = this._unmarshalHeader()
    ;(this.packetLength = e.packetLength),
      (this.serviceId = e.serviceId),
      (this.commandId = e.commandId),
      (this.serialId = e.serialId),
      (this.tag = e.tag),
      (this.resCode = e.resCode),
      4 === e.serviceId &&
        [1, 2, 10, 11].includes(e.commandId) &&
        ((this.msgId = this.unmarshalLong()),
        (this.innerHeader = this._unmarshalHeader()))
  }
  _unmarshalHeader() {
    var e = this.unpack.popVarInt(),
      t = this.unpack.popByte(),
      i = this.unpack.popByte(),
      r = this.unpack.popShort(),
      s = this.unpack.popByte(),
      n = 200
    return (
      this.hasRescode(s) && (n = this.unpack.popShort()),
      {
        packetLength: e,
        serviceId: t,
        commandId: i,
        serialId: r,
        tag: s,
        resCode: n,
      }
    )
  }
  hasRescode(e) {
    return !!((e = e || this.tag) & Gt.RES_CODE)
  }
  getHeader() {
    return {
      packetLength: this.packetLength,
      sid: this.serviceId,
      cid: this.commandId,
      ser: this.serialId,
      code: this.resCode,
    }
  }
  getInnerHeader() {
    return this.innerHeader
      ? { sid: this.innerHeader.serviceId, cid: this.innerHeader.commandId }
      : null
  }
  unmarshalProperty() {
    var e = this.unpack.popVarInt(),
      t = {}
    this.bodyArr.push(`\nProperty(${e}) {`)
    for (var i = 0; i < e; i++) {
      var r = this.unpack.popVarInt()
      this.bodyArr.push(`${r}:`)
      var s = this.unpack.popString()
      this.bodyArr.push(`"${s.length} ${this.unpack.getOffset()}",`), (t[r] = s)
    }
    return this.bodyArr.push('},'), t
  }
  unmarshalPropertyArray() {
    var e = this.unpack.popVarInt(),
      t = []
    this.bodyArr.push(`\nPropertyArray(${e}) [`)
    for (var i = 0; i < e; i++) t.push(this.unmarshalProperty())
    return this.bodyArr.push('],'), t
  }
  unmarshalLong() {
    var e = this.unpack.popLong()
    return this.bodyArr.push(`\nLong:${e}`), e
  }
  unmarshalLongArray() {
    var e = this.unpack.popVarInt(),
      t = []
    this.bodyArr.push(`\nLongArray ${e}:`)
    for (var i = 0; i < e; i++) {
      var r = this.unpack.popLong()
      this.bodyArr.push(`${r},`), t.push(r)
    }
    return t
  }
  unmarshalStrArray() {
    var e = this.unpack.popVarInt(),
      t = []
    this.bodyArr.push(`\nStrArray ${e}:`)
    for (var i = 0; i < e; i++) {
      var r = this.unpack.popString()
      this.bodyArr.push(`${r},`), t.push(r)
    }
    return t
  }
  unmarshalStrLongMap() {
    var e = this.unpack.popVarInt(),
      t = {}
    this.bodyArr.push(`\nStrLongMap ${e}:`)
    for (var i = 0; i < e; i++) {
      var r = this.unpack.popString()
      this.bodyArr.push(`${r},`)
      var s = this.unpack.popLong()
      this.bodyArr.push(`${s};`), (t[r] = s)
    }
    return t
  }
  unmarshalStrStrMap() {
    var e = this.unpack.popVarInt(),
      t = {}
    this.bodyArr.push(`\nStrStrMap ${e}:`)
    for (var i = 0; i < e; i++) {
      var r = this.unpack.popString()
      this.bodyArr.push(`${r},`)
      var s = this.unpack.popString()
      this.bodyArr.push(`${s};`), (t[r] = s)
    }
    return t
  }
  unmarshalLongLongMap() {
    var e = this.unpack.popVarInt(),
      t = {}
    this.bodyArr.push(`\nStrLongLongMap ${e}:`)
    for (var i = 0; i < e; i++) {
      var r = this.unpack.popLong()
      this.bodyArr.push(`${r},`)
      var s = this.unpack.popLong()
      this.bodyArr.push(`${s};`), (t[r] = s)
    }
    return { m_map: t }
  }
  unmarshalKVArray() {
    var e = this.unpack.popVarInt(),
      t = []
    this.bodyArr.push(`\nKVArray ${e}:`)
    for (var i = 0; i < e; i++) t.push(this.unmarshalStrStrMap())
    return t
  }
  unmarshal(e) {
    var t = Object.assign(Object.assign({}, this.getHeader()), { r: [] })
    if (
      (this.innerHeader &&
        ((t.r[0] = this.msgId),
        (t.r[1] = { body: [], headerPacket: this.getInnerHeader() })),
      ![200, 406, 808, 810, 7101].includes(t.code))
    )
      return JSON.stringify(t)
    if (this.packetLength > 0 && this.packetLength > this.unpack.length())
      throw new Error(
        `UnpackException packetLength(${
          this.packetLength
        }) greater than bufferLength(${this.unpack.length()})`
      )
    var i = []
    return (
      e &&
        e.forEach((e) => {
          if (!this.unpack.checkBufferBoundaryAccess())
            switch (e.type) {
              case 'PropertyArray':
                i.push(this.unmarshalPropertyArray())
                break
              case 'Property':
                i.push(this.unmarshalProperty())
                break
              case 'Byte':
                i.push(this.unpack.popByte())
                break
              case 'Int':
                i.push(this.unpack.popInt())
                break
              case 'Bool':
                i.push(this.unpack.popBoolean())
                break
              case 'Long':
                i.push(this.unmarshalLong())
                break
              case 'LongArray':
                i.push(this.unmarshalLongArray())
                break
              case 'String':
                i.push(this.unpack.popString())
                break
              case 'StrArray':
                i.push(this.unmarshalStrArray())
                break
              case 'StrStrMap':
                i.push(this.unmarshalStrStrMap())
                break
              case 'StrLongMap':
                i.push(this.unmarshalStrLongMap())
                break
              case 'LongLongMap':
                i.push(this.unmarshalLongLongMap())
                break
              case 'KVArray':
                i.push(this.unmarshalKVArray())
            }
        }),
      this.innerHeader ? (t.r[1].body = i) : (t.r = i),
      JSON.stringify(t)
    )
  }
}
Gt.RES_CODE = 2
class jt {
  constructor() {
    ;(this.offset = 0),
      (this.pageSize = 1024),
      (this.capacity = 1048576),
      (this.buffer = new Uint8Array(this.pageSize)),
      (this.view = new DataView(this.buffer.buffer))
  }
  reset() {
    ;(this.offset = 0), (this.buffer = null), (this.view = null)
  }
  size() {
    return this.offset
  }
  getBuffer() {
    return this.buffer.slice(0, this.offset).buffer
  }
  ensureCapacity(e) {
    var t = this.offset + e
    if (t > this.capacity) throw new Error('PackException over limit')
    if (t > this.buffer.byteLength) {
      var i = Math.ceil(t / this.pageSize) * this.pageSize,
        r = new Uint8Array(i)
      r.set(this.buffer),
        (this.buffer = r),
        (this.view = new DataView(this.buffer.buffer))
    }
  }
  putRaw(e) {
    this.ensureCapacity(e.length)
    try {
      this.buffer.set(e, this.offset), (this.offset += e.length)
    } catch (e) {
      throw new Error('PackException raw')
    }
  }
  putByte(e) {
    this.ensureCapacity(1)
    try {
      this.view.setUint8(this.offset++, e)
    } catch (e) {
      throw new Error('PackException byte')
    }
  }
  putString(e) {
    try {
      var t = (function (e) {
        if ('function' == typeof TextEncoder) return new TextEncoder().encode(e)
        var t = (function (e) {
          for (var t = [], i = e.length, r = 0; r < i; ) {
            var s = e.codePointAt(r),
              n = 0,
              o = 0
            for (
              s <= 127
                ? ((n = 0), (o = 0))
                : s <= 2047
                ? ((n = 6), (o = 192))
                : s <= 65535
                ? ((n = 12), (o = 224))
                : s <= 2097151 && ((n = 18), (o = 240)),
                t.push(o | (s >> n)),
                n -= 6;
              n >= 0;

            )
              t.push(128 | ((s >> n) & 63)), (n -= 6)
            r += s >= 65536 ? 2 : 1
          }
          return t
        })(e)
        return new Uint8Array(t)
      })(e)
      this.putVarbin(t)
    } catch (e) {
      throw new Error('PackException string')
    }
  }
  putInt(e) {
    this.ensureCapacity(4)
    try {
      this.view.setInt32(this.offset, e, !0), (this.offset += 4)
    } catch (e) {
      throw new Error('PackException int')
    }
  }
  putVarInt(e) {
    var t = Bt(e)
    this.putRaw(t)
  }
  putBoolean(e) {
    this.ensureCapacity(1)
    try {
      this.view.setUint8(this.offset++, e ? 1 : 0)
    } catch (e) {
      throw new Error('PackException boolean')
    }
  }
  putLong(e) {
    this.ensureCapacity(8)
    try {
      var t = (function (e, t = !1) {
        var i = new Uint8Array(8),
          r = new DataView(i.buffer),
          s = Number(e > Ft - 1 ? e / Ft : 0),
          n = Number(4294967295 & e),
          [o, a] = t ? [4, 0] : [0, 4]
        return r.setUint32(o, s, t), r.setUint32(a, n, t), i
      })(e, !0)
      this.buffer.set(t, this.offset), (this.offset += 8)
    } catch (e) {
      throw new Error('PackException long')
    }
  }
  putStringAsLong(e) {
    this.ensureCapacity(8)
    try {
      var t = (function (e, t = !1) {
        var i = new Uint8Array(8),
          r = new DataView(i.buffer),
          s = Ut(e).divide(Ft).number.reverse().join(''),
          n = Ut(e).mod(Ft).number.reverse().join(''),
          o = Number(s),
          a = Number(n),
          [c, d] = t ? [4, 0] : [0, 4]
        return r.setUint32(c, o, t), r.setUint32(d, a, t), i
      })(e, !0)
      this.buffer.set(t, this.offset), (this.offset += 8)
    } catch (e) {
      throw new Error('PackException stringAsLong')
    }
  }
  putShort(e) {
    this.ensureCapacity(2)
    try {
      this.view.setInt16(this.offset, e, !0), (this.offset += 2)
    } catch (e) {
      throw new Error('PackException short')
    }
  }
  putVarbin(e) {
    if (!e) return this.ensureCapacity(1), this.putVarInt(0)
    if (e.byteLength > Math.pow(2, 31) - 2)
      throw new Error('PackException varbin. too long')
    var t = Bt(e.length)
    this.ensureCapacity(t.length + e.length)
    try {
      this.buffer.set(t, this.offset),
        (this.offset += t.length),
        this.buffer.set(e, this.offset),
        (this.offset += e.length)
    } catch (e) {
      throw new Error('PackException varbin')
    }
  }
}
function qt(e) {
  if ('number' != typeof e) {
    if (null == e) return !1
    e = Number(e)
  }
  if (isNaN(e)) throw new Error('Number type conversion error')
  return !0
}
function Ht(e) {
  return null == e
}
class Yt {
  constructor(e, t, i) {
    ;(this.pack = new jt()),
      (this.packetLength = 0),
      (this.serviceId = 0),
      (this.commandId = 0),
      (this.serialId = 0),
      (this.tag = 0),
      (this.serviceId = e),
      (this.commandId = t),
      (this.serialId = i)
  }
  marshalHeader() {
    this.pack.putVarInt(this.packetLength),
      this.pack.putByte(this.serviceId),
      this.pack.putByte(this.commandId),
      this.pack.putShort(this.serialId),
      this.pack.putByte(this.tag)
  }
  marshalProperty(e) {
    var t = Object.keys(e).filter((e) => !Ht(e))
    this.pack.putVarInt(t.length),
      t.forEach((t) => {
        this.pack.putVarInt(Number(t)),
          Array.isArray(e[t]) ||
          '[object Object]' === Object.prototype.toString.call(e[t])
            ? this.pack.putString(JSON.stringify(e[t]))
            : this.pack.putString(String(e[t]))
      })
  }
  marshalPropertyArray(e) {
    var t = e.length
    this.pack.putVarInt(t),
      e.forEach((e) => {
        this.marshalProperty(null == e ? void 0 : e.v)
      })
  }
  marshalStrArray(e) {
    var t = e.filter((e) => !Ht(e)),
      i = t.length
    this.pack.putVarInt(i),
      t.forEach((e) => {
        this.pack.putString(String(e))
      })
  }
  marshalLongArray(e) {
    var t = e.filter((e) => qt(e)),
      i = t.length
    this.pack.putVarInt(i),
      t.forEach((e) => {
        this.putLong(e)
      })
  }
  marshalStrStrMap(e) {
    var t = Object.keys(e).filter((t) => !Ht(e[t]) && !Ht(t))
    this.pack.putVarInt(t.length),
      t.forEach((t) => {
        this.pack.putString(String(t)), this.pack.putString(String(e[t]))
      })
  }
  marshalStrLongMap(e) {
    var t = Object.keys(e).filter((t) => qt(e[t]) && !Ht(t))
    this.pack.putVarInt(t.length),
      t.forEach((t) => {
        this.pack.putString(String(t)), this.putLong(e[t])
      })
  }
  marshalLongLongMap(e) {
    var t = Object.keys(e).filter((t) => {
      var i = Number(t)
      return qt(i) && qt(e[i])
    })
    this.pack.putVarInt(t.length),
      t.forEach((t) => {
        var i = Number(t)
        this.putLong(i), this.putLong(e[i])
      })
  }
  marshalKVArray(e) {
    var t = e.length
    this.pack.putVarInt(t),
      e.forEach((e) => {
        this.marshalStrStrMap(e)
      })
  }
  putLong(e) {
    'string' == typeof e && e.length > 15
      ? this.pack.putStringAsLong(e)
      : this.pack.putLong(Number(e))
  }
  marshal(e, t) {
    return (
      this.marshalHeader(),
      t &&
        t.forEach((t, i) => {
          var r,
            s = t.type,
            n = null === (r = e[i]) || void 0 === r ? void 0 : r.v
          if (!Ht(n))
            switch (s) {
              case 'PropertyArray':
                this.marshalPropertyArray(n)
                break
              case 'Property':
                this.marshalProperty(n)
                break
              case 'Byte':
                if (!qt(n)) return
                this.pack.putByte(Number(n))
                break
              case 'Int':
                if (!qt(n)) return
                this.pack.putInt(Number(n))
                break
              case 'Bool':
                'false' === n ? (n = !1) : 'true' === n && (n = !0),
                  this.pack.putBoolean(n)
                break
              case 'Long':
                if (!qt(n)) return
                this.putLong(n)
                break
              case 'LongArray':
                this.marshalLongArray(n)
                break
              case 'String':
                this.pack.putString(String(n))
                break
              case 'StrArray':
                this.marshalStrArray(n)
                break
              case 'StrStrMap':
                this.marshalStrStrMap(n)
                break
              case 'StrLongMap':
                this.marshalStrLongMap(n)
                break
              case 'LongLongMap':
                this.marshalLongLongMap(n)
                break
              case 'KVArray':
                this.marshalKVArray(n)
            }
        }),
      this.pack.getBuffer()
    )
  }
  reset() {
    this.pack.reset()
  }
}
class Kt extends ne {
  constructor(e, t, i) {
    super(),
      (this.websocket = null),
      (this.socketConnectTimer = 0),
      (this.linkSSL = !0),
      (this.url = ''),
      (this.core = e),
      (this.url = t),
      (this.linkSSL = i),
      (this.status = 'disconnected'),
      (this.logger = e.logger),
      this.connect()
  }
  connect() {
    'connecting' !== this.status && 'connected' !== this.status
      ? ((this.status = 'connecting'),
        this._createWebsocket(
          `${this.linkSSL ? 'wss' : 'ws'}://${this.url}/websocket`
        ))
      : this.logger.warn(
          'imsocket::socket is connecting or connected',
          this.status
        )
  }
  close() {
    if (((this.status = 'disconnected'), this.websocket)) {
      this.logger.log('imsocket:: close websocket')
      try {
        this.websocket.close()
      } catch (e) {
        this.logger.warn('imsocket::attempt to close websocket error', e)
      }
      this.clean(), this.emit('disconnect')
    }
  }
  clean() {
    ;(this.status = 'disconnected'),
      clearTimeout(this.socketConnectTimer),
      this.websocket &&
        ((this.socketUrl = void 0),
        (this.websocket.onmessage = null),
        (this.websocket.onopen = null),
        (this.websocket.onerror = null),
        (this.websocket.onclose = null),
        (this.websocket = null))
  }
  onConnect() {
    ;(this.status = 'connected'),
      this.emit('connect'),
      clearTimeout(this.socketConnectTimer)
  }
  _createWebsocket(e) {
    ;(this.socketConnectTimer = setTimeout(() => {
      this.logger.error('imsocket::Websocket connect timeout. url: ', e),
        this.emit(
          'connectFailed',
          new he({
            code:
              'v2' === Ve(this.core, 'options.apiVersion')
                ? de.V2NIM_ERROR_CODE_CONNECT_TIMEOUT
                : 415,
            detail: {
              reason: `imsocket::Websocket connect timeout. url: ${e}`,
            },
          })
        )
    }, this.core.options.socketConnectTimeout || 8e3)),
      (this.socketUrl = e),
      (this.websocket = new Ae.WebSocket(e)),
      (this.websocket.binaryType = 'arraybuffer'),
      (this.websocket.onmessage = this.onMessage.bind(this)),
      (this.websocket.onclose = (e) => {
        ;(e = e || {}),
          this.logger.log(
            `imsocket::Websocket onclose done ${e.wasClean}/${e.code}/${e.reason}`
          ),
          'connected' === this.status
            ? (this.clean(), this.emit('disconnect'))
            : (this.clean(),
              this.emit(
                'connectFailed',
                new he({
                  code:
                    'v2' === Ve(this.core, 'options.apiVersion')
                      ? de.V2NIM_ERROR_CODE_CONNECT_FAILED
                      : 414,
                  detail: { reason: 'imsocket::Websocket onclose done' },
                })
              ))
      }),
      (this.websocket.onerror = (e) => {
        this.logger.error('imsocket::Websocket onerror', e),
          'connected' === this.status
            ? (this.clean(), this.emit('disconnect'))
            : (this.clean(),
              this.emit(
                'connectFailed',
                new he({
                  code:
                    'v2' === Ve(this.core, 'options.apiVersion')
                      ? de.V2NIM_ERROR_CODE_CONNECT_FAILED
                      : 414,
                  detail: { reason: 'imsocket::Websocket onerror.' },
                })
              ))
      }),
      (this.websocket.onopen = () => {
        this.onConnect()
      })
  }
  onMessage(e) {
    if (e.data) {
      var t = new Gt(e.data),
        i = { sid: -1, cid: -1, ser: -1, packetLength: -1 },
        r = null
      try {
        t.unmarshalHeader(), (i = t.getHeader()), (r = t.getInnerHeader())
      } catch (t) {
        this.reportBinaryError({
          err: t,
          sid: r ? r.sid : null == i ? void 0 : i.sid,
          cid: r ? r.cid : null == i ? void 0 : i.cid,
          rawBuf: e.data,
          type: 'decode',
        })
      }
      var s = r ? r.sid : i.sid,
        n = r ? r.cid : i.cid,
        o = `${s}_${n}`,
        a = lt[o]
      if (a && a.length > 0) {
        var c,
          d = a[0].config
        try {
          c = t.unmarshal(d.response)
        } catch (r) {
          var l = t.getBodyDetail()
          this.reportBinaryError({
            err: r,
            rawBuf: e.data,
            sid: s,
            cid: n,
            parseDetail: l,
            type: 'decode',
          }),
            t.reset()
          var p = Object.assign(Object.assign({}, i), {
            sid: s,
            cid: n,
            code: de.V2NIM_ERROR_CODE_UNPACK_ERROR,
          })
          return (
            this.logger.error(
              `imsocket::onMessage "${p.sid}_${p.cid}", ser ${p.ser}, packetLength ${p.packetLength} unmarshal error. ${l} \n`,
              r
            ),
            void this.emit('message', JSON.stringify(p))
          )
        }
        this.emit('message', c)
      } else this.core.logger.warn('imsocket::onMessage cmd not found', o)
      t.reset()
    }
  }
  send(e, t, i, r, s) {
    var n,
      o,
      a = new Yt(e, t, i),
      c = dt[r],
      d = ''
    try {
      ;(d = JSON.stringify(s)), (o = a.marshal(JSON.parse(d), c.params))
    } catch (r) {
      throw (
        (this.reportBinaryError({
          err: r,
          sid: e,
          cid: t,
          rawStr: d,
          type: 'encode',
        }),
        a.reset(),
        new he({
          code: de.V2NIM_ERROR_CODE_PACK_ERROR,
          detail: { reason: `${e}-${t}, ser ${i} marshal error`, rawError: r },
        }))
      )
    }
    null === (n = this.websocket) || void 0 === n || n.send(o), a.reset()
  }
  reportBinaryError(e) {
    var t,
      i,
      r,
      { err: s, rawStr: n, sid: o, cid: a, type: c, parseDetail: d } = e,
      l = e.rawBuf
    if (l) {
      try {
        r = (function (e) {
          if ('function' != typeof btoa) return ''
          for (
            var t = '', i = new Uint8Array(e), r = i.byteLength, s = 0;
            s < r;
            s++
          )
            t += String.fromCharCode(i[s])
          return (i = null), btoa(t)
        })(l)
      } catch (e) {
        ;(r = `reportBinaryError::arrayBufferToBase64 parsing failed, error: ${
          null == e ? void 0 : e.message
        }, sid: ${o}, cid: ${a}`),
          this.core.logger.error(r)
      }
      l = null
    }
    this.core.reporter.reportTraceStart('exceptions', {
      user_id:
        null === (t = this.core.auth) || void 0 === t ? void 0 : t.account,
      trace_id:
        null === (i = this.core.clientSocket.socket) || void 0 === i
          ? void 0
          : i.sessionId,
      start_time: Date.now(),
      action: 2,
      exception_service: 9,
    })
    var p = s
      ? (`${s.message};;;` || `${s.code};;;`) +
        (d ? `parseDetail: ${d};;;` : '') +
        (n ? ` rawStr: ${n}` : '') +
        (r ? ` rawBuf: ${r}` : '')
      : ''
    this.core.reporter.reportTraceUpdateV2(
      'exceptions',
      {
        code:
          'encode' === c
            ? de.V2NIM_ERROR_CODE_PACK_ERROR
            : de.V2NIM_ERROR_CODE_UNPACK_ERROR,
        description: p,
        operation_type: 'encode' === c ? 3 : 4,
        target: `${o}-${a}`,
      },
      { asyncParams: Ae.net.getNetworkStatus() }
    ),
      this.core.reporter.reportTraceEnd('exceptions', 1)
  }
}
!(function (e) {
  ;(e[(e.ACTIVE = 1)] = 'ACTIVE'),
    (e[(e.KICKED = 2)] = 'KICKED'),
    (e[(e.OFFLINE = 3)] = 'OFFLINE')
})(xt || (xt = {}))
class Wt {
  constructor(e) {
    ;(this.isReconnect = !1),
      (this.packetTimeout = 8e3),
      (this.linkSSL = !0),
      (this.packetSer = 1),
      (this.backoff = new kt({ max: 8e3, min: 1600, jitter: 0.01 })),
      (this.sendingCmdMap = new Map()),
      (this.pingTimer = 0),
      (this.hasNetworkListener = !1),
      (this.core = e),
      (this.auth = e.auth),
      (this.logger = e.logger),
      (this.reporter = e.reporter),
      (this.timerManager = e.timerManager),
      (this.eventBus = e.eventBus),
      this.setListener()
  }
  setListener() {
    this.core.eventBus.on('V2NIMLoginService/loginLifeCycleLoginSucc', () => {
      this.isReconnect = !0
    })
  }
  setSessionId(e) {
    this.socket && (this.socket.sessionId = e)
  }
  setLinkSSL(e) {
    this.linkSSL = e
  }
  connect(e, t = !1) {
    var i, r
    return Te(this, void 0, void 0, function* () {
      this.isReconnect = t
      var s = this.core.auth.getConnectStatus()
      if (1 === s) {
        var n = `clientSocket::connect status is ${s}, and would not repeat connect`,
          o = new he({
            code: de.V2NIM_ERROR_CODE_ILLEGAL_STATE,
            detail: { reason: n },
          })
        return this.logger.warn(n), Promise.reject(o)
      }
      this.auth.lifeCycle.processEvent('connect')
      try {
        yield this.auth.doLoginStepsManager.add(this.doConnect(e)),
          this.logger.log(
            `clientSocketV2:: connect success with link url: ${e}, isReconnect: ${t}`
          ),
          this.core.reporter.reportTraceUpdateV2(
            'login',
            {
              operation_type: 'TCP',
              target: e,
              code: 200,
              mixlink: !0,
              succeed: !0,
            },
            { asyncParams: Ae.net.getNetworkStatus() }
          ),
          this.auth.lifeCycle.processEvent('connectSucc')
      } catch (t) {
        var a = t
        if (
          (this.core.reporter.reportTraceUpdateV2(
            'login',
            {
              operation_type: 'TCP',
              target: e,
              code: a.code || 0,
              description: `connectFailed:${a.message}`,
              mixlink: !0,
              succeed: !1,
            },
            { asyncParams: Ae.net.getNetworkStatus() }
          ),
          a.code === de.V2NIM_ERROR_CODE_CANCELLED ||
            a.code === de.V2NIM_ERROR_CODE_TIMEOUT)
        )
          throw (
            (null === (i = this.socket) || void 0 === i || i.close(),
            null === (r = this.socket) ||
              void 0 === r ||
              r.removeAllListeners(),
            (this.socket = void 0),
            t)
          )
        throw (
          (this.logger.warn(
            `clientSocketV2::connect failed with link url: ${e}`,
            a
          ),
          this.auth.lifeCycle.processEvent('connectFail', a),
          t)
        )
      }
    })
  }
  doConnect(e) {
    var t = !1
    return new Promise((i, r) => {
      ;(this.socket = new Kt(this.core, e, this.linkSSL)),
        this.socket.on('connect', () => {
          this.logger.log('clientSocketV2::socket on connect', e),
            this.core.reporterHookLinkKeep.start(),
            this.core.reporterHookLinkKeep.update({
              code: 0,
              description: 'connection begin',
              operation_type: 0,
              target: e,
            }),
            (t = !0),
            i()
        }),
        this.socket.on('message', this.onMessage.bind(this)),
        this.socket.on('disconnect', (i) =>
          Te(this, void 0, void 0, function* () {
            ;(t = !0),
              this.logger.log(`clientSocketV2::socket on disconnect ${e}`, i),
              yield this.core.reporterHookLinkKeep.update({
                code: (null == i ? void 0 : i.code) || 0,
                description:
                  (null == i ? void 0 : i.reason) || 'socket on disconnect',
                operation_type: 1,
                target: e,
              }),
              this.core.reporterHookLinkKeep.end(!1),
              this.doDisconnect(xt.OFFLINE, 'SocketOnDisconnect')
          })
        ),
        this.socket.on('connectFailed', (i) => {
          t
            ? this.ping()
            : (this.logger.error(
                `clientSocketV2::connectFailed:${e}, reason:${i && i.message}`
              ),
              this.cleanSocket()),
            (t = !0),
            r(i)
        })
    })
  }
  cleanSocket() {
    this.socket &&
      ('function' == typeof this.socket.removeAllListeners &&
        this.socket.removeAllListeners(),
      'function' == typeof this.socket.close && this.socket.close(),
      (this.socket = void 0))
  }
  resetSocketConfig() {
    this.backoff.reset(), this.initOnlineListener()
  }
  doDisconnect(e, t) {
    if (
      (this.logger.log(`clientSocketV2::doDisconnect:type:${e},reason:`, t),
      0 !== this.core.auth.getConnectStatus())
    ) {
      var i = { 1: 'close', 2: 'kicked', 3: 'broken' }[e] || ''
      this.markAllCmdInvaild(
        new he({
          code: de.V2NIM_ERROR_CODE_DISCONNECT,
          detail: {
            reason: 'Packet timeout due to instance disconnect',
            disconnect_reason: i,
          },
        })
      ),
        this.timerManager.destroy(),
        clearTimeout(this.pingTimer),
        this.cleanSocket(),
        e === xt.ACTIVE || e === xt.KICKED
          ? this.destroyOnlineListener()
          : e === xt.OFFLINE &&
            (this.auth.lifeCycle.processEvent(
              'connectionBroken',
              new he({
                code: de.V2NIM_ERROR_CODE_DISCONNECT,
                detail: { reason: 'connection broken due to internal reasons' },
              })
            ),
            this.logger.log(
              `clientSocketV2::doDisconnect: pending reconnect ${this.isReconnect}`
            ),
            this.isReconnect && this.auth.lifeCycle.processEvent('waiting'))
    } else this.logger.warn('clientSocketV2::doDisconnect:already disconnected')
  }
  sendCmd(e, t, i) {
    var r = this.core.auth.getLoginStatus(),
      s = { cmd: e }
    if (
      1 !== r &&
      !['v2Login', 'login', 'chatroomLogin', 'v2ChatroomLogin'].includes(e)
    )
      return (
        this.logger.warn(
          `clientSocketV2::NIM login status is ${r}, so can not sendCmd ${e}`
        ),
        Promise.reject(
          new he({
            code: de.V2NIM_ERROR_CODE_ILLEGAL_STATE,
            detail: Object.assign(
              { reason: 'Can not sendCmd due to no logined' },
              s
            ),
          })
        )
      )
    var n = 'heartbeat' !== e,
      o = n ? this.packetSer++ : 0,
      a = pt(e, o, this.logger, t)
    if (!a) {
      var c = new he({
        code: de.V2NIM_ERROR_CODE_INTERNAL,
        detail: Object.assign(Object.assign({}, s), {
          reason: `SendCmd::createCmd error: ${o} ${e}`,
        }),
      })
      return this.logger.error(c), Promise.reject(c)
    }
    var { packet: d, hasPacketResponse: l, hasPacketTimer: p } = a,
      h = JSON.stringify(d)
    n &&
      (this.logger.getDebugMode()
        ? this.logger.debug(
            `clientSocketV2::sendCmd: ${d.SID}_${d.CID},${e},ser:${o}`,
            h
          )
        : this.logger.log(
            `clientSocketV2::sendCmd: ${d.SID}_${d.CID},${e},ser:${o}`
          ))
    var u = new Date().getTime()
    return new Promise((r, n) => {
      l &&
        this.sendingCmdMap.set(o, {
          cmd: e,
          params: t,
          callback: [r, n],
          timer: p
            ? setTimeout(
                () => {
                  var t = new he({
                    code: de.V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT,
                    detail: Object.assign(
                      {
                        ser: o,
                        reason: `Packet Timeout: ser ${o} cmd ${e}`,
                        timetag: new Date().getTime(),
                      },
                      s
                    ),
                  })
                  this.markCmdInvalid(o, t, e)
                },
                i && i.timeout ? i.timeout : this.packetTimeout
              )
            : null,
        })
      try {
        this.socket.send(d.SID, d.CID, o, e, d.Q), l || r(d)
      } catch (t) {
        var a = new he({
          code: de.V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED,
          detail: Object.assign(
            {
              ser: o,
              reason:
                'Unable to send packet' +
                (t && t.message ? ': ' + t.message : ''),
              timetag: new Date().getTime(),
              rawError: t,
            },
            s
          ),
        })
        this.markCmdInvalid(o, a, e), n(a)
      }
    }).catch((e) =>
      Te(this, void 0, void 0, function* () {
        var t = e
        return [
          de.V2NIM_ERROR_CODE_DISCONNECT,
          de.V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT,
          de.V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED,
        ].includes(t.code)
          ? (this.reportSendCmdFailed(t, { sid: d.SID, cid: d.CID, ser: o }, u),
            Promise.reject(t))
          : Promise.reject(t)
      })
    )
  }
  reportSendCmdFailed(e, t, i) {
    var r
    this.reporter.reportTraceStart('exceptions', {
      user_id: this.core.auth.getLoginUser(),
      trace_id:
        null === (r = this.socket) || void 0 === r ? void 0 : r.sessionId,
      start_time: i,
      action: 2,
      exception_service: 6,
    })
    var s = Ve(e, 'detail.disconnect_reason') || '',
      n =
        e.code === de.V2NIM_ERROR_CODE_DISCONNECT
          ? JSON.stringify({ disconnect_reason: s })
          : e.detail.reason
    this.reporter.reportTraceUpdateV2(
      'exceptions',
      {
        code: e.code,
        description: n,
        operation_type: 1,
        target: `${t.sid}-${t.cid}`,
        context: `${t.ser}`,
      },
      { asyncParams: Ae.net.getNetworkStatus() }
    ),
      this.reporter.reportTraceEnd('exceptions', 1)
  }
  onMessage(e) {
    var t = ht(e, this.logger)
    if (t && t.length > 0) {
      var i = t[0],
        r = i.raw.ser
      for (var s of (i.error &&
        (this.logger.error(
          'clientSocketV2::onMessage packet error',
          `${i.raw.sid}_${i.raw.cid}, ser:${r},`,
          i.error
        ),
        i.error.code === de.V2NIM_ERROR_CODE_UNPACK_ERROR &&
          this.core.eventBus.emit('BinaryClientSocket/unpackError')),
      'heartbeat' !== i.cmd &&
        (this.logger.getDebugMode()
          ? this.logger.debug(
              `clientSocketV2::recvCmd ${i.raw.sid}_${i.raw.cid},${i.cmd},ser:${r}`,
              e
            )
          : this.logger.log(
              `clientSocketV2::recvCmd ${i.raw.sid}_${i.raw.cid},${i.cmd},ser:${r},code:${i.raw.code}`
            )),
      t))
        this.packetHandler(s)
    }
  }
  packetHandler(e) {
    var t, i, r, s
    if (e) {
      var n = e.raw.ser,
        o = this.sendingCmdMap.get(n)
      if (o && o.cmd === e.cmd) {
        var { callback: a, timer: c, params: d } = o
        if (
          (clearTimeout(c),
          (e.params = d),
          this.sendingCmdMap.delete(n),
          'heartbeat' === e.cmd)
        )
          return void a[0]()
        var l =
          null ===
            (i =
              null === (t = this.core[e.service]) || void 0 === t
                ? void 0
                : t.process) || void 0 === i
            ? void 0
            : i.call(t, e)
        l && 'function' == typeof l.then
          ? l
              .then((e) => {
                a[0](e)
              })
              .catch((e) => {
                a[1](e)
              })
          : (this.logger.log(
              'clientSocketV2::handlerFn without promise',
              e.service,
              e.cmd
            ),
            a[0](e))
      } else {
        var p =
          null ===
            (s =
              null === (r = this.core[e.service]) || void 0 === r
                ? void 0
                : r.process) || void 0 === s
            ? void 0
            : s.call(r, e)
        p &&
          'function' == typeof p.then &&
          p.catch((e) => {
            this.logger.error(
              'clientSocketV2::no obj cache, no process handler',
              e
            )
          })
      }
    }
  }
  markCmdInvalid(e, t, i) {
    var r = this.sendingCmdMap.get(e)
    if (r) {
      var { callback: s, timer: n } = r
      n && clearTimeout(n),
        this.sendingCmdMap.delete(e),
        this.logger.warn(`clientSocketV2::packet ${e}, ${i} is invalid:`, t),
        s[1](t)
    }
  }
  markAllCmdInvaild(e) {
    this.logger.log('markAllCmdInvaild', e),
      this.sendingCmdMap.forEach((t) => {
        var { callback: i, timer: r, cmd: s } = t
        this.logger.log(`clientSocketV2::markAllCmdInvaild:cmd ${s}`),
          r && clearTimeout(r),
          i[1](e)
      }),
      this.sendingCmdMap.clear()
  }
  ping() {
    var e
    return Te(this, void 0, void 0, function* () {
      clearTimeout(this.pingTimer)
      try {
        yield this.sendCmd('heartbeat')
      } catch (t) {
        if (t.code === de.V2NIM_ERROR_CODE_DISCONNECT) return
        if (yield this.testHeartBeat5Timeout())
          return (
            yield this.core.reporterHookLinkKeep.update({
              code: 0,
              description: 'Heartbeat-discovered link failure',
              operation_type: 1,
              target:
                null === (e = this.socket) || void 0 === e ? void 0 : e.url,
            }),
            this.core.reporterHookLinkKeep.end(!0),
            void this.doDisconnect(xt.OFFLINE, 'PingError')
          )
      }
      this.pingTimer = setTimeout(() => {
        this.ping()
      }, 3e4)
    })
  }
  testHeartBeat5Timeout() {
    return Te(this, void 0, void 0, function* () {
      clearTimeout(this.pingTimer)
      for (var e = 0; e < 5; e++)
        try {
          return yield this.sendCmd('heartbeat', {}, { timeout: 3e3 }), !1
        } catch (t) {
          this.logger.log(`clientSocketV2::test heartbeat ${e} Timeout`)
        }
      return !0
    })
  }
  initOnlineListener() {
    this.hasNetworkListener ||
      (this.logger.log('clientSocketV2::onlineListener:init'),
      (this.hasNetworkListener = !0),
      Ae.net.onNetworkStatusChange((e) => {
        this.logger.log('clientSocketV2::onlineListener:network change', e)
        var t = this.auth.getLoginStatus()
        e.isConnected && 1 === t
          ? this.ping()
          : e.isConnected && 3 === t
          ? (this.logger.log(
              'clientSocketV2::onlineListener:online and connectStatus is waiting, do reLogin'
            ),
            this.auth.reconnect.clearReconnectTimer(),
            this.auth.reconnect.doReLogin())
          : e.isConnected || this.doDisconnect(xt.OFFLINE, 'OfflineListener')
      }))
  }
  destroyOnlineListener() {
    this.logger.log('clientSocketV2::onlineListener:destroy'),
      Ae.net.offNetworkStatusChange(),
      (this.hasNetworkListener = !1)
  }
}
var Jt,
  zt = [
    'disconnect',
    'connect',
    'heartbeat',
    'message',
    'json',
    'event',
    'ack',
    'error',
    'noop',
  ],
  Xt = ['transport not supported', 'client not handshaken', 'unauthorized'],
  Qt = ['reconnect']
class Zt extends ne {
  constructor(e, t, i) {
    super(),
      (this.websocket = null),
      (this.socketConnectTimer = 0),
      (this.url = ''),
      (this.linkSSL = !0),
      (this.core = e),
      (this.url = t),
      (this.linkSSL = i),
      (this.status = 'disconnected'),
      (this.logger = e.logger),
      this.connect()
  }
  connect() {
    'connecting' !== this.status && 'connected' !== this.status
      ? ((this.status = 'connecting'),
        this.core.adapters
          .request(
            `${this.linkSSL ? 'https' : 'http'}://${
              this.url
            }/socket.io/1/?t=${Date.now()}`,
            {
              method: 'GET',
              dataType: 'text',
              timeout: this.core.options.xhrConnectTimeout || 8e3,
            },
            { exception_service: 6 }
          )
          .then((e) => {
            if ('connecting' === this.status) {
              var [t, i] = e.data.split(':')
              return (
                (this.sessionId = t),
                this.logger.log(
                  `imsocket::XHR success. status ${this.status}, ${
                    'connecting' === this.status
                      ? 'continue websocket connection'
                      : 'stop websocket connection'
                  }`
                ),
                this._createWebsocket(
                  `${this.linkSSL ? 'wss' : 'ws'}://${
                    this.url
                  }/socket.io/1/websocket/${t}`
                )
              )
            }
          })
          .catch((e) => {
            if ('connecting' === this.status) {
              var t = `imsocket::XHR fail. raw message: "${
                  (e = e || {}).message
                }", code: "${e.code}"`,
                i = e.code
              i =
                'v2' === Ve(this.core, 'options.apiVersion')
                  ? e.code === de.V2NIM_ERROR_CODE_CONNECT_TIMEOUT
                    ? de.V2NIM_ERROR_CODE_CONNECT_TIMEOUT
                    : de.V2NIM_ERROR_CODE_CONNECT_FAILED
                  : 408 === e.code
                  ? 408
                  : 415
              var r = new he({ code: i, detail: { reason: t, rawError: e } })
              this.logger.error(t),
                (this.status = 'disconnected'),
                this.emit('handshakeFailed', r)
            }
          }))
      : this.logger.warn(
          'imsocket::socket is connecting or connected',
          this.status
        )
  }
  close() {
    if (((this.status = 'disconnected'), this.websocket)) {
      this.logger.log('imsocket:: close websocket')
      try {
        this.websocket.send(this.encodePacket({ type: 'disconnect' }))
      } catch (e) {
        this.logger.warn('imsocket::attempt to send encodePacket error', e)
      }
      try {
        this.websocket.close()
      } catch (e) {
        this.logger.warn('imsocket::attempt to close websocket error', e)
      }
      this.clean(),
        this.emit('disconnect', { code: 0, reason: 'Active close websocket' })
    }
  }
  clean() {
    ;(this.status = 'disconnected'),
      clearTimeout(this.socketConnectTimer),
      this.websocket &&
        ((this.socketUrl = void 0),
        (this.websocket.onmessage = null),
        (this.websocket.onopen = null),
        (this.websocket.onerror = null),
        (this.websocket.onclose = null),
        (this.websocket = null))
  }
  onConnect() {
    ;(this.status = 'connected'),
      this.emit('connect'),
      clearTimeout(this.socketConnectTimer)
  }
  _createWebsocket(e) {
    ;(this.socketConnectTimer = setTimeout(() => {
      this.logger.error(
        'imsocket::Websocket connect timeout. url: ',
        this.socketUrl
      ),
        this.emit(
          'handshakeFailed',
          new he({
            code:
              'v2' === Ve(this.core, 'options.apiVersion')
                ? de.V2NIM_ERROR_CODE_CONNECT_TIMEOUT
                : 415,
            detail: {
              reason: `imsocket::Websocket connect timeout. url: ${this.socketUrl}`,
            },
          })
        )
    }, this.core.options.socketConnectTimeout || 8e3)),
      (this.socketUrl = e),
      (this.websocket = new Ae.WebSocket(e)),
      (this.websocket.onmessage = this.onMessage.bind(this)),
      (this.websocket.onclose = (e) => {
        ;(e = e || {}),
          this.logger.log(
            `imsocket::Websocket onclose done ${e.wasClean}/${e.code}/${e.reason}`
          ),
          this.clean(),
          this.emit('disconnect', { code: e.code || 0, reason: e.reason })
      }),
      (this.websocket.onerror = (e) => {
        this.logger.error('imsocket::Websocket onerror', e),
          'logined' === this.core.status && this.core.clientSocket.ping()
      })
  }
  onMessage(e) {
    var t,
      i = this.decodePacket(e.data)
    if (i)
      switch (i.type) {
        case 'connect':
          this.onConnect()
          break
        case 'disconnect':
          this.close(),
            this.emit('disconnect', {
              code: 0,
              reason: 'MessageEvent type disconnect',
            })
          break
        case 'message':
        case 'json':
          this.emit('message', i.data)
          break
        case 'event':
          i.name && this.emit(i.name, i.args)
          break
        case 'error':
          'unauthorized' === i.reason
            ? this.emit('connect_failed', i.reason)
            : this.emit('error', i.reason),
            this.logger.error(
              'imsocket::Websocket connect failed, onmessage type error. url: ',
              this.socketUrl
            ),
            clearTimeout(this.socketConnectTimer),
            this.emit(
              'handshakeFailed',
              new he({
                code:
                  'v2' === Ve(this.core, 'options.apiVersion')
                    ? de.V2NIM_ERROR_CODE_CONNECT_FAILED
                    : 408,
                detail: {
                  reason: `imsocket::Websocket connect failed, onMessage socket error. url: ${this.socketUrl}`,
                },
              })
            )
          break
        case 'heartbeat':
          null === (t = this.websocket) ||
            void 0 === t ||
            t.send(this.encodePacket({ type: 'heartbeat' }))
          break
        default:
          this.logger.warn('imsocket::Websocket no handler type', i.type)
      }
  }
  encodePacket(e) {
    var t,
      i,
      { type: r, id: s = '', endpoint: n = '', ack: o } = e,
      a = null
    if (!r) return ''
    switch (r) {
      case 'error':
        ;(t = e.reason ? Xt.indexOf(e.reason) : ''),
          (i = e.advice ? Qt.indexOf(e.advice) : ''),
          ('' === t && '' === i) || (a = t + ('' !== i ? '+' + i : ''))
        break
      case 'message':
        '' !== e.data && (a = e.data)
        break
      case 'event':
        ;(t = { name: e.name }),
          (t =
            e.args && e.args.length
              ? { name: e.name, args: e.args }
              : { name: e.name }),
          (a = JSON.stringify(t))
        break
      case 'json':
        a = JSON.stringify(e.data)
        break
      case 'connect':
        e.qs && (a = e.qs)
        break
      case 'ack':
        a =
          e.ackId +
          (e.args && e.args.length ? '+' + JSON.stringify(e.args) : '')
    }
    var c = [zt.indexOf(r), s + ('data' === o ? '+' : ''), n]
    return null != a && c.push(a), c.join(':')
  }
  decodePacket(e) {
    if (e)
      if ('�' != e.charAt(0)) {
        var t = e.match(/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/)
        if (t) {
          var i,
            [, r, s, n, o, a] = t,
            c = { type: zt[+r], endpoint: o }
          switch ((s && ((c.id = s), (c.ack = !n || 'data')), c.type)) {
            case 'error':
              ;(i = a.split('+')), (c.reason = Xt[+i[0]] || '')
              break
            case 'message':
              c.data = a || ''
              break
            case 'connect':
              c.qs = a || ''
              break
            case 'event':
              try {
                var d = JSON.parse(a)
                ;(c.name = d.name), (c.args = d.args)
              } catch (e) {
                this.logger.error('imsocket::parseData::type::event error', e)
              }
              c.args = c.args || []
              break
            case 'json':
              try {
                c.data = JSON.parse(a)
              } catch (e) {
                this.logger.error('imsocket::parseData::type::json error', e)
              }
              break
            case 'ack':
              if (
                (i = a.match(/^([0-9]+)(\+)?(.*)/)) &&
                ((c.ackId = i[1]), (c.args = []), i[3])
              )
                try {
                  c.args = i[3] ? JSON.parse(i[3]) : []
                } catch (e) {
                  this.logger.error('imsocket::parseData::type::ack error', e)
                }
          }
          return c
        }
      } else this.logger.error('imsocket::unrecognize dataStr', e.slice(0, 20))
  }
  send(e) {
    var t,
      i = { data: e, type: 'message', endpoint: '' }
    null === (t = this.websocket) ||
      void 0 === t ||
      t.send(this.encodePacket(i))
  }
}
!(function (e) {
  ;(e[(e.ACTIVE = 1)] = 'ACTIVE'),
    (e[(e.KICKED = 2)] = 'KICKED'),
    (e[(e.OFFLINE = 3)] = 'OFFLINE')
})(Jt || (Jt = {}))
class ei {
  constructor(e) {
    ;(this.isReconnect = !1),
      (this.packetTimeout = 8e3),
      (this.linkSSL = !0),
      (this.packetSer = 1),
      (this.backoff = new kt({ max: 8e3, min: 1600, jitter: 0.01 })),
      (this.sendingCmdMap = new Map()),
      (this.pingTimer = 0),
      (this.hasNetworkListener = !1),
      (this.core = e),
      (this.auth = e.auth),
      (this.logger = e.logger),
      (this.reporter = e.reporter),
      (this.timerManager = e.timerManager),
      (this.eventBus = e.eventBus),
      this.setListener()
  }
  setListener() {
    this.core.eventBus.on('V2NIMLoginService/loginLifeCycleLoginSucc', () => {
      this.isReconnect = !0
    })
  }
  setSessionId(e) {
    this.socket && (this.socket.sessionId = e)
  }
  setLinkSSL(e) {
    this.linkSSL = e
  }
  connect(e, t = !1) {
    var i, r
    return Te(this, void 0, void 0, function* () {
      this.isReconnect = t
      var s = this.core.auth.getConnectStatus()
      if (1 === s) {
        var n = `clientSocket::connect status is ${s}, and would not repeat connect`,
          o = new he({
            code: de.V2NIM_ERROR_CODE_ILLEGAL_STATE,
            detail: { reason: n },
          })
        return this.logger.warn(n), Promise.reject(o)
      }
      this.auth.lifeCycle.processEvent('connect')
      try {
        yield this.auth.doLoginStepsManager.add(this.doConnect(e)),
          this.logger.log(
            `clientSocketV2:: connect success with link url: ${e}, isReconnect: ${t}`
          ),
          this.core.reporter.reportTraceUpdateV2(
            'login',
            {
              operation_type: 'TCP',
              target: e,
              code: 200,
              mixlink: !0,
              succeed: !0,
            },
            { asyncParams: Ae.net.getNetworkStatus() }
          ),
          this.auth.lifeCycle.processEvent('connectSucc')
      } catch (t) {
        var a = t
        if (
          (this.core.reporter.reportTraceUpdateV2(
            'login',
            {
              operation_type: 'TCP',
              target: e,
              code: a.code || 0,
              description: `connectFailed:${a.message}`,
              mixlink: !0,
              succeed: !1,
            },
            { asyncParams: Ae.net.getNetworkStatus() }
          ),
          a.code === de.V2NIM_ERROR_CODE_CANCELLED ||
            a.code === de.V2NIM_ERROR_CODE_TIMEOUT)
        )
          throw (
            (null === (i = this.socket) || void 0 === i || i.close(),
            null === (r = this.socket) ||
              void 0 === r ||
              r.removeAllListeners(),
            (this.socket = void 0),
            t)
          )
        throw (
          (this.logger.warn(
            `clientSocketV2::connect failed with link url: ${e}`,
            a
          ),
          this.auth.lifeCycle.processEvent('connectFail', a),
          t)
        )
      }
    })
  }
  doConnect(e) {
    var t = !1
    return new Promise((i, r) => {
      ;(this.socket = new Zt(this.core, e, this.linkSSL)),
        this.socket.on('connect', () => {
          this.logger.log('clientSocketV2::socket on connect', e),
            this.core.reporterHookLinkKeep.start(),
            this.core.reporterHookLinkKeep.update({
              code: 0,
              description: 'connection begin',
              operation_type: 0,
              target: e,
            }),
            (t = !0),
            i()
        }),
        this.socket.on('message', this.onMessage.bind(this)),
        this.socket.on('disconnect', (i) =>
          Te(this, void 0, void 0, function* () {
            ;(t = !0),
              this.logger.log('clientSocketV2::socket on disconnect', i),
              yield this.core.reporterHookLinkKeep.update({
                code: (null == i ? void 0 : i.code) || 0,
                description:
                  (null == i ? void 0 : i.reason) || 'socket on disconnect',
                operation_type: 1,
                target: e,
              }),
              this.core.reporterHookLinkKeep.end(!1),
              this.doDisconnect(Jt.OFFLINE, 'SocketOnDisconnect')
          })
        ),
        this.socket.on('handshakeFailed', (e) => {
          t
            ? this.ping()
            : (this.logger.error(
                `clientSocketV2::handshake failed: "${e && e.message}"`
              ),
              this.cleanSocket()),
            (t = !0),
            r(e)
        })
    })
  }
  cleanSocket() {
    this.socket &&
      ('function' == typeof this.socket.removeAllListeners &&
        this.socket.removeAllListeners(),
      'function' == typeof this.socket.close && this.socket.close(),
      (this.socket = void 0))
  }
  resetSocketConfig() {
    this.backoff.reset(), this.initOnlineListener()
  }
  doDisconnect(e, t) {
    if (
      (this.logger.log(`clientSocketV2::doDisconnect:type:${e},reason:`, t),
      0 !== this.core.auth.getConnectStatus())
    ) {
      var i = { 1: 'close', 2: 'kicked', 3: 'broken' }[e] || ''
      this.markAllCmdInvaild(
        new he({
          code: de.V2NIM_ERROR_CODE_DISCONNECT,
          detail: {
            reason: 'Packet timeout due to instance disconnect',
            disconnect_reason: i,
          },
        })
      ),
        this.timerManager.destroy(),
        clearTimeout(this.pingTimer),
        this.cleanSocket(),
        e === Jt.ACTIVE || e === Jt.KICKED
          ? this.destroyOnlineListener()
          : e === Jt.OFFLINE &&
            (this.auth.lifeCycle.processEvent(
              'connectionBroken',
              new he({
                code: de.V2NIM_ERROR_CODE_DISCONNECT,
                detail: { reason: 'connection broken due to internal reasons' },
              })
            ),
            this.logger.log(
              `clientSocketV2::doDisconnect: pending reconnect ${this.isReconnect}`
            ),
            this.isReconnect && this.auth.lifeCycle.processEvent('waiting'))
    } else this.logger.warn('clientSocketV2::doDisconnect:already disconnected')
  }
  sendCmd(e, t, i) {
    var r = this.core.auth.getLoginStatus(),
      s = { cmd: e }
    if (
      1 !== r &&
      !['v2Login', 'login', 'chatroomLogin', 'v2ChatroomLogin'].includes(e)
    )
      return (
        this.logger.warn(
          `clientSocketV2::NIM login status is ${r}, so can not sendCmd ${e}`
        ),
        Promise.reject(
          new he({
            code: de.V2NIM_ERROR_CODE_ILLEGAL_STATE,
            detail: Object.assign(
              { reason: 'Can not sendCmd due to no logined' },
              s
            ),
          })
        )
      )
    var n = 'heartbeat' !== e,
      o = n ? this.packetSer++ : 0,
      a = pt(e, o, this.logger, t)
    if (!a) {
      var c = new he({
        code: de.V2NIM_ERROR_CODE_INTERNAL,
        detail: Object.assign(Object.assign({}, s), {
          reason: `SendCmd::createCmd error: ${o} ${e}`,
        }),
      })
      return this.logger.error(c), Promise.reject(c)
    }
    var { packet: d, hasPacketResponse: l, hasPacketTimer: p } = a,
      h = JSON.stringify(d)
    n &&
      (this.logger.getDebugMode()
        ? this.logger.debug(
            `clientSocketV2::sendCmd: ${d.SID}_${d.CID},${e},ser:${o}`,
            h
          )
        : this.logger.log(
            `clientSocketV2::sendCmd: ${d.SID}_${d.CID},${e},ser:${o}`
          ))
    var u = new Date().getTime()
    return new Promise((r, n) => {
      l &&
        this.sendingCmdMap.set(o, {
          cmd: e,
          params: t,
          callback: [r, n],
          timer: p
            ? setTimeout(
                () => {
                  var t = new he({
                    code: de.V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT,
                    detail: Object.assign(
                      {
                        ser: o,
                        reason: `Packet Timeout: ser ${o} cmd ${e}`,
                        timetag: new Date().getTime(),
                      },
                      s
                    ),
                  })
                  this.markCmdInvalid(o, t, e)
                },
                i && i.timeout ? i.timeout : this.packetTimeout
              )
            : null,
        })
      try {
        this.socket.send(h), l || r(d)
      } catch (t) {
        var a = new he({
          code: de.V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED,
          detail: Object.assign(
            {
              ser: o,
              reason:
                'Unable to send packet' +
                (t && t.message ? ': ' + t.message : ''),
              timetag: new Date().getTime(),
              rawError: t,
            },
            s
          ),
        })
        this.markCmdInvalid(o, a, e), n(a)
      }
    }).catch((e) =>
      Te(this, void 0, void 0, function* () {
        var t,
          i = e
        if (
          ![
            de.V2NIM_ERROR_CODE_DISCONNECT,
            de.V2NIM_ERROR_CODE_PROTOCOL_TIMEOUT,
            de.V2NIM_ERROR_CODE_PROTOCOL_SEND_FAILED,
          ].includes(i.code)
        )
          return Promise.reject(i)
        this.reporter.reportTraceStart('exceptions', {
          user_id: this.core.auth.getLoginUser(),
          trace_id:
            null === (t = this.socket) || void 0 === t ? void 0 : t.sessionId,
          start_time: u,
          action: 2,
          exception_service: 6,
        })
        var r = Ve(i, 'detail.disconnect_reason') || '',
          s =
            i.code === de.V2NIM_ERROR_CODE_DISCONNECT
              ? JSON.stringify({ disconnect_reason: r })
              : i.detail.reason
        return (
          this.reporter.reportTraceUpdateV2(
            'exceptions',
            {
              code: i.code,
              description: s,
              operation_type: 1,
              target: `${d.SID}-${d.CID}`,
              context: `${d.SER}`,
            },
            { asyncParams: Ae.net.getNetworkStatus() }
          ),
          this.reporter.reportTraceEnd('exceptions', 1),
          Promise.reject(i)
        )
      })
    )
  }
  onMessage(e) {
    var t = ht(e, this.logger)
    if (t && t.length > 0) {
      var i = t[0],
        r = i.raw.ser
      for (var s of (i.error &&
        this.logger.error(
          'clientSocketV2::onMessage packet error',
          `${i.raw.sid}_${i.raw.cid}, ser:${r},`,
          i.error
        ),
      'heartbeat' !== i.cmd &&
        (this.logger.getDebugMode()
          ? this.logger.debug(
              `clientSocketV2::recvCmd ${i.raw.sid}_${i.raw.cid},${i.cmd},ser:${r}`,
              i.content
            )
          : this.logger.log(
              `clientSocketV2::recvCmd ${i.raw.sid}_${i.raw.cid},${i.cmd},ser:${r};code:${i.raw.code}`
            )),
      t))
        this.packetHandler(s)
    }
  }
  packetHandler(e) {
    var t, i, r, s
    if (e) {
      var n = e.raw.ser,
        o = this.sendingCmdMap.get(n)
      if (o && o.cmd === e.cmd) {
        var { callback: a, timer: c, params: d } = o
        if (
          (clearTimeout(c),
          (e.params = d),
          this.sendingCmdMap.delete(n),
          'heartbeat' === e.cmd)
        )
          return void a[0]()
        var l =
          null ===
            (i =
              null === (t = this.core[e.service]) || void 0 === t
                ? void 0
                : t.process) || void 0 === i
            ? void 0
            : i.call(t, e)
        l && 'function' == typeof l.then
          ? l
              .then((e) => {
                a[0](e)
              })
              .catch((e) => {
                a[1](e)
              })
          : (this.logger.log(
              'clientSocketV2::handlerFn without promise',
              e.service,
              e.cmd
            ),
            a[0](e))
      } else {
        var p =
          null ===
            (s =
              null === (r = this.core[e.service]) || void 0 === r
                ? void 0
                : r.process) || void 0 === s
            ? void 0
            : s.call(r, e)
        p &&
          'function' == typeof p.then &&
          p.catch((e) => {
            this.logger.error(
              'clientSocketV2::no obj cache, no process handler',
              e
            )
          })
      }
    }
  }
  markCmdInvalid(e, t, i) {
    var r = this.sendingCmdMap.get(e)
    if (r) {
      var { callback: s, timer: n } = r
      n && clearTimeout(n),
        this.sendingCmdMap.delete(e),
        this.logger.warn(`clientSocketV2::packet ${e}, ${i} is invalid:`, t),
        s[1](t)
    }
  }
  markAllCmdInvaild(e) {
    this.logger.log('markAllCmdInvaild', e),
      this.sendingCmdMap.forEach((t) => {
        var { callback: i, timer: r, cmd: s } = t
        this.logger.log(`clientSocketV2::markAllCmdInvaild:cmd ${s}`),
          r && clearTimeout(r),
          i[1](e)
      }),
      this.sendingCmdMap.clear()
  }
  ping() {
    var e
    return Te(this, void 0, void 0, function* () {
      clearTimeout(this.pingTimer)
      try {
        yield this.sendCmd('heartbeat')
      } catch (t) {
        if (t.code === de.V2NIM_ERROR_CODE_DISCONNECT) return
        if (yield this.testHeartBeat5Timeout())
          return (
            yield this.core.reporterHookLinkKeep.update({
              code: 0,
              description: 'Heartbeat-discovered link failure',
              operation_type: 1,
              target:
                null === (e = this.socket) || void 0 === e ? void 0 : e.url,
            }),
            this.core.reporterHookLinkKeep.end(!0),
            void this.doDisconnect(Jt.OFFLINE, 'PingError')
          )
      }
      this.pingTimer = setTimeout(() => {
        this.ping()
      }, 3e4)
    })
  }
  testHeartBeat5Timeout() {
    return Te(this, void 0, void 0, function* () {
      clearTimeout(this.pingTimer)
      for (var e = 0; e < 5; e++)
        try {
          return yield this.sendCmd('heartbeat', {}, { timeout: 3e3 }), !1
        } catch (t) {
          this.logger.log(`clientSocketV2::test heartbeat ${e} Timeout`)
        }
      return !0
    })
  }
  initOnlineListener() {
    this.hasNetworkListener ||
      (this.logger.log('clientSocketV2::onlineListener:init'),
      (this.hasNetworkListener = !0),
      Ae.net.onNetworkStatusChange((e) => {
        this.logger.log('clientSocketV2::onlineListener:network change', e)
        var t = this.auth.getConnectStatus(),
          i = this.auth.getLoginStatus()
        e.isConnected && 1 === i
          ? this.ping()
          : e.isConnected && 3 === t
          ? (this.logger.log(
              'clientSocketV2::onlineListener:online and connectStatus is waiting, do reLogin'
            ),
            this.auth.reconnect.clearReconnectTimer(),
            this.auth.reconnect.doReLogin())
          : e.isConnected || this.doDisconnect(Jt.OFFLINE, 'OfflineListener')
      }))
  }
  destroyOnlineListener() {
    this.logger.log('clientSocketV2::onlineListener:destroy'),
      Ae.net.offNetworkStatusChange(),
      (this.hasNetworkListener = !1)
  }
}
class ti {
  constructor(e) {
    ;(this.currenRetryCount = 0),
      (this.backoff = new kt({ max: 8e3, min: 1600, jitter: 0.01 })),
      (this.reconnectTimer = 0),
      (this.appVisibility = !0),
      (this.core = e),
      (this.auth = e.V2NIMLoginService)
  }
  reset() {
    ;(this.currenRetryCount = 0),
      this.backoff.reset(),
      this.reconnectTimer && clearTimeout(this.reconnectTimer)
  }
  clearReconnectTimer() {
    this.reconnectTimer && clearTimeout(this.reconnectTimer)
  }
  setAppVisibility(e) {
    var t = this.getAppVisibility()
    ;(this.appVisibility = e),
      !t &&
        e &&
        3 === this.auth.getLoginStatus() &&
        (this.core.logger.log(
          'reconnect::appVisibility change to visible, try to reconnect'
        ),
        this.auth.reconnect.clearReconnectTimer(),
        this.auth.reconnect.doReLogin())
  }
  getAppVisibility() {
    return this.appVisibility
  }
  attempToReLogin() {
    var e = this.backoff.duration()
    if ('function' == typeof this.reconnectDelayProvider)
      try {
        var t = this.reconnectDelayProvider(e)
        'number' == typeof t &&
          t >= 0 &&
          (e = t >= 1e3 ? t : t + 200 + Math.ceil(300 * Math.random()))
      } catch (e) {
        this.core.logger.error(
          'reconnect::connectDelayProvider excute failed,',
          e
        )
      }
    return (
      this.currenRetryCount++,
      this.core.logger.log(
        `reconnect::reconnect timer is about to be set, delay ${e} ms, current retry count is ${this.currenRetryCount}`
      ),
      this.core.reporter.reportTraceStart('login', {
        user_id: this.auth.getLoginUser(),
        action: 'auto_login',
        binary_websocket: this.auth.binaryWebsocket,
      }),
      this.clearReconnectTimer(),
      (this.reconnectTimer = setTimeout(() => {
        this.core.logger.log('reconnect::reconnect timer is now triggered')
        var e = this.auth.getConnectStatus()
        3 === e
          ? this.doReLogin()
          : this.core.logger.warn(
              `reconnect::reconnect timer is over because connect status now is ${e}`
            )
      }, e)),
      !0
    )
  }
  doReLogin() {
    if (!this.getAppVisibility())
      return (
        this.core.logger.log(
          'reconnect::reLogin skip, cause app is not visible'
        ),
        void this.auth.lifeCycle.processEvent('waiting')
      )
    ;(this.auth.loginOption.forceMode = !1),
      (this.auth.originLoginPromise = this.auth.doLogin(!0))
    var e = this.auth.previousLoginManager.add(this.auth.originLoginPromise)
    return (
      e
        .then(() => {
          this.core.reporter.reportTraceEnd('login', !0)
        })
        .catch((e) => {
          var t = e
          if (
            (this.core.logger.warn('reconnect::try login but failed due to', t),
            this.core.reporter.reportTraceEnd('login', !1),
            this.auth.checkLoginTerminalCode(t && t.code))
          )
            return (
              this.auth.clientSocket.doDisconnect(
                xt.ACTIVE,
                'ReloginTerminated'
              ),
              void this.auth.lifeCycle.processEvent('exited', t)
            )
          t && 399 === t.code && this.auth.lbs.reset(),
            this.auth.lifeCycle.processEvent('waiting')
        }),
      e
    )
  }
  _setReconnectDelayProvider(e) {
    this.reconnectDelayProvider = e
  }
}
function ii(e) {
  e = e || []
  for (var t = [], i = 0; i < e.length; i++)
    -1 === t.indexOf(e[i]) && t.push(e[i])
  return t
}
class ri {
  constructor(e) {
    ;(this.socketLinkUrls = []),
      (this.timer = 0),
      (this.failedCount = 0),
      (this.core = e),
      (this.auth = e.V2NIMLoginService)
  }
  getLbsInfos() {
    return Te(this, void 0, void 0, function* () {
      if (this.socketLinkUrls.length > 0) {
        var e = this.socketLinkUrls.shift()
        return (
          this.core.logger.log(
            'V2NIMLoginService::getLbsInfos:use cache link',
            e
          ),
          Promise.resolve(e)
        )
      }
      this.auth.lifeCycle.processEvent('addressing'),
        this.core.reporterHookLBS.start(this.core.account)
      var t = ii(this.auth.config.lbsUrls)
      try {
        var i = yield this.ladderLoad(t)
        if (200 !== i.status || !i.data)
          throw (
            (this.core.logger.error(
              'V1NIMLoginService::getLbsInfos:error status',
              i.status,
              i
            ),
            new he({
              code: de.V2NIM_ERROR_CODE_INTERNAL,
              detail: {
                reason: `V2NIMLoginService::getLbsInfos failed, status ${i.status}`,
              },
            }))
          )
        this.success(i)
      } catch (e) {
        var r = e
        if (
          (this.core.logger.error(
            `V2NIMLoginService::lbs getLbsInfos error, use default link: ${this.auth.config.linkUrl}. error:`,
            e
          ),
          this.reportForFail(t[0], r.code, r.message),
          this.checkTerminator(r.code))
        )
          throw e
        this.socketLinkUrls = [this.auth.config.linkUrl]
      }
      return this.socketLinkUrls.shift()
    })
  }
  checkTerminator(e) {
    return (
      e === de.V2NIM_ERROR_CODE_CANCELLED || e === de.V2NIM_ERROR_CODE_TIMEOUT
    )
  }
  generateUrl(e) {
    var t = (e = this.processLbsUrl(e)).indexOf('?') > -1 ? '&' : '?'
    return (
      e +
      t +
      'k=' +
      this.core.options.appkey +
      '&id=' +
      this.core.auth.getLoginUser() +
      '&sv=180&pv=1&networkType=0&lv=1'
    )
  }
  processLbsUrl(e) {
    return De() ? e.replace('/webconf', '/wxwebconf') : e
  }
  requstLbs(e) {
    return this.auth.doLoginStepsManager.add(
      this.core.adapters.request(this.generateUrl(e), {
        method: 'GET',
        dataType: 'json',
        timeout: 8e3,
      })
    )
  }
  setLadderTimer(e, t, i, r) {
    this.timer && clearTimeout(this.timer)
    var s = e[t]
    this.timer = setTimeout(() => {
      s &&
        (this.setLadderTimer(e, t + 1, i, r),
        this.core.logger.log(
          `V2NIMLoginService::getLbsInfos ${t}:`,
          this.processLbsUrl(s)
        ),
        this.reportForLbsStart(s, t),
        this.requstLbs(s)
          .then((e) => {
            this.reset(), i(Object.assign(Object.assign({}, e), { url: s }))
          })
          .catch((i) => {
            var n
            if (
              (this.core.logger.warn(
                `V2NIMLoginService::getLbsInfos ${t} failed:`,
                i
              ),
              (this.failedCount += 1),
              this.reportForFailOnce(
                s,
                i.code,
                (null === (n = i.detail) || void 0 === n ? void 0 : n.reason) ||
                  i.message
              ),
              this.failedCount >= e.length || this.checkTerminator(i.code))
            )
              return this.reset(), void r(i)
          }))
    }, 2e3)
  }
  ladderLoad(e) {
    return new Promise((t, i) => {
      e.length > 1 && this.setLadderTimer(e, 1, t, i)
      var r = e[0]
      this.core.logger.log('V2NIMLoginService::getLbsInfos 0:', r),
        this.reportForLbsStart(r, 0),
        this.requstLbs(r)
          .then((e) => {
            this.reset(), t(Object.assign(Object.assign({}, e), { url: r }))
          })
          .catch((t) => {
            var s
            ;(this.failedCount += 1),
              this.core.logger.warn(
                'V2NIMLoginService::getLbsInfos 0 failed:',
                t
              ),
              this.reportForFailOnce(
                r,
                t.code,
                (null === (s = t.detail) || void 0 === s ? void 0 : s.reason) ||
                  t.message
              ),
              (this.failedCount >= e.length || this.checkTerminator(t.code)) &&
                (this.reset(), i(t))
          })
    })
  }
  success(e) {
    var t,
      i,
      r = e.data.common,
      s = r['mix.link'] || [],
      n = r['link.default'] || []
    ;(this.socketLinkUrls = s.concat(n).concat(this.auth.config.linkUrl)),
      e.data['nos-chunk'] &&
        (null === (t = this.core.cloudStorage) || void 0 === t
          ? void 0
          : t.setOptions) &&
        (this.core.logger.log(
          'getLbsInfos success. lbs.nos-chunk',
          e.data['nos-chunk']
        ),
        this.core.cloudStorage.setOptions({
          chunkUploadHost: e.data['nos-chunk'],
        })),
      Array.isArray(e.data.nosup) &&
        e.data.nosup.length > 0 &&
        (null === (i = this.core.cloudStorage) || void 0 === i
          ? void 0
          : i.setOptions) &&
        (this.core.logger.log('getLbsInfos success. lbs.nosup', e.data.nosup),
        this.core.cloudStorage.setOptions({
          commonUploadHostBackupList: e.data.nosup,
          commonUploadHost: e.data.nosup[0],
        })),
      this.core.logger.log(
        'V2NIMLoginService::getLbsInfos success, socket link:',
        this.socketLinkUrls.slice(0),
        'chunkUploadHost: ',
        e.data['nos-chunk']
      ),
      this.reportForLbsSuccess(e.url, e.data)
  }
  reportForLbsStart(e, t) {
    this.core.reporterHookLBS.updateBegin({ target: e, index: t })
  }
  reportForLbsSuccess(e, t) {
    this.core.reporterHookLBS.updateComplete({
      target: e,
      code: 200,
      body: JSON.stringify(t),
    }),
      this.core.reporterHookLBS.end(!0),
      this.core.reporter.reportTraceUpdateV2(
        'login',
        { operation_type: 'HTTP', target: e, code: 200, succeed: !0 },
        { asyncParams: Ae.net.getNetworkStatus() }
      )
  }
  reportForFailOnce(e, t, i) {
    this.core.reporterHookLBS.updateComplete({ target: e, code: t, body: i })
  }
  reportForFail(e, t, i) {
    this.core.reporterHookLBS.end(!1),
      this.core.reporter.reportTraceUpdateV2(
        'login',
        {
          operation_type: 'HTTP',
          target: e,
          description: i,
          code: t,
          succeed: !1,
        },
        { asyncParams: Ae.net.getNetworkStatus() }
      )
  }
  reset() {
    ;(this.socketLinkUrls = []),
      (this.failedCount = 0),
      clearTimeout(this.timer)
  }
}
class si {
  constructor(e) {
    ;(this.lastLoginClientKey = '__NIM_LAST_LOGIN_CLIENT__'),
      (this.loginClients = []),
      (this.loginClientOfThisConnection = {}),
      (this.core = e),
      (this.auth = e.V2NIMLoginService)
  }
  verifyAuthentication(e) {
    var t, i
    return Te(this, void 0, void 0, function* () {
      var r = yield this.auth.doLoginStepsManager.add(
          this.refreshLoginToken(this.auth.account)
        ),
        s = yield this.auth.doLoginStepsManager.add(
          this.refreshThirdPartyExt(this.auth.account)
        )
      this.auth.token = r
      var n,
        o = Ae.getSystemInfo(),
        a = {
          appkey: this.core.options.appkey,
          account: this.auth.account,
          token: r,
          authType: this.auth.loginOption.authType,
          appLogin: e ? 0 : 1,
          clientType: 16,
          clientSession: this.auth.clientSession,
          clientId: this.auth.deviceId,
          sdkVersion: 100930,
          userAgent: this.core.options.loginSDKTypeParamCompat
            ? 'Native/10.9.30'
            : o.userAgent
                .replace('{{appkey}}', this.core.options.appkey)
                .slice(0, 299),
          libEnv: this.core.options.flutterSdkVersion
            ? 'FLUTTER'
            : this.core.options.loginSDKTypeParamCompat
            ? void 0
            : o.libEnv,
          hostEnv: this.core.options.flutterSdkVersion
            ? 4
            : this.core.options.loginSDKTypeParamCompat
            ? 0
            : o.hostEnvEnum,
          sdkHumanVersion: this.core.options.flutterSdkVersion || '10.9.30',
          os: o.os,
          browser: o.browser,
          protocolVersion: 1,
          customClientType: this.auth.config.customClientType,
          customTag: this.auth.config.customTag,
          thirdPartyExtension: s,
          isRoutable:
            !1 ===
            (null === (t = this.auth.loginOption.routeConfig) || void 0 === t
              ? void 0
              : t.routeEnabled)
              ? 0
              : 1,
          env:
            null === (i = this.auth.loginOption.routeConfig) || void 0 === i
              ? void 0
              : i.routeEnvironment,
        },
        c = o.os.toLowerCase()
      'UNIAPP' !== Ae.platform ||
      ('ios' !== c && 'android' !== c && 'harmonyos' !== c)
        ? 'React Native' === Ae.platform &&
          (this.core.logger.log(
            'V2NIMLoginService deviceInfo',
            this.core.V2NIMLoginService.deviceInfo,
            'os',
            c
          ),
          (a.isReactNative = 1),
          (a.clientType = 'ios' === c ? 2 : 1),
          (a.deviceInfo = JSON.stringify(
            Object.assign(
              { IS_SUPPORT_HONOR: !0 },
              this.core.V2NIMLoginService.deviceInfo
            )
          )))
        : ((a.isReactNative = 1),
          (a.clientType = 'ios' === c ? 2 : 'android' === c ? 1 : 65),
          o.pushDeviceInfo &&
            o.pushDeviceInfo.MANUFACTURER &&
            (a.deviceInfo = JSON.stringify(
              Object.assign({ IS_SUPPORT_HONOR: !0 }, o.pushDeviceInfo)
            ))),
        this.core.logger.log(
          `V2NIMLoginService::do login,accid:${a.account};clientSession:${a.clientSession};appLogin:${a.appLogin}`
        )
      try {
        n = yield this.auth.doLoginStepsManager.add(
          this.auth.clientSocket.sendCmd('v2Login', { tag: a })
        )
      } catch (e) {
        var d = e
        if (
          (this.core.reporter.reportTraceUpdateV2(
            'login',
            {
              operation_type: 'protocol',
              target: '26-3',
              code: d.code || 0,
              succeed: !1,
              description: d.message,
            },
            { asyncParams: Ae.net.getNetworkStatus() }
          ),
          d.code === de.V2NIM_ERROR_CODE_CANCELLED ||
            d.code === de.V2NIM_ERROR_CODE_TIMEOUT)
        )
          throw d
        throw (this.processLoginFailed(d), d)
      }
      var { data: l, loginClients: p } = n.content
      return (
        this.changeLoginClient(1, p),
        this.core.reporter.reportTraceUpdateV2(
          'login',
          {
            operation_type: 'protocol',
            target: '26-3',
            code: 200,
            succeed: !0,
          },
          { asyncParams: Ae.net.getNetworkStatus() }
        ),
        (this.loginClientOfThisConnection = Ct(l)),
        this.core.clientSocket.setSessionId(l.consid),
        Ae.localStorage.setItem(
          this.lastLoginClientKey,
          JSON.stringify(
            Object.assign(
              { account: this.auth.account },
              this.loginClientOfThisConnection
            )
          )
        ),
        this.loginClientOfThisConnection
      )
    })
  }
  refreshLoginToken(e) {
    return Te(this, void 0, void 0, function* () {
      if (0 === this.auth.loginOption.authType) return this.auth.token
      if ('function' != typeof this.auth.loginOption.tokenProvider)
        return this.auth.token
      try {
        var t = yield this.auth.loginOption.tokenProvider(e)
        if ('string' == typeof t) return t
        throw (
          (this.core.logger.error(
            'V2NIMLoginService::excute tokenProvider complete but got Unexpected value:',
            t
          ),
          new he({
            code: de.V2NIM_ERROR_CODE_CALLBACK_FAILED,
            detail: {
              reason: 'Excute tokenProvider complete but got Unexpected value',
              rawData: t,
            },
          }))
        )
      } catch (e) {
        var i = e,
          r = i
        throw (
          (i.code !== de.V2NIM_ERROR_CODE_CALLBACK_FAILED &&
            (this.core.logger.error(
              'V2NIMLoginService::excute tokenProvider error:',
              i
            ),
            (r = new he({
              code: de.V2NIM_ERROR_CODE_CALLBACK_FAILED,
              desc: 'Excute tokenProvider error',
              detail: { rawError: e },
            }))),
          this.processLoginFailed(i),
          r)
        )
      }
    })
  }
  refreshThirdPartyExt(e) {
    return Te(this, void 0, void 0, function* () {
      if ('function' != typeof this.auth.loginOption.loginExtensionProvider)
        return ''
      try {
        var t = yield this.auth.loginOption.loginExtensionProvider(e)
        if ('string' == typeof t) return t
        throw (
          (this.core.logger.error(
            'V2NIMLoginService::excute loginExtensionProvider complete but got Unexpected value:',
            t
          ),
          new he({
            code: de.V2NIM_ERROR_CODE_CALLBACK_FAILED,
            detail: {
              reason:
                'Excute loginExtensionProvider complete but got Unexpected value',
              rawData: t,
            },
          }))
        )
      } catch (e) {
        var i = e,
          r = i
        if (
          (i.code !== de.V2NIM_ERROR_CODE_CALLBACK_FAILED &&
            (this.core.logger.error(
              'V2NIMLoginService::excute loginExtensionProvider error:',
              i
            ),
            (r = new he({
              code: de.V2NIM_ERROR_CODE_CALLBACK_FAILED,
              detail: {
                reason: 'Excute loginExtensionProvider error',
                rawError: e,
              },
            }))),
          2 === this.auth.loginOption.authType)
        )
          throw (this.processLoginFailed(i), r)
        return ''
      }
    })
  }
  processLoginFailed(e) {
    this.auth.clientSocket.doDisconnect(xt.ACTIVE, e),
      this.checkLoginTerminalCode(e.code) &&
        (this.auth.authenticator.reset(),
        this.auth.authenticator.clearLastLoginClient()),
      this.auth.lifeCycle.processEvent('loginFail', e)
  }
  changeLoginClient(e, t) {
    var i = t.map((e) => Ct(e))
    if (1 === e)
      (this.loginClients = i),
        this.auth.emit('onLoginClientChanged', e, this.loginClients)
    else if (2 === e) {
      var r = i.filter((e) => {
        var t = this.loginClients.filter((t) => t.clientId === e.clientId)
        return this.loginClients.push(e), 0 === t.length
      })
      r.length > 0 && this.auth.emit('onLoginClientChanged', e, r)
    } else if (3 === e) {
      var s = i.filter(
        (e) => (
          (function (e, t) {
            t = t || (() => !0)
            for (var i = [], r = (e = e || []).length, s = 0, n = 0; n < r; n++)
              t(e[n - s]) && (i.push(e.splice(n - s, 1)[0]), (s += 1))
          })(
            this.loginClients,
            (t) => t.clientId === e.clientId && t.consid === e.consid
          ),
          0 ===
            this.loginClients.filter((t) => t.clientId === e.clientId).length
        )
      )
      s.length > 0 && this.auth.emit('onLoginClientChanged', e, s)
    }
  }
  checkAutoLogin(e) {
    if (e) return !1
    var t = Ae.localStorage.getItem(this.lastLoginClientKey)
    if (!t) return !1
    var i = '',
      r = ''
    try {
      var s = JSON.parse(t)
      ;(i = Ve(s, 'clientId')), (r = Ve(s, 'account'))
    } catch (e) {
      return !1
    }
    return i === this.auth.deviceId && r === this.auth.account
  }
  checkLoginTerminalCode(e) {
    return [
      de.V2NIM_ERROR_CODE_CANCELLED,
      de.V2NIM_ERROR_CODE_TIMEOUT,
      de.V2NIM_ERROR_CODE_HANDSHAKE,
      302,
      317,
      de.V2NIM_ERROR_CODE_FORBIDDEN,
      de.V2NIM_ERROR_CODE_NOT_FOUND,
      de.V2NIM_ERROR_CODE_PARAMETER_ERROR,
      de.V2NIM_ERROR_CODE_MULTI_LOGIN_FORBIDDEN,
      422,
      de.V2NIM_ERROR_CODE_IM_DISABLED,
      de.V2NIM_ERROR_CODE_APPKEY_NOT_EXIST,
      de.V2NIM_ERROR_CODE_BUNDLEID_CHECK_FAILED,
      de.V2NIM_ERROR_CODE_APPKEY_BLOCKED,
      de.V2NIM_ERROR_CODE_INVALID_TOKEN,
      de.V2NIM_ERROR_CODE_ROBOT_NOT_ALLOWED,
      de.V2NIM_ERROR_CODE_ACCOUNT_NOT_EXIST,
      de.V2NIM_ERROR_CODE_ACCOUNT_BANNED,
      de.V2NIM_ERROR_CODE_USER_PROFILE_NOT_EXIST,
    ].includes(e)
  }
  reset() {
    ;(this.loginClients = []), (this.loginClientOfThisConnection = {})
  }
  clearLastLoginClient() {
    Ae.localStorage.removeItem(this.lastLoginClientKey)
  }
}
class ni extends ne {
  constructor(e, t) {
    super(), (this.name = e), (this.logger = t.logger), (this.core = t)
  }
  checkV2() {
    var e = this.core.options.apiVersion
    if ('v2' === e) return !0
    throw new he({
      code: de.V2NIM_ERROR_CODE_MISUSE,
      detail: { reason: `The version "${e}" of client is not supported.` },
    })
  }
  checkLogin() {
    if (0 === this.core.V2NIMLoginService.getLoginStatus())
      throw new he({
        code: de.V2NIM_ERROR_CODE_ILLEGAL_STATE,
        detail: { reason: 'Client logout.' },
      })
  }
  emit(e, ...t) {
    this.logger.debug(
      `${this.name}::emit event: '${e.toString()}',`,
      void 0 !== t[0] ? t[0] : '',
      void 0 !== t[1] ? t[1] : '',
      void 0 !== t[2] ? t[2] : ''
    )
    try {
      return super.emit(e, ...t)
    } catch (t) {
      return (
        setTimeout(() => {
          throw (
            (this.logger.error(
              `${
                this.name
              }::emit throw error in setTimeout. event: ${e.toString()}. Error`,
              t
            ),
            t)
          )
        }, 0),
        !1
      )
    }
  }
  process(e) {
    var t = this[e.cmd + 'Handler'],
      i = this.handler && this.handler[e.cmd + 'Handler']
    if ('function' == typeof t || 'function' == typeof i) {
      if (e.error)
        return (
          this.logger.error(`${e.cmd}::recvError`, e.error),
          Promise.reject(e.error)
        )
      try {
        var r = t ? t.call(this, e) : i.call(this.handler, e)
        return Promise.resolve(r)
      } catch (e) {
        return Promise.reject(e)
      }
    }
    var s = Ve(e, 'error.detail.ignore')
    return e.error && !s ? Promise.reject(e.error) : Promise.resolve(e)
  }
}
class oi {
  constructor(e) {
    ;(this.name = 'V2NIMLoginLifeCycle'),
      (this.loginStatus = 0),
      (this.connectStatus = 0),
      (this.core = e),
      (this.auth = e.V2NIMLoginService),
      (this.logger = e.logger)
  }
  processEvent(e, t, i) {
    var r = this.getConnectStatus()
    switch (e) {
      case 'addressing':
        this.logger.log(`${this.name}::addressing`),
          this.setLoginStatus(2),
          this.setConnectStatus(2)
        break
      case 'connect':
        this.logger.log(`${this.name}::connecting`),
          this.setLoginStatus(2),
          this.setConnectStatus(2)
        break
      case 'connectSucc':
        this.logger.log(`${this.name}::connect success`),
          this.setLoginStatus(2),
          this.setConnectStatus(1)
        break
      case 'connectFail':
        this.logger.log(`${this.name}::connect fail`, t),
          this.setLoginStatus(3),
          this.setConnectStatus(0, t)
        break
      case 'connectionBroken':
        this.logger.log(`${this.name}::connectionBroken:`, t),
          this.setLoginStatus(3),
          this.setConnectStatus(0, t),
          this.core.eventBus.emit(
            'V2NIMLoginService/loginLifeCycleDisconnected',
            t
          )
        break
      case 'loginSucc':
        this.logger.log(
          `${this.name}::login success, verify authentication success`
        ),
          this.setLoginStatus(1),
          this.core.eventBus.emit(
            'V2NIMLoginService/loginLifeCycleLoginSucc',
            i
          )
        break
      case 'loginFail':
        if (
          (this.logger.log(
            `${this.name}::login fail due to verify authentication failed:`,
            t
          ),
          !t)
        )
          return
        this.setLoginStatus(
          this.auth.authenticator.checkLoginTerminalCode(t.code) ? 0 : 3
        ),
          this.setConnectStatus(0, t),
          this.auth.emit('onLoginFailed', t)
        break
      case 'logout':
        this.logger.log(`${this.name}::logout`),
          this.setLoginStatus(0),
          this.setConnectStatus(0),
          this.core.eventBus.emit('V2NIMLoginService/loginLifeCycleLogout')
        break
      case 'kicked':
        this.logger.log(`${this.name}::kicked`, i),
          this.setLoginStatus(0),
          this.setConnectStatus(0, t),
          this.core.eventBus.emit('V2NIMLoginService/loginLifeCycleKicked')
        break
      case 'exited':
        this.logger.log(`${this.name}::exited`, t),
          this.setLoginStatus(0),
          this.setConnectStatus(0, t)
        break
      case 'waiting':
        this.logger.log(`${this.name}::waiting to reconnect`),
          this.setLoginStatus(3),
          this.setConnectStatus(3),
          2 !== r && this.auth.reconnect.attempToReLogin()
    }
  }
  getConnectStatus() {
    return this.connectStatus
  }
  getLoginStatus() {
    return this.loginStatus
  }
  setLoginStatus(e) {
    e !== this.loginStatus &&
      ((this.loginStatus = e), this.auth.emit('onLoginStatus', e))
  }
  setConnectStatus(e, t) {
    if (e !== this.connectStatus) {
      var i = this.connectStatus
      ;(this.connectStatus = e),
        this.auth.emit('onConnectStatus', e),
        this.delegateConnectEvent(i, e, t)
    }
  }
  delegateConnectEvent(e, t, i) {
    1 === e && 0 === t && i && this.auth.emit('onDisconnected', i),
      2 === e && 0 === t && i && this.auth.emit('onConnectFailed', i)
  }
}
class ai {
  constructor(e) {
    ;(this.core = e), (this.auth = e.V2NIMLoginService), (this.datas = [])
  }
  switchDataSync(e) {
    return Te(this, void 0, void 0, function* () {
      var { type: t, state: i, error: r, subType: s } = e,
        n = this.datas.filter((e) => e.type === t && e.subType === s)
      n.length > 0
        ? ((n[0].state = i), (n[0].error = r))
        : this.datas.push({ type: t, state: i, subType: s })
      var o = this.datas.every((e) => 3 === e.state)
      1 === t &&
        (2 === i && 'mainSync' === s
          ? (this.core.eventBus.emit('V2NIMLoginService/syncing'),
            this.auth.emit('onDataSync', t, i))
          : 3 === i &&
            o &&
            (this.core.eventBus.emit('V2NIMLoginService/syncDone', r),
            this.auth.emit('onDataSync', t, i, r)))
    })
  }
  checkSyncing() {
    return this.datas.some((e) => 'mainSync' === e.subType && 2 === e.state)
  }
  reset() {
    this.datas = []
  }
}
var ci = {
    '6_3': 'notifylog',
    '6_4': 'uploadLog',
    '6_23': 'getServerTime',
    '6_31': 'notifyDetect',
    '6_32': 'uploadDetect',
    '6_37': 'wsDetect',
  },
  di = {
    type: 1,
    params: 2,
    result: 3,
    t1: 100,
    t2: 101,
    t3: 102,
    t4: 103,
    t5: 104,
    t6: 105,
  },
  li = {
    k1: 1,
    k2: 2,
    k3: 3,
    k4: 4,
    k5: 5,
    k6: 6,
    k7: 7,
    k8: 8,
    k9: 9,
    k10: 10,
  },
  pi = {
    notifylog: { sid: 6, cid: 3, service: 'misc' },
    uploadLog: {
      sid: 6,
      cid: 4,
      service: 'misc',
      hasPacketResponse: !1,
      params: [
        { type: 'String', name: 'url' },
        {
          type: 'Property',
          name: 'data',
          reflectMapper: { type: 1, content: 2 },
        },
      ],
    },
    getServerTime: {
      sid: 6,
      cid: 23,
      service: 'misc',
      response: [{ type: 'Long', name: 'time' }],
    },
    notifyDetect: {
      sid: 6,
      cid: 31,
      service: 'misc',
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(di) }],
    },
    uploadDetect: {
      sid: 6,
      cid: 32,
      service: 'misc',
      hasPacketResponse: !1,
      params: [{ type: 'Property', name: 'data', reflectMapper: di }],
    },
    wsDetect: {
      sid: 6,
      cid: 37,
      service: 'misc',
      params: [{ type: 'Property', name: 'tag', reflectMapper: li }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(li) }],
    },
  },
  hi = {
    type: { type: 'number' },
    t1: { type: 'number' },
    t2: { type: 'number' },
    t3: { type: 'number' },
    t4: { type: 'number' },
    t5: { type: 'number' },
    t6: { type: 'number' },
  }
class ui extends class {
  constructor(e, t) {
    ;(this.name = e),
      (this.core = t),
      (this.name = e),
      (this.logger = t.logger),
      (this.core = t)
  }
  process(e) {
    var t = this[e.cmd + 'Handler']
    if ('function' == typeof t) return t.call(this, e)
    var i = Ve(e, 'error.detail.ignore')
    return e.error && !i ? Promise.reject(e.error) : Promise.resolve(e)
  }
} {
  constructor(e) {
    super('misc', e),
      (this.logLock = !1),
      (this.core = e),
      vt({ cmdMap: ci, cmdConfig: pi }),
      this.setListener()
  }
  setListener() {
    this.core.eventBus.on(
      'BinaryClientSocket/unpackError',
      this.wsDetect.bind(this)
    ),
      this.core.eventBus.on('V2NIMLoginService/loginLifeCycleLoginSucc', () => {
        this.core.timeOrigin.setOriginTimetick()
      }),
      this.core.eventBus.on('logined', () => {
        this.core.timeOrigin.setOriginTimetick()
      })
  }
  getServerTime() {
    return Te(this, void 0, void 0, function* () {
      var e = yield this.core.clientSocket.sendCmd('getServerTime')
      return parseInt(e.content.time)
    })
  }
  wsDetect(e) {
    return Te(this, void 0, void 0, function* () {
      var t = Object.assign({ k1: 'val1', k2: 'val2' }, e),
        i = null
      try {
        i = (yield this.core.clientSocket.sendCmd('wsDetect', { tag: t }))
          .content.data
      } catch (e) {
        var r = e
        return void (r.code === de.V2NIM_ERROR_CODE_UNPACK_ERROR
          ? (this.logger.warn('misc::wsDetect:998'),
            this.wsDetectUnreliable(),
            this.reportBinarySocketDetectResult('packet 998'))
          : this.logger.warn(`misc::wsDetect:failed ${r.code}`))
      }
      i && JSON.stringify(i) !== JSON.stringify(t)
        ? (this.logger.warn('misc::wsDetect:content unreliable'),
          this.wsDetectUnreliable(),
          this.reportBinarySocketDetectResult('content unreliable'))
        : this.logger.log('misc::wsDetect:success')
    })
  }
  wsDetectUnreliable() {
    this.core.clientSocket.doDisconnect(3, 'WSDetectUnreliable')
  }
  reportBinarySocketDetectResult(e) {
    var t
    this.core.reporter.reportTraceStart('exceptions', {
      user_id: this.core.account,
      trace_id:
        null === (t = this.core.clientSocket.socket) || void 0 === t
          ? void 0
          : t.sessionId,
      start_time: Date.now(),
      action: 2,
      exception_service: 9,
    }),
      this.core.reporter.reportTraceUpdateV2('exceptions', {
        code: 998,
        description: `wsDetect::reconnect cause: ${e}`,
        operation_type: '5',
        target: '6-37',
      }),
      this.core.reporter.reportTraceEnd('exceptions', 1)
  }
  notifyDetectHandler(e) {
    return Te(this, void 0, void 0, function* () {
      var t = (function (e) {
        return Et(hi, e)
      })(e.content.data)
      ;(t.t3 = e.__receiveTimeNode.time), (t.t4 = Date.now())
      try {
        yield this.core.clientSocket.sendCmd('uploadDetect', { data: t })
      } catch (e) {
        this.core.logger.warn('misc::notifyDetectHandler:upload failed', e)
      }
    })
  }
  notifylogHandler() {
    return Te(this, void 0, void 0, function* () {
      var e = void 0
      if (this.logLock) this.core.logger.warn('misc::notifylogHandler:locked')
      else {
        this.logLock = !0
        try {
          e = yield this.core.logger.extractLogs()
        } catch (e) {
          return void (this.logLock = !1)
        }
        if (e) {
          var t = ''
          try {
            t = (yield this.core.cloudStorage.uploadFile(
              'string' == typeof e
                ? { type: 'file', filePath: e }
                : { type: 'file', file: e }
            )).url
          } catch (e) {
            return void (this.logLock = !1)
          }
          if (t) {
            t +=
              (t.indexOf('?') > 0 ? '&' : '?') +
              'download=' +
              new Date().getTime() +
              '_web.log'
            try {
              yield this.core.clientSocket.sendCmd('uploadLog', { url: t })
            } catch (e) {
              return void (this.logLock = !1)
            }
            try {
              yield this.logger.afterUpload()
            } catch (e) {}
            this.logLock = !1
          } else this.logLock = !1
        } else this.logLock = !1
      }
    })
  }
}
function mi(e, t) {
  e = e || {}
  var i = {}
  return (
    (t = t || []).forEach((t) => {
      void 0 !== e[t] && (i[t] = e[t])
    }),
    i
  )
}
var gi = {
    retryCount: { type: 'number', min: 0, required: !1 },
    forceMode: { type: 'boolean', required: !1 },
    authType: { type: 'enum', values: [0, 1, 2], required: !1 },
    syncLevel: { type: 'enum', values: [1, 0], required: !1 },
    routeConfig: {
      type: 'object',
      required: !1,
      rules: {
        routeEnabled: { type: 'boolean', required: !1 },
        routeEnvironment: { type: 'string', required: !1 },
      },
    },
  },
  vi = ['https://lbs.netease.im/lbs/webconf.jsp'],
  fi = {
    retryCount: 3,
    timeout: 6e4,
    forceMode: !1,
    authType: 0,
    syncLevel: 0,
  },
  yi = { '27_1': 'v2NIMSync', '27_10': 'v2QChatSync' },
  Ii = {
    v2NIMSync: {
      sid: 27,
      cid: 1,
      service: 'V2NIMSyncService',
      hasPacketTimer: !1,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: {
            myInfo: 1,
            offlineMsgs: 2,
            teams: 3,
            roamingMsgs: 7,
            relations: 9,
            friends: 11,
            friendUsers: 13,
            msgReceipts: 14,
            myTeamMembers: 15,
            donnop: 16,
            recallMsg: 17,
            sessionAck: 18,
            broadcastMsgs: 20,
            avSignal: 21,
            superTeams: 22,
            mySuperTeamMembers: 23,
            superTeamRoamingMsgs: 24,
            deleteSuperTeamMsg: 25,
            superTeamSessionAck: 26,
            deleteSelfMsgs: 27,
            stickTopSessions: 28,
            sessionHistoryMsgsDelete: 29,
            p2pTeamModifyMessage: 30,
            superTeamModifyMessage: 31,
            filterMsgs: 100,
          },
        },
      ],
      response: [{ type: 'Long', name: 'timetag' }],
    },
    v2QChatSync: {
      sid: 27,
      cid: 10,
      service: 'V2NIMSyncService',
      hasPacketTimer: !1,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { systemNotification: 1, pushConfig: 2 },
        },
      ],
      response: [{ type: 'Long', name: 'timetag' }],
    },
  },
  Mi = { debug(...e) {}, log(...e) {}, warn(...e) {}, error(...e) {} }
function _i(e) {
  Mi = e
}
function Ei() {
  return Mi
}
function Ti() {
  return (
    !(!navigator || !navigator.userAgent) &&
    [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ].some((e) => navigator.userAgent.match(e))
  )
}
function Si() {
  return (
    !(!navigator || !navigator.userAgent) &&
    'object' == typeof navigator &&
    'string' == typeof navigator.userAgent &&
    navigator.userAgent.indexOf('Electron') >= 0
  )
}
function Ci() {
  return navigator && navigator.userAgent
}
var Ni = {
  clear() {
    uni.clearStorageSync()
  },
  getItem: (e) => uni.getStorageSync(e),
  setItem: (e, t) => uni.setStorageSync(e, t),
  removeItem: (e) => uni.removeStorageSync(e),
}
class Ai {
  constructor(e = 'nim_logs') {
    ;(this.dirPath = ''),
      (this.filePath = ''),
      (this.copyFilePath = ''),
      (this.enable = !1),
      (this.maxCapacity = 26214400),
      (this.remainCapacity = 8388608),
      (this.count = 0),
      (this.maxCount = 100),
      (this.lastErrorMsg = void 0)
    var t = uni.getSystemInfoSync(),
      i = 'mp-weixin' === t.uniPlatform || 'mp-alipay' === t.uniPlatform
    if (((this.enable = i), i)) {
      var r = this.getAPIEnv()
      r &&
        ((this.dirPath = `${r.env.USER_DATA_PATH}/__nim`),
        (this.filePath = `${this.dirPath}/${e}.log`),
        (this.copyFilePath = `${this.dirPath}/${e}_copy.log`))
    }
  }
  getAPIEnv() {
    if (
      !(
        ('undefined' != typeof tt && tt.getSystemInfoSync) ||
        ('undefined' != typeof swan && swan.getSystemInfoSync)
      )
    )
      return 'undefined' != typeof my && my.getSystemInfoSync
        ? my
        : 'undefined' != typeof wx && wx.getAppBaseInfo
        ? wx
        : void 0
  }
  makeDir() {
    if (this.enable) {
      var e = this.getAPIEnv()
      if (e) {
        var t = Ei(),
          i = e.getFileSystemManager()
        try {
          var r = i.accessSync(this.dirPath)
          t.log('logStorage::access dir:', r),
            ('object' == typeof r && null !== r
              ? r.error || r.errno || r.errCode || r.errNo
              : 0) > 200 && i.mkdirSync(this.dirPath, !0)
        } catch (e) {
          i.mkdirSync(this.dirPath, !0)
        }
        try {
          var s = i.accessSync(this.filePath)
          t.log('logStorage::access file:', s),
            ('object' == typeof s && null !== s
              ? s.error || s.errno || s.errCode || s.errNo
              : 0) > 200 && i.writeFileSync(this.filePath, '===', 'utf8')
        } catch (e) {
          i.writeFileSync(this.filePath, '===', 'utf8')
        }
      }
    }
  }
  open() {
    return Te(this, void 0, void 0, function* () {
      if (this.enable) {
        var e = Ei()
        try {
          this.makeDir(),
            e.log(`logStorage::open log file success:${this.filePath}`)
        } catch (t) {
          e.warn(`logStorage::open log file failed:${this.filePath}`, t)
        }
        yield this.checkCapacity(this.remainCapacity)
      }
    })
  }
  checkCapacity(e) {
    return Te(this, void 0, void 0, function* () {
      if (this.enable) {
        var t = this.getAPIEnv()
        if (t) {
          var i = Ei(),
            r = t.getFileSystemManager(),
            s = this.getSize()
          if (s > this.maxCapacity) {
            i.log(`logStorage::checksize:exceed,${s} byte`)
            var n = ''
            try {
              n = yield this.readLogs(s - e)
            } catch (e) {
              return void i.log('logStorage::checkCapacity:read failed', e)
            }
            i.log(`logStorage::checksize:read success ${s - e} byte`)
            try {
              r.unlinkSync(this.filePath)
            } catch (e) {
              return void i.log('logStorage::checkCapacity:unlink failed', e)
            }
            try {
              r.writeFileSync(this.filePath, n, 'utf8')
            } catch (e) {
              return void i.log('logStorage::checkCapacity:write failed', e)
            }
          } else i.log(`logStorage::checkCapacity:not exceeding,${s} byte`)
        }
      }
    })
  }
  getSize() {
    var e
    if (!this.enable) return 0
    var t = this.getAPIEnv()
    if (!t) return 0
    var i,
      r = Ei(),
      s = t.getFileSystemManager()
    try {
      i = s.statSync(this.filePath, !1)
    } catch (e) {
      return r.warn('logStorage::stat failed', e), 0
    }
    return i.size || (null === (e = i.stats) || void 0 === e ? void 0 : e.size)
  }
  readLogs(e = 0) {
    if (!this.enable) return Promise.resolve('')
    var t = this.getAPIEnv()
    if (!t) return Promise.resolve('')
    var i = Ei(),
      r = t.getFileSystemManager()
    return new Promise((t, s) => {
      r.readFile({
        filePath: this.filePath,
        encoding: 'utf8',
        position: e,
        success: (e) => {
          var r = e.data
          'string' == typeof r
            ? (i.warn(`logStorage::readLogs success ${r.length}`), t(r))
            : (i.warn('logStorage::readLogs empty'),
              s(new Error('logStorage::readLogs empty')))
        },
        fail: (e) => {
          var t = e.errMsg || e.errorMessage || e.message
          i.warn(`logStorage::readLogs failed ${t}`)
          var r = { code: e.errCode || 0, message: t }
          s(r)
        },
      })
    })
  }
  close() {}
  addLogs(e) {
    if (!this.enable) return Promise.resolve()
    var t = this.getAPIEnv()
    if (!t) return Promise.resolve()
    var i = Ei(),
      r = e
        .map((e) => e.text)
        .concat('')
        .join('\n')
    try {
      t.getFileSystemManager().appendFileSync(this.filePath, r, 'utf8')
    } catch (e) {
      var s = e.errMsg || e.errorMessage || e.message
      this.lastErrorMsg !== s && i.warn('logStorage::append failed', e),
        (this.lastErrorMsg = s)
    }
    return (
      (this.count += 1),
      this.count > this.maxCount &&
        ((this.count = 0), this.checkCapacity(this.remainCapacity)),
      Promise.resolve()
    )
  }
  extractLogs() {
    return Te(this, void 0, void 0, function* () {
      if (this.enable) {
        var e = this.getAPIEnv()
        if (e) {
          var t = Ei(),
            i = e.getFileSystemManager()
          if (this.getSize() > 0) {
            try {
              i.copyFileSync(this.filePath, this.copyFilePath)
            } catch (e) {
              return void t.warn('logStorage::copyFileSync failed', e)
            }
            return this.copyFilePath
          }
          t.warn('logStorage::extractLogs empty')
        }
      }
    })
  }
  afterUpload() {
    return Te(this, void 0, void 0, function* () {
      if (this.enable) {
        var e = this.getAPIEnv()
        if (e) {
          var t = Ei(),
            i = e.getFileSystemManager()
          try {
            i.unlinkSync(this.copyFilePath)
          } catch (e) {
            return void t.log('logStorage::delete copyFilePath failed', e)
          }
        }
      }
    })
  }
}
var Ri = {
    wifi: 2,
    '2g': 3,
    '3g': 4,
    '4g': 5,
    '5g': 6,
    ethernet: 1,
    unknown: 0,
    none: 0,
    notreachable: 0,
    wwan: 0,
  },
  Oi = {
    __onNetworkStatusChangeFn: null,
    getNetworkStatus() {
      var e = uni.getSystemInfoSync() || {}
      return 'app' === e.uniPlatform && 'harmonyos' === e.osName
        ? Promise.resolve({ net_type: 0, net_connect: !0 })
        : new Promise((e, t) => {
            uni.getNetworkType({
              success: function (t) {
                var i
                ;(i =
                  'boolean' == typeof t.networkAvailable
                    ? t.networkAvailable
                    : 'none' !== t.networkType.toLowerCase()),
                  e({
                    net_type: Ri[t.networkType.toLowerCase()],
                    net_connect: i,
                  })
              },
              fail: function () {
                t(new Error('getNetworkType failed'))
              },
            })
          })
    },
    onNetworkStatusChange(e) {
      this.offNetworkStatusChange(),
        uni.onNetworkStatusChange &&
          ((this.__onNetworkStatusChangeFn = function (t) {
            var i = t.networkType.toLowerCase()
            e({
              isConnected: t.isConnected || 'none' !== i,
              networkType: Ri[i],
            })
          }),
          uni.onNetworkStatusChange(this.__onNetworkStatusChangeFn))
    },
    offNetworkStatusChange() {
      uni.offNetworkStatusChange &&
        (this.__onNetworkStatusChangeFn &&
          uni.offNetworkStatusChange(this.__onNetworkStatusChangeFn),
        (this.__onNetworkStatusChangeFn = null))
    },
  }
function bi(e, t) {
  return (
    t && (t.data = t.data || (null == t ? void 0 : t.params) || {}),
    new Promise((i, r) => {
      uni.request(
        Object.assign(Object.assign({ method: 'GET', url: e }, t), {
          success: function (t) {
            'number' == typeof (t = t || {}).statusCode &&
            t.statusCode.toString().startsWith('2')
              ? ((t = {
                  data: t.data,
                  status: t.statusCode,
                  errMsg: t.errMsg,
                  header: t.header,
                }),
                i(t))
              : r({
                  code: t.statusCode || 0,
                  message: t.data || `uniApp request fail. url: ${e}`,
                })
          },
          fail: function (t) {
            var i = `uniApp request fail. url: ${e}`
            r(
              t
                ? { code: t.errCode || 0, message: t.errMsg || i }
                : { code: 0, message: i }
            )
          },
        })
      )
    })
  )
}
var ki = function () {
    var e = uni.getSystemInfoSync() || {}
    if (
      'mp-weixin' === e.uniPlatform &&
      'undefined' != typeof wx &&
      wx.getAppBaseInfo
    ) {
      var t = wx.getAppBaseInfo()
      return `NIM/Web/UNIAPP(${e.uniRuntimeVersion})/WeChatMiniApp(${t.SDKVersion})/V10.9.30/{{appkey}}`
    }
    if ('undefined' != typeof tt && tt.getSystemInfoSync) {
      var i = tt.getSystemInfoSync()
      return `NIM/Web/UNIAPP(${e.uniRuntimeVersion})/TiktokMiniApp(${i.SDKVersion})/V10.9.30/{{appkey}}`
    }
    if ('undefined' != typeof swan && swan.getSystemInfoSync) {
      var r = swan.getSystemInfoSync()
      return `NIM/Web/UNIAPP(${e.uniRuntimeVersion})/BaiduMiniApp(${r.SDKVersion})/V10.9.30/{{appkey}}`
    }
    if ('undefined' != typeof my && my.getSystemInfoSync) {
      var s = my.getSystemInfoSync()
      return `NIM/Web/UNIAPP(${e.uniRuntimeVersion})/AliMiniApp(${s.SDKVersion})/V10.9.30/{{appkey}}`
    }
    if (navigator && navigator.userAgent) return navigator.userAgent
    if (e.ua) return e.ua
    var n = uni.getSystemInfoSync()
    return `NIM/Web/UNIAPP(${n.uniRuntimeVersion})/${n.osName}(${n.osVersion})/V10.9.30/{{appkey}}`
  },
  Vi = function () {
    var e = uni.getSystemInfoSync() || {}
    if (
      'mp-weixin' === e.uniPlatform &&
      'undefined' != typeof wx &&
      wx.getAppBaseInfo
    ) {
      var t = wx.getAppBaseInfo()
      return `${e.uniRuntimeVersion}/${t.version}`
    }
    if ('undefined' != typeof tt && tt.getSystemInfoSync) {
      var i = tt.getSystemInfoSync()
      return `${e.uniRuntimeVersion}/${i.version}`
    }
    if ('undefined' != typeof swan && swan.getSystemInfoSync) {
      var r = swan.getSystemInfoSync()
      return `${e.uniRuntimeVersion}/${r.version}`
    }
    if ('undefined' != typeof my && my.getSystemInfoSync) {
      var s = my.getSystemInfoSync()
      return `${e.uniRuntimeVersion}/${s.version}`
    }
    return `${e.uniRuntimeVersion}`
  },
  Pi = function () {
    var e = uni.getSystemInfoSync() || {}
    if (
      'mp-weixin' === e.uniPlatform &&
      'undefined' != typeof wx &&
      wx.getAppBaseInfo
    ) {
      var t = wx.getAppBaseInfo()
      return `${e.uniRuntimeVersion}/${t.SDKVersion}`
    }
    if ('undefined' != typeof tt && tt.getSystemInfoSync) {
      var i = tt.getSystemInfoSync()
      return `${e.uniRuntimeVersion}/${i.SDKVersion}`
    }
    if ('undefined' != typeof swan && swan.getSystemInfoSync) {
      var r = swan.getSystemInfoSync()
      return `${e.uniRuntimeVersion}/${r.SDKVersion}`
    }
    return 'undefined' != typeof my && my.getSystemInfoSync
      ? (my.getSystemInfoSync(), `${e.uniRuntimeVersion}/${my.SDKVersion}`)
      : `${e.uniRuntimeVersion}`
  }
function Li() {
  var e = (function () {
      var e = uni.getSystemInfoSync() || {}
      return 'mp-weixin' === e.uniPlatform
        ? [6, 'WeiXin']
        : 'app' === e.uniPlatform
        ? [101, 'H5']
        : 'undefined' != typeof tt && tt.getSystemInfoSync
        ? [104, 'Tiktok']
        : 'undefined' != typeof swan && swan.getSystemInfoSync
        ? [103, 'Baidu']
        : 'undefined' != typeof my && my.getSystemInfoSync
        ? [102, 'Ali']
        : [
            Si() ? 5 : Ti() ? 101 : Ci() ? 100 : 0,
            Si() ? 'Electron' : Ti() ? 'H5' : Ci() ? 'BROWSER' : 'Unset',
          ]
    })(),
    t = uni.getSystemInfoSync() || {}
  return {
    os: t.osName || 'UNIAPP_UNKNOW',
    osVer: t.osVersion,
    browser: t.browserName || '',
    browserVer: t.browserVersion || '',
    libEnv: 'UNIAPP',
    hostEnv: e[1],
    hostEnvEnum: e[0],
    hostEnvVer: Vi(),
    userAgent: ki(),
    model: Pi(),
    manufactor: e[1],
    pushDeviceInfo: {
      PRODUCT: t.model,
      DEVICE: t.model,
      MANUFACTURER: t.brand,
    },
  }
}
function Di(e) {
  var t = Ei(),
    i = e.headers || {}
  return (
    e.md5 && (i['Content-MD5'] = e.md5),
    new Promise((r, s) => {
      var n = uni.uploadFile(
        Object.assign(
          Object.assign(
            { url: `${e.commonUploadHost}/${e.nosToken.bucket}` },
            Object.keys(i).length > 0 ? { header: i } : {}
          ),
          {
            formData: {
              Object: decodeURIComponent(e.nosToken.objectName),
              'x-nos-token': e.nosToken.token,
              'x-nos-entity-type': 'json',
            },
            name: 'file',
            fileType: e.type,
            filePath: e.filePath,
            success(t) {
              if (200 == t.statusCode)
                try {
                  var i
                  try {
                    i = JSON.parse(t.data)
                  } catch (e) {
                    i = {}
                  }
                  ;(i.name = e.filePath),
                    (i.ext =
                      i.name.lastIndexOf('.') > -1
                        ? i.name
                            .slice(i.name.lastIndexOf('.') + 1)
                            .toLowerCase()
                        : ''),
                    r(i)
                } catch (e) {
                  s(new Error(`Upload Error parse result error: ${t.data}`))
                }
              else s(new Error(`Upload error ${t.statusCode}: ${t.errMsg}`))
            },
            fail(e) {
              'uploadFile:fail abort' === e.errMsg &&
                (e.code = de.V2NIM_ERROR_CODE_CANCELLED),
                (e.message = e.errMsg),
                s(e)
            },
          }
        )
      )
      try {
        e.onUploadStart && e.onUploadStart(n)
      } catch (e) {
        t.error(
          'Adapter uploadFile: options.onUploadStart error',
          e && e.message
        ),
          n.abort(),
          s(e)
      }
      e.onUploadProgress &&
        n.onProgressUpdate(function (t) {
          e.onUploadProgress &&
            e.onUploadProgress({
              total: t.totalBytesExpectedToSend,
              loaded: t.totalBytesSent,
              percentage: parseFloat(
                (t.totalBytesSent / t.totalBytesExpectedToSend).toFixed(2)
              ),
              percentageText: t.progress + '%',
            })
        })
    })
  )
}
function wi(e) {
  return null
}
class Ui {
  constructor(e, t = '') {
    if (
      ((this.CONNECTING = 0),
      (this.OPEN = 1),
      (this.CLOSING = 2),
      (this.CLOSED = 3),
      (this.binaryType = ''),
      (this.onclose = function (e) {
        Ei().log('Adapter uniapp: sockets on close ', e)
      }),
      (this.onerror = function (e) {
        Ei().error('Adapter uniapp: sockets error ', e)
      }),
      (this.onmessage = function (e) {}),
      (this.onopen = function () {}),
      !e)
    )
      throw new Error("Failed to construct 'socket': url required")
    ;(this.url = e.replace(/:443(\/|$)/, '$1')),
      (this.protocol = t),
      (this.readyState = this.CONNECTING)
    var i = this.protocol ? { protocols: this.protocol } : {}
    ;(this.socketTask = uni.connectSocket(
      Object.assign(Object.assign({ url: this.url }, i), {
        multiple: !0,
        fail: (e) => {
          this.errorHandler(e)
        },
      })
    )),
      this.socketTask.onOpen((e) => {
        Ei().log('Adapter uniapp:: onOpen. event: ', e),
          (this.readyState = this.OPEN),
          this.binaryType
            ? this.onopen()
            : this.onmessage && this.onmessage({ type: 'open', header: e })
      }),
      this.socketTask.onError((e) => {
        Ei().log('Adapter uniapp:: onError. event: ', e), this.errorHandler(e)
      }),
      this.socketTask.onClose((e) => {
        ;(this.readyState = this.CLOSED),
          'function' == typeof this.onclose &&
            (this.onclose && this.onclose(e),
            Ei().log('Adapter uniapp:: onClose. event: ', e)),
          (this.socketTask = null)
      }),
      this.socketTask.onMessage((e) => {
        var t
        ;(t =
          'string' == typeof e.data || e.data instanceof ArrayBuffer
            ? e.data
            : e.data.isBuffer && 'string' == typeof e.data.data
            ? (function (e) {
                for (
                  var t = (function (e) {
                      var t = String(e).replace(/[=]+$/, '')
                      if (t.length % 4 == 1)
                        throw new Error(
                          "'atob' failed: The string to be decoded is not correctly encoded."
                        )
                      for (
                        var i, r = '', s = 0, n = 0, o = 0;
                        (i = t.charAt(o++));
                        ~i && ((n = s % 4 ? 64 * n + i : i), s++ % 4)
                          ? (r += String.fromCharCode(
                              255 & (n >> ((-2 * s) & 6))
                            ))
                          : 0
                      )
                        i =
                          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='.indexOf(
                            i
                          )
                      return r
                    })(e),
                    i = t.length,
                    r = new Uint8Array(i),
                    s = 0;
                  s < i;
                  s++
                )
                  r[s] = t.charCodeAt(s)
                return r.buffer
              })(e.data.data)
            : e.data.data),
          this.onmessage && this.onmessage({ data: t })
      })
  }
  close() {
    Ei().log('Adapter uniapp:: close uni socket actively'),
      this.socketTask.close({
        code: 1e3,
        reason: 'user force close websocket',
        complete: () => {
          this.socketTask = null
        },
      })
  }
  send(e) {
    if (this.readyState !== this.OPEN)
      throw new Error(
        `Adapter uniapp:: socket sendMsg when readyState=${this.readyState}`
      )
    if (!('string' == typeof e || e instanceof ArrayBuffer))
      throw new TypeError(
        'Adapter uniapp:: socket sendMsg only String/ArrayBuffer supported'
      )
    this.socketTask.send({ data: e })
  }
  errorHandler(e) {
    Ei().error('Adapter uniapp:: errorHandler. event: ', e),
      (this.readyState = this.CLOSED),
      this.onerror && this.onerror({ type: 'error', message: e && e.errMsg }),
      e.errMsg &&
        '[object Array]' === Object.prototype.toString.call(e.errMsg) &&
        (e.errMsg.indexOf('断裂管道') > 0 ||
          e.errMsg.indexOf('broken pipe') > 0) &&
        this.onclose &&
        this.onclose(e)
  }
}
r(function (e, t) {
  e.exports = (function () {
    class e extends Error {
      constructor(e, t, i, r) {
        super(i),
          (this.source = e),
          (this.code = t),
          (this.desc = i),
          (this.detail = r || {})
      }
    }
    return function (t, i = { dataType: 'json', method: 'GET', timeout: 5e3 }) {
      var r =
          'text' === i.dataType
            ? 'text/plain; charset=UTF-8'
            : 'application/json; charset=UTF-8',
        s =
          'GET' === i.method
            ? (function (e) {
                if (e) {
                  var t = ''
                  return (
                    Object.keys(e).forEach(function (i, r) {
                      ;(t += 0 === r ? '?' : '&'), (t += `${i}=${e[i]}`)
                    }),
                    t
                  )
                }
                return ''
              })(i.params)
            : ''
      return new Promise(function (n, o) {
        if (window.XMLHttpRequest) {
          var a,
            c = new XMLHttpRequest()
          if (
            ((c.onreadystatechange = function () {
              if (4 === c.readyState)
                if (200 === c.status) {
                  try {
                    a = JSON.parse(c.response || '{}')
                  } catch (e) {
                    a = c.response
                  }
                  n({ status: c.status, data: a })
                } else
                  setTimeout(() => {
                    o(
                      new e(
                        1,
                        c.status,
                        `readyState: ${c.readyState}; statusText: ${c.statusText}`
                      )
                    )
                  }, 0)
            }),
            c.open(i.method, `${t}${s}`),
            (c.timeout = i.timeout || 5e3),
            c.setRequestHeader('Content-Type', r),
            i.headers)
          )
            for (var d in i.headers) c.setRequestHeader(d, i.headers[d])
          ;(c.ontimeout = function (t) {
            o(new e(1, 408, t && t.message ? t.message : 'request timeout'))
          }),
            c.send(JSON.stringify(i.data))
        } else o(new e(2, 10400, 'request no suppout'))
      })
    }
  })()
}),
  r(function (e, t) {
    self,
      (e.exports = (function () {
        var e = {
            d: function (t, i) {
              for (var r in i)
                e.o(i, r) &&
                  !e.o(t, r) &&
                  Object.defineProperty(t, r, { enumerable: !0, get: i[r] })
            },
            o: function (e, t) {
              return Object.prototype.hasOwnProperty.call(e, t)
            },
          },
          t = {}
        e.d(t, {
          default: function () {
            return I
          },
        })
        var i = function e(t) {
          for (var i in ((function (e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function')
          })(this, e),
          (this.directUploadAddr = 'https://wanproxy-web.127.net'),
          (this.retryCount = 4),
          (this.trunkSize = 4194304),
          (this.trunkUploadTimeout = 5e4),
          (this.getOffsetTimeout = 1e4),
          (this.version = '1.0'),
          (this.enableCache = !0),
          (this.logger = console),
          (this.onError = function (e) {}),
          (this.onProgress = function (e) {}),
          (this.onUploadProgress = function (e) {}),
          (this.onComplete = function (e) {}),
          t))
            this[i] = t[i]
        }
        function r(e, t) {
          var i =
            ('undefined' != typeof Symbol && e[Symbol.iterator]) ||
            e['@@iterator']
          if (!i) {
            if (
              Array.isArray(e) ||
              (i = (function (e, t) {
                if (e) {
                  if ('string' == typeof e) return s(e, t)
                  var i = Object.prototype.toString.call(e).slice(8, -1)
                  return (
                    'Object' === i && e.constructor && (i = e.constructor.name),
                    'Map' === i || 'Set' === i
                      ? Array.from(e)
                      : 'Arguments' === i ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)
                      ? s(e, t)
                      : void 0
                  )
                }
              })(e)) ||
              (t && e && 'number' == typeof e.length)
            ) {
              i && (e = i)
              var r = 0,
                n = function () {}
              return {
                s: n,
                n: function () {
                  return r >= e.length
                    ? { done: !0 }
                    : { done: !1, value: e[r++] }
                },
                e: function (e) {
                  throw e
                },
                f: n,
              }
            }
            throw new TypeError(
              'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
            )
          }
          var o,
            a = !0,
            c = !1
          return {
            s: function () {
              i = i.call(e)
            },
            n: function () {
              var e = i.next()
              return (a = e.done), e
            },
            e: function (e) {
              ;(c = !0), (o = e)
            },
            f: function () {
              try {
                a || null == i.return || i.return()
              } finally {
                if (c) throw o
              }
            },
          }
        }
        function s(e, t) {
          ;(null == t || t > e.length) && (t = e.length)
          for (var i = 0, r = new Array(t); i < t; i++) r[i] = e[i]
          return r
        }
        var n = {
            privateObj: {},
            setItem: function (e, t) {
              n.privateObj[e] = t
            },
            getItem: function (e) {
              return n.privateObj[e]
            },
            removeItem: function (e) {
              delete n.privateObj[e]
            },
            getKeys: function () {
              return Object.keys(n.privateObj)
            },
          },
          o = {
            getFileKey: function (e) {
              var t = e.size.toString(),
                i = e.lastModified.toString()
              return (
                '_NosUploader_' +
                e.name +
                t.slice(t.length - 5) +
                i.slice(i.length - 5)
              )
            },
            getFileInfo: function (e) {
              var t = n.getItem(e)
              if (!t) return null
              try {
                return JSON.parse(t)
              } catch (e) {
                return null
              }
            },
            initFile: function (e, t, i) {
              o.clearExpiredInfo()
              var r = this.getFileKey(t),
                s = {
                  ctx: void 0 !== e.ctx ? e.ctx : '',
                  bucket: e.bucketName,
                  obj: e.objectName,
                  token: e.token,
                  modifyAt: Date.now(),
                  end: !1,
                }
              return (
                e.payload && (s.payload = e.payload),
                i && n.setItem(r, JSON.stringify(s)),
                r
              )
            },
            setUploadContext: function (e, t, i) {
              var r = this.getFileInfo(e)
              r && ((r.ctx = t), i && n.setItem(e, JSON.stringify(r)))
            },
            setComplete: function (e, t) {
              var i = this.getFileInfo(e)
              i &&
                ((i.modifyAt = Date.now()),
                (i.end = !0),
                t && n.setItem(e, JSON.stringify(i)))
            },
            getUploadContext: function (e) {
              var t = this.getFileInfo(e)
              return t ? t.ctx : ''
            },
            removeFileInfo: function (e) {
              0 === e.indexOf('_NosUploader_') && n.removeItem(e)
            },
            clearExpiredInfo: function () {
              var e,
                t =
                  'function' == typeof n.getKeys ? n.getKeys() : Object.keys(n),
                i = Date.now(),
                s = [],
                a = r(t)
              try {
                for (a.s(); !(e = a.n()).done; ) {
                  var c = e.value
                  if (0 === c.indexOf('_NosUploader_')) {
                    var d = o.getFileInfo(c)
                    null === d || i - d.modifyAt > I.expireTime
                      ? n.removeItem(c)
                      : s.push({ fileInfo: d, key: c })
                  }
                }
              } catch (e) {
                a.e(e)
              } finally {
                a.f()
              }
              if (s.length > I.maxFileCache) {
                var l,
                  p = r(
                    s
                      .sort(function (e, t) {
                        return t.fileInfo.modifyAt - e.fileInfo.modifyAt
                      })
                      .slice(I.maxFileCache)
                  )
                try {
                  for (p.s(); !(l = p.n()).done; ) {
                    var h = l.value
                    0 === h.key.indexOf('_NosUploader_') && n.removeItem(h.key)
                  }
                } catch (e) {
                  p.e(e)
                } finally {
                  p.f()
                }
              }
            },
          },
          a = o
        function c(e) {
          return (c =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
              ? function (e) {
                  return typeof e
                }
              : function (e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype
                    ? 'symbol'
                    : typeof e
                })(e)
        }
        function d(e) {
          var t = 'function' == typeof Map ? new Map() : void 0
          return (d = function (e) {
            if (
              null === e ||
              ((i = e),
              -1 === Function.toString.call(i).indexOf('[native code]'))
            )
              return e
            var i
            if ('function' != typeof e)
              throw new TypeError(
                'Super expression must either be null or a function'
              )
            if (void 0 !== t) {
              if (t.has(e)) return t.get(e)
              t.set(e, r)
            }
            function r() {
              return l(e, arguments, u(this).constructor)
            }
            return (
              (r.prototype = Object.create(e.prototype, {
                constructor: {
                  value: r,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
              h(r, e)
            )
          })(e)
        }
        function l(e, t, i) {
          return (l = p()
            ? Reflect.construct
            : function (e, t, i) {
                var r = [null]
                r.push.apply(r, t)
                var s = new (Function.bind.apply(e, r))()
                return i && h(s, i.prototype), s
              }).apply(null, arguments)
        }
        function p() {
          if ('undefined' == typeof Reflect || !Reflect.construct) return !1
          if (Reflect.construct.sham) return !1
          if ('function' == typeof Proxy) return !0
          try {
            return (
              Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
              ),
              !0
            )
          } catch (e) {
            return !1
          }
        }
        function h(e, t) {
          return (h =
            Object.setPrototypeOf ||
            function (e, t) {
              return (e.__proto__ = t), e
            })(e, t)
        }
        function u(e) {
          return (u = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e)
              })(e)
        }
        var m = (function (e) {
            !(function (e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function'
                )
              ;(e.prototype = Object.create(t && t.prototype, {
                constructor: { value: e, writable: !0, configurable: !0 },
              })),
                t && h(e, t)
            })(s, e)
            var t,
              i,
              r =
                ((t = s),
                (i = p()),
                function () {
                  var e,
                    r = u(t)
                  if (i) {
                    var s = u(this).constructor
                    e = Reflect.construct(r, arguments, s)
                  } else e = r.apply(this, arguments)
                  return (function (e, t) {
                    return !t || ('object' !== c(t) && 'function' != typeof t)
                      ? (function (e) {
                          if (void 0 === e)
                            throw new ReferenceError(
                              "this hasn't been initialised - super() hasn't been called"
                            )
                          return e
                        })(e)
                      : t
                  })(this, e)
                })
            function s(e, t) {
              var i
              return (
                (function (e, t) {
                  if (!(e instanceof t))
                    throw new TypeError('Cannot call a class as a function')
                })(this, s),
                ((i = r.call(this, 'NosUploadError:' + e)).errCode = t),
                (i.errMsg = e),
                i
              )
            }
            return s
          })(d(Error)),
          g = function e(t, i, r) {
            if ('uploading' === t.uploadState) {
              var s = t.config,
                n = t.param,
                o = a.getUploadContext(t.fileKey)
              if (!o) return r(0)
              var c = new XMLHttpRequest(),
                d =
                  s.directUploadAddr +
                  '/'.concat(n.bucketName) +
                  '/'.concat(encodeURIComponent(n.objectName)) +
                  '?uploadContext' +
                  '&context='.concat(o) +
                  '&version='.concat(s.version)
              ;(c.onreadystatechange = function () {
                var n
                if ('abort' !== t.uploadState && 4 === c.readyState) {
                  var o
                  try {
                    o = JSON.parse(c.responseText)
                  } catch (e) {
                    o = {
                      errMsg:
                        'JsonParseError in getOffset. xhr.status = ' +
                        c.status +
                        '. xhr.responseText: ' +
                        c.responseText,
                      errCode: 500,
                    }
                  }
                  200 === c.status
                    ? o.errCode
                      ? t.config.onError(new m(o.errMsg, o.errCode))
                      : r(o.offset)
                    : c.status.toString().match(/^5/)
                    ? e(t, i - 1, r)
                    : i > 0
                    ? ('function' ==
                        typeof (null === (n = s.logger) || void 0 === n
                          ? void 0
                          : n.error) &&
                        s.logger.error(
                          'getOffset('
                            .concat(d, ') error. retry after 3 seconds. ')
                            .concat(new Date().toTimeString())
                        ),
                      setTimeout(function () {
                        e(t, i - 1, r)
                      }, 3500))
                    : c.status
                    ? (a.removeFileInfo(t.fileKey),
                      s.onError(
                        new m(
                          'getOffset('
                            .concat(d, ') error: ')
                            .concat(c.status, ' ')
                            .concat(c.statusText)
                        )
                      ))
                    : s.onError(
                        new m('getOffset('.concat(d, ') error. no Error Code'))
                      )
                }
              }),
                c.open('get', d),
                c.setRequestHeader('x-nos-token', n.token),
                (c.timeout = s.getOffsetTimeout),
                c.send()
            }
          },
          v = function e(t, i, r, s) {
            if ('uploading' === t.uploadState) {
              var n = t.param,
                o = t.config,
                c = File.prototype.slice,
                d = void 0 !== n.ctx ? n.ctx : '',
                l = i + o.trunkSize >= t.file.size,
                p = l ? t.file.size : i + o.trunkSize,
                h = new XMLHttpRequest(),
                u =
                  o.directUploadAddr +
                  '/'.concat(n.bucketName) +
                  '/'.concat(encodeURIComponent(n.objectName))
              if (
                ((h.upload.onprogress = function (e) {
                  if ('abort' !== t.uploadState) {
                    var r = 0
                    e.lengthComputable
                      ? ((r = (i + e.loaded) / t.file.size),
                        o.onProgress(r),
                        o.onUploadProgress({
                          loaded: e.loaded,
                          total: t.file.size,
                          percentage: r,
                          percentageText: (100 * r).toFixed(2) + '%',
                        }))
                      : o.onError(
                          new m(
                            'browser does not support query upload progress'
                          )
                        )
                  }
                }),
                (h.onreadystatechange = function () {
                  var n, c
                  if ('abort' !== t.uploadState && 4 === h.readyState) {
                    var d
                    try {
                      d = JSON.parse(h.responseText)
                    } catch (e) {
                      'function' ==
                        typeof (null === (n = o.logger) || void 0 === n
                          ? void 0
                          : n.error) &&
                        o.logger.error(
                          'JsonParseError in uploadTrunk. xhr.status = ' +
                            h.status +
                            '. xhr.responseText: ' +
                            h.responseText,
                          e
                        ),
                        (d = {
                          errMsg:
                            'JsonParseError in uploadTrunk. xhr.status = ' +
                            h.status +
                            '. xhr.responseText: ' +
                            h.responseText,
                        })
                    }
                    200 === h.status
                      ? (t.setContext(d.context),
                        l
                          ? (s(), t.setComplete())
                          : e(t, d.offset, o.retryCount, s))
                      : h.status.toString().match(/^5/)
                      ? r > 0
                        ? e(t, i, r - 1, s)
                        : (a.removeFileInfo(t.fileKey),
                          o.onError(new m(d.errMsg, d.errCode)))
                      : r > 0
                      ? ('function' ==
                          typeof (null === (c = o.logger) || void 0 === c
                            ? void 0
                            : c.error) &&
                          o.logger.error(
                            'uploadTrunk('
                              .concat(u, ') error. retry after 3 seconds. ')
                              .concat(new Date().toTimeString())
                          ),
                        setTimeout(function () {
                          e(t, i, r - 1, s)
                        }, 3500))
                      : h.status
                      ? (a.removeFileInfo(t.fileKey),
                        o.onError(
                          new m(
                            'uploadTrunk('
                              .concat(u, ') error: ')
                              .concat(h.status, ' ')
                              .concat(h.statusText)
                          )
                        ))
                      : o.onError(
                          new m(
                            'uploadTrunk('.concat(
                              u,
                              ') error. no Error Code. Please check your network'
                            )
                          )
                        )
                  }
                }),
                h.open(
                  'post',
                  u +
                    '?offset='.concat(i) +
                    '&complete='.concat(l) +
                    '&context='.concat(d) +
                    '&version='.concat(o.version)
                ),
                h.setRequestHeader('x-nos-token', n.token),
                n.md5 && h.setRequestHeader('content-md5', n.md5),
                t.file.type && h.setRequestHeader('content-type', t.file.type),
                (h.timeout = o.trunkUploadTimeout),
                'undefined' != typeof FileReader)
              ) {
                var g = new FileReader()
                g.addEventListener('load', function (e) {
                  var t
                  ;(null === (t = null == e ? void 0 : e.target) || void 0 === t
                    ? void 0
                    : t.result) instanceof ArrayBuffer &&
                  e.target.result.byteLength > 0
                    ? h.send(e.target.result)
                    : o.onError(new m('Read ArrayBuffer failed', 194003))
                }),
                  g.addEventListener('error', function (e) {
                    var t = e.target.error
                    o.onError(
                      new m(
                        'Read ArrayBuffer error. '.concat(t.toString()),
                        194003
                      )
                    )
                  }),
                  g.readAsArrayBuffer(c.call(t.file, i, p))
              } else h.send(c.call(t.file, i, p))
            }
          },
          f = (function () {
            function e(t, i, r) {
              !(function (e, t) {
                if (!(e instanceof t))
                  throw new TypeError('Cannot call a class as a function')
              })(this, e),
                (this.uploadState = 'paused'),
                (this.config = r),
                (this.file = t),
                (this.param = i),
                (this.fileKey = a.initFile(i, t, this.config.enableCache)),
                this.resume()
            }
            var t
            return (
              (t = [
                {
                  key: 'resume',
                  value: function () {
                    var e = this
                    if ('uploading' !== this.uploadState) {
                      this.setUploadState('uploading')
                      var t = this.config
                      g(this, t.retryCount, function (i) {
                        v(e, i, t.retryCount, function () {
                          e.setUploadState('ended'),
                            'function' == typeof t.onComplete &&
                              t.onComplete(e.param)
                        })
                      })
                    }
                  },
                },
                {
                  key: 'pause',
                  value: function () {
                    this.setUploadState('paused')
                  },
                },
                {
                  key: 'abort',
                  value: function () {
                    'ended' !== this.uploadState &&
                      'abort' !== this.uploadState &&
                      (this.setUploadState('abort'),
                      this.config.onError(new m('Upload Aborted', 10499)))
                  },
                },
                {
                  key: 'setUploadState',
                  value: function (e) {
                    e !== this.uploadState && (this.uploadState = e)
                  },
                },
                {
                  key: 'setContext',
                  value: function (e) {
                    a.setUploadContext(
                      this.fileKey,
                      e,
                      this.config.enableCache
                    ),
                      (this.param.ctx = e)
                  },
                },
                {
                  key: 'setComplete',
                  value: function () {
                    a.setComplete(this.fileKey, this.config.enableCache),
                      this.setUploadState('ended')
                  },
                },
              ]) &&
                (function (e, t) {
                  for (var i = 0; i < t.length; i++) {
                    var r = t[i]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(e, r.key, r)
                  }
                })(e.prototype, t),
              e
            )
          })(),
          y = {
            maxFileCache: 1 / 0,
            expireTime: 864e5,
            getFileUploadInformation: function (e) {
              var t = a.getFileKey(e),
                i = a.getFileInfo(t)
              return null === i
                ? null
                : Date.now() - i.modifyAt > y.expireTime
                ? (a.removeFileInfo(t), null)
                : {
                    uploadInfo: Object.assign(
                      {
                        bucketName: i.bucket,
                        objectName: i.obj,
                        token: i.token,
                        ctx: i.ctx,
                      },
                      i.payload ? { payload: i.payload } : {}
                    ),
                    complete: i.end,
                  }
            },
            setMaxFileCache: function (e) {
              y.maxFileCache = e
            },
            setExpireTime: function (e) {
              y.expireTime = e
            },
            printCaches: function () {
              if ('undefined' != typeof localStorage)
                for (
                  var e = 0, t = Object.keys(localStorage);
                  e < t.length;
                  e++
                ) {
                  var i = t[e],
                    r = a.getFileInfo(i)
                  r &&
                    console.log(
                      r,
                      'modifiedAt',
                      new Date(r.modifyAt).toTimeString()
                    )
                }
            },
            createConfig: function (e) {
              return new i(e)
            },
            createTask: function (e, t, i) {
              return new f(e, t, i)
            },
          },
          I = y
        return t.default
      })())
  }),
  r(function (e, t) {
    ;(function () {
      var r = ({ function: !0, object: !0 }[typeof window] && window) || this,
        s = t,
        n = e && !e.nodeType && e,
        o = s && n && 'object' == typeof i && i
      !o || (o.global !== o && o.window !== o && o.self !== o) || (r = o)
      var a = Math.pow(2, 53) - 1,
        c = /\bOpera/,
        d = Object.prototype,
        l = d.hasOwnProperty,
        p = d.toString
      function h(e) {
        return (e = String(e)).charAt(0).toUpperCase() + e.slice(1)
      }
      function u(e) {
        return (e = y(e)), /^(?:webOS|i(?:OS|P))/.test(e) ? e : h(e)
      }
      function m(e, t) {
        for (var i in e) l.call(e, i) && t(e[i], i, e)
      }
      function g(e) {
        return null == e ? h(e) : p.call(e).slice(8, -1)
      }
      function v(e) {
        return String(e).replace(/([ -])(?!$)/g, '$1?')
      }
      function f(e, t) {
        var i = null
        return (
          (function (e, t) {
            var i = -1,
              r = e ? e.length : 0
            if ('number' == typeof r && r > -1 && r <= a)
              for (; ++i < r; ) t(e[i], i)
            else m(e, t)
          })(e, function (r, s) {
            i = t(i, r, s, e)
          }),
          i
        )
      }
      function y(e) {
        return String(e).replace(/^ +| +$/g, '')
      }
      var I = (function e(t) {
        var i = r,
          s = t && 'object' == typeof t && 'String' != g(t)
        s && ((i = t), (t = null))
        var n = i.navigator || {},
          o = n.userAgent || ''
        t || (t = o)
        var a,
          d,
          l = s
            ? !!n.likeChrome
            : /\bChrome\b/.test(t) && !/internal|\n/i.test(p.toString()),
          h = 'Object',
          I = s ? h : 'ScriptBridgingProxyObject',
          M = s ? h : 'Environment',
          _ = s && i.java ? 'JavaPackage' : g(i.java),
          E = s ? h : 'RuntimeObject',
          T = /\bJava/.test(_) && i.java,
          S = T && g(i.environment) == M,
          C = T ? 'a' : 'α',
          N = T ? 'b' : 'β',
          A = i.document || {},
          R = i.operamini || i.opera,
          O = c.test((O = s && R ? R['[[Class]]'] : g(R))) ? O : (R = null),
          b = t,
          k = [],
          V = null,
          P = t == o,
          L = P && R && 'function' == typeof R.version && R.version(),
          D = f(
            [
              { label: 'EdgeHTML', pattern: 'Edge' },
              'Trident',
              { label: 'WebKit', pattern: 'AppleWebKit' },
              'iCab',
              'Presto',
              'NetFront',
              'Tasman',
              'KHTML',
              'Gecko',
            ],
            function (e, i) {
              return (
                e ||
                (RegExp('\\b' + (i.pattern || v(i)) + '\\b', 'i').exec(t) &&
                  (i.label || i))
              )
            }
          ),
          w = f(
            [
              'Adobe AIR',
              'Arora',
              'Avant Browser',
              'Breach',
              'Camino',
              'Electron',
              'Epiphany',
              'Fennec',
              'Flock',
              'Galeon',
              'GreenBrowser',
              'iCab',
              'Iceweasel',
              'K-Meleon',
              'Konqueror',
              'Lunascape',
              'Maxthon',
              { label: 'Microsoft Edge', pattern: '(?:Edge|Edg|EdgA|EdgiOS)' },
              'Midori',
              'Nook Browser',
              'PaleMoon',
              'PhantomJS',
              'Raven',
              'Rekonq',
              'RockMelt',
              { label: 'Samsung Internet', pattern: 'SamsungBrowser' },
              'SeaMonkey',
              { label: 'Silk', pattern: '(?:Cloud9|Silk-Accelerated)' },
              'Sleipnir',
              'SlimBrowser',
              { label: 'SRWare Iron', pattern: 'Iron' },
              'Sunrise',
              'Swiftfox',
              'Vivaldi',
              'Waterfox',
              'WebPositive',
              { label: 'Yandex Browser', pattern: 'YaBrowser' },
              { label: 'UC Browser', pattern: 'UCBrowser' },
              'Opera Mini',
              { label: 'Opera Mini', pattern: 'OPiOS' },
              'Opera',
              { label: 'Opera', pattern: 'OPR' },
              'Chromium',
              'Chrome',
              { label: 'Chrome', pattern: '(?:HeadlessChrome)' },
              { label: 'Chrome Mobile', pattern: '(?:CriOS|CrMo)' },
              { label: 'Firefox', pattern: '(?:Firefox|Minefield)' },
              { label: 'Firefox for iOS', pattern: 'FxiOS' },
              { label: 'IE', pattern: 'IEMobile' },
              { label: 'IE', pattern: 'MSIE' },
              'Safari',
            ],
            function (e, i) {
              return (
                e ||
                (RegExp('\\b' + (i.pattern || v(i)) + '\\b', 'i').exec(t) &&
                  (i.label || i))
              )
            }
          ),
          U = B([
            { label: 'BlackBerry', pattern: 'BB10' },
            'BlackBerry',
            { label: 'Galaxy S', pattern: 'GT-I9000' },
            { label: 'Galaxy S2', pattern: 'GT-I9100' },
            { label: 'Galaxy S3', pattern: 'GT-I9300' },
            { label: 'Galaxy S4', pattern: 'GT-I9500' },
            { label: 'Galaxy S5', pattern: 'SM-G900' },
            { label: 'Galaxy S6', pattern: 'SM-G920' },
            { label: 'Galaxy S6 Edge', pattern: 'SM-G925' },
            { label: 'Galaxy S7', pattern: 'SM-G930' },
            { label: 'Galaxy S7 Edge', pattern: 'SM-G935' },
            'Google TV',
            'Lumia',
            'iPad',
            'iPod',
            'iPhone',
            'Kindle',
            { label: 'Kindle Fire', pattern: '(?:Cloud9|Silk-Accelerated)' },
            'Nexus',
            'Nook',
            'PlayBook',
            'PlayStation Vita',
            'PlayStation',
            'TouchPad',
            'Transformer',
            { label: 'Wii U', pattern: 'WiiU' },
            'Wii',
            'Xbox One',
            { label: 'Xbox 360', pattern: 'Xbox' },
            'Xoom',
          ]),
          x = f(
            {
              Apple: { iPad: 1, iPhone: 1, iPod: 1 },
              Alcatel: {},
              Archos: {},
              Amazon: { Kindle: 1, 'Kindle Fire': 1 },
              Asus: { Transformer: 1 },
              'Barnes & Noble': { Nook: 1 },
              BlackBerry: { PlayBook: 1 },
              Google: { 'Google TV': 1, Nexus: 1 },
              HP: { TouchPad: 1 },
              HTC: {},
              Huawei: {},
              Lenovo: {},
              LG: {},
              Microsoft: { Xbox: 1, 'Xbox One': 1 },
              Motorola: { Xoom: 1 },
              Nintendo: { 'Wii U': 1, Wii: 1 },
              Nokia: { Lumia: 1 },
              Oppo: {},
              Samsung: {
                'Galaxy S': 1,
                'Galaxy S2': 1,
                'Galaxy S3': 1,
                'Galaxy S4': 1,
              },
              Sony: { PlayStation: 1, 'PlayStation Vita': 1 },
              Xiaomi: { Mi: 1, Redmi: 1 },
            },
            function (e, i, r) {
              return (
                e ||
                ((i[U] ||
                  i[/^[a-z]+(?: +[a-z]+\b)*/i.exec(U)] ||
                  RegExp('\\b' + v(r) + '(?:\\b|\\w*\\d)', 'i').exec(t)) &&
                  r)
              )
            }
          ),
          F = f(
            [
              'Windows Phone',
              'KaiOS',
              'Android',
              'CentOS',
              { label: 'Chrome OS', pattern: 'CrOS' },
              'Debian',
              { label: 'DragonFly BSD', pattern: 'DragonFly' },
              'Fedora',
              'FreeBSD',
              'Gentoo',
              'Haiku',
              'Kubuntu',
              'Linux Mint',
              'OpenBSD',
              'Red Hat',
              'SuSE',
              'Ubuntu',
              'Xubuntu',
              'Cygwin',
              'Symbian OS',
              'hpwOS',
              'webOS ',
              'webOS',
              'Tablet OS',
              'Tizen',
              'Linux',
              'Mac OS X',
              'Macintosh',
              'Mac',
              'Windows 98;',
              'Windows ',
            ],
            function (e, i) {
              var r = i.pattern || v(i)
              return (
                !e &&
                  (e = RegExp('\\b' + r + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(
                    t
                  )) &&
                  (e = (function (e, t, i) {
                    var r = {
                      '10.0': '10',
                      6.4: '10 Technical Preview',
                      6.3: '8.1',
                      6.2: '8',
                      6.1: 'Server 2008 R2 / 7',
                      '6.0': 'Server 2008 / Vista',
                      5.2: 'Server 2003 / XP 64-bit',
                      5.1: 'XP',
                      5.01: '2000 SP1',
                      '5.0': '2000',
                      '4.0': 'NT',
                      '4.90': 'ME',
                    }
                    return (
                      t &&
                        i &&
                        /^Win/i.test(e) &&
                        !/^Windows Phone /i.test(e) &&
                        (r = r[/[\d.]+$/.exec(e)]) &&
                        (e = 'Windows ' + r),
                      (e = String(e)),
                      t && i && (e = e.replace(RegExp(t, 'i'), i)),
                      u(
                        e
                          .replace(/ ce$/i, ' CE')
                          .replace(/\bhpw/i, 'web')
                          .replace(/\bMacintosh\b/, 'Mac OS')
                          .replace(/_PowerPC\b/i, ' OS')
                          .replace(/\b(OS X) [^ \d]+/i, '$1')
                          .replace(/\bMac (OS X)\b/, '$1')
                          .replace(/\/(\d)/, ' $1')
                          .replace(/_/g, '.')
                          .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
                          .replace(/\bx86\.64\b/gi, 'x86_64')
                          .replace(/\b(Windows Phone) OS\b/, '$1')
                          .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
                          .split(' on ')[0]
                      )
                    )
                  })(e, r, i.label || i)),
                e
              )
            }
          )
        function B(e) {
          return f(e, function (e, i) {
            var r = i.pattern || v(i)
            return (
              !e &&
                (e =
                  RegExp('\\b' + r + ' *\\d+[.\\w_]*', 'i').exec(t) ||
                  RegExp('\\b' + r + ' *\\w+-[\\w]*', 'i').exec(t) ||
                  RegExp(
                    '\\b' + r + '(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)',
                    'i'
                  ).exec(t)) &&
                ((e = String(
                  i.label && !RegExp(r, 'i').test(i.label) ? i.label : e
                ).split('/'))[1] &&
                  !/[\d.]+/.test(e[0]) &&
                  (e[0] += ' ' + e[1]),
                (i = i.label || i),
                (e = u(
                  e[0]
                    .replace(RegExp(r, 'i'), i)
                    .replace(RegExp('; *(?:' + i + '[_-])?', 'i'), ' ')
                    .replace(RegExp('(' + i + ')[-_.]?(\\w)', 'i'), '$1 $2')
                ))),
              e
            )
          })
        }
        function $(e) {
          return f(e, function (e, i) {
            return (
              e ||
              (RegExp(
                i + '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)',
                'i'
              ).exec(t) || 0)[1] ||
              null
            )
          })
        }
        if (
          (D && (D = [D]),
          /\bAndroid\b/.test(F) &&
            !U &&
            (a = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(t)) &&
            (U = y(a[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, '') || null),
          x && !U
            ? (U = B([x]))
            : x &&
              U &&
              (U = U.replace(
                RegExp('^(' + v(x) + ')[-_.\\s]', 'i'),
                x + ' '
              ).replace(RegExp('^(' + v(x) + ')[-_.]?(\\w)', 'i'), x + ' $2')),
          (a = /\bGoogle TV\b/.exec(U)) && (U = a[0]),
          /\bSimulator\b/i.test(t) && (U = (U ? U + ' ' : '') + 'Simulator'),
          'Opera Mini' == w &&
            /\bOPiOS\b/.test(t) &&
            k.push('running in Turbo/Uncompressed mode'),
          'IE' == w && /\blike iPhone OS\b/.test(t)
            ? ((x = (a = e(t.replace(/like iPhone OS/, ''))).manufacturer),
              (U = a.product))
            : /^iP/.test(U)
            ? (w || (w = 'Safari'),
              (F =
                'iOS' +
                ((a = / OS ([\d_]+)/i.exec(t))
                  ? ' ' + a[1].replace(/_/g, '.')
                  : '')))
            : 'Konqueror' == w && /^Linux\b/i.test(F)
            ? (F = 'Kubuntu')
            : (x &&
                'Google' != x &&
                ((/Chrome/.test(w) && !/\bMobile Safari\b/i.test(t)) ||
                  /\bVita\b/.test(U))) ||
              (/\bAndroid\b/.test(F) &&
                /^Chrome/.test(w) &&
                /\bVersion\//i.test(t))
            ? ((w = 'Android Browser'),
              (F = /\bAndroid\b/.test(F) ? F : 'Android'))
            : 'Silk' == w
            ? (/\bMobi/i.test(t) ||
                ((F = 'Android'), k.unshift('desktop mode')),
              /Accelerated *= *true/i.test(t) && k.unshift('accelerated'))
            : 'UC Browser' == w && /\bUCWEB\b/.test(t)
            ? k.push('speed mode')
            : 'PaleMoon' == w && (a = /\bFirefox\/([\d.]+)\b/.exec(t))
            ? k.push('identifying as Firefox ' + a[1])
            : 'Firefox' == w && (a = /\b(Mobile|Tablet|TV)\b/i.exec(t))
            ? (F || (F = 'Firefox OS'), U || (U = a[1]))
            : !w ||
              (a =
                !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(w))
            ? (w &&
                !U &&
                /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(a + '/') + 8)) &&
                (w = null),
              (a = U || x || F) &&
                (U ||
                  x ||
                  /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(F)) &&
                (w =
                  /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(F) ? F : a) +
                  ' Browser'))
            : 'Electron' == w &&
              (a = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) &&
              k.push('Chromium ' + a),
          L ||
            (L = $([
              '(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)',
              'Version',
              v(w),
              '(?:Firefox|Minefield|NetFront)',
            ])),
          (a =
            ('iCab' == D && parseFloat(L) > 3
              ? 'WebKit'
              : /\bOpera\b/.test(w) &&
                (/\bOPR\b/.test(t) ? 'Blink' : 'Presto')) ||
            (/\b(?:Midori|Nook|Safari)\b/i.test(t) &&
              !/^(?:Trident|EdgeHTML)$/.test(D) &&
              'WebKit') ||
            (!D &&
              /\bMSIE\b/i.test(t) &&
              ('Mac OS' == F ? 'Tasman' : 'Trident')) ||
            ('WebKit' == D &&
              /\bPlayStation\b(?! Vita\b)/i.test(w) &&
              'NetFront')) && (D = [a]),
          'IE' == w && (a = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1])
            ? ((w += ' Mobile'),
              (F = 'Windows Phone ' + (/\+$/.test(a) ? a : a + '.x')),
              k.unshift('desktop mode'))
            : /\bWPDesktop\b/i.test(t)
            ? ((w = 'IE Mobile'),
              (F = 'Windows Phone 8.x'),
              k.unshift('desktop mode'),
              L || (L = (/\brv:([\d.]+)/.exec(t) || 0)[1]))
            : 'IE' != w &&
              'Trident' == D &&
              (a = /\brv:([\d.]+)/.exec(t)) &&
              (w && k.push('identifying as ' + w + (L ? ' ' + L : '')),
              (w = 'IE'),
              (L = a[1])),
          P)
        ) {
          if (
            (function (e, t) {
              var i = null != e ? typeof e[t] : 'number'
              return !(
                /^(?:boolean|number|string|undefined)$/.test(i) ||
                ('object' == i && !e[t])
              )
            })(i, 'global')
          )
            if (
              (T &&
                ((b = (a = T.lang.System).getProperty('os.arch')),
                (F =
                  F ||
                  a.getProperty('os.name') +
                    ' ' +
                    a.getProperty('os.version'))),
              S)
            ) {
              try {
                ;(L = i.require('ringo/engine').version.join('.')),
                  (w = 'RingoJS')
              } catch (t) {
                ;(a = i.system) &&
                  a.global.system == i.system &&
                  ((w = 'Narwhal'), F || (F = a[0].os || null))
              }
              w || (w = 'Rhino')
            } else
              'object' == typeof i.process &&
                !i.process.browser &&
                (a = i.process) &&
                ('object' == typeof a.versions &&
                  ('string' == typeof a.versions.electron
                    ? (k.push('Node ' + a.versions.node),
                      (w = 'Electron'),
                      (L = a.versions.electron))
                    : 'string' == typeof a.versions.nw &&
                      (k.push('Chromium ' + L, 'Node ' + a.versions.node),
                      (w = 'NW.js'),
                      (L = a.versions.nw))),
                w ||
                  ((w = 'Node.js'),
                  (b = a.arch),
                  (F = a.platform),
                  (L = (L = /[\d.]+/.exec(a.version)) ? L[0] : null)))
          else
            g((a = i.runtime)) == I
              ? ((w = 'Adobe AIR'), (F = a.flash.system.Capabilities.os))
              : g((a = i.phantom)) == E
              ? ((w = 'PhantomJS'),
                (L =
                  (a = a.version || null) &&
                  a.major + '.' + a.minor + '.' + a.patch))
              : 'number' == typeof A.documentMode &&
                (a = /\bTrident\/(\d+)/i.exec(t))
              ? ((L = [L, A.documentMode]),
                (a = +a[1] + 4) != L[1] &&
                  (k.push('IE ' + L[1] + ' mode'),
                  D && (D[1] = ''),
                  (L[1] = a)),
                (L = 'IE' == w ? String(L[1].toFixed(1)) : L[0]))
              : 'number' == typeof A.documentMode &&
                /^(?:Chrome|Firefox)\b/.test(w) &&
                (k.push('masking as ' + w + ' ' + L),
                (w = 'IE'),
                (L = '11.0'),
                (D = ['Trident']),
                (F = 'Windows'))
          F = F && u(F)
        }
        if (
          (L &&
            (a =
              /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(L) ||
              /(?:alpha|beta)(?: ?\d)?/i.exec(
                t + ';' + (P && n.appMinorVersion)
              ) ||
              (/\bMinefield\b/i.test(t) && 'a')) &&
            ((V = /b/i.test(a) ? 'beta' : 'alpha'),
            (L =
              L.replace(RegExp(a + '\\+?$'), '') +
              ('beta' == V ? N : C) +
              (/\d+\+?/.exec(a) || ''))),
          'Fennec' == w ||
            ('Firefox' == w && /\b(?:Android|Firefox OS|KaiOS)\b/.test(F)))
        )
          w = 'Firefox Mobile'
        else if ('Maxthon' == w && L) L = L.replace(/\.[\d.]+/, '.x')
        else if (/\bXbox\b/i.test(U))
          'Xbox 360' == U && (F = null),
            'Xbox 360' == U &&
              /\bIEMobile\b/.test(t) &&
              k.unshift('mobile mode')
        else if (
          (!/^(?:Chrome|IE|Opera)$/.test(w) &&
            (!w || U || /Browser|Mobi/.test(w))) ||
          ('Windows CE' != F && !/Mobi/i.test(t))
        )
          if ('IE' == w && P)
            try {
              null === i.external && k.unshift('platform preview')
            } catch (t) {
              k.unshift('embedded')
            }
          else
            (/\bBlackBerry\b/.test(U) || /\bBB10\b/.test(t)) &&
            (a =
              (RegExp(U.replace(/ +/g, ' *') + '/([.\\d]+)', 'i').exec(t) ||
                0)[1] || L)
              ? ((F =
                  ((a = [a, /BB10/.test(t)])[1]
                    ? ((U = null), (x = 'BlackBerry'))
                    : 'Device Software') +
                  ' ' +
                  a[0]),
                (L = null))
              : this != m &&
                'Wii' != U &&
                ((P && R) ||
                  (/Opera/.test(w) && /\b(?:MSIE|Firefox)\b/i.test(t)) ||
                  ('Firefox' == w && /\bOS X (?:\d+\.){2,}/.test(F)) ||
                  ('IE' == w &&
                    ((F && !/^Win/.test(F) && L > 5.5) ||
                      (/\bWindows XP\b/.test(F) && L > 8) ||
                      (8 == L && !/\bTrident\b/.test(t))))) &&
                !c.test((a = e.call(m, t.replace(c, '') + ';'))) &&
                a.name &&
                ((a = 'ing as ' + a.name + ((a = a.version) ? ' ' + a : '')),
                c.test(w)
                  ? (/\bIE\b/.test(a) && 'Mac OS' == F && (F = null),
                    (a = 'identify' + a))
                  : ((a = 'mask' + a),
                    (w = O
                      ? u(O.replace(/([a-z])([A-Z])/g, '$1 $2'))
                      : 'Opera'),
                    /\bIE\b/.test(a) && (F = null),
                    P || (L = null)),
                (D = ['Presto']),
                k.push(a))
        else w += ' Mobile'
        ;(a = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) &&
          ((a = [parseFloat(a.replace(/\.(\d)$/, '.0$1')), a]),
          'Safari' == w && '+' == a[1].slice(-1)
            ? ((w = 'WebKit Nightly'), (V = 'alpha'), (L = a[1].slice(0, -1)))
            : (L != a[1] &&
                L != (a[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) ||
              (L = null),
          (a[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(t) || 0)[1]),
          537.36 == a[0] &&
            537.36 == a[2] &&
            parseFloat(a[1]) >= 28 &&
            'WebKit' == D &&
            (D = ['Blink']),
          P && (l || a[1])
            ? (D && (D[1] = 'like Chrome'),
              (a =
                a[1] ||
                ((a = a[0]) < 530
                  ? 1
                  : a < 532
                  ? 2
                  : a < 532.05
                  ? 3
                  : a < 533
                  ? 4
                  : a < 534.03
                  ? 5
                  : a < 534.07
                  ? 6
                  : a < 534.1
                  ? 7
                  : a < 534.13
                  ? 8
                  : a < 534.16
                  ? 9
                  : a < 534.24
                  ? 10
                  : a < 534.3
                  ? 11
                  : a < 535.01
                  ? 12
                  : a < 535.02
                  ? '13+'
                  : a < 535.07
                  ? 15
                  : a < 535.11
                  ? 16
                  : a < 535.19
                  ? 17
                  : a < 536.05
                  ? 18
                  : a < 536.1
                  ? 19
                  : a < 537.01
                  ? 20
                  : a < 537.11
                  ? '21+'
                  : a < 537.13
                  ? 23
                  : a < 537.18
                  ? 24
                  : a < 537.24
                  ? 25
                  : a < 537.36
                  ? 26
                  : 'Blink' != D
                  ? '27'
                  : '28')))
            : (D && (D[1] = 'like Safari'),
              (a =
                (a = a[0]) < 400
                  ? 1
                  : a < 500
                  ? 2
                  : a < 526
                  ? 3
                  : a < 533
                  ? 4
                  : a < 534
                  ? '4+'
                  : a < 535
                  ? 5
                  : a < 537
                  ? 6
                  : a < 538
                  ? 7
                  : a < 601
                  ? 8
                  : a < 602
                  ? 9
                  : a < 604
                  ? 10
                  : a < 606
                  ? 11
                  : a < 608
                  ? 12
                  : '12')),
          D &&
            (D[1] +=
              ' ' +
              (a += 'number' == typeof a ? '.x' : /[.+]/.test(a) ? '' : '+')),
          'Safari' == w && (!L || parseInt(L) > 45)
            ? (L = a)
            : 'Chrome' == w &&
              /\bHeadlessChrome/i.test(t) &&
              k.unshift('headless')),
          'Opera' == w && (a = /\bzbov|zvav$/.exec(F))
            ? ((w += ' '),
              k.unshift('desktop mode'),
              'zvav' == a ? ((w += 'Mini'), (L = null)) : (w += 'Mobile'),
              (F = F.replace(RegExp(' *' + a + '$'), '')))
            : 'Safari' == w && /\bChrome\b/.exec(D && D[1])
            ? (k.unshift('desktop mode'),
              (w = 'Chrome Mobile'),
              (L = null),
              /\bOS X\b/.test(F)
                ? ((x = 'Apple'), (F = 'iOS 4.3+'))
                : (F = null))
            : /\bSRWare Iron\b/.test(w) && !L && (L = $('Chrome')),
          L &&
            0 == L.indexOf((a = /[\d.]+$/.exec(F))) &&
            t.indexOf('/' + a + '-') > -1 &&
            (F = y(F.replace(a, ''))),
          F &&
            -1 != F.indexOf(w) &&
            !RegExp(w + ' OS').test(F) &&
            (F = F.replace(RegExp(' *' + v(w) + ' *'), '')),
          D &&
            !/\b(?:Avant|Nook)\b/.test(w) &&
            (/Browser|Lunascape|Maxthon/.test(w) ||
              ('Safari' != w && /^iOS/.test(F) && /\bSafari\b/.test(D[1])) ||
              (/^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(
                w
              ) &&
                D[1])) &&
            (a = D[D.length - 1]) &&
            k.push(a),
          k.length && (k = ['(' + k.join('; ') + ')']),
          x && U && U.indexOf(x) < 0 && k.push('on ' + x),
          U && k.push((/^on /.test(k[k.length - 1]) ? '' : 'on ') + U),
          F &&
            ((a = / ([\d.+]+)$/.exec(F)),
            (d = a && '/' == F.charAt(F.length - a[0].length - 1)),
            (F = {
              architecture: 32,
              family: a && !d ? F.replace(a[0], '') : F,
              version: a ? a[1] : null,
              toString: function () {
                var e = this.version
                return (
                  this.family +
                  (e && !d ? ' ' + e : '') +
                  (64 == this.architecture ? ' 64-bit' : '')
                )
              },
            })),
          (a = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(b)) &&
          !/\bi686\b/i.test(b)
            ? (F &&
                ((F.architecture = 64),
                (F.family = F.family.replace(RegExp(' *' + a), ''))),
              w &&
                (/\bWOW64\b/i.test(t) ||
                  (P &&
                    /\w(?:86|32)$/.test(n.cpuClass || n.platform) &&
                    !/\bWin64; x64\b/i.test(t))) &&
                k.unshift('32-bit'))
            : F &&
              /^OS X/.test(F.family) &&
              'Chrome' == w &&
              parseFloat(L) >= 39 &&
              (F.architecture = 64),
          t || (t = null)
        var G = {}
        return (
          (G.description = t),
          (G.layout = D && D[0]),
          (G.manufacturer = x),
          (G.name = w),
          (G.prerelease = V),
          (G.product = U),
          (G.ua = t),
          (G.version = w && L),
          (G.os = F || {
            architecture: null,
            family: null,
            version: null,
            toString: function () {
              return 'null'
            },
          }),
          (G.parse = e),
          (G.toString = function () {
            return this.description || ''
          }),
          G.version && k.unshift(L),
          G.name && k.unshift(w),
          F &&
            w &&
            (F != String(F).split(' ')[0] || (F != w.split(' ')[0] && !U)) &&
            k.push(U ? '(' + F + ')' : 'on ' + F),
          k.length && (G.description = k.join(' ')),
          G
        )
      })()
      s && n
        ? m(I, function (e, t) {
            s[t] = e
          })
        : (r.platform = I)
    }).call(i)
  })
class xi {
  constructor(e) {
    ;(this.name = 'V2NIMConversationIdUtil'), (this.core = e)
  }
  conversationId(e, t) {
    return `${this.core.account}|${e}|${t}`
  }
  p2pConversationId(e) {
    return `${this.core.account}|1|${e}`
  }
  teamConversationId(e) {
    return `${this.core.account}|2|${e}`
  }
  superTeamConversationId(e) {
    return `${this.core.account}|3|${e}`
  }
  messageConversationId(e) {
    return 1 === e.conversationType
      ? e.senderId === this.core.account
        ? this.p2pConversationId(e.receiverId)
        : this.p2pConversationId(e.senderId)
      : 2 === e.conversationType
      ? this.teamConversationId(e.receiverId)
      : this.superTeamConversationId(e.receiverId)
  }
  parseConversationType(e) {
    try {
      if (e && e.startsWith(`${this.core.account}|`)) {
        var t = e.replace(`${this.core.account}|`, '')
        return Number(t[0])
      }
      return (
        this.core.logger.warn(
          `conversationId is not start with ${this.core.account}`
        ),
        0
      )
    } catch (e) {
      return 0
    }
  }
  parseConversationTargetId(e) {
    try {
      return e && e.startsWith(`${this.core.account}|`)
        ? e.replace(`${this.core.account}|`, '').slice(2)
        : (this.core.logger.warn(
            `conversationId is not start with ${this.core.account}`
          ),
          '')
    } catch (e) {
      return ''
    }
  }
  convertToV1ConversationId(e) {
    var t = this.parseConversationType(e)
    return `${
      1 === t ? 'p2p' : 2 === t ? 'team' : 'superTeam'
    }|${this.parseConversationTargetId(e)}`
  }
}
class Fi {
  constructor() {
    ;(this.messages = new Map()), (this.capacity = 1e4)
  }
  reset() {
    this.messages.clear()
  }
  getMessageById(e) {
    if (e) return this.messages.get(e)
  }
  getMessagesByConversationId(e) {
    var t = []
    return (
      this.messages.forEach((i) => {
        i.conversationId === e && t.push(i)
      }),
      t
    )
  }
  getLastMessageOfConversation(e) {
    var t = this.getMessagesByConversationId(e)
    if (0 !== t.length)
      return t.reduce((e, t) => (t.createTime > e.createTime ? t : e), t[0])
  }
  upsertMessages(e) {
    e.forEach((e) => {
      this.setLRU(e.messageClientId, e)
    })
  }
  setLRU(e, t) {
    if (this.messages.has(e)) this.messages.delete(e)
    else if (this.messages.size >= this.capacity) {
      var i = this.messages.keys().next().value
      i && this.messages.delete(i)
    }
    this.messages.set(e, t)
  }
  deleteMessage(e) {
    this.messages.delete(e)
  }
  deleteMessages(e, t) {
    this.messages.forEach((i) => {
      e === i.conversationId &&
        (!t || (t && i.createTime < t)) &&
        this.messages.delete(i.messageClientId)
    })
  }
}
var Bi = {
    accountId: { type: 'string', allowEmpty: !1 },
    content: {
      type: 'object',
      required: !1,
      rules: {
        msg: { type: 'string', allowEmpty: !1 },
        type: { type: 'number', allowEmpty: !1 },
      },
    },
    messages: {
      type: 'array',
      required: !1,
      rules: {
        msg: { type: 'string', allowEmpty: !1 },
        type: { type: 'number' },
        role: { type: 'enum', values: ['assistant', 'user', 'system'] },
      },
    },
    promptVariables: { type: 'jsonstr', required: !1 },
    modelConfigParams: {
      type: 'object',
      required: !1,
      rules: {
        prompt: { type: 'string', required: !1 },
        maxTokens: { type: 'number', required: !1 },
        topP: { type: 'number', required: !1 },
        temperature: { type: 'number', required: !1 },
      },
    },
    aiStream: { type: 'boolean', required: !1 },
  },
  $i = Object.assign({ requestId: { type: 'string', allowEmpty: !1 } }, Bi),
  Gi = {
    requestId: { type: 'string', allowEmpty: !1 },
    accountId: { type: 'string', allowEmpty: !1 },
  },
  ji = [1, 3, 2, 0],
  qi = [2, 7, 12, 100, 6, 1, -1, 4, 5, 11, 0, 10, 3],
  Hi = {
    routeEnabled: { type: 'boolean', required: !1 },
    routeEnvironment: { type: 'string', required: !1 },
  },
  Yi = {
    pushEnabled: { type: 'boolean', required: !1 },
    pushNickEnabled: { type: 'boolean', required: !1 },
    pushContent: { type: 'string', required: !1 },
    pushPayload: { type: 'string', required: !1 },
    forcePush: { type: 'boolean', required: !1 },
    forceContent: { type: 'string', required: !1 },
    forcePushAccountIds: { type: 'array', required: !1, itemType: 'string' },
  },
  Ki = {
    antispamEnabled: { type: 'boolean', required: !1 },
    antispamBusinessId: { type: 'string', required: !1 },
    antispamCustomMessage: { type: 'string', required: !1 },
    antispamCheating: { type: 'string', required: !1 },
    antispamExtension: { type: 'string', required: !1 },
  },
  Wi = {
    messageConfig: {
      type: 'object',
      required: !1,
      rules: {
        readReceiptEnabled: { type: 'boolean', required: !1 },
        lastMessageUpdateEnabled: { type: 'boolean', required: !1 },
        historyEnabled: { type: 'boolean', required: !1 },
        roamingEnabled: { type: 'boolean', required: !1 },
        onlineSyncEnabled: { type: 'boolean', required: !1 },
        offlineEnabled: { type: 'boolean', required: !1 },
        unreadEnabled: { type: 'boolean', required: !1 },
      },
    },
    routeConfig: { type: 'object', required: !1, rules: Hi },
    pushConfig: { type: 'object', required: !1, rules: Yi },
    antiSpamConfig: { type: 'object', required: !1, rules: Ki },
    robotConfig: {
      type: 'object',
      required: !1,
      rules: {
        accountId: { type: 'string', required: !1 },
        topic: { type: 'string', required: !1 },
        function: { type: 'string', required: !1 },
        customContent: { type: 'string', required: !1 },
      },
    },
    aiConfig: { type: 'object', required: !1, rules: Bi },
    targetConfig: {
      type: 'object',
      required: !1,
      rules: {
        receiverIds: { type: 'array', itemType: 'string' },
        inclusive: { type: 'boolean' },
        newMemberVisible: { type: 'boolean', required: !1 },
      },
    },
    clientAntispamEnabled: { type: 'boolean', required: !1 },
    clientAntispamReplace: { type: 'string', required: !1 },
  },
  Ji = {
    message: {
      type: 'object',
      rules: {
        text: { type: 'string', required: !1 },
        messageType: { type: 'enum', values: qi },
        messageClientId: { type: 'string', allowEmpty: !1 },
      },
    },
    params: { type: 'object', rules: Wi, required: !1 },
    replyMessage: {
      type: 'object',
      rules: {
        conversationType: { type: 'enum', values: [1, 3, 2, 0] },
        receiverId: { type: 'string', allowEmpty: !1 },
        senderId: { type: 'string', allowEmpty: !1 },
        messageClientId: { type: 'string', allowEmpty: !1 },
        messageServerId: { type: 'string', allowEmpty: !1 },
        createTime: { type: 'number' },
      },
    },
  },
  zi = {
    conversationId: { type: 'string', allowEmpty: !1 },
    message: {
      type: 'object',
      rules: {
        text: { type: 'string', required: !1 },
        messageType: { type: 'enum', values: qi },
        messageClientId: { type: 'string', allowEmpty: !1 },
        attachment: {
          type: 'object',
          required: !1,
          rules: { file: { type: 'file', required: !1 } },
        },
      },
    },
    params: { type: 'object', required: !1, rules: Wi },
  },
  Xi = {
    message: {
      type: 'object',
      rules: {
        messageClientId: { type: 'string', allowEmpty: !1 },
        messageServerId: { type: 'string', allowEmpty: !1 },
        conversationType: { type: 'enum', values: ji },
        createTime: { type: 'number' },
      },
    },
    params: {
      type: 'object',
      rules: {
        postscript: { type: 'string', required: !1 },
        serverExtension: { type: 'string', required: !1 },
        pushContent: { type: 'string', required: !1 },
        pushPayload: { type: 'string', required: !1 },
        env: { type: 'string', required: !1 },
      },
      required: !1,
    },
  },
  Qi = {
    conversationId: { type: 'string', allowEmpty: !1 },
    messageTypes: { type: 'array', required: !1, itemType: 'enum', values: qi },
    beginTime: { type: 'number', required: !1 },
    endTime: { type: 'number', required: !1 },
    limit: { type: 'number', min: 1, required: !1 },
    direction: { type: 'enum', values: [1, 0], required: !1 },
    anchorMessage: {
      type: 'object',
      required: !1,
      rules: {
        messageServerId: { type: 'string', allowEmpty: !1 },
        createTime: { type: 'number' },
      },
    },
  },
  Zi = {
    conversationType: { type: 'enum', values: ji },
    receiverId: { type: 'string', allowEmpty: !1 },
    senderId: { type: 'string', allowEmpty: !1 },
    messageServerId: { type: 'string', allowEmpty: !1 },
    messageClientId: { type: 'string', allowEmpty: !1 },
  },
  er = { messageRefers: { type: 'array', required: !0, rules: Zi } },
  tr = {
    conversationId: { type: 'string', allowEmpty: !1 },
    conversationType: { type: 'enum', values: ji },
    receiverId: { type: 'string', allowEmpty: !1 },
    senderId: { type: 'string', allowEmpty: !1 },
    messageClientId: { type: 'string', allowEmpty: !1 },
    createTime: { type: 'number' },
  },
  ir = { messages: { type: 'array', rules: tr } },
  rr = {
    conversationId: { type: 'string', allowEmpty: !1 },
    serverExtension: { type: 'string', required: !1 },
    onlineSync: { type: 'boolean', required: !1 },
    deleteRoam: { type: 'boolean', required: !1 },
    clearMode: { type: 'enum', values: [0, 1, 2], required: !1 },
  },
  sr = { serverExtension: { type: 'string', required: !1 } },
  nr = {
    messageClientId: { type: 'string', allowEmpty: !1 },
    conversationType: { type: 'enum', values: [1] },
    receiverId: { type: 'string', allowEmpty: !1 },
    createTime: { type: 'number' },
  },
  or = {
    messages: {
      type: 'array',
      rules: {
        messageClientId: { type: 'string', allowEmpty: !1 },
        conversationType: { type: 'enum', values: [2] },
        receiverId: { type: 'string', allowEmpty: !1 },
        createTime: { type: 'number' },
      },
      min: 1,
    },
  },
  ar = {
    voiceUrl: { type: 'string', required: !1, allowEmpty: !1 },
    file: { type: 'file', required: !1 },
    voicePath: { type: 'string', required: !1, allowEmpty: !1 },
    mimeType: { type: 'string', required: !1, allowEmpty: !1 },
    sampleRate: { type: 'string', required: !1, allowEmpty: !1 },
    duration: { type: 'number', required: !0, min: 0 },
    sceneName: { type: 'string', required: !1 },
  },
  cr = {
    message: {
      type: 'object',
      rules: {
        conversationType: { type: 'enum', values: ji },
        receiverId: { type: 'string', allowEmpty: !1 },
        senderId: { type: 'string', allowEmpty: !1 },
        messageServerId: { type: 'string', allowEmpty: !1 },
        messageClientId: { type: 'string', allowEmpty: !1 },
        createTime: { type: 'number' },
      },
    },
    index: { type: 'number', min: 1 },
    serverExtension: { type: 'string', required: !1 },
    pushConfig: {
      type: 'object',
      required: !1,
      rules: {
        pushEnabled: { type: 'boolean', required: !1 },
        needBadge: { type: 'boolean', required: !1 },
        title: { type: 'string', required: !1, allowEmpty: !1 },
        content: { type: 'string', required: !1, allowEmpty: !1 },
        pushPayload: { type: 'string', required: !1, allowEmpty: !1 },
      },
    },
  },
  dr = {
    messages: {
      type: 'array',
      rules: {
        conversationType: { type: 'enum', values: [1, 3, 2, 0] },
        receiverId: { type: 'string', allowEmpty: !1 },
        senderId: { type: 'string', allowEmpty: !1 },
        messageServerId: { type: 'string', allowEmpty: !1 },
        messageClientId: { type: 'string', allowEmpty: !1 },
        createTime: { type: 'number' },
      },
    },
  },
  lr = {
    params: {
      type: 'object',
      rules: {
        collectionType: { type: 'number', min: 1 },
        collectionData: { type: 'string', allowEmpty: !1 },
        serverExtension: { type: 'string', required: !1 },
        uniqueId: { type: 'string', required: !1 },
      },
    },
  },
  pr = {
    collections: {
      type: 'array',
      min: 1,
      rules: {
        collectionId: { type: 'string', allowEmpty: !1 },
        createTime: { type: 'number' },
      },
    },
  },
  hr = {
    serverExtension: { type: 'string', required: !1 },
    collection: {
      type: 'object',
      rules: {
        collectionId: { type: 'string', allowEmpty: !1 },
        collectionType: { type: 'number' },
        createTime: { type: 'number' },
      },
    },
  },
  ur = {
    beginTime: { type: 'number', required: !1 },
    endTime: { type: 'number', required: !1 },
    limit: { type: 'number', min: 1, required: !1 },
    direction: { type: 'enum', required: !1, values: [1, 0] },
    collectionType: { type: 'number', required: !1 },
    anchorCollection: {
      type: 'object',
      required: !1,
      rules: {
        collectionId: { type: 'string', allowEmpty: !1, required: !1 },
        createTime: { type: 'number', required: !1 },
      },
    },
  },
  mr = {
    keyword: { type: 'string', allowEmpty: !1 },
    beginTime: { type: 'number', required: !1 },
    endTime: { type: 'number', required: !1 },
    sortOrder: { type: 'enum', values: [1, 0], required: !1 },
    conversationLimit: { type: 'number', min: 0, required: !1 },
    messageLimit: { type: 'number', min: 1, required: !1 },
    p2pAccountIds: { type: 'array', required: !1, itemType: 'string' },
    teamIds: { type: 'array', required: !1, itemType: 'string' },
    senderAccountIds: { type: 'array', required: !1, itemType: 'string' },
    messageTypes: { type: 'array', required: !1, itemType: 'enum', values: qi },
    messageSubtypes: { type: 'array', required: !1, itemType: 'number' },
  },
  gr = {
    conversationId: { type: 'string', required: !1, allowEmpty: !1 },
    keywordList: { type: 'array', required: !1, itemType: 'string' },
    keywordMatchType: { type: 'enum', values: [1, 0], required: !1 },
    senderAccountIds: { type: 'array', required: !1, itemType: 'string' },
    messageTypes: { type: 'array', required: !1, itemType: 'enum', values: qi },
    messageSubtypes: { type: 'array', required: !1, itemType: 'number' },
    searchStartTime: { type: 'number', required: !1 },
    searchTimePeriod: { type: 'number', required: !1 },
    limit: { type: 'number', min: 1, required: !1 },
    direction: { type: 'enum', values: [0, 1], required: !1 },
    pageToken: { type: 'string', required: !1 },
  },
  vr = {
    message: {
      type: 'object',
      rules: {
        receiverId: { type: 'string', allowEmpty: !1 },
        messageServerId: { type: 'string', allowEmpty: !1 },
        conversationType: { type: 'enum', values: [2] },
      },
    },
  },
  fr = {
    messages: {
      type: 'array',
      rules: {
        receiverId: { type: 'string', allowEmpty: !1 },
        messageServerId: { type: 'string', allowEmpty: !1 },
        conversationType: { type: 'enum', values: [2] },
      },
      min: 1,
    },
  },
  yr = {
    sceneName: { type: 'string', required: !1 },
    name: { type: 'string', required: !1 },
  },
  Ir = Object.assign(Object.assign({}, yr), {
    duration: { type: 'number', required: !1 },
  }),
  Mr = Object.assign(Object.assign({}, Ir), {
    width: { type: 'number', required: !1 },
    height: { type: 'number', required: !1 },
  }),
  _r = Object.assign(Object.assign({}, yr), {
    width: { type: 'number', required: !1 },
    height: { type: 'number', required: !1 },
  }),
  Er = {
    messageRefer: { type: 'object', required: !0, rules: Zi },
    beginTime: { type: 'number', required: !1 },
    endTime: { type: 'number', required: !1 },
    limit: { type: 'number', min: 1, required: !1 },
    direction: { type: 'enum', values: [1, 0], required: !1 },
    excludeMessageServerId: { type: 'string', required: !1, allowEmpty: !1 },
  },
  Tr = {
    senderId: { type: 'string', allowEmpty: !1 },
    receiverId: { type: 'string', allowEmpty: !1 },
    createTime: { type: 'number' },
    messageClientId: { type: 'string', allowEmpty: !1 },
    messageServerId: { type: 'string', allowEmpty: !1 },
  },
  Sr = {
    subType: { type: 'number', min: 0, required: !1 },
    text: { type: 'string', required: !1 },
    attachment: { type: 'object', required: !1 },
    serverExtension: { type: 'string', required: !1 },
    routeConfig: { type: 'object', required: !1, rules: Hi },
    pushConfig: { type: 'object', required: !1, rules: Yi },
    antiSpamConfig: { type: 'object', required: !1, rules: Ki },
    clientAntispamEnabled: { type: 'boolean', required: !1 },
    clientAntispamReplace: { type: 'string', required: !1 },
  },
  Cr = {
    messageClientId: { type: 'string', allowEmpty: !1 },
    messageServerId: { type: 'string', allowEmpty: !1 },
    createTime: { type: 'number' },
    aiConfig: { type: 'object', rules: Bi },
  },
  Nr = {
    operationType: { type: 'enum', values: [0, 1, 2] },
    updateContent: { type: 'string', allowEmpty: !0, required: !1 },
  },
  Ar = { operationType: { type: 'enum', values: [2, 1], required: !0 } }
class Rr {
  constructor(e, t) {
    ;(this.p2pMessageReceipts = {}), (this.core = e), (this.service = t)
  }
  reset() {
    this.p2pMessageReceipts = {}
  }
  sendP2PMessageReceipt(e) {
    return Te(this, void 0, void 0, function* () {
      if ((ye(nr, e, '', !0), e.senderId === this.core.account))
        throw new me({
          detail: {
            reason: `sendP2PMessageReceipt. sender: ${e.senderId} is not allowed to send msg receipt`,
          },
        })
      yield this.core.sendCmd('v2SendP2PMessageReceipt', {
        tag: {
          receiverId: e.senderId,
          messageClientId: e.messageClientId,
          createTime: e.createTime,
        },
      })
    })
  }
  isPeerRead(e) {
    if (1 !== e.conversationType) return !1
    if (e.senderId !== this.core.account) return !1
    if (e.senderId === this.core.account && e.receiverId === this.core.account)
      return !0
    var t = this.core.V2NIMConversationIdUtil.messageConversationId(e),
      i = this.p2pMessageReceipts[t] || 0
    return e.createTime <= i
  }
  getP2PMessageReceipt(e) {
    return Te(this, void 0, void 0, function* () {
      if (
        (Me(this.core.account, e),
        1 !== this.core.V2NIMConversationIdUtil.parseConversationType(e))
      )
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: {
            reason:
              'getP2PMessageReceipt: conversationId is not p2p conversationId',
          },
        })
      return { conversationId: e, timestamp: this.p2pMessageReceipts[e] || 0 }
    })
  }
  getTeamMessageReceipts(e) {
    return Te(this, void 0, void 0, function* () {
      if (
        (ye(fr, { messages: e }, '', !0),
        e.some((e) => e.senderId !== this.core.account))
      )
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: {
            reason:
              'getTeamMessageReceipts: exist messages senderId is not current user',
          },
        })
      if (e.some((t) => t.receiverId !== e[0].receiverId))
        throw new he({
          code: de.V2NIM_ERROR_CODE_MISUSE,
          detail: {
            reason:
              'getTeamMessageReceipts: exist messages receiverId is not same',
          },
        })
      return (yield this.core.sendCmd('v2GetTeamMessageReceipts', {
        tag: e,
      })).content.data.map((e) =>
        Object.assign(Object.assign({}, e), {
          conversationId: this.core.V2NIMConversationIdUtil.teamConversationId(
            e.receiverId
          ),
        })
      )
    })
  }
  getTeamMessageReceiptDetail(e) {
    return Te(this, void 0, void 0, function* () {
      if ((ye(vr, { message: e }, '', !0), e.senderId !== this.core.account))
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: {
            reason: `getTeamMessageReceiptDetail::senderId ${e.senderId} incorrect`,
          },
        })
      var t = yield this.core.sendCmd('v2GetTeamMessageReceiptDetail', {
        tag: e,
      })
      return {
        readReceipt: {
          conversationId: this.core.V2NIMConversationIdUtil.teamConversationId(
            e.receiverId
          ),
          messageClientId: e.messageClientId,
          messageServerId: e.messageServerId,
          readCount: t.content.readAccountList.length,
          unreadCount: t.content.unreadAccountList.length,
        },
        readAccountList: t.content.readAccountList,
        unreadAccountList: t.content.unreadAccountList,
      }
    })
  }
  sendTeamMessageReceipts(e) {
    return Te(this, void 0, void 0, function* () {
      if (e.some((t) => t.conversationId !== e[0].conversationId))
        throw new he({
          code: de.V2NIM_ERROR_CODE_MISUSE,
          detail: { reason: 'getTeamMessageReceipts: conversationId not same' },
        })
      if (
        (ye(or, { messages: e }, '', !0),
        e.some((e) => e.senderId === this.core.account))
      )
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: {
            reason:
              'getTeamMessageReceipts: exist messages senderId is not current user',
          },
        })
      yield this.core.sendCmd('v2SendTeamMessageReceipts', { tag: e })
    })
  }
  syncP2PMessagReceiptsHandler(e) {
    var t = e.content.data.map((e) => {
      var t = this.core.V2NIMConversationIdUtil.p2pConversationId(e.senderId),
        i = e.createTime
      return (
        (this.p2pMessageReceipts[t] = i), { conversationId: t, timestamp: i }
      )
    })
    this.service.emit('onReceiveP2PMessageReadReceipts', t)
  }
  onP2PMessageReceiptsHandler(e) {
    var t = this.core.V2NIMConversationIdUtil.p2pConversationId(
        e.content.data.senderId
      ),
      i = e.content.data.createTime
    ;(this.p2pMessageReceipts[t] = i),
      this.service.emit('onReceiveP2PMessageReadReceipts', [
        { conversationId: t, timestamp: i },
      ])
  }
  onTeamMessageReceiptsHandler(e) {
    var t = e.content.data.map((e) => ({
      conversationId: this.core.V2NIMConversationIdUtil.teamConversationId(
        e.receiverId
      ),
      messageServerId: e.messageServerId,
      messageClientId: e.messageClientId,
      readCount: e.readCount,
      unreadCount: e.unreadCount,
      latestReadAccount: e.latestReadAccount,
    }))
    this.service.emit('onReceiveTeamMessageReadReceipts', t)
  }
}
var Or = {
    '31_1': 'v2TeamCreate',
    '32_1': 'v2SuperTeamCreate',
    '31_5': 'v2TeamInviteMembers',
    '32_5': 'v2SuperTeamInviteMembers',
    '31_6': 'v2TeamKickMembers',
    '32_6': 'v2SuperTeamKickMembers',
    '31_8': 'v2TeamLeave',
    '32_7': 'v2SuperTeamLeave',
    '31_7': 'v2TeamUpdateInfo',
    '32_8': 'v2SuperTeamUpdateInfo',
    '31_9': 'v2TeamGetInfo',
    '32_9': 'v2SuperTeamGetInfo',
    '31_12': 'v2TeamDismiss',
    '32_4': 'v2SuperTeamDismiss',
    '31_13': 'v2TeamApplyToJoin',
    '32_20': 'v2SuperTeamApplyToJoin',
    '31_14': 'v2TeamAcceptJoinApplication',
    '32_21': 'v2SuperTeamAcceptJoinApplication',
    '31_15': 'v2TeamRejectJoinApplication',
    '32_22': 'v2SuperTeamRejectJoinApplication',
    '31_16': 'v2TeamAddManagers',
    '32_26': 'v2SuperTeamAddManagers',
    '31_17': 'v2TeamRemoveManagers',
    '32_27': 'v2SuperTeamRemoveManagers',
    '31_18': 'v2TeamTransferOwner',
    '32_31': 'v2SuperTeamTransferOwner',
    '31_19': 'v2TeamUpdateSelfMemberInfo',
    '32_10': 'v2SuperTeamUpdateSelfMemberInfo',
    '31_20': 'v2TeamUpdateMember',
    '32_30': 'v2SuperTeamUpdateMember',
    '31_21': 'v2TeamAcceptInvitation',
    '32_23': 'v2SuperTeamAcceptInvitation',
    '31_22': 'v2TeamRejectInvite',
    '32_24': 'v2SuperTeamRejectInvite',
    '31_33': 'v2TeamGetMemberInvitor',
    '32_35': 'v2SuperTeamGetMemberInvitor',
    '31_25': 'v2TeamMemberSetChatBannedStatus',
    '32_29': 'v2SuperTeamMemberSetChatBannedStatus',
    '31_32': 'v2TeamSetChatBannedMode',
    '32_28': 'v2SuperTeamSetChatBannedMode',
    '31_34': 'v2TeamGetByIds',
    '32_36': 'v2SuperTeamGetByIds',
    '31_35': 'v2TeamMemberGetListByIds',
    '32_37': 'v2SuperTeamMemberGetListByIds',
    '31_36': 'v2TeamMemberGetList',
    '8_101': 'v2TeamCreateMultiSync',
    '8_109': 'v2TeamSync',
    '8_119': 'v2TeamMemberUpdateMultiSync',
    '8_126': 'v2TeamMembersOfSelfInSync',
    '21_101': 'v2SuperTeamCreateMultiSync',
    '21_109': 'v2SuperTeamSync',
    '21_110': 'v2SuperTeamMemberUpdateMultiSync',
    '21_111': 'v2SuperTeamMembersOfSelfInSync',
  },
  br = { antispamBusinessId: 1 },
  kr = 'V2NIMTeamService',
  Vr = {
    teamId: 1,
    name: 3,
    teamType: { id: 4, retConverter: (e) => (0 == +e ? 1 : +e) },
    ownerAccountId: 5,
    memberLimit: { id: 6, retType: 'number' },
    isValidTeam: {
      id: 8,
      retConverter: (e, t) => 1 == +e && (void 0 === t[13] || 1 == +t[13]),
    },
    memberCount: { id: 9, retType: 'number' },
    memberUpdateTime: { id: 10, retType: 'number' },
    createTime: { id: 11, retType: 'number' },
    updateTime: { id: 12, retType: 'number' },
    intro: 14,
    announcement: 15,
    joinMode: { id: 16, retType: 'number' },
    serverExtension: 18,
    customerExtension: 19,
    avatar: 20,
    agreeMode: { id: 21, retType: 'number' },
    inviteMode: { id: 22, retType: 'number' },
    updateInfoMode: { id: 23, retType: 'number' },
    updateExtensionMode: { id: 24, retType: 'number' },
    chatBannedMode: { id: 101, retType: 'number' },
  },
  Pr = {
    teamId: 1,
    accountId: 3,
    memberRole: { id: 4, retType: 'number' },
    teamNick: 5,
    bits: { id: 7, retType: 'number' },
    inTeam: { id: 9, retType: 'boolean' },
    joinTime: { id: 10, retType: 'number' },
    updateTime: { id: 11, retType: 'number' },
    serverExtension: 12,
    chatBanned: { id: 13, retType: 'boolean' },
    invitorAccountId: 14,
    followAccountIds: {
      id: 16,
      retConverter: (e) => {
        try {
          return JSON.parse(e)
        } catch (e) {
          return []
        }
      },
    },
  },
  Lr = {
    teamId: 1,
    accountId: 3,
    memberRole: { id: 4, retType: 'number' },
    teamNick: 5,
    bits: { id: 7, retType: 'number' },
    inTeam: { id: 9, retType: 'boolean' },
    updateTime: { id: 11, retType: 'number' },
    serverExtension: 12,
    chatBanned: { id: 13, retType: 'boolean' },
    invitorAccountId: 14,
    joinTime: { id: 15, retType: 'number' },
    followAccountIds: {
      id: 17,
      retConverter: (e) => {
        try {
          return JSON.parse(e)
        } catch (e) {
          return []
        }
      },
    },
  },
  Dr = {
    accountIds: { id: 1, converter: (e) => JSON.stringify(e) },
    operation: 2,
  },
  wr = {
    v2TeamCreate: {
      sid: 31,
      cid: 1,
      service: kr,
      params: [
        { type: 'Property', name: 'team', reflectMapper: Vr },
        { type: 'StrArray', name: 'inviteeAccountIds' },
        { type: 'String', name: 'postscript' },
        { type: 'Property', name: 'antispamConfig', reflectMapper: br },
      ],
      response: [
        { type: 'Property', name: 'team', reflectMapper: ft(Vr) },
        { type: 'StrArray', name: 'failedList' },
      ],
    },
    v2SuperTeamCreate: {
      sid: 32,
      cid: 1,
      service: kr,
      params: [
        { type: 'Property', name: 'team', reflectMapper: Vr },
        { type: 'StrArray', name: 'inviteeAccountIds' },
        { type: 'String', name: 'postscript' },
        { type: 'Property', name: 'antispamConfig', reflectMapper: br },
      ],
      response: [
        { type: 'Property', name: 'team', reflectMapper: ft(Vr) },
        { type: 'StrArray', name: 'failedList' },
      ],
    },
    v2TeamInviteMembers: {
      sid: 31,
      cid: 5,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'StrArray', name: 'accounts' },
        { type: 'String', name: 'ps' },
        { type: 'String', name: 'attach' },
      ],
      response: [
        { type: 'Long', name: 'time' },
        { type: 'StrArray', name: 'abortedAccidList' },
      ],
    },
    v2SuperTeamInviteMembers: {
      sid: 32,
      cid: 5,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'StrArray', name: 'accounts' },
        { type: 'String', name: 'ps' },
        { type: 'String', name: 'attach' },
      ],
      response: [
        { type: 'StrArray', name: 'abortedAccidList' },
        { type: 'Long', name: 'time' },
      ],
    },
    v2TeamUpdateInfo: {
      sid: 31,
      cid: 7,
      service: kr,
      params: [
        { type: 'Property', name: 'team', reflectMapper: Vr },
        { type: 'Property', name: 'antispamConfig', reflectMapper: br },
      ],
      response: [
        { type: 'Long', name: 'teamId' },
        { type: 'Long', name: 'timestamp' },
      ],
    },
    v2SuperTeamUpdateInfo: {
      sid: 32,
      cid: 8,
      service: kr,
      params: [
        { type: 'Property', name: 'team', reflectMapper: Vr },
        { type: 'Property', name: 'antispamConfig', reflectMapper: br },
      ],
      response: [{ type: 'Long', name: 'timestamp' }],
    },
    v2TeamLeave: {
      sid: 31,
      cid: 8,
      service: kr,
      params: [{ type: 'Long', name: 'teamId' }],
    },
    v2SuperTeamLeave: {
      sid: 32,
      cid: 7,
      service: kr,
      params: [{ type: 'Long', name: 'teamId' }],
    },
    v2TeamGetInfo: {
      sid: 31,
      cid: 9,
      service: kr,
      params: [{ type: 'Long', name: 'teamId' }],
      response: [{ type: 'Property', name: 'team', reflectMapper: ft(Vr) }],
    },
    v2SuperTeamGetInfo: {
      sid: 32,
      cid: 9,
      service: kr,
      params: [{ type: 'Long', name: 'teamId' }],
      response: [{ type: 'Property', name: 'team', reflectMapper: ft(Vr) }],
    },
    v2TeamGetByIds: {
      sid: 31,
      cid: 34,
      service: kr,
      params: [{ type: 'LongArray', name: 'teamIds' }],
      response: [
        { type: 'PropertyArray', name: 'teams', reflectMapper: ft(Vr) },
        { type: 'LongArray', name: 'tids' },
      ],
    },
    v2SuperTeamGetByIds: {
      sid: 32,
      cid: 36,
      service: kr,
      params: [{ type: 'LongArray', name: 'teamIds' }],
      response: [
        { type: 'PropertyArray', name: 'teams', reflectMapper: ft(Vr) },
        { type: 'LongArray', name: 'tids' },
      ],
    },
    v2TeamDismiss: {
      sid: 31,
      cid: 12,
      service: kr,
      params: [{ type: 'Long', name: 'teamId' }],
    },
    v2SuperTeamDismiss: {
      sid: 32,
      cid: 4,
      service: kr,
      params: [{ type: 'Long', name: 'teamId' }],
    },
    v2TeamAcceptInvitation: {
      sid: 31,
      cid: 21,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'from' },
      ],
      response: [{ type: 'Property', name: 'team', reflectMapper: ft(Vr) }],
    },
    v2SuperTeamAcceptInvitation: {
      sid: 32,
      cid: 23,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'from' },
      ],
      response: [{ type: 'Property', name: 'team', reflectMapper: ft(Vr) }],
    },
    v2TeamRejectInvite: {
      sid: 31,
      cid: 22,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'from' },
        { type: 'String', name: 'ps' },
      ],
    },
    v2SuperTeamRejectInvite: {
      sid: 32,
      cid: 24,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'from' },
        { type: 'String', name: 'ps' },
      ],
    },
    v2TeamKickMembers: {
      sid: 31,
      cid: 6,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'StrArray', name: 'accounts' },
      ],
    },
    v2SuperTeamKickMembers: {
      sid: 32,
      cid: 6,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'StrArray', name: 'accounts' },
      ],
    },
    v2TeamApplyToJoin: {
      sid: 31,
      cid: 13,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'ps' },
      ],
      response: [
        { type: 'Property', name: 'team', reflectMapper: ft(Vr) },
        { type: 'Int', name: 'isInTeam' },
      ],
    },
    v2SuperTeamApplyToJoin: {
      sid: 32,
      cid: 20,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'ps' },
      ],
      response: [
        { type: 'Property', name: 'team', reflectMapper: ft(Vr) },
        { type: 'Int', name: 'isInTeam' },
      ],
    },
    v2TeamAcceptJoinApplication: {
      sid: 31,
      cid: 14,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'from' },
      ],
    },
    v2SuperTeamAcceptJoinApplication: {
      sid: 32,
      cid: 21,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'from' },
      ],
    },
    v2TeamRejectJoinApplication: {
      sid: 31,
      cid: 15,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'from' },
        { type: 'String', name: 'ps' },
      ],
    },
    v2SuperTeamRejectJoinApplication: {
      sid: 32,
      cid: 22,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'from' },
        { type: 'String', name: 'ps' },
      ],
    },
    v2TeamAddManagers: {
      sid: 31,
      cid: 16,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'StrArray', name: 'accounts' },
      ],
    },
    v2SuperTeamAddManagers: {
      sid: 32,
      cid: 26,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'StrArray', name: 'accounts' },
      ],
    },
    v2TeamRemoveManagers: {
      sid: 31,
      cid: 17,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'StrArray', name: 'accounts' },
      ],
    },
    v2SuperTeamRemoveManagers: {
      sid: 32,
      cid: 27,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'StrArray', name: 'accounts' },
      ],
    },
    v2TeamTransferOwner: {
      sid: 31,
      cid: 18,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'account' },
        { type: 'Bool', name: 'leave' },
      ],
    },
    v2SuperTeamTransferOwner: {
      sid: 32,
      cid: 31,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'account' },
        { type: 'Bool', name: 'leave' },
      ],
    },
    v2TeamUpdateSelfMemberInfo: {
      sid: 31,
      cid: 19,
      service: kr,
      params: [
        { type: 'Property', name: 'teamMember', reflectMapper: Pr },
        { type: 'Property', name: 'specialFollowUpdate', reflectMapper: Dr },
        { type: 'Property', name: 'antispam', reflectMapper: br },
      ],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Pr) }],
    },
    v2SuperTeamUpdateSelfMemberInfo: {
      sid: 32,
      cid: 10,
      service: kr,
      params: [
        { type: 'Property', name: 'teamMember', reflectMapper: Lr },
        { type: 'Property', name: 'specialFollowUpdate', reflectMapper: Dr },
        { type: 'Property', name: 'antispam', reflectMapper: br },
      ],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Lr) }],
    },
    v2TeamUpdateMember: {
      sid: 31,
      cid: 20,
      service: kr,
      params: [
        { type: 'Property', name: 'teamMember', reflectMapper: Pr },
        { type: 'Property', name: 'antispam', reflectMapper: br },
      ],
    },
    v2SuperTeamUpdateMember: {
      sid: 32,
      cid: 30,
      service: kr,
      params: [
        { type: 'Property', name: 'teamMember', reflectMapper: Lr },
        { type: 'Property', name: 'antispam', reflectMapper: br },
      ],
    },
    v2TeamGetMemberInvitor: {
      sid: 31,
      cid: 33,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'StrArray', name: 'accounts' },
      ],
      response: [{ type: 'StrStrMap', name: 'accountsMap' }],
    },
    v2SuperTeamGetMemberInvitor: {
      sid: 32,
      cid: 35,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'StrArray', name: 'accounts' },
      ],
      response: [{ type: 'StrStrMap', name: 'accountsMap' }],
    },
    v2TeamMemberSetChatBannedStatus: {
      sid: 31,
      cid: 25,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'String', name: 'accountId' },
        { type: 'Int', name: 'chatBanned' },
      ],
    },
    v2SuperTeamMemberSetChatBannedStatus: {
      sid: 32,
      cid: 29,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'StrArray', name: 'accountId' },
        { type: 'Int', name: 'chatBanned' },
      ],
    },
    v2TeamSetChatBannedMode: {
      sid: 31,
      cid: 32,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'Int', name: 'chatBannedMode' },
      ],
    },
    v2SuperTeamSetChatBannedMode: {
      sid: 32,
      cid: 28,
      service: kr,
      params: [
        { type: 'Long', name: 'teamId' },
        { type: 'Int', name: 'chatBannedMode' },
      ],
    },
    v2TeamMemberGetListByIds: {
      sid: 31,
      cid: 35,
      service: kr,
      params: [{ type: 'StrArray', name: 'tag' }],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Pr) },
      ],
    },
    v2SuperTeamMemberGetListByIds: {
      sid: 32,
      cid: 37,
      service: kr,
      params: [{ type: 'StrArray', name: 'tag' }],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Lr) },
      ],
    },
    v2TeamMemberGetList: {
      sid: 31,
      cid: 36,
      service: kr,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: {
            teamId: 1,
            teamType: 2,
            roleQueryType: 3,
            onlyChatBanned: { id: 4, converter: (e) => +e },
            nextToken: 5,
            limit: 6,
            direction: 7,
          },
        },
      ],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Pr) },
        {
          type: 'Property',
          name: 'pageInfo',
          reflectMapper: { 1: 'hasMore', 2: 'nextToken' },
        },
      ],
    },
    v2TeamSync: {
      sid: 8,
      cid: 109,
      service: kr,
      response: [
        { type: 'Long', name: 'timetag' },
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Vr) },
      ],
    },
    v2TeamCreateMultiSync: {
      sid: 8,
      cid: 101,
      service: kr,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Vr) }],
    },
    v2TeamMemberUpdateMultiSync: {
      sid: 8,
      cid: 119,
      service: kr,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Pr) }],
    },
    v2TeamMembersOfSelfInSync: {
      sid: 8,
      cid: 126,
      service: kr,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Pr) },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2SuperTeamSync: {
      sid: 21,
      cid: 109,
      service: kr,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Vr) },
        { type: 'Bool', name: 'isAll' },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2SuperTeamCreateMultiSync: {
      sid: 21,
      cid: 101,
      service: kr,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Vr) }],
    },
    v2SuperTeamMemberUpdateMultiSync: {
      sid: 21,
      cid: 110,
      service: kr,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Lr) }],
    },
    v2SuperTeamMembersOfSelfInSync: {
      sid: 21,
      cid: 111,
      service: kr,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Lr) },
        { type: 'Long', name: 'timetag' },
      ],
    },
  }
function Ur(e, t) {
  if (!e) return {}
  var i = e
  return (
    i.tinfo &&
      ((i.tinfo = (function (e) {
        return gt(e, ft(Vr))
      })(i.tinfo)),
      (i.tinfo.teamType = t)),
    i.uinfos,
    void 0 !== i.mute && (i.mute = parseInt(i.mute)),
    i
  )
}
function xr(e, t, i = {}) {
  return Object.assign(
    {
      teamId: e,
      teamType: t,
      name: '',
      ownerAccountId: '',
      memberLimit: 0,
      memberCount: 0,
      createTime: 0,
      updateTime: 0,
      intro: '',
      announcement: '',
      avatar: '',
      joinMode: 0,
      agreeMode: 0,
      inviteMode: 0,
      updateInfoMode: 0,
      updateExtensionMode: 0,
      chatBannedMode: 0,
      isValidTeam: !0,
    },
    i
  )
}
function Fr(e, t, i, r = {}) {
  return Object.assign(
    {
      teamId: e,
      teamType: t,
      accountId: i,
      joinTime: 0,
      inTeam: !0,
      memberRole: 0,
      chatBanned: !1,
    },
    r
  )
}
function Br(e, t = 1) {
  return e.map((e) =>
    (function (e, t = 1) {
      return (
        (e.teamType = t),
        (e.chatBanned = void 0 !== e.chatBanned && e.chatBanned),
        e
      )
    })(e, t)
  )
}
function $r(e, t) {
  var i,
    r = Object.assign(Object.assign({}, t), {
      conversationId: e.V2NIMConversationIdUtil.messageConversationId(t),
      isSelf: t.senderId === e.account,
      sendingState: 1,
      messageStatus: {
        errorCode:
          (null === (i = null == t ? void 0 : t.messageStatus) || void 0 === i
            ? void 0
            : i.errorCode) || 200,
      },
    })
  if (
    (r.threadReply &&
      (r.threadReply = Object.assign(Object.assign({}, r.threadReply), {
        conversationType: r.conversationType,
        conversationId: r.conversationId,
      })),
    r.threadRoot &&
      (r.threadRoot = Object.assign(Object.assign({}, r.threadRoot), {
        conversationType: r.conversationType,
        conversationId: r.conversationId,
      })),
    r.isInBlackList &&
      ((r.sendingState = 2),
      (r.messageStatus.errorCode = de.V2NIM_ERROR_CODE_ACCOUNT_IN_BLOCK_LIST),
      delete r.isInBlackList),
    r.streamConfig)
  ) {
    var s = Ve(r.streamConfig, 'isStream')
    if (!1 === s) delete r.streamConfig
    else if (!0 === s && void 0 === r.streamConfig.status)
      delete r.streamConfig,
        t.aiConfig &&
          ((t.aiConfig.aiStream = !0), (t.aiConfig.aiStreamStatus = 0))
    else if ('number' == typeof r.streamConfig.status)
      return (
        (r.streamConfig = { status: r.streamConfig.status }),
        (function (e) {
          if (
            (e.streamConfig &&
              e.aiConfig &&
              ((e.aiConfig.aiStream = !0),
              (e.aiConfig.aiStreamStatus = e.streamConfig.status)),
            e.attachment && e.streamConfig)
          ) {
            var t = e.attachment
            ;(e.streamConfig.lastChunk = {
              content: t.msg,
              messageTime: e.createTime,
              chunkTime: t.timestamp,
              type: t.type,
              index: t.index,
            }),
              e.aiConfig &&
                (e.aiConfig.aiStreamLastChunk = e.streamConfig.lastChunk),
              delete e.attachment
          }
          return e
        })(r)
      )
  }
  return Gr(r, e)
}
function Gr(e, t) {
  return 5 === e.messageType
    ? (function (e, t) {
        var i,
          r,
          s,
          n,
          o,
          a = t.attachment || {}
        if (t.attachment && 'type' in t.attachment) return t
        var c = void 0
        if (null === (i = a.data) || void 0 === i ? void 0 : i.tinfo) {
          var { id: d, data: l } = a,
            p = d > 400 ? 2 : 1,
            { tinfo: h } = Ur(Object.assign({}, l), p)
          ;(c = {}), (c = Ee(h, ['teamId']))
        }
        var u = Object.assign(
          Object.assign(
            Object.assign(
              Object.assign(
                { raw: a.raw, type: Kr(e, a.id) },
                c ? { updatedTeamInfo: c } : {}
              ),
              {
                targetIds:
                  (null === (r = a.data) || void 0 === r ? void 0 : r.ids) ||
                  ((null === (s = a.data) || void 0 === s ? void 0 : s.id)
                    ? [a.data.id]
                    : []),
              }
            ),
            'string' ==
              typeof (null === (n = a.data) || void 0 === n ? void 0 : n.attach)
              ? { serverExtension: a.data.attach }
              : {}
          ),
          'number' ==
            typeof (null === (o = a.data) || void 0 === o ? void 0 : o.mute)
            ? { chatBanned: 0 !== a.data.mute }
            : {}
        )
        return Object.assign(Object.assign({}, t), { attachment: u })
      })(t, e)
    : 100 === e.messageType
    ? (function (e, t) {
        var i, r, s
        if (
          'string' ==
            typeof (null === (i = t.attachment) || void 0 === i
              ? void 0
              : i.raw) &&
          (null ===
            (s =
              null === (r = e.V2NIMMessageService) || void 0 === r
                ? void 0
                : r.customAttachmentParsers) || void 0 === s
            ? void 0
            : s.length) > 0
        ) {
          var n = t.subType || 0,
            o = e.V2NIMMessageService.customAttachmentParsers,
            a = t.attachment.raw
          o.some((i) => {
            try {
              var r = i(n, a)
              if (Se(r)) return (r.raw = a), (t.attachment = r), !0
            } catch (t) {
              return (
                e.logger.warn(
                  `customAttachmentParser: subType ${n}, raw: ${a}. parse error with ${t}`
                ),
                !1
              )
            }
            return !1
          })
        }
        return t
      })(t, e)
    : e
}
function jr(e, t) {
  return Object.assign(Object.assign({}, t), {
    conversationId: e.V2NIMConversationIdUtil.messageConversationId(t),
  })
}
function qr(e, t) {
  var { createTime: i, senderId: r, receiverId: s, conversationType: n } = t
  return {
    conversationType: n,
    conversationId: e.V2NIMConversationIdUtil.messageConversationId({
      conversationType: n,
      senderId: r,
      receiverId: s,
    }),
    senderId: t.senderId,
    receiverId: t.receiverId,
    messageServerId: t.messageServerId,
    createTime: i,
    messageClientId: t.messageClientId,
  }
}
function Hr(e, t) {
  var i = { 7: 1, 8: 2, 12: 3, 13: 1, 14: 2 }[t.sysMsgType]
  return {
    postscript: t.postscript,
    revokeType: { 7: 1, 8: 2, 12: 3, 13: 4, 14: 5 }[t.sysMsgType] || 0,
    revokeAccountId: t.opeAccount || t.senderId,
    callbackExtension: t.callbackExtension,
    serverExtension: t.attach || '',
    messageRefer: {
      conversationType: i,
      conversationId: e.V2NIMConversationIdUtil.messageConversationId(
        Object.assign(Object.assign({}, t), {
          conversationType: i,
          senderId: t.senderId,
          receiverId: t.receiverId,
        })
      ),
      senderId: t.senderId,
      receiverId: t.receiverId,
      messageServerId: t.messageServerId,
      createTime: t.deleteMsgCreatetime,
      messageClientId: t.messageClientId,
    },
  }
}
function Yr(e, t) {
  return {
    conversationId:
      1 === t.conversationType
        ? e.V2NIMConversationIdUtil.p2pConversationId(t.receiverId)
        : 2 === t.conversationType
        ? e.V2NIMConversationIdUtil.teamConversationId(t.teamId)
        : e.V2NIMConversationIdUtil.superTeamConversationId(t.teamId),
    deleteTime: t.deleteTime,
    serverExtension: t.serverExtension,
  }
}
function Kr(e, t) {
  var i = {
    0: 0,
    401: 401,
    1: 1,
    402: 402,
    2: 2,
    403: 403,
    3: 3,
    404: 404,
    4: 4,
    405: 405,
    5: 5,
    410: 410,
    6: 6,
    406: 406,
    7: 7,
    407: 407,
    8: 8,
    408: 408,
    9: 9,
    411: 411,
    10: 10,
    409: 409,
  }
  return (
    void 0 === i[t] &&
      e.logger.warn(`[V2NIMMessageService] undefined notification type: ${t}`),
    'number' == typeof i[t] ? i[t] : -1
  )
}
function Wr(e, t) {
  var i = [],
    r = {}
  for (var s in (t.forEach((e) => {
    var t = e.conversationId
    r[t] || (r[t] = { conversationId: t, messages: [], count: 0 }),
      r[t].messages.push(e),
      r[t].count++
  }),
  r)) {
    var n = r[s]
    i.push(n)
  }
  return i
}
function Jr(e, t) {
  if (!t) return ''
  switch (e) {
    case 100:
      return t.raw || ''
    case 1:
    case 3:
    case 2:
    case 6:
      return (function (e) {
        var t = e,
          {
            width: i,
            height: r,
            duration: s,
            path: n,
            file: o,
            raw: a,
            ctx: c,
            payload: d,
            bucketName: l,
            objectName: p,
            token: h,
            ext: u,
          } = t,
          m = Ee(t, [
            'width',
            'height',
            'duration',
            'path',
            'file',
            'raw',
            'ctx',
            'payload',
            'bucketName',
            'objectName',
            'token',
            'ext',
          ]),
          g = 'string' == typeof u && '.' === u[0] ? u.slice(1) : u
        return JSON.stringify(
          Object.assign(
            Object.assign(
              Object.assign(
                Object.assign(
                  Object.assign({}, m),
                  void 0 === u ? {} : { ext: g }
                ),
                void 0 === i ? {} : { w: i }
              ),
              void 0 === r ? {} : { h: r }
            ),
            void 0 === s ? {} : { dur: s }
          )
        )
      })(t)
    case 4:
      return (function (e) {
        return JSON.stringify({
          lat: e.latitude,
          lng: e.longitude,
          title: e.address,
        })
      })(t)
    case 12:
      return (function (e) {
        var t = Ee(e, ['raw'])
        try {
          return JSON.stringify(
            Object.assign(Object.assign({}, t), {
              durations: e.durations.map((e) => ({
                accid: e.accountId,
                duration: e.duration,
              })),
            })
          )
        } catch (t) {
          return JSON.stringify(e)
        }
      })(t)
    default:
      return t.raw || JSON.stringify(t)
  }
}
class zr {
  constructor(e) {
    this.core = e
  }
  doSendFile(e, t) {
    return Te(this, void 0, void 0, function* () {
      var i = e.attachment
      try {
        var [r, s] = yield this.core.V2NIMStorageService._uploadFile(
            {
              taskId: e.messageClientId,
              uploadParams: {
                fileObj:
                  (null == i ? void 0 : i.file) ||
                  (null == i ? void 0 : i.path),
                sceneName: null == i ? void 0 : i.sceneName,
              },
            },
            t,
            { fileType: e.messageType }
          ),
          n = Object.assign(Object.assign({}, i), { uploadState: 1 })
        void 0 !== s.w && (n.width = n.width || s.w),
          void 0 !== s.h && (n.height = n.height || s.h),
          void 0 !== s.dur && (n.duration = n.duration || s.dur),
          (n.ext = n.ext && -1 === n.ext.indexOf('.') ? `.${n.ext}` : n.ext)
        var o = ['w', 'h', 'dur', 'ext', 'name']
        for (var a in s) o.includes(a) || (n[a] = s[a])
        var { raw: c, file: d, path: l } = n,
          p = Ee(n, ['raw', 'file', 'path'])
        ;(e.attachment = JSON.parse(JSON.stringify(p))),
          e.attachment && (e.attachment.raw = Jr(e.messageType, e.attachment))
      } catch (t) {
        throw (e.attachment && (e.attachment.uploadState = 2), t)
      }
    })
  }
  cancelMessageAttachmentUpload(e) {
    return Te(this, void 0, void 0, function* () {
      if (
        (ye({ messageClientId: { type: 'string', allowEmpty: !1 } }, e, '', !0),
        ![2, 6, 1, 3].includes(e.messageType))
      )
        throw new he({
          code: de.V2NIM_ERROR_CODE_MISUSE,
          detail: {
            reason: `cancelMessageAttachmentUpload: messageType ${e.messageType} incorrect`,
          },
        })
      if (2 === e.sendingState || 1 === e.sendingState)
        throw new he({
          code: de.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST,
          detail: {
            reason:
              'cancelMessageAttachmentUpload: message is already failed or succeeded',
          },
        })
      yield this.core.V2NIMStorageService._cancelUploadFile(e.messageClientId)
    })
  }
}
var Xr = 'V2NIMMessageService',
  Qr = {
    '30_1': 'v2SendP2pMessage',
    '31_2': 'v2SendTeamMessage',
    '30_31': 'v2MessageP2pModify',
    '31_37': 'v2MessageTeamModify',
    '32_38': 'v2MessageSuperTeamModify',
    '7_33': 'v2MessageOnModified',
    '4_27': 'v2MessageSyncModified',
    '4_28': 'v2MessageSuperTeamSyncModified',
    '4_5': 'v2BatchMarkRead',
    '4_12': 'syncP2PMessagReceipts',
    '30_11': 'v2SendP2PMessageReceipt',
    '31_28': 'v2SendTeamMessageReceipts',
    '32_2': 'v2SendSuperTeamMessage',
    '7_12': 'onP2PMessageReceipts',
    '8_31': 'onTeamMessageReceipts',
    '31_29': 'v2GetTeamMessageReceipts',
    '31_30': 'v2GetTeamMessageReceiptDetail',
    '7_2': 'onMsg',
    '8_3': 'onMsg',
    '7_101': 'onMsg',
    '8_102': 'onMsg',
    '21_3': 'onMsg',
    '21_102': 'onMsg',
    '4_4': 'syncOfflineMsgs',
    '4_9': 'syncRoamingMsgs',
    '4_17': 'syncRoamingMsgs',
    '30_13': 'v2RevokeMessage',
    '32_17': 'v2RevokeSuperTeamMessage',
    '7_14': 'onRevokeMessage',
    '7_15': 'syncRevokeMessage',
    '21_18': 'onRevokeMessage',
    '21_117': 'onRevokeMessage',
    '30_23': 'v2DeleteMessage',
    '30_24': 'v2DeleteMessages',
    '4_21': 'syncOnDeleteMessages',
    '7_123': 'onDeleteMessage',
    '7_124': 'onDeleteMessages',
    '29_17': 'v2DownloadLocalAntiSpamVocabs',
  },
  Zr = {
    conversationType: { id: 0, converter: os, retConverter: as },
    receiverId: 1,
    senderId: 2,
    fromClientType: 4,
    fromDeviceId: 5,
    fromNick: 6,
    createTime: { id: 7, retType: 'number' },
    messageType: { id: 8, retType: 'number' },
    text: 9,
    attachment: {
      id: 10,
      converter: (e, t) => Jr(t.messageType, e),
      retConverter: (e, t) =>
        (function (e, t) {
          var i
          try {
            switch (((i = JSON.parse(e)), t)) {
              case 100:
                return { raw: e }
              case 4:
                return (function (e, t) {
                  return {
                    latitude: t.lat,
                    longitude: t.lng,
                    address: t.title,
                    raw: e,
                  }
                })(e, i)
              case 2:
              case 3:
              case 1:
              case 6:
                return (function (e, t) {
                  var { w: i, h: r, dur: s, ext: n } = t,
                    o = Ee(t, ['w', 'h', 'dur', 'ext']),
                    a = 'string' == typeof n && '.' !== n[0] ? `.${n}` : n
                  return Object.assign(
                    Object.assign(
                      Object.assign(
                        Object.assign(
                          Object.assign(
                            Object.assign({}, o),
                            void 0 === n ? {} : { ext: a }
                          ),
                          void 0 === i ? {} : { width: i }
                        ),
                        void 0 === r ? {} : { height: r }
                      ),
                      void 0 === s ? {} : { duration: s }
                    ),
                    { raw: e }
                  )
                })(e, i)
              case 12:
                return (function (e, t) {
                  return Object.assign(Object.assign({}, t), {
                    durations: t.durations.map((e) => ({
                      accountId: e.accid,
                      duration: e.duration,
                    })),
                    raw: e,
                  })
                })(e, i)
              default:
                return 'object' == typeof i && i
                  ? Object.assign(Object.assign({}, i), { raw: e })
                  : { raw: e }
            }
          } catch (t) {
            return 'object' == typeof i && i
              ? Object.assign(Object.assign({}, i), { raw: e })
              : { raw: e }
          }
        })(e, Number(t[8])),
    },
    messageClientId: 11,
    messageServerId: 12,
    resend: { id: 13, converter: yt, retType: 'boolean' },
    userUpdateTime: { id: 14, retType: 'number' },
    serverExtension: 15,
    pushPayload: { id: 16, access: 'pushConfig.pushPayload' },
    pushContent: { id: 17, access: 'pushConfig.pushContent' },
    forcePushAccountIds: {
      id: 18,
      access: 'pushConfig.forcePushAccountIds',
      def: (e) => {
        if (e['pushConfig.forcePush']) return '#%@all@%#'
      },
      converter: (e, t) => {
        if (t['pushConfig.forcePush'])
          return e ? JSON.stringify(e) : '#%@all@%#'
      },
      retConverter(e) {
        if ('#%@all@%#' !== e && e)
          try {
            return JSON.parse(e)
          } catch (e) {
            return []
          }
      },
    },
    forcePushContent: { id: 19, access: 'pushConfig.forcePushContent' },
    forcePush: {
      id: 20,
      access: 'pushConfig.forcePush',
      converter: yt,
      retType: 'boolean',
    },
    antispamCustomMessageEnabled: {
      id: 21,
      def: (e) => (Ve(e, 'antispamConfig.antispamCustomMessage') ? 1 : void 0),
      retConverter: () => {},
    },
    antispamCustomMessage: {
      id: 22,
      access: 'antispamConfig.antispamCustomMessage',
    },
    antispamBusinessId: { id: 23, access: 'antispamConfig.antispamBusinessId' },
    clientAntispamHit: {
      id: 24,
      access: 'clientAntispamHit',
      converter: yt,
      retType: 'boolean',
    },
    antispamEnabled: {
      id: 25,
      access: 'antispamConfig.antispamEnabled',
      converter: yt,
      retType: 'boolean',
    },
    needAck: {
      id: 26,
      access: 'messageConfig.readReceiptEnabled',
      converter: yt,
      retType: 'boolean',
    },
    lastMessageUpdateEnabled: {
      id: 28,
      access: 'messageConfig.lastMessageUpdateEnabled',
      converter: yt,
      retType: 'boolean',
    },
    threadReplySenderId: { id: 29, access: 'threadReply.senderId' },
    threadReplyReceiverId: { id: 30, access: 'threadReply.receiverId' },
    threadReplyTime: {
      id: 31,
      access: 'threadReply.createTime',
      retType: 'number',
    },
    threadReplyServerId: { id: 32, access: 'threadReply.messageServerId' },
    threadReplyClientId: { id: 33, access: 'threadReply.messageClientId' },
    threadRootSenderId: { id: 34, access: 'threadRoot.senderId' },
    threadRootReceiverId: { id: 35, access: 'threadRoot.receiverId' },
    threadRootTime: {
      id: 36,
      access: 'threadRoot.createTime',
      retType: 'number',
    },
    threadRootServerId: { id: 37, access: 'threadRoot.messageServerId' },
    threadRootClientId: { id: 38, access: 'threadRoot.messageClientId' },
    isDeleted: { id: 39, converter: yt, retType: 'boolean' },
    callbackExtension: 40,
    subType: { id: 41, retType: 'number' },
    antispamCheating: { id: 42, access: 'antispamConfig.antispamCheating' },
    routeEnvironment: { id: 43, access: 'routeConfig.routeEnvironment' },
    antispamExtension: { id: 44, access: 'antispamConfig.antispamExtension' },
    antispamResult: 45,
    __clientExt: { id: 46, converter: Mt, retConverter: _t },
    robotFunction: { id: 47, access: 'robotConfig.function' },
    robotTopic: { id: 48, access: 'robotConfig.topic' },
    robotCustomContent: { id: 49, access: 'robotConfig.customContent' },
    robotAccount: { id: 50, access: 'robotConfig.accountId' },
    _conversationOnlineSyncNotify: { id: 51 },
    _conversationOnlineSyncData: { id: 52 },
    aiAgentMsgDirection: {
      id: 55,
      access: 'aiConfig.aiStatus',
      retAccess: 'aiConfig.aiStatus',
      retType: 'number',
    },
    aiAgentAccount: {
      id: 56,
      access: 'aiConfig.accountId',
      retAccess: 'aiConfig.accountId',
    },
    aiAgentContent: {
      id: 57,
      access: 'aiConfig.content',
      converter: Mt,
      retConverter: xe,
    },
    aiAgentMessages: {
      id: 58,
      access: 'aiConfig.messages',
      converter: Mt,
      retConverter: xe,
    },
    aiAgentPromptVariables: {
      id: 59,
      access: 'aiConfig.promptVariables',
      retConverter: xe,
    },
    aiAgentModelConfigParams: {
      id: 60,
      access: 'aiConfig.modelConfigParams',
      converter: Mt,
      retConverter: xe,
    },
    errorCode: {
      id: 61,
      access: 'messageStatus.errorCode',
      converter: xe,
      retType: 'number',
    },
    modifyTime: { id: 62, retType: 'number' },
    modifyAccountId: 63,
    aiStream: {
      id: 65,
      access: 'aiConfig.aiStream',
      retAccess: 'streamConfig.isStream',
      converter: yt,
      retConverter: It,
    },
    aiRAGs: {
      id: 66,
      access: 'aiConfig.aiRAGs',
      retConverter: function (e) {
        try {
          var t = JSON.parse(e)
          return t && t.length > 0
            ? t.map((e) => ((e.description = e.desc), delete e.desc, e))
            : []
        } catch (e) {
          return []
        }
      },
    },
    aiStreamStatus: {
      id: 67,
      access: 'streamConfig.status',
      retType: 'number',
    },
    historyEnabled: {
      id: 100,
      access: 'messageConfig.historyEnabled',
      converter: yt,
      retType: 'boolean',
    },
    roamingEnabled: {
      id: 101,
      access: 'messageConfig.roamingEnabled',
      converter: yt,
      retType: 'boolean',
    },
    onlineSyncEnabled: {
      id: 102,
      access: 'messageConfig.onlineSyncEnabled',
      converter: yt,
      retType: 'boolean',
    },
    routeEnabled: {
      id: 105,
      access: 'routeConfig.routeEnabled',
      converter: yt,
      retType: 'boolean',
    },
    isInBlackList: {
      id: 106,
      access: 'isInBlackList',
      converter: yt,
      retType: 'boolean',
    },
    pushEnable: {
      id: 107,
      access: 'pushConfig.pushEnabled',
      converter: yt,
      retType: 'boolean',
    },
    offlineEnabled: {
      id: 108,
      access: 'messageConfig.offlineEnabled',
      converter: yt,
      retType: 'boolean',
    },
    unreadEnabled: {
      id: 109,
      access: 'messageConfig.unreadEnabled',
      converter: yt,
      retType: 'boolean',
    },
    pushNickEnabled: {
      id: 110,
      access: 'pushConfig.pushNickEnabled',
      converter: yt,
      retType: 'boolean',
    },
    msgAckSnapshot: { id: 112, retType: 'number' },
    receiverIds: {
      id: 154,
      access: 'targetConfig.receiverIds',
      converter: Mt,
      retConverter: () => {},
    },
    inclusive: {
      id: 155,
      access: 'targetConfig.inclusive',
      converter: (e) => (e ? 1 : 2),
      retConverter: () => {},
    },
    newMemberVisible: {
      id: 156,
      access: 'targetConfig.newMemberVisible',
      converter: (e) => (e ? 1 : 2),
      retConverter: () => {},
    },
  },
  es = ft(Zr),
  ts = {
    conversationType: {
      id: 1,
      access: 'messageRefer.conversationType',
      retType: 'number',
    },
    senderId: { id: 2, access: 'messageRefer.senderId' },
    receiverId: { id: 3, access: 'messageRefer.receiverId' },
    messageServerId: { id: 4, access: 'messageRefer.messageServerId' },
    messageClientId: { id: 5, access: 'messageRefer.messageClientId' },
    createTime: { id: 6, access: 'messageRefer.createTime', retType: 'number' },
    deleteTime: { id: 7, retType: 'number' },
    serverExtension: 8,
  }
ft(ts)
var is = { version: 1, md5: 2, nosurl: 3, thesaurus: 4 },
  rs = {
    createTime: { id: 0, retType: 'number' },
    sysMsgType: 1,
    receiverId: 2,
    senderId: 3,
    postscript: 4,
    attach: 5,
    pushContent: 8,
    pushPayload: 9,
    messageClientId: 10,
    messageServerId: 11,
    deleteMsgCreatetime: { id: 14, retType: 'number' },
    opeAccount: 16,
    env: 21,
    callbackExtension: 22,
  },
  ss = {
    receiverId: 0,
    messageServerId: 1,
    readCount: { id: 100, retType: 'number' },
    unreadCount: { id: 101, retType: 'number' },
    messageClientId: 102,
    latestReadAccount: 103,
  },
  ns = {
    v2BatchMarkRead: {
      sid: 4,
      cid: 5,
      service: Xr,
      hasPacketResponse: !1,
      params: [
        { type: 'Byte', name: 'sid' },
        { type: 'Byte', name: 'cid' },
        { type: 'LongArray', name: 'ids' },
      ],
    },
    v2SendP2pMessage: {
      sid: 30,
      cid: 1,
      service: Xr,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Zr }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Zr) }],
    },
    onMsg: {
      sid: 7,
      cid: 2,
      service: Xr,
      response: [{ type: 'Property', name: 'msg', reflectMapper: ft(Zr) }],
    },
    syncOfflineMsgs: {
      sid: 4,
      cid: 4,
      service: Xr,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Zr) },
      ],
    },
    syncRoamingMsgs: {
      sid: 4,
      cid: 9,
      service: Xr,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Zr) },
      ],
    },
    v2SendP2PMessageReceipt: {
      sid: 30,
      cid: 11,
      service: Xr,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Zr }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Zr) }],
    },
    v2RevokeMessage: {
      sid: 30,
      cid: 13,
      service: Xr,
      params: [{ type: 'Property', name: 'tag', reflectMapper: rs }],
    },
    v2DeleteMessage: {
      sid: 30,
      cid: 23,
      service: Xr,
      params: [{ type: 'Property', name: 'tag', reflectMapper: ts }],
      response: [{ type: 'Long', name: 'timetag' }],
    },
    v2DeleteMessages: {
      sid: 30,
      cid: 24,
      service: Xr,
      params: [{ type: 'PropertyArray', name: 'tag', reflectMapper: ts }],
      response: [{ type: 'Long', name: 'timetag' }],
    },
    v2SendTeamMessage: {
      sid: 31,
      cid: 2,
      service: Xr,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Zr }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Zr) }],
    },
    v2SendTeamMessageReceipts: {
      sid: 31,
      cid: 28,
      service: Xr,
      params: [{ type: 'PropertyArray', name: 'tag', reflectMapper: ss }],
      response: [{ type: 'PropertyArray', name: 'tag', reflectMapper: ft(ss) }],
    },
    v2SendSuperTeamMessage: {
      sid: 32,
      cid: 2,
      service: Xr,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Zr }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Zr) }],
    },
    v2RevokeSuperTeamMessage: {
      sid: 32,
      cid: 17,
      service: Xr,
      params: [{ type: 'Property', name: 'tag', reflectMapper: rs }],
    },
    syncP2PMessagReceipts: {
      sid: 4,
      cid: 12,
      service: Xr,
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(Zr) },
      ],
    },
    onP2PMessageReceipts: {
      sid: 7,
      cid: 12,
      service: Xr,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Zr) }],
    },
    v2GetTeamMessageReceipts: {
      sid: 31,
      cid: 29,
      service: Xr,
      params: [{ type: 'PropertyArray', name: 'tag', reflectMapper: ss }],
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(ss) },
      ],
    },
    v2GetTeamMessageReceiptDetail: {
      sid: 31,
      cid: 30,
      service: Xr,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: ss,
          select: ['receiverId', 'messageServerId'],
        },
      ],
      response: [
        { type: 'Property', name: 'data', reflectMapper: ft(ss) },
        { type: 'StrArray', name: 'readAccountList' },
        { type: 'StrArray', name: 'unreadAccountList' },
      ],
    },
    onTeamMessageReceipts: {
      sid: 8,
      cid: 31,
      service: Xr,
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(ss) },
      ],
    },
    onRevokeMessage: {
      sid: 7,
      cid: 14,
      service: Xr,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(rs) }],
    },
    syncRevokeMessage: {
      sid: 7,
      cid: 15,
      service: Xr,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(rs) },
      ],
    },
    syncOnDeleteMessages: {
      sid: 4,
      cid: 21,
      service: Xr,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(ts) },
      ],
    },
    onDeleteMessage: {
      sid: 7,
      cid: 123,
      service: Xr,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(ts) }],
    },
    onDeleteMessages: {
      sid: 7,
      cid: 124,
      service: Xr,
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(ts) },
      ],
    },
    v2DownloadLocalAntiSpamVocabs: {
      sid: 29,
      cid: 17,
      service: Xr,
      params: [{ type: 'Property', name: 'tag', reflectMapper: is }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(is) }],
    },
    v2MessageP2pModify: {
      sid: 30,
      cid: 31,
      service: Xr,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Zr }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Zr) }],
    },
    v2MessageTeamModify: {
      sid: 31,
      cid: 37,
      service: Xr,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Zr }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Zr) }],
    },
    v2MessageSuperTeamModify: {
      sid: 32,
      cid: 38,
      service: Xr,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Zr }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Zr) }],
    },
    v2MessageOnModified: {
      sid: 7,
      cid: 33,
      service: Xr,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Zr) }],
    },
    v2MessageSyncModified: {
      sid: 4,
      cid: 27,
      service: Xr,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Zr) },
        { type: 'Long', name: 'time' },
      ],
    },
    v2MessageSuperTeamSyncModified: {
      sid: 4,
      cid: 28,
      service: Xr,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Zr) },
        { type: 'Long', name: 'time' },
      ],
    },
  }
function os(e) {
  return 1 === e ? 0 : 2 === e ? 1 : 3 === e ? 5 : void 0
}
function as(e) {
  var t = parseInt(e)
  return 0 === t ? 1 : 1 === t ? 2 : 5 === t ? 3 : 0
}
var cs = 'V2NIMNotificationService',
  ds = {
    '30_7': 'v2SendCustomNotification',
    '32_16': 'v2SendCustomNotificationWithSuperTeam',
    '7_3': 'onSysNotification',
    '21_19': 'onSysNotification',
    '4_6': 'v2SyncOfflineSysNotifications',
    '4_18': 'v2SyncOfflineSysNotifications',
    '7_14': 'v2NotificationRevoke',
    '21_18': 'v2NotificationRevoke',
    '21_117': 'v2NotificationRevoke',
    '4_19': 'v2NotificationSyncRevoke',
    '7_15': 'v2NotificationSyncRevoke',
    '4_16': 'syncBroadcastMsg',
    '7_17': 'onBroadcastMsg',
  },
  ls = {
    timestamp: { id: 0, retType: 'number' },
    type: { id: 1, retType: 'number' },
    receiverId: 2,
    senderId: 3,
    postscript: 4,
    content: 5,
    idServer: 6,
    offlineEnabled: {
      id: 7,
      converter: yt,
      retConverter: function (e, t) {
        return '0' !== t[6] && !!parseInt(e)
      },
      access: 'notificationConfig.offlineEnabled',
    },
    pushContent: { id: 8, access: 'pushConfig.pushContent' },
    pushPayload: { id: 9, access: 'pushConfig.pushPayload' },
    deletedIdClient: 10,
    deletedIdServer: 11,
    antispamEnabled: {
      id: 12,
      converter: yt,
      retType: 'boolean',
      access: 'antispamConfig.antispamEnabled',
    },
    antispamCustomNotification: {
      id: 13,
      access: 'antispamConfig.antispamCustomNotification',
    },
    deletedMsgCreateTime: 14,
    deletedMsgFromNick: 15,
    opeAccount: 16,
    forcePushAccountIds: {
      id: 18,
      access: 'pushConfig.forcePushAccountIds',
      def: (e) => {
        if (101 === e.type && e['pushConfig.forcePush']) return '#%@all@%#'
      },
      converter: (e, t) => {
        if (t['pushConfig.forcePush'])
          return e ? JSON.stringify(e) : '#%@all@%#'
      },
      retConverter(e) {
        if ('#%@all@%#' !== e && e)
          try {
            return JSON.parse(e)
          } catch (e) {
            return []
          }
      },
    },
    forcePushContent: { id: 19, access: 'pushConfig.forcePushContent' },
    forcePush: {
      id: 20,
      converter: yt,
      retType: 'boolean',
      access: 'pushConfig.forcePush',
    },
    routeEnvironment: { id: 21, access: 'routeConfig.routeEnvironment' },
    callbackExt: 22,
    clientNotificationId: {
      id: 23,
      access: 'notificationConfig.clientNotificationId',
    },
    conversationOnlineSyncNotify: 24,
    conversationOnlineSyncData: 25,
    routeEnabled: {
      id: 105,
      converter: yt,
      retType: 'boolean',
      access: 'routeConfig.routeEnabled',
    },
    pushEnabled: {
      id: 107,
      converter: yt,
      retType: 'boolean',
      access: 'pushConfig.pushEnabled',
    },
    unreadEnabled: {
      id: 109,
      converter: yt,
      retType: 'boolean',
      access: 'notificationConfig.unreadEnabled',
    },
    pushNickEnabled: {
      id: 110,
      converter: yt,
      retType: 'boolean',
      access: 'pushConfig.pushNickEnabled',
    },
  },
  ps = {
    id: 1,
    senderId: 2,
    timestamp: { id: 4, retType: 'number' },
    content: 5,
  },
  hs = {
    v2SendCustomNotification: {
      sid: 30,
      cid: 7,
      service: cs,
      params: [{ type: 'Property', name: 'tag', reflectMapper: ls }],
    },
    v2SendCustomNotificationWithSuperTeam: {
      sid: 32,
      cid: 16,
      service: cs,
      params: [{ type: 'Property', name: 'tag', reflectMapper: ls }],
    },
    onSysNotification: {
      sid: 7,
      cid: 3,
      service: cs,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(ls) }],
    },
    syncBroadcastMsg: {
      sid: 4,
      cid: 16,
      service: cs,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(ps) },
      ],
    },
    onBroadcastMsg: {
      sid: 7,
      cid: 17,
      service: cs,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(ps) }],
    },
    v2SyncOfflineSysNotifications: {
      sid: 4,
      cid: 9,
      service: cs,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(ls) },
      ],
    },
    v2NotificationRevoke: {
      sid: 7,
      cid: 14,
      service: cs,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(ls) }],
    },
    v2NotificationSyncRevoke: {
      sid: 7,
      cid: 15,
      service: cs,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(ls) },
        { type: 'Long', name: 'timetag' },
        { type: 'Byte', name: 'type' },
      ],
    },
  },
  us = {
    '4_5': 'ysfBatchMarkRead',
    '101_1': 'ysfSendMessage',
    '101_2': 'ysfOnMsg',
    '4_100': 'ysfSyncOfflineMsgs',
    '101_3': 'ysfOnSysNotification',
    '101_7': 'ysfSendCustomNotification',
    '4_101': 'ysfSyncSysNotification',
  },
  ms = {
    ysfBatchMarkRead: {
      sid: 4,
      cid: 5,
      service: 'YSFService',
      hasPacketResponse: !1,
      params: [
        { type: 'Byte', name: 'sid' },
        { type: 'Byte', name: 'cid' },
        { type: 'LongArray', name: 'ids' },
      ],
    },
    ysfSendMessage: {
      sid: 101,
      cid: 1,
      service: 'YSFService',
      params: [{ type: 'Property', name: 'tag', reflectMapper: Zr }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Zr) }],
    },
    ysfOnMsg: {
      sid: 101,
      cid: 2,
      service: 'YSFService',
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Zr) }],
    },
    ysfSyncOfflineMsgs: {
      sid: 4,
      cid: 100,
      service: 'YSFService',
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Zr) },
      ],
    },
    ysfOnSysNotification: {
      sid: 101,
      cid: 3,
      service: 'YSFService',
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(ls) }],
    },
    ysfSendCustomNotification: {
      sid: 101,
      cid: 7,
      service: 'YSFService',
      params: [{ type: 'Property', name: 'tag', reflectMapper: ls }],
    },
    ysfSyncSysNotification: {
      sid: 4,
      cid: 101,
      service: 'YSFService',
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(ls) },
      ],
    },
  },
  gs = {
    content: { type: 'string', allowEmpty: !1 },
    params: {
      type: 'object',
      required: !1,
      rules: {
        notificationConfig: {
          type: 'object',
          required: !1,
          rules: {
            offlineEnabled: { type: 'boolean', required: !1 },
            unreadEnabled: { type: 'boolean', required: !1 },
          },
        },
        pushConfig: {
          type: 'object',
          required: !1,
          rules: {
            pushEnabled: { type: 'boolean', required: !1 },
            pushNickEnabled: { type: 'boolean', required: !1 },
            pushContent: { type: 'string', required: !1 },
            pushPayload: { type: 'string', required: !1 },
            forcePush: { type: 'boolean', required: !1 },
            forcePushContent: { type: 'string', required: !1 },
            forcePushAccountIds: {
              type: 'array',
              required: !1,
              itemType: 'string',
            },
          },
        },
        antispamConfig: {
          type: 'object',
          required: !1,
          rules: {
            antispamEnabled: { type: 'boolean', required: !1 },
            antispamCustomNotification: { type: 'string', required: !1 },
          },
        },
        routeConfig: {
          type: 'object',
          required: !1,
          rules: {
            routeEnabled: { type: 'boolean', required: !1 },
            routeEnvironment: { type: 'string', required: !1 },
          },
        },
      },
    },
  }
class vs {
  constructor(e) {
    this.core = e
  }
  generateNotificationTag(e, t, i = {}) {
    var r = this.core.V2NIMConversationIdUtil.parseConversationType(e),
      s = this.core.V2NIMConversationIdUtil.parseConversationTargetId(e),
      n = Date.now()
    return Object.assign(Object.assign({}, i), {
      notificationConfig: Object.assign(
        { unreadEnabled: !0, offlineEnabled: !0 },
        null == i ? void 0 : i.notificationConfig
      ),
      pushConfig: Object.assign(
        { pushEnabled: !0, pushNickEnabled: !0 },
        null == i ? void 0 : i.pushConfig
      ),
      antispamConfig: Object.assign(
        { antispamEnabled: !0 },
        null == i ? void 0 : i.antispamConfig
      ),
      routeConfig: Object.assign(
        { routeEnabled: !0 },
        null == i ? void 0 : i.routeConfig
      ),
      timestamp: n,
      type: { 1: 100, 2: 101, 3: 103 }[r],
      receiverId: s,
      content: t,
    })
  }
}
function fs(e) {
  var t = 'object' == typeof e ? e : void 0,
    i = 'string' == typeof e ? e : void 0
  if (!t && !i)
    throw new he({
      code: de.V2NIM_ERROR_CODE_MISUSE,
      detail: { reason: 'getFileOrPath::incorrect file and path' },
    })
  if ('string' == typeof i)
    if (0 === i.indexOf('nim-external')) {
      var r = document.getElementById(i)
      if (!(r && r.files && r.files[0]))
        throw new he({
          code: de.V2NIM_ERROR_CODE_FILE_NOT_FOUND,
          detail: { reason: `getFileOrPath::file not exist: ${i}` },
        })
      t = r.files[0]
    } else if ('BROWSER' === Ae.platform)
      throw new he({
        code: de.V2NIM_ERROR_CODE_MISUSE,
        detail: { reason: `getFileOrPath::incorrect path: ${i}` },
      })
  if ('object' == typeof t && void 0 === t.size)
    throw new he({
      code: de.V2NIM_ERROR_CODE_MISUSE,
      detail: { reason: 'getFileOrPath::file no size' },
    })
  return { file: t, path: i }
}
var ys = {
  attachment: {
    type: 'object',
    rules: { url: { type: 'string', allowEmpty: !1 } },
  },
  thumbSize: {
    type: 'object',
    rules: {
      width: { type: 'number', required: !1, min: 0 },
      height: { type: 'number', required: !1, min: 0 },
    },
  },
}
class Is extends ni {
  constructor(e) {
    super('V2NIMStorageUtil', e), (this.core = e)
  }
  imageThumbUrl(e, t) {
    return e + `?imageView&thumbnail=${t}z${t}`
  }
  videoCoverUrl(e, t) {
    return e + `?vframe&offset=${t}`
  }
  getImageThumbUrl(e, t) {
    return Te(this, void 0, void 0, function* () {
      this.checkV2()
      var i = e
      ye(ys, { attachment: i, thumbSize: t }, '', !0),
        (t.width = t.width || 0),
        (t.height = t.height || 0),
        0 === t.width && 0 === t.height && (t.width = 150)
      var r = i.url
      try {
        r = yield this.core.V2NIMStorageService.shortUrlToLong(i.url)
      } catch (e) {
        this.core.logger.warn('shortUrlToLong error:', e)
      }
      return { url: this.core.cloudStorage.getThumbUrl(r, t) }
    })
  }
  getVideoCoverUrl(e, t) {
    return Te(this, void 0, void 0, function* () {
      this.checkV2()
      var i = e
      ye(ys, { attachment: i, thumbSize: t }, '', !0),
        (t.width = t.width || 0),
        (t.height = t.height || 0),
        0 === t.width && 0 === t.height && (t.width = 150)
      var r = i.url
      try {
        r = yield this.core.V2NIMStorageService.shortUrlToLong(i.url)
      } catch (e) {
        this.core.logger.warn('shortUrlToLong error:', e)
      }
      return { url: this.core.cloudStorage.getVideoCoverUrl(r, t) }
    })
  }
}
var Ms,
  _s,
  Es = {
    file: { md5: '$(Etag)', size: '$(ObjectSize)' },
    image: {
      md5: '$(Etag)',
      size: '$(ObjectSize)',
      w: '$(ImageInfo.Width)',
      h: '$(ImageInfo.Height)',
      orientation: '$(ImageInfo.Orientation)',
    },
    audio: {
      md5: '$(Etag)',
      size: '$(ObjectSize)',
      dur: '$(AVinfo.Audio.Duration)',
    },
    video: {
      md5: '$(Etag)',
      size: '$(ObjectSize)',
      dur: '$(AVinfo.Video.Duration)',
      w: '$(AVinfo.Video.Width)',
      h: '$(AVinfo.Video.Height)',
    },
  },
  Ts = {
    accessKeyId: '',
    secretAccessKey: '',
    sessionToken: '',
    region: '',
    maxRetries: 0,
    bucket: '',
    objectName: '',
    token: '',
    shortUrl: '',
  }
function Ss(e = 'file') {
  var t = Es[e] || {}
  return JSON.stringify(t).replace(/"/gi, '\\"')
}
!(function (e) {
  ;(e[(e.nos = 1)] = 'nos'), (e[(e.s3 = 2)] = 's3')
})(Ms || (Ms = {})),
  (function (e) {
    ;(e[(e.dontNeed = -1)] = 'dontNeed'),
      (e[(e.time = 2)] = 'time'),
      (e[(e.urls = 3)] = 'urls')
  })(_s || (_s = {}))
var Cs = {
  chunkUploadHost: 'https://wannos-web.127.net',
  chunkUploadHostBackupList: [
    'https://fileup.chatnos.com',
    'https://oss.chatnos.com',
  ],
  commonUploadHost: 'https://fileup.chatnos.com',
  commonUploadHostBackupList: ['https://oss.chatnos.com'],
  chunkMaxSize: 4194304e4,
  commonMaxSize: 104857600,
  uploadReplaceFormat: 'https://{host}/{object}',
  cdn: {
    defaultCdnDomain: 'nim-nosdn.netease.im',
    cdnDomain: '',
    bucket: '',
    objectNamePrefix: '',
  },
  downloadUrl: 'https://{bucket}-nosdn.netease.im/{object}',
  downloadHostList: ['nos.netease.com'],
  nosCdnEnable: !0,
  isNeedToGetUploadPolicyFromServer: !0,
}
function Ns(e, t) {
  ;(e = e || {}), (t = t || (() => !0))
  var i = {}
  for (var r in e) t(e[r]) && (i[r] = e[r])
  return i
}
class As {
  constructor(e, t) {
    ;(this.nosCdnHostTimer = 0),
      (this.nosErrorCount = 0),
      (this.core = e),
      (this.cloudStorage = t)
  }
  get config() {
    return this.cloudStorage.config
  }
  reset() {
    this.nosErrorCount = 0
  }
  getNosAccessToken(e) {
    return Te(this, void 0, void 0, function* () {
      var t = Ve(
          yield this.core.sendCmd('getNosAccessToken', { tag: e }),
          'content.nosAccessTokenTag.token'
        ),
        i = e.url
      return {
        token: t,
        url: -1 !== i.indexOf('?') ? i + '&token=' + t : i + '?token=' + t,
      }
    })
  }
  deleteNosAccessToken(e) {
    return Te(this, void 0, void 0, function* () {
      yield this.core.sendCmd('deleteNosAccessToken', { tag: e })
    })
  }
  nosUpload(e, t) {
    var i, r, s, n, o, a, c, d
    return Te(this, void 0, void 0, function* () {
      var l = Ve(this.core, 'config.cdn.bucket'),
        p = { tag: e.nosScenes || l || 'nim' }
      e.nosSurvivalTime && (p.expireSec = e.nosSurvivalTime)
      var h,
        u = this.core.adapters.getFileUploadInformation(e)
      if (!t && !u)
        try {
          h = yield this.core.sendCmd('getNosToken', {
            responseBody: Ss(e.type),
            nosToken: p,
          })
        } catch (e) {
          if (
            (this.core.logger.error('uploadFile:: getNosToken error', e),
            e instanceof he)
          )
            throw e
          throw new ge({
            code:
              'v2' === Ve(this.core, 'options.apiVersion')
                ? de.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED
                : 400,
            detail: {
              reason: 'getNosToken error',
              rawError: e,
              curProvider: 1,
            },
          })
        }
      var m = this.config.uploadReplaceFormat
          .replace(
            '{host}',
            this.config.cdn.cdnDomain || this.config.cdn.defaultCdnDomain
          )
          .replace(
            '{object}',
            u
              ? null === (i = u.uploadInfo) || void 0 === i
                ? void 0
                : i.objectName
              : t
              ? null == t
                ? void 0
                : t.objectName
              : h.content.nosToken.objectName
          ),
        g = ''
      t && t.shortUrl && (g = t.shortUrl),
        (null ===
          (n =
            null ===
              (s =
                null === (r = null == u ? void 0 : u.uploadInfo) || void 0 === r
                  ? void 0
                  : r.payload) || void 0 === s
              ? void 0
              : s.mixStoreToken) || void 0 === n
          ? void 0
          : n.shortUrl) && (g = u.uploadInfo.payload.mixStoreToken.shortUrl)
      var v,
        f = g || m
      try {
        var y = u
          ? {
              token:
                null === (o = null == u ? void 0 : u.uploadInfo) || void 0 === o
                  ? void 0
                  : o.token,
              bucket:
                null === (a = null == u ? void 0 : u.uploadInfo) || void 0 === a
                  ? void 0
                  : a.bucketName,
              objectName:
                null === (c = null == u ? void 0 : u.uploadInfo) || void 0 === c
                  ? void 0
                  : c.objectName,
            }
          : t || h.content.nosToken
        this.core.logger.log('uploadFile:: uploadFile params', {
          nosToken: y,
          chunkUploadHost: this.config.chunkUploadHost,
          chunkUploadHostBackupList: this.config.chunkUploadHostBackupList,
          commonUploadHost: this.config.commonUploadHost,
          commonUploadHostBackupList: this.config.commonUploadHostBackupList,
          platform: Ae.platform,
        })
        var I =
          'BROWSER' === Ae.platform
            ? this.config.chunkUploadHost
            : `${this.config.commonUploadHost}/${y && y.bucket}`
        this.core.reporterHookCloudStorage.update({
          remote_addr: I,
          operation_type: t ? 2 : 0,
        }),
          (v = yield this.core.adapters.uploadFile(
            Object.assign(
              Object.assign(Object.assign({}, e), {
                nosToken: y,
                chunkUploadHost: this.config.chunkUploadHost,
                chunkUploadHostBackupList:
                  this.config.chunkUploadHostBackupList,
                commonUploadHost: this.config.commonUploadHost,
                commonUploadHostBackupList:
                  this.config.commonUploadHostBackupList,
                maxSize: e.maxSize || this.config.chunkMaxSize,
              }),
              t ? { payload: { mixStoreToken: t } } : {}
            )
          ))
      } catch (i) {
        this.core.logger.error('uploadFile::nos uploadFile error:', i)
        var M = 'v2' === Ve(this.core, 'options.apiVersion')
        if (i.code === de.V2NIM_ERROR_CODE_CANCELLED || 10499 === i.errCode)
          throw new ge({
            code: M ? de.V2NIM_ERROR_CODE_CANCELLED : 400,
            detail: {
              reason: Ve(i, 'message') || 'Request abort',
              rawError: i,
              curProvider: 1,
            },
          })
        if (M && i.errCode === de.V2NIM_ERROR_CODE_FILE_OPEN_FAILED)
          throw new he({
            code: de.V2NIM_ERROR_CODE_FILE_OPEN_FAILED,
            detail: {
              reason: Ve(i, 'message') || 'Read file failed',
              rawError: i,
              curProvider: 1,
            },
          })
        var { net_connect: _ } = yield Ae.net.getNetworkStatus()
        if (!1 === _)
          throw new ge({
            code:
              'v2' === Ve(this.core, 'options.apiVersion')
                ? de.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED
                : 400,
            detail: { reason: 'No network', rawError: i, curProvider: 1 },
          })
        if (t) {
          if (this.nosErrorCount <= 0) {
            try {
              this.cloudStorage.mixStorage._addCircuitTimer()
            } catch (t) {
              throw new ge({
                code:
                  'v2' === Ve(this.core, 'options.apiVersion')
                    ? de.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED
                    : 400,
                detail: {
                  reason: 'All upload attempts failed',
                  rawError: t,
                  curProvider: this.cloudStorage.mixStorage.curProvider,
                  mixStorePolicy: this.cloudStorage.mixStorage.mixStorePolicy,
                  file: e.file || e.filePath,
                },
              })
            }
            return (
              (this.nosErrorCount = Ve(
                this.cloudStorage,
                'mixStorePolicy.nosPolicy.uploadConfig.retryPolicy.retry'
              )),
              this.cloudStorage._uploadFile(e)
            )
          }
          return this.nosErrorCount--, this.nosUpload(e, t)
        }
        throw new ge({
          code:
            'v2' === Ve(this.core, 'options.apiVersion')
              ? de.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED
              : 400,
          detail: {
            reason: 'NOS attempts failed',
            rawError: i,
            curProvider: 1,
          },
        })
      }
      var E = null == v ? void 0 : v.type,
        T = E && E.indexOf('/') > -1 ? E.slice(0, E.indexOf('/')) : ''
      T || (T = e.type || '')
      var S,
        C = { image: 'imageInfo', video: 'vinfo', audio: 'vinfo' }
      if (!C[T]) return Object.assign({ url: f }, v)
      try {
        S = yield this.core.adapters.request(
          `${m}?${C[T]}`,
          { method: 'GET', dataType: 'json', timeout: 5e3 },
          { exception_service: 3 }
        )
      } catch (e) {
        return (
          this.core.logger.error('uploadFile:: fetch file info error', e),
          Object.assign({ url: f }, v)
        )
      }
      if (S) {
        var { data: N } = S,
          A =
            'imageInfo' === C[T]
              ? N
              : null === (d = null == N ? void 0 : N.GetVideoInfo) ||
                void 0 === d
              ? void 0
              : d.VideoInfo
        return Ns(
          {
            url: f,
            name: v.name,
            size: v.size,
            ext: v.ext,
            w: null == A ? void 0 : A.Width,
            h: null == A ? void 0 : A.Height,
            orientation: null == A ? void 0 : A.Orientation,
            dur: null == A ? void 0 : A.Duration,
            audioCodec: null == A ? void 0 : A.AudioCodec,
            videoCodec: null == A ? void 0 : A.VideoCodec,
            container: null == A ? void 0 : A.Container,
          },
          function (e) {
            return void 0 !== e
          }
        )
      }
      return Object.assign({ url: f }, v)
    })
  }
  _getNosCdnHost() {
    var e
    return Te(this, void 0, void 0, function* () {
      var t
      try {
        t = yield this.core.sendCmd('getNosCdnHost')
      } catch (e) {
        return void this.core.logger.error('getNosCdnHost::error', e)
      }
      if (t) {
        var i =
            null === (e = null == t ? void 0 : t.content) || void 0 === e
              ? void 0
              : e.nosConfigTag,
          r = parseInt(null == i ? void 0 : i.expire)
        0 !== r && i.cdnDomain
          ? -1 === r
            ? ((this.config.cdn.bucket = i.bucket),
              (this.config.cdn.cdnDomain = i.cdnDomain),
              (this.config.cdn.objectNamePrefix = i.objectNamePrefix))
            : ((this.config.cdn.bucket = i.bucket),
              (this.config.cdn.cdnDomain = i.cdnDomain),
              (this.config.cdn.objectNamePrefix = i.objectNamePrefix),
              (this.nosCdnHostTimer = this.core.timerManager.addTimer(() => {
                this._getNosCdnHost()
              }, 1e3 * r)))
          : ((this.config.cdn.bucket = ''),
            (this.config.cdn.cdnDomain = ''),
            (this.config.cdn.objectNamePrefix = ''))
      }
    })
  }
}
var Rs = {
    '6_2': 'getNosToken',
    '6_22': 'getOriginUrl',
    '6_24': 'getNosAccessToken',
    '6_25': 'deleteNosAccessToken',
    '6_26': 'getNosCdnHost',
    '6_27': 'getGrayscaleConfig',
    '6_28': 'getMixStorePolicy',
    '6_29': 'getMixStoreToken',
    '6_30': 'getFileAuthToken',
  },
  Os = {
    nosToken: {
      objectName: 1,
      token: 2,
      bucket: 3,
      expireTime: 4,
      expireSec: 7,
      tag: 8,
      shortUrl: 9,
    },
    mixStoreTokenReqTag: {
      provider: 0,
      tokenCount: 1,
      nosSurvivalTime: 2,
      tag: 3,
      returnBody: 4,
      policyVersion: 5,
    },
    nosConfigTag: { bucket: 1, cdnDomain: 2, expire: 3, objectNamePrefix: 4 },
    grayConfigTag: { config: 0, ttl: 1 },
    mixStorePolicyTag: {
      providers: 0,
      ttl: 1,
      mixEnable: 2,
      nosPolicy: 3,
      s3Policy: 4,
      policyVersion: 5,
    },
    mixStoreTokenResTag: {
      provider: 0,
      accessKeyId: 1,
      secretAccessKey: 2,
      sessionToken: 3,
      token: 4,
      expireTime: 5,
      bucket: 6,
      objectName: 7,
      fileExpireSec: 8,
      tag: 9,
      shortUrl: 10,
      region: 11,
    },
    nosSafeUrlTag: { safeUrl: 0, originUrl: 1 },
    mixStoreAuthTokenReqTag: { type: 1, urls: 2 },
    mixStoreAuthTokenResTag: { type: 1, tokens: 2, token: 3, ttl: 4 },
    nosAccessTokenTag: { token: 0, url: 1, userAgent: 2, ext: 3 },
  },
  bs = {
    getNosToken: {
      sid: 6,
      cid: 2,
      service: 'cloudStorage',
      params: [
        { type: 'String', name: 'responseBody' },
        {
          type: 'Property',
          name: 'nosToken',
          entity: 'nosToken',
          reflectMapper: Os.nosToken,
        },
      ],
      response: [
        { type: 'Property', name: 'nosToken', reflectMapper: ft(Os.nosToken) },
      ],
    },
    getOriginUrl: {
      sid: 6,
      cid: 22,
      service: 'cloudStorage',
      params: [
        {
          type: 'Property',
          name: 'nosSafeUrlTag',
          reflectMapper: Os.nosSafeUrlTag,
        },
      ],
      response: [
        {
          type: 'Property',
          name: 'nosSafeUrlTag',
          reflectMapper: ft(Os.nosSafeUrlTag),
        },
      ],
    },
    getNosCdnHost: {
      sid: 6,
      cid: 26,
      service: 'cloudStorage',
      response: [
        {
          type: 'Property',
          name: 'nosConfigTag',
          reflectMapper: ft(Os.nosConfigTag),
        },
      ],
    },
    getGrayscaleConfig: {
      sid: 6,
      cid: 27,
      service: 'cloudStorage',
      params: [{ type: 'Property', name: 'config' }],
      response: [
        {
          type: 'Property',
          name: 'grayConfigTag',
          reflectMapper: ft(Os.grayConfigTag),
        },
      ],
    },
    getMixStorePolicy: {
      sid: 6,
      cid: 28,
      service: 'cloudStorage',
      params: [{ type: 'LongArray', name: 'supportType' }],
      response: [
        {
          type: 'Property',
          name: 'mixStorePolicyTag',
          reflectMapper: ft(Os.mixStorePolicyTag),
        },
      ],
    },
    getMixStoreToken: {
      sid: 6,
      cid: 29,
      service: 'cloudStorage',
      params: [
        {
          type: 'Property',
          name: 'mixStoreTokenReqTag',
          reflectMapper: Os.mixStoreTokenReqTag,
        },
      ],
      response: [
        {
          type: 'Property',
          name: 'mixStoreTokenResTag',
          reflectMapper: ft(Os.mixStoreTokenResTag),
        },
      ],
    },
    getFileAuthToken: {
      sid: 6,
      cid: 30,
      service: 'cloudStorage',
      params: [
        {
          type: 'Property',
          name: 'mixStoreAuthTokenReqTag',
          reflectMapper: Os.mixStoreAuthTokenReqTag,
        },
      ],
      response: [
        {
          type: 'Property',
          name: 'mixStoreAuthTokenResTag',
          reflectMapper: ft(Os.mixStoreAuthTokenResTag),
        },
      ],
    },
    getNosAccessToken: {
      sid: 6,
      cid: 24,
      service: 'cloudStorage',
      params: [
        { type: 'Property', name: 'tag', reflectMapper: Os.nosAccessTokenTag },
      ],
      response: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: ft(Os.nosAccessTokenTag),
        },
      ],
    },
    deleteNosAccessToken: {
      sid: 6,
      cid: 25,
      service: 'cloudStorage',
      params: [
        { type: 'Property', name: 'tag', reflectMapper: Os.nosAccessTokenTag },
      ],
    },
  }
class ks {
  constructor(e, t) {
    ;(this.GRAYKEY = 'AllGrayscaleConfig'),
      (this.MIXSTOREKEY = 'AllMixStorePolicy'),
      (this.grayConfig = { mixStoreEnable: !1, timeStamp: 0, ttl: 0 }),
      (this.mixStorePolicy = {
        providers: [],
        timeStamp: 0,
        ttl: 0,
        s3Policy: null,
        nosPolicy: null,
        policyVersion: void 0,
      }),
      (this.curProvider = 1),
      (this.mixStoreErrorCount = 10),
      (this.circuitTimer = 0),
      (this.core = e),
      (this.cloudStorage = t),
      (this.logger = e.logger)
  }
  reset() {
    ;(this.grayConfig = null),
      (this.mixStorePolicy = {
        providers: [],
        timeStamp: 0,
        ttl: 0,
        s3Policy: null,
        nosPolicy: null,
        policyVersion: void 0,
      }),
      (this.curProvider = 1),
      (this.mixStoreErrorCount = 10)
  }
  getGrayscaleConfig(e, t) {
    var i
    return Te(this, void 0, void 0, function* () {
      if (Ae.localStorage)
        try {
          Ae.localStorage.getItem &&
            Ae.localStorage.getItem(this.GRAYKEY) &&
            (this.grayConfig = JSON.parse(
              Ae.localStorage.getItem(this.GRAYKEY)
            )[e])
        } catch (e) {
          Ae.localStorage.getItem(this.GRAYKEY) &&
            this.core.logger.error(
              'uploadFile:: JSON.parse grayscaleConfig error ',
              e
            )
        }
      if (
        !this.grayConfig ||
        this.grayConfig.timeStamp + 1e3 * this.grayConfig.ttl < t
      ) {
        var r = yield this.core.sendCmd('getGrayscaleConfig', { config: {} })
        if (r.content && r.content.grayConfigTag) {
          this.logger.log('uploadFile::getAppGrayConfigRequest success ')
          try {
            ;(this.grayConfig = JSON.parse(r.content.grayConfigTag.config)),
              (this.grayConfig.ttl = JSON.parse(r.content.grayConfigTag.ttl))
          } catch (e) {
            this.logger.error('getGrayscaleConfig error', e)
          }
          if (!this.grayConfig) return
          var s = Ae.localStorage.getItem(this.GRAYKEY)
            ? JSON.parse(Ae.localStorage.getItem(this.GRAYKEY))
            : {}
          ;(this.grayConfig.timeStamp = new Date().getTime()),
            (s[e] = this.grayConfig),
            Ae.localStorage.setItem(this.GRAYKEY, JSON.stringify(s))
        } else this.logger.log('uploadFile:: result grayConfig:', r.content)
      }
      ;(null === (i = this.grayConfig) || void 0 === i
        ? void 0
        : i.mixStoreEnable) && (yield this._getMixStorePolicy(e))
    })
  }
  _getMixStorePolicy(e) {
    return Te(this, void 0, void 0, function* () {
      var t = new Date().getTime()
      if (Ae.localStorage)
        try {
          if (
            ((this.mixStorePolicy = JSON.parse(
              Ae.localStorage.getItem(this.MIXSTOREKEY)
            )[e]),
            (this.curProvider = parseInt(this.mixStorePolicy.providers[0])),
            this.mixStorePolicy.timeStamp &&
              this.mixStorePolicy.timeStamp + 1e3 * this.mixStorePolicy.ttl > t)
          ) {
            var i =
              this.mixStorePolicy.timeStamp + 1e3 * this.mixStorePolicy.ttl - t
            this.core.timerManager.addTimer(
              this._getMixStorePolicy.bind(this, e),
              i
            )
          }
        } catch (t) {
          Ae.localStorage.getItem(this.MIXSTOREKEY) &&
            JSON.parse(Ae.localStorage.getItem(this.MIXSTOREKEY))[e] &&
            this.core.logger.error(
              'uploadFile:: JSON.parse mixStorePolicy error ',
              t
            )
        }
      if (
        !this.mixStorePolicy ||
        this.mixStorePolicy.timeStamp + 1e3 * this.mixStorePolicy.ttl <= t
      )
        try {
          var r = (yield this.core.sendCmd('getMixStorePolicy', {
            supportType: this.cloudStorage.aws.s3 ? [1, 2] : [1],
          })).content.mixStorePolicyTag
          ;(this.mixStorePolicy = {
            providers: [],
            timeStamp: 0,
            ttl: 0,
            s3Policy: null,
            nosPolicy: null,
            policyVersion: void 0,
          }),
            (this.mixStorePolicy.policyVersion = r.policyVersion),
            (this.mixStorePolicy.ttl = Number(r.ttl)),
            (this.mixStorePolicy.providers = r.providers.split(',')),
            this.circuitTimer &&
              this.core.timerManager.deleteTimer(this.circuitTimer),
            (this.curProvider = parseInt(this.mixStorePolicy.providers[0])),
            (this.mixStorePolicy.nosPolicy = r.nosPolicy
              ? JSON.parse(r.nosPolicy)
              : null),
            (this.mixStorePolicy.s3Policy = r.s3Policy
              ? JSON.parse(r.s3Policy)
              : null),
            null === this.mixStorePolicy.s3Policy
              ? (this.mixStorePolicy.providers = ['1'])
              : null === this.mixStorePolicy.nosPolicy
              ? (this.mixStorePolicy.providers = ['2'])
              : (this.mixStorePolicy.providers =
                  this.mixStorePolicy.s3Policy.priority <
                  this.mixStorePolicy.nosPolicy.priority
                    ? ['2', '1']
                    : ['1', '2']),
            this.core.timerManager.addTimer(
              this._getMixStorePolicy.bind(this, e),
              1e3 * this.mixStorePolicy.ttl
            )
          var s = Ae.localStorage.getItem(this.MIXSTOREKEY)
            ? JSON.parse(Ae.localStorage.getItem(this.MIXSTOREKEY))
            : {}
          ;(this.mixStorePolicy.timeStamp = new Date().getTime()),
            (s[e] = this.mixStorePolicy),
            Ae.localStorage.setItem(this.MIXSTOREKEY, JSON.stringify(s))
        } catch (t) {
          if (
            (this.logger.error('getMixStorePolicy error', t),
            0 === this.mixStoreErrorCount)
          )
            throw new Error('getMixStorePolicy all count error')
          this._getMixStorePolicy(e), this.mixStoreErrorCount--
        }
      this.mixStorePolicy.nosPolicy &&
        (this.cloudStorage.nos.nosErrorCount =
          this.mixStorePolicy.nosPolicy.uploadConfig.retryPolicy.retry)
    })
  }
  _addCircuitTimer() {
    var e = this.mixStorePolicy.providers,
      t = e[(e.indexOf(String(this.curProvider)) + 1) % e.length]
    if (!t) throw new Error('uploadFile nextProvider error')
    if (t === e[0]) throw new Error('uploadFile all policy fail')
    if (
      (this.logger.log(
        `uploadFile:: upload policy will change,now policy:${this.curProvider} nextProvider:${t}`
      ),
      (this.curProvider = parseInt(t)),
      this.mixStorePolicy.nosPolicy && this.mixStorePolicy.s3Policy)
    ) {
      var i =
        this.mixStorePolicy[1 === this.curProvider ? 'nosPolicy' : 's3Policy']
          .uploadConfig.retryPolicy.circuit
      if (!i || 0 === i) throw new Error('uploadFile circuit error')
      this.circuitTimer = this.core.timerManager.addTimer(() => {
        this.logger.log(
          `uploadFile:: upload policy will change,now policy:${
            this.curProvider
          } nextProvider:${parseInt(this.mixStorePolicy.providers[0])}`
        ),
          (this.curProvider = parseInt(this.mixStorePolicy.providers[0])),
          this.core.timerManager.deleteTimer(this.circuitTimer)
      }, 1e3 * i)
    }
    throw new Error('uploadFile will not retry again')
  }
  getFileAuthToken(e) {
    return Te(this, void 0, void 0, function* () {
      return (yield this.core.sendCmd('getFileAuthToken', {
        mixStoreAuthTokenReqTag: e,
      })).content.mixStoreAuthTokenResTag
    })
  }
}
var Vs = -1
class Ps {
  constructor(e, t) {
    ;(this.s3 = null),
      (this.core = e),
      (this.cloudStorage = t),
      (this.logger = e.logger)
  }
  get mixStorePolicy() {
    return this.cloudStorage.mixStorage.mixStorePolicy
  }
  s3Upload(e, t) {
    return Te(this, void 0, void 0, function* () {
      var i
      if (((Vs += 1), e.file)) i = e.file
      else if ('string' == typeof e.fileInput) {
        this.logger.warn('fileInput will abandon,Please use file or filepath')
        var r = document.getElementById(e.fileInput)
        if (!(r && r.files && r.files[0]))
          throw new Error('Can not get file from fileInput')
        i = r.files[0]
      } else {
        if (!(e.fileInput && e.fileInput.files && e.fileInput.files[0]))
          throw new Error(`Can not get file from fileInput ${e.fileInput}`)
        i = e.fileInput.files[0]
      }
      if (!this.mixStorePolicy.s3Policy) throw new Error('dont get s3 policy')
      var s = {
          accessKeyId: t.accessKeyId,
          secretAccessKey: t.secretAccessKey,
          sessionToken: t.sessionToken,
          region: t.region,
          maxRetries:
            this.mixStorePolicy.s3Policy.uploadConfig.retryPolicy.retry,
        },
        n = this.s3,
        o = decodeURIComponent(t.bucket),
        a = decodeURIComponent(t.objectName),
        c = i,
        d = `https://${o}.s3.amazonaws.com/${a}`,
        l = {},
        p = this.mixStorePolicy.s3Policy
      if (
        p &&
        p.uploadConfig &&
        Array.isArray(p.uploadConfig.uploadUrl) &&
        p.uploadConfig.uploadUrl.length > 0
      ) {
        var h = p.uploadConfig.uploadUrl.length
        ;(Vs %= h),
          (l.endpoint = p.uploadConfig.uploadUrl[Vs]),
          (l.s3ForcePathStyle = !0),
          (d = `${l.endpoint}/${o}/${a}`)
      }
      this.core.reporterHookCloudStorage.update({
        remote_addr: d,
        operation_type: 1,
      })
      var u = new n(l)
      u.config.update(s)
      var m = {
        Bucket: o,
        Key: a,
        Body: c,
        Metadata: { token: t.token },
        ContentType: c.type || 'application/octet-stream',
      }
      this.core.logger.log('uploadFile:: s3 upload params:', m)
      var g = u.upload(m)
      return (
        g.on('httpUploadProgress', (t) => {
          var i = parseFloat((t.loaded / t.total).toFixed(2))
          e.onUploadProgress &&
            e.onUploadProgress({
              total: t.total,
              loaded: t.loaded,
              percentage: i,
              percentageText: Math.round(100 * i) + '%',
            })
        }),
        new Promise((i, r) => {
          var s = new Date().getTime()
          g.send((n, d) =>
            Te(this, void 0, void 0, function* () {
              var l, p, h
              if (n && 'RequestAbortedError' === n.code)
                this.logger.error(
                  'uploadFile:',
                  'api::s3:upload file abort.',
                  n
                ),
                  r(
                    new ge({
                      code:
                        'v2' === Ve(this.core, 'options.apiVersion')
                          ? de.V2NIM_ERROR_CODE_CANCELLED
                          : 400,
                      detail: {
                        reason: 'S3RequestAbortedError',
                        rawError: n,
                        curProvider: 2,
                      },
                    })
                  )
              else {
                if (!n) {
                  var u = this.mixStorePolicy.s3Policy.cdnSchema
                  u = (u = u.replace(
                    '{cdnDomain}',
                    this.mixStorePolicy.s3Policy.dlcdn
                  )).replace('{objectName}', d.Key)
                  var m = {
                      size: c.size,
                      name: c.name,
                      url: t.shortUrl ? t.shortUrl : u,
                      ext: c.name.split('.')[1] || 'unknown',
                    },
                    g = e.type || '',
                    v = { image: 'imageInfo' }
                  return i(
                    v[g]
                      ? yield this.getS3FileInfo({
                          url: u,
                          infoSuffix: v[g],
                          s3Result: m,
                        })
                      : m
                  )
                }
                this.logger.error(
                  'uploadFile:',
                  'api::s3:upload file failed.',
                  n
                ),
                  this.core.reporter.reportTraceStart('exceptions', {
                    user_id:
                      this.core.options.account ||
                      (null ===
                        (p =
                          null === (l = this.core) || void 0 === l
                            ? void 0
                            : l.auth) || void 0 === p
                        ? void 0
                        : p.account),
                    trace_id:
                      null === (h = this.core.clientSocket.socket) ||
                      void 0 === h
                        ? void 0
                        : h.sessionId,
                    start_time: s,
                    action: 1,
                    exception_service: 4,
                  }),
                  this.core.reporter.reportTraceUpdateV2(
                    'exceptions',
                    {
                      code:
                        'number' == typeof n.status
                          ? n.status
                          : 'number' == typeof n.code
                          ? n.code
                          : 0,
                      description: n.message || `${n.code}`,
                      operation_type: 1,
                      target: JSON.stringify({ bucket: o, object: a }),
                    },
                    { asyncParams: Ae.net.getNetworkStatus() }
                  ),
                  this.core.reporter.reportTraceEnd('exceptions', 1)
                var { net_connect: f } = yield Ae.net.getNetworkStatus()
                if (!1 === f)
                  return r(
                    new ge({
                      code:
                        'v2' === Ve(this.core, 'options.apiVersion')
                          ? de.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED
                          : 400,
                      detail: {
                        reason: 'No network',
                        rawError: n,
                        curProvider: this.cloudStorage.mixStorage.curProvider,
                      },
                    })
                  )
                try {
                  this.cloudStorage.mixStorage._addCircuitTimer()
                } catch (t) {
                  return r(
                    new ge({
                      code:
                        'v2' === Ve(this.core, 'options.apiVersion')
                          ? de.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED
                          : 400,
                      detail: {
                        reason: 'All upload attempts failed',
                        rawError: t,
                        curProvider: this.cloudStorage.mixStorage.curProvider,
                        mixStorePolicy: this.mixStorePolicy,
                        file: e.file || e.filePath,
                      },
                    })
                  )
                }
                i(this.cloudStorage._uploadFile(e))
              }
            })
          ),
            e.onUploadStart && e.onUploadStart(g)
        })
      )
    })
  }
  getS3FileInfo(e) {
    var t
    return Te(this, void 0, void 0, function* () {
      var i,
        { url: r, infoSuffix: s, s3Result: n } = e
      try {
        i = yield this.core.adapters.request(
          `${r}?${s}`,
          { method: 'GET', dataType: 'text', timeout: 5e3 },
          { exception_service: 3 }
        )
      } catch (e) {
        return (
          this.core.logger.error('uploadFile:: fetch file info error', e), n
        )
      }
      if (i) {
        var { data: o } = i,
          a =
            'imageInfo' === s
              ? o
              : null === (t = null == o ? void 0 : o.GetVideoInfo) ||
                void 0 === t
              ? void 0
              : t.VideoInfo
        return Ns(
          Object.assign(Object.assign({}, n), {
            w: null == a ? void 0 : a.Width,
            h: null == a ? void 0 : a.Height,
            orientation: null == a ? void 0 : a.Orientation,
            dur: null == a ? void 0 : a.Duration,
            audioCodec: null == a ? void 0 : a.AudioCodec,
            videoCodec: null == a ? void 0 : a.VideoCodec,
            container: null == a ? void 0 : a.Container,
          }),
          function (e) {
            return void 0 !== e
          }
        )
      }
      return (
        this.core.logger.error(
          'uploadFile:: fetch s3 file info no result',
          `${r}?${s}`
        ),
        n
      )
    })
  }
}
class Ls {
  constructor(e, t = {}) {
    ;(this.config = {}),
      (this.uploadTaskMap = {}),
      (this.name = 'cloudStorage'),
      (this.logger = e.logger),
      (this.core = e),
      (this.nos = new As(e, this)),
      (this.mixStorage = new ks(e, this)),
      (this.aws = new Ps(e, this)),
      vt({ cmdMap: Rs, cmdConfig: bs }),
      this.setOptions(t),
      this.setListeners()
  }
  setOptions(e = {}) {
    var t = e.storageKeyPrefix || 'NIMClient'
    ;(this.mixStorage.GRAYKEY = t + '-AllGrayscaleConfig'),
      (this.mixStorage.MIXSTOREKEY = t + '-AllMixStorePolicy')
    var { s3: i } = e,
      r = Ee(e, ['s3']),
      s = Object.assign({}, Cs, this.config)
    if (r && Object.prototype.hasOwnProperty.call(r, 'cdn')) {
      var n = Object.assign(Object.assign({}, s.cdn), r.cdn)
      ;(this.config = Object.assign({}, s, r)), (this.config.cdn = n)
    } else this.config = Object.assign({}, s, r)
    i && (this.aws.s3 = i)
  }
  setListeners() {
    this.core.eventBus.on('kicked', this._clearUnCompleteTask.bind(this)),
      this.core.eventBus.on('disconnect', this._clearUnCompleteTask.bind(this)),
      this.core.eventBus.on(
        'V2NIMLoginService/loginLifeCycleLogout',
        this._clearUnCompleteTask.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMLoginService/loginLifeCycleKicked',
        this._clearUnCompleteTask.bind(this)
      )
  }
  _clearUnCompleteTask() {
    Object.keys(this.uploadTaskMap).forEach((e) => {
      var t = this.uploadTaskMap[e]
      t && t.abort && t.abort()
    }),
      (this.uploadTaskMap = {})
  }
  init(e = Date.now()) {
    return Te(this, void 0, void 0, function* () {
      this.mixStorage.reset(),
        this.nos.reset(),
        this.config.isNeedToGetUploadPolicyFromServer &&
          (yield this.mixStorage.getGrayscaleConfig(
            this.core.options.appkey,
            e
          )),
        yield this.nos._getNosCdnHost()
    })
  }
  processCallback(e, t) {
    var i = e.onUploadProgress,
      r = e.onUploadDone,
      s = e.onUploadStart
    return {
      onUploadStart:
        'function' == typeof s
          ? (e) => {
              this.uploadTaskMap[t] = e
              try {
                s(e)
              } catch (e) {
                this.logger.error(
                  'CloudStorage::uploadFile:options.onUploadStart execute error',
                  e
                )
              }
            }
          : (e) => {
              this.uploadTaskMap[t] = e
            },
      onUploadProgress:
        'function' == typeof i
          ? (e) => {
              this.core.reporterHookCloudStorage.update({
                transferred_size: e.loaded,
                full_size: e.total,
              })
              try {
                i(e)
              } catch (e) {
                this.logger.error(
                  'CloudStorage::uploadFile:options.onUploadProgress execute error',
                  e
                )
              }
            }
          : (e) => {
              this.core.reporterHookCloudStorage.update({
                transferred_size: e.loaded,
                full_size: e.total,
              })
            },
      onUploadDone:
        'function' == typeof r
          ? (e) => {
              this.core.reporterHookCloudStorage.end(0)
              try {
                r(e)
              } catch (e) {
                this.logger.error(
                  'CloudStorage::uploadFile:options.onUploadDone execute error',
                  e
                )
              }
            }
          : () => {
              this.core.reporterHookCloudStorage.end(0)
            },
      taskKey: t,
    }
  }
  uploadFile(e) {
    return Te(this, void 0, void 0, function* () {
      if (
        (ye(
          {
            maxSize: { type: 'number', required: !1 },
            type: { type: 'enum', values: ['file', 'image', 'audio', 'video'] },
          },
          e
        ),
        !e.fileInput && !e.file && !e.filePath)
      )
        throw new Error('uploadFile needs target file object or a filePath')
      if (e.type && 'file' !== e.type) {
        var t = Ve(e, 'file.type')
        if (t && 'string' == typeof t && -1 === t.indexOf(e.type))
          throw new Error(`The meta type "${t}" does not match "${e.type}"`)
      }
      if ((this.core.reporterHookCloudStorage.start(), e.file))
        this.core.reporterHookCloudStorage.update({ full_size: e.file.size })
      else if ('string' == typeof e.fileInput) {
        var i = document.getElementById(e.fileInput)
        i &&
          i.files &&
          i.files[0] &&
          this.core.reporterHookCloudStorage.update({
            full_size: i.files[0].size,
          })
      } else
        e.fileInput &&
          e.fileInput.files &&
          e.fileInput.files[0] &&
          this.core.reporterHookCloudStorage.update({
            full_size: e.fileInput.files[0].size,
          })
      var r = Le(),
        {
          onUploadStart: s,
          onUploadProgress: n,
          onUploadDone: o,
        } = this.processCallback(e, r)
      ;(e.onUploadStart = s), (e.onUploadProgress = n), (e.onUploadDone = o)
      var a = null
      try {
        ;(a = yield this._uploadFile(e)),
          e.md5 && (a.md5 = e.md5),
          delete this.uploadTaskMap[r]
      } catch (e) {
        throw (
          (delete this.uploadTaskMap[r],
          this.core.reporterHookCloudStorage.end(
            (e && e.code) === de.V2NIM_ERROR_CODE_CANCELLED ? 3 : 1
          ),
          e)
        )
      }
      return (
        a &&
          ((a.size = void 0 === a.size ? void 0 : Number(a.size)),
          (a.w = void 0 === a.w ? void 0 : Number(a.w)),
          (a.h = void 0 === a.h ? void 0 : Number(a.h)),
          (a.dur = void 0 === a.dur ? void 0 : Number(a.dur))),
        (a.url = decodeURIComponent(a.url)),
        e.onUploadDone({
          size: a.size,
          name: a.name,
          url: a.url,
          ext: a.name.split('.')[1] || 'unknown',
        }),
        a
      )
    })
  }
  _uploadFile(e) {
    var t, i
    return Te(this, void 0, void 0, function* () {
      if (
        !Ve(this.mixStorage, 'grayConfig.mixStoreEnable') ||
        !Ve(this.mixStorage, 'mixStorePolicy.providers.length')
      )
        return (
          this.logger.log('uploadFile:: uploadFile begin, use old nos'),
          this.nos.nosUpload(e)
        )
      this.logger.log(
        `uploadFile::_uploadFile, grayConfig enable:${Ve(
          this.mixStorage,
          'grayConfig.mixStoreEnable'
        )} curProvider:${Ve(this.mixStorage, 'curProvider')}`
      )
      var r = this.core.adapters.getFileUploadInformation(e),
        s = !0
      r
        ? !1 === r.complete && 2 === this.mixStorage.curProvider && (s = !1)
        : (s = !1),
        this.aws.s3 || (this.mixStorage.curProvider = 1)
      var n = Ts
      if (!s)
        try {
          n = (yield this.core.sendCmd('getMixStoreToken', {
            mixStoreTokenReqTag: {
              provider: this.mixStorage.curProvider,
              tokenCount: 1,
              tag: 'qchat',
              nosSurvivalTime: e.nosSurvivalTime,
              returnBody: Ss(e.type),
              policyVersion: this.mixStorage.mixStorePolicy.policyVersion,
            },
          })).content.mixStoreTokenResTag
        } catch (e) {
          if (
            (this.core.logger.error('uploadFile:: getMixStoreToken error', e),
            e instanceof he)
          )
            throw e
          throw new ge({
            code:
              'v2' === Ve(this.core, 'options.apiVersion')
                ? de.V2NIM_ERROR_CODE_FILE_UPLOAD_FAILED
                : 400,
            detail: {
              reason: 'getMixStoreToken error',
              rawError: e,
              curProvider: this.mixStorage.curProvider,
              mixStorePolicy: this.mixStorage.mixStorePolicy,
            },
          })
        }
      return s
        ? this.nos.nosUpload(
            e,
            null ===
              (i =
                null === (t = null == r ? void 0 : r.uploadInfo) || void 0 === t
                  ? void 0
                  : t.payload) || void 0 === i
              ? void 0
              : i.mixStoreToken
          )
        : 2 === this.mixStorage.curProvider
        ? this.aws.s3Upload(e, n)
        : this.nos.nosUpload(e, n)
    })
  }
  getThumbUrl(e, t) {
    var i, r, s, n, o
    if (!new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/).test(e))
      return this.logger.error('illegal file url:' + e), e
    var [a, c, d, l, p, h, u, m] =
      /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.exec(
        e
      )
    if (
      null === (i = this.grayConfig) || void 0 === i ? void 0 : i.mixStoreEnable
    ) {
      var g = this._getUrlType(e)
      if (
        2 === g &&
        this.mixStorePolicy.s3Policy &&
        Ve(this.mixStorePolicy, 's3Policy.thumbPolicy.imagethumb')
      )
        return (
          null ===
            (s =
              null === (r = this.mixStorePolicy.s3Policy) || void 0 === r
                ? void 0
                : r.thumbPolicy) || void 0 === s
            ? void 0
            : s.imagethumb
        )
          .replace('{cdnDomain}', this.mixStorePolicy.s3Policy.dlcdn)
          .replace('{objectName}', h)
          .replace('{x}', t.width.toString())
          .replace('{y}', t.height.toString())
      if (
        1 === g &&
        this.mixStorePolicy.nosPolicy &&
        Ve(this.mixStorePolicy, 'nosPolicy.thumbPolicy.imagethumb')
      )
        return (
          null ===
            (o =
              null === (n = this.mixStorePolicy.nosPolicy) || void 0 === n
                ? void 0
                : n.thumbPolicy) || void 0 === o
            ? void 0
            : o.imagethumb
        )
          .replace('{cdnDomain}', this.mixStorePolicy.nosPolicy.dlcdn)
          .replace('{objectName}', h)
          .replace('{x}', t.width.toString())
          .replace('{y}', t.height.toString())
    }
    return e.includes('?')
      ? e + `&imageView&thumbnail=${t.width}x${t.height}`
      : e + `?imageView&thumbnail=${t.width}x${t.height}`
  }
  getVideoCoverUrl(e, t) {
    var i, r, s, n, o
    if (!new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/).test(e))
      return this.logger.error('illegal file url:' + e), e
    var [a, c, d, l, p, h, u, m] =
      /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.exec(
        e
      )
    if (
      null === (i = this.grayConfig) || void 0 === i ? void 0 : i.mixStoreEnable
    ) {
      var g = this._getUrlType(e)
      if (
        2 === g &&
        this.mixStorePolicy.s3Policy &&
        Ve(this.mixStorePolicy, 's3Policy.thumbPolicy.vframe')
      )
        return (
          null ===
            (s =
              null === (r = this.mixStorePolicy.s3Policy) || void 0 === r
                ? void 0
                : r.thumbPolicy) || void 0 === s
            ? void 0
            : s.vframe
        )
          .replace('{cdnDomain}', this.mixStorePolicy.s3Policy.dlcdn)
          .replace('{objectName}', h)
          .replace('{x}', t.width.toString())
          .replace('{y}', t.height.toString())
          .replace('{offset}', '0')
          .replace('{type}', 'png')
      if (
        1 === g &&
        this.mixStorePolicy.nosPolicy &&
        Ve(this.mixStorePolicy, 'nosPolicy.thumbPolicy.vframe')
      )
        return (
          null ===
            (o =
              null === (n = this.mixStorePolicy.nosPolicy) || void 0 === n
                ? void 0
                : n.thumbPolicy) || void 0 === o
            ? void 0
            : o.vframe
        )
          .replace('{cdnDomain}', this.mixStorePolicy.nosPolicy.dlcdn)
          .replace('{objectName}', h)
          .replace('{x}', t.width.toString())
          .replace('{y}', t.height.toString())
          .replace('{offset}', '0')
          .replace('{type}', 'png')
    }
    return e.includes('?')
      ? e + `&vframe&offset=0&resize=${t.width}x${t.height}&type=png`
      : e + `?vframe&offset=0&resize=${t.width}x${t.height}&type=png`
  }
  getPrivateUrl(e) {
    var t
    if (!new RegExp(/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/).test(e))
      return this.logger.error('illegal file url:' + e), ''
    var [i, r, s, n, o, a, c, d] =
      /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/.exec(
        e
      )
    if (
      null === (t = this.grayConfig) || void 0 === t ? void 0 : t.mixStoreEnable
    ) {
      var l = this._getUrlType(e)
      return (
        2 === l &&
          this.mixStorePolicy.s3Policy &&
          (e = this.mixStorePolicy.s3Policy.cdnSchema
            .replace('{cdnDomain}', this.mixStorePolicy.s3Policy.dlcdn)
            .replace('{objectName}', a)),
        1 === l &&
          this.mixStorePolicy.nosPolicy &&
          (e = this.mixStorePolicy.nosPolicy.cdnSchema
            .replace('{cdnDomain}', this.mixStorePolicy.nosPolicy.dlcdn)
            .replace('{objectName}', a)),
        e
      )
    }
    var { downloadUrl: p, downloadHostList: h, nosCdnEnable: u } = this.config,
      m = this.config.cdn.cdnDomain,
      g = this.config.cdn.objectNamePrefix
        ? decodeURIComponent(this.config.cdn.objectNamePrefix)
        : '',
      v = decodeURIComponent(a),
      f = v.indexOf(g)
    if (m && f > -1 && u) return `${r}${m}/${v.slice(f)}`
    if (h.includes(n) && a.includes('/')) {
      var y = a.indexOf('/'),
        I = a.substring(0, y),
        M = a.substring(y + 1)
      return p.replace('{bucket}', I).replace('{object}', M)
    }
    var _ = h.filter((e) => 'string' == typeof n && n.includes(e))[0],
      E = _ ? n.replace(_, '').replace(/\W/g, '') : null
    return E ? p.replace('{bucket}', E).replace('{object}', a) : e
  }
  getOriginUrl(e) {
    return Te(this, void 0, void 0, function* () {
      return 'string' == typeof e && e.includes('_im_url=1')
        ? (yield this.core.sendCmd('getOriginUrl', {
            nosSafeUrlTag: { safeUrl: e },
          })).content.nosSafeUrlTag.originUrl
        : e
    })
  }
  getFileToken(e) {
    return Te(this, void 0, void 0, function* () {
      ye(
        {
          type: { type: 'number', min: 2, max: 3 },
          urls: { type: 'array', required: !1, itemType: 'string' },
        },
        e
      )
      var t = this.mixStorePolicy.nosPolicy
          ? this.mixStorePolicy.nosPolicy.authPolicy.policyType
          : null,
        i = this.mixStorePolicy.s3Policy
          ? this.mixStorePolicy.s3Policy.authPolicy.policyType
          : null
      if (t === String(-1) && i === String(-1))
        throw (
          (this.logger.error("don't need token"), new Error("don't need token"))
        )
      if (2 === e.type) {
        if ((t && t.indexOf(String(2)) >= 0) || (i && i.indexOf(String(2)) > 0))
          return this.mixStorage.getFileAuthToken(e)
        throw (
          (this.logger.error("don't support time token "),
          new Error("don't support type time token "))
        )
      }
      if (!e.urls || !e.urls.length)
        throw (
          (this.logger.error('urls is required when urls token'),
          new Error('urls is required when urls token'))
        )
      var r = [],
        s = []
      if (
        (e.urls.forEach((e) => {
          var t = this._getUrlType(e)
          1 === t && s.push(e), 2 === t && r.push(e)
        }),
        (!i || (0 !== r.length && i.indexOf(String(3)) < 0)) &&
          (this.logger.warn("s3 url don't support url token"), (r = [])),
        (!t || (0 !== s.length && t.indexOf(String(3)) < 0)) &&
          (this.logger.warn("nos url don't support url token"), (s = [])),
        0 === r.length && 0 === s.length)
      )
        throw (
          (this.logger.error('not support urls'), new Error('not support urls'))
        )
      if (0 === r.length || 0 === s.length)
        return (
          (e.urls = JSON.stringify(e.urls)), this.mixStorage.getFileAuthToken(e)
        )
    })
  }
  _getUrlType(e) {
    return this.mixStorePolicy.nosPolicy &&
      this.mixStorePolicy.nosPolicy.dlcdns.some((t) => e.indexOf(t) >= 0)
      ? 1
      : this.mixStorePolicy.s3Policy &&
        this.mixStorePolicy.s3Policy.dlcdns.some((t) => e.indexOf(t) >= 0)
      ? 2
      : null
  }
  getNosAccessToken(e) {
    return (
      ye({ url: { type: 'string', allowEmpty: !1 } }, e),
      this.nos.getNosAccessToken(e)
    )
  }
  deleteNosAccessToken(e) {
    return (
      ye({ token: { type: 'string', allowEmpty: !1 } }, e),
      this.nos.deleteNosAccessToken(e)
    )
  }
  get grayConfig() {
    return this.mixStorage.grayConfig
  }
  get mixStorePolicy() {
    return this.mixStorage.mixStorePolicy
  }
  process(e) {
    var t = Ve(e, 'error.detail.ignore')
    return e.error && !t ? Promise.reject(e.error) : Promise.resolve(e)
  }
}
class Ds extends ni {
  constructor(e) {
    super('V2NIMStorageService', e),
      (this.sceneMap = {
        nim_default_profile_icon: {
          sceneName: 'nim_default_profile_icon',
          expireTime: 0,
        },
        nim_default_im: { sceneName: 'nim_default_im', expireTime: 0 },
        nim_system_nos_scene: {
          sceneName: 'nim_system_nos_scene',
          expireTime: 0,
        },
        nim_security: { sceneName: 'nim_security', expireTime: 0 },
      }),
      (this.uploadingMessageInfo = {}),
      (this.core = e),
      this.core._registerDep(Ls, 'cloudStorage'),
      this.core._registerDep(Is, 'V2NIMStorageUtil')
  }
  addCustomStorageScene(e, t) {
    return (
      this.checkV2(),
      ye(
        {
          sceneName: { type: 'string', allowEmpty: !1 },
          expireTime: { type: 'number', min: 0 },
        },
        { sceneName: e, expireTime: t },
        '',
        !0
      ),
      (this.sceneMap[e] = { sceneName: e, expireTime: t }),
      { sceneName: e, expireTime: t }
    )
  }
  getStorageSceneList() {
    return this.checkV2(), Object.values(this.sceneMap)
  }
  getStorageScene(e) {
    return (e && this.sceneMap[e]) || this.sceneMap.nim_default_im
  }
  hasStorageScene(e) {
    return void 0 !== this.sceneMap[e]
  }
  createUploadFileTask(e) {
    if (
      (this.checkV2(),
      'string' == typeof e.fileObj && 0 === e.fileObj.indexOf('nim-external'))
    ) {
      var t = document.getElementById(e.fileObj)
      t && t.files && t.files[0] && (e.fileObj = t.files[0])
    }
    return { taskId: Le(), uploadParams: e }
  }
  uploadFile(e, t) {
    return Te(this, void 0, void 0, function* () {
      return (
        this.checkV2(),
        ye({ taskId: { type: 'string', allowEmpty: !1 } }, e, 'fileTask', !0),
        (yield this._uploadFile(e, t))[0]
      )
    })
  }
  uploadFileWithMetaInfo(e, t) {
    return Te(this, void 0, void 0, function* () {
      return (
        this.checkV2(),
        ye({ taskId: { type: 'string', allowEmpty: !1 } }, e, 'fileTask', !0),
        (function (e) {
          var {
            url: t,
            name: i,
            size: r,
            ext: s,
            md5: n,
            h: o,
            w: a,
            orientation: c,
            dur: d,
            audioCodec: l,
            videoCodec: p,
            container: h,
          } = e
          return JSON.parse(
            JSON.stringify({
              url: t,
              name: i,
              size: r,
              ext: s,
              md5: n,
              height: o,
              width: a,
              orientation: c,
              duration: d,
              audioCodec: l,
              videoCodec: p,
              container: h,
            })
          )
        })((yield this._uploadFile(e, t))[1])
      )
    })
  }
  _uploadFile(e, t, i) {
    var r
    return Te(this, void 0, void 0, function* () {
      if (!this.core.cloudStorage || !this.core.cloudStorage.uploadFile)
        throw new Error('Service "cloudStorage" does not exist')
      var { uploadParams: s, taskId: n } = e,
        { file: o, path: a } = fs(s.fileObj),
        { fileType: c } = i || {}
      if (this.uploadingMessageInfo[n])
        throw new he({
          code: de.V2NIM_ERROR_CODE_RESOURCE_ALREADY_EXIST,
          detail: { reason: 'V2NIMStorageService.uploadFile: repeat upload' },
        })
      try {
        var d = {}
        o
          ? (d.file = o)
          : a &&
            (0 === (null == a ? void 0 : a.indexOf('nim-external'))
              ? (d.fileInput = a)
              : (d.filePath = a))
        var l = this.getStorageScene(s.sceneName)
        if (
          ((d.nosScenes = l.sceneName),
          (d.nosSurvivalTime = l.expireTime),
          (d.type =
            1 === c ? 'image' : 2 === c ? 'audio' : 3 === c ? 'video' : 'file'),
          d.file && this.core.pluginMap['browser-md5-file'])
        ) {
          var p = yield this.getFileMd5(
            this.core.pluginMap['browser-md5-file'],
            n,
            d.file
          )
          d.md5 = p
        }
        ;(d.onUploadProgress = (e) => {
          'function' == typeof t && t(Math.round(100 * e.percentage))
        }),
          (d.onUploadStart = (e) => {
            var t
            if (
              null === (t = this.uploadingMessageInfo[n]) || void 0 === t
                ? void 0
                : t.abort
            )
              return e.abort(), void delete this.uploadingMessageInfo[n]
            this.uploadingMessageInfo[n] = { abort: !1, task: e }
          }),
          (this.uploadingMessageInfo[n] = { abort: !1 })
        var h = yield this.core.cloudStorage.uploadFile(d)
        if (
          null === (r = this.uploadingMessageInfo[n]) || void 0 === r
            ? void 0
            : r.abort
        )
          throw new he({
            code: de.V2NIM_ERROR_CODE_CANCELLED,
            detail: { reason: 'upload file aborted' },
          })
        return delete this.uploadingMessageInfo[n], [h.url, h]
      } catch (e) {
        throw (
          (delete this.uploadingMessageInfo[n],
          this.core.logger.error('sendFile:: upload File error or abort.', e),
          e)
        )
      }
    })
  }
  cancelUploadFile(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkV2(), yield this._cancelUploadFile(e.taskId)
    })
  }
  _cancelUploadFile(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkV2()
      var t = this.uploadingMessageInfo[e]
      if (null == t ? void 0 : t.task)
        try {
          this.logger.log(
            'V2NIMStorageService.cancelUploadFile: uploadInfo task exist'
          ),
            yield t.task.abort(),
            delete this.uploadingMessageInfo[e]
        } catch (t) {
          delete this.uploadingMessageInfo[e],
            this.core.logger.error(
              'cancelMessageAttachmentUpload::abort error.',
              t
            )
        }
      else {
        if (!t)
          throw new he({
            code: de.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST,
            detail: {
              reason:
                'V2NIMStorageService.cancelUploadFile: uploadInfo not exist',
            },
          })
        this.logger.log(
          'V2NIMStorageService.cancelUploadFile: uploadInfo task not exist'
        ),
          (t.abort = !0)
      }
    })
  }
  getFileMd5(e, t, i) {
    return Te(this, void 0, void 0, function* () {
      return new Promise((r, s) => {
        var n,
          o = new e()
        ;(
          null === (n = this.uploadingMessageInfo[t]) || void 0 === n
            ? void 0
            : n.abort
        )
          ? s(
              new he({
                code: de.V2NIM_ERROR_CODE_CANCELLED,
                detail: { reason: 'upload file aborted' },
              })
            )
          : (this.uploadingMessageInfo[t] = { abort: !1, task: o })
        try {
          o.md5(i, (e, t) => {
            'aborted' === e
              ? s(
                  new he({
                    code: de.V2NIM_ERROR_CODE_CANCELLED,
                    detail: { reason: e },
                  })
                )
              : e
              ? s(
                  new he({
                    code: de.V2NIM_ERROR_CODE_INTERNAL,
                    detail: {
                      reason: 'md5 calculate error in callback',
                      rawError: e,
                    },
                  })
                )
              : r(t)
          })
        } catch (e) {
          s(
            new he({
              code: de.V2NIM_ERROR_CODE_INTERNAL,
              detail: { reason: 'md5 calculate error', rawError: e },
            })
          )
        }
      })
    })
  }
  shortUrlToLong(e) {
    return Te(this, void 0, void 0, function* () {
      return this.checkV2(), this.core.cloudStorage.getOriginUrl(e)
    })
  }
  getImageThumbUrl(e, t) {
    return Te(this, void 0, void 0, function* () {
      return this.core.V2NIMStorageUtil.getImageThumbUrl(e, t)
    })
  }
  getVideoCoverUrl(e, t) {
    return Te(this, void 0, void 0, function* () {
      return this.core.V2NIMStorageUtil.getVideoCoverUrl(e, t)
    })
  }
}
class ws extends ni {
  constructor(e) {
    super('V2NIMMessageCreator', e),
      (this.name = 'V2NIMMessageCreator'),
      (this.defaultNosSceneName = 'nim_default_im'),
      (this.core = e)
  }
  createMessage(e, t) {
    return Object.assign(
      Object.assign(
        Object.assign(
          {
            messageClientId: Le(),
            messageType: e,
            createTime: this.core.timeOrigin.getNTPTime(),
            sendingState: 0,
            messageStatus: { errorCode: 200 },
            isSelf: !0,
          },
          t
        ),
        t.attachment
          ? {
              attachment: Object.assign(Object.assign({}, t.attachment), {
                raw: Jr(e, t.attachment),
              }),
            }
          : {}
      ),
      {
        senderId: '',
        receiverId: '',
        conversationType: 0,
        conversationId: '',
        messageServerId: '',
        messageConfig: Object.assign(
          {
            unreadEnabled: !0,
            roamingEnabled: !0,
            readReceiptEnabled: !1,
            lastMessageUpdateEnabled: !0,
            historyEnabled: !0,
            onlineSyncEnabled: !0,
            offlineEnabled: !0,
          },
          t.messageConfig
        ),
        pushConfig: Object.assign(
          { pushEnabled: !0, pushNickEnabled: !0, forcePush: !1 },
          t.pushConfig
        ),
        routeConfig: Object.assign({ routeEnabled: !0 }, t.routeConfig),
        antispamConfig: Object.assign(
          { antispamEnabled: !0 },
          t.antispamConfig
        ),
      }
    )
  }
  createTextMessage(e) {
    return (
      this.checkV2(),
      ye({ text: { type: 'string', allowEmpty: !1 } }, { text: e }, '', !0),
      this.createMessage(0, { text: e })
    )
  }
  createImageMessage(e, t, i, r, s) {
    this.checkV2(),
      ye(_r, { name: t, sceneName: i, width: r, height: s }, '', !0)
    var n = this.createGenericFileMessageAttachment(
      e,
      t,
      i,
      void 0,
      r,
      s,
      'jpeg'
    )
    return this.createMessage(1, { attachment: n, attachmentUploadState: 0 })
  }
  createAudioMessage(e, t, i, r) {
    this.checkV2(), ye(Ir, { name: t, sceneName: i, duration: r }, '', !0)
    var s = this.createGenericFileMessageAttachment(
      e,
      t,
      i,
      r,
      void 0,
      void 0,
      'aac'
    )
    return this.createMessage(2, { attachment: s, attachmentUploadState: 0 })
  }
  createVideoMessage(e, t, i, r, s, n) {
    this.checkV2(),
      ye(
        Mr,
        { name: t, sceneName: i, duration: r, width: s, height: n },
        '',
        !0
      )
    var o = this.createGenericFileMessageAttachment(e, t, i, r, s, n, 'mp4')
    return this.createMessage(3, { attachment: o, attachmentUploadState: 0 })
  }
  createFileMessage(e, t, i) {
    this.checkV2(), ye(yr, { name: t, sceneName: i }, '', !0)
    var r = this.createGenericFileMessageAttachment(
      e,
      t,
      i,
      void 0,
      void 0,
      void 0,
      'txt'
    )
    return this.createMessage(6, { attachment: r, attachmentUploadState: 0 })
  }
  createGenericFileMessageAttachment(e, t, i, r, s, n, o) {
    if (
      ((i = i || this.defaultNosSceneName),
      !this.core.V2NIMStorageService.hasStorageScene)
    )
      throw new he({
        code: de.V2NIM_ERROR_CODE_MISUSE,
        detail: { reason: 'V2NIMStorageService not exist' },
      })
    if (!this.core.V2NIMStorageService.hasStorageScene(i))
      throw new he({
        code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
        detail: { reason: 'sceneName: ' + i + ' has not been added' },
      })
    var { file: a, path: c } = fs(e),
      d = Object.assign(
        Object.assign(
          Object.assign(
            {
              name: t,
              uploadState: 0,
              sceneName: i || this.defaultNosSceneName,
            },
            r ? { duration: r } : {}
          ),
          s ? { width: s } : {}
        ),
        n ? { height: n } : {}
      )
    if (a) {
      var l = a.name.lastIndexOf('.'),
        p = -1 === l ? a.name : a.name.substring(0, l)
      ;(d.name = d.name || p),
        (d.size = a.size),
        (d.ext = `.${Fe(a.name) || Fe(t || '') || o}`)
    } else if (c) {
      var h = c.lastIndexOf('/'),
        u = c.lastIndexOf('.'),
        m = -1 === u ? c.substring(h + 1) : c.substring(h + 1, u)
      ;(d.name = d.name || m), (d.ext = `.${Fe(c) || Fe(t || '') || o}`)
    }
    return (
      (d = JSON.parse(JSON.stringify(d))),
      c ? (d.path = c) : a && (d.file = a),
      d
    )
  }
  createLocationMessage(e, t, i) {
    return (
      this.checkV2(),
      ye(
        {
          latitude: { type: 'number', allowEmpty: !1 },
          longitude: { type: 'number', allowEmpty: !1 },
          address: { type: 'string', allowEmpty: !1 },
        },
        { latitude: e, longitude: t, address: i },
        '',
        !0
      ),
      this.createMessage(4, {
        attachment: { latitude: e, longitude: t, address: i },
      })
    )
  }
  createCustomMessage(e, t) {
    return (
      this.checkV2(),
      ye({ text: { type: 'string' } }, { text: e }, '', !0),
      ye({ rawAttachment: { type: 'string' } }, { rawAttachment: t }, '', !0),
      this.createMessage(100, { text: e, attachment: { raw: t } })
    )
  }
  createCustomMessageWithAttachment(e, t) {
    return (
      this.checkV2(),
      ye({ raw: { type: 'string' } }, e, 'attachment', !0),
      ye(
        { subType: { type: 'number', min: 0, required: !1 } },
        { subType: t },
        '',
        !0
      ),
      this.createMessage(
        100,
        t ? { attachment: e, subType: t } : { attachment: e }
      )
    )
  }
  createCallMessage(e, t, i, r, s) {
    return (
      this.checkV2(),
      ye({ type: { type: 'number', allowEmpty: !1 } }, { type: e }, '', !0),
      ye(
        { channelId: { type: 'string', allowEmpty: !1 } },
        { channelId: t },
        '',
        !0
      ),
      ye({ status: { type: 'number', allowEmpty: !1 } }, { status: i }, '', !0),
      ye(
        { durations: { type: 'array', allowEmpty: !1 } },
        { durations: r },
        '',
        !0
      ),
      this.createMessage(12, {
        text: s || '',
        attachment: { type: e, channelId: t, durations: r, status: i },
      })
    )
  }
  createForwardMessage(e) {
    if ((this.checkV2(), !e || [11, 5, 7, 10].includes(e.messageType)))
      return null
    var t = { messageClientId: Le(), messageType: e.messageType }
    return (
      e.text && (t.text = e.text),
      e.attachment && (t.attachment = e.attachment),
      e.attachment &&
        'uploadState' in e.attachment &&
        (t.attachmentUploadState = e.attachment.uploadState),
      this.createMessage(e.messageType, t)
    )
  }
  createTipsMessage(e) {
    return (
      this.checkV2(),
      ye({ text: { type: 'string', allowEmpty: !1 } }, { text: e }, '', !0),
      this.createMessage(10, { text: e })
    )
  }
}
class Us {
  constructor() {
    this.name = 'V2NIMMessageAttachmentCreator'
  }
  createLocationMessageAttachment(e, t, i) {
    return {
      latitude: 'number' == typeof e ? e : 0,
      longitude: 'number' == typeof t ? t : 0,
      address: 'string' == typeof i ? i : '',
    }
  }
  createCustomMessageAttachment(e) {
    return { raw: 'string' == typeof e ? e : '' }
  }
}
class xs {
  constructor(e) {
    ;(this.config = { enable: !1 }),
      (this.name = 'V2NIMClientAntispamUtil'),
      (this.core = e)
  }
  setOptions(e) {
    this.config = Object.assign(this.config, e)
  }
  reset(e) {
    'destroy' === e && (this.vocabInfo = void 0)
  }
  downloadLocalAntiSpamVocabs() {
    return Te(this, void 0, void 0, function* () {
      if (this.config.enable && !this.vocabInfo)
        try {
          var e = yield this.core.sendCmd('v2DownloadLocalAntiSpamVocabs', {
            tag: { version: 0, md5: '' },
          })
          this.vocabInfo = Object.assign(Object.assign({}, e.content.data), {
            thesaurus: JSON.parse(e.content.data.thesaurus).thesaurus,
          })
        } catch (e) {
          this.core.logger.warn(
            'V2NIMLocalAntispamUtil::downloadLocalAntiSpamVocabs error',
            e
          )
        }
    })
  }
  checkTextAntispam(e, t = '**') {
    if (!this.config.enable) return { operateType: 0, replacedText: e }
    if (
      (ye(
        {
          text: { type: 'string', required: !0, allowEmpty: !1 },
          replace: { type: 'string' },
        },
        { text: e, replace: t },
        '',
        !0
      ),
      !this.vocabInfo)
    )
      return { operateType: 0, replacedText: e }
    for (var i = e, r = 0; r < this.vocabInfo.thesaurus.length; r++) {
      var s = this.filterContent(i, this.vocabInfo.thesaurus[r], t)
      if (((i = s.replacedText), 2 === s.operateType || 3 === s.operateType))
        return s
    }
    return { operateType: i === e ? 0 : 1, replacedText: i }
  }
  filterContent(e, t, i) {
    for (var r = 0; r < t.keys.length; r++) {
      var s = t.keys[r],
        n = s.match || t.match,
        o = s.operate || t.operate,
        a = void 0
      try {
        a = this.matchContent(e, s.key, n, o, i)
      } catch (e) {}
      if (
        a &&
        ((e = a.replacedText), 2 === a.operateType || 3 === a.operateType)
      )
        return a
    }
    return { operateType: 1, replacedText: e }
  }
  matchContent(e, t, i, r, s) {
    var n = !1,
      o = null
    if (1 === i) {
      if (e.indexOf(t) >= 0) {
        n = !0
        var a = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        o = new RegExp(a, 'g')
      }
    } else 2 === i && (o = new RegExp(t, 'g')).test(e) && (n = !0)
    if (n && o)
      switch (r) {
        case 1:
          return { operateType: 1, replacedText: e.replace(o, s) }
        case 2:
          return { operateType: 2, replacedText: e }
        case 3:
          return { operateType: 3, replacedText: e }
      }
    return { operateType: 0, replacedText: e }
  }
}
class Fs extends ni {
  constructor(e) {
    super('YSFService', e),
      this.core._registerDep(xi, 'V2NIMConversationIdUtil'),
      this.core._registerDep(ws, 'V2NIMMessageCreator'),
      this.core._registerDep(Us, 'V2NIMMessageAttachmentCreator'),
      this.core._registerDep(xs, 'V2NIMClientAntispamUtil'),
      this.core._registerDep(Ds, 'V2NIMStorageService'),
      (this.sendUtil = new Bs(this.core, this)),
      (this.fileUtil = new zr(this.core)),
      (this.model = new Fi()),
      (this.notificationUtil = new vs(this.core)),
      vt({ cmdMap: us, cmdConfig: ms })
  }
  emit(e, ...t) {
    var i,
      r = `${this.name}::emit ${e.toString()}`
    if ('onSendMessage' === e) {
      var s = t[0]
      this.logger.log(
        `${r}`,
        `${s.messageClientId}/${s.messageServerId};createTime:${s.createTime};`,
        `sendingState:${s.sendingState};attachmentUploadState:${
          s.attachmentUploadState || 0
        };messageStatus:${
          null === (i = s.messageStatus) || void 0 === i ? void 0 : i.errorCode
        }`
      )
    } else if ('onReceiveMessages' === e) {
      var n = t[0]
      this.logger.log(
        `${r}`,
        n.map(
          (e) =>
            `${e.messageClientId}/${e.messageServerId};createTime:${e.createTime}`
        )
      )
    } else if ('onReceiveCustomNotifications' === e) {
      var o = t[0]
      this.logger.log(
        `${r}`,
        o.map(
          (e) =>
            `sender:${e.senderId};receiver:${e.receiverId};ctype:${e.conversationType};time:${e.timestamp}`
        )
      )
    } else this.logger.log(`${r}`, ...t)
    return super.emit(e, ...t)
  }
  sendMessage(e, t, i = {}, r) {
    return Te(this, void 0, void 0, function* () {
      ye({ message: { type: 'object' } }, { message: e }, '', !0),
        (e.messageClientId = e.messageClientId || Le()),
        ye(zi, { conversationId: t, message: e, params: i }, '', !0),
        Me(this.core.account, t)
      var s = this.core.timeOrigin.getTimeNode(),
        {
          messageBeforeSend: n,
          clientAntispamResult: o,
          hiddenParams: a,
        } = this.sendUtil.prepareMessage(e, t, i),
        c = yield this.sendUtil.doSendMessage({
          apiCallingTimeNode: s,
          messageBeforeSend: n,
          clientAntispamResult: o,
          hiddenParams: a,
          progress: r,
        })
      return (
        c.message.senderId === c.message.receiverId &&
          this.markMsgsAck([c.message]),
        c
      )
    })
  }
  sendCustomNotification(e, t, i) {
    return Te(this, void 0, void 0, function* () {
      this.checkV2(),
        Me(this.core.account, e),
        ye(gs, { content: t, params: i }, '', !0)
      var r = this.notificationUtil.generateNotificationTag(e, t, i)
      ;(r.type = 100),
        yield this.core.sendCmd('ysfSendCustomNotification', { tag: r })
    })
  }
  sendMessageFn(e) {}
  cancelMessageAttachmentUpload(e) {
    return this.fileUtil.cancelMessageAttachmentUpload(e)
  }
  markMsgsAck(e) {
    if (e && e.length > 0) {
      var t = e.map((e) => e.messageServerId).filter((e) => e && '0' !== e)
      0 !== t.length &&
        this.core.sendCmd('ysfBatchMarkRead', { sid: 101, cid: 2, ids: t })
    }
  }
  markNotificationAck(e) {
    if (e && e.length > 0) {
      var t = e.map((e) => e.idServer).filter((e) => e && '0' !== e)
      0 !== t.length &&
        this.core.sendCmd('ysfBatchMarkRead', { sid: 101, cid: 3, ids: t })
    }
  }
  ysfOnMsgHandler(e) {
    var t = $e(e, e.content.data, 'messageServerId'),
      i = $r(this.core, t)
    delete i.__clientExt,
      this.emit('onReceiveMessages', [i]),
      this.model.upsertMessages([i]),
      this.markMsgsAck([i])
  }
  ysfSyncOfflineMsgsHandler(e) {
    var t = e.content.datas
    ;(t = t.map((e) => $r(this.core, e))),
      this.markMsgsAck(t),
      this.emit('onReceiveMessages', t),
      this.model.upsertMessages(t)
  }
  ysfOnSysNotificationHandler(e) {
    var t = $e(e, e.content.data, 'idServer')
    this.markNotificationAck([t])
    var i = this.processSystemNotification(t)
    i && this.emit('onReceiveCustomNotifications', [i])
  }
  processSystemNotification(e) {
    var t = Object.assign(Object.assign({}, e), { conversationType: 1 })
    return delete t.type, t
  }
  ysfSyncSysNotificationHandler(e) {
    this.markNotificationAck(e.content.datas)
    var t = e.content.datas
      .sort((e, t) => e.timestamp - t.timestamp)
      .map((e) => this.processSystemNotification(e))
      .filter((e) => e)
    t && this.emit('onReceiveCustomNotifications', t)
  }
}
class Bs {
  constructor(e, t) {
    ;(this.uploadingMessageInfo = {}), (this.core = e), (this.service = t)
  }
  prepareMessage(e, t, i, r) {
    var s = this.checkIfResend(e),
      n = this.generateSendMessage({
        message: e,
        params: i,
        resend: s,
        conversationId: t,
        replyMessage: r,
      }),
      o = Object.assign(
        {},
        i.targetConfig ? { targetConfig: i.targetConfig } : {}
      ),
      { clientAntispamResult: a, text: c } = this.checkIfAntispam(i, n)
    return (
      (n.text = c),
      (n.clientAntispamHit = !!a && 3 === a.operateType),
      { messageBeforeSend: n, clientAntispamResult: a, hiddenParams: o }
    )
  }
  checkIfAntispam(e, t) {
    var i,
      r = t.text
    if (
      e.clientAntispamEnabled &&
      (0 === t.messageType || 10 === t.messageType)
    )
      if (
        1 ===
        (i = this.core.V2NIMClientAntispamUtil.checkTextAntispam
          ? this.core.V2NIMClientAntispamUtil.checkTextAntispam(
              t.text || '',
              e.clientAntispamReplace
            )
          : { operateType: 0, replacedText: '' }).operateType
      )
        r = i.replacedText
      else if (2 === i.operateType)
        throw (
          (this.service.emit(
            'onSendMessage',
            Object.assign(Object.assign({}, t), {
              sendingState: 2,
              messageStatus: { errorCode: de.V2NIM_ERROR_CODE_CLIENT_ANTISPAM },
            })
          ),
          new he({
            code: de.V2NIM_ERROR_CODE_CLIENT_ANTISPAM,
            detail: {
              reason: 'sendMessage: text intercepted by client antispam',
            },
          }))
        )
    return { clientAntispamResult: i, text: r }
  }
  doMsgReceiveReport(e, t) {
    if (e.senderId !== this.core.account) {
      var i = Ve(e, '__clientExt.statistics.apiCallingTime') || 0,
        r = Ve(e, '__clientExt.statistics.sendTime') || 0,
        s = Ve(e, '__clientExt.statistics.attachUploadDuration') || 0,
        n = this.core.timeOrigin.getNTPTime(),
        o = e.createTime,
        a = this.core.timeOrigin.checkNodeReliable(t.__receiveTimeNode)
          ? this.core.timeOrigin.getNTPTime(t.__receiveTimeNode)
          : n
      this.core.reporter.report('msgReceive', {
        msgId: e.messageServerId,
        clientId: e.messageClientId,
        serverTime: e.createTime,
        receiveTime: a,
        fromAccid: 1 === e.conversationType ? e.senderId : '',
        toAccid: e.receiverId,
        type: os(e.conversationType),
        tid: 1 === e.conversationType ? '' : e.receiverId,
        apiCallingTime: i,
        sendTime: r,
        attachUploadDuration: s,
        callbackTime: n,
        preHandleTime: n,
        result: 200,
        failReason: '',
        rt: n - o,
      })
    }
  }
  checkIfResend(e) {
    var t = this.service.model.getMessageById(e.messageClientId),
      i = !1
    if (e.messageServerId || 1 === e.sendingState)
      throw new he({
        code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
        detail: { reason: 'sendMessage: message has already been sent' },
      })
    if (1 === (null == t ? void 0 : t.sendingState))
      throw new he({
        code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
        detail: { reason: 'sendMessage: message has already been sent' },
      })
    return t && (i = !0), i
  }
  doSendMessage(e) {
    var t
    return Te(this, void 0, void 0, function* () {
      var i,
        r,
        {
          apiCallingTimeNode: s,
          messageBeforeSend: n,
          clientAntispamResult: o,
          hiddenParams: a,
          progress: c,
        } = e,
        d = {},
        l = this.service instanceof Fs
      if (l) i = 'ysfSendMessage'
      else if (1 === n.conversationType) i = 'v2SendP2pMessage'
      else if (2 === n.conversationType) i = 'v2SendTeamMessage'
      else {
        if (3 !== n.conversationType)
          throw new me({
            detail: {
              reason: `conversationType: ${n.conversationType} is not supported`,
            },
          })
        i = 'v2SendSuperTeamMessage'
      }
      if (
        (this.service.sendMessageFn(n),
        !l &&
          this.core.eventBus.emit('forwardSend/V2NIMMessageService/sendMsg', n),
        !n.attachment ||
          !('uploadState' in n.attachment) ||
          n.attachment.url ||
          (0 !== n.attachment.uploadState && 2 !== n.attachment.uploadState))
      )
        this.service.emit('onSendMessage', n)
      else {
        var p = Date.now()
        try {
          ;(n.attachmentUploadState = 3),
            (n.attachment.uploadState = 3),
            this.service.emit('onSendMessage', n),
            yield this.service.fileUtil.doSendFile(n, c),
            (n.attachmentUploadState = 1),
            (n.attachment.uploadState = 1),
            this.service.emit('onSendMessage', n)
        } catch (e) {
          throw (
            ((n.attachmentUploadState = 2),
            (n.attachment.uploadState = 2),
            (n.sendingState = 2),
            (n.messageStatus = {
              errorCode: e.code || de.V2NIM_ERROR_CODE_UNKNOWN,
            }),
            this.service.emit('onSendMessage', n),
            (d.attachUploadDuration = Date.now() - p),
            this.doSendMessageFailed(s, d, n, e),
            e)
          )
        }
        d.attachUploadDuration = Date.now() - p
      }
      this.core.timeOrigin.checkNodeReliable(s) &&
        ((d.apiCallingTime = this.core.timeOrigin.getNTPTime(s)),
        (d.sendTime = this.core.timeOrigin.getNTPTime()),
        (n.__clientExt = { statistics: d }))
      try {
        r = yield this.core.sendCmd(i, { tag: Object.assign({}, n, a) })
      } catch (e) {
        throw (
          (this.doSendMessageFailed(s, d, n, e),
          (n.sendingState = 2),
          (n.messageStatus = {
            errorCode: e.code || de.V2NIM_ERROR_CODE_UNKNOWN,
          }),
          this.service.emit('onSendMessage', n),
          e)
        )
      }
      var h = Ve(r, 'content.data.errorCode'),
        u = Object.assign(
          Object.assign(
            Object.assign(Object.assign({}, n), r.content.data),
            n.aiConfig
              ? {
                  aiConfig: Object.assign(
                    Object.assign({}, n.aiConfig),
                    (null === (t = r.content.data) || void 0 === t
                      ? void 0
                      : t.aiConfig) || {}
                  ),
                }
              : {}
          ),
          {
            sendingState: 1,
            messageStatus: { errorCode: h && 200 !== h ? h : 200 },
          }
        )
      this.service.sendMessageFn(u),
        !l &&
          this.core.eventBus.emit('forwardSend/V2NIMMessageService/sendMsg', u),
        this.doMsgSendReport(s, d, n)
      var m = u.antispamResult
      return (
        m && (u.messageStatus.errorCode = de.V2NIM_ERROR_CODE_SERVER_ANTISPAM),
        delete u.antispamResult,
        this.service.emit('onSendMessage', u),
        Object.assign(
          Object.assign({ message: u }, m ? { antispamResult: m } : {}),
          o ? { clientAntispamResult: o } : {}
        )
      )
    })
  }
  doSendMessageFailed(e, t, i, r) {
    var s = Object.assign(Object.assign({}, i), { sendingState: 2 })
    this.core.eventBus.emit('forwardSend/V2NIMMessageService/sendMsg', s),
      this.service.sendMessageFn(s),
      this.doMsgSendReport(e, t, i, r)
  }
  doMsgSendReport(e, t, i, r) {
    ;(t.apiCallingTime = this.core.timeOrigin.getNTPTime(e)),
      (t.sendTime = this.core.timeOrigin.getNTPTime())
    var s = this.core.timeOrigin.getNTPTime(),
      n = Ve(r, 'detail.reason')
    this.core.reporter.report('msgSend', {
      msgId: i.messageServerId,
      clientId: i.messageClientId,
      msgTime: i.createTime,
      fromAccid: 1 === i.conversationType ? i.senderId : '',
      toAccid: i.receiverId,
      type: os(i.conversationType),
      tid: 1 === i.conversationType ? '' : i.receiverId,
      result: r ? r.code : 200,
      failReason: n || (null == r ? void 0 : r.message) || '',
      rt: s - t.apiCallingTime,
      apiCallingTime: t.apiCallingTime,
      sendTime: t.sendTime,
      attachUploadDuration: t.attachUploadDuration,
      apiCallbackTime: s,
    })
  }
  generateSendMessage(e) {
    var t,
      i,
      {
        conversationId: r,
        replyMessage: s,
        resend: n,
        message: o,
        params: a,
      } = e,
      c = {}
    if (s) {
      var d = s.threadRoot
      c = {
        threadReply: {
          senderId: s.senderId,
          receiverId: s.receiverId,
          messageServerId: s.messageServerId,
          createTime: s.createTime,
          messageClientId: s.messageClientId,
          conversationType: s.conversationType,
          conversationId: s.conversationId,
        },
        threadRoot: {
          senderId: d ? d.senderId : s.senderId,
          receiverId: d ? d.receiverId : s.receiverId,
          messageServerId: d ? d.messageServerId : s.messageServerId,
          createTime: d ? d.createTime : s.createTime,
          messageClientId: d ? d.messageClientId : s.messageClientId,
          conversationType: d ? d.conversationType : s.conversationType,
          conversationId: d ? d.conversationId : s.conversationId,
        },
      }
    }
    var l = this.core.V2NIMConversationIdUtil.parseConversationType(r),
      p = this.core.V2NIMConversationIdUtil.parseConversationTargetId(r)
    a.pushConfig &&
      !0 !== a.pushConfig.forcePush &&
      (delete a.pushConfig.forcePushContent,
      delete a.pushConfig.forcePushAccountIds)
    var h = {},
      u = {}
    if (a.aiConfig) {
      var m = Ve(a, 'aiConfig.content.msg'),
        g = Ve(a, 'aiConfig.content.type') || 0
      m
        ? (u = { msg: m, type: g })
        : void 0 === m &&
          0 === o.messageType &&
          (u = { msg: o.text || '', type: g }),
        ((h = Object.assign(
          { aiStreamStatus: 0, aiStream: !1 },
          a.aiConfig
        )).aiStatus = 1),
        void 0 !== u.msg && (h.content = u)
    }
    var v =
        null ===
          (i =
            null === (t = this.core.V2NIMUserService) || void 0 === t
              ? void 0
              : t.model) || void 0 === i
          ? void 0
          : i.getUser(this.core.account),
      f = (null == v ? void 0 : v.updateTime) || 0
    return Object.assign(
      Object.assign(
        Object.assign(
          Object.assign(
            Object.assign(
              Object.assign(Object.assign(Object.assign({}, o), c), {
                messageConfig: Object.assign(
                  Object.assign({}, o.messageConfig),
                  a.messageConfig
                ),
                routeConfig: Object.assign(
                  Object.assign({}, o.routeConfig),
                  a.routeConfig
                ),
                pushConfig: Object.assign(
                  Object.assign({}, o.pushConfig),
                  a.pushConfig
                ),
                antispamConfig: Object.assign(
                  Object.assign({}, o.antispamConfig),
                  a.antispamConfig
                ),
                robotConfig: Object.assign(
                  Object.assign({}, o.robotConfig),
                  a.robotConfig
                ),
              }),
              h && h.accountId ? { aiConfig: h } : {}
            ),
            o.attachment ? { attachment: Object.assign({}, o.attachment) } : {}
          ),
          {
            resend: n,
            senderId: this.core.account,
            conversationType: l,
            receiverId: p,
            conversationId:
              this.core.V2NIMConversationIdUtil.messageConversationId({
                conversationType: l,
                senderId: this.core.account,
                receiverId: p,
              }),
          }
        ),
        f ? { userUpdateTime: f } : {}
      ),
      { sendingState: 3 }
    )
  }
}
class $s {
  constructor(e, t) {
    ;(this.core = e), (this.service = t)
  }
  checkIfModify(e, t) {
    if ('0' === e.messageServerId)
      throw new he({
        code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
        detail: { reason: 'modifyMessage: messageServerId cannot be empty' },
      })
    if (![0, 1, 2, 3, 4, 6, 10, 12, 100].includes(e.messageType))
      throw new he({
        code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
        detail: {
          reason: `modifyMessage: messageType ${e.messageType} not correct`,
        },
      })
    if ([0, 1, 2, 3, 6, 10, 12].includes(e.messageType) && t.attachment)
      throw new he({
        code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
        detail: {
          reason: `modifyMessage: messageType ${e.messageType} can not modify attachment`,
        },
      })
    var i = ['subType', 'text', 'serverExtension', 'attachment']
    if (!i.some((e) => void 0 !== Ve(t, e)))
      throw new he({
        code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
        detail: { reason: 'modifyMessage: missing modified params' },
      })
    if (
      i.every((i) =>
        'attachment' === i
          ? e.attachment && t.attachment
            ? Jr(e.messageType, e.attachment) ===
              Jr(e.messageType, t.attachment)
            : !t.attachment
          : Ve(e, i) === Ve(t, i)
      )
    )
      throw new he({
        code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
        detail: { reason: 'modifyMessage: no change' },
      })
  }
  prepareMessage(e, t) {
    var i = this.generateSendMessage(e, t),
      { clientAntispamResult: r, text: s } = this.checkIfAntispam(t, i)
    return (
      (i.text = s),
      (i.clientAntispamHit = !!r && 3 === r.operateType),
      { messageBeforeSend: i, clientAntispamResult: r }
    )
  }
  modifyMessage(e, t) {
    return Te(this, void 0, void 0, function* () {
      var i
      if (1 === e.conversationType) i = 'v2MessageP2pModify'
      else if (2 === e.conversationType) i = 'v2MessageTeamModify'
      else {
        if (3 !== e.conversationType)
          throw new me({
            detail: {
              reason: `conversationType: ${e.conversationType} is not supported`,
            },
          })
        i = 'v2MessageSuperTeamModify'
      }
      var r = yield this.core.sendCmd(i, { tag: e })
      if (t && 3 === t.operateType)
        return {
          errorCode: de.V2NIM_ERROR_CODE_CLIENT_ANTISPAM,
          clientAntispamResult: t,
        }
      var s = Object.assign(Object.assign({}, e), r.content.data),
        n = s.antispamResult
      if (n)
        return Object.assign(
          { errorCode: de.V2NIM_ERROR_CODE_SERVER_ANTISPAM, antispamResult: n },
          t ? { clientAntispamResult: t } : {}
        )
      delete s.antispamResult
      var o = $r(this.core, s)
      return (
        this.service.model.upsertMessages([o]),
        this.core.eventBus.emit('V2NIMMessageService/modifyMsg', o),
        this.core.eventBus.emit('forwardSend/V2NIMMessageService/modifyMsg', o),
        Object.assign(
          Object.assign(
            { errorCode: 200, message: o },
            n ? { antispamResult: n } : {}
          ),
          t ? { clientAntispamResult: t } : {}
        )
      )
    })
  }
  checkIfAntispam(e, t) {
    var i,
      r = t.text
    if (
      e.clientAntispamEnabled &&
      (0 === t.messageType || 10 === t.messageType)
    )
      if (
        1 ===
        (i = this.core.V2NIMClientAntispamUtil.checkTextAntispam
          ? this.core.V2NIMClientAntispamUtil.checkTextAntispam(
              t.text || '',
              e.clientAntispamReplace
            )
          : { operateType: 0, replacedText: '' }).operateType
      )
        r = i.replacedText
      else if (2 === i.operateType)
        throw new he({
          code: de.V2NIM_ERROR_CODE_CLIENT_ANTISPAM,
          detail: {
            reason: 'sendMessage: text intercepted by client antispam',
          },
        })
    return { clientAntispamResult: i, text: r }
  }
  generateSendMessage(e, t) {
    var i
    return Object.assign(
      Object.assign(
        {
          messageConfig: {
            lastMessageUpdateEnabled:
              null === (i = e.messageConfig) || void 0 === i
                ? void 0
                : i.lastMessageUpdateEnabled,
          },
          routeConfig: Object.assign({ routeEnabled: !0 }, t.routeConfig),
          pushConfig: Object.assign(
            { pushEnabled: !0, pushNickEnabled: !0, forcePush: !1 },
            t.pushConfig
          ),
          antispamConfig: Object.assign(
            { antispamEnabled: !0 },
            t.antispamConfig
          ),
        },
        t.attachment ? { attachment: t.attachment } : {}
      ),
      {
        conversationType: e.conversationType,
        senderId: e.senderId,
        receiverId: e.receiverId,
        createTime: e.createTime,
        messageClientId: e.messageClientId,
        messageServerId: e.messageServerId,
        messageType: e.messageType,
        subType: t.subType,
        text: t.text,
        serverExtension: t.serverExtension,
      }
    )
  }
}
class Gs {
  constructor(e, t) {
    ;(this.emitRevokeMessage = (e) => {
      var t = e.map((e) => {
        var t = Hr(this.core, e)
        return (
          3 === t.messageRefer.conversationType
            ? this.core.eventBus.emit('V2NIMSync/updateTimetag', {
                deleteSuperTeamMsg: e.createTime,
              })
            : this.core.eventBus.emit('V2NIMSync/updateTimetag', {
                recallMsg: e.createTime,
              }),
          t
        )
      })
      t.forEach((e) => {
        this.service.model.deleteMessage(e.messageRefer.messageClientId)
      }),
        this.service.emit('onMessageRevokeNotifications', t),
        this.core.eventBus.emit('V2NIMMessageService/revokeMessages', t)
    }),
      (this.core = e),
      (this.service = t),
      (this.logger = e.logger)
  }
  revokeMessage(e, t) {
    return Te(this, void 0, void 0, function* () {
      if (
        (ye(Xi, { message: e, params: t }, '', !0),
        Me(this.core.account, e.conversationId),
        1 === e.conversationType && e.senderId !== this.core.account)
      )
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: {
            reason: 'revokeMessage: p2p message senderId is not current user',
          },
        })
      if (!e.messageServerId || '0' === e.messageServerId)
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: {
            reason:
              'revokeMessage: cannot revoke message with invalid messageServerId: ' +
              e.messageServerId,
          },
        })
      var i =
          3 === e.conversationType
            ? 'v2RevokeSuperTeamMessage'
            : 'v2RevokeMessage',
        r = Object.assign(Object.assign(Object.assign({}, e), t), {
          attach: t && t.serverExtension,
          sysMsgType: { 1: 7, 2: 8, 3: 12 }[e.conversationType],
          opeAccount: this.core.account,
        })
      yield this.core.sendCmd(i, { tag: r })
      var s = [
        JSON.parse(
          JSON.stringify({
            postscript: t && t.postscript,
            revokeType: { 1: 1, 2: 2, 3: 3 }[e.conversationType],
            revokeAccountId: this.core.account,
            serverExtension: t && t.serverExtension,
            messageRefer: qr(this.core, e),
          })
        ),
      ]
      this.revokeMessagesFn(s),
        this.core.eventBus.emit(
          'forwardSend/V2NIMMessageService/revokeMessage',
          r
        )
    })
  }
  deleteMessage(e, t) {
    return Te(this, void 0, void 0, function* () {
      if ((ye(tr, e, '', !0), 3 === e.sendingState))
        this.service.fileUtil.cancelMessageAttachmentUpload(e)
      else if (e.sendingState && 1 !== e.sendingState)
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: { reason: 'deleteMessage: cannot delete unsent message' },
        })
      var i = { messageRefer: qr(this.core, e), serverExtension: t },
        r = Date.now()
      e.messageServerId &&
        '0' !== e.messageServerId &&
        (r = (yield this.core.sendCmd('v2DeleteMessage', { tag: i })).content
          .timetag)
      var s = [
        { serverExtension: t, messageRefer: qr(this.core, e), deleteTime: r },
      ]
      this.core.eventBus.emit(
        'forwardSend/V2NIMMessageService/deleteSelfMsgs',
        [Object.assign(Object.assign({}, i), { deleteTime: r })]
      ),
        this.deleteMessagesFn(s)
    })
  }
  deleteMessages(e, t) {
    return Te(this, void 0, void 0, function* () {
      ye(ir, { messages: e }, '', !0)
      var i = [],
        r = []
      if (0 === e.length)
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: { reason: 'deleteMessages: message array length is 0' },
        })
      for (var s = e[0].conversationId, n = 0; n < e.length; n++) {
        if (3 === e[n].sendingState)
          this.service.fileUtil.cancelMessageAttachmentUpload(e[n])
        else if (e[n].sendingState && 1 !== e[n].sendingState)
          throw new he({
            code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
            detail: {
              reason: `deleteMessage: sendingState should be succeeded, please check message at index: ${n}`,
            },
          })
        if (n >= 1 && e[n].conversationId !== s)
          throw new he({
            code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
            detail: {
              reason:
                'deleteMessages: only allow to delete messages from same conversation',
            },
          })
        e[n].messageServerId && '0' !== e[n].messageServerId
          ? i.push(e[n])
          : r.push(e[n])
      }
      var o = Date.now(),
        a = [...r]
      try {
        if (i.length > 0) {
          var c = yield this.core.sendCmd('v2DeleteMessages', {
            tag: i.map((e) => ({ messageRefer: e, serverExtension: t })),
          })
          ;(o = c.content.timetag), (a = [...a, ...i])
        }
      } catch (e) {
        if (0 === r.length) throw e
        this.logger.warn(
          'V2NIMMessageService:deleteMessages: delete messages with serverId failed'
        )
      }
      var d = a.map((e) => ({
        serverExtension: t,
        messageRefer: qr(this.core, e),
        deleteTime: o,
      }))
      this.core.eventBus.emit(
        'forwardSend/V2NIMMessageService/deleteSelfMsgs',
        a.map((e) => ({ messageRefer: e, serverExtension: t, deleteTime: o }))
      ),
        this.deleteMessagesFn(d)
    })
  }
  revokeMessagesFn(e) {
    e.forEach((e) => {
      this.service.model.deleteMessage(e.messageRefer.messageClientId)
    }),
      this.service.emit('onMessageRevokeNotifications', e),
      this.core.eventBus.emit('V2NIMMessageService/revokeMessages', e)
  }
  deleteMessagesFn(e) {
    e.forEach((e) => {
      this.service.model.deleteMessage(e.messageRefer.messageClientId),
        this.core.eventBus.emit('V2NIMSync/updateTimetag', {
          deleteSelfMsgs: e.deleteTime,
        })
    }),
      this.service.emit('onMessageDeletedNotifications', e),
      this.core.eventBus.emit('V2NIMMessageService/deleteMessages', e)
  }
}
class js {
  constructor(e, t) {
    ;(this.core = e), (this.service = t), (this.logger = e.logger)
  }
  stopAIStreamMessage(e, t) {
    var i
    return Te(this, void 0, void 0, function* () {
      this.checkAI(),
        yield this.core.sendCmd('v2AIStopModelStreamCall', {
          tag: {
            serverId: e.messageServerId,
            clientId: e.messageClientId,
            type: e.conversationType,
            from: e.senderId,
            to: e.receiverId,
            aiAccount:
              null === (i = e.aiConfig) || void 0 === i ? void 0 : i.accountId,
            opeType: t.operationType,
            updateContent: t.updateContent,
            messageTime: e.createTime,
          },
        }),
        this.logger.log(
          `V2AIUtil::streamMessageStop,clientId:${e.messageClientId}`
        ),
        this.core.V2NIMAIService.model.completeAiStream(e.messageClientId)
    })
  }
  regenAIMessage(e, t) {
    var i, r, s, n, o, a, c, d
    return Te(this, void 0, void 0, function* () {
      this.checkAI()
      var l = this.core.V2NIMAIService.model.getAiStream(e.messageClientId)
      if (l) {
        if (!(null == l ? void 0 : l.isComplete))
          throw new he({
            code: de.V2NIM_ERROR_CODE_MISUSE,
            detail: {
              reason: `msg::regenAIMessage streamCache is not complete, msgId:${e.messageClientId}`,
            },
          })
      } else if (-1 === (null === (i = e.streamConfig) || void 0 === i ? void 0 : i.status) || 1 === (null === (r = e.streamConfig) || void 0 === r ? void 0 : r.status)) throw new he({ code: de.V2NIM_ERROR_CODE_MISUSE, detail: { reason: `msg::regenAIMessage message streamConfig.status forbidden ${e.streamConfig.status}` } })
      yield this.core.sendCmd('v2AIRegenMessage', {
        tag: {
          fromAccount: e.senderId,
          to: e.receiverId,
          aiAccount:
            null === (s = e.aiConfig) || void 0 === s ? void 0 : s.accountId,
          serverId: e.messageServerId,
          clientId: e.messageClientId,
          time: e.createTime,
          type: e.conversationType,
          opeType: t.operationType,
          replyMsgFromAccount:
            null === (n = e.threadReply) || void 0 === n ? void 0 : n.senderId,
          replyMsgToAccount:
            null === (o = e.threadReply) || void 0 === o
              ? void 0
              : o.receiverId,
          replyMsgTime:
            null === (a = e.threadReply) || void 0 === a
              ? void 0
              : a.createTime,
          replyMsgIdServer:
            null === (c = e.threadReply) || void 0 === c
              ? void 0
              : c.messageServerId,
          replyMsgIdClient:
            null === (d = e.threadReply) || void 0 === d
              ? void 0
              : d.messageClientId,
        },
      }),
        1 === t.operationType &&
          this.core.V2NIMAIService.model.setAiStream(e.messageClientId, {
            isComplete: !1,
            queryStatus: 0,
            chunks: [],
          })
    })
  }
  checkAI() {
    if (!this.hasAI())
      throw new he({
        code: de.V2NIM_ERROR_CODE_MISUSE,
        detail: { reason: 'V2NIMAIService is not registered' },
      })
  }
  hasAI() {
    var e
    return !!(null === (e = this.core.V2NIMAIService) || void 0 === e
      ? void 0
      : e.name)
  }
}
class qs {
  constructor(e, t) {
    ;(this.core = e),
      (this.service = t),
      (this.model = t.model),
      (this.receiptUtil = t.receiptUtil),
      (this.logger = this.core.logger)
  }
  setAIStreamPlaceholder(e) {
    this.service.aiUtil.hasAI() &&
      e.forEach((e) => {
        var t
        1 ===
          (null === (t = e.streamConfig) || void 0 === t ? void 0 : t.status) &&
          this.core.V2NIMAIService.model.setAiStream(
            e.messageClientId,
            { isComplete: !1, queryStatus: 0, chunks: [], msg: e },
            !0
          )
      })
  }
  onMsgHandler(e) {
    var t = $e(e, e.content.msg, 'messageServerId'),
      { _conversationOnlineSyncNotify: i, _conversationOnlineSyncData: r } = t,
      s = Ee(t, [
        '_conversationOnlineSyncNotify',
        '_conversationOnlineSyncData',
      ]),
      n = $r(this.core, s),
      o = this.service._filterMessage(n)
    this.logger.log(
      `v2OnMsgHandler::recvMsg ${n.messageClientId}/${n.messageServerId}/${n.createTime};isHitFilter:${o}`
    ),
      3 === n.conversationType
        ? this.core.eventBus.emit('V2NIMSync/updateTimetag', {
            superTeamRoamingMsgs: n.createTime,
            offlineMsgs: n.createTime,
          })
        : this.core.eventBus.emit('V2NIMSync/updateTimetag', {
            roamingMsgs: n.createTime,
            offlineMsgs: n.createTime,
          }),
      this.service.config.compatibleWithV1 ||
        (this.service.markMsgsAck([n]),
        this.service.sendUtil.doMsgReceiveReport(n, e)),
      delete n.__clientExt,
      this.setAIStreamPlaceholder([n]),
      5 !== n.messageType &&
        this.core.V2NIMUserService.checkUserUpdate &&
        this.core.V2NIMUserService.checkUserUpdate(n, n.userUpdateTime),
      5 === n.messageType &&
        this.core.eventBus.emit('V2NIMTeamService/notification', t),
      o ||
        (this.service.emit('onReceiveMessages', [n]),
        this.model.upsertMessages([n]),
        i &&
          this.core.eventBus.emit(
            'V2NIMConversationService/conversationOnlineSyncNotify',
            { content: { info: JSON.parse(i), data: JSON.parse(r) } },
            n
          ),
        this.core.eventBus.emit('V2NIMMessageService/onMsg', n))
  }
  syncOfflineMsgsHandler(e) {
    var t = e.content.datas
    ;(t = t.map((e) => $r(this.core, e))),
      0 !== (t = this.service._filterMessagesByFn(t)).length &&
        (!this.service.config.compatibleWithV1 && this.service.markMsgsAck(t),
        this.service.emit('onReceiveMessages', t),
        this.model.upsertMessages(t),
        this.core.eventBus.emit('V2NIMMessageService/offlineMsgs', t))
  }
  syncRoamingMsgsHandler(e) {
    var t = e.content.datas
    ;(t = t.map((e) => $r(this.core, e))),
      this.setAIStreamPlaceholder(t),
      0 !== (t = this.service._filterMessagesByFn(t)).length &&
        (this.service.emit('onReceiveMessages', t),
        this.model.upsertMessages(t),
        this.core.eventBus.emit('V2NIMMessageService/roamingMsgs', t))
  }
  onP2PMessageReceiptsHandler(e) {
    this.receiptUtil.onP2PMessageReceiptsHandler(e)
  }
  onTeamMessageReceiptsHandler(e) {
    this.receiptUtil.onTeamMessageReceiptsHandler(e)
  }
  syncP2PMessagReceiptsHandler(e) {
    this.receiptUtil.syncP2PMessagReceiptsHandler(e)
  }
  syncRevokeMessageHandler(e) {
    this.service.deleteUtil.emitRevokeMessage(e.content.datas)
  }
  onRevokeMessageHandler(e) {
    var t = e.content.data
    this.service.deleteUtil.emitRevokeMessage([t])
  }
  onDeleteMessageHandler(e) {
    var t = e.content.data,
      i = {
        serverExtension: t.serverExtension,
        deleteTime: t.deleteTime,
        messageRefer: jr(this.core, t.messageRefer),
      }
    this.service.deleteUtil.deleteMessagesFn([i])
  }
  onDeleteMessagesHandler(e) {
    var t = e.content.data.map((e) => ({
      serverExtension: e.serverExtension,
      deleteTime: e.deleteTime,
      messageRefer: jr(this.core, e.messageRefer),
    }))
    this.service.deleteUtil.deleteMessagesFn(t)
  }
  syncOnDeleteMessagesHandler(e) {
    var t = e.content.datas.map((e) => ({
      serverExtension: e.serverExtension,
      deleteTime: e.deleteTime,
      messageRefer: jr(this.core, e.messageRefer),
    }))
    this.service.emit('onMessageDeletedNotifications', t)
  }
  v2MessageOnModifiedHandler(e) {
    var t = $r(this.core, e.content.data)
    this.model.upsertMessages([t]),
      this.service.aiUtil.hasAI() &&
        this.core.V2NIMAIService.model.completeAiStream(t.messageClientId),
      this.core.eventBus.emit('forwardSend/V2NIMMessageService/modifyMsg', t),
      this.core.eventBus.emit('V2NIMMessageService/modifyMsg', t),
      this.core.eventBus.emit(
        'V2NIMSync/updateTimetag',
        3 === t.conversationType
          ? { superTeamModifyMessage: t.modifyTime }
          : { p2pTeamModifyMessage: t.modifyTime }
      ),
      this.service.emit('onReceiveMessagesModified', [t])
  }
  v2MessageSyncModifiedHandler(e) {
    var t = e.content.datas
      .map((e) => $r(this.core, e))
      .filter((e) => {
        var t,
          i =
            (null === (t = this.model.getMessageById(e.messageClientId)) ||
            void 0 === t
              ? void 0
              : t.modifyTime) || 0
        return (e.modifyTime || 0) > i
      })
    t.length > 0 &&
      (this.model.upsertMessages(t),
      t.forEach((e) => {
        this.service.aiUtil.hasAI() &&
          this.core.V2NIMAIService.model.completeAiStream(e.messageClientId),
          this.core.eventBus.emit(
            'forwardSend/V2NIMMessageService/modifyMsg',
            e
          )
      }),
      this.service.emit('onReceiveMessagesModified', t))
  }
  v2MessageSyncSuperTeamModifiedHandler(e) {
    this.v2MessageSyncModifiedHandler(e)
  }
}
class Hs {
  constructor(e, t) {
    ;(this.core = e), (this.service = t), (this.logger = this.core.logger)
  }
  setListener() {
    this.core.eventBus.on(
      'forwardReceive/V2NIMMessageService/sendMsg',
      this.service.sendMessageFn.bind(this.service)
    ),
      this.core.eventBus.on(
        'forwardReceive/V2NIMMessageService/revokeMessages',
        this.service.deleteUtil.emitRevokeMessage.bind(this.service.deleteUtil)
      ),
      this.core.eventBus.on(
        'forwardReceive/V2NIMMessageService/deleteMessages',
        this.service.deleteUtil.deleteMessagesFn.bind(this.service.deleteUtil)
      ),
      this.core.eventBus.on(
        'V2NIMConversationService/deleteConversation',
        (e) => {
          e.forEach((e) => this.service.model.deleteMessages(e))
        }
      ),
      this.core.eventBus.on('V2NIMAIService/receiveMessagesModified', (e) =>
        this.service.emit('onReceiveMessagesModified', e)
      )
  }
  beforeEmit(e, ...t) {
    var i,
      r,
      s,
      n = `${this.service.name}::emit ${e.toString()}`
    if ('onSendMessage' === e) {
      var o = t[0]
      this.logger.log(
        `${n}`,
        `${o.messageClientId}/${o.messageServerId}/${o.createTime};`,
        `sendingState:${o.sendingState};attachmentUploadState:${
          o.attachmentUploadState || 0
        };messageStatus:${
          null === (i = o.messageStatus) || void 0 === i ? void 0 : i.errorCode
        };config.lastMsg:${
          null === (r = o.messageConfig) || void 0 === r
            ? void 0
            : r.lastMessageUpdateEnabled
        };config.unread:${
          null === (s = o.messageConfig) || void 0 === s
            ? void 0
            : s.unreadEnabled
        }`
      )
    } else if ('onReceiveMessages' === e || 'onReceiveMessagesModified' === e) {
      var a = t[0]
      this.logger.log(
        `${n}`,
        a.map((e) => {
          var t, i
          return `${e.messageClientId}/${e.messageServerId}/${
            e.createTime
          };config.lastMsg:${
            null === (t = e.messageConfig) || void 0 === t
              ? void 0
              : t.lastMessageUpdateEnabled
          };config.unread:${
            null === (i = e.messageConfig) || void 0 === i
              ? void 0
              : i.unreadEnabled
          }`
        })
      )
    } else if ('onMessageRevokeNotifications' === e) {
      var c = t[0]
      this.logger.log(
        `${n}`,
        c.map(
          (e) =>
            `msg:${e.messageRefer.messageClientId}/${e.messageRefer.messageServerId};revokeAccountId:${e.revokeAccountId}`
        )
      )
    } else if ('onMessageDeletedNotifications' === e) {
      var d = t[0]
      this.logger.log(
        `${n}`,
        d.map(
          (e) =>
            `msg:${e.messageRefer.messageClientId}/${e.messageRefer.messageServerId};deleteTime:${e.deleteTime}`
        )
      )
    } else this.logger.log(`${n}`, ...t)
  }
}
class Ys extends ni {
  constructor(e, t = {}) {
    super('V2NIMMessageService', e),
      (this.customAttachmentParsers = []),
      (this.config = { compatibleWithV1: !0 }),
      (this.filterFn = void 0),
      this.core._registerDep(xi, 'V2NIMConversationIdUtil'),
      this.core._registerDep(ws, 'V2NIMMessageCreator'),
      this.core._registerDep(Us, 'V2NIMMessageAttachmentCreator'),
      this.core._registerDep(xs, 'V2NIMClientAntispamUtil'),
      (this.receiptUtil = new Rr(this.core, this)),
      (this.fileUtil = new zr(this.core)),
      (this.sendUtil = new Bs(this.core, this)),
      (this.modifyUtil = new $s(this.core, this)),
      (this.deleteUtil = new Gs(this.core, this)),
      (this.aiUtil = new js(this.core, this)),
      (this.model = new Fi()),
      (this.event = new Hs(this.core, this)),
      (this.handler = new qs(this.core, this)),
      'v2' === this.core.options.apiVersion &&
        (vt({ cmdMap: Qr, cmdConfig: ns }),
        this.setOptions(t),
        this.setListener())
  }
  setOptions(e) {
    var t
    ;(null === (t = this.core.msg) || void 0 === t ? void 0 : t.name)
      ? (this.config.compatibleWithV1 = !0)
      : (this.config.compatibleWithV1 = !1),
      (this.config = Object.assign(this.config, e))
  }
  setListener() {
    this.event.setListener()
  }
  reset() {
    this.model.reset(), this.receiptUtil.reset()
  }
  emit(e, ...t) {
    return this.event.beforeEmit(e, ...t), super.emit(e, ...t)
  }
  checkExtendUtil() {
    var e
    if (
      !(null === (e = this.core.V2NIMMessageExtendUtil) || void 0 === e
        ? void 0
        : e.name)
    )
      throw new he({
        code: de.V2NIM_ERROR_CODE_MISUSE,
        detail: { reason: 'V2NIMMessageLogUtil is not registered' },
      })
  }
  checkLogUtil() {
    var e
    if (
      !(null === (e = this.core.V2NIMMessageLogUtil) || void 0 === e
        ? void 0
        : e.name)
    )
      throw new he({
        code: de.V2NIM_ERROR_CODE_MISUSE,
        detail: { reason: 'V2NIMMessageExtendUtil is not registered' },
      })
  }
  getMessageList(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkV2(), this.checkLogUtil()
      var t = yield this.core.V2NIMMessageLogUtil.getMessageList(e)
      return (
        (t = this._filterMessageByClearTime(e.conversationId, t)),
        this._filterMessagesByFn(t)
      )
    })
  }
  getMessageListEx(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkV2(), this.checkLogUtil()
      var t = yield this.core.V2NIMMessageLogUtil.getMessageList(e)
      return (
        (t = this._filterMessageByClearTime(e.conversationId, t)),
        {
          messages: this._filterMessagesByFn(t),
          anchorMessage: t.length > 0 ? t[t.length - 1] : null,
        }
      )
    })
  }
  getMessageListByRefers(e) {
    return (
      this.checkV2(),
      this.checkLogUtil(),
      this.core.V2NIMMessageLogUtil.getMessageListByRefers(e)
    )
  }
  clearHistoryMessage(e) {
    return (
      this.checkV2(),
      this.checkLogUtil(),
      this.core.V2NIMMessageLogUtil.clearHistoryMessage(e)
    )
  }
  clearRoamingMessage(e) {
    return (
      this.checkV2(),
      this.checkLogUtil(),
      this.core.V2NIMMessageLogUtil.clearRoamingMessage(e)
    )
  }
  pinMessage(e, t) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.pinMessage(e, t)
    )
  }
  unpinMessage(e, t) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.unpinMessage(e, t)
    )
  }
  updatePinMessage(e, t) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.updatePinMessage(e, t)
    )
  }
  voiceToText(e) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      'string' == typeof e.duration && (e.duration = Number(e.duration)),
      this.core.V2NIMMessageExtendUtil.voiceToText(e)
    )
  }
  getPinnedMessageList(e) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.getPinnedMessageList(e)
    )
  }
  addQuickComment(e, t, i, r) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.addQuickComment(e, t, i, r)
    )
  }
  removeQuickComment(e, t, i) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.removeQuickComment(e, t, i)
    )
  }
  getQuickCommentList(e) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.getQuickCommentList(e)
    )
  }
  addCollection(e) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.addCollection(e)
    )
  }
  removeCollections(e) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.removeCollections(e)
    )
  }
  updateCollectionExtension(e, t) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.updateCollectionExtension(e, t)
    )
  }
  getCollectionListByOption(e) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.getCollectionListByOption(e)
    )
  }
  getCollectionListExByOption(e) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.getCollectionListExByOption(e)
    )
  }
  searchCloudMessages(e) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.searchCloudMessages(e)
    )
  }
  searchCloudMessagesEx(e) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.searchCloudMessagesEx(e)
    )
  }
  getThreadMessageList(e) {
    return (
      this.checkV2(),
      this.checkExtendUtil(),
      this.core.V2NIMMessageExtendUtil.getThreadMessageList(e)
    )
  }
  registerCustomAttachmentParser(e) {
    'function' == typeof e &&
      -1 === this.customAttachmentParsers.indexOf(e) &&
      this.customAttachmentParsers.unshift(e)
  }
  unregisterCustomAttachmentParser(e) {
    var t = this.customAttachmentParsers.indexOf(e)
    t > -1 && this.customAttachmentParsers.splice(t, 1)
  }
  sendP2PMessageReceipt(e) {
    return this.checkV2(), this.receiptUtil.sendP2PMessageReceipt(e)
  }
  isPeerRead(e) {
    return this.checkV2(), this.receiptUtil.isPeerRead(e)
  }
  getP2PMessageReceipt(e) {
    return this.checkV2(), this.receiptUtil.getP2PMessageReceipt(e)
  }
  getTeamMessageReceipts(e) {
    return this.checkV2(), this.receiptUtil.getTeamMessageReceipts(e)
  }
  getTeamMessageReceiptDetail(e) {
    return this.checkV2(), this.receiptUtil.getTeamMessageReceiptDetail(e)
  }
  sendTeamMessageReceipts(e) {
    return this.checkV2(), this.receiptUtil.sendTeamMessageReceipts(e)
  }
  revokeMessage(e, t) {
    return Te(this, void 0, void 0, function* () {
      return this.checkV2(), this.deleteUtil.revokeMessage(e, t)
    })
  }
  deleteMessage(e, t) {
    return this.checkV2(), this.deleteUtil.deleteMessage(e, t)
  }
  deleteMessages(e, t) {
    return this.checkV2(), this.deleteUtil.deleteMessages(e, t)
  }
  cancelMessageAttachmentUpload(e) {
    return this.checkV2(), this.fileUtil.cancelMessageAttachmentUpload(e)
  }
  markMsgsAck(e) {
    if (e && e.length > 0) {
      var t = [],
        i = []
      e.forEach((e) => {
        ;(e.senderId === this.core.account && e.senderId !== e.receiverId) ||
          (1 === e.conversationType
            ? t.push(e)
            : 2 === e.conversationType && i.push(e))
      }),
        t.length > 0 &&
          this.core.sendCmd('v2BatchMarkRead', {
            sid: 7,
            cid: 2,
            ids: t.map((e) => e.messageServerId),
          }),
        i.length > 0 &&
          this.core.sendCmd('v2BatchMarkRead', {
            sid: 8,
            cid: 3,
            ids: i.map((e) => e.messageServerId),
          })
    }
  }
  sendMessage(e, t, i = {}, r) {
    var s
    return Te(this, void 0, void 0, function* () {
      if (
        (this.checkV2(),
        ye({ message: { type: 'object' } }, { message: e }, '', !0),
        (e.messageClientId = e.messageClientId || Le()),
        e.conversationId && e.conversationId !== t)
      )
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: {
            reason:
              'sendMessage: message.conversationId is not equal to conversationId',
          },
        })
      ye(zi, { conversationId: t, message: e, params: i }, '', !0),
        Me(this.core.account, t)
      var n = this.core.V2NIMConversationIdUtil.parseConversationType(t)
      if ((2 === n || 3 === n) && i.robotConfig && !i.robotConfig.accountId)
        throw new me({
          detail: {
            reason:
              'When conversationType is team or superTeam, account is required in robotInfo account is required',
          },
        })
      if ((2 !== n && 3 !== n) || !i.targetConfig) i.targetConfig = void 0
      else {
        var o = i.targetConfig.receiverIds
        if (3 === n && !1 === i.targetConfig.inclusive)
          throw new he({
            code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
            detail: {
              reason:
                'setting inclusive to false for super teams is not allowed',
            },
          })
        if (0 === (o = o.filter((e) => e && e !== this.core.account)).length)
          throw new he({
            code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
            detail: {
              reason: 'receiverIds cannot be empty or only contain yourself',
            },
          })
        i.targetConfig.receiverIds = o
      }
      ;(null === (s = i.aiConfig) || void 0 === s ? void 0 : s.aiStream) &&
        this.aiUtil.checkAI()
      var a,
        c = this.core.timeOrigin.getTimeNode(),
        {
          messageBeforeSend: d,
          clientAntispamResult: l,
          hiddenParams: p,
        } = this.sendUtil.prepareMessage(e, t, i)
      this.logger.log(
        `V2SendMessage start:${d.messageClientId}/${d.createTime};conversation:${t};`,
        `NTPTime:${this.core.timeOrigin.getNTPTime(c)}`
      )
      try {
        a = yield this.sendUtil.doSendMessage({
          apiCallingTimeNode: c,
          messageBeforeSend: d,
          clientAntispamResult: l,
          hiddenParams: p,
          progress: r,
        })
      } catch (e) {
        throw (
          (this.logger.warn(
            `V2SendMessage end:${d.messageClientId}.`,
            e instanceof he ? `failed:${e.code}` : 'failed'
          ),
          e)
        )
      }
      return (
        a.message.senderId === a.message.receiverId &&
          this.markMsgsAck([a.message]),
        this.logger.log(
          `V2SendMessage end:${a.message.messageClientId}/${a.message.messageServerId}/${a.message.createTime}`
        ),
        a
      )
    })
  }
  replyMessage(e, t, i = {}, r) {
    return Te(this, void 0, void 0, function* () {
      if (
        (this.checkV2(),
        ye({ message: { type: 'object' } }, { message: e }, '', !0),
        (e.messageClientId = e.messageClientId || Le()),
        ye(Ji, { message: e, replyMessage: t, params: i }, '', !0),
        Me(this.core.account, t.conversationId),
        (2 === e.conversationType || 3 === e.conversationType) &&
          i.robotConfig &&
          !i.robotConfig.accountId)
      )
        throw new me({
          detail: {
            reason:
              'When conversationType is team or superTeam, account is required in robotInfo account is required',
          },
        })
      var s = this.core.timeOrigin.getTimeNode(),
        {
          messageBeforeSend: n,
          clientAntispamResult: o,
          hiddenParams: a,
        } = this.sendUtil.prepareMessage(e, t.conversationId, i, t),
        c = yield this.sendUtil.doSendMessage({
          apiCallingTimeNode: s,
          messageBeforeSend: n,
          clientAntispamResult: o,
          hiddenParams: a,
          progress: r,
        })
      return (
        c.message.senderId === c.message.receiverId &&
          this.markMsgsAck([c.message]),
        c
      )
    })
  }
  modifyMessage(e, t) {
    this.checkV2(),
      this.checkLogin(),
      ye(Tr, e, 'message', !0),
      ye(Sr, t, 'params', !0),
      this.modifyUtil.checkIfModify(e, t)
    var { messageBeforeSend: i, clientAntispamResult: r } =
      this.modifyUtil.prepareMessage(e, t)
    return this.modifyUtil.modifyMessage(i, r)
  }
  stopAIStreamMessage(e, t) {
    if (
      (this.checkV2(),
      this.aiUtil.checkAI(),
      ye(Cr, e, 'message', !0),
      ye(Nr, t, 'params', !0),
      2 === t.operationType && !t.updateContent)
    )
      throw new he({
        code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
        detail: {
          reason: 'V2NIMMessage::stopAIStreamMessage updateContent empty',
        },
      })
    return this.aiUtil.stopAIStreamMessage(e, t)
  }
  regenAIMessage(e, t) {
    return (
      this.checkV2(),
      this.aiUtil.checkAI(),
      ye(Cr, e, 'message', !0),
      ye(Ar, t, 'params', !0),
      this.aiUtil.regenAIMessage(e, t)
    )
  }
  sendMessageFn(e) {
    if (e.msgAckSnapshot) {
      var t = e.msgAckSnapshot,
        i = {
          conversationId: e.conversationId,
          messageServerId: e.messageServerId,
          messageClientId: e.messageClientId,
          readCount: 0,
          unreadCount: Number(t),
        }
      delete e.msgAckSnapshot,
        this.emit('onReceiveTeamMessageReadReceipts', [i])
    }
    ;(e = Gr(e, this.core)),
      this.model.upsertMessages([e]),
      this.core.eventBus.emit(
        'V2NIMMessageService/sendMessage',
        e,
        e.sendingState
      )
  }
  setMessageFilter(e) {
    null != e
      ? e &&
        'function' == typeof e.shouldIgnore &&
        (this.filterFn = e.shouldIgnore)
      : (this.filterFn = void 0)
  }
  _filterMessage(e) {
    if ('function' == typeof this.filterFn)
      try {
        return !0 === this.filterFn(e)
      } catch (t) {
        return (
          this.logger.error(
            `V2NIMMessage::triggerMessageFilter ${e.messageClientId} error:`,
            t
          ),
          !1
        )
      }
    return !1
  }
  _filterMessagesByFn(e) {
    return e.filter((e) => !this._filterMessage(e))
  }
  _filterMessageByClearTime(e, t) {
    var i = Ae.localStorage.getItem(`nim_${this.core.account}_${e}_clearTime`),
      r = i ? parseInt(i) : 0
    return r > 0 ? t.filter((e) => e.createTime >= r) : t
  }
}
var Ks = { super_team: 3, p2p: 1, team: 2 },
  Ws = { 3: 'super_team', 1: 'p2p', 0: 'p2p', 2: 'team' }
function Js(e, t = '|') {
  var i = e.indexOf(t)
  if (-1 === i) return { target: '', type: 0 }
  var r = e.slice(0, i)
  return { target: e.slice(i + 1), type: Ks[r] || 0 }
}
function zs(e, t) {
  return `${Ws[e]}|${t}`
}
class Xs {
  constructor() {
    ;(this.map = new Map()),
      (this.capacity = 1e4),
      (this.readTimeMap = new Map()),
      (this.stickTopMap = new Map())
  }
  reset() {
    this.map.clear(), this.readTimeMap.clear(), this.stickTopMap.clear()
  }
  count() {
    return this.map.size
  }
  sort() {
    var e = Array.from(this.map.values())
    e.sort((e, t) => t.sortOrder - e.sortOrder),
      this.map.clear(),
      e.forEach((e) => {
        this.map.set(e.conversationId, e)
      })
  }
  processConversation(e) {
    return (
      'string' == typeof e.lastMessage && delete e.lastMessage,
      void 0 === e.localExtension && (e.localExtension = ''),
      e
    )
  }
  getById(e) {
    return this.map.get(e)
  }
  getAll() {
    return Array.from(this.map.values()).sort(
      (e, t) => t.sortOrder - e.sortOrder
    )
  }
  getStickTopList() {
    return Array.from(this.map.values())
      .filter((e) => e.stickTop)
      .sort((e, t) => t.sortOrder - e.sortOrder)
  }
  getByOption(e, t, i) {
    var { conversationTypes: r, onlyUnread: s } = i,
      n = []
    this.map.forEach((e) => {
      ;(r && r.length > 0 && !r.includes(e.type)) ||
        (s && !e.unreadCount) ||
        (i.ignoreMuted && e.mute) ||
        n.push(e)
    }),
      (n = n.sort((e, t) => t.sortOrder - e.sortOrder))
    var o = 0
    e > 0 &&
      ((o = Be(n, 'sortOrder', e)), n[o] && n[o].sortOrder === e && (o += 1))
    var a = n.slice(o).length
    return (n = n.slice(o, o + t)).length > 0
      ? {
          offset: a > t ? n[n.length - 1].sortOrder : 0,
          finished: !(a > t),
          conversationList: n,
        }
      : { offset: 0, finished: !0, conversationList: n }
  }
  upsert(e) {
    var t = e.conversationId,
      i = this.map.get(t)
    if (!i) {
      var r = this.processConversation(
        Object.assign(
          {
            stickTop: this.getStickTop(t),
            localExtension: '',
            lastMessage: null,
            unreadCount: 0,
            sortOrder: 0,
            createTime: 0,
            updateTime: 0,
          },
          e
        )
      )
      return this.setLRU(t, r), r.unreadCount > 0
    }
    var s = e.unreadCount !== i.unreadCount,
      n = Object.assign({}, i, e)
    return (n = this.processConversation(n)), this.setLRU(t, n), s
  }
  setLRU(e, t) {
    if (this.map.has(e)) this.map.delete(e)
    else if (this.map.size >= this.capacity) {
      var i = this.map.keys().next().value
      i && this.map.delete(i)
    }
    this.map.set(e, t)
  }
  bulkUpsert(e) {
    var t = !1
    return (
      e.forEach((e) => {
        this.upsert(e) && (t = !0)
      }),
      t
    )
  }
  deleteById(e) {
    var t = this.getById(e)
    if (t) return this.map.delete(e), t
  }
  updateReadTime(e, t) {
    this.readTimeMap.set(e, t)
  }
  getReadTime(e) {
    return this.readTimeMap.get(e) || 0
  }
  updateStickTop(e, t) {
    t ? this.stickTopMap.set(e, !0) : this.stickTopMap.delete(e)
  }
  getStickTop(e) {
    return this.stickTopMap.get(e) || !1
  }
}
var Qs,
  Zs = {
    '4_14': 'v2LocalConvSyncReadTime',
    '4_20': 'v2LocalConvSyncSuperTeamReadTime',
    '4_22': 'v2LocalConvSyncMoreRoaming',
    '4_23': 'v2LocalConvSyncStickTop',
    '4_25': 'v2LocalConvSyncReliableInfo',
    '7_16': 'v2LocalConvMarkReadTime',
    '7_25': 'v2LocalConvMultiMarkReadTime',
    '7_116': 'v2LocalConvMultiSyncReadTime',
    '21_25': 'v2LocalConvSuperTeamMarkReadTime',
    '21_32': 'v2LocalConvSuperTeamMultiMarkReadTime',
    '21_125': 'v2LocalConvSuperTeamMultiSyncReadTime',
    '33_12': 'v2LocalConvStickTopAdd',
    '33_13': 'v2LocalConvStickTopDelete',
    '23_112': 'v2LocalConvStickTopMultiSyncAdd',
    '23_113': 'v2LocalConvStickTopMultiSyncDelete',
    '23_114': 'v2LocalConvStickTopMultiSyncUpdate',
  },
  en = 'V2NIMLocalConversationService',
  tn = {
    id: 1,
    ext: 2,
    createTime: { id: 3, retType: 'number' },
    updateTime: { id: 4, retType: 'number' },
  },
  rn = { scene: 1, to: 2, timetag: 3 },
  sn = {
    v2LocalConvSyncReadTime: {
      sid: 4,
      cid: 14,
      service: en,
      response: [
        { type: 'StrLongMap', name: 'p2p' },
        { type: 'LongLongMap', name: 'team' },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2LocalConvSyncSuperTeamReadTime: {
      sid: 4,
      cid: 20,
      service: en,
      response: [{ type: 'LongLongMap', name: 'superTeam' }],
    },
    v2LocalConvSyncMoreRoaming: { sid: 4, cid: 22, service: en, response: [] },
    v2LocalConvSyncStickTop: {
      sid: 4,
      cid: 23,
      service: en,
      response: [
        { type: 'Long', name: 'timetag' },
        { type: 'Bool', name: 'isThereAnyChange' },
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(tn) },
      ],
    },
    v2LocalConvSyncReliableInfo: { sid: 4, cid: 25, service: en, response: [] },
    v2LocalConvMarkReadTime: {
      sid: 7,
      cid: 16,
      service: en,
      params: [
        { type: 'Byte', name: 'scene' },
        { type: 'String', name: 'to' },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2LocalConvMultiMarkReadTime: {
      sid: 7,
      cid: 25,
      service: en,
      ignoreErrCodes: [700],
      params: [{ type: 'PropertyArray', name: 'tags', reflectMapper: rn }],
    },
    v2LocalConvMultiSyncReadTime: {
      sid: 7,
      cid: 116,
      service: en,
      response: [
        { type: 'Byte', name: 'scene' },
        { type: 'String', name: 'to' },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2LocalConvSuperTeamMarkReadTime: {
      sid: 21,
      cid: 25,
      service: en,
      params: [
        { type: 'Long', name: 'to' },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2LocalConvSuperTeamMultiMarkReadTime: {
      sid: 21,
      cid: 32,
      service: en,
      ignoreErrCodes: [700],
      params: [{ type: 'PropertyArray', name: 'tags', reflectMapper: rn }],
    },
    v2LocalConvSuperTeamMultiSyncReadTime: {
      sid: 21,
      cid: 125,
      service: en,
      response: [
        { type: 'Long', name: 'to' },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2LocalConvStickTopAdd: {
      sid: 33,
      cid: 12,
      service: en,
      params: [{ type: 'Property', name: 'tag', reflectMapper: tn }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(tn) }],
    },
    v2LocalConvStickTopDelete: {
      sid: 33,
      cid: 13,
      service: en,
      params: [{ type: 'Property', name: 'tag', reflectMapper: tn }],
      response: [{ type: 'Long', name: 'timetag' }],
    },
    v2LocalConvStickTopMultiSyncAdd: {
      sid: 23,
      cid: 112,
      service: en,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(tn) }],
    },
    v2LocalConvStickTopMultiSyncDelete: {
      sid: 23,
      cid: 113,
      service: en,
      response: [
        { type: 'Long', name: 'timetag' },
        { type: 'Property', name: 'data', reflectMapper: ft(tn) },
      ],
    },
    v2LocalConvStickTopMultiSyncUpdate: {
      sid: 23,
      cid: 114,
      service: en,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(tn) }],
    },
  }
function nn(e, t) {
  ;(e = e || []), (t = t || 1), (t = Math.max(Math.floor(t), 1))
  for (var i = [], r = 0; r < e.length; r += t) i.push(e.slice(r, r + t))
  return i
}
class on {
  constructor(e, t) {
    ;(this.totalUnreadCount = void 0),
      (this.unreadCountByFilter = {}),
      (this.core = e),
      (this.service = t),
      (this.model = t.model),
      (this.logger = t.logger)
  }
  reset() {
    ;(this.totalUnreadCount = void 0), (this.unreadCountByFilter = {})
  }
  getTotalUnreadCount() {
    return this.totalUnreadCount
  }
  resetTotalAfterSyncDone() {
    var e = this.service.model
        .getAll()
        .reduce((e, t) => e + (t.unreadCount || 0), 0),
      t = this.totalUnreadCount
    return (
      (void 0 !== t && t === e) ||
        ((this.totalUnreadCount = e),
        this.service.emit('onTotalUnreadCountChanged', e)),
      e
    )
  }
  digestUnreadCountChange() {
    this._digest()
  }
  _digest() {
    var e = this.totalUnreadCount,
      t = this.service.model
        .getAll()
        .reduce((e, t) => e + (t.unreadCount || 0), 0)
    this.core.logger.log(
      `V2NIMConversation::digestUnreadCountChange:oldUnreadCount ${e}, newUnreadCount ${t}`
    ),
      e !== t &&
        ((this.totalUnreadCount = t),
        this.service.emit('onTotalUnreadCountChanged', t)),
      Object.keys(this.unreadCountByFilter).forEach((e) => {
        var t = JSON.parse(e),
          i = this.getUnreadCountByFilter(t),
          r = this.unreadCountByFilter[e]
        ;(this.unreadCountByFilter[e] = i),
          (t.equals = cn.bind(t)),
          r !== i && this.service.emit('onUnreadCountChangedByFilter', t, i)
      })
  }
  clearUnreadCount(e) {
    var t = e.reduce(
      (e, t) => (
        this.service.model.upsert({
          conversationId: t.conversationId,
          type: t.type,
          unreadCount: 0,
        }) && e.push(t.conversationId),
        e
      ),
      []
    )
    if (t.length > 0) {
      var i = t.map((e) => this.service.model.getById(e))
      this.service.triggerConversationChanged(i), this.digestUnreadCountChange()
    }
  }
  getUnreadCountByIds(e) {
    return (e = ii(e)).reduce((e, t) => {
      var i = this.service.model.getById(t)
      return e + ((i && i.unreadCount) || 0)
    }, 0)
  }
  getUnreadCountByFilter(e) {
    var t = this.service.model.count()
    return this.service.model
      .getByOption(0, t, {
        conversationTypes: e.conversationTypes,
        ignoreMuted: e.ignoreMuted,
      })
      .conversationList.reduce((e, t) => e + (t.unreadCount || 0), 0)
  }
  isMessageUnread(e, t = 0) {
    var i
    return (
      e.createTime > t &&
      e.senderId !== this.core.account &&
      200 === e.messageStatus.errorCode &&
      !1 !==
        (null === (i = e.messageConfig) || void 0 === i
          ? void 0
          : i.unreadEnabled)
    )
  }
  isMessageReferUnread(e, t = 0) {
    var i = this.core.V2NIMMessageService.model.getMessageById(
      e.messageClientId
    )
    return i
      ? this.isMessageUnread(i, t)
      : e.createTime > t && e.senderId !== this.core.account
  }
  countUnreadByMessageInMemory(e, t = 0) {
    var i = 0
    return (
      this.core.V2NIMMessageService.model
        .getMessagesByConversationId(e)
        .forEach((e) => {
          this.isMessageUnread(e, t) && i++
        }),
      i
    )
  }
  addFilter(e) {
    var t = an(e)
    if (void 0 !== this.unreadCountByFilter[t])
      throw new he({ code: de.V2NIM_ERROR_CODE_RESOURCE_ALREADY_EXIST })
    var i = JSON.parse(t),
      r = this.getUnreadCountByFilter(i)
    ;(this.unreadCountByFilter[t] = r),
      this.service.emit('onUnreadCountChangedByFilter', i, r)
  }
  deleteFilter(e) {
    var t = an(e)
    if (void 0 === this.unreadCountByFilter[t])
      throw new he({ code: de.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST })
    delete this.unreadCountByFilter[t]
  }
  markConversationRead(e) {
    return Te(this, void 0, void 0, function* () {
      var t = this.model.getById(e),
        i = this.core.V2NIMConversationIdUtil.parseConversationTargetId(e),
        r = this.core.V2NIMConversationIdUtil.parseConversationType(e),
        s = this.model.getReadTime(e)
      if (!t) return s || this.core.timeOrigin.getNTPTime()
      var n = this.service.compute.computeReadTimeForMark(t)
      return s >= n
        ? (this.logger.log(
            `V2LocalConv::markConversationRead currentReadTime >= readTime ${e},${s},${n}`
          ),
          s)
        : (3 === r
            ? yield this.core.sendCmd('v2LocalConvSuperTeamMarkReadTime', {
                timetag: n,
                to: i,
              })
            : yield this.core.sendCmd('v2LocalConvMarkReadTime', {
                scene: 1 === r ? 0 : 2 === r ? 1 : 2,
                timetag: n,
                to: i,
              }),
          this.model.updateReadTime(e, n),
          n)
    })
  }
  markMultiConversationRead(e) {
    return Te(this, void 0, void 0, function* () {
      var t = { cmd: 'v2LocalConvSuperTeamMultiMarkReadTime', params: [] },
        i = { cmd: 'v2LocalConvMultiMarkReadTime', params: [] }
      e.forEach((e) => {
        var r = this.model.getById(e)
        if (r) {
          var s =
              this.core.V2NIMConversationIdUtil.parseConversationTargetId(e),
            n = this.core.V2NIMConversationIdUtil.parseConversationType(e),
            o = this.model.getReadTime(e),
            a = this.service.compute.computeReadTimeForMark(r)
          if (!(o >= a)) {
            var c = {
              conversationId: e,
              scene: 1 === n ? 0 : 2 === n ? 1 : 2,
              timetag: a,
              to: s,
            }
            3 === n ? t.params.push(c) : i.params.push(c)
          }
        }
      })
      var r = nn(t.params, 50),
        s = nn(i.params, 50)
      for (var n of r) {
        try {
          yield this.core.sendCmd(t.cmd, { tags: n })
        } catch (e) {
          this.logger.warn(
            'markMultiConversationRead::error:',
            n.map((e) => e.conversationId),
            e
          )
        }
        n.forEach((e) => {
          this.model.updateReadTime(e.conversationId, e.timetag)
        })
      }
      for (var o of s) {
        try {
          yield this.core.sendCmd(i.cmd, { tags: o })
        } catch (e) {
          this.logger.warn(
            'markMultiConversationRead::error:',
            o.map((e) => e.conversationId),
            e
          )
        }
        o.forEach((e) => {
          this.model.updateReadTime(e.conversationId, e.timetag)
        })
      }
    })
  }
}
function an(e) {
  var { conversationTypes: t } = e
  return (
    t && (t = t.sort()),
    JSON.stringify({
      conversationGroupId: e.conversationGroupId,
      conversationTypes: t,
      ignoreMuted: e.ignoreMuted,
    })
  )
}
function cn(e) {
  return JSON.stringify(this) === an(e)
}
function dn(e, t, i = 0, r) {
  var s, n
  t = Gr(t, e)
  var {
      messageType: o,
      subType: a,
      text: c,
      attachment: d,
      serverExtension: l,
    } = t,
    p = ''
  if (t.senderId !== e.account && 5 !== o) {
    p = Ve(t, 'fromNick')
    var h =
      null ===
        (n =
          null === (s = e.V2NIMFriendService) || void 0 === s
            ? void 0
            : s.model) || void 0 === n
        ? void 0
        : n.getFriend(t.senderId)
    h && h.alias && (p = h.alias)
  }
  return JSON.parse(
    JSON.stringify({
      lastMessageState: i,
      messageRefer: qr(e, t),
      messageType: o,
      subType: a,
      text: c,
      attachment: d,
      serverExtension: l,
      callbackExtension: t.callbackExtension,
      sendingState: r,
      senderName: p,
    })
  )
}
function ln(e, t) {
  return t && t.length > 0 ? t.map((t) => pn(e, t)) : []
}
function pn(e, t) {
  var i = t
  if ('string' == typeof i.lastMessage)
    if ('' === i.lastMessage);
    else if (1 === i.lastMessageState) {
      var r = Hr(e, gt(JSON.parse(i.lastMessage), ft(rs)))
      i.lastMessage = (function (e, t) {
        var {
            messageRefer: i,
            revokeAccountId: r,
            revokeType: s,
            callbackExtension: n,
            serverExtension: o,
            postscript: a,
          } = t,
          c =
            (function (e, t, i, r) {
              var s, n, o, a, c, d, l, p
              if (t !== e.account) {
                var h =
                  null ===
                    (n =
                      null === (s = e.V2NIMFriendService) || void 0 === s
                        ? void 0
                        : s.model) || void 0 === n
                    ? void 0
                    : n.getFriend(t)
                if (h && h.alias) return h.alias
                if (2 === i) {
                  var u =
                    null ===
                      (a =
                        null === (o = e.V2NIMTeamService) || void 0 === o
                          ? void 0
                          : o.memberModel) || void 0 === a
                      ? void 0
                      : a.getById(r, 1, t)
                  if (u && u.teamNick) return u.teamNick
                } else if (3 === i) {
                  var m =
                    null ===
                      (d =
                        null === (c = e.V2NIMTeamService) || void 0 === c
                          ? void 0
                          : c.memberModel) || void 0 === d
                      ? void 0
                      : d.getById(r, 1, t)
                  if (m && m.teamNick) return m.teamNick
                }
                var g =
                  null ===
                    (p =
                      null === (l = e.V2NIMUserService) || void 0 === l
                        ? void 0
                        : l.model) || void 0 === p
                    ? void 0
                    : p.getUser(t)
                return g && g.name ? g.name : void 0
              }
            })(
              e,
              t.revokeAccountId,
              t.messageRefer.conversationType,
              t.messageRefer.receiverId
            ) || ''
        return JSON.parse(
          JSON.stringify({
            lastMessageState: 1,
            messageRefer: i,
            revokeAccountId: r,
            revokeType: s,
            callbackExtension: n,
            serverExtension: o,
            text: a || '',
            senderName: c,
          })
        )
      })(e, r)
    } else if (0 === i.lastMessageState) {
      var s = gt(JSON.parse(i.lastMessage), ft(Zr))
      i.lastMessage = dn(
        e,
        s,
        i.lastMessageState,
        s.senderId === e.account ? 1 : void 0
      )
    } else 2 === i.lastMessageState && delete i.lastMessage
  return i
}
function hn(e) {
  var { version: t, deleteFlag: i } = e
  return {
    conversation: Ee(e, ['version', 'deleteFlag']),
    version: t,
    deleteFlag: i,
  }
}
!(function (e) {
  ;(e[(e.createConversation = 1)] = 'createConversation'),
    (e[(e.deleteConversation = 2)] = 'deleteConversation'),
    (e[(e.updateConversation = 3)] = 'updateConversation'),
    (e[(e.setConversationTop = 4)] = 'setConversationTop'),
    (e[(e.clearConversationUnread = 5)] = 'clearConversationUnread'),
    (e[(e.addConversationToGroup = 6)] = 'addConversationToGroup'),
    (e[(e.removeConversationFromGroup = 7)] = 'removeConversationFromGroup'),
    (e[(e.modifyConversationOnSendMessage = 8)] =
      'modifyConversationOnSendMessage'),
    (e[(e.modifyConversationOnDeleteMessage = 9)] =
      'modifyConversationOnDeleteMessage'),
    (e[(e.modifyConversationOnRecallMessage = 10)] =
      'modifyConversationOnRecallMessage'),
    (e[(e.modifyConversationOnClearMessage = 11)] =
      'modifyConversationOnClearMessage'),
    (e[(e.oneClickClearConversationUnread = 12)] =
      'oneClickClearConversationUnread'),
    (e[(e.modifyConversationOnUpdateMessage = 13)] =
      'modifyConversationOnUpdateMessage')
})(Qs || (Qs = {}))
class un {
  constructor(e, t) {
    ;(this.core = e), (this.service = t)
  }
  get hasUserService() {
    var e
    return !!(null === (e = this.core.V2NIMUserService) || void 0 === e
      ? void 0
      : e.name)
  }
  get hasFriendService() {
    var e
    return !!(null === (e = this.core.V2NIMFriendService) || void 0 === e
      ? void 0
      : e.name)
  }
  get hasTeamService() {
    var e
    return !!(null === (e = this.core.V2NIMTeamService) || void 0 === e
      ? void 0
      : e.name)
  }
  get hasMessageService() {
    var e
    return !!(null === (e = this.core.V2NIMMessageService) || void 0 === e
      ? void 0
      : e.name)
  }
  computeFromExternal(e) {
    var t, i, r
    if (0 === e.type) return e
    var s = this.core.V2NIMConversationIdUtil.parseConversationType(
        e.conversationId
      ),
      n = this.core.V2NIMConversationIdUtil.parseConversationTargetId(
        e.conversationId
      ),
      o = {}
    if (
      ((null === (t = this.core.V2NIMSettingService) || void 0 === t
        ? void 0
        : t.name) &&
        (o.mute = this.core.V2NIMSettingService.getConversationMuteStatus(
          e.conversationId
        )),
      1 === s && this.hasUserService)
    ) {
      var a,
        c = this.core.V2NIMUserService.model.getUser(n),
        d = this.hasFriendService
          ? this.core.V2NIMFriendService.model.getFriend(n)
          : void 0
      e.conversationId ===
        (null === (i = e.lastMessage) || void 0 === i
          ? void 0
          : i.messageRefer.conversationId) &&
        (a =
          null === (r = e.lastMessage) || void 0 === r ? void 0 : r.senderName),
        (o.name =
          (null == d ? void 0 : d.alias) ||
          (null == c ? void 0 : c.name) ||
          a ||
          n),
        (o.avatar = (null == c ? void 0 : c.avatar) || '')
    } else if (2 === s && this.hasTeamService) {
      var l = this.core.V2NIMTeamService.model.getById(n, 1)
      ;(o.name = (null == l ? void 0 : l.name) || n),
        (o.avatar = (null == l ? void 0 : l.avatar) || '')
    } else if (3 === s && this.hasTeamService) {
      var p = this.core.V2NIMTeamService.model.getById(n, 2)
      ;(o.name = (null == p ? void 0 : p.name) || n),
        (o.avatar = (null == p ? void 0 : p.avatar) || '')
    }
    return Object.assign(e, o), e
  }
  computeSortOrder(e, t) {
    return t ? (e ? t + 1e15 : t) : e ? 1e15 : 0
  }
  computeReadTimeForMark(e) {
    var t,
      i,
      r,
      s = e.conversationId,
      n = this.service.model.getReadTime(s)
    if (
      null ===
        (i =
          null === (t = null == e ? void 0 : e.lastMessage) || void 0 === t
            ? void 0
            : t.messageRefer) || void 0 === i
        ? void 0
        : i.createTime
    )
      r = e.lastMessage.messageRefer.createTime
    else {
      if (0 === e.unreadCount && n > 0) return n
      if (!this.core.timeOrigin.checkNodeReliable()) return n || 0
      r = this.core.timeOrigin.getNTPTime()
    }
    return r
  }
  computeConvWithLastMsg(e, t) {
    var i,
      r =
        t ||
        this.core.V2NIMMessageService.model.getLastMessageOfConversation(
          e.conversationId
        )
    if (
      r &&
      !1 !==
        (null === (i = r.messageConfig) || void 0 === i
          ? void 0
          : i.lastMessageUpdateEnabled)
    ) {
      var s = dn(this.core, r, 0, r.sendingState)
      ;(e.lastMessage = s),
        (e.createTime = e.createTime || r.createTime),
        (e.updateTime = r.createTime),
        (e.sortOrder = this.computeSortOrder(e.stickTop, r.createTime))
    }
    return e
  }
  computeConvWithUnread(e, t) {
    var i = this.service.model.getReadTime(e.conversationId),
      r = e.unreadCount || 0
    return (
      t
        ? t && this.service.unread.isMessageUnread(t) && (r += 1)
        : (r = this.service.unread.countUnreadByMessageInMemory(
            e.conversationId,
            i
          )),
      (e.unreadCount = r),
      e
    )
  }
  computeConvByMsgsCache(e, t) {
    var i,
      r,
      s = this.service.model.getById(e),
      n = this.core.V2NIMConversationIdUtil.parseConversationType(e),
      o = this.core.V2NIMMessageService.model.getLastMessageOfConversation(e)
    r =
      (null == t ? void 0 : t.updateTime) ||
      (o && o.createTime
        ? o.createTime
        : s && s.updateTime
        ? s.updateTime
        : this.core.timeOrigin.getNTPTime())
    var a = this.service.model.getStickTop(e),
      c = Object.assign(
        Object.assign(
          {
            conversationId: e,
            type: n,
            stickTop: a,
            localExtension: (null == s ? void 0 : s.localExtension) || '',
            lastMessage: null,
            unreadCount: 0,
          },
          t
        ),
        {
          createTime: (null == s ? void 0 : s.createTime) || r,
          updateTime: r,
          sortOrder: this.computeSortOrder(a, r),
        }
      )
    if (
      o &&
      !1 !==
        (null === (i = o.messageConfig) || void 0 === i
          ? void 0
          : i.lastMessageUpdateEnabled)
    ) {
      var d = dn(this.core, o, 0, o.sendingState)
      c.lastMessage = d
    }
    return c
  }
}
class mn {
  constructor(e, t) {
    ;(this.core = e),
      (this.service = t),
      (this.model = this.service.model),
      (this.logger = this.core.logger)
  }
  v2LocalConvSyncStickTopHandler(e) {
    var { timetag: t, isThereAnyChange: i, datas: r } = e.content
    if (i) {
      var s = this.model.getAll(),
        n = r.map((e) => {
          var { target: t, type: i } = Js(e.id),
            r = this.core.V2NIMConversationIdUtil.conversationId(i, t)
          return this.model.updateStickTop(r, !0), r
        })
      s.forEach((e) => {
        n.includes(e.conversationId)
          ? ((e.stickTop = !0),
            (e.updateTime = e.updateTime > t ? e.updateTime : t))
          : (e.stickTop = !1),
          this.model.updateStickTop(e.conversationId, e.stickTop)
      }),
        this.model.bulkUpsert(s)
    }
  }
  v2LocalConvSyncReadTimeHandler(e) {
    var t = e.content.p2p || {},
      i = e.content.team.m_map || {}
    this.logger.log('v2SyncLocalConvAck::', t, i),
      Object.keys(t).forEach((e) => {
        var i = this.core.V2NIMConversationIdUtil.p2pConversationId(e),
          r = this.model.getReadTime(i)
        t[e] > r &&
          (this.model.updateReadTime(i, t[e]),
          this.service.emit('onConversationReadTimeUpdated', i, t[e]))
      }),
      Object.keys(i).forEach((e) => {
        var t = this.core.V2NIMConversationIdUtil.teamConversationId(e),
          r = this.model.getReadTime(t)
        i[e] > r &&
          (this.model.updateReadTime(t, i[e]),
          this.service.emit('onConversationReadTimeUpdated', t, i[e]))
      })
  }
  v2LocalConvSyncSuperTeamReadTimeHandler(e) {
    var t = e.content.superTeam.m_map
    this.logger.log('v2SyncLocalSuperTeamConvAck::', t),
      Object.keys(t).forEach((e) => {
        var i = this.core.V2NIMConversationIdUtil.superTeamConversationId(e),
          r = this.model.getReadTime(i)
        t[e] > r &&
          (this.model.updateReadTime(i, t[e]),
          this.service.emit('onConversationReadTimeUpdated', i, t[e]))
      })
  }
  v2LocalConvMultiSyncReadTimeHandler(e) {
    var t = e.content,
      i = `${0 === t.scene ? 'p2p' : 1 === t.scene ? 'team' : 'super_team'}-${
        t.to
      }`,
      { type: r, target: s } = Js(i, '-'),
      n = this.core.V2NIMConversationIdUtil.conversationId(r, s),
      o = this.model.getById(n),
      a = null == o ? void 0 : o.unreadCount,
      c = this.model.getReadTime(n)
    t.timetag <= c
      ? this.logger.warn(
          `v2LocalConvMultiSyncReadTimeHandler: ${n} do not need update ack ${t.timetag}/${c}`
        )
      : (this.model.updateReadTime(n, t.timetag),
        this.service.emit('onConversationReadTimeUpdated', n, t.timetag),
        o
          ? ((o = this.service.compute.computeConvWithUnread(o)),
            this.model.upsert(o),
            this.service.unread.digestUnreadCountChange(),
            void 0 === a && o.unreadCount > 0
              ? this.service.triggerConversationCreated(o)
              : 'number' == typeof a &&
                o.unreadCount !== a &&
                this.service.triggerConversationChanged([o]))
          : this.logger.log(
              `v2LocalConvMultiSyncReadTimeHandler: ${n} not exist`
            ))
  }
  v2LocalConvSuperTeamMultiSyncReadTimeHandler(e) {
    this.v2LocalConvMultiSyncReadTimeHandler(e)
  }
  v2LocalConvStickTopMultiSyncAddHandler(e) {
    var { data: t } = e.content,
      { target: i, type: r } = Js(t.id),
      s = this.core.V2NIMConversationIdUtil.conversationId(r, i)
    this.model.updateStickTop(s, !0)
    var n = this.model.getById(s)
    n &&
      ((n.stickTop = !0),
      (n.updateTime =
        n.updateTime > t.updateTime ? n.updateTime : t.updateTime),
      (n.sortOrder = this.service.compute.computeSortOrder(!0, t.updateTime)),
      this.model.upsert(n),
      this.service.triggerConversationChanged([n]))
  }
  v2LocalConvStickTopMultiSyncDeleteHandler(e) {
    var { data: t, timetag: i } = e.content,
      { target: r, type: s } = Js(t.id),
      n = this.core.V2NIMConversationIdUtil.conversationId(s, r)
    this.model.updateStickTop(n, !1)
    var o = this.model.getById(n)
    o &&
      ((o.stickTop = !1),
      (o.updateTime = o.updateTime > i ? o.updateTime : i),
      (o.sortOrder = this.service.compute.computeSortOrder(!1, i)),
      this.model.upsert(o),
      this.service.triggerConversationChanged([o]))
  }
}
class gn {
  constructor(e, t) {
    ;(this.core = e),
      (this.service = t),
      (this.model = this.service.model),
      (this.compute = this.service.compute),
      (this.logger = this.core.logger)
  }
  setListener() {
    this.core.eventBus.on('V2NIMLoginService/syncing', () =>
      this.service.emit('onSyncStarted')
    ),
      this.core.eventBus.on(
        'V2NIMLoginService/syncDone',
        this.onSyncDone.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/sendMessage',
        this.sendMsg.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/onMsg',
        this.recvMsg.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/modifyMsg',
        this.modifyMsg.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/deleteMessages',
        this.deleteMessages.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/revokeMessages',
        this.deleteMessages.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageLogUtil/onClearHistoryNotifications',
        this.clearMessages.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/roamingMsgs',
        this.generateConv.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/offlineMsgs',
        this.generateConv.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMSettingService/setMute',
        this.setMute.bind(this)
      )
  }
  beforeEmit(e, ...t) {
    var i,
      r = `${this.service.name}::emit ${e.toString()}`
    if ('onConversationCreated' === e) {
      var s = t[0],
        n =
          null === (i = s.lastMessage) || void 0 === i ? void 0 : i.messageRefer
      this.logger.log(
        `${r}`,
        `id:${s.conversationId};unread:${s.unreadCount};lastMsg:${
          (null == n ? void 0 : n.messageClientId) || ''
        }/${(null == n ? void 0 : n.messageServerId) || ''}`
      )
    } else if ('onConversationChanged' === e) {
      var o = t[0]
      this.logger.log(
        `${r}`,
        o.map((e) => {
          var t,
            i =
              null === (t = e.lastMessage) || void 0 === t
                ? void 0
                : t.messageRefer
          return `id:${e.conversationId};unread:${e.unreadCount};lastMsg:${
            (null == i ? void 0 : i.messageClientId) || ''
          }/${(null == i ? void 0 : i.messageServerId) || ''}`
        })
      )
    } else this.logger.log(`${r}`, ...t)
  }
  onSyncDone(e) {
    if (e) this.service.emit('onSyncFailed', e)
    else {
      var t = this.model.getAll()
      ;(t = t.map((e) => {
        var t = e.conversationId,
          i = this.compute.computeConvByMsgsCache(t)
        return (
          (i = this.compute.computeConvWithUnread(i)),
          (i = this.compute.computeFromExternal(i)),
          this.model.upsert(i),
          this.model.getById(t)
        )
      })).length > 0 &&
        (this.service.triggerConversationChanged(t),
        this.service.unread.resetTotalAfterSyncDone()),
        this.service.emit('onSyncFinished')
    }
  }
  generateConv(e) {
    ii(e.map((e) => e.conversationId)).forEach((e) => {
      var t = this.compute.computeConvByMsgsCache(e)
      this.model.upsert(t)
    })
  }
  setMute(e, t) {
    var i = this.model.getById(e)
    i &&
      i.mute !== t &&
      ((i.mute = t),
      this.model.upsert(i),
      this.service.triggerConversationChanged([i]))
  }
  deleteMessages(e) {
    var t = new Set()
    e.forEach((e) => {
      var i,
        r = e.messageRefer.conversationId,
        s = this.model.getById(r)
      if (s) {
        if (
          e.messageRefer.messageClientId ===
          (null === (i = s.lastMessage) || void 0 === i
            ? void 0
            : i.messageRefer.messageClientId)
        ) {
          t.add(r)
          var n =
            this.core.V2NIMMessageService.model.getLastMessageOfConversation(r)
          s.lastMessage = n ? dn(this.core, n, 0, n.sendingState) : void 0
        }
        var o = this.model.getReadTime(r)
        if (
          (s.unreadCount > 0 &&
            this.service.unread.isMessageReferUnread(e.messageRefer, o) &&
            (t.add(r), s.unreadCount--),
          'deleteTime' in e)
        )
          e.deleteTime > s.updateTime &&
            ((s.updateTime = e.deleteTime),
            (s.sortOrder = this.compute.computeSortOrder(
              s.stickTop,
              s.updateTime
            )))
        else {
          var a = this.core.timeOrigin.getNTPTime()
          ;(s.updateTime = a),
            (s.sortOrder = this.compute.computeSortOrder(s.stickTop, a))
        }
        this.model.upsert(s)
      }
    })
    var i = Array.from(t)
    !this.core.V2NIMLoginService.dataSync.checkSyncing() &&
      i.length > 0 &&
      (this.service.triggerConversationChanged(
        i.map((e) => this.model.getById(e))
      ),
      this.service.unread.digestUnreadCountChange())
  }
  sendMsg(e) {
    var t = e.conversationId,
      i = this.model.getById(t)
    if (i) {
      var r = i.lastMessage,
        s = this.updateCauseMessage(i, e)
      r !== s.lastMessage && this.service.triggerConversationChanged([s])
    } else {
      var n = this.createCauseMessage(t, e)
      this.service.triggerConversationCreated(n)
    }
  }
  recvMsg(e) {
    var t = e.conversationId,
      i = this.model.getById(t)
    if (i) {
      var r = i.lastMessage,
        s = i.unreadCount,
        n = this.updateCauseMessage(i, e)
      n = this.compute.computeConvWithUnread(n, e)
      var o = r !== (n = this.compute.computeFromExternal(n)).lastMessage,
        a = s !== n.unreadCount
      this.model.upsert(n),
        (o || a) && this.service.triggerConversationChanged([n])
    } else {
      var c = this.createCauseMessage(t, e)
      ;(c = this.compute.computeConvWithUnread(c, e)),
        (c = this.compute.computeFromExternal(c)),
        this.model.upsert(c),
        this.service.triggerConversationCreated(c)
    }
    this.service.unread.digestUnreadCountChange()
  }
  updateCauseMessage(e, t) {
    return (
      (e = this.compute.computeConvWithLastMsg(e, t)),
      this.model.upsert(e),
      this.model.getById(e.conversationId)
    )
  }
  createCauseMessage(e, t) {
    var i,
      r = this.core.V2NIMConversationIdUtil.parseConversationType(e),
      s = this.model.getStickTop(e),
      n =
        !1 ===
        (null === (i = t.messageConfig) || void 0 === i
          ? void 0
          : i.lastMessageUpdateEnabled)
          ? void 0
          : dn(this.core, t, 0, t.sendingState),
      o = this.core.timeOrigin.getNTPTime(),
      a = {
        conversationId: e,
        type: r,
        createTime: n ? t.createTime : o,
        updateTime: n ? t.createTime : o,
        sortOrder: this.compute.computeSortOrder(s, n ? t.createTime : o),
        stickTop: s,
        localExtension: '',
        lastMessage: n,
        unreadCount: 0,
      }
    return this.model.upsert(a), a
  }
  clearMessages(e) {
    var t = new Set()
    e.forEach((e) => {
      var { conversationId: i, deleteTime: r } = e,
        s = this.model.getById(i)
      s &&
        (s.unreadCount > 0 && ((s.unreadCount = 0), t.add(i)),
        s.lastMessage &&
          s.lastMessage.messageRefer.createTime <= e.deleteTime &&
          ((s.lastMessage = void 0), t.add(i)),
        r > s.updateTime &&
          ((s.updateTime = r),
          (s.sortOrder = this.compute.computeSortOrder(
            s.stickTop,
            s.updateTime
          ))),
        this.model.upsert(s))
    })
    var i = Array.from(t)
    !this.core.V2NIMLoginService.dataSync.checkSyncing() &&
      i.length > 0 &&
      (this.service.triggerConversationChanged(
        i.map((e) => this.model.getById(e))
      ),
      this.service.unread.digestUnreadCountChange())
  }
  modifyMsg(e) {
    var t,
      i = e.conversationId,
      r = e.messageClientId,
      s = this.model.getById(i),
      n = this.core.V2NIMMessageService.model.getMessageById(r)
    if (s || n)
      if (s)
        e.messageClientId ===
          (null === (t = s.lastMessage) || void 0 === t
            ? void 0
            : t.messageRefer.messageClientId) &&
          ((s.lastMessage = dn(this.core, e, 0, e.sendingState)),
          this.service.triggerConversationChanged([s]))
      else {
        var o = this.createCauseMessage(i, e)
        this.service.triggerConversationCreated(o)
      }
  }
}
var vn = {
  type: 'array',
  itemRules: { type: 'enum', values: [1, 2, 3] },
  min: 1,
}
class fn {
  constructor() {
    ;(this.map = new Map()), (this.readTimeMap = new Map())
  }
  set(e) {
    e.forEach((e) => {
      ;(e = this.processConversation(e)), this.map.set(e.conversationId, e)
    })
  }
  reset() {
    this.map.clear(), this.readTimeMap.clear()
  }
  count() {
    return this.map.size
  }
  sort() {
    var e = Array.from(this.map.values())
    e.sort((e, t) => t.sortOrder - e.sortOrder),
      this.map.clear(),
      e.forEach((e) => {
        this.map.set(e.conversationId, e)
      })
  }
  processConversation(e) {
    return (
      'string' == typeof e.lastMessage && delete e.lastMessage,
      void 0 === e.localExtension && (e.localExtension = ''),
      e
    )
  }
  getById(e) {
    return this.map.get(e)
  }
  getStickTopList() {
    return Array.from(this.map.values())
      .filter((e) => e.stickTop)
      .sort((e, t) => t.sortOrder - e.sortOrder)
  }
  getAll() {
    return Array.from(this.map.values()).sort(
      (e, t) => t.sortOrder - e.sortOrder
    )
  }
  getByOption(e, t, i) {
    var { conversationTypes: r, onlyUnread: s, conversationGroupIds: n } = i,
      o = []
    this.map.forEach((e) => {
      if (
        (!(r && r.length > 0) || r.includes(e.type)) &&
        (!s || e.unreadCount) &&
        (!i.ignoreMuted || !e.mute)
      ) {
        if (n) {
          var t = e.groupIds,
            a = (null == t ? void 0 : t.length) || 0
          if (0 === n.length && a > 0) return
          if (n.length > 0 && 0 === a) return
          if (n.length > 0 && a > 0 && !n.some((e) => t && t.includes(e)))
            return
        }
        o.push(e)
      }
    }),
      (o = o.sort((e, t) => t.sortOrder - e.sortOrder))
    var a = 0
    e > 0 &&
      ((a = Be(o, 'sortOrder', e)), o[a] && o[a].sortOrder === e && (a += 1))
    var c = o.slice(a).length
    return (o = o.slice(a, a + t)).length > 0
      ? {
          offset: c > t ? o[o.length - 1].sortOrder : 0,
          finished: !(c > t),
          conversationList: o,
        }
      : { offset: 0, finished: !0, conversationList: o }
  }
  upsert(e) {
    var t = e.conversationId,
      i = this.map.get(t)
    if (!i)
      return (
        (e = this.processConversation(Object.assign({}, e))),
        this.map.set(t, e),
        e.unreadCount > 0
      )
    var r = e.unreadCount !== i.unreadCount,
      s = Object.assign({}, i, e)
    return (s = this.processConversation(s)), this.map.set(t, s), r
  }
  bulkUpsert(e) {
    var t = !1
    return (
      e.forEach((e) => {
        this.upsert(e) && (t = !0)
      }),
      t
    )
  }
  deleteById(e) {
    var t = this.getById(e)
    if (t) return this.map.delete(e), t
  }
  updateReadTime(e, t) {
    this.readTimeMap.set(e, t)
  }
  getReadTime(e) {
    return this.readTimeMap.get(e) || 0
  }
}
function yn(e, t) {
  var i = typeof e
  if (i !== typeof t) return !1
  if ('object' === i) {
    if (Object.prototype.toString.call(e) !== Object.prototype.toString.call(t))
      return !1
    if (Array.isArray(e)) {
      if (e.length !== t.length) return !1
      for (var r = 0; r < e.length; r++) if (!yn(e[r], t[r])) return !1
      return !0
    }
    if (e instanceof RegExp && t instanceof RegExp)
      return e.toString() === t.toString()
    if (e instanceof Date && t instanceof Date)
      return e.getTime() === t.getTime()
    if (null === e && null === t) return !0
    if (Object.keys(e).length !== Object.keys(t).length) return !1
    for (var s in e) if (!yn(e[s], t[s])) return !1
    return !0
  }
  return e === t
}
class In {
  constructor(e, t) {
    ;(this.fieldVersion = {}),
      (this.conversationIdsForBackFill = {}),
      (this.tempPacket = []),
      (this.isSyncing = !1),
      (this.nextCursor = 0),
      (this.core = e),
      (this.service = t)
  }
  reset() {
    ;(this.tempPacket = []),
      (this.fieldVersion = {}),
      (this.conversationIdsForBackFill = {}),
      (this.isSyncing = !1),
      (this.nextCursor = 0)
  }
  doSync() {
    return Te(this, void 0, void 0, function* () {
      var e
      ;(this.isSyncing = !0),
        this.service.emit('onSyncStarted'),
        this.core.V2NIMLoginService.dataSync.switchDataSync({
          type: 1,
          state: 2,
          subType: 'conversationSync',
        })
      try {
        e = yield this.core.sendCmd('v2ConversationSync', {
          tag: { cursor: this.nextCursor },
        })
      } catch (e) {
        var t = e
        if (t.code === de.V2NIM_ERROR_CODE_CANCELLED) return
        return (
          (this.isSyncing = !1),
          this.service.emit('onSyncFailed', t),
          this.core.V2NIMLoginService.dataSync.switchDataSync({
            type: 1,
            state: 3,
            error: t,
            subType: 'conversationSync',
          }),
          void this.processTempPacket()
        )
      }
      var i = 0 === parseInt(Ve(e, 'content.info.syncType')),
        r = Ve(e, 'content.info.nextCursor')
      this.doSyncAndSuccess(i, r)
    })
  }
  doSyncAndSuccess(e, t) {
    e && this.service.model.sort(),
      (this.isSyncing = !1),
      (this.nextCursor = parseInt(t) || 0),
      this.service.unread.resetTotalAfterSyncDone(),
      this.service.unread.digestUnreadCountChange(),
      this.service.emit('onSyncFinished'),
      this.core.V2NIMLoginService.dataSync.switchDataSync({
        type: 1,
        state: 3,
        subType: 'conversationSync',
      }),
      this.processTempPacket()
  }
  setBackFillIds(e) {
    return (
      e.forEach((e) => {
        if (
          2 === e.lastMessageState &&
          this.service.compute.hasMessageService
        ) {
          this.conversationIdsForBackFill[e.conversationId] = !0
          var t =
            this.core.V2NIMMessageService.model.getLastMessageOfConversation(
              e.conversationId
            )
          e.lastMessage = t
            ? dn(this.core, t, e.lastMessageState, t.sendingState)
            : ''
        } else this.conversationIdsForBackFill[e.conversationId] = !1
        delete e.lastMessageState
      }),
      e
    )
  }
  recvConversationFromSyncAction(e) {
    var { syncType: t } = Ve(e, 'content.info'),
      i = ln(this.core, Ve(e, 'content.datas'))
    0 === (t = parseInt(t))
      ? (i.forEach((e) => {
          this.initFieldVersion(e.conversationId, e.version)
        }),
        (i = this.setBackFillIds(i)),
        this.setModel(i))
      : ((i = this.setBackFillIds(i)),
        this.recvConversationForCreated(i) < i.length &&
          this.recvConversationForChanged(i))
  }
  recvConversation(e) {
    if (this.isSyncing) this.tempPacket.push(e)
    else {
      var t = ln(this.core, Ve(e, 'content.datas')).filter(
          (e) => !!e.conversationId
        ),
        i = Ve(e, 'content.info'),
        r = t.map((e) => `id:${e.conversationId}, ver:${e.version}`).join(';')
      if (
        (this.core.logger.getDebugMode()
          ? this.core.logger.debug(
              `V2NIMConversation::recvConversation: ${r}.`,
              i,
              t
            )
          : this.core.logger.log(
              `V2NIMConversation::recvConversation: ${r}.`,
              i
            ),
        2 === i.type)
      ) {
        var s = t.map(
          (e) => (
            delete this.fieldVersion[e.conversationId],
            this.service.model.deleteById(e.conversationId),
            e.conversationId
          )
        )
        return (
          this.service.emit('onConversationDeleted', s),
          void this.service.unread.digestUnreadCountChange()
        )
      }
      12 !== i.type
        ? (i.type,
          (t = this.setBackFillIds(t)),
          this.recvConversationForCreated(t) < t.length &&
            this.recvConversationForChanged(t))
        : this.compareAndClearUnreadInModel(i)
    }
  }
  recvConversationForCreated(e) {
    var t = e.filter((e) => !this.fieldVersion[e.conversationId])
    return (
      t.reduce((e, t) => {
        if (!this.fieldVersion[t.conversationId]) {
          this.initFieldVersion(t.conversationId, t.version),
            (e = !!this.updateModel(t) || e)
          var i = this.service.model.getById(t.conversationId)
          return i && this.service.triggerConversationCreated(i), e
        }
        return e
      }, !1) && this.service.unread.digestUnreadCountChange(),
      t.length
    )
  }
  recvConversationForChanged(e) {
    var t = this.bulkCompare(e)
    if (0 !== t.length) {
      this.bulkUpdateModel(t)
      var i = t
        .map((e) => this.service.model.getById(e.conversationId))
        .filter((e) => !!e)
      this.service.triggerConversationChanged(i)
    }
  }
  processTempPacket() {
    this.tempPacket.forEach((e) => {
      this.recvConversation(e)
    }),
      (this.tempPacket = [])
  }
  bulkCompare(e) {
    return e.map((e) => this.compare(e)).filter((e) => !!e)
  }
  compare(e) {
    var { version: t, conversationId: i, deleteFlag: r, type: s } = e,
      n = {},
      o = 0
    return (
      [
        'stickTop',
        'groupIds',
        'serverExtension',
        'localExtension',
        'lastMessage',
        'lastMessageState',
        'unreadCount',
        'sortOrder',
        'createTime',
        'updateTime',
        'lastReadTime',
      ].forEach((r) => {
        var s = r
        if (void 0 !== e[s]) {
          var a = this.fieldVersion[i]
          ;(a && 'number' == typeof a[s] && a[s] >= t) ||
            ((this.fieldVersion[i] = this.fieldVersion[i] || {}),
            (this.fieldVersion[i][s] = t),
            (n[s] = e[s]),
            (o += 1))
        }
      }),
      o
        ? Object.assign(Object.assign({}, n), {
            conversationId: i,
            deleteFlag: r,
            version: t,
            type: s,
          })
        : void 0
    )
  }
  bulkUpdateModel(e) {
    var t = !1
    e.forEach((e) => {
      this.updateModel(e) && (t = !0)
    }),
      t && this.service.unread.digestUnreadCountChange()
  }
  initFieldVersion(e, t) {
    this.fieldVersion[e] = {
      stickTop: t,
      groupIds: t,
      serverExtension: t,
      lastMessage: t,
      lastMessageState: t,
      unreadCount: t,
      sortOrder: t,
      createTime: t,
      updateTime: t,
      lastReadTime: t,
    }
  }
  initConversation(e, t) {
    var i = Date.now()
    return Object.assign(
      {
        conversationId: e,
        type: this.core.V2NIMConversationIdUtil.parseConversationType(e),
        stickTop: !1,
        localExtension: '',
        serverExtension: '',
        unreadCount: 0,
        lastReadTime: 0,
        createTime: i,
        updateTime: i,
        sortOrder: i,
      },
      t
    )
  }
  updateModel(e) {
    var { deleteFlag: t, conversation: i } = hn(e)
    if (t) {
      var r = this.service.model.deleteById(i.conversationId)
      return !!(r && r.unreadCount > 0)
    }
    return this.service.model.upsert(i)
  }
  setModel(e) {
    var t = e.filter((e) => !e.deleteFlag).map((e) => hn(e).conversation)
    this.service.model.set(t)
  }
  updateModelWithLastMessage(e, t, i, r) {
    var s = this.service.model.getById(e),
      n = t ? dn(this.core, t, i, r) : void 0
    if (!yn(null == s ? void 0 : s.lastMessage, n))
      if (s) {
        var o = Object.assign(Object.assign({}, s), {
          sortOrder: n
            ? s.stickTop
              ? n.messageRefer.createTime + 1e15
              : n.messageRefer.createTime
            : s.sortOrder,
          lastMessage: n,
        })
        this.service.model.upsert(o),
          this.service.triggerConversationChanged([o])
      } else {
        this.initFieldVersion(e, -1)
        var a = this.initConversation(e, { lastMessage: n })
        this.service.model.upsert(a), this.service.triggerConversationCreated(a)
      }
  }
  updateModelByRevoke(e) {
    var t = []
    e.forEach((e) => {
      var { postscript: i, messageRefer: r } = e,
        s = Ee(e, ['postscript', 'messageRefer']),
        n = r.conversationId,
        o = this.service.model.getById(n)
      o &&
        o.lastMessage &&
        o.lastMessage.messageRefer.messageClientId === r.messageClientId &&
        1 !== o.lastMessage.lastMessageState &&
        ((o.lastMessage.lastMessageState = 1),
        i && (o.lastMessage.text = i),
        Object.assign(o.lastMessage, s),
        this.service.model.upsert(o),
        t.push(o))
    }),
      t.length > 0 && this.service.triggerConversationChanged(t)
  }
  compareAndUpdateModel(e) {
    this.core.logger.log(
      'V2NIMConversation::compareAndUpdateModel',
      e.map((e) => e.conversationId)
    )
    var t = !1,
      i = []
    e.forEach((e) => {
      var r = this.compare(e)
      if (r) {
        var s = this.service.model.getById(e.conversationId)
        this.updateModel(r) && (t = !0)
        var n = this.service.model.getById(e.conversationId)
        n && (s ? i.push(n) : this.service.triggerConversationCreated(n))
      }
    }),
      i.length > 0 && this.service.triggerConversationChanged(i),
      t && this.service.unread.digestUnreadCountChange()
  }
  compareAndDeleteModel(e) {
    this.core.logger.log('V2NIMConversation::compareAndDeleteModel', e)
    var t = e.reduce((e, t) => {
      delete this.fieldVersion[t]
      var i = this.service.model.deleteById(t)
      return !!(i && i.unreadCount > 0) || e
    }, !1)
    this.service.emit('onConversationDeleted', e),
      t && this.service.unread.digestUnreadCountChange()
  }
  compareAndDeleteGroupInModel(e, t) {
    this.core.logger.log(
      'V2NIMConversation::compareAndDeleteGroupInModel',
      e,
      t
    )
    var i = []
    Object.keys(this.fieldVersion).forEach((r) => {
      var s = this.fieldVersion[r]
      if (void 0 === s.groupIds || e > s.groupIds) {
        s.groupIds = e
        var n = this.service.model.getById(r)
        if (n && n.groupIds && n.groupIds.length > 0) {
          var o = n.groupIds.filter((e) => e !== t)
          if (o.length !== n.groupIds.length) {
            var a = Object.assign(Object.assign({}, n), { groupIds: o })
            this.service.model.upsert(a), a && i.push(a)
          }
        }
      }
    }),
      i.length > 0 && this.service.triggerConversationChanged(i)
  }
  compareAndClearUnreadInModel(e) {
    var {
      oneClickClearUnreadType: t,
      oneClickClearUnreadVersion: i,
      oneClickClearUnreadLastReadTime: r,
      oneClickClearUnreadConversationType: s,
      oneClickClearUnreadGroupId: n,
    } = e
    this.core.logger.log(
      `V2NIMConversation::compareAndClearUnreadInModel.ver:${i};type:${t};lastReadTime:${r};filter:${
        s || ''
      };grounp:${n || ''}`
    )
    var o = [],
      a = []
    if (1 === t) a = this.service.model.getAll()
    else if (s || n) {
      var c = this.service.model.count()
      a = this.service.model.getByOption(0, c, {
        conversationTypes: s,
        conversationGroupIds: n ? [n] : void 0,
      }).conversationList
    }
    a.forEach((e) => {
      var t = e.conversationId,
        s = this.fieldVersion[t]
      if (void 0 === s.unreadCount || i > s.unreadCount) {
        ;(s.unreadCount = i), (s.lastReadTime = i)
        var n = e.unreadCount,
          a = Object.assign(Object.assign({}, e), {
            lastReadTime: r,
            unreadCount: 0,
          })
        this.service.model.upsert(a), n > 0 && o.push(a)
      }
    }),
      o.length > 0 && this.service.triggerConversationChanged(o),
      this.service.unread.digestUnreadCountChange()
  }
  backfillLastMsg(e, t) {
    var i = (e = ii(e))
    ;(t ||
      0 !== (i = e.filter((e) => this.conversationIdsForBackFill[e])).length) &&
      i.forEach((e) => {
        var t = Ve(
            this.service.model.getById(e),
            'lastMessage.messageRefer.messageClientId'
          ),
          i = this.service.compute.hasMessageService
            ? this.core.V2NIMMessageService.model.getLastMessageOfConversation(
                e
              )
            : void 0
        ;(i && i.messageClientId) !== t &&
          ((this.conversationIdsForBackFill[e] = !1),
          i
            ? this.updateModelWithLastMessage(e, i, 2, i.sendingState)
            : this.updateModelWithLastMessage(e, void 0, 2, 0))
      })
  }
}
var Mn = {
    '28_1': 'v2ConversationCreate',
    '28_2': 'v2ConversationDelete',
    '28_3': 'v2ConversationUpdate',
    '28_4': 'v2ConversationSetTop',
    '28_5': 'v2ConversationUnreadClear',
    '28_6': 'v2ConversationGet',
    '28_7': 'v2ConversationGetByIds',
    '28_8': 'v2ConversationGetList',
    '28_17': 'v2ConversationsDelete',
    '28_18': 'v2ConversationsUnreadClear',
    '28_19': 'v2ConversationSync',
    '28_20': 'v2ConversationNotifySync',
    '28_21': 'v2ConversationNotifySyncOnline',
    '28_23': 'v2ConversationClearTotalUnread',
    '28_24': 'v2ConversationClearTypeUnread',
    '28_25': 'v2ConversationClearGroupUnread',
    '4_14': 'syncConversationReadTime',
    '4_20': 'syncSuperTeamReadTime',
    '4_22': 'v2SyncSessionsWithMoreRoaming',
    '4_25': 'v2SyncSessionReliableInfo',
    '30_16': 'v2MarkConversationReadTime',
    '32_25': 'v2MarkSuperTeamReadTime',
    '7_116': 'v2MultiDeviceConversationReadTime',
    '21_125': 'v2MultiDeviceSuperTeamReadTime',
  },
  _n = 'V2NIMConversationService',
  En = {
    conversationId: 1,
    type: { id: 2, retType: 'number' },
    serverExtension: 3,
    groupIds: { id: 4, retConverter: (e) => (e ? JSON.parse(e) : void 0) },
    lastMessage: 5,
    lastMessageState: { id: 6, retType: 'number' },
    unreadCount: { id: 7, retType: 'number' },
    stickTop: { id: 8, retType: 'boolean' },
    sortOrder: { id: 9, retType: 'number' },
    version: { id: 10, retType: 'number' },
    deleteFlag: { id: 11, retType: 'boolean' },
    createTime: { id: 12, retType: 'number' },
    updateTime: { id: 13, retType: 'number' },
    lastReadTime: { id: 14, retType: 'number' },
  },
  Tn = {
    type: { id: 1, retType: 'number' },
    oneClickClearUnreadType: { id: 2, retType: 'number' },
    oneClickClearUnreadConversationType: { id: 3, retConverter: _t },
    oneClickClearUnreadGroupId: { id: 4, retType: 'string' },
    oneClickClearUnreadVersion: { id: 5, retType: 'number' },
    oneClickClearUnreadLastReadTime: { id: 6, retType: 'number' },
  },
  Sn = {
    v2ConversationCreate: {
      sid: 28,
      cid: 1,
      service: _n,
      params: [
        { type: 'Property', name: 'tag', reflectMapper: { conversationId: 1 } },
      ],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(En) }],
    },
    v2ConversationDelete: {
      sid: 28,
      cid: 2,
      service: _n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { conversationId: 1, clearMessage: 2 },
        },
      ],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(En) }],
    },
    v2ConversationUpdate: {
      sid: 28,
      cid: 3,
      service: _n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { conversationId: 1, serverExtension: 2 },
        },
      ],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(En) }],
    },
    v2ConversationSetTop: {
      sid: 28,
      cid: 4,
      service: _n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { conversationId: 1, stickTop: 2 },
        },
      ],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(En) }],
    },
    v2ConversationUnreadClear: {
      sid: 28,
      cid: 5,
      service: _n,
      params: [
        { type: 'Property', name: 'tag', reflectMapper: { conversationId: 1 } },
      ],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(En) }],
    },
    v2ConversationGet: {
      sid: 28,
      cid: 6,
      service: _n,
      params: [
        { type: 'Property', name: 'tag', reflectMapper: { conversationId: 1 } },
      ],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(En) }],
    },
    v2ConversationGetByIds: {
      sid: 28,
      cid: 7,
      service: _n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { conversationIds: 1 },
        },
      ],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(En) },
        { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } },
      ],
    },
    v2ConversationGetList: {
      sid: 28,
      cid: 8,
      service: _n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { cursor: 1, limit: 2 },
        },
      ],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(En) },
        {
          type: 'Property',
          name: 'info',
          reflectMapper: { 1: 'hasMore', 2: 'offset' },
        },
      ],
    },
    v2ConversationsDelete: {
      sid: 28,
      cid: 17,
      service: _n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { conversationIds: 1, clearMessage: 2 },
        },
      ],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(En) },
        { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } },
      ],
    },
    v2ConversationsUnreadClear: {
      sid: 28,
      cid: 18,
      service: _n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { conversationIds: 1 },
        },
      ],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(En) },
        { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } },
      ],
    },
    v2ConversationSync: {
      sid: 28,
      cid: 19,
      service: _n,
      params: [{ type: 'Property', name: 'tag', reflectMapper: { cursor: 1 } }],
      response: [
        {
          type: 'Property',
          name: 'info',
          reflectMapper: { 1: 'nextCursor', 2: 'syncType' },
        },
      ],
    },
    v2ConversationNotifySync: {
      sid: 28,
      cid: 20,
      service: _n,
      response: [
        {
          type: 'Property',
          name: 'info',
          reflectMapper: { 1: 'nextCursor', 2: 'syncType' },
        },
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(En) },
      ],
    },
    v2ConversationNotifySyncOnline: {
      sid: 28,
      cid: 21,
      service: _n,
      response: [
        { type: 'Property', name: 'info', reflectMapper: ft(Tn) },
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(En) },
      ],
    },
    v2ConversationClearTotalUnread: {
      sid: 28,
      cid: 23,
      service: _n,
      response: [{ type: 'Property', name: 'info', reflectMapper: ft(Tn) }],
    },
    v2ConversationClearTypeUnread: {
      sid: 28,
      cid: 24,
      service: _n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { conversationType: 1 },
        },
      ],
      response: [{ type: 'Property', name: 'info', reflectMapper: ft(Tn) }],
    },
    v2ConversationClearGroupUnread: {
      sid: 28,
      cid: 25,
      service: _n,
      params: [
        { type: 'Property', name: 'tag', reflectMapper: { groupId: 1 } },
      ],
      response: [{ type: 'Property', name: 'info', reflectMapper: ft(Tn) }],
    },
    syncConversationReadTime: {
      sid: 4,
      cid: 14,
      service: _n,
      response: [
        { type: 'StrLongMap', name: 'p2p' },
        { type: 'LongLongMap', name: 'team' },
        { type: 'Long', name: 'timetag' },
      ],
    },
    syncSuperTeamReadTime: {
      sid: 4,
      cid: 20,
      service: _n,
      response: [{ type: 'LongLongMap', name: 'superTeam' }],
    },
    v2SyncSessionsWithMoreRoaming: {
      sid: 4,
      cid: 22,
      service: _n,
      response: [],
    },
    v2SyncSessionReliableInfo: { sid: 4, cid: 25, service: _n, response: [] },
    v2MarkConversationReadTime: {
      sid: 30,
      cid: 16,
      service: _n,
      params: [
        { type: 'Byte', name: 'scene' },
        { type: 'String', name: 'to' },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2MarkSuperTeamReadTime: {
      sid: 32,
      cid: 25,
      service: _n,
      params: [
        { type: 'Long', name: 'to' },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2MultiDeviceConversationReadTime: {
      sid: 30,
      cid: 116,
      service: _n,
      response: [
        { type: 'Byte', name: 'scene' },
        { type: 'String', name: 'to' },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2MultiDeviceSuperTeamReadTime: {
      sid: 21,
      cid: 125,
      service: _n,
      response: [
        { type: 'Long', name: 'to' },
        { type: 'Long', name: 'timetag' },
      ],
    },
  }
class Cn {
  constructor(e, t) {
    ;(this.totalUnreadCount = void 0),
      (this.unreadCountByFilter = {}),
      (this.core = e),
      (this.service = t)
  }
  reset() {
    ;(this.totalUnreadCount = void 0), (this.unreadCountByFilter = {})
  }
  getTotalUnreadCount() {
    return this.totalUnreadCount
  }
  resetTotalAfterSyncDone() {
    var e = this.service.model
        .getAll()
        .reduce((e, t) => e + (t.unreadCount || 0), 0),
      t = this.totalUnreadCount
    return (
      (void 0 !== t && t === e) ||
        ((this.totalUnreadCount = e),
        this.service.emit('onTotalUnreadCountChanged', e)),
      e
    )
  }
  digestUnreadCountChange() {
    this._digest()
  }
  _digest() {
    var e = this.totalUnreadCount,
      t = this.service.model
        .getAll()
        .reduce((e, t) => e + (t.unreadCount || 0), 0)
    this.core.logger.log(
      `V2NIMConversation::digestUnreadCountChange:oldUnreadCount ${e}, newUnreadCount ${t}`
    ),
      e !== t &&
        ((this.totalUnreadCount = t),
        this.service.emit('onTotalUnreadCountChanged', t)),
      Object.keys(this.unreadCountByFilter).forEach((e) => {
        var t = JSON.parse(e),
          i = this.getUnreadCountByFilter(t),
          r = this.unreadCountByFilter[e]
        ;(this.unreadCountByFilter[e] = i),
          (t.equals = An.bind(t)),
          r !== i && this.service.emit('onUnreadCountChangedByFilter', t, i)
      })
  }
  getUnreadCountByIds(e) {
    return e.reduce((e, t) => {
      var i = this.service.model.getById(t)
      return e + ((i && i.unreadCount) || 0)
    }, 0)
  }
  getUnreadCountByFilter(e) {
    var t = this.service.model.count()
    return this.service.model
      .getByOption(0, t, {
        conversationTypes: e.conversationTypes,
        conversationGroupIds: e.conversationGroupId
          ? [e.conversationGroupId]
          : void 0,
        ignoreMuted: e.ignoreMuted,
      })
      .conversationList.reduce((e, t) => e + (t.unreadCount || 0), 0)
  }
  addFilter(e) {
    var t = Nn(e)
    if (void 0 !== this.unreadCountByFilter[t])
      throw new he({ code: de.V2NIM_ERROR_CODE_RESOURCE_ALREADY_EXIST })
    var i = JSON.parse(t),
      r = this.getUnreadCountByFilter(i)
    ;(this.unreadCountByFilter[t] = r),
      this.service.emit('onUnreadCountChangedByFilter', i, r)
  }
  deleteFilter(e) {
    var t = Nn(e)
    if (void 0 === this.unreadCountByFilter[t])
      throw new he({ code: de.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST })
    delete this.unreadCountByFilter[t]
  }
}
function Nn(e) {
  var { conversationTypes: t } = e
  return (
    t && (t = t.sort()),
    JSON.stringify({
      conversationGroupId: e.conversationGroupId,
      conversationTypes: t,
      ignoreMuted: e.ignoreMuted,
    })
  )
}
function An(e) {
  return JSON.stringify(this) === Nn(e)
}
var Rn = { createTime: { type: 'number' }, updateTime: { type: 'number' } }
function On(e) {
  return e && e.length > 0 ? e.map((e) => bn(e)) : []
}
function bn(e) {
  return Et(Rn, e)
}
function kn(e) {
  var t = JSON.parse(e)
  return Object.keys(t).map((e) => ({
    conversationId: e,
    error: new he({ code: t[e] }),
  }))
}
var Vn,
  Pn = {
    type: { type: 'number' },
    deleteVersion: { type: 'number' },
    conversationIds: { type: 'object' },
  }
function Ln(e) {
  return Et(Pn, e)
}
!(function (e) {
  ;(e[(e.createConversationGroup = 1)] = 'createConversationGroup'),
    (e[(e.deleteConversationGroup = 2)] = 'deleteConversationGroup'),
    (e[(e.updateConversationGroup = 3)] = 'updateConversationGroup'),
    (e[(e.addConversationToGroup = 4)] = 'addConversationToGroup'),
    (e[(e.removeConversationFromGroup = 5)] = 'removeConversationFromGroup')
})(Vn || (Vn = {}))
class Dn {
  constructor(e, t) {
    ;(this.core = e), (this.service = t)
  }
  get hasUserService() {
    var e
    return !!(null === (e = this.core.V2NIMUserService) || void 0 === e
      ? void 0
      : e.name)
  }
  get hasFriendService() {
    var e
    return !!(null === (e = this.core.V2NIMFriendService) || void 0 === e
      ? void 0
      : e.name)
  }
  get hasTeamService() {
    var e
    return !!(null === (e = this.core.V2NIMTeamService) || void 0 === e
      ? void 0
      : e.name)
  }
  get hasMessageService() {
    var e
    return !!(null === (e = this.core.V2NIMMessageService) || void 0 === e
      ? void 0
      : e.name)
  }
  computeConvs(e) {
    return e.map((e) => this.computeConv(e))
  }
  computeConv(e) {
    var t, i, r, s, n
    if (0 === e.type) return e
    var o = this.core.V2NIMConversationIdUtil.parseConversationType(
        e.conversationId
      ),
      a = this.core.V2NIMConversationIdUtil.parseConversationTargetId(
        e.conversationId
      ),
      c = {}
    if (
      (e.lastReadTime ||
        (c.lastReadTime = this.service.model.getReadTime(e.conversationId)),
      (null === (t = this.core.V2NIMSettingService) || void 0 === t
        ? void 0
        : t.name) &&
        (c.mute = this.core.V2NIMSettingService.getConversationMuteStatus(
          e.conversationId
        )),
      1 === o && this.hasUserService)
    ) {
      var d,
        l = this.core.V2NIMUserService.model.getUser(a),
        p = this.hasFriendService
          ? this.core.V2NIMFriendService.model.getFriend(a)
          : void 0
      e.conversationId !==
        (null === (i = e.lastMessage) || void 0 === i
          ? void 0
          : i.messageRefer.conversationId) ||
        (0 !==
          (null === (r = e.lastMessage) || void 0 === r
            ? void 0
            : r.lastMessageState) &&
          2 !==
            (null === (s = e.lastMessage) || void 0 === s
              ? void 0
              : s.lastMessageState)) ||
        (d =
          null === (n = e.lastMessage) || void 0 === n ? void 0 : n.senderName),
        (c.name =
          (null == p ? void 0 : p.alias) ||
          (null == l ? void 0 : l.name) ||
          d ||
          a),
        (c.avatar = (null == l ? void 0 : l.avatar) || '')
    } else if (2 === o && this.hasTeamService) {
      var h = this.core.V2NIMTeamService.model.getById(a, 1)
      ;(c.name = (null == h ? void 0 : h.name) || a),
        (c.avatar = (null == h ? void 0 : h.avatar) || '')
    } else if (3 === o && this.hasTeamService) {
      var u = this.core.V2NIMTeamService.model.getById(a, 2)
      ;(c.name = (null == u ? void 0 : u.name) || a),
        (c.avatar = (null == u ? void 0 : u.avatar) || '')
    }
    return Object.assign(e, c), e
  }
  computeReadTimeForMark(e) {
    var t,
      i,
      r,
      s = e.conversationId,
      n = this.service.model.getReadTime(s)
    if (
      null ===
        (i =
          null === (t = null == e ? void 0 : e.lastMessage) || void 0 === t
            ? void 0
            : t.messageRefer) || void 0 === i
        ? void 0
        : i.createTime
    )
      r = e.lastMessage.messageRefer.createTime
    else {
      if (!this.core.timeOrigin.checkNodeReliable()) return n || 0
      r = this.core.timeOrigin.getNTPTime()
    }
    return r
  }
}
class wn {
  constructor(e, t) {
    ;(this.core = e),
      (this.service = t),
      (this.model = this.service.model),
      (this.logger = this.core.logger)
  }
  get ifEnabled() {
    return !0 === this.core.options.enableV2CloudConversation
  }
  v2ConversationNotifySyncHandler(e) {
    this.ifEnabled &&
      this.service.versionCache.recvConversationFromSyncAction(e)
  }
  v2ConversationNotifySyncOnlineHandler(e) {
    this.ifEnabled && this.service.versionCache.recvConversation(e)
  }
  syncConversationReadTimeHandler(e) {
    var t, i, r
    if (this.ifEnabled) {
      if (
        null === (t = null == e ? void 0 : e.content) || void 0 === t
          ? void 0
          : t.p2p
      )
        for (var [s, n] of Object.entries(e.content.p2p))
          this.model.updateReadTime(
            this.core.V2NIMConversationIdUtil.p2pConversationId(s),
            n
          ),
            this.service.emit(
              'onConversationReadTimeUpdated',
              this.core.V2NIMConversationIdUtil.p2pConversationId(s),
              n
            )
      if (
        null ===
          (r =
            null === (i = null == e ? void 0 : e.content) || void 0 === i
              ? void 0
              : i.team) || void 0 === r
          ? void 0
          : r.m_map
      )
        for (var [o, a] of Object.entries(e.content.team.m_map))
          this.model.updateReadTime(
            this.core.V2NIMConversationIdUtil.teamConversationId(o),
            a
          ),
            this.service.emit(
              'onConversationReadTimeUpdated',
              this.core.V2NIMConversationIdUtil.teamConversationId(o),
              a
            )
    }
  }
  syncSuperTeamReadTimeHandler(e) {
    var t, i
    if (
      this.ifEnabled &&
      (null ===
        (i =
          null === (t = null == e ? void 0 : e.content) || void 0 === t
            ? void 0
            : t.superTeam) || void 0 === i
        ? void 0
        : i.m_map)
    )
      for (var [r, s] of Object.entries(e.content.superTeam.m_map))
        this.model.updateReadTime(
          this.core.V2NIMConversationIdUtil.superTeamConversationId(r),
          s
        ),
          this.service.emit(
            'onConversationReadTimeUpdated',
            this.core.V2NIMConversationIdUtil.superTeamConversationId(r),
            s
          )
  }
  v2MultiDeviceConversationReadTimeHandler(e) {
    var t
    this.ifEnabled &&
      (null === (t = null == e ? void 0 : e.content) || void 0 === t
        ? void 0
        : t.to) &&
      (0 === e.content.scene
        ? (this.model.updateReadTime(
            this.core.V2NIMConversationIdUtil.p2pConversationId(e.content.to),
            e.content.timetag
          ),
          this.service.emit(
            'onConversationReadTimeUpdated',
            this.core.V2NIMConversationIdUtil.p2pConversationId(e.content.to),
            e.content.timetag
          ))
        : (this.model.updateReadTime(
            this.core.V2NIMConversationIdUtil.teamConversationId(e.content.to),
            e.content.timetag
          ),
          this.service.emit(
            'onConversationReadTimeUpdated',
            this.core.V2NIMConversationIdUtil.teamConversationId(e.content.to),
            e.content.timetag
          )))
  }
  v2MultiDeviceSuperTeamReadTimeHandler(e) {
    var t
    this.ifEnabled &&
      (null === (t = null == e ? void 0 : e.content) || void 0 === t
        ? void 0
        : t.to) &&
      (this.model.updateReadTime(
        this.core.V2NIMConversationIdUtil.superTeamConversationId(e.content.to),
        e.content.timetag
      ),
      this.service.emit(
        'onConversationReadTimeUpdated',
        this.core.V2NIMConversationIdUtil.superTeamConversationId(e.content.to),
        e.content.timetag
      ))
  }
}
class Un {
  constructor(e, t) {
    ;(this.core = e),
      (this.service = t),
      (this.model = this.service.model),
      (this.versionCache = this.service.versionCache),
      (this.logger = this.core.logger)
  }
  setListener() {
    this.core.eventBus.on('V2NIMLoginService/loginLifeCycleLoginSucc', () =>
      this.versionCache.doSync()
    ),
      this.core.eventBus.on(
        'V2NIMConversationService/conversationOnlineSyncNotify',
        this.conversationOnlineSyncNotify.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/sendMessage',
        this.sendMessage.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/deleteMessages',
        this.deleteMessages.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/revokeMessages',
        this.revokeMessages.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/roamingMsgs',
        this.roamingOrOfflineMsgs.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMMessageService/offlineMsgs',
        this.roamingOrOfflineMsgs.bind(this)
      ),
      this.core.eventBus.on(
        'V2NIMSettingService/setMute',
        this.setMute.bind(this)
      )
  }
  beforeEmit(e, ...t) {
    var i,
      r,
      s = `${this.service.name}::emit ${e.toString()}`
    if ('onConversationCreated' === e) {
      var n = t[0]
      this.logger.log(
        `${s}`,
        `id:${n.conversationId};unread:${n.unreadCount};lastMsg:${
          null === (i = n.lastMessage) || void 0 === i
            ? void 0
            : i.messageRefer.messageClientId
        }/${
          null === (r = n.lastMessage) || void 0 === r
            ? void 0
            : r.messageRefer.messageServerId
        }`
      )
    } else if ('onConversationChanged' === e) {
      var o = t[0]
      this.logger.log(
        `${s}`,
        o.map((e) => {
          var t, i
          return `id:${e.conversationId};unread:${e.unreadCount};lastMsg:${
            null === (t = e.lastMessage) || void 0 === t
              ? void 0
              : t.messageRefer.messageClientId
          }/${
            null === (i = e.lastMessage) || void 0 === i
              ? void 0
              : i.messageRefer.messageServerId
          }`
        })
      )
    } else this.logger.log(`${s}`, ...t)
  }
  conversationOnlineSyncNotify(e, t) {
    var i
    !1 !==
      (null === (i = null == t ? void 0 : t.messageConfig) || void 0 === i
        ? void 0
        : i.lastMessageUpdateEnabled) &&
      ((e.content.info = gt(e.content.info, ft(Tn))),
      (e.content.data = gt(e.content.data, ft(En))),
      t && (e.content.data.lastMessage = dn(this.core, t, 0)),
      (e.content.datas = [e.content.data]),
      this.service.handler.v2ConversationNotifySyncOnlineHandler.call(this, e))
  }
  sendMessage(e, t) {
    var i, r
    ;(1 === t &&
      !0 ===
        (null === (i = e.messageConfig) || void 0 === i
          ? void 0
          : i.historyEnabled)) ||
      (!1 !==
        (null === (r = null == e ? void 0 : e.messageConfig) || void 0 === r
          ? void 0
          : r.lastMessageUpdateEnabled) &&
        this.versionCache.updateModelWithLastMessage(e.conversationId, e, 2, t))
  }
  deleteMessages(e) {
    var t = e.map((e) => e.messageRefer.conversationId)
    this.versionCache.backfillLastMsg(t, !0)
  }
  revokeMessages(e) {
    this.versionCache.updateModelByRevoke(e)
  }
  roamingOrOfflineMsgs(e) {
    var t = ii(e.map((e) => e.conversationId))
    this.versionCache.backfillLastMsg(t, !1)
  }
  setMute(e, t) {
    var i = this.model.getById(e)
    i &&
      i.mute !== t &&
      ((i.mute = t),
      this.model.upsert(i),
      this.service.triggerConversationChanged([i]))
  }
}
class xn extends ni {
  constructor(e, t = {}) {
    super('V2NIMConversationService', e),
      (this.config = {}),
      (this.model = new fn()),
      (this.versionCache = new In(this.core, this)),
      (this.unread = new Cn(this.core, this)),
      (this.compute = new Dn(this.core, this)),
      (this.event = new Un(this.core, this)),
      (this.handler = new wn(this.core, this)),
      this.core._registerDep(xi, 'V2NIMConversationIdUtil'),
      'v2' === this.core.options.apiVersion &&
        !0 === this.core.options.enableV2CloudConversation &&
        (vt({ cmdMap: Mn, cmdConfig: Sn }),
        this.setOptions(t),
        this.setListener())
  }
  setOptions(e) {
    this.config = Object.assign(this.config, e)
  }
  setListener() {
    this.event.setListener()
  }
  reset() {
    this.versionCache.reset(), this.model.reset(), this.unread.reset()
  }
  emit(e, ...t) {
    return this.event.beforeEmit(e, ...t), super.emit(e, ...t)
  }
  checkEnable() {
    if (!0 !== this.core.options.enableV2CloudConversation)
      throw new he({
        code: de.V2NIM_ERROR_CODE_MISUSE,
        detail: { reason: 'V2CloudConversation is not enabled' },
      })
  }
  getConversationList(e, t) {
    this.checkEnable(),
      this.checkV2(),
      ye({ offset: { type: 'number', min: 0 } }, { offset: e }, '', !0),
      ye({ limit: { type: 'number', min: 1 } }, { limit: t }, '', !0),
      this.core.V2NIMLoginService.checkIllegalState()
    var i = this.model.getByOption(e, t, {})
    return (
      (i.conversationList = this.compute.computeConvs(i.conversationList)),
      Promise.resolve(i)
    )
  }
  getConversationListByOption(e, t, i) {
    this.checkEnable(),
      this.checkV2(),
      ye({ offset: { type: 'number', min: 0 } }, { offset: e }, '', !0),
      ye({ limit: { type: 'number', min: 1 } }, { limit: t }, '', !0),
      ye(
        {
          option: {
            type: 'object',
            required: !0,
            rules: {
              conversationTypes: {
                type: 'array',
                itemType: 'number',
                required: !1,
              },
              onlyUnread: { type: 'boolean', required: !1 },
              conversationGroupIds: {
                type: 'array',
                itemType: 'string',
                required: !1,
              },
            },
          },
        },
        { option: i },
        '',
        !0
      ),
      this.core.V2NIMLoginService.checkIllegalState()
    var r = this.model.getByOption(e, t, i)
    return (
      (r.conversationList = this.compute.computeConvs(r.conversationList)),
      Promise.resolve(r)
    )
  }
  getConversation(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(), this.checkV2(), Me(this.core.account, e)
      var t = this.model.getById(e)
      if (t) return this.compute.computeConv(t)
      throw new he({ code: de.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST })
    })
  }
  getConversationListByIds(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(),
        this.checkV2(),
        ye(
          { conversationIds: { type: 'array', itemType: 'string', min: 1 } },
          { conversationIds: e },
          '',
          !0
        ),
        this.core.V2NIMLoginService.checkIllegalState()
      var t = e.map((e) => this.model.getById(e)).filter((e) => !!e)
      return this.compute.computeConvs(t)
    })
  }
  createConversation(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(), this.checkV2(), Me(this.core.account, e)
      var t = Ve(
          yield this.core.sendCmd('v2ConversationCreate', {
            tag: { conversationId: e },
          }),
          'content.data'
        ),
        i = pn(this.core, t)
      this.versionCache.compareAndUpdateModel([i])
      var r = this.model.getById(e)
      if (r) return this.compute.computeConv(r)
      throw new he({ code: de.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST })
    })
  }
  deleteConversation(e, t) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(),
        this.checkV2(),
        Me(this.core.account, e),
        ye(
          { clearMessage: { type: 'boolean', required: !1 } },
          { clearMessage: t },
          '',
          !0
        )
      try {
        yield this.core.sendCmd('v2ConversationDelete', {
          tag: { conversationId: e, clearMessage: Number(t || !1) },
        })
      } catch (t) {
        this.logger.warn(
          `V2NIMConversationService:deleteConversation: delete conversation failed: ${e}`
        )
      }
      this.model.getById(e) &&
        (t &&
          this.core.eventBus.emit(
            'V2NIMConversationService/deleteConversation',
            [e]
          ),
        this.versionCache.compareAndDeleteModel([e]))
    })
  }
  deleteConversationListByIds(e, t) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(),
        this.checkV2(),
        ye(
          { conversationIds: { type: 'array', itemType: 'string', min: 1 } },
          { conversationIds: e },
          '',
          !0
        ),
        ye(
          { clearMessage: { type: 'boolean', required: !1 } },
          { clearMessage: t },
          '',
          !0
        )
      var i = kn(
        Ve(
          yield this.core.sendCmd('v2ConversationsDelete', {
            tag: {
              conversationIds: JSON.stringify(e),
              clearMessage: Number(t || !1),
            },
          }),
          'content.info.failedMap'
        )
      ).filter(
        (e) =>
          e.error.code !== de.V2NIM_ERROR_CODE_CONVERSATION_NOT_EXIST ||
          !this.model.getById(e.conversationId)
      )
      return (
        i.length < e.length &&
          (t &&
            this.core.eventBus.emit(
              'V2NIMConversationService/deleteConversation',
              e
            ),
          this.versionCache.compareAndDeleteModel(e)),
        i
      )
    })
  }
  getStickTopConversationList() {
    return Te(this, void 0, void 0, function* () {
      return (
        this.checkV2(),
        this.core.V2NIMLoginService.checkIllegalState(),
        this.model.getStickTopList()
      )
    })
  }
  stickTopConversation(e, t) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(),
        this.checkV2(),
        Me(this.core.account, e),
        ye({ stickTop: { type: 'boolean' } }, { stickTop: t }, '', !0)
      var i = Ve(
          yield this.core.sendCmd('v2ConversationSetTop', {
            tag: { conversationId: e, stickTop: Number(t) },
          }),
          'content.data'
        ),
        r = pn(this.core, i)
      this.versionCache.compareAndUpdateModel([r])
    })
  }
  updateConversation(e, t) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(),
        this.checkV2(),
        Me(this.core.account, e),
        ye(
          {
            updateInfo: {
              type: 'object',
              required: !0,
              rules: { serverExtension: { type: 'string' } },
            },
          },
          { updateInfo: t },
          '',
          !0
        )
      var i = Ve(
          yield this.core.sendCmd('v2ConversationUpdate', {
            tag: Object.assign({ conversationId: e }, t),
          }),
          'content.data'
        ),
        r = pn(this.core, i)
      this.versionCache.compareAndUpdateModel([r])
    })
  }
  updateConversationLocalExtension(e, t) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(),
        this.checkV2(),
        Me(this.core.account, e),
        ye(
          { localExtension: { type: 'string' } },
          { localExtension: t },
          '',
          !0
        )
      var i = this.model.getById(e)
      if (!i) throw new he({ code: de.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST })
      if (i.localExtension !== t) {
        var r = Object.assign(Object.assign({}, i), { localExtension: t })
        this.model.upsert(r), this.triggerConversationChanged([r])
      }
    })
  }
  getTotalUnreadCount() {
    return (
      this.checkEnable(), this.checkV2(), this.unread.getTotalUnreadCount() || 0
    )
  }
  getUnreadCountByIds(e) {
    this.checkEnable(),
      this.checkV2(),
      ye(
        { conversationIds: { type: 'array', itemType: 'string', min: 1 } },
        { conversationIds: e },
        '',
        !0
      )
    var t = this.unread.getUnreadCountByIds(e)
    return Promise.resolve(t)
  }
  getUnreadCountByFilter(e) {
    this.checkEnable(), this.checkV2(), this.valiteFilter(e)
    var t = this.unread.getUnreadCountByFilter(e)
    return Promise.resolve(t)
  }
  clearTotalUnreadCount() {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(), this.checkV2()
      var e = Ve(
        yield this.core.sendCmd('v2ConversationClearTotalUnread'),
        'content.info'
      )
      this.versionCache.compareAndClearUnreadInModel(e)
    })
  }
  clearUnreadCountByIds(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(),
        this.checkV2(),
        ye(
          { conversationIds: { type: 'array', itemType: 'string', min: 1 } },
          { conversationIds: e },
          '',
          !0
        )
      var t = yield this.core.sendCmd('v2ConversationsUnreadClear', {
          tag: { conversationIds: JSON.stringify(e) },
        }),
        i = ln(this.core, Ve(t, 'content.datas')),
        r = kn(Ve(t, 'content.info.failedMap'))
      return this.versionCache.compareAndUpdateModel(i), r
    })
  }
  clearUnreadCountByGroupId(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(),
        this.checkV2(),
        ye({ groupId: { type: 'string' } }, { groupId: e }, '', !0),
        yield this.core.sendCmd('v2ConversationClearGroupUnread', {
          tag: { groupId: e },
        })
    })
  }
  clearUnreadCountByTypes(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(),
        this.checkV2(),
        ye({ types: vn }, { types: e }, '', !0)
      var t = Ve(
        yield this.core.sendCmd('v2ConversationClearTypeUnread', {
          tag: { conversationType: JSON.stringify(e) },
        }),
        'content.info'
      )
      this.versionCache.compareAndClearUnreadInModel(t)
    })
  }
  markConversationRead(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkEnable(),
        this.checkV2(),
        this.checkLogin(),
        Me(this.core.account, e)
      var t = this.model.getById(e)
      if (!t)
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: { reason: 'Conversation not exist' },
        })
      var i = this.core.V2NIMConversationIdUtil.parseConversationTargetId(e),
        r = this.core.V2NIMConversationIdUtil.parseConversationType(e),
        s = this.model.getReadTime(e),
        n = this.compute.computeReadTimeForMark(t)
      return s >= n
        ? (this.logger.log(
            `V2Conv::markConversationRead currentReadTime >= readTime ${e},${s},${n}`
          ),
          s)
        : (3 === r
            ? yield this.core.sendCmd('v2MarkSuperTeamReadTime', {
                timetag: n,
                to: i,
              })
            : yield this.core.sendCmd('v2MarkConversationReadTime', {
                scene: 1 === r ? 0 : 2 === r ? 1 : 2,
                timetag: n,
                to: i,
              }),
          this.model.updateReadTime(e, n),
          n)
    })
  }
  getConversationReadTime(e) {
    return Te(this, void 0, void 0, function* () {
      return (
        this.checkEnable(),
        this.checkV2(),
        Me(this.core.account, e),
        this.model.getReadTime(e)
      )
    })
  }
  subscribeUnreadCountByFilter(e) {
    var t
    this.checkEnable(),
      this.checkV2(),
      this.checkLogin(),
      this.valiteFilter(e),
      0 ===
        (null === (t = e.conversationTypes) || void 0 === t
          ? void 0
          : t.length) && delete e.conversationTypes,
      this.unread.addFilter(e)
  }
  unsubscribeUnreadCountByFilter(e) {
    var t
    this.checkEnable(),
      this.checkV2(),
      this.checkLogin(),
      this.valiteFilter(e),
      0 ===
        (null === (t = e.conversationTypes) || void 0 === t
          ? void 0
          : t.length) && delete e.conversationTypes,
      this.unread.deleteFilter(e)
  }
  valiteFilter(e) {
    if (
      (ye(
        {
          filter: {
            type: 'object',
            required: !0,
            rules: {
              conversationTypes: {
                type: 'array',
                itemType: 'number',
                required: !1,
              },
              conversationGroupId: {
                type: 'string',
                allowEmpty: !1,
                required: !1,
              },
              ignoreMuted: { type: 'boolean', required: !1 },
            },
          },
        },
        { filter: e },
        '',
        !0
      ),
      void 0 === e.conversationTypes &&
        void 0 === e.conversationGroupId &&
        !0 !== e.ignoreMuted)
    )
      throw new he({
        code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
        detail: { reason: 'Filter cannot be empty' },
      })
  }
  triggerConversationChanged(e) {
    ;(e = this.compute.computeConvs(e)),
      (e = JSON.parse(JSON.stringify(e))).forEach((e) => {
        e.lastMessage || (e.lastMessage = void 0), delete e.lastMessageState
      }),
      this.emit('onConversationChanged', e)
  }
  triggerConversationCreated(e) {
    ;(e = this.compute.computeConv(e)),
      delete (e = JSON.parse(JSON.stringify(e))).lastMessageState,
      this.emit('onConversationCreated', e)
  }
}
var Fn,
  Bn = {
    '28_9': 'v2ConversationGroupCreate',
    '28_10': 'v2ConversationGroupDelete',
    '28_11': 'v2ConversationGroupUpdate',
    '28_12': 'v2ConversationGroupGet',
    '28_13': 'v2ConversationGroupsGet',
    '28_14': 'v2ConversationGroupListGet',
    '28_15': 'v2ConversationGroupAddTo',
    '28_16': 'v2ConversationGroupRemoveFrom',
    '28_22': 'v2ConversationGroupNotifySyncOnline',
  },
  $n = 'V2NIMConversationGroupService',
  Gn = {
    groupId: 1,
    name: 2,
    serverExtension: 3,
    createTime: 4,
    updateTime: 5,
  },
  jn = {
    v2ConversationGroupCreate: {
      sid: 28,
      cid: 9,
      service: $n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { conversationIds: 1, name: 2, serverExtension: 3 },
        },
      ],
      response: [
        { type: 'Property', name: 'data', reflectMapper: ft(Gn) },
        { type: 'PropertyArray', name: 'conversations', reflectMapper: ft(En) },
        { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } },
      ],
    },
    v2ConversationGroupDelete: {
      sid: 28,
      cid: 10,
      service: $n,
      params: [
        { type: 'Property', name: 'tag', reflectMapper: { groupId: 1 } },
      ],
      response: [
        {
          type: 'Property',
          name: 'info',
          reflectMapper: { 1: 'type', 2: 'deleteVersion', 3: 'groupList' },
        },
      ],
    },
    v2ConversationGroupUpdate: {
      sid: 28,
      cid: 11,
      service: $n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { groupId: 1, name: 2, serverExtension: 3 },
        },
      ],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Gn) }],
    },
    v2ConversationGroupGet: {
      sid: 28,
      cid: 12,
      service: $n,
      params: [
        { type: 'Property', name: 'tag', reflectMapper: { groupId: 1 } },
      ],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Gn) }],
    },
    v2ConversationGroupsGet: {
      sid: 28,
      cid: 13,
      service: $n,
      params: [
        { type: 'Property', name: 'tag', reflectMapper: { groupIds: 1 } },
      ],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Gn) },
        { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } },
      ],
    },
    v2ConversationGroupListGet: {
      sid: 28,
      cid: 14,
      service: $n,
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(Gn) },
      ],
    },
    v2ConversationGroupAddTo: {
      sid: 28,
      cid: 15,
      service: $n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { groupId: 1, conversationIds: 2 },
        },
      ],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(En) },
        { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } },
      ],
    },
    v2ConversationGroupRemoveFrom: {
      sid: 28,
      cid: 16,
      service: $n,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { groupId: 1, conversationIds: 2 },
        },
      ],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(En) },
        { type: 'Property', name: 'info', reflectMapper: { 1: 'failedMap' } },
      ],
    },
    v2ConversationGroupNotifySyncOnline: {
      sid: 28,
      cid: 22,
      service: $n,
      response: [
        {
          type: 'Property',
          name: 'info',
          reflectMapper: {
            1: 'type',
            2: 'deleteVersion',
            3: 'conversationIds',
          },
        },
        { type: 'Property', name: 'data', reflectMapper: ft(Gn) },
      ],
    },
  },
  qn = 'V2NIMMessageLogUtil',
  Hn = {
    '30_6': 'v2GetMessageList',
    '33_2': 'v2GetMessageListByRefers',
    '30_9': 'v2ClearRoamingMessage',
    '30_18': 'v2ClearHistoryMessage',
    '7_118': 'onClearHistoryMessage',
    '4_24': 'syncClearHistoryMessage',
    '31_23': 'v2GetTeamMessageList',
    '32_14': 'v2GetSuperTeamMessageList',
  },
  Yn = {
    conversationType: { id: 0, retType: 'number' },
    receiverId: 1,
    deleteRoam: { id: 2, converter: yt },
    teamId: 3,
    onlineSync: { id: 4, converter: yt },
    deleteTime: { id: 6, retType: 'number' },
    serverExtension: 7,
  },
  Kn = [
    { type: 'Long', name: 'beginTime' },
    { type: 'Long', name: 'endTime' },
    { type: 'Long', name: 'lastMsgId' },
    { type: 'Int', name: 'limit' },
    { type: 'Bool', name: 'direction' },
    { type: 'LongArray', name: 'msgTypes' },
  ],
  Wn = {
    v2GetMessageList: {
      sid: 30,
      cid: 6,
      service: qn,
      params: [{ type: 'String', name: 'to' }, ...Kn],
      response: [
        { type: 'PropertyArray', name: 'msgs', reflectMapper: ft(Zr) },
      ],
    },
    v2GetMessageListByRefers: {
      sid: 33,
      cid: 2,
      service: qn,
      params: [
        {
          type: 'PropertyArray',
          name: 'tag',
          reflectMapper: Zr,
          select: [
            'conversationType',
            'senderId',
            'receiverId',
            'createTime',
            'messageServerId',
          ],
        },
      ],
      response: [
        { type: 'PropertyArray', name: 'msgs', reflectMapper: ft(Zr) },
      ],
    },
    v2ClearRoamingMessage: {
      sid: 30,
      cid: 9,
      service: qn,
      params: [{ type: 'StrArray', name: 'conversationIds' }],
    },
    v2ClearHistoryMessage: {
      sid: 30,
      cid: 18,
      service: qn,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Yn }],
      response: [{ type: 'Long', name: 'timetag' }],
    },
    v2GetTeamMessageList: {
      sid: 31,
      cid: 23,
      service: qn,
      params: [{ type: 'Long', name: 'to' }, ...Kn],
      response: [
        { type: 'PropertyArray', name: 'msgs', reflectMapper: ft(Zr) },
      ],
    },
    v2GetSuperTeamMessageList: {
      sid: 32,
      cid: 14,
      service: qn,
      params: [{ type: 'Long', name: 'to' }, ...Kn],
      response: [
        { type: 'PropertyArray', name: 'msgs', reflectMapper: ft(Zr) },
      ],
    },
    onClearHistoryMessage: {
      sid: 7,
      cid: 118,
      service: qn,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Yn) }],
    },
    syncClearHistoryMessage: {
      sid: 4,
      cid: 24,
      service: qn,
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(Yn) },
      ],
    },
  },
  Jn = 'V2NIMMessageExtendUtil',
  zn = {
    '29_5': 'v2VoiceToText',
    '33_15': 'v2PinMessage',
    '33_16': 'v2UpdatePinMessage',
    '33_17': 'v2UnpinMessage',
    '23_18': 'onPinMessage',
    '23_19': 'onUpdatePinMessage',
    '23_20': 'onUnpinMessage',
    '23_115': 'onPinMessage',
    '23_116': 'onUpdatePinMessage',
    '23_117': 'onUnpinMessage',
    '33_21': 'v2GetPinMessageList',
    '33_3': 'v2AddQuickComment',
    '33_4': 'v2RemoveQuickComment',
    '33_7': 'v2GetQuickComment',
    '23_5': 'onAddQuickComment',
    '23_6': 'onRemoveQuickComment',
    '23_103': 'onAddQuickComment',
    '23_104': 'onRemoveQuickComment',
    '33_8': 'v2AddCollection',
    '33_9': 'v2RemoveCollections',
    '33_10': 'v2UpdateCollectionExtension',
    '33_11': 'v2GetCollectionListByOption',
    '30_26': 'v2SearchCloudMessagesGroupByConversation',
    '30_27': 'v2SearchCloudMessages',
    '30_34': 'v2SearchCloudMessagesEx',
    '33_1': 'v2GetThreadMessageList',
  },
  Xn = {
    conversationType: {
      id: 1,
      converter: os,
      retConverter: as,
      access: 'messageRefer.conversationType',
    },
    senderId: { id: 2, access: 'messageRefer.senderId' },
    receiverId: { id: 3, access: 'messageRefer.receiverId' },
    createTime: { id: 4, retType: 'number', access: 'messageRefer.createTime' },
    messageServerId: { id: 5, access: 'messageRefer.messageServerId' },
    messageClientId: { id: 6, access: 'messageRefer.messageClientId' },
    detail: 7,
    modify: { id: 8, retType: 'number' },
  },
  Qn = {
    conversationType: {
      id: 1,
      access: 'messageRefer.conversationType',
      retConverter: as,
    },
    senderId: { id: 2, access: 'messageRefer.senderId' },
    receiverId: { id: 3, access: 'messageRefer.receiverId' },
    time: {
      id: 4,
      access: 'messageRefer.createTime',
      converter: yt,
      retType: 'number',
    },
    messageServerId: { id: 5, access: 'messageRefer.messageServerId' },
    messageClientId: { id: 6, access: 'messageRefer.messageClientId' },
    operatorId: 7,
    serverExtension: 8,
    createTime: { id: 9, converter: yt, retType: 'number' },
    updateTime: { id: 10, converter: yt, retType: 'number' },
  },
  Zn = {
    operatorId: 1,
    index: { id: 2, retType: 'number' },
    createTime: { id: 3, retType: 'number' },
    serverExtension: 4,
    pushEnabled: { id: 5, access: 'pushConfig.pushEnabled', converter: yt },
    needBadge: { id: 6, access: 'pushConfig.needBadge', converter: yt },
    title: { id: 7, access: 'pushConfig.title' },
    pushContent: { id: 8, access: 'pushConfig.pushContent' },
    pushPayload: { id: 9, access: 'pushConfig.pushPayload' },
  },
  eo = {
    accid: 1,
    serverExtension: 2,
    createTime: { id: 3, retType: 'number' },
    updateTime: { id: 4, retType: 'number' },
  },
  to = {
    collectionId: 1,
    collectionType: { id: 2, retType: 'number' },
    collectionData: 3,
    serverExtension: 4,
    uniqueId: 5,
    createTime: { id: 6, retType: 'number' },
    updateTime: { id: 7, retType: 'number' },
  },
  io = {
    keyword: 1,
    beginTime: 2,
    endTime: 3,
    messageLimit: 5,
    sortOrder: { id: 6, converter: (e) => (0 === e ? 2 : 1) },
    p2pAccountIds: { id: 7, converter: (e) => e.join(',') },
    teamIds: { id: 8, converter: (e) => e.join(',') },
    senderAccountIds: { id: 9, converter: (e) => e.join(',') },
    messageTypes: { id: 10, converter: (e) => e.join(',') },
    messageSubtypes: { id: 11, converter: (e) => e.join(',') },
  },
  ro = {
    keywordList: { id: 1, converter: (e) => Mt(e) },
    keywordMatchType: 2,
    searchStartTime: 3,
    searchTimePeriod: 4,
    pageToken: 5,
    limit: 7,
    direction: 8,
    conversationId: 9,
    senderAccountIds: { id: 12, converter: (e) => e.join(',') },
    messageTypes: { id: 13, converter: (e) => e.join(',') },
    messageSubtypes: { id: 14, converter: (e) => e.join(',') },
  },
  so = Object.assign(Object.assign({}, io), { conversationLimit: 4 }),
  no = {
    v2PinMessage: {
      sid: 33,
      cid: 15,
      service: Jn,
      params: [
        {
          type: 'Property',
          name: 'msg',
          reflectMapper: Zr,
          select: [
            'conversationType',
            'receiverId',
            'senderId',
            'createTime',
            'messageClientId',
            'messageServerId',
          ],
        },
        { type: 'Property', name: 'msgPin', reflectMapper: eo },
      ],
      response: [{ type: 'Long', name: 'timetag' }],
    },
    v2UnpinMessage: {
      sid: 33,
      cid: 17,
      service: Jn,
      params: [
        {
          type: 'Property',
          name: 'msg',
          reflectMapper: Zr,
          select: [
            'conversationType',
            'receiverId',
            'senderId',
            'createTime',
            'messageClientId',
            'messageServerId',
          ],
        },
        { type: 'Property', name: 'msgPin', reflectMapper: eo },
      ],
      response: [{ type: 'Long', name: 'timetag' }],
    },
    v2UpdatePinMessage: {
      sid: 33,
      cid: 16,
      service: Jn,
      params: [
        {
          type: 'Property',
          name: 'msg',
          reflectMapper: Zr,
          select: [
            'conversationType',
            'receiverId',
            'senderId',
            'createTime',
            'messageClientId',
            'messageServerId',
          ],
        },
        { type: 'Property', name: 'msgPin', reflectMapper: eo },
      ],
      response: [{ type: 'Long', name: 'timetag' }],
    },
    v2GetPinMessageList: {
      sid: 33,
      cid: 21,
      service: Jn,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { conversationId: 1, timetag: 2 },
        },
      ],
      response: [
        { type: 'Long', name: 'timetag' },
        { type: 'Bool', name: 'changed' },
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(Qn) },
      ],
    },
    v2VoiceToText: {
      sid: 29,
      cid: 5,
      service: Jn,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: {
            mimeType: 0,
            sampleRate: 1,
            voiceUrl: 2,
            duration: 3,
          },
        },
      ],
      response: [{ type: 'String', name: 'data' }],
    },
    v2AddQuickComment: {
      sid: 33,
      cid: 3,
      service: Jn,
      params: [
        {
          type: 'Property',
          name: 'message',
          reflectMapper: Zr,
          select: [
            'conversationType',
            'senderId',
            'receiverId',
            'createTime',
            'messageClientId',
            'messageServerId',
          ],
        },
        { type: 'Property', name: 'quickComment', reflectMapper: Zn },
      ],
      response: [{ type: 'Long', name: 'timetag' }],
    },
    v2RemoveQuickComment: {
      sid: 33,
      cid: 4,
      service: Jn,
      params: [
        {
          type: 'Property',
          name: 'message',
          reflectMapper: Zr,
          select: [
            'conversationType',
            'senderId',
            'receiverId',
            'createTime',
            'messageClientId',
            'messageServerId',
          ],
        },
        { type: 'Property', name: 'quickComment', reflectMapper: Zn },
      ],
      response: [{ type: 'Long', name: 'timetag' }],
    },
    onAddQuickComment: {
      sid: 23,
      cid: 5,
      service: Jn,
      response: [
        { type: 'Property', name: 'message', reflectMapper: ft(Zr) },
        { type: 'Property', name: 'quickComment', reflectMapper: ft(Zn) },
      ],
    },
    onRemoveQuickComment: {
      sid: 23,
      cid: 6,
      service: Jn,
      response: [
        { type: 'Property', name: 'message', reflectMapper: ft(Zr) },
        { type: 'Property', name: 'quickComment', reflectMapper: ft(Zn) },
      ],
    },
    v2GetQuickComment: {
      sid: 33,
      cid: 7,
      service: Jn,
      params: [{ type: 'PropertyArray', name: 'tag', reflectMapper: Xn }],
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(Xn) },
      ],
    },
    onPinMessage: {
      sid: 23,
      cid: 18,
      service: Jn,
      response: [
        { type: 'Property', name: 'msg', reflectMapper: ft(Zr) },
        { type: 'Property', name: 'pinInfo', reflectMapper: ft(eo) },
      ],
    },
    onUpdatePinMessage: {
      sid: 23,
      cid: 19,
      service: Jn,
      response: [
        { type: 'Property', name: 'msg', reflectMapper: ft(Zr) },
        { type: 'Property', name: 'pinInfo', reflectMapper: ft(eo) },
      ],
    },
    onUnpinMessage: {
      sid: 23,
      cid: 20,
      service: Jn,
      response: [
        { type: 'Property', name: 'msg', reflectMapper: ft(Zr) },
        { type: 'Property', name: 'pinInfo', reflectMapper: ft(eo) },
      ],
    },
    v2AddCollection: {
      sid: 33,
      cid: 8,
      service: Jn,
      params: [{ type: 'Property', name: 'tag', reflectMapper: to }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(to) }],
    },
    v2RemoveCollections: {
      sid: 33,
      cid: 9,
      service: Jn,
      params: [
        {
          type: 'PropertyArray',
          name: 'tag',
          reflectMapper: to,
          select: ['collectionId', 'createTime'],
        },
      ],
      response: [{ type: 'Int', name: 'data' }],
    },
    v2UpdateCollectionExtension: {
      sid: 33,
      cid: 10,
      service: Jn,
      params: [{ type: 'Property', name: 'tag', reflectMapper: to }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(to) }],
    },
    v2GetCollectionListByOption: {
      sid: 33,
      cid: 11,
      service: Jn,
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: {
            beginTime: 1,
            endTime: 2,
            excludeId: 3,
            limit: 4,
            direction: 5,
            collectionType: 6,
          },
        },
      ],
      response: [
        { type: 'Long', name: 'total' },
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(to) },
      ],
    },
    v2SearchCloudMessagesGroupByConversation: {
      sid: 30,
      cid: 26,
      service: Jn,
      params: [{ type: 'Property', name: 'tag', reflectMapper: so }],
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(Zr) },
      ],
    },
    v2SearchCloudMessages: {
      sid: 30,
      cid: 27,
      service: Jn,
      params: [{ type: 'Property', name: 'tag', reflectMapper: io }],
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(Zr) },
      ],
    },
    v2SearchCloudMessagesEx: {
      sid: 30,
      cid: 34,
      service: Jn,
      params: [{ type: 'Property', name: 'tag', reflectMapper: ro }],
      response: [
        { type: 'PropertyArray', name: 'msgs', reflectMapper: ft(Zr) },
        { type: 'Int', name: 'hasMore' },
        { type: 'String', name: 'nextPageToken' },
      ],
    },
    v2GetThreadMessageList: {
      sid: 33,
      cid: 1,
      service: Jn,
      params: [
        { type: 'Property', name: 'messageRefer', reflectMapper: Zr },
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: {
            beginTime: 1,
            endTime: 2,
            excludeMessageServerId: 3,
            limit: 4,
            reverse: 5,
          },
        },
      ],
      response: [
        { type: 'Property', name: 'message', reflectMapper: ft(Zr) },
        {
          type: 'Property',
          name: 'replyResult',
          reflectMapper: ft({
            total: { id: 1, retType: 'number' },
            timestamp: { id: 2, retType: 'number' },
          }),
        },
        { type: 'PropertyArray', name: 'replyList', reflectMapper: ft(Zr) },
      ],
    },
  },
  oo = {
    joinMode: { type: 'enum', values: [1, 0, 2], required: !1 },
    agreeMode: { type: 'enum', values: [0, 1], required: !1 },
    inviteMode: { type: 'enum', values: [1, 0], required: !1 },
    updateInfoMode: { type: 'enum', values: [1, 0], required: !1 },
    updateExtensionMode: { type: 'enum', values: [1, 0], required: !1 },
    chatBannedMode: { type: 'enum', values: [0, 1], required: !1 },
  },
  ao = {
    type: 'object',
    required: !0,
    rules: Object.assign(
      {
        name: { type: 'string', allowEmpty: !1 },
        teamType: { type: 'enum', values: [1, 2] },
        memberLimit: { type: 'number', min: 1, required: !1 },
      },
      oo
    ),
  },
  co = { type: 'array', min: 1, itemType: 'string' },
  lo = { type: 'boolean' },
  po = { type: 'string' },
  ho = { type: 'string', allowEmpty: !1 },
  uo = {
    type: 'object',
    rules: { antispamBusinessId: { type: 'string', required: !1 } },
    required: !1,
  },
  mo = { teamId: { type: 'string', regExp: /^[1-9]\d*$/, allowEmpty: !1 } },
  go = {
    teamIds: {
      type: 'array',
      itemRules: { type: 'string', allowEmpty: !1, regExp: /^[1-9]\d*$/ },
      min: 1,
    },
  },
  vo = { teamType: { type: 'enum', values: [1, 2] } },
  fo = {
    teamTypes: {
      type: 'array',
      itemType: 'enum',
      values: [1, 2],
      required: !1,
    },
  },
  yo = {
    inviteeParams: {
      type: 'object',
      required: !0,
      rules: {
        inviteeAccountIds: co,
        postscript: Object.assign(Object.assign({}, po), { required: !1 }),
        serverExtension: Object.assign(Object.assign({}, po), { required: !1 }),
      },
    },
  },
  Io = {
    updateTeamInfoParams: {
      type: 'object',
      required: !0,
      rules: Object.assign(
        {
          name: { type: 'string', allowEmpty: !1, required: !1 },
          memberLimit: { type: 'number', min: 1, required: !1 },
        },
        oo
      ),
    },
  },
  Mo = { type: 'enum', values: [0, 2] },
  _o = {
    memberInfoParams: {
      type: 'object',
      rules: {
        teamNick: { type: 'string', required: !1 },
        serverExtension: { type: 'string', required: !1 },
        antispamConfig: {
          type: 'object',
          required: !1,
          rules: { antispamBusinessId: { type: 'string', required: !1 } },
        },
      },
    },
  },
  Eo = { chatBannedMode: { type: 'enum', values: [0, 1] } },
  To = {
    queryOption: {
      type: 'object',
      rules: {
        roleQueryType: { type: 'enum', values: [0, 2, 1] },
        onlyChatBanned: { type: 'boolean', required: !1 },
        direction: { type: 'enum', values: [1, 0], required: !1 },
        limit: { type: 'number', min: 1, required: !1 },
        nextToken: { type: 'string', required: !1 },
      },
    },
  },
  So = {
    teamId: mo.teamId,
    teamType: { type: 'enum', values: [1, 2] },
    operatorAccountId: { type: 'string', allowEmpty: !1 },
  },
  Co = { actionType: { type: 'enum', values: [2, 0, 1, 3] } },
  No = { actionType: { type: 'enum', values: [2] } },
  Ao = { actionType: { type: 'enum', values: [0] } },
  Ro = {
    types: {
      type: 'array',
      itemType: 'enum',
      values: [0, 2, 1, 3],
      required: !1,
    },
    status: {
      type: 'array',
      itemType: 'enum',
      values: [1, 3, 0, 2],
      required: !1,
    },
    offset: { type: 'number', min: 0, required: !1 },
    limit: { type: 'number', min: 1, required: !1 },
  },
  Oo = { teamId: mo.teamId, teamType: vo.teamType, accountIds: co },
  bo = {
    accountId: { type: 'string', allowEmpty: !1 },
    teamNick: { type: 'string' },
    antispamConfig: {
      type: 'object',
      required: !1,
      rules: { antispamBusinessId: { type: 'string', required: !1 } },
    },
  }
class ko {
  constructor() {
    ;(this.teamMap = new Map()), (this.superTeamMap = new Map())
  }
  set(e) {
    e.forEach((e) => {
      this.chooseMap(e.teamType).set(e.teamId, e)
    })
  }
  reset() {
    this.teamMap.clear(), this.superTeamMap.clear()
  }
  count(e, t = !0) {
    var i = this.chooseMap(e),
      r = 0
    return (
      i.forEach((e) => {
        t && e.isValidTeam && r++, t || r++
      }),
      r
    )
  }
  chooseMap(e) {
    return 2 === e ? this.superTeamMap : 1 === e ? this.teamMap : new Map()
  }
  getById(e, t, i = !0) {
    var r = this.chooseMap(t).get(e)
    if (r) {
      if (i && r.isValidTeam) return r
      if (!i) return r
    }
  }
  getAll(e, t = !0) {
    var i = this.chooseMap(e)
    return Array.from(i.values())
      .filter((e) => !(!t || !e.isValidTeam) || !t || void 0)
      .sort((e, t) => t.updateTime - e.updateTime)
  }
  upsert(e) {
    var t = e.teamId,
      i = e.teamType,
      r = this.chooseMap(i),
      s = r.get(t) || {},
      n = Object.assign({}, s, e)
    return r.set(t, n), n
  }
  deleteById(e, t) {
    var i = this.getById(e, t)
    if (i) return (i.isValidTeam = !1), i
  }
  searchTeamByKeyword(e) {
    var t = []
    return (
      this.teamMap.forEach((i) => {
        i.name.includes(e) && t.push(i)
      }),
      this.superTeamMap.forEach((i) => {
        i.name.includes(e) && t.push(i)
      }),
      t
    )
  }
}
class Vo {
  constructor() {
    ;(this.teamMembers = []), (this.superTeamMembers = []), (this.maxSize = 2e3)
  }
  reset() {
    ;(this.teamMembers = []), (this.superTeamMembers = [])
  }
  setData(e) {
    e.forEach((e) => {
      this.chooseList(e.teamType).push(e)
    })
  }
  chooseList(e) {
    return 2 === e ? this.superTeamMembers : 1 === e ? this.teamMembers : []
  }
  getById(e, t, i) {
    return this.chooseList(t).find((t) => t.teamId === e && t.accountId === i)
  }
  upsert(e) {
    var t = e.teamType,
      i = e.teamId,
      r = this.chooseList(t),
      s = r.findIndex((t) => t.teamId === i && t.accountId === e.accountId)
    ;-1 === s ? r.push(e) : (r[s] = Object.assign(Object.assign({}, r[s]), e)),
      r.length > this.maxSize && r.shift()
  }
  deleteByAccount(e, t, i) {
    var r = this.chooseList(t),
      s = r.findIndex((t) => t.teamId === e && t.accountId === i)
    if (-1 !== s) {
      var n = r[s]
      return (n.inTeam = !1), r.splice(s, 1), n
    }
  }
  deleteByTeamId(e, t) {
    var i = this.chooseList(t).filter((t) => t.teamId !== e)
    2 === t ? (this.superTeamMembers = i) : (this.teamMembers = i)
  }
}
class Po {
  constructor(e, t) {
    ;(this.core = e), (this.service = t)
  }
  processNotification(e) {
    var { attachment: t, senderId: i, receiverId: r, createTime: s } = e,
      { id: n, data: o } = t,
      a = n > 400 ? 2 : 1,
      { id: c, ids: d, tinfo: l, mute: p } = Ur(o, a),
      h = this.service.model.getById(r, a)
    switch (
      (this.core.logger.log(
        `v2Team::processNotification, notificationType:${n}, teamId:${r}`,
        o
      ),
      n)
    ) {
      case Fn.SUPER_TEAM_INVITATION:
      case Fn.TEAM_INVITATION:
        d.includes(this.core.account) && this.onTeamJoined(l),
          this.onTeamMembersJoined(
            l,
            d.filter((e) => e !== this.core.account)
          )
        break
      case Fn.SUPER_TEAM_INVITE_ACCEPT:
      case Fn.TEAM_INVITE_ACCEPT:
        i === this.core.account
          ? this.onTeamJoined(l)
          : this.onTeamMemberJoined(l, i)
        break
      case Fn.SUPER_TEAM_APPLY_ACCEPT:
      case Fn.TEAM_APPLY_ACCEPT:
        c === this.core.account
          ? this.onTeamJoined(l)
          : this.onTeamMemberJoined(l, c)
        break
      case Fn.SUPER_TEAM_ADD_MANAGER:
      case Fn.TEAM_ADD_MANAGER:
        this.updateTeamMemberRole(r, a, d, { memberRole: 2, updateTime: s })
        break
      case Fn.SUPER_TEAM_REMOVE_MANAGER:
      case Fn.TEAM_REMOVE_MANAGER:
        this.updateTeamMemberRole(r, a, d, { memberRole: 0, updateTime: s })
        break
      case Fn.SUPER_TEAM_KICK:
      case Fn.TEAM_KICK:
        this.onTeamInfoUpdated(l),
          d.forEach((e) => {
            e === this.core.account
              ? this.onTeamLeft(r, a, !0)
              : this.onTeamMemberKicked(i, l.teamId, l.teamType, e)
          })
        break
      case Fn.SUPER_TEAM_LEAVE:
      case Fn.TEAM_LEAVE:
        l
          ? this.onTeamInfoUpdated(l)
          : h &&
            i === this.core.account &&
            ((h.isValidTeam = !1), this.onTeamInfoUpdated(h)),
          i === this.core.account
            ? this.onTeamLeft(r, a, !1)
            : this.onTeamMemberLeft(r, a, i)
        break
      case Fn.SUPER_TEAM_DISMISS:
      case Fn.TEAM_DISMISS:
        this.onTeamDismissed(r, a)
        break
      case Fn.SUPER_TEAM_UPDATE:
      case Fn.TEAM_UPDATED:
        this.onTeamInfoUpdated(l)
        break
      case Fn.SUPER_TEAM_TRANSFER_OWNER:
      case Fn.TEAM_TRANSFER_OWNER:
        this.onTeamInfoUpdated(l),
          this.updateTeamMemberRole(
            r,
            a,
            [i, l.ownerAccountId],
            [
              { memberRole: 0, updateTime: s },
              { memberRole: 1, updateTime: s, joinTime: s },
            ],
            !1
          )
        break
      case Fn.SUPER_TEAM_MEMBER_MUTE:
      case Fn.TEAM_MEMBER_MUTE:
        this.service.model.upsert(l),
          this.updateTeamMemberRole(r, a, c ? [c] : d, {
            chatBanned: 0 !== p,
            updateTime: s,
          })
    }
  }
  onTeamJoined(e) {
    this.service.model.upsert(e),
      this.service.emit('onTeamJoined', e),
      this.service
        .getTeamMemberListByIds(e.teamId, e.teamType, [this.core.account])
        .catch((e) => {
          this.core.logger.error('Get Member error after onTeamJoined', e)
        })
  }
  onTeamLeft(e, t, i) {
    var r = this.service.model.deleteById(e, t) || xr(e, t, { isValidTeam: !1 })
    this.service.memberModel.deleteByAccount(e, t, this.core.account),
      this.service.emit('onTeamLeft', r, i)
  }
  onTeamDismissed(e, t) {
    var i = this.service.model.deleteById(e, t)
    i || (i = xr(e, t, { isValidTeam: !1 })),
      this.service.memberModel.deleteByTeamId(e, t),
      this.service.emit('onTeamDismissed', i)
  }
  onTeamInfoUpdated(e) {
    var t = this.service.model.upsert(e)
    this.service.emit('onTeamInfoUpdated', t)
  }
  onTeamMemberJoined(e, t) {
    this.service.model.upsert(e), this.service.emit('onTeamInfoUpdated', e)
    var i = e.updateTime || e.createTime,
      r = Fr(e.teamId, e.teamType, t, { joinTime: i, updateTime: i })
    this.service.emit('onTeamMemberJoined', [r])
  }
  onTeamMembersJoined(e, t) {
    var i = e.updateTime || e.createTime,
      r = t.map((t) =>
        Fr(e.teamId, e.teamType, t, { joinTime: i, updateTime: i })
      )
    0 !== r.length &&
      (this.service.model.upsert(e),
      this.service.emit('onTeamInfoUpdated', e),
      this.service.emit('onTeamMemberJoined', r))
  }
  onTeamMemberLeft(e, t, i) {
    var r = this.service.memberModel.deleteByAccount(e, t, i)
    r || (r = Fr(e, t, i, { inTeam: !1 })),
      this.service.emit('onTeamMemberLeft', [r])
  }
  onTeamMemberKicked(e, t, i, r) {
    var s = this.service.memberModel.deleteByAccount(t, i, r)
    s || (s = Fr(t, i, r, { inTeam: !1 })),
      this.service.emit('onTeamMemberKicked', e, [s])
  }
  onTeamMemberInfoUpdated(e) {
    e.forEach((e) => {
      if (
        e.accountId === this.core.account &&
        this.core.V2NIMSettingService.name &&
        this.core.V2NIMConversationIdUtil.name
      ) {
        var t =
            1 === e.teamType
              ? this.core.V2NIMConversationIdUtil.teamConversationId(e.teamId)
              : this.core.V2NIMConversationIdUtil.superTeamConversationId(
                  e.teamId
                ),
          i = this.core.V2NIMSettingService.getConversationMuteStatus(t)
        this.core.eventBus.emit('V2NIMSettingService/setMute', t, i)
      }
    }),
      this.service.emit('onTeamMemberInfoUpdated', e)
  }
  updateTeamMemberRole(e, t, i, r, s = !0) {
    return Te(this, void 0, void 0, function* () {
      var n = i.filter((i, s) => {
        var n = this.service.memberModel.getById(e, t, i)
        return (
          n &&
            this.service.memberModel.upsert(
              Object.assign(Object.assign({}, n), Array.isArray(r) ? r[s] : r)
            ),
          !n
        )
      })
      if (s && n.length > 0)
        try {
          ;(yield this.service.getTeamMemberListByIds(e, t, n)).forEach((e) =>
            this.service.memberModel.upsert(e)
          )
        } catch (e) {
          this.core.logger.warn(
            'v2Team::processNotification, getTeamMemberListByIds failed',
            e
          )
        }
      var o = i
        .map((i, n) => {
          var o = this.service.memberModel.getById(e, t, i)
          return o || s ? o : Fr(e, t, i, Array.isArray(r) ? r[n] : r)
        })
        .filter((e) => !!e)
      o.length > 0 && this.onTeamMemberInfoUpdated(o)
    })
  }
  processSysNotification(e) {
    var {
        receiverId: t,
        postscript: i,
        senderId: r,
        timestamp: s,
        content: n,
      } = e,
      o = {}
    try {
      o = JSON.parse(n)
    } catch (e) {
      this.core.logger.warn(
        'v2Team::processSysNotification, parse content failed',
        n
      )
    }
    var a = {
      actionType: { 0: 0, 1: 1, 2: 2, 3: 3, 15: 0, 16: 1, 17: 2, 18: 3 }[
        e.type
      ],
      teamId: t,
      teamType: e.type >= 15 ? 2 : 1,
      operatorAccountId: r,
      postscript: i,
      timestamp: s,
      actionStatus: 0,
      read: !1,
    }
    o.attach && (a.serverExtension = o.attach),
      this.core.logger.log('v2Team::processSysNotification, type:', e.type, a),
      this.service.notificationModel.create(a),
      this.service.emit('onReceiveTeamJoinActionInfo', a)
  }
  updateTeamActionStatus(e, t) {
    this.service.notificationModel.update({
      teamId: e.teamId,
      teamType: e.teamType,
      operatorAccountId: e.operatorAccountId,
      actionType: e.actionType,
      actionStatus: t,
    })
  }
  checkIfExpired(e) {
    return !(!e || (509 !== e && ((e >= 500 && e <= 599) || e >= 19e4)))
  }
}
!(function (e) {
  ;(e[(e.TEAM_INVITATION = 0)] = 'TEAM_INVITATION'),
    (e[(e.TEAM_KICK = 1)] = 'TEAM_KICK'),
    (e[(e.TEAM_LEAVE = 2)] = 'TEAM_LEAVE'),
    (e[(e.TEAM_UPDATED = 3)] = 'TEAM_UPDATED'),
    (e[(e.TEAM_DISMISS = 4)] = 'TEAM_DISMISS'),
    (e[(e.TEAM_APPLY_ACCEPT = 5)] = 'TEAM_APPLY_ACCEPT'),
    (e[(e.TEAM_TRANSFER_OWNER = 6)] = 'TEAM_TRANSFER_OWNER'),
    (e[(e.TEAM_ADD_MANAGER = 7)] = 'TEAM_ADD_MANAGER'),
    (e[(e.TEAM_REMOVE_MANAGER = 8)] = 'TEAM_REMOVE_MANAGER'),
    (e[(e.TEAM_INVITE_ACCEPT = 9)] = 'TEAM_INVITE_ACCEPT'),
    (e[(e.TEAM_MEMBER_MUTE = 10)] = 'TEAM_MEMBER_MUTE'),
    (e[(e.SUPER_TEAM_INVITATION = 401)] = 'SUPER_TEAM_INVITATION'),
    (e[(e.SUPER_TEAM_KICK = 402)] = 'SUPER_TEAM_KICK'),
    (e[(e.SUPER_TEAM_LEAVE = 403)] = 'SUPER_TEAM_LEAVE'),
    (e[(e.SUPER_TEAM_UPDATE = 404)] = 'SUPER_TEAM_UPDATE'),
    (e[(e.SUPER_TEAM_DISMISS = 405)] = 'SUPER_TEAM_DISMISS'),
    (e[(e.SUPER_TEAM_TRANSFER_OWNER = 406)] = 'SUPER_TEAM_TRANSFER_OWNER'),
    (e[(e.SUPER_TEAM_ADD_MANAGER = 407)] = 'SUPER_TEAM_ADD_MANAGER'),
    (e[(e.SUPER_TEAM_REMOVE_MANAGER = 408)] = 'SUPER_TEAM_REMOVE_MANAGER'),
    (e[(e.SUPER_TEAM_MEMBER_MUTE = 409)] = 'SUPER_TEAM_MEMBER_MUTE'),
    (e[(e.SUPER_TEAM_APPLY_ACCEPT = 410)] = 'SUPER_TEAM_APPLY_ACCEPT'),
    (e[(e.SUPER_TEAM_INVITE_ACCEPT = 411)] = 'SUPER_TEAM_INVITE_ACCEPT')
})(Fn || (Fn = {}))
class Lo {
  constructor() {
    ;(this.list = []), (this.maxCount = 1e3)
  }
  reset() {
    this.list = []
  }
  checkSameAction(e, t, i = !1) {
    return (
      e.teamId === t.teamId &&
      e.teamType === t.teamType &&
      e.actionType === t.actionType &&
      e.operatorAccountId === t.operatorAccountId &&
      (!i || e.timestamp === t.timestamp)
    )
  }
  create(e) {
    this.list.push(e), this.list.length > this.maxCount && this.list.shift()
  }
  update(e) {
    this.list.forEach((t) => {
      this.checkSameAction(t, e) && 0 === t.actionStatus && Object.assign(t, e)
    })
  }
  delete(e) {
    this.list = this.list
      .map((t) => {
        if (!this.checkSameAction(t, e, !1)) return t
      })
      .filter((e) => e)
  }
  getByOption(e) {
    var { types: t, status: i, offset: r = 0, limit: s = 50 } = e,
      n = []
    this.list.forEach((e) => {
      ;(t && t.length > 0 && !t.includes(e.actionType)) ||
        (i && i.length > 0 && !i.includes(e.actionStatus)) ||
        n.push(e)
    }),
      (n = n.sort((e, t) => t.timestamp - e.timestamp))
    var o = 0
    r > 0 &&
      ((o = Be(n, 'timestamp', r)), n[o] && n[o].timestamp === r && (o += 1))
    var a = n.slice(o).length
    return (n = n.slice(o, o + s)).length > 0
      ? {
          offset: a > s ? n[n.length - 1].timestamp : 0,
          finished: !(a > s),
          infos: n,
        }
      : { offset: 0, finished: !0, infos: n }
  }
  setRead(e) {
    for (var t of this.list) this.checkSameAction(t, e) && (t.read = !0)
  }
  setAllRead() {
    for (var e of this.list) e.read = !0
  }
  getUnreadCount() {
    var e = new Set()
    for (var t of this.list)
      t.read ||
        0 !== t.actionStatus ||
        (0 !== t.actionType && 2 !== t.actionType) ||
        e.add(`${t.operatorAccountId}_${t.teamType}_${t.teamId}`)
    return e.size
  }
}
class Do {
  constructor(e, t) {
    ;(this.core = e),
      (this.service = t),
      (this.model = t.model),
      (this.memberModel = t.memberModel),
      (this.notification = t.notification),
      (this.logger = this.core.logger)
  }
  setListener() {
    this.core.eventBus.on('V2NIMTeamService/onSyncStarted', () => {
      this.service.emit('onSyncStarted')
    }),
      this.core.eventBus.on('V2NIMTeamService/onSyncFinished', () => {
        this.service.emit('onSyncFinished')
      }),
      this.core.eventBus.on('V2NIMTeamService/onSyncFailed', (e) => {
        this.service.emit('onSyncFailed', e)
      }),
      this.core.eventBus.on('forwardReceive/V2NIMTeamService/created', (e) => {
        this.model.upsert(e)
        var t = Fr(e.teamId, e.teamType, this.core.account, { memberRole: 1 })
        this.memberModel.upsert(t), this.service.emit('onTeamCreated', e)
      }),
      this.core.eventBus.on(
        'forwardReceive/V2NIMTeamService/updateSelfTeamMemberInfo',
        (e) => {
          this.memberModel.upsert(e),
            this.service.emit('onTeamInfoUpdated', [e])
        }
      ),
      this.core.eventBus.on(
        'forwardReceive/V2NIMTeamService/updateTeamActionStatus',
        this.notification.updateTeamActionStatus.bind(this.notification)
      ),
      this.core.eventBus.on(
        'V2NIMTeamService/sysNotification',
        this.notification.processSysNotification.bind(this.notification)
      ),
      this.core.eventBus.on(
        'V2NIMTeamService/notification',
        this.notification.processNotification.bind(this.notification)
      )
  }
  beforeEmit(e, ...t) {
    var i = `${this.service.name}::emit ${e.toString()}`
    if (
      'onTeamCreated' === e ||
      'onTeamDismissed' === e ||
      'onTeamJoined' === e ||
      'onTeamLeft' === e ||
      'onTeamInfoUpdated' === e
    ) {
      var r = t[0]
      this.logger.log(
        `${i}`,
        `team:${r.teamId}_${r.teamType};updateTime:${r.updateTime}`
      )
    } else if (
      'onTeamMemberJoined' === e ||
      'onTeamMemberLeft' === e ||
      'onTeamMemberInfoUpdated' === e
    ) {
      var s = t[0]
      this.logger.log(
        `${i}`,
        s.map((e) => `team:${e.teamId}_${e.teamType};account:${e.accountId}`)
      )
    } else if ('onTeamMemberKicked' === e) {
      var n = t[0],
        o = t[1]
      this.logger.log(
        `${i}`,
        `operator${n}`,
        o.map((e) => `team:${e.teamId}_${e.teamType};account:${e.accountId}`)
      )
    } else this.logger.log(`${i}`, ...t)
  }
  onSyncDone(e) {
    e
      ? this.service.emit('onSyncFailed', e)
      : this.service.emit('onSyncFinished')
  }
}
class wo {
  constructor(e, t) {
    ;(this.core = e),
      (this.service = t),
      (this.model = t.model),
      (this.memberModel = t.memberModel),
      (this.logger = this.core.logger)
  }
  v2TeamSyncHandler(e) {
    this.model.set(e.content.datas)
  }
  v2SuperTeamSyncHandler(e) {
    this.model.set(e.content.datas)
  }
  v2TeamCreateMultiSyncHandler(e) {
    var t = e.content.data
    this.model.upsert(t)
    var i = Fr(t.teamId, t.teamType, this.core.account, { memberRole: 1 })
    this.memberModel.upsert(i), this.service.emit('onTeamCreated', t)
  }
  v2SuperTeamCreateMultiSyncHandler(e) {
    var t = e.content.data
    this.model.upsert(t)
    var i = Fr(t.teamId, t.teamType, this.core.account, { memberRole: 1 })
    this.memberModel.upsert(i), this.service.emit('onTeamCreated', t)
  }
  v2TeamMemberUpdateMultiSyncHandler(e) {
    var t = e.content.data
    t.teamType = 1
    var i = this.memberModel.getById(t.teamId, t.teamType, t.accountId)
    this.service.notification.updateTeamMemberRole(
      t.teamId,
      t.teamType,
      [t.accountId],
      t
    ),
      t.accountId === this.core.account &&
        i &&
        i.bits !== t.bits &&
        this.core.eventBus.emit(
          'V2NIMSettingService/updateBits',
          t.teamId,
          t.teamType,
          t.bits
        )
  }
  v2SuperTeamMemberUpdateMultiSyncHandler(e) {
    var t = e.content.data
    t.teamType = 2
    var i = this.memberModel.getById(t.teamId, t.teamType, t.accountId)
    this.service.notification.updateTeamMemberRole(
      t.teamId,
      t.teamType,
      [t.accountId],
      t
    ),
      t.accountId === this.core.account &&
        i &&
        i.bits !== t.bits &&
        this.core.eventBus.emit(
          'V2NIMSettingService/updateBits',
          t.teamId,
          t.teamType,
          t.bits
        )
  }
  v2TeamMembersOfSelfInSyncHandler(e) {
    e.content.datas.forEach((e) => {
      ;(e.teamType = 1), this.memberModel.upsert(e)
    })
  }
  v2SuperTeamMembersOfSelfInSyncHandler(e) {
    e.content.datas.forEach((e) => {
      ;(e.teamType = 2), this.memberModel.upsert(e)
    })
  }
}
var Uo = 'V2NIMUserService',
  xo = {
    '34_3': 'v2UpdateBlockList',
    '34_7': 'v2GetUserList',
    '34_10': 'v2UpdateSelfUserProfile',
    '3_109': 'v2SyncSelfUserInfo',
    '3_110': 'onUpdateUserProfile',
    '3_103': 'onUpdateBlockList',
    '3_8': 'syncBlockAndMuteList',
    '34_5': 'v2SetP2PMessageMuteMode',
    '3_105': 'v2OnUpdateMuteList',
  },
  Fo = {
    accountId: 1,
    name: 3,
    avatar: 4,
    sign: 5,
    gender: { id: 6, retType: 'number' },
    email: 7,
    birthday: 8,
    mobile: 9,
    serverExtension: 10,
    createTime: { id: 12, retType: 'number' },
    updateTime: { id: 13, retType: 'number' },
  },
  Bo = {
    v2UpdateBlockList: {
      sid: 34,
      cid: 3,
      service: Uo,
      params: [
        { type: 'String', name: 'accountId' },
        { type: 'Bool', name: 'addToBlockList' },
      ],
    },
    v2GetUserList: {
      sid: 34,
      cid: 7,
      service: Uo,
      params: [{ type: 'StrArray', name: 'accountIds' }],
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(Fo) },
      ],
    },
    v2UpdateSelfUserProfile: {
      sid: 34,
      cid: 10,
      service: Uo,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Fo }],
      response: [{ type: 'Long', name: 'updateTime' }],
    },
    onUpdateUserProfile: {
      sid: 3,
      cid: 110,
      service: Uo,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Fo) }],
    },
    onUpdateBlockList: {
      sid: 3,
      cid: 103,
      service: Uo,
      response: [
        { type: 'String', name: 'accountId' },
        { type: 'Bool', name: 'addToBlockList' },
      ],
    },
    syncBlockAndMuteList: {
      sid: 3,
      cid: 8,
      service: Uo,
      response: [
        {
          type: 'PropertyArray',
          name: 'data',
          reflectMapper: ft({
            accountId: 0,
            isMute: { id: 1, retType: 'boolean' },
            isBlock: { id: 2, retType: 'boolean' },
          }),
        },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2SyncSelfUserInfo: {
      sid: 3,
      cid: 109,
      service: Uo,
      response: [{ type: 'Property', name: 'user', reflectMapper: ft(Fo) }],
    },
    v2SetP2PMessageMuteMode: {
      sid: 34,
      cid: 5,
      service: Uo,
      params: [
        { type: 'String', name: 'accountId' },
        { type: 'Bool', name: 'muteMode' },
      ],
    },
    v2OnUpdateMuteList: {
      sid: 3,
      cid: 105,
      service: Uo,
      response: [
        { type: 'String', name: 'accountId' },
        { type: 'Bool', name: 'mute' },
      ],
    },
  }
class $o {
  constructor() {
    ;(this.muteList = new Set()),
      (this.userMap = new Map()),
      (this.blockList = [])
  }
  reset() {
    this.muteList.clear(), this.userMap.clear(), (this.blockList = [])
  }
  setAccountMuteMode(e, t) {
    1 === t ? this.muteList.add(e) : this.muteList.delete(e)
  }
  setUser(e) {
    this.userMap.set(e.accountId, e)
  }
  getUser(e) {
    return this.userMap.get(e)
  }
  getUserListBySearchOption(e) {
    return Array.from(this.userMap.values()).filter(
      (t) =>
        !(
          (void 0 !== e.searchName && !e.searchName) ||
          !t.name.includes(e.keyword)
        ) ||
        !(!e.searchAccountId || !t.accountId.includes(e.keyword)) ||
        !!(t.mobile && e.searchMobile && t.mobile.includes(e.keyword))
    )
  }
  addToBlockList(e) {
    e.forEach((e) => {
      this.blockList.includes(e) || this.blockList.push(e)
    })
  }
  removeFromBlockList(e) {
    e.forEach((e) => {
      var t = this.blockList.indexOf(e)
      ;-1 !== t && this.blockList.splice(t, 1)
    })
  }
  checkBlock(e) {
    var t = {}
    return (
      e.forEach((e) => {
        t[e] = this.blockList.includes(e)
      }),
      t
    )
  }
}
var Go = { type: 'string', required: !0, allowEmpty: !1 },
  jo = { type: 'string', required: !1, allowEmpty: !0 },
  qo = {
    name: { type: 'string', required: !1, allowEmpty: !0 },
    avatar: jo,
    sign: jo,
    email: jo,
    birthday: jo,
    mobile: jo,
    gender: { type: 'number', required: !1 },
    serverExtension: jo,
  }
class Ho extends ni {
  constructor(e) {
    super('V2NIMUserService', e),
      vt({ cmdMap: xo, cmdConfig: Bo }),
      (this.model = new $o()),
      'v2' === this.core.options.apiVersion && this.setListener()
  }
  reset() {
    this.model.reset()
  }
  setListener() {
    this.core.eventBus.on(
      'forwardReceive/V2NIMUserService/updateBlockList',
      (e, t) => {
        t
          ? this.model.addToBlockList([e])
          : this.model.removeFromBlockList([e]),
          t ? this.emitBlockListAdded(e) : this.emit('onBlockListRemoved', e)
      }
    ),
      this.core.eventBus.on(
        'forwardReceive/V2NIMUserService/updateUserProfile',
        (e) => {
          this.updateUserProfileInMemory(e)
        }
      )
  }
  emit(e, ...t) {
    var i = `${this.name}::emit ${e.toString()}`
    if ('onUserProfileChanged' === e) {
      var r = t[0]
      this.logger.log(
        `${i}`,
        r.map(
          (e) => `id:${e.accountId};name:${e.name};updateTime:${e.updateTime}`
        )
      )
    } else if ('onBlockListAdded' === e) {
      var s = t[0]
      this.logger.log(
        `${i}`,
        `id:${s.accountId};name:${s.name};updateTime:${s.updateTime}`
      )
    } else this.logger.log(`${i}`, ...t)
    return super.emit(e, ...t)
  }
  getUserList(e) {
    return Te(this, void 0, void 0, function* () {
      return this.checkV2(), this._getUserList(e)
    })
  }
  _getUserList(e) {
    var t
    return Te(this, void 0, void 0, function* () {
      ye({ accountIds: co }, { accountIds: e }, '', !0)
      var i = []
      e.forEach((e) => {
        this.model.getUser(e) || i.push(e)
      })
      var r = null
      i.length > 0 &&
        (r = yield this.core.sendCmd('v2GetUserList', { accountIds: i })),
        (
          (null === (t = null == r ? void 0 : r.content) || void 0 === t
            ? void 0
            : t.data) || []
        ).forEach((e) => {
          this.model.setUser(e)
        })
      var s = []
      return (
        e.forEach((e) => {
          var t = this.model.getUser(e)
          t && s.push(t)
        }),
        s
      )
    })
  }
  getUserListFromCloud(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkV2(),
        ye(
          {
            accountIds: { type: 'array', min: 1, max: 500, itemType: 'string' },
          },
          { accountIds: e },
          '',
          !0
        )
      var t =
          (yield this.core.sendCmd('v2GetUserList', { accountIds: e })).content
            .data || [],
        i = []
      t.forEach((e) => {
        var t = this.model.getUser(e.accountId)
        this.compareUserForUpdate(t, e) && i.push(e), this.model.setUser(e)
      })
      var r = e.reduce((e, t) => {
        var i = this.model.getUser(t)
        return i && e.push(i), e
      }, [])
      return i.length > 0 && this.emit('onUserProfileChanged', i), r
    })
  }
  compareUserForUpdate(e, t) {
    return (
      !e ||
      !(
        'number' == typeof e.updateTime &&
        'number' == typeof t.updateTime &&
        e.updateTime >= t.updateTime
      )
    )
  }
  updateSelfUserProfile(e) {
    return Te(this, void 0, void 0, function* () {
      this.checkV2(), ye(qo, e, '', !0)
      var t = yield this.core.sendCmd('v2UpdateSelfUserProfile', {
        tag: Object.assign(Object.assign({}, e), {
          accountId: this.core.account,
        }),
      })
      yield this.updateUserProfileInMemory(
        Object.assign(Object.assign({}, e), {
          updateTime: t.content.updateTime,
        })
      )
    })
  }
  addUserToBlockList(e) {
    return Te(this, void 0, void 0, function* () {
      if ((this.checkV2(), e === this.core.account))
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: { reason: 'Cannot block yourself' },
        })
      ye({ accountId: Go }, { accountId: e }, '', !0),
        yield this.core.sendCmd('v2UpdateBlockList', {
          accountId: e,
          addToBlockList: !0,
        }),
        this.model.addToBlockList([e]),
        this.emitBlockListAdded(e)
    })
  }
  removeUserFromBlockList(e) {
    return Te(this, void 0, void 0, function* () {
      if ((this.checkV2(), e === this.core.account))
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: { reason: 'Cannot unblock yourself' },
        })
      ye({ accountId: Go }, { accountId: e }, '', !0),
        yield this.core.sendCmd('v2UpdateBlockList', {
          accountId: e,
          addToBlockList: !1,
        }),
        this.model.removeFromBlockList([e]),
        this.emit('onBlockListRemoved', e)
    })
  }
  searchUserByOption(e) {
    return Te(this, void 0, void 0, function* () {
      if (
        (this.checkV2(),
        this.core.V2NIMLoginService.checkIllegalState(),
        ye(
          {
            keyword: { type: 'string', allowEmpty: !1 },
            searchName: { type: 'boolean', required: !1 },
            searchAccountId: { type: 'boolean', required: !1 },
            searchMobile: { type: 'boolean', required: !1 },
          },
          e,
          '',
          !0
        ),
        !1 === (void 0 === e.searchName || e.searchName) &&
          !e.searchAccountId &&
          !e.searchMobile)
      )
        throw new he({
          code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
          detail: {
            reason:
              'one of searchName, searchAccountId, searchMobile must be true',
          },
        })
      return this.model.getUserListBySearchOption(e)
    })
  }
  getBlockList() {
    return this.checkV2(), Promise.resolve(this.model.blockList)
  }
  checkBlock(e) {
    return (
      this.checkV2(),
      ye({ accountIds: co }, { accountIds: e }, '', !0),
      Promise.resolve(this.model.checkBlock(e))
    )
  }
  updateUserProfileInMemory(e) {
    return Te(this, void 0, void 0, function* () {
      var t = this.model.getUser(this.core.account)
      t
        ? (Object.assign(t, e), this.model.setUser(t))
        : (t = (yield this._getUserList([this.core.account]))[0]),
        t && this.emit('onUserProfileChanged', [t])
    })
  }
  onUpdateUserProfileHandler(e) {
    return Te(this, void 0, void 0, function* () {
      var t = e.content.data
      yield this.updateUserProfileInMemory(t)
    })
  }
  onUpdateBlockListHandler(e) {
    var t = e.content.accountId
    e.content.addToBlockList
      ? (this.model.addToBlockList([t]), this.emitBlockListAdded(t))
      : (this.model.removeFromBlockList([t]),
        this.emit('onBlockListRemoved', t))
  }
  syncBlockAndMuteListHandler(e) {
    e.content.data.forEach((e) => {
      e.isBlock
        ? this.model.addToBlockList([e.accountId])
        : this.model.setAccountMuteMode(e.accountId, e.isMute ? 1 : 0)
    })
  }
  v2SyncSelfUserInfoHandler(e) {
    var t = e.content.user
    this.model.setUser(t)
  }
  checkUserUpdate(e, t) {
    var i = e.senderId
    i !== this.core.account && this.refreshUserInfo(i, t)
  }
  refreshUserInfo(e, t = 0) {
    return Te(this, void 0, void 0, function* () {
      if (e && 'string' == typeof e) {
        var i = this.model.getUser(e),
          r = []
        if (
          !i ||
          (i &&
            'number' == typeof i.updateTime &&
            'number' == typeof t &&
            !isNaN(i.updateTime) &&
            !isNaN(t) &&
            i.updateTime < t)
        )
          try {
            r = (yield this.core.sendCmd('v2GetUserList', { accountIds: [e] }))
              .content.data
          } catch (t) {
            return void this.logger.warn(
              `V2NIMUserService:refreshUserInfo: failed for ${e}`
            )
          }
        for (var s of r)
          this.model.setUser(s), this.emit('onUserProfileChanged', [s])
      }
    })
  }
  emitBlockListAdded(e) {
    return Te(this, void 0, void 0, function* () {
      var t = yield this._getUserList([e])
      1 === t.length && this.emit('onBlockListAdded', t[0])
    })
  }
  v2OnUpdateMuteListHandler(e) {
    return Te(this, void 0, void 0, function* () {
      var { accountId: t, mute: i } = e.content,
        r = i ? 1 : 0
      this.core.eventBus.emit('v2NIMUserService/updateMuteList', t, r)
    })
  }
}
var Yo = 'V2NIMFriendService',
  Ko = {
    '35_1': 'v2AddFriend',
    '35_2': 'v2DeleteFriend',
    '35_3': 'v2SetFriendInfo',
    '35_4': 'v2IncFriendInfo',
    '12_101': 'v2OnAddFriend',
    '12_102': 'v2OnDeleteFriend',
    '12_103': 'v2OnUpdateFriendInfo',
    '12_5': 'v2SyncFriendList',
    '12_6': 'v2SyncFriendUserList',
  },
  Wo = {
    accountId: 4,
    relationShip: { id: 5, retType: 'number' },
    source: { id: 7, retType: 'number' },
    alias: 8,
    serverExtension: 10,
    createTime: { id: 11, retType: 'number' },
    updateTime: { id: 12, retType: 'number' },
    customerExtension: 13,
  },
  Jo = {
    v2AddFriend: {
      sid: 35,
      cid: 1,
      service: Yo,
      params: [
        { type: 'String', name: 'accountId' },
        { type: 'Byte', name: 'verifyType' },
        { type: 'String', name: 'postscript' },
      ],
      response: [],
    },
    v2DeleteFriend: {
      sid: 35,
      cid: 2,
      service: Yo,
      params: [
        { type: 'String', name: 'accountId' },
        {
          type: 'Property',
          name: 'params',
          reflectMapper: { deleteAlias: { id: 1, converter: yt } },
        },
      ],
    },
    v2SetFriendInfo: {
      sid: 35,
      cid: 3,
      service: Yo,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Wo }],
    },
    v2OnAddFriend: {
      sid: 12,
      cid: 101,
      service: Yo,
      response: [
        { type: 'String', name: 'accountId' },
        { type: 'Byte', name: 'verifyType' },
        { type: 'String', name: 'postscript' },
        { type: 'Property', name: 'ext', reflectMapper: ft({ serverExt: 1 }) },
      ],
    },
    v2OnDeleteFriend: {
      sid: 12,
      cid: 102,
      service: Yo,
      response: [{ type: 'String', name: 'accountId' }],
    },
    v2OnUpdateFriendInfo: {
      sid: 12,
      cid: 103,
      service: Yo,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Wo) }],
    },
    v2SyncFriendList: {
      sid: 12,
      cid: 5,
      service: Yo,
      response: [
        { type: 'PropertyArray', name: 'friends', reflectMapper: ft(Wo) },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2SyncFriendUserList: {
      sid: 12,
      cid: 6,
      service: Yo,
      response: [
        { type: 'PropertyArray', name: 'users', reflectMapper: ft(Fo) },
      ],
    },
    v2IncFriendInfo: {
      sid: 35,
      cid: 4,
      service: Yo,
      params: [{ type: 'Long', name: 'timetag' }],
      response: [
        { type: 'PropertyArray', name: 'friends', reflectMapper: ft(Wo) },
        { type: 'Long', name: 'timetag' },
      ],
    },
  },
  zo = {
    accountId: { type: 'string', required: !0, allowEmpty: !1 },
    params: {
      type: 'object',
      required: !0,
      rules: {
        addMode: { type: 'enum', required: !0, values: [1, 2] },
        postscript: { type: 'string', required: !1, allowEmpty: !0 },
      },
    },
  },
  Xo = {
    accountId: { type: 'string', required: !0, allowEmpty: !1 },
    params: {
      type: 'object',
      required: !1,
      rules: { deleteAlias: { type: 'boolean', required: !1 } },
    },
  },
  Qo = {
    accountId: { type: 'string', required: !0, allowEmpty: !1 },
    params: {
      type: 'object',
      required: !1,
      rules: {
        alias: { type: 'string', required: !1, allowEmpty: !0 },
        serverExtension: { type: 'string', required: !1, allowEmpty: !0 },
      },
    },
  },
  Zo = {
    applicantAccountId: { type: 'string', allowEmpty: !1 },
    recipientAccountId: { type: 'string', allowEmpty: !1 },
    operatorAccountId: { type: 'string', required: !1, allowEmpty: !1 },
    postscript: { type: 'string', required: !1, allowEmpty: !0 },
    status: { type: 'enum', values: [1, 4, 3, 0, 2] },
    timestamp: { type: 'number', min: 1 },
  }
function ea(e, t) {
  if (
    (ye(Zo, e, '', !0),
    e && e.applicantAccountId !== t && e.recipientAccountId !== t)
  )
    throw new he({
      code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
      detail: { reason: 'Friend application is not your own' },
    })
}
var ta = {
  offset: { type: 'number', required: !1 },
  limit: { type: 'number', required: !1 },
  status: {
    type: 'array',
    itemType: 'enum',
    required: !1,
    values: [1, 4, 3, 0, 2],
  },
}
class ia {
  constructor(e, t) {
    ;(this.core = e), (this.service = t)
  }
  processSysNotification(e) {
    if (6 === e.type) {
      var t = e.senderId
      this.core.V2NIMFriendService.handleDeleteFriend(t, 2)
    } else if (5 === e.type)
      try {
        var i = JSON.parse(e.content)
        if (1 === (null == i ? void 0 : i.vt)) {
          this.core.V2NIMFriendService.handleAddFriend(e.senderId, e.timestamp)
          var r = {
            applicantAccountId: e.senderId,
            recipientAccountId: e.receiverId,
            operatorAccountId: e.senderId,
            postscript: e.postscript,
            timestamp: e.timestamp,
            status: 4,
            read: !1,
          }
          this.service.notificationModel.appendFriendAddApplication(r),
            this.service.notificationModel.updateFriendAddApplicationStatus(
              r.applicantAccountId,
              4,
              r.applicantAccountId
            )
        } else if (2 === (null == i ? void 0 : i.vt)) {
          var s = {
            applicantAccountId: e.senderId,
            recipientAccountId: e.receiverId,
            operatorAccountId: e.senderId,
            postscript: e.postscript,
            timestamp: e.timestamp,
            status: 0,
            read: !1,
          }
          this.service.handleApplyFriend(s),
            this.service.notificationModel.appendFriendAddApplication(s)
        } else if (3 === (null == i ? void 0 : i.vt)) {
          this.core.V2NIMFriendService.handleAddFriend(e.senderId, e.timestamp)
          var n = {
            applicantAccountId: e.receiverId,
            recipientAccountId: e.senderId,
            operatorAccountId: e.senderId,
            timestamp: e.timestamp,
            postscript: e.postscript,
            status: 1,
            read: !1,
          }
          this.service.notificationModel.appendFriendAddApplication(n)
        } else if (4 === (null == i ? void 0 : i.vt)) {
          var o = {
            applicantAccountId: e.receiverId,
            recipientAccountId: e.senderId,
            operatorAccountId: e.senderId,
            timestamp: e.timestamp,
            postscript: e.postscript,
            status: 2,
            read: !1,
          }
          this.service.notificationModel.appendFriendAddApplication(o),
            this.service.emit('onFriendAddRejected', o)
        }
      } catch (e) {
        this.core.logger.warn(
          'V2NIMFriendNotificationImpl::processSysNotification, parse content error:',
          e
        )
      }
  }
}
class ra {
  constructor() {
    ;(this.validFriendIds = new Set()),
      (this.friendMap = new Map()),
      (this.friendTimetag = 0)
  }
  reset() {
    this.friendMap.clear(), this.validFriendIds.clear()
  }
  upsertFriend(e, t) {
    delete t.relationShip
    var i = this.friendMap.get(e) || {},
      r = Object.assign({ accountId: e }, i, t)
    return this.friendMap.set(e, r), this.validFriendIds.add(e), r
  }
  addFriend(e) {
    this.validFriendIds.add(e)
  }
  deleteFriend(e) {
    this.validFriendIds.delete(e)
  }
  getFriend(e) {
    return this.validFriendIds.has(e) ? this.friendMap.get(e) : void 0
  }
  getFriendList() {
    return Array.from(this.validFriendIds.values())
      .map((e) => this.getFriend(e))
      .filter((e) => !!e)
  }
  getFriendListBySearchOption(e) {
    return Array.from(this.validFriendIds.values())
      .map((e) => this.getFriend(e))
      .filter((t) => {
        var i = void 0 === e.searchAlias || e.searchAlias
        return !(
          void 0 === t ||
          !(
            (i && t.alias && t.alias.includes(e.keyword)) ||
            (e.searchAccountId && t.accountId.includes(e.keyword))
          )
        )
      })
  }
  getFriendByIds(e) {
    return e.map((e) => this.getFriend(e)).filter((e) => !!e)
  }
  setFriendTimetag(e) {
    this.friendTimetag = e
  }
  getFriendTimetag() {
    return this.friendTimetag
  }
}
class sa {
  constructor() {
    ;(this.list = []), (this.maxCount = 1e3)
  }
  reset() {
    this.list = []
  }
  updateFriendAddApplicationStatus(e, t, i) {
    if (0 !== t)
      for (var r of this.list)
        r.applicantAccountId === e &&
          0 === r.status &&
          ((r.status = t), (r.operatorAccountId = i))
  }
  getAddApplicationList(e) {
    var t = void 0 === e.offset ? 0 : e.offset,
      i = this.list
        .filter((t) => {
          var i = e.status || []
          return 0 === i.length || !!i.includes(t.status)
        })
        .reverse(),
      r = e.limit || 50,
      s = i.slice(t, t + r),
      n = t + r >= i.length
    return { infos: s, finished: n, offset: n ? 0 : t + r }
  }
  checkSameApplication(e, t, i = !1) {
    return (
      e.applicantAccountId === t.applicantAccountId &&
      e.recipientAccountId === t.recipientAccountId &&
      (!i || e.timestamp === t.timestamp)
    )
  }
  setAllApplicationRead() {
    for (var e of this.list) e.read = !0
  }
  setApplicationRead(e) {
    for (var t of this.list) this.checkSameApplication(t, e) && (t.read = !0)
  }
  getAddApplicationUnreadCount() {
    var e = new Set()
    for (var t of this.list)
      t.read || 0 !== t.status || e.add(t.applicantAccountId)
    return e.size
  }
  appendFriendAddApplication(e) {
    this.list.push(e), this.list.length > this.maxCount && this.list.shift()
  }
  clearApplicationList() {
    this.list = []
  }
  deleteApplication(e) {
    this.list = this.list
      .map((t) => {
        if (!this.checkSameApplication(t, e, !1)) return t
      })
      .filter((e) => e)
  }
}
var na = { muteMode: { type: 'enum', values: [2, 0, 1] } },
  oa = {
    accountId: { type: 'string', required: !0, allowEmpty: !1 },
    muteMode: { type: 'enum', required: !0, values: [2, 0, 1] },
  },
  aa = {
    type: 'object',
    required: !1,
    rules: {
      certificateName: { type: 'string', required: !0, allowEmpty: !1 },
      appId: { type: 'string', required: !1, allowEmpty: !1 },
      appKey: { type: 'string', required: !1, allowEmpty: !1 },
      secret: { type: 'string', required: !1, allowEmpty: !1 },
    },
  },
  ca = {
    config: {
      type: 'object',
      required: !0,
      rules: {
        apns: aa,
        hwPush: aa,
        miPush: aa,
        vivoPush: aa,
        oppoPush: aa,
        honorPush: aa,
        fcmPush: aa,
        mzPush: aa,
      },
    },
  },
  da = 'V2NIMSettingService',
  la = {
    '34_1': 'v2SetDeviceToken',
    '34_2': 'v2SetAppBackground',
    '34_15': 'v2SetPushMobileOnDesktopOnline',
    '3_115': 'v2SettingMutilSyncDonnop',
    '4_13': 'v2SettingSyncDonnop',
  },
  pa = {
    need: {
      id: 1,
      converter: (e) => (e ? 2 : 1),
      retConverter: (e) => '2' === e,
    },
  },
  ha = {
    v2SetDeviceToken: {
      sid: 34,
      cid: 1,
      service: da,
      params: [
        { type: 'String', name: 'certificateName' },
        { type: 'String', name: 'pushDeviceToken' },
        { type: 'Int', name: 'pushkit' },
      ],
    },
    v2SetAppBackground: {
      sid: 34,
      cid: 2,
      service: da,
      params: [
        { type: 'Bool', name: 'isBackground' },
        { type: 'Int', name: 'badge' },
      ],
    },
    v2SetPushMobileOnDesktopOnline: {
      sid: 34,
      cid: 15,
      service: da,
      params: [{ type: 'Property', name: 'tag', reflectMapper: pa }],
    },
    v2SettingMutilSyncDonnop: {
      sid: 3,
      cid: 115,
      service: da,
      response: [
        { type: 'Property', name: 'data', reflectMapper: ft(pa) },
        { type: 'Long', name: 'timetag' },
      ],
    },
    v2SettingSyncDonnop: {
      sid: 4,
      cid: 13,
      service: da,
      response: [
        { type: 'Property', name: 'data', reflectMapper: ft(pa) },
        { type: 'Long', name: 'timetag' },
      ],
    },
  }
class ua {
  constructor(e, t) {
    ;(this.core = e), (this.service = t)
  }
  v2SettingMutilSyncDonnopHandler(e) {
    var { need: t } = e.content.data
    ;(this.service.needToPushMobileOnDesktopOnline = t),
      this.service.emit('onPushMobileOnDesktopOnline', t)
  }
  v2SettingSyncDonnopHandler(e) {
    var { need: t } = e.content.data
    ;(this.service.needToPushMobileOnDesktopOnline = t),
      this.service.emit('onPushMobileOnDesktopOnline', t)
  }
}
var ma =
    ma ||
    (function (t) {
      var i
      'undefined' != typeof window && window.crypto && (i = window.crypto),
        'undefined' != typeof self && self.crypto && (i = self.crypto),
        'undefined' != typeof globalThis &&
          globalThis.crypto &&
          (i = globalThis.crypto),
        !i &&
          'undefined' != typeof window &&
          window.msCrypto &&
          (i = window.msCrypto),
        !i && void 0 !== e.g && e.g.crypto && (i = e.g.crypto)
      var r = function () {
          if (i) {
            if ('function' == typeof i.getRandomValues)
              try {
                return i.getRandomValues(new Uint32Array(1))[0]
              } catch (e) {}
            if ('function' == typeof i.randomBytes)
              try {
                return i.randomBytes(4).readInt32LE()
              } catch (e) {}
          }
          throw new Error(
            'Native crypto module could not be used to get secure random number.'
          )
        },
        s =
          Object.create ||
          (function () {
            function e() {}
            return function (t) {
              var i
              return (e.prototype = t), (i = new e()), (e.prototype = null), i
            }
          })(),
        n = {},
        o = (n.lib = {}),
        a = (o.Base = {
          extend: function (e) {
            var t = s(this)
            return (
              e && t.mixIn(e),
              (t.hasOwnProperty('init') && this.init !== t.init) ||
                (t.init = function () {
                  t.$super.init.apply(this, arguments)
                }),
              (t.init.prototype = t),
              (t.$super = this),
              t
            )
          },
          create: function () {
            var e = this.extend()
            return e.init.apply(e, arguments), e
          },
          init: function () {},
          mixIn: function (e) {
            for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t])
            e.hasOwnProperty('toString') && (this.toString = e.toString)
          },
          clone: function () {
            return this.init.prototype.extend(this)
          },
        }),
        c = (o.WordArray = a.extend({
          init: function (e, t) {
            ;(e = this.words = e || []),
              (this.sigBytes = null != t ? t : 4 * e.length)
          },
          toString: function (e) {
            return (e || l).stringify(this)
          },
          concat: function (e) {
            var t = this.words,
              i = e.words,
              r = this.sigBytes,
              s = e.sigBytes
            if ((this.clamp(), r % 4))
              for (var n = 0; n < s; n++) {
                var o = (i[n >>> 2] >>> (24 - (n % 4) * 8)) & 255
                t[(r + n) >>> 2] |= o << (24 - ((r + n) % 4) * 8)
              }
            else for (var a = 0; a < s; a += 4) t[(r + a) >>> 2] = i[a >>> 2]
            return (this.sigBytes += s), this
          },
          clamp: function () {
            var e = this.words,
              i = this.sigBytes
            ;(e[i >>> 2] &= 4294967295 << (32 - (i % 4) * 8)),
              (e.length = t.ceil(i / 4))
          },
          clone: function () {
            var e = a.clone.call(this)
            return (e.words = this.words.slice(0)), e
          },
          random: function (e) {
            for (var t = [], i = 0; i < e; i += 4) t.push(r())
            return new c.init(t, e)
          },
        })),
        d = (n.enc = {}),
        l = (d.Hex = {
          stringify: function (e) {
            for (var t = e.words, i = e.sigBytes, r = [], s = 0; s < i; s++) {
              var n = (t[s >>> 2] >>> (24 - (s % 4) * 8)) & 255
              r.push((n >>> 4).toString(16)), r.push((15 & n).toString(16))
            }
            return r.join('')
          },
          parse: function (e) {
            for (var t = e.length, i = [], r = 0; r < t; r += 2)
              i[r >>> 3] |= parseInt(e.substr(r, 2), 16) << (24 - (r % 8) * 4)
            return new c.init(i, t / 2)
          },
        }),
        p = (d.Latin1 = {
          stringify: function (e) {
            for (var t = e.words, i = e.sigBytes, r = [], s = 0; s < i; s++) {
              var n = (t[s >>> 2] >>> (24 - (s % 4) * 8)) & 255
              r.push(String.fromCharCode(n))
            }
            return r.join('')
          },
          parse: function (e) {
            for (var t = e.length, i = [], r = 0; r < t; r++)
              i[r >>> 2] |= (255 & e.charCodeAt(r)) << (24 - (r % 4) * 8)
            return new c.init(i, t)
          },
        }),
        h = (d.Utf8 = {
          stringify: function (e) {
            try {
              return decodeURIComponent(escape(p.stringify(e)))
            } catch (e) {
              throw new Error('Malformed UTF-8 data')
            }
          },
          parse: function (e) {
            return p.parse(unescape(encodeURIComponent(e)))
          },
        }),
        u = (o.BufferedBlockAlgorithm = a.extend({
          reset: function () {
            ;(this._data = new c.init()), (this._nDataBytes = 0)
          },
          _append: function (e) {
            'string' == typeof e && (e = h.parse(e)),
              this._data.concat(e),
              (this._nDataBytes += e.sigBytes)
          },
          _process: function (e) {
            var i,
              r = this._data,
              s = r.words,
              n = r.sigBytes,
              o = this.blockSize,
              a = n / (4 * o),
              d =
                (a = e ? t.ceil(a) : t.max((0 | a) - this._minBufferSize, 0)) *
                o,
              l = t.min(4 * d, n)
            if (d) {
              for (var p = 0; p < d; p += o) this._doProcessBlock(s, p)
              ;(i = s.splice(0, d)), (r.sigBytes -= l)
            }
            return new c.init(i, l)
          },
          clone: function () {
            var e = a.clone.call(this)
            return (e._data = this._data.clone()), e
          },
          _minBufferSize: 0,
        }))
      o.Hasher = u.extend({
        cfg: a.extend(),
        init: function (e) {
          ;(this.cfg = this.cfg.extend(e)), this.reset()
        },
        reset: function () {
          u.reset.call(this), this._doReset()
        },
        update: function (e) {
          return this._append(e), this._process(), this
        },
        finalize: function (e) {
          return e && this._append(e), this._doFinalize()
        },
        blockSize: 16,
        _createHelper: function (e) {
          return function (t, i) {
            return new e.init(i).finalize(t)
          }
        },
        _createHmacHelper: function (e) {
          return function (t, i) {
            return new m.HMAC.init(e, i).finalize(t)
          }
        },
      })
      var m = (n.algo = {})
      return n
    })(Math),
  ga = ma.enc.Utf8,
  va = ma,
  fa = va.lib,
  ya = fa.Base,
  Ia = fa.WordArray,
  Ma = va.algo,
  _a = Ma.MD5,
  Ea = (Ma.EvpKDF = ya.extend({
    cfg: ya.extend({ keySize: 4, hasher: _a, iterations: 1 }),
    init: function (e) {
      this.cfg = this.cfg.extend(e)
    },
    compute: function (e, t) {
      for (
        var i,
          r = this.cfg,
          s = r.hasher.create(),
          n = Ia.create(),
          o = n.words,
          a = r.keySize,
          c = r.iterations;
        o.length < a;

      ) {
        i && s.update(i), (i = s.update(e).finalize(t)), s.reset()
        for (var d = 1; d < c; d++) (i = s.finalize(i)), s.reset()
        n.concat(i)
      }
      return (n.sigBytes = 4 * a), n
    },
  }))
;(va.EvpKDF = function (e, t, i) {
  return Ea.create(i).compute(e, t)
}),
  ma.EvpKDF
var Ta = ma,
  Sa = Ta.lib.WordArray
;(Ta.enc.Base64 = {
  stringify: function (e) {
    var t = e.words,
      i = e.sigBytes,
      r = this._map
    e.clamp()
    for (var s = [], n = 0; n < i; n += 3)
      for (
        var o =
            (((t[n >>> 2] >>> (24 - (n % 4) * 8)) & 255) << 16) |
            (((t[(n + 1) >>> 2] >>> (24 - ((n + 1) % 4) * 8)) & 255) << 8) |
            ((t[(n + 2) >>> 2] >>> (24 - ((n + 2) % 4) * 8)) & 255),
          a = 0;
        a < 4 && n + 0.75 * a < i;
        a++
      )
        s.push(r.charAt((o >>> (6 * (3 - a))) & 63))
    var c = r.charAt(64)
    if (c) for (; s.length % 4; ) s.push(c)
    return s.join('')
  },
  parse: function (e) {
    var t = e.length,
      i = this._map,
      r = this._reverseMap
    if (!r) {
      r = this._reverseMap = []
      for (var s = 0; s < i.length; s++) r[i.charCodeAt(s)] = s
    }
    var n = i.charAt(64)
    if (n) {
      var o = e.indexOf(n)
      ;-1 !== o && (t = o)
    }
    return (function (e, t, i) {
      for (var r = [], s = 0, n = 0; n < t; n++)
        if (n % 4) {
          var o =
            (i[e.charCodeAt(n - 1)] << ((n % 4) * 2)) |
            (i[e.charCodeAt(n)] >>> (6 - (n % 4) * 2))
          ;(r[s >>> 2] |= o << (24 - (s % 4) * 8)), s++
        }
      return Sa.create(r, s)
    })(e, t, r)
  },
  _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
}),
  ma.enc.Base64,
  (function (e) {
    e.lib.Cipher ||
      (function () {
        var t = e,
          i = t.lib,
          r = i.Base,
          s = i.WordArray,
          n = i.BufferedBlockAlgorithm,
          o = t.enc
        o.Utf8
        var a = o.Base64,
          c = t.algo.EvpKDF,
          d = (i.Cipher = n.extend({
            cfg: r.extend(),
            createEncryptor: function (e, t) {
              return this.create(this._ENC_XFORM_MODE, e, t)
            },
            createDecryptor: function (e, t) {
              return this.create(this._DEC_XFORM_MODE, e, t)
            },
            init: function (e, t, i) {
              ;(this.cfg = this.cfg.extend(i)),
                (this._xformMode = e),
                (this._key = t),
                this.reset()
            },
            reset: function () {
              n.reset.call(this), this._doReset()
            },
            process: function (e) {
              return this._append(e), this._process()
            },
            finalize: function (e) {
              return e && this._append(e), this._doFinalize()
            },
            keySize: 4,
            ivSize: 4,
            _ENC_XFORM_MODE: 1,
            _DEC_XFORM_MODE: 2,
            _createHelper: (function () {
              function e(e) {
                return 'string' == typeof e ? y : v
              }
              return function (t) {
                return {
                  encrypt: function (i, r, s) {
                    return e(r).encrypt(t, i, r, s)
                  },
                  decrypt: function (i, r, s) {
                    return e(r).decrypt(t, i, r, s)
                  },
                }
              }
            })(),
          }))
        i.StreamCipher = d.extend({
          _doFinalize: function () {
            return this._process(!0)
          },
          blockSize: 1,
        })
        var l = (t.mode = {}),
          p = (i.BlockCipherMode = r.extend({
            createEncryptor: function (e, t) {
              return this.Encryptor.create(e, t)
            },
            createDecryptor: function (e, t) {
              return this.Decryptor.create(e, t)
            },
            init: function (e, t) {
              ;(this._cipher = e), (this._iv = t)
            },
          })),
          h = (l.CBC = (function () {
            var e = p.extend()
            function t(e, t, i) {
              var r,
                s = this._iv
              s ? ((r = s), (this._iv = void 0)) : (r = this._prevBlock)
              for (var n = 0; n < i; n++) e[t + n] ^= r[n]
            }
            return (
              (e.Encryptor = e.extend({
                processBlock: function (e, i) {
                  var r = this._cipher,
                    s = r.blockSize
                  t.call(this, e, i, s),
                    r.encryptBlock(e, i),
                    (this._prevBlock = e.slice(i, i + s))
                },
              })),
              (e.Decryptor = e.extend({
                processBlock: function (e, i) {
                  var r = this._cipher,
                    s = r.blockSize,
                    n = e.slice(i, i + s)
                  r.decryptBlock(e, i),
                    t.call(this, e, i, s),
                    (this._prevBlock = n)
                },
              })),
              e
            )
          })()),
          u = ((t.pad = {}).Pkcs7 = {
            pad: function (e, t) {
              for (
                var i = 4 * t,
                  r = i - (e.sigBytes % i),
                  n = (r << 24) | (r << 16) | (r << 8) | r,
                  o = [],
                  a = 0;
                a < r;
                a += 4
              )
                o.push(n)
              var c = s.create(o, r)
              e.concat(c)
            },
            unpad: function (e) {
              var t = 255 & e.words[(e.sigBytes - 1) >>> 2]
              e.sigBytes -= t
            },
          })
        i.BlockCipher = d.extend({
          cfg: d.cfg.extend({ mode: h, padding: u }),
          reset: function () {
            var e
            d.reset.call(this)
            var t = this.cfg,
              i = t.iv,
              r = t.mode
            this._xformMode == this._ENC_XFORM_MODE
              ? (e = r.createEncryptor)
              : ((e = r.createDecryptor), (this._minBufferSize = 1)),
              this._mode && this._mode.__creator == e
                ? this._mode.init(this, i && i.words)
                : ((this._mode = e.call(r, this, i && i.words)),
                  (this._mode.__creator = e))
          },
          _doProcessBlock: function (e, t) {
            this._mode.processBlock(e, t)
          },
          _doFinalize: function () {
            var e,
              t = this.cfg.padding
            return (
              this._xformMode == this._ENC_XFORM_MODE
                ? (t.pad(this._data, this.blockSize), (e = this._process(!0)))
                : ((e = this._process(!0)), t.unpad(e)),
              e
            )
          },
          blockSize: 4,
        })
        var m = (i.CipherParams = r.extend({
            init: function (e) {
              this.mixIn(e)
            },
            toString: function (e) {
              return (e || this.formatter).stringify(this)
            },
          })),
          g = ((t.format = {}).OpenSSL = {
            stringify: function (e) {
              var t = e.ciphertext,
                i = e.salt
              return (
                i ? s.create([1398893684, 1701076831]).concat(i).concat(t) : t
              ).toString(a)
            },
            parse: function (e) {
              var t,
                i = a.parse(e),
                r = i.words
              return (
                1398893684 == r[0] &&
                  1701076831 == r[1] &&
                  ((t = s.create(r.slice(2, 4))),
                  r.splice(0, 4),
                  (i.sigBytes -= 16)),
                m.create({ ciphertext: i, salt: t })
              )
            },
          }),
          v = (i.SerializableCipher = r.extend({
            cfg: r.extend({ format: g }),
            encrypt: function (e, t, i, r) {
              r = this.cfg.extend(r)
              var s = e.createEncryptor(i, r),
                n = s.finalize(t),
                o = s.cfg
              return m.create({
                ciphertext: n,
                key: i,
                iv: o.iv,
                algorithm: e,
                mode: o.mode,
                padding: o.padding,
                blockSize: e.blockSize,
                formatter: r.format,
              })
            },
            decrypt: function (e, t, i, r) {
              return (
                (r = this.cfg.extend(r)),
                (t = this._parse(t, r.format)),
                e.createDecryptor(i, r).finalize(t.ciphertext)
              )
            },
            _parse: function (e, t) {
              return 'string' == typeof e ? t.parse(e, this) : e
            },
          })),
          f = ((t.kdf = {}).OpenSSL = {
            execute: function (e, t, i, r) {
              r || (r = s.random(8))
              var n = c.create({ keySize: t + i }).compute(e, r),
                o = s.create(n.words.slice(t), 4 * i)
              return (n.sigBytes = 4 * t), m.create({ key: n, iv: o, salt: r })
            },
          }),
          y = (i.PasswordBasedCipher = v.extend({
            cfg: v.cfg.extend({ kdf: f }),
            encrypt: function (e, t, i, r) {
              var s = (r = this.cfg.extend(r)).kdf.execute(
                i,
                e.keySize,
                e.ivSize
              )
              r.iv = s.iv
              var n = v.encrypt.call(this, e, t, s.key, r)
              return n.mixIn(s), n
            },
            decrypt: function (e, t, i, r) {
              ;(r = this.cfg.extend(r)), (t = this._parse(t, r.format))
              var s = r.kdf.execute(i, e.keySize, e.ivSize, t.salt)
              return (r.iv = s.iv), v.decrypt.call(this, e, t, s.key, r)
            },
          }))
      })()
  })(ma)
var Ca = ma,
  Na = Ca.lib.StreamCipher,
  Aa = Ca.algo,
  Ra = (Aa.RC4 = Na.extend({
    _doReset: function () {
      for (
        var e = this._key,
          t = e.words,
          i = e.sigBytes,
          r = (this._S = []),
          s = 0;
        s < 256;
        s++
      )
        r[s] = s
      s = 0
      for (var n = 0; s < 256; s++) {
        var o = s % i,
          a = (t[o >>> 2] >>> (24 - (o % 4) * 8)) & 255
        n = (n + r[s] + a) % 256
        var c = r[s]
        ;(r[s] = r[n]), (r[n] = c)
      }
      this._i = this._j = 0
    },
    _doProcessBlock: function (e, t) {
      e[t] ^= Oa.call(this)
    },
    keySize: 8,
    ivSize: 0,
  }))
function Oa() {
  for (var e = this._S, t = this._i, i = this._j, r = 0, s = 0; s < 4; s++) {
    i = (i + e[(t = (t + 1) % 256)]) % 256
    var n = e[t]
    ;(e[t] = e[i]), (e[i] = n), (r |= e[(e[t] + e[i]) % 256] << (24 - 8 * s))
  }
  return (this._i = t), (this._j = i), r
}
Ca.RC4 = Na._createHelper(Ra)
var ba = (Aa.RC4Drop = Ra.extend({
  cfg: Ra.cfg.extend({ drop: 192 }),
  _doReset: function () {
    Ra._doReset.call(this)
    for (var e = this.cfg.drop; e > 0; e--) Oa.call(this)
  },
}))
Ca.RC4Drop = Na._createHelper(ba)
var ka = ma.RC4
class Va {
  constructor(e, t) {
    ;(this.offlinePushPlugin = void 0),
      (this.offlinePushConfig = void 0),
      (this.authConfig = void 0),
      (this.aosPushInfo = void 0),
      (this.appBackgroundOptions = { badge: 0, isBackground: !1 }),
      (this.setTokenAndBackgroundStateAfterLogin = (e) => {
        ;(this.aosPushInfo = e),
          this.logger.log(
            'OfflinePushService: setToken, deviceClientId:',
            null == e ? void 0 : e.clientId
          ),
          this.offlinePushPlugin &&
            (this.logger.log('OfflinePushService: setToken plugin is provided'),
            this.logger.log(
              'OfflinePushService: setToken pushType is: ',
              e && e.pushType
            ),
            this.regToken(),
            this.core.sendCmd('v2SetAppBackground', {
              isBackground: this.appBackgroundOptions.isBackground,
              badge: this.appBackgroundOptions.badge || 0,
            }))
      }),
      (this.core = e),
      (this.service = t),
      (this.logger = e.logger)
  }
  getRNDeviceInfo() {
    var e
    return (
      this.logger.log('OfflinePushService:getDeviceInfo start'),
      null === (e = this.offlinePushPlugin) ||
        void 0 === e ||
        e.init(JSON.stringify(this.authConfig), (e, t, i) => {
          if (
            (this.logger.log(
              `OfflinePushService:: type: ${e}, tokenName: ${t}, token: ${i}`
            ),
            i)
          ) {
            var r = '',
              s = Ae.getSystemInfo() || {},
              n = s.os ? s.os.toLowerCase() : ''
            this.aosPushInfo && this.aosPushInfo.pushType
              ? (r = this.aosPushInfo.pushType)
              : 'ios' === n
              ? (r = '')
              : 'android' === n && (r = '8'),
              this.pushTokenToServer(r, i)
          } else
            this.logger.warn(
              'OfflinePushService:: token is empty. Please check your parameters'
            )
        }),
      new Promise((e, t) => {
        var i
        null === (i = this.offlinePushPlugin) ||
          void 0 === i ||
          i.getDeviceInfo((i) => {
            try {
              this.logger.log(
                `OfflinePushService:getDeviceInfo result ${
                  i ? JSON.stringify(i) : ''
                }`
              ),
                e(JSON.parse(i))
            } catch (e) {
              t(
                new he({
                  code: de.V2NIM_ERROR_CODE_INTERNAL,
                  detail: { reason: 'OfflinePushService:getDeviceInfo error' },
                })
              )
            }
          }),
          setTimeout(() => {
            t(
              new he({
                code: de.V2NIM_ERROR_CODE_INTERNAL,
                detail: { reason: 'OfflinePushService:getDeviceInfo timeout' },
              })
            )
          }, 2e3)
      })
    )
  }
  pushTokenToServer(e, t) {
    var i,
      r,
      s,
      n,
      o,
      a,
      c,
      d,
      l = '',
      p = this.offlinePushConfig
    switch (e) {
      case '5':
        l =
          null === (i = null == p ? void 0 : p.miPush) || void 0 === i
            ? void 0
            : i.certificateName
        break
      case '6':
        l =
          null === (r = null == p ? void 0 : p.hwPush) || void 0 === r
            ? void 0
            : r.certificateName
        break
      case '7':
        l =
          null === (s = null == p ? void 0 : p.mzPush) || void 0 === s
            ? void 0
            : s.certificateName
        break
      case '8':
        l =
          null === (n = null == p ? void 0 : p.fcmPush) || void 0 === n
            ? void 0
            : n.certificateName
        break
      case '9':
        l =
          null === (o = null == p ? void 0 : p.vivoPush) || void 0 === o
            ? void 0
            : o.certificateName
        break
      case '10':
        l =
          null === (a = null == p ? void 0 : p.oppoPush) || void 0 === a
            ? void 0
            : a.certificateName
        break
      case '11':
        l =
          null === (c = null == p ? void 0 : p.honorPush) || void 0 === c
            ? void 0
            : c.certificateName
        break
      default:
        l =
          null === (d = null == p ? void 0 : p.apns) || void 0 === d
            ? void 0
            : d.certificateName
    }
    if ('' === l || void 0 === l)
      this.logger.warn(
        'OfflinePushService:: certificate name is empty for push type: ',
        e
      )
    else
      try {
        if ('UNIAPP' === Ae.platform) {
          var h = ga.parse('557d1e3cafa43e2589a588270c53d56f'),
            u = ga.stringify(ka.decrypt(t, h))
          this.logger.log('OfflinePushService:: token', u),
            this.core.sendCmd('v2SetDeviceToken', {
              certificateName: l,
              pushDeviceToken: u,
              pushkit: 0,
            })
        } else
          this.core.sendCmd('v2SetDeviceToken', {
            certificateName: l,
            pushDeviceToken: t,
            pushkit: 0,
          })
      } catch (e) {
        return (
          this.logger.log('OfflinePushService:: decrypt error', e),
          void this.logger.warn('OfflinePushService:: token before decrypt', t)
        )
      }
  }
  regToken() {
    var e = Ae.getSystemInfo() || {},
      t = e.os ? e.os.toLowerCase() : ''
    if (
      (this.logger.log('OfflinePushService: os', t),
      'ios' === t || 'android' === t)
    )
      if (
        !this.offlinePushPlugin ||
        ('UNIAPP' === Ae.platform &&
          'function' != typeof this.offlinePushPlugin.getDeviceToken) ||
        ('React Native' === Ae.platform &&
          'android' === t &&
          'function' != typeof this.offlinePushPlugin.init) ||
        ('React Native' === Ae.platform &&
          'ios' === t &&
          'function' != typeof this.offlinePushPlugin.checkPermissions)
      )
        this.logger.warn(
          'OfflinePushService: plugin is not correct, please check your plugin according to Yunxin Official Documentation'
        )
      else {
        'React Native' === Ae.platform &&
          Ae.envPayload.AppState &&
          Ae.envPayload.AppState.addEventListener(
            'change',
            this.handleRNAppStateChange.bind(this)
          )
        var i = ''
        this.aosPushInfo && this.aosPushInfo.pushType
          ? (i = this.aosPushInfo.pushType)
          : 'ios' === t
          ? (i = '')
          : 'android' === t && (i = '8'),
          this.logger.log(
            'OfflinePushService:: prepare to get device token. suggestPushType: ' +
              i
          ),
          this.logger.log(
            'OfflinePushService push config',
            JSON.stringify(this.authConfig, null, 2),
            'platform',
            Ae.platform
          ),
          'UNIAPP' === Ae.platform
            ? this.offlinePushPlugin.getDeviceToken(
                { suggestPushType: i, config: this.authConfig },
                (e) => {
                  e
                    ? (this.logger.log('OfflinePushService:: token is :' + e),
                      this.pushTokenToServer(i, e))
                    : this.logger.warn(
                        'OfflinePushService:: token is empty. Please check your parameters'
                      )
                }
              )
            : 'React Native' === Ae.platform && 'android' === t
            ? (this.logger.log(
                'OfflinePushService:: onLogin',
                this.core.account,
                typeof i,
                i
              ),
              this.offlinePushPlugin.onLogin(
                this.core.account,
                parseInt(i),
                !1,
                ''
              ))
            : 'React Native' === Ae.platform && 'ios' === t
            ? this.offlinePushPlugin.checkPermissions(() => {
                this.logger.log(
                  'OfflinePushService addEventListener requestPermissions'
                )
                try {
                  this.offlinePushPlugin.requestPermissions()
                } catch (e) {
                  this.logger.log(
                    'OfflinePushService:: requestPermissions error',
                    e
                  )
                }
                this.offlinePushPlugin.addEventListener('register', (e) => {
                  this.logger.log(`OfflinePushService:: ios token: ${e}`),
                    this.pushTokenToServer(i, e)
                }),
                  this.offlinePushPlugin.addEventListener(
                    'registrationError',
                    (e) => {
                      this.logger.log(
                        'OfflinePushService:: ios registerError',
                        e
                      )
                    }
                  )
              })
            : this.logger.error(
                `OfflinePushService:: platform is not supported. Please check your parameters. Platform: ${Ae.platform}. os: ${t}`
              )
      }
    else
      this.logger.warn(
        'OfflinePushService: only Android or IOS support offline push'
      )
  }
  handleRNAppStateChange(e) {
    this.logger.log(
      `push::handleAppStateChange: pushConfig ios/aos; state: ${e}`
    ),
      (this.appBackgroundOptions = {
        badge: this.core.V2NIMConversationService.getTotalUnreadCount(),
        isBackground: 'background' === e || 'inactive' === e,
      }),
      this.setAppBackground(
        this.appBackgroundOptions.isBackground,
        this.appBackgroundOptions.badge
      )
  }
  setOfflinePushConfig(e, t) {
    var i,
      r,
      s,
      n,
      o,
      a,
      c,
      d,
      l,
      p,
      h,
      u,
      m,
      g,
      v,
      f,
      y,
      I,
      M,
      _,
      E,
      T,
      S,
      C,
      N,
      A,
      R,
      O,
      b,
      k,
      V,
      P,
      L,
      D,
      w,
      U
    this.logger.log('setOfflinePushConfig', 'plugin', e, 'config', t),
      (this.offlinePushPlugin = e),
      (this.offlinePushConfig = t),
      (this.authConfig = {
        xmAppId:
          null ===
            (r =
              null === (i = this.offlinePushConfig) || void 0 === i
                ? void 0
                : i.miPush) || void 0 === r
            ? void 0
            : r.appId,
        xmAppKey:
          null ===
            (n =
              null === (s = this.offlinePushConfig) || void 0 === s
                ? void 0
                : s.miPush) || void 0 === n
            ? void 0
            : n.appKey,
        xmCertificateName:
          null ===
            (a =
              null === (o = this.offlinePushConfig) || void 0 === o
                ? void 0
                : o.miPush) || void 0 === a
            ? void 0
            : a.certificateName,
        hwAppId:
          null ===
            (d =
              null === (c = this.offlinePushConfig) || void 0 === c
                ? void 0
                : c.hwPush) || void 0 === d
            ? void 0
            : d.appId,
        hwCertificateName:
          null ===
            (p =
              null === (l = this.offlinePushConfig) || void 0 === l
                ? void 0
                : l.hwPush) || void 0 === p
            ? void 0
            : p.certificateName,
        oppoAppId:
          null ===
            (u =
              null === (h = this.offlinePushConfig) || void 0 === h
                ? void 0
                : h.oppoPush) || void 0 === u
            ? void 0
            : u.appId,
        oppoAppKey:
          null ===
            (g =
              null === (m = this.offlinePushConfig) || void 0 === m
                ? void 0
                : m.oppoPush) || void 0 === g
            ? void 0
            : g.appKey,
        oppoAppSecret:
          null ===
            (f =
              null === (v = this.offlinePushConfig) || void 0 === v
                ? void 0
                : v.oppoPush) || void 0 === f
            ? void 0
            : f.secret,
        oppoCertificateName:
          null ===
            (I =
              null === (y = this.offlinePushConfig) || void 0 === y
                ? void 0
                : y.oppoPush) || void 0 === I
            ? void 0
            : I.certificateName,
        vivoAppId:
          null ===
            (_ =
              null === (M = this.offlinePushConfig) || void 0 === M
                ? void 0
                : M.vivoPush) || void 0 === _
            ? void 0
            : _.appId,
        vivoAppKey:
          null ===
            (T =
              null === (E = this.offlinePushConfig) || void 0 === E
                ? void 0
                : E.vivoPush) || void 0 === T
            ? void 0
            : T.appKey,
        vivoCertificateName:
          null ===
            (C =
              null === (S = this.offlinePushConfig) || void 0 === S
                ? void 0
                : S.vivoPush) || void 0 === C
            ? void 0
            : C.certificateName,
        fcmCertificateName:
          null ===
            (A =
              null === (N = this.offlinePushConfig) || void 0 === N
                ? void 0
                : N.fcmPush) || void 0 === A
            ? void 0
            : A.certificateName,
        mzAppId:
          null ===
            (O =
              null === (R = this.offlinePushConfig) || void 0 === R
                ? void 0
                : R.mzPush) || void 0 === O
            ? void 0
            : O.appId,
        mzAppKey:
          null ===
            (k =
              null === (b = this.offlinePushConfig) || void 0 === b
                ? void 0
                : b.mzPush) || void 0 === k
            ? void 0
            : k.appKey,
        mzCertificateName:
          null ===
            (P =
              null === (V = this.offlinePushConfig) || void 0 === V
                ? void 0
                : V.mzPush) || void 0 === P
            ? void 0
            : P.certificateName,
        apnsCertificateName:
          null ===
            (D =
              null === (L = this.offlinePushConfig) || void 0 === L
                ? void 0
                : L.apns) || void 0 === D
            ? void 0
            : D.certificateName,
        honorCertificateName:
          null ===
            (U =
              null === (w = this.offlinePushConfig) || void 0 === w
                ? void 0
                : w.honorPush) || void 0 === U
            ? void 0
            : U.certificateName,
      })
  }
  setAppBackground(e, t) {
    return Te(this, void 0, void 0, function* () {
      ;(this.appBackgroundOptions = { isBackground: e, badge: t || 0 }),
        yield this.core.sendCmd('v2SetAppBackground', {
          isBackground: e,
          badge: t || 0,
        })
    })
  }
}
class Pa {
  constructor(e, t) {
    ;(this.p2pMessageMuteModeChangeHandler = (e, t) => {
      this.service.emit('onP2PMessageMuteModeChanged', e, t),
        this.hasUserService &&
          this.core.V2NIMUserService.model.setAccountMuteMode(e, t)
      var i = this.core.V2NIMConversationIdUtil.p2pConversationId(e),
        r = 1 === t
      this.core.eventBus.emit('V2NIMSettingService/setMute', i, r)
    }),
      (this.core = e),
      (this.service = t)
  }
  get hasUserService() {
    var e
    return !!(null === (e = this.core.V2NIMUserService) || void 0 === e
      ? void 0
      : e.name)
  }
  get hasTeamService() {
    var e
    return !!(null === (e = this.core.V2NIMTeamService) || void 0 === e
      ? void 0
      : e.name)
  }
  getConversationMuteStatus(e) {
    if ('string' != typeof e) return !1
    var t = this.core.V2NIMConversationIdUtil.parseConversationType(e),
      i = this.core.V2NIMConversationIdUtil.parseConversationTargetId(e)
    return 3 === t
      ? 0 !== this.getTeamMessageMuteMode(i, 2)
      : 2 === t
      ? 0 !== this.getTeamMessageMuteMode(i, 1)
      : !(
          1 !== t ||
          !this.hasUserService ||
          !this.core.V2NIMUserService.model.muteList.has(i)
        )
  }
  setTeamMessageMuteMode(e, t, i) {
    return Te(this, void 0, void 0, function* () {
      var r =
          2 === t
            ? 'v2SuperTeamUpdateSelfMemberInfo'
            : 'v2TeamUpdateSelfMemberInfo',
        s = { teamId: e, teamType: t, accountId: this.core.account, bits: i }
      yield this.core.sendCmd(r, { teamMember: s }),
        this.core.V2NIMTeamService.memberModel.upsert(s),
        this.service.emit('onTeamMessageMuteModeChanged', e, t, i)
      var n =
          1 === t
            ? this.core.V2NIMConversationIdUtil.teamConversationId(e)
            : this.core.V2NIMConversationIdUtil.superTeamConversationId(e),
        o = this.getConversationMuteStatus(n)
      this.core.eventBus.emit('V2NIMSettingService/setMute', n, o)
    })
  }
  getTeamMessageMuteMode(e, t) {
    var i
    return 'string' != typeof e || 'number' != typeof t
      ? 0
      : this.hasTeamService
      ? 3 &
        ((null ===
          (i = this.core.V2NIMTeamService.memberModel.getById(
            e,
            t,
            this.core.account
          )) || void 0 === i
          ? void 0
          : i.bits) || 0)
      : 0
  }
  getAllTeamMessageMuteMode(e) {
    if (!this.hasTeamService) return Promise.resolve({})
    var t = this.core.V2NIMTeamService.memberModel.chooseList(e),
      i = {}
    return (
      t.forEach((e) => {
        if (e.accountId === this.core.account) {
          var t = e.bits || 0
          i[e.teamId] = 3 & t
        }
      }),
      Promise.resolve(i)
    )
  }
  setP2PMessageMuteMode(e, t) {
    return Te(this, void 0, void 0, function* () {
      yield this.core.sendCmd('v2SetP2PMessageMuteMode', {
        accountId: e,
        muteMode: 1 === t,
      }),
        this.p2pMessageMuteModeChangeHandler(e, t)
    })
  }
  getP2PMessageMuteMode(e) {
    return this.hasUserService &&
      this.core.V2NIMUserService.model.muteList.has(e)
      ? 1
      : 0
  }
  getP2PMessageMuteList() {
    return this.hasUserService
      ? Promise.resolve(Array.from(this.core.V2NIMUserService.model.muteList))
      : Promise.resolve([])
  }
}
class La {
  constructor(e, t) {
    ;(this.core = e),
      (this.service = t),
      (this.push = t.push),
      (this.mute = t.mute)
  }
  setListener() {
    this.core.eventBus.on('V2NIMSettingService/updateBits', (e, t, i) => {
      this.service.emit('onTeamMessageMuteModeChanged', e, t, i)
    }),
      this.core.eventBus.on(
        'V2NIMLoginService/loginLifeCycleLoginSucc',
        this.push.setTokenAndBackgroundStateAfterLogin.bind(this.push)
      ),
      this.core.eventBus.on(
        'v2NIMUserService/updateMuteList',
        this.mute.p2pMessageMuteModeChangeHandler.bind(this.mute)
      ),
      this.core.eventBus.on(
        'forwardReceive/v2NIMSettingService/setP2PMessageMuteMode',
        this.mute.p2pMessageMuteModeChangeHandler.bind(this.mute)
      )
  }
}
class Da {
  constructor() {
    this.aiStreamMap = new Map()
  }
  reset() {
    this.aiStreamMap.clear()
  }
  getAiStream(e) {
    return this.aiStreamMap.get(e)
  }
  getAiStreamIsComplete(e) {
    var t = this.aiStreamMap.get(e)
    return !t || t.isComplete
  }
  getAiStreamQueryStatus(e) {
    var t = this.aiStreamMap.get(e)
    return t ? t.queryStatus : 0
  }
  upsertAiStreamChunks(e, t, i) {
    var r = this.aiStreamMap.get(e)
    return (
      r && !r.isComplete && (r.chunks[t] = i),
      r || { isComplete: !1, queryStatus: 0, chunks: [] }
    )
  }
  setAiStream(e, t, i = !1) {
    var r = this.aiStreamMap.get(e)
    return (
      r
        ? this.aiStreamMap.set(e, Object.assign(Object.assign({}, r), t))
        : i &&
          this.aiStreamMap.set(
            e,
            Object.assign({ isComplete: !1, queryStatus: 0, chunks: [] }, t)
          ),
      this.aiStreamMap.get(e) || { isComplete: !1, queryStatus: 0, chunks: [] }
    )
  }
  completeAiStream(e) {
    var t = this.aiStreamMap.get(e)
    t &&
      this.aiStreamMap.set(
        e,
        Object.assign(Object.assign({}, t), {
          isComplete: !0,
          queryStatus: 0,
          chunks: [],
          aiRAGs: void 0,
        })
      )
  }
}
var wa = {
    '4_26': 'v2AIChatNotify',
    '29_35': 'v2AIProxyModelCall',
    '29_36': 'v2AIGetUserList',
    '4_29': 'v2AIOnStreamMessageChunk',
    '4_30': 'v2AIChatStreamNotify',
    '29_38': 'v2AIStopModelStreamCall',
    '29_39': 'v2AIStreamQuery',
    '29_40': 'v2AIRegenMessage',
  },
  Ua = {
    accountId: 1,
    messages: { id: 2, converter: Mt, retConverter: _t },
    requestId: 3,
    content: { id: 4, converter: Mt, retConverter: _t },
    promptVariables: 5,
    modelConfigParams: { id: 6, converter: Mt, retConverter: _t },
    antispamBusinessId: 7,
    antispamEnabled: { id: 8, converter: yt },
    aiStream: { id: 9, converter: yt },
  },
  xa = {
    accountId: 1,
    name: 3,
    avatar: 4,
    sign: 5,
    gender: { id: 6, retType: 'number' },
    email: 7,
    birthday: 8,
    mobile: 9,
    serverExtension: 10,
    modelType: { id: 11, retType: 'number' },
    modelConfig: {
      id: 12,
      retConverter: (e) => {
        if ((e = _t(e))) {
          var t = Object.keys(e).reduce(
            (t, i) => (
              (t[
                (function (e) {
                  return (e = e || '')
                    .split('_')
                    .map((e, t) =>
                      0 === t ? e : e[0].toUpperCase() + e.slice(1)
                    )
                    .join('')
                })(i)
              ] = e[i]),
              t
            ),
            {}
          )
          if ('string' == typeof t.promptKeys)
            try {
              t.promptKeys = JSON.parse(t.promptKeys)
            } catch (e) {}
          return t
        }
      },
    },
    yunxinConfig: {
      id: 13,
      retConverter: (e) => {
        if ((e = _t(e))) return e
      },
    },
    valid: { id: 14, retType: 'boolean' },
    createTime: { id: 15, retType: 'number' },
    updateTime: { id: 16, retType: 'number' },
  }
function Fa(e) {
  try {
    var t = JSON.parse(e)
    return 'number' == typeof t.index
      ? {
          msg: t.msg || '',
          type: t.type,
          lastChunk: {
            content: t.msg,
            chunkTime: parseInt(t.timestamp),
            type: t.type,
            index: parseInt(t.index),
          },
        }
      : t
  } catch (e) {
    return
  }
}
function Ba(e) {
  try {
    var t = JSON.parse(e)
    return t && t.length > 0
      ? t.map((e) => ((e.description = e.desc), delete e.desc, e))
      : []
  } catch (e) {
    return []
  }
}
var $a = {
    code: { id: 1, retType: 'number' },
    accountId: 2,
    requestId: 3,
    content: { id: 4, retConverter: Fa },
    aiRAGs: { id: 5, retConverter: Ba },
    timestamp: { id: 6, retType: 'number' },
    aiStreamStatus: { id: 7, retType: 'number' },
    aiStream: { id: 8, retType: 'boolean' },
  },
  Ga = {
    serverId: 1,
    clientId: 2,
    type: { id: 3, retType: 'number' },
    from: 4,
    to: 5,
    aiAccount: 6,
    startIndex: { id: 7, retType: 'number' },
    endIndex: { id: 8, retType: 'number' },
    excludeIndex: { id: 9, converter: Mt },
  },
  ja = {
    serverId: 1,
    clientId: 2,
    type: { id: 3, retType: 'number' },
    content: { id: 4, retConverter: Fa },
    aiRAGs: { id: 6, retConverter: Ba },
  },
  qa = {
    v2AIChatNotify: {
      sid: 4,
      cid: 26,
      service: 'V2NIMAIService',
      response: [{ type: 'Property', name: 'data', reflectMapper: ft($a) }],
    },
    v2AIProxyModelCall: {
      sid: 29,
      cid: 35,
      service: 'V2NIMAIService',
      params: [{ type: 'Property', name: 'tag', reflectMapper: Ua }],
    },
    v2AIGetUserList: {
      sid: 29,
      cid: 36,
      service: 'V2NIMAIService',
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: { pageToken: 1, limit: 2 },
        },
      ],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(xa) },
        {
          type: 'Property',
          name: 'queryTag',
          reflectMapper: ft({
            hasMore: { id: 16, retType: 'boolean' },
            nextToken: 2,
          }),
        },
      ],
    },
    v2AIOnStreamMessageChunk: {
      sid: 4,
      cid: 29,
      service: 'V2NIMAIService',
      response: [{ type: 'Property', name: 'msg', reflectMapper: ft(Zr) }],
    },
    v2AIChatStreamNotify: {
      sid: 4,
      cid: 30,
      service: 'V2NIMAIService',
      response: [{ type: 'Property', name: 'data', reflectMapper: ft($a) }],
    },
    v2AIStopModelStreamCall: {
      sid: 29,
      cid: 38,
      service: 'V2NIMAIService',
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: {
            serverId: 1,
            clientId: 2,
            type: { id: 3, retType: 'number' },
            from: 4,
            to: 5,
            aiAccount: 6,
            opeType: { id: 7, retType: 'number' },
            updateContent: { id: 8 },
            messageTime: { id: 11, retType: 'number' },
          },
        },
      ],
    },
    v2AIStreamQuery: {
      sid: 29,
      cid: 39,
      service: 'V2NIMAIService',
      params: [{ type: 'Property', name: 'tag', reflectMapper: Ga }],
      response: [
        { type: 'PropertyArray', name: 'datas', reflectMapper: ft(ja) },
      ],
    },
    v2AIRegenMessage: {
      sid: 29,
      cid: 40,
      service: 'V2NIMAIService',
      params: [
        {
          type: 'Property',
          name: 'tag',
          reflectMapper: {
            fromAccount: 1,
            to: 2,
            aiAccount: 3,
            serverId: 4,
            clientId: 5,
            time: { id: 6, retType: 'number' },
            type: { id: 7, retType: 'number' },
            opeType: { id: 8, retType: 'number' },
            replyMsgFromAccount: 9,
            replyMsgToAccount: 10,
            replyMsgTime: { id: 11, retType: 'number' },
            replyMsgIdServer: 12,
            replyMsgIdClient: 13,
          },
        },
      ],
    },
  }
class Ha {
  constructor(e, t) {
    ;(this.core = e), (this.service = t), (this.logger = this.core.logger)
  }
  setListener() {}
  beforeEmit(e, ...t) {
    var i,
      r,
      s = `${this.service.name}::emit ${e.toString()}`
    if ('onProxyAIModelCall' === e) {
      var n = t[0]
      this.logger.log(
        `${s}`,
        `requestId:${n.requestId};aiStreamStatus:${n.aiStreamStatus}`
      )
    } else if ('onProxyAIModelStreamCall' === e) {
      var o = t[0]
      this.logger.log(
        `${s}`,
        `requestId:${o.requestId};chunkIndex:${
          null === (i = o.content) || void 0 === i ? void 0 : i.lastChunk.index
        };chunkTime:${
          null === (r = o.content) || void 0 === r
            ? void 0
            : r.lastChunk.chunkTime
        }`
      )
    } else this.logger.log(`${s}`, ...t)
  }
}
class Ya {
  constructor(e, t) {
    ;(this.core = e),
      (this.service = t),
      (this.model = t.model),
      (this.logger = this.core.logger)
  }
  v2AIChatNotifyHandler(e) {
    var t = e.content.data
    t &&
      t.requestId &&
      (this.model.completeAiStream(t.requestId),
      (t.aiStreamStatus = t.aiStreamStatus || 0),
      (t.aiStream = t.aiStream || !1),
      t.content && (t.content.msg = t.content.msg || ''),
      this.service.emit('onProxyAIModelCall', t))
  }
  v2AIChatStreamNotifyHandler(e) {
    var t = e.content.data
    if (t && t.requestId && t.content && t.content.msg) {
      var i = this.model.getAiStream(t.requestId)
      if (
        (i ||
          (i = this.model.setAiStream(
            t.requestId,
            { isComplete: !1, queryStatus: 0, chunks: [] },
            !0
          )),
        !i.isComplete)
      ) {
        var { lastChunk: r } = t.content
        if (
          (0 === r.index &&
            t.aiRAGs &&
            (i = this.model.setAiStream(t.requestId, { aiRAGs: t.aiRAGs })),
          this.logger.log(
            `V2AI::streamNotify requestId:${t.requestId};index:${r.index};cacheChunkLength:${i.chunks.length};chunkTime:${r.chunkTime}.`
          ),
          0 === i.chunks.length && r.index > 0)
        )
          this.logger.log(
            `V2AI::streamNotify requestId:${
              t.requestId
            };chunks missing 0,currentIdx:${r.index},needQuery:${
              0 === i.queryStatus
            }.`
          ),
            0 === i.queryStatus &&
              ((i = this.model.setAiStream(t.requestId, { queryStatus: 1 })),
              this.service._queryAiStream({
                clientId: t.requestId,
                type: 4,
                from: this.core.account,
                aiAccount: t.accountId,
                startIndex: 0,
                endIndex: r.index - 1,
              }))
        else if (
          r.index > 0 &&
          i.chunks.length > 0 &&
          void 0 === i.chunks[r.index - 1]
        ) {
          var s = i.chunks.reduce(
            (e, t, i) => (void 0 !== t && e.push(i), e),
            []
          )
          this.logger.log(
            `V2AI::streamNotify requestId:${
              t.requestId
            };out of order,currenIdx:${r.index},cacheIdx:[${s.join(
              ','
            )}],needReport:${!i.hasReported}.`
          ),
            i.hasReported ||
              ((i = this.model.setAiStream(t.requestId, { hasReported: !0 })),
              this.reportOutOfOrder({
                requestId: t.requestId,
                cacheIds: s,
                targetIndex: r.index,
                target: '4-30',
              }))
        }
        ;(i = this.model.upsertAiStreamChunks(t.requestId, r.index, r.content))
          .chunks[0] || 1 !== i.queryStatus
          ? ((t.content.msg = i.chunks.join('')),
            i.aiRAGs && (t.aiRAGs = i.aiRAGs),
            this.service.emit('onProxyAIModelStreamCall', t))
          : this.logger.log(
              `V2AI::streamNotify requestId:${t.requestId};chunks ignore index:${r.index};queryStatus:${i.queryStatus}.`
            )
      }
    }
  }
  v2AIOnStreamMessageChunkHandler(e) {
    var t,
      i,
      r,
      s = $r(this.core, e.content.msg)
    if (s.streamConfig && s.streamConfig.lastChunk) {
      var n = this.model.getAiStream(s.messageClientId)
      if (!n || !n.isComplete) {
        n ||
          (n = this.model.setAiStream(
            s.messageClientId,
            { isComplete: !1, queryStatus: 0, chunks: [] },
            !0
          ))
        var o = s.streamConfig.lastChunk,
          a = s.messageClientId
        if (
          (0 === o.index &&
            (null === (t = s.aiConfig) || void 0 === t ? void 0 : t.aiRAGs) &&
            (n = this.model.setAiStream(a, { aiRAGs: s.aiConfig.aiRAGs })),
          this.logger.log(
            `V2AI::aiStream requestId:${a};index:${o.index};cacheChunkLength:${n.chunks.length};chunkTime:${o.chunkTime}.`
          ),
          0 === n.chunks.length && o.index > 0)
        )
          this.logger.log(
            `V2AI::msg:aiStream requestId:${a};chunks missing 0,currentIdx:${
              o.index
            },needQuery:${0 === n.queryStatus}.`
          ),
            0 === n.queryStatus &&
              ((n = this.model.setAiStream(a, { queryStatus: 1 })),
              this.service._queryAiStream({
                serverId: s.messageServerId,
                clientId: a,
                type: (
                  null === (i = s.aiConfig) || void 0 === i
                    ? void 0
                    : i.accountId
                )
                  ? s.conversationType
                  : 5,
                from: s.senderId,
                to: s.receiverId,
                aiAccount:
                  null === (r = s.aiConfig) || void 0 === r
                    ? void 0
                    : r.accountId,
                startIndex: 0,
                endIndex: o.index - 1,
              }))
        else if (
          o.index > 0 &&
          n.chunks.length > 0 &&
          void 0 === n.chunks[o.index - 1]
        ) {
          var c = n.chunks.reduce(
            (e, t, i) => (void 0 !== t && e.push(i), e),
            []
          )
          this.logger.log(
            `V2AI::msg:aiStream requestId:${a};out of order,currenIdx:${
              o.index
            };streamCache.chunks:${JSON.stringify(n.chunks)},cacheIdx:[${c.join(
              ','
            )}],needReport:${!n.hasReported}.`
          ),
            n.hasReported ||
              ((n = this.model.setAiStream(a, { hasReported: !0 })),
              this.reportOutOfOrder({
                requestId: a,
                cacheIds: c,
                targetIndex: o.index,
                target: '4-29',
              }))
        }
        ;(n = this.model.upsertAiStreamChunks(a, o.index, o.content))
          .chunks[0] || 1 !== n.queryStatus
          ? ((s.streamConfig.status = -1),
            s.aiConfig && (s.aiConfig.aiStreamStatus = -1),
            (s.text = n.chunks.join('')),
            n.aiRAGs && s.aiConfig && (s.aiConfig.aiRAGs = n.aiRAGs),
            n.msg &&
              (s = Object.assign(
                {},
                n.msg,
                Object.assign(
                  {
                    text: s.text,
                    modifyTime: o.chunkTime,
                    modifyAccountId: n.msg.senderId,
                    streamConfig: s.streamConfig,
                  },
                  s.aiConfig ? { aiConfig: s.aiConfig } : {}
                )
              )),
            this.core.eventBus.emit('V2NIMAIService/receiveMessagesModified', [
              s,
            ]))
          : this.logger.log(
              `V2AI::msg:callStream requestId:${a};chunks ignore index:${o.index};queryStatus:${n.queryStatus}.`
            )
      }
    }
  }
  reportOutOfOrder(e) {
    this.core.reporter.reportTraceStart('exceptions', {
      user_id: this.core.account,
      trace_id: Ve(this.core, 'clientSocket.socket.sessionId'),
      action: 2,
      exception_service: 0,
    }),
      this.core.reporter.reportTraceUpdateV2('exceptions', {
        code: 0,
        context: e.requestId,
        description: `[${e.cacheIds.join(',')}],${e.targetIndex}`,
        operation_type: 2,
        target: e.target,
        net_connect: !0,
      }),
      this.core.reporter.reportTraceEnd('exceptions', 4)
  }
}
var Ka = {
    accountId: 1,
    uid: { id: 2, retType: 'number' },
    joinTime: { id: 3, retType: 'number' },
    expireTime: { id: 4, retType: 'number' },
    deviceId: 5,
  },
  Wa = {
    channelType: {
      id: 1,
      retType: 'number',
      retAccess: 'channelInfo.channelType',
    },
    channelName: { id: 2, retAccess: 'channelInfo.channelName' },
    channelId: { id: 3, retAccess: 'channelInfo.channelId' },
    createTime: {
      id: 4,
      retType: 'number',
      retAccess: 'channelInfo.createTime',
    },
    expireTime: {
      id: 5,
      retType: 'number',
      retAccess: 'channelInfo.expireTime',
    },
    creatorAccountId: { id: 6, retAccess: 'channelInfo.creatorAccountId' },
    channelExtension: { id: 7, retAccess: 'channelInfo.channelExtension' },
    channelValid: {
      id: 8,
      retDef: !0,
      retAccess: 'channelInfo.channelValid',
      retConverter: (e) => 1 !== parseInt(e),
    },
    fromAccid: 10,
    toAccid: 11,
    requestId: 12,
    pushEnabled: {
      id: 13,
      access: 'pushConfig.pushEnabled',
      converter: yt,
      retType: 'boolean',
    },
    pushTitle: { id: 14, access: 'pushConfig.pushTitle' },
    pushContent: { id: 15, access: 'pushConfig.pushContent' },
    pushPayload: { id: 16, access: 'pushConfig.pushPayload' },
    unreadEnabled: {
      id: 17,
      access: 'signallingConfig.unreadEnabled',
      converter: yt,
      retType: 'boolean',
      def: 1,
    },
    members: {
      id: 18,
      retAccess: 'members',
      retConverter: (e) => {
        try {
          return JSON.parse(e).map((e) => gt(e, ft(Ka)))
        } catch (e) {
          return
        }
      },
    },
    attach: { id: 19, retConverter: _t },
    serverExtension: { id: 20, retDef: '' },
    offlineEnabled: { id: 21, converter: yt, retType: 'boolean', def: 1 },
    msgId: 22,
    selfUid: { id: 23, retType: 'number', access: 'signallingConfig.selfUid' },
    time: { id: 24, retType: 'number' },
    rtcChannelName: { id: 25, access: 'rtcConfig.rtcChannelName' },
    rtcTokenTtl: {
      id: 26,
      retType: 'number',
      access: 'rtcConfig.rtcTokenTtl',
      retAccess: 'rtcInfo.rtcTokenTtl',
    },
    rtcToken: { id: 27, retAccess: 'rtcInfo.rtcToken' },
    rtcParams: {
      id: 28,
      access: 'rtcConfig.rtcParams',
      retAccess: 'rtcInfo.rtcParams',
    },
    callStatus: { id: 30, retType: 'number' },
  }
ft(Wa),
  ft(Wa),
  ft(Wa),
  ft(Wa),
  ft(Wa),
  ft(Wa),
  ft(Wa),
  ft(Wa),
  ft(Wa),
  ft(Wa),
  ft(Wa),
  ft(Wa),
  ft(Wa),
  ft(Wa)
var Ja,
  za = {
    '19_1': 'v2PublishEvent',
    '14_2': 'v2OnUserStatusChange',
    '19_3': 'v2SubscribeUserStatus',
    '19_4': 'v2UnsubscribeUserStatus',
    '19_5': 'v2UnsubscribeAllUserStatus',
    '19_6': 'v2QuerySubscribeEvent',
    '19_7': 'v2QueryAllSubscribeEvent',
    '14_9': 'v2OnMultiUserStatusChange',
  },
  Xa = 'V2NIMSubscriptionService',
  Qa = {
    eventType: { id: 1, retType: 'number' },
    statusType: { id: 2, retType: 'number' },
    uniqueId: 3,
    extension: 4,
    duration: { id: 5, retType: 'number' },
    onlineOnly: { id: 6, retType: 'boolean', converter: (e) => (e ? 1 : 2) },
    multiSync: { id: 7, retType: 'boolean', converter: yt },
    publishTime: { id: 10, retType: 'number' },
    serverId: 11,
    clientType: { id: 12, retType: 'number' },
    serverExtension: 13,
    extensionReceived: 14,
    accountId: 103,
  },
  Za = {
    eventType: { id: 1, retType: 'number' },
    duration: { id: 2, retType: 'number' },
    immediateSync: { id: 3, retType: 'number', converter: yt },
    accountId: 102,
    subscribeTime: { id: 105, retType: 'number' },
  },
  ec = {
    v2PublishEvent: {
      sid: 19,
      cid: 1,
      service: Xa,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Qa }],
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Qa) }],
    },
    v2OnUserStatusChange: {
      sid: 14,
      cid: 2,
      service: Xa,
      response: [{ type: 'Property', name: 'data', reflectMapper: ft(Qa) }],
    },
    v2SubscribeUserStatus: {
      sid: 19,
      cid: 3,
      service: Xa,
      params: [
        { type: 'Property', name: 'tag', reflectMapper: Za },
        { type: 'StrArray', name: 'accountIds' },
      ],
      response: [{ type: 'StrArray', name: 'failedList' }],
    },
    v2UnsubscribeUserStatus: {
      sid: 19,
      cid: 4,
      service: Xa,
      params: [
        { type: 'Property', name: 'tag', reflectMapper: Za },
        { type: 'StrArray', name: 'accountIds' },
      ],
      response: [{ type: 'StrArray', name: 'failedList' }],
    },
    v2UnsubscribeAllUserStatus: {
      sid: 19,
      cid: 5,
      service: Xa,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Za }],
    },
    v2QuerySubscribeEvent: {
      sid: 19,
      cid: 6,
      service: Xa,
      params: [
        { type: 'Property', name: 'tag', reflectMapper: Za },
        { type: 'StrArray', name: 'accountIds' },
      ],
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(Za) },
      ],
    },
    v2QueryAllSubscribeEvent: {
      sid: 19,
      cid: 7,
      service: Xa,
      params: [{ type: 'Property', name: 'tag', reflectMapper: Za }],
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(Za) },
      ],
    },
    v2OnMultiUserStatusChange: {
      sid: 14,
      cid: 9,
      service: Xa,
      response: [
        { type: 'PropertyArray', name: 'data', reflectMapper: ft(Qa) },
      ],
    },
  },
  tc = {
    accountIds: {
      type: 'array',
      required: !0,
      itemType: 'string',
      min: 1,
      max: 100,
    },
    duration: { type: 'number', required: !1, min: 60, max: 2592e3 },
    immediateSync: { type: 'boolean', required: !1 },
  },
  ic = {
    accountIds: { type: 'array', required: !1, itemType: 'string', max: 100 },
  },
  rc = {
    statusType: { type: 'number', required: !0, min: 1e4, max: 2147483647 },
    duration: { type: 'number', required: !1, min: 60, max: 604800 },
    extension: { type: 'jsonstr', required: !1 },
    onlineOnly: { type: 'boolean', required: !1 },
    multiSync: { type: 'boolean', required: !1 },
  }
!(function (e) {
  ;(e[(e.V2NIM_PROXY_REQUEST_METHOD_GET = 1)] =
    'V2NIM_PROXY_REQUEST_METHOD_GET'),
    (e[(e.V2NIM_PROXY_REQUEST_METHOD_POST = 2)] =
      'V2NIM_PROXY_REQUEST_METHOD_POST'),
    (e[(e.V2NIM_PROXY_REQUEST_METHOD_PUT = 3)] =
      'V2NIM_PROXY_REQUEST_METHOD_PUT'),
    (e[(e.V2NIM_PROXY_REQUEST_METHOD_DELETE = 4)] =
      'V2NIM_PROXY_REQUEST_METHOD_DELETE')
})(Ja || (Ja = {}))
ft({ zone: 1, path: 2, method: 3, header: 4, body: 5 }),
  ft({ fromAccountId: 1, body: 2, time: { id: 3, retType: 'number' } }),
  Ja.V2NIM_PROXY_REQUEST_METHOD_DELETE,
  Ja.V2NIM_PROXY_REQUEST_METHOD_GET,
  Ja.V2NIM_PROXY_REQUEST_METHOD_POST,
  Ja.V2NIM_PROXY_REQUEST_METHOD_PUT
var sc = ct
sc.registerService(
  class extends ni {
    constructor(e, t = {}) {
      var i
      super('V2NIMLoginService', e),
        (this.account = ''),
        (this.previousLoginAccount = ''),
        (this.token = ''),
        (this.deviceId = ''),
        (this.clientSession = ''),
        (this.processId = ''),
        (this.kickedDetail = null),
        (this.binaryWebsocket = !0),
        this.core._registerDep(ui, 'misc'),
        vt({ cmdMap: Nt, cmdConfig: Ot }),
        'v2' === e.options.apiVersion &&
          (vt({ cmdMap: At, cmdConfig: bt }), (this.core.auth = this)),
        (this.previousLoginManager = new He()),
        (this.doLoginStepsManager = new He()),
        (this.loginTimerManager = new _e()),
        (this.loginOption = Object.assign({}, fi)),
        (this.config = {
          lbsUrls: vi,
          linkUrl: 'weblink.netease.im:443',
          linkSSL: !0,
        }),
        this.setOptions(t),
        (e.V2NIMLoginService = this),
        !1 !== this.core.options.binaryWebsocket &&
        'function' == typeof Uint8Array
          ? ((this.binaryWebsocket = !0), (i = new Wt(this.core)))
          : ((this.binaryWebsocket = !1), (i = new ei(this.core))),
        (this.clientSocket = i),
        'v2' === this.core.options.apiVersion && (this.core.clientSocket = i),
        (this.lifeCycle = new oi(e)),
        (this.reconnect = new ti(e)),
        (this.lbs = new ri(e)),
        (this.authenticator = new si(e)),
        (this.dataSync = new ai(e))
    }
    get hasSettingService() {
      var e
      return !!(null === (e = this.core.V2NIMSettingService) || void 0 === e
        ? void 0
        : e.name)
    }
    setOptions(e) {
      var t, i, r
      ye(
        {
          lbsUrls: { type: 'array', itemType: 'string', min: 1, required: !1 },
          linkUrl: { type: 'string', allowEmpty: !1, required: !1 },
        },
        e,
        '',
        !0
      ),
        (this.config = we(this.config, e)),
        null ===
          (i =
            null === (t = this.core.clientSocket) || void 0 === t
              ? void 0
              : t.setLinkSSL) ||
          void 0 === i ||
          i.call(t, null === (r = this.config.linkSSL) || void 0 === r || r)
      var s = '',
        n = ''
      this.config.isFixedDeviceId
        ? ((s = Ae.localStorage.getItem('__NIM_DEVC_ID__') || Le()),
          (n = Ae.localStorage.getItem('__NIM_CLIENT_SESSION_ID__') || Le()),
          Ae.localStorage.setItem('__NIM_DEVC_ID__', s),
          Ae.localStorage.setItem('__NIM_CLIENT_SESSION_ID__', n))
        : ((s = Le()), (n = Le())),
        (this.deviceId = s),
        (this.clientSession = n),
        this.core.reporter.setConfig({ common: { dev_id: s } })
    }
    reset() {
      ;(this.account = ''),
        (this.token = ''),
        (this.processId = ''),
        this.lbs.reset(),
        this.reconnect.reset(),
        this.authenticator.reset(),
        this.authenticator.clearLastLoginClient(),
        this.dataSync.reset()
    }
    login(e, t, i = {}) {
      return Te(this, void 0, void 0, function* () {
        this._checkApiVersion()
        var r = Ae.getSystemInfo() || {},
          s = r.os ? r.os.toLowerCase() : ''
        if (
          'React Native' === Ae.platform &&
          'android' === s &&
          this.hasSettingService &&
          Ve(this.core.V2NIMSettingService, 'push.offlinePushPlugin')
        )
          try {
            this.deviceInfo =
              yield this.core.V2NIMSettingService.push.getRNDeviceInfo()
          } catch (e) {
            this.logger.error(e)
          }
        if ('string' != typeof e || '' === e.trim())
          throw new me({ detail: { reason: 'Account must be string' } })
        if ((ye(gi, i, '', !0), 0 === (i = we(fi, i)).authType && !t))
          throw new me({
            detail: { reason: 'When authType is 0, token cannot be empty' },
          })
        if (
          ('' !== this.previousLoginAccount &&
            this.previousLoginAccount !== e &&
            this.core._clearModuleData(),
          0 === this.getLoginStatus())
        )
          this.logger.log(`V2NIMLoginService::login:allowLogin:${e}`, i)
        else {
          if (1 === this.getLoginStatus()) return this.smoothForLogined(e, t, i)
          if (2 === this.getLoginStatus())
            return this.smoothForLogining(e, t, i)
        }
        ;(this.account = e),
          (this.previousLoginAccount = e),
          (this.token = t),
          (this.processId = Le()),
          (this.loginOption = we(fi, i)),
          (this.kickedDetail = null),
          this.loginTimerManager.destroy(),
          this.loginTimerManager.addTimer(
            () => {
              var e = new he({
                code: de.V2NIM_ERROR_CODE_TIMEOUT,
                detail: { reason: 'Login API timeout' },
              })
              this.doLoginStepsManager.clear(e),
                this.previousLoginManager.clear(e),
                (this.originLoginPromise = void 0),
                this.lifeCycle.processEvent('exited', e)
            },
            this.loginOption.timeout > 0 ? this.loginOption.timeout : 6e4,
            1
          )
        try {
          yield this.multiTryDoLogin(), this.loginTimerManager.destroy()
        } catch (e) {
          throw (this.loginTimerManager.destroy(), e)
        }
      })
    }
    setAppVisibility(e) {
      this.reconnect.setAppVisibility(e)
    }
    getChatroomLinkAddress(e, t) {
      return Te(this, void 0, void 0, function* () {
        return (
          ye(
            {
              roomId: {
                type: 'string',
                regExp: /^\d+$/,
                required: !0,
                allowEmpty: !1,
              },
              miniProgram: { type: 'boolean', required: !1 },
            },
            { roomId: e, miniProgram: t },
            '',
            !0
          ),
          (t = void 0 === t ? De() : t),
          (yield this.clientSocket.sendCmd('v2GetChatroomLinkAddress', {
            roomId: e,
            miniProgram: t,
          })).content.linkAddress
        )
      })
    }
    multiTryDoLogin(e) {
      return Te(this, void 0, void 0, function* () {
        for (
          var t = new he({
              code: de.V2NIM_ERROR_CODE_INTERNAL,
              detail: { reason: 'loginFailed' },
            }),
            i = 0;
          i <= this.loginOption.retryCount;
          i++
        ) {
          var r = `V2NIMLoginService::times of login try: ${i}`
          i > 0 ? this.logger.warn(r) : this.logger.log(r)
          try {
            ;(this.originLoginPromise = e || this.doLogin(!1)), (e = void 0)
            var s = yield this.previousLoginManager.add(this.originLoginPromise)
            return (
              this.core.reporter.reportTraceEnd('login', !0),
              this.doLoginStepsManager.clear(),
              this.previousLoginManager.clear(),
              (this.originLoginPromise = void 0),
              s
            )
          } catch (e) {
            if (
              ((t = e || t),
              this.logger.error(
                `V2NIMLoginService::login failed, times of login try: ${i}, err.code: ${
                  null == t ? void 0 : t.code
                }, err.message: "${null == t ? void 0 : t.message}"`
              ),
              t.code !== de.V2NIM_ERROR_CODE_CANCELLED &&
                this.core.reporter.reportTraceEnd('login', !1),
              this.reconnect.clearReconnectTimer(),
              this.checkLoginTerminalCode(t && t.code))
            )
              throw (this.lifeCycle.processEvent('exited', t), t)
            t && 399 === t.code && this.lbs.reset()
          }
        }
        throw (this.lifeCycle.processEvent('exited', t), t)
      })
    }
    doLogin(e) {
      var t, i
      return Te(this, void 0, void 0, function* () {
        var r =
          !!e || this.authenticator.checkAutoLogin(this.loginOption.forceMode)
        this.core.reporter.reportTraceCancel('login'),
          this.core.reporter.reportTraceStart(
            'login',
            r
              ? {
                  user_id: this.account,
                  action: 'auto_login',
                  process_id: this.processId,
                  binary_websocket: this.binaryWebsocket,
                }
              : {
                  user_id: this.account,
                  action: 'manual_login',
                  process_id: this.processId,
                  binary_websocket: this.binaryWebsocket,
                }
          ),
          this.core.reporter.reportTraceUpdateV2(
            'login',
            {
              code: 0,
              description: JSON.stringify(this.loginOption),
              operation_type: 'conf_init',
              succeed: !0,
              duration: 0,
              target: '',
            },
            { asyncParams: Ae.net.getNetworkStatus() }
          )
        var s = yield this.doLoginStepsManager.add(this.lbs.getLbsInfos())
        yield this.doLoginStepsManager.add(this.clientSocket.connect(s, e))
        var n = yield this.doLoginStepsManager.add(
          this.authenticator.verifyAuthentication(r)
        )
        if (
          ((this.processId = Le()),
          this.clientSocket.resetSocketConfig(),
          this.reconnect.reset(),
          this.dataSync.reset(),
          this.lifeCycle.processEvent(
            'loginSucc',
            void 0,
            Object.assign(Object.assign({}, n), { isReconnect: e })
          ),
          this.clientSocket.ping(),
          this.core.abtest.abtRequest(),
          'function' ==
            typeof (null === (t = this.core.V2NIMClientAntispamUtil) ||
            void 0 === t
              ? void 0
              : t.downloadLocalAntiSpamVocabs) &&
            this.core.V2NIMClientAntispamUtil.downloadLocalAntiSpamVocabs(),
          'function' ==
            typeof (null === (i = this.core.cloudStorage) || void 0 === i
              ? void 0
              : i.init))
        )
          try {
            yield this.core.cloudStorage.init(n.timestamp)
          } catch (e) {
            this.logger.warn('doLogin::cloudStorage init error', e)
          }
        return n
      })
    }
    smoothForLogined(e, t, i) {
      return Te(this, void 0, void 0, function* () {
        var r = this.checkIsSameLogin(e, t, i)
        return (
          this.logger.warn(
            `V2NIMLoginService::smoothForLogined:Logined, isSameLogin ${r}`
          ),
          r ? void 0 : (yield this.logout(), this.login(e, t, i))
        )
      })
    }
    smoothForLogining(e, t, i) {
      return Te(this, void 0, void 0, function* () {
        var r = this.checkIsSameLogin(e, t, i)
        if (
          (this.logger.warn(
            `V2NIMLoginService::smoothForLogining:Logining progress exists, abort the previous login attempt and start next attempt, isSameLogin ${r}`
          ),
          this.previousLoginManager.clear(),
          this.reconnect.reset(),
          (this.account = e),
          (this.previousLoginAccount = e),
          (this.token = t),
          (this.loginOption = we(this.loginOption, i)),
          !r)
        )
          return (
            this.doLoginStepsManager.clear(),
            this.clientSocket.doDisconnect(xt.ACTIVE, 'Aborted'),
            this.reset(),
            this.lifeCycle.processEvent('logout'),
            yield Promise.resolve(),
            this.login(e, t, i)
          )
        if (!this.originLoginPromise)
          throw new he({
            code: de.V2NIM_ERROR_CODE_INTERNAL,
            detail: { reason: 'NoPreviousLoginExists' },
          })
        this.reconnect.reset(),
          yield Promise.resolve(),
          yield this.multiTryDoLogin(this.originLoginPromise)
      })
    }
    checkIsSameLogin(e, t, i) {
      return (
        this.account === e &&
        this.loginOption.authType === i.authType &&
        (0 !== i.authType || this.token === t)
      )
    }
    logout() {
      return Te(this, void 0, void 0, function* () {
        this._checkApiVersion(),
          this.doLoginStepsManager.clear(),
          this.previousLoginManager.clear(),
          this.loginTimerManager.destroy(),
          (this.originLoginPromise = void 0)
        var e = this.getConnectStatus(),
          t = this.getLoginStatus()
        switch (t) {
          case 1:
            try {
              yield this.clientSocket.sendCmd('v2Logout', void 0, {
                timeout: 1e3,
              }),
                this.clientSocket.doDisconnect(
                  xt.ACTIVE,
                  'UserActiveDisconnect'
                ),
                this.core._clearModuleData(),
                this.lifeCycle.processEvent('logout')
            } catch (e) {
              this.logger.error('Instance::disconnect sendCmd:logout error', e),
                this.clientSocket.doDisconnect(
                  xt.ACTIVE,
                  'UserActiveDisconnect'
                ),
                this.core._clearModuleData(),
                this.lifeCycle.processEvent('logout')
            }
            break
          case 2:
          case 3:
            this.clientSocket.doDisconnect(xt.ACTIVE, 'UserActiveDisconnect'),
              this.core._clearModuleData(),
              this.lifeCycle.processEvent('logout')
            break
          case 0:
            throw (
              (this.core._clearModuleData(),
              new he({
                code: de.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                  reason: `Illegal logout. loginStatus ${t}. connectStatus ${e}`,
                },
              }))
            )
          default:
            throw (
              (this.core._clearModuleData(),
              new he({
                code: de.V2NIM_ERROR_CODE_ILLEGAL_STATE,
                detail: {
                  reason: `Illegal logout. illegal status: loginStatus ${t}. connectStatus ${e}`,
                },
              }))
            )
        }
      })
    }
    getConnectStatus() {
      return this.lifeCycle.getConnectStatus()
    }
    getLoginStatus() {
      return this.lifeCycle.getLoginStatus()
    }
    getLoginUser() {
      return this.account
    }
    getLoginClients() {
      return (function (e, t) {
        ;(e = e || []), (t = t || '')
        for (var i = [], r = [], s = 0; s < e.length; s++) {
          var n = e[s][t]
          ;-1 === r.indexOf(n) && (r.push(n), i.push(e[s]))
        }
        return i
      })(this.authenticator.loginClients, 'clientId').map((e) =>
        mi(e, [
          'type',
          'os',
          'timestamp',
          'customTag',
          'customClientType',
          'clientId',
          'clientIP',
        ])
      )
    }
    getCurrentLoginClient() {
      var e
      if (
        null === (e = this.authenticator.loginClientOfThisConnection) ||
        void 0 === e
          ? void 0
          : e.clientId
      )
        return mi(this.authenticator.loginClientOfThisConnection, [
          'type',
          'os',
          'timestamp',
          'customTag',
          'customClientType',
          'clientId',
          'clientIP',
        ])
    }
    getDataSync() {
      var e = this.dataSync.datas
      return e && e.length > 0
        ? e.map((e) => ({ type: e.type, state: e.state }))
        : null
    }
    setReconnectDelayProvider(e) {
      this.reconnect._setReconnectDelayProvider(e)
    }
    kickOffline(e) {
      return Te(this, void 0, void 0, function* () {
        if (
          (this._checkApiVersion(),
          ye({ clientId: { type: 'string', allowEmpty: !1 } }, e, '', !0),
          0 ===
            Ve(
              yield this.clientSocket.sendCmd('v2KickOffline', {
                clientIds: [e.clientId],
              }),
              'content.clientIds.length'
            ))
        )
          throw new he({ code: de.V2NIM_ERROR_CODE_REQUEST_FAILED })
      })
    }
    getKickedOfflineDetail() {
      return this.kickedDetail
    }
    checkLoginTerminalCode(e) {
      return this.authenticator.checkLoginTerminalCode(e)
    }
    checkIllegalState() {
      if (!this.getLoginUser())
        throw new he({ code: de.V2NIM_ERROR_CODE_ILLEGAL_STATE })
    }
    _checkApiVersion() {
      if ('v2' !== this.core.options.apiVersion)
        throw new he({
          code: de.V2NIM_ERROR_CODE_MISUSE,
          detail: { reason: 'apiVersion is not "v2"' },
        })
    }
    v2LoginHandler(e) {
      if (e.error)
        throw (this.clientSocket.doDisconnect(xt.ACTIVE, e.error), e.error)
      return e
    }
    v2LoginClientChangeHandler(e) {
      this.authenticator.changeLoginClient(
        parseInt(e.content.state),
        e.content.datas
      )
    }
    nimLoginClientChangeHandler(e) {
      this.authenticator.changeLoginClient(
        parseInt(e.content.state),
        e.content.datas
      )
    }
    qchatLoginClientChangeHandler(e) {
      var t = parseInt(e.content.state)
      ;(t = 1 === t ? 2 : 3),
        this.authenticator.changeLoginClient(t, [e.content.data])
    }
    v2BeKickedHandler(e) {
      if (e.error) this.core.logger.error('v2BeKickedHandler error, ', e.error)
      else {
        var t = (function (e) {
          return Et(
            {
              reason: { type: 'number' },
              clientType: { type: 'number' },
              customClientType: { type: 'number' },
            },
            e
          )
        })(e.content)
        this.core.logger.warn('v2Bekicked::', t),
          (this.kickedDetail = t),
          this.clientSocket.doDisconnect(xt.KICKED, t),
          this.core._clearModuleData(),
          this.lifeCycle.processEvent(
            'kicked',
            new he({
              code: de.V2NIM_ERROR_CODE_DISCONNECT,
              detail: { reason: 'disconnect due to kicked' },
            }),
            t
          ),
          this.emit('onKickedOffline', t)
      }
    }
    emit(e, ...t) {
      var i = `${this.name}::emit ${e.toString()}`
      if (
        'onLoginFailed' === e ||
        'onDisconnected' === e ||
        'onConnectFailed' === e
      ) {
        var r = t[0]
        this.logger.log(`${i}`, r.toString())
      } else if ('onDataSync' === e) {
        var s = t[2]
        this.logger.log(`${i}`, t[0], t[1], s && s.toString())
      } else this.logger.log(`${i}`, ...t)
      return super.emit(e, ...t)
    }
  },
  'V2NIMLoginService'
),
  sc.registerService(
    class extends ni {
      constructor(e) {
        super('V2NIMSyncService', e),
          (this.teamKey = [
            'teams',
            'superTeams',
            'myTeamMembers',
            'mySuperTeamMembers',
          ]),
          (this.config = {}),
          (this.timetags = {}),
          'v2' === this.core.options.apiVersion &&
            (this.initEventListeners(),
            vt({ cmdMap: yi, cmdConfig: Ii }),
            this.setListener())
      }
      reset() {
        this.timetags = {}
      }
      setListener() {
        this.core.eventBus.on('V2NIMSync/updateTimetag', (e) => {
          Object.keys(e).forEach((t) => {
            e[t] > (this.timetags[t] || 0) && (this.timetags[t] = e[t])
          })
        })
      }
      setOptions(e) {
        var t = this.core,
          i = !(
            !t.V2NIMConversationService.name &&
            !t.V2NIMLocalConversationService.name
          )
        return (
          (this.config = Object.assign(
            {
              myInfo: !!t.V2NIMUserService.name,
              offlineMsgs: !!t.V2NIMMessageService.name,
              roamingMsgs: !!t.V2NIMMessageService.name,
              relations: !!t.V2NIMUserService.name,
              friends: !!t.V2NIMFriendService.name,
              friendUsers: !!t.V2NIMUserService.name,
              msgReceipts: !!t.V2NIMMessageService.name,
              broadcastMsgs: !!t.V2NIMNotificationService.name,
              recallMsg: !!t.V2NIMMessageService.name,
              sessionAck: i,
              superTeamSessionAck: i,
              stickTopSessions: i,
              superTeamRoamingMsgs: !!t.V2NIMTeamService.name,
              deleteSuperTeamMsg: !!t.V2NIMTeamService.name,
              deleteSelfMsgs: !!t.V2NIMMessageService.name,
              sessionHistoryMsgsDelete: !!t.V2NIMMessageService.name,
              avSignal: !!t.V2NIMSignallingService.name,
              teams: !!t.V2NIMTeamService.name,
              superTeams: !!t.V2NIMTeamService.name,
              myTeamMembers: !!t.V2NIMTeamService.name,
              mySuperTeamMembers: !!t.V2NIMTeamService.name,
              donnop: !!t.V2NIMSettingService.name,
              p2pTeamModifyMessage: !!t.V2NIMMessageService.name,
              superTeamModifyMessage: !!t.V2NIMMessageService.name,
            },
            e
          )),
          this.config
        )
      }
      doBasicSync() {
        return Te(this, void 0, void 0, function* () {
          var e = Object.keys(this.config).filter(
              (e) => !this.teamKey.includes(e) && this.config[e]
            ),
            t = this.genSyncParams(e)
          this.logger.log('V2Sync:basic', t)
          var i = (yield this.core.clientSocket.sendCmd('v2NIMSync', {
            tag: t,
          })).content.timetag
          this.setTimetags(
            i,
            e.filter((e) => 'broadcastMsgs' !== e)
          ),
            yield this.delaySyncDone(),
            yield this.handleImmediate(),
            this.core.logger.log('sync::basic sync complete in', i)
        })
      }
      doTeamSync() {
        return Te(this, void 0, void 0, function* () {
          var e = this.teamKey.filter((e) => this.config[e])
          if (0 !== e.length) {
            var t = this.genSyncParams(e)
            this.core.eventBus.emit('V2NIMTeamService/onSyncStarted'),
              this.logger.log('V2Sync:team', t)
            var i = null
            try {
              i = yield this.core.clientSocket.sendCmd('v2NIMSync', { tag: t })
            } catch (e) {
              throw (
                (this.core.eventBus.emit('V2NIMTeamService/onSyncFailed', e), e)
              )
            }
            this.core.eventBus.emit('V2NIMTeamService/onSyncFinished')
            var r = i.content.timetag
            this.setTimetags(r, this.teamKey),
              this.core.logger.log('sync::team sync complete in', r)
          }
        })
      }
      doQchatSync() {
        return Te(this, void 0, void 0, function* () {
          var e = yield this.core.clientSocket.sendCmd('v2QChatSync', {
            tag: { systemNotification: 0 },
          })
          this.core.logger.log(
            'sync::qchat sync complete in',
            e.content.timetag
          )
        })
      }
      doSync() {
        return Te(this, void 0, void 0, function* () {
          var e = Ve(
            this.core,
            'V2NIMLoginService.authenticator.loginClientOfThisConnection.loginType'
          )
          if (void 0 !== e) {
            if (
              (this.logger.log(`sync::doSync:type ${e}`),
              this.core.V2NIMLoginService.dataSync.switchDataSync({
                type: 1,
                state: 2,
                subType: 'mainSync',
              }),
              1 === e)
            )
              try {
                yield this.doBasicSync(), yield this.doTeamSync()
              } catch (e) {
                return void this.doSyncComplete(e)
              }
            else if (2 === e)
              try {
                yield this.doQchatSync()
              } catch (e) {
                return void this.doSyncComplete(e)
              }
            else {
              if (3 !== e) return
              try {
                yield this.doBasicSync(),
                  yield this.doTeamSync(),
                  yield this.doQchatSync()
              } catch (e) {
                return void this.doSyncComplete(e)
              }
            }
            this.doSyncComplete()
          } else this.logger.warn('sync::doSync: no loginType, stop sync')
        })
      }
      doSyncComplete(e) {
        e && this.core.logger.log('sync::doSync complete but got error', e),
          this.core.V2NIMLoginService.dataSync.switchDataSync({
            type: 1,
            state: 3,
            error: e,
            subType: 'mainSync',
          })
      }
      initEventListeners() {
        this.core.eventBus.on(
          'V2NIMLoginService/loginLifeCycleLoginSucc',
          () => {
            this.doSync()
          }
        )
      }
      genSyncParams(e) {
        return e.reduce((e, t) => {
          var i = t
          return (e[i] = this.timetags[i] || 0), e
        }, {})
      }
      setTimetags(e, t) {
        t.forEach((t) => {
          this.timetags[t] = e
        })
      }
      handleImmediate() {
        return (
          this.core.session &&
            this.core.session.onSyncDone &&
            this.core.session.onSyncDone(),
          Promise.resolve()
        )
      }
      delaySyncDone() {
        var { hostEnvEnum: e } = Ae.getSystemInfo()
        return 102 === e
          ? (this.core.logger.log(
              'sync: emit ALIAPP sycnHandler, handle later'
            ),
            new Promise((e) => {
              setTimeout(() => {
                e()
              }, 100)
            }))
          : Promise.resolve()
      }
    },
    'V2NIMSyncService'
  ),
  Ce(Ae, {
    setLogger: _i,
    platform: 'UNIAPP',
    localStorage: Ni,
    request: bi,
    WebSocket: Ui,
    uploadFile: Di,
    getFileUploadInformation: wi,
    getSystemInfo: Li,
    net: Oi,
    logStorage: Ai,
  }),
  sc.registerService(Ys, 'V2NIMMessageService'),
  sc.registerService(xn, 'V2NIMConversationService'),
  sc.registerService(
    class extends ni {
      constructor(e) {
        super('V2NIMAIService', e),
          (this.model = new Da()),
          (this.event = new Ha(this.core, this)),
          (this.handler = new Ya(this.core, this)),
          vt({ cmdMap: wa, cmdConfig: qa })
      }
      setListener() {
        this.event.setListener()
      }
      reset() {
        this.model.reset()
      }
      emit(e, ...t) {
        return this.event.beforeEmit(e, ...t), super.emit(e, ...t)
      }
      getAIUserList() {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            (yield this.core.sendCmd('v2AIGetUserList', { tag: {} })).content
              .datas
          )
        })
      }
      proxyAIModelCall(e) {
        return Te(this, void 0, void 0, function* () {
          if ((ye($i, e, '', !0), this.model.getAiStream(e.requestId)))
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              desc: 'Same requestId',
              detail: { rawData: e.requestId },
            })
          this.model.setAiStream(
            e.requestId,
            { isComplete: !1, queryStatus: 0, chunks: [] },
            !0
          ),
            yield this.core.sendCmd('v2AIProxyModelCall', { tag: e })
        })
      }
      stopAIModelStreamCall(e) {
        return Te(this, void 0, void 0, function* () {
          ye(Gi, e, '', !0),
            yield this.core.sendCmd('v2AIStopModelStreamCall', {
              tag: {
                clientId: e.requestId,
                aiAccount: e.accountId,
                type: 4,
                from: this.core.account,
              },
            }),
            this.logger.log(`V2AI::streamCallStop,requestId:${e.requestId}`),
            this.model.completeAiStream(e.requestId)
        })
      }
      _queryAiStream(e) {
        return Te(this, void 0, void 0, function* () {
          this.model.setAiStream(e.clientId, { queryStatus: 1 })
          try {
            var t = yield this.core.sendCmd('v2AIStreamQuery', { tag: e })
            this.model.setAiStream(e.clientId, { queryStatus: 2 })
            var i = t.content.datas
            if (!(i && i.length > 0)) return
            i.forEach((e) => {
              var t = e.clientId,
                i = this.model.getAiStream(t)
              if (
                i &&
                (!i || !i.isComplete) &&
                e.content &&
                e.content.lastChunk
              ) {
                var r = e.content.lastChunk
                this.model.upsertAiStreamChunks(t, r.index, r.content),
                  0 === r.index &&
                    e.aiRAGs &&
                    this.model.setAiStream(t, { aiRAGs: e.aiRAGs }),
                  this.logger.log(
                    `V2AI::queryAiStream requestId:${t};index:${r.index};cacheChunkLength:${i.chunks.length};chunkTime:${r.chunkTime}.`
                  )
              }
            })
          } catch (t) {
            this.logger.warn(
              `V2AI::queryAiStream requestId:${e.clientId};error:`,
              t
            ),
              this.model.setAiStream(e.clientId, { queryStatus: 2 })
          }
        })
      }
    },
    'V2NIMAIService'
  ),
  sc.registerService(
    class extends ni {
      constructor(e, t = {}) {
        super('V2NIMLocalConversationService', e),
          (this.config = {}),
          (this.model = new Xs()),
          (this.unread = new on(this.core, this)),
          (this.compute = new un(this.core, this)),
          (this.event = new gn(this.core, this)),
          (this.handler = new mn(this.core, this)),
          this.core._registerDep(xi, 'V2NIMConversationIdUtil'),
          this.core._registerDep(Ys, 'V2NIMMessageService'),
          'v2' === this.core.options.apiVersion &&
            (vt({ cmdMap: Zs, cmdConfig: sn }),
            this.setOptions(t),
            this.setListener())
      }
      setOptions(e) {
        this.config = Object.assign(this.config, e)
      }
      setListener() {
        this.event.setListener()
      }
      reset() {
        this.model.reset(), this.unread.reset()
      }
      emit(e, ...t) {
        return this.event.beforeEmit(e, ...t), super.emit(e, ...t)
      }
      getConversationList(e, t) {
        this.checkV2(),
          ye({ offset: { type: 'number', min: 0 } }, { offset: e }, '', !0),
          ye({ limit: { type: 'number', min: 1 } }, { limit: t }, '', !0),
          this.core.V2NIMLoginService.checkIllegalState()
        var i = this.model.getByOption(e, t, {})
        return (
          (i.conversationList = i.conversationList.map((e) =>
            this.compute.computeFromExternal(e)
          )),
          Promise.resolve(i)
        )
      }
      getConversationListByOption(e, t, i) {
        this.checkV2(),
          ye({ offset: { type: 'number', min: 0 } }, { offset: e }, '', !0),
          ye({ limit: { type: 'number', min: 1 } }, { limit: t }, '', !0),
          ye(
            {
              conversationTypes: {
                type: 'array',
                itemType: 'number',
                required: !1,
              },
              onlyUnread: { type: 'boolean', required: !1 },
            },
            i,
            'option',
            !0
          ),
          this.core.V2NIMLoginService.checkIllegalState()
        var r = this.model.getByOption(e, t, i)
        return (
          (r.conversationList = r.conversationList.map((e) =>
            this.compute.computeFromExternal(e)
          )),
          Promise.resolve(r)
        )
      }
      getConversation(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(), Me(this.core.account, e)
          var t = this.model.getById(e)
          if (t) return this.compute.computeFromExternal(t)
          throw new he({ code: de.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST })
        })
      }
      getConversationListByIds(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            ye(
              {
                conversationIds: { type: 'array', itemType: 'string', min: 1 },
              },
              { conversationIds: e },
              '',
              !0
            ),
            this.core.V2NIMLoginService.checkIllegalState(),
            e
              .map((e) => this.model.getById(e))
              .filter((e) => !!e)
              .map((e) => this.compute.computeFromExternal(e))
          )
        })
      }
      createConversation(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(), Me(this.core.account, e)
          var t = this.model.getById(e)
          if (t) return this.compute.computeFromExternal(t)
          var i = this.compute.computeConvByMsgsCache(e, {
            updateTime: this.core.timeOrigin.getNTPTime(),
          })
          ;(i = this.compute.computeConvWithUnread(i)),
            (i = this.compute.computeFromExternal(i)),
            this.model.upsert(i)
          var r = this.model.getById(e)
          return this.triggerConversationCreated(r), r
        })
      }
      deleteConversation(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            Me(this.core.account, e),
            ye(
              { clearMessage: { type: 'boolean', required: !1 } },
              { clearMessage: t },
              '',
              !0
            ),
            yield this.unread.markConversationRead(e)
          var i = this.model.deleteById(e)
          if (!i) throw new he({ code: de.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST })
          t && this.core.V2NIMMessageService.model.deleteMessages(e),
            !!(i && i.unreadCount > 0) && this.unread.digestUnreadCountChange(),
            this.emit('onConversationDeleted', [e])
        })
      }
      deleteConversationListByIds(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(
              {
                conversationIds: { type: 'array', itemType: 'string', min: 1 },
              },
              { conversationIds: e },
              '',
              !0
            ),
            ye(
              { clearMessage: { type: 'boolean', required: !1 } },
              { clearMessage: t },
              '',
              !0
            ),
            yield this.unread.markMultiConversationRead(e)
          var i = !1
          return (
            e.forEach((e) => {
              t && this.core.V2NIMMessageService.model.deleteMessages(e),
                this.model.deleteById(e) && (i = !0)
            }),
            i && this.unread.digestUnreadCountChange(),
            this.emit('onConversationDeleted', e),
            []
          )
        })
      }
      getStickTopConversationList() {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            this.model.getStickTopList()
          )
        })
      }
      stickTopConversation(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            Me(this.core.account, e),
            ye({ stickTop: { type: 'boolean' } }, { stickTop: t }, '', !0)
          var i = this.model.getById(e)
          if ((null == i ? void 0 : i.stickTop) !== t) {
            var r =
                this.core.V2NIMConversationIdUtil.parseConversationTargetId(e),
              s = this.core.V2NIMConversationIdUtil.parseConversationType(e),
              n = yield this.core.sendCmd(
                t ? 'v2LocalConvStickTopAdd' : 'v2LocalConvStickTopDelete',
                { tag: { id: zs(s, r) } }
              )
            this.model.updateStickTop(e, t)
            var o = n.content.timetag || n.content.data.updateTime
            this.model.upsert({
              conversationId: e,
              type: s,
              stickTop: t,
              updateTime: o,
              sortOrder: this.compute.computeSortOrder(t, o),
            })
            var a = [this.model.getById(e)]
            this.triggerConversationChanged(a)
          }
        })
      }
      updateConversationLocalExtension(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            Me(this.core.account, e),
            ye(
              { localExtension: { type: 'string' } },
              { localExtension: t },
              '',
              !0
            )
          var i = this.model.getById(e)
          if (!i) throw new he({ code: de.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST })
          if (i.localExtension !== t) {
            var r = Object.assign(Object.assign({}, i), { localExtension: t })
            this.model.upsert(r), this.triggerConversationChanged([r])
          }
        })
      }
      getTotalUnreadCount() {
        return this.checkV2(), this.unread.getTotalUnreadCount() || 0
      }
      getUnreadCountByIds(e) {
        this.checkV2(),
          ye(
            { conversationIds: { type: 'array', itemType: 'string', min: 1 } },
            { conversationIds: e },
            '',
            !0
          )
        var t = this.unread.getUnreadCountByIds(e)
        return Promise.resolve(t)
      }
      getUnreadCountByFilter(e) {
        this.checkV2(), this.valiteFilter(e)
        var t = this.unread.getUnreadCountByFilter(e)
        return Promise.resolve(t)
      }
      clearTotalUnreadCount() {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(), this.checkLogin()
          var e = this.model.getAll()
          yield this.unread.markMultiConversationRead(
            e.map((e) => e.conversationId)
          ),
            this.unread.clearUnreadCount(e)
        })
      }
      clearUnreadCountByIds(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            this.checkLogin(),
            ye(
              {
                conversationIds: { type: 'array', itemType: 'string', min: 1 },
              },
              { conversationIds: e },
              '',
              !0
            )
          var t = [],
            i = [],
            r = new RegExp(`^${this.core.account}\\|[1-3]\\|`)
          if (
            (e.forEach((e) => {
              r.test(e) ? t.push(e) : i.push(e)
            }),
            t.length > 0)
          ) {
            var s = t.map((e) => this.model.getById(e)).filter((e) => !!e)
            yield this.unread.markMultiConversationRead(t),
              this.unread.clearUnreadCount(s)
          }
          return i.map((e) => ({
            conversationId: e,
            error: new he({ code: de.V2NIM_ERROR_CODE_RESOURCE_NOT_EXIST }),
          }))
        })
      }
      clearUnreadCountByTypes(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            this.checkLogin(),
            ye({ types: vn }, { types: e }, '', !0)
          var t = this.model.getByOption(0, 1e3, { conversationTypes: e })
          yield this.unread.markMultiConversationRead(
            t.conversationList.map((e) => e.conversationId)
          ),
            this.unread.clearUnreadCount(t.conversationList)
        })
      }
      subscribeUnreadCountByFilter(e) {
        var t
        this.checkV2(),
          this.checkLogin(),
          this.valiteFilter(e),
          0 ===
            (null === (t = e.conversationTypes) || void 0 === t
              ? void 0
              : t.length) && delete e.conversationTypes,
          this.unread.addFilter(e)
      }
      unsubscribeUnreadCountByFilter(e) {
        var t
        this.checkV2(),
          this.checkLogin(),
          this.valiteFilter(e),
          0 ===
            (null === (t = e.conversationTypes) || void 0 === t
              ? void 0
              : t.length) && delete e.conversationTypes,
          this.unread.deleteFilter(e)
      }
      getConversationReadTime(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(), Me(this.core.account, e), this.model.getReadTime(e)
          )
        })
      }
      markConversationRead(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            this.checkLogin(),
            Me(this.core.account, e),
            this.unread.markConversationRead(e)
          )
        })
      }
      valiteFilter(e) {
        if (
          (ye(
            {
              filter: {
                type: 'object',
                required: !0,
                rules: {
                  conversationTypes: {
                    type: 'array',
                    itemType: 'number',
                    required: !1,
                  },
                  ignoreMuted: { type: 'boolean', required: !1 },
                },
              },
            },
            { filter: e },
            '',
            !0
          ),
          void 0 === e.conversationTypes && !0 !== e.ignoreMuted)
        )
          throw new he({
            code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
            detail: { reason: 'Filter cannot be empty' },
          })
      }
      triggerConversationChanged(e) {
        ;(e = e.map((e) => this.compute.computeFromExternal(e))),
          (e = JSON.parse(JSON.stringify(e))).forEach((e) => {
            e.lastMessage || (e.lastMessage = void 0), delete e.lastMessageState
          }),
          this.emit('onConversationChanged', e)
      }
      triggerConversationCreated(e) {
        ;(e = this.compute.computeFromExternal(e)),
          delete (e = JSON.parse(JSON.stringify(e))).lastMessageState,
          this.emit('onConversationCreated', e)
      }
    },
    'V2NIMLocalConversationService'
  ),
  sc.registerService(
    class extends ni {
      constructor(e) {
        super('V2NIMSubscriptionService', e),
          'v2' === this.core.options.apiVersion &&
            vt({ cmdMap: za, cmdConfig: ec })
      }
      emit(e, ...t) {
        var i = `${this.name}::emit ${e.toString()}`
        return this.logger.log(`${i}`, ...t), super.emit(e, ...t)
      }
      subscribeUserStatus(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkLogin(),
            this.checkV2(),
            ye(tc, e, '', !0),
            (yield this.core.sendCmd('v2SubscribeUserStatus', {
              tag: {
                eventType: 1,
                duration: e.duration || 60,
                immediateSync: void 0 !== e.immediateSync && e.immediateSync,
              },
              accountIds: e.accountIds,
            })).content.failedList
          )
        })
      }
      unsubscribeUserStatus(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkLogin(), this.checkV2(), ye(ic, e, '', !0)
          var t = []
          return (
            e.accountIds.length > 0
              ? (t = (yield this.core.sendCmd('v2UnsubscribeUserStatus', {
                  tag: { eventType: 1 },
                  accountIds: e.accountIds,
                })).content.failedList)
              : (yield this.core.sendCmd('v2UnsubscribeAllUserStatus', {
                  tag: { eventType: 1 },
                }),
                (t = [])),
            t
          )
        })
      }
      publishCustomUserStatus(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkLogin(),
            this.checkV2(),
            ye(rc, e, '', !0),
            (yield this.core.sendCmd('v2PublishEvent', {
              tag: Object.assign(Object.assign({}, e), {
                eventType: 1,
                uniqueId: Le(),
                duration: e.duration || 60,
                onlineOnly: void 0 === e.onlineOnly || e.onlineOnly,
                multiSync: void 0 !== e.multiSync && e.multiSync,
              }),
            })).content.data
          )
        })
      }
      queryUserStatusSubscriptions(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkLogin(),
            this.checkV2(),
            ye(
              {
                accountIds: {
                  type: 'array',
                  required: !0,
                  itemType: 'string',
                  max: 3e3,
                },
              },
              { accountIds: e },
              '',
              !0
            )
          var t = []
          if (e.length > 0)
            for (var i = 0; i < e.length; i += 100) {
              var r = yield this.core.sendCmd('v2QuerySubscribeEvent', {
                tag: { eventType: 1 },
                accountIds: e.slice(i, i + 100),
              })
              t = t.concat(
                r.content.data.map((e) => ({
                  accountId: e.accountId,
                  subscribeTime: e.subscribeTime,
                  duration: e.duration,
                }))
              )
            }
          else {
            var s = yield this.core.sendCmd('v2QueryAllSubscribeEvent', {
              tag: { eventType: 1 },
            })
            t = t.concat(
              s.content.data.map((e) => ({
                accountId: e.accountId,
                subscribeTime: e.subscribeTime,
                duration: e.duration,
              }))
            )
          }
          return t
        })
      }
      v2OnUserStatusChangeHandler(e) {
        var t = e.content.data,
          { eventType: i, extensionReceived: r } = t,
          s = Ee(t, ['eventType', 'extensionReceived'])
        1 === i
          ? this.emit('onUserStatusChanged', [
              Object.assign(Object.assign({}, s), { extension: r }),
            ])
          : this.logger.log(
              'v2OnUserStatusChangeHandler eventType = ',
              i,
              'msgEvent = ',
              t
            )
      }
      v2OnMultiUserStatusChangeHandler(e) {
        var t = e.content.data
          .filter((e) => 1 === e.eventType)
          .map((e) => {
            var { eventType: t, extensionReceived: i } = e,
              r = Ee(e, ['eventType', 'extensionReceived'])
            return Object.assign(Object.assign({}, r), { extension: i })
          })
        t.length > 0 && this.emit('onUserStatusChanged', t)
      }
    },
    'V2NIMSubscriptionService'
  ),
  sc.registerService(
    class extends ni {
      constructor(e, t = {}) {
        super('V2NIMConversationGroupService', e),
          (this.config = {}),
          this.core._registerDep(xn, 'V2NIMConversationService'),
          'v2' === this.core.options.apiVersion &&
            !0 === this.core.options.enableV2CloudConversation &&
            (vt({ cmdMap: Bn, cmdConfig: jn }), this.setOptions(t))
      }
      setOptions(e) {
        this.config = Object.assign(this.config, e)
      }
      emit(e, ...t) {
        var i = `${this.name}::emit ${e.toString()}`
        if ('onConversationsAddedToGroup' === e) {
          var r = t[0],
            s = t[1]
          this.logger.log(
            `${i}`,
            `groupId:${r}`,
            `conversations:${s.map((e) => e.conversationId).join(',')}`
          )
        } else this.logger.log(`${i}`, ...t)
        return super.emit(e, ...t)
      }
      get ifEnabled() {
        return !0 === this.core.options.enableV2CloudConversation
      }
      checkEnable() {
        if (!0 !== this.core.options.enableV2CloudConversation)
          throw new he({
            code: de.V2NIM_ERROR_CODE_MISUSE,
            detail: { reason: 'V2CloudConversation is not enabled' },
          })
      }
      createConversationGroup(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkEnable(),
            this.checkV2(),
            ye(
              { name: { type: 'string', allowEmpty: !1 } },
              { name: e },
              '',
              !0
            ),
            ye(
              { serverExtension: { type: 'string', required: !1 } },
              { serverExtension: t },
              '',
              !0
            ),
            ye(
              {
                conversationIds: {
                  type: 'array',
                  itemType: 'string',
                  required: !1,
                },
              },
              { conversationIds: i },
              '',
              !0
            )
          var r = yield this.core.sendCmd('v2ConversationGroupCreate', {
              tag: {
                name: e,
                serverExtension: t || '',
                conversationIds: i && JSON.stringify(i),
              },
            }),
            s = bn(Ve(r, 'content.data')),
            n = ln(this.core, Ve(r, 'content.conversations')),
            o = kn(Ve(r, 'content.info.failedMap'))
          return (
            this.emit('onConversationGroupCreated', s),
            n.length > 0 &&
              (this.core.V2NIMConversationService.versionCache.compareAndUpdateModel(
                n
              ),
              this.emit(
                'onConversationsAddedToGroup',
                s.groupId,
                n
                  .map((e) =>
                    this.core.V2NIMConversationService.model.getById(
                      e.conversationId
                    )
                  )
                  .filter((e) => !!e)
              )),
            { group: s, failedList: o }
          )
        })
      }
      deleteConversationGroup(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkEnable(),
            this.checkV2(),
            ye(
              { groupId: { type: 'string', allowEmpty: !1 } },
              { groupId: e },
              '',
              !0
            )
          var t = Ln(
            Ve(
              yield this.core.sendCmd('v2ConversationGroupDelete', {
                tag: { groupId: e },
              }),
              'content.info'
            )
          )
          this.core.V2NIMConversationService.versionCache.compareAndDeleteGroupInModel(
            t.deleteVersion,
            e
          ),
            this.emit('onConversationGroupDeleted', e)
        })
      }
      updateConversationGroup(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          if (
            (this.checkEnable(),
            this.checkV2(),
            ye(
              { groupId: { type: 'string', allowEmpty: !1 } },
              { groupId: e },
              '',
              !0
            ),
            ye({ name: { type: 'string', required: !1 } }, { name: t }, '', !0),
            ye(
              { serverExtension: { type: 'string', required: !1 } },
              { serverExtension: i },
              '',
              !0
            ),
            void 0 === t && void 0 === i)
          )
            throw new he({ code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER })
          var r = bn(
            Ve(
              yield this.core.sendCmd('v2ConversationGroupUpdate', {
                tag: { groupId: e, name: t, serverExtension: i },
              }),
              'content.data'
            )
          )
          this.emit('onConversationGroupChanged', r)
        })
      }
      addConversationsToGroup(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkEnable(),
            this.checkV2(),
            ye(
              { groupId: { type: 'string', allowEmpty: !1 } },
              { groupId: e },
              '',
              !0
            ),
            ye(
              {
                conversationIds: {
                  type: 'array',
                  itemType: 'string',
                  min: 1,
                  allowEmpty: !1,
                },
              },
              { conversationIds: t },
              '',
              !0
            )
          var i = yield this.core.sendCmd('v2ConversationGroupAddTo', {
              tag: { groupId: e, conversationIds: JSON.stringify(t) },
            }),
            r = Ve(i, 'content.info.failedMap') || '',
            s = []
          r && (s = kn(r))
          var n = ln(this.core, Ve(i, 'content.datas'))
          this.core.V2NIMConversationService.versionCache.compareAndUpdateModel(
            n
          )
          var o = n
            .map((e) =>
              this.core.V2NIMConversationService.model.getById(e.conversationId)
            )
            .filter((e) => !!e)
          return (
            o.length > 0 && this.emit('onConversationsAddedToGroup', e, o), s
          )
        })
      }
      removeConversationsFromGroup(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkEnable(),
            this.checkV2(),
            ye(
              { groupId: { type: 'string', allowEmpty: !1 } },
              { groupId: e },
              '',
              !0
            ),
            ye(
              {
                conversationIds: {
                  type: 'array',
                  itemType: 'string',
                  min: 1,
                  allowEmpty: !1,
                },
              },
              { conversationIds: t },
              '',
              !0
            )
          var i = yield this.core.sendCmd('v2ConversationGroupRemoveFrom', {
              tag: { groupId: e, conversationIds: JSON.stringify(t) },
            }),
            r = Ve(i, 'content.info.failedMap') || '',
            s = []
          r && (s = kn(r))
          var n = ln(this.core, Ve(i, 'content.datas'))
          return (
            this.core.V2NIMConversationService.versionCache.compareAndUpdateModel(
              n
            ),
            this.emit(
              'onConversationsRemovedFromGroup',
              e,
              n.map((e) => e.conversationId)
            ),
            s
          )
        })
      }
      getConversationGroup(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkEnable(),
            this.checkV2(),
            ye(
              { groupId: { type: 'string', allowEmpty: !1 } },
              { groupId: e },
              '',
              !0
            ),
            bn(
              Ve(
                yield this.core.sendCmd('v2ConversationGroupGet', {
                  tag: { groupId: e },
                }),
                'content.data'
              )
            )
          )
        })
      }
      getConversationGroupList() {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkEnable(),
            this.checkV2(),
            On(
              Ve(
                yield this.core.sendCmd('v2ConversationGroupListGet'),
                'content.datas'
              )
            )
          )
        })
      }
      getConversationGroupListByIds(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkEnable(),
            this.checkV2(),
            ye(
              { groupIds: { type: 'array', itemType: 'string', min: 1 } },
              { groupIds: e },
              '',
              !0
            )
          var t = On(
            Ve(
              yield this.core.sendCmd('v2ConversationGroupsGet', {
                tag: { groupIds: e && JSON.stringify(e) },
              }),
              'content.datas'
            )
          )
          return e
            .map((e) => t.filter((t) => t.groupId === e)[0])
            .filter((e) => !!e)
        })
      }
      v2ConversationGroupNotifySyncOnlineHandler(e) {
        if (this.ifEnabled) {
          var t = Ln(Ve(e, 'content.info')),
            { type: i, deleteVersion: r, conversationIds: s } = t,
            n = bn(Ve(e, 'content.data'))
          if (
            (this.core.logger.log(
              'v2ConversationGroupNotifySyncOnlineHandler',
              t,
              n
            ),
            1 === i)
          )
            this.emit('onConversationGroupCreated', n),
              s &&
                s.length > 0 &&
                this.emit(
                  'onConversationsAddedToGroup',
                  n.groupId,
                  s
                    .map((e) =>
                      this.core.V2NIMConversationService.model.getById(e)
                    )
                    .filter((e) => !!e)
                )
          else if (2 === i)
            this.emit('onConversationGroupDeleted', n.groupId),
              this.core.V2NIMConversationService.versionCache.compareAndDeleteGroupInModel(
                r,
                n.groupId
              )
          else if (3 === i) this.emit('onConversationGroupChanged', n)
          else if (4 === i) {
            var o = s
              .map((e) => this.core.V2NIMConversationService.model.getById(e))
              .filter((e) => !!e)
            this.emit('onConversationsAddedToGroup', n.groupId, o)
          } else
            5 === i &&
              this.emit('onConversationsRemovedFromGroup', n.groupId, s)
        }
      }
    },
    'V2NIMConversationGroupService'
  ),
  sc.registerService(
    class extends ni {
      constructor(e) {
        super('V2NIMMessageLogUtil', e),
          (this.clearHistoryMessageFn = (e) => {
            var t = Yr(this.core, e)
            this.emitClearHistoryMessage([t])
          }),
          (this.core = e),
          (this.service = this.core.V2NIMMessageService),
          'v2' === this.core.options.apiVersion &&
            (vt({ cmdMap: Hn, cmdConfig: Wn }), this.setListener())
      }
      setListener() {
        this.core.eventBus.on(
          'forwardReceive/V2NIMMessageLogService/clearHistoryMessage',
          this.clearHistoryMessageFn
        )
      }
      getMessageListByRefers(e) {
        return Te(this, void 0, void 0, function* () {
          if (
            (this.checkV2(),
            ye(er, { messageRefers: e }, '', !0),
            0 === e.length)
          )
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: {
                reason:
                  'getMessageListByRefers: messageRefers cannot be an empty array',
              },
            })
          var t = [],
            i = e.map((e) => {
              var i = this.service.model.getMessageById(e.messageClientId)
              return (
                !i &&
                  e.messageServerId &&
                  '0' !== e.messageServerId &&
                  t.push(e),
                i
              )
            }),
            r = []
          if (t.length > 0) {
            var s = yield this.core.sendCmd('v2GetMessageListByRefers', {
              tag: t,
            })
            r = s.content.msgs
          }
          return i
            .map((t, i) => {
              if (t) return t
              var s = e[i],
                n = r.find((e) => e.messageServerId === s.messageServerId)
              return n ? $r(this.core, n) : void 0
            })
            .filter((e) => void 0 !== e && !this.service._filterMessage(e))
        })
      }
      getMessageList(e) {
        var t
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(Qi, e, '', !0),
            Me(this.core.account, e.conversationId)
          var i = this.core.V2NIMConversationIdUtil.parseConversationType(
              e.conversationId
            ),
            r = this.core.V2NIMConversationIdUtil.parseConversationTargetId(
              e.conversationId
            ),
            s =
              1 === i
                ? 'v2GetMessageList'
                : 2 === i
                ? 'v2GetTeamMessageList'
                : 'v2GetSuperTeamMessageList',
            n = e.beginTime || 0,
            o = e.endTime || 0
          if (0 !== n && 0 !== o && n > o)
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: {
                reason:
                  'getMessageList: beginTime cannot be greater than endTime',
              },
            })
          var a = void 0 === e.direction ? 0 : e.direction
          if (e.anchorMessage)
            if (0 === e.direction) {
              if (0 === o) o = e.anchorMessage.createTime
              else if (o !== e.anchorMessage.createTime)
                throw new he({
                  code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                  detail: {
                    reason:
                      'getMessageList: When providing anchorMessage, when sorting in descending order, endTime does not need to be provided, or endTime should be equal to anchorMessage.createTime',
                  },
                })
            } else if (0 === n) n = e.anchorMessage.createTime
            else if (n !== e.anchorMessage.createTime)
              throw new he({
                code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                detail: {
                  reason:
                    'getMessageList: When providing anchorMessage, when sorting in ascending order, there is no need to provide beginTime, or beginTime should be equal to anchorMessage.createTime',
                },
              })
          var c =
              null === (t = e.anchorMessage) || void 0 === t
                ? void 0
                : t.messageServerId,
            d = yield this.core.sendCmd(s, {
              beginTime: n,
              endTime: o,
              lastMsgId: c || 0,
              limit: e.limit || 50,
              direction: a,
              msgTypes: e.messageTypes ? e.messageTypes.slice() : [],
              to: r,
            }),
            { content: l } = d,
            p = l.msgs.map((e) => $r(this.core, e))
          return (
            c && (p = p.filter((e) => e.messageServerId !== c)),
            this.getMessageListMonkeyPatch(p, e)
          )
        })
      }
      getMessageListMonkeyPatch(e, t) {
        var i = t.conversationId,
          r = e,
          s = r.reduce((e, t) => ((e[t.messageClientId] = !0), e), {}),
          n = this.service.model.getMessagesByConversationId(i)
        n = n.sort((e, i) =>
          1 === t.direction
            ? e.createTime - i.createTime
            : i.createTime - e.createTime
        )
        var o = 0,
          a = t.beginTime || 0,
          c = t.endTime || 0
        t.anchorMessage &&
          (0 === t.direction
            ? (c = t.anchorMessage.createTime)
            : (a = t.anchorMessage.createTime),
          (o = n.findIndex((e) => {
            var i
            return (
              e.messageClientId ===
              (null === (i = t.anchorMessage) || void 0 === i
                ? void 0
                : i.messageClientId)
            )
          })),
          (o += 1))
        for (var d = o; d < n.length; d++) {
          var l = n[d],
            p = !s[l.messageClientId],
            h = void 0 === l.sendingState || 1 === l.sendingState,
            u = l.conversationId === i,
            m = l.createTime > a && (l.createTime < c || 0 === c),
            g = !t.messageTypes || t.messageTypes.includes(l.messageType)
          p && h && u && m && g && r.push(n[d])
        }
        return (r = r.sort((e, i) =>
          1 === t.direction
            ? e.createTime - i.createTime
            : i.createTime - e.createTime
        )).slice(0, t.limit || 50)
      }
      clearHistoryMessage(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(rr, e, '', !0),
            Me(this.core.account, e.conversationId)
          var {
              conversationId: t,
              deleteRoam: i,
              onlineSync: r,
              serverExtension: s,
            } = e,
            n = this.core.V2NIMConversationIdUtil.parseConversationType(t),
            o = this.core.V2NIMConversationIdUtil.parseConversationTargetId(t),
            a = {
              deleteRoam: i,
              onlineSync: r,
              serverExtension: s,
              conversationType: n,
            }
          1 === n ? (a.receiverId = o) : (a.teamId = o)
          var c = this.core.timeOrigin.getNTPTime()
          ;(e.clearMode = e.clearMode || 0),
            0 === e.clearMode &&
              (c = (yield this.core.sendCmd('v2ClearHistoryMessage', {
                tag: a,
              })).content.timetag),
            2 === e.clearMode &&
              Ae.localStorage.setItem(
                `nim_${this.core.account}_${t}_clearTime`,
                c.toString()
              ),
            this.core.eventBus.emit(
              'forwardSend/V2NIMMessageLogService/clearHistoryMessage',
              Object.assign(Object.assign({}, a), { deleteTime: c })
            ),
            this.emitClearHistoryMessage([
              { deleteTime: c, serverExtension: s, conversationId: t },
            ])
        })
      }
      clearRoamingMessage(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(
              {
                conversationIds: { type: 'array', itemType: 'string', min: 1 },
              },
              { conversationIds: e },
              void 0,
              !0
            )
          var t = []
          try {
            t = e.map((e) => {
              var t =
                this.core.V2NIMConversationIdUtil.parseConversationTargetId(e)
              return zs(
                this.core.V2NIMConversationIdUtil.parseConversationType(e),
                t
              )
            })
          } catch (t) {
            throw (
              (this.logger.error(
                `V2NIMMessage::clearRoamingMessage with ${e}`,
                t
              ),
              new he({
                code: de.V2NIM_ERROR_CODE_PARAMETER_ERROR,
                detail: { reason: 'Failed to create session', rawData: `${e}` },
              }))
            )
          }
          yield this.core.sendCmd('v2ClearRoamingMessage', {
            conversationIds: t,
          })
        })
      }
      syncClearHistoryMessageHandler(e) {
        var t = e.content.data.map((e) => Yr(this.core, e))
        this.emitClearHistoryMessage(t)
      }
      onClearHistoryMessageHandler(e) {
        var t = Yr(this.core, e.content.data)
        this.emitClearHistoryMessage([t])
      }
      emitClearHistoryMessage(e) {
        e.forEach((e) => {
          this.service.model.deleteMessages(e.conversationId, e.deleteTime),
            this.core.eventBus.emit('V2NIMSync/updateTimetag', {
              sessionHistoryMsgsDelete: e.deleteTime,
            })
        }),
          this.core.eventBus.emit(
            'V2NIMMessageLogUtil/onClearHistoryNotifications',
            e
          ),
          this.service.emit('onClearHistoryNotifications', e)
      }
    },
    'V2NIMMessageLogUtil'
  ),
  sc.registerService(
    class extends ni {
      constructor(e) {
        super('V2NIMMessageExtendUtil', e),
          (this.core = e),
          (this.service = this.core.V2NIMMessageService),
          'v2' === this.core.options.apiVersion &&
            vt({ cmdMap: zn, cmdConfig: no })
      }
      pinMessage(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(Zi, e, 'message', !0),
            ye(sr, { serverExtension: t }, '', !0)
          var i = yield this.core.sendCmd('v2PinMessage', {
            msg: e,
            msgPin: { serverExtension: t },
          })
          this.emitPinNotification({
            pinState: 1,
            message: e,
            serverExtension: t,
            createTime: i.content.timetag,
            updateTime: i.content.timetag,
            operatorId: this.core.account,
          })
        })
      }
      unpinMessage(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(Zi, e, 'messageRefer', !0),
            ye(sr, { serverExtension: t }, '', !0)
          var i = yield this.core.sendCmd('v2UnpinMessage', {
            msg: e,
            msgPin: { serverExtension: t },
          })
          this.emitPinNotification({
            pinState: 0,
            message: e,
            serverExtension: t,
            updateTime: i.content.timetag,
            operatorId: this.core.account,
          })
        })
      }
      updatePinMessage(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(Zi, e, 'message', !0),
            ye(sr, { serverExtension: t }, '', !0)
          var i = yield this.core.sendCmd('v2UpdatePinMessage', {
            msg: e,
            msgPin: { serverExtension: t },
          })
          this.emitPinNotification({
            pinState: 2,
            message: e,
            serverExtension: t,
            updateTime: i.content.timetag,
            operatorId: this.core.account,
          })
        })
      }
      getPinnedMessageList(e) {
        return Te(this, void 0, void 0, function* () {
          if (
            (this.checkV2(),
            !this.core.V2NIMConversationIdUtil ||
              !this.core.V2NIMConversationIdUtil.parseConversationType)
          )
            throw new Error('Service "V2NIMConversationService" does not exist')
          Me(this.core.account, e)
          var t = this.core.V2NIMConversationIdUtil.convertToV1ConversationId(e)
          return (
            (t = t.replace('superTeam', 'super_team')),
            (yield this.core.sendCmd('v2GetPinMessageList', {
              tag: { conversationId: t, timetag: 0 },
            })).content.data
              .map((e) =>
                Object.assign(Object.assign({}, e), {
                  messageRefer: Object.assign(
                    Object.assign({}, e.messageRefer),
                    {
                      conversationId:
                        this.core.V2NIMConversationIdUtil.messageConversationId(
                          e.messageRefer
                        ),
                    }
                  ),
                })
              )
              .sort((e, t) => t.updateTime - e.updateTime)
          )
        })
      }
      addQuickComment(e, t, i, r) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(
              cr,
              { message: e, index: t, serverExtension: i, pushConfig: r },
              '',
              !0
            )
          var s = yield this.core.sendCmd('v2AddQuickComment', {
              message: e,
              quickComment: { index: t, serverExtension: i, pushConfig: r },
            }),
            n = {
              operationType: 1,
              quickComment: {
                messageRefer: qr(this.core, e),
                createTime: s.content.timetag,
                index: t,
                serverExtension: i || '',
                operatorId: this.core.account,
              },
            }
          this.core.V2NIMMessageService.emit(
            'onMessageQuickCommentNotification',
            n
          )
        })
      }
      removeQuickComment(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(Zi, e, 'messageRefer', !0),
            ye({ index: { type: 'number', min: 1 } }, { index: t }, '', !0),
            ye(
              { serverExtension: { type: 'string', required: !1 } },
              { serverExtension: i },
              '',
              !0
            )
          var r = yield this.core.sendCmd('v2RemoveQuickComment', {
              message: e,
              quickComment: { index: t, serverExtension: i },
            }),
            s = {
              operationType: 2,
              quickComment: {
                messageRefer: qr(this.core, e),
                createTime: r.content.timetag,
                index: t,
                serverExtension: i || '',
                operatorId: this.core.account,
              },
            }
          this.core.V2NIMMessageService.emit(
            'onMessageQuickCommentNotification',
            s
          )
        })
      }
      getQuickCommentList(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(), ye(dr, { messages: e }, '', !0)
          var t = {}
          return (
            (yield this.core.sendCmd('v2GetQuickComment', {
              tag: e.map((e) => ({ messageRefer: e })),
            })).content.data.forEach((e) => {
              var i, r
              try {
                if (!e.detail)
                  return void (
                    t[(i = e.messageRefer.messageClientId)] || (t[i] = [])
                  )
                var s = JSON.parse(e.detail)
                t[(r = e.messageRefer.messageClientId)] || (t[r] = []),
                  s.forEach((i) => {
                    t[e.messageRefer.messageClientId].push({
                      messageRefer: Object.assign(
                        Object.assign({}, e.messageRefer),
                        {
                          conversationId:
                            this.core.V2NIMConversationIdUtil.messageConversationId(
                              e.messageRefer
                            ),
                        }
                      ),
                      operatorId: i[1],
                      index: parseInt(i[2]),
                      createTime: parseInt(i[3]),
                      serverExtension: i[4],
                    })
                  })
              } catch (t) {
                this.logger.error(
                  'getQuickCommentList JSON Parse Error',
                  e.detail,
                  t
                )
              }
            }),
            t
          )
        })
      }
      voiceToText(e) {
        return Te(this, void 0, void 0, function* () {
          if (
            (this.checkV2(),
            ye(ar, e, '', !0),
            !e.voicePath && !e.voiceUrl && !e.file)
          )
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: {
                reason:
                  'voiceToText: voicePath、voiceUrl、file cannot be empty at the same time',
              },
            })
          var {
              voicePath: t,
              file: i,
              mimeType: r,
              sampleRate: s,
              duration: n,
              sceneName: o,
            } = e,
            a = o ? this.core.V2NIMStorageService.getStorageScene(o) : null,
            c = e.voiceUrl
          if (!c) {
            var d = {}
            i
              ? (d.file = i)
              : 0 === (null == t ? void 0 : t.indexOf('nim-external'))
              ? (d.fileInput = t)
              : (d.filePath = t),
              (c = (yield this.core.cloudStorage.uploadFile(
                Object.assign(
                  {
                    type: 'audio',
                    nosScenes: a ? a.sceneName : void 0,
                    nosSurvivalTime: a ? a.expireTime : void 0,
                  },
                  d
                )
              )).url)
          }
          return (yield this.core.sendCmd(
            'v2VoiceToText',
            { tag: { voiceUrl: c, mimeType: r, sampleRate: s, duration: n } },
            { timeout: 3e4 }
          )).content.data
        })
      }
      onPinMessageHandler(e) {
        return this.pinMessageChangeHandler(e, 1)
      }
      onUnpinMessageHandler(e) {
        return this.pinMessageChangeHandler(e, 0)
      }
      onUpdatePinMessageHandler(e) {
        return this.pinMessageChangeHandler(e, 2)
      }
      pinMessageChangeHandler(e, t) {
        var i = e.content.msg,
          r = e.content.pinInfo
        ;(i.conversationId =
          this.core.V2NIMConversationIdUtil.messageConversationId(i)),
          this.emitPinNotification({
            pinState: t,
            message: i,
            serverExtension: r.serverExtension,
            createTime: r.createTime,
            updateTime: r.updateTime,
            operatorId: r.accid,
          })
      }
      emitPinNotification(e) {
        var t = {
          pinState: e.pinState,
          pin: Object.assign(
            Object.assign(
              {
                serverExtension: e.serverExtension || '',
                operatorId: e.operatorId,
              },
              e.createTime ? { createTime: e.createTime } : {}
            ),
            { updateTime: e.updateTime, messageRefer: qr(this.core, e.message) }
          ),
        }
        this.core.V2NIMMessageService.emit('onMessagePinNotification', t)
      }
      onAddQuickCommentHandler(e) {
        return this.onQuickCommentNotificationHandler(e, 1)
      }
      onRemoveQuickCommentHandler(e) {
        return this.onQuickCommentNotificationHandler(e, 2)
      }
      onQuickCommentNotificationHandler(e, t) {
        var i = {
          operationType: t,
          quickComment: Object.assign(
            {
              messageRefer: Object.assign(
                Object.assign({}, e.content.message),
                {
                  conversationId:
                    this.core.V2NIMConversationIdUtil.messageConversationId(
                      e.content.message
                    ),
                }
              ),
            },
            e.content.quickComment
          ),
        }
        this.core.V2NIMMessageService.emit(
          'onMessageQuickCommentNotification',
          i
        )
      }
      addCollection(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            ye(lr, { params: e }, '', !0),
            (yield this.core.sendCmd('v2AddCollection', { tag: e })).content
              .data
          )
        })
      }
      removeCollections(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            ye(pr, { collections: e }, '', !0),
            (yield this.core.sendCmd('v2RemoveCollections', { tag: e })).content
              .data
          )
        })
      }
      updateCollectionExtension(e, t) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            ye(hr, { collection: e, serverExtension: t }, '', !0),
            (yield this.core.sendCmd('v2UpdateCollectionExtension', {
              tag: Object.assign(Object.assign({}, e), { serverExtension: t }),
            })).content.data
          )
        })
      }
      getCollectionListByOption(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            ye(ur, e, '', !0),
            (yield this.getCollectionListExByOption(e)).collectionList
          )
        })
      }
      getCollectionListExByOption(e) {
        var t, i
        return Te(this, void 0, void 0, function* () {
          this.checkV2(), ye(ur, e, '', !0)
          var r = e.beginTime || 0,
            s = e.endTime || 0,
            n = void 0 === e.direction ? 0 : e.direction
          if (
            void 0 !==
            (null === (t = e.anchorCollection) || void 0 === t
              ? void 0
              : t.collectionId)
          )
            if (0 === e.direction) {
              if (0 === s) s = e.anchorCollection.createTime
              else if (s !== e.anchorCollection.createTime)
                throw new he({
                  code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                  detail: {
                    reason:
                      'getCollectionListExByOption: When providing anchorCollection, when sorting in descending order, endTime does not need to be provided, or endTime should be equal to anchorCollection.createTime',
                  },
                })
            } else if (0 === r) r = e.anchorCollection.createTime
            else if (r !== e.anchorCollection.createTime)
              throw new he({
                code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
                detail: {
                  reason:
                    'getCollectionListExByOption: When providing anchorCollection, when sorting in ascending order, there is no need to provide beginTime, or beginTime should be equal to anchorCollection.createTime',
                },
              })
          if (0 !== r && 0 !== s && r >= s)
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: {
                reason:
                  'getCollectionListExByOption: beginTime cannot be greater than endTime',
              },
            })
          var o = {
            beginTime: r,
            endTime: s,
            direction: n,
            limit: e.limit,
            collectionType: e.collectionType,
            excludeId: (
              null === (i = e.anchorCollection) || void 0 === i
                ? void 0
                : i.collectionId
            )
              ? e.anchorCollection.collectionId
              : 0,
          }
          o.collectionType || delete o.collectionType
          var a = yield this.core.sendCmd('v2GetCollectionListByOption', {
            tag: o,
          })
          return { totalCount: a.content.total, collectionList: a.content.data }
        })
      }
      searchCloudMessages(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(), ye(mr, e, '', !0)
          var t = e.beginTime || 0,
            i = e.endTime || 0
          if (0 !== t && 0 !== i && t > i)
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: {
                reason:
                  'searchCloudMessages: beginTime cannot be greater than endTime',
              },
            })
          var r = void 0 === e.sortOrder ? 0 : e.sortOrder,
            s = e.conversationLimit || 0,
            n = e.messageLimit || 10,
            o =
              s > 0
                ? 'v2SearchCloudMessagesGroupByConversation'
                : 'v2SearchCloudMessages',
            a = yield this.core.sendCmd(o, {
              tag: Object.assign(Object.assign({}, e), {
                beginTime: t,
                endTime: i,
                sortOrder: r,
                conversationLimit: s,
                messageLimit: n,
              }),
            })
          return this.service._filterMessagesByFn(
            a.content.data.map((e) => $r(this.core, e))
          )
        })
      }
      searchCloudMessagesEx(e) {
        var t, i, r
        return Te(this, void 0, void 0, function* () {
          if (
            (this.checkV2(),
            ye(gr, e, '', !0),
            e.conversationId && Me(this.core.account, e.conversationId),
            !(null === (t = e.keywordList) || void 0 === t
              ? void 0
              : t.length) &&
              !(null === (i = e.senderAccountIds) || void 0 === i
                ? void 0
                : i.length) &&
              !(null === (r = e.messageTypes) || void 0 === r
                ? void 0
                : r.length))
          )
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: {
                reason:
                  'searchCloudMessagesEx: keywordList senderAccountIds messageTypes cannot be empty at the same time',
              },
            })
          0 === e.searchTimePeriod && delete e.searchTimePeriod
          var s = yield this.core.sendCmd('v2SearchCloudMessagesEx', {
              tag: Object.assign({}, e),
            }),
            { msgs: n, hasMore: o, nextPageToken: a } = s.content,
            c = this.service
              ._filterMessagesByFn(n.map((e) => $r(this.core, e)))
              .sort((e, t) => t.createTime - e.createTime)
          return {
            count: n.length,
            items: Wr(this.core, c),
            hasMore: It(o),
            nextPageToken: a,
          }
        })
      }
      getThreadMessageList(e) {
        return Te(this, void 0, void 0, function* () {
          if (
            (ye(Er, e, 'getThreadMessageList', !0),
            (e.beginTime = e.beginTime || 0),
            e.endTime && e.beginTime > e.endTime)
          )
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: {
                reason:
                  'getThreadMessageList: beginTime cannot be greater than endTime',
              },
            })
          var t = yield this.core.sendCmd('v2GetThreadMessageList', {
              messageRefer: e.messageRefer,
              tag: {
                beginTime: e.beginTime,
                endTime: e.endTime,
                limit: e.limit,
                reverse: 1 === e.direction ? 1 : 0,
                excludeMessageServerId: e.excludeMessageServerId,
              },
            }),
            { message: i, replyResult: r, replyList: s } = t.content,
            n = $r(this.core, i),
            o = s.map((e) => $r(this.core, e))
          return (
            (o = this.service._filterMessagesByFn(o)),
            (o = this.service._filterMessageByClearTime(n.conversationId, o)),
            {
              message: n,
              timestamp: r.timestamp,
              replyCount: r.total,
              replyList: o,
            }
          )
        })
      }
    },
    'V2NIMMessageExtendUtil'
  ),
  sc.registerService(Ds, 'V2NIMStorageService'),
  sc.registerService(
    class extends ni {
      constructor(e) {
        super('V2NIMTeamService', e),
          this.core._registerDep(xi, 'V2NIMConversationIdUtil'),
          (this.model = new ko()),
          (this.memberModel = new Vo()),
          (this.notificationModel = new Lo()),
          (this.notification = new Po(e, this)),
          (this.event = new Do(e, this)),
          (this.handler = new wo(e, this)),
          'v2' === this.core.options.apiVersion &&
            (vt({ cmdMap: Or, cmdConfig: wr }), this.setListener())
      }
      setListener() {
        this.event.setListener()
      }
      reset() {
        this.model.reset(),
          this.memberModel.reset(),
          this.notificationModel.reset()
      }
      emit(e, ...t) {
        return this.event.beforeEmit(e, ...t), super.emit(e, ...t)
      }
      createTeam(e, t, i, r) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye({ createTeamParams: ao }, { createTeamParams: e }, '', !0),
            ye(
              {
                inviteeAccountIds: Object.assign(Object.assign({}, co), {
                  min: 0,
                  required: !1,
                }),
              },
              { inviteeAccountIds: t },
              '',
              !0
            ),
            ye({ antispamConfig: uo }, { antispamConfig: r }, '', !0)
          var s = 2 === e.teamType ? 'v2SuperTeamCreate' : 'v2TeamCreate',
            n = yield this.core.sendCmd(s, {
              team: e,
              inviteeAccountIds: t || [],
              postscript: i || '',
              antispamConfig: r,
            }),
            o = n.content.team
          return (
            this.model.upsert(o),
            this.getTeamMemberListByIds(o.teamId, o.teamType, [
              this.core.account,
            ]).catch((e) => {
              this.core.logger.error('Get Member error after createTeam', e)
            }),
            this.emit('onTeamCreated', o),
            { team: o, failedList: n.content.failedList }
          )
        })
      }
      updateTeamInfo(e, t, i, r) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye(Io, { updateTeamInfoParams: i }, '', !0),
            ye({ antispamConfig: uo }, { antispamConfig: r }, '', !0)
          var s = Object.assign({ teamId: e, teamType: t }, i),
            n = 2 === t ? 'v2SuperTeamUpdateInfo' : 'v2TeamUpdateInfo'
          yield this.core.sendCmd(n, { team: s, antispamConfig: r }),
            this.model.upsert(s)
        })
      }
      leaveTeam(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0)
          var i = 2 === t ? 'v2SuperTeamLeave' : 'v2TeamLeave'
          yield this.core.sendCmd(i, { teamId: e }), this.model.deleteById(e, t)
        })
      }
      getTeamInfo(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0)
          var i = 2 === t ? 'v2SuperTeamGetInfo' : 'v2TeamGetInfo',
            r = this.model.getById(e, t, !1)
          if (r) return r
          var s = (yield this.core.sendCmd(i, { teamId: e })).content.team
          return this.model.upsert(s), s
        })
      }
      getJoinedTeamList(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(fo, { teamTypes: e }, '', !0),
            this.core.V2NIMLoginService.checkIllegalState(),
            (e && 0 !== e.length) || (e = [1, 2])
          var t = []
          return (
            e.forEach((e) => {
              t = t.concat(this.model.getAll(e))
            }),
            t.sort((e, t) => e.createTime - t.createTime)
          )
        })
      }
      getJoinedTeamCount(e) {
        this.checkV2(),
          ye(fo, { teamTypes: e }, '', !0),
          this.core.V2NIMLoginService.checkIllegalState(),
          (e && 0 !== e.length) || (e = [1, 2])
        var t = 0
        return (
          e.forEach((e) => {
            t += this.model.count(e)
          }),
          t
        )
      }
      getJoinedTeamMembers(e) {
        this.checkV2(),
          ye(fo, { teamTypes: e }, '', !0),
          this.core.V2NIMLoginService.checkIllegalState(),
          (e && 0 !== e.length) || (e = [1, 2])
        var t = []
        return (
          e.forEach((e) => {
            var i = this.memberModel
              .chooseList(e)
              .filter((e) => e.accountId === this.core.account)
            t = t.concat(i)
          }),
          Promise.resolve(t)
        )
      }
      getTeamInfoByIds(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(go, { teamIds: e }, '', !0),
            ye(vo, { teamType: t }, '', !0)
          var i = 2 === t ? 'v2SuperTeamGetByIds' : 'v2TeamGetByIds',
            r = e.map((e) => this.model.getById(e, t, !1)),
            s = e.filter((e, t) => !r[t])
          if (0 === s.length) return r
          var n = (yield this.core.sendCmd(i, { teamIds: s })).content.teams
          return r
            .map((t, i) => {
              if (t) return t
              var r = e[i],
                s = n.find((e) => e.teamId === r)
              return s && this.model.upsert(s), s
            })
            .filter((e) => !!e)
        })
      }
      dismissTeam(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0)
          var i = 2 === t ? 'v2SuperTeamDismiss' : 'v2TeamDismiss'
          yield this.core.sendCmd(i, { teamId: e })
        })
      }
      inviteMember(e, t, i, r) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye({ inviteeAccountIds: co }, { inviteeAccountIds: i }, '', !0),
            ye(
              {
                postscript: Object.assign(Object.assign({}, po), {
                  required: !1,
                }),
              },
              { postscript: r },
              '',
              !0
            )
          var s = 2 === t ? 'v2SuperTeamInviteMembers' : 'v2TeamInviteMembers'
          return (yield this.core.sendCmd(s, {
            teamId: e,
            accounts: i,
            ps: r || '',
          })).content.abortedAccidList
        })
      }
      inviteMemberEx(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye(yo, { inviteeParams: i }, '', !0)
          var r = 2 === t ? 'v2SuperTeamInviteMembers' : 'v2TeamInviteMembers'
          return (yield this.core.sendCmd(r, {
            teamId: e,
            accounts: i.inviteeAccountIds,
            ps: i.postscript || '',
            attach: i.serverExtension,
          })).content.abortedAccidList
        })
      }
      acceptInvitation(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(So, e, 'invitationInfo', !0),
            ye(No, e, 'invitationInfo', !0)
          var { teamType: t, teamId: i, operatorAccountId: r } = e,
            s =
              2 === t ? 'v2SuperTeamAcceptInvitation' : 'v2TeamAcceptInvitation'
          try {
            var n = yield this.core.sendCmd(s, { teamId: i, from: r })
            return (
              this.notification.updateTeamActionStatus(e, 1), n.content.team
            )
          } catch (t) {
            var o = t
            throw (
              (this.notification.checkIfExpired(o.code) &&
                this.notification.updateTeamActionStatus(e, 3),
              t)
            )
          }
        })
      }
      rejectInvitation(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(So, e, 'invitationInfo', !0),
            ye(No, e, 'invitationInfo', !0),
            ye(
              {
                postscript: Object.assign(Object.assign({}, po), {
                  required: !1,
                }),
              },
              { postscript: t },
              '',
              !0
            )
          var { teamType: i, teamId: r, operatorAccountId: s } = e,
            n = 2 === i ? 'v2SuperTeamRejectInvite' : 'v2TeamRejectInvite'
          try {
            yield this.core.sendCmd(n, { teamId: r, from: s, ps: t || '' }),
              this.notification.updateTeamActionStatus(e, 2)
          } catch (t) {
            var o = t
            throw (
              (this.notification.checkIfExpired(o.code) &&
                this.notification.updateTeamActionStatus(e, 3),
              t)
            )
          }
        })
      }
      kickMember(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye({ memberAccountIds: co }, { memberAccountIds: i }, '', !0)
          var r = 2 === t ? 'v2SuperTeamKickMembers' : 'v2TeamKickMembers'
          yield this.core.sendCmd(r, { teamId: e, accounts: i })
        })
      }
      applyJoinTeam(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0)
          var r = 2 === t ? 'v2SuperTeamApplyToJoin' : 'v2TeamApplyToJoin',
            s = yield this.core.sendCmd(r, { teamId: e, ps: i || '' }),
            n = s.content.team,
            o = s.content.isInTeam
          return (n.isValidTeam = !!n.isValidTeam && !!o), n
        })
      }
      acceptJoinApplication(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(So, e, 'applicationInfo', !0),
            ye(Ao, e, 'applicationInfo', !0)
          var { teamType: t, teamId: i, operatorAccountId: r } = e,
            s =
              2 === t
                ? 'v2SuperTeamAcceptJoinApplication'
                : 'v2TeamAcceptJoinApplication'
          try {
            yield this.core.sendCmd(s, { teamId: i, from: r }),
              this.notification.updateTeamActionStatus(e, 1)
          } catch (t) {
            var n = t
            throw (
              (this.notification.checkIfExpired(n.code) &&
                this.notification.updateTeamActionStatus(e, 3),
              t)
            )
          }
        })
      }
      rejectJoinApplication(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(So, e, 'applicationInfo', !0),
            ye(Ao, e, 'applicationInfo', !0),
            ye(
              {
                postscript: Object.assign(Object.assign({}, po), {
                  required: !1,
                }),
              },
              { postscript: t },
              '',
              !0
            )
          var { teamType: i, teamId: r, operatorAccountId: s } = e,
            n =
              2 === i
                ? 'v2SuperTeamRejectJoinApplication'
                : 'v2TeamRejectJoinApplication'
          try {
            yield this.core.sendCmd(n, { teamId: r, from: s, ps: t || '' }),
              this.notification.updateTeamActionStatus(e, 2)
          } catch (t) {
            var o = t
            throw (
              (this.notification.checkIfExpired(o.code) &&
                this.notification.updateTeamActionStatus(e, 3),
              t)
            )
          }
        })
      }
      updateTeamMemberRole(e, t, i, r) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye({ memberAccountIds: co }, { memberAccountIds: i }, '', !0),
            ye({ memberRole: Mo }, { memberRole: r }, '', !0)
          var s = 2 === r ? 'AddManagers' : 'RemoveManagers'
          ;(s = 2 === t ? `v2SuperTeam${s}` : `v2Team${s}`),
            yield this.core.sendCmd(s, { teamId: e, accounts: ii(i) })
        })
      }
      transferTeamOwner(e, t, i, r) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye({ accountId: ho }, { accountId: i }, '', !0),
            ye(
              { leave: { type: 'boolean', required: !1 } },
              { leave: r },
              '',
              !0
            )
          var s = this.model.getById(e, t)
          if (s && s.ownerAccountId === i)
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: { reason: 'Transfer to self is not allowed' },
            })
          var n = 2 === t ? 'v2SuperTeamTransferOwner' : 'v2TeamTransferOwner'
          yield this.core.sendCmd(n, { teamId: e, account: i, leave: r || !1 })
        })
      }
      updateSelfTeamMemberInfo(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          if (
            (this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye(_o, { memberInfoParams: i }, '', !0),
            void 0 === i.teamNick && void 0 === i.serverExtension)
          )
            throw new he({ code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER })
          var r =
              2 === t
                ? 'v2SuperTeamUpdateSelfMemberInfo'
                : 'v2TeamUpdateSelfMemberInfo',
            s = Object.assign(Object.assign({}, i), {
              teamId: e,
              accountId: this.core.account,
            }),
            n = i.antispamConfig
              ? {
                  teamMember: s,
                  specialFollowUpdate: {},
                  antispam: i.antispamConfig,
                }
              : { teamMember: s }
          yield this.core.sendCmd(r, n),
            yield this.notification.updateTeamMemberRole(
              e,
              t,
              [this.core.account],
              s
            )
          var o = this.memberModel.getById(e, t, this.core.account)
          if (
            this.core.V2NIMSettingService.name &&
            this.core.V2NIMConversationIdUtil.name
          ) {
            var a =
                1 === t
                  ? this.core.V2NIMConversationIdUtil.teamConversationId(e)
                  : this.core.V2NIMConversationIdUtil.superTeamConversationId(
                      e
                    ),
              c = this.core.V2NIMSettingService.getConversationMuteStatus(a)
            this.core.eventBus.emit('V2NIMSettingService/setMute', a, c)
          }
          this.core.eventBus.emit(
            'forwardSend/V2NIMTeamService/updateSelfTeamMemberInfo',
            o
          )
        })
      }
      updateTeamMemberNick(e, t, i, r) {
        return Te(this, void 0, void 0, function* () {
          if (
            (this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye({ accountId: ho }, { accountId: i }, '', !0),
            ye({ nick: po }, { nick: r }, '', !0),
            i === this.core.account)
          )
            return this.updateSelfTeamMemberInfo(e, t, { teamNick: r })
          var s = 2 === t ? 'v2SuperTeamUpdateMember' : 'v2TeamUpdateMember'
          yield this.core.sendCmd(s, {
            teamMember: { teamNick: r, teamId: e, accountId: i },
          })
        })
      }
      updateTeamMemberNickEx(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          if (
            (this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye(bo, i, '', !0),
            i.accountId === this.core.account)
          )
            return this.updateSelfTeamMemberInfo(e, t, {
              teamNick: i.teamNick,
              antispamConfig: i.antispamConfig,
            })
          var r = 2 === t ? 'v2SuperTeamUpdateMember' : 'v2TeamUpdateMember'
          yield this.core.sendCmd(r, {
            teamMember: {
              teamNick: i.teamNick,
              teamId: e,
              accountId: i.accountId,
            },
            antispam: i.antispamConfig,
          })
        })
      }
      setTeamChatBannedMode(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye(Eo, { chatBannedMode: i }, '', !0)
          var r =
            2 === t ? 'v2SuperTeamSetChatBannedMode' : 'v2TeamSetChatBannedMode'
          yield this.core.sendCmd(r, { teamId: e, chatBannedMode: i }),
            this.model.upsert({ teamId: e, teamType: t, chatBannedMode: i })
        })
      }
      setTeamMemberChatBannedStatus(e, t, i, r) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye({ accountId: ho }, { accountId: i }, '', !0),
            ye({ chatBanned: lo }, { chatBanned: r }, '', !0)
          var s =
            2 === t
              ? 'v2SuperTeamMemberSetChatBannedStatus'
              : 'v2TeamMemberSetChatBannedStatus'
          yield this.core.sendCmd(s, {
            teamId: e,
            accountId: 2 === t ? [i] : i,
            chatBanned: r ? 1 : 0,
          })
        })
      }
      getTeamMemberList(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye(To, { queryOption: i }, '', !0)
          var r = void 0 === i.direction ? 0 : i.direction
          r = 0 === r ? 1 : 0
          var s = yield this.core.sendCmd('v2TeamMemberGetList', {
              tag: Object.assign(
                Object.assign(
                  {
                    teamId: e,
                    teamType: t,
                    onlyChatBanned: !1,
                    nextToken: '',
                    limit: 100,
                  },
                  i
                ),
                { direction: r }
              ),
            }),
            n = s.content.datas,
            o = Ve(s, 'raw.r.0')
          return (
            2 === t && o && o.map && (n = o.map((e) => gt(e, ft(Lr)))),
            {
              nextToken: s.content.pageInfo.nextToken || '',
              finished: !+s.content.pageInfo.hasMore,
              memberList: Br(n, t),
            }
          )
        })
      }
      getTeamMemberListByIds(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye({ accountIds: co }, { accountIds: i }, '', !0)
          for (
            var r =
                2 === t
                  ? 'v2SuperTeamMemberGetListByIds'
                  : 'v2TeamMemberGetListByIds',
              s = i.map((t) => `${e}|${t}`),
              n = [],
              o = 0;
            o < s.length;
            o += 20
          ) {
            var a = Br(
              (yield this.core.sendCmd(r, { tag: s.slice(o, o + 20) })).content
                .datas,
              t
            )
            ;(n = n.concat(a)), a.forEach((e) => this.memberModel.upsert(e))
          }
          return n
        })
      }
      getTeamMemberInvitor(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(mo, { teamId: e }, '', !0),
            ye(vo, { teamType: t }, '', !0),
            ye({ accountIds: co }, { accountIds: i }, '', !0)
          var r =
            2 === t ? 'v2SuperTeamGetMemberInvitor' : 'v2TeamGetMemberInvitor'
          return (yield this.core.sendCmd(r, {
            teamId: e,
            accounts: i,
          })).content.accountsMap
        })
      }
      searchTeamByKeyword(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            this.checkLogin(),
            ye({ keyword: ho }, { keyword: e }, '', !0),
            this.model.searchTeamByKeyword(e)
          )
        })
      }
      addTeamMembersFollow(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(Oo, { teamId: e, teamType: t, accountIds: i }, '', !0)
          var r =
              2 === t
                ? 'v2SuperTeamUpdateSelfMemberInfo'
                : 'v2TeamUpdateSelfMemberInfo',
            [s] = yield this.getTeamMemberListByIds(e, t, [this.core.account]),
            n = (yield this.core.sendCmd(r, {
              teamMember: { teamId: e },
              specialFollowUpdate: { accountIds: i, operation: 1 },
            })).content.data
          Object.keys(n).length > 0 &&
            (Object.assign(s, n),
            this.emit('onTeamMemberInfoUpdated', [s]),
            this.memberModel.upsert(s))
        })
      }
      removeTeamMembersFollow(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(Oo, { teamId: e, teamType: t, accountIds: i }, '', !0)
          var [r] = yield this.getTeamMemberListByIds(e, t, [
              this.core.account,
            ]),
            s =
              2 === t
                ? 'v2SuperTeamUpdateSelfMemberInfo'
                : 'v2TeamUpdateSelfMemberInfo',
            n = (yield this.core.sendCmd(s, {
              teamMember: { teamId: e },
              specialFollowUpdate: { accountIds: i, operation: 0 },
            })).content.data
          Object.keys(n).length > 0 &&
            (Object.assign(r, n),
            this.emit('onTeamMemberInfoUpdated', [r]),
            this.memberModel.upsert(r))
        })
      }
      getTeamJoinActionInfoList(e) {
        return (
          this.checkV2(),
          ye(Ro, e, 'option', !0),
          this.core.V2NIMLoginService.checkIllegalState(),
          Promise.resolve(this.notificationModel.getByOption(e))
        )
      }
      clearAllTeamJoinActionInfo() {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            this.notificationModel.reset()
        })
      }
      deleteTeamJoinActionInfo(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            ye(So, e, '', !0),
            ye(Co, e, '', !0),
            ye({ timestamp: { type: 'number', min: 1 } }, e, '', !0),
            this.notificationModel.delete(e)
        })
      }
      setTeamJoinActionInfoRead(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            e
              ? (ye(So, e, '', !0),
                ye(Co, e, '', !0),
                this.notificationModel.setRead(e))
              : this.notificationModel.setAllRead()
        })
      }
      getTeamJoinActionInfoUnreadCount() {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            this.notificationModel.getUnreadCount()
          )
        })
      }
    },
    'V2NIMTeamService'
  ),
  sc.registerService(Ho, 'V2NIMUserService'),
  sc.registerService(
    class extends ni {
      constructor(e) {
        super('V2NIMFriendService', e),
          (this.notification = new ia(this.core, this)),
          (this.model = new ra()),
          (this.notificationModel = new sa()),
          this.core._registerDep(Ho, 'V2NIMUserService'),
          'v2' === this.core.options.apiVersion &&
            (vt({ cmdMap: Ko, cmdConfig: Jo }), this.setListener())
      }
      reset() {
        this.model.reset()
      }
      setListener() {
        this.core.eventBus.on(
          'V2NIMFriendService/sysNotification',
          this.notification.processSysNotification.bind(this.notification)
        ),
          this.core.eventBus.on(
            'forwardReceive/V2NIMFriendService/addFriend',
            this.handleAddFriend.bind(this)
          ),
          this.core.eventBus.on(
            'forwardReceive/V2NIMFriendService/deleteFriend',
            this.handleDeleteFriend.bind(this)
          ),
          this.core.eventBus.on(
            'forwardReceive/V2NIMFriendService/setFriendInfo',
            this.handleSetFriendInfo.bind(this)
          ),
          this.core.eventBus.on(
            'forwardReceive/V2NIMFriendService/acceptAddApplication',
            this.handlePassFriendApply.bind(this)
          ),
          this.core.eventBus.on(
            'forwardReceive/V2NIMFriendService/rejectAddApplication',
            this.handleRejectFriendApply.bind(this)
          )
      }
      emit(e, ...t) {
        var i = `${this.name}::emit ${e.toString()}`
        if ('onFriendAdded' === e || 'onFriendInfoChanged' === e) {
          var r = t[0]
          this.logger.log(`${i}`, `${r.accountId};updateTime:${r.updateTime}`)
        } else this.logger.log(`${i}`, ...t)
        return super.emit(e, ...t)
      }
      get hasUserService() {
        var e
        return !!(null === (e = this.core.V2NIMUserService) || void 0 === e
          ? void 0
          : e.name)
      }
      addFriend(e, t) {
        return Te(this, void 0, void 0, function* () {
          if ((this.checkV2(), e === this.core.account))
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: { reason: 'Cannot add yourself' },
            })
          ye(zo, { accountId: e, params: t }, '', !0),
            yield this.core.sendCmd('v2AddFriend', {
              accountId: e,
              verifyType: t.addMode,
              postscript: t.postscript || '',
            }),
            1 === t.addMode &&
              (yield this.handleAddFriend(e),
              this.notificationModel.updateFriendAddApplicationStatus(
                e,
                4,
                this.core.account
              ))
        })
      }
      deleteFriend(e, t) {
        return Te(this, void 0, void 0, function* () {
          if ((this.checkV2(), e === this.core.account))
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: { reason: 'Cannot delete yourself' },
            })
          ye(Xo, { accountId: e, params: t }, '', !0),
            yield this.core.sendCmd('v2DeleteFriend', {
              accountId: e,
              params: t,
            }),
            t.deleteAlias && this.model.upsertFriend(e, { alias: '' }),
            this.handleDeleteFriend(e)
        })
      }
      acceptAddApplication(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(), ea(e, this.core.account)
          try {
            yield this.core.sendCmd('v2AddFriend', {
              accountId: e.applicantAccountId,
              verifyType: 3,
              postscript: '',
            }),
              this.handlePassFriendApply(e.applicantAccountId)
          } catch (t) {
            throw (this.handlePassFriendApply(e.applicantAccountId, t), t)
          }
        })
      }
      rejectAddApplication(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(), ea(e, this.core.account)
          try {
            yield this.core.sendCmd('v2AddFriend', {
              accountId: e.applicantAccountId,
              verifyType: 4,
              postscript: t || '',
            }),
              this.handleRejectFriendApply({
                applicantAccountId: e.applicantAccountId,
                recipientAccountId: e.recipientAccountId,
                operatorAccountId: this.core.account,
                postscript: t || '',
                timestamp: this.core.timeOrigin.getNTPTime(),
                read: !1,
                status: 2,
              })
          } catch (i) {
            throw (
              (this.handleRejectFriendApply(
                {
                  applicantAccountId: e.applicantAccountId,
                  recipientAccountId: e.recipientAccountId,
                  operatorAccountId: this.core.account,
                  postscript: t || '',
                  timestamp: this.core.timeOrigin.getNTPTime(),
                  read: !1,
                  status: 3,
                },
                i
              ),
              i)
            )
          }
        })
      }
      setFriendInfo(e, t) {
        return Te(this, void 0, void 0, function* () {
          if (
            (this.checkV2(),
            ye(Qo, { accountId: e, params: t }, '', !0),
            e === this.core.account)
          )
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: { reason: 'Cannot set yourself' },
            })
          yield this.core.sendCmd('v2SetFriendInfo', {
            tag: Object.assign({ accountId: e }, t),
          }),
            this.handleSetFriendInfo(e, t)
        })
      }
      getFriendList() {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            this.computedFields(this.model.getFriendList())
          )
        })
      }
      getFriendByIds(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            ye(
              {
                accountIds: {
                  type: 'array',
                  itemType: 'string',
                  required: !0,
                  min: 1,
                },
              },
              { accountIds: e },
              '',
              !0
            ),
            this.computedFields(this.model.getFriendByIds(e))
          )
        })
      }
      checkFriend(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            ye(
              {
                accountIds: {
                  type: 'array',
                  itemType: 'string',
                  required: !0,
                  min: 1,
                },
              },
              { accountIds: e },
              '',
              !0
            )
          var t = {}
          return (
            e.forEach((e) => {
              t[e] = !!this.model.getFriend(e)
            }),
            t
          )
        })
      }
      getAddApplicationList(e) {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            ye(ta, e, '', !0),
            this.notificationModel.getAddApplicationList(e)
          )
        })
      }
      setAddApplicationRead() {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            this.notificationModel.setAllApplicationRead()
        })
      }
      setAddApplicationReadEx(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            e
              ? (ea(e, this.core.account),
                this.notificationModel.setApplicationRead(e))
              : this.notificationModel.setAllApplicationRead()
        })
      }
      getAddApplicationUnreadCount() {
        return Te(this, void 0, void 0, function* () {
          return (
            this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            this.notificationModel.getAddApplicationUnreadCount()
          )
        })
      }
      clearAllAddApplication() {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            this.notificationModel.clearApplicationList()
        })
      }
      deleteAddApplication(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            ea(e, this.core.account),
            this.notificationModel.deleteApplication(e)
        })
      }
      searchFriendByOption(e) {
        return Te(this, void 0, void 0, function* () {
          if (
            (this.checkV2(),
            this.core.V2NIMLoginService.checkIllegalState(),
            ye(
              {
                keyword: { type: 'string', allowEmpty: !1 },
                searchAccountId: { type: 'boolean', required: !1 },
              },
              e,
              '',
              !0
            ),
            void 0 !== e.searchAlias && !e.searchAlias && !e.searchAccountId)
          )
            throw new he({
              code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
              detail: {
                reason:
                  'searchAlias and searchAccountId cannot be false at the same time',
              },
            })
          return this.computedFields(this.model.getFriendListBySearchOption(e))
        })
      }
      v2OnAddFriendHandler(e) {
        var { accountId: t, verifyType: i, postscript: r } = e.content
        if (1 === i)
          this.handleAddFriend(t),
            this.notificationModel.updateFriendAddApplicationStatus(
              t,
              4,
              this.core.account
            )
        else if (2 === i) {
          var s = {
            applicantAccountId: this.core.account,
            recipientAccountId: t,
            operatorAccountId: this.core.account,
            postscript: r,
            timestamp: this.core.timeOrigin.getNTPTime(),
            status: 0,
            read: !1,
          }
          this.handleApplyFriend(s)
        } else if (3 === i) this.handlePassFriendApply(t)
        else if (4 === i) {
          var n = {
            applicantAccountId: t,
            recipientAccountId: this.core.account,
            operatorAccountId: this.core.account,
            postscript: r,
            timestamp: this.core.timeOrigin.getNTPTime(),
            status: 2,
            read: !1,
          }
          this.handleRejectFriendApply(n)
        }
      }
      v2OnDeleteFriendHandler(e) {
        var { accountId: t } = e.content
        this.handleDeleteFriend(t)
      }
      v2OnUpdateFriendInfoHandler(e) {
        var { data: t } = e.content,
          i = this.model.upsertFriend(t.accountId, t)
        this.emit('onFriendInfoChanged', this.computedField(i))
      }
      v2SyncFriendListHandler(e) {
        var { friends: t, timetag: i } = e.content
        this.model.setFriendTimetag(i),
          t.forEach((e) => {
            e.serverExtension || (e.serverExtension = ''),
              e.customerExtension || (e.customerExtension = ''),
              0 === e.relationShip
                ? this.model.deleteFriend(e.accountId)
                : this.model.upsertFriend(e.accountId, e)
          })
      }
      v2SyncFriendUserListHandler(e) {
        var { users: t } = e.content
        this.hasUserService &&
          t.forEach((e) => {
            this.core.V2NIMUserService.model.setUser(e)
          })
      }
      handleApplyFriend(e) {
        this.emit('onFriendAddApplication', e)
      }
      handleAddFriend(e, t) {
        return Te(this, void 0, void 0, function* () {
          this.model.addFriend(e),
            yield this.incrementSyncFriend(),
            yield this.core.V2NIMUserService.refreshUserInfo(e)
          var t = this.model.getFriend(e)
          t && this.emit('onFriendAdded', this.computedField(t))
        })
      }
      handleDeleteFriend(e, t) {
        ;(t = void 0 === t ? 1 : t),
          this.emit('onFriendDeleted', e, t),
          this.model.deleteFriend(e)
      }
      handleSetFriendInfo(e, t) {
        var i = this.model.upsertFriend(e, t)
        this.emit('onFriendInfoChanged', this.computedField(i))
      }
      handlePassFriendApply(e, t) {
        var i = t ? (null == t ? void 0 : t.code) : 200
        if (
          !(i >= 19e4 || i === de.V2NIM_ERROR_CODE_FRIEND_OPERATION_RATE_LIMIT)
        )
          if (200 === i || i === de.V2NIM_ERROR_CODE_FRIEND_ALREADY_EXIST)
            this.notificationModel.updateFriendAddApplicationStatus(
              e,
              1,
              this.core.account
            ),
              this.handleAddFriend(e)
          else {
            if (i >= 500 && i <= 599 && 509 !== i) return
            this.notificationModel.updateFriendAddApplicationStatus(
              e,
              3,
              this.core.account
            )
          }
      }
      handleRejectFriendApply(e, t) {
        var i = t ? (null == t ? void 0 : t.code) : 200
        if (
          !(i >= 19e4 || i === de.V2NIM_ERROR_CODE_FRIEND_OPERATION_RATE_LIMIT)
        )
          if (200 === i)
            this.emit('onFriendAddRejected', e),
              this.notificationModel.updateFriendAddApplicationStatus(
                e.applicantAccountId,
                2,
                this.core.account
              )
          else if (i === de.V2NIM_ERROR_CODE_FRIEND_ALREADY_EXIST)
            this.notificationModel.updateFriendAddApplicationStatus(
              e.applicantAccountId,
              1,
              this.core.account
            )
          else {
            if (i >= 500 && i <= 599 && 509 !== i) return
            this.notificationModel.updateFriendAddApplicationStatus(
              e.applicantAccountId,
              3,
              this.core.account
            )
          }
      }
      incrementSyncFriend() {
        return Te(this, void 0, void 0, function* () {
          var e = yield this.core.sendCmd('v2IncFriendInfo', {
              timetag: this.model.getFriendTimetag(),
            }),
            { friends: t, timetag: i } = e.content
          this.model.setFriendTimetag(i),
            t.forEach((e) => {
              this.model.upsertFriend(e.accountId, e)
            })
        })
      }
      computedFields(e) {
        return e.map((e) => this.computedField(e))
      }
      computedField(e) {
        var t,
          i,
          r =
            null ===
              (i =
                null === (t = this.core.V2NIMUserService) || void 0 === t
                  ? void 0
                  : t.model) || void 0 === i
              ? void 0
              : i.getUser(e.accountId)
        return r ? Object.assign({}, e, { userProfile: r }) : e
      }
    },
    'V2NIMFriendService'
  ),
  sc.registerService(
    class extends ni {
      constructor(e, t) {
        super('V2NIMNotificationService', e),
          (this.config = { compatibleWithV1: !0 }),
          (this.notificationUtil = new vs(this.core)),
          this.core._registerDep(xi, 'V2NIMConversationIdUtil'),
          'v2' === this.core.options.apiVersion &&
            (vt({ cmdMap: ds, cmdConfig: hs }), this.setOptions(t))
      }
      setOptions(e) {
        var t
        ;(
          null === (t = this.core.systemMessage) || void 0 === t
            ? void 0
            : t.name
        )
          ? (this.config.compatibleWithV1 = !0)
          : (this.config.compatibleWithV1 = !1),
          (this.config = Object.assign(this.config, e))
      }
      emit(e, ...t) {
        var i = `${this.name}::emit ${e.toString()}`
        if ('onReceiveCustomNotifications' === e) {
          var r = t[0]
          this.logger.log(
            `${i}`,
            r.map(
              (e) =>
                `sender:${e.senderId};receiver:${e.receiverId};ctype:${e.conversationType};time:${e.timestamp}`
            )
          )
        } else if ('onReceiveBroadcastNotifications' === e) {
          var s = t[0]
          this.logger.log(
            `${i}`,
            s.map((e) => `id:${e.id};sender:${e.senderId};time:${e.timestamp}`)
          )
        } else this.logger.log(`${i}`, ...t)
        return super.emit(e, ...t)
      }
      sendCustomNotification(e, t, i) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            Me(this.core.account, e),
            ye(gs, { content: t, params: i }, '', !0)
          var r =
              3 === this.core.V2NIMConversationIdUtil.parseConversationType(e)
                ? 'v2SendCustomNotificationWithSuperTeam'
                : 'v2SendCustomNotification',
            s = this.notificationUtil.generateNotificationTag(e, t, i)
          yield this.core.sendCmd(r, { tag: s })
        })
      }
      processSystemNotification(e) {
        var t = e.type
        if ([0, 1, 2, 3, 4, 15, 16, 17, 18].includes(t))
          this.core.eventBus.emit('V2NIMTeamService/sysNotification', e)
        else {
          if (![5, 6].includes(t)) {
            var i = Object.assign(Object.assign({}, e), {
              conversationType: { 100: 1, 101: 2, 102: 1, 103: 3 }[t],
            })
            return delete i.type, i
          }
          this.core.eventBus.emit('V2NIMFriendService/sysNotification', e)
        }
      }
      markBroadcastMsgAck(e) {
        this.config.compatibleWithV1 ||
          this.core.sendCmd('v2BatchMarkRead', {
            sid: 7,
            cid: 17,
            ids: e.map((e) => e.id),
          })
      }
      syncBroadcastMsgHandler(e) {
        var t = e.content.datas
        this.markBroadcastMsgAck(t),
          t.forEach((e) => {
            this.core.eventBus.emit('V2NIMSync/updateTimetag', {
              broadcastMsgs: parseInt(e.id),
            })
          }),
          this.emit('onReceiveBroadcastNotifications', t)
      }
      onBroadcastMsgHandler(e) {
        var t = e.content.data
        this.markBroadcastMsgAck([t]),
          this.core.eventBus.emit('V2NIMSync/updateTimetag', {
            broadcastMsgs: parseInt(t.id),
          }),
          this.emit('onReceiveBroadcastNotifications', [t])
      }
      onSysNotificationHandler(e) {
        var t = $e(e, e.content.data, 'idServer')
        this.markSysNotificationAck([t])
        var i = this.processSystemNotification(t)
        i && this.emit('onReceiveCustomNotifications', [i])
      }
      v2SyncOfflineSysNotificationsHandler(e) {
        this.markSysNotificationAck(e.content.datas)
        var t = e.content.datas
          .sort((e, t) => e.timestamp - t.timestamp)
          .map((e) => this.processSystemNotification(e))
          .filter((e) => e)
        t && this.emit('onReceiveCustomNotifications', t)
      }
      v2NotificationRevokeHandler(e) {
        var t = $e(e, e.content.data, 'idServer')
        this.markSysNotificationAck([t])
      }
      v2NotificationSyncRevokeHandler(e) {
        var { type: t } = e.content
        1 === parseInt(t) && this.markSysNotificationAck(e.content.datas)
      }
      markSysNotificationAck(e) {
        if (!this.config.compatibleWithV1) {
          var t = [],
            i = [],
            r = [15, 16, 17, 18, 103]
          e.forEach((e) => {
            e.idServer &&
              (r.includes(e.type) ? i.push(e.idServer) : t.push(e.idServer))
          }),
            t.length > 0 &&
              this.core.sendCmd('v2BatchMarkRead', {
                sid: '7',
                cid: '3',
                ids: t,
              }),
            i.length > 0 &&
              this.core.sendCmd('v2BatchMarkRead', {
                sid: '21',
                cid: '19',
                ids: i,
              })
        }
      }
    },
    'V2NIMNotificationService'
  ),
  sc.registerService(
    class extends ni {
      constructor(e) {
        super('V2NIMSettingService', e),
          (this.needToPushMobileOnDesktopOnline = !0),
          this.core._registerDep(xi, 'V2NIMConversationIdUtil'),
          (this.push = new Va(e, this)),
          (this.mute = new Pa(e, this)),
          (this.event = new La(e, this)),
          (this.handler = new ua(e, this)),
          'v2' === this.core.options.apiVersion &&
            (this.setListener(), vt({ cmdMap: la, cmdConfig: ha }))
      }
      get hasUserService() {
        var e
        return !!(null === (e = this.core.V2NIMUserService) || void 0 === e
          ? void 0
          : e.name)
      }
      get hasTeamService() {
        var e
        return !!(null === (e = this.core.V2NIMTeamService) || void 0 === e
          ? void 0
          : e.name)
      }
      setListener() {
        this.event.setListener()
      }
      emit(e, ...t) {
        var i = `${this.name}::emit ${e.toString()}`
        return this.logger.log(`${i}`, ...t), super.emit(e, ...t)
      }
      getConversationMuteStatus(e) {
        return this.mute.getConversationMuteStatus(e)
      }
      setTeamMessageMuteMode(e, t, i) {
        if (!this.hasTeamService)
          throw new he({
            code: de.V2NIM_ERROR_CODE_MISUSE,
            detail: { reason: 'setTeamMessageMuteMode: no team service' },
          })
        return (
          this.checkV2(),
          ye(mo, { teamId: e }, '', !0),
          ye(vo, { teamType: t }, '', !0),
          ye(na, { muteMode: i }, '', !0),
          this.mute.setTeamMessageMuteMode(e, t, i)
        )
      }
      getTeamMessageMuteMode(e, t) {
        return this.mute.getTeamMessageMuteMode(e, t)
      }
      getAllTeamMessageMuteMode(e) {
        return (
          this.checkV2(),
          this.checkLogin(),
          ye(vo, { teamType: e }, '', !0),
          this.mute.getAllTeamMessageMuteMode(e)
        )
      }
      setP2PMessageMuteMode(e, t) {
        if (
          (this.checkV2(),
          ye(oa, { accountId: e, muteMode: t }, '', !0),
          e === this.core.account)
        )
          throw new he({
            code: de.V2NIM_ERROR_CODE_INVALID_PARAMETER,
            detail: { reason: 'can not set mute mode for self' },
          })
        return this.mute.setP2PMessageMuteMode(e, t)
      }
      getP2PMessageMuteMode(e) {
        return (
          ye(
            { accountId: { type: 'string', required: !0, allowEmpty: !1 } },
            { accountId: e },
            '',
            !0
          ),
          this.mute.getP2PMessageMuteMode(e)
        )
      }
      getP2PMessageMuteList() {
        return this.mute.getP2PMessageMuteList()
      }
      setAppBackground(e, t) {
        return (
          this.checkV2(),
          ye(
            {
              isBackground: { type: 'boolean' },
              badge: { type: 'number', required: !1 },
            },
            { isBackground: e, badge: t },
            '',
            !0
          ),
          this.push.setAppBackground(e, t)
        )
      }
      setOfflinePushConfig(e, t) {
        ye(ca, { config: t }, '', !0), this.push.setOfflinePushConfig(e, t)
      }
      setPushMobileOnDesktopOnline(e) {
        return Te(this, void 0, void 0, function* () {
          this.checkV2(),
            ye(
              { need: { type: 'boolean', required: !1 } },
              { need: e },
              '',
              !0
            ),
            (e = void 0 === e || e),
            yield this.core.sendCmd('v2SetPushMobileOnDesktopOnline', {
              tag: { need: e },
            }),
            (this.needToPushMobileOnDesktopOnline = e),
            this.emit('onPushMobileOnDesktopOnline', e)
        })
      }
      getPushMobileOnDesktopOnline() {
        return (
          this.checkLogin(),
          Promise.resolve(this.needToPushMobileOnDesktopOnline)
        )
      }
    },
    'V2NIMSettingService'
  ),
  sc.registerService(
    class {
      constructor(e) {
        ;(this.name = 'V2NIMMessageConverter'), (this.core = e)
      }
      messageSerialization(e) {
        if (!e) return null
        var t = mt(e, Zr)
        return JSON.stringify(t)
      }
      messageDeserialization(e) {
        var t, i, r, s, n, o, a, c, d, l, p, h, u, m, g, v, f, y, I, M, _, E, T
        if (!e) return null
        try {
          var S = gt(JSON.parse(e), es)
          return (
            (S.sendingState = 0),
            1 !== S.conversationType ||
            (S.senderId !== this.core.account &&
              S.receiverId !== this.core.account)
              ? 2 === S.conversationType
                ? (S.conversationId =
                    this.core.V2NIMConversationIdUtil.teamConversationId(
                      S.receiverId
                    ))
                : 3 === S.conversationType &&
                  (S.conversationId =
                    this.core.V2NIMConversationIdUtil.superTeamConversationId(
                      S.receiverId
                    ))
              : (S.conversationId =
                  this.core.V2NIMConversationIdUtil.p2pConversationId(
                    S.senderId === this.core.account ? S.receiverId : S.senderId
                  )),
            S.threadReply &&
              ((S.threadReply.conversationType = S.conversationType),
              (S.threadReply = jr(this.core, S.threadReply))),
            S.threadRoot &&
              ((S.threadRoot.conversationType = S.conversationType),
              (S.threadRoot = jr(this.core, S.threadRoot))),
            [1, 3, 2, 0].includes(S.conversationType) ||
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid conversationType(enum): ${S.conversationType}`
              ),
            S.senderId &&
              'string' != typeof S.senderId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid senderId(string): ${S.senderId}`
              ),
            S.receiverId &&
              'string' != typeof S.receiverId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid receiverId(string): ${S.receiverId}`
              ),
            'createTime' in S &&
              isNaN(S.createTime) &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid createTime(number): ${S.createTime}`
              ),
            [2, 7, 12, 100, 6, 1, -1, 4, 5, 11, 0, 10, 3].includes(
              S.messageType
            ) ||
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid messageType(enum): ${S.messageType}`
              ),
            'subType' in S &&
              isNaN(S.subType) &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid subType(number): ${S.subType}`
              ),
            S.messageClientId &&
              'string' != typeof S.messageClientId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid messageClientId(string): ${S.messageClientId}`
              ),
            S.messageServerId &&
              'string' != typeof S.messageServerId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid messageServerId(string): ${S.messageServerId}`
              ),
            S.attachment &&
              'object' != typeof S.attachment &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid attachment(object): ${S.attachment}`
              ),
            S.text &&
              'string' != typeof S.text &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid text(string): ${S.text}`
              ),
            S.serverExtension &&
              'string' != typeof S.serverExtension &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid serverExtension(string): ${S.serverExtension}`
              ),
            S.callbackExtension &&
              'string' != typeof S.callbackExtension &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid callbackExtension(string): ${S.callbackExtension}`
              ),
            (null === (t = S.pushConfig) || void 0 === t
              ? void 0
              : t.pushContent) &&
              'string' != typeof S.pushConfig.pushContent &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid pushContent(string): ${S.pushConfig.pushContent}`
              ),
            (null === (i = S.pushConfig) || void 0 === i
              ? void 0
              : i.pushPayload) &&
              'string' != typeof S.pushConfig.pushPayload &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid pushPayload(string): ${S.pushConfig.pushPayload}`
              ),
            (null === (r = S.pushConfig) || void 0 === r
              ? void 0
              : r.forcePushContent) &&
              'string' != typeof S.pushConfig.forcePushContent &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid forcePushContent(string): ${S.pushConfig.forcePushContent}`
              ),
            (null === (s = S.pushConfig) || void 0 === s
              ? void 0
              : s.forcePushAccountIds) &&
              !Array.isArray(S.pushConfig.forcePushAccountIds) &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid forcePushAccountIds(array): ${S.pushConfig.forcePushAccountIds}`
              ),
            (null === (n = S.routeConfig) || void 0 === n
              ? void 0
              : n.routeEnvironment) &&
              'string' != typeof S.routeConfig.routeEnvironment &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid routeEnvironment(string): ${S.routeConfig.routeEnvironment}`
              ),
            (null === (o = S.antispamConfig) || void 0 === o
              ? void 0
              : o.antispamBusinessId) &&
              'string' != typeof S.antispamConfig.antispamBusinessId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid antispamBusinessId(string): ${S.antispamConfig.antispamBusinessId}`
              ),
            (null === (a = S.antispamConfig) || void 0 === a
              ? void 0
              : a.antispamCustomMessage) &&
              'string' != typeof S.antispamConfig.antispamCustomMessage &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid antispamCustomMessage(string): ${S.antispamConfig.antispamCustomMessage}`
              ),
            (null === (c = S.antispamConfig) || void 0 === c
              ? void 0
              : c.antispamCheating) &&
              'string' != typeof S.antispamConfig.antispamCheating &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid antispamCheating(string): ${S.antispamConfig.antispamCheating}`
              ),
            (null === (d = S.antispamConfig) || void 0 === d
              ? void 0
              : d.antispamExtension) &&
              'string' != typeof S.antispamConfig.antispamExtension &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid antispamExtension(string): ${S.antispamConfig.antispamExtension}`
              ),
            (null === (l = S.robotConfig) || void 0 === l
              ? void 0
              : l.accountId) &&
              'string' != typeof S.robotConfig.accountId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid accountId(string): ${S.robotConfig.accountId}`
              ),
            (null === (p = S.robotConfig) || void 0 === p ? void 0 : p.topic) &&
              'string' != typeof S.robotConfig.topic &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid topic(string): ${S.robotConfig.topic}`
              ),
            (null === (h = S.robotConfig) || void 0 === h
              ? void 0
              : h.function) &&
              'string' != typeof S.robotConfig.function &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid function(string): ${S.robotConfig.function}`
              ),
            (null === (u = S.robotConfig) || void 0 === u
              ? void 0
              : u.customContent) &&
              'string' != typeof S.robotConfig.customContent &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid customContent(string): ${S.robotConfig.customContent}`
              ),
            (null === (m = S.threadRoot) || void 0 === m
              ? void 0
              : m.senderId) &&
              'string' != typeof S.threadRoot.senderId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid senderId(string): ${S.threadRoot.senderId}`
              ),
            (null === (g = S.threadRoot) || void 0 === g
              ? void 0
              : g.receiverId) &&
              'string' != typeof S.threadRoot.receiverId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid receiverId(string): ${S.threadRoot.receiverId}`
              ),
            (null === (v = S.threadRoot) || void 0 === v
              ? void 0
              : v.messageClientId) &&
              'string' != typeof S.threadRoot.messageClientId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid messageClientId(string): ${S.threadRoot.messageClientId}`
              ),
            (null === (f = S.threadRoot) || void 0 === f
              ? void 0
              : f.messageServerId) &&
              'string' != typeof S.threadRoot.messageServerId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid messageServerId(string): ${S.threadRoot.messageServerId}`
              ),
            S.threadRoot &&
              'createTime' in S.threadRoot &&
              isNaN(S.threadRoot.createTime) &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid createTime(number): ${S.threadRoot.createTime}`
              ),
            S.threadRoot &&
              ![1, 3, 2, 0].includes(S.threadRoot.conversationType) &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid conversationType(enum): ${S.threadRoot.conversationType}`
              ),
            (null === (y = S.threadRoot) || void 0 === y
              ? void 0
              : y.conversationId) &&
              'string' != typeof S.threadRoot.conversationId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid conversationId(string): ${S.threadRoot.conversationId}`
              ),
            (null === (I = S.threadReply) || void 0 === I
              ? void 0
              : I.senderId) &&
              'string' != typeof S.threadReply.senderId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid senderId(string): ${S.threadReply.senderId}`
              ),
            (null === (M = S.threadReply) || void 0 === M
              ? void 0
              : M.receiverId) &&
              'string' != typeof S.threadReply.receiverId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid receiverId(string): ${S.threadReply.receiverId}`
              ),
            (null === (_ = S.threadReply) || void 0 === _
              ? void 0
              : _.messageClientId) &&
              'string' != typeof S.threadReply.messageClientId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid messageClientId(string): ${S.threadReply.messageClientId}`
              ),
            (null === (E = S.threadReply) || void 0 === E
              ? void 0
              : E.messageServerId) &&
              'string' != typeof S.threadReply.messageServerId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid messageServerId(string): ${S.threadReply.messageServerId}`
              ),
            S.threadReply &&
              'createTime' in S.threadReply &&
              isNaN(S.threadReply.createTime) &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid createTime(number): ${S.threadReply.createTime}`
              ),
            S.threadReply &&
              ![1, 3, 2, 0].includes(S.threadReply.conversationType) &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid conversationType(enum): ${S.threadReply.conversationType}`
              ),
            (null === (T = S.threadReply) || void 0 === T
              ? void 0
              : T.conversationId) &&
              'string' != typeof S.threadReply.conversationId &&
              this.core.logger.error(
                `V2NIMMessageConverterImpl.messageDeserialization: invalid conversationId(string): ${S.threadReply.conversationId}`
              ),
            delete S.__clientExt,
            delete S.userUpdateTime,
            S
          )
        } catch (t) {
          return (
            this.core.logger.error(
              `V2NIMMessageConverterImpl.messageDeserialization: invalid message string: ${e}`
            ),
            null
          )
        }
      }
    },
    'V2NIMMessageConverter'
  )
var nc = t.p,
  oc = t.K
export { nc as NIM, oc as V2NIMConst }
