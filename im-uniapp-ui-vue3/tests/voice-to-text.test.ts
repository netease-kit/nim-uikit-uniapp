import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import test from 'node:test'

const readSource = (path: string) => readFileSync(resolve(path), 'utf8')

const messageBubble = readSource('components/NEUIKit/pages/Chat/message/message-bubble.vue')
const messageAudio = readSource('components/NEUIKit/pages/Chat/message/message-audio.vue')
const messageList = readSource('components/NEUIKit/pages/Chat/message/message-list.vue')
const icon = readSource('components/NEUIKit/components/Icon.vue')
const zhLocale = readSource('components/NEUIKit/locale/zh-Hans.ts')
const enLocale = readSource('components/NEUIKit/locale/en.ts')

test('successful audio message menus expose voice to text exactly twice', () => {
  const voiceToTextEntries =
    messageBubble.match(/@tap="handleVoiceToTextMsg"/g) || []

  assert.equal(voiceToTextEntries.length, 2)

  const audioWithoutTextConditions =
    messageBubble.match(
      /props\.msg\.messageType\s*===\s*V2NIMConst\.V2NIMMessageType\.V2NIM_MESSAGE_TYPE_AUDIO\s*&&\s*!props\.msg\.textOfVoice/g
    ) || []

  assert.equal(audioWithoutTextConditions.length, 2)
  assert.match(messageBubble, /type="icon-zhuanwenzi"/)
  assert.match(messageBubble, /t\('voiceToText'\)/)
  const alignedVoiceToTextEntries =
    messageBubble.match(
      /class="msg-action-btn"\s*@tap="handleVoiceToTextMsg"/g
    ) || []

  assert.equal(alignedVoiceToTextEntries.length, 2)
  assert.doesNotMatch(messageBubble, /msg-action-btn-voice/)
  assert.match(messageBubble, /\.msg-action-btn\s*\{[\s\S]*?width:\s*56px;/)
})

test('voice to text closes the menu, shows progress, and delegates to the store', () => {
  const handler = messageBubble.match(
    /const handleVoiceToTextMsg = async \(\) => \{([\s\S]*?)\n\}/
  )?.[1]

  assert.ok(handler, 'handleVoiceToTextMsg should exist')

  const closeIndex = handler.indexOf('closeTooltip()')
  const loadingIndex = handler.indexOf("t('voiceToTextLoadingText')")
  const storeIndex = handler.indexOf(
    'uni.$UIKitStore.msgStore.voiceToTextActive(props.msg)'
  )

  assert.ok(closeIndex >= 0)
  assert.ok(loadingIndex > closeIndex)
  assert.ok(storeIndex > loadingIndex)
  assert.match(handler, /t\('voiceToTextFailedText'\)/)
})

test('transcribed text renders outside the audio playback target', () => {
  assert.match(messageAudio, /class="audio-message"/)
  assert.match(
    messageAudio,
    /class="audio-bubble"[\s\S]*?@tap="handlePlayAudio"[\s\S]*?<\/div>\s*<div v-if="msg\.textOfVoice" class="audio-text"/
  )
  assert.match(messageAudio, /white-space:\s*pre-wrap/)
  assert.match(messageAudio, /word-break:\s*break-word/)
})

test('message render key changes when textOfVoice changes', () => {
  assert.match(
    messageList,
    /renderKey:\s*\[\s*item\.messageClientId\s*\|\|\s*item\.createTime,\s*item\.textOfVoice\s*\|\|\s*'',\s*\]\.join\('-'\)/
  )
})

test('voice to text icon is registered and matches the H5 asset', () => {
  const assetPath = resolve('components/NEUIKit/static/icon-zhuanwenzi.png')

  assert.equal(existsSync(assetPath), true)
  assert.match(
    icon,
    /'icon-zhuanwenzi':\s*'\/NEUIKit\/static\/icon-zhuanwenzi\.png'/
  )

  const sha256 = createHash('sha256')
    .update(readFileSync(assetPath))
    .digest('hex')

  assert.equal(
    sha256,
    '54b92c8af4393e7b79b838f5696cbeb65a4c5aff5c6c78936ea7a5a9d9b068c4'
  )
})

test('voice to text locales align with the H5 implementation', () => {
  assert.match(zhLocale, /voiceToText:\s*["']转文字["']/)
  assert.match(zhLocale, /voiceToTextLoadingText:\s*["']转文字中\.\.\.["']/)
  assert.match(zhLocale, /voiceToTextFailedText:\s*["']转文字失败["']/)
  assert.match(enLocale, /voiceToText:\s*["']Speech to text["']/)
  assert.match(
    enLocale,
    /voiceToTextLoadingText:\s*["']Converting speech to text\.\.\.["']/
  )
  assert.match(enLocale, /voiceToTextFailedText:\s*["']Speech to text failed["']/)
})
