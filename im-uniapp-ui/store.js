import { makeAutoObservable } from 'mobx'
import { logDebug, EventTracking } from '@xkit-yx/utils'

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

function __rest(s, e) {
  var t = {}
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p]
  if (s != null && typeof Object.getOwnPropertySymbols === 'function')
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (
        e.indexOf(p[i]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(s, p[i])
      )
        t[p[i]] = s[p[i]]
    }
  return t
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

/**Mobx 可观察对象，负责连接的子 store */
var ConnectStore = /** @class */ (function () {
  function ConnectStore(rootStore, nim, localOptions) {
    this.rootStore = rootStore
    this.nim = nim
    this.localOptions = localOptions
    this.connectStatus = 3
    this.loginStatus = 0
    this.logger = null
    makeAutoObservable(this)
    this._onLoginStatus = this._onLoginStatus.bind(this)
    this._onLoginFailed = this._onLoginFailed.bind(this)
    this._onKickedOffline = this._onKickedOffline.bind(this)
    this._onLoginClientChanged = this._onLoginClientChanged.bind(this)
    this._onConnectStatus = this._onConnectStatus.bind(this)
    this._onDisconnected = this._onDisconnected.bind(this)
    this._onConnectFailed = this._onConnectFailed.bind(this)
    this._onDataSync = this._onDataSync.bind(this)
    this.logger = rootStore.logger
    /** 登录状态变化 */
    nim.V2NIMLoginService.on('onLoginStatus', this._onLoginStatus)
    /** 登录失败 */
    nim.V2NIMLoginService.on('onLoginFailed', this._onLoginFailed)
    /** 被踢下线 */
    nim.V2NIMLoginService.on('onKickedOffline', this._onKickedOffline)
    /** 多端登录回调 */
    nim.V2NIMLoginService.on('onLoginClientChanged', this._onLoginClientChanged)
    /** 连接状态变化 */
    nim.V2NIMLoginService.on('onConnectStatus', this._onConnectStatus)
    /** 登录连接断开 */
    nim.V2NIMLoginService.on('onDisconnected', this._onDisconnected)
    /** 登录连接失败 */
    nim.V2NIMLoginService.on('onConnectFailed', this._onConnectFailed)
    /** 数据同步 */
    nim.V2NIMLoginService.on('onDataSync', this._onDataSync)
  }
  /** 销毁 ConnectStore，并取消相关的监听 */
  ConnectStore.prototype.destroy = function () {
    this.nim.V2NIMLoginService.off('onLoginStatus', this._onLoginStatus)
    this.nim.V2NIMLoginService.off('onLoginFailed', this._onLoginFailed)
    this.nim.V2NIMLoginService.off('onKickedOffline', this._onKickedOffline)
    this.nim.V2NIMLoginService.off(
      'onLoginClientChanged',
      this._onLoginClientChanged
    )
    this.nim.V2NIMLoginService.off('onConnectStatus', this._onConnectStatus)
    this.nim.V2NIMLoginService.off('onDisconnected', this._onDisconnected)
    this.nim.V2NIMLoginService.off('onConnectFailed', this._onConnectFailed)
    this.nim.V2NIMLoginService.off('onDataSync', this._onDataSync)
  }
  ConnectStore.prototype._onLoginStatus = function (e) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onLoginStatus', e)
    this.loginStatus = e
  }
  ConnectStore.prototype._onLoginFailed = function (e) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onLoginFailed', e)
  }
  ConnectStore.prototype._onKickedOffline = function (e) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onKickedOffline', e)
  }
  ConnectStore.prototype._onLoginClientChanged = function (e) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onLoginClientChanged', e)
  }
  ConnectStore.prototype._onConnectStatus = function (e) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onConnectStatus', e)
    this.connectStatus = e
    // SDK 暂不支持自定义推送相关
    // if (e === V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED) {
    //   // 重连时需要重置其他人的登录状态
    //   this.rootStore.eventStore.stateMap.clear()
    // }
    // 同步完成之前需先清理下上次的在线离线状态，避免断开网络 好友退出登录 联网查看好友状态不对。只有在线离线需要处理，因为其他的都会在断网重连后触发其他事件，就在线离线不会触发
    // 注意这里必须同步前重置，否则会导致数据同步时的状态丢失
    if (
      e === 1 /* V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED */
    ) {
      this.rootStore.subscriptionStore.resetState()
    }
  }
  ConnectStore.prototype._onDisconnected = function (e) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onDisconnected', e)
  }
  ConnectStore.prototype._onConnectFailed = function (e) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onConnectFailed', e)
  }
  ConnectStore.prototype._onDataSync = function (type, V2NIMDataSyncState) {
    var _a, _b, _c, _d
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onDataSync', type, V2NIMDataSyncState)
    // 获取个人信息
    this.rootStore.userStore.getMyUserInfoActive()
    // 获取黑名单列表
    this.rootStore.relationStore.getBlockListActive()
    // 获取P2P免打扰列表
    this.rootStore.relationStore.getP2PMuteListActive()
    if (
      (_b = this.rootStore.sdkOptions) === null || _b === void 0
        ? void 0
        : _b.enableV2CloudConversation
    ) {
      // 获取云端会话列表
      ;(_c = this.rootStore.conversationStore) === null || _c === void 0
        ? void 0
        : _c.getConversationListActive(
            0,
            this.localOptions.conversationLimit || 100
          )
    } else {
      // 获取本地会话列表
      ;(_d = this.rootStore.localConversationStore) === null || _d === void 0
        ? void 0
        : _d.getConversationListActive(
            0,
            this.localOptions.conversationLimit || 100
          )
    }
    // 获取群组
    this.rootStore.teamStore.getJoinedTeamListActive()
    // 获取好友列表
    this.rootStore.friendStore.getFriendListActive()
    // 获取好友申请，先拉一页100条
    this.rootStore.friendStore.getAddApplicationListActive({
      status: [],
      offset: 0,
      limit: 100,
    })
    // 获取群组申请，先拉一页100条
    this.rootStore.teamStore.getTeamJoinActionInfoListActive({
      offset: 0,
      limit: 100,
    })
    // 获取 AI 机器人
    if (this.localOptions.aiVisible) {
      this.rootStore.aiUserStore.getAIUserListActive()
    }
  }
  return ConnectStore
})()

/**Mobx 可观察对象，负责管理好友信息的子 store */
var FriendStore = /** @class */ (function () {
  function FriendStore(rootStore, nim) {
    this.rootStore = rootStore
    this.nim = nim
    this.friends = new Map()
    this.logger = null
    makeAutoObservable(this)
    this._onFriendAdded = this._onFriendAdded.bind(this)
    this._onFriendDeleted = this._onFriendDeleted.bind(this)
    this._onFriendAddApplication = this._onFriendAddApplication.bind(this)
    this._onFriendAddRejected = this._onFriendAddRejected.bind(this)
    this._onFriendInfoChanged = this._onFriendInfoChanged.bind(this)
    this.logger = rootStore.logger
    nim.V2NIMFriendService.on('onFriendAdded', this._onFriendAdded)
    nim.V2NIMFriendService.on('onFriendDeleted', this._onFriendDeleted)
    /** 申请添加好友的相关信息，其他端向本端发送好友申请,会触发该事件，多端登录情况下也会触发 */
    nim.V2NIMFriendService.on(
      'onFriendAddApplication',
      this._onFriendAddApplication
    )
    /** 对端拒绝本端好友申请，本端会触发该事件 */
    nim.V2NIMFriendService.on('onFriendAddRejected', this._onFriendAddRejected)
    /** 好友信息更新回调，返回变更的好友信息，包括本端直接更新的好友信息和其他端同步更新的好友信息 */
    nim.V2NIMFriendService.on('onFriendInfoChanged', this._onFriendInfoChanged)
  }
  FriendStore.prototype.resetState = function () {
    this.friends.clear()
  }
  /**
   * 销毁FriendStore，会取消好友事件监听
   */
  FriendStore.prototype.destroy = function () {
    this.resetState()
    this.nim.V2NIMFriendService.off('onFriendAdded', this._onFriendAdded)
    this.nim.V2NIMFriendService.off('onFriendDeleted', this._onFriendDeleted)
    this.nim.V2NIMFriendService.off(
      'onFriendAddApplication',
      this._onFriendAddApplication
    )
    this.nim.V2NIMFriendService.off(
      'onFriendAddRejected',
      this._onFriendAddRejected
    )
    this.nim.V2NIMFriendService.off(
      'onFriendInfoChanged',
      this._onFriendInfoChanged
    )
  }
  /**
   * 查询好友列表
   */
  FriendStore.prototype.getFriendListActive = function () {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var friends, error_1
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getFriendListActive')
            return [4 /*yield*/, this.nim.V2NIMFriendService.getFriendList()]
          case 1:
            friends = _d.sent()
            this.addFriend(friends)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getFriendListActive success', friends)
            return [2 /*return*/, friends]
          case 2:
            error_1 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('getFriendListActive failed: ', error_1)
            throw error_1
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 根据Id 查询好友信息
   */
  FriendStore.prototype.getFriendByIdsActive = function (ids) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var friends, error_2
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getFriendByIdsActive', ids)
            return [
              4 /*yield*/,
              this.nim.V2NIMFriendService.getFriendByIds(ids),
            ]
          case 1:
            friends = _d.sent()
            this.addFriend(friends)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getFriendByIdsActive success', friends)
            return [2 /*return*/, friends]
          case 2:
            error_2 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('getFriendByIdsActive failed: ', error_2)
            throw error_2
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取申请添加好友列表通知
   * @param options V2NIMFriendAddApplicationQueryOption
   */
  FriendStore.prototype.getAddApplicationListActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, error_3
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getAddApplicationListActive')
            return [
              4 /*yield*/,
              this.nim.V2NIMFriendService.getAddApplicationList(options),
            ]
          case 1:
            res = _d.sent()
            this.rootStore.sysMsgStore.addFriendApplyMsg(res.infos)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getAddApplicationListActive success', res)
            return [2 /*return*/, res]
          case 2:
            error_3 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('getAddApplicationListActive failed: ', error_3)
            throw error_3
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 添加好友申请
   * @param accountId 账号
   * @param params 添加好友的配置参数
   */
  FriendStore.prototype.addFriendActive = function (accountId, params) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_4
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('addFriendActive', accountId)
            return [
              4 /*yield*/,
              this.nim.V2NIMFriendService.addFriend(accountId, params),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('addFriendActive success', accountId, params)
            return [3 /*break*/, 3]
          case 2:
            error_4 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('addFriendActive failed: ', accountId, params, error_4)
            throw error_4
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 接受好友申请
   * @param application 申请添加好友的相关信息
   */
  FriendStore.prototype.acceptAddApplicationActive = function (application) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_5
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('acceptAddApplicationActive', application)
            return [
              4 /*yield*/,
              this.nim.V2NIMFriendService.acceptAddApplication(application),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('acceptAddApplicationActive success', application)
            return [3 /*break*/, 3]
          case 2:
            error_5 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'acceptAddApplicationActive failed: ',
                  application,
                  error_5
                )
            throw error_5
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 拒绝好友申请
   * @param application 申请添加好友的相关信息
   * @param postscript 拒绝好友申请的附言
   */
  FriendStore.prototype.rejectAddApplicationActive = function (
    application,
    postscript
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_6
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('rejectAddApplicationActive', application, postscript)
            return [
              4 /*yield*/,
              this.nim.V2NIMFriendService.rejectAddApplication(
                application,
                postscript
              ),
              // this.rootStore.sysMsgStore.updateFriendApplyMsg([
              //   {
              //     ...application,
              //     status:
              //       V2NIMConst.V2NIMFriendAddApplicationStatus
              //         .V2NIM_FRIEND_ADD_APPLICATION_STATUS_REJECTED,
              //     isRead: true,
              //   },
              // ])
            ]
          case 1:
            _d.sent()
            // this.rootStore.sysMsgStore.updateFriendApplyMsg([
            //   {
            //     ...application,
            //     status:
            //       V2NIMConst.V2NIMFriendAddApplicationStatus
            //         .V2NIM_FRIEND_ADD_APPLICATION_STATUS_REJECTED,
            //     isRead: true,
            //   },
            // ])
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'rejectFriendApplyActive success',
                  application,
                  postscript
                )
            return [3 /*break*/, 3]
          case 2:
            error_6 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'rejectFriendApplyActive failed: ',
                  application,
                  postscript,
                  error_6
                )
            throw error_6
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 删除好友
   * @param accountId 账号
   */
  FriendStore.prototype.deleteFriendActive = function (accountId) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_7
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('deleteFriendActive', accountId)
            return [
              4 /*yield*/,
              this.nim.V2NIMFriendService.deleteFriend(accountId, {
                deleteAlias: true,
              }),
            ]
          case 1:
            _d.sent()
            this.removeFriend([accountId])
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('deleteFriendActive success', accountId)
            return [3 /*break*/, 3]
          case 2:
            error_7 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('deleteFriendActive failed: ', accountId, error_7)
            throw error_7
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 更新好友信息
   * @param accountId 账号
   * @param params 设置好友信息的配置参数。
   */
  FriendStore.prototype.setFriendInfoActive = function (accountId, params) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_8
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('setFriendInfoActive', accountId, params)
            return [
              4 /*yield*/,
              this.nim.V2NIMFriendService.setFriendInfo(accountId, params),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('setFriendInfoActive success', accountId, params)
            return [3 /*break*/, 3]
          case 2:
            error_8 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'setFriendInfoActive failed: ',
                  accountId,
                  params,
                  error_8
                )
            throw error_8
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 内存中增加好友
   * @param data - 好友数组
   */
  FriendStore.prototype.addFriend = function (data) {
    var _this = this
    data
      .filter(function (item) {
        return !!item.accountId
      })
      .forEach(function (item) {
        var oldFriend = _this.friends.get(item.accountId)
        if (!oldFriend) {
          _this.friends.set(
            item.accountId,
            __assign(__assign({}, item), item.userProfile)
          )
          // 这里不用再去获取用户信息，sdk返回的好友信息的userProfile 已经包含用户信息了 此时再去拉取用户信息会有性能问题
          // this.rootStore.userStore.getUserActive(item.accountId)
        } else {
          _this.friends.set(
            item.accountId,
            __assign(__assign(__assign({}, oldFriend), item), item.userProfile)
          )
        }
      })
    this.rootStore.userStore.addUsers(
      data.map(function (item) {
        return __assign(__assign({}, item), item.userProfile)
      })
    )
  }
  /**
   * 内存中删除好友
   * @param data - 好友数组
   */
  FriendStore.prototype.removeFriend = function (accounts) {
    var _this = this
    accounts.forEach(function (item) {
      _this.friends.delete(item)
    })
  }
  /**
   * 监听添加好友
   */
  FriendStore.prototype._onFriendAdded = function (friend) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onFriendAdded', friend)
    this.addFriend([friend])
    // 如果存在系统消息，则更新系统消息，这里只能自己是被申请者
    this.rootStore.sysMsgStore.updateFriendApplyMsg([
      {
        operatorAccountId: this.rootStore.userStore.myUserInfo.accountId,
        applicantAccountId: friend.accountId,
        recipientAccountId: this.rootStore.userStore.myUserInfo.accountId,
        timestamp: Date.now(),
        status: 1 /* V2NIMConst.V2NIMFriendAddApplicationStatus
                            .V2NIM_FRIEND_ADD_APPLICATION_STATUS_AGREED */,
        isRead: true,
        read: true,
      },
    ])
  }
  /**
   * 监听删除好友
   */
  FriendStore.prototype._onFriendDeleted = function (accountId) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onFriendDeleted', accountId)
    if (accountId) {
      this.removeFriend([accountId])
    }
  }
  /**
   * 申请添加好友的相关信息，其他端向本端发送好友申请,会触发该事件
   */
  FriendStore.prototype._onFriendAddApplication = function (application) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onFriendAddApplication', application)
    // 多端登录时，本端发送好友申请，多端登录另一端会收到该事件，此时需要过滤，多端登录另一端不需要提醒
    if (
      application.applicantAccountId !==
      this.rootStore.userStore.myUserInfo.accountId
    ) {
      this.rootStore.sysMsgStore.addFriendApplyMsg([application])
    }
  }
  /**
   * 对端拒绝本端好友申请，本端会触发该事件
   */
  FriendStore.prototype._onFriendAddRejected = function (rejection) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onFriendAddRejected', rejection)
    // 如果存在系统消息，则更新系统消息
    this.rootStore.sysMsgStore.addFriendApplyMsg([
      __assign(__assign({}, rejection), { isRead: true }),
    ])
  }
  /**
   * 好友信息更新回调，返回变更的好友信息，包括本端直接更新的好友信息和其他端同步更新的好友信息
   */
  FriendStore.prototype._onFriendInfoChanged = function (friend) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onFriendInfoChanged', friend)
    this.addFriend([friend])
  }
  return FriendStore
})()

var AT_ALL_ACCOUNT = 'ait_all'
var BE_MENTIONED = 'beMentioned'
var AT_ALL_ACCOUNT_TOSDK = '#%@all@%#'
var HISTORY_LIMIT = 20
var PIN_CONVERSATION_LIMIT = 20
var RECALL_TIME = 2 * 60 * 1000
var AI_MESSAGE_LIMIT = 30

var constant = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  AT_ALL_ACCOUNT: AT_ALL_ACCOUNT,
  BE_MENTIONED: BE_MENTIONED,
  AT_ALL_ACCOUNT_TOSDK: AT_ALL_ACCOUNT_TOSDK,
  HISTORY_LIMIT: HISTORY_LIMIT,
  PIN_CONVERSATION_LIMIT: PIN_CONVERSATION_LIMIT,
  RECALL_TIME: RECALL_TIME,
  AI_MESSAGE_LIMIT: AI_MESSAGE_LIMIT,
})

var name$1 = '@xkit-yx/im-store-v2'
var version$1 = '0.8.2'
var description$1 = '云信即时通讯 store V2 版本'
var license$1 = 'MIT'
var main$1 = 'dist/index.cjs.js'
var module = 'dist/index.esm.js'
var typings = 'dist/types/index.d.ts'
var publishConfig = {
  access: 'public',
}
var scripts$1 = {
  dev: 'rollup -c --environment DEV',
  build: 'rollup -c --environment PROD',
}
var files$1 = ['dist']
var author$1 = ''
var devDependencies$1 = {
  '@rollup/plugin-commonjs': '^17.1.0',
  '@rollup/plugin-json': '^4.1.0',
  '@rollup/plugin-node-resolve': '^11.2.0',
  del: '^6.0.0',
  gulp: '^4.0.2',
  'gulp-less': '^5.0.0',
  'gulp-rename': '^2.0.0',
  'gulp-typescript': '^6.0.0-alpha.1',
  less: '^4.1.1',
  'less-plugin-npm-import': '^2.1.0',
  'nim-web-sdk-ng': '10.9.10',
  postcss: '^8.3.5',
  'postcss-nested': '^5.0.5',
  rollup: '^2.39.0',
  'rollup-plugin-postcss': '^4.0.0',
  'rollup-plugin-terser': '^7.0.2',
  'rollup-plugin-typescript2': '^0.31.0',
  tslib: '^2.5.0',
  typescript: '^4.6.4',
}
var peerDependencies = {
  'nim-web-sdk-ng': '^10.x',
}
var dependencies = {
  '@xkit-yx/utils': '^0.7.1',
  mobx: '^6.6.1',
}
var packageJson = {
  name: name$1,
  version: version$1,
  description: description$1,
  license: license$1,
  main: main$1,
  module: module,
  typings: typings,
  publishConfig: publishConfig,
  scripts: scripts$1,
  files: files$1,
  author: author$1,
  devDependencies: devDependencies$1,
  peerDependencies: peerDependencies,
  dependencies: dependencies,
}

var logger = logDebug({
  level: 'debug',
  version: packageJson.version,
  appName: packageJson.name,
  needStringify: false,
})
var frequencyControl = function (fn, delay, limit) {
  var promiseQueue = []
  var requesting = false
  var timer
  return function (args) {
    var _this = this
    return new Promise(function (resolve, reject) {
      var p = promiseQueue.find(function (item) {
        return item.args === args
      })
      if (p) {
        p.queue.push({ resolve: resolve, reject: reject })
      } else {
        promiseQueue.push({
          args: args,
          queue: [{ resolve: resolve, reject: reject }],
        })
      }
      if (requesting) {
        return
      }
      var handler = function (pq) {
        if (!pq.length) {
          return
        }
        requesting = true
        fn.call(
          // @ts-ignore
          _this,
          pq.map(function (item) {
            return item.args
          })
        )
          .then(function (res) {
            var _loop_1 = function () {
              var p_1 = pq.shift()
              if (p_1) {
                var _1 = res.find(function (j) {
                  return j.accountId === p_1.args
                })
                p_1.queue.forEach(function (j) {
                  return j.resolve(_1)
                })
              }
            }
            while (pq.length) {
              _loop_1()
            }
          })
          .catch(function (err) {
            while (pq.length) {
              var p_2 = pq.shift()
              if (p_2) {
                p_2.queue.forEach(function (item) {
                  return item.reject(err)
                })
              }
            }
          })
          .finally(function () {
            requesting = false
            if (promiseQueue.length) {
              handler(promiseQueue.splice(0, limit))
            }
          })
      }
      // 如果参数数量到达 limit，立即执行
      if (promiseQueue.length >= limit) {
        clearTimeout(timer)
        handler(promiseQueue.splice(0, limit))
      } else {
        clearTimeout(timer)
        timer = setTimeout(function () {
          handler(promiseQueue.splice(0, limit))
        }, delay)
      }
    })
  }
}
/**
 * 过滤消息，处理了撤回消息的过滤
 */
var getFilterMsgs = function (msgs, filterFn) {
  var filterMsgs = __spreadArray([], __read(msgs), false)
  if (filterFn) {
    filterMsgs = filterMsgs.filter(filterFn)
  }
  var res = []
  var filterRecallMsg = []
  var startWithoutRecallMsg
  filterMsgs.forEach(function (item) {
    // 找到第一条不是撤回消息的消息，记录时间
    if (
      !(
        item.messageType ===
          100 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM */ &&
        ['beReCallMsg', 'reCallMsg'].includes(item.recallType || '')
      ) &&
      startWithoutRecallMsg === void 0
    ) {
      startWithoutRecallMsg = item.createTime
    }
    // 不在上述时间范围内的撤回消息过滤掉不显示
    if (
      item.messageType ===
        100 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM */ &&
      ['beReCallMsg', 'reCallMsg'].includes(item.recallType || '')
    ) {
      if (
        startWithoutRecallMsg !== void 0 &&
        item.createTime >= startWithoutRecallMsg
      ) {
        res.push(item)
      } else {
        filterRecallMsg.push(item)
      }
    } else {
      res.push(item)
    }
  })
  // 如果当前只有撤回消息，则需要显示
  if (!res.length && filterRecallMsg.length) {
    return filterRecallMsg
  }
  return res
}
var batchRequest = function (fn, max) {
  return function (params) {
    var args = []
    for (var _i = 1; _i < arguments.length; _i++) {
      args[_i - 1] = arguments[_i]
    }
    return __awaiter(this, void 0, void 0, function () {
      var batches, i, batches_1, batches_1_1, batch, e_1_1
      var e_1, _a
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            if (!!params.length) return [3 /*break*/, 2]
            // @ts-ignore
            return [4 /*yield*/, fn.apply(this, [params].concat(args))]
          case 1:
            // @ts-ignore
            _b.sent()
            _b.label = 2
          case 2:
            batches = []
            for (i = 0; i < params.length; i += max) {
              batches.push(params.slice(i, i + max))
            }
            _b.label = 3
          case 3:
            _b.trys.push([3, 8, 9, 10])
            ;(batches_1 = __values(batches)), (batches_1_1 = batches_1.next())
            _b.label = 4
          case 4:
            if (!!batches_1_1.done) return [3 /*break*/, 7]
            batch = batches_1_1.value
            // @ts-ignore
            return [4 /*yield*/, fn.apply(this, [batch].concat(args))]
          case 5:
            // @ts-ignore
            _b.sent()
            _b.label = 6
          case 6:
            batches_1_1 = batches_1.next()
            return [3 /*break*/, 4]
          case 7:
            return [3 /*break*/, 10]
          case 8:
            e_1_1 = _b.sent()
            e_1 = { error: e_1_1 }
            return [3 /*break*/, 10]
          case 9:
            try {
              if (batches_1_1 && !batches_1_1.done && (_a = batches_1.return))
                _a.call(batches_1)
            } finally {
              if (e_1) throw e_1.error
            }
            return [7 /*endfinally*/]
          case 10:
            return [2 /*return*/]
        }
      })
    })
  }
}

var utils = /*#__PURE__*/ Object.freeze({
  __proto__: null,
  logDebug: logDebug,
  logger: logger,
  frequencyControl: frequencyControl,
  getFilterMsgs: getFilterMsgs,
  batchRequest: batchRequest,
})

var Queue = /** @class */ (function () {
  /**
   * @param itemLength 队列长度
   * @param flow 队列方向
   */
  function Queue(itemLength, flow) {
    if (itemLength === void 0) {
      itemLength = 20
    }
    if (flow === void 0) {
      flow = 'rightToLeft'
    }
    this.itemLength = itemLength
    this.flow = flow
    this.queue = []
    makeAutoObservable(this)
  }
  Queue.prototype.push = function (item, noLimit) {
    this.queue.push(item)
    this._handle(noLimit)
  }
  Queue.prototype.unshift = function (item, noLimit) {
    this.queue.unshift(item)
    this._handle(noLimit)
  }
  Queue.prototype.pop = function () {
    return this.queue.pop()
  }
  Queue.prototype.shift = function () {
    return this.queue.shift()
  }
  Queue.prototype.resetLimitState = function () {
    this._handle()
  }
  Queue.prototype.clear = function () {
    this.queue.length = 0
  }
  Queue.prototype.get = function () {
    return this.queue
  }
  Queue.prototype.set = function (value, noLimit) {
    this.queue = value
    this._handle(noLimit)
  }
  Object.defineProperty(Queue.prototype, 'length', {
    get: function () {
      return this.queue.length
    },
    enumerable: false,
    configurable: true,
  })
  Queue.prototype._handle = function (noLimit) {
    if (noLimit === void 0) {
      noLimit = false
    }
    if (this.queue.length > this.itemLength && !noLimit) {
      if (this.flow === 'leftToRight') {
        this.queue.splice(this.itemLength, this.queue.length - this.itemLength)
      } else {
        this.queue.splice(0, this.queue.length - this.itemLength)
      }
    }
  }
  return Queue
})()
var QueueMap = /** @class */ (function () {
  function QueueMap(itemLength, flow) {
    if (itemLength === void 0) {
      itemLength = 20
    }
    if (flow === void 0) {
      flow = 'rightToLeft'
    }
    this.itemLength = itemLength
    this.flow = flow
    this.map = new Map()
    makeAutoObservable(this)
  }
  QueueMap.prototype.get = function (key) {
    var _a
    return (_a = this.map.get(key)) === null || _a === void 0
      ? void 0
      : _a.get()
  }
  QueueMap.prototype.set = function (key, value, noLimit) {
    var queue = new Queue(this.itemLength, this.flow)
    queue.set(value, noLimit)
    this.map.set(key, queue)
  }
  QueueMap.prototype.delete = function (key) {
    var _a
    ;(_a = this.map.get(key)) === null || _a === void 0 ? void 0 : _a.clear()
    return this.map.delete(key)
  }
  QueueMap.prototype.resetLimitState = function () {
    this.map.forEach(function (item) {
      return item.resetLimitState()
    })
  }
  QueueMap.prototype.clear = function () {
    this.map.forEach(function (item) {
      return item.clear()
    })
    this.map.clear()
  }
  QueueMap.prototype.values = function () {
    return __spreadArray([], __read(this.map.values()), false)
      .map(function (item) {
        return item.get()
      })
      .flat()
  }
  return QueueMap
})()

