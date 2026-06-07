<template>
  <Avatar 
    :account="account"
    :teamId="teamId"
    :size="size"
    :gotoUserCard="gotoUserCard"
    :onLongpress="handleAitTeamMember"
  />
</template>

<script>
import { events } from '../../../utils/constants'
import Avatar from '../../../components/Avatar.vue'

export default {
  components: {
    Avatar,
  },
  props: {
    account: {
      type: String,
      default: '',
    },
    teamId: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    gotoUserCard: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleAitTeamMember() {
      const store = uni.$UIKitStore
      const isSelf = this.account === store.userStore.myUserInfo.account
      if (this.teamId && this.account && !isSelf) {
        uni.$emit(events.AIT_TEAM_MEMBER, {
          account: this.account,
          appellation: store.uiStore.getAppellation({
            account: this.account,
            teamId: this.teamId,
            ignoreAlias: true,
          }),
        })
      }
    },
  },
}
</script>

<style scoped lang="scss">

</style>
