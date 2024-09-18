<template>
  <div>
    <NavBar :title="t('friendSelectText')" />
    <FriendSelect
      :friendList="friendList"
      @checkboxChange="checkboxChange"
      :showBtn="true"
      :onBtnClick="addTeamMember"
    >
    </FriendSelect>
  </div>
</template>

<script lang="ts" setup>
import FriendSelect, {
  FriendSelectItem,
} from '../../../components/FriendSelect.vue'
import { ref } from '../../../utils/transformVue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { debounce } from '@xkit-yx/utils'
import { deepClone } from '../../../utils'
import { events } from '../../../utils/constants'

const friendList = ref<FriendSelectItem[]>([])
let teamId = ''
let newTeamMember: string[] = []

onLoad((props) => {
  const _friendList = uni.$UIKitStore.uiStore.friends.filter(
    (item) => !uni.$UIKitStore.relationStore.blacklist.includes(item.accountId)
  )

  teamId = props ? props.teamId : ''

  const res = uni.$UIKitStore.teamMemberStore.getTeamMember(teamId)
  const _teamMembers = res.map((item) => {
    return item.accountId
  })
  friendList.value = deepClone(
    _friendList.map((item) => {
      if (_teamMembers.includes(item.accountId)) {
        return { accountId: item.accountId, disabled: true }
      } else {
        return { accountId: item.accountId }
      }
    })
  )
  uni.$on(events.FRIEND_SELECT, () => {
    addTeamMember()
  })
})

const checkboxChange = (selectList: string[]) => {
  newTeamMember = selectList
}
// 添加群成员
const addTeamMember = debounce(() => {
  // 群成员数量存在限制
  if (newTeamMember.length > 200) {
    uni.showToast({
      title: t('maxSelectedText'),
      icon: 'none',
    })
    return
  }
  if (newTeamMember.length == 0) {
    uni.showToast({
      title: t('friendSelect'),
      icon: 'none',
    })
    return
  }

  uni.$UIKitStore?.teamMemberStore
    .addTeamMemberActive({ teamId, accounts: newTeamMember })
    .then(async () => {
      uni.navigateBack({
        delta: 1,
      })
    })
    .catch((err: any) => {
      switch (err ? err.code : '') {
        case 109306:
          uni.showToast({
            title: t('noPermission'),
            icon: 'error',
          })
          break
        default:
          uni.showToast({
            title: t('addTeamMemberFailText'),
            icon: 'none',
          })
          break
      }
    })
}, 800)

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
