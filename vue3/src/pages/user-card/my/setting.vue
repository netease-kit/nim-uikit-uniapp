<template>
  <div class="wrapper">
    <NavBar :title="$t('setText')" />
    <div @click="logout" class="logout">
      {{ $t('logoutText') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue';
import { t } from '../../../utils/i18n'

const logout = () => {
  uni.showModal({
    title: t('logoutText'),
    content: t('logoutConfirmText'),
    showCancel: true,
    success: function (res) {
      if (res.confirm) {
        console.log('用户点击确定');
        const app = getApp()
        app.logout()
      } else if (res.cancel) {
        console.log('用户点击取消');
      }
    }
  });
}

</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";

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
