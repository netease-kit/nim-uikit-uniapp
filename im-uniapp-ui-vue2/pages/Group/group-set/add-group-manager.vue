<template>
  <div>
    <NavBar :title="t('teamMemebrSelect')" />
    <FriendSelect
      :max="10"
      :friendList="teamMemberList"
      @checkboxChange="checkboxChange"
      :showBtn="true"
      :onBtnClick="onOk"
    >
    </FriendSelect>
  </div>
</template>

<script lang="ts" setup>
import FriendSelect from '../../../components/FriendSelect.vue'
import { ref } from '../../../utils/transformVue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { debounce } from '@xkit-yx/utils'
import { deepClone } from '../../../utils'
import { events } from '../../../utils/constants'
import { TeamMember } from '@xkit-yx/im-store'
import { autorun } from 'mobx'
import { customRedirectTo } from '../../../utils/customNavigate'

const teamMemberList = ref<TeamMember[]>([])
let selectManager: string[] = []
let teamId = ''

const checkboxChange = (select: string[]) => {
  selectManager = select
}

const onOk = debounce(() => {
  if (!selectManager.length) {
    uni.showToast({
      title: t('pleaseSelectMember'),
      icon: 'error',
    })
    return
  }
  // @ts-ignore
  uni.$UIKitStore.teamStore
    .addTeamManagersActive({
      teamId,
      accounts: selectManager,
    })
    .then(() => {
      uni.showToast({
        title: t('addTeamManagerSuccessText'),
        icon: 'success',
      })
      uni.navigateBack({
        delta: 1,
      })
    })
    .catch((error: any) => {
      switch (error?.code) {
        // 操作的人不在群中
        case 804:
          uni.showToast({
            title: t('userNotInTeam'),
            icon: 'error',
          })
          break
        // 没权限
        case 802:
          uni.showToast({
            title: t('noPermission'),
            icon: 'error',
          })
          break
        default:
          uni.showToast({
            title: t('addTeamManagerFailText'),
            icon: 'error',
          })
          break
      }
    })
}, 800)

onLoad((props) => {
  teamId = props ? props.id : ''

  autorun(() => {
    // @ts-ignore
    teamMemberList.value = deepClone(
      uni.$UIKitStore.teamMemberStore
        .getTeamMember(teamId)
        .filter((item) => {
          // @ts-ignore
          return item.account !== uni.$UIKitStore.userStore.myUserInfo.account
        })
        .map((item) => {
          if (item.type === 'manager') {
            selectManager.push(item.account)
          }
          return {
            ...item,
            // @ts-ignore
            nick: uni.$UIKitStore.uiStore.getAppellation({
              account: item.account,
              teamId,
            }),
            checked: item.type === 'manager',
            disabled: item.type === 'manager',
          }
        })
        .sort((a, b) => a.joinTime - b.joinTime)
    )
  })
  uni.$on(events.FRIEND_SELECT, () => {
    onOk()
  })
})

onUnload(() => {
  uni.$off(events.FRIEND_SELECT)
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.group-input-wrapper {
  display: flex;
  align-items: center;

  .group-input {
    margin: 10px;
    background-color: #f2f4f5;
    padding: 4px;
    border-radius: 5px;
    flex: 1;
  }

  .button {
    width: 65px;
    height: 30px;
    font-size: 12px;
    text-align: center;
    line-height: 30px;
    margin-right: 5px;
    padding: 0;
    color: #5c9bed;
  }
}

.placeholder {
  color: #a6adb6;
}

.right-button {
  color: #5c9bed;
}
</style>