var PinMsgsMap = /** @class */ (function () {
  function PinMsgsMap(limit) {
    if (limit === void 0) {
      limit = PIN_CONVERSATION_LIMIT
    }
    this.map = new Map()
    this.pinConversationLimit = PIN_CONVERSATION_LIMIT
    this.pinConversationLimit = limit
    makeAutoObservable(this)
  }
  PinMsgsMap.prototype.set = function (conversationId, pinInfos) {
    var map = this.map.get(conversationId) || new Map()
    if (this.map.has(conversationId)) {
      // 更新 LRU 队列
      this.map.delete(conversationId)
    }
    pinInfos.forEach(function (pinInfo) {
      if (pinInfo.pinState !== 0) {
        map.set(pinInfo.messageRefer.messageClientId, pinInfo)
      } else {
        // map 里面不维护 pinState 为 0 的 pin
        map.delete(pinInfo.messageRefer.messageClientId)
      }
    })
    this.map.set(conversationId, map)
    if (this.map.size > this.pinConversationLimit) {
      var val = this.map.keys().next().value
      // 最近最少用的出队
      if (val) this.map.delete(val)
    }
  }
  PinMsgsMap.prototype.get = function (conversationId) {
    var map = this.map.get(conversationId)
    if (map) {
      // 更新 LRU 队列
      this.map.delete(conversationId)
      this.map.set(conversationId, map)
      return map
    } else {
      return null
    }
  }
  PinMsgsMap.prototype.delete = function (conversationId, messageClientIds) {
    var curMap = this.map.get(conversationId)
    if (curMap) {
      // 更新 LRU 队列
      this.map.delete(conversationId)
      messageClientIds.forEach(function (messageClientId) {
        curMap.delete(messageClientId)
      })
      this.map.set(conversationId, curMap)
    }
  }
  PinMsgsMap.prototype.clear = function () {
    if (this.map) {
      this.map.forEach(function (map) {
        map.clear()
      })
      this.map.clear()
    }
  }
  return PinMsgsMap
})()
var PinMsgsMap$1 = PinMsgsMap

