<template>
  <div
    class="audio-message"
    :class="
      !msg.isSelf || mode === 'audio-in'
        ? 'audio-message-in'
        : 'audio-message-out'
    "
  >
    <div
      class="audio-bubble"
      :class="!msg.isSelf || mode === 'audio-in' ? 'audio-in' : 'audio-out'"
      :style="{ width: audioContainerWidth + 'px' }"
      @tap="handlePlayAudio"
    >
      <div class="audio-dur">{{ duration }}s</div>
      <div class="audio-icon-wrapper">
        <Icon :size="24" :key="audioIconType" :type="audioIconType" />
      </div>
    </div>
    <div v-if="msg.textOfVoice" class="audio-text">{{ msg.textOfVoice }}</div>
  </div>
</template>

<script lang="ts" setup>
/** 音频消息组件 */
import { ref, onUnmounted, computed, watch, withDefaults } from 'vue'
import Icon from '../../../components/Icon.vue'
import { events } from '../../../utils/constants'
import type { V2NIMMessageForUI } from '../../../utils/store'
import type { V2NIMMessageAudioAttachment } from '../../../utils/module/nim-web-sdk/esm/nim/src/V2NIMMessageService'
//@ts-ignore
import { onHide, onUnload } from '@dcloudio/uni-app'
import { isHarmonyOs } from '../../../utils'
const props = withDefaults(
  defineProps<{
    msg: V2NIMMessageForUI
    mode?: 'audio-in' | 'audio-out'
    broadcastNewAudioSrc?: string
  }>(),
  {}
)

const audioIconType = ref('icon-yuyin3')
const animationFlag = ref(false)
const isAudioPlaying = ref<boolean>(false)
const audioMap = new Map<string, any>()
const emits = defineEmits(['getGlobalAudioContext'])

/** 格式化音频时长 */
const formatDuration = (duration: number) => {
  return Math.round(duration / 1000) || 1
}

/** 音频消息宽度 */
const audioContainerWidth = computed(() => {
  //@ts-ignore
  const duration = formatDuration(props.msg.attachment?.duration)
  const maxWidth = 180
  return 50 + 8 * (duration - 1) > maxWidth ? maxWidth : 50 + 8 * (duration - 1)
})

/** 音频时长 */
const duration = computed(() => {
  return formatDuration(
    (props.msg.attachment as V2NIMMessageAudioAttachment)?.duration
  )
})

/**播放音频 */
const handlePlayAudio = () => {
  //@ts-ignore
  uni.$emit(events.AUDIO_URL_CHANGE, props.msg?.attachment?.url)
  const audioContext = getAudio()
  if (!audioContext) {
    const globalAudioContext = uni.createInnerAudioContext()
    audioMap.set('audio', globalAudioContext)
    initAudioSrc()
  }
  toggleAudioPlayState()
}

/** 监听当前的音频播放 是不是当前点击url，如果不是，就停止 */
watch(
  () => props.broadcastNewAudioSrc,
  (newSrc: string) => {
    //@ts-ignore
    if (newSrc !== props.msg?.attachment?.url && isAudioPlaying.value) {
      stopAudio()
      isAudioPlaying.value = false
    }
  }
)

/** 播放 */
const toggleAudioPlayState = () => {
  if (!isAudioPlaying.value) {
    playAudio()
  } else {
    stopAudio()
  }
}

/**停止播放音频 */
const stopAudio = () => {
  const audioContext = getAudio()
  if (!audioContext) {
    return
  }
  try {
    audioContext.stop()
    isAudioPlaying.value = false
  } catch {
    console.log('stop audio error')
  }
}

/** 初始化音频实例 */
function initAudioSrc() {
  const audioContext = getAudio()
  if (!audioContext) {
    return
  }
  //@ts-ignore
  audioContext.src = props.msg?.attachment?.url
  isAudioPlaying.value = false
  audioContext.onPlay(onAudioPlay)
  audioContext.onStop(onAudioStop)
  audioContext.onEnded(onAudioEnded)
  audioContext.onError(onAudioError)
}

/**播放音频 */
function playAudio() {
  const audioContext = getAudio()
  console.log('audio played', audioContext)

  if (!audioContext) {
    return
  }
  try {
    audioContext.play()
  } catch (error) {
    console.log('audio played error', error)
  }
}

/** 音频开始播放 */
function onAudioPlay() {
  isAudioPlaying.value = true
  playAudioAnimation()
}

/** 音频停止播放 */
function onAudioStop() {
  animationFlag.value = false
  isAudioPlaying.value = false
  if (isHarmonyOs) {
    const audioContext = getAudio()
    audioContext?.destroy?.()
    audioMap.delete('audio')
  }
}

/** 音频播放结束 */
function onAudioEnded() {
  animationFlag.value = false
  isAudioPlaying.value = false
}

/** 音频播放失败 */
function onAudioError(error: any) {
  animationFlag.value = false
  console.warn('audio played error', error)
}
/**获取音频实例 */
const getAudio = () => {
  return audioMap.get('audio')
}

/** 播放音频动画 */
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

/** 离开当前页面时，停止播放音频 */
const stopAudioOnHide = () => {
  const audioContext = getAudio()
  if (isAudioPlaying.value) {
    stopAudio()
  }
  audioContext?.destroy?.()
  animationFlag.value = false
  audioMap.delete('audio')
}

onUnmounted(() => {
  stopAudioOnHide()
})

onHide(() => {
  stopAudioOnHide()
})

onUnload(() => {
  stopAudioOnHide()
})
</script>

<style scoped lang="scss">
.audio-message {
  display: flex;
  flex-direction: column;
  max-width: 360rpx;
}

.audio-message-out {
  align-items: flex-end;
}

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

.audio-text {
  margin-top: 8px;
  max-width: 360rpx;
  color: #333;
  font-size: 14px;
  line-height: 20px;
  word-break: break-word;
  white-space: pre-wrap;
}
</style>
