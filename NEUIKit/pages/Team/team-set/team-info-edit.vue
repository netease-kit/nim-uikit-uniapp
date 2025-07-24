<template>
  <div>
    <NavBar
      :title="isDiscussion ? t('discussionInfoText') : t('teamInfoText')"
    />
    <div class="team-set-container" v-if="team">
      <div class="team-set-card">
        <div class="team-set-item team-set-item-flex" @tap="handleAvatarClick">
          <div>
            {{ isDiscussion ? t('discussionAvatarText') : t('teamAvatar') }}
          </div>
          <div class="team-set-item-flex">
            <Avatar
              :account="team && team.teamId"
              :avatar="team && team.avatar"
            />
            <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
          </div>
        </div>
        <div class="team-set-item team-set-item-flex" @tap="handleTitleClick">
          <div>
            {{ isDiscussion ? t('discussionTitle') : t('teamTitle') }}
          </div>
          <Icon iconClassName="more-icon" color="#999" type="icon-jiantou" />
        </div>
        <div
          v-if="!isDiscussion"
          class="team-set-item team-set-item-flex"
          @tap="handleIntroClick"
        >
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
import { ref, onUnmounted, computed } from 'vue'
import { autorun } from 'mobx'
import { t } from '../../../utils/i18n'
import { customNavigateTo } from '../../../utils/customNavigate'

import {
  V2NIMTeam,
  V2NIMTeamMember,
} from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMTeamService'
import {
  V2NIMConversationForUI,
  V2NIMLocalConversationForUI,
} from '@xkit-yx/im-store-v2/dist/types/types'

import { isDiscussionFunc } from '../../../utils'

let teamId = ''
const team = ref<V2NIMTeam>()
const teamMembers = ref<V2NIMTeamMember[]>([])
const conversation = ref<V2NIMConversationForUI | V2NIMLocalConversationForUI>()

/**是否是云端会话 */
const enableV2CloudConversation =
  uni.$UIKitStore?.sdkOptions?.enableV2CloudConversation

/** 编辑群头像 */
const handleAvatarClick = () => {
  customNavigateTo({
    url: `/pages/Team/team-set/team-avatar-edit?id=${teamId}`,
  })
}

/** 是否是讨论组 */
const isDiscussion = computed(() => {
  let serverExtension = team.value?.serverExtension
  return isDiscussionFunc(serverExtension)
})

/** 编辑群名称 */
const handleTitleClick = () => {
  customNavigateTo({
    url: `/pages/Team/team-set/team-name-edit?id=${teamId}`,
  })
}

/** 编辑群简介 */
const handleIntroClick = () => {
  customNavigateTo({
    url: `/pages/Team/team-set/team-intro-edit?id=${teamId}`,
  })
}

let teamWatch = () => {}
let conversationWatch = () => {}

onLoad((option) => {
  teamId = option ? option.id : ''
  const conversationId =
    uni.$UIKitNIM.V2NIMConversationIdUtil.teamConversationId(teamId)
  teamWatch = autorun(() => {
    if (teamId) {
      team.value = uni.$UIKitStore.teamStore.teams.get(teamId)
      teamMembers.value = uni.$UIKitStore.teamMemberStore.getTeamMember(teamId)
    }
  })

  conversationWatch = autorun(() => {
    conversation.value = enableV2CloudConversation
      ? uni.$UIKitStore.conversationStore?.conversations.get(conversationId)
      : uni.$UIKitStore.localConversationStore?.conversations.get(
          conversationId
        )
  })
})

/** 卸载监听 */
onUnmounted(() => {
  teamWatch()
  conversationWatch()
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.team-set-container {
  height: 100vh;
  box-sizing: border-box;
  background-color: #eff1f4;
  padding: 10px 20px;
}

.team-set-card {
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

.team-set-item:not(:last-child) {
  border-bottom: 1rpx solid #f5f8fc;
}

.team-set-item-flex {
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
