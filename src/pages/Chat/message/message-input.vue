<template>
  <!-- 处理点击、滚动穿透  此为官方推荐做法 https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html#%E4%BB%8B%E7%BB%8D -->
  <page-meta :page-style="'overflow:'+(clickThrough?'hidden':'visible')"></page-meta>
  <div class="msg-input-wrapper" :style="{ transform: `translateY(${extVisible ? '0' : '300px'})` }">
    <div v-if="isReplyMsg" class="reply-message">
      <Icon class="reply-message-close" color="#929299" :style="{ fontWeight: 200 }" :size="13" type="icon-guanbi"
        @tap="removeReplyMsg" />｜
      <div class="reply-title">{{ $t('replyText') }}</div>
      <div class="reply-to">{{ store.uiStore.getAppellation({ account: replyMsg?.from as string, teamId: scene === 'team' ? to : void 0 }) }}</div>:
      <div v-if="replyMsg?.type === 'text'" class="reply-msg-content">
        <message-one-line :text="(replyMsg?.body as string)"></message-one-line>
      </div>
      <div v-else>{{ '[' + REPLY_MSG_TYPE_MAP[replyMsg?.type as string] + ']' }}</div>
    </div>
    <div class="msg-button-group">
      <Icon 
        class="msg-input-button" 
        :size="20" 
        type="icon-biaoqing" 
        @tap="handleEmojiVisible" 
      />
      <Icon 
        v-if="!sendingImg" 
        class="msg-input-button" 
        :size="20" 
        type="icon-tupian" 
        @tap="handleSendImageMsg" 
      />
      <Icon 
        v-else 
        class="msg-input-button msg-input-loading" 
        :size="20" 
        color="#337EFF" 
        type="icon-a-Frame8" 
      />
      <Icon 
        class="msg-input-button" 
        type="icon-shezhi" 
        @tap="handleSetting" 
        :size="20" 
      />
    </div>
    <div class="msg-input">
      <input 
        :focus="isFocus" 
        class="msg-input-input" 
        :maxlength="-1" 
        :placeholder="placeholder"
        v-model="inputText" 
        type="text" 
        :disabled="isTeamMute"
        @confirm="handleSendTextMsg" 
        @blur="handleInputBlur" 
        @focus="handleInputFocus"
        @input="handleInput"
        id="msg-input" />
    </div>
    <div class="msg-ext" @click.stop="() => {}">
      <Face v-if="emojiVisible" :on-emoji-click="handleEmoji" :on-emoji-delete="handleEmojiDelete"
        :on-emoji-send="handleSendTextMsg" />
    </div>
  </div>
  <UniPopup 
    ref="popupRef" 
    background-color="#ffffff" 
    type="bottom" 
    mask-background-color="rgba(0,0,0,0.4)"
    @change="onPopupChange"
  >
    <MentionMemberList :on-close-popup="closePopup" :team-id="to" :handle-item-click="handleMentionItemClick"></MentionMemberList>
  </UniPopup>
</template>

<script lang="ts" setup>
import type { TMsgScene } from 'nim-web-sdk-ng/dist/NIM_MINIAPP_SDK/MsgServiceInterface'
import Face from './face.vue'
import Icon from '../../../components/Icon.vue';
import { ref, defineProps, getCurrentInstance, computed, onUnmounted} from 'vue'
import { events, REPLY_MSG_TYPE_MAP } from '../../../utils/constants'
import { emojiMap } from '../../../utils/emoji';
import { t } from '../../../utils/i18n';
import { handleNoPermission } from '../../../utils/permission';
import { customNavigateTo } from '../../../utils/customNavigate';
import type { IMMessage } from '@xkit-yx/im-store';
import MessageOneLine from '../../../components/MessageOneLine.vue';
import { onLoad } from '@dcloudio/uni-app';
import { getPlatform, getUniPlatform } from '../../../utils';
import UniPopup from '../../../uni_modules/uni-popup/components/uni-popup/uni-popup.vue'
import MentionMemberList from './mention-member-list.vue';
import { autorun } from 'mobx';
type MentionedMember = { account: string; appellation: string }
const props = defineProps<{
  scene: TMsgScene
  to: string
  replyMsgsMap?: Record<string, IMMessage>
}>()
const store = uni.$UIKitStore
const inputText = ref('')
const extVisible = ref(false)
const emojiVisible = ref(false)
const sendingImg = ref(false)
// 回复消息相关
const isReplyMsg = ref(false)
const isFocus = ref(false)
const replyMsg = ref<IMMessage>()
// @消息相关
let beforeInputTextLength = 0 // 由于uniapp的input组件没有提供onkeydown事件，所以需要获取输入框输入前的长度，用于判断是否按下的是backspace键，用于@消息的处理
const ctx  = getCurrentInstance();
const popupRef = ref(null)
const clickThrough = ref(false) // 处理页面点击穿透
const selectedAtMembers = ref<MentionedMember[]>([])
let cursorIndex = 0

