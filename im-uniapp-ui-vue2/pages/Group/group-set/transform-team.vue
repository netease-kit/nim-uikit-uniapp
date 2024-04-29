<template>
  <div>
    <NavBar :title="t('transformTeam')" />
    <div class="subtitle">{{ t('transformTeamText') }}</div>
    <div
      class="member-item"
      v-for="item in teamMemberList"
      :key="item.account"
      @tap="onTapItem(item)"
    >
      <Avatar :account="item.account" :teamId="item.teamId" size="32" />
      <Appellation
        class="user-name"
        :account="item.account"
        :teamId="item.teamId"
        :fontSize="14"
      />
      <div v-if="item.type === 'owner'" class="user-tag">
        {{ t('teamOwner') }}
      </div>
      <div v-else-if="item.type === 'manager'" class="user-tag">
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
import { TeamMember } from '@xkit-yx/im-store'
import { autorun } from 'mobx'
import { customRedirectTo } from '../../../utils/customNavigate'

const teamMemberList = ref<TeamMember[]>([])
let teamId = ''

const onTapItem = (item: TeamMember) => {
  // @ts-ignore
  const nick = uni.$UIKitStore.uiStore.getAppellation({
    account: item.account,
    teamId: item.teamId,
  })
  uni.showModal({
    title: t('transformTeam'),
    content: `${t('transformTeamContent')} ${nick} ${t('doubt')}`,
    success: (res) => {
      if (res.confirm) {
        // @ts-ignore
        uni.$UIKitStore.teamStore
          .transferTeamActive({
            teamId,
            account: item.account,
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
          .catch((error: any) => {
            switch (error?.code) {
              // 无权限
              case 802:
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
    // @ts-ignore
    const members = uni.$UIKitStore.teamMemberStore
      .getTeamMember(teamId)
      .filter((item: any) => {
        // @ts-ignore
        return item.account !== uni.$UIKitStore.userStore.myUserInfo.account
      })

    const manager = members
      .filter((item: any) => item.type === 'manager')
      .sort((a: any, b: any) => a.joinTime - b.joinTime)

    const other = members
      .filter((item: any) => !['owner', 'manager'].includes(item.type))
      .sort((a: any, b: any) => a.joinTime - b.joinTime)

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