/**Mobx 可观察对象，负责管理会话消息的子 store */
var MsgStore = /** @class */ (function () {
  function MsgStore(rootStore, nim, localOptions) {
    this.rootStore = rootStore
    this.nim = nim
    this.localOptions = localOptions
    this.msgs = new QueueMap(HISTORY_LIMIT, 'rightToLeft')
    /** 回复消息 */
    this.replyMsgs = new Map()
    this.logger = null
    /** pin 消息 */
    this.pinMsgs = new PinMsgsMap$1()
    /** 收藏消息 */
    this.collectionMsgs = new Map()
    makeAutoObservable(this)
    this.logger = rootStore.logger
    this._onReceiveMessages = this._onReceiveMessages.bind(this)
    this._onClearHistoryNotifications =
      this._onClearHistoryNotifications.bind(this)
    this._onMessageDeletedNotifications =
      this._onMessageDeletedNotifications.bind(this)
    this._onMessagePinNotification = this._onMessagePinNotification.bind(this)
    this._onMessageQuickCommentNotification =
      this._onMessageQuickCommentNotification.bind(this)
    this._onMessageRevokeNotifications =
      this._onMessageRevokeNotifications.bind(this)
    this._onReceiveP2PMessageReadReceipts =
      this._onReceiveP2PMessageReadReceipts.bind(this)
    this._onReceiveTeamMessageReadReceipts =
      this._onReceiveTeamMessageReadReceipts.bind(this)
    this._onReceiveMessagesModified = this._onReceiveMessagesModified.bind(this)
    this.getTeamMsgReadsActive = batchRequest(this.getTeamMsgReadsActive, 50)
    /** 收到消息 */
    nim.V2NIMMessageService.on('onReceiveMessages', this._onReceiveMessages)
    /** 清空会话历史消息通知 */
    nim.V2NIMMessageService.on(
      'onClearHistoryNotifications',
      this._onClearHistoryNotifications
    )
    /** 消息被删除通知 */
    nim.V2NIMMessageService.on(
      'onMessageDeletedNotifications',
      this._onMessageDeletedNotifications
    )
    /** 收到消息 pin 状态更新 */
    nim.V2NIMMessageService.on(
      'onMessagePinNotification',
      this._onMessagePinNotification
    )
    /** 收到消息快捷评论更新 */
    nim.V2NIMMessageService.on(
      'onMessageQuickCommentNotification',
      this._onMessageQuickCommentNotification
    )
    /** 收到消息撤回通知 消息 */
    nim.V2NIMMessageService.on(
      'onMessageRevokeNotifications',
      this._onMessageRevokeNotifications
    )
    /** 收到点对点消息的已读回执 */
    nim.V2NIMMessageService.on(
      'onReceiveP2PMessageReadReceipts',
      this._onReceiveP2PMessageReadReceipts
    )
    /** 收到群消息的已读回执 */
    nim.V2NIMMessageService.on(
      'onReceiveTeamMessageReadReceipts',
      this._onReceiveTeamMessageReadReceipts
    )
    /**
     * 收到消息更新事件
     *
     * 1. 收到更新消息在线同步通知
     * 2. 收到更新消息多端同步通知
     * 3. 收到更新消息漫游通知
     */
    nim.V2NIMMessageService.on(
      'onReceiveMessagesModified',
      this._onReceiveMessagesModified
    )
  }
  MsgStore.prototype.resetState = function () {
    this.msgs.clear()
    this.replyMsgs.clear()
    this.pinMsgs.clear()
  }
  /**
   * 销毁MsgStore，会取消消息相关事件监听
   */
  MsgStore.prototype.destroy = function () {
    var _this = this
    this.resetState()
    this.nim.V2NIMMessageService.off(
      'onReceiveMessages',
      this._onReceiveMessages
    )
    this.nim.V2NIMMessageService.off(
      'onClearHistoryNotifications',
      this._onClearHistoryNotifications
    )
    this.nim.V2NIMMessageService.off(
      'onMessageDeletedNotifications',
      this._onMessageDeletedNotifications
    )
    this.nim.V2NIMMessageService.off(
      'onMessagePinNotification',
      this._onMessagePinNotification
    )
    this.nim.V2NIMMessageService.off(
      'onMessageQuickCommentNotification',
      this._onMessageQuickCommentNotification
    )
    this.nim.V2NIMMessageService.off(
      'onMessageRevokeNotifications',
      this._onMessageRevokeNotifications
    )
    this.nim.V2NIMMessageService.off(
      'onReceiveP2PMessageReadReceipts',
      this._onReceiveP2PMessageReadReceipts
    )
    this.nim.V2NIMMessageService.off(
      'onReceiveTeamMessageReadReceipts',
      this._onReceiveTeamMessageReadReceipts
    )
    this.getMsg().forEach(function (msg) {
      _this._handleClearMsgTimer(msg)
    })
  }
  /**
   * 回复消息
   * @param msg 消息对象
   */
  MsgStore.prototype.replyMsgActive = function (msg) {
    if (msg === null || msg === void 0 ? void 0 : msg.conversationId) {
      this.replyMsgs.set(msg.conversationId, msg)
    }
  }
  /**
   * 回复消息
   * @param msg 消息对象
   */
  MsgStore.prototype.removeReplyMsgActive = function (conversationId) {
    this.replyMsgs.delete(conversationId)
  }
  /**
   * 获取回复消息
   * @param conversationId
   * @returns
   */
  MsgStore.prototype.getReplyMsgActive = function (conversationId) {
    var msg = this.replyMsgs.get(conversationId)
    if (msg) {
      return this.handleMsgForSDK(msg)
    }
  }
  /**
   * 撤回消息
   * @param msg 消息对象
   */
  MsgStore.prototype.reCallMsgActive = function (msg) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var recallMsg, error_1
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('reCallMsgActive', msg)
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.revokeMessage(
                this.handleMsgForSDK(msg)
              ),
            ]
          case 1:
            _d.sent()
            this.removeMsg(msg.conversationId, [msg.messageClientId])
            recallMsg = this._createReCallMsg(msg)
            this.addMsg(recallMsg.conversationId, [recallMsg])
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('reCallMsgActive success', msg)
            return [3 /*break*/, 3]
          case 2:
            error_1 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('reCallMsgActive failed: ', msg, error_1)
            throw error_1
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 单向删除消息
   * @param msgs 消息对象数组
   */
  MsgStore.prototype.deleteMsgActive = function (msgs) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var conversationId, messageClientIds, error_2
      var _this = this
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('deleteMsgActive', msgs)
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.deleteMessages(
                msgs.map(function (item) {
                  return _this.handleMsgForSDK(item)
                })
              ),
            ]
          case 1:
            _d.sent()
            conversationId = msgs[0].conversationId
            if (conversationId) {
              messageClientIds = msgs.map(function (item) {
                return item.messageClientId
              })
              this.removeMsg(conversationId, messageClientIds)
            }
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('deleteMsgActive success', msgs)
            return [3 /*break*/, 3]
          case 2:
            error_2 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.warn(
                  'deleteMsgActive failed, but delete msgs from memory: ',
                  msgs,
                  error_2
                )
            throw error_2
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 回复消息
   * @param msgs 消息对象
   * @param repliedMessages 被回复的消息对象
   * @param conversationId 会话id
   */
  MsgStore.prototype.replyMessageByThreadActive = function (
    message,
    repliedMessage,
    conversationId,
    params
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var result, error_3
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('replyMessageByThreadActive', message, repliedMessage)
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.replyMessage(
                message,
                repliedMessage,
                params
              ),
            ]
          case 1:
            result = _d.sent()
            this.removeReplyMsgActive(conversationId)
            this._handleSendMsgSuccess(result.message)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'replyMessageByThreadActive success',
                  { message: message, repliedMessage: repliedMessage },
                  result
                )
            return [3 /*break*/, 3]
          case 2:
            error_3 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'replyMessageByThreadActive fail',
                  message,
                  repliedMessage
                )
            message.threadReply = repliedMessage
            this._handleSendMsgSuccess(message)
            throw error_3
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 发送消息
   * @param __namedParameters.msg - 消息对象
   * @param __namedParameters.conversationId - 会话id
   * @param __namedParameters.conversationType - 会话类型
   * @param __namedParameters.progress - progress 进度回调
   * @param __namedParameters.sendBefore - sendBefore 进度回调
   * @param __namedParameters.serverExtension - 扩展字段
   * @param __namedParameters.previewImg - 预览图片，一般用于发送图片和视频消息
   * @param __namedParameters.onAISend - AI 单聊或 at AI 发送成功后的回调
   */
  MsgStore.prototype.sendMessageActive = function (params) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j
    return __awaiter(this, void 0, void 0, function () {
      var msg,
        conversationId,
        conversationType,
        progress,
        sendBefore,
        serverExtension,
        previewImg,
        onAISend,
        newMsg,
        finalServerExtension,
        sendMsgParams,
        aiConfig,
        finalAIConfig,
        finalParams,
        replyMsg,
        message,
        error_4
      var _this = this
      return __generator(this, function (_k) {
        switch (_k.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('sendMessageActive', params)
            ;(msg = params.msg),
              (conversationId = params.conversationId),
              (conversationType = params.conversationType),
              (progress = params.progress),
              (sendBefore = params.sendBefore),
              (serverExtension = params.serverExtension),
              (previewImg = params.previewImg),
              (onAISend = params.onAISend)
            newMsg = __assign({}, msg)
            finalServerExtension = {}
            // @ts-ignore 发送回复消息旧模式，使用ext实现，有一系列缺点
            if (
              (_b = this.localOptions) === null || _b === void 0
                ? void 0
                : _b.sendReplyMsgByExt
            ) {
              finalServerExtension = this._formatExtField(
                conversationId,
                serverExtension || JSON.parse(newMsg.serverExtension || '{}')
              )
            } else {
              finalServerExtension =
                serverExtension || JSON.parse(newMsg.serverExtension || '{}')
            }
            newMsg.serverExtension = Object.keys(finalServerExtension).length
              ? JSON.stringify(finalServerExtension)
              : void 0
            newMsg.senderId = this.rootStore.userStore.myUserInfo.accountId
            newMsg.receiverId =
              this.nim.V2NIMConversationIdUtil.parseConversationTargetId(
                conversationId
              )
            newMsg.conversationId = conversationId
            if (conversationType !== void 0) {
              newMsg.conversationType = conversationType
            }
            newMsg.sendingState = 3 /* V2NIMConst.V2NIMMessageSendingState.V2NIM_MESSAGE_SENDING_STATE_SENDING */
            if (previewImg) {
              newMsg.previewImg = previewImg
            }
            if (progress) {
              newMsg.uploadProgress = 0
            }
            _k.label = 1
          case 1:
            _k.trys.push([1, 6, , 7])
            return [
              4 /*yield*/,
              (_d = (_c = this.localOptions).sendMsgBefore) === null ||
              _d === void 0
                ? void 0
                : _d.call(_c, params),
            ]
          case 2:
            sendMsgParams = _k.sent()
            if (sendMsgParams === false) {
              ;(_e = this.logger) === null || _e === void 0
                ? void 0
                : _e.log('sendMessageActive cancel', params, sendMsgParams)
              return [2 /*return*/]
            }
            aiConfig = this._getAIConfig(newMsg)
            // 先插入这条消息，快速让消息上屏
            this.addMsg(newMsg.conversationId, [newMsg])
            sendBefore === null || sendBefore === void 0
              ? void 0
              : sendBefore(newMsg)
            finalAIConfig =
              aiConfig ||
              (sendMsgParams === null || sendMsgParams === void 0
                ? void 0
                : sendMsgParams.aiConfig)
                ? __assign(
                    __assign({}, aiConfig),
                    sendMsgParams === null || sendMsgParams === void 0
                      ? void 0
                      : sendMsgParams.aiConfig
                  )
                : void 0
            finalParams = __assign(__assign({}, sendMsgParams), {
              pushConfig:
                (sendMsgParams === null || sendMsgParams === void 0
                  ? void 0
                  : sendMsgParams.pushConfig) ||
                ((
                  finalServerExtension === null ||
                  finalServerExtension === void 0
                    ? void 0
                    : finalServerExtension.yxAitMsg
                )
                  ? this._formatExtAitToPushInfo(
                      finalServerExtension.yxAitMsg,
                      newMsg.text || ''
                    )
                  : void 0),
              messageConfig: __assign(
                {
                  // 需要开启已读回执
                  readReceiptEnabled: true,
                },
                sendMsgParams === null || sendMsgParams === void 0
                  ? void 0
                  : sendMsgParams.messageConfig
              ),
              aiConfig: finalAIConfig,
            })
            ;(_f = this.logger) === null || _f === void 0
              ? void 0
              : _f.log(
                  'sendMessageActive finalParams: ',
                  newMsg,
                  conversationId,
                  finalParams
                )
            replyMsg = this.getReplyMsgActive(conversationId)
            if (
              !(
                replyMsg &&
                !((_g = this.localOptions) === null || _g === void 0
                  ? void 0
                  : _g.sendReplyMsgByExt)
              )
            )
              return [3 /*break*/, 4]
            newMsg.serverExtension = Object.keys(finalServerExtension).length
              ? JSON.stringify(finalServerExtension)
              : void 0
            return [
              4 /*yield*/,
              this.replyMessageByThreadActive(
                newMsg,
                replyMsg,
                conversationId,
                finalParams
              ),
            ]
          case 3:
            _k.sent()
            sendBefore === null || sendBefore === void 0
              ? void 0
              : sendBefore(newMsg)
            return [2 /*return*/]
          case 4:
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.sendMessage(
                newMsg,
                conversationId,
                finalParams,
                function (percentage) {
                  var shouldContinue =
                    progress === null || progress === void 0
                      ? void 0
                      : progress(percentage)
                  if (shouldContinue) {
                    var _msg = _this.getMsg(conversationId, [
                      newMsg.messageClientId,
                    ])[0]
                    if (_msg) {
                      _this.addMsg(conversationId, [
                        __assign(__assign({}, _msg), {
                          uploadProgress: percentage,
                        }),
                      ])
                    }
                  }
                }
              ),
            ]
          case 5:
            message = _k.sent().message
            if (finalAIConfig) {
              onAISend === null || onAISend === void 0
                ? void 0
                : onAISend(message, finalAIConfig)
            }
            //uploadProgress 为UI层需要的字段，当sendMessage返回时，uploadProgress必为100
            if (
              msg.messageType ===
                6 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE */ ||
              msg.messageType ===
                1 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE */ ||
              msg.messageType ===
                3 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO */
            ) {
              // @ts-expect-error
              message.uploadProgress = 100
            }
            this._handleSendMsgSuccess(message)
            ;(_h = this.logger) === null || _h === void 0
              ? void 0
              : _h.log('sendMessageActive success', message)
            if (
              newMsg.messageType ===
              0 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT */
            ) {
              this.removeReplyMsgActive(conversationId)
            }
            return [2 /*return*/, message]
          case 6:
            error_4 = _k.sent()
            ;(_j = this.logger) === null || _j === void 0
              ? void 0
              : _j.error(
                  'sendMessageActive failed: ',
                  error_4.toString(),
                  newMsg
                )
            // 手动取消上传
            if (error_4.code === 191002) {
              this.removeMsg(conversationId, [newMsg.messageClientId])
            } else {
              this._handleSendMsgFail(newMsg, error_4.code)
            }
            if (
              newMsg.messageType ===
              0 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT */
            ) {
              this.removeReplyMsgActive(conversationId)
            }
            throw error_4
          case 7:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 取消上传
   * @param msg 消息对象
   */
  MsgStore.prototype.cancelMessageAttachmentUploadActive = function (msg) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_5
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('cancelMessageAttachmentUploadActive', msg)
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.cancelMessageAttachmentUpload(
                this.handleMsgForSDK(msg)
              ),
            ]
          case 1:
            _d.sent()
            this.removeMsg(msg.conversationId, [msg.messageClientId])
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('cancelMessageAttachmentUploadActive success', msg)
            return [3 /*break*/, 3]
          case 2:
            error_5 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'cancelMessageAttachmentUploadActive failed: ',
                  msg,
                  error_5
                )
            throw error_5
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 发送 p2p 消息已读回执
   * @param msg 消息对象
   */
  MsgStore.prototype.sendMsgReceiptActive = function (msg) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_6
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('sendMsgReceiptActive', msg)
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.sendP2PMessageReceipt(
                this.handleMsgForSDK(msg)
              ),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('sendMsgReceiptActive success', msg)
            return [3 /*break*/, 3]
          case 2:
            error_6 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'sendMsgReceiptActive failed: ',
                  msg,
                  error_6.toString()
                )
            throw error_6
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 添加一个收藏
   * @param params 添加收藏的相关参数
   */
  MsgStore.prototype.addCollectionActive = function (params) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_7
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('addCollectionActive', params)
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.addCollection(params),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('addCollectionActive success', params)
            return [3 /*break*/, 3]
          case 2:
            error_7 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'addCollectionActive failed: ',
                  params,
                  error_7.toString()
                )
            throw error_7
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 移除相关收藏
   * @param collections 需要移除的相关收藏
   */
  MsgStore.prototype.removeCollectionsActive = function (collections) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_8
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('removeCollectionsActive', collections)
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.removeCollections(collections),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('removeCollectionsActive success', collections)
            return [3 /*break*/, 3]
          case 2:
            error_8 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'removeCollectionsActive failed: ',
                  collections,
                  error_8.toString()
                )
            throw error_8
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取收藏列表
   * @param option 查询参数
   */
  MsgStore.prototype.getCollectionListByOptionActive = function (option) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, error_9
      var _this = this
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            res = []
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getCollectionListByOptionActive', option)
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.getCollectionListByOption(option),
            ]
          case 2:
            res = _d.sent()
            res.forEach(function (item) {
              var collectionData = JSON.parse(item.collectionData)
              // 反序列化
              var msg = _this.nim.V2NIMMessageConverter.messageDeserialization(
                collectionData.message
              )
              if (msg) {
                _this.collectionMsgs.set(msg.messageClientId, msg)
              }
            })
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getCollectionListByOptionActive success', option)
            return [3 /*break*/, 4]
          case 3:
            error_9 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'getCollectionListByOptionActive failed: ',
                  option,
                  error_9.toString()
                )
            throw error_9
          case 4:
            return [2 /*return*/, res]
        }
      })
    })
  }
  /**
   * 发送群组消息已读回执
   * @param msgs 消息数组
   */
  MsgStore.prototype.sendTeamMsgReceiptActive = function (msgs) {
    var _a, _b, _c, _d
    return __awaiter(this, void 0, void 0, function () {
      var finalMsgs, error_10
      var _this = this
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 3, , 4])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('sendTeamMsgReceiptActive', msgs)
            if (!msgs.length) return [3 /*break*/, 2]
            finalMsgs = msgs.map(function (item) {
              return _this.handleMsgForSDK(item)
            })
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('sendTeamMsgReceiptActive finalParams: ', finalMsgs)
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.sendTeamMessageReceipts(finalMsgs),
            ]
          case 1:
            _e.sent()
            _e.label = 2
          case 2:
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.log('sendTeamMsgReceiptActive success', msgs)
            return [3 /*break*/, 4]
          case 3:
            error_10 = _e.sent()
            ;(_d = this.logger) === null || _d === void 0
              ? void 0
              : _d.error(
                  'sendTeamMsgReceiptActive failed: ',
                  msgs,
                  error_10.toString()
                )
            throw error_10
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取群消息已读未读详情
   * @param message 消息
   */
  MsgStore.prototype.getTeamMessageReceiptDetailsActive = function (
    message,
    memberAccountIds
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, error_11
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log(
                  'getTeamMessageReceiptDetailsActive',
                  message,
                  memberAccountIds
                )
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.getTeamMessageReceiptDetail(
                message,
                memberAccountIds
              ),
            ]
          case 1:
            res = _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'getTeamMessageReceiptDetailsActive success:',
                  message,
                  memberAccountIds,
                  res
                )
            return [2 /*return*/, res]
          case 2:
            error_11 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'getTeamMessageReceiptDetailsActive failed: ',
                  message,
                  memberAccountIds,
                  error_11.toString()
                )
            throw error_11
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取历史消息
   * @param options.conversationId - 消息所属的会话的ID
   * @param options.endTime - 结束时间戳, 精确到 ms, 默认为服务器的当前时间
   * @param options.lastMsgId - 上次查询的最后一条消息的 messageServerId, 第一次不填
   * @param options.limit - 本次查询的消息数量限制, 最多 100 条, 默认 100 条
   */
  MsgStore.prototype.getHistoryMsgActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var conversationId,
        endTime,
        lastMsgId,
        _d,
        limit,
        conversationType,
        finalParams,
        anchorMessage,
        msgs,
        myMsgs,
        error_12
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 4, , 5])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getHistoryMsgActive', options)
            ;(conversationId = options.conversationId),
              (endTime = options.endTime),
              (lastMsgId = options.lastMsgId),
              (_d = options.limit),
              (limit = _d === void 0 ? 100 : _d)
            conversationType =
              this.nim.V2NIMConversationIdUtil.parseConversationType(
                conversationId
              )
            finalParams = {
              conversationId: conversationId,
              endTime: endTime,
              limit: limit,
            }
            if (lastMsgId) {
              anchorMessage = this.getMsg(conversationId, [lastMsgId])[0]
              if (anchorMessage) {
                finalParams.anchorMessage = anchorMessage
              }
            }
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.getMessageList(finalParams),
            ]
          case 1:
            msgs = _e.sent()
            this.addMsg(conversationId, msgs)
            if (
              !(
                conversationType ===
                  2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */ &&
                this.rootStore.localOptions.teamMsgReceiptVisible
              )
            )
              return [3 /*break*/, 3]
            myMsgs = msgs
              .filter(function (item) {
                return item.isSelf
              })
              .filter(function (item) {
                return ![
                  5 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION */,
                  10 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TIPS */,
                ].includes(item.messageType)
              })
            return [
              4 /*yield*/,
              this.getTeamMsgReadsActive(myMsgs, conversationId),
            ]
          case 2:
            _e.sent()
            _e.label = 3
          case 3:
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'getHistoryMsgActive success',
                  options,
                  finalParams,
                  msgs
                )
            return [2 /*return*/, msgs]
          case 4:
            error_12 = _e.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'getHistoryMsgActive failed: ',
                  options,
                  error_12.toString()
                )
            throw error_12
          case 5:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 转发消息
   * @param msg - 消息对象
   * @param conversationId - 会话id
   * @param comment - 评论
   */
  MsgStore.prototype.forwardMsgActive = function (
    msg,
    conversationId,
    comment
  ) {
    var _a, _b, _c, _d
    return __awaiter(this, void 0, void 0, function () {
      var serverExtension, deleteKeys, finalMsg, forwardMsg, textMsg, error_13
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 5, , 6])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('forwardMsgActive', msg, conversationId, comment)
            serverExtension =
              msg === null || msg === void 0 ? void 0 : msg.serverExtension
            if (serverExtension) {
              try {
                serverExtension = JSON.parse(serverExtension)
                // @ts-ignore
                delete serverExtension.yxReplyMsg
                // @ts-ignore
                delete serverExtension.yxAitMsg
                serverExtension = JSON.stringify(serverExtension)
              } catch (error) {
                //
              }
            }
            deleteKeys = ['canRecall', 'reCallTimer', 'yxUnread', 'yxRead']
            deleteKeys.forEach(function (key) {
              delete msg[key]
            })
            // 之前 IM2 sdk 有问题，这边先保留
            if (
              ((_b = msg.pushConfig) === null || _b === void 0
                ? void 0
                : _b.pushContent) === ''
            ) {
              delete msg.pushConfig.pushContent
            }
            finalMsg = this.handleMsgForSDK(
              __assign(__assign({}, msg), { serverExtension: serverExtension })
            )
            forwardMsg =
              this.nim.V2NIMMessageCreator.createForwardMessage(finalMsg)
            if (!forwardMsg) return [3 /*break*/, 2]
            return [
              4 /*yield*/,
              this.sendMessageActive({
                msg: forwardMsg,
                conversationId: conversationId,
              }),
            ]
          case 1:
            _e.sent()
            _e.label = 2
          case 2:
            if (!comment) return [3 /*break*/, 4]
            textMsg = this.nim.V2NIMMessageCreator.createTextMessage(comment)
            return [
              4 /*yield*/,
              this.sendMessageActive({
                msg: textMsg,
                conversationId: conversationId,
              }),
            ]
          case 3:
            _e.sent()
            _e.label = 4
          case 4:
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.log('forwardMsgActive success', msg, conversationId, comment)
            return [3 /*break*/, 6]
          case 5:
            error_13 = _e.sent()
            ;(_d = this.logger) === null || _d === void 0
              ? void 0
              : _d.error('forwardMsgActive failed: ', error_13)
            throw error_13
          case 6:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取群组消息已读未读数
   * @param msgs 消息数组
   * @param conversationId 会话id
   */
  MsgStore.prototype.getTeamMsgReadsActive = function (msgs, conversationId) {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var res, error_14, newMsgs
      var _this = this
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getTeamMsgReadsActive', msgs, conversationId)
            res = []
            if (!msgs.length) return [3 /*break*/, 4]
            _c.label = 1
          case 1:
            _c.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.getTeamMessageReceipts(
                msgs.map(function (item) {
                  return _this.handleMsgForSDK(item)
                })
              ),
            ]
          case 2:
            res = _c.sent()
            return [3 /*break*/, 4]
          case 3:
            error_14 = _c.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.warn(
                  'getTeamMsgReadsActive failed but continue: ',
                  error_14.toString()
                )
            return [3 /*break*/, 4]
          case 4:
            newMsgs = msgs
              .filter(function (msg) {
                return res.some(function (status) {
                  return msg.messageClientId === status.messageClientId
                })
              })
              .map(function (item) {
                var teamMsgReceipt = res.find(function (j) {
                  return j.messageClientId === item.messageClientId
                })
                if (teamMsgReceipt) {
                  return _this._updateReceiptMsg(item, {
                    unread: teamMsgReceipt.unreadCount,
                    read: teamMsgReceipt.readCount,
                  })
                }
                return item
              })
            this.addMsg(conversationId, newMsgs)
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * pin 一条消息
   * @param message 需要被 pin 的消息体
   * @param serverExtension 扩展字段
   */
  MsgStore.prototype.pinMessageActive = function (message, serverExtension) {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var error_15
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('pinMessageActive', message, serverExtension)
            _c.label = 1
          case 1:
            _c.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.pinMessage(message, serverExtension),
            ]
          case 2:
            _c.sent()
            return [3 /*break*/, 4]
          case 3:
            error_15 = _c.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.warn(
                  'pinMessageActive failed but continue: ',
                  error_15.toString()
                )
            // 这里需要把错误抛出去，让 ui 层感知到
            throw error_15
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 取消一条Pin消息
   * @param messageRefer 需要被取消 pin 的消息摘要
   * @param serverExtension 扩展字段
   */
  MsgStore.prototype.unpinMessageActive = function (
    messageRefer,
    serverExtension
  ) {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var error_16
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('uppinMessageActive', messageRefer, serverExtension)
            _c.label = 1
          case 1:
            _c.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.unpinMessage(
                messageRefer,
                serverExtension
              ),
            ]
          case 2:
            _c.sent()
            return [3 /*break*/, 4]
          case 3:
            error_16 = _c.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.warn(
                  'uppinMessageActive failed but continue: ',
                  error_16.toString()
                )
            // 这里需要把错误抛出去，让 ui 层感知到
            throw error_16
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 取消一条Pin消息
   * @param messageRefer 需要被取消 pin 的消息摘要
   * @param serverExtension 扩展字段
   */
  MsgStore.prototype.updatePinMessageActive = function (
    message,
    serverExtension
  ) {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var error_17
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('updatePinMessageActive', message, serverExtension)
            _c.label = 1
          case 1:
            _c.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.updatePinMessage(
                message,
                serverExtension
              ),
            ]
          case 2:
            _c.sent()
            return [3 /*break*/, 4]
          case 3:
            error_17 = _c.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.warn(
                  'updatePinMessageActive failed but continue: ',
                  error_17.toString()
                )
            // 这里需要把错误抛出去，让 ui 层感知到
            throw error_17
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取 pin 消息列表
   * @param conversationId 会话id
   */
  MsgStore.prototype.getPinnedMessageListActive = function (conversationId) {
    return __awaiter(this, void 0, void 0, function () {
      var curPinMsgsMap, pinInfos
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            curPinMsgsMap = this.pinMsgs.get(conversationId)
            pinInfos = []
            if (!curPinMsgsMap) return [3 /*break*/, 1]
            // 如果内存里面有，从内存里面获取
            pinInfos = __spreadArray([], __read(curPinMsgsMap.values()), false)
            return [3 /*break*/, 3]
          case 1:
            return [
              4 /*yield*/,
              this._getPinnedMessageListByServer(conversationId),
            ]
          case 2:
            // 这里不做 try catch，底层方法已处理
            // 如果内存里面没有，那么像服务器获取
            pinInfos = _a.sent()
            _a.label = 3
          case 3:
            return [
              4 /*yield*/,
              this.completePinnedMessageList(conversationId, pinInfos),
              // 这里
            ]
          case 4:
            // 这里不做 try catch，底层方法已处理
            // 补全 pinInfos message 信息
            pinInfos = _a.sent()
            // 这里
            pinInfos = pinInfos
              .filter(function (pinInfo) {
                return pinInfo.pinState > 0 && pinInfo.message
              })
              .sort(function (a, b) {
                return b.message.createTime - a.message.createTime
              })
            return [2 /*return*/, pinInfos]
        }
      })
    })
  }
  /**
   * 停止流式输出
   * @param message 消息体
   * @param params 停止模式等入参
   */
  MsgStore.prototype.stopAIStreamMessageActive = function (message, params) {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var error_18
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('stopAIStreamMessageActive', message)
            _c.label = 1
          case 1:
            _c.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.stopAIStreamMessage(message, params),
            ]
          case 2:
            _c.sent()
            return [3 /*break*/, 4]
          case 3:
            error_18 = _c.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.error(
                  'stopAIStreamMessageActive failed ',
                  error_18.toString()
                )
            throw error_18
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 重新生成 ai 消息
   *
   * 注: 若是流式消息, 必须等到流式分片输出完毕, 才允许调用此 API
   *
   * 此外他支持两种配置
   *
   * 1. 更新，新消息覆盖老消息---只允许更新3天内的消息
   * 2. 新消息，产生一条新消息
   *
   * @param message 需要重新输出的原始数字人消息
   * @param params 确定重新输出的操作类型
   */
  MsgStore.prototype.regenAIMessageActive = function (message, params) {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var error_19
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('regenAIMessageActive', message)
            _c.label = 1
          case 1:
            _c.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.regenAIMessage(message, params),
            ]
          case 2:
            _c.sent()
            return [3 /*break*/, 4]
          case 3:
            error_19 = _c.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.error('regenAIMessageActive failed ', error_19.toString())
            throw error_19
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  MsgStore.prototype.voiceToTextActive = function (message) {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var text, error_20
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            // 已经有转过的消息不要再次转
            if (message.textOfVoice) return [2 /*return*/]
            // 判定如果没有附件, 或者附件不是语音类型的, 也 return
            if (!message.attachment) return [2 /*return*/]
            // 类型保护, 判定一定是音视频才能走入这段逻辑
            if (!('url' in message.attachment)) return [2 /*return*/]
            // 经过了上面的类型保护后, 这一段直接访问 message.attachment.url 才不会 ts 提示说不存在
            if (!message.attachment.url) return [2 /*return*/]
            if (!('duration' in message.attachment)) return [2 /*return*/]
            if (!message.attachment.duration) return [2 /*return*/]
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('voiceToTextActive', message)
            _c.label = 1
          case 1:
            _c.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.voiceToText({
                voiceUrl: message.attachment.url,
                duration: message.attachment.duration,
                sceneName: message.attachment.sceneName,
                // 在群里与产品孙有军交流, 得知可以写死 aac 和 16000
                mimeType: 'aac',
                sampleRate: '16000',
              }),
            ]
          case 2:
            text = _c.sent()
            if (!text) throw new Error('voiceToText empty')
            this.updateMsg(message.conversationId, message.messageClientId, {
              textOfVoice: text,
            })
            return [3 /*break*/, 4]
          case 3:
            error_20 = _c.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.warn('voiceToTextActive failed: ', error_20.toString())
            // 这里需要把错误抛出去，让 ui 层感知到
            throw error_20
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 往内存中添加消息
   * @param conversationId - 消息所属的会话的ID
   * @param msgs- 消息对象数组
   */
  MsgStore.prototype.addMsg = function (conversationId, msgs) {
    var _this = this
    var sortFunc = function (a, b) {
      return a.createTime - b.createTime
    }
    var _msgs = this.msgs.get(conversationId) || []
    // 获取当前会话的 pinMsgsMap
    var curPinMsgsMap = this.pinMsgs.get(conversationId)
    msgs
      .filter(function (item) {
        return !!item.messageClientId
      })
      .map(function (item) {
        // 这里做消息处理
        item = _this.handleReceiveAIMsg(item)
        if (curPinMsgsMap) item = _this.handleMsgPinState(item, curPinMsgsMap)
        return item
      })
      .forEach(function (item) {
        var newMsg = __assign({}, item)
        var _msg = _msgs.find(function (msg) {
          return msg.messageClientId === newMsg.messageClientId
        })
        // SDK 可能会返回多条 messageClientId 相同的数据，此时取 createTime 最新的
        if (_msg) {
          if (
            _msg.createTime <= newMsg.createTime ||
            _msg.sendingState === 3 /* V2NIMConst.V2NIMMessageSendingState
                                        .V2NIM_MESSAGE_SENDING_STATE_SENDING */
          ) {
            // 如果之前的消息有撤回相关字段，则更新时保留
            if (_msg.canRecall !== void 0 && _msg.reCallTimer !== void 0) {
              newMsg.canRecall = _msg.canRecall
              newMsg.reCallTimer = _msg.reCallTimer
            }
            // 如果之前已经请求过 voiceToText 语音转文字的结果, 那么更新时保留
            if (_msg.textOfVoice) {
              newMsg.textOfVoice = _msg.textOfVoice
            }
            _msgs.splice(_msgs.indexOf(_msg), 1, newMsg)
          }
        } else {
          _msgs.push(item)
        }
      })
    this.msgs.set(
      conversationId,
      __spreadArray([], __read(_msgs), false).sort(sortFunc),
      this.rootStore.uiStore.selectedConversation === conversationId
    )
  }
  /**
   * 从内存中删除消息
   * @param conversationId - 消息所属的会话的ID
   * @param idClients - 端测生成的消息id数组
   */
  MsgStore.prototype.removeMsg = function (conversationId, idClients) {
    var _this = this
    if (!conversationId) {
      this.getMsg().forEach(function (item) {
        _this._handleClearMsgTimer(item)
      })
      this.msgs.clear()
      return
    }
    var msgs = this.msgs.get(conversationId)
    if (!msgs) {
      return
    }
    if (!idClients || !idClients.length) {
      msgs.forEach(function (item) {
        _this._handleClearMsgTimer(item)
      })
      this.msgs.delete(conversationId)
      return
    }
    this.msgs.set(
      conversationId,
      msgs.filter(function (msg) {
        var isDelete =
          idClients.includes(msg.messageClientId) &&
          // 无法删除撤回消息
          !(
            msg.messageType ===
              100 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM */ &&
            msg.recallType === 'beReCallMsg'
          )
        if (isDelete) {
          _this._handleClearMsgTimer(msg)
        }
        return !isDelete
      }),
      this.rootStore.uiStore.selectedConversation === conversationId
    )
  }
  MsgStore.prototype.deletePinInfoByMessageClientId = function (
    conversationId,
    messageClientIds
  ) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log(
          'deletePinInfoByMessageClientId',
          conversationId,
          messageClientIds
        )
    this.pinMsgs.delete(conversationId, messageClientIds)
  }
  /**
   * 从内存中获取消息
   * @param conversationId - 消息所属的会话的ID
   * @param idClients - 端测生成的消息id数组
   */
  MsgStore.prototype.getMsg = function (conversationId, idClients) {
    if (!conversationId) {
      return this.msgs.values()
    }
    var msgs = this.msgs.get(conversationId) || []
    if (!idClients || !idClients.length) {
      return msgs
    }
    // 如果有 idClients，只返回 idClients 中的消息，新数组
    return msgs.filter(function (item) {
      return idClients.includes(item.messageClientId)
    })
  }
  MsgStore.prototype.updateMsg = function (
    conversationId,
    idClient,
    updateParam
  ) {
    var msgs = this.msgs.get(conversationId)
    if (!msgs) return
    var msg = msgs.findIndex(function (item) {
      return item.messageClientId === idClient
    })
    if (!msg) return
    this.msgs.set(
      conversationId,
      msgs.map(function (msg) {
        if (msg.messageClientId === idClient) {
          msg = __assign(__assign({}, msg), updateParam)
        }
        return msg
      }),
      this.rootStore.uiStore.selectedConversation === conversationId
    )
  }
  MsgStore.prototype.handleReceiveAIMsg = function (msg) {
    var myAccountId = this.rootStore.userStore.myUserInfo.accountId
    var aiConfig = msg.aiConfig
    var senderId = aiConfig
      ? aiConfig.aiStatus === 2
        ? aiConfig.accountId
        : msg.senderId
      : msg.senderId
    var isSelf = senderId === myAccountId
    return __assign(__assign({}, msg), {
      __kit__isSelf: msg.isSelf,
      __kit__senderId: msg.senderId,
      isSelf: isSelf,
    })
  }
  /** 处理消息的 pinState */
  MsgStore.prototype.handleMsgPinState = function (msg, curPinMsgsMap) {
    var pinInfo = curPinMsgsMap.get(msg.messageClientId)
    if (pinInfo) {
      msg.pinState = pinInfo.pinState
      msg.operatorId = pinInfo.operatorId
    }
    return msg
  }
  MsgStore.prototype.handleMsgForSDK = function (msg) {
    var __kit__isSelf = msg.__kit__isSelf,
      __kit__senderId = msg.__kit__senderId,
      rest = __rest(msg, ['__kit__isSelf', '__kit__senderId'])
    var senderId = msg.senderId,
      isSelf = msg.isSelf
    if (__kit__isSelf) {
      isSelf = __kit__isSelf
    }
    if (__kit__senderId) {
      senderId = __kit__senderId
    }
    return __assign(__assign({}, rest), { senderId: senderId, isSelf: isSelf })
  }
  MsgStore.prototype._getMessageListByRefer = function (messageRefers) {
    var _a
    return __awaiter(this, void 0, void 0, function () {
      var res, error_21
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            res = []
            _b.label = 1
          case 1:
            _b.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.getMessageListByRefers(
                messageRefers
              ),
            ]
          case 2:
            res = _b.sent()
            return [3 /*break*/, 4]
          case 3:
            error_21 = _b.sent()
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.warn(
                  '_getMessageListByRefer failed but continue: ',
                  error_21.toString()
                )
            return [3 /*break*/, 4]
          case 4:
            return [2 /*return*/, res]
        }
      })
    })
  }
  /** 从服务器拉 pin 消息列表 */
  MsgStore.prototype._getPinnedMessageListByServer = function (conversationId) {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var res, pinInfos, error_22
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('_getPinnedMessageListByServer', conversationId)
            res = []
            pinInfos = []
            _c.label = 1
          case 1:
            _c.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.nim.V2NIMMessageService.getPinnedMessageList(conversationId),
            ]
          case 2:
            res = _c.sent()
            return [3 /*break*/, 4]
          case 3:
            error_22 = _c.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.warn(
                  '_getPinnedMessageListByServer failed but continue: ',
                  error_22.toString()
                )
            return [3 /*break*/, 4]
          case 4:
            res.forEach(function (pin) {
              pinInfos.push(__assign({ pinState: 1 }, pin))
            })
            this.pinMsgs.set(conversationId, pinInfos)
            if (pinInfos.length) {
              // 主动获取 pin 消息时需要更新 msg 的 pin 状态
              this._updateMsgsPinState(conversationId, pinInfos)
            }
            return [2 /*return*/, pinInfos]
        }
      })
    })
  }
  /** 补全被 pin 的消息 */
  MsgStore.prototype.completePinnedMessageList = function (
    conversationId,
    pinInfos
  ) {
    return __awaiter(this, void 0, void 0, function () {
      var res, messageRefers
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            res = []
            if (!pinInfos.length) return [2 /*return*/, pinInfos]
            messageRefers = []
            // 找出缺少 message 的 pinInfo，说明这个 pinInfo 没有补全消息
            pinInfos.forEach(function (pinInfo) {
              if (!pinInfo.message) {
                messageRefers.push(pinInfo.messageRefer)
              }
            })
            if (!messageRefers.length)
              return [
                2 /*return*/,
                pinInfos,
                // 这里不做 try catch，因为 _getMessageListByRefer 已经处理了
                // 这里全都从服务器获取补全的消息，不从内存中获取已有的补全消息
              ]
            return [4 /*yield*/, this._getMessageListByRefer(messageRefers)]
          case 1:
            // 这里不做 try catch，因为 _getMessageListByRefer 已经处理了
            // 这里全都从服务器获取补全的消息，不从内存中获取已有的补全消息
            res = _a.sent()
            if (res.length) {
              pinInfos = pinInfos.map(function (pinInfo) {
                var msg = res.find(function (item) {
                  return (
                    item.messageClientId ===
                    pinInfo.messageRefer.messageClientId
                  )
                })
                if (msg) {
                  pinInfo = __assign(__assign({}, pinInfo), { message: msg })
                }
                return pinInfo
              })
              this.pinMsgs.set(conversationId, pinInfos)
            }
            return [2 /*return*/, pinInfos]
        }
      })
    })
  }
  MsgStore.prototype._handleSendMsgSuccess = function (msg) {
    if (msg && msg.conversationId) {
      // const canRecallMsg: V2NIMMessageForUI = {
      //   ...msg,
      //   canRecall: true,
      //   reCallTimer: setTimeout(() => {
      //     // 从内存中取最新的，因为中间可能有其他更新
      //     const _msg = this.getMsg(msg.conversationId, [msg.messageClientId])[0]
      //     if (_msg) {
      //       delete _msg.canRecall
      //       delete _msg.reCallTimer
      //       this.addMsg(msg.conversationId, [_msg])
      //     }
      //   }, RECALL_TIME) as unknown as number,
      // }
      // delete canRecallMsg.uploadProgress
      // delete canRecallMsg.previewImg
      // delete canRecallMsg.errorCode
      this.addMsg(msg.conversationId, [msg])
    }
  }
  MsgStore.prototype._handleSendMsgFail = function (msg, errorCode) {
    // 发送失败，拉黑的情况不能撤回、可以删除；网络情况不能撤回、不能删除
    // 因此删除那边做一下 try catch 处理，忽略错误消息
    // 先清除老消息的定时器，再更新消息
    if (msg && msg.conversationId) {
      var oldMsg = this.getMsg(msg.conversationId, [msg.messageClientId])[0]
      this._handleClearMsgTimer(oldMsg)
      this.addMsg(msg.conversationId, [
        __assign(__assign(__assign({}, oldMsg), msg), {
          messageStatus: {
            errorCode: errorCode,
          },
          uploadProgress: void 0,
          sendingState: 2 /* V2NIMConst.V2NIMMessageSendingState
                                  .V2NIM_MESSAGE_SENDING_STATE_FAILED */,
          errorCode: errorCode,
        }),
      ])
    }
  }
  MsgStore.prototype._handleClearMsgTimer = function (msg) {
    if (msg) {
      clearTimeout(msg.canEditTimer)
      clearTimeout(msg.reCallTimer)
    }
  }
  MsgStore.prototype._onReceiveMessages = function (data) {
    var _this = this
    var _a, _b, _c, _d
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onReceiveMessages: ', data)
    data.forEach(function (item) {
      _this.addMsg(item.conversationId, [item])
    })
    if (
      (_b = this.rootStore.sdkOptions) === null || _b === void 0
        ? void 0
        : _b.enableV2CloudConversation
    ) {
      ;(_c = this.rootStore.conversationStore) === null || _c === void 0
        ? void 0
        : _c.handleConversationWithAit(data)
    } else {
      ;(_d = this.rootStore.localConversationStore) === null || _d === void 0
        ? void 0
        : _d.handleConversationWithAit(data)
    }
  }
  MsgStore.prototype._onReceiveMessagesModified = function (data) {
    var _this = this
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onReceiveMessagesModified: ', data)
    data.forEach(function (item) {
      _this.addMsg(item.conversationId, [item])
    })
  }
  MsgStore.prototype._onClearHistoryNotifications = function (data) {
    var _this = this
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onClearHistory: ', data)
    data.forEach(function (item) {
      _this.removeMsg(item.conversationId)
    })
  }
  MsgStore.prototype._onMessageDeletedNotifications = function (data) {
    var _this = this
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onMessageDeletedNotifications: ', data)
    var res = {}
    data.forEach(function (item) {
      var conversationId = item.messageRefer.conversationId
      if (res[conversationId]) {
        res[conversationId].push(item)
      } else {
        res[conversationId] = [item]
      }
    })
    Object.keys(res).forEach(function (conversationId) {
      var messageClientIds = res[conversationId].map(function (item) {
        return item.messageRefer.messageClientId
      })
      _this.removeMsg(conversationId, messageClientIds)
      _this.deletePinInfoByMessageClientId(conversationId, messageClientIds)
    })
  }
  MsgStore.prototype._onMessagePinNotification = function (data) {
    var _this = this
    var _a = data.pin,
      operatorId = _a.operatorId,
      messageRefer = _a.messageRefer,
      serverExtension = _a.serverExtension,
      createTime = _a.createTime,
      updateTime = _a.updateTime
    var curPinMsgsMap = this.pinMsgs.get(messageRefer.conversationId)
    // 如果内存里面没有当前会话的 pin map，直接返回；等主动调用了 getPinnedMessageListActive 内存才会有 pin map，才处理相应的 _onMessagePinNotification
    if (!curPinMsgsMap) return
    var pinState = data.pinState
    var pinInfo =
      curPinMsgsMap === null || curPinMsgsMap === void 0
        ? void 0
        : curPinMsgsMap.get(messageRefer.messageClientId)
    var newPinInfo = [
      {
        pinState: pinState,
        messageRefer: messageRefer,
        operatorId: operatorId,
        serverExtension: serverExtension,
        // @ts-ignore
        createTime:
          (pinInfo === null || pinInfo === void 0
            ? void 0
            : pinInfo.createTime) || createTime,
        updateTime: updateTime,
      },
    ]
    // 补全 message。咨询过产品，nim.V2NIMMessageService.getMessageListByRefers 这个接口不会有频控的问题，一个人1分钟可以调用几百次。所以这里可以实时补全 message
    this.completePinnedMessageList(
      messageRefer.conversationId,
      newPinInfo
    ).then(function (pinInfo) {
      _this._updateMsgsPinState(messageRefer.conversationId, pinInfo)
    })
  }
  MsgStore.prototype._updateMsgsPinState = function (conversationId, pinInfos) {
    // 获取会话内存中维护的所有消息
    var _msgs = this.getMsg(conversationId) || []
    var hasChange = false
    pinInfos.forEach(function (pinInfo) {
      // 找到需要更新 pin 状态的 msg
      var msg = _msgs.find(function (msg) {
        return msg.messageClientId === pinInfo.messageRefer.messageClientId
      })
      // 如果内存里有对应的消息，再更新 pin 状态；没有，会在之后拉取到对应消息再更新
      if (msg && msg.pinState !== pinInfo.pinState) {
        var newMsg = __assign({}, msg)
        newMsg.pinState = pinInfo.pinState
        newMsg.operatorId = pinInfo.operatorId
        _msgs.splice(_msgs.indexOf(msg), 1, newMsg)
        hasChange = true
      }
    })
    if (hasChange) {
      this.msgs.set(
        conversationId,
        _msgs,
        this.rootStore.uiStore.selectedConversation === conversationId
      )
    }
  }
  MsgStore.prototype._onMessageQuickCommentNotification = function () {
    // 暂不支持
  }
  MsgStore.prototype._onMessageRevokeNotifications = function (data) {
    var _a
    return __awaiter(this, void 0, void 0, function () {
      var _this = this
      return __generator(this, function (_b) {
        ;(_a = this.logger) === null || _a === void 0
          ? void 0
          : _a.log('_onMessageRevokeNotifications: ', data)
        data.forEach(function (item) {
          return __awaiter(_this, void 0, void 0, function () {
            var oldMsg,
              conversationId,
              messageClientIds,
              msg,
              conversation,
              aitMsgs,
              messageClientId_1
            var _a, _b, _c, _d, _e, _f
            return __generator(this, function (_g) {
              oldMsg = this.getMsg(item.messageRefer.conversationId, [
                item.messageRefer.messageClientId,
              ])[0]
              // 这里只处理新的撤回消息，老的表示是自己主动撤回的，不处理。
              if (oldMsg && oldMsg.recallType) {
                return [2 /*return*/]
              }
              conversationId = item.messageRefer.conversationId
              messageClientIds = [item.messageRefer.messageClientId]
              this.removeMsg(conversationId, messageClientIds)
              this.deletePinInfoByMessageClientId(
                conversationId,
                messageClientIds
              )
              msg = this._createBeReCallMsg(item)
              this.addMsg(msg.conversationId, [msg])
              if (
                item.messageRefer.conversationType ===
                2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */
              ) {
                conversation = (
                  (_a = this.rootStore.sdkOptions) === null || _a === void 0
                    ? void 0
                    : _a.enableV2CloudConversation
                )
                  ? (_b = this.rootStore.conversationStore) === null ||
                    _b === void 0
                    ? void 0
                    : _b.conversations.get(conversationId)
                  : (_c = this.rootStore.localConversationStore) === null ||
                    _c === void 0
                  ? void 0
                  : _c.conversations.get(conversationId)
                if (conversation) {
                  aitMsgs = conversation.aitMsgs || []
                  messageClientId_1 = item.messageRefer.messageClientId
                  if (aitMsgs.includes(messageClientId_1)) {
                    aitMsgs = aitMsgs.filter(function (item) {
                      return item !== messageClientId_1
                    })
                    if (
                      (_d = this.rootStore.sdkOptions) === null || _d === void 0
                        ? void 0
                        : _d.enableV2CloudConversation
                    ) {
                      ;(_e = this.rootStore.conversationStore) === null ||
                      _e === void 0
                        ? void 0
                        : _e.updateConversation([
                            __assign(__assign({}, conversation), {
                              aitMsgs: aitMsgs,
                            }),
                          ])
                    } else {
                      ;(_f = this.rootStore.localConversationStore) === null ||
                      _f === void 0
                        ? void 0
                        : _f.updateConversation([
                            __assign(__assign({}, conversation), {
                              aitMsgs: aitMsgs,
                            }),
                          ])
                    }
                  }
                }
              }
              return [2 /*return*/]
            })
          })
        })
        return [2 /*return*/]
      })
    })
  }
  MsgStore.prototype._onReceiveP2PMessageReadReceipts = function (data) {
    var _this = this
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onReceiveP2PMessageReadReceipts: ', data)
    data.forEach(function (item) {
      var _a, _b, _c, _d, _e, _f
      var oldConversation = (
        (_a = _this.rootStore.sdkOptions) === null || _a === void 0
          ? void 0
          : _a.enableV2CloudConversation
      )
        ? (_b = _this.rootStore.conversationStore) === null || _b === void 0
          ? void 0
          : _b.conversations.get(item.conversationId)
        : (_c = _this.rootStore.localConversationStore) === null ||
          _c === void 0
        ? void 0
        : _c.conversations.get(item.conversationId)
      if (
        oldConversation &&
        item.timestamp > (oldConversation.msgReceiptTime || 0)
      ) {
        if (
          (_d = _this.rootStore.sdkOptions) === null || _d === void 0
            ? void 0
            : _d.enableV2CloudConversation
        ) {
          ;(_e = _this.rootStore.conversationStore) === null || _e === void 0
            ? void 0
            : _e.updateConversation([
                __assign(__assign({}, oldConversation), {
                  msgReceiptTime: item.timestamp,
                }),
              ])
        } else {
          ;(_f = _this.rootStore.localConversationStore) === null ||
          _f === void 0
            ? void 0
            : _f.updateConversation([
                __assign(__assign({}, oldConversation), {
                  msgReceiptTime: item.timestamp,
                }),
              ])
        }
      }
    })
  }
  MsgStore.prototype._onReceiveTeamMessageReadReceipts = function (data) {
    var _this = this
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onReceiveTeamMessageReadReceipts: ', data)
    // 群消息中，同一条消息可能收到多条消息的回执，需要按照已读数量排序，服务端下发可能顺序不一致，端上排序，保证最后的已读未读情况覆盖之前的
    data.sort(function (a, b) {
      return a.readCount - b.readCount
    })
    data.forEach(function (msgReadReceipt) {
      var conversationId = msgReadReceipt.conversationId
      var msg = _this.getMsg(conversationId, [
        msgReadReceipt.messageClientId,
      ])[0]
      if (msg) {
        var newMsg = _this._updateReceiptMsg(msg, {
          unread: msgReadReceipt.unreadCount,
          read: msgReadReceipt.readCount,
        })
        _this.addMsg(conversationId, [newMsg])
      }
    })
  }
  MsgStore.prototype._formatExtField = function (
    conversationId,
    serverExtension
  ) {
    var extObj = serverExtension || {}
    // 有回复消息的情况，需要把回复消息的信息放到 serverExtension 中
    var replyMsg = this.getReplyMsgActive(conversationId)
    if (replyMsg) {
      extObj.yxReplyMsg = {
        idClient: replyMsg.messageClientId,
        scene: replyMsg.conversationType,
        from: replyMsg.senderId,
        receiverId: replyMsg.receiverId,
        to: replyMsg.conversationId,
        idServer: replyMsg.messageServerId,
        time: replyMsg.createTime,
      }
    }
    return extObj
  }
  MsgStore.prototype._updateReceiptMsg = function (originMsg, data) {
    return __assign(__assign({}, originMsg), {
      yxUnread: Number(data.unread),
      yxRead: Number(data.read),
    })
  }
  MsgStore.prototype._formatExtAitToPushInfo = function (yxAitMsg, content) {
    function getForcePushIDsList(obj) {
      return Object.keys(obj).includes(AT_ALL_ACCOUNT)
        ? void 0
        : Object.keys(obj)
    }
    var pushInfo = {
      forcePushAccountIds: getForcePushIDsList(yxAitMsg),
      forcePush: true,
      forcePushContent: content,
    }
    return pushInfo
  }
  MsgStore.prototype._createReCallMsg = function (msg) {
    var _this = this
    var recallMsg = __assign(__assign({}, msg), {
      isSelf: true,
      sendingState: 1 /* V2NIMConst.V2NIMMessageSendingState
                      .V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED */,
      messageType: 100 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM */,
      recallType: 'reCallMsg',
      messageClientId: 'recall-'.concat(msg.messageClientId),
    })
    // 只有 type 为 custom 和 text 的消息可以被重新编辑
    if (
      [
        100 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM */,
        0 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT */,
      ].includes(msg.messageType)
    ) {
      recallMsg.oldText = msg.text
      recallMsg.canEdit = true
      recallMsg.isRecallMsg = true
      recallMsg.canEditTimer = setTimeout(function () {
        var newMsg = _this.getMsg(recallMsg.conversationId, [
          recallMsg.messageClientId,
        ])[0]
        if (newMsg) {
          _this.addMsg(newMsg.conversationId, [
            __assign(__assign({}, newMsg), { canEdit: false }),
          ])
        }
      }, RECALL_TIME)
    }
    return recallMsg
  }
  MsgStore.prototype._createBeReCallMsg = function (data) {
    // @ts-ignore
    return __assign(__assign({}, data.messageRefer), {
      isSelf:
        data.messageRefer.senderId ===
        this.rootStore.userStore.myUserInfo.accountId,
      sendingState: 1 /* V2NIMConst.V2NIMMessageSendingState
                      .V2NIM_MESSAGE_SENDING_STATE_SUCCEEDED */,
      messageType: 100 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM */,
      recallType: 'beReCallMsg',
      messageClientId: 'recall-'.concat(data.messageRefer.messageClientId),
    })
  }
  MsgStore.prototype._getAIConfig = function (msg) {
    var _this = this
    var _a
    var serverExtension = msg.serverExtension,
      conversationId = msg.conversationId,
      receiverId = msg.receiverId,
      messageType = msg.messageType,
      _b = msg.text,
      text = _b === void 0 ? '' : _b
    var serverExt
    try {
      serverExt = JSON.parse(serverExtension || '{}')
    } catch (error) {
      serverExt = {}
    }
    // at 消息
    var yxAitMsg = serverExt.yxAitMsg || {}
    // 回复消息
    var replyMsg = this.getReplyMsgActive(conversationId)
    var relation = this.rootStore.uiStore.getRelation(receiverId).relation
    var myAccountId = this.rootStore.userStore.myUserInfo.accountId
    var aiConfig = void 0
    if (relation === 'ai') {
      if (
        messageType ===
        0 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT */
      ) {
        // 取最近的30条文本会话
        var _msgs = (this.msgs.get(conversationId) || [])
          .slice(-AI_MESSAGE_LIMIT)
          .filter(function (item) {
            return (
              item.messageType ===
              0 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT */
            )
          })
        // 找到第一条自己发的消息，从此时开始作为真正的上下文
        var myIndex = _msgs.findIndex(function (item) {
          return item.senderId === myAccountId
        })
        _msgs = myIndex === -1 ? [] : _msgs.slice(myIndex)
        aiConfig = {
          accountId: receiverId,
          content: { msg: text, type: 0 },
          // 取最后30条消息作为上下文
          messages: _msgs.map(function (item) {
            var role = item.senderId === myAccountId ? 'user' : 'assistant'
            return {
              role: role,
              msg: item.text || '',
              type: 0,
            }
          }),
        }
      } else {
        aiConfig = {
          accountId: receiverId,
        }
      }
    }
    // 只保留 at 数字人的 yxAitMsg
    var newYxAitMsg = {}
    Object.keys(yxAitMsg).forEach(function (account) {
      if (_this.rootStore.aiUserStore.aiUsers.has(account)) {
        newYxAitMsg[account] = yxAitMsg[account]
      }
    })
    // 找到最早的 at 数字人
    var aiAtAccount = this._findMinStart(newYxAitMsg)
    var aiAtMember = this.rootStore.aiUserStore.aiUsers.get(aiAtAccount || '')
    // 表示 at 数字人
    if (aiAtMember) {
      aiConfig = {
        accountId: aiAtMember.accountId,
        content: { msg: text, type: 0 },
      }
    }
    // 表示此时有回复消息
    if (replyMsg && aiConfig) {
      // 只有回复的是文本消息需要带上下文，其他类型消息不用带上下文
      if (
        replyMsg.messageType ===
        0 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT */
      ) {
        aiConfig.messages = [
          {
            role: 'user',
            msg: replyMsg.text || '',
            type: 0,
          },
        ]
      } else {
        aiConfig.messages = void 0
      }
    }
    //@ts-ignore
    aiConfig === null || aiConfig === void 0
      ? void 0
      : (aiConfig.aiStream =
          (_a = this.localOptions) === null || _a === void 0
            ? void 0
            : _a.aiStream)
    return aiConfig
  }
  MsgStore.prototype._findMinStart = function (data) {
    var e_1, _a
    var minStart = Number.MAX_VALUE
    var minStartKey = void 0
    for (var key in data) {
      var segments = data[key].segments
      try {
        for (
          var segments_1 = ((e_1 = void 0), __values(segments)),
            segments_1_1 = segments_1.next();
          !segments_1_1.done;
          segments_1_1 = segments_1.next()
        ) {
          var segment = segments_1_1.value
          if (segment.start < minStart) {
            minStart = segment.start
            minStartKey = key
          }
        }
      } catch (e_1_1) {
        e_1 = { error: e_1_1 }
      } finally {
        try {
          if (segments_1_1 && !segments_1_1.done && (_a = segments_1.return))
            _a.call(segments_1)
        } finally {
          if (e_1) throw e_1.error
        }
      }
    }
    return minStartKey
  }
  return MsgStore
})()

