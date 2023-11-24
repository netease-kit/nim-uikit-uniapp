<template>
  <div>
    <NavBar :title="$t('friendSelectText')" />
    <FriendSelect :friendList="friendList" @checkboxChange="checkboxChange" :showBtn="true" :onBtnClick="addTeamMember">
    </FriendSelect>
  </div>
</template>

<script lang="ts" setup>
import FriendSelect from '../../../components/FriendSelect.vue';
import { ref } from 'vue'
import NavBar from '../../../components/NavBar.vue';
import { t } from '../../../utils/i18n';
import { onLoad } from '@dcloudio/uni-app';
import { debounce } from '@xkit-yx/utils';
import type { IFriendInfo } from '@xkit-yx/core-kit/dist/types/nim-kit-core/types';
const store = uni.$UIKitStore
const friendList = ref<IFriendInfo[]>([])
let teamId = ''
let newTeamMember: string[] = []
onLoad((props) => {
  const _friendList = store.uiStore.friendsWithoutBlacklist
  teamId = props?.teamId
  store.teamMemberStore.getTeamMemberActive(props?.teamId).then(res => {
    const _teamMembers = res.map(item => {
      return item.account
    })
    friendList.value = _friendList.map(item => {
      item = { ...item, nick: store.uiStore.getAppellation({ account: item.account }) }
      if (_teamMembers.includes(item.account)) {
        return { ...item, disable: true }
      } else {
        return item
      }
    })
  })
})

const checkboxChange = (selectList: string[]) => {
  newTeamMember = selectList
}

const addTeamMember = debounce(() => {
  if (newTeamMember.length > 200) {
    uni.showToast({
      title: t('maxSelectedText'),
      icon: "none"
    })
    return
  }
  if (newTeamMember.length == 0) {
    uni.showToast({
      title: t('friendSelect'),
      icon: "none"
    })
    return
  }
  store.teamMemberStore.addTeamMemberActive({ teamId, accounts: newTeamMember }).then(async res => {
    uni.navigateBack()
  }).catch((err) => {
    switch (err?.code) {
      case 802:
        uni.showToast({
          title: t('noPermission'),
          icon: 'error'
        })
        break;
      default:
        uni.showToast({
          title: t('addTeamMemberFailText'),
          icon: "none"
        })
        break
    }
  })
}, 800)

</script>

<style lang="scss" scoped>
@import "../../styles/common.scss";

.group-input-wrapper {
  display: flex;
  align-items: center;

  .group-input {
    margin: 10px;
    background-color: #F2F4F5;
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
  color: #A6ADB6;
}

.right-button {
  color: #5c9bed;
}
</style>