// 群禁言
const isTeamMute = ref(false)
const placeholder = computed(() => {
  return isTeamMute.value ? t('teamMutePlaceholder'): t('chatInputPlaceHolder');
});
const onPopupChange = (e) => {
  clickThrough.value = e.value
}

const handleMentionItemClick = (member) => {
  // @ts-ignore
  ctx.refs.popupRef.close()
  clickThrough.value = false
  const nickInTeam = member.appellation
  selectedAtMembers.value = [
    ...(selectedAtMembers.value.filter(
      (item) => item.account !== member.account
    )),
    member,
  ]
  const newInputText = inputText.value.slice(0, cursorIndex) + nickInTeam + ' ' + inputText.value.slice(cursorIndex);
  // 更新input框的内容
  inputText.value = newInputText
  beforeInputTextLength = newInputText.length
}

const closePopup = () => {
  // @ts-ignore
  ctx.refs.popupRef.close()
}


const platform = getPlatform()
const uniPlatform = getUniPlatform()

const handleInputFocus = () => {
  emojiVisible.value = false
  extVisible.value = false
  uni.$emit(events.ON_INPUT_FOCUS)
}

const handleInput = (event) => {  
    // 获取输入光标位置，判断是否输入为@
  cursorIndex = event.detail.cursor
  const isAit = event.detail.value[cursorIndex - 1] == '@'
    // 获取输入框内容长度，判断此时是否为backspace
  const valueLength = event.detail.value.length 
  if (props.scene == 'team') {
    if (isAit && valueLength > beforeInputTextLength ) {   // 当前输入的是@
      uni.hideKeyboard()
      // @ts-ignore
      ctx.refs.popupRef.open('bottom')
      isFocus.value = false
      clickThrough.value = true
      beforeInputTextLength = valueLength
    }else if(beforeInputTextLength > valueLength){ // 当前输入的是backspace, 需要一次性删除整个@xxx
      let atIndex
      selectedAtMembers.value.some((member) => {  
          // @ts-ignore
          const alias = `@${member.appellation.trim()}`
          const regex = new RegExp(alias, 'g')
          let match
          while ((match = regex.exec(inputText.value))) {
            const start = match.index
            const end = start + alias.length
            if (cursorIndex === end) {
              atIndex = start
              return true
            }
          }
      })
      if (atIndex !== undefined) {
        const newInputText = inputText.value.slice(0, atIndex) + inputText.value.slice(cursorIndex) 
        inputText.value = newInputText
        beforeInputTextLength = newInputText.length 
      } else {
        beforeInputTextLength = valueLength
      }
    } else{
      beforeInputTextLength = valueLength
    }
  }
}

const handleSendTextMsg = () => {
  if (inputText.value.trim() === '') return
  const ext = onAtMembersExtHandler()
  store.msgStore.sendTextMsgActive({
    scene: props.scene,
    to: props.to,
    body: inputText.value,
    ext: selectedAtMembers.value.length && ext
  }).then(() => {
    emojiVisible.value = false
    extVisible.value = false
  })
  // 发送完表情消息后，需要滚动到底部，发送文字消息不需要，因为发送文字消息时，会触发onBlur，在onBlur中滚动到底部
  if(emojiVisible.value){
    setTimeout(() => {
      uni.$emit(events.ON_SCROLL_BOTTOM)
    }, 0)
  }
  inputText.value = ''
  isReplyMsg.value = false
  selectedAtMembers.value = []
  beforeInputTextLength = 0
}

