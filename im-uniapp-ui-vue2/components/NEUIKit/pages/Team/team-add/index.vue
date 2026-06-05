<template>
  <div>
    <NavBar :title="t('friendSelectText')" />
    <PersonSelect
      :personList="friendList"
      @checkboxChange="checkboxChange"
      :showBtn="true"
      :onBtnClick="addTeamMember"
    >
    </PersonSelect>
  </div>
</template>

<script>
import PersonSelect from '../../../components/PersonSelect.vue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { debounce, toRenderSafeData } from '../../../utils'
import { events } from '../../../utils/constants'

export default {
  components: {
    PersonSelect,
    NavBar,
  },
  data() {
    return {
      friendList: [],
      teamId: '',
      newTeamMember: [],
      addTeamMember: function () {},
    }
  },
  created() {
    this.addTeamMember = debounce(() => {
      if (this.newTeamMember.length > 200) {
        uni.showToast({
          title: t('maxSelectedText'),
          icon: 'none',
        })
        return
      }
      if (this.newTeamMember.length === 0) {
        uni.showToast({
          title: t('friendSelect'),
          icon: 'none',
        })
        return
      }

      uni.$UIKitStore?.teamMemberStore
        .addTeamMemberActive({ teamId: this.teamId, accounts: this.newTeamMember })
        .then(async () => {
          uni.navigateBack({
            delta: 1,
          })
        })
        .catch((err) => {
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
  },
  onLoad(props) {
    const friendList = uni.$UIKitStore.uiStore.friends.filter(
      (item) => !uni.$UIKitStore.relationStore.blacklist.includes(item.accountId)
    )

    this.teamId = props ? props.teamId || '' : ''

    const res = uni.$UIKitStore.teamMemberStore.getTeamMember(this.teamId)
    const teamMembers = res.map((item) => {
      return item.accountId
    })
    this.friendList = toRenderSafeData(friendList.map((item) => {
      if (teamMembers.includes(item.accountId)) {
        return { accountId: item.accountId, disabled: true }
      }
      return { accountId: item.accountId }
    })) || []

    uni.$on(events.FRIEND_SELECT, this.handleFriendSelect)
  },
  onUnload() {
    uni.$off(events.FRIEND_SELECT, this.handleFriendSelect)
  },
  methods: {
    t,
    checkboxChange(selectList) {
      this.newTeamMember = selectList
    },
    handleFriendSelect() {
      this.addTeamMember()
    },
  },
}
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
