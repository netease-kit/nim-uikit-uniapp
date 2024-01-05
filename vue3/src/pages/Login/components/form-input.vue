<template>
  <div :class="inputClass">
    <slot name="addonBefore" />
    <input :key="inputKey" class="input" :type="type" :value="modelValue" @input="handleInput" :focus="inputFocus"
      @focus="inputFocus = true" @blur="handleBlur" :placeholder="placeholder" />
    <icon v-show="modelValue && allowClear" type="clear" size="16" @click="clearInput()" />
    <slot name="addonAfter" />
  </div>
  <div v-if="inputError && rule" class="error-tips">{{ rule?.message }}</div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
const $emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  class?: string,
  type?: string,
  modelValue?: string,
  placeholder?: string,
  allowClear?: boolean,
  rule?: { reg: RegExp, message: string, trigger: string }
}>();


const inputFocus = ref(false);
const inputError = ref(false);
// use key to force refresh input
const inputKey = ref(0);

const inputClass = computed(() => {
  return [props.class, 'form-input-item', { 'focus': inputFocus.value, 'error': inputError.value }];
});

const handleInput = (event) => {
  let value = event.detail.value;
  if (props.type === 'tel') {
    value = value.replace(/\D/g, '');
  }
  $emit('update:modelValue', value)
  inputKey.value++;
}

const handleBlur = () => {
  inputFocus.value = false;
  if (props.rule && props.rule.trigger === 'blur') {
    inputError.value = !props.rule.reg.test(props.modelValue || '');
  }
}

const clearInput = () => {
  $emit("update:modelValue", null);
  inputFocus.value = true;
}
</script>

<style lang="scss" scoped>
$primary-color: #337EFF;
$error-color: #F56C6C;

.form-input-item {
  border-bottom: 1rpx solid #DCDFE5;
  padding: 10px 10px 5px 0px;
  display: flex;
  height: 44px;
  align-items: center;

  &.focus {
    border-color: $primary-color;
  }

  &.error {
    border-color: $error-color;
  }
}

.input {
  flex: 1;
  border: none;
  outline: none;
}

.error-tips {
  color: $error-color;
  font-size: 12px;
  margin-top: 5px;
}
</style>
