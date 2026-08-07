<template>
  <swiper class="swiper" indicator-dots="true" @tap="onLogin">
    <swiper-item>
      <image
        class="banner"
        src="https://yx-web-nosdn.netease.im/common/7eb2a4dd70884b5d29391966413b42f9/主页面@3x.png"
      />
    </swiper-item>
    <swiper-item>
      <image
        class="banner"
        src="https://yx-web-nosdn.netease.im/common/0fa19ad5fb6c6d34e9388c571756b061/消息列表@3x.png"
      />
    </swiper-item>
    <swiper-item>
      <image
        class="banner"
        src="https://yx-web-nosdn.netease.im/common/53a96ae3bb75547da8d54299b839f80e/我的@3x.png"
      />
    </swiper-item>
  </swiper>
</template>

<script lang="ts" setup>
import { customRedirectTo } from '../../utils/customNavigate'

const onLogin = () => {
  customRedirectTo({ url: '/pages/Login/index' })
}
</script>

<style>
.swiper {
  width: 100vw;
  height: 100vh;
}

.banner {
  width: 100%;
  height: 100%;
}
</style>
