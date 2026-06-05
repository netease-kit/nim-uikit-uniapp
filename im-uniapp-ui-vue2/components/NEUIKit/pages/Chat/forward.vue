<template>
  <!-- 处理滚动穿透  此为官方推荐做法 https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html#%E4%BB%8B%E7%BB%8D -->
  <page-meta
    :page-style="'overflow:' + (moveThrough ? 'hidden' : 'visible')"
  ></page-meta>
  <div>
    <NavBar
      :title="
        forwardConversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
          ? t('teamChooseText')
          : t('chooseText')
      "
      :showLeft="true"
    >
      <template v-slot:left>
        <div @tap="backToChat">
          <Icon type="icon-zuojiantou" :size="22"></Icon>
        </div>
      </template>
    </NavBar>
    <div
      v-if="
        forwardConversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
      "
    >
      <div class="group-list-content">
        <Empty v-if="teamList.length === 0" :text="t('TeamEmptyText')" />
        <div v-else>
          <div
            class="group-item"
            v-for="team in teamList"
            :key="team.teamId"
            @click="handleItemClick(team.teamId)"
          >
            <Avatar :account="team.teamId" :avatar="team.avatar" />
            <span class="group-name">{{ team.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="friendGroupList.length > 0" class="friend-list-container">
        <div class="friend-group-list">
          <div
            class="friend-group-item"
            v-for="friendGroup in friendGroupList"
            :key="friendGroup.key"
          >
            <div class="friend-group-title">
              {{ friendGroup.key }}
            </div>
            <div
              class="friend-item"
              v-for="friend in friendGroup.data"
              :key="friend.account"
              @click="handleItemClick(friend.account)"
            >
              <Avatar :account="friend.account" size="36" />
              <div class="friend-name">{{ friend.appellation }}</div>
            </div>
          </div>
        </div>
      </div>
      <Empty v-else :text="t('noFriendText')" />
    </div>
    <!-- 转发弹窗 -->
    <ForwardModal
      :forward-modal-visible="forwardModalVisible"
      :forward-to="forwardTo"
      :forward-msg="forwardMsg"
      :forward-conversation-type="forwardConversationType"
      :forward-to-team-info="forwardToTeamInfo"
      @confirm="handleForwardConfirm"
      @cancel="handleForwardCancel"
    />
  </div>
</template>

<script>
/**消息转发页面 */
import NavBar from '../../components/NavBar.vue'
import { t } from '../../utils/i18n'
import Avatar from '../../components/Avatar.vue'
import { friendGroupByPy } from '../../utils/friend'
import { autorun } from "../../utils/store.js"
import Empty from '../../components/Empty.vue'
import Icon from '../../components/Icon.vue'
import ForwardModal from './message/message-forward-modal.vue'
import { V2NIMConst } from '../../utils/nim'
import { toRenderSafeData } from '../../utils'

export default {
  components: {
    NavBar,
    Avatar,
    Empty,
    Icon,
    ForwardModal,
  },
  data() {
    return {
      V2NIMConst,
      friendGroupList: [],
      forwardConversationType:
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P,
      teamList: [],
      conversationId: uni.$UIKitStore?.uiStore.selectedConversation,
      msgIdClient: '',
      origin: '',
      forwardModalVisible: false,
      forwardTo: '',
      forwardMsg: undefined,
      forwardToTeamInfo: undefined,
      teamListWatch: function () {},
      friendsWatch: function () {},
    }
  },
  computed: {
    moveThrough() {
      return this.forwardModalVisible
    },
  },
  onLoad(props) {
    this.forwardConversationType = Number(props?.forwardConversationType)
    this.msgIdClient = props?.msgIdClient || ''
    this.origin = props?.origin || ''
  },
  mounted() {
    this.teamListWatch = autorun(() => {
      this.teamList = toRenderSafeData(uni.$UIKitStore.uiStore.teamList) || []
    })

    this.friendsWatch = autorun(() => {
      const friendsWithoutBlacklist = uni.$UIKitStore.uiStore.friends
        .filter(
          (item) =>
            !uni.$UIKitStore.relationStore.blacklist.includes(item.accountId)
        )
        .map((item) => ({
          account: item.accountId,
          appellation: uni.$UIKitStore.uiStore.getAppellation({
            account: item.accountId,
            teamId: this.forwardTo,
          }),
        }))

      this.friendGroupList = toRenderSafeData(friendGroupByPy(
        friendsWithoutBlacklist,
        {
          firstKey: 'appellation',
        },
        false
      )) || []
    })
  },
  beforeDestroy() {
    this.teamListWatch()
    this.friendsWatch()
  },
  methods: {
    t,
    handleForwardConfirm(forwardComment) {
      this.forwardModalVisible = false

      if (!this.forwardMsg) {
        uni.showToast({
          title: t('getForwardMessageFailed'),
          icon: 'error',
        })
        setTimeout(() => {
          this.backToChat()
        }, 1000)
        return
      }

      const forwardConversationId = uni.$UIKitNIM.V2NIMConversationIdUtil[
        this.forwardConversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
          ? 'p2pConversationId'
          : 'teamConversationId'
      ](this.forwardTo)

      uni.$UIKitStore.msgStore
        .forwardMsgActive(this.forwardMsg, forwardConversationId, forwardComment)
        .then(() => {
          uni.showToast({
            title: t('forwardSuccessText'),
            icon: 'none',
            duration: 1000,
          })
          setTimeout(() => {
            this.backToChat()
          }, 1000)
        })
        .catch(() => {
          uni.showToast({
            title: t('forwardFailedText'),
            icon: 'error',
            duration: 1000,
          })
        })
    },
    handleForwardCancel() {
      this.forwardModalVisible = false
    },
    backToChat() {
      uni.navigateBack({
        delta: 1,
      })
    },
    handleItemClick(forwardTo) {
      if (forwardTo && this.msgIdClient) {
        this.forwardTo = forwardTo
        let forwardMsg = uni.$UIKitStore.msgStore.getMsg(this.conversationId, [
          this.msgIdClient,
        ])?.[0]

        if (this.origin === 'pin') {
          const curPinMsgsMap = uni.$UIKitStore.msgStore.pinMsgs.get(
            this.conversationId
          )
          const pinInfo = curPinMsgsMap
            ? [...curPinMsgsMap.values()].find((pinInfo) => {
                if (pinInfo.message) {
                  return pinInfo.message.messageClientId === this.msgIdClient
                } else {
                  return false
                }
              })
            : undefined

          if (pinInfo) {
            forwardMsg = pinInfo.message
          }
        } else if (this.origin === 'collection') {
          const msg = uni.$UIKitStore.msgStore.collectionMsgs.get(this.msgIdClient)
          if (msg) {
            forwardMsg = msg
          }
        }

        this.forwardMsg = toRenderSafeData(forwardMsg)
        this.forwardModalVisible = true
        this.forwardToTeamInfo = undefined
        if (
          this.forwardConversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
        ) {
          this.forwardToTeamInfo = toRenderSafeData(
            uni.$UIKitStore.teamStore.teams.get(forwardTo)
          )
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/common.scss';
.nav-bar-text {
  color: #337eff;
  margin-right: 20px;
}

.group-list-content {
  height: calc(100% - 60px - var(--status-bar-height));
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.group-item {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}

.group-name {
  margin-left: 10px;
  font-size: 16px;
  padding-right: 20px;
  color: #333333;
  flex: 1;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}

.friend-group-item {
  padding-left: 20px;
}

.friend-group-title {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #b3b7bc;
  border-bottom: 1rpx solid #e1e6e8;
}

.friend-item {
  margin-top: 16px;
  display: flex;
  align-items: center;
  .friend-name {
    margin-left: 12px;
    padding-right: 20px;
    font-size: 14px;
    color: #333333;
    flex: 1;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
}
</style>
