<template>
  <div>
    <NavBar v-if="isWxApp" title="登录" :showLeft="true">
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

<script>
import LoginForm from './components/login-form.vue'
import Welcome from './components/welcome.vue'
import NavBar from '../../components/NavBar.vue'
import Icon from '../../components/Icon.vue'
import { isWxApp } from '../../utils'

export default {
  components: {
    LoginForm,
    Welcome,
    NavBar,
    Icon,
  },
  data() {
    return {
      step: 0,
      isWxApp,
    }
  },
  onLoad() {
    uni.$on('login', this.handleLogin)
  },
  onUnload() {
    uni.$off('login', this.handleLogin)
  },
  methods: {
    back() {
      uni.navigateTo({
        url: '/pages/index/index',
      })
    },
    handleLogin() {
      this.step = 1
    },
  },
}
</script>

<style>
@import '../styles/common.scss';

page {
  height: 100vh;
  overflow: hidden;
}
</style>
