<template>
  <div class="voice-panel-wrapper" >
      <div class="voice-panel-circel" @touchstart="onStartRecord" @touchend="onStopRecord">
        <div class="img-mask"></div>
        <Icon :width="24" :height="30" type="audio-btn"></Icon>
      </div>
      <div :style="{ display: recordState == 'stop' ? 'none' : 'block' }" class='big-circle'></div>
      <div :style="{ display: recordState == 'stop' ? 'none' : 'block' }" class='small-circle'></div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from '../../../utils/transformVue';
import Icon from '../../../components/Icon.vue';

const recordState = ref('stop');
const onStartRecord = () => {
  console.log('========开始录音========');
  recordState.value = 'recording';
}

const onStopRecord = () => {
  console.log('========结束录音========');
  recordState.value = 'stop';
}
</script>

<style scoped lang="scss">
.voice-panel-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.voice-panel-circel {
  z-index: 3;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(163deg, #4883EA 11%, #2561C9 121%);
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
  width: 250px;
  height: 250px;
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
  top: 30%;
  left: 34%;
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

.img-mask{
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}
</style>