<template>
  <div class="wrapper">
    <NavBar :title="t(key)">
      <template v-slot:left>
        <div class="nav-bar-text" @tap="back">{{ t('cancelText') }}</div>
      </template>
    </NavBar>
    <div class="userInfo-item-wrapper">
      <input
        class="input"
        :confirm-type="t('okText')"
        @focus="onInputFocus"
        :maxlength="maxlengthMap[key]"
        @input="onInputChange"
        :value="inputValue"
      />
      <div @tap="clearInputValue">
        <Icon
          v-show="showClearIcon"
          iconClassName="clear-icon"
          type="icon-shandiao"
        ></Icon>
      </div>
    </div>
    <div class="ok-btn" @tap="onUserInfoConfirm">
      {{ t('okText') }}
    </div>
  </div>
</template>

<script>
import { autorun } from "../../../utils/store.js"
import Icon from '../../../components/Icon.vue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { toRenderSafeData } from '../../../utils'

export default {
  components: {
    Icon,
    NavBar,
  },
  data() {
    return {
      key: '',
      inputValue: '',
      showClearIcon: false,
      myUserInfo: null,
      maxlengthMap: {
        name: 15,
        mobile: 11,
        sign: 50,
        email: 30,
      },
      myUserInfoWatch: function () {},
    }
  },
  onLoad(props) {
    this.key = props?.key || ''

    this.myUserInfoWatch = autorun(() => {
      this.myUserInfo = toRenderSafeData(uni.$UIKitStore.userStore.myUserInfo)

      if (this.key) {
        const value = this.myUserInfo ? this.myUserInfo[this.key] : ''
        this.inputValue = value || ''
        if (this.key === 'name' && !value) {
          this.inputValue = this.myUserInfo?.accountId || ''
        }
      }
    })
  },
  beforeDestroy() {
    this.myUserInfoWatch()
  },
  methods: {
    t,
    onInputChange(e) {
      this.inputValue = e.detail.value
    },
    onInputFocus() {
      this.showClearIcon = true
    },
    clearInputValue() {
      this.inputValue = ''
    },
    onUserInfoConfirm() {
      const value = this.inputValue
      if (
        this.key == 'mobile' &&
        !/^\d+(\.\d+)?$/.test(value) &&
        value.trim() !== ''
      ) {
        uni.showToast({
          title: t('telErrorText'),
          icon: 'error',
        })
        return
      }
      if (
        this.key == 'email' &&
        !/[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/.test(
          value
        ) &&
        value.trim() !== ''
      ) {
        uni.showToast({
          title: t('emailErrorText'),
          icon: 'error',
        })
        return
      }
      this.inputValue = value

      if (this.key) {
        uni.$UIKitStore.userStore
          .updateSelfUserProfileActive({ ...this.myUserInfo, [this.key]: value })
          .then(() => {
            uni.navigateBack({})
          })
          .catch(() => {
            uni.showToast({
              title: t('saveText') + t(this.key || '') + t('failText'),
              icon: 'error',
            })
          })
      }
    },
    back() {
      uni.navigateBack({
        delta: 1,
      })
    },
  },
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
