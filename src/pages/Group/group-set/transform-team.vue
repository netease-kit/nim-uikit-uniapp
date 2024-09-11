<template>
  <div>
    <NavBar :title="t('transformTeam')" />
    <div class="subtitle">{{ t('transformTeamText') }}</div>
    <div
      class="member-item"
      v-for="item in teamMemberList"
      :key="item.accountId"
      @tap="onTapItem(item)"
    >
      <Avatar :account="item.accountId" :teamId="item.teamId" size="32" />
      <Appellation
        class="user-name"
        :account="item.accountId"
        :teamId="item.teamId"
        :fontSize="14"
      />
      <div
        v-if="
          item.memberRole ===
          V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_OWNER
        "
        class="user-tag"
      >
        {{ t('teamOwner') }}
      </div>
      <div
        v-else-if="
          item.memberRole ===
          V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
        "
        class="user-tag"
      >
        {{ t('manager') }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Avatar from '../../../components/Avatar.vue'
import Appellation from '../../../components/Appellation.vue'
import { onUnmounted, ref } from '../../../utils/transformVue'
import NavBar from '../../../components/NavBar.vue'
import { t } from '../../../utils/i18n'
import { onLoad } from '@dcloudio/uni-app'
import { deepClone } from '../../../utils'
import { autorun } from 'mobx'
import { customRedirectTo } from '../../../utils/customNavigate'
import { V2NIMTeamMember } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK/V2NIMTeamService'
import { V2NIMConst } from 'nim-web-sdk-ng/dist/v2/NIM_UNIAPP_SDK'

const teamMemberList = ref<V2NIMTeamMember[]>([])
let teamId = ''

const onTapItem = (item: V2NIMTeamMember) => {
  const nick = uni.$UIKitStore.uiStore.getAppellation({
    account: item.accountId,
    teamId: item.teamId,
  })
  uni.showModal({
    title: t('transformTeam'),
    content: `${t('transformTeamContent')} ${nick} ${t('doubt')}`,
    success: (res) => {
      if (res.confirm) {
        uni.$UIKitStore.teamStore
          .transferTeamActive({
            teamId,
            account: item.accountId,
            leave: false,
          })
          .then(() => {
            uni.showToast({
              title: t('transformTeamSuccessText'),
              icon: 'success',
            })
            customRedirectTo({
              url: `/pages/Group/group-set/index?id=${teamId}`,
            })
          })
          .catch((error) => {
            switch (error?.code) {
              // 无权限
              case 109427:
                uni.showToast({
                  title: t('noPermission'),
                  icon: 'error',
                })
                break
              default:
                uni.showToast({
                  title: t('transformTeamFailedText'),
                  icon: 'error',
                })
                break
            }
          })
      }
    },
  })
}

let uninstallTeamMemberWatch = () => {}
onLoad((props) => {
  teamId = props ? props.id : ''

  uninstallTeamMemberWatch = autorun(() => {
    const members = uni.$UIKitStore.teamMemberStore
      .getTeamMember(teamId)
      .filter((item) => {
        return item.accountId !== uni.$UIKitStore.userStore.myUserInfo.accountId
      })

    const manager = members
      .filter(
        (item) =>
          item.memberRole ===
          V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER
      )
      .sort((a, b) => a.joinTime - b.joinTime)

    const other = members
      .filter(
        (item) =>
          ![
            V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_OWNER,
            V2NIMConst.V2NIMTeamMemberRole.V2NIM_TEAM_MEMBER_ROLE_MANAGER,
          ].includes(item.memberRole)
      )
      .sort((a, b) => a.joinTime - b.joinTime)

    teamMemberList.value = deepClone([...manager, ...other])
  })
})

onUnmounted(() => {
  uninstallTeamMemberWatch()
})
</script>

<style lang="scss" scoped>
@import '../../styles/common.scss';

.subtitle {
  padding: 16px 20px;
  font-size: 16px;
  color: #333;
}

.member-item {
  padding: 8px 20px;
  display: flex;
  align-items: center;
}

.user-name {
  margin-left: 12px;
  margin-right: 8px;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-tag {
  padding: 4px 8px;
  background: #f7f7f7;

  border: 1px solid #d6d8db;
  border-radius: 50px;
  color: #656a72;
  font-size: 12px;
  margin-left: 8px;
  white-space: nowrap;
  word-break: keep-all;
}
</style>