/**Mobx 可观察对象，负责管理黑名单和静音列表的子store */
var RelationStore = /** @class */ (function () {
  function RelationStore(rootStore, nim) {
    this.rootStore = rootStore
    this.nim = nim
    this.blacklist = []
    this.mutes = []
    this.logger = null
    makeAutoObservable(this)
    this.logger = rootStore.logger
    this._onBlockListAdded = this._onBlockListAdded.bind(this)
    this._onBlockListRemoved = this._onBlockListRemoved.bind(this)
    this._onP2PMessageMuteModeChanged =
      this._onP2PMessageMuteModeChanged.bind(this)
    /** 黑名单新增用户回调，返回新加入黑名单的用户列表。当客户端本端添加用户到黑名单，或者其他端同步添加用户到黑名单时触发该回调 */
    nim.V2NIMUserService.on('onBlockListAdded', this._onBlockListAdded)
    /** 黑名单移除用户回调，返回移出黑名单的用户列表。当客户端本端从黑名单移除用户，或者其他端同步从黑名单移除用户时触发该回调 */
    nim.V2NIMUserService.on('onBlockListRemoved', this._onBlockListRemoved)
    /** 单聊消息免打扰模式变更事件 */
    nim.V2NIMSettingService.on(
      'onP2PMessageMuteModeChanged',
      this._onP2PMessageMuteModeChanged
    )
  }
  RelationStore.prototype.resetState = function () {
    this.blacklist = []
    this.mutes = []
  }
  /**
   * 销毁RelationStore，会取消相关事件监听
   */
  RelationStore.prototype.destroy = function () {
    this.resetState()
    this.nim.V2NIMUserService.off('onBlockListAdded', this._onBlockListAdded)
    this.nim.V2NIMUserService.off(
      'onBlockListRemoved',
      this._onBlockListRemoved
    )
    this.nim.V2NIMSettingService.off(
      'onP2PMessageMuteModeChanged',
      this._onP2PMessageMuteModeChanged
    )
  }
  /**
   * 内存中增加黑名单列表
   * @param accounts - 账号数组
   */
  RelationStore.prototype.addBlacklist = function (accounts) {
    this.blacklist = __spreadArray(
      [],
      __read(new Set(this.blacklist.concat(accounts))),
      false
    )
  }
  /**
   * 内存中删除黑名单列表
   * @param accounts - 账号数组
   */
  RelationStore.prototype.removeBlacklist = function (accounts) {
    this.blacklist = this.blacklist.filter(function (i) {
      return accounts.every(function (j) {
        return i !== j
      })
    })
  }
  /**
   * 是否在黑名单列表
   */
  RelationStore.prototype.isInBlacklist = function (account) {
    return this.blacklist.includes(account)
  }
  /**
   * 内存中增加静音列表
   * @param accounts - 账号数组
   */
  RelationStore.prototype.addMutes = function (accounts) {
    this.mutes = __spreadArray(
      [],
      __read(new Set(this.mutes.concat(accounts))),
      false
    )
  }
  /**
   * 内存中删除静音列表
   * @param accounts - 账号数组
   */
  RelationStore.prototype.removeMutes = function (accounts) {
    this.mutes = this.mutes.filter(function (i) {
      return accounts.every(function (j) {
        return i !== j
      })
    })
  }
  // 获取黑名单列表
  RelationStore.prototype.getBlockListActive = function () {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var res, error_1
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _c.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getBlockListActive')
            return [4 /*yield*/, this.nim.V2NIMUserService.getBlockList()]
          case 1:
            res = _c.sent()
            this.addBlacklist(res)
            return [2 /*return*/, res]
          case 2:
            error_1 = _c.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.error('getBlockListActive failed: ', error_1)
            throw error_1
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  // 获取P2P消息免打扰列表
  RelationStore.prototype.getP2PMuteListActive = function () {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var res, error_2
      return __generator(this, function (_c) {
        switch (_c.label) {
          case 0:
            _c.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getP2PMuteListActive')
            return [
              4 /*yield*/,
              this.nim.V2NIMSettingService.getP2PMessageMuteList(),
            ]
          case 1:
            res = _c.sent()
            this.addMutes(res)
            return [2 /*return*/, res]
          case 2:
            error_2 = _c.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.error('getP2PMuteListActive failed: ', error_2)
            throw error_2
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 加入 黑名单
   * @param accountId 账号
   */
  RelationStore.prototype.addUserToBlockListActive = function (accountId) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_3
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('addUserToBlockListActive', accountId)
            return [
              4 /*yield*/,
              this.nim.V2NIMUserService.addUserToBlockList(accountId),
            ]
          case 1:
            _d.sent()
            this.addBlacklist([accountId])
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('addUserToBlockListActive success', accountId)
            return [3 /*break*/, 3]
          case 2:
            error_3 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'addUserToBlockListActive failed: ',
                  accountId,
                  error_3
                )
            throw error_3
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 移除 黑名单
   * @param accountId 账号
   */
  RelationStore.prototype.removeUserFromBlockListActive = function (accountId) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_4
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('removeUserFromBlockListActive', accountId)
            return [
              4 /*yield*/,
              this.nim.V2NIMUserService.removeUserFromBlockList(accountId),
            ]
          case 1:
            _d.sent()
            this.removeBlacklist([accountId])
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('removeUserFromBlockListActive success', accountId)
            return [3 /*break*/, 3]
          case 2:
            error_4 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'removeUserFromBlockListActive failed: ',
                  accountId,
                  error_4
                )
            throw error_4
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 设置/取消 单聊（点对点）消息免打扰模式
   * @param accountId 账号
   * @param muteMode  消息免打扰模式：免打扰开启或免打扰关闭
   */
  RelationStore.prototype.setP2PMessageMuteModeActive = function (
    accountId,
    muteMode
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_5
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('setP2PMessageMuteModeActive', accountId, muteMode)
            return [
              4 /*yield*/,
              this.nim.V2NIMSettingService.setP2PMessageMuteMode(
                accountId,
                muteMode
              ),
            ]
          case 1:
            _d.sent()
            if (
              muteMode ===
              1 /* V2NIMConst.V2NIMP2PMessageMuteMode.V2NIM_P2P_MESSAGE_MUTE_MODE_ON */
            ) {
              this.addMutes([accountId])
            } else if (
              muteMode ===
              0 /* V2NIMConst.V2NIMP2PMessageMuteMode.V2NIM_P2P_MESSAGE_MUTE_MODE_OFF */
            ) {
              this.removeMutes([accountId])
            }
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('setP2PMessageMuteModeActive success', {
                  accountId: accountId,
                  muteMode: muteMode,
                })
            return [3 /*break*/, 3]
          case 2:
            error_5 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'setP2PMessageMuteModeActive failed: ',
                  { accountId: accountId, muteMode: muteMode },
                  error_5
                )
            throw error_5
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 黑名单新增用户回调，返回新加入黑名单的用户列表。当客户端本端添加用户到黑名单，或者其他端同步添加用户到黑名单时触发该回调
   */
  RelationStore.prototype._onBlockListAdded = function (user) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onBlockListAdded', user)
    this.addBlacklist([user.accountId])
  }
  /**
   * 黑名单移除用户回调，返回移出黑名单的用户列表。当客户端本端从黑名单移除用户，或者其他端同步从黑名单移除用户时触发该回调。
   */
  RelationStore.prototype._onBlockListRemoved = function (accountId) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onBlockListRemoved', accountId)
    this.removeBlacklist([accountId])
  }
  /**
   * 单聊消息免打扰模式变更事件
   */
  RelationStore.prototype._onP2PMessageMuteModeChanged = function (
    accountId,
    muteMode
  ) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onP2PMessageMuteModeChanged', accountId, muteMode)
    if (
      muteMode ===
      1 /* V2NIMConst.V2NIMP2PMessageMuteMode.V2NIM_P2P_MESSAGE_MUTE_MODE_ON */
    ) {
      this.addMutes([accountId])
    } else if (
      muteMode ===
      0 /* V2NIMConst.V2NIMP2PMessageMuteMode.V2NIM_P2P_MESSAGE_MUTE_MODE_OFF */
    ) {
      this.removeMutes([accountId])
    }
  }
  return RelationStore
})()

/**Mobx 可观察对象，负责管理会话列表的子 store */
var ConversationStore = /** @class */ (function () {
  function ConversationStore(rootStore, nim) {
    this.rootStore = rootStore
    this.nim = nim
    this.conversations = new Map()
    this.totalUnreadCount = 0
    this.logger = null
    makeAutoObservable(this)
    this._onSyncStarted = this._onSyncStarted.bind(this)
    this._onSyncFinished = this._onSyncFinished.bind(this)
    this._onSyncFailed = this._onSyncFailed.bind(this)
    this._onConversationCreated = this._onConversationCreated.bind(this)
    this._onConversationDeleted = this._onConversationDeleted.bind(this)
    this._onConversationChanged = this._onConversationChanged.bind(this)
    this._onTotalUnreadCountChanged = this._onTotalUnreadCountChanged.bind(this)
    this.logger = rootStore.logger
    /** 数据同步开始 */
    nim.V2NIMConversationService.on('onSyncStarted', this._onSyncStarted)
    /** 数据同步结束 */
    nim.V2NIMConversationService.on('onSyncFinished', this._onSyncFinished)
    /** 数据同步失败 */
    nim.V2NIMConversationService.on('onSyncFailed', this._onSyncFailed)
    /** 会话创建 */
    nim.V2NIMConversationService.on(
      'onConversationCreated',
      this._onConversationCreated
    )
    /** 会话删除 */
    nim.V2NIMConversationService.on(
      'onConversationDeleted',
      this._onConversationDeleted
    )
    /** 会话更新 */
    nim.V2NIMConversationService.on(
      'onConversationChanged',
      this._onConversationChanged
    )
    /** 会话总未读数变化 */
    nim.V2NIMConversationService.on(
      'onTotalUnreadCountChanged',
      this._onTotalUnreadCountChanged
    )
  }
  ConversationStore.prototype.resetState = function () {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('Conversation resetState')
    this.conversations.clear()
    this.totalUnreadCount = 0
  }
  /**
   * 销毁
   */
  ConversationStore.prototype.destroy = function () {
    this.resetState()
    this.nim.V2NIMConversationService.off('onSyncStarted', this._onSyncStarted)
    this.nim.V2NIMConversationService.off(
      'onSyncFinished',
      this._onSyncFinished
    )
    this.nim.V2NIMConversationService.off('onSyncFailed', this._onSyncFailed)
    this.nim.V2NIMConversationService.off(
      'onConversationCreated',
      this._onConversationCreated
    )
    this.nim.V2NIMConversationService.off(
      'onConversationDeleted',
      this._onConversationDeleted
    )
    this.nim.V2NIMConversationService.off(
      'onConversationChanged',
      this._onConversationChanged
    )
    this.nim.V2NIMConversationService.off(
      'onTotalUnreadCountChanged',
      this._onTotalUnreadCountChanged
    )
  }
  /**
   * 添加内存中的会话
   * @param conversations 会话数组
   */
  ConversationStore.prototype.addConversation = function (conversations) {
    var _this = this
    conversations
      .filter(function (item) {
        return !!item.conversationId
      })
      // 暂时仅支持 p2p 和 team
      .filter(function (item) {
        return [
          1 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P */,
          2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */,
        ].includes(item.type)
      })
      .forEach(function (item) {
        return __awaiter(_this, void 0, void 0, function () {
          var oldConversation
          return __generator(this, function (_a) {
            oldConversation = this.conversations.get(item.conversationId)
            // 先更新一次
            this.conversations.set(
              item.conversationId,
              __assign(__assign({}, oldConversation), item)
            )
            return [2 /*return*/]
          })
        })
      })
  }
  /**
   * 更新内存中的会话
   * @param conversations 会话数组
   */
  ConversationStore.prototype.updateConversation = function (conversations) {
    var _this = this
    conversations
      .filter(function (item) {
        return !!item.conversationId
      })
      // 暂时仅支持 p2p 和 team
      .filter(function (item) {
        return [
          1 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P */,
          2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */,
        ].includes(item.type)
      })
      .forEach(function (item) {
        var oldConversation = _this.conversations.get(item.conversationId)
        _this.conversations.set(
          item.conversationId,
          __assign(__assign({}, oldConversation), item)
        )
      })
  }
  /**
   * 移除内存中的会话
   * @param conversationId 会话ID
   */
  ConversationStore.prototype.removeConversation = function (conversationIds) {
    var _this = this
    conversationIds.forEach(function (item) {
      _this.conversations.delete(item)
      if (_this.rootStore.uiStore.selectedConversation === item) {
        _this.rootStore.uiStore.unselectConversation()
      }
    })
  }
  /**
   * 重置会话未读数
   * @param conversationId - 消息所属的会话的ID
   */
  ConversationStore.prototype.resetConversation = function (conversationId) {
    var _a, _b, _c, _d
    return __awaiter(this, void 0, void 0, function () {
      var conversation, error_1
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('resetConversation', conversationId)
            conversation = this.conversations.get(conversationId)
            if (!conversation) {
              ;(_b = this.logger) === null || _b === void 0
                ? void 0
                : _b.warn(
                    'resetConversation: conversation is not found.',
                    conversationId
                  )
              return [2 /*return*/]
            }
            _e.label = 1
          case 1:
            _e.trys.push([1, 4, , 5])
            if (!conversation.unreadCount) return [3 /*break*/, 3]
            // 请求前也清理一次会话未读数，fix http://jira.netease.com/browse/YYTX-34326
            this._resetMemoryConversationUnreadCount(conversation)
            return [
              4 /*yield*/,
              this.nim.V2NIMConversationService.clearUnreadCountByIds([
                conversation.conversationId,
              ]),
            ]
          case 2:
            _e.sent()
            this._resetMemoryConversationUnreadCount(conversation)
            _e.label = 3
          case 3:
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.log('resetConversation success')
            return [3 /*break*/, 5]
          case 4:
            error_1 = _e.sent()
            ;(_d = this.logger) === null || _d === void 0
              ? void 0
              : _d.error('resetConversation failed: ', error_1)
            throw error_1
          case 5:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 插入一条会话记录
   * @param conversationType
   * @param receiverId - 接收方, 对方帐号或者群id
   * @param isSelected - 是否选中
   */
  ConversationStore.prototype.insertConversationActive = function (
    conversationType,
    receiverId,
    isSelected
  ) {
    var _a, _b, _c
    if (isSelected === void 0) {
      isSelected = true
    }
    return __awaiter(this, void 0, void 0, function () {
      var conversationId, conversation, error_2
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 5, , 6])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('insertConversationActive', {
                  conversationType: conversationType,
                  receiverId: receiverId,
                  isSelected: isSelected,
                })
            conversationId = ''
            if (
              conversationType ===
              1 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P */
            ) {
              conversationId =
                this.nim.V2NIMConversationIdUtil.p2pConversationId(receiverId)
            } else if (
              conversationType ===
              2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */
            ) {
              conversationId =
                this.nim.V2NIMConversationIdUtil.teamConversationId(receiverId)
            } else {
              throw new Error('Unsupported conversation type')
            }
            if (!!this.conversations.has(conversationId))
              return [3 /*break*/, 2]
            return [
              4 /*yield*/,
              this.nim.V2NIMConversationService.createConversation(
                conversationId
              ),
            ]
          case 1:
            conversation = _d.sent()
            this.addConversation([conversation])
            _d.label = 2
          case 2:
            if (!isSelected) return [3 /*break*/, 4]
            return [
              4 /*yield*/,
              this.rootStore.uiStore.selectConversation(conversationId),
            ]
          case 3:
            _d.sent()
            _d.label = 4
          case 4:
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('insertConversationActive success', {
                  conversationType: conversationType,
                  receiverId: receiverId,
                  isSelected: isSelected,
                })
            return [3 /*break*/, 6]
          case 5:
            error_2 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'insertConversationActive failed: ',
                  {
                    conversationType: conversationType,
                    receiverId: receiverId,
                    isSelected: isSelected,
                  },
                  error_2
                )
            throw error_2
          case 6:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 删除会话记录
   * @param conversationId - 消息所属的会话的ID
   */
  ConversationStore.prototype.deleteConversationActive = function (
    conversationId
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_4
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 6, , 7])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('deleteConversationActive', conversationId)
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.stickTopConversationActive(conversationId, false),
            ]
          case 2:
            _d.sent()
            return [3 /*break*/, 4]
          case 3:
            _d.sent()
            return [3 /*break*/, 4]
          case 4:
            // 先删除内存，防止删除失败导致一些问题
            this.removeConversation([conversationId])
            // 不删除历史消息，让表现跟线上一致，后续可根据需求调整
            return [
              4 /*yield*/,
              this.nim.V2NIMConversationService.deleteConversation(
                conversationId,
                false
              ),
            ]
          case 5:
            // 不删除历史消息，让表现跟线上一致，后续可根据需求调整
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('deleteConversationActive success')
            return [3 /*break*/, 7]
          case 6:
            error_4 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.warn(
                  'deleteConversationActive failed but continue: ',
                  error_4
                )
            return [3 /*break*/, 7]
          case 7:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 新增会话置顶
   * @param conversationId - 消息所属的会话的ID
   * @param stickTop - 是否置顶
   */
  ConversationStore.prototype.stickTopConversationActive = function (
    conversationId,
    stickTop
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_5
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('stickTopConversationActive', conversationId, stickTop)
            return [
              4 /*yield*/,
              this.nim.V2NIMConversationService.stickTopConversation(
                conversationId,
                stickTop
              ),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('stickTopConversationActive success')
            return [3 /*break*/, 3]
          case 2:
            error_5 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('stickTopConversationActive failed: ', error_5)
            throw error_5
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取会话列表
   * @param offset 分页偏移量
   * @param limit 分页拉取数量
   */
  ConversationStore.prototype.getConversationListActive = function (
    offset,
    limit
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, error_6
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 3, , 4])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getConversationListActive', offset, limit)
            return [
              4 /*yield*/,
              this.nim.V2NIMConversationService.getConversationList(
                offset,
                limit
              ),
            ]
          case 1:
            res = _d.sent()
            this.addConversation(res.conversationList)
            return [
              4 /*yield*/,
              this.getP2PMessageReceipt(
                res.conversationList
                  .filter(function (item) {
                    return (
                      item.type ===
                      1 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P */
                    )
                  })
                  .map(function (item) {
                    return item.conversationId
                  })
              ),
            ]
          case 2:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getConversationListActive success', offset, limit, res)
            return [2 /*return*/, res]
          case 3:
            error_6 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'getConversationListActive failed: ',
                  error_6,
                  offset,
                  limit
                )
            throw error_6
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  ConversationStore.prototype.getP2PMessageReceipt = function (
    conversationIds
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, conversations, error_7
      var _this = this
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getP2PMessageReceipt', conversationIds)
            return [
              4 /*yield*/,
              Promise.all(
                conversationIds.map(function (item) {
                  return _this.nim.V2NIMMessageService.getP2PMessageReceipt(
                    item
                  )
                })
              ),
            ]
          case 1:
            res = _d.sent()
            conversations = res
              .map(function (item) {
                var conversation = _this.conversations.get(item.conversationId)
                if (conversation) {
                  return __assign(__assign({}, conversation), {
                    msgReceiptTime: item.timestamp,
                  })
                }
              })
              .filter(function (item) {
                return !!item
              })
            this.updateConversation(conversations)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getP2PMessageReceipt success', conversationIds, res)
            return [2 /*return*/, res]
          case 2:
            error_7 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'getP2PMessageReceipt failed: ',
                  error_7,
                  conversationIds
                )
            throw error_7
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  ConversationStore.prototype._resetMemoryConversationUnreadCount = function (
    conversation
  ) {
    var newConversation = this.conversations.get(conversation.conversationId)
    if (newConversation) {
      this.updateConversation([
        __assign(__assign({}, newConversation), { unreadCount: 0 }),
      ])
    }
  }
  /**
   * 获取会话已读时间戳。该时间包含多端已读时间戳
   */
  ConversationStore.prototype.getConversationReadTimeActive = function (
    conversationId
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, error_8
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getConversationReadTimeActive', conversationId)
            return [
              4 /*yield*/,
              this.nim.V2NIMConversationService.getConversationReadTime(
                conversationId
              ),
            ]
          case 1:
            res = _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'getConversationReadTimeActive success',
                  conversationId,
                  res
                )
            return [2 /*return*/, res]
          case 2:
            error_8 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'getConversationReadTimeActive failed: ',
                  error_8,
                  conversationId
                )
            throw error_8
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 标记会话已读时间戳
   *
   * 注: 当该方法调用后，SDK 可能给多端账户抛出以下的事件
   *
   * {@link V2NIMConversationListener.onConversationReadTimeUpdated | V2NIMConversationListener.onConversationReadTimeUpdated} <br/>
   *
   */
  ConversationStore.prototype.markConversationReadActive = function (
    conversationId
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, error_9
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('markConversationReadActive', conversationId)
            return [
              4 /*yield*/,
              this.nim.V2NIMConversationService.markConversationRead(
                conversationId
              ),
            ]
          case 1:
            res = _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'markConversationReadActive success',
                  conversationId,
                  res
                )
            return [2 /*return*/, res]
          case 2:
            error_9 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'markConversationReadActive failed: ',
                  error_9,
                  conversationId
                )
            throw error_9
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 处理会话中的@ 消息
   */
  ConversationStore.prototype.handleConversationWithAit = function (msgs) {
    var _this = this
    msgs.map(function (item) {
      return __awaiter(_this, void 0, void 0, function () {
        var hasAitMsg,
          conversationReadTime,
          isCurConversation,
          isSendFromMe,
          conversation,
          aitMsgs
        var _a
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              if (
                !(
                  (
                    item.conversationType ===
                      2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */ ||
                    item.conversationType === 3
                  ) /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM */
                )
              )
                return [3 /*break*/, 2]
              if (
                !(item === null || item === void 0
                  ? void 0
                  : item.serverExtension)
              )
                return [3 /*break*/, 2]
              hasAitMsg = this.hasAitMsg([item.serverExtension])
              return [
                4 /*yield*/,
                this.getConversationReadTimeActive(item.conversationId),
              ]
            case 1:
              conversationReadTime = _b.sent()
              isCurConversation =
                item.conversationId ==
                this.rootStore.uiStore.selectedConversation
              isSendFromMe =
                item.senderId ===
                ((_a = this.rootStore.userStore.myUserInfo) === null ||
                _a === void 0
                  ? void 0
                  : _a.accountId)
              // 当前通过_onReceiveMessages获取的新消息时间戳大于会话的最后已读时间戳，且有@消息，且没有选中当前该会话，则标记为已读
              if (
                item.createTime > conversationReadTime &&
                hasAitMsg &&
                !isCurConversation &&
                !isSendFromMe
              ) {
                conversation = this.conversations.get(item.conversationId)
                // 如果此时conversation为空，则可能的情况为，该用户删除了该会话后，又收到了@消息（onReceiveMessages会先于onConversationCreated触发），此时需要在onConversationCreated处理@消息相关
                if (conversation) {
                  aitMsgs = conversation.aitMsgs || []
                  if (aitMsgs.length === 0) {
                    this.updateConversation([
                      __assign(__assign({}, conversation), {
                        aitMsgs: [item.messageClientId],
                      }),
                    ])
                  } else {
                    this.updateConversation([
                      __assign(__assign({}, conversation), {
                        aitMsgs: __spreadArray(
                          __spreadArray([], __read(aitMsgs), false),
                          [item.messageClientId],
                          false
                        ),
                      }),
                    ])
                  }
                }
              }
              _b.label = 2
            case 2:
              return [2 /*return*/]
          }
        })
      })
    })
  }
  /**
   * 重置会话中的@ 消息
   */
  ConversationStore.prototype.resetConversationAit = function (conversationId) {
    var conversation = this.conversations.get(conversationId)
    if (
      (conversation === null || conversation === void 0
        ? void 0
        : conversation.type) ===
        2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */ ||
      (conversation === null || conversation === void 0
        ? void 0
        : conversation.type) ===
        3 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM */
    ) {
      this.updateConversation([
        __assign(__assign({}, conversation), { aitMsgs: [] }),
      ])
    }
  }
  ConversationStore.prototype.hasAitMsg = function (serverExtensions) {
    var _this = this
    var flag = false
    if (
      serverExtensions === null || serverExtensions === void 0
        ? void 0
        : serverExtensions.length
    ) {
      serverExtensions === null || serverExtensions === void 0
        ? void 0
        : serverExtensions.forEach(function (item) {
            var _a, _b
            try {
              var extObj = JSON.parse(item || '{}')
              var yxAitMsg = extObj.yxAitMsg
              var account_1 = _this.rootStore.userStore.myUserInfo.accountId
              if (yxAitMsg) {
                ;(_a = Object.keys(yxAitMsg)) === null || _a === void 0
                  ? void 0
                  : _a.forEach(function (key) {
                      if (key === account_1 || key === AT_ALL_ACCOUNT) {
                        flag = true
                      }
                    })
              }
            } catch (_c) {
              ;(_b = _this.logger) === null || _b === void 0
                ? void 0
                : _b.error('parse serverExtension failed: ', item)
            }
          })
    }
    return flag
  }
  ConversationStore.prototype._onSyncStarted = function () {
    var _a, _b, _c
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onSyncStarted')
    // 获取会话列表
    ;(_b = this.rootStore.conversationStore) === null || _b === void 0
      ? void 0
      : _b.getConversationListActive(
          0,
          this.rootStore.localOptions.conversationLimit || 100
        )
    ;(_c = this.logger) === null || _c === void 0
      ? void 0
      : _c.log('_onSyncFinished')
  }
  ConversationStore.prototype._onSyncFinished = function () {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_c) {
        // 获取会话列表
        ;(_a = this.rootStore.conversationStore) === null || _a === void 0
          ? void 0
          : _a.getConversationListActive(
              0,
              this.rootStore.localOptions.conversationLimit || 100
            )
        ;(_b = this.logger) === null || _b === void 0
          ? void 0
          : _b.log('_onSyncFinished')
        return [2 /*return*/]
      })
    })
  }
  ConversationStore.prototype._onSyncFailed = function (e) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onSyncFailed', e)
  }
  ConversationStore.prototype._onConversationCreated = function (data) {
    var _this = this
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onConversationCreated', data)
    // 如果是创群，此时_onConversationCreated 返回的data可能没有avatar和name，需要getConversation
    if (
      data.type ===
      2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */
    ) {
      this.nim.V2NIMConversationService.getConversation(
        data.conversationId
      ).then(function (conversation) {
        _this.addConversation([conversation])
        // 处理@消息 情况为
        if (conversation.lastMessage) {
          _this.handleConversationWithAit([
            __assign(
              __assign({}, conversation.lastMessage),
              conversation.lastMessage.messageRefer
            ),
          ])
        }
      })
    } else {
      this.addConversation([data])
      // 会话创建的时候，获取一下当前会话的最后已读时间，便于展示消息已读未读
      if (
        data.type ===
        1 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P */
      ) {
        var conversationId_1 = data.conversationId
        this.nim.V2NIMMessageService.getP2PMessageReceipt(
          conversationId_1
        ).then(function (res) {
          var conversation = _this.conversations.get(conversationId_1)
          if (conversation) {
            _this.updateConversation([
              __assign(__assign({}, conversation), {
                msgReceiptTime: res.timestamp,
              }),
            ])
          }
        })
      }
    }
  }
  ConversationStore.prototype._onConversationDeleted = function (
    conversationIds
  ) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onConversationDeleted', conversationIds)
    this.removeConversation(conversationIds)
  }
  ConversationStore.prototype._onConversationChanged = function (data) {
    var _a
    return __awaiter(this, void 0, void 0, function () {
      var _this = this
      return __generator(this, function (_b) {
        ;(_a = this.logger) === null || _a === void 0
          ? void 0
          : _a.log('_onConversationChanged', data)
        this.addConversation(data)
        data.forEach(function (item) {
          return __awaiter(_this, void 0, void 0, function () {
            var attachment, type
            var _a, _b, _c, _d
            return __generator(this, function (_e) {
              switch (_e.label) {
                case 0:
                  attachment =
                    (_a = item.lastMessage) === null || _a === void 0
                      ? void 0
                      : _a.attachment
                  type =
                    attachment === null || attachment === void 0
                      ? void 0
                      : attachment.type
                  if (
                    !(
                      ((_b = item.lastMessage) === null || _b === void 0
                        ? void 0
                        : _b.messageType) ===
                        5 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION */ &&
                      ((type === 1 /* V2NIMConst.V2NIMMessageNotificationType
                                                    .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_KICK */ &&
                        ((_c =
                          attachment === null || attachment === void 0
                            ? void 0
                            : attachment.targetIds) === null || _c === void 0
                          ? void 0
                          : _c.includes(
                              this.rootStore.userStore.myUserInfo.accountId
                            ))) ||
                        (type === 2 /* V2NIMConst.V2NIMMessageNotificationType
                                                          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_LEAVE */ &&
                          ((_d = item.lastMessage) === null || _d === void 0
                            ? void 0
                            : _d.messageRefer.senderId) ===
                            this.rootStore.userStore.myUserInfo.accountId) ||
                        type === 4) /* V2NIMConst.V2NIMMessageNotificationType
                                                          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_DISMISS */
                    )
                  )
                    return [3 /*break*/, 2]
                  return [
                    4 /*yield*/,
                    this.deleteConversationActive(item.conversationId),
                  ]
                case 1:
                  _e.sent()
                  return [3 /*break*/, 4]
                case 2:
                  if (
                    !(
                      this.rootStore.uiStore.selectedConversation ===
                      item.conversationId
                    )
                  )
                    return [3 /*break*/, 4]
                  return [
                    4 /*yield*/,
                    this.resetConversation(item.conversationId),
                  ]
                case 3:
                  _e.sent()
                  _e.label = 4
                case 4:
                  if (
                    item.type ===
                      2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */ &&
                    item.unreadCount == 0
                  ) {
                    this.resetConversationAit(item.conversationId)
                  }
                  return [2 /*return*/]
              }
            })
          })
        })
        return [2 /*return*/]
      })
    })
  }
  ConversationStore.prototype._onTotalUnreadCountChanged = function (data) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onTotalUnreadCountChanged', data)
    this.totalUnreadCount = data
  }
  return ConversationStore
})()

