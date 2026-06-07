<template>
  <div class="valid-list-container">
    <NavBar :title="t('validMsgText')" />
    <div class="valid-list-content">
      <Empty v-if="validMsg.length === 0" :text="t('validEmptyText')" />
      <template v-else>
        <div
          class="valid-item"
          v-for="msg in validMsg"
          :key="msg.updateTimestamp"
        >
          <template
            v-if="
              msg.status ===
              V2NIMConst.V2NIMFriendAddApplicationStatus
                .V2NIM_FRIEND_ADD_APPLICATION_STATUS_AGREED
            "
          >
            <div class="valid-item-left">
              <Avatar :account="msg.applicantAccountId" />
              <div class="valid-name-container">
                <div class="valid-name">
                  <Appellation :account="msg.applicantAccountId" />
                </div>
                <div class="valid-action">{{ t("applyFriendText") }}</div>
              </div>
            </div>
            <div class="valid-state">
              <Icon type="icon-yidu" />
              <span class="valid-state-text">{{ t("acceptResultText") }}</span>
            </div>
          </template>
          <template
            v-else-if="
              msg.status ===
              V2NIMConst.V2NIMFriendAddApplicationStatus
                .V2NIM_FRIEND_ADD_APPLICATION_STATUS_REJECTED
            "
          >
            <template v-if="isMeApplicant(msg)">
              <div class="valid-item-left">
                <Avatar :account="msg.recipientAccountId" />
                <div class="valid-name-container">
                  <div class="valid-name">
                    <Appellation :account="msg.recipientAccountId" />
                  </div>
                  <div class="valid-action">{{ t("beRejectResultText") }}</div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="valid-item-left">
                <Avatar :account="msg.applicantAccountId" />
                <div class="valid-name-container">
                  <div class="valid-name">
                    <Appellation :account="msg.applicantAccountId" />
                  </div>
                  <div class="valid-action">{{ t("applyFriendText") }}</div>
                </div>
              </div>
              <div class="valid-state">
                <Icon type="icon-shandiao" />
                <span class="valid-state-text">{{
                  t("rejectResultText")
                }}</span>
              </div>
            </template>
          </template>
          <template
            v-else-if="
              msg.status ===
              V2NIMConst.V2NIMFriendAddApplicationStatus
                .V2NIM_FRIEND_ADD_APPLICATION_STATUS_INIT
            "
          >
            <template v-if="!isMeApplicant(msg)">
              <div class="valid-item-left">
                <Avatar :account="msg.applicantAccountId" />
                <div class="valid-name-container">
                  <div class="valid-name">
                    <Appellation :account="msg.applicantAccountId" />
                  </div>
                  <div class="valid-action">{{ t("applyFriendText") }}</div>
                </div>
              </div>
              <div class="valid-buttons">
                <div
                  class="valid-button button-reject"
                  @tap="handleRejectApplyFriendClick(msg.validMsgKey)"
                  :loading="applyFriendLoading"
                >
                  {{ t("rejectText") }}
                </div>
                <div
                  class="valid-button button-accept"
                  @tap="handleAcceptApplyFriendClick(msg.validMsgKey)"
                  :loading="applyFriendLoading"
                >
                  {{ t("acceptText") }}
                </div>
              </div>
            </template>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
/** 验证消息页面 */

import { autorun } from "../../../utils/store.js";
import Empty from "../../../components/Empty.vue";
import Avatar from "../../../components/Avatar.vue";
import NavBar from "../../../components/NavBar.vue";
import Icon from "../../../components/Icon.vue";
import { t } from "../../../utils/i18n";
import { V2NIMConst } from "../../../utils/nim";
import Appellation from "../../../components/Appellation.vue";
import { toRenderSafeData } from "../../../utils";

