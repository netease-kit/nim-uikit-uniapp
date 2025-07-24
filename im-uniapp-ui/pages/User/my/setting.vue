<template>
  <div class="wrapper">
    <NavBar :title="t('setText')" />
    <div class="setting-item">
      <div class="setting-item-title">
        {{ t('enableV2CloudConversationText') }}
      </div>
      <div class="setting-item-content">
        <switch
          :checked="enableV2CloudConversation"
          @change="onChangeEnableV2CloudConversation"
        />
      </div>
    </div>
    <div class="setting-item">
      <div class="setting-item-title">
        {{ t('SwitchToEnglishText') }}
      </div>
      <div class="setting-item-content">
        <switch
          :checked="switchToEnglishFlag"
          @change="onChangeSwitchToEnglishFlag"
        />
      </div>
    </div>
    <div @click="logout" class="logout">
      {{ t('logoutText') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { ref, onMounted } from 'vue'

const enableV2CloudConversation = ref(false)
const switchToEnglishFlag = ref(false)

onMounted(() => {
  enableV2CloudConversation.value =
    uni.getStorageSync('enableV2CloudConversation') === 'on'
  switchToEnglishFlag.value = uni.getStorageSync('switchToEnglishFlag') === 'en'
})

const logout = () => {
  uni.showModal({
    title: t('logoutText'),
    content: t('logoutConfirmText'),
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定')
        const app = getApp()
        app.logout()
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    },
  })
}

const onChangeEnableV2CloudConversation = (e: any) => {
  const checked = e.detail.value
  enableV2CloudConversation.value = checked
  uni.setStorage({
    key: 'enableV2CloudConversation',
    data: checked ? 'on' : 'off',
  })
  uni.showToast({
    title: '切换后杀进程重启应用后生效',
    icon: 'none',
  })
}

const onChangeSwitchToEnglishFlag = (e: any) => {
  const checked = e.detail.value
  switchToEnglishFlag.value = checked
  uni.setStorage({
    key: 'switchToEnglishFlag',
    data: checked ? 'en' : 'zh',
  })
  uni.showToast({
    title: '切换后杀进程重启应用后生效',
    icon: 'none',
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  background-color: rgb(245, 246, 247);
}

.wrapper {
  background-color: rgb(245, 246, 247);
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
}
.setting-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  width: 90%;
  margin: 10px auto;
  padding: 0 10px;
  box-sizing: border-box;
  color: #333;
}

.logout {
  background-color: #fff;
  border-radius: 8px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  width: 90%;
  margin: 10px auto;
  color: rgb(244, 22, 22);
}
</style>
