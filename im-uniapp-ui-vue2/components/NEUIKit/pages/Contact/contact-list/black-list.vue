<template>
  <div class="black-list-container">
    <NavBar :title="t('blacklistText')" />
    <div class="black-list-content">
      <div class="black-list-subtitle">{{ t('blacklistSubTitle') }}</div>
      <Empty v-if="blacklist.length === 0" :text="t('blacklistEmptyText')" />
      <div v-else class="black-item" v-for="account in blacklist" :key="account">
        <div class="item-left">
          <Avatar :account="account" :gotoUserCard="true" />
          <Appellation class="black-name" :account="account" />
        </div>
        <div class="black-button" @click="handleClick(account)">
          {{ t('removeBlacklist') }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/** 通讯录 黑名单列表组件 */
import { autorun } from "../../../utils/store.js"
import Empty from '../../../components/Empty.vue'
import Avatar from '../../../components/Avatar.vue'
import Appellation from '../../../components/Appellation.vue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'

export default {
  components: {
    Empty,
    Avatar,
    Appellation,
    NavBar,
  },
  data() {
    return {
      blacklist: [],
      blacklistWatch: function () {},
    }
  },
  created() {
    this.blacklistWatch = autorun(() => {
      const blacklist = uni.$UIKitStore.relationStore.blacklist || []
      this.blacklist = [...blacklist]
    })
  },
  beforeDestroy() {
    this.blacklistWatch()
  },
  methods: {
    t,
    async handleClick(account) {
      try {
        await uni.$UIKitStore.relationStore.removeUserFromBlockListActive(account)
        uni.showToast({
          title: t('removeBlackSuccessText'),
          icon: 'none',
        })
      } catch (error) {
        uni.showToast({
          title: t('removeBlackFailText'),
          icon: 'error',
        })
      }
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
