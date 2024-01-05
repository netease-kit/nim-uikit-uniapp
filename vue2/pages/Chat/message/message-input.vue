<template>
  <div>
    <div class="msg-input-wrapper">
      <div v-if="isReplyMsg" class="reply-message-wrapper">
        <div class="reply-message-close"  @tap="removeReplyMsg" >
          <Icon color="#929299" :iconStyle="{ fontWeight: '200' }" :size="13" type="icon-guanbi"/>
        </div>｜
        <div class="reply-title">{{ t('replyText') }}</div>
        <div class="reply-noFind" v-if="replyMsg && replyMsg.idClient == 'noFind'">
          {{ t('replyNotFindText') }}
        </div>
        <div class="reply-message" v-else>
          <div class="reply-to">
            <Appellation 
              :account="replyMsg.from" 
              :team-id="scene === 'team' ? to : ''" 
              color="#929299"
              :fontSize="13"
              ></Appellation>
          </div>:
          <div v-if="replyMsg.type === 'text'" class="reply-msg-content">
            <message-one-line :text="replyMsg.body"></message-one-line>
          </div>
          <div v-else>{{ '[' + REPLY_MSG_TYPE_MAP[replyMsg.type] + ']' }}</div>
        </div>
      </div>
      <div class="msg-button-group">
        <div @tap="handleEmojiVisible" class="msg-input-button" >
          <Icon 
            :size="20" 
            type="icon-biaoqing" 
          />
        </div> 
        <div class="msg-input-button"  @tap="handleSendImageMsg" >
          <div v-if="sendingImg" class="msg-input-button msg-input-loading">
            <image class="loading" src="https://yiyong-qa.netease.im/yiyong-static/statics/uniapp-vue2-h5/static/icons/icon-a-Frame8.png"></image>
          </div>
          <div v-else>
            <Icon 
              :size="20" 
              type="icon-tupian" 
            />
          </div>
        </div>
        <div class="msg-input-button"  @tap="handleSetting">
          <Icon 
            type="icon-shezhi" 
            :size="20" 
          />
        </div>
      </div>
      <div class="msg-input">
        <!-- 当从表情面包切换到文字输入时，直接唤起键盘，ios 会存在input框消失的情况，故此处需要用EmojiInput兼容下 -->
        <div @click="onClickEmojiInput" v-if="showEmojiInput && !isIOSWeb" class="input-emoji">
          <div v-if="inputText" class="input-text">{{ inputText }}</div>
          <div v-else class="input-placeholder">{{ placeholder }}</div>
        </div>
        <input
          v-else 
          :focus="isFocus" 
          class="msg-input-input" 
          :maxlength="-1" 
          :placeholder="placeholder"
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
          id="msg-input" />
      </div>
      <div v-if="extVisible" class="msg-ext" @click.stop="() => {}">
        <Face 
          v-if="emojiVisible"  
          @emojiClick="handleEmoji"
          @emojiDelete="handleEmojiDelete"
          @emojiSend="handleSendTextMsg"
        />
      </div> 
    </div>
    <UniPopup 
      ref="popupRef" 
      background-color="#ffffff" 
      type="bottom" 
      mask-background-color="rgba(0,0,0,0.4)"
      @change="onPopupChange"
    >
      <MentionMemberList  :team-id="to" ></MentionMemberList>
    </UniPopup>
  </div>
</template>

<script lang="ts" setup>
import type { TMsgScene } from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import Face from './face.vue'
import Icon from '../../../components/Icon.vue';
import { ref, getCurrentInstance, computed, onUnmounted, onMounted } from '../../../utils/transformVue';
import { events, REPLY_MSG_TYPE_MAP } from '../../../utils/constants'
import { emojiMap } from '../../../utils/emoji';
import { t } from '../../../utils/i18n';
import { handleNoPermission } from '../../../utils/permission';
import { customNavigateTo } from '../../../utils/customNavigate';
import type { IMMessage } from '@xkit-yx/im-store';
import MessageOneLine from '../../../components/MessageOneLine.vue';
import { getUniPlatform } from '../../../utils';
// @ts-ignore
import UniPopup from '../../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
import MentionMemberList from './mention-member-list.vue';
import { autorun } from 'mobx';
import Appellation from '../../../components/Appellation.vue';
type MentionedMember = { account: string; appellation: string }
const props = defineProps({
    scene: {
      type: String, // Assuming TMsgScene is a custom object type
      required: true
    },
    to: {
      type: String,
      required: true
    },
    replyMsgsMap: {
      type: Object,
      default: undefined
    }
  })
