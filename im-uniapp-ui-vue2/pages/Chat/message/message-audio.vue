<template>
  <div
    :class="msg.flow === 'in' ? 'audio-in' : 'audio-out'"
    :style="{ width: audioContainerWidth + 'px' }"
    @tap="onPlayAudio"
  >
    <div>{{ duration }}s</div>
    <div class="audio-icon-wrapper">
      <Icon :size="24" :key="audioIconType" :type="audioIconType" />
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import { ref, onUnmounted, computed, watch } from '../../../utils/transformVue'
import Icon from '../../../components/Icon.vue'
import { events } from '../../../utils/constants'
const props = defineProps({
  msg: {
    type: Object,
    default: () => ({
      idClient: undefined,
      body: undefined,
      attach: {
        type: undefined,
        value: undefined,
        url: undefined,
        canEdit: false,
        canRecall: false,
      },
    }),
    required: true,
  },
  broadcastNewAudioSrc: {
    type: String,
  },
})

const audioIconType = ref('icon-yuyin3')
const animationFlag = ref(false)
const isAudioPlaying = ref<boolean>(false)
const audioMap = new Map<string, any>()
const emits = defineEmits(['getGlobalAudioContext'])

// 格式化音频时长
const formatDuration = (duration: number) => {
  return Math.round(duration / 1000) || 1
}

// 音频消息宽度
const audioContainerWidth = computed(() => {
  const duration = formatDuration(props?.msg?.attach?.dur)
  const maxWidth = 180
  return 50 + 8 * (duration - 1) > maxWidth ? maxWidth : 50 + 8 * (duration - 1)
})

// 音频时长
const duration = computed(() => {
  return formatDuration(props?.msg?.attach?.dur)
})

const onPlayAudio = () => {
  uni.$emit(events.AUDIO_URL_CHANGE, props?.msg?.attach?.url)
  const audioContext = getAudio()
  if (!audioContext) {
    const globalAudioContext = uni.createInnerAudioContext()
    audioMap.set('audio', globalAudioContext)
    initAudioSrc()
  }
  toggleAudioPlayState()
}

watch(
  () => props.broadcastNewAudioSrc,
  (newSrc) => {
    if (newSrc !== props?.msg?.attach?.url && isAudioPlaying.value) {
      stopAudio()
      isAudioPlaying.value = false
    }
  }
)

const toggleAudioPlayState = () => {
  if (!isAudioPlaying.value) {
    playAudio()
  } else {
    stopAudio()
  }
}

function initAudioSrc() {
  const audioContext = getAudio()
  if (!audioContext) {
    return
  }
  audioContext.src = props?.msg?.attach?.url
  isAudioPlaying.value = false
  audioContext.onPlay(onAudioPlay)
  audioContext.onStop(onAudioStop)
  audioContext.onEnded(onAudioEnded)
  audioContext.onError(onAudioError)
}

function playAudio() {
  const audioContext = getAudio()
  if (!audioContext) {
    return
  }
  audioContext.play()
}

function onAudioPlay() {
  isAudioPlaying.value = true
  playAudioAnimation()
}

function onAudioStop() {
  animationFlag.value = false
  isAudioPlaying.value = false
}

function onAudioEnded() {
  animationFlag.value = false
  isAudioPlaying.value = false
}

function onAudioError() {
  animationFlag.value = false
  console.warn('audio played error')
}
const getAudio = () => {
  return audioMap.get('audio')
}

const stopAudio = () => {
  const audioContext = getAudio()
  if (!audioContext) {
    return
  }
  try {
    audioContext.stop()
  } catch {
    console.log('stop audio error')
  }
}

onUnmounted(() => {
  const audioContext = getAudio()
  if (isAudioPlaying.value) {
    stopAudio()
  }
  audioContext?.destroy?.()
  audioMap.delete('audio')
})

// 播放音频动画
const playAudioAnimation = () => {
  try {
    animationFlag.value = true
    let audioIcons = ['icon-yuyin1', 'icon-yuyin2', 'icon-yuyin3']
    const handler = () => {
      const icon = audioIcons.shift()
      if (icon) {
        audioIconType.value = icon
        if (!audioIcons.length && animationFlag.value) {
          audioIcons = ['icon-yuyin1', 'icon-yuyin2', 'icon-yuyin3']
        }
        if (audioIcons.length) {
          setTimeout(handler, 300)
        }
      }
    }
    handler()
  } catch (error) {
    console.log('playAudioAnimation error', error)
  }
}
</script>

<style scoped lang="scss">
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
</style>
