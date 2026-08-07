<template>
  <div class="multi-message-operation">
    <button
      class="multi-message-operation-item"
      :class="{ disabled: props.disabled }"
      :disabled="props.disabled"
      @tap="handleMergedForward"
    >
      <Icon type="icon-zhuanfa" :size="22" />
      <text>{{ t('mergedForwardText') }}</text>
    </button>
    <button
      class="multi-message-operation-item"
      :class="{ disabled: props.disabled }"
      :disabled="props.disabled"
      @tap="handleOneByOneForward"
    >
      <Icon type="icon-zhuanfa" :size="22" />
      <text>{{ t('oneByOneForwardText') }}</text>
    </button>
    <button
      class="multi-message-operation-item"
      :class="{ disabled: props.disabled }"
      :disabled="props.disabled"
      @tap="handleDelete"
    >
      <Icon type="icon-shanchu" :size="22" />
      <text>{{ t('deleteText') }}</text>
    </button>
  </div>
</template>

<script lang="ts" setup>
import Icon from '../../../../components/Icon.vue'
import { t } from '../../../../utils/i18n'

const props = defineProps<{ disabled: boolean }>()

const emit = defineEmits<{
  (event: 'merged-forward'): void
  (event: 'one-by-one-forward'): void
  (event: 'delete'): void
}>()

const handleMergedForward = () => {
  if (!props.disabled) emit('merged-forward')
}

const handleOneByOneForward = () => {
  if (!props.disabled) emit('one-by-one-forward')
}

const handleDelete = () => {
  if (!props.disabled) emit('delete')
}
</script>

<style lang="scss" scoped>
.multi-message-operation {
  display: flex;
  flex: 0 0 calc(72px + env(safe-area-inset-bottom));
  align-items: flex-start;
  width: 100%;
  height: calc(72px + env(safe-area-inset-bottom));
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
  background: #fff;
  border-top: 1px solid #e8eaed;
}

.multi-message-operation-item {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 72px;
  min-width: 0;
  padding: 0;
  margin: 0;
  border: 0;
  border-radius: 0;
  color: #333;
  background: transparent;
  font-size: 13px;
  line-height: 18px;

  &::after {
    border: 0;
  }

  text {
    overflow: hidden;
    max-width: 100%;
    padding: 0 4px;
    box-sizing: border-box;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &.disabled {
    opacity: 0.4;
  }
}
</style>