const inputText = ref('')
const extVisible = ref(false)
const emojiVisible = ref(false)
const sendingImg = ref(false)
const uniPlatform = getUniPlatform()
const isAndroidApp = uni.getSystemInfoSync().platform == 'android' && uniPlatform == 'app'
const showEmojiInput = ref(false)
const isIOSWeb = uniPlatform === 'web' && uni.getSystemInfoSync().platform === 'ios'
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
  sessionId: ''
})
// @消息相关
const ctx  = getCurrentInstance();
const popupRef = ref(null)
const selectedAtMembers = ref<MentionedMember[]>([])

// 群禁言
const isTeamMute = ref(false)
const placeholder = computed(() => {
  return isTeamMute.value ? t('teamMutePlaceholder'): t('chatInputPlaceHolder');
});

const onPopupChange = (e: any) => {
  uni.$emit(events.HANDLE_MOVE_THROUGH, (e.value))
}

const handleMentionItemClick = (member: MentionedMember) => {
  // @ts-ignore
  ctx.refs.popupRef.close()
  uni.$emit(events.HANDLE_MOVE_THROUGH, (false))
  const nickInTeam = member.appellation
  selectedAtMembers.value = [
    ...(selectedAtMembers.value.filter(
      (item) => item.account !== member.account
    )),
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
  setTimeout(() => {
    uni.$emit(events.ON_SCROLL_BOTTOM)
  }, 300)
  uni.$emit(events.ON_INPUT_FOCUS_CHANGE, false)
}

const handleInput = (event: any) => {  
  const text = event?.detail?.value;
  const isAit = text.endsWith("@") || text.endsWith("@\n")
  if (props.scene == 'team') {
    if (isAit) {   // 当前输入的是@
      uni.hideKeyboard()
      // @ts-ignore
      ctx.refs.popupRef.open('bottom')
      isFocus.value = false
      uni.$emit(events.HANDLE_MOVE_THROUGH, (true))
    }
  }
}

const handleSendTextMsg = () => {
  if (inputText.value.trim() === '') return
  const ext = onAtMembersExtHandler()  
  uni.$UIKitStore.msgStore.sendTextMsgActive({
    scene: props.scene as TMsgScene,
    to: props.to,
    body: inputText.value,
    ext: selectedAtMembers.value.length && ext
  }).then(() => {
    if (extVisible.value) {
       emojiVisible.value = false
       extVisible.value = false
       uni.hideKeyboard()
    }
  })
  inputText.value = ''
  isReplyMsg.value = false
  selectedAtMembers.value = []
  uni.$emit(events.ON_SCROLL_BOTTOM)
}

const removeReplyMsg = () => {
  uni.$UIKitStore.msgStore.removeReplyMsgActive(replyMsg?.value?.sessionId as string)
  isReplyMsg.value = false
}

const handleEmojiVisible = () => {
  if (isTeamMute.value) return
  if (uniPlatform == 'mp-weixin' || isAndroidApp) {
    setTimeout(() => {
      emojiVisible.value = true
      extVisible.value = true
    }, 300)
  } else {
    emojiVisible.value = true
    extVisible.value = true
  }
  showEmojiInput.value = true
  uni.$emit(events.HANDLE_MOVE_THROUGH, (true))
}

const handleEmoji = (emoji: { key: string; type: string }) => {
  inputText.value += emoji.key
}

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


const handleSendImageMsg = () => {
  if (isTeamMute.value) return
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    success: (res) => {
      sendingImg.value = true
      uni.$UIKitStore.msgStore.sendImageMsgActive({
        scene: props.scene as TMsgScene,
        to: props.to,
        filePath: res.tempFilePaths[0],
      }).catch(err => {
        uni.showToast({
          icon: 'error',
          title: t('sendImageFailedText')
        })
      }).finally(() => {
        sendingImg.value = false
        setTimeout(() => {
          uni.$emit(events.ON_SCROLL_BOTTOM)
        }, 100)
      })
    },
    //没有开启权限时，提示开启权限
    complete: handleNoPermission
  })
}

const handleSendFileMsg = () => {
  uni.chooseFile({
    count: 1,
    success: (res) => {
      uni.$UIKitStore.msgStore.sendFileMsgActive({
        scene: props.scene as TMsgScene,
        to: props.to,
        filePath: res.tempFilePaths[0],
      })
    },
  })
}

const handleSetting = () => {
  if (props.scene === 'p2p') {
    customNavigateTo({
      url: `/pages/Chat/message/p2p-set?id=${props.to}`
    })
  } else if (props.scene === 'team') {
    customNavigateTo({
      url: `/pages/Group/group-set/index?id=${props.to}`
    })
  }
}