/**Mobx 可观察对象，负责管理群组的子 store */
var TeamStore = /** @class */ (function () {
  function TeamStore(rootStore, nim, localOptions) {
    this.rootStore = rootStore
    this.nim = nim
    this.localOptions = localOptions
    this.teams = new Map()
    this.logger = null
    makeAutoObservable(this)
    this.logger = rootStore.logger
    this._onReceiveTeamJoinActionInfo =
      this._onReceiveTeamJoinActionInfo.bind(this)
    this._onSyncFailed = this._onSyncFailed.bind(this)
    this._onSyncFinished = this._onSyncFinished.bind(this)
    this._onSyncStarted = this._onSyncStarted.bind(this)
    this._onTeamCreated = this._onTeamCreated.bind(this)
    this._onTeamDismissed = this._onTeamDismissed.bind(this)
    this._onTeamInfoUpdated = this._onTeamInfoUpdated.bind(this)
    this._onTeamJoined = this._onTeamJoined.bind(this)
    this._onTeamLeft = this._onTeamLeft.bind(this)
    this._onTeamMemberInfoUpdated = this._onTeamMemberInfoUpdated.bind(this)
    this._onTeamMemberJoined = this._onTeamMemberJoined.bind(this)
    this._onTeamMemberKicked = this._onTeamMemberKicked.bind(this)
    this._onTeamMemberLeft = this._onTeamMemberLeft.bind(this)
    /** 群组申请动作回调 */
    nim.V2NIMTeamService.on(
      'onReceiveTeamJoinActionInfo',
      this._onReceiveTeamJoinActionInfo
    )
    /** 群组信息数据同步失败 */
    nim.V2NIMTeamService.on('onSyncFailed', this._onSyncFailed)
    /** 群组信息数据同步完成 */
    nim.V2NIMTeamService.on('onSyncFinished', this._onSyncFinished)
    /** 群组信息数据同步开始 */
    nim.V2NIMTeamService.on('onSyncStarted', this._onSyncStarted)
    /** 创建群组回调 */
    nim.V2NIMTeamService.on('onTeamCreated', this._onTeamCreated)
    /** 解散群组回调 */
    nim.V2NIMTeamService.on('onTeamDismissed', this._onTeamDismissed)
    /** 更新群组信息回调 */
    nim.V2NIMTeamService.on('onTeamInfoUpdated', this._onTeamInfoUpdated)
    /** 自己被邀请后接受邀请， 或申请通过，或直接被拉入群组回调 */
    nim.V2NIMTeamService.on('onTeamJoined', this._onTeamJoined)
    /** 自己主动离开群组或被管理员踢出回调 */
    nim.V2NIMTeamService.on('onTeamLeft', this._onTeamLeft)
    /** 群组成员信息更新回调 */
    nim.V2NIMTeamService.on(
      'onTeamMemberInfoUpdated',
      this._onTeamMemberInfoUpdated
    )
    /** 群组成员加入回调(非自己) */
    nim.V2NIMTeamService.on('onTeamMemberJoined', this._onTeamMemberJoined)
    /** 群组成员被踢回调(非自己) */
    nim.V2NIMTeamService.on('onTeamMemberKicked', this._onTeamMemberKicked)
    /** 群组成员离开回调(非自己) */
    nim.V2NIMTeamService.on('onTeamMemberLeft', this._onTeamMemberLeft)
    /** 监听群消息免打扰模式变更事件 */
    nim.V2NIMSettingService.on(
      'onTeamMessageMuteModeChanged',
      this._onTeamMessageMuteModeChanged
    )
  }
  TeamStore.prototype.resetState = function () {
    this.teams.clear()
  }
  /**
   * 销毁TeamStore，会取消群组相关事件监听
   */
  TeamStore.prototype.destroy = function () {
    this.resetState()
    this.nim.V2NIMTeamService.off(
      'onReceiveTeamJoinActionInfo',
      this._onReceiveTeamJoinActionInfo
    )
    this.nim.V2NIMTeamService.off('onSyncFailed', this._onSyncFailed)
    this.nim.V2NIMTeamService.off('onSyncFinished', this._onSyncFinished)
    this.nim.V2NIMTeamService.off('onSyncStarted', this._onSyncStarted)
    this.nim.V2NIMTeamService.off('onTeamCreated', this._onTeamCreated)
    this.nim.V2NIMTeamService.off('onTeamDismissed', this._onTeamDismissed)
    this.nim.V2NIMTeamService.off('onTeamInfoUpdated', this._onTeamInfoUpdated)
    this.nim.V2NIMTeamService.off('onTeamJoined', this._onTeamJoined)
    this.nim.V2NIMTeamService.off('onTeamLeft', this._onTeamLeft)
    this.nim.V2NIMTeamService.off(
      'onTeamMemberInfoUpdated',
      this._onTeamMemberInfoUpdated
    )
    this.nim.V2NIMTeamService.off(
      'onTeamMemberJoined',
      this._onTeamMemberJoined
    )
    this.nim.V2NIMTeamService.off(
      'onTeamMemberKicked',
      this._onTeamMemberKicked
    )
    this.nim.V2NIMTeamService.off('onTeamMemberLeft', this._onTeamMemberLeft)
    this.nim.V2NIMSettingService.off(
      'onTeamMessageMuteModeChanged',
      this._onTeamMessageMuteModeChanged
    )
  }
  /**
   * TeamStore 内存中增加群组
   * @param teams - 群组
   */
  TeamStore.prototype.addTeam = function (teams) {
    var _this = this
    teams
      .filter(function (item) {
        return !!item.isValidTeam
      })
      .filter(function (item) {
        return !!item.teamId
      })
      .forEach(function (item) {
        _this.teams.set(item.teamId, item)
      })
  }
  /**
   * TeamStore 内存中移除群组
   * @param teamIds - 群id数组
   */
  TeamStore.prototype.removeTeam = function (teamIds) {
    var _this = this
    teamIds.forEach(function (item) {
      _this.teams.delete(item)
    })
  }
  /**
   * TeamStore 内存中更新群组
   * @param data - 群组信息
   */
  TeamStore.prototype.updateTeam = function (data) {
    var _this = this
    data
      .filter(function (item) {
        return !!item.teamId
      })
      .forEach(function (item) {
        var oldTeam = _this.teams.get(item.teamId)
        if (oldTeam) {
          var newTeam = __assign(__assign({}, oldTeam), item)
          _this.teams.set(item.teamId, newTeam)
        }
      })
  }
  /**
   * 创建群
   * @param __namedParameters.accounts - 要拉进群的成员的帐号列表
   * @param __namedParameters.type - 群类型，默认高级群
   * @param __namedParameters.avatar - 群头像
   * @param __namedParameters.name - 群名称
   * @param __namedParameters.intro - 群简介
   * @param __namedParameters.serverExtension - 群扩展字段
   */
  TeamStore.prototype.createTeamActive = function (_a) {
    var _b, _c, _d
    var accounts = _a.accounts,
      _e = _a.type,
      type =
        _e === void 0
          ? 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
          : _e,
      avatar = _a.avatar,
      name = _a.name,
      intro = _a.intro,
      serverExtension = _a.serverExtension,
      joinMode = _a.joinMode,
      agreeMode = _a.agreeMode,
      inviteMode = _a.inviteMode,
      updateInfoMode = _a.updateInfoMode,
      updateExtensionMode = _a.updateExtensionMode
    return __awaiter(this, void 0, void 0, function () {
      var team, error_1
      return __generator(this, function (_f) {
        switch (_f.label) {
          case 0:
            _f.trys.push([0, 2, , 3])
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('createTeamActive', {
                  accounts: accounts,
                  type: type,
                  avatar: avatar,
                  name: name,
                  intro: intro,
                  serverExtension: serverExtension,
                })
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.createTeam(
                {
                  avatar: avatar,
                  teamType: type,
                  joinMode: joinMode || this.localOptions.teamJoinMode,
                  agreeMode: agreeMode || this.localOptions.teamAgreeMode,
                  inviteMode: inviteMode || this.localOptions.teamInviteMode,
                  updateInfoMode:
                    updateInfoMode || this.localOptions.teamUpdateTeamMode,
                  updateExtensionMode:
                    updateExtensionMode || this.localOptions.teamUpdateExtMode,
                  name: name,
                  intro: intro,
                  serverExtension: serverExtension,
                },
                accounts,
                ''
              ),
            ]
          case 1:
            team = _f.sent().team
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.log('createTeamActive success', team)
            return [2 /*return*/, team]
          case 2:
            error_1 = _f.sent()
            ;(_d = this.logger) === null || _d === void 0
              ? void 0
              : _d.error(
                  'createTeamActive failed: ',
                  {
                    accounts: accounts,
                    type: type,
                    avatar: avatar,
                    name: name,
                    intro: intro,
                    serverExtension: serverExtension,
                  },
                  error_1,
                  error_1.code,
                  error_1.detail
                )
            throw error_1
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 申请入群
   * @param teamId - 群id
   * @param type - 群类型，默认高级群
   */
  TeamStore.prototype.applyTeamActive = function (teamId, type) {
    var _a, _b, _c
    if (type === void 0) {
      type = 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
    }
    return __awaiter(this, void 0, void 0, function () {
      var team, error_2
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('applyTeamActive', teamId)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.applyJoinTeam(teamId, type),
            ]
          case 1:
            team = _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('applyTeamActive success', teamId)
            return [2 /*return*/, team]
          case 2:
            error_2 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('applyTeamActive failed: ', teamId, error_2)
            throw error_2
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 主动退群
   * @param teamId - 群id
   * @param type - 群类型，默认高级群
   */
  TeamStore.prototype.leaveTeamActive = function (teamId, type) {
    var _a, _b, _c
    if (type === void 0) {
      type = 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
    }
    return __awaiter(this, void 0, void 0, function () {
      var error_3
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('leaveTeamActive', teamId)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.leaveTeam(teamId, type),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('leaveTeamActive success', teamId)
            return [3 /*break*/, 3]
          case 2:
            error_3 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('leaveTeamActive failed: ', teamId, error_3)
            throw error_3
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 解散群
   * @param teamId - 群id
   * @param type - 群类型，默认高级群
   */
  TeamStore.prototype.dismissTeamActive = function (teamId, type) {
    var _a, _b, _c
    if (type === void 0) {
      type = 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
    }
    return __awaiter(this, void 0, void 0, function () {
      var error_4
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('dismissTeamActive', teamId)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.dismissTeam(teamId, type),
              // 会收到一条 onDissmiss 事件
            ]
          case 1:
            _d.sent()
            // 会收到一条 onDissmiss 事件
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('dismissTeamActive success', teamId)
            return [3 /*break*/, 3]
          case 2:
            error_4 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('dismissTeamActive failed: ', teamId, error_4)
            throw error_4
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 转让群主
   * @param teamId - 群id
   * @param type - 群类型，默认高级群
   * @param account - 新群主帐号
   * @param leave - 是否同时退出群聊，默认 false
   */
  TeamStore.prototype.transferTeamActive = function (_a) {
    var _b, _c, _d
    var teamId = _a.teamId,
      _e = _a.type,
      type =
        _e === void 0
          ? 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
          : _e,
      account = _a.account,
      leave = _a.leave
    return __awaiter(this, void 0, void 0, function () {
      var error_5
      return __generator(this, function (_f) {
        switch (_f.label) {
          case 0:
            _f.trys.push([0, 2, , 3])
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('transferTeamActive', {
                  teamId: teamId,
                  type: type,
                  account: account,
                  leave: leave,
                })
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.transferTeamOwner(
                teamId,
                type,
                account,
                leave !== null && leave !== void 0
                  ? leave
                  : this.localOptions.leaveOnTransfer
              ),
            ]
          case 1:
            _f.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.log('transferTeamActive success', {
                  teamId: teamId,
                  type: type,
                  account: account,
                  leave: leave,
                })
            return [3 /*break*/, 3]
          case 2:
            error_5 = _f.sent()
            ;(_d = this.logger) === null || _d === void 0
              ? void 0
              : _d.error(
                  'transferTeamActive failed: ',
                  {
                    teamId: teamId,
                    type: type,
                    account: account,
                    leave: leave,
                  },
                  error_5
                )
            throw error_5
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 群禁言
   * @param options
   * options.teamId - 群id <br>
   * options.type - 群类型，默认高级群 <br>
   * options.chatBannedMode - 禁言模式
   */
  TeamStore.prototype.setTeamChatBannedActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_6
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('muteTeamActive', options)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.setTeamChatBannedMode(
                options.teamId,
                options.type ||
                  1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */,
                options.chatBannedMode
              ),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('muteTeamActive success', options)
            return [3 /*break*/, 3]
          case 2:
            error_6 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('muteTeamActive failed: ', options, error_6)
            throw error_6
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 更新群
   * @param options
   * options.teamId - 群id <br>
   * options.type - 群类型，默认高级群  <br>
   * options.info - 群信息 <br>
   */
  TeamStore.prototype.updateTeamActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var teamId, _d, type, info, error_7
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('updateTeamActive', options)
            ;(teamId = options.teamId),
              (_d = options.type),
              (type =
                _d === void 0
                  ? 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
                  : _d),
              (info = options.info)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.updateTeamInfo(teamId, type, info),
              // 后续在事件中处理
            ]
          case 1:
            _e.sent()
            // 后续在事件中处理
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('updateTeamActive success', options)
            return [3 /*break*/, 3]
          case 2:
            error_7 = _e.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('updateTeamActive failed: ', options, error_7)
            throw error_7
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 从内存中获取群信息
   * @param teamId - 群id
   * @param type - 群类型，默认高级群
   */
  TeamStore.prototype.getTeamActive = function (teamId, type) {
    var _a
    if (type === void 0) {
      type = 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
    }
    return __awaiter(this, void 0, void 0, function () {
      var team
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getTeamActive: ', teamId)
            team = this.teams.get(teamId)
            if (team) {
              return [2 /*return*/, team]
            }
            return [4 /*yield*/, this.getTeamForceActive(teamId, type)]
          case 1:
            team = _b.sent()
            this.addTeam([team])
            return [2 /*return*/, team]
        }
      })
    })
  }
  /**
   * 从服务端获取群信息
   * @param teamId - 群id
   * @param type - 群类型，默认高级群
   */
  TeamStore.prototype.getTeamForceActive = function (teamId, type) {
    var _a, _b, _c
    if (type === void 0) {
      type = 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
    }
    return __awaiter(this, void 0, void 0, function () {
      var res, error_8
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getTeamForceActive: ', teamId)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.getTeamInfo(teamId, type),
            ]
          case 1:
            res = _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getTeamForceActive success', res)
            // 这里不能存入 teamStore，因为 teamStore 只有在群中的内容
            return [2 /*return*/, res]
          case 2:
            error_8 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('getTeamForceActive failed: ', teamId, error_8)
            throw error_8
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 设置群消息免打扰
   * @param teamId - 群id
   * @param teamType - 群类型，默认高级群
   * @param muteMode - 消息免打扰模式
   */
  TeamStore.prototype.setTeamMessageMuteModeActive = function (
    teamId,
    teamType,
    muteMode
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_9
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('setTeamMessageMuteModeActive', {
                  teamId: teamId,
                  teamType: teamType,
                  muteMode: muteMode,
                })
            return [
              4 /*yield*/,
              this.nim.V2NIMSettingService.setTeamMessageMuteMode(
                teamId,
                teamType,
                muteMode
              ),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('setTeamMessageMuteModeActive success', {
                  teamId: teamId,
                  teamType: teamType,
                  muteMode: muteMode,
                })
            return [3 /*break*/, 3]
          case 2:
            error_9 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'setTeamMessageMuteModeActive failed: ',
                  { teamId: teamId, teamType: teamType, muteMode: muteMode },
                  error_9
                )
            throw error_9
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 被邀请者接受入群邀请
   * @param options V2NIMTeamJoinActionInfo
   */
  TeamStore.prototype.acceptTeamInviteActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_10
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('acceptTeamInviteActive: ', options)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.acceptInvitation(options),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('acceptTeamInviteActive success', options)
            return [3 /*break*/, 3]
          case 2:
            error_10 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('acceptTeamInviteActive failed: ', options, error_10)
            throw error_10
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 被邀请者拒绝入群邀请
   * @param options V2NIMTeamJoinActionInfo
   */
  TeamStore.prototype.rejectTeamInviteActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_11
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('rejectTeamInviteActive: ', options)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.rejectInvitation(options),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('rejectTeamInviteActive success', options)
            return [3 /*break*/, 3]
          case 2:
            error_11 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('rejectTeamInviteActive failed: ', options, error_11)
            throw error_11
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 管理员通过入群申请
   * @param options V2NIMTeamJoinActionInfo
   */
  TeamStore.prototype.acceptJoinApplicationActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_12
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('acceptJoinApplicationActive: ', options)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.acceptJoinApplication(options),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('acceptJoinApplicationActive success', options)
            return [3 /*break*/, 3]
          case 2:
            error_12 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'acceptJoinApplicationActive failed: ',
                  options,
                  error_12
                )
            throw error_12
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 管理员拒绝入群申请
   * @param options V2NIMTeamJoinActionInfo
   */
  TeamStore.prototype.rejectTeamApplyActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_13
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('rejectTeamApplyActive: ', options)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.rejectJoinApplication(options),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('rejectTeamApplyActive success', options)
            return [3 /*break*/, 3]
          case 2:
            error_13 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('rejectTeamApplyActive failed: ', options, error_13)
            throw error_13
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 设置成员角色
   * @param options
   * options.teamId - 群id <br>
   * options.type - 群类型，默认高级群 <br>
   * options.accounts - 群管理员 accid
   * options.role - 角色
   */
  TeamStore.prototype.updateTeamMemberRoleActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var teamId, _d, type, accounts, role, error_14
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('addTeamManagersActive: ', options)
            ;(teamId = options.teamId),
              (_d = options.type),
              (type =
                _d === void 0
                  ? 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
                  : _d),
              (accounts = options.accounts),
              (role = options.role)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.updateTeamMemberRole(
                teamId,
                type,
                accounts,
                role
              ),
            ]
          case 1:
            _e.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('addTeamManagersActive success', options)
            return [3 /*break*/, 3]
          case 2:
            error_14 = _e.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('addTeamManagersActive failed: ', options, error_14)
            throw error_14
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /** 获取群组申请动作信息 */
  TeamStore.prototype.getTeamJoinActionInfoListActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, error_15
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getTeamJoinActionInfoListActive: ', options)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.getTeamJoinActionInfoList(options),
            ]
          case 1:
            res = _d.sent()
            this.rootStore.sysMsgStore.addTeamJoinActionMsg(res.infos)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getTeamJoinActionInfoListActive success', res)
            return [2 /*return*/, res]
          case 2:
            error_15 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'getTeamJoinActionInfoListActive failed: ',
                  options,
                  error_15
                )
            throw error_15
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /** 获取已加入的群组列表 */
  TeamStore.prototype.getJoinedTeamListActive = function () {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var teams, error_16
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getJoinedTeamListActive')
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.getJoinedTeamList([1]),
            ]
          case 1:
            teams = _d.sent()
            this.addTeam(teams)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getJoinedTeamListActive success', teams)
            return [2 /*return*/, teams]
          case 2:
            error_16 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('getJoinedTeamListActive failed: ', error_16)
            throw error_16
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取群消息免打扰状态
   * @param teamId - 群id <br>
   * @param teamType - 群组类型，包括高级群和超大群。 <br>
   */
  TeamStore.prototype.getTeamMessageMuteModeActive = function (
    teamId,
    teamType
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var muteMode, error_17
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getTeamMessageMuteModeActive', teamId, teamType)
            return [
              4 /*yield*/,
              this.nim.V2NIMSettingService.getTeamMessageMuteMode(
                teamId,
                teamType
              ),
            ]
          case 1:
            muteMode = _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getTeamMessageMuteModeActive success', teamId, teamType)
            return [2 /*return*/, muteMode]
          case 2:
            error_17 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'getTeamMessageMuteModeActive failed: ',
                  teamId,
                  teamType,
                  error_17
                )
            throw error_17
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  TeamStore.prototype._onReceiveTeamJoinActionInfo = function (data) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onReceiveTeamJoinActionInfo: ', data)
    this.rootStore.sysMsgStore.addTeamJoinActionMsg([data])
  }
  TeamStore.prototype._onSyncFailed = function (data) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('V2NIMTeamService _onSyncFailed: ', data)
  }
  TeamStore.prototype._onSyncFinished = function () {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_c) {
        // 获取会话列表
        ;(_a = this.rootStore.conversationStore) === null || _a === void 0
          ? void 0
          : _a.getConversationListActive(
              0,
              this.rootStore.localOptions.conversationLimit || 100
            )
        ;(_b = this.logger) === null || _b === void 0
          ? void 0
          : _b.log('V2NIMTeamService _onSyncFinished')
        return [2 /*return*/]
      })
    })
  }
  TeamStore.prototype._onSyncStarted = function () {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('V2NIMTeamService _onSyncStarted')
  }
  TeamStore.prototype._onTeamCreated = function (data) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('V2NIMTeamService _onTeamCreated: ', data)
    this.addTeam([data])
    // 不用自己插入会话了，因为 SDK 会有会话创建回调
  }
  TeamStore.prototype._onTeamDismissed = function (data) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('V2NIMTeamService _onTeamDismissed: ', data)
    this._handleRemoveTeam(data.teamId)
  }
  TeamStore.prototype._onTeamInfoUpdated = function (data) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('V2NIMTeamService _onTeamInfoUpdated: ', data)
    this.updateTeam([data])
  }
  TeamStore.prototype._onTeamJoined = function (data) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('V2NIMTeamService _onTeamJoined: ', data)
    this.addTeam([data])
    // 不用自己插入会话了，因为 SDK 会有会话创建回调
  }
  TeamStore.prototype._onTeamLeft = function (data) {
    var _a
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_b) {
        ;(_a = this.logger) === null || _a === void 0
          ? void 0
          : _a.log('V2NIMTeamService _onTeamLeft: ', data)
        this._handleRemoveTeam(data.teamId)
        return [2 /*return*/]
      })
    })
  }
  TeamStore.prototype._onTeamMemberInfoUpdated = function (data) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('V2NIMTeamService _onTeamMemberInfoUpdated: ', data)
    var teamId = data[0].teamId
    this.rootStore.teamMemberStore.updateTeamMember(teamId, data)
  }
  TeamStore.prototype._onTeamMemberJoined = function (data) {
    var _a
    return __awaiter(this, void 0, void 0, function () {
      var teamId
      return __generator(this, function (_b) {
        ;(_a = this.logger) === null || _a === void 0
          ? void 0
          : _a.log('V2NIMTeamService _onTeamMemberJoined: ', data)
        teamId = data[0].teamId
        this.rootStore.teamMemberStore.addTeamMember(teamId, data)
        return [2 /*return*/]
      })
    })
  }
  TeamStore.prototype._onTeamMemberKicked = function (opeartorId, data) {
    var _a
    return __awaiter(this, void 0, void 0, function () {
      var teamId
      return __generator(this, function (_b) {
        ;(_a = this.logger) === null || _a === void 0
          ? void 0
          : _a.log('V2NIMTeamService _onTeamMemberKicked: ', opeartorId, data)
        teamId = data[0].teamId
        this.rootStore.teamMemberStore.removeTeamMember(
          teamId,
          data.map(function (item) {
            return item.accountId
          })
        )
        return [2 /*return*/]
      })
    })
  }
  TeamStore.prototype._onTeamMemberLeft = function (data) {
    var _a
    return __awaiter(this, void 0, void 0, function () {
      var teamId
      return __generator(this, function (_b) {
        ;(_a = this.logger) === null || _a === void 0
          ? void 0
          : _a.log('V2NIMTeamService _onTeamMemberLeft: ', data)
        teamId = data[0].teamId
        this.rootStore.teamMemberStore.removeTeamMember(
          teamId,
          data.map(function (item) {
            return item.accountId
          })
        )
        return [2 /*return*/]
      })
    })
  }
  TeamStore.prototype._handleRemoveTeam = function (teamId) {
    this.removeTeam([teamId])
    // 手动释放内存
    this.rootStore.teamMemberStore.removeTeamMember(teamId)
  }
  TeamStore.prototype._onTeamMessageMuteModeChanged = function (
    teamId,
    teamType,
    muteMode
  ) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log(
          'V2NIMTeamService _onTeamMessageMuteModeChanged: ',
          teamId,
          teamType,
          muteMode
        )
  }
  return TeamStore
})()

