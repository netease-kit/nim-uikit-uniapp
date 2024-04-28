<template>
  <div class="voice-panel-wrapper">
    <div class="audio-remind-text">{{ t('audioRemindText') }}</div>
    <div class="voice-panel">
      <div
        class="voice-panel-circel"
        @touchstart="onStartRecord"
        @touchend="onStopRecord"
      >
        <div class="img-mask"></div>
        <Icon :width="24" :height="30" type="audio-btn"></Icon>
      </div>
      <div
        :style="{ display: recordState == 'stop' ? 'none' : 'block' }"
        class="big-circle"
      ></div>
      <div
        :style="{ display: recordState == 'stop' ? 'none' : 'block' }"
        class="small-circle"
      ></div>
    </div>
    <div class="audio-btn-text">{{ t('audioBtnText') }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '../../../utils/transformVue'
import Icon from '../../../components/Icon.vue'
import { t } from '../../../utils/i18n'
import { isWxApp, stopAllAudio } from '../../../utils'

const $emit = defineEmits(['handleSendAudioMsg'])

const recorderManager = uni.getRecorderManager()

let startRecordStamp = 0

const recordState = ref('stop')
const onStartRecord = () => {
  stopAllAudio()
  recorderManager.start({
    format: 'mp3',
    duration: 60000,
    sampleRate: 44100,
    numberOfChannels: 1,
    encodeBitRate: 192000,
    frameSize: 50,
  })
}

const onStopRecord = () => {
  console.log('========结束录音========')
  recordState.value = 'stop'
  recorderManager.stop()
}

recorderManager.onStart(() => {
  console.log('=======recorder start======')
  recordState.value = 'recording'
  startRecordStamp = new Date().getTime()
})

recorderManager.onStop((res) => {
  console.log('=======recorder stop======', res)
  recordState.value = 'stop'
  const duration = new Date().getTime() - startRecordStamp
  if (duration < 1000) {
    uni.showToast({
      title: '录音时间太短',
      icon: 'none',
    })
    return
  }
  // @ts-ignore
  $emit('handleSendAudioMsg', res.tempFilePath, duration)
})

recorderManager.onError((res) => {
  console.log('=======recorder error======', res)
  recordState.value = 'stop'
  if (!isWxApp) {
    uni.showToast({
      title: t('audioErrorText'),
      icon: 'none',
    })
  } else {
    if (res.errMsg == 'operateRecorder:fail auth deny') {
      uni.showToast({
        title: t('audioErrorText'),
        icon: 'none',
      })
    }
  }
})
</script>

<style scoped lang="scss">
.voice-panel-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.voice-panel {
  flex: 1;
  width: 100%;
  overflow: hidden;
  margin-bottom: 30px;
}

.audio-remind-text {
  margin-top: 30px;
  height: 30px;
  text-align: center;
  font-size: 14px;
  color: #666;
  line-height: 30px;
}

.voice-panel-circel {
  z-index: 3;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(163deg, #4883ea 11%, #2561c9 121%);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.big-circle {
  z-index: 1;
  position: absolute;
  width: 230px;
  height: 230px;
  left: 20%;
  top: 10%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  background: #cce6f8 38.14%;
  animation: circleSmall 1.5s ease-out;
  animation-iteration-count: infinite;
}

.small-circle {
  z-index: 2;
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background: #a0d2f0;
  top: 28%;
  left: 33%;
  transform: translate(-50%, -50%);
  animation: circleSmall 1.5s ease-out;
  animation-iteration-count: infinite;
}

@keyframes circleSmall {
  0% {
    transform: scale(1);
    opacity: 0;
  }

  25% {
    transform: scale(1);
    opacity: 0.4;
  }

  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }

  75% {
    transform: scale(1.3);
    opacity: 0.4;
  }

  100% {
    transform: scale(1.4);
    opacity: 0;
  }
}

.img-mask {
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}

.audio-btn-text {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  color: #666;
  font-size: 14px;
}
</style>
