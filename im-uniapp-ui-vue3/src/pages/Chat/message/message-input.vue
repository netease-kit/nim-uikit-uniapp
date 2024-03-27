<template>
  <div class="input-root">
    <!-- 以下这个 div 用于确保 vue2 的 ref 会更新 -->
    <div style="display: none">
      <div>{{ teamMute ? '禁言' : '不禁言' }}</div>
      <div>{{ isTeamMute ? '禁言' : '不禁言' }}</div>
    </div>
    <div class="msg-input-wrapper">
      <!-- 键盘上要显示的回复消息内容 -->
      <div v-if="isReplyMsg" class="reply-message-wrapper">
        <div class="reply-message-close" @tap="removeReplyMsg">
          <Icon
            color="#929299"
            :iconStyle="{ fontWeight: '200' }"
            :size="13"
            type="icon-guanbi"
          />
        </div>
        ｜
        <div class="reply-title">{{ t('replyText') }}</div>
        <div
          class="reply-noFind"
          v-if="replyMsg && replyMsg.idClient == 'noFind'"
        >
          {{ t('replyNotFindText') }}
        </div>
        <div class="reply-message" v-else>
          <div class="reply-to">
            <Appellation
              :account="replyMsg.from"
              :team-id="scene === 'team' ? to : ''"
              color="#929299"
              :fontSize="13"
            >
            </Appellation>
          </div>
          :
          <div v-if="replyMsg.type === 'text'" class="reply-msg-content">
            <message-one-line :text="replyMsg.body"></message-one-line>
          </div>
          <div v-else>{{ '[' + REPLY_MSG_TYPE_MAP[replyMsg.type] + ']' }}</div>
        </div>
      </div>
      <!-- 输入框上按钮组 -->
      <div class="msg-button-group">
        <div v-if="!isWeb" class="msg-input-button" @tap="handleAudioVisible">
          <Icon
            v-if="audioPanelVisible"
            :size="20"
            type="audio-btn-selected"
            key="audio-btn-selected"
          />
          <Icon v-else :size="20" type="icon-audio" key="icon-audio" />
        </div>
        <div class="msg-input-button" @tap="handleEmojiVisible">
          <Icon :size="20" type="icon-biaoqing" />
        </div>
        <div class="msg-input-button" @tap="handleSendImageMsg">
          <div>
            <Icon :size="20" type="icon-tupian" />
          </div>
        </div>
        <div class="msg-input-button" @tap="handleSetting">
          <Icon type="icon-shezhi" :size="20" />
        </div>
        <div class="msg-input-button" @tap="handleSendMoreVisible">
          <Icon type="send-more" :size="20" />
        </div>
      </div>
      <div v-if="inputVisible" class="msg-input">
        <!-- 当从表情面板切换到文字输入时，直接唤起键盘，ios 会存在input框消失的情况，故此处需要用EmojiInput兼容下 -->
        <div
          v-if="showEmojiInput && !isIOSWeb"
          @click="onClickEmojiInput"
          class="input-emoji"
        >
          <div v-if="inputText" class="input-text">{{ inputText }}</div>
          <div v-else class="input-placeholder">
            {{
              isTeamMute ? t('teamMutePlaceholder') : t('chatInputPlaceHolder')
            }}
          </div>
        </div>
        <input
          v-else
          :focus="isFocus"
          class="msg-input-input"
          :maxlength="-1"
          :placeholder="
            isTeamMute ? t('teamMutePlaceholder') : t('chatInputPlaceHolder')
          "
          v-model="inputText"
          type="text"
          :disabled="isTeamMute"
          :confirm-hold="true"
          cursor-spacing="20"
          adjust-position="true"
          confirm-type="send"
          @confirm="handleSendTextMsg"
          @blur="handleInputBlur"
          @focus="handleInputFocus"
          @input="handleInput"
          id="msg-input"
        />
      </div>
      <!-- 表情面板 -->
      <div v-if="emojiVisible" class="msg-emoji-panel" @click.stop="() => {}">
        <Face
          @emojiClick="handleEmoji"
          @emojiDelete="handleEmojiDelete"
          @emojiSend="handleSendTextMsg"
        />
      </div>
      <!-- 发送语音消息面板 -->
      <div
        v-if="audioPanelVisible"
        class="msg-audio-panel"
        @click.stop="() => {}"
      >
        <VoicePanel @handleSendAudioMsg="handleSendAudioMsg"></VoicePanel>
      </div>
      <!-- 发送更多面板 -->
      <div
        v-if="sendMoreVisible"
        class="send-more-panel"
        @click.stop="() => {}"
      >
        <div
          class="send-more-panel-item"
          @tap="(event) => handleSendVideoMsg('camera', event)"
        >
          <Icon type="icon-paishe" :size="30"></Icon>
        </div>
        <div
          class="send-more-panel-item"
          @tap="(event) => handleSendVideoMsg('album', event)"
        >
          <Icon type="icon-shipin2" :size="30"></Icon>
        </div>
      </div>
    </div>
    <UniPopup
      ref="popupRef"
      background-color="#ffffff"
      type="bottom"
      mask-background-color="rgba(0,0,0,0.4)"
      @change="onPopupChange"
    >
      <MentionMemberList :team-id="to"></MentionMemberList>
    </UniPopup>
  </div>
