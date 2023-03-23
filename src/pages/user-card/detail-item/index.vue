<template>
  <div class="wrapper">
    <NavBar :title="$t(key)">
      <template v-slot:left>
        <div class="nav-bar-text" @click="back">{{ $t('cancelText') }}</div>
        </template>
        <template v-slot:right>
          <div class="nav-bar-text" @click="userInfoConfirm">{{ $t('okText') }}</div>
        </template>
    </NavBar>
    <div class="userInfo-item-wrapper">
      <input class="input" :confirm-type="$t('okText')" @focus="() => { showClearIcon = true }" :maxlength="maxlength[key]" @input="onInputChange"
        :value="inputValue" />
      <Icon @click="() => inputValue = ''" v-show="showClearIcon" class="clear-icon"
        type="icon-shandiao"></Icon>
    </div>
  </div>
</template>
        
<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { autorun } from 'mobx';
import { ref } from 'vue';
import Icon from '../../../components/Icon.vue';
import NavBar from '../../../components/NavBar.vue';
import { t } from '../../../utils/i18n';

const key = ref('')
const inputValue = ref('')
const showClearIcon = ref(false)
const store = uni.$UIKitStore.userStore
let myUserInfo = {}
const maxlength = {
  nick: 15,
  tel: 11,
  signature: 50,
  email: 30
}

onLoad((props) => {
  inputValue.value = props?.value 
  key.value = props?.key
})

autorun(() => {
  myUserInfo = store.myUserInfo
})

const onInputChange = (e: Event) => {
  //@ts-ignore
  inputValue.value = e.detail.value
}

const userInfoConfirm = () => {
  const _value = inputValue.value
  if (key.value == 'tel' && !(/^\d+(\.\d+)?$/.test(_value)) &&  _value.trim() !== '') {
    uni.showToast({
      title: t('telErrorText'),
      icon: "error"
    })
    return
  }
  if (key.value == 'email' && !/[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/.test(_value) &&  _value.trim() !== '') {
    uni.showToast({
      title: t('emailErrorText'),
      icon: "error"
    })
    return
  }
  inputValue.value = _value
  store.saveMyUserInfoActive({ ...myUserInfo,[key.value]: _value }).then(() => {
    uni.navigateBack({})
  }).catch((error) => {
    uni.showToast({
      title: t('saveText')+t(key.value)+t('failText'),
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
  background-color: rgb(245, 246, 247);
}
.wrapper{
  width: 100%;
  height: 100%;
  background-color: rgb(245, 246, 247);
  .nav-bar-text{
  color: rgb(20, 146, 209);
}
.userInfo-item-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  margin:  15px;
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
      