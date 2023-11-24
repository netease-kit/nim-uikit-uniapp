<template>
  <div v-show="step === 0">
    <Welcome @click="step = 1" />
  </div>
  <div v-show="step === 1">
    <LoginForm />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LoginForm from './components/login-form.vue'
import Welcome from './components/welcome.vue'
const step = ref(0) // 0: 欢迎页 1: 登录页
</script>

<style>
@import '../styles/common.scss';

page {
  height: 100vh;
  overflow: hidden;
}
</style>