</template>

<script lang="ts" setup>
import type { TMsgScene } from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
// @ts-ignore
import Face from './face.vue'
import VoicePanel from './voice-panel.vue'
import Icon from '../../../components/Icon.vue'
import {
  ref,
  getCurrentInstance,
  computed,
  onUnmounted,
  onMounted,
  defineProps,
} from '../../../utils/transformVue'
import { ALLOW_AT, events, REPLY_MSG_TYPE_MAP } from '../../../utils/constants'
import { emojiMap } from '../../../utils/emoji'
import { t } from '../../../utils/i18n'
import { handleNoPermission } from '../../../utils/permission'
import { customNavigateTo } from '../../../utils/customNavigate'
import type { IMMessage } from '@xkit-yx/im-store'
import MessageOneLine from '../../../components/MessageOneLine.vue'
import { getUniPlatform, stopAllAudio } from '../../../utils'
// @ts-ignore
import UniPopup from '../../../components/uni-components/uni-popup/components/uni-popup/uni-popup.vue'
import MentionMemberList from './mention-member-list.vue'
import { autorun } from 'mobx'
import Appellation from '../../../components/Appellation.vue'
import { AT_ALL_ACCOUNT } from '../../../utils/constants'
import type { Team, TeamMember } from '@xkit-yx/im-store'
import { deepClone } from '../../../utils'

