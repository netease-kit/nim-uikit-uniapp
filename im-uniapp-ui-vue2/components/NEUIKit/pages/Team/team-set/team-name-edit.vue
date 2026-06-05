<template>
  <div class="team-set-container">
    <NavBar :title="t('updateNameText')" />
    <div v-if="hasPermission" class="team-name-input-container">
      <FormInput
        :model-value="teamName"
        :allow-clear="true"
        :maxlength="30"
        @input="handleInput"
      />
      <div class="input-length">{{ inputLengthTips }}</div>
    </div>
    <div v-else class="team-name-input-container">
      <input class="input" :value="teamName" />
    </div>
    <div v-if="hasPermission" class="ok-btn" @tap="handleSave">
      {{ t('saveText') }}
    </div>
  </div>
</template>

<script>
import NavBar from '../../../components/NavBar.vue'
import FormInput from '../../../components/FormInput.vue'
import { t } from '../../../utils/i18n'

export default {
  components: {
    NavBar,
    FormInput,
  },
  data() {
    return {
      hasPermission: false,
      teamName: '',
      teamId: '',
    }
  },
  computed: {
    inputLengthTips() {
      return `${this.teamName ? this.teamName.length : 0}/${30}`
    },
  },
  onLoad(option) {
    const myAccount = uni.$UIKitStore.userStore.myUserInfo.accountId
    this.teamId = option ? option.id || '' : ''

    const myTeamMember = uni.$UIKitStore.teamMemberStore.getTeamMember(this.teamId, [
      myAccount,
    ])[0]
    const team = uni.$UIKitStore.teamStore.teams.get(this.teamId)
    const updateInfoMode = team?.updateInfoMode
    this.teamName = team ? team.name.substring(0, 30) : ''
    if (
      (updateInfoMode === 0 && myTeamMember.memberRole !== 0) ||
      updateInfoMode === 1
    ) {
      this.hasPermission = true
    }
  },
  methods: {
    t,
    handleSave() {
      if (!this.teamName) {
        uni.showToast({
          title: t('teamTitleConfirmText'),
          icon: 'error',
        })
        return
      }

      uni.$UIKitStore.teamStore
        .updateTeamActive({
          teamId: this.teamId,
          info: {
            name: this.teamName,
          },
        })
        .then(() => {
          uni.showToast({
            title: t('updateTeamSuccessText'),
            icon: 'none',
          })
          uni.navigateBack()
        })
        .catch((err) => {
          switch (err?.code) {
            case 109432:
              uni.showToast({
                title: t('noPermission'),
                icon: 'error',
              })
              break
            default:
              uni.showToast({
                title: t('updateTeamFailedText'),
                icon: 'error',
              })
              break
          }
        })
    },
    handleInput(value) {
      this.teamName = value ? value.replace(/\s*/g, '') : value
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.team-set-container {
  height: 100vh;
  box-sizing: border-box;
  background-color: #eff1f4;
}

.team-name-input-container {
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
  .input {
    padding: 10px 10px 5px 0px;
    height: 30px;
  }

  ::v-deep.form-input-item {
    border: none;
  }
}
</style>
