<template>
  <div>
    <NavBar :title="t('chooseText')" />
    <PersonSelect
      :max="10"
      :personList="teamMemberList"
      @checkboxChange="checkboxChange"
      :showBtn="true"
      @onBtnClick="onOk"
    >
    </PersonSelect>
  </div>
</template>

<script>
import PersonSelect from '../../../components/PersonSelect.vue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { debounce } from '../../../utils'
import { autorun } from "../../../utils/store.js"
import { V2NIMConst } from '../../../utils/nim'
import { toRenderSafeData } from '../../../utils'

export default {
  components: {
    PersonSelect,
    NavBar,
  },
  data() {
    return {
      V2NIMConst,
      teamMemberList: [],
      selectManager: [],
      teamId: '',
      teamMemberListWatch: function () {},
      onOk: function () {},
    }
  },
  created() {
    this.onOk = debounce(() => {
      this.submitSelection()
    }, 800)
  },
  onLoad(props) {
    this.teamId = props ? props.id || '' : ''
    this.teamMemberListWatch = autorun(() => {
      const selectManager = []
      const teamMemberList = uni.$UIKitStore.teamMemberStore
        .getTeamMember(this.teamId)
        .filter((item) => {
          return item.accountId !== uni.$UIKitStore.userStore.myUserInfo.accountId
        })
        .sort((a, b) => a.joinTime - b.joinTime)
        .map((item) => {
          const isManager =
            item.memberRole ===
            V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
          if (isManager) {
            selectManager.push(item.accountId)
          }
          return {
            accountId: item.accountId,
            teamId: item.teamId,
            checked: isManager,
            disabled: isManager,
          }
        })
      this.teamMemberList = toRenderSafeData(teamMemberList) || []
      this.selectManager = selectManager
    })
  },
  beforeDestroy() {
    this.teamMemberListWatch()
  },
  methods: {
    t,
    checkboxChange(select) {
      this.selectManager = select
    },
    submitSelection() {
      if (!this.selectManager.length) {
        uni.showToast({
          title: t('pleaseSelectMember'),
          icon: 'error',
        })
        return
      }

      uni.$UIKitStore.teamStore
        .updateTeamMemberRoleActive({
          teamId: this.teamId,
          accounts: this.selectManager,
          role: V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER,
        })
        .then(() => {
          uni.showToast({
            title: t('addTeamManagerSuccessText'),
            icon: 'none',
          })
          uni.navigateBack({
            delta: 1,
          })
        })
        .catch((error) => {
          switch (error?.code) {
            case 191004:
              uni.showToast({
                title: t('userNotInTeam'),
                icon: 'error',
              })
              break
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
