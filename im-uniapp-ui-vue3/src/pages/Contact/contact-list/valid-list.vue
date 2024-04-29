<template>
  <div class="valid-list-container">
    <NavBar :title="t('validMsgText')" />
    <div class="valid-list-content">
      <Empty v-if="validMsg.length === 0" :text="t('validEmptyText')" />
      <template v-else>
        <div class="valid-item" v-for="msg in validMsg">
          <template v-if="msg.type === 'applyTeam'">
            <div class="valid-item-left">
              <Avatar
                :account="msg.attach && msg.attach.toTeam.teamId"
                :team-id="msg.attach && msg.attach.toTeam.teamId"
                :avatar="msg.attach && msg.attach.toTeam.avatar"
              />
              <div class="valid-name-container">
                <div class="valid-name">
                  {{
                    getAppellation({
                      account: msg.attach && msg.attach.fromUser.account,
                    })
                  }}
                </div>
                <div class="valid-action">
                  {{
                    t('applyTeamText') +
                    ((msg.attach && msg.attach.toTeam.name) ||
                      (msg.attach && msg.attach.toTeam.teamId))
                  }}
                </div>
              </div>
            </div>
            <div v-if="msg.state === 'pass'" class="valid-state">
              <Icon type="icon-yidu" />
              <span class="valid-state-text">{{ t('acceptResultText') }}</span>
            </div>
            <div v-else-if="msg.state === 'decline'" class="valid-state">
              <Icon type="icon-shandiao" />
              <span class="valid-state-text">{{ t('rejectResultText') }}</span>
            </div>
            <div class="valid-buttons" v-else>
              <div
                class="valid-button button-reject"
                @tap="handleRejectApplyTeamClick(msg)"
                :loading="applyTeamLoading"
              >
                {{ t('rejectText') }}
              </div>
              <div
                class="valid-button button-accept"
                @tap="handleAcceptApplyTeamClick(msg)"
                :loading="applyTeamLoading"
              >
                {{ t('acceptText') }}
              </div>
            </div>
          </template>

          <template v-else-if="msg.type === 'teamInvite'">
            <div class="valid-item-left">
              <Avatar
                :account="msg.attach && msg.attach.toTeam.teamId"
                :team-id="msg.attach && msg.attach.toTeam.teamId"
                :avatar="msg.attach && msg.attach.toTeam.avatar"
              />
              <div class="valid-name-container">
                <div class="valid-name">
                  {{
                    getAppellation({
                      account: msg.attach && msg.attach.fromUser.account,
                    })
                  }}
                </div>
                <div class="valid-action">
                  {{
                    t('inviteTeamText') +
                    ((msg.attach && msg.attach.toTeam.name) ||
                      (msg.attach && msg.attach.toTeam.teamId))
                  }}
                </div>
              </div>
            </div>
            <div v-if="msg.state === 'pass'" class="valid-state">
              <Icon type="icon-yidu" />
              <span class="valid-state-text">{{ t('acceptResultText') }}</span>
            </div>
            <div v-else-if="msg.state === 'decline'" class="valid-state">
              <Icon type="icon-shandiao" />
              <span class="valid-state-text">{{ t('rejectResultText') }}</span>
            </div>
            <div class="valid-buttons" v-else>
              <div
                class="valid-button button-reject"
                @tap="handleRejectTeamInviteClick(msg)"
                :loading="teamInviteLoading"
              >
                {{ t('rejectText') }}
              </div>
              <div
                class="valid-button button-accept"
                @tap="handleAcceptTeamInviteClick(msg)"
                :loading="teamInviteLoading"
              >
                {{ t('acceptText') }}
              </div>
            </div>
          </template>

          <template v-else-if="msg.type === 'rejectTeamApply'">
            <div class="valid-item-left">
              <Avatar
                :account="msg.attach && msg.attach.fromTeam.teamId"
                :team-id="msg.attach && msg.attach.fromTeam.teamId"
                :avatar="msg.attach && msg.attach.fromTeam.avatar"
              />
              <div class="valid-name-container">
                <div class="valid-name">
                  {{
                    (msg.attach && msg.attach.fromTeam.name) ||
                    (msg.attach && msg.attach.fromTeam.teamId)
                  }}
                </div>
              </div>
            </div>
            <div class="valid-state">
              <Icon type="icon-shandiao" />
              <span class="valid-state-text">{{ t('rejectResultText') }}</span>
            </div>
          </template>

          <template v-else-if="msg.type === 'rejectTeamInvite'">
            <div class="valid-item-left">
              <Avatar :account="msg.attach && msg.attach.fromUser.account" />
              <div class="valid-name-container">
                <div class="valid-name">
                  {{
                    getAppellation({
                      account: msg.attach && msg.attach.fromUser.account,
                    })
                  }}
                </div>
                <div class="valid-action">{{ t('rejectTeamInviteText') }}</div>
              </div>
            </div>
          </template>

          <template v-else-if="msg.type === 'friendRequest'">
            <template v-if="msg.attach && msg.attach.type === 'applyFriend'">
              <div class="valid-item-left">
                <Avatar :account="msg.attach.fromUser.account" />
                <div class="valid-name-container">
                  <div class="valid-name">
                    {{
                      getAppellation({
                        account: msg.attach.fromUser.account,
                      })
                    }}
                  </div>
                  <div class="valid-action">{{ t('applyFriendText') }}</div>
                </div>
              </div>
              <div v-if="msg.state === 'pass'" class="valid-state">
                <Icon type="icon-yidu" />
                <span class="valid-state-text">{{
                  t('acceptResultText')
                }}</span>
              </div>
              <div v-else-if="msg.state === 'decline'" class="valid-state">
                <Icon type="icon-shandiao" />
                <span class="valid-state-text">{{
                  t('rejectResultText')
                }}</span>
              </div>
              <div class="valid-buttons" v-else>
                <div
                  class="valid-button button-reject"
                  @tap="handleRejectApplyFriendClick(msg)"
                  :loading="applyFriendLoading"
                >
                  {{ t('rejectText') }}
                </div>
                <div
                  class="valid-button button-accept"
                  @tap="handleAcceptApplyFriendClick(msg)"
                  :loading="applyFriendLoading"
                >
                  {{ t('acceptText') }}
                </div>
              </div>
            </template>

            <template
              v-else-if="msg.attach && msg.attach.type === 'rejectFriendApply'"
            >
              <div class="valid-item-left">
                <Avatar :account="msg.attach.fromUser.account" />
                <div class="valid-name-container">
                  <div class="valid-name">
                    {{
                      getAppellation({
                        account: msg.attach.fromUser.account,
                      })
                    }}
                  </div>
                  <div class="valid-action">{{ t('beRejectResultText') }}</div>
                </div>
              </div>
            </template>

            <template
              v-else-if="msg.attach && msg.attach.type === 'passFriendApply'"
            >
              <div class="valid-item-left">
                <Avatar :account="msg.attach.fromUser.account" />
                <div class="valid-name-container">
                  <div class="valid-name">
                    {{
                      getAppellation({
                        account: msg.attach.fromUser.account,
                      })
                    }}
                  </div>
                  <div class="valid-action">{{ t('passResultText') }}</div>
                </div>
              </div>
            </template>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { SystemMessage } from '@xkit-yx/im-store'
