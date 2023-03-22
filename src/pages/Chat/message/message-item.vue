<template>
  <div class="msg-time" v-if="msg.type === 'custom' && msg.attach?.type === 'time'">{{ msg.attach?.value
  }}</div>
  <div class="msg-common" :style="{
    flexDirection: msg.flow === 'in' ? 'row' : 'row-reverse',
  }" v-else-if="
  msg.type === 'custom' &&
  msg.attach?.type === 'reCallMsg' &&
  msg.attach?.canEdit
">
    <Avatar :account="msg.from" :teamId="msg.scene === 'team' ? msg.to : void 0" :goto-user-card="true" />
    <MessageBubble :placement="msgIndex === 0 ? 'bottom' : 'top'" :msg="msg" :bg-visible="true">
      {{ $t('recall2') }} <text class="msg-recall-btn" @tap="() => { handleRecallMsg(msg.attach?.oldBody) }">{{
        $t('reeditText') }}</text>
    </MessageBubble>
  </div>
  <div class="msg-common" :style="{
    flexDirection: msg.flow === 'in' ? 'row' : 'row-reverse',
  }" v-else-if="
  msg.type === 'custom' &&
  msg.attach?.type === 'reCallMsg' &&
  !msg.attach?.canEdit
">
    <Avatar :account="msg.from" :teamId="msg.scene === 'team' ? msg.to : void 0" :goto-user-card="true" />
    <MessageBubble :placement="msgIndex === 0 ? 'bottom' : 'top'" :msg="msg" :bg-visible="true">
      {{ $t('you') + $t('recall') }}
    </MessageBubble>
  </div>
  <div class="msg-common" :style="{
    flexDirection: msg.flow === 'in' ? 'row' : 'row-reverse',
  }" v-else-if="
  msg.type === 'custom' && msg.attach?.type === 'beReCallMsg'
