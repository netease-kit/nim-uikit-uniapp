import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = (file: string) =>
  readFileSync(resolve(process.cwd(), file), 'utf8')

const parsePagesConfig = () =>
  JSON.parse(
    source('pages.json').replace(
      /^\s*\/\/ #(ifdef|ifndef|endif).*$/gm,
      ''
    )
  )

describe('merged-forward viewer UI contracts', () => {
  it('loads cards through the verified protocol and creates viewer tasks', () => {
    const card = source('components/NEUIKit/pages/Chat/message/forward/merged-forward-card.vue')

    for (const marker of [
      'parseMergedForwardPayload',
      'loadMergedForwardMessages',
      'createMergedViewerTask',
      'loading',
      '/pages/Chat/merged-forward-detail?taskId=',
    ]) {
      expect(card).toContain(marker)
    }
  })

  it('uses the received-message background for incoming merged cards', () => {
    const card = source('components/NEUIKit/pages/Chat/message/forward/merged-forward-card.vue')

    expect(card).toMatch(
      /\.merged-forward-card-in\s*\{[\s\S]*?background(?:-color)?:\s*#e8eaed/
    )
  })

  it('resolves and removes viewer tasks around a readonly message list', () => {
    const detail = source('components/NEUIKit/pages/Chat/merged-forward-detail.vue')

    expect(detail).toContain('getMergedViewerTask')
    expect(detail).toContain('removeMergedViewerTask')
    expect(detail).toContain('<MessageList')
    expect(detail).toContain('readonly')
    expect(detail).toContain("t('chatHistoryText')")
  })

  it('renders merged cards before unknown messages with readonly fallbacks', () => {
    const item = source('components/NEUIKit/pages/Chat/message/message-item.vue')
    const mergedBranch = item.indexOf('MergedForwardCard')
    const unknownBranch = item.indexOf("t('unknowMsgText')")

    expect(item).toContain('isMergedForwardMessage')
    expect(mergedBranch).toBeGreaterThan(-1)
    expect(mergedBranch).toBeLessThan(unknownBranch)
    expect(item).toContain('readonly-audio-placeholder')
    expect(item).toContain('callRecordText')
    expect(item).toContain(':disable-ait="props.readonly"')
    expect(item).toContain('const conversationType = props.readonly')
  })

  it('registers the page route and avoids live-list subscriptions in readonly mode', () => {
    const pages = parsePagesConfig()
    const list = source('components/NEUIKit/pages/Chat/message/message-list.vue')

    expect(
      pages.pages.some(
        (page: { path?: string }) =>
          page.path === 'components/NEUIKit/pages/Chat/merged-forward-detail'
      )
    ).toBe(true)
    expect(list).toContain('if (props.readonly)')
    expect(list).toContain(':readonly="props.readonly"')
  })

  it('renders merged previews and opens merged reply references', () => {
    const conversation = source(
      'components/NEUIKit/pages/Conversation/conversation-list/conversation-item-last-msg-content.vue'
    )
    const oneLine = source('components/NEUIKit/components/MessageOneLine.vue')
    const reply = source('components/NEUIKit/pages/Chat/message/message-reply.vue')

    expect(conversation).toContain('parseMergedForwardPayload')
    expect(conversation).toContain("translateMsg('chatHistoryText')")
    expect(oneLine).toContain('parseMergedForwardPayload')
    expect(oneLine).toContain("t('chatHistoryText')")
    expect(reply).toContain('isMergedForwardReply')
    expect(reply).toContain('loadMergedForwardMessages')
    expect(reply).toContain('createMergedViewerTask')
  })
})
