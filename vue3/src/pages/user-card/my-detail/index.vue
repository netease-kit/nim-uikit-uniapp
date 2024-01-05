<template>
  <div class="wrapper">
    <NavBar :title="$t('PersonalPageText')" />
    <div class="userInfo-item-wrapper">
      <div class="userInfo-item" @click="onChangeAvatar">
        <div class="item-left">{{ $t('avatarText') }}</div>
        <div class="item-right">
          <Avatar :avatar="myUserInfo?.avatar" :account="myUserInfo?.account"></Avatar>
          <Icon :size="15" color="#A6ADB6" class="arrow" type="icon-jiantou"></Icon>
        </div>
      </div>
      <div class="box-shadow"></div>
      <div class="userInfo-item" @click="() => navigatorToUserItem('nick', myUserInfo?.nick || myUserInfo?.account)">
        <div class="item-left">{{ $t('nick') }}</div>
        <div class="item-right">
          <div class="nick">
            {{ myUserInfo?.nick || myUserInfo?.account }}
          </div>
          <Icon :size="15" color="#A6ADB6" class="arrow" type="icon-jiantou">
          </Icon>
        </div>
      </div>
      <div class="box-shadow"></div>
      <div class="userInfo-item">
        <div class="item-left">{{ $t('accountText') }}</div>
        <div class="item-right">{{ myUserInfo?.account }} <div @click.stop="copyAccount" class="arrow">
            <Icon :size="15" color="#A6ADB6" type="icon-fuzhi1"></Icon>
          </div>
        </div>
      </div>
      <div class="box-shadow"></div>
      <picker @change="onChangeGender" :value="myUserInfo?.gender == 'male' ? 0 : 1" :range="[$t('man'), $t('woman')]">
        <div class="userInfo-item">
          <div class="item-left">{{ $t('genderText') }}</div>
          <div class="item-right">
            <view class="uni-input"> {{ myUserInfo?.gender === "unknown" ? $t('unknow') : myUserInfo?.gender === 'male' ?
              $t('man') : $t('woman') }}</view>
            <Icon :size="15" color="#A6ADB6" class="arrow" type="icon-jiantou"></Icon>
          </div>
        </div>
      </picker>
      <div class="box-shadow"></div>
      <picker mode="date" :value="myUserInfo?.birth" @change="onChangebirth" :start="formatDateRange('start')"
        :end="formatDateRange('end')">
        <div class="userInfo-item">
          <div class="item-left">{{ $t('birthText') }}</div>
          <div class="item-right">
            <view class="uni-input">{{ myUserInfo?.birth || $t('unknow') }}</view>
            <Icon :size="15" color="#A6ADB6" class="arrow" type="icon-jiantou"></Icon>
          </div>
        </div>
      </picker>
      <div class="box-shadow"></div>
      <div class="userInfo-item" @click="() => navigatorToUserItem('tel', myUserInfo?.tel || '')">
        <div class="item-left">{{ $t('tel') }}</div>
        <div class="item-right">{{ myUserInfo?.tel || $t('unknow') }}<Icon :size="15" color="#A6ADB6" class="arrow"
            type="icon-jiantou"></Icon>
        </div>
      </div>
      <div class="box-shadow"></div>
      <div class="userInfo-item" @click="() => navigatorToUserItem('email', myUserInfo?.email || '')">
        <div class="item-left">{{ $t('email') }}</div>
        <div class="item-right">
          <div class="email">{{ myUserInfo?.email || $t('unknow') }}</div>
          <Icon :size="15" color="#A6ADB6" class="arrow" type="icon-jiantou"></Icon>
        </div>
      </div>
    </div>
    <div class="signature" @click="() => navigatorToUserItem('signature', myUserInfo?.signature || '')">
      <div class="signature-key">{{ $t('signature') }}</div>
      <div class="signature-text">
        {{ myUserInfo?.signature || $t('unknow') }}
      </div>
      <Icon :size="15" color="#A6ADB6" class="arrow" type="icon-jiantou">
      </Icon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '../../../components/Avatar.vue';
import { ref } from 'vue';
import Icon from '../../../components/Icon.vue';
import NavBar from '../../../components/NavBar.vue';
import { formatDateRange } from '../../../utils/date';
import { t } from '../../../utils/i18n';
import { handleNoPermission } from '../../../utils/permission';
import { autorun } from 'mobx'
import { customNavigateTo } from '../../../utils/customNavigate';
const myUserInfo = ref()
const store = uni.$UIKitStore.userStore

autorun(() => {
  myUserInfo.value = store.myUserInfo
})

const navigatorToUserItem = (key: string, value: string) => {
  customNavigateTo({
    url: `/pages/user-card/detail-item/index?key=${key}&value=${value}`
  })
}

const onChangebirth = (e) => {
  uni.getNetworkType({
    success: function (res) {
      if (res.networkType === 'none') {
        uni.showToast({
          title: t('updateText') + t('birthText') + t('failText'),
          icon: "error"
        })
      } else {
        const birth = e.detail.value
        store.saveMyUserInfoActive({ ...myUserInfo.value, birth }).then(res => {
          myUserInfo.value = res
        }).catch(() => {
          uni.showToast({
            title: t('updateText') + t('birthText') + t('failText'),
            icon: "error"
          })
        })
      }
    }
  });
}

const onChangeGender = (e) => {
  uni.getNetworkType({
    success: function (res) {
      if (res.networkType === 'none') {
        uni.showToast({
          title: t('updateText') + t('genderText') + t('failText'),
          icon: "error"
        })
      } else {
        const gender = e.detail.value == 0 ? "male" : "female"
        myUserInfo.value.gender = gender
        store.saveMyUserInfoActive({ ...myUserInfo.value, gender }).then(res => {
          myUserInfo.value = res
        }).catch(() => {
          uni.showToast({
            title: t('updateText') + t('genderText') + t('failText'),
            icon: "error"
          })
        })
      }
    }
  });
}

const onChangeAvatar = () => {
  try {
    uni.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function (res) {
        uni.showLoading({
          title: ''
        })
        store.saveMyUserInfoActive({ ...myUserInfo.value, type: 'image', filePath: res.tempFilePaths[0] }).then((res) => {
          myUserInfo.value = res
        }).catch(() => {
          uni.showToast({
            title: t('FailAvatarText'),
            icon: "error"
          })
        }).finally(() => {
          uni.hideLoading()
        })
      },
      fail: function (error) {
      },
      //没有开启权限时，提示开启权限
      complete: handleNoPermission
    });
  } catch (error) {
    uni.showToast({
      title: t('FailAvatarText'),
      icon: "error"
    })
  }
}
const copyAccount = () => {
  uni.setClipboardData({
    data: myUserInfo.value.account
  });
}

const back = () => {
  uni.navigateBack({
    delta: 1
  })
}
</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";

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
        color: #A6ADB6;
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
          color: #A6ADB6;
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
      color: #A6ADB6;
    }

    .arrow {
      margin-left: 15px;
      flex: 0 0 10px;
      color: #A6ADB6;
      font-size: 15px;
    }
  }
}
</style>