export default {
  components: {
    Empty,
    Avatar,
    NavBar,
    Icon,
    Appellation,
  },
  data() {
    return {
      V2NIMConst,
      validMsg: [],
      applyFriendLoading: false,
      validMsgWatch: function () {},
    };
  },
  created() {
    this.validMsgWatch = autorun(() => {
      const friendApplyMsgs =
        uni.$UIKitStore?.sysMsgStore.friendApplyMsgs || [];
      console.log("============friendApplyMsgs=============", friendApplyMsgs);

      this.validMsg = this.formatValidMsgs(friendApplyMsgs);
      uni.$UIKitStore?.sysMsgStore.friendApplyMsgs?.map((item) => {
        uni.$UIKitStore?.userStore.getUserActive(item.applicantAccountId);
      });
    });
  },
  beforeDestroy() {
    this.validMsgWatch();
  },
  methods: {
    t,
    isMeApplicant(data) {
      return (
        data.applicantAccountId ===
        uni.$UIKitStore.userStore.myUserInfo.accountId
      );
    },
    getValidMsgKey(msg) {
      return [msg.applicantAccountId || "", msg.recipientAccountId || ""].join(
        "_",
      );
    },
    formatValidMsgs(list) {
      const validMsgs = toRenderSafeData(list) || [];
      return validMsgs.map((msg) => ({
        ...msg,
        validMsgKey: this.getValidMsgKey(msg),
      }));
    },
    getValidMsgByKey(validMsgKey) {
      const friendApplyMsgs =
        uni.$UIKitStore?.sysMsgStore.friendApplyMsgs || [];
      return (
        friendApplyMsgs.find(
          (item) => this.getValidMsgKey(item) === validMsgKey,
        ) || null
      );
    },
    async fetchLatestFriendApplyMsgs() {
      const options = {
        offset: 0,
        limit: 50,
      };
      const sysMsgStore = uni.$UIKitStore?.sysMsgStore;

      try {
        await sysMsgStore?.getAddApplicationListActive(options);
      } catch (error) {
        console.log("getAddApplicationListActive error", error);
      }
    },
    async handleRejectApplyFriendClick(validMsgKey) {
      const msg = this.getValidMsgByKey(validMsgKey);
      if (!msg) {
        return;
      }

      this.applyFriendLoading = true;
      try {
        await uni.$UIKitStore.friendStore.rejectAddApplicationActive(msg);
        uni.showToast({
          title: t("rejectedText"),
          icon: "none",
        });
      } catch (error) {
        uni.showToast({
          title: t("rejectFailedText"),
          icon: "error",
        });
      } finally {
        this.applyFriendLoading = false;
      }
    },
    async handleAcceptApplyFriendClick(validMsgKey) {
      const msg = this.getValidMsgByKey(validMsgKey);
      if (!msg) {
        return;
      }

      this.applyFriendLoading = true;
      try {
        try {
          await uni.$UIKitStore.friendStore.acceptAddApplicationActive(msg);
          uni.showToast({
            title: t("acceptedText"),
            icon: "none",
          });
        } catch (error) {
          console.log("acceptAddApplicationActive error", error);
          uni.showToast({
            title: t("acceptFailedText"),
            icon: "error",
          });
          return;
        }

        const textMsg = uni.$UIKitNIM.V2NIMMessageCreator.createTextMessage(
          t("passFriendAskText"),
        );

        await uni.$UIKitStore.msgStore.sendMessageActive({
          msg: textMsg,
          conversationId:
            uni.$UIKitNIM.V2NIMConversationIdUtil.p2pConversationId(
              msg.operatorAccountId,
            ),
        });
      } catch (error) {
        console.log("send passFriendAskText error", error);
      } finally {
        this.applyFriendLoading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.valid-list-container {
  height: 100vh;
  box-sizing: border-box;
}

.valid-list-content {
  height: calc(100% - 60px - var(--status-bar-height));
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.valid-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}

.valid-name-container {
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  flex: 1;
  padding-right: 20px;
}

.valid-name {
  font-size: 16px;
  color: #333333;
  max-width: 40vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.valid-action {
  color: #888;
  font-size: 14px;
  max-width: 40vw;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.valid-item-left {
  display: flex;
  align-items: center;
}

.valid-buttons {
  display: flex;
  align-items: center;
}

.valid-button {
  margin: 0;
  width: 60px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  text-align: center;
  border-radius: 3px;
  background-color: #fff;
}

.button-reject {
  color: #333;
  border: 1px solid #d9d9d9;
  margin-right: 10px;
}

.button-accept {
  color: #337eef;
  border: 1px solid #337eef;
}

.valid-state {
  display: flex;
  align-items: center;
}

.valid-state-text {
  margin-left: 10px;
  color: #b3b7bc;
}
</style>
