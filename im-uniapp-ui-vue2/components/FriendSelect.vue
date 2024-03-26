<template>
  <div v-if="friendList.length > 0" class="friend-select-wrapper">
    <div class="member-wrapper">
      <radio-group v-if="radio" @change="checkboxChange">
        <div class="member-item" v-for="item in friendList" :key="item.account">
          <radio
            class="checkbox"
            :value="item.account"
            :checked="item.checked"
            :disabled="
              item.disabled ||
              (selectAccount.length >= max &&
                !selectAccount.includes(item.account))
            "
          />
          <Avatar class="user-avatar" size="36" :account="item.account" />
          <div class="user-name">{{ item.nick }}</div>
        </div>
      </radio-group>
      <checkbox-group v-else @change="checkboxChange">
        <div class="member-item" v-for="item in friendList" :key="item.account">
          <checkbox
            class="checkbox"
            :value="item.account"
            :checked="item.checked"
            :disabled="
              item.disabled ||
              (selectAccount.length >= max &&
                !selectAccount.includes(item.account))
            "
          />
          <Avatar class="user-avatar" size="36" :account="item.account" />
          <div class="user-name">{{ item.nick }}</div>
        </div>
      </checkbox-group>
    </div>
    <div
      v-if="!!showBtn"
      @tap="onBtnClick"
      :class="getUniPlatform() === 'mp-weixin' ? 'ok-btn-mp' : 'ok-btn'"
    >
      {{ btnText || t('okText') }}
    </div>
  </div>
  <Empty v-else :text="t('noFriendText')"></Empty>
</template>

<script lang="ts" setup>
import type { IFriendInfo } from '@xkit-yx/core-kit/dist/types/nim-kit-core/types'
import Avatar from './Avatar.vue'
import Empty from './Empty.vue'
import { getUniPlatform } from '../utils'
import { t } from '../utils/i18n'
import { events } from '../utils/constants'
import { ref, onMounted } from '../utils/transformVue'

export type FriendSelectItem = IFriendInfo & {
  disabled?: boolean
  checked?: boolean
}

const props = defineProps({
  friendList: {
    type: Array,
    required: true,
    default: () => [],
  },
  showBtn: {
    type: Boolean,
    default: true,
  },
  btnText: {
    type: String,
    default: '',
  },
  radio: {
    type: Boolean,
    default: false,
  },
  max: {
    type: Number,
    default: Number.MAX_SAFE_INTEGER,
  },
})

const selectAccount = ref<string[]>([])

onMounted(() => {
  selectAccount.value = props.friendList
    .filter((item: FriendSelectItem) => item.checked)
    .map((item: FriendSelectItem) => item.account)
})

const $emit = defineEmits<{
  (event: 'checkboxChange', selectList: string | string[]): void
}>()

const checkboxChange = (event) => {
  const value = event.detail.value
  selectAccount.value = value

  $emit('checkboxChange', value)
}

const onBtnClick = () => {
  uni.$emit(events.FRIEND_SELECT)
}
</script>

<style lang="scss" scoped>
@import '../pages/styles/common.scss';

.friend-select-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.member-wrapper {
  padding-top: 10px;
  display: flex;
  max-height: 80vh;
  overflow-y: auto;

  .member-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px 20px;
    width: 100vw;

    .user-avatar {
      margin: 0 14px;
    }

    .user-name {
      max-width: 70%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: #333;
      font-size: 16px;
    }

    .checkbox {
      margin-right: 8px;
    }
  }
}
</style>
