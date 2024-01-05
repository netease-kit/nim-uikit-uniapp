<template>
  <div class="modal" v-if="visible">
    <div class="mask" @tap="handleMaskClick"></div>
    <div class="content">
			<div class="title">{{ title }}</div>
			<slot></slot>
			<div class="buttons">
				<div class="button cancel" @tap="handleCancelClick">{{ cancelText }}</div>
				<div class="button confirm" @tap="handleConfirmClick">
					{{ confirmText }}
				</div>
			</div>
		</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  confirmText: {
    type: String,
    required: true
  },
  cancelText: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(["confirm", "cancel"]);
const handleMaskClick = () => {
  emit('cancel')
}

const handleConfirmClick = () => {
  emit('confirm')
}

const handleCancelClick = () => {
  emit('cancel')
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
	border-radius: 8px;
  z-index: 99999999999;
}

.mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
	touch-action: none;
  z-index: 9999;
}

.content {
  width: 276px;
  background-color: #fff;
  border-radius: 4px;
  overflow: hidden;
	z-index: 99999;
}


.title {
  font-size: 16px;
  font-weight: 500;
  text-align: left;
	margin: 16px 0 0 16px;
}

.buttons {
  display: flex;
  justify-content: center;
  align-items: center;
	height: 52px;
	border-top: 1px solid #E1E6E8;
	position: relative;
	bottom: 0;
	margin-top: 16px;
}

.cancel{
	color: #666666;
	height: 52px;
	line-height: 52px;
	border-right: 1px solid #E1E6E8;
}

.confirm{
	color: #337EFF;
}	

.button {
  flex: 1;
  text-align: center;
  font-size: 16px;
}

</style>
