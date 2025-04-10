<template>
  <div class="group-set-container">
    <NavBar :title="t('teamTitle')" />
    <div v-if="hasPermission" class="group-name-input-container">
      <FormInput
        :model-value="teamName"
        :allow-clear="true"
        :maxlength="30"
        @input="handleInput"
      />
      <div class="input-length">{{ inputLengthTips }}</div>
    </div>
    <div v-else class="group-name-input-container">
      <input class="input" :value="teamName" />
    </div>
    <div v-if="hasPermission" class="ok-btn" @tap="handleSave">
      {{ t('saveText') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue'
import FormInput from '../../../components/FormInput.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from '../../../utils/transformVue'
import { t } from '../../../utils/i18n'

let hasPermission = ref<boolean>(false)

const teamName = ref<string>()
let teamId = ''

const inputLengthTips = computed(() => {
  return `${teamName.value ? teamName.value?.length : 0}/${30}`
})

// 保存群名称
const handleSave = () => {
  if (!teamName.value) {
    uni.showToast({
      title: t('teamTitleConfirmText'),
      icon: 'error',
    })
    return
  }

  teamName.value &&
    uni.$UIKitStore.teamStore
      .updateTeamActive({
        teamId,
        info: {
          name: teamName.value,
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

const handleInput = (value: string) => {
  teamName.value = value ? value.replace(/\s*/g, '') : value
}

onLoad((option) => {
  const myAccount = uni.$UIKitStore.userStore.myUserInfo.accountId
  teamId = option?.id

  const myTeamMember = uni.$UIKitStore.teamMemberStore.getTeamMember(teamId, [
    myAccount,
  ])[0]
  const team = uni.$UIKitStore.teamStore.teams.get(teamId)
  const updateInfoMode = team?.updateInfoMode
  teamName.value = team ? team.name.substring(0, 30) : ''
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
  .input {
    padding: 10px 10px 5px 0px;
    height: 30px;
  }

  ::v-deep.form-input-item {
    border: none;
  }
}
</style>
