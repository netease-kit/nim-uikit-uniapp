<template>
  <div class="wrapper">
    <NavBar :title="t(key)">
      <template v-slot:left>
        <div class="nav-bar-text" @tap="back">{{ t('cancelText') }}</div>
      </template>
    </NavBar>
    <div class="userInfo-item-wrapper">
      <input class="input" 
        :confirm-type="t('okText')" 
        @focus="onInputFocus" 
        :maxlength="maxlengthMap[key]"
        @input="onInputChange" 
        :value="inputValue" />
        <div @tap="clearInputValue">
          <Icon v-show="showClearIcon" iconClassName="clear-icon" type="icon-shandiao"></Icon>
        </div>
    </div>
    <div 
      :class="getUniPlatform() === 'mp-weixin' ? 'ok-btn-mp' : 'ok-btn'" 
      @tap="onUserInfoConfirm">
      {{ t('okText') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { autorun } from 'mobx';
import { ref } from '../../../utils/transformVue';
import Icon from '../../../components/Icon.vue';
import NavBar from '../../../components/NavBar.vue';
import { t } from '../../../utils/i18n';
import { getUniPlatform } from '../../../utils';
import type { UserNameCard } from '@xkit-yx/im-store';
import { deepClone } from '../../../utils';

const key = ref('')
const inputValue = ref('')
const showClearIcon = ref(false)
const myUserInfo = ref<UserNameCard>()
const maxlengthMap = {
  nick: 15,
  tel: 11,
  signature: 50,
  email: 30
}

onLoad((props) => {
  // inputValue.value = props?.value
  key.value = props?.key

  autorun(() => {
    // @ts-ignore
    myUserInfo.value = deepClone(uni.$UIKitStore.userStore.myUserInfo)
    // @ts-ignore
    const _value = deepClone(myUserInfo.value[key.value])
    inputValue.value = _value
    // 如果昵称没有值，则默认显示账号
    if(key.value === 'nick' && !_value) {
      // @ts-ignore
      inputValue.value = deepClone(myUserInfo.value.account)
    }
  })
})

const onInputChange = (e: Event) => {
  //@ts-ignore
  inputValue.value = e.detail.value
}

const onInputFocus = () => {
  showClearIcon.value = true
}

const clearInputValue = () => {
  inputValue.value = ''
}

const onUserInfoConfirm = () => {
  const _value = inputValue.value
  // 需要修改邮箱的正则，可在此处自定义
  if (key.value == 'tel' && !(/^\d+(\.\d+)?$/.test(_value)) && _value.trim() !== '') {
    uni.showToast({
      title: t('telErrorText'),
      icon: "error"
    })
    return
  }
  // 需要修改邮箱的正则，可在此处自定义
  if (key.value == 'email' && !/[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/.test(_value) && _value.trim() !== '') {
    uni.showToast({
      title: t('emailErrorText'),
      icon: "error"
    })
    return
  }
  inputValue.value = _value
  // @ts-ignore
  uni.$UIKitStore.userStore.saveMyUserInfoActive({ ...myUserInfo.value, [key.value]: _value }).then(() => {
    uni.navigateBack({})
  }).catch((error) => {
    uni.showToast({
      title: t('saveText') + t(key.value) + t('failText'),
      icon: "error"
    })
  })

}

const back = () => {
  uni.navigateBack({
    delta: 1
  })
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
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgb(245, 246, 247);

  .nav-bar-text {
    color: rgb(20, 146, 209);
  }

  .userInfo-item-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    margin: 15px;
    border-radius: 5px;

    .input {
      display: inline-block;
      width: 85%;
      padding: 6px;
    }

    .clear-icon {
      margin-right: 5px;
      z-index: 999;
    }
  }
}
</style>