type MentionedMember = { account: string; appellation: string }
const props = defineProps({
  scene: {
    type: String, // Assuming TMsgScene is a custom object type
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  replyMsgsMap: {
    type: Object,
    default: undefined,
  },
})
const inputText = ref('')
const extVisible = ref(false)
// 音频面板flag
const audioPanelVisible = ref(false)
// 发送更多面板flag
const sendMoreVisible = ref(false)
// 表情面板flag
const emojiVisible = ref(false)
// input框flag
const inputVisible = computed(() => {
  if (audioPanelVisible.value || sendMoreVisible.value) {
    return false
  } else {
    return true
  }
})
const uniPlatform = getUniPlatform()
const isAndroidApp =
  uni.getSystemInfoSync().platform == 'android' && uniPlatform == 'app'
const showEmojiInput = ref(false)
const isIOSWeb =
  uniPlatform === 'web' && uni.getSystemInfoSync().platform === 'ios'
const isWeb = uniPlatform === 'web'
// 回复消息相关
const isReplyMsg = ref(false)
const isFocus = ref(false)
const replyMsg = ref<IMMessage>({
  idClient: '',
  from: '',
  // @ts-ignore
  type: '',
  text: '',
  body: '',
  sessionId: '',
})
// @消息相关
const ctx = getCurrentInstance()
const popupRef = ref(null)
const selectedAtMembers = ref<MentionedMember[]>([])

// 群相关
const team = ref<Team>()
const teamMembers = ref<TeamMember[]>([])
const teamMute = ref(false)

const isGroupOwner = computed(() => {
  // @ts-ignore
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return (team.value ? team.value.owner : '') === (myUser ? myUser.account : '')
})

const isGroupManager = computed(() => {
  // @ts-ignore
  const myUser = uni.$UIKitStore.userStore.myUserInfo
  return teamMembers.value
    .filter((item) => item.type === 'manager')
    .some((member) => member.account === (myUser ? myUser.account : ''))
})

const allowAtAll = computed(() => {
  let ext: any = {}
  try {
    ext = JSON.parse((team.value || {}).ext || '{}')
  } catch (error) {
    //
  }
  if (ext[ALLOW_AT] === 'manager') {
    return isGroupOwner.value || isGroupManager.value
  }
  return true
})

const isTeamMute = computed(() => {
  if (!teamMute.value) {
    return false
  }
  // 群主或者群管理员在群禁言时，可以发送消息
  if (isGroupOwner.value || isGroupManager.value) {
    return false
  }
  return true
})

const onPopupChange = (e: any) => {
  uni.$emit(events.HANDLE_MOVE_THROUGH, e.value)
}

const handleMentionItemClick = (member: MentionedMember) => {
  // @ts-ignore
  ctx.refs.popupRef.close()
  uni.$emit(events.HANDLE_MOVE_THROUGH, false)
  const nickInTeam = member.appellation
  selectedAtMembers.value = [
    ...selectedAtMembers.value.filter(
      (item) => item.account !== member.account
    ),
    member,
  ]
  const newInputText = inputText.value + nickInTeam + ' '
  // 更新input框的内容
  inputText.value = newInputText
}

const closePopup = () => {
  // @ts-ignore
  ctx.refs.popupRef.close()
}

const onClickEmojiInput = () => {
  showEmojiInput.value = false
  extVisible.value = false
  emojiVisible.value = false
  setTimeout(() => {
    isFocus.value = true
  }, 300)
}

const handleInputFocus = () => {
  uni.$emit(events.ON_INPUT_FOCUS_CHANGE, true)
}

const handleInputBlur = () => {
  isFocus.value = false
  // setTimeout(() => {
  //   uni.$emit(events.ON_SCROLL_BOTTOM)
  // }, 300)
  uni.$emit(events.ON_INPUT_FOCUS_CHANGE, false)
}

const handleInput = (event: any) => {
  const text = event?.detail?.value
  const isAit = text.endsWith('@') || text.endsWith('@\n')
  if (props.scene == 'team') {
    if (isAit) {
      // 当前输入的是@
      uni.hideKeyboard()
      // @ts-ignore
      ctx.refs.popupRef.open('bottom')
      isFocus.value = false
      uni.$emit(events.HANDLE_MOVE_THROUGH, true)
    }
  }
}

// 发送文本消息
const handleSendTextMsg = () => {
  if (inputText.value.trim() === '') return
  const ext = onAtMembersExtHandler()
  // @ts-ignore
  uni.$UIKitStore.msgStore
    .sendTextMsgActive({
      scene: props.scene as TMsgScene,
      to: props.to,
      body: inputText.value,
      ext: selectedAtMembers.value.length && ext,
    })
    .then(() => {
      // if (extVisible.value) {
      //   emojiVisible.value = false
      //   extVisible.value = false
      //   uni.hideKeyboard()
      // }
    })
  inputText.value = ''
  isReplyMsg.value = false
  selectedAtMembers.value = []
  uni.$emit(events.ON_SCROLL_BOTTOM)
}

// 移除回复消息
const removeReplyMsg = () => {
  // @ts-ignore
  uni.$UIKitStore.msgStore.removeReplyMsgActive(
    replyMsg?.value?.sessionId as string
  )
  isReplyMsg.value = false
}

// 显示表情面板
const handleEmojiVisible = () => {
  if (isTeamMute.value) return
  if (uniPlatform == 'mp-weixin' || isAndroidApp) {
    setTimeout(() => {
      emojiVisible.value = true
      extVisible.value = true
      uni.$emit(events.ON_SCROLL_BOTTOM)
    }, 300)
  } else {
    emojiVisible.value = true
    extVisible.value = true
  }
  showEmojiInput.value = true
  audioPanelVisible.value = false
  sendMoreVisible.value = false
  uni.$emit(events.ON_SCROLL_BOTTOM)
}

// 显示发送更多"+"面板
const handleSendMoreVisible = () => {
  if (isTeamMute.value) return
  audioPanelVisible.value = false
  emojiVisible.value = false
  sendMoreVisible.value = !sendMoreVisible.value
  setTimeout(() => {
    uni.$emit(events.ON_SCROLL_BOTTOM)
  }, 300)
}

const handleEmoji = (emoji: { key: string; type: string }) => {
  inputText.value += emoji.key
}
// 删除表情
const handleEmojiDelete = () => {
  let target = ''
  const isEmojiEnd = Object.keys(emojiMap).reduce((prev, cur) => {
    const isEnd = inputText.value.endsWith(cur)
    if (isEnd) {
      target = cur
    }
    return prev || isEnd
  }, false)
  if (isEmojiEnd && target) {
    inputText.value = inputText.value.replace(target, '')
  } else {
    inputText.value = inputText.value.slice(0, -1)
  }
}

// 显示语音面板
const handleAudioVisible = () => {
  if (isTeamMute.value) return
  audioPanelVisible.value = !audioPanelVisible.value
  emojiVisible.value = false
  setTimeout(() => {
    uni.$emit(events.ON_SCROLL_BOTTOM)
  }, 300)
}

// 发送图片消息
const handleSendImageMsg = () => {
  if (isTeamMute.value) return
  stopAllAudio()
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    success: (res) => {
      // @ts-ignore
      uni.$UIKitStore.msgStore
        .sendImageMsgActive({
          scene: props.scene as TMsgScene,
          to: props.to,
          filePath: res.tempFilePaths[0],
        })
        .catch(() => {
          uni.showToast({
            icon: 'error',
            title: t('sendImageFailedText'),
          })
        })
        .finally(() => {
          setTimeout(() => {
            uni.$emit(events.ON_SCROLL_BOTTOM)
          }, 100)
        })
    },
    //没有开启权限时，提示开启权限
    complete: handleNoPermission,
  })
}

