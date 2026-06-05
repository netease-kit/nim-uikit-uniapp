<template>
  <span
    class="appellation"
    :style="{ color: color, fontSize: fontSize + 'px' }"
    >{{ appellation }}</span
  >
</template>

<script>
import { autorun } from "../utils/store.js"

export default {
  props: {
    account: {
      type: null,
      default: '',
    },
    teamId: {
      type: String,
      default: undefined,
    },
    ignoreAlias: {
      type: Boolean,
      default: false,
    },
    nickFromMsg: {
      type: String,
      default: undefined,
    },
    color: {
      type: String,
      default: '#333',
    },
    fontSize: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {
      appellation: '',
      uninstallAppellationWatch: function () {},
    }
  },
  created() {
    this.initAppellationWatch()
  },
  watch: {
    account() {
      this.initAppellationWatch()
    },
    teamId() {
      this.initAppellationWatch()
    },
    ignoreAlias() {
      this.initAppellationWatch()
    },
    nickFromMsg() {
      this.initAppellationWatch()
    },
  },
  beforeDestroy() {
    this.uninstallAppellationWatch()
  },
  methods: {
    initAppellationWatch() {
      const account = this.account || ''
      const teamId = this.teamId
      const ignoreAlias = this.ignoreAlias
      const nickFromMsg = this.nickFromMsg

      this.uninstallAppellationWatch()
      if (!account) {
        this.appellation = ''
        return
      }

      this.uninstallAppellationWatch = autorun(() => {
        this.appellation = uni.$UIKitStore.uiStore.getAppellation({
          account,
          teamId,
          ignoreAlias,
          nickFromMsg,
        })
      })
    },
  },
}
</script>

<style scoped lang="scss">
.appellation {
  color: #333;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
