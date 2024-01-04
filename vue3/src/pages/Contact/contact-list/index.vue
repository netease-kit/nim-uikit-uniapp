<template>
  <div class="dropdown-mark" v-if="addDropdownVisible" @touchstart="addDropdownVisible = false" />
  <div class="navigation-bar">
    <div class="logo-box">
      <div>{{ $t('contactText') }}</div>
    </div>
    <div :class="buttonClass">
      <!-- #ifdef MP -->
      <image src="https://yx-web-nosdn.netease.im/common/9ae07d276ba2833b678a4077960e2d1e/Group 1899.png"
        class="button-icon" @tap="addDropdownVisible = true" />
      <!-- #endif -->
      <!-- #ifndef MP -->
      <Icon class="button-icon" type="icon-More" @tap="addDropdownVisible = true" />
      <!-- #endif -->
      <div v-if="addDropdownVisible" class="dropdown-container">
        <div class="add-menu-list">
          <div class="add-menu-item" @tap="onDropdownClick('addFriend')">
            <Icon type="icon-tianjiahaoyou" :style="{ marginRight: '5px' }" />
            {{ $t('addFriendText') }}
          </div>
          <div class="add-menu-item" @tap="onDropdownClick('createGroup')">
            <Icon type="icon-chuangjianqunzu" :style="{ marginRight: '5px' }" />
            {{ $t('createTeamText') }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="contact-list">
    <div class="contact-item-content">
      <div class="contact-item" @click="handleValidMsgClick">
        <Icon class="contact-item-icon contact-valid-icon" :size="20" type="icon-lishixiaoxi" color="#fff" />
        <Badge :num="unreadSysMsgCount" :custom-style="{ position: 'absolute', top: '5px', left: '45px' }" />
        <span class="contact-item-title"> {{ $t('validMsgText') }}</span>
        <Icon class="more-icon" color="#999" type="icon-jiantou" />
      </div>
      <div class="contact-item" @click="handleBlacklistClick">
        <Icon class="contact-item-icon contact-blacklist-icon" :size="20" type="icon-lahei" color="#fff" />
        <span class="contact-item-title"> {{ $t('blacklistText') }}</span>
        <Icon class="more-icon" color="#999" type="icon-jiantou" />
      </div>
      <div class="contact-item" @click="handleGroupContactClick">
        <Icon class="contact-item-icon contact-group-icon" :size="20" type="icon-team" color="#fff" />
        <span class="contact-item-title"> {{ $t('teamMenuText') }}</span>
        <Icon class="more-icon" color="#999" type="icon-jiantou" />
      </div>
    </div>
    <FriendList />
  </div>
</template>

<script lang="ts" setup>
import Icon from '../../../components/Icon.vue'
import Badge from '../../../components/Badge.vue';
import FriendList from './friend-list.vue'
import { ref } from 'vue';
import { onHide } from '@dcloudio/uni-app';
import { customNavigateTo } from '../../../utils/customNavigate';
import { autorun } from 'mobx';

const store = uni.$UIKitStore
const addDropdownVisible = ref(false)
const unreadSysMsgCount = ref(0)

autorun(() => {
  unreadSysMsgCount.value = store.sysMsgStore.unreadSysMsgCount
})

const onDropdownClick = (urlType: string) => {
  const urlMap = {
    // 添加好友
    addFriend: '/pages/Friend/add-friend/index',
    // 创建群聊
    createGroup: '/pages/Group/group-create/index'
  }
  addDropdownVisible.value = false
  customNavigateTo({
    url: urlMap[urlType]
  })
}

const handleValidMsgClick = () => {
  store.sysMsgStore.resetSystemMsgUnread()
  customNavigateTo({
    url: `/pages/Contact/contact-list/valid-list`
  })
}

const handleBlacklistClick = () => {
  customNavigateTo({
    url: `/pages/Contact/contact-list/black-list`
  })
}

const handleGroupContactClick = () => {
  customNavigateTo({
    url: `/pages/Contact/contact-list/group-list`
  })
}

let buttonClass = 'button-box'
// #ifdef MP
buttonClass = 'button-box-mp'
// #endif

onHide(() => {
  addDropdownVisible.value = false
})

</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.navigation-bar {
  height: 60px;
  border-bottom: 1rpx solid #E9EFF5;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: var(--status-bar-height);

  .logo-box {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
  }
}

.contact-list {
  height: calc(100% - 60px - var(--status-bar-height));
  box-sizing: border-box;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .contact-item-content {
    padding-bottom: 5px;
    background-color: #EFF1F4;
  }

  .contact-item {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    background: #fff;
    position: relative;

    &:not(:last-child) {
      border-bottom: 1px solid #f5f8fc;
    }

    .contact-item-icon {
      height: 42px;
      width: 42px;
      border-radius: 50%;
      text-align: center;
      line-height: 39px;
      font-size: 20px;
      color: #fff;
    }

    .contact-valid-icon {
      background-color: #60cfa7;
    }

    .contact-blacklist-icon {
      background-color: #53c3f4;
    }

    .contact-group-icon {
      background-color: #BE65D9;
    }

    .contact-item-title {
      margin-left: 12px;
      font-size: 16px;
      color: #333333;
      flex: 1;
    }

    .more-icon {
      margin: 0 16px;
      color: #999999;
    }
  }
}

.dropdown-mark {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.dropdown-container {
  position: absolute;
  // #ifdef MP
  top: -105px;
  // #endif
  // #ifndef MP
  top: 100%;
  // #endif
  right: 0;
  min-width: 122px;
  min-height: 40px;
  background-color: #fff;
  border: 1px solid #E6E6E6;
  box-shadow: 0px 4px 7px rgba(133, 136, 140, 0.25);
  border-radius: 8px;
  z-index: 99;
}

.add-menu-list {
  padding: 15px 10px;

  .add-menu-item {
    white-space: nowrap;
    font-size: 16px;
    padding-left: 5px;
    margin-bottom: 10px;
    height: 30px;
    line-height: 30px;
    display: flex;
    align-items: center;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
