<template>
  <div>
    <div class="card-wrapper" @tap="gotoMyDetail">
      <UserCard
        :account="myUserInfo && myUserInfo.accountId"
        :nick="myUserInfo && myUserInfo.name"
      ></UserCard>
      <Icon iconClassName="arrow" type="icon-jiantou"></Icon>
    </div>
    <div class="box-shadow"></div>
    <div class="userInfo-item-wrapper">
      <div class="userInfo-item" @click="gotoSetting">
        <div class="item-left">
          <Icon iconClassName="guanyu" type="icon-shezhi1"></Icon>
          {{ t('setText') }}
        </div>
        <Icon iconClassName="icon-arrow" type="icon-jiantou"></Icon>
      </div>
      <div class="shadow"></div>
      <div class="userInfo-item" @click="gotoCollection">
        <div class="item-left">
          <Icon iconClassName="guanyu" type="blue-collection"></Icon>
          {{ t('collectionText') }}
        </div>
        <Icon iconClassName="icon-arrow" type="icon-jiantou"></Icon>
      </div>
      <div class="shadow"></div>
      <div class="userInfo-item" @click="gotoAbout">
        <div class="item-left">
          <Icon iconClassName="guanyu" type="icon-guanyu"></Icon>
          {{ t('commsEaseText') }}
        </div>
        <Icon iconClassName="icon-arrow" type="icon-jiantou"></Icon>
      </div>
    </div>
  </div>
</template>

<script>
import UserCard from '../../../components/UserCard.vue'
import Icon from '../../../components/Icon.vue'
import { autorun } from "../../../utils/store.js"
import { setContactTabUnread, setTabUnread } from '../../../utils/msg'
import { customNavigateTo } from '../../../utils/customNavigate'
import { t } from '../../../utils/i18n'
import { toRenderSafeData } from '../../../utils'

export default {
  components: {
    UserCard,
    Icon,
  },
  data() {
    return {
      myUserInfo: null,
      uninstallMyUserInfoWatch: function () {},
    }
  },
  created() {
    this.uninstallMyUserInfoWatch = autorun(() => {
      this.myUserInfo = toRenderSafeData(uni.$UIKitStore?.userStore?.myUserInfo)
    })
  },
  onLoad() {
    this.myUserInfo = toRenderSafeData(uni.$UIKitStore?.userStore?.myUserInfo)
  },
  onShow() {
    setTabUnread()
    setContactTabUnread()
  },
  beforeDestroy() {
    this.uninstallMyUserInfoWatch()
  },
  methods: {
    t,
    gotoSetting() {
      customNavigateTo({
        url: '/pages/User/my/setting',
      })
    },
    gotoAbout() {
      customNavigateTo({
        url: '/pages/User/my/about',
      })
    },
    gotoCollection() {
      customNavigateTo({
        url: '/pages/User/my/collection-list',
      })
    },
    gotoMyDetail() {
      customNavigateTo({
        url: `/pages/User/my-detail/index?account=${
          (this.myUserInfo && this.myUserInfo.accountId) || ''
        }`,
      })
    },
  },
}
</script>

<style lang="scss">
@import '../../styles/common.scss';

page {
  padding-top: var(--status-bar-height);
  height: 100vh;
  overflow: hidden;
}

.card-wrapper {
  background-color: rgb(255, 253, 253);
  // #ifdef MP
  padding-top: calc(var(--status-bar-height) + var(--status-bar-height));
  // #endif
  // #ifndef MP
  padding-top: var(--status-bar-height);
  // #endif
  padding-right: 10px;
  position: relative;

  .arrow {
    position: absolute;
    right: 10px;
    top: calc(50% - 8px);
  }
}

.box-shadow {
  height: 5px;
  background: none;
  box-shadow: 0 5px 0 rgb(245, 246, 247);
}

.avatar-wrapper {
  background-color: #fff;
  display: flex;
  height: 140px;
  align-items: center;

  .nick {
    font-size: 20px;
  }

  .account {
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #a6adb6;
  }

  .copy-icon {
    color: #a6adb6;
    font-family: iconfont;
    background-size: 100% 100%;
    width: 60rpx;
    height: 60rpx;
    font-size: 40rpx;
    padding-left: 15rpx;
    display: inline-block;
  }
}

.userInfo-item-wrapper {
  background-color: #fff;
  margin-top: 8px;

  .userInfo-item {
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 20px;

    .item-left {
      font-size: 16px;
      display: flex;
      align-items: center;

      .guanyu {
        margin-right: 5px;
      }
    }
  }

  .shadow {
    height: 1px;
    background: none;
    box-shadow: 0 1px 0 rgb(245, 246, 247);
  }
}

.icon-arrow {
  font-size: 16px;
}
</style>
