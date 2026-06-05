<template>
  <div>
    <div :class="inputClass">
      <slot name="addonBefore" />
      <input
        class="input"
        :type="type"
        :value="value"
        @input="handleInput"
        :focus="inputFocus"
        @focus="handleFocus"
        @blur="handleBlur"
        :placeholder="placeholder"
      />
      <div class="clear-icon" @tap="clearInput">
        <Icon v-if="value && allowClear" type="icon-guanbi1" :size="16" />
      </div>
      <slot name="addonAfter" />
    </div>
    <div v-if="inputError && rule" class="error-tips">{{ rule.message }}</div>
  </div>
</template>

<script>
import Icon from '../../../components/Icon.vue'

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
    value: {
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
  },
  methods: {
    handleFocus() {
      this.inputFocus = true
    },
    handleInput(event) {
      let value = event.detail.value
      if (this.type === 'tel') {
        value = value.replace(/\D/g, '')
      }
      this.$emit('updateModelValue', value)
    },
    handleBlur() {
      this.inputFocus = false
      if (this.rule && this.rule.trigger === 'blur') {
        this.inputError = !this.rule.reg.test(this.value || '')
      }
    },
    clearInput() {
      this.$emit('updateModelValue', null)
      this.inputFocus = true
    },
  },
}
</script>

<style lang="scss" scoped>
$primary-color: #337eff;
$error-color: #f56c6c;

.form-input-item {
  border-bottom: 1rpx solid #dcdfe5;
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

.clear-icon {
  width: 24px;
  text-align: right;
}

.error-tips {
  color: $error-color;
  font-size: 12px;
  margin-top: 5px;
}
</style>
