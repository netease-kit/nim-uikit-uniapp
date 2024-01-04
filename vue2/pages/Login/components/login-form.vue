<template>
  <div>
    <div class="navigation-bar">
    </div>
    <div class="login-form-container">
      <div class="login-tabs">
        <span v-for="item in loginTabs.list" :key="item.key"
          :class="['login-tab', { active: loginTabs.active === item.key }]" @click="loginTabs.active = item.key">
          <span>{{ item.title }}</span>
        </span>
      </div>
      <div class="login-tips">{{ i18n.loginTips }}</div>
      <div class="login-form">
        <FormInput className="login-form-input" type="tel" :value="loginForm.mobile"
          @updateModelValue="val => loginForm.mobile = val" :placeholder="i18n.mobilePlaceholder" :allow-clear="true"
          :rule="mobileInputRule">
          <template #addonBefore>
            <span class="phone-addon-before">+86</span>
          </template>
        </FormInput>
        <FormInput className="login-form-input" type="tel" :value="loginForm.smsCode"
          @updateModelValue="val => loginForm.smsCode = val" :placeholder="i18n.smsCodePlaceholder"
          :rule="smsCodeInputRule">
          <template #addonAfter>
            <span :class="['sms-addon-after', { 'disabled': smsCount > 0 && smsCount < 60 }]" @click="startSmsCount()">{{
              smsText
            }}</span>
          </template>
        </FormInput>

      </div>
    </div>
    <button class="login-btn" @click="submitLoginForm()">{{ i18n.loginBtnTitle }}</button>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from '../../../utils/transformVue'
import i18n from '../i18n/zh-cn'
import { getLoginSmsCode, loginRegisterByCode } from '../utils/api';
import FormInput from './form-input.vue'

const mobileInputRule = {
  reg: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
  message: i18n.mobileErrorMsg,
  trigger: 'blur'
}
const smsCodeInputRule = {
  reg: /^\d+$/,
  message: i18n.smsErrorMsg,
  trigger: 'blur'
}

const smsCount = ref(60)
const loginTabs = reactive({
  active: 0,
  list: [
    { key: 0, title: i18n.loginTitle },
  ]
})
const loginForm = reactive({
  mobile: '',
  smsCode: ''
})


const smsText = computed(() => {
  if (smsCount.value > 0 && smsCount.value < 60) {
    return smsCount.value + i18n.smsCodeBtnTitleCount
  } else {
    return i18n.smsCodeBtnTitle
  }
})
// 获取验证码
async function startSmsCount() {
  if (!mobileInputRule.reg.test(loginForm.mobile)) {
    uni.showToast({
      title: i18n.mobileErrorMsg,
      icon: 'none'
    })
    return
  }
  try {
    await getLoginSmsCode({ mobile: loginForm.mobile })
  } catch (error: any) {
    let msg = error.errMsg || error.msg || error.message || i18n.smsCodeFailMsg
    if (msg.startsWith('request:fail')) {
      msg = i18n.smsCodeNetworkErrorMsg
    }
    uni.showToast({
      title: msg,
      icon: 'none'
    })
    return
  }

  if (smsCount.value > 0 && smsCount.value < 60) {
    return
  }
  smsCount.value--
  const timer = setInterval(() => {
    if (smsCount.value > 0) {
      smsCount.value--
    } else {
      clearInterval(timer)
      smsCount.value = 60
    }
  }, 1000)
}
// 登录
async function submitLoginForm() {
  if (!mobileInputRule.reg.test(loginForm.mobile) || !smsCodeInputRule.reg.test(loginForm.smsCode)) {
    uni.showToast({
      title: i18n.mobileOrSmsCodeErrorMsg,
      icon: 'none'
    })
    return
  }
  try {
    const res = await loginRegisterByCode(loginForm)
    const app = getApp()
    app.initNim({ account: res.imAccid, token: res.imToken })
  } catch (error: any) {
    let msg = error.errMsg || error.msg || error.message || i18n.smsCodeFailMsg
    if (msg.startsWith('request:fail')) {
      msg = i18n.loginNetworkErrorMsg
    }
    uni.showToast({
      title: msg,
      icon: 'none'
    })
  }
}

</script>

<style lang="scss" scoped>
$primary-color: #337EFF;

.navigation-bar {
  height: 80px;
}

.login-form-container {
  padding: 0 30px;
}

.login-tab {
  display: inline-block;
  font-size: 22px;
  line-height: 31px;
  color: #666B73;
  margin-right: 20px;
  margin-bottom: 20px;

  &.active {
    color: #222222;
    font-weight: bold;
  }

  .login-tab-active-line {
    display: block;
    width: 80px;
    height: 2px;
    background: $primary-color;
    margin: 5px auto;
    border-radius: 2px;
  }
}

.login-tips {
  font-size: 14px;
  line-height: 20px;
  color: #999999;
  margin-bottom: 20px;
}

.phone-addon-before {
  color: #999999;
  border-right: 1px solid #999999;
  padding: 0 5px;
  margin-right: 10px;
}

.sms-addon-after {
  color: $primary-color;

  &.disabled {
    color: #666B73;
  }
}

.login-form-input {
  margin-bottom: 20px;
}

.login-btn {
  height: 50px;
  width: 90%;
  background: $primary-color;
  border-radius: 8px;
  color: #fff;
  margin-top: 54px;
}
</style>
