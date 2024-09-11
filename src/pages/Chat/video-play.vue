<template>
  <div class="video-wrapper">
    <NavBar title="视频播放" />
    <div class="video-box">
      <video v-if="show" class="video" :src="videoUrl" id="videoEle" controls autoplay></video>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "../../utils/transformVue";
import { onLoad, onReady } from "@dcloudio/uni-app";
import NavBar from "./message/nav-bar.vue";

const videoUrl = ref();
const show = ref(false);
onLoad((option: any) => {
  videoUrl.value = decodeURIComponent(option.videoUrl);
  show.value = true;
});

onReady(() => {
  show.value = true;
});
</script>
<style lang="scss" scoped>
.video-wrapper{
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: #000000;
  display: flex;
  flex-direction: column;
}

.video-box {
  width: 100vw;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .video {
    width: 100%;
    height: 95%;
  }
}
</style>