<template>
  <div class="wrapper">
    <NavBar :title="t('PersonalPageText')" />
    <div class="userInfo-item-wrapper">
      <div class="userInfo-item" @click="onChangeAvatar">
        <div class="item-left">{{ t('avatarText') }}</div>
        <div class="item-right">
          <Avatar
            :avatar="myUserInfo && myUserInfo.avatar"
            :account="myUserInfo && myUserInfo.accountId"
          ></Avatar>
          <Icon
            :size="15"
            color="#A6ADB6"
            iconClassName="arrow"
            type="icon-jiantou"
          ></Icon>
        </div>
      </div>
      <div class="box-shadow"></div>
      <div
        class="userInfo-item"
        @click="
          () =>
            navigatorToUserItem(
              'name',
              (myUserInfo && myUserInfo.name) ||
                (myUserInfo && myUserInfo.accountId)
            )
        "
      >
        <div class="item-left">{{ t('name') }}</div>
        <div class="item-right">
          <div class="nick">
            {{
              (myUserInfo && myUserInfo.name) ||
              (myUserInfo && myUserInfo.accountId)
            }}
          </div>
          <Icon
            :size="15"
            color="#A6ADB6"
            iconClassName="arrow"
            type="icon-jiantou"
          >
          </Icon>
        </div>
      </div>
      <div class="box-shadow"></div>
      <div class="userInfo-item">
        <div class="item-left">{{ t('accountText') }}</div>
        <div class="item-right">
          {{ myUserInfo && myUserInfo.accountId }}
          <div @click.stop="copyAccount" class="arrow">
            <Icon :size="15" color="#A6ADB6" type="icon-fuzhi1"></Icon>
          </div>
        </div>
      </div>
      <div class="box-shadow"></div>
      <picker
        @change="onChangeGender"
        :value="myUserInfo && myUserInfo.gender === 1 ? 0 : 1"
        :range="[t('man'), t('woman')]"
      >
        <div class="userInfo-item">
          <div class="item-left">{{ t('genderText') }}</div>
          <div class="item-right">
            <view class="uni-input">
              {{
                myUserInfo && myUserInfo.gender === 0
                  ? t('unknow')
                  : myUserInfo && myUserInfo.gender === 1
                  ? t('man')
                  : t('woman')
              }}</view
            >
            <Icon
              :size="15"
              color="#A6ADB6"
              iconClassName="arrow"
              type="icon-jiantou"
            ></Icon>
          </div>
        </div>
      </picker>
      <div class="box-shadow"></div>
      <picker
        mode="date"
        :value="myUserInfo && myUserInfo.birthday"
        @change="onChangeBirthday"
        :start="formatDateRange('start')"
        :end="formatDateRange('end')"
      >
        <div class="userInfo-item">
          <div class="item-left">{{ t('birthText') }}</div>
          <div class="item-right">
            <view class="uni-input">{{
              (myUserInfo && myUserInfo.birthday) || t('unknow')
            }}</view>
            <Icon
              :size="15"
              color="#A6ADB6"
              iconClassName="arrow"
              type="icon-jiantou"
            ></Icon>
          </div>
        </div>
      </picker>
      <div class="box-shadow"></div>
      <div
        class="userInfo-item"
        @click="
          () =>
            navigatorToUserItem(
              'mobile',
              (myUserInfo && myUserInfo.mobile) || ''
            )
        "
      >
        <div class="item-left">{{ t('mobile') }}</div>
        <div class="item-right">
          {{ (myUserInfo && myUserInfo.mobile) || t('unknow')
          }}<Icon
            :size="15"
            color="#A6ADB6"
            iconClassName="arrow"
            type="icon-jiantou"
          ></Icon>
        </div>
      </div>
      <div class="box-shadow"></div>
      <div
        class="userInfo-item"
        @click="
          () =>
            navigatorToUserItem('email', (myUserInfo && myUserInfo.email) || '')
        "
      >
        <div class="item-left">{{ t('email') }}</div>
        <div class="item-right">
          <div class="email">
            {{ (myUserInfo && myUserInfo.email) || t('unknow') }}
          </div>
          <Icon
            :size="15"
            color="#A6ADB6"
            iconClassName="arrow"
            type="icon-jiantou"
          ></Icon>
        </div>
      </div>
    </div>
    <div
      class="signature"
      @click="
        () => navigatorToUserItem('sign', (myUserInfo && myUserInfo.sign) || '')
      "
    >
      <div class="signature-key">{{ t('sign') }}</div>
      <div class="signature-text">
        {{ (myUserInfo && myUserInfo.sign) || t('unknow') }}
      </div>
      <Icon
        :size="15"
        color="#A6ADB6"
        iconClassName="arrow"
        type="icon-jiantou"
      >
      </Icon>
    </div>
  </div>