// 发送视频消息（使用相机或者从相册选择）
const handleSendVideoMsg = (type: string, event: any) => {
  if (isTeamMute.value) return
  stopAllAudio()
  // 这里做一层拦截的原因是，微信小程序在input聚焦的时候点击+号按钮，会触发此函数执行，阻止冒泡也无法解决该问题，疑为uniapp编译问题
  if (uniPlatform == 'mp-weixin' && event?.type == 'blur') {
    return
  }

  uni.chooseVideo({
    sourceType: [type],
    compressed: true,
    maxDuration: 60,
    success: (res) => {
      // @ts-ignore
      uni.$UIKitStore.msgStore
        .sendVideoMsgActive({
          scene: props.scene as TMsgScene,
          to: props.to,
          filePath: res.tempFilePath,
          onUploadStart: () => {
            setTimeout(() => {
              uni.$emit(events.ON_SCROLL_BOTTOM)
            }, 100)
          },
        })
        .catch(() => {
          uni.showToast({
            icon: 'error',
            title: t('sendVideoFailedText'),
          })
        })
        .finally(() => {
          setTimeout(() => {
            uni.$emit(events.ON_SCROLL_BOTTOM)
          }, 100)
        })
    },
    //没有开启权限时，提示开启权限
    complete: handleNoPermission,
  })
}

// 发送语音消息
const handleSendAudioMsg = (filePath: string, duration: number) => {
  // @ts-ignore
  uni.$UIKitStore.msgStore
    .sendAudioMsgActive({
      scene: props.scene,
      to: props.to,
      filePath,
      duration,
      onUploadStart: () => {
        setTimeout(() => {
          uni.$emit(events.ON_SCROLL_BOTTOM)
        }, 100)
      },
    })
    .then(() => {
      uni.$emit(events.ON_SCROLL_BOTTOM)
    })
    .catch(() => {
      uni.showToast({
        icon: 'error',
        title: t('sendAudioFailedText'),
      })
    })
    .finally(() => {
      setTimeout(() => {
        uni.$emit(events.ON_SCROLL_BOTTOM)
      }, 100)
    })
}

const handleSendFileMsg = () => {
  uni.chooseFile({
    count: 1,
    success: (res) => {
      // @ts-ignore
      uni.$UIKitStore.msgStore.sendFileMsgActive({
        scene: props.scene as TMsgScene,
        to: props.to,
        filePath: res.tempFilePaths[0],
      })
    },
  })
}

// 跳转设置页
const handleSetting = () => {
  if (props.scene === 'p2p') {
    customNavigateTo({
      url: `/pages/Chat/message/p2p-set?id=${props.to}`,
    })
  } else if (props.scene === 'team') {
    customNavigateTo({
      url: `/pages/Group/group-set/index?id=${props.to}`,
    })
  }
}

