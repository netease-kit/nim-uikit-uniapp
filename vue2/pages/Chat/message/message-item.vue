<template>
  <div :id="MSG_ID_FLAG + msg.idClient" :key="msg.time">
    <div
      class="msg-time"
      v-if="msg.type === 'custom' && msg.attach.type === 'time'"
    >
      {{ msg.attach.value }}
    </div>
    <div
      class="msg-common"
      :style="{
        flexDirection: !isSelf ? 'row' : 'row-reverse',
      }"
      v-else-if="
        msg.type === 'custom' &&
        msg.attach.type === 'reCallMsg' &&
        msg.attach.canEdit
      "
    >
      <Avatar
        :account="msg.from"
        :teamId="msg.scene === 'team' ? msg.to : ''"
        :goto-user-card="true"
      />
      <MessageBubble :msg="msg" :bg-visible="true">
        {{ t('recall2') }}
        <text
          class="msg-recall-btn"
          @tap="
            () => {
              handleReeditMsg(msg)
            }
          "
        >
          {{ t('reeditText') }}
        </text>
      </MessageBubble>
    </div>
    <div
      class="msg-common"
      :style="{
        flexDirection: !isSelf ? 'row' : 'row-reverse',
      }"
      v-else-if="
        msg.type === 'custom' &&
        msg.attach.type === 'reCallMsg' &&
        !msg.attach.canEdit
      "
    >
      <Avatar
        :account="msg.from"
        :teamId="msg.scene === 'team' ? msg.to : ''"
        :goto-user-card="true"
      />
      <MessageBubble :msg="msg" :bg-visible="true">
        <div class="recall-text">{{ t('you') + t('recall') }}</div>
      </MessageBubble>
    </div>
    <div
      class="msg-common"
      :style="{
        flexDirection: !isSelf ? 'row' : 'row-reverse',
      }"
      v-else-if="msg.type === 'custom' && msg.attach.type === 'beReCallMsg'"
    >
      <Avatar
        :account="msg.from"
        :teamId="msg.scene === 'team' ? msg.to : ''"
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!isSelf">{{ appellation }}</div>
        <div :class="isSelf ? 'self-msg-recall' : 'msg-recall'">
          <text class="msg-recall2">
            {{ !isSelf ? t('recall2') : `${t('you') + t('recall')}` }}</text
          >
        </div>
      </div>
    </div>
    <div
      class="msg-common"
      v-else-if="msg.type === 'text'"
      :style="{
        flexDirection: !isSelf ? 'row' : 'row-reverse',
      }"
    >
      <Avatar
        :account="msg.from"
        :teamId="msg.scene === 'team' ? msg.to : ''"
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!isSelf">{{ appellation }}</div>
        <MessageBubble :msg="msg" :tooltip-visible="true" :bg-visible="true">
          <ReplyMessage
            v-if="replyMsg.idClient"
            :replyMsg="replyMsg"
          ></ReplyMessage>
          <MessageText :msg="msg"></MessageText>
        </MessageBubble>
      </div>
    </div>
    <div
      class="msg-common"
      v-else-if="msg.type === 'image'"
      :style="{
        flexDirection: !isSelf ? 'row' : 'row-reverse',
      }"
    >
      <Avatar
        :account="msg.from"
        :teamId="msg.scene === 'team' ? msg.to : ''"
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!isSelf">{{ appellation }}</div>
        <MessageBubble
          :msg="msg"
          :tooltip-visible="true"
          :bg-visible="true"
          style="cursor: pointer"
        >
          <div @tap="() => { handleImageTouch(msg.attach.url) }">
            <image
              class="msg-image"
              :lazy-load="true"
              mode="aspectFill"
              :src="msg.attach.url"
            ></image>
          </div>
        </MessageBubble>
      </div>
    </div>
    <div
      class="msg-common"
      v-else-if="msg.type === 'file'"
      :style="{
        flexDirection: !isSelf ? 'row' : 'row-reverse',
      }"
    >
      <Avatar
        :account="msg.from"
        :teamId="msg.scene === 'team' ? msg.to : ''"
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!isSelf">{{ appellation }}</div>
        <MessageBubble :msg="msg" :tooltip-visible="true" :bg-visible="false">
          <MessageFile :msg="msg" />
        </MessageBubble>
      </div>
    </div>
    <div
      class="msg-common"
      :style="{
        flexDirection: !isSelf ? 'row' : 'row-reverse',
      }"
      v-else
    >
      <Avatar
        :account="msg.from"
        :teamId="msg.scene === 'team' ? msg.to : ''"
        :goto-user-card="true"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!isSelf">{{ appellation }}</div>
        <MessageBubble :msg="msg" :tooltip-visible="true" :bg-visible="true">
          [{{ t('unknowMsgText') }}]
        </MessageBubble>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from '../../../utils/transformVue'
