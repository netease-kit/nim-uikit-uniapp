<template>
  <div class="group-set-container">
    <NavBar :title="t('remarkText')" />
    <div class="group-name-input-container">
      <FormInput
        :model-value="alias"
        :allow-clear="true"
        :maxlength="15"
        @input="handleInput"
      />
      <div class="input-length">{{ inputLengthTips }}</div>
    </div>
    <div class="ok-btn" @tap="handleSave">
      {{ t('saveText') }}
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import FormInput from '../../components/FormInput.vue'
import { t } from '../../utils/i18n'

export default {
  components: {
    NavBar,
    FormInput,
  },
  data() {
    return {
      alias: '',
      accountId: '',
    }
  },
  computed: {
    inputLengthTips() {
      return `${this.alias ? this.alias.length : 0}/${15}`
    },
  },
  onLoad(option) {
    this.accountId = option ? option.id || '' : ''
    const friend = uni.$UIKitStore.friendStore.friends.get(this.accountId)
    this.alias = friend ? friend.alias : ''
  },
  methods: {
    t,
    handleSave() {
      if (this.alias === null) {
        this.alias = ''
      }
      if (this.alias && !this.alias.trim()) {
        uni.showToast({
          title: t('aliasConfirmText'),
          icon: 'error',
        })
        return
      }

      uni.$UIKitStore.friendStore
        .setFriendInfoActive(this.accountId, {
          alias: this.alias,
        })
        .then(() => {
          uni.showToast({
            title: t('updateTeamSuccessText'),
            icon: 'none',
          })
          uni.navigateBack({})
        })
        .catch(() => {
          uni.showToast({
            title: t('updateTeamFailedText'),
            icon: 'error',
          })
        })
    },
    handleInput(value) {
      this.alias = value
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.group-set-container {
  height: 100vh;
  box-sizing: border-box;
  background-color: #eff1f4;
}

.group-name-input-container {
  background: #ffffff;
  border-radius: 8px;
  padding: 0 16px 5px;
  position: relative;
  margin: 10px 20px;

  .input-length {
    position: absolute;
    right: 25px;
    bottom: 5px;
    font-size: 12px;
    color: #999999;
  }

  ::v-deep.form-input-item {
    border: none;
  }
}
</style>