onMounted(() => {
  autorun(() => {
    if (props.scene === 'team') {
      // @ts-ignore
      const team = deepClone(uni.$UIKitStore.teamStore.teams.get(props.to))
      team.value = team
      teamMute.value = team.mute

      teamMembers.value = deepClone(
        // @ts-ignore
        uni.$UIKitStore.teamMemberStore.getTeamMember(props.to)
      )
    }
  })

  // 撤回后，重新编辑消息
  uni.$on(events.ON_REEDIT_MSG, (msg: IMMessage) => {
    const _replyMsg = props.replyMsgsMap?.[msg.idClient]
    // 如果重新编辑的是回复消息，则需要将回复消息展示在输入框上方
    if (_replyMsg?.idClient) {
      // @ts-ignore
      _replyMsg && uni.$UIKitStore.msgStore.replyMsgActive(_replyMsg)
      replyMsg.value = _replyMsg
      isReplyMsg.value = true
    }
    // 如果重新编辑的是@消息，则需要将被@的成员重新加入selectedAtMembers
    if (msg.ext) {
      const extObj = JSON.parse(msg.ext)
      const yxAitMsg = extObj.yxAitMsg
      if (yxAitMsg) {
        const _mentionedMembers: MentionedMember[] = []
        Object.keys(yxAitMsg).forEach((key) => {
          if (key == AT_ALL_ACCOUNT) {
            _mentionedMembers.push({
              account: key,
              appellation: '所有人',
            })
          } else {
            _mentionedMembers.push({
              account: key,
              // @ts-ignore
              appellation: uni.$UIKitStore.uiStore.getAppellation({
                account: key,
                teamId: props.to,
                ignoreAlias: true,
              }),
            })
          }
        })
        selectedAtMembers.value = _mentionedMembers
      }
    }
    inputText.value = msg?.attach?.oldBody
    isFocus.value = true
  })

  uni.$on(events.REPLY_MSG, (msg: IMMessage) => {
    isReplyMsg.value = true
    isFocus.value = true
    replyMsg.value = msg
  })

  uni.$on(events.AIT_TEAM_MEMBER, (member) => {
    selectedAtMembers.value = [
      ...selectedAtMembers.value.filter(
        (item) => item.account !== member.account
      ),
      member,
    ]
    const newInputText = inputText.value + '@' + member.appellation + ' '
    // 更新input框的内容
    inputText.value = newInputText
  })

  // 关闭表情、语音、发送更多面板
  uni.$on(events.CLOSE_PANEL, () => {
    emojiVisible.value = false
    extVisible.value = false
    audioPanelVisible.value = false
    sendMoreVisible.value = false
  })

  // @消息 @群成员
  uni.$on(events.HANDLE_AIT_MEMBER, (member) => {
    handleMentionItemClick(member)
  })

  // 关闭@群成员面板
  uni.$on(events.CLOSE_AIT_POPUP, () => {
    closePopup()
  })

  // 表情点击
  uni.$on(events.EMOJI_CLICK, (emoji) => {
    handleEmoji(emoji)
  })

  // 表情删除
  uni.$on(events.EMOJI_DELETE, () => {
    handleEmojiDelete()
  })

  // 表情发送
  uni.$on(events.EMOJI_SEND, () => {
    emojiVisible.value = false
    extVisible.value = false
    handleSendTextMsg()
  })

  if (uni.onKeyboardHeightChange) {
    uni.onKeyboardHeightChange((res) => {
      const isAndroidApp =
        uni.getSystemInfoSync().platform == 'android' && uniPlatform == 'app'
      const isAndroidWxapp =
        uni.getSystemInfoSync().platform == 'android' &&
        uniPlatform == 'mp-weixin'
      // 此处是为了点击安卓键盘上的收起按钮时，表情面板需要隐藏
      if (
        (res.height === 0 && isAndroidApp) ||
        (res.height === 0 && isAndroidWxapp)
      ) {
        emojiVisible.value = false
        extVisible.value = false
      }
    })
  }
})

