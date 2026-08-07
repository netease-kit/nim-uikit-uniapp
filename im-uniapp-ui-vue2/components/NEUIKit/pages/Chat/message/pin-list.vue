<template>
  <div :class="['wrapper', { 'bg-white': pinInfos.length === 0 }]">
    <NavBar :title="t('pinText')">
      <template v-slot:left>
        <div class="nav-bar-text" @tap="back">{{ t("pinText") }}</div>
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
/**pin 消息组件 */
import { autorun } from "../../../utils/store.js";
import NavBar from "../../../components/NavBar.vue";
import PinCard from "./message-pin-card.vue";
import { t } from "../../../utils/i18n";
import Empty from "../../../components/Empty.vue";
import { toRenderSafeData } from "../../../utils";

export default {
  components: {
    NavBar,
    PinCard,
    Empty,
  },
  data() {
    return {
      conversationId: "",
      pinInfos: [],
      pinInfosWatch: function () {},
    };
  },
  onLoad(option) {
    this.conversationId = option?.conversationId || "";
    this.pinInfosWatch = autorun(() => {
      const curPinMsgsMap = uni.$UIKitStore.msgStore.pinMsgs.map.get(
        this.conversationId,
      );
      const pinInfos = curPinMsgsMap
        ? [...curPinMsgsMap.values()]
            .filter((pinInfo) => pinInfo.pinState > 0 && pinInfo.message)
            .sort((a, b) => b.message.createTime - a.message.createTime)
        : [];
      this.pinInfos = toRenderSafeData(pinInfos) || [];
    });
  },
  beforeDestroy() {
    this.pinInfosWatch();
  },
  methods: {
    t,
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
    handleUnPinMsg(msg) {
      return uni.$UIKitStore.msgStore.unpinMessageActive(msg).catch((err) => {
        if (err?.code && typeof t(`${err.code}`) !== "undefined") {
          uni.showToast({
            title: t(`${err.code}`),
            icon: "error",
            duration: 1000,
          });
        } else {
          uni.showToast({
            title: t("unpinFailedText"),
            icon: "error",
            duration: 1000,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";

page {
  padding-top: var(--status-bar-height);
  background-color: rgb(245, 246, 247);
}

.wrapper {
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 30px;
  background-color: rgb(245, 246, 247);
  min-height: 100vh;
  .nav-bar-text {
    color: rgb(20, 146, 209);
  }
}
.bg-white {
  background: #fff;
}
</style>