</template>

<script>
import Avatar from '../../../components/Avatar.vue'
import Icon from '../../../components/Icon.vue'
import NavBar from '../../../components/NavBar.vue'
import { formatDateRange } from '../../../utils/date'
import { t } from '../../../utils/i18n'
import { handleNoPermission } from '../../../utils/permission'
import { autorun } from "../../../utils/store.js"
import { customNavigateTo } from '../../../utils/customNavigate'
import { toRenderSafeData } from '../../../utils'

export default {
  components: {
    Avatar,
    Icon,
    NavBar,
  },
  data() {
    return {
      myUserInfo: null,
      uninstallMyUserInfoWatch: function () {},
    }
  },
  created() {
    this.uninstallMyUserInfoWatch = autorun(() => {
      this.myUserInfo = toRenderSafeData(uni.$UIKitStore.userStore.myUserInfo)
    })
  },
  beforeDestroy() {
    this.uninstallMyUserInfoWatch()
  },
  methods: {
    t,
    formatDateRange,
    navigatorToUserItem(key, value) {
      customNavigateTo({
        url: `/pages/User/detail-item/index?key=${key}&value=${value}`,
      })
    },
    onChangeBirthday(e) {
      const birthday = e.detail.value

      uni.$UIKitStore.userStore
        .updateSelfUserProfileActive({ ...this.myUserInfo, birthday })
        .catch(() => {
          uni.showToast({
            title: t('updateText') + t('birthText') + t('failText'),
            icon: 'error',
          })
        })
    },
    onChangeGender(e) {
      const gender = e.detail.value == 0 ? 1 : 2
      this.myUserInfo.gender = gender

      uni.$UIKitStore.userStore
        .updateSelfUserProfileActive({ ...this.myUserInfo, gender })
        .catch(() => {
          uni.showToast({
            title: t('updateText') + t('genderText') + t('failText'),
            icon: 'error',
          })
        })
    },
    onChangeAvatar() {
      try {
        uni.chooseImage({
          count: 1,
          sizeType: ['original'],
          success: (res) => {
            uni.showLoading({
              title: '',
            })

            uni.$UIKitStore.userStore
              .updateSelfUserProfileActive(
                {
                  ...this.myUserInfo,
                },
                res.tempFilePaths[0]
              )
              .catch(() => {
                uni.showToast({
                  title: t('FailAvatarText'),
                  icon: 'error',
                })
              })
              .finally(() => {
                uni.hideLoading()
              })
          },
          fail: function () {},
          complete: handleNoPermission,
        })
      } catch (error) {
        uni.showToast({
          title: t('FailAvatarText'),
          icon: 'error',
        })
      }
    },
    copyAccount() {
      uni.setClipboardData({
        data: this.myUserInfo?.accountId || '',
        showToast: false,
        success: () => {
          uni.showToast({
            title: t('copySuccessText'),
            icon: 'none',
          })
        },
        fail: () => {
          uni.showToast({
            title: t('copyFailText'),
            icon: 'none',
          })
        },
      })
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
  background-color: rgb(246, 248, 250);
}

.wrapper {
  height: 100vh;
  box-sizing: border-box;
  background-color: rgb(246, 248, 250);

  .userInfo-item-wrapper {
    margin: 10px 15px;
    overflow: hidden;
    border-radius: 5px;

    .userInfo-item {
      display: flex;
      height: 50px;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      background-color: #fff;

      .item-left {
        font-size: 18px;
        flex: 0 0 50px;
      }

      .item-right {
        flex: 1;
        text-align: right;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        color: #a6adb6;
        overflow: hidden;

        .email {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: right;
        }

        .nick {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #a6adb6;
        }

        .arrow {
          margin-left: 15px;
          line-height: 0;
        }
      }
    }

    .box-shadow {
      height: 1px;
      background: none;
      box-shadow: 0 1px 0 rgb(233, 231, 231);
    }
  }

  .signature {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin-top: 20px;
    background-color: #fff;
    margin: 10px 15px;
    border-radius: 5px;
    box-sizing: border-box;

    .signature-key {
      flex: 0 0 80px;
    }

    .signature-text {
      text-align: right;
      font-size: 15px;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #a6adb6;
    }

    .arrow {
      margin-left: 15px;
      flex: 0 0 10px;
      color: #a6adb6;
      font-size: 15px;
    }
  }
}
</style>
