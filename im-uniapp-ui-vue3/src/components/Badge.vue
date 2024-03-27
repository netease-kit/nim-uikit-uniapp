<template>
	<div>
		<div class="dot" v-if="dot" :style="customStyle"></div>
		<div class="badge" v-else-if="text" :style="customStyle">{{ text }}</div>
		<div class="hidden">{{ props.num }}</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from '../utils/transformVue'

const props = defineProps({
    num: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      default: 99
    },
    dot: {
      type: Boolean,
      default: false
    },
    customStyle: {
      type: Object,
      default: () => {}
    }})
const max = props.max || 99
const text = computed(() => {
  return props.num > 0 ? props.num > max ? `${max}+` : props.num + '' : ''
})

</script>

<style scoped lang="scss">
.dot {
  background-color: #FF4D4F;
  color: #fff;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 99;
}

.badge {
  background-color: #FF4D4F;
  color: #fff;
  font-size: 12px;
  min-width: 20px;
  height: 20px;
  line-height: 19px;
  border-radius: 10px;
  padding: 0 5px;
  box-sizing: border-box;
  text-align: center;
  z-index: 99;
  position: relative;
}
.hidden{
	display: none;
}
</style>
