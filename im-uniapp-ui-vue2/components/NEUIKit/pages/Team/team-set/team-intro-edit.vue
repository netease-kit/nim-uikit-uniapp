<template>
  <div class="team-set-container">
    <NavBar :title="t('teamIntro')" />
    <div v-if="hasPermission" class="group-intro-input-container">
      <FormInput
        :model-value="teamIntro"
        :allow-clear="true"
        :maxlength="100"
        @input="handleInput"
        @clear="clearInput"
      />
      <div class="input-length">{{ inputLengthTips }}</div>
    </div>
    <div v-else class="group-intro-input-container">
      <div class="input">{{ teamIntro }}</div>
    </div>
    <div v-if="hasPermission" class="ok-btn" @tap="handleSave">
      {{ t('saveText') }}
    </div>
  </div>
</template>

<script>
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import FormInput from '../../../components/FormInput.vue'

export default {
  components: {
    NavBar,
    FormInput,
  },
  data() {
    return {
      hasPermission: false,
      teamIntro: '',
      teamId: '',
    }
  },
  computed: {
    inputLengthTips() {
      return `${this.teamIntro ? this.teamIntro.length : 0}/${100}`
    },
  },
  onLoad(option) {
    this.teamId = option ? option.id || '' : ''
    const myAccount = uni.$UIKitStore.userStore.myUserInfo.accountId
    const team = uni.$UIKitStore.teamStore.teams.get(this.teamId)
    const updateInfoMode = team?.updateInfoMode
    this.teamIntro = team?.intro ? team.intro.substring(0, 100) : ''

    const myTeamMember = uni.$UIKitStore.teamMemberStore.getTeamMember(this.teamId, [
      myAccount,
    ])[0]
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
      uni.$UIKitStore.teamStore
        .updateTeamActive({
          teamId: this.teamId,
          info: {
            intro: this.teamIntro,
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
      this.teamIntro = value
    },
    clearInput() {
      this.teamIntro = ''
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

.group-intro-input-container {
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