import { autorun } from 'mobx'
import { onUnmounted, ref } from '../../../utils/transformVue'
// @ts-ignore
import Empty from '../../../components/Empty.vue'
import Avatar from '../../../components/Avatar.vue'
import NavBar from '../../../components/NavBar.vue'
import Icon from '../../../components/Icon.vue'
import { t } from '../../../utils/i18n'
import { deepClone } from '../../../utils'

const validMsg = ref<SystemMessage[]>([])
const applyTeamLoading = ref(false)
const teamInviteLoading = ref(false)
const applyFriendLoading = ref(false)

const uninstallValidMsgWatch = autorun(() => {
  // @ts-ignore
  validMsg.value = deepClone(uni.$UIKitStore.uiStore.applyMsgList)
})

const getAppellation = (params: any) => {
  // @ts-ignore
  return uni.$UIKitStore.uiStore.getAppellation(params)
}

const handleRejectApplyTeamClick = async (msg: SystemMessage) => {
  applyTeamLoading.value = true
  try {
    // @ts-ignore
    await uni.$UIKitStore.teamStore.rejectTeamApplyActive({
      teamId: msg?.attach?.toTeam.teamId,
      from: msg?.attach?.fromUser.account,
    })
    uni.showToast({
      title: t('rejectedText'),
      icon: 'success',
    })
  } catch (error) {
    uni.showToast({
      title: t('rejectFailedText'),
      icon: 'error',
    })
  } finally {
    applyTeamLoading.value = false
  }
}

