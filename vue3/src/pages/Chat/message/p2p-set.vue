<template>
  <NavBar :title="$t('setText')" />
  <div class="p2p-set-container">
    <div class="p2p-set-card">
      <div class="p2p-set-item">
        <div class="p2p-set-my-info">
          <Avatar :account="account" />
          <div class="p2p-set-my-nick">{{ store.uiStore.getAppellation({ account })
          }}</div>
        </div>
        <div class="member-add">
          <Icon @tap="addTeamMember" type="icon-tianjiaanniu" />
        </div>
      </div>
    </div>
    <div class="p2p-set-card">
      <div class="p2p-set-item p2p-set-item-flex-sb">
        <div>{{ $t('sessionMuteText') }}</div>
        <switch :checked="!store.relationStore.mutes.includes(account)" @change="changeSessionMute" />
      </div>
      <div class="p2p-set-item p2p-set-item-flex-sb">
        <div>{{ $t('stickTopText') }}</div>
        <switch :checked="session?.stickTopInfo?.isStickOnTop" @change="changeStickTopInfo" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue';
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'

import type { Session } from '@xkit-yx/im-store';
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue';
import { autorun } from 'mobx';
import { t } from '../../../utils/i18n'
import { customNavigateTo } from '../../../utils/customNavigate';

const store = uni.$UIKitStore

let account = ''
const session = ref<Session>()

onLoad((option) => {
  account = option?.id

  autorun(() => {
    session.value = store.sessionStore.sessions.get('p2p-' + account)
  })
})

const addTeamMember = () => {
  customNavigateTo({
    url: '/pages/Group/group-create/index?account=' + account
  })
}

const changeSessionMute = async (e: any) => {
  const checked = !e.detail.value
  try {
    await store.relationStore.setMuteActive({ account, isAdd: checked })
  } catch (error) {
    uni.showToast({
      title: checked ? t('sessionMuteFailText') : t('sessionUnMuteFailText'),
      icon: 'error'
    })
  }
}

const changeStickTopInfo = async (e: any) => {
  const checked = e.detail.value
  const sessionId = 'p2p-' + account
  try {
    if (checked) {
      await store.sessionStore.addStickTopSessionActive(sessionId)
    } else {
      await store.sessionStore.deleteStickTopSessionActive(sessionId)
    }
  } catch (error) {
    uni.showToast({
      title: checked ? t('addStickTopFailText') : t('deleteStickTopFailText'),
      icon: 'error'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.p2p-set-container {
  height: 100vh;
  box-sizing: border-box;
  background-color: #eff1f4;
  padding: 10px 20px;
}

.p2p-set-card {
  background: #FFFFFF;
  border-radius: 8px;
  padding-left: 16px;
  margin-bottom: 10px;
}

.p2p-set-button {
  text-align: center;
  background: #FFFFFF;
  border-radius: 8px;
  color: #E6605C;
  height: 40px;
  line-height: 40px;
}

.p2p-set-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 10px 0;

  &:not(:last-child) {
    border-bottom: 1rpx solid #F5F8FC;
  }
}

.p2p-set-item-flex-sb {
  justify-content: space-between;
}

.p2p-set-my-info {
  margin-right: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.p2p-set-my-nick {
  margin-top: 5px;
  color: #333;
  font-size: 12px;
  max-width: 70px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.more-icon {
  margin: 0 16px;
  color: #999999;
}

.p2p-info-item {
  height: 70px;
  display: flex;
  align-items: center;

  .p2p-info-title {
    font-size: 16px;
    margin-left: 10px;
    width: 0;
    flex: 1;
    overflow: hidden; //超出的文本隐藏
    text-overflow: ellipsis; //溢出用省略号显示
    white-space: nowrap; //溢出不换行
  }
}

.p2p-members-item {
  height: 90px;
}

.p2p-members-info-item {
  display: flex;
  align-items: center;
}

.p2p-members-info {
  height: 40px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  .p2p-info-subtitle {
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
  width: 40px;
  height: 40px;
  border-radius: 100%;
  border: 1px dashed #999999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.member-item {
  margin-right: 10px;
  display: inline-block;
  flex-shrink: 0;
}
</style>
