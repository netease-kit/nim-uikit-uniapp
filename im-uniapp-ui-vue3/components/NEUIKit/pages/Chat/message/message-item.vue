<template>
  <div
    :class="`msg-item-wrapper ${
      !props.readonly &&
      props.msg.pinState &&
      !(
        props.msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
        props.msg.timeValue !== undefined
      ) &&
      !props.msg.recallType
        ? 'msg-pin'
        : ''
    } ${props.isMultiSelecting ? 'msg-item-wrapper-selecting' : ''} ${
      props.selected ? 'msg-item-wrapper-selected' : ''
    }`"
    :id="MSG_ID_FLAG + props.msg.messageClientId"
    :key="props.msg.createTime"
    @tap.capture="handleItemTap"
  >
    <div
      v-if="props.isMultiSelecting && selectable"
      class="msg-select-checkbox"
      :class="{ selected: props.selected }"
    >
      <text v-if="props.selected">✓</text>
    </div>
    <!-- 消息时间 -->
    <div
      class="msg-time"
      v-if="
        props.msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
        props.msg.timeValue !== undefined
      "
    >
      {{ props.msg.timeValue }}
    </div>
    <!-- 撤回消息 可重新编辑 -->
    <div
      class="msg-common"
      :style="{
        flexDirection: !props.msg.isSelf ? 'row' : 'row-reverse',
      }"
      v-else-if="
        props.msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
        props.msg.recallType === 'reCallMsg' &&
        props.msg.canEdit
      "
    >
      <Avatar
        :account="props.msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="!props.readonly && !props.isMultiSelecting"
      />
      <MessageBubble
        v-bind="bubbleOperationProps"
        :msg="props.msg"
        :bg-visible="true"
      >
        {{ t('recall2') }}
        <text
          v-if="!props.readonly"
          class="msg-recall-btn"
          @tap="
            () => {
              handleReeditMsg(props.msg)
            }
          "
        >
          {{ t('reeditText') }}
        </text>
      </MessageBubble>
    </div>
    <!-- 撤回消息 不可重新编辑 主动撤回 -->
    <div
      class="msg-common"
      :style="{ flexDirection: !props.msg.isSelf ? 'row' : 'row-reverse' }"
      v-else-if="
        props.msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
        props.msg.recallType === 'reCallMsg' &&
        !props.msg.canEdit
      "
    >
      <Avatar
        :account="props.msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="!props.readonly && !props.isMultiSelecting"
      />
      <MessageBubble
        v-bind="bubbleOperationProps"
        :msg="props.msg"
        :bg-visible="true"
      >
        <div class="recall-text">{{ t('you') + t('recall') }}</div>
      </MessageBubble>
    </div>
    <!-- 撤回消息 对方撤回-->
    <div
      class="msg-common"
      :style="{ flexDirection: !props.msg.isSelf ? 'row' : 'row-reverse' }"
      v-else-if="
        props.msg.messageType ===
          V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
        props.msg.recallType === 'beReCallMsg'
      "
    >
      <Avatar
        :account="props.msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="!props.readonly && !props.isMultiSelecting"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="!props.msg.isSelf">
          {{ appellation }}
        </div>
        <div :class="props.msg.isSelf ? 'self-msg-recall' : 'msg-recall'">
          <text class="msg-recall2">
            {{ !props.msg.isSelf ? t('recall2') : `${t('you') + t('recall')}` }}
          </text>
        </div>
      </div>
    </div>
    <!-- 文本消息-->
    <div
      class="msg-common"
      v-else-if="
        props.msg.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_TEXT
      "
      :style="{ flexDirection: !props.msg.isSelf ? 'row' : 'row-reverse' }"
    >
      <Avatar
        :account="props.msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="!props.readonly && !props.isMultiSelecting"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="props.readonly || !props.msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble
          v-bind="bubbleOperationProps"
          :msg="props.msg"
          :tooltip-visible="true"
          :bg-visible="true"
        >
          <ReplyMessage v-if="!!replyMsg" :replyMsg="replyMsg"></ReplyMessage>
          <MessageText
            :msg="props.msg"
            :disable-ait="props.readonly"
          ></MessageText>
        </MessageBubble>
      </div>
      <MessageIsRead
        v-if="props.msg?.isSelf && !props.readonly && !props.isMultiSelecting"
        :msg="props.msg"
      ></MessageIsRead>
    </div>
    <!-- 图片消息-->
    <div
      class="msg-common"
      v-else-if="
        props.msg.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_IMAGE
      "
      :style="{ flexDirection: !props.msg.isSelf ? 'row' : 'row-reverse' }"
    >
      <Avatar
        :account="props.msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="!props.readonly && !props.isMultiSelecting"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="props.readonly || !props.msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble
          v-bind="bubbleOperationProps"
          :msg="props.msg"
          :tooltip-visible="true"
          :bg-visible="true"
          style="cursor: pointer"
        >
          <div
            @tap="
              () => {
                //@ts-ignore
                handleImageTouch(props.msg.attachment?.url)
              }
            "
          >
            <image
              class="msg-image"
              :lazy-load="true"
              mode="aspectFill"
              :src="imageUrl"
            ></image>
          </div>
        </MessageBubble>
      </div>
      <MessageIsRead
        v-if="props.msg?.isSelf && !props.readonly && !props.isMultiSelecting"
        :msg="props.msg"
      ></MessageIsRead>
    </div>
    <!-- 视频消息-->
    <div
      class="msg-common"
      v-else-if="
        props.msg.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_VIDEO
      "
      :style="{ flexDirection: !props.msg.isSelf ? 'row' : 'row-reverse' }"
    >
      <Avatar
        :account="props.msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="!props.readonly && !props.isMultiSelecting"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="props.readonly || !props.msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble
          v-bind="bubbleOperationProps"
          :msg="props.msg"
          :tooltip-visible="true"
          :bg-visible="true"
          style="cursor: pointer"
        >
          <div
            class="video-msg-wrapper"
            @tap="() => handleVideoTouch(props.msg)"
          >
            <div class="video-play-button">
              <div class="video-play-icon"></div>
            </div>
            <image
              class="msg-image"
              :lazy-load="true"
              mode="aspectFill"
              :src="videoFirstFrameDataUrl"
            ></image>
          </div>
        </MessageBubble>
      </div>
      <MessageIsRead
        v-if="props.msg?.isSelf && !props.readonly && !props.isMultiSelecting"
        :msg="props.msg"
      ></MessageIsRead>
    </div>
    <!-- 音视频消息-->
    <div
      class="msg-common"
      v-else-if="
        props.msg.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CALL
      "
      :style="{ flexDirection: !props.msg.isSelf ? 'row' : 'row-reverse' }"
    >
      <Avatar
        :account="props.msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="!props.readonly && !props.isMultiSelecting"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="props.readonly || !props.msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble
          v-bind="bubbleOperationProps"
          :msg="props.msg"
          :tooltip-visible="true"
          :bg-visible="true"
        >
          <MessageG2 v-if="!props.readonly" :msg="props.msg" />
          <text v-else class="readonly-call-placeholder">
            [{{ callRecordText }}]
          </text>
        </MessageBubble>
      </div>
    </div>
    <!-- 文件消息-->
    <div
      class="msg-common"
      v-else-if="
        props.msg.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_FILE
      "
      :style="{ flexDirection: !props.msg.isSelf ? 'row' : 'row-reverse' }"
    >
      <Avatar
        :account="props.msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="!props.readonly && !props.isMultiSelecting"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="props.readonly || !props.msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble
          v-bind="bubbleOperationProps"
          :msg="props.msg"
          :tooltip-visible="true"
          :bg-visible="false"
        >
          <MessageFile :msg="props.msg" />
        </MessageBubble>
      </div>
      <MessageIsRead
        v-if="props.msg?.isSelf && !props.readonly && !props.isMultiSelecting"
        :msg="props.msg"
      ></MessageIsRead>
    </div>
    <!-- 语音消息-->
    <div
      class="msg-common"
      v-else-if="
        props.msg.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_AUDIO
      "
      :style="{
        flexDirection: !props.msg.isSelf ? 'row' : 'row-reverse',
      }"
    >
      <Avatar
        :account="props.msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="!props.readonly && !props.isMultiSelecting"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="props.readonly || !props.msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble
          v-bind="bubbleOperationProps"
          :msg="props.msg"
          :tooltip-visible="true"
          :bg-visible="true"
          style="cursor: pointer"
        >
          <MessageAudio
            v-if="!props.readonly"
            :msg="props.msg"
            :broadcastNewAudioSrc="broadcastNewAudioSrc"
          />
          <text v-else class="readonly-audio-placeholder">
            [{{ t('audioMsgText') }}]
          </text>
        </MessageBubble>
      </div>
      <MessageIsRead
        v-if="props.msg?.isSelf && !props.readonly && !props.isMultiSelecting"
        :msg="props.msg"
      ></MessageIsRead>
    </div>
    <!-- 合并转发消息 -->
    <div
      class="msg-common"
      v-else-if="isMergedForward"
      :style="{ flexDirection: !props.msg.isSelf ? 'row' : 'row-reverse' }"
    >
      <Avatar
        :account="props.msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="!props.readonly && !props.isMultiSelecting"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="props.readonly || !props.msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble
          v-bind="bubbleOperationProps"
          :msg="props.msg"
          :tooltip-visible="true"
          :bg-visible="false"
        >
          <MergedForwardCard :msg="props.msg" />
        </MessageBubble>
      </div>
      <MessageIsRead
        v-if="props.msg?.isSelf && !props.readonly && !props.isMultiSelecting"
        :msg="props.msg"
      ></MessageIsRead>
    </div>
    <!-- 通知消息-->
    <MessageNotification
      v-else-if="
        props.msg.messageType ===
        V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_NOTIFICATION
      "
      :msg="props.msg"
    />
    <div
      class="msg-common"
      :style="{ flexDirection: !props.msg.isSelf ? 'row' : 'row-reverse' }"
      v-else
    >
      <Avatar
        :account="props.msg.senderId"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        :goto-user-card="!props.readonly && !props.isMultiSelecting"
      />
      <div class="msg-content">
        <div class="msg-name" v-if="props.readonly || !props.msg.isSelf">
          {{ appellation }}
        </div>
        <MessageBubble
          v-bind="bubbleOperationProps"
          :msg="props.msg"
          :tooltip-visible="true"
          :bg-visible="true"
        >
          [{{ t('unknowMsgText') }}]
        </MessageBubble>
      </div>
    </div>
    <!-- 消息标记 不展示 pinState 为 0 、时间消息以及撤回消息的标记样式 -->
    <div
      class="msg-pin-tip"
      v-if="
        !props.readonly &&
        props.msg.pinState &&
        !(
          props.msg.messageType ===
            V2NIMConst.V2NIMMessageType.V2NIM_MESSAGE_TYPE_CUSTOM &&
          props.msg.timeValue !== undefined
        ) &&
        !props.msg.recallType
      "
      :style="{ justifyContent: !props.msg.isSelf ? 'flex-start' : 'flex-end' }"
    >
      <Icon :size="11" type="icon-green-pin"></Icon>&nbsp;<span
        v-if="props.msg.operatorId === accountId"
        >{{ `${t('you')}` }}</span
      >
      <Appellation
        v-else
        :account="props.msg.operatorId || ''"
        :teamId="
          conversationType ===
          V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
            ? to
            : ''
        "
        color="#3EAF96"
        :fontSize="11"
      ></Appellation
      >&nbsp;{{ `${t('pinThisText')}` }}
    </div>
  </div>
</template>

<script lang="ts" setup>
/** 消息组件 */
import { ref, computed, onUnmounted } from 'vue'
import Avatar from '../../../components/Avatar.vue'
import MessageBubble from './message-bubble.vue'
import ReplyMessage from './message-reply.vue'
import MessageFile from './message-file.vue'
import MessageText from './message-text.vue'
import MessageAudio from './message-audio.vue'
import MessageNotification from './message-notification.vue'
import MessageG2 from './message-g2.vue'
import MergedForwardCard from './forward/merged-forward-card.vue'
import { customNavigateTo } from '../../../utils/customNavigate'
import MessageIsRead from './message-read.vue'
import Icon from '../../../components/Icon.vue'
import Appellation from '../../../components/Appellation.vue'
import { events, MSG_ID_FLAG } from '../../../utils/constants'
import { autorun } from '../../../utils/module/im-store-v2/uniapp/index.esm.js'
import { stopAllAudio } from '../../../utils'
import { t } from '../../../utils/i18n'
import type { V2NIMMessageForUI } from '../../../utils/module/im-store-v2/types/src'
import { V2NIMConst } from '../../../utils/nim'
import { isSelectableMessage } from '../../../utils/messageMultiSelect'
import { isMergedForwardMessage } from '../../../utils/mergedForward'

const props = withDefaults(
  defineProps<{
    msg: V2NIMMessageForUI & { timeValue?: number }
    index: number
    replyMsgsMap?: {
      [key: string]: V2NIMMessageForUI
    }
    broadcastNewAudioSrc: string
    isMultiSelecting?: boolean
    selectedMessageKeys?: string[]
    selected?: boolean
    readonly?: boolean
    onToggleSelect?: (msg: V2NIMMessageForUI) => void
    onMultiSelect?: (msg: V2NIMMessageForUI) => void
  }>(),
  {
    isMultiSelecting: false,
    selectedMessageKeys: () => [],
    selected: false,
    readonly: false,
  }
)

const selectable = computed(
  () => !props.readonly && isSelectableMessage(props.msg)
)

const bubbleOperationProps = computed(() => ({
  isMultiSelecting: props.isMultiSelecting,
  readonly: props.readonly,
  onMultiSelect: props.onMultiSelect,
}))

const isMergedForward = computed(() =>
  isMergedForwardMessage(uni.$UIKitStore, props.msg)
)

const mergedMessageServerExtension = computed(() => {
  if (!props.readonly || !props.msg.serverExtension) return {}
  try {
    return JSON.parse(props.msg.serverExtension) as {
      mergedMessageNickKey?: string
      mergedMessageAvatarKey?: string
    }
  } catch {
    return {}
  }
})

const callRecordText = computed(() =>
  Number((props.msg.attachment as any)?.type) === 1
    ? t('voiceCallText')
    : t('videoCallText')
)

const handleItemTap = (event: Event) => {
  if (!props.isMultiSelecting || !selectable.value) return
  event.stopPropagation?.()
  props.onToggleSelect?.(props.msg)
}

/** 回复消息 */
const replyMsg = computed(() => {
  return props.replyMsgsMap && props.replyMsgsMap[props.msg.messageClientId]
})

/** 昵称 */
const appellation = ref('')
/** 当前用户账号 */
const accountId = uni.$UIKitStore?.userStore?.myUserInfo.accountId

/** 会话类型 */
const conversationType = props.readonly
  ? (props.msg.conversationType as V2NIMConst.V2NIMConversationType)
  : (uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationType(
      props.msg.conversationId
    ) as unknown as V2NIMConst.V2NIMConversationType)
/** 会话对象 */
const to = props.readonly
  ? ''
  : uni.$UIKitNIM.V2NIMConversationIdUtil.parseConversationTargetId(
      props.msg.conversationId
    )

/** 获取视频首帧 */
const videoFirstFrameDataUrl = computed(() => {
  //@ts-ignore
  const url = props.msg.attachment?.url
  return url ? `${url}${url.includes('?') ? '&' : '?'}vframe&offset=1` : ''
})

/** 图片地址 */
const imageUrl = computed(() => {
  /** 被拉黑 */
  if (props.msg.messageStatus?.errorCode == 102426) {
    return 'https://yx-web-nosdn.netease.im/common/c1f278b963b18667ecba4ee9a6e68047/img-fail.png'
  }

  /** 非好友关系 */
  if (props.msg.messageStatus?.errorCode == 104404) {
    return 'https://yx-web-nosdn.netease.im/common/c1f278b963b18667ecba4ee9a6e68047/img-fail.png'
  }

  //@ts-ignore
  return props.msg?.attachment?.url || props.msg.attachment?.file
})

/** 点击图片预览 */
const handleImageTouch = (url: string) => {
  if (url) {
    uni.previewImage({
      urls: [url],
    })
  }
}

/** 点击视频播放 */
const handleVideoTouch = (msg: V2NIMMessageForUI) => {
  stopAllAudio()
  //@ts-ignore
  const url = msg.attachment?.url
  if (url) {
    customNavigateTo({
      url: `/pages/Chat/video-play?videoUrl=${encodeURIComponent(url)}`,
    })
  }
}

/** 重新编辑消息 */
const handleReeditMsg = (msg: V2NIMMessageForUI) => {
  uni.$emit(events.ON_REEDIT_MSG, msg)
}

/** 监听昵称变化 */
const appellationWatch = autorun(() => {
  if (props.readonly) {
    appellation.value =
      mergedMessageServerExtension.value.mergedMessageNickKey ||
      props.msg.senderId
    return
  }
  /** 昵称展示顺序 群昵称 > 备注 > 个人昵称 > 帐号 */
  appellation.value = uni.$UIKitStore.uiStore.getAppellation({
    account: props.msg.senderId,
    teamId:
      conversationType ===
      V2NIMConst.V2NIMConversationType.V2NIM_CONVERSATION_TYPE_TEAM
        ? to
        : '',
  })
})

onUnmounted(() => {
  appellationWatch()
})
</script>

<style scoped lang="scss">
.msg-item-wrapper {
  position: relative;
  padding: 0 15px 15px;
  box-sizing: border-box;
  transition: padding-left 0.2s ease, background-color 0.2s ease;
}

.msg-item-wrapper-selecting {
  padding-left: 48px;
}

.msg-item-wrapper-selected {
  background: #f3f7ff;
}

.msg-select-checkbox {
  position: absolute;
  top: 50%;
  left: 15px;
  z-index: 2;
  display: flex;
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border: 1px solid #b3b7bc;
  border-radius: 50%;
  color: #fff;
  background: #fff;
  font-size: 12px;
  line-height: 18px;
  transform: translateY(-50%);

  &.selected {
    border-color: #337eff;
    background: #337eff;
  }
}

.msg-common {
  padding-top: 8px;
  display: flex;
  align-items: flex-start;
  font-size: 16px;
  message-is-read {
    align-self: flex-end;
  }
}
.msg-pin {
  opacity: 1;
  background: #fffbea;
}
.msg-pin-tip {
  font-size: 11px;
  font-weight: normal;
  color: #3eaf96;
  margin: 8px 50px 0 50px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
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

.readonly-audio-placeholder,
.readonly-call-placeholder {
  color: #333;
  user-select: text;
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

.video-play-button {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  z-index: 9;
}

.video-play-icon {
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 18px solid #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40%, -50%);
}

.video-msg-wrapper {
  box-sizing: border-box;
  max-width: 360rpx;
}
</style>
