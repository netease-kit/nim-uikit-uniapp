<template>
  <div
    :class="[
      'merged-forward-card',
      props.msg.isSelf ? 'merged-forward-card-out' : 'merged-forward-card-in',
    ]"
    @tap.stop="openMergedForward"
  >
    <div class="merged-forward-card-content">
      <div class="merged-forward-title">
        <text class="merged-forward-title-session">{{ sessionName }}</text>
        <text class="merged-forward-title-suffix">{{
          t("messageOfText")
        }}</text>
      </div>
      <div class="merged-forward-abstracts">
        <div
          v-for="(item, index) in abstracts"
          :key="`${item.userAccId}-${index}`"
          class="merged-forward-abstract"
        >
          <text class="merged-forward-sender">{{ item.senderNick }}: </text>
          <text class="merged-forward-content">{{ item.content }}</text>
        </div>
      </div>
      <div class="merged-forward-footer">
        {{ loading ? t("loadingMoreText") : t("chatHistoryText") }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import type { V2NIMMessageForUI } from "../../../../utils/module/im-store-v2/types/src";
import { t } from "../../../../utils/i18n";
import { customNavigateTo } from "../../../../utils/customNavigate";
import {
  loadMergedForwardMessages,
  parseMergedForwardPayload,
} from "../../../../utils/mergedForward";
import { createMergedViewerTask } from "../../../../utils/forwardTask";

const props = defineProps<{ msg: V2NIMMessageForUI }>();

const loading = ref(false);
const cachedMessages = ref<V2NIMMessageForUI[]>([]);
const payload = computed(() => parseMergedForwardPayload(props.msg));
const sessionName = computed(
  () => payload.value?.data.sessionName || payload.value?.data.sessionId || "",
);
const abstracts = computed(() =>
  (payload.value?.data.abstracts || []).slice(0, 3),
);
const title = computed(() => `${sessionName.value}${t("messageOfText")}`);

const openMergedForward = async () => {
  if (loading.value) return;
  loading.value = true;
  try {
    if (!payload.value) throw new Error("Merged forward payload missing");
    const messages = cachedMessages.value.length
      ? cachedMessages.value
      : await loadMergedForwardMessages({
          store: uni.$UIKitStore,
          payload: payload.value,
        });
    cachedMessages.value = messages;
    const taskId = createMergedViewerTask({
      title: title.value,
      messages,
    });
    customNavigateTo({
      url: `/pages/Chat/merged-forward-detail?taskId=${encodeURIComponent(
        taskId,
      )}`,
    });
  } catch (error) {
    uni.showToast({
      title: t("getMergedForwardMsgFailedText"),
      icon: "error",
      duration: 1000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.merged-forward-card {
  width: 63vw;
  max-width: 320px;
  overflow: hidden;
  padding: 8px;
  box-sizing: border-box;
  background: #c9def4;
  cursor: pointer;
}

.merged-forward-card-in {
  margin-left: 8px;
  border-radius: 0 8px 8px 8px;
  background: #e8eaed;
}

.merged-forward-card-out {
  margin-right: 8px;
  border-radius: 8px 0 8px 8px;
}

.merged-forward-card-content {
  min-width: 0;
  padding: 12px 16px;
  border-radius: 6px;
  background: #fff;
}

.merged-forward-title {
  display: flex;
  min-width: 0;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  white-space: nowrap;
}

.merged-forward-title-session {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.merged-forward-title-suffix {
  flex: 0 0 auto;
}

.merged-forward-abstract {
  display: flex;
  min-width: 0;
  color: #656a72;
  font-size: 13px;
  line-height: 18px;
}

.merged-forward-sender {
  flex: 0 1 auto;
  max-width: 45%;
  overflow: hidden;
  color: #3d4149;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.merged-forward-content {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.merged-forward-footer {
  margin: 10px -16px 0;
  padding: 8px 16px 0;
  overflow: hidden;
  border-top: 1px solid #edf0f3;
  color: #8b9099;
  font-size: 12px;
  line-height: 17px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
