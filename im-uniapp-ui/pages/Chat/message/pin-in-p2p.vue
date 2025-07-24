<template>
  <div :class="`wrapper ${pinInfos.length === 0 ? 'bg-white' : ''}`">
    <NavBar :title="t('pinText')">
      <template v-slot:left>
        <div class="nav-bar-text" @tap="back">{{ t('pinText') }}</div>
      </template>
    </NavBar>
    <div class="pinCard-item-wrapper">
      <Empty v-if="pinInfos.length === 0" :text="t('noPinListText')" />

      <div
        v-else
        v-for="(item, index) in pinInfos"
        :key="item.message.messageClientId"
      >
        <PinCard
          :msg="item.message"
          :index="index"
          :key="item.message.messageClientId"
          :handleUnPinMsg="handleUnPinMsg(item.message)"
        >
        </PinCard>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app'
import { autorun } from 'mobx'
import { onUnmounted, ref } from '../../../utils/transformVue'
import Icon from '../../../components/Icon.vue'
import NavBar from '../../../components/NavBar.vue'
import PinCard from '../../../components/PinCard.vue'
import { t } from '../../../utils/i18n'
import { getUniPlatform } from '../../../utils'
import { deepClone } from '../../../utils'
import { V2NIMTeamMember } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMTeamService'
import Empty from '../../../components/Empty.vue'
const inputValue = ref('')
const showClearIcon = ref(false)
const myMemberInfo = ref<V2NIMTeamMember>()
let teamId = ''
let conversationId = ''
let pinInfos = ref([])
let uninstallTeamMemberWatch = () => {}

onLoad((option) => {
  conversationId = option?.conversationId
  getPinnedMessageList()
})
const getPinnedMessageList = () => {
  uni.$UIKitStore.msgStore
    .getPinnedMessageListActive(conversationId)
    .then((data) => {
      pinInfos.value = data
    })
}

const handleUnPinMsg = (msg) => {
  return () => {
    // 不用进行 catch 处理，因为 store 里面的 pin 相关方法处理过了，并且会将错误日志输出到控制台
    return uni.$UIKitStore.msgStore
      .unpinMessageActive(msg)
      .then(() => {
        return getPinnedMessageList()
      })
      .catch(() => {
        uni.showToast({
          title: t('unpinFailedText'),
          icon: 'none',
          duration: 1000,
        })
      })
  }
}

onUnmounted(() => {
  uninstallTeamMemberWatch()
})
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
}
.bg-white {
  background: #fff;
}
</style>