const onAtMembersExtHandler = () => {
  let ext: any
  if (selectedAtMembers.value.length) {
    selectedAtMembers.value
      .filter((member) => {
        if (!allowAtAll.value && member.account === AT_ALL_ACCOUNT) {
          return false
        }
        return true
      })
      .forEach((member) => {
        // @ts-ignore
        const substr = `@${member.appellation}`
        const positions: number[] = []
        let pos = inputText.value?.indexOf(substr)
        while (pos !== -1) {
          positions.push(pos)
          pos = inputText.value?.indexOf(substr, pos + 1)
        }
        if (positions.length) {
          if (!ext) {
            ext = {
              yxAitMsg: {
                [member.account]: {
                  text: substr,
                  segments: [],
                },
              },
            }
          } else {
            ext.yxAitMsg[member.account] = {
              text: substr,
              segments: [],
            }
          }
          positions.forEach((position) => {
            const start = position
            ext.yxAitMsg[member.account].segments.push({
              start,
              end: start + substr.length,
              broken: false,
            })
          })
        }
      })
  }
  return ext
}

onUnmounted(() => {
  uni.$off(events.REPLY_MSG)
  uni.$off(events.ON_REEDIT_MSG)
  uni.$off(events.REPLY_MSG)
  uni.$off(events.AIT_TEAM_MEMBER)
  // 关闭表情面板
  uni.$off(events.CLOSE_PANEL)
  // @消息 @群成员
  uni.$off(events.HANDLE_AIT_MEMBER)
  // 关闭@群成员面板
  uni.$off(events.CLOSE_AIT_POPUP)
  // 表情点击
  uni.$off(events.EMOJI_CLICK)
  // 表情删除
  uni.$off(events.EMOJI_DELETE)
  // 表情发送
  uni.$off(events.EMOJI_SEND)
  removeReplyMsg()
})
</script>

<style scoped lang="scss">
@import '../../styles/common.scss';

.input-root {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  max-height: 300px;
}

.input-root-h5 {
  height: auto;
  position: relative;
  order: 1;
}

.msg-input-wrapper {
  width: 100%;
  height: 100%;
  background-color: #eff1f3;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 999;
}

.msg-input {
  padding: 7px;
  background-color: #eff1f3;

  &-input {
    background-color: #fff;
    height: 40px;
    font-size: 16px;
    padding: 0 12px;
    border-radius: 6px;
    margin-bottom: 5px;

    &::placeholder {
      padding: 0 12px;
    }
  }
}

.msg-button-group {
  padding: 12px 20px 2px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.msg-input-button {
  flex: 1;
  // &:not(:last-child) {
  //   margin-right: 60px;
  // }

  &.msg-input-loading {
    animation: loadingCircle 1s infinite linear;
    z-index: 1;
    width: 20px;
    height: 20px;
    margin-top: 4px;

    .loading {
      width: 100%;
      height: 100%;
    }
  }
}

.msg-ext {
  overflow-y: auto;
  width: 100%;
  height: 300px;
  background-color: #eff1f3;
  z-index: 1;
}

.msg-emoji-panel {
  overflow-y: auto;
  width: 100%;
  height: 246px;
  background-color: #eff1f3;
  z-index: 1;
}

.msg-audio-panel {
  overflow-y: hidden;
  width: 100%;
  height: 300px;
  background-color: #eff1f3;
  z-index: 1;
}

.send-more-panel {
  display: flex;
  padding: 15px;
  overflow-y: hidden;
  width: 100%;
  height: 300px;
  background-color: #eff1f3;
  z-index: 1;
}

.reply-message-wrapper {
  display: flex;
  font-size: 13px;
  background-color: #eff1f2;
  height: 25px;
  padding-top: 6px;
  align-items: center;
  color: #929299;

  .reply-noFind {
    width: fit-content;
  }

  .reply-message-close {
    flex-basis: 14px;
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  .reply-message {
    display: flex;
    align-items: center;
    flex-basis: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .reply-title {
    flex-basis: 30px;
    white-space: nowrap;
    margin-right: 5px;
  }

  .reply-to {
    flex-basis: content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
  }
}

.input-emoji {
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding: 0 12px;
  border-radius: 6px;
}

.input-text {
  white-space: nowrap;
}

.input-placeholder {
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding: 0 12px;
  border-radius: 6px;
  color: gray;
}

.send-more-panel-item {
  background-color: #fff;
  border-radius: 8px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  margin: 0 10px;
  justify-content: center;
}
</style>
