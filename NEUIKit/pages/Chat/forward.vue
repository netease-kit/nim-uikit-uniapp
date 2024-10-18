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
            @click="() => handleItemClick(team.teamId)"
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
              @click="() => handleItemClick(friend.account)"
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

<script lang="ts" setup>
import { ref, computed, onUnmounted } from '../../utils/transformVue'
import NavBar from '../../components/NavBar.vue'
import { t } from '../../utils/i18n'
import { onLoad } from '@dcloudio/uni-app'
import Avatar from '../../components/Avatar.vue'
import { friendGroupByPy } from '../../utils/friend'
import { autorun } from 'mobx'
import Empty from '../../components/Empty.vue'
import Icon from '../../components/Icon.vue'
import { deepClone } from '../../utils'
import ForwardModal from './message/message-forward-modal.vue'
import { V2NIMTeam } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMTeamService'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK'
import { V2NIMMessage } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMMessageService'

const friendGroupList = ref<
  { key: string; data: { account: string; appellation: string }[] }[]
>([])
const forwardConversationType = ref<V2NIMConst.V2NIMConversationType>(
  V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
)
const teamList = ref<V2NIMTeam[]>([])

const conversationId = uni.$UIKitStore?.uiStore.selectedConversation
let msgIdClient = ''
// 转发相关
const forwardModalVisible = ref(false)
const forwardTo = ref('')
const forwardMsg = ref<V2NIMMessage>()
const forwardToTeamInfo = ref<V2NIMTeam>()
const moveThrough = computed(() => {
  return forwardModalVisible.value
})
// 转发消息确认
const handleForwardConfirm = (forwardComment: string) => {
  forwardModalVisible.value = false

  if (!forwardMsg.value) {
    uni.showToast({
      title: t('getMessageFailed'),
      icon: 'error',
    })
    setTimeout(() => {
      backToChat()
    }, 1000)
    return
  }

  const forwardConversationId = uni.$UIKitNIM.V2NIMConversationIdUtil[
    forwardConversationType.value ===
    V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_P2P
      ? 'p2pConversationId'
      : 'teamConversationId'
  ](forwardTo.value)

  uni.$UIKitStore.msgStore
    .forwardMsgActive(forwardMsg.value, forwardConversationId, forwardComment)
    .then(() => {
      uni.showToast({
        title: t('forwardSuccessText'),
        icon: 'success',
        duration: 1000,
      })
      setTimeout(() => {
        backToChat()
      }, 1000)
    })
    .catch(() => {
      uni.showToast({
        title: t('forwardFailedText'),
        icon: 'error',
        duration: 1000,
      })
    })
}

const handleForwardCancel = () => {
  forwardModalVisible.value = false
}

onLoad((props) => {
  forwardConversationType.value = Number(props?.forwardConversationType)
  console.log('forwardConversationType: ', props?.forwardConversationType)
  msgIdClient = props?.msgIdClient
})

const uninstallTeamListWatch = autorun(() => {
  teamList.value = deepClone(uni.$UIKitStore.uiStore.teamList)
})

const uninstallFriendsWatch = autorun(() => {
  const friendsWithoutBlacklist = uni.$UIKitStore.uiStore.friends
    .filter(
      (item) =>
        !uni.$UIKitStore.relationStore.blacklist.includes(item.accountId)
    )
    .map((item) => ({
      account: item.accountId,
      appellation: uni.$UIKitStore.uiStore.getAppellation({
        account: item.accountId,
        teamId: forwardTo.value,
      }),
    }))

  friendGroupList.value = deepClone(
    friendGroupByPy(
      friendsWithoutBlacklist,
      {
        firstKey: 'appellation',
      },
      false
    )
  )
})

const backToChat = () => {
  uni.navigateBack({
    delta: 1,
  })
}

const handleItemClick = (_forwardTo: string) => {
  if (_forwardTo && msgIdClient) {
    forwardTo.value = _forwardTo
    forwardMsg.value = deepClone(
      uni.$UIKitStore.msgStore.getMsg(conversationId, [msgIdClient])?.[0]
    )
    if (!forwardMsg.value) {
      // forwardMsg.value 为空，说明是转发的 pin 消息，此时内存里面可能没有该消息，需要从 pinMsgs 中去查。
      const curPinMsgsMap = uni.$UIKitStore.msgStore.pinMsgs.get(conversationId)

      const pinInfo = [...curPinMsgsMap.values()].find((pinInfo) => {
        if (pinInfo.message) {
          return pinInfo.message.messageClientId === msgIdClient
        } else {
          return false
        }
      })

      if (pinInfo) {
        forwardMsg.value = pinInfo.message
      }
    }

    forwardModalVisible.value = true
    if (
      forwardConversationType.value ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
    ) {
      forwardToTeamInfo.value = deepClone(
        uni.$UIKitStore.teamStore.teams.get(_forwardTo)
      )
    }
  }
}

onUnmounted(() => {
  uninstallTeamListWatch()
  uninstallFriendsWatch()
})
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
