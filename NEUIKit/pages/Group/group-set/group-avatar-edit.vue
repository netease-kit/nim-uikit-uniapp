<template>
  <div class="group-set-container">
    <NavBar :title="t('updateAvatarText')" />
    <div class="group-avatar-container">
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
    <div v-show="hasPermission" class="group-avatar-arr-container">
      <div class="tip">{{ `${t('chooseDefaultImage')}` }}</div>
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

    <div
      v-show="hasPermission"
      :class="getUniPlatform() === 'mp-weixin' ? 'ok-btn-mp' : 'ok-btn'"
      @tap="handleSave"
    >
      {{ t('saveText') }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '../../../components/NavBar.vue'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from '../../../utils/transformVue'
import { t } from '../../../utils/i18n'
import { getUniPlatform } from '../../../utils'

import { handleNoPermission } from '../../../utils/permission'
import Icon from '../../../components/Icon.vue'

const avatar = ref<string>()
let hasPermission = ref<boolean>(false)

const avatarArr = [
  'https://yx-web-nosdn.netease.im/common/2425b4cc058e5788867d63c322feb7ac/groupAvatar1.png',
  'https://yx-web-nosdn.netease.im/common/62c45692c9771ab388d43fea1c9d2758/groupAvatar2.png',
  'https://yx-web-nosdn.netease.im/common/d1ed3c21d3f87a41568d17197760e663/groupAvatar3.png',
  'https://yx-web-nosdn.netease.im/common/e677d8551deb96723af2b40b821c766a/groupAvatar4.png',
  'https://yx-web-nosdn.netease.im/common/fd6c75bb6abca9c810d1292e66d5d87e/groupAvatar5.png',
]
let teamId = ''

const onChangeAvatar = () => {
  try {
    uni.chooseImage({
      count: 1,
      sizeType: ['original'],
      success: function (res) {
        uni.showLoading({
          title: '',
        })
        uni.$UIKitStore.storageStore
          .uploadFileActive(res.tempFilePaths[0])
          .then((data) => {
            avatar.value = data
            uni.hideLoading()
          })
          .catch((err: any) => {
            uni.hideLoading()
            if (err?.code && typeof t(`${err.code}`) !== 'undefined') {
              uni.showToast({
                title: t(`${err.code}`),
                icon: 'error',
                duration: 1000,
              })
            } else {
              uni.showToast({
                title: t('FailAvatarText'),
                icon: 'error',
                duration: 1000,
              })
            }
          })
      },
      fail: function (error) {},
      //没有开启权限时，提示开启权限
      complete: handleNoPermission,
    })
  } catch (err: any) {
    if (err?.code && typeof t(`${err.code}`) !== 'undefined') {
      uni.showToast({
        title: t(`${err.code}`),
        icon: 'error',
        duration: 1000,
      })
    } else {
      uni.showToast({
        title: t('FailAvatarText'),
        icon: 'error',
        duration: 1000,
      })
    }
  }
}

const setAvatar = (index: number) => {
  avatar.value = avatarArr[index]
}
// 保存群头像
const handleSave = () => {
  uni.$UIKitStore.teamStore
    .updateTeamActive({
      teamId,
      info: {
        avatar: avatar.value,
      },
    })
    .then(() => {
      uni.showToast({
        title: t('updateTeamSuccessText'),
        icon: 'success',
      })
      uni.navigateBack()
    })
    .catch((err: any) => {
      if (err?.code && typeof t(`${err.code}`) !== 'undefined') {
        uni.showToast({
          title: t(`${err.code}`),
          icon: 'error',
          duration: 1000,
        })
      } else {
        uni.showToast({
          title: t('updateTeamFailedText'),
          icon: 'error',
          duration: 1000,
        })
      }
    })
}

onLoad((option) => {
  const myAccount = uni.$UIKitStore.userStore.myUserInfo.accountId
  teamId = option?.id
  const team = uni.$UIKitStore.teamStore.teams.get(teamId)
  const updateInfoMode = team?.updateInfoMode
  avatar.value = team?.avatar || ''
  const myTeamMember = uni.$UIKitStore.teamMemberStore.getTeamMember(teamId, [
    myAccount,
  ])[0]
  // updateInfoMode 为 0 表示只有管理员和群主可以修改群信息；updateInfoMode 为 1 表示任何人都可以修改群信息
  if (
    (updateInfoMode === 0 && myTeamMember.memberRole !== 0) ||
    updateInfoMode === 1
  ) {
    hasPermission.value = true
  }
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

.group-avatar-container {
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
.group-avatar-arr-container {
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
