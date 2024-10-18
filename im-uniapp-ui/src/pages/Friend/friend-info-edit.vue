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
    <div
      :class="getUniPlatform() === 'mp-weixin' ? 'ok-btn-mp' : 'ok-btn'"
      @tap="handleSave"
    >
      {{ t('saveText') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../components/NavBar.vue'
import FormInput from '../../components/FormInput.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref, computed } from '../../utils/transformVue'
import { t } from '../../utils/i18n'
import { getUniPlatform } from '../../utils'
import { customNavigateTo } from '../../utils/customNavigate'

const alias = ref<string>()
let accountId = ''

const inputLengthTips = computed(() => {
  return `${alias.value ? alias.value?.length : 0}/${15}`
})

// 保存备注名称
const handleSave = () => {
  // alias.value 为 null 和空字符串表示删除备注，在此对 alias.value 为 null 的转换成空字符串，否则 sdk 会报错
  console.log(alias.value)
  if (alias.value === null) {
    alias.value = ''
  }
  // 不允许全是空格
  if (alias.value && !alias.value.trim()) {
    uni.showToast({
      title: t('aliasConfirmText'),
      icon: 'error',
    })
    return
  }

  uni.$UIKitStore.friendStore
    .setFriendInfoActive(accountId, {
      alias: alias.value,
    })
    .then(() => {
      uni.showToast({
        title: t('updateTeamSuccessText'),
        icon: 'success',
      })
      uni.navigateBack({})
    })
    .catch((err: any) => {
      uni.showToast({
        title: t('updateTeamFailedText'),
        icon: 'error',
      })
    })
}

const handleInput = (value: string) => {
  alias.value = value
}

onLoad((option) => {
  accountId = option?.id
  const friend = uni.$UIKitStore.friendStore.friends.get(accountId)

  alias.value = friend ? friend.alias : ''
})
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
