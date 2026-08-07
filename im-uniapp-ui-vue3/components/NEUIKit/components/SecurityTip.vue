<template>
  <div class="security-tip">
    <text class="security-tip-icon">!</text>
    <div class="security-tip-text">
      <text>{{ t("securityTipText") }}</text>
      <UniLink
        v-if="!shouldCopyReportLink"
        class="security-tip-report"
        :href="REPORT_URL"
        :text="t('reportText')"
        :showUnderLine="false"
        color="#3370ff"
        :fontSize="13"
        :copyTips="t('wxAppFileCopyText')"
      />
      <text v-else class="security-tip-report" @tap="copyReportLink">
        {{ t("reportText") }}
      </text>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UniLink from "./uni-components/uni-link/components/uni-link/uni-link.vue";
import { getUniPlatform, isHarmonyOs } from "../utils";
import { t } from "../utils/i18n";

const REPORT_URL = "https://yunxin.163.com/survey/report";
const shouldCopyReportLink =
  isHarmonyOs || ["quickapp", "quickapp-webview"].includes(getUniPlatform());

const copyReportLink = () => {
  uni.setClipboardData({
    data: REPORT_URL,
    showToast: false,
    success: () => {
      uni.showModal({
        content: t("openUrlText"),
        showCancel: false,
      });
    },
  });
};
</script>

<style scoped lang="scss">
.security-tip {
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 6px;
  box-sizing: border-box;
  background: #fff5e1;
  color: #eb9718;
  font-size: 13px;
  line-height: 20px;
}

.security-tip-icon {
  display: flex;
  flex: 0 0 14px;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  margin: 3px 4px 0 0;
  border-radius: 50%;
  background: #fc596a;
  color: #fff;
  font-size: 11px;
  font-weight: 600;
  line-height: 14px;
}

.security-tip-text {
  flex: 1;
  min-width: 0;
}

.security-tip-report {
  color: #3370ff;
  cursor: pointer;
}
</style>
