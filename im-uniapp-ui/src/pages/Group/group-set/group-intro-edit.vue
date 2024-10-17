<template>
  <div class="group-set-container">
    <NavBar :title="t('teamIntro')" />
    <div v-if="hasPermission" class="group-intro-input-container">
      <textarea
        class="textarea"
        :value="teamIntro"
        :focus="inputFocus"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        maxlength="100"
      />

      <icon
        v-show="isShowClearIcon"
        class="clear-icon"
        type="clear"
        size="16"
        @tap="clearInput()"
      />
      <div class="input-length">{{ inputLengthTips }}</div>
    </div>

    <div v-else class="group-intro-input-container">
      <textarea disabled class="textarea" :value="teamIntro" auto-height />
    </div>
    <div
      v-if="hasPermission"
      :class="getUniPlatform() === 'mp-weixin' ? 'ok-btn-mp' : 'ok-btn'"
      @tap="handleSave"
    >
      {{ t('saveText') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from '../../../utils/transformVue'
import { t } from '../../../utils/i18n'
import { getUniPlatform } from '../../../utils'
let hasPermission = ref<boolean>(false)

const teamIntro = ref<string>()
const inputFocus = ref(false)
let teamId = ''

const isShowClearIcon = computed(() => {
  if (teamIntro.value && teamIntro.value.length > 0) return true
  return false
})
const inputLengthTips = computed(() => {
  return `${teamIntro.value ? teamIntro.value?.length : 0}/${100}`
})

const clearInput = () => {
  inputFocus.value = true
  teamIntro.value = ''
}
// 保存群介绍
const handleSave = () => {
  uni.$UIKitStore.teamStore
    .updateTeamActive({
      teamId,
      info: {
        intro: teamIntro.value,
      },
    })
    .then(() => {
      uni.showToast({
        title: t('updateTeamSuccessText'),
        icon: 'success',
      })
      uni.navigateBack()
    })
    .catch((err: any) => {
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
}

const handleInput = (e: any) => {
  const value = e.detail.value
  teamIntro.value = value
  inputFocus.value = true
}
const handleBlur = () => {
  inputFocus.value = false
}
const handleFocus = () => {
  inputFocus.value = true
}

onLoad((option) => {
  teamId = option?.id
  const myAccount = uni.$UIKitStore.userStore.myUserInfo.accountId
  const team = uni.$UIKitStore.teamStore.teams.get(teamId)
  const updateInfoMode = team?.updateInfoMode
  teamIntro.value = team?.intro ? team.intro.substring(0, 100) : ''

  const myTeamMember = uni.$UIKitStore.teamMemberStore.getTeamMember(teamId, [
    myAccount,
  ])[0]
  // updateInfoMode 为 0 表示只有管理员和群主可以修改群信息；updateInfoMode 为 1 表示任何人都可以修改群信息
  if (
    (updateInfoMode === 0 && myTeamMember.memberRole !== 0) ||
    updateInfoMode === 1
  ) {
    hasPermission.value = true
  }
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

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

.group-intro-input-container {
  background: #ffffff;
  border-radius: 8px;
  padding: 16px 16px 45px 16px;
  position: relative;
  margin: 10px 20px;
  .textarea {
    width: 100%;
  }
  .clear-icon {
    position: absolute;
    right: 25px;
    bottom: 27px;
  }
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
