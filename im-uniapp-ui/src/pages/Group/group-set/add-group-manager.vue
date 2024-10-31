<template>
  <div>
    <NavBar :title="t('teamMemberSelect')" />
    <PersonSelect
      :max="10"
      :personList="teamMemberList"
      @checkboxChange="checkboxChange"
      :showBtn="true"
      :onBtnClick="onOk"
    >
    </PersonSelect>
  </div>
</template>

<script lang="ts" setup>
import PersonSelect, {
  PersonSelectItem,
} from '../../../components/PersonSelect.vue'
import { onUnmounted, ref } from '../../../utils/transformVue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { debounce } from '@xkit-yx/utils'
import { deepClone } from '../../../utils'
import { events } from '../../../utils/constants'
import { autorun } from 'mobx'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK'

const teamMemberList = ref<PersonSelectItem[]>([])
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

  uni.$UIKitStore.teamStore
    .updateTeamMemberRoleActive({
      teamId,
      accounts: selectManager,
      role: V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER,
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
        case 191004:
          uni.showToast({
            title: t('userNotInTeam'),
            icon: 'error',
          })
          break
        // 没权限
        case 109432:
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

let uninstallTeamMemberListWatch = () => {}

onLoad((props) => {
  teamId = props ? props.id : ''
  uninstallTeamMemberListWatch = autorun(() => {
    teamMemberList.value = deepClone(
      uni.$UIKitStore.teamMemberStore
        .getTeamMember(teamId)
        .filter((item) => {
          return (
            item.accountId !== uni.$UIKitStore.userStore.myUserInfo.accountId
          )
        })
        .sort((a, b) => a.joinTime - b.joinTime)
        .map((item) => {
          if (
            item.memberRole ===
            V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
          ) {
            selectManager.push(item.accountId)
          }
          return {
            accountId: item.accountId,
            teamId: item.teamId,
            checked:
              item.memberRole ===
              V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER,
            disabled:
              item.memberRole ===
              V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER,
          }
        })
    )
  })
  uni.$on(events.FRIEND_SELECT, () => {
    onOk()
  })
})

onUnmounted(() => {
  uninstallTeamMemberListWatch()
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
