<template>
  <div v-if="personList.length > 0" class="friend-select-wrapper">
    <div class="member-wrapper">
      <radio-group v-if="radio" @change="checkboxChange">
        <div
          class="member-item"
          v-for="item in personList"
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
            <Appellation :account="item.accountId" :teamId="item.teamId" />
          </div>
        </div>
      </radio-group>
      <checkbox-group v-else @change="checkboxChange">
        <div
          class="member-item"
          v-for="item in personList"
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
            <Appellation :account="item.accountId" :teamId="item.teamId" />
          </div>
        </div>
      </checkbox-group>
    </div>
    <div
      :style="{ border: '1px solid #ccc' }"
      v-if="!!showBtn"
      @tap="onBtnClick"
      class="ok-btn"
    >
      {{ btnText || t('okText') }}
    </div>
  </div>
  <Empty v-else :text="t('noFriendText')"></Empty>
</template>

<script>
import Avatar from './Avatar.vue'
import Appellation from './Appellation.vue'
import Empty from './Empty.vue'
import { t } from '../utils/i18n'
import { events } from '../utils/constants'

export default {
  components: {
    Avatar,
    Appellation,
    Empty,
  },
  props: {
    personList: {
      type: Array,
      default() {
        return []
      },
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
  },
  data() {
    return {
      selectAccount: [],
    }
  },
  mounted() {
    this.selectAccount = this.personList
      .filter((item) => item.checked)
      .map((item) => item.accountId)
  },
  methods: {
    t,
    onBtnClick() {
      uni.$emit(events.FRIEND_SELECT)
      this.$emit('onBtnClick')
    },
    checkboxChange(event) {
      const value = event.detail.value
      this.selectAccount = value
      this.$emit('checkboxChange', value)
    },
  },
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
    // width: 100vw;

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
.ok-btn {
  margin-bottom: 15px;
}

.ok-btn-mp {
  margin-bottom: 15px;
}
</style>
