<template>
  <div class="group-set-container">
    <NavBar :title="t('teamTitle')" />
    <div class="group-name-input-container">
      <FormInput :model-value="teamName" :allow-clear="true" :maxlength="maxlength" @input="handleInput" />
      <div class="input-length">{{ inputLengthTips }}</div>
    </div>
    <div :class="getUniPlatform() === 'mp-weixin' ? 'ok-btn-mp' : 'ok-btn'" @tap="handleSave">{{ t('saveText') }}</div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue';
import FormInput from '../../../components/FormInput.vue';

import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from '../../../utils/transformVue';

import { t } from '../../../utils/i18n';
import { getUniPlatform } from '../../../utils';

const maxlength = 15
const teamName = ref<string>()
let teamId = ''


const inputLengthTips = computed(() => {
  return `${teamName.value ? teamName.value?.length : 0}/${maxlength}`
})

const handleSave = () => {
  if (!teamName.value) {
    uni.showToast({
      title: t('teamTitleConfirmText'),
      icon: 'error'
    })
    return
  }
  teamName.value && uni.$UIKitStore.teamStore.updateTeamActive({ teamId, name: teamName.value }).then(() => {
    uni.showToast({
      title: t('updateTeamSuccessText'),
      icon: 'success'
    })
    uni.navigateBack()
  }).catch((err) => {
    switch (err?.code) {
      case 802:
        uni.showToast({
          title: t('noPermission'),
          icon: 'error'
        })
        break;
      default:
        uni.showToast({
          title: t('updateTeamFailedText'),
          icon: 'error'
        })
        break;

    }
  })
}

const handleInput = (value: string) => {
  teamName.value = value ? value.replace(/\s*/g, "") : value
}

onLoad((option) => {
  teamId = option?.id
  const team = uni.$UIKitStore.teamStore.teams.get(teamId)
  teamName.value = team ? team.name.substring(0, 15) : ''
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
  background: #FFFFFF;
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
