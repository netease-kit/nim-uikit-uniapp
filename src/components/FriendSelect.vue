<template>
  <!-- 之所以这样布局是uniapp的api因为在ios系统14上，当checkbox-group有Avatar组件，change事件就不会被触发，但是android 或者ios 系统16的就可以 -->
  <div v-if="friendList.length > 0" class="member-wrapper">
    <checkbox-group @change="checkboxChange">
      <label class="checkbox-label" v-for="item in friendList" :key="item.account">
        <checkbox class="checkbox" :value="item.account" :disabled="item.disable" />
      </label>
    </checkbox-group>
    <div class="member-item-wrapper">
      <div class="member-item" v-for="item in friendList">
        <Avatar size="48" :account="item.account" />
        <div class="user-name">{{ item.nick }}</div>
      </div>
    </div>
  </div>
  <Empty v-else :text="$t('noFriendText')"></Empty>
</template>

<script lang="ts" setup>
import type { IFriendInfo } from '@xkit-yx/core-kit/dist/types/nim-kit-core/types';
import Avatar from './Avatar.vue';
import { defineProps } from 'vue'
import Empty from './Empty.vue';
import { t } from '../utils/i18n';
const props = defineProps<{
  friendList: (IFriendInfo & { disable?: boolean })[]
}>()
const $emit = defineEmits<{
  (event: 'checkboxChange', selectList: string[]): void,
}>()
const checkboxChange = (event) => {
  const _selectList = event.detail.value
  $emit('checkboxChange', _selectList)
}
</script>

<style lang="scss" scoped>
@import "../pages/styles/common.scss";

.member-wrapper {
  margin: 10px 5px 0 8px;
  display: flex;

  .checkbox-label {
    display: block;
    height: 70px;
    margin: 0 10px;
    line-height: 70px;
  }

  .member-item-wrapper {
    display: flex;
    flex-direction: column;

    .member-item {
      display: flex;
      height: 70px;
      align-items: center;

      .user-name {
        margin: 10px;
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: rgb(111, 110, 110);
      }

    }

    .checkbox {
      margin-right: 8px;
    }
  }
}</style>
