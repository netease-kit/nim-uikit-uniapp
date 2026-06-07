<template>
  <div>
    <div :class="inputClass">
      <slot name="addonBefore" />
      <input
        class="input"
        :type="type"
        :value="inputValue"
        @input="handleInput"
        :focus="inputFocus"
        @focus="handleFocus"
        @blur="handleBlur"
        :placeholder="placeholder"
        :maxlength="maxlength"
      />
      <div class="clear-icon" @tap="clearInput()">
        <Icon v-if="modelValue && allowClear" type="icon-guanbi1" :size="16" />
      </div>
      <slot name="addonAfter" />
    </div>

    <div v-if="inputError && rule" class="error-tips">{{ rule.message }}</div>
  </div>
</template>

<script>
import Icon from './Icon.vue'

export default {
  components: {
    Icon,
  },
  props: {
    className: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    modelValue: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    allowClear: {
      type: Boolean,
      default: false,
    },
    rule: {
      type: Object,
      default: null,
    },
    maxlength: {
      type: Number,
      default: 140,
    },
  },
  data() {
    return {
      inputFocus: false,
      inputError: false,
    }
  },
  computed: {
    inputClass() {
      return [
        this.className,
        'form-input-item',
        { focus: this.inputFocus, error: this.inputError },
      ]
    },
    inputValue() {
      return this.modelValue || ''
    },
  },
  methods: {
    handleBlur(event) {
      this.inputFocus = false
      if (this.rule && this.rule.trigger === 'blur') {
        this.inputError = !this.rule.reg.test(this.modelValue || '')
      }
      this.$emit('blur', event)
    },
    handleFocus(event) {
      this.inputFocus = true
      this.$emit('blur', event)
    },
    handleInput(event) {
      if (!(this.maxlength && event.detail.value.length > this.maxlength)) {
        this.$emit('update:modelValue', event.detail.value)
        this.$emit('input', event.detail.value)
      }
    },
    clearInput() {
      this.$emit('update:modelValue', null)
      this.$emit('input', null)
      this.$emit('clear', '')
      this.inputFocus = true
    },
  },
}
</script>

<style lang="scss" scoped>
$primary-color: #337eff;
$error-color: #f56c6c;

.form-input-item {
  border-bottom: 1px solid #dcdfe5;
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
  height: 30px;
  border: none;
  outline: none;
}
.clear-icon {
  width: 40px;
  text-align: right;
}

.error-tips {
  color: $error-color;
  font-size: 12px;
  margin-top: 5px;
}
</style>
