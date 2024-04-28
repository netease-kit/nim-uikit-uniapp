<template>
  <div v-if="getNotificationContent()" class="msg-noti">
    {{ getNotificationContent() }}
  </div>
</template>

<script lang="ts" setup>
import { ALLOW_AT } from '../../../utils/constants'
import { t } from '../../../utils/i18n'
import type { IMMessage, Team, UserNameCard } from '@xkit-yx/im-store'

const props = defineProps({
  msg: {
    type: Object,
    required: true,
  },
})

const msg: IMMessage = props.msg as any

const teamId = msg.scene === 'team' ? msg.to : ''

const getNotificationContent = () => {
  switch (msg.attach?.type) {
    case 'updateTeam': {
      const team: Team = msg.attach?.team || {}
      const content: string[] = []
      if (team.avatar !== undefined) {
        content.push(t('updateTeamAvatar'))
      }
      if (team.name !== undefined) {
        content.push(`${t('updateTeamName')}“${team.name}”`)
      }
      if (team.intro !== undefined) {
        content.push(t('updateTeamIntro'))
      }
      if (team.inviteMode) {
        content.push(
          `${t('updateTeamInviteMode')}“${
            team.inviteMode === 'all'
              ? t('teamAll')
              : t('teamOwnerAndManagerText')
          }”`
        )
      }
      if (team.updateTeamMode) {
        content.push(
          `${t('updateTeamUpdateTeamMode')}“${
            team.updateTeamMode === 'all'
              ? t('teamAll')
              : t('teamOwnerAndManagerText')
          }”`
        )
      }
      if (team.muteType) {
        content.push(
          `${t('updateTeamMute')}${
            team.muteType === 'none' ? t('closeText') : t('openText')
          }`
        )
      }
      if (team.ext) {
        let ext: any = {}
        try {
          ext = JSON.parse(team.ext)
        } catch (error) {
          //
        }
        if (ext[ALLOW_AT] !== undefined) {
          content.push(
            `${t('updateAllowAt')}“${
              ext[ALLOW_AT] === 'manager'
                ? t('teamOwnerAndManagerText')
                : t('teamAll')
            }”`
          )
        }
      }
      const attachUser = (msg.attach?.users as UserNameCard[]).find(
        (_) => _.account === msg.from
      )
      return content.length
        ? // @ts-ignore
          `${uni.$UIKitStore.uiStore.getAppellation({
            account: msg.from,
            teamId,
            nickFromMsg: attachUser?.nick,
          })} ${content.join('、')}`
        : ''
    }
    case 'passTeamApply':
    case 'acceptTeamInvite': {
      const attachUser = (msg.attach?.users as UserNameCard[]).find(
        (_) => _.account === msg.from
      )
      // @ts-ignore
      return `${uni.$UIKitStore.uiStore.getAppellation({
        account: msg.from,
        teamId,
        nickFromMsg: attachUser?.nick,
      })} ${t('joinTeamText')}`
    }
    case 'addTeamMembers': {
      const accounts: string[] = msg.attach?.accounts || []
      const nicks = accounts
        .map((item) => {
          const attachUser = (msg.attach?.users as UserNameCard[]).find(
            (_) => _.account === item
          )
          // @ts-ignore
          return uni.$UIKitStore.uiStore.getAppellation({
            account: item,
            teamId,
            nickFromMsg: attachUser?.nick,
          })
        })
        .filter((item) => !!item)
        .join('、')

      return `${nicks} ${t('joinTeamText')}`
    }
    case 'removeTeamMembers': {
      const accounts: string[] = msg.attach?.accounts || []
      const nicks = accounts
        .map((item) => {
          const attachUser = (msg.attach?.users as UserNameCard[]).find(
            (_) => _.account === item
          )
          // @ts-ignore
          return uni.$UIKitStore.uiStore.getAppellation({
            account: item,
            teamId,
            nickFromMsg: attachUser?.nick,
          })
        })
        .filter((item) => !!item)
        .join('、')

      return `${nicks} ${t('beRemoveTeamText')}`
    }
    case 'addTeamManagers': {
      const accounts: string[] = msg.attach?.accounts || []
      const nicks = accounts
        .map((item) => {
          const attachUser = (msg.attach?.users as UserNameCard[]).find(
            (_) => _.account === item
          )
          // @ts-ignore
          return uni.$UIKitStore.uiStore.getAppellation({
            account: item,
            teamId,
            nickFromMsg: attachUser?.nick,
          })
        })
        .filter((item) => !!item)
        .join('、')

      return `${nicks} ${t('beAddTeamManagersText')}`
    }
    case 'removeTeamManagers': {
      const accounts: string[] = msg.attach?.accounts || []
      const nicks = accounts
        .map((item) => {
          const attachUser = (msg.attach?.users as UserNameCard[]).find(
            (_) => _.account === item
          )
          // @ts-ignore
          return uni.$UIKitStore.uiStore.getAppellation({
            account: item,
            teamId,
            nickFromMsg: attachUser?.nick,
          })
        })
        .filter((item) => !!item)
        .join('、')

      return `${nicks} ${t('beRemoveTeamManagersText')}`
    }
    case 'leaveTeam': {
      const attachUser = (msg.attach?.users as UserNameCard[]).find(
        (_) => _.account === msg.from
      )
      // @ts-ignore
      return `${uni.$UIKitStore.uiStore.getAppellation({
        account: msg.from,
        teamId,
        nickFromMsg: attachUser?.nick,
      })} ${t('leaveTeamText')}`
    }
    case 'transferTeam': {
      const attachUser = (msg.attach?.users as UserNameCard[]).find(
        (_) => _.account === msg.attach?.account
      )
      // @ts-ignore
      return `${uni.$UIKitStore.uiStore.getAppellation({
        account: msg.attach?.account,
        teamId,
        nickFromMsg: attachUser?.nick,
      })} ${t('newGroupOwnerText')}`
    }
    default:
      return ''
  }
}
</script>

<style scoped lang="scss">
.msg-noti {
  margin: 8px auto 0;
  text-align: center;
  font-size: 14px;
  color: #b3b7bc;
  max-width: 70%;
}
</style>
