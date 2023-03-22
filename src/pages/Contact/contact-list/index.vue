<template>
  <div class="dropdown-mark" v-if="addDropdownVisible" @touchstart="addDropdownVisible = false" />
  <div class="navigation-bar">
    <div class="logo-box">
      <div>{{ $t('contactText') }}</div>
    </div>
    <div class="button-box">
      <Icon class="button-icon" type="icon-More" style="font-size: 22px;color: #333333;"
        @click="addDropdownVisible = true" />
      <div v-if="addDropdownVisible" class="dropdown-container">
        <div class="add-menu-list">
          <div class="add-menu-item" @click="startConversation">
            <Icon type="icon-tianjiahaoyou" />
            {{ $t('createP2PText') }}
          </div>
          <div class="add-menu-item" @click="onCreateGroup">
            <Icon type="icon-chuangjianqunzu" />
            {{ $t('createTeamText') }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="contact-list">
    <div class="contact-item-content">
      <div class="contact-item" @click="handleGroupContactClick">
        <Icon class="contact-item-icon" type="icon-team" />
        <span class="contact-item-title"> {{ $t('teamMenuText') }}</span>
        <Icon class="more-icon" type="icon-jiantou" />
      </div>
    </div>
    <FriendList />
  </div>
</template>

<script lang="ts" setup>
import Icon from '../../../components/Icon.vue'
import FriendList from './friend-list.vue'
import { ref } from 'vue'
import { onHide } from '@dcloudio/uni-app';
const addDropdownVisible = ref(false)

// 发起单聊
const startConversation = () => {
  addDropdownVisible.value = false
  uni.navigateTo({
    url: '/pages/Conversation/conversation-start/index'
  })
}
// 创建群聊
const onCreateGroup = () => {
  addDropdownVisible.value = false
  uni.navigateTo({
    url: '/pages/Group/group-create/index'
  })
}

const handleGroupContactClick = () => {
  uni.navigateTo({
    url: `/pages/Contact/contact-list/group-list`
  })
}

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

  .button-box {
    display: flex;
    align-items: center;
    position: relative;

    .button-icon {
      margin-left: 20px;
    }

  }

  .logo-box {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 500;
  }
}

.contact-list {
  height: calc(100% - 60px - var(--status-bar-height));
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

    .contact-item-icon {
      height: 42px;
      width: 42px;
      border-radius: 50%;
      background-color: #BE65D9;
      text-align: center;
      line-height: 42px;
      font-size: 20px;
      color: #fff;
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
  top: 100%;
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

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