const handleAcceptApplyTeamClick = async (msg: SystemMessage) => {
  applyTeamLoading.value = true
  try {
    // @ts-ignore
    await uni.$UIKitStore.teamStore.passTeamApplyActive({
      teamId: msg?.attach?.toTeam.teamId,
      from: msg?.attach?.fromUser.account,
    })
    uni.showToast({
      title: t('acceptedText'),
      icon: 'success',
    })
  } catch (error) {
    uni.showToast({
      title: t('acceptFailedText'),
      icon: 'error',
    })
  } finally {
    applyTeamLoading.value = false
  }
}

const handleRejectTeamInviteClick = async (msg: SystemMessage) => {
  teamInviteLoading.value = true
  try {
    // @ts-ignore
    await uni.$UIKitStore.teamStore.rejectTeamInviteActive({
      teamId: msg?.attach?.toTeam.teamId,
      from: msg?.attach?.fromUser.account,
    })
    uni.showToast({
      title: t('rejectedText'),
      icon: 'success',
    })
  } catch (error) {
    uni.showToast({
      title: t('rejectFailedText'),
      icon: 'error',
    })
  } finally {
    teamInviteLoading.value = false
  }
}

const handleAcceptTeamInviteClick = async (msg: SystemMessage) => {
  teamInviteLoading.value = true
  try {
    // @ts-ignore
    await uni.$UIKitStore.teamStore.acceptTeamInviteActive({
      teamId: msg?.attach?.toTeam.teamId,
      from: msg?.attach?.fromUser.account,
    })
    uni.showToast({
      title: t('acceptedText'),
      icon: 'success',
    })
  } catch (error) {
    uni.showToast({
      title: t('acceptFailedText'),
      icon: 'error',
    })
  } finally {
    teamInviteLoading.value = false
  }
}

const handleRejectApplyFriendClick = async (msg: SystemMessage) => {
  applyFriendLoading.value = true
  try {
    // @ts-ignore
    await uni.$UIKitStore.friendStore.rejectFriendApplyActive(
      msg?.attach?.fromUser.account
    )
    uni.showToast({
      title: t('rejectedText'),
      icon: 'success',
    })
  } catch (error) {
    uni.showToast({
      title: t('rejectFailedText'),
      icon: 'error',
    })
  } finally {
    applyFriendLoading.value = false
  }
}

const handleAcceptApplyFriendClick = async (msg: SystemMessage) => {
  applyFriendLoading.value = true
  const account = msg?.attach?.fromUser.account
  try {
    try {
      // @ts-ignore
      await uni.$UIKitStore.friendStore.passFriendApplyActive(account)
      uni.showToast({
        title: t('acceptedText'),
        icon: 'success',
      })
    } catch (error) {
      uni.showToast({
        title: t('acceptFailedText'),
        icon: 'error',
      })
    }
    // @ts-ignore
    await uni.$UIKitStore.msgStore.sendTextMsgActive({
      scene: 'p2p',
      to: account,
      body: t('passFriendAskText'),
    })
  } catch (error) {
    console.log('error', error)
  } finally {
    applyFriendLoading.value = false
  }
}

onUnmounted(() => {
  uninstallValidMsgWatch()
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

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
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}

.valid-action {
  color: #888;
  font-size: 14px;
  max-width: 40vw;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
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
