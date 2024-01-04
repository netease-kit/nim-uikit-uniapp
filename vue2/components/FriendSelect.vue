<template>
  <div v-if="friendList.length > 0" class="friend-select-wrapper">
    <div class="member-wrapper">
      <checkbox-group @change="checkboxChange">
        <div class="member-item" v-for="item in friendList" :key="item.account">
          <checkbox class="checkbox" :value="item.account" :checked="item.checked" :disabled="item.disable" />
          <Avatar size="48" :account="item.account" />
          <div class="user-name">{{ item.nick }}</div>
        </div>
      </checkbox-group>
    </div>
    <div v-if="!!showBtn" @tap="onBtnClick" :class="getUniPlatform() === 'mp-weixin' ? 'ok-btn-mp' : 'ok-btn'">
      {{ btnText || t('okText') }}
    </div>
  </div>
  <Empty v-else :text="t('noFriendText')"></Empty>
</template>

<script lang="ts" setup>
import type { IFriendInfo } from '@xkit-yx/core-kit/dist/types/nim-kit-core/types';
import Avatar from './Avatar.vue';
import Empty from './Empty.vue';
import { getUniPlatform } from '../utils';
import { t } from '../utils/i18n';
import { events } from '../utils/constants';
export type FriendSelectItem = IFriendInfo & { disable?: boolean; checked?: boolean }

const props = defineProps({
  friendList: {
    type: Array,
    required: true
  },
  showBtn: {
    type: Boolean,
    default: true
  },
  btnText: {
    type: String,
    default: ''
  }
})

const $emit = defineEmits<{
  (event: 'checkboxChange', selectList: string[]): void,
}>()
const checkboxChange = (event) => {
  const _selectList = event.detail.value
  $emit('checkboxChange', _selectList)
}

const onBtnClick = () => {
  uni.$emit(events.FRIEND_SELECT)
}
</script>

<style lang="scss" scoped>
@import "../pages/styles/common.scss";

.friend-select-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.member-wrapper {
  padding: 10px 8px 0;
  display: flex;
  max-height: 80vh;
  overflow-y: auto;

  .member-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 0;

    .user-name {
      margin: 10px;
      width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: rgb(111, 110, 110);
    }

    .checkbox {
      margin-right: 8px;
    }
  }
}
</style>
