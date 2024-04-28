<template>
  <div class="msg-list-wrapper" @touchstart="handleTapMessageList">
    <scroll-view
      scroll-y="true"
      :scroll-top="scrollTop"
      class="message-scroll-list"
    >
      <div v-show="!noMore" @click="onLoadMore" class="view-more-text">
        {{ t("viewMoreText") }}
      </div>
      <view class="msg-tip" v-show="noMore">{{ t("noMoreText") }}</view>
      <div v-for="(item, index) in finalMsgs" :key="item.renderKey">
        <MessageItem
          :scene="scene"
          :to="to"
          :msg="item"
          :index="index"
          :key="item.renderKey"
          :reply-msg="replyMsgsMap && replyMsgsMap[item.idClient]"
          :broadcastNewAudioSrc="broadcastNewAudioSrc"
        >
        </MessageItem>
      </div>
    </scroll-view>
  </div>
</template>

<script lang="ts" setup>
import type { IMMessage } from "nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface";
import {
  ref,
  computed,
  onBeforeMount,
  onUnmounted,
} from "../../../utils/transformVue";
import MessageItem from "./message-item.vue";
import { events } from "../../../utils/constants";
import { caculateTimeago } from "../../../utils/date";
import { t } from "../../../utils/i18n";
const props = defineProps({
  msgs: {
    type: Array,
    required: true,
  },
  scene: {
    type: String, // Assuming TMsgScene is a custom object type
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  loadingMore: {
    type: Boolean,
    default: undefined,
  },
  noMore: {
    type: Boolean,
    default: undefined,
  },
  replyMsgsMap: {
    type: Object,
    default: undefined,
  },
});

onBeforeMount(() => {
  if (props.scene === "team") {
    // @ts-ignore
    uni.$UIKitStore.teamMemberStore.getTeamMemberActive(props.to);
  }

  uni.$on(events.AUDIO_URL_CHANGE, (url) => {
    broadcastNewAudioSrc.value = url;
  });

  uni.$on(events.ON_SCROLL_BOTTOM, () => {
    scrollToBottom();
  });

  uni.$on(events.ON_LOAD_MORE, () => {
    const msg = finalMsgs.value.filter(
      (item) =>
        !(
          item.type === "custom" &&
          ["beReCallMsg", "reCallMsg"].includes(item.attach?.type || "")
        )
    )[0];
    if (msg) {
      uni.$emit(events.GET_HISTORY_MSG, msg);
    }
  });
});

onUnmounted(() => {
  uni.$off(events.ON_SCROLL_BOTTOM);

  uni.$off(events.ON_LOAD_MORE);

  uni.$off(events.AUDIO_URL_CHANGE);
});

const scrollTop = ref(99999);
const finalMsgs = computed(() => {
  const res: IMMessage[] = [];
  props.msgs.forEach((item: IMMessage, index) => {
    // 如果两条消息间隔超过5分钟，插入一条自定义时间消息
    // @ts-ignore
    if (index > 0 && item.time - props.msgs[index - 1].time > 5 * 60 * 1000) {
      // @ts-ignore
      res.push({
        idClient: "time-" + item.time,
        type: "custom",
        attach: {
          type: "time",
          value: caculateTimeago(item.time),
        },
        status: "sent",
        time: item.time,
        // @ts-ignore
        renderKey: `${item.time + 1}`,
      });
    }
    res.push({
      ...item,
      // @ts-ignore
      renderKey: `${item.time}`,
    });
  });
  return res;
});

const broadcastNewAudioSrc = ref<string>("");

// 消息滑动到底部，建议搭配 nextTick 使用
const scrollToBottom = () => {
  scrollTop.value += 3000;
  const timer = setTimeout(() => {
    scrollTop.value += 1;
    clearTimeout(timer);
  }, 300);
};

const onLoadMore = () => {
  const msg = finalMsgs.value.filter(
    (item) =>
      !(
        item.type === "custom" &&
        ["beReCallMsg", "reCallMsg"].includes(item.attach?.type || "")
      )
  )[0];
  if (msg) {
    uni.$emit(events.GET_HISTORY_MSG, msg);
  }
};

const handleTapMessageList = () => {
  uni.$emit(events.CLOSE_PANEL);
  setTimeout(() => {
    uni.$emit(events.CLOSE_PANEL);
  }, 300);
};
</script>

<style scoped lang="scss">
.msg-list-wrapper {
  flex: 1;
  overflow: hidden;
  display: flex;
  height: 100%;
  box-sizing: border-box;
  padding: 16px 0;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

// .msg-list {
//   padding: 0 16px 20px 16px;
//   box-sizing: border-box;
//   transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
//   overflow-x: hidden;
//   // height: 100%;
// }

.msg-tip {
  text-align: center;
  color: #b3b7bc;
  font-size: 12px;
  margin-top: 10px;
}

.block {
  width: 100%;
  height: 40px;
}

.message-scroll-list {
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 1px;
}

.view-more-text {
  text-align: center;
  color: #b3b7bc;
  font-size: 15px;
  margin-top: 20px;
}
page > view > message > view > message-list {
  height: 100%;
}
</style>