const removeReplyMsg = () => {
  store.msgStore.removeReplyMsgActive(replyMsg?.value?.sessionId as string)
  isReplyMsg.value = false
}

const handleEmojiVisible = () => {
  if (isTeamMute.value) return
  emojiVisible.value = true
  extVisible.value = true
  clickThrough.value = true
  // #ifdef APP-PLUS
  uni.$emit(events.EMOJI_AREA_CHANGE, { flag: true, height: 300 })
  // #endif
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

const handleInputBlur = () => {
  isFocus.value = false
  // 失焦时 键盘收起 滚到底部, 需要给一个延迟，因为键盘收起和滚动顺序冲突, ios app存在该问题
  if (platform === 'ios' && uniPlatform === 'app') {
    setTimeout(() => {
      uni.$emit(events.ON_SCROLL_BOTTOM)
    }, 500)
  } else {
    setTimeout(() => {
      uni.$emit(events.ON_SCROLL_BOTTOM)
    }, 0)
  }
  uni.$emit(events.ON_INPUT_BLUR)
}

const handleSendImageMsg = () => {
  if (isTeamMute.value) return
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    success: (res) => {
      sendingImg.value = true
      store.msgStore.sendImageMsgActive({
        scene: props.scene,
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
        }, 0)
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
      store.msgStore.sendFileMsgActive({
        scene: props.scene,
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

onLoad(() => {
  uni.$on(events.ON_REEDIT_MSG, (msg: IMMessage) => {
    const _replyMsg = props.replyMsgsMap?.[msg.idClient]
    // 如果重新编辑的是回复消息，则需要将回复消息展示在输入框上方
    if (_replyMsg?.idClient) {
      _replyMsg && store.msgStore.replyMsgActive(_replyMsg)
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
              appellation: store.uiStore.getAppellation({
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
    beforeInputTextLength = msg?.attach?.oldBody?.length || 0
    isFocus.value = true
  })

  uni.$on(events.REPLY_MSG, (msg: IMMessage) => {
    isReplyMsg.value = true
    isFocus.value = true
    replyMsg.value = msg
    uni.$emit(events.ON_INPUT_FOCUS)
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
    beforeInputTextLength = newInputText.length
  })

  // 当某些组件展示时，需要阻止点击穿透
  uni.$on(events.ON_CLICK_THROUGH, (flag) => {
    clickThrough.value = flag
  })

  // 点击穿透
  uni.$on(events.ON_CLICK_THROUGH, (flag) => {
    clickThrough.value = flag
  })

  // 关闭表情面板
  uni.$on(events.CLOSE_EMOJI, () => {
    emojiVisible.value = false
    extVisible.value = false
    clickThrough.value = false
  })
})

const onAtMembersExtHandler = () => {
  let ext
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
    const team = store.teamStore.teams.get(props.to)
    if (team?.mute) {
      const myUser = store.userStore.myUserInfo
      const isGroupOwner = myUser?.account === team.owner
      const teamMembers = store.teamMemberStore.getTeamMember(props.to)
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
  // justify-content: space-between;
  // align-items: flex-start;
}

.msg-input-button {
  &:not(:last-child) {
    margin-right: 60px;
  }

  &.msg-input-loading {
    animation: loadingCircle 1s infinite linear;
  }
}

.msg-ext {
  height: 300px;
  overflow-y: auto;
}

.reply-message {
  display: flex;
  font-size: 13px;
  background-color: #EFF1F2;
  height: 30px;
  padding-top: 6px;
  align-items: center;
  color: #929299;

  .reply-message-close {
    flex-basis: 14px;
    margin-left: 10px;
  }

  .reply-title {
    flex-basis: 28px;
  }

  .reply-to{
    flex-basis: content;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
