<template>
  <div class="black-list-container">
    <NavBar :title="t('blacklistText')" />
    <div class="black-list-content">
      <div class="black-list-subtitle">{{ t('blacklistSubTitle') }}</div>
      <Empty v-if="blacklist.length === 0" :text="t('blacklistEmptyText')" />
      <div v-else class="black-item" v-for="item in blacklist" :key="item">
        <div class="item-left">
          <Avatar :account="item" :gotoUserCard="true" />
          <Appellation class="black-name" :account="item" />
        </div>
        <div class="black-button" @click="() => handleClick(item)">
          {{ t('removeBlacklist') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { autorun } from 'mobx'
import { onUnmounted, ref } from '../../../utils/transformVue'
// @ts-ignore
import Empty from '../../../components/Empty.vue'
import Avatar from '../../../components/Avatar.vue'
import Appellation from '../../../components/Appellation.vue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { deepClone } from '../../../utils'

const blacklist = ref<string[]>([])

// 移除黑名单
const handleClick = async (account: string) => {
  try {
    // @ts-ignore
    // 通过isAdd来判断是添加还是移除黑名单
    await uni.$UIKitStore.relationStore.setBlackActive({
      account,
      isAdd: false,
    })
    uni.showToast({
      title: t('removeBlackSuccessText'),
      icon: 'success',
    })
  } catch (error) {
    uni.showToast({
      title: t('removeBlackFailText'),
      icon: 'error',
    })
  }
}

const uninstallBlacklistWatch = autorun(() => {
  // @ts-ignore
  blacklist.value = deepClone(uni.$UIKitStore.relationStore.blacklist)
})

const uninstallUsersWatch = autorun(() => {
  // 加一个监听
  // @ts-ignore
  console.log('users: ', uni.$UIKitStore.userStore.users)
})

onUnmounted(() => {
  uninstallBlacklistWatch()
  uninstallUsersWatch()
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.black-list-container {
  height: 100vh;
  box-sizing: border-box;
}

.black-list-subtitle {
  color: #b3b7bc;
  font-size: 14px;
  padding: 10px 20px;
  text-align: center;
}

.black-list-content {
  height: calc(100% - 60px - var(--status-bar-height));
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

.black-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 20px;
}

.item-left {
  display: flex;
  align-items: center;
  width: 70%;
}

.black-name {
  margin-left: 10px;
  font-size: 16px;
  padding-right: 20px;
  color: #333333;
  overflow: hidden; //超出的文本隐藏
  text-overflow: ellipsis; //溢出用省略号显示
  white-space: nowrap; //溢出不换行
}

.black-button {
  margin: 0;
  width: 60px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  color: #337eef;
  border: 1px solid #337eef;
  text-align: center;
  border-radius: 3px;
}
</style>
