<template>
  <div class="wrapper">
    <NavBar :title="t('nickInTeam')">
      <template v-slot:left>
        <div class="nav-bar-text" @tap="back">{{ t('cancelText') }}</div>
      </template>
    </NavBar>
    <div class="userInfo-item-wrapper">
      <input
        class="input"
        :confirm-type="t('okText')"
        @focus="onInputFocus"
        :maxlength="15"
        @input="onInputChange"
        :value="inputValue"
        :placeholder="t('nickInTeam')"
      />
      <div @tap="clearInputValue">
        <Icon
          v-show="showClearIcon"
          iconClassName="clear-icon"
          type="icon-shandiao"
        ></Icon>
      </div>
    </div>
    <div class="ok-btn" @tap="onOk">
      {{ t('okText') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { autorun } from 'mobx'
import { onUnmounted, ref } from '../../../utils/transformVue'
import Icon from '../../../components/Icon.vue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { V2NIMTeamMember } from 'nim-web-sdk-ng/dist/esm/nim/src/V2NIMTeamService'
const inputValue = ref('')
const showClearIcon = ref(false)
const myMemberInfo = ref<V2NIMTeamMember>()
let teamId = ''
let uninstallTeamMemberWatch = () => {}

onLoad((option) => {
  teamId = option ? option.id : ''
  uninstallTeamMemberWatch = autorun(() => {
    myMemberInfo.value = uni.$UIKitStore.teamMemberStore.getTeamMember(teamId, [
      uni.$UIKitStore.userStore.myUserInfo.accountId,
    ])[0]

    inputValue.value = myMemberInfo.value?.teamNick || ''
  })
})

const onInputChange = (e: any) => {
  inputValue.value = e.detail.value
}

const onInputFocus = () => {
  showClearIcon.value = true
}

const clearInputValue = () => {
  inputValue.value = ''
}

const onOk = () => {
  uni.$UIKitStore.teamMemberStore
    .updateMyMemberInfoActive({
      teamId,
      memberInfo: {
        teamNick: inputValue.value.trim(),
      },
    })
    .then(() => {
      back()
    })
    .catch((err: any) => {
      uni.showToast({
        title: t('saveFailedText'),
        icon: 'error',
      })
    })
}

const back = () => {
  uni.navigateBack({
    delta: 1,
  })
}

onUnmounted(() => {
  uninstallTeamMemberWatch()
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

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
