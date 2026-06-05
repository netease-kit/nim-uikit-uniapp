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
      inputValue: '',
      showClearIcon: false,
      myMemberInfo: undefined,
      teamId: '',
      teamMembersWatch: function () {},
    }
  },
  onLoad(option) {
    this.teamId = option ? option.id || '' : ''
    this.teamMembersWatch = autorun(() => {
      this.myMemberInfo = toRenderSafeData(uni.$UIKitStore.teamMemberStore.getTeamMember(this.teamId, [
        uni.$UIKitStore.userStore.myUserInfo.accountId,
      ])[0])

      this.inputValue = this.myMemberInfo?.teamNick || ''
    })
  },
  beforeDestroy() {
    this.teamMembersWatch()
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
    onOk() {
      uni.$UIKitStore.teamMemberStore
        .updateMyMemberInfoActive({
          teamId: this.teamId,
          memberInfo: {
            teamNick: this.inputValue.trim(),
          },
        })
        .then(() => {
          this.back()
        })
        .catch(() => {
          uni.showToast({
            title: t('saveFailedText'),
            icon: 'error',
          })
        })
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