">
    <Avatar :account="msg.from" :teamId="msg.scene === 'team' ? msg.to : void 0" :goto-user-card="true" />
    <div class="msg-content">
      <div class="msg-name" v-if="msg.flow === 'in'">{{ store.uiStore.getAppellation({
        account: msg.from, teamId: scene
          === 'team' ? to : void 0
      })
      }}</div>
      <MessageBubble :placement="msgIndex === 0 ? 'bottom' : 'top'" :msg="msg" :bg-visible="true">
        {{ msg.flow === 'in' ? $t('recall2') : `${$t('you') + $t('recall')}` }}
      </MessageBubble>
    </div>
  </div>
  <div class="msg-common" v-else-if="msg.type === 'text'" :style="{
    flexDirection: msg.flow === 'in' ? 'row' : 'row-reverse',
  }">
    <Avatar :account="msg.from" :teamId="msg.scene === 'team' ? msg.to : void 0" :goto-user-card="true" />
    <div class="msg-content">
      <div class="msg-name" v-if="msg.flow === 'in'">{{ store.uiStore.getAppellation({
        account: msg.from, teamId: scene
          === 'team' ? to : void 0
      })
      }}</div>
      <MessageBubble :placement="msgIndex === 0 ? 'bottom' : 'top'" :msg="msg" :tooltip-visible="true" :bg-visible="true">
        <div class="msg-text" v-html="handleText(msg.body)"></div>
      </MessageBubble>
    </div>
  </div>
  <div class="msg-common" v-else-if="msg.type === 'image'" :style="{
    flexDirection: msg.flow === 'in' ? 'row' : 'row-reverse',
  }">
    <Avatar :account="msg.from" :teamId="msg.scene === 'team' ? msg.to : void 0" :goto-user-card="true" />
    <div class="msg-content">
      <div class="msg-name" v-if="msg.flow === 'in'">{{ store.uiStore.getAppellation({
        account: msg.from, teamId: scene
          === 'team' ? to : void 0
      })
      }}</div>
      <MessageBubble :placement="msgIndex === 0 ? 'bottom' : 'top'" :msg="msg" :tooltip-visible="true" :bg-visible="true"
        style="cursor: pointer;" @tap="() => { handleImageTouch(msg.attach?.url) }">
        <image class="msg-image" :lazy-load="true" mode="aspectFill" :src="msg.attach?.url"></image>
      </MessageBubble>
    </div>
  </div>
  <div class="msg-common" v-else-if="msg.type === 'file'" :style="{
    flexDirection: msg.flow === 'in' ? 'row' : 'row-reverse',
  }">
    <Avatar :account="msg.from" :teamId="msg.scene === 'team' ? msg.to : void 0" :goto-user-card="true" />
    <div class="msg-content">
      <div class="msg-name" v-if="msg.flow === 'in'">{{ store.uiStore.getAppellation({
        account: msg.from, teamId: scene
          === 'team' ? to : void 0
      })
      }}</div>
      <MessageBubble :placement="msgIndex === 0 ? 'bottom' : 'top'" :msg="msg" :tooltip-visible="true"
        :bg-visible="false">
        <MessageFile :msg="msg" />
      </MessageBubble>
    </div>
  </div>
  <div class="msg-common" :style="{
    flexDirection: msg.flow === 'in' ? 'row' : 'row-reverse',
  }" v-else>
    <Avatar :account="msg.from" :teamId="msg.scene === 'team' ? msg.to : void 0" :goto-user-card="true" />
    <div class="msg-content">
      <div class="msg-name" v-if="msg.flow === 'in'">{{ store.uiStore.getAppellation({
        account: msg.from, teamId: scene
          === 'team' ? to : void 0
      })
      }}</div>
      <MessageBubble :placement="msgIndex === 0 ? 'bottom' : 'top'" :msg="msg" :tooltip-visible="true" :bg-visible="true">
        [{{ $t('unknowMsgText') }}]
      </MessageBubble>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  IMMessage,
  TMsgScene,
} from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import { defineProps } from 'vue'
import Avatar from '../../../components/Avatar.vue'
import MessageBubble from './message-bubble.vue'
import stringReplace from '../../../utils/stringReplace'
import { emojiRegExp, emojiMap } from '../../../utils/emoji'
import encodeText from '../../../utils/encodeText'
import Svg from '../../../components/Svg.vue'
import { events } from '../../../utils/constants'
import MessageFile from './message-file.vue'
import { t } from '@/utils/i18n'

const props = defineProps<{
  scene: TMsgScene
  to: string
  msg: IMMessage
  msgIndex: number
}>()
const store = uni.$UIKitStore

const handleText = (text: string) => {
  const withHref = stringReplace(
    encodeText(text),
    /(https?:\/\/\S+)/gi,
    (match: string) => {
      return `<a style="color:#1861df;" href="${match}" target="_blank">${match}</a>`
    }
  ).join('')

  const withEmoji = stringReplace(withHref, emojiRegExp, (match: string) => {
    const svgStyle = 'width: 1em;height: 1em;vertical-align: -0.15em;fill: currentColor;overflow: hidden; font-size: 22px; margin: 0 2px;'
    const svg = `<svg style="${svgStyle}" aria-hidden="true"><use xlink:href = "#${emojiMap[match]}" ></use></svg>`
    return svg
  }).join('')

  return withEmoji
}

const handleImageTouch = (url: string) => {
  if (url) {
    uni.previewImage({
      urls: [url]
    })
  }
}

const handleRecallMsg = (body: string) => {
  uni.$emit(events.ON_REEDIT_MSG, body)
}
</script>

<style scoped lang="scss">
.msg-common {
  margin-top: 8px;
  display: flex;
  align-items: flex-start;
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

.msg-text {
  word-break: break-all;
  color: #333;
  text-align: left;
  font-size: 16px;
}

.msg-image {
  max-width: 100%;
}

.msg-time {
  margin-top: 8px;
  text-align: center;
  color: #B3B7BC;
  font-size: 12px;
}

.msg-recall-btn {
  margin-left: 5px;
  color: #1861df;
}
</style>