/**Mobx 可观察对象，负责管理群组成员的子 store*/
var TeamMemberStore = /** @class */ (function () {
  function TeamMemberStore(rootStore, nim) {
    this.rootStore = rootStore
    this.nim = nim
    this.teamMembers = new Map()
    this.logger = null
    makeAutoObservable(this)
    this.logger = rootStore.logger
  }
  TeamMemberStore.prototype.resetState = function () {
    this.teamMembers.clear()
  }
  /**
   * 销毁TeamMemberStore，会取消相关事件监听
   */
  TeamMemberStore.prototype.destroy = function () {
    this.resetState()
  }
  /**
   * 拉人入群
   * @param options
   * options.teamId - 群id <br>
   * options.type - 群类型, 默认高级群 <br>
   * options.accounts - 要拉进群的成员的帐号列表 <br>
   * options.ps - 邀请附言 <br>
   */
  TeamMemberStore.prototype.addTeamMemberActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var teamId, _d, type, accounts, ps, error_1
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('addTeamMemberActive', options)
            ;(teamId = options.teamId),
              (_d = options.type),
              (type =
                _d === void 0
                  ? 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
                  : _d),
              (accounts = options.accounts),
              (ps = options.ps)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.inviteMember(
                teamId,
                type,
                accounts,
                ps
              ),
              // 事件中处理
            ]
          case 1:
            _e.sent()
            // 事件中处理
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('addTeamMemberActive success', options)
            return [3 /*break*/, 3]
          case 2:
            error_1 = _e.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('addTeamMemberActive failed: ', options, error_1)
            throw error_1
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 踢人出群
   * @param options
   * options.teamId - 群id <br>
   * options.type - 群类型, 默认高级群 <br>
   * options.accounts - 要拉进群的成员的帐号列表 <br>
   */
  TeamMemberStore.prototype.removeTeamMemberActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var teamId, _d, type, accounts, error_2
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('removeTeamMemberActive', options)
            ;(teamId = options.teamId),
              (_d = options.type),
              (type =
                _d === void 0
                  ? 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
                  : _d),
              (accounts = options.accounts)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.kickMember(teamId, type, accounts),
              // 事件中处理
            ]
          case 1:
            _e.sent()
            // 事件中处理
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('removeTeamMemberActive success', options)
            return [3 /*break*/, 3]
          case 2:
            error_2 = _e.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('removeTeamMemberActive failed: ', options, error_2)
            throw error_2
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取群成员
   * @param options
   * options.teamId - 群id <br>
   * options.queryOption - 查询选项 <br>
   * options.type - 群类型, 默认高级群 <br>
   */
  TeamMemberStore.prototype.getTeamMemberActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var teamId, queryOption, _d, type, res, error_3
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getTeamMemberActive', options)
            ;(teamId = options.teamId),
              (queryOption = options.queryOption),
              (_d = options.type),
              (type =
                _d === void 0
                  ? 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
                  : _d)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.getTeamMemberList(
                teamId,
                type,
                queryOption
              ),
            ]
          case 1:
            res = _e.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'getTeamMemberActive success: ',
                  teamId,
                  type,
                  queryOption,
                  res
                )
            this.setTeamMembers(teamId, res.memberList)
            return [2 /*return*/, res]
          case 2:
            error_3 = _e.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('getTeamMemberActive failed: ', options, error_3)
            throw error_3
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 更新我在群中的信息
   * @param options
   * options.teamId - 群id <br>
   * options.type - 群类型, 默认高级群 <br>
   * options.memberInfo - 更新的信息 <br>
   */
  TeamMemberStore.prototype.updateMyMemberInfoActive = function (options) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var teamId, _d, type, memberInfo, error_4
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('updateMyMemberInfo', options)
            ;(teamId = options.teamId),
              (_d = options.type),
              (type =
                _d === void 0
                  ? 1 /* V2NIMConst.V2NIMTeamType.V2NIM_TEAM_TYPE_ADVANCED */
                  : _d),
              (memberInfo = options.memberInfo)
            return [
              4 /*yield*/,
              this.nim.V2NIMTeamService.updateSelfTeamMemberInfo(
                teamId,
                type,
                memberInfo
              ),
            ]
          case 1:
            _e.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('updateMyMemberInfo success: ', options)
            return [3 /*break*/, 3]
          case 2:
            error_4 = _e.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('updateMyMemberInfo failed: ', options, error_4)
            throw error_4
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 内存中设置群成员，会覆盖原有的成员
   * @param teamId - 群id
   * @param members - 群成员
   */
  TeamMemberStore.prototype.setTeamMembers = function (teamId, members) {
    var teamMembers = new Map()
    members.forEach(function (item) {
      teamMembers.set(item.accountId, item)
    })
    this.teamMembers.set(teamId, teamMembers)
  }
  /**
   * 内存中添加群成员
   * @param teamId - 群id
   * @param members - 群成员
   */
  TeamMemberStore.prototype.addTeamMember = function (teamId, members) {
    var teamMembers = this.teamMembers.get(teamId)
    if (!teamMembers) {
      teamMembers = new Map()
    }
    members
      .filter(function (item) {
        return !!item.inTeam
      })
      .filter(function (item) {
        return !!item.accountId
      })
      .forEach(function (item) {
        teamMembers.set(item.accountId, item)
      })
    this.teamMembers.set(teamId, teamMembers)
  }
  /**
   * 内存中移除群成员
   * @param teamId - 群id
   * @param accounts - 群成员数组
   */
  TeamMemberStore.prototype.removeTeamMember = function (teamId, accounts) {
    if (!accounts || !accounts.length) {
      this.teamMembers.delete(teamId)
      return
    }
    var teamMembers = this.teamMembers.get(teamId)
    if (!teamMembers) {
      return
    }
    accounts.forEach(function (item) {
      teamMembers.delete(item)
    })
    this.teamMembers.set(teamId, teamMembers)
  }
  /**
   * 内存中更新群成员处理函数
   * @param teamId - 群id
   * @param members - 群成员
   */
  TeamMemberStore.prototype.updateTeamMember = function (teamId, members) {
    var teamMembers = this.teamMembers.get(teamId)
    if (!teamMembers) {
      return
    }
    members.forEach(function (item) {
      var m = teamMembers.get(item.accountId)
      if (m) {
        m = __assign(__assign({}, m), item)
        teamMembers.set(item.accountId, m)
      }
    })
    this.teamMembers.set(teamId, teamMembers)
  }
  /**
   * 从内存中获取群成员信息
   * @param teamId - 群id
   * @param accounts - 群成员数组
   */
  TeamMemberStore.prototype.getTeamMember = function (teamId, accounts) {
    var _a
    var teamMembers = __spreadArray(
      [],
      __read(
        ((_a = this.teamMembers.get(teamId)) === null || _a === void 0
          ? void 0
          : _a.values()) || []
      ),
      false
    )
    if (!accounts || !accounts.length) {
      return teamMembers
    }
    return teamMembers.filter(function (item) {
      return accounts.some(function (j) {
        return j === item.accountId
      })
    })
  }
  return TeamMemberStore
})()

/**Mobx 可观察对象，负责管理系统消息的子 store */
var SysMsgStore = /** @class */ (function () {
  function SysMsgStore(rootStore, nim) {
    this.rootStore = rootStore
    this.nim = nim
    /** 好友申请消息 */
    this.friendApplyMsg = new Map()
    this.teamJoinActionMsg = new Map()
    this.logger = null
    makeAutoObservable(this)
    this.logger = rootStore.logger
  }
  SysMsgStore.prototype.resetState = function () {
    this.friendApplyMsg.clear()
    this.teamJoinActionMsg.clear()
  }
  /**
   * 销毁SysMsgStore，会取消系统消息事件监听
   */
  SysMsgStore.prototype.destroy = function () {
    this.resetState()
  }
  Object.defineProperty(SysMsgStore.prototype, 'friendApplyMsgs', {
    get: function () {
      return Array.from(this.friendApplyMsg.values()).sort(function (a, b) {
        return b.timestamp - a.timestamp
      })
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(SysMsgStore.prototype, 'teamJoinActionMsgs', {
    get: function () {
      return Array.from(this.teamJoinActionMsg.values()).sort(function (a, b) {
        return b.timestamp - a.timestamp
      })
    },
    enumerable: false,
    configurable: true,
  })
  /**
   * 增加内存中的好友申请消息
   * @param msgs 系统消息对象数组
   */
  SysMsgStore.prototype.addFriendApplyMsg = function (msgs) {
    var _this = this
    msgs.forEach(function (msg) {
      var key = _this.createFriendApplyMsgKey(msg)
      _this.friendApplyMsg.set(key, msg)
    })
  }
  /**
   * 删除内存中的好友申请消息
   * @param msgs 系统消息对象数组
   */
  SysMsgStore.prototype.deleteFriendApplyMsg = function (msgs) {
    var _this = this
    msgs.forEach(function (msg) {
      var key = _this.createFriendApplyMsgKey(msg)
      _this.friendApplyMsg.delete(key)
    })
  }
  /**
   * 更新内存中的好友申请消息
   * @param msgs 系统消息对象数组
   */
  SysMsgStore.prototype.updateFriendApplyMsg = function (msgs) {
    var _this = this
    msgs.forEach(function (msg) {
      var key = _this.createFriendApplyMsgKey(msg)
      var oldMsg = _this.friendApplyMsg.get(key)
      if (oldMsg) {
        _this.friendApplyMsg.set(key, __assign(__assign({}, oldMsg), msg))
      }
    })
  }
  /**
   * 增加内存中的入群申请消息
   * @param msgs 系统消息对象数组
   */
  SysMsgStore.prototype.addTeamJoinActionMsg = function (msgs) {
    var _this = this
    msgs.forEach(function (msg) {
      var key = _this.createTeamJoinActionMsgKey(msg)
      _this.teamJoinActionMsg.set(key, msg)
    })
  }
  /**
   * 删除内存中的入群申请消息
   * @param msgs 系统消息对象数组
   */
  SysMsgStore.prototype.deleteTeamJoinActionMsg = function (msgs) {
    var _this = this
    msgs.forEach(function (msg) {
      var key = _this.createTeamJoinActionMsgKey(msg)
      _this.teamJoinActionMsg.delete(key)
    })
  }
  /**
   * 更新内存中的入群申请消息
   * @param msgs 系统消息对象数组
   */
  SysMsgStore.prototype.updateTeamJoinActionMsg = function (msgs) {
    var _this = this
    msgs.forEach(function (msg) {
      var key = _this.createTeamJoinActionMsgKey(msg)
      var oldMsg = _this.teamJoinActionMsg.get(key)
      var newMsg = __assign(__assign({}, oldMsg), msg)
      _this.teamJoinActionMsg.set(key, newMsg)
    })
  }
  /** 获取未读好友申请消息数量 */
  SysMsgStore.prototype.getUnreadFriendApplyMsgsCount = function () {
    return this.friendApplyMsgs.filter(function (msg) {
      return !msg.isRead
    }).length
  }
  /** 获取未读入群申请消息数量 */
  SysMsgStore.prototype.getUnreadTeamJoinActionMsgsCount = function () {
    return this.teamJoinActionMsgs.filter(function (msg) {
      return !msg.isRead
    }).length
  }
  /** 获取未读消息总数 */
  SysMsgStore.prototype.getTotalUnreadMsgsCount = function () {
    return (
      this.getUnreadFriendApplyMsgsCount() +
      this.getUnreadTeamJoinActionMsgsCount()
    )
  }
  /** 设置所有申请消息为已读 */
  SysMsgStore.prototype.setAllApplyMsgRead = function () {
    this.updateFriendApplyMsg(
      this.friendApplyMsgs.map(function (msg) {
        return __assign(__assign({}, msg), { isRead: true })
      })
    )
    this.updateTeamJoinActionMsg(
      this.teamJoinActionMsgs.map(function (msg) {
        return __assign(__assign({}, msg), { isRead: true })
      })
    )
  }
  /** 创建群组申请消息的 key */
  SysMsgStore.prototype.createTeamJoinActionMsgKey = function (msg) {
    return ''
      .concat(msg.teamId, '_')
      .concat(msg.operatorAccountId, '_')
      .concat(msg.actionType)
  }
  /** 创建好友申请消息的 key */
  SysMsgStore.prototype.createFriendApplyMsgKey = function (msg) {
    return ''.concat(msg.applicantAccountId, '_').concat(msg.recipientAccountId)
  }
  return SysMsgStore
})()

/**Mobx 可观察对象，负责管理用户信息（包含陌生人）的子 store */
var UserStore = /** @class */ (function () {
  function UserStore(rootStore, nim) {
    this.rootStore = rootStore
    this.nim = nim
    this.users = new Map()
    this.myUserInfo = {
      accountId: this.nim.V2NIMLoginService.getLoginUser(),
      name: '',
      createTime: Date.now(),
      updateTime: Date.now(),
    }
    this.logger = null
    this._getUserInfo = frequencyControl(this._getUserInfos, 1000, 100)
    makeAutoObservable(this)
    this._onUserProfileChanged = this._onUserProfileChanged.bind(this)
    this.logger = rootStore.logger
    // 用户资料变更回调，返回变更的用户资料列表
    nim.V2NIMUserService.on('onUserProfileChanged', this._onUserProfileChanged)
  }
  UserStore.prototype.resetState = function () {
    this.users.clear()
    this.myUserInfo = {
      accountId: this.nim.V2NIMLoginService.getLoginUser(),
      name: '',
      createTime: Date.now(),
      updateTime: Date.now(),
    }
  }
  /**
   * 销毁UserStore，会取消相关事件监听
   */
  UserStore.prototype.destroy = function () {
    this.resetState()
    this.nim.V2NIMUserService.off(
      'onUserProfileChanged',
      this._onUserProfileChanged
    )
  }
  /**
   * 内存中增加users
   * @param users - users数组
   */
  UserStore.prototype.addUsers = function (users) {
    var _this = this
    users
      .filter(function (item) {
        return !!item.accountId
      })
      .forEach(function (item) {
        _this.users.set(item.accountId, item)
      })
  }
  /**
   * 内存中删除users
   * @param users - users数组
   */
  UserStore.prototype.removeUsers = function (accounts) {
    var _this = this
    accounts.forEach(function (item) {
      _this.users.delete(item)
    })
  }
  /**
   * 获取我自己的 serverExtension 字段
   */
  UserStore.prototype.getMyUserServerExt = function () {
    var _a
    var serverExt = {}
    try {
      serverExt = JSON.parse(
        ((_a = this.myUserInfo) === null || _a === void 0
          ? void 0
          : _a.serverExtension) || '{}'
      )
    } catch (error) {
      //
    }
    return serverExt
  }
  /**
   * 更新自己的用户资料
   * @param updateParams
   * updateParams.nick - 昵称 <br>
   * updateParams.avatar - 头像 <br>
   * updateParams.sign - 签名 <br>
   * updateParams.gender - 性别 <br>
   * updateParams.email - 邮箱 <br>
   * updateParams.birth - 生日 <br>
   * updateParams.tel - 手机号 <br>
   * updateParams.serverExtension - 扩展字段 <br>
   *
   * @param fileObj - 头像文件对象、或者在小程序中，文件路径
   */
  UserStore.prototype.updateSelfUserProfileActive = function (
    updateParams,
    fileObj
  ) {
    var _a, _b, _c, _d
    return __awaiter(this, void 0, void 0, function () {
      var task, avatarUrl, error_1, error_2
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 6, , 7])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('updateSelfUserProfileActive', updateParams, fileObj)
            if (!fileObj) return [3 /*break*/, 4]
            _e.label = 1
          case 1:
            _e.trys.push([1, 3, , 4])
            task = this.nim.V2NIMStorageService.createUploadFileTask({
              fileObj: fileObj,
            })
            return [
              4 /*yield*/,
              this.nim.V2NIMStorageService.uploadFile(task, function () {
                /**/
              }),
            ]
          case 2:
            avatarUrl = _e.sent()
            updateParams.avatar = avatarUrl
            return [3 /*break*/, 4]
          case 3:
            error_1 = _e.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.warn('upload avatar error and save continue.', error_1)
            return [3 /*break*/, 4]
          case 4:
            return [
              4 /*yield*/,
              this.nim.V2NIMUserService.updateSelfUserProfile(updateParams),
            ]
          case 5:
            _e.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.log(
                  'updateSelfUserProfileActive success',
                  updateParams,
                  fileObj
                )
            return [3 /*break*/, 7]
          case 6:
            error_2 = _e.sent()
            ;(_d = this.logger) === null || _d === void 0
              ? void 0
              : _d.error(
                  'updateSelfUserProfileActive failed:',
                  updateParams,
                  error_2,
                  fileObj
                )
            throw error_2
          case 7:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取用户最新信息（如果内存中存在，就不去服务器取最新的了）
   * @param accountIds - 账号id数组
   */
  UserStore.prototype.getUserActive = function (accountId) {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      var user
      return __generator(this, function (_c) {
        ;(_a = this.logger) === null || _a === void 0
          ? void 0
          : _a.log('getUserListActive', accountId)
        user = this.users.get(accountId)
        if (user) {
          ;(_b = this.logger) === null || _b === void 0
            ? void 0
            : _b.log('getUserListActive success', user, accountId)
          return [2 /*return*/, user]
        }
        return [2 /*return*/, this.getUserForceActive(accountId)]
      })
    })
  }
  /**
   * 获取用户最新信息
   * @param accountIds - 账号id数组
   */
  UserStore.prototype.getUserForceActive = function (accountId) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var user, error_3
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getUserForceActive', accountId)
            return [4 /*yield*/, this._getUserInfo(accountId)]
          case 1:
            user = _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getUserForceActive success', user, accountId)
            return [2 /*return*/, user]
          case 2:
            error_3 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('getUserForceActive failed: ', accountId, error_3)
            throw error_3
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取用户最新信息（始终从服务器取最新的，用于点开用户头像时）
   * @param accountIds - 账号id数组
   */
  UserStore.prototype.getUserListFromCloudActive = function (accountIds) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var users, error_4
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getUserListFromCloudActive', accountIds)
            return [
              4 /*yield*/,
              this.nim.V2NIMUserService.getUserListFromCloud(accountIds),
            ]
          case 1:
            users = _d.sent()
            this.addUsers(users)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getUserListFromCloudActive success', users, accountIds)
            return [2 /*return*/, users]
          case 2:
            error_4 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'getUserListFromCloudActive failed: ',
                  accountIds,
                  error_4
                )
            throw error_4
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  // 获取自己的用户信息
  UserStore.prototype.getMyUserInfoActive = function () {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var myUserInfo, error_5
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getMyUserInfoActive')
            return [
              4 /*yield*/,
              this.nim.V2NIMUserService.getUserList([
                this.nim.V2NIMLoginService.getLoginUser(),
              ]),
            ]
          case 1:
            myUserInfo = _d.sent()
            this.myUserInfo = myUserInfo[0]
            this.addUsers(myUserInfo)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getMyUserInfoActive success', myUserInfo)
            return [2 /*return*/, myUserInfo[0]]
          case 2:
            error_5 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('getMyUserInfoActive failed: ', error_5)
            throw error_5
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  UserStore.prototype._getUserInfos = function (accountIds) {
    return __awaiter(this, void 0, void 0, function () {
      var users
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              this.nim.V2NIMUserService.getUserList(accountIds),
            ]
          case 1:
            users = _a.sent()
            this.addUsers(users)
            return [2 /*return*/, users]
        }
      })
    })
  }
  UserStore.prototype._onUserProfileChanged = function (data) {
    var _this = this
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onUserProfileChanged: ', data)
    data.forEach(function (item) {
      if (item.accountId === _this.myUserInfo.accountId) {
        _this.myUserInfo = item
      }
    })
    this.addUsers(data)
  }
  return UserStore
})()

