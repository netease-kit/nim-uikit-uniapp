<template>
  <div
    :class="!msg.isSelf || mode === 'audio-in' ? 'audio-in' : 'audio-out'"
    :style="{ width: audioContainerWidth + 'px' }"
    @tap="handlePlayAudio"
  >
    <div class="audio-dur">{{ duration }}s</div>
    <div class="audio-icon-wrapper">
      <Icon :size="24" :key="audioIconType" :type="audioIconType" />
    </div>
  </div>
</template>

<script>
/** 音频消息组件 */
import Icon from '../../../components/Icon.vue'
import { events } from '../../../utils/constants'
import { isHarmonyOs } from '../../../utils'

export default {
  components: {
    Icon,
  },
  props: {
    msg: {
      type: Object,
      default: () => ({}),
    },
    mode: {
      type: String,
      default: '',
    },
    broadcastNewAudioSrc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      audioIconType: 'icon-yuyin3',
      animationFlag: false,
      isAudioPlaying: false,
      audioMap: new Map(),
      animationTimer: null,
      animationToken: 0,
      expectAudioPlaying: false,
    }
  },
  computed: {
    audioContainerWidth() {
      const duration = this.formatDuration(this.msg.attachment?.duration)
      const maxWidth = 180
      return 50 + 8 * (duration - 1) > maxWidth
        ? maxWidth
        : 50 + 8 * (duration - 1)
    },
    duration() {
      return this.formatDuration(this.msg.attachment?.duration)
    },
    audioSignalKey() {
      return (
        this.msg?.messageClientId ||
        this.msg?.messageServerId ||
        this.msg?.attachment?.url ||
        ''
      )
    },
  },
  created() {
    uni.$on(events.AUDIO_URL_CHANGE, this.handleAudioUrlChange)
  },
  beforeDestroy() {
    uni.$off(events.AUDIO_URL_CHANGE, this.handleAudioUrlChange)
    this.stopAudioOnHide()
  },
  onHide() {
    this.stopAudioOnHide()
  },
  onUnload() {
    this.stopAudioOnHide()
  },
  methods: {
    formatDuration(duration) {
      return Math.round(duration / 1000) || 1
    },
    handleAudioUrlChange(newSrc) {
      if (newSrc !== this.audioSignalKey) {
        this.stopAudio()
      }
    },
    handlePlayAudio() {
      const url = this.msg?.attachment?.url
      if (!url) {
        return
      }

      const audioContext = this.getAudio()
      if (!audioContext) {
        const globalAudioContext = uni.createInnerAudioContext()
        this.audioMap.set('audio', globalAudioContext)
        this.initAudioSrc()
      }

      if (!this.isAudioPlaying) {
        uni.$emit(events.AUDIO_URL_CHANGE, this.audioSignalKey)
      }
      this.toggleAudioPlayState()
    },
    toggleAudioPlayState() {
      if (!this.isAudioPlaying) {
        this.playAudio()
      } else {
        this.stopAudio()
      }
    },
    stopAudio() {
      const audioContext = this.getAudio()
      if (!audioContext) {
        this.resetAudioState()
        return
      }
      try {
        audioContext.stop()
        this.resetAudioState()
      } catch {
        this.resetAudioState()
        console.log('stop audio error')
      }
    },
    initAudioSrc() {
      const audioContext = this.getAudio()
      if (!audioContext) {
        return
      }
      audioContext.src = this.msg?.attachment?.url
      this.isAudioPlaying = false
      audioContext.onPlay(this.onAudioPlay)
      audioContext.onStop(this.onAudioStop)
      audioContext.onEnded(this.onAudioEnded)
      audioContext.onError(this.onAudioError)
    },
    playAudio() {
      const audioContext = this.getAudio()
      console.log('audio played', audioContext)
      if (!audioContext) {
        return
      }
      try {
        this.expectAudioPlaying = true
        audioContext.play()
      } catch (error) {
        this.resetAudioState()
        console.log('audio played error', error)
      }
    },
    onAudioPlay() {
      if (!this.expectAudioPlaying) {
        this.stopAudio()
        return
      }

      this.isAudioPlaying = true
      this.playAudioAnimation()
    },
    onAudioStop() {
      this.resetAudioState()
      if (isHarmonyOs) {
        const audioContext = this.getAudio()
        audioContext?.destroy?.()
        this.audioMap.delete('audio')
      }
    },
    onAudioEnded() {
      this.resetAudioState()
    },
    onAudioError(error) {
      this.resetAudioState()
      console.warn('audio played error', error)
    },
    getAudio() {
      return this.audioMap.get('audio')
    },
    playAudioAnimation() {
      try {
        this.clearAudioAnimation()
        this.animationFlag = true
        const token = this.animationToken
        let audioIcons = ['icon-yuyin1', 'icon-yuyin2', 'icon-yuyin3']
        const handler = () => {
          if (!this.animationFlag || token !== this.animationToken) {
            return
          }

          const icon = audioIcons.shift()
          if (icon) {
            this.audioIconType = icon
            if (!audioIcons.length && this.animationFlag) {
              audioIcons = ['icon-yuyin1', 'icon-yuyin2', 'icon-yuyin3']
            }
            if (audioIcons.length) {
              this.animationTimer = setTimeout(handler, 300)
            }
          }
        }
        handler()
      } catch (error) {
        console.log('playAudioAnimation error', error)
      }
    },
    clearAudioAnimation() {
      this.animationToken += 1
      this.animationFlag = false
      if (this.animationTimer) {
        clearTimeout(this.animationTimer)
        this.animationTimer = null
      }
    },
    resetAudioState() {
      this.clearAudioAnimation()
      this.expectAudioPlaying = false
      this.isAudioPlaying = false
      this.audioIconType = 'icon-yuyin3'
    },
    stopAudioOnHide() {
      const audioContext = this.getAudio()
      if (this.isAudioPlaying) {
        this.stopAudio()
      }
      audioContext?.destroy?.()
      this.resetAudioState()
      this.audioMap.delete('audio')
    },
  },
}
</script>

<style scoped lang="scss">
.audio-dur {
  height: 24px;
  line-height: 24px;
}
.audio-in,
.audio-out {
  width: 50px;
  display: flex;
  cursor: pointer;
  justify-content: flex-end;
  align-items: center;
}

.audio-in {
  flex-direction: row-reverse;
  .audio-icon-wrapper {
    transform: rotate(180deg);
  }
}

.audio-icon-wrapper {
  height: 24px;
  display: flex;
  align-items: center;
}
</style>
