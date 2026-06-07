<template>
  <div v-if="!isConnected && text" class="network-alert">
    {{ text }}
  </div>
</template>

<script>
import { autorun } from "../utils/store.js"
import { t } from '../utils/i18n'
import { V2NIMConst } from '../utils/nim'

export default {
  data() {
    return {
      isConnected: true,
      text: t('connectingText'),
      uninstallConnectWatch: function () {},
    }
  },
  mounted() {
    this.syncStatus()
    this.uninstallConnectWatch = autorun(() => {
      this.syncStatus()
    })
  },
  beforeDestroy() {
    this.uninstallConnectWatch()
  },
  methods: {
    syncStatus() {
      if (
        uni.$UIKitStore?.connectStore?.connectStatus ===
        V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_CONNECTED
      ) {
        this.isConnected = true
      } else if (
        uni.$UIKitStore?.connectStore?.connectStatus ===
        V2NIMConst.V2NIMConnectStatus.V2NIM_CONNECT_STATUS_DISCONNECTED
      ) {
        this.isConnected = false
        this.text = t('offlineText')
      } else {
        this.isConnected = false
        this.text = t('connectingText')
      }
    },
  },
}
</script>

<style>
.network-alert {
  font-size: 14px;
  background: #fee3e6;
  color: #fc596a;
  text-align: center;
  padding: 8px 0;
}
</style>