var AIUserStore = /** @class */ (function () {
  function AIUserStore(rootStore, nim, localOptions) {
    this.rootStore = rootStore
    this.nim = nim
    this.localOptions = localOptions
    this.aiUsers = new Map()
    this.aiReqMsgs = []
    this.aiResMsgs = []
    this.logger = null
    this.onSendAIProxyErrorHandler = function () {
      //
    }
    this.requestIds = []
    this.proxyAccountId = ''
    makeAutoObservable(this)
    this.logger = rootStore.logger
    this._onProxyAIModelCall = this._onProxyAIModelCall.bind(this)
    this.nim.V2NIMAIService.on('onProxyAIModelCall', this._onProxyAIModelCall)
  }
  Object.defineProperty(AIUserStore.prototype, 'aiProxying', {
    get: function () {
      return this.aiReqMsgs.length > this.aiResMsgs.length
    },
    enumerable: false,
    configurable: true,
  })
  AIUserStore.prototype.resetState = function () {
    this.aiUsers.clear()
    this.aiReqMsgs = []
    this.aiResMsgs = []
  }
  /**
   * 销毁 AIUserStore，会取消相关事件监听
   */
  AIUserStore.prototype.destroy = function () {
    this.resetState()
    this.nim.V2NIMAIService.off('onProxyAIModelCall', this._onProxyAIModelCall)
  }
  /** 内存中增加 AIUsers */
  AIUserStore.prototype.addAIUsers = function (aiUsers) {
    var _this = this
    aiUsers
      .filter(function (item) {
        return !!item.accountId
      })
      .forEach(function (item) {
        _this.aiUsers.set(item.accountId, item)
      })
  }
  /** 内存中删除 AIUsers */
  AIUserStore.prototype.removeAIUsers = function (accounts) {
    var _this = this
    accounts.forEach(function (item) {
      _this.aiUsers.delete(item)
    })
  }
  /**
   * 获取 AIUsers
   */
  AIUserStore.prototype.getAIUserList = function (accountIds) {
    var aiUsers = __spreadArray([], __read(this.aiUsers.values()), false)
    var sortHandler = function (a, b) {
      return b.createTime - a.createTime
    }
    if (accountIds && accountIds.length) {
      return aiUsers
        .filter(function (item) {
          return accountIds.includes(item.accountId)
        })
        .sort(sortHandler)
    }
    return aiUsers.sort(sortHandler)
  }
  /**
   * 获取 AI 划词数字人
   */
  AIUserStore.prototype.getAISearchUser = function () {
    var _a, _b
    var aiUsers = this.getAIUserList()
    return (_b =
      (_a = this.localOptions.aiUserAgentProvider) === null || _a === void 0
        ? void 0
        : _a.getAISearchUser) === null || _b === void 0
      ? void 0
      : _b.call(_a, aiUsers)
  }
  /**
   * 获取 AI 翻译数字人
   */
  AIUserStore.prototype.getAITranslateUser = function () {
    var _a, _b
    var aiUsers = this.getAIUserList()
    return (_b =
      (_a = this.localOptions.aiUserAgentProvider) === null || _a === void 0
        ? void 0
        : _a.getAITranslateUser) === null || _b === void 0
      ? void 0
      : _b.call(_a, aiUsers)
  }
  /**
   * 获取 AI 翻译语言
   */
  AIUserStore.prototype.getAITranslateLangs = function () {
    var _a, _b
    var aiUsers = this.getAIUserList()
    return (
      ((_b =
        (_a = this.localOptions.aiUserAgentProvider) === null || _a === void 0
          ? void 0
          : _a.getAITranslateLangs) === null || _b === void 0
        ? void 0
        : _b.call(_a, aiUsers)) || []
    )
  }
  /**
   * 获取 AI 数字人的 serverExtension
   */
  AIUserStore.prototype.getAIUserServerExt = function (accountId) {
    var aiUser = this.aiUsers.get(accountId)
    if (!aiUser) {
      return {}
    }
    try {
      return JSON.parse(aiUser.serverExtension || '{}')
    } catch (error) {
      return {}
    }
  }
  /**
   * 获取 AI 聊数字人，AI 聊是指可以被 @ 的数字人
   */
  AIUserStore.prototype.getAIChatUser = function () {
    var _this = this
    var aiUsers = this.getAIUserList()
    return aiUsers.filter(function (item) {
      var serverExt = _this.getAIUserServerExt(item.accountId)
      return serverExt.aiChat === 1
    })
  }
  /**
   * 获取配置过默认置顶的数字人，仅代表配置过，不代表当前置顶
   */
  AIUserStore.prototype.getAIPinDefaultUser = function () {
    var _this = this
    var aiUsers = this.getAIUserList()
    return aiUsers.filter(function (item) {
      var serverExt = _this.getAIUserServerExt(item.accountId)
      return serverExt.pinDefault === 1
    })
  }
  /**
   * 获取当前置顶的数字人
   */
  AIUserStore.prototype.getAIPinUser = function () {
    var myUserServerExt = this.rootStore.userStore.getMyUserServerExt()
    return this.getAIPinDefaultUser().filter(function (item) {
      var _a
      return !((_a = myUserServerExt.unpinAIUsers) === null || _a === void 0
        ? void 0
        : _a.includes(item.accountId))
    })
  }
  /**
   * 判断一个数字人是否 pin 置顶
   */
  AIUserStore.prototype.isAIPinUser = function (accountId) {
    return this.getAIPinUser().some(function (item) {
      return item.accountId === accountId
    })
  }
  /**
   * 判断是否正在 AI 划词中
   */
  AIUserStore.prototype.isAISearching = function () {
    var _a
    return (
      this.proxyAccountId ===
      ((_a = this.getAISearchUser()) === null || _a === void 0
        ? void 0
        : _a.accountId)
    )
  }
  /**
   * 判断是否正在 AI 翻译中
   */
  AIUserStore.prototype.isAITranslating = function () {
    var _a
    return (
      this.proxyAccountId ===
      ((_a = this.getAITranslateUser()) === null || _a === void 0
        ? void 0
        : _a.accountId)
    )
  }
  /**
   * 判断是否AI数字人
   */
  AIUserStore.prototype.isAIUser = function (accountId) {
    return this.aiUsers.has(accountId)
  }
  /**
   * 重置 AI 代理状态
   */
  AIUserStore.prototype.resetAIProxy = function () {
    this.requestIds = []
    this.aiReqMsgs = []
    this.aiResMsgs = []
    this.proxyAccountId = ''
    this.onSendAIProxyErrorHandler = function () {
      //
    }
  }
  /**
   * 从 sdk 获取 AI 数字人列表并维护到内存中
   */
  AIUserStore.prototype.getAIUserListActive = function () {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var aiUsers, error_1
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('getAIUserListActive')
            return [4 /*yield*/, this.nim.V2NIMAIService.getAIUserList()]
          case 1:
            aiUsers = _d.sent()
            this.addAIUsers(aiUsers)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('getAIUserListActive success:', aiUsers)
            return [3 /*break*/, 3]
          case 2:
            error_1 = _d.sent()
            // 未开通ai聊功能的 此处不需要报错
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.log('getAIUserListActive failed:', error_1)
            return [3 /*break*/, 3]
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 发送 AI 代理请求
   * @params requestId 请求 ID，用于区分不同的请求，传就表示新的请求，不传表示继续上次的请求
   */
  AIUserStore.prototype.sendAIProxyActive = function (params) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var finalParams, error_2
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('sendAIProxyActive', params)
            finalParams = __assign({}, params)
            // 表示新的请求，重置 requestId、aiResMsgs、proxyAccountId
            if (params.requestId) {
              this.resetAIProxy()
              this.requestIds.push(params.requestId)
              this.proxyAccountId = params.accountId
            } else {
              finalParams.requestId = Math.random().toString(36).slice(2)
              this.requestIds.push(finalParams.requestId)
            }
            if (params.onSendAIProxyErrorHandler) {
              this.onSendAIProxyErrorHandler = params.onSendAIProxyErrorHandler
            }
            return [
              4 /*yield*/,
              this.nim.V2NIMAIService.proxyAIModelCall(finalParams),
            ]
          case 1:
            _d.sent()
            this.aiReqMsgs.push(params.content)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log('sendAIProxyActive success:', params)
            return [3 /*break*/, 3]
          case 2:
            error_2 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error('sendAIProxyActive failed:', error_2.toString())
            this.onSendAIProxyErrorHandler(error_2.code)
            throw error_2
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  AIUserStore.prototype._onProxyAIModelCall = function (res) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('_onProxyAIModelCall', res)
    if (this.requestIds.includes(res.requestId)) {
      if (res.code === 200) {
        this.aiResMsgs.push(res.content.msg)
      } else {
        this.aiReqMsgs.pop()
        this.onSendAIProxyErrorHandler(res.code)
      }
    }
  }
  return AIUserStore
})()

/** Mobx 可观察对象，负责 UI 会用到的属性的子 store */
var UiStore = /** @class */ (function () {
  function UiStore(rootStore) {
    this.rootStore = rootStore
    // 这边使用 undefined 会导致无法被注册成 observable，但是 demo 上没问题，不知道是为什么，很懵逼，但是先把这边附上默认值就可以解决
    this.selectedContactType = ''
    /**
     * 当前选中的会话
     */
    this.selectedConversation = ''
    this.logger = null
    makeAutoObservable(this)
    this.logger = rootStore.logger
  }
  /**
   * 重置状态
   */
  UiStore.prototype.resetState = function () {
    this.selectedContactType = ''
    this.selectedConversation = ''
  }
  /**
   * 销毁UiStore，使UI重置
   */
  UiStore.prototype.destroy = function () {
    this.resetState()
  }
  /**
   * 通讯录选中类型
   * @param contactType - 导航类型
   */
  UiStore.prototype.selectContactType = function (contactType) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('selectContactType: ', contactType)
    this.selectedContactType = contactType
  }
  /**
   * 取消通讯录选中
   */
  UiStore.prototype.unselectContactType = function () {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('unselectContactType')
    this.selectedContactType = ''
  }
  /**
   * 切换会话
   * @param conversationId - 会话ID
   */
  UiStore.prototype.selectConversation = function (conversationId) {
    var _a, _b, _c, _d, _e, _f
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_g) {
        switch (_g.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('selectConversation: ', conversationId)
            if (conversationId === this.selectedConversation) {
              return [2 /*return*/]
            }
            this.rootStore.msgStore.msgs.resetLimitState()
            this.selectedConversation = conversationId
            if (!conversationId) return [3 /*break*/, 4]
            if (
              !((_b = this.rootStore.sdkOptions) === null || _b === void 0
                ? void 0
                : _b.enableV2CloudConversation)
            )
              return [3 /*break*/, 2]
            ;(_c = this.rootStore.conversationStore) === null || _c === void 0
              ? void 0
              : _c.resetConversationAit(conversationId)
            return [
              4 /*yield*/,
              (_d = this.rootStore.conversationStore) === null || _d === void 0
                ? void 0
                : _d.resetConversation(conversationId),
            ]
          case 1:
            _g.sent()
            return [3 /*break*/, 4]
          case 2:
            ;(_e = this.rootStore.localConversationStore) === null ||
            _e === void 0
              ? void 0
              : _e.resetConversationAit(conversationId)
            return [
              4 /*yield*/,
              (_f = this.rootStore.localConversationStore) === null ||
              _f === void 0
                ? void 0
                : _f.resetConversation(conversationId),
            ]
          case 3:
            _g.sent()
            _g.label = 4
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 取消选中会话
   */
  UiStore.prototype.unselectConversation = function () {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('unselectConversation')
    this.selectedConversation = ''
    this.rootStore.msgStore.msgs.resetLimitState()
  }
  /**
   * 获取用户关系
   * @param account - 账号
   */
  UiStore.prototype.getRelation = function (account) {
    var res = 'stranger'
    if (this.rootStore.userStore.myUserInfo.accountId === account) {
      res = 'myself'
    } else if (this.rootStore.aiUserStore.aiUsers.has(account)) {
      res = 'ai'
    } else if (this.rootStore.friendStore.friends.has(account)) {
      res = 'friend'
    } else {
      res = 'stranger'
    }
    // this.logger?.log('getRelation success', account, res)
    return {
      relation: res,
      isInBlacklist: this.rootStore.relationStore.isInBlacklist(account),
    }
  }
  /**
   * 获取好友名片
   * * @param account - 账号
   */
  UiStore.prototype.getFriendWithUserNameCard = function (account) {
    var friend = this.rootStore.friendStore.friends.get(account) || {
      accountId: '',
      serverExtension: '',
      customerExtension: '',
    }
    var userCard = this.rootStore.userStore.users.get(account) || {
      accountId: '',
      name: '',
      createTime: Date.now(),
    }
    return __assign(__assign({}, friend), userCard)
  }
  /**
   * 查询用户称谓
   * 优先级按照 备注 > 群昵称 > 好友昵称 > 消息上的昵称 > 好友账号 返回，如果是机器人则优先返回机器人名字
   * * @param account - 账号
   * * @param teamId - 群号
   * * @param ignoreAlias - 是否忽略好友备注
   * * @param nickFromMsg - 消息上的昵称
   */
  UiStore.prototype.getAppellation = function (_a) {
    var _b
    var account = _a.account,
      _c = _a.teamId,
      teamId = _c === void 0 ? '' : _c,
      _d = _a.ignoreAlias,
      ignoreAlias = _d === void 0 ? false : _d,
      _e = _a.nickFromMsg,
      nickFromMsg = _e === void 0 ? '' : _e
    var aiUser = this.rootStore.aiUserStore.aiUsers.get(account)
    if (aiUser) {
      return aiUser.name || account
    }
    var friend = this.rootStore.friendStore.friends.get(account)
    var user = this.rootStore.userStore.users.get(account)
    var teamMember =
      (_b = this.rootStore.teamMemberStore.teamMembers.get(teamId)) === null ||
      _b === void 0
        ? void 0
        : _b.get(account)
    return (
      (!ignoreAlias &&
        (friend === null || friend === void 0 ? void 0 : friend.alias)) ||
      (teamMember === null || teamMember === void 0
        ? void 0
        : teamMember.teamNick) ||
      (user === null || user === void 0 ? void 0 : user.name) ||
      nickFromMsg ||
      account
    )
  }
  Object.defineProperty(UiStore.prototype, 'friends', {
    get: function () {
      return __spreadArray(
        [],
        __read(this.rootStore.friendStore.friends.values()),
        false
      )
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(UiStore.prototype, 'conversations', {
    get: function () {
      var _a
      return (
        (_a = this.rootStore.conversationStore) === null || _a === void 0
          ? void 0
          : _a.conversations.values()
      )
        ? __spreadArray(
            [],
            __read(this.rootStore.conversationStore.conversations.values()),
            false
          )
        : []
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(UiStore.prototype, 'localConversations', {
    get: function () {
      var _a
      return (
        (_a = this.rootStore.localConversationStore) === null || _a === void 0
          ? void 0
          : _a.conversations.values()
      )
        ? __spreadArray(
            [],
            __read(
              this.rootStore.localConversationStore.conversations.values()
            ),
            false
          )
        : []
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(UiStore.prototype, 'users', {
    get: function () {
      return __spreadArray(
        [],
        __read(this.rootStore.userStore.users.values()),
        false
      )
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(UiStore.prototype, 'teamList', {
    get: function () {
      var teams = __spreadArray(
        [],
        __read(this.rootStore.teamStore.teams.values()),
        false
      )
      return teams
        .filter(function (item) {
          return item.isValidTeam
        })
        .sort(function (a, b) {
          return b.createTime - a.createTime
        })
    },
    enumerable: false,
    configurable: true,
  })
  Object.defineProperty(UiStore.prototype, 'applyMsgs', {
    get: function () {
      return __spreadArray(
        [],
        __read(this.rootStore.sysMsgStore.friendApplyMsg.values()),
        false
      )
    },
    enumerable: false,
    configurable: true,
  })
  return UiStore
})()

/**Mobx 可观察对象，负责管理文件存储的子 store */
var StorageStore = /** @class */ (function () {
  function StorageStore(rootStore, nim) {
    this.rootStore = rootStore
    this.nim = nim
    makeAutoObservable(this)
  }
  /**
   * 上传文件
   * @param fileObj - 文件对象或文件路径
   */
  StorageStore.prototype.uploadFileActive = function (fileObj) {
    return __awaiter(this, void 0, void 0, function () {
      var errorContent, avatarUrl, task, error_1
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            logger.log('uploadFileActive', fileObj)
            if (!fileObj) {
              errorContent = 'upload avatar error, no file or filepath'
              logger.warn(errorContent)
              throw new Error(errorContent)
            }
            avatarUrl = ''
            _a.label = 1
          case 1:
            _a.trys.push([1, 3, , 4])
            task = this.nim.V2NIMStorageService.createUploadFileTask({
              fileObj: fileObj,
            })
            return [
              4 /*yield*/,
              this.nim.V2NIMStorageService.uploadFile(task, function () {
                /**/
              }),
            ]
          case 2:
            avatarUrl = _a.sent()
            return [3 /*break*/, 4]
          case 3:
            error_1 = _a.sent()
            logger.warn('upload avatar error ', error_1)
            throw error_1
          case 4:
            return [2 /*return*/, avatarUrl]
        }
      })
    })
  }
  return StorageStore
})()

var name = 'nim-web-sdk-ng'
var version = '10.9.10'
var sdk = {
  version: 100910,
  versionFormat: '10.9.10',
}
var description = 'Yunxin IM SDK next generation'
var main = './dist/v2/NIM_BROWSER_SDK.js'
var types = './dist/v2/NIM_BROWSER_SDK/index.d.ts'
var scripts = {
  test: 'jest --maxWorkers 1 --silent',
  lint: 'npx eslint ./src',
  dev: 'cd pages/ && npm run dev',
  clean: 'rm -rf ./dist',
  emitTypes:
    'tsc --emitDeclarationOnly --declaration --declarationDir temp/types',
  'build:esm': 'npm run emitTypes && rollup --config ./build/esm.config.js',
  build:
    'npm run clean && npm run emitTypes && node script/copyPlugin.js && rollup --config ./build/v1.config.js && rollup --config ./build/v2.config.js && rollup --config ./build/esm.config.js',
  analyze:
    'npm run clean && npx rollup --config ./build/analyze.config.js && ls -lhR dist | grep ".js"',
  'pages:build':
    'cd pages/ && npm install && npm run build && cp -rf dist/ ../dist/',
  api: 'npm run translate && node script/buildApi.js',
  translate:
    'rm -rf ./apidocs && multilingual-tool convert --indir=src/typings --outdir=apidocs --includes=ts',
  'api-diff':
    'multilingual-tool diff --dir=src/typings --receiver=3070898 --exclude=DS_Store',
  updateVerInNdp: 'node ./script/updateVerInNdp.js',
}
var repository = {
  type: 'git',
  url: 'ssh://git@g.hz.netease.com:22222/yunxin/im/sdk.git',
}
var keywords = ['im', 'sdk']
var author = 'yunxin'
var license = 'ISC'
var eslintIgnore = ['dist/']
var files = [
  'README.md',
  'CHANGELOG.md',
  'dist/v1/NIM*',
  'dist/v1/CHATROOM*',
  'dist/v1/QCHAT*',
  'dist/v2/NIM*',
  'dist/v2/CHATROOM*',
  'dist/esm/*',
]
var devDependencies = {
  '@babel/core': '^7.13.15',
  '@babel/plugin-proposal-class-properties': '^7.13.0',
  '@babel/plugin-transform-block-scoping': '^7.23.4',
  '@babel/plugin-transform-runtime': '^7.13.15',
  '@babel/preset-env': '^7.13.15',
  '@babel/preset-typescript': '^7.13.0',
  '@babel/runtime': '^7.13.10',
  '@babel/runtime-corejs3': '^7.13.10',
  '@microsoft/api-extractor': '^7.19.4',
  '@rollup/plugin-babel': '^5.3.0',
  '@rollup/plugin-commonjs': '^18.0.0',
  '@rollup/plugin-json': '^4.1.0',
  '@rollup/plugin-node-resolve': '^11.2.1',
  '@rollup/plugin-replace': '^3.0.0',
  '@rollup/plugin-typescript': '^8.3.0',
  '@types/backo2': '^1.0.1',
  '@types/jest': '^27.4.1',
  '@types/lodash': '^4.14.177',
  '@types/platform': '^1.3.3',
  '@typescript-eslint/eslint-plugin': '^5.12.0',
  '@typescript-eslint/parser': '^5.12.0',
  '@yxfe/multilingual-tool': '^1.0.30',
  '@yxfe/nim-log-reporter': '^1.0.6',
  '@yxfe/nos-uploader': '^1.0.28',
  '@yxfe/request': '^0.2.12',
  backo2: '^1.0.2',
  'browser-md5-file': '^1.1.1',
  'core-js': '^3.10.1',
  'cross-env': '^7.0.3',
  eslint: '^8.9.0',
  'eslint-config-prettier': '^8.5.0',
  'eslint-plugin-prettier': '^4.0.0',
  eventemitter3: '^4.0.7',
  husky: '^7.0.4',
  jest: '^27.5.1',
  'lodash-es': '^4.17.21',
  'neroom-web-sdk': '1.7.0',
  platform: '^1.3.6',
  'pre-commit': '^1.2.2',
  prettier: '^2.6.1',
  'react-native': '^0.75.2',
  rollup: '^2.45.2',
  'rollup-plugin-banner': '^0.2.1',
  'rollup-plugin-banner2': '^1.2.2',
  'rollup-plugin-copy': '^3.4.0',
  'rollup-plugin-insert': '^1.3.2',
  'rollup-plugin-terser': '^7.0.2',
  'rollup-plugin-visualizer': '^5.12.0',
  'ts-jest': '^27.1.4',
  tslib: '^2.3.1',
  typedoc: '^0.22.11',
  typescript: '^4.5.4',
}
var sdkPkg = {
  name: name,
  version: version,
  sdk: sdk,
  description: description,
  main: main,
  types: types,
  scripts: scripts,
  repository: repository,
  keywords: keywords,
  author: author,
  license: license,
  eslintIgnore: eslintIgnore,
  files: files,
  devDependencies: devDependencies,
}

/**Mobx 可观察对象，负责管理本地会话列表的子 store */
var LocalConversationStore = /** @class */ (function () {
  function LocalConversationStore(rootStore, nim) {
    this.rootStore = rootStore
    this.nim = nim
    this.conversations = new Map()
    this.totalUnreadCount = 0
    this.logger = null
    makeAutoObservable(this)
    this._onSyncStarted = this._onSyncStarted.bind(this)
    this._onSyncFinished = this._onSyncFinished.bind(this)
    this._onSyncFailed = this._onSyncFailed.bind(this)
    this._onConversationCreated = this._onConversationCreated.bind(this)
    this._onConversationDeleted = this._onConversationDeleted.bind(this)
    this._onConversationChanged = this._onConversationChanged.bind(this)
    this._onTotalUnreadCountChanged = this._onTotalUnreadCountChanged.bind(this)
    this.logger = rootStore.logger
    /** 数据同步开始 */
    nim.V2NIMLocalConversationService.on('onSyncStarted', this._onSyncStarted)
    /** 数据同步结束 */
    nim.V2NIMLocalConversationService.on('onSyncFinished', this._onSyncFinished)
    /** 数据同步失败 */
    nim.V2NIMLocalConversationService.on('onSyncFailed', this._onSyncFailed)
    /** 会话创建 */
    nim.V2NIMLocalConversationService.on(
      'onConversationCreated',
      this._onConversationCreated
    )
    /** 会话删除 */
    nim.V2NIMLocalConversationService.on(
      'onConversationDeleted',
      this._onConversationDeleted
    )
    /** 会话更新 */
    nim.V2NIMLocalConversationService.on(
      'onConversationChanged',
      this._onConversationChanged
    )
    /** 会话总未读数变化 */
    nim.V2NIMLocalConversationService.on(
      'onTotalUnreadCountChanged',
      this._onTotalUnreadCountChanged
    )
  }
  LocalConversationStore.prototype.resetState = function () {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('LocalConversationStore Conversation resetState')
    this.conversations.clear()
    this.totalUnreadCount = 0
  }
  /**
   * 销毁
   */
  LocalConversationStore.prototype.destroy = function () {
    this.resetState()
    this.nim.V2NIMLocalConversationService.off(
      'onSyncStarted',
      this._onSyncStarted
    )
    this.nim.V2NIMLocalConversationService.off(
      'onSyncFinished',
      this._onSyncFinished
    )
    this.nim.V2NIMLocalConversationService.off(
      'onSyncFailed',
      this._onSyncFailed
    )
    this.nim.V2NIMLocalConversationService.off(
      'onConversationCreated',
      this._onConversationCreated
    )
    this.nim.V2NIMLocalConversationService.off(
      'onConversationDeleted',
      this._onConversationDeleted
    )
    this.nim.V2NIMLocalConversationService.off(
      'onConversationChanged',
      this._onConversationChanged
    )
    this.nim.V2NIMLocalConversationService.off(
      'onTotalUnreadCountChanged',
      this._onTotalUnreadCountChanged
    )
  }
  /**
   * 添加内存中的会话
   * @param conversations 会话数组
   */
  LocalConversationStore.prototype.addConversation = function (conversations) {
    var _this = this
    conversations
      .filter(function (item) {
        return !!item.conversationId
      })
      // 暂时仅支持 p2p 和 team
      .filter(function (item) {
        return [
          1 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P */,
          2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */,
        ].includes(item.type)
      })
      .forEach(function (item) {
        return __awaiter(_this, void 0, void 0, function () {
          var oldConversation
          return __generator(this, function (_a) {
            oldConversation = this.conversations.get(item.conversationId)
            // 先更新一次
            this.conversations.set(
              item.conversationId,
              __assign(__assign({}, oldConversation), item)
            )
            return [2 /*return*/]
          })
        })
      })
  }
  /**
   * 更新内存中的会话
   * @param conversations 会话数组
   */
  LocalConversationStore.prototype.updateConversation = function (
    conversations
  ) {
    var _this = this
    conversations
      .filter(function (item) {
        return !!item.conversationId
      })
      // 暂时仅支持 p2p 和 team
      .filter(function (item) {
        return [
          1 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P */,
          2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */,
        ].includes(item.type)
      })
      .forEach(function (item) {
        var oldConversation = _this.conversations.get(item.conversationId)
        _this.conversations.set(
          item.conversationId,
          __assign(__assign({}, oldConversation), item)
        )
      })
  }
  /**
   * 移除内存中的会话
   * @param conversationId 会话ID
   */
  LocalConversationStore.prototype.removeConversation = function (
    conversationIds
  ) {
    var _this = this
    conversationIds.forEach(function (item) {
      _this.conversations.delete(item)
      if (_this.rootStore.uiStore.selectedConversation === item) {
        _this.rootStore.uiStore.unselectConversation()
      }
    })
  }
  /**
   * 重置会话未读数
   * @param conversationId - 消息所属的会话的ID
   */
  LocalConversationStore.prototype.resetConversation = function (
    conversationId
  ) {
    var _a, _b, _c, _d
    return __awaiter(this, void 0, void 0, function () {
      var conversation, error_1
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log(
                  'LocalConversationStore resetConversation',
                  conversationId
                )
            conversation = this.conversations.get(conversationId)
            if (!conversation) {
              ;(_b = this.logger) === null || _b === void 0
                ? void 0
                : _b.warn(
                    'LocalConversationStore resetConversation: conversation is not found.',
                    conversationId
                  )
              return [2 /*return*/]
            }
            _e.label = 1
          case 1:
            _e.trys.push([1, 4, , 5])
            if (!conversation.unreadCount) return [3 /*break*/, 3]
            // 请求前也清理一次会话未读数，fix http://jira.netease.com/browse/YYTX-34326
            this._resetMemoryConversationUnreadCount(conversation)
            return [
              4 /*yield*/,
              this.nim.V2NIMLocalConversationService.clearUnreadCountByIds([
                conversation.conversationId,
              ]),
            ]
          case 2:
            _e.sent()
            this._resetMemoryConversationUnreadCount(conversation)
            _e.label = 3
          case 3:
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.log('LocalConversationStore resetConversation success')
            return [3 /*break*/, 5]
          case 4:
            error_1 = _e.sent()
            ;(_d = this.logger) === null || _d === void 0
              ? void 0
              : _d.error(
                  'LocalConversationStore resetConversation failed: ',
                  error_1
                )
            throw error_1
          case 5:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 插入一条会话记录
   * @param conversationType
   * @param receiverId - 接收方, 对方帐号或者群id
   * @param isSelected - 是否选中
   */
  LocalConversationStore.prototype.insertConversationActive = function (
    conversationType,
    receiverId,
    isSelected
  ) {
    var _a, _b, _c
    if (isSelected === void 0) {
      isSelected = true
    }
    return __awaiter(this, void 0, void 0, function () {
      var conversationId, conversation, error_2
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 5, , 6])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('LocalConversationStore insertConversationActive', {
                  conversationType: conversationType,
                  receiverId: receiverId,
                  isSelected: isSelected,
                })
            conversationId = ''
            if (
              conversationType ===
              1 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P */
            ) {
              conversationId =
                this.nim.V2NIMConversationIdUtil.p2pConversationId(receiverId)
            } else if (
              conversationType ===
              2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */
            ) {
              conversationId =
                this.nim.V2NIMConversationIdUtil.teamConversationId(receiverId)
            } else {
              throw new Error('Unsupported conversation type')
            }
            if (!!this.conversations.has(conversationId))
              return [3 /*break*/, 2]
            return [
              4 /*yield*/,
              this.nim.V2NIMLocalConversationService.createConversation(
                conversationId
              ),
            ]
          case 1:
            conversation = _d.sent()
            this.addConversation([conversation])
            _d.label = 2
          case 2:
            if (!isSelected) return [3 /*break*/, 4]
            return [
              4 /*yield*/,
              this.rootStore.uiStore.selectConversation(conversationId),
            ]
          case 3:
            _d.sent()
            _d.label = 4
          case 4:
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'LocalConversationStore insertConversationActive success',
                  {
                    conversationType: conversationType,
                    receiverId: receiverId,
                    isSelected: isSelected,
                  }
                )
            return [3 /*break*/, 6]
          case 5:
            error_2 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'LocalConversationStore insertConversationActive failed: ',
                  {
                    conversationType: conversationType,
                    receiverId: receiverId,
                    isSelected: isSelected,
                  },
                  error_2
                )
            throw error_2
          case 6:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 删除会话记录
   * @param conversationId - 消息所属的会话的ID
   */
  LocalConversationStore.prototype.deleteConversationActive = function (
    conversationId
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_4
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 6, , 7])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log(
                  'LocalConversationStore deleteConversationActive',
                  conversationId
                )
            _d.label = 1
          case 1:
            _d.trys.push([1, 3, , 4])
            return [
              4 /*yield*/,
              this.stickTopConversationActive(conversationId, false),
            ]
          case 2:
            _d.sent()
            return [3 /*break*/, 4]
          case 3:
            _d.sent()
            return [3 /*break*/, 4]
          case 4:
            // 先删除内存，防止删除失败导致一些问题
            this.removeConversation([conversationId])
            // 不删除历史消息，让表现跟线上一致，后续可根据需求调整
            return [
              4 /*yield*/,
              this.nim.V2NIMLocalConversationService.deleteConversation(
                conversationId,
                false
              ),
            ]
          case 5:
            // 不删除历史消息，让表现跟线上一致，后续可根据需求调整
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'LocalConversationStore deleteConversationActive success'
                )
            return [3 /*break*/, 7]
          case 6:
            error_4 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.warn(
                  'LocalConversationStore deleteConversationActive failed but continue: ',
                  error_4
                )
            return [3 /*break*/, 7]
          case 7:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 新增会话置顶
   * @param conversationId - 消息所属的会话的ID
   * @param stickTop - 是否置顶
   */
  LocalConversationStore.prototype.stickTopConversationActive = function (
    conversationId,
    stickTop
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var error_5
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log(
                  'LocalConversationStore stickTopConversationActive',
                  conversationId,
                  stickTop
                )
            return [
              4 /*yield*/,
              this.nim.V2NIMLocalConversationService.stickTopConversation(
                conversationId,
                stickTop
              ),
            ]
          case 1:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'LocalConversationStore stickTopConversationActive success'
                )
            return [3 /*break*/, 3]
          case 2:
            error_5 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'LocalConversationStore stickTopConversationActive failed: ',
                  error_5
                )
            throw error_5
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 获取会话列表
   * @param offset 分页偏移量
   * @param limit 分页拉取数量
   */
  LocalConversationStore.prototype.getConversationListActive = function (
    offset,
    limit
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, error_6
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 3, , 4])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log(
                  'LocalConversationStore getConversationListActive',
                  offset,
                  limit
                )
            return [
              4 /*yield*/,
              this.nim.V2NIMLocalConversationService.getConversationList(
                offset,
                limit
              ),
            ]
          case 1:
            res = _d.sent()
            this.addConversation(res.conversationList)
            return [
              4 /*yield*/,
              this.getP2PMessageReceipt(
                res.conversationList
                  .filter(function (item) {
                    return (
                      item.type ===
                      1 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P */
                    )
                  })
                  .map(function (item) {
                    return item.conversationId
                  })
              ),
            ]
          case 2:
            _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'LocalConversationStore getConversationListActive success',
                  offset,
                  limit,
                  res
                )
            return [2 /*return*/, res]
          case 3:
            error_6 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'LocalConversationStore getConversationListActive failed: ',
                  error_6,
                  offset,
                  limit
                )
            throw error_6
          case 4:
            return [2 /*return*/]
        }
      })
    })
  }
  LocalConversationStore.prototype.getP2PMessageReceipt = function (
    conversationIds
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, conversations, error_7
      var _this = this
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log(
                  'LocalConversationStore getP2PMessageReceipt',
                  conversationIds
                )
            return [
              4 /*yield*/,
              Promise.all(
                conversationIds.map(function (item) {
                  return _this.nim.V2NIMMessageService.getP2PMessageReceipt(
                    item
                  )
                })
              ),
            ]
          case 1:
            res = _d.sent()
            conversations = res
              .map(function (item) {
                var conversation = _this.conversations.get(item.conversationId)
                if (conversation) {
                  return __assign(__assign({}, conversation), {
                    msgReceiptTime: item.timestamp,
                  })
                }
              })
              .filter(function (item) {
                return !!item
              })
            this.updateConversation(conversations)
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'LocalConversationStore getP2PMessageReceipt success',
                  conversationIds,
                  res
                )
            return [2 /*return*/, res]
          case 2:
            error_7 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'LocalConversationStore getP2PMessageReceipt failed: ',
                  error_7,
                  conversationIds
                )
            throw error_7
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  LocalConversationStore.prototype._resetMemoryConversationUnreadCount =
    function (conversation) {
      var newConversation = this.conversations.get(conversation.conversationId)
      if (newConversation) {
        this.updateConversation([
          __assign(__assign({}, newConversation), { unreadCount: 0 }),
        ])
      }
    }
  /**
   * 获取会话已读时间戳。该时间包含多端已读时间戳
   */
  LocalConversationStore.prototype.getConversationReadTimeActive = function (
    conversationId
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, error_8
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log(
                  'LocalConversationStore getConversationReadTimeActive',
                  conversationId
                )
            return [
              4 /*yield*/,
              this.nim.V2NIMLocalConversationService.getConversationReadTime(
                conversationId
              ),
            ]
          case 1:
            res = _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'LocalConversationStore getConversationReadTimeActive success',
                  conversationId,
                  res
                )
            return [2 /*return*/, res]
          case 2:
            error_8 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'LocalConversationStore getConversationReadTimeActive failed: ',
                  error_8,
                  conversationId
                )
            throw error_8
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 标记会话已读时间戳
   *
   * 注: 当该方法调用后，SDK 可能给多端账户抛出以下的事件
   *
   * {@link V2NIMConversationListener.onConversationReadTimeUpdated | V2NIMConversationListener.onConversationReadTimeUpdated} <br/>
   *
   */
  LocalConversationStore.prototype.markConversationReadActive = function (
    conversationId
  ) {
    var _a, _b, _c
    return __awaiter(this, void 0, void 0, function () {
      var res, error_9
      return __generator(this, function (_d) {
        switch (_d.label) {
          case 0:
            _d.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log(
                  'LocalConversationStore markConversationReadActive',
                  conversationId
                )
            return [
              4 /*yield*/,
              this.nim.V2NIMLocalConversationService.markConversationRead(
                conversationId
              ),
            ]
          case 1:
            res = _d.sent()
            ;(_b = this.logger) === null || _b === void 0
              ? void 0
              : _b.log(
                  'LocalConversationStore markConversationReadActive success',
                  conversationId,
                  res
                )
            return [2 /*return*/, res]
          case 2:
            error_9 = _d.sent()
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.error(
                  'LocalConversationStore markConversationReadActive failed: ',
                  error_9,
                  conversationId
                )
            throw error_9
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  LocalConversationStore.prototype.handleConversationWithAit = function (msgs) {
    var _this = this
    msgs.map(function (item) {
      return __awaiter(_this, void 0, void 0, function () {
        var hasAitMsg,
          conversationReadTime,
          isCurConversation,
          isSendFromMe,
          conversation,
          aitMsgs
        var _a
        return __generator(this, function (_b) {
          switch (_b.label) {
            case 0:
              if (
                !(
                  (
                    item.conversationType ===
                      2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */ ||
                    item.conversationType === 3
                  ) /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM */
                )
              )
                return [3 /*break*/, 2]
              if (
                !(item === null || item === void 0
                  ? void 0
                  : item.serverExtension)
              )
                return [3 /*break*/, 2]
              hasAitMsg = this.hasAitMsg([item.serverExtension])
              return [
                4 /*yield*/,
                this.getConversationReadTimeActive(item.conversationId),
              ]
            case 1:
              conversationReadTime = _b.sent()
              isCurConversation =
                item.conversationId ==
                this.rootStore.uiStore.selectedConversation
              isSendFromMe =
                item.senderId ===
                ((_a = this.rootStore.userStore.myUserInfo) === null ||
                _a === void 0
                  ? void 0
                  : _a.accountId)
              // 当前通过_onReceiveMessages获取的新消息时间戳大于会话的最后已读时间戳，且有@消息，且没有选中当前该会话，则标记为已读
              if (
                item.createTime > conversationReadTime &&
                hasAitMsg &&
                !isCurConversation &&
                !isSendFromMe
              ) {
                conversation = this.conversations.get(item.conversationId)
                // 如果此时conversation为空，则可能的情况为:
                // 1.该用户删除了该会话后，又收到了 @消息（onReceiveMessages会先于onConversationCreated触发），此时需要在onConversationCreated处理 @消息相关
                // 2.im sdk初始化过程中，onReceiveMessages 会先于onSyncFinished（因为实在onSyncFinished中拉取会话列表） 触发，此时由于会话列表为空，上面的if判断会为false，则在else中先在内存中构造一个会话，带上aitMsg，后等会话列表拉取完成进行合并
                if (conversation) {
                  aitMsgs = conversation.aitMsgs || []
                  if (aitMsgs.length === 0) {
                    this.updateConversation([
                      __assign(__assign({}, conversation), {
                        aitMsgs: [item.messageClientId],
                      }),
                    ])
                  } else {
                    this.updateConversation([
                      __assign(__assign({}, conversation), {
                        aitMsgs: __spreadArray(
                          __spreadArray([], __read(aitMsgs), false),
                          [item.messageClientId],
                          false
                        ),
                      }),
                    ])
                  }
                } else {
                  this.addConversation([
                    //@ts-ignore
                    {
                      conversationId: item.conversationId,
                      type: item.conversationType,
                      aitMsgs: [item.messageClientId],
                    },
                  ])
                }
              }
              _b.label = 2
            case 2:
              return [2 /*return*/]
          }
        })
      })
    })
  }
  LocalConversationStore.prototype.resetConversationAit = function (
    conversationId
  ) {
    var conversation = this.conversations.get(conversationId)
    if (
      (conversation === null || conversation === void 0
        ? void 0
        : conversation.type) ===
        2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */ ||
      (conversation === null || conversation === void 0
        ? void 0
        : conversation.type) ===
        3 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_SUPER_TEAM */
    ) {
      this.updateConversation([
        __assign(__assign({}, conversation), { aitMsgs: [] }),
      ])
    }
  }
  LocalConversationStore.prototype.hasAitMsg = function (serverExtensions) {
    var _this = this
    var flag = false
    if (
      serverExtensions === null || serverExtensions === void 0
        ? void 0
        : serverExtensions.length
    ) {
      serverExtensions === null || serverExtensions === void 0
        ? void 0
        : serverExtensions.forEach(function (item) {
            var _a, _b
            try {
              var extObj = JSON.parse(item || '{}')
              var yxAitMsg = extObj.yxAitMsg
              var account_1 = _this.rootStore.userStore.myUserInfo.accountId
              if (yxAitMsg) {
                ;(_a = Object.keys(yxAitMsg)) === null || _a === void 0
                  ? void 0
                  : _a.forEach(function (key) {
                      if (key === account_1 || key === AT_ALL_ACCOUNT) {
                        flag = true
                      }
                    })
              }
            } catch (_c) {
              ;(_b = _this.logger) === null || _b === void 0
                ? void 0
                : _b.error(
                    'LocalConversationStore parse serverExtension failed: ',
                    item
                  )
            }
          })
    }
    return flag
  }
  LocalConversationStore.prototype._onSyncStarted = function () {
    var _a, _b
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('LocalConversationStore _onSyncStarted')
    // 获取会话列表
    ;(_b = this.rootStore.localConversationStore) === null || _b === void 0
      ? void 0
      : _b.getConversationListActive(
          0,
          this.rootStore.localOptions.conversationLimit || 100
        )
  }
  LocalConversationStore.prototype._onSyncFinished = function () {
    var _a, _b
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_c) {
        ;(_a = this.logger) === null || _a === void 0
          ? void 0
          : _a.log('LocalConversationStore _onSyncFinished')
        // 获取会话列表
        ;(_b = this.rootStore.localConversationStore) === null || _b === void 0
          ? void 0
          : _b.getConversationListActive(
              0,
              this.rootStore.localOptions.conversationLimit || 100
            )
        return [2 /*return*/]
      })
    })
  }
  LocalConversationStore.prototype._onSyncFailed = function (e) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('LocalConversationStore _onSyncFailed', e)
  }
  LocalConversationStore.prototype._onConversationCreated = function (data) {
    var _this = this
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('LocalConversationStore _onConversationCreated', data)
    // 如果是创群，此时_onConversationCreated 返回的data可能没有avatar和name，需要getConversation
    if (
      data.type ===
      2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */
    ) {
      this.nim.V2NIMLocalConversationService.getConversation(
        data.conversationId
      ).then(function (conversation) {
        _this.addConversation([conversation])
        // 处理@消息 情况为
        if (conversation.lastMessage) {
          _this.handleConversationWithAit([
            __assign(
              __assign({}, conversation.lastMessage),
              conversation.lastMessage.messageRefer
            ),
          ])
        }
      })
    } else {
      this.addConversation([data])
      // 会话创建的时候，获取一下当前会话的最后已读时间，便于展示消息已读未读
      if (
        data.type ===
        1 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P */
      ) {
        var conversationId_1 = data.conversationId
        this.nim.V2NIMMessageService.getP2PMessageReceipt(
          conversationId_1
        ).then(function (res) {
          var conversation = _this.conversations.get(conversationId_1)
          if (conversation) {
            _this.updateConversation([
              __assign(__assign({}, conversation), {
                msgReceiptTime: res.timestamp,
              }),
            ])
          }
        })
      }
    }
  }
  LocalConversationStore.prototype._onConversationDeleted = function (
    conversationIds
  ) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('LocalConversationStore _onConversationDeleted', conversationIds)
    this.removeConversation(conversationIds)
  }
  LocalConversationStore.prototype._onConversationChanged = function (data) {
    var _a
    return __awaiter(this, void 0, void 0, function () {
      var _this = this
      return __generator(this, function (_b) {
        ;(_a = this.logger) === null || _a === void 0
          ? void 0
          : _a.log('LocalConversationStore _onConversationChanged', data)
        this.addConversation(data)
        data.forEach(function (item) {
          return __awaiter(_this, void 0, void 0, function () {
            var attachment, type
            var _a, _b, _c, _d
            return __generator(this, function (_e) {
              switch (_e.label) {
                case 0:
                  attachment =
                    (_a = item.lastMessage) === null || _a === void 0
                      ? void 0
                      : _a.attachment
                  type =
                    attachment === null || attachment === void 0
                      ? void 0
                      : attachment.type
                  if (
                    !(
                      ((_b = item.lastMessage) === null || _b === void 0
                        ? void 0
                        : _b.messageType) ===
                        5 /* V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION */ &&
                      ((type === 1 /* V2NIMConst.V2NIMMessageNotificationType
                                                    .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_KICK */ &&
                        ((_c =
                          attachment === null || attachment === void 0
                            ? void 0
                            : attachment.targetIds) === null || _c === void 0
                          ? void 0
                          : _c.includes(
                              this.rootStore.userStore.myUserInfo.accountId
                            ))) ||
                        (type === 2 /* V2NIMConst.V2NIMMessageNotificationType
                                                          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_LEAVE */ &&
                          ((_d = item.lastMessage) === null || _d === void 0
                            ? void 0
                            : _d.messageRefer.senderId) ===
                            this.rootStore.userStore.myUserInfo.accountId) ||
                        type === 4) /* V2NIMConst.V2NIMMessageNotificationType
                                                          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_DISMISS */
                    )
                  )
                    return [3 /*break*/, 2]
                  return [
                    4 /*yield*/,
                    this.deleteConversationActive(item.conversationId),
                  ]
                case 1:
                  _e.sent()
                  return [3 /*break*/, 4]
                case 2:
                  if (
                    !(
                      this.rootStore.uiStore.selectedConversation ===
                      item.conversationId
                    )
                  )
                    return [3 /*break*/, 4]
                  return [
                    4 /*yield*/,
                    this.resetConversation(item.conversationId),
                  ]
                case 3:
                  _e.sent()
                  _e.label = 4
                case 4:
                  if (
                    item.type ===
                      2 /* V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM */ &&
                    item.unreadCount == 0
                  ) {
                    this.resetConversationAit(item.conversationId)
                  }
                  return [2 /*return*/]
              }
            })
          })
        })
        return [2 /*return*/]
      })
    })
  }
  LocalConversationStore.prototype._onTotalUnreadCountChanged = function (
    data
  ) {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('LocalConversationStore _onTotalUnreadCountChanged', data)
    this.totalUnreadCount = data
  }
  return LocalConversationStore
})()