onMounted(() => {
  // 撤回后，重新编辑消息
  uni.$on(events.ON_REEDIT_MSG, (msg: IMMessage) => {
    const _replyMsg = props.replyMsgsMap?.[msg.idClient]
    // 如果重新编辑的是回复消息，则需要将回复消息展示在输入框上方
    if (_replyMsg?.idClient) {
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
          if (key == "ait_all") {
            _mentionedMembers.push({
              account: key,
              appellation: '所有人'
            })   
          } else {
            _mentionedMembers.push({
              account: key,
              appellation: uni.$UIKitStore.uiStore.getAppellation({
                account: key,
                teamId: props.to,
                ignoreAlias: true
              })
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
      ...(selectedAtMembers.value.filter(
        (item) => item.account !== member.account
      )),
      member,
    ]
    const newInputText = inputText.value + '@' + member.appellation + ' '
    // 更新input框的内容
    inputText.value = newInputText
  })

  // 关闭表情面板
  uni.$on(events.CLOSE_EMOJI, () => {
    emojiVisible.value = false
    extVisible.value = false
    uni.$emit(events.HANDLE_MOVE_THROUGH, (false))
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

  uni.onKeyboardHeightChange((res) => {
    const isAndroidApp =  uni.getSystemInfoSync().platform == 'android' && uniPlatform == 'app'
    const isAndroidWxapp =  uni.getSystemInfoSync().platform == 'android' && uniPlatform == 'mp-weixin'
    // 此处是为了点击安卓键盘上的收起按钮时，表情面板需要隐藏
    if ((res.height === 0 && isAndroidApp) || (res.height === 0 && isAndroidWxapp)) {
      emojiVisible.value = false
      extVisible.value = false
    }
  })
})

const onAtMembersExtHandler = () => {
  let ext:any
  if (selectedAtMembers.value.length) {
    selectedAtMembers.value
      .forEach((member) => {
        // @ts-ignore
        const substr = `@${member.appellation}`
        const positions: number[] = []
        let pos = inputText.value.indexOf(substr)
        while (pos !== -1) {
          positions.push(pos)
          pos = inputText.value.indexOf(substr, pos + 1)
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
autorun(() => {
  if (props.scene === 'team') {
    const team = uni.$UIKitStore.teamStore.teams.get(props.to)
    if (team?.mute) {
      const myUser = uni.$UIKitStore.userStore.myUserInfo
      const isGroupOwner = myUser?.account === team.owner
      const teamMembers = uni.$UIKitStore.teamMemberStore.getTeamMember(props.to)
      const isGroupManager = teamMembers
        .filter((item) => item.type === 'manager')
        .some((item) => item.account === myUser?.account)
      // 群主或者群管理员在群禁言时，可以发送消息
      if (isGroupOwner || isGroupManager) {
        isTeamMute.value = false
      } else {
        isTeamMute.value = team?.mute
      }
    }else{
      isTeamMute.value = false
    }
  }
})

onUnmounted(() => {
  uni.$off(events.REPLY_MSG)
  uni.$off(events.ON_REEDIT_MSG)
  uni.$off(events.REPLY_MSG)
  uni.$off(events.AIT_TEAM_MEMBER)
  // 关闭表情面板
  uni.$off(events.CLOSE_EMOJI)
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
@import "../../styles/common.scss";

.msg-input-wrapper {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #eff1f3;
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  z-index: 999;
}

.msg-input {
  padding: 7px;

  &-input {
    background-color: #fff;
    height: 40px;
    font-size: 16px;
    padding: 0 12px;
    border-radius: 6px;

    &::placeholder {
      padding: 0 12px;
    }
  }
}

.msg-button-group {
  padding: 12px 20px 2px 20px;
  display: flex;
  flex-direction: row;
}

.msg-input-button {
  &:not(:last-child) {
    margin-right: 60px;
  }

  &.msg-input-loading {
    animation: loadingCircle 1s infinite linear;
    z-index: 1;
    width: 20px;
    height: 20px;
    margin-top: 4px;
    .loading{
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

.reply-message-wrapper {
  display: flex;
  font-size: 13px;
  background-color: #EFF1F2;
  height: 30px;
  padding-top: 6px;
  align-items: center;
  color: #929299;

  .reply-noFind{
    width: fit-content;
  }

  .reply-message-close {
    flex-basis: 14px;
    margin-left: 10px;
    display: flex;
    align-items: center;
  }

  .reply-message{
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

  .reply-to{
    flex-basis: content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
  }
}

.input-emoji{
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding: 0 12px;
  border-radius: 6px;
}

.input-text{
  white-space: nowrap;
}

.input-placeholder{
  background-color: #fff;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  padding: 0 12px;
  border-radius: 6px;
  color: gray;
}
</style>