import Avatar from '../../../components/Avatar.vue'
import MessageBubble from './message-bubble.vue'
import MessageText from './message-text.vue'
import { events, MSG_ID_FLAG } from '../../../utils/constants'
import MessageFile from './message-file.vue'
import ReplyMessage from './message-reply.vue'
import { autorun } from 'mobx'
import { deepClone } from '../../../utils'
import { t } from '../../../utils/i18n'
import { IMMessage } from '@xkit-yx/im-store'
const props = defineProps({
  scene: {
    type: String, // Assuming TMsgScene is a custom object type
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  msg: {
    type: Object, // Assuming IMMessage is a custom object type
    default: () => ({
      idClient: undefined,
      body: undefined,
      attach: {
        type: undefined,
        value: undefined,
        url: undefined,
        canEdit: false,
        canRecall: false,
      },
      type: undefined,
      from: undefined,
      to: undefined,
      scene: undefined,
      time: undefined,
    }),
    required: true,
  },
  replyMsg: {
    type: Object, 
    default: () => ({
      idClient: undefined,
      body: undefined,
      attach: {
        type: undefined,
        value: undefined,
        url: undefined,
        canEdit: false,
        canRecall: false,
      },
      type: undefined,
    }),
  },
})
const appellation = ref('')
const isSelf = ref(false)


autorun(() => {
  isSelf.value = props.msg.from === uni.$UIKitStore.userStore.myUserInfo.account
})  



const handleImageTouch = (url: string) => {
  if (url) {
    uni.previewImage({
      urls: [url],
    })
  }
}

const handleReeditMsg = (msg: IMMessage) => {
  uni.$emit(events.ON_REEDIT_MSG, msg)
}

autorun(() => {
  // 昵称展示顺序 群昵称 > 备注 > 个人昵称 > 帐号
  appellation.value = deepClone(
    uni.$UIKitStore.uiStore.getAppellation({
      account: props.msg.from,
      teamId: props.scene === 'team' ? props.to : '',
    })
  )
})
</script>

<style scoped lang="scss">
.msg-common {
  margin-top: 8px;
  display: flex;
  align-items: flex-start;
  font-size: 16px;
}

.msg-content {
  display: flex;
  flex-direction: column;
}

.msg-name {
  font-size: 12px;
  color: #999;
  text-align: left;
  margin-bottom: 4px;
  max-width: 300rpx;
  padding-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.msg-image {
  max-width: 100%;
}

.msg-time {
  margin-top: 8px;
  text-align: center;
  color: #b3b7bc;
  font-size: 12px;
}

.msg-recall-btn {
  margin-left: 5px;
  color: #1861df;
}

.msg-recall2 {
  font-size: 16px;
}

.self-msg-recall {
  max-width: 360rpx;
  overflow: hidden;
  padding: 12px 16px;
  border-radius: 8px 0px 8px 8px;
  margin-right: 8px;
  background-color: #d6e5f6;
  color: #666666;
}

.msg-recall {
  max-width: 360rpx;
  overflow: hidden;
  padding: 12px 16px;
  border-radius: 0px 8px 8px 8px;
  margin-left: 8px;
  background-color: #e8eaed;
  color: #666666;
}

.recall-text {
  color: #666666;
}
</style>
