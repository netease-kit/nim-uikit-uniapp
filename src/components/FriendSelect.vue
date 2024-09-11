<template>
  <div v-if="friendList.length > 0" class="friend-select-wrapper">
    <div class="member-wrapper">
      <radio-group v-if="radio" @change="checkboxChange">
        <div
          class="member-item"
          v-for="item in friendList"
          :key="item.accountId"
        >
          <radio
            class="checkbox"
            :value="item.accountId"
            :checked="item.checked"
            :disabled="
              item.disabled ||
              (selectAccount.length >= max &&
                !selectAccount.includes(item.accountId))
            "
          />
          <Avatar class="user-avatar" size="36" :account="item.accountId" />
          <div class="user-name">
            <Appellation :account="item.accountId" />
          </div>
        </div>
      </radio-group>
      <checkbox-group v-else @change="checkboxChange">
        <div
          class="member-item"
          v-for="item in friendList"
          :key="item.accountId"
        >
          <checkbox
            class="checkbox"
            :value="item.accountId"
            :checked="item.checked"
            :disabled="
              item.disabled ||
              (selectAccount.length >= max &&
                !selectAccount.includes(item.accountId))
            "
          />
          <Avatar class="user-avatar" size="36" :account="item.accountId" />
          <div class="user-name">
            <Appellation :account="item.accountId" />
          </div>
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
import Avatar from './Avatar.vue'
import Appellation from './Appellation.vue'
import Empty from './Empty.vue'
import { getUniPlatform } from '../utils'
import { t } from '../utils/i18n'
import { events } from '../utils/constants'
import {
  ref,
  onMounted,
  defineEmits,
  defineProps,
  withDefaults,
} from '../utils/transformVue'

export type FriendSelectItem = {
  accountId: string
  disabled?: boolean
  checked?: boolean
}

const props = withDefaults(
  defineProps<{
    friendList: FriendSelectItem[]
    showBtn?: boolean
    btnText?: string
    radio?: boolean
    max?: number
  }>(),
  {
    showBtn: true,
    btnText: '',
    radio: false,
    max: Number.MAX_SAFE_INTEGER,
  }
)

const selectAccount = ref<string[]>([])

onMounted(() => {
  selectAccount.value = props.friendList
    .filter((item) => item.checked)
    .map((item) => item.accountId)
})

const $emit = defineEmits<{
  (event: 'checkboxChange', selectList: string | string[]): void
}>()

const checkboxChange = (event: any) => {
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
