<template>
  <div class="group-set-container">
    <NavBar :title="$t('teamTitle')">
      <template v-slot:left>
        <Icon @click="back" type="icon-zuojiantou"></Icon>
      </template>
      <template v-slot:right>
        <div @click="handleSave">{{ $t('saveText') }}</div>
      </template>
    </NavBar>
    <div class="group-name-input-container">
      <Input :model-value="teamName" :allow-clear="true" :maxlength="maxlength" @input="handleInput" />
      <div class="input-length">{{ inputLengthTips }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue';
import Input from '../../../components/FormInput.vue';
import Icon from '../../../components/Icon.vue';

import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from 'vue';
import { autorun } from 'mobx';

import { t } from '../../../utils/i18n';

const maxlength = 15
const store = uni.$UIKitStore
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
  teamName.value && store.teamStore.updateTeamActive({ teamId, name: teamName.value }).then(() => {
    uni.showToast({
      title: t('updateTeamSuccessText'),
      icon: 'success'
    })
    uni.navigateBack()
  }).catch(() => {
    uni.showToast({
      title: t('updateTeamFailedText'),
      icon: 'error'
    })
  })
}

const handleInput = (value: string) => {
  teamName.value = value ? value.replace(/\s*/g, "") : value
}

onLoad((option) => {
  teamId = option?.id
  const team = store.teamStore.teams.get(teamId)
  teamName.value = team ? team.name.substring(0, 15) : ''
})

const back = () => {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100%;
  overflow: hidden;
}

.group-set-container {
  height: 100%;
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
