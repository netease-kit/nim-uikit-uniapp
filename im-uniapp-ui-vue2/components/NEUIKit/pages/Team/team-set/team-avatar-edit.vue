<template>
  <div class="team-set-container">
    <NavBar :title="t('updateAvatarText')" />
    <div class="team-avatar-container">
      <div v-if="hasPermission" @click="onChangeAvatar" class="avatar">
        <image
          :lazy-load="true"
          class="avatar-img"
          v-if="avatar"
          :src="avatar"
          mode="aspectFill"
        />
        <div class="choose-picture">
          <Icon :size="24" type="choose-picture" />
        </div>
      </div>
      <div v-else class="avatar">
        <image
          :lazy-load="true"
          class="avatar-img"
          v-if="avatar"
          :src="avatar"
          mode="aspectFill"
        />
      </div>
    </div>
    <div v-show="hasPermission" class="team-avatar-arr-container">
      <div class="tip">{{ t('chooseDefaultImage') }}</div>
      <div class="avatar-arr">
        <image
          :lazy-load="true"
          class="avatar-img"
          :src="avatarArr[0]"
          mode="aspectFill"
          @click="setAvatar(0)"
        />
        <image
          :lazy-load="true"
          class="avatar-img"
          :src="avatarArr[1]"
          mode="aspectFill"
          @click="setAvatar(1)"
        />
        <image
          :lazy-load="true"
          class="avatar-img"
          :src="avatarArr[2]"
          mode="aspectFill"
          @click="setAvatar(2)"
        />
        <image
          :lazy-load="true"
          class="avatar-img"
          :src="avatarArr[3]"
          mode="aspectFill"
          @click="setAvatar(3)"
        />
        <image
          :lazy-load="true"
          class="avatar-img"
          :src="avatarArr[4]"
          mode="aspectFill"
          @click="setAvatar(4)"
        />
      </div>
    </div>

    <div v-show="hasPermission" class="ok-btn" @tap="handleSave">
      {{ t('saveText') }}
    </div>
  </div>
</template>

<script>
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { handleNoPermission } from '../../../utils/permission'
import Icon from '../../../components/Icon.vue'

const avatarArr = [
  'https://yx-web-nosdn.netease.im/common/2425b4cc058e5788867d63c322feb7ac/groupAvatar1.png',
  'https://yx-web-nosdn.netease.im/common/62c45692c9771ab388d43fea1c9d2758/groupAvatar2.png',
  'https://yx-web-nosdn.netease.im/common/d1ed3c21d3f87a41568d17197760e663/groupAvatar3.png',
  'https://yx-web-nosdn.netease.im/common/e677d8551deb96723af2b40b821c766a/groupAvatar4.png',
  'https://yx-web-nosdn.netease.im/common/fd6c75bb6abca9c810d1292e66d5d87e/groupAvatar5.png',
]

export default {
  components: {
    NavBar,
    Icon,
  },
  data() {
    return {
      avatar: '',
      hasPermission: false,
      avatarArr,
      teamId: '',
    }
  },
  onLoad(option) {
    const myAccount = uni.$UIKitStore.userStore.myUserInfo.accountId
    this.teamId = option?.id || ''
    const team = uni.$UIKitStore.teamStore.teams.get(this.teamId)
    const updateInfoMode = team?.updateInfoMode
    this.avatar = team?.avatar || ''
    const myTeamMember = uni.$UIKitStore.teamMemberStore.getTeamMember(this.teamId, [
      myAccount,
    ])[0]
    if (
      (updateInfoMode === 0 && myTeamMember.memberRole !== 0) ||
      updateInfoMode === 1
    ) {
      this.hasPermission = true
    }
  },
  methods: {
    t,
    onChangeAvatar() {
      try {
        uni.chooseImage({
          count: 1,
          sizeType: ['original'],
          success: (res) => {
            uni.showLoading({
              title: '',
            })
            uni.$UIKitStore.storageStore
              .uploadFileActive(res.tempFilePaths[0])
              .then((data) => {
                this.avatar = data
                uni.hideLoading()
              })
              .catch(() => {
                uni.hideLoading()
                uni.showToast({
                  title: t('FailAvatarText'),
                  icon: 'error',
                  duration: 1000,
                })
              })
          },
          fail: function () {},
          complete: handleNoPermission,
        })
      } catch {
        uni.showToast({
          title: t('FailAvatarText'),
          icon: 'error',
          duration: 1000,
        })
      }
    },
    setAvatar(index) {
      this.avatar = this.avatarArr[index]
    },
    handleSave() {
      uni.$UIKitStore.teamStore
        .updateTeamActive({
          teamId: this.teamId,
          info: {
            avatar: this.avatar,
          },
        })
        .then(() => {
          uni.showToast({
            title: t('updateTeamSuccessText'),
            icon: 'none',
          })
          uni.navigateBack()
        })
        .catch(() => {
          uni.showToast({
            title: t('updateTeamFailedText'),
            icon: 'error',
            duration: 1000,
          })
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
}

.team-set-container {
  height: 100vh;
  box-sizing: border-box;
  background-color: #eff1f4;
}

.team-avatar-container {
  background: #ffffff;
  height: 128px;
  border-radius: 8px;
  padding: 16px;
  margin: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .avatar {
    position: relative;
    width: 80px;
    height: 80px;
    .avatar-img {
      width: 80px;
      height: 80px;
    }
    .choose-picture {
      position: absolute;
      right: 0;
      bottom: 10px;
    }
  }
}
.team-avatar-arr-container {
  height: 114px;
  background: #ffffff;
  border-radius: 8px;
  padding: 0 16px;
  margin: 0 20px;
  // bfc
  overflow: auto;
  .tip {
    font-size: 16px;
    font-weight: normal;
    margin-top: 15px;
    margin-bottom: 24px;
  }
  .avatar-arr {
    display: flex;
    justify-content: space-around;
    .avatar-img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
