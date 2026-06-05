<template>
  <div v-if="notificationContent" class="msg-noti">
    {{ notificationContent }}
  </div>
</template>

<script>
/** 通知消息组件 */

import { ALLOW_AT } from '../../../utils/constants'
import { t } from '../../../utils/i18n'
import { V2NIMConst } from '../../../utils/nim'
import { autorun } from "../../../utils/store.js"

export default {
  props: {
    msg: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      V2NIMConst,
      notificationContent: '',
      disposeNotificationContentWatch: function () {},
    }
  },
  computed: {
    teamId() {
      return this.msg.conversationType ===
        V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
        ? this.msg.receiverId
        : ''
    },
  },
  created() {
    this.disposeNotificationContentWatch = autorun(() => {
      this.notificationContent = this.getNotificationContent()
    })
  },
  beforeDestroy() {
    this.disposeNotificationContentWatch()
  },
  methods: {
    getRawNotificationData(attachment) {
      if (!attachment?.raw) {
        return {}
      }

      try {
        const raw = JSON.parse(attachment.raw)
        return raw?.data || {}
      } catch (error) {
        return {}
      }
    },
    getRawTargetIds(attachment) {
      const rawData = this.getRawNotificationData(attachment)
      const ids = rawData?.ids

      if (Array.isArray(ids)) {
        return ids
      }

      return rawData?.id ? [rawData.id] : []
    },
    getTargetIds(attachment) {
      const targetIds = attachment?.targetIds
      let accounts = []

      if (targetIds) {
        if (Array.isArray(targetIds)) {
          accounts = targetIds
        } else if (typeof targetIds.map === 'function') {
          // 小程序端 targetIds 可能被运行时包装成类数组对象；仍然只取 targetIds，但先转成普通数组再消费。
          accounts = targetIds.map((item) => item)
        } else if (
          typeof targetIds === 'string' ||
          typeof targetIds === 'number'
        ) {
          accounts = [String(targetIds)]
        } else if (typeof targetIds.length === 'number') {
          accounts = Array.prototype.slice.call(targetIds)
        } else if (typeof targetIds === 'object') {
          accounts = Object.keys(targetIds)
            .filter((key) => /^\d+$/.test(key))
            .sort((a, b) => Number(a) - Number(b))
            .map((key) => targetIds[key])
        }
      }

      const rawIds = this.getRawTargetIds(attachment)
      if (accounts.length === 0 && rawIds.length > 0) {
        accounts = rawIds
      }

      return accounts
    },
    getOwnerTransferAccount(attachment) {
      if (attachment?.updatedTeamInfo?.ownerAccountId) {
        return attachment.updatedTeamInfo.ownerAccountId
      }

      const rawData = this.getRawNotificationData(attachment)
      // 创建者离开讨论组触发群主转让时，小程序端 targetIds 可能为空；
      // SDK 原始 tinfo 的字段 5 对应 ownerAccountId，可作为新群主账号兜底。
      const rawOwnerAccount =
        rawData?.tinfo?.ownerAccountId || rawData?.tinfo?.['5']
      if (rawOwnerAccount) {
        return rawOwnerAccount
      }

      return this.getTargetIds(attachment)[0] || ''
    },
    getAppellation(account) {
      if (!account) {
        return ''
      }

      return uni.$UIKitStore.uiStore.getAppellation({
        account,
      })
    },
    loadTargetUsers(accounts) {
      accounts.forEach((account) => {
        uni.$UIKitStore.userStore.getUserActive(account)
      })
    },
    getTargetNicks(accounts) {
      const nicks = []

      accounts.forEach((account) => {
        const nick = uni.$UIKitStore.uiStore.getAppellation({
          account,
          teamId: this.teamId,
        })

        if (nick) {
          nicks.push(nick)
        }
      })

      return nicks.join('、')
    },
    getNotificationContent() {
      const attachment = this.msg.attachment || {}
      switch (attachment?.type) {
        case V2NIMConst.V2NIMMessageNotificationType
          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_UPDATE_TINFO: {
          const team = attachment?.updatedTeamInfo || {}
          const content = []

          if (team.avatar !== undefined) {
            content.push(t('updateTeamAvatar'))
          }
          if (team.name !== undefined) {
            content.push(`${t('updateTeamName')}“${team.name}”`)
          }
          if (team.intro !== undefined) {
            content.push(t('updateTeamIntro'))
          }
          if (team.inviteMode !== undefined) {
            content.push(
              `${t('updateTeamInviteMode')}“${
                team.inviteMode ===
                V2NIMConst.V2NIMTeamInviteMode.V2NIM_TEAM_INVITE_MODE_ALL
                  ? t('teamAll')
                  : t('teamOwnerAndManagerText')
              }”`
            )
          }
          if (team.updateInfoMode !== undefined) {
            content.push(
              `${t('updateTeamUpdateTeamMode')}“${
                team.updateInfoMode ===
                V2NIMConst.V2NIMTeamUpdateInfoMode.V2NIM_TEAM_UPDATE_INFO_MODE_ALL
                  ? t('teamAll')
                  : t('teamOwnerAndManagerText')
              }”`
            )
          }
          if (team.chatBannedMode !== void 0) {
            content.push(
              `${t('updateTeamMute')}${
                team.chatBannedMode ===
                V2NIMConst.V2NIMTeamChatBannedMode
                  .V2NIM_TEAM_CHAT_BANNED_MODE_UNBAN
                  ? t('closeText')
                  : t('openText')
              }`
            )
          }
          if (team.serverExtension) {
            let ext = {}
            try {
              ext = JSON.parse(team.serverExtension)
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
          return content.length
            ? `${uni.$UIKitStore.uiStore.getAppellation({
                account: this.msg.senderId,
                teamId: this.teamId,
              })} ${content.join('、')}`
            : ''
        }
        case V2NIMConst.V2NIMMessageNotificationType
          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_APPLY_PASS:
        case V2NIMConst.V2NIMMessageNotificationType
          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_INVITE_ACCEPT: {
          return `${uni.$UIKitStore.uiStore.getAppellation({
            account: this.msg.senderId,
            teamId: this.teamId,
          })} ${t('joinTeamText')}`
        }
        case V2NIMConst.V2NIMMessageNotificationType
          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_INVITE: {
          const accounts = this.getTargetIds(attachment)
          this.loadTargetUsers(accounts)
          const nicks = this.getTargetNicks(accounts)

          return `${nicks} ${t('joinTeamText')}`
        }
        case V2NIMConst.V2NIMMessageNotificationType
          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_KICK: {
          const accounts = this.getTargetIds(attachment)
          this.loadTargetUsers(accounts)
          const nicks = this.getTargetNicks(accounts)

          return `${nicks} ${t('beRemoveTeamText')}`
        }
        case V2NIMConst.V2NIMMessageNotificationType
          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_ADD_MANAGER: {
          const accounts = this.getTargetIds(attachment)
          this.loadTargetUsers(accounts)
          const nicks = this.getTargetNicks(accounts)

          return `${nicks} ${t('beAddTeamManagersText')}`
        }
        case V2NIMConst.V2NIMMessageNotificationType
          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_REMOVE_MANAGER: {
          const accounts = this.getTargetIds(attachment)
          this.loadTargetUsers(accounts)
          const nicks = this.getTargetNicks(accounts)

          return `${nicks} ${t('beRemoveTeamManagersText')}`
        }
        case V2NIMConst.V2NIMMessageNotificationType
          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_LEAVE: {
          return `${uni.$UIKitStore.uiStore.getAppellation({
            account: this.msg.senderId,
            teamId: this.teamId,
          })} ${t('leaveTeamText')}`
        }
        case V2NIMConst.V2NIMMessageNotificationType
          .V2NIM_MESSAGE_NOTIFICATION_TYPE_TEAM_OWNER_TRANSFER: {
          const account = this.getOwnerTransferAccount(attachment)
          this.loadTargetUsers(account ? [account] : [])
          const name = this.getAppellation(account)

          return name ? `${name} ${t('newGroupOwnerText')}` : ''
        }
        default:
          return ''
      }
    },
  },
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
