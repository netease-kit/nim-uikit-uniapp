<script  lang="ts">
import RootStore from '@xkit-yx/im-store'
import { NimKitCore } from '@xkit-yx/core-kit/dist/uniapp-nim-core'
import { customRedirectTo, customReLaunch, customSwitchTab } from './utils/customNavigate'

const STORAGE_KEY = '__yx_im_options__'
export default {
  onLaunch() {
    // #ifdef APP-PLUS
    plus.navigator.closeSplashscreen()
    // #endif
    if (uni.$UIKitStore && uni.$UIKitStore.connectStore.connectState === 'connected') {
      return
    }
    const imOptions = uni.getStorageSync(STORAGE_KEY);
    if (imOptions) {
      this.initNim(imOptions)
    } else {
      // 需要登录 im
      customRedirectTo({
        url: '/pages/Login/index'
      })
    }
  },
  methods: {
    initNim(opts: { account: string, token: string }) {
      // 保存登录信息
      uni.setStorage({
        key: STORAGE_KEY,
        data: opts,
        success: function () {
          console.log('保存登录信息success');
        }
      });
      const nim = uni.$UIKitNIM = new NimKitCore({
        initOptions: {
          "appkey": "",
          "lbsUrls": [
            "https://lbs.netease.im/lbs/webconf.jsp"
          ],
          "linkUrl": "weblink.netease.im",
          "needReconnect": true,
          // "reconnectionAttempts": 5,
          debugLevel: 'debug',
          ...opts,
        },
        platform: 'UniApp',
      })
      uni.$UIKitStore = new RootStore(nim, {
        addFriendNeedVerify: false,
        teamBeInviteMode: 'noVerify',
        teamJoinMode: 'noVerify',
        teamUpdateExtMode: 'all',
        teamUpdateTeamMode: 'all',
        teamInviteMode: 'all',
      })
      nim.connect()
      customSwitchTab({
        url: '/pages/Conversation/index'
      })
    },
    logout() {
      uni.removeStorageSync(STORAGE_KEY);
      customReLaunch({
        url: '/pages/Login/index'
      })
      uni.$UIKitNIM.disconnect()
      uni.$UIKitStore.destroy()
    }
  }
}

</script>
<style></style>
