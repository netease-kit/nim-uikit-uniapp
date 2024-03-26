<template>
  <!-- 处理滚动穿透  此为官方推荐做法 https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html#%E4%BB%8B%E7%BB%8D -->
  <page-meta
    :page-style="'overflow:' + (moveThrough ? 'hidden' : 'visible')"
  ></page-meta>
  <div>
    <NavBar
      :title="forwardScene === 'team' ? t('teamChooseText') : t('chooseText')"
      :showLeft="true"
    >
      <template v-slot:left>
        <div @tap="backToChat">
          <Icon type="icon-zuojiantou" :size="22"></Icon>
        </div>
      </template>
    </NavBar>
    <div v-if="forwardScene === 'team'">
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
              <div class="friend-name">
                <Appellation :account="friend.account"></Appellation>
              </div>
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
      :forward-scene="forwardScene"
      :forward-to-team-info="forwardToTeamInfo"
      @confirm="handleForwardConfirm"
      @cancel="handleForwardCancel"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from '../../utils/transformVue'
import NavBar from '../../components/NavBar.vue'
import { t } from '../../utils/i18n'
import { onLoad } from '@dcloudio/uni-app'
import Avatar from '../../components/Avatar.vue'
import type { NimKitCoreTypes } from '@xkit-yx/core-kit'
import type {
  TMsgScene,
  IMMessage,
} from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import type { Team } from '@xkit-yx/im-store'
import { friendGroupByPy } from '../../utils/friend'
import { autorun } from 'mobx'
import Empty from '../../components/Empty.vue'
import Icon from '../../components/Icon.vue'
import { deepClone } from '../../utils'
import Appellation from '../../components/Appellation.vue'
import ForwardModal from './message/message-forward-modal.vue'

const friendGroupList = ref<
  { key: string; data: NimKitCoreTypes.IFriendInfo[] }[]
>([])
const forwardScene = ref<TMsgScene>('p2p')
const teamList = ref<Team[]>([])
const sessionId = uni.$UIKitStore?.uiStore.selectedSession
const [scene, to] = uni.$UIKitStore?.uiStore.selectedSession.split('-')
const myAccount = uni.$UIKitStore?.userStore.myUserInfo.account
let msgIdClient = ''
// 转发相关
const forwardModalVisible = ref(false)
const forwardTo = ref('')
const forwardMsg = ref<IMMessage>()
const forwardToTeamInfo = ref<Team>()
const moveThrough = computed(() => {
  return forwardModalVisible.value
})
const handleForwardConfirm = (forwardComment: string) => {
  forwardModalVisible.value = false
  // @ts-ignore
  uni.$UIKitStore.msgStore
    .forwardMsgActive(
      {
        msg: forwardMsg.value as IMMessage,
        scene: forwardScene.value,
        to: forwardTo.value,
      },
      forwardComment
    )
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
  forwardScene.value = props?.forwardScene
  msgIdClient = props?.msgIdClient
})

autorun(() => {
  teamList.value = deepClone(uni.$UIKitStore.uiStore.teamList)
})

autorun(() => {
  const _friendList = uni.$UIKitStore.uiStore.friendsWithoutBlacklist.filter(
    (item) => !(item.account == to || item.account == myAccount)
  )
  friendGroupList.value = deepClone(
    friendGroupByPy(
      _friendList,
      {
        firstKey: 'alias',
        secondKey: 'nick',
        thirdKey: 'account',
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
      uni.$UIKitStore.msgStore.getMsg(sessionId, [msgIdClient])?.[0]
    )
    forwardModalVisible.value = true
    if (forwardScene.value === 'team') {
      forwardToTeamInfo.value = deepClone(
        uni.$UIKitStore.teamStore.teams.get(_forwardTo)
      )
    }
  }
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