/**Mobx 可观察对象，负责管理在线离线等事件订阅的子store */
var SubscriptionStore = /** @class */ (function () {
  function SubscriptionStore(rootStore, nim) {
    this.rootStore = rootStore
    this.nim = nim
    this.stateMap = new Map()
    this.logger = null
    makeAutoObservable(this)
    this._onUserStatusChanged = this._onUserStatusChanged.bind(this)
    this.nim.V2NIMSubscriptionService.on(
      'onUserStatusChanged',
      this._onUserStatusChanged
    )
    this.logger = rootStore.logger
  }
  SubscriptionStore.prototype.resetState = function () {
    var _a
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('SubscriptionStore resetState')
    this.stateMap.clear()
  }
  /**
   * 销毁SubscriptionStore，会取消相关事件监听
   */
  SubscriptionStore.prototype.destroy = function () {
    this.resetState()
    this.nim.V2NIMSubscriptionService.off(
      'onUserStatusChanged',
      this._onUserStatusChanged
    )
  }
  /** 获取当前用户在线离线状态
   * @param accountId 用户ID
   **/
  SubscriptionStore.prototype.getUserStatus = function (accountId) {
    return this.stateMap.get(accountId)
  }
  /** 获取当前所有用户在线离线状态
   **/
  SubscriptionStore.prototype.getUserStatusList = function () {
    return __spreadArray([], __read(this.stateMap.values()), false)
  }
  /**
   * 订阅用户状态，包括在线状态或用户自定义的状态。
   * 成功订阅用户状态后，当订阅的用户状态有变更时，会触发 onUserStatusChanged 回调。
   * @param accountIds 要订阅的用户 ID 列表。
   */
  SubscriptionStore.prototype.subscribeUserStatusActive = function (
    accountIds
  ) {
    var _a, _b, _c, _d
    return __awaiter(this, void 0, void 0, function () {
      var failedAccounts, err_1
      return __generator(this, function (_e) {
        switch (_e.label) {
          case 0:
            _e.trys.push([0, 2, , 3])
            ;(_a = this.logger) === null || _a === void 0
              ? void 0
              : _a.log('subscribeUserStatusActive', accountIds)
            return [
              4 /*yield*/,
              this.nim.V2NIMSubscriptionService.subscribeUserStatus({
                accountIds: accountIds,
                duration: 3600 * 24 * 7,
                immediateSync: true,
              }),
            ]
          case 1:
            failedAccounts = _e.sent()
            if (failedAccounts.length > 0) {
              ;(_b = this.logger) === null || _b === void 0
                ? void 0
                : _b.warn(
                    'subscribeUserStatusActive failed accounts',
                    failedAccounts
                  )
              return [2 /*return*/, failedAccounts]
            }
            ;(_c = this.logger) === null || _c === void 0
              ? void 0
              : _c.log('subscribeUserStatusActive success')
            return [3 /*break*/, 3]
          case 2:
            err_1 = _e.sent()
            ;(_d = this.logger) === null || _d === void 0
              ? void 0
              : _d.error('subscribeUserStatusActive err', err_1)
            return [3 /*break*/, 3]
          case 3:
            return [2 /*return*/]
        }
      })
    })
  }
  /**
   * 注册用户状态订阅相关监听。
   */
  SubscriptionStore.prototype._onUserStatusChanged = function (userStatusList) {
    var e_1, _a
    var _b
    ;(_b = this.logger) === null || _b === void 0
      ? void 0
      : _b.log('_onUserStatusChanged', userStatusList)
    try {
      for (
        var userStatusList_1 = __values(userStatusList),
          userStatusList_1_1 = userStatusList_1.next();
        !userStatusList_1_1.done;
        userStatusList_1_1 = userStatusList_1.next()
      ) {
        var userStatus = userStatusList_1_1.value
        this.stateMap.set(userStatus.accountId, userStatus)
      }
    } catch (e_1_1) {
      e_1 = { error: e_1_1 }
    } finally {
      try {
        if (
          userStatusList_1_1 &&
          !userStatusList_1_1.done &&
          (_a = userStatusList_1.return)
        )
          _a.call(userStatusList_1)
      } finally {
        if (e_1) throw e_1.error
      }
    }
  }
  return SubscriptionStore
})()

var RootStore = /** @class */ (function () {
  function RootStore(nim, localOptions, platform) {
    if (platform === void 0) {
      platform = 'Web'
    }
    var _this = this
    var _a, _b, _c, _d, _e
    this.localOptions = {
      addFriendNeedVerify: true,
      teamJoinMode: 0 /* V2NIMConst.V2NIMTeamJoinMode.V2NIM_TEAM_JOIN_MODE_FREE */,
      teamAgreeMode: 1 /* V2NIMConst.V2NIMTeamAgreeMode.V2NIM_TEAM_AGREE_MODE_NO_AUTH */,
      teamInviteMode: 0 /* V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_MANAGER */,
      teamUpdateTeamMode: 0 /* V2NIMConst.V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_MANAGER */,
      teamUpdateExtMode: 1 /* V2NIMConst.V2NIMTeamUpdateExtensionMode
                    .V2NIM_TEAM_UPDATE_EXTENSION_MODE_ALL */,
      enableTeam: true,
      enableChangeTeamJoinMode: true,
      enableChangeTeamAgreeMode: true,
      leaveOnTransfer: false,
      needMention: true,
      p2pMsgReceiptVisible: false,
      teamMsgReceiptVisible: false,
      loginStateVisible: false,
      allowTransferTeamOwner: false,
      teamManagerVisible: false,
      aiVisible: true,
      teamManagerLimit: 10,
      sendMsgBefore: function (options) {
        return __awaiter(_this, void 0, void 0, function () {
          return __generator(this, function (_a) {
            return [2 /*return*/, options]
          })
        })
      },
      aiUserAgentProvider: {},
      conversationLimit: 100,
      debug: 'debug',
      aiStream: true,
      iconfontUrl: [],
    }
    this.sdkOptions = {}
    this.conversationStore = null
    this.localConversationStore = null
    this.logger = null
    makeAutoObservable(this)
    this.nim = nim
    this.localOptions = __assign(__assign({}, this.localOptions), localOptions)
    this.logger =
      ((_a = this.localOptions) === null || _a === void 0
        ? void 0
        : _a.debug) == 'off'
        ? null
        : logDebug({
            level:
              (_b = this.localOptions) === null || _b === void 0
                ? void 0
                : _b.debug,
            version: packageJson.version,
            appName: packageJson.name,
            needStringify: false,
          })
    ;(_c = this.logger) === null || _c === void 0
      ? void 0
      : _c.log('store init', {
          localOptions: this.localOptions,
        })
    this.sdkOptions = __assign(
      {},
      (_d = this.nim) === null || _d === void 0 ? void 0 : _d.getOptions()
    )
    this.connectStore = new ConnectStore(this, nim, this.localOptions)
    this.friendStore = new FriendStore(this, nim)
    this.msgStore = new MsgStore(this, nim, this.localOptions)
    this.relationStore = new RelationStore(this, nim)
    // 区分是本地会话还是云端会话
    if (
      (_e = this.sdkOptions) === null || _e === void 0
        ? void 0
        : _e.enableV2CloudConversation
    ) {
      this.conversationStore = new ConversationStore(this, nim)
    } else {
      this.localConversationStore = new LocalConversationStore(this, nim)
    }
    this.teamStore = new TeamStore(this, nim, this.localOptions)
    this.teamMemberStore = new TeamMemberStore(this, nim)
    this.sysMsgStore = new SysMsgStore(this, nim)
    this.userStore = new UserStore(this, nim)
    this.aiUserStore = new AIUserStore(this, nim, this.localOptions)
    this.uiStore = new UiStore(this)
    this.storageStore = new StorageStore(this, nim)
    this.subscriptionStore = new SubscriptionStore(this, nim)
    // 埋点上报
    var reportComponents = [
      'ContactKit',
      'ConversationKit',
      'ChatKit',
      'SearchKit',
    ]
    reportComponents.forEach(function (item) {
      var eventTracking = new EventTracking({
        appKey: _this.nim.options.appkey,
        version: '10.0.0',
        component: item,
        imVersion: sdkPkg.version,
        platform: platform,
      })
      eventTracking.track('init', '')
    })
  }
  RootStore.prototype.resetState = function () {
    var _a, _b, _c, _d
    ;(_a = this.logger) === null || _a === void 0
      ? void 0
      : _a.log('store resetState')
    this.friendStore.resetState()
    this.msgStore.resetState()
    this.relationStore.resetState()
    if (
      (_b = this.sdkOptions) === null || _b === void 0
        ? void 0
        : _b.enableV2CloudConversation
    ) {
      ;(_c = this.conversationStore) === null || _c === void 0
        ? void 0
        : _c.resetState()
    } else {
      ;(_d = this.localConversationStore) === null || _d === void 0
        ? void 0
        : _d.resetState()
    }
    this.teamStore.resetState()
    this.teamMemberStore.resetState()
    this.sysMsgStore.resetState()
    this.userStore.resetState()
    this.aiUserStore.resetState()
    this.uiStore.resetState()
    this.subscriptionStore.resetState()
  }
  /**
   * 销毁根store实例
   */
  RootStore.prototype.destroy = function () {
    var _a, _b, _c
    logger.log('store destroyed')
    this.connectStore.destroy()
    this.friendStore.destroy()
    this.msgStore.destroy()
    this.relationStore.destroy()
    if (
      (_a = this.sdkOptions) === null || _a === void 0
        ? void 0
        : _a.enableV2CloudConversation
    ) {
      ;(_b = this.conversationStore) === null || _b === void 0
        ? void 0
        : _b.destroy()
    } else {
      ;(_c = this.localConversationStore) === null || _c === void 0
        ? void 0
        : _c.destroy()
    }
    this.teamStore.destroy()
    this.teamMemberStore.destroy()
    this.sysMsgStore.destroy()
    this.userStore.destroy()
    this.aiUserStore.destroy()
    this.uiStore.destroy()
    this.subscriptionStore.destroy()
  }
  /**
   * 获取根store实例
   * @param nim NIM SDK 实例
   * @param t 国际化函数
   */
  RootStore.getInstance = function (nim, localOptions, platform) {
    if (platform === void 0) {
      platform = 'Web'
    }
    if (!this.ins) {
      this.ins = new RootStore(nim, localOptions, platform)
    }
    return this.ins
  }
  return RootStore
})()
// export * as V2NIM from 'nim-web-sdk-ng/dist/esm/nim'

export {
  AIUserStore,
  ConnectStore,
  ConversationStore,
  FriendStore,
  LocalConversationStore,
  MsgStore,
  RelationStore,
  RootStore,
  StorageStore,
  SubscriptionStore,
  SysMsgStore,
  TeamMemberStore,
  TeamStore,
  UiStore,
  UserStore,
  RootStore as default,
  constant as storeConstants,
  utils as storeUtils,
}
