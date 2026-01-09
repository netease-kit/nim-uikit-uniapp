<template>
  <div>
    <NavBar title="登录" :showLeft="true">
      <template v-slot:left>
        <div @click="back">
          <Icon type="icon-zuojiantou" :size="22"></Icon>
        </div>
      </template>
    </NavBar>
    <div v-show="step === 0">
      <Welcome />
    </div>
    <div v-show="step === 1">
      <LoginForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LoginForm from './components/login-form.vue'
import Welcome from './components/welcome.vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import NavBar from '../../components/NavBar.vue'
import Icon from '../../components/Icon.vue'
const step = ref(0) // 0: 欢迎页 1: 登录页

const back = () => {
  uni.navigateTo({
    url: '/pages/index/index',
  })
}

onLoad(() => {
  uni.$on('login', () => {
    step.value = 1
  })
})

onUnload(() => {
  uni.$off('login')
})
</script>

<style>
@import '../styles/common.scss';

page {
  height: 100vh;
  overflow: hidden;
}
</style>
