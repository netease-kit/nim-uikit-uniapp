<template>
  <Avatar 
    :account="account"
    :teamId="teamId"
    :size="size"
    :gotoUserCard="gotoUserCard"
    :onLongpress="handleAitTeamMember"
  />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { events } from '../../../utils/constants'
import Avatar from '../../../components/Avatar.vue'

const props = defineProps<{
  account: string
  teamId?: string
  avatar?: string
  size?: string
  gotoUserCard?: boolean
  fontSize?: string
}>()

const store = uni.$UIKitStore

const handleAitTeamMember = () => {
  const isSelf = props.account === store.userStore.myUserInfo.account
  if (props.teamId && props.account && !isSelf) {
    uni.$emit(events.AIT_TEAM_MEMBER, {
      account: props.account,
      appellation: store.uiStore.getAppellation({
        account: props.account,
        teamId: props.teamId,
        ignoreAlias: true,
      }),
    })
  }
}

</script>

<style scoped lang="scss">

</style>
