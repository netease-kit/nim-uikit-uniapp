<template>
  <div :class="['wrapper', { 'bg-white': pinInfos.length === 0 }]">
    <NavBar :title="t('pinText')">
      <template v-slot:left>
        <div class="nav-bar-text" @tap="back">{{ t('pinText') }}</div>
      </template>
    </NavBar>
    <div class="pinCard-item-wrapper">
      <Empty v-if="pinInfos.length === 0" :text="t('noPinListText')" />

      <div
        v-else
        v-for="(item, index) in pinInfos"
        :key="item.message.messageClientId"
      >
        <PinCard
          :msg="item.message"
          :index="index"
          :key="item.message.messageClientId"
          @unpin="handleUnPinMsg"
        >
        </PinCard>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../../components/NavBar.vue'
import PinCard from './message-pin-card.vue'
import { t } from '../../../utils/i18n'
import Empty from '../../../components/Empty.vue'
import { toRenderSafeData } from '../../../utils'

export default {
  components: {
    NavBar,
    PinCard,
    Empty,
  },
  data() {
    return {
      conversationId: '',
      pinInfos: [],
    }
  },
  onLoad(option) {
    this.conversationId = option?.conversationId || ''
    this.getPinnedMessageList()
  },
  methods: {
    t,
    back() {
      uni.navigateBack({
        delta: 1,
      })
    },
    getPinnedMessageList() {
      return uni.$UIKitStore.msgStore
        .getPinnedMessageListActive(this.conversationId)
        .then((data) => {
          this.pinInfos = toRenderSafeData(data) || []
        })
    },
    handleUnPinMsg(msg) {
      return uni.$UIKitStore.msgStore
        .unpinMessageActive(msg)
        .then(() => {
          return this.getPinnedMessageList()
        })
        .catch(() => {
          uni.showToast({
            title: t('unpinFailedText'),
            icon: 'none',
            duration: 1000,
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  background-color: rgb(245, 246, 247);
}

.wrapper {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgb(245, 246, 247);

  .nav-bar-text {
    color: rgb(20, 146, 209);
  }
}
.bg-white {
  background: #fff;
}
</style>
