import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = (file: string) =>
  readFileSync(resolve(process.cwd(), file), 'utf8')

describe('anti-fraud reporting', () => {
  it('shows the shared anti-fraud tip in conversations and chats', () => {
    expect(source('components/NEUIKit/pages/Conversation/conversation-list/index.vue')).toContain(
      '<SecurityTip'
    )
    expect(source('components/NEUIKit/pages/Chat/index.vue')).toContain('<SecurityTip')
  })

  it('keeps the conversation anti-fraud tip outside the scrollable list branch', () => {
    const conversations = source(
      'components/NEUIKit/pages/Conversation/conversation-list/index.vue'
    )

    expect(conversations).toMatch(
      /<NetworkAlert\s*\/>\s*<SecurityTip\s*\/>\s*<div\s+v-if="!conversationList/
    )
    expect((conversations.match(/<SecurityTip\s*\/>/g) || []).length).toBe(1)
  })

  it('reserves a fixed layout row for the conversation anti-fraud tip', () => {
    const conversations = source(
      'components/NEUIKit/pages/Conversation/conversation-list/index.vue'
    )

    expect(conversations).toContain('class="conversation-empty-wrapper"')
    expect(conversations).toMatch(
      /\.conversation-wrapper\s*{[\s\S]*?display:\s*flex;[\s\S]*?flex-direction:\s*column;/
    )
    expect(conversations).toMatch(
      /\.conversation-list-wrapper\s*{[\s\S]*?flex:\s*1;[\s\S]*?min-height:\s*0;/
    )
  })

  it('opens the report survey through the cross-platform link component', () => {
    const tip = source('components/NEUIKit/components/SecurityTip.vue')

    expect(tip).toContain("https://yunxin.163.com/survey/report")
    expect(tip).toContain('<UniLink')
    expect(tip).toContain("t('reportText')")
    expect(tip).toContain("t('wxAppFileCopyText')")
  })

  it('copies the report link on platforms not supported by UniLink', () => {
    const tip = source('components/NEUIKit/components/SecurityTip.vue')

    expect(tip).toContain('const shouldCopyReportLink')
    expect(tip).toContain('isHarmonyOs')
    expect(tip).toContain("'quickapp'")
    expect(tip).toContain('uni.setClipboardData')
    expect(tip).toContain('uni.showModal')
    expect(tip).toContain("t('openUrlText')")
  })

  it('provides the report label in both supported locales', () => {
    expect(source('components/NEUIKit/locale/zh-Hans.ts')).toMatch(/reportText:\s*["']点击举报。["']/)
    expect(source('components/NEUIKit/locale/en.ts')).toMatch(/reportText:\s*["']Report["']/)
  })
})
