<template>
  <div>
    <NavBar :title="t('teamInfoText')" />
    <div class="group-set-container" v-if="team">
      <div class="group-set-card">
        <div
          class="group-set-item group-set-item-flex"
          @tap="handleAvatarClick"
        >
          <div>{{ t('teamAvatar') }}</div>
          <div class="group-set-item-flex">
            <Avatar
              :account="team && team.teamId"
              :avatar="team && team.avatar"
            />
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </div>
        <div class="group-set-item group-set-item-flex" @tap="handleTitleClick">
          <div>{{ t('teamTitle') }}</div>
          <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
        </div>
        <div class="group-set-item group-set-item-flex" @tap="handleIntroClick">
          <div>{{ t('teamIntro') }}</div>
          <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue'
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref, onUnmounted } from '../../../utils/transformVue'
import { autorun } from 'mobx'
import { t } from '../../../utils/i18n'
import { deepClone } from '../../../utils'
import { customNavigateTo } from '../../../utils/customNavigate'
import {
  V2NIMTeam,
  V2NIMTeamMember,
} from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMTeamService'
import { V2NIMConversation } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMConversationService'

let teamId = ''
const team = ref<V2NIMTeam>()
const teamMembers = ref<V2NIMTeamMember[]>([])
const conversation = ref<V2NIMConversation>()

const handleAvatarClick = () => {
  customNavigateTo({
    url: `/pages/Group/group-set/group-avatar-edit?id=${teamId}`,
  })
}

const handleTitleClick = () => {
  customNavigateTo({
    url: `/pages/Group/group-set/group-name-edit?id=${teamId}`,
  })
}

const handleIntroClick = () => {
  customNavigateTo({
    url: `/pages/Group/group-set/group-intro-edit?id=${teamId}`,
  })
}

let uninstallTeamWatch = () => {}
let uninstallSessionsWatch = () => {}
onLoad((option) => {
  teamId = option ? option.id : ''
  const conversationId =
    uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(teamId)
  uninstallTeamWatch = autorun(() => {
    if (teamId) {
      team.value = deepClone(uni.$UIKitStore.teamStore.teams.get(teamId))
      teamMembers.value = deepClone(
        uni.$UIKitStore.teamMemberStore.getTeamMember(teamId)
      )
    }
  })

  uninstallSessionsWatch = autorun(() => {
    conversation.value = deepClone(
      uni.$UIKitStore.conversationStore.conversations.get(conversationId)
    )
  })
})

onUnmounted(() => {
  uninstallTeamWatch()
  uninstallSessionsWatch()
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.group-set-container {
  height: 100vh;
  box-sizing: border-box;
  background-color: #eff1f4;
  padding: 10px 20px;
}

.group-set-card {
  background: #ffffff;
  border-radius: 8px;
  padding-left: 16px;
  margin-bottom: 10px;
}

.group-set-button {
  text-align: center;
  background: #ffffff;
  border-radius: 8px;
  color: #e6605c;
  height: 40px;
  line-height: 40px;
}

.group-set-item:not(:last-child) {
  border-bottom: 1rpx solid #f5f8fc;
}

.group-set-item-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
}

.more-icon {
  margin: 0 16px;
  color: #999999;
}

.group-info-item {
  height: 70px;
  display: flex;
  align-items: center;

  .group-info-title {
    font-size: 16px;
    margin-left: 10px;
    width: 0;
    flex: 1;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
}

.group-members-item {
  height: 90px;
}

.group-members-info-item {
  display: flex;
  align-items: center;
}

.group-members-info {
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  .group-info-subtitle {
    color: #999999;
  }
}

.member-list {
  white-space: nowrap;
  overflow-x: hidden;
  margin-right: 30px;
  height: 50px;
  display: flex;
  align-items: center;
}

.member-add {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  border: 1px dashed #999999;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  flex-shrink: 0;
}

.member-item {
  margin-right: 10px;
  display: inline-block;
  flex-shrink: 0;
}
</style>
