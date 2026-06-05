<template>
  <div class="video-wrapper">
    <NavBar :title="t('videoPlayText')" :showLeft="false"></NavBar>
    <div class="video-box">
      <video
        v-if="show"
        :class="['video', isPortrait ? 'video-portrait' : 'video-landscape']"
        :src="videoUrl"
        id="videoEle"
        controls
        autoplay
        object-fit="contain"
        :direction="videoDirection"
        @loadedmetadata="handleLoadedMetadata"
      ></video>
    </div>
  </div>
</template>

<script>
/** 视频播放界面 */
import NavBar from '../../components/NavBar.vue'
import { t } from '../../utils/i18n'

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      videoUrl: '',
      width: 0,
      height: 0,
      show: false,
    }
  },
  computed: {
    isPortrait() {
      return this.height > this.width
    },
    videoDirection() {
      if (!this.width || !this.height) {
        return undefined
      }

      return this.isPortrait ? 0 : 90
    },
  },
  onLoad(option) {
    this.videoUrl = decodeURIComponent(option?.videoUrl || '')
    this.width = Number(option?.width || 0)
    this.height = Number(option?.height || 0)
    this.show = true
  },
  onReady() {
    this.show = true
  },
  methods: {
    t,
    handleLoadedMetadata(event) {
      const { width, height } = event.detail || {}

      if (width && height) {
        this.width = Number(width)
        this.height = Number(height)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.video-wrapper {
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
    max-width: 100%;
    max-height: 95%;
    background: #000000;
  }

  .video-landscape {
    width: 100%;
    height: 95%;
  }

  .video-portrait {
    width: 56.25vh;
    height: 95%;
  }
}
</style>
