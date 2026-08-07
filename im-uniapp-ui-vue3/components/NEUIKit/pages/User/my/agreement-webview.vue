<template>
  <web-view :src="agreementUrl"></web-view>
</template>

<script lang="ts" setup>
// @ts-ignore
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { resolveAgreement } from './agreement'

const agreementUrl = ref('')

onLoad((options: { type?: string }) => {
  const agreement = resolveAgreement(options?.type)
  agreementUrl.value = agreement.webViewUrl
  uni.setNavigationBarTitle({
    title: agreement.title,
  })
})
</script>
