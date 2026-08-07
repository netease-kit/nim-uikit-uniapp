import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const source = (file: string) =>
  readFileSync(resolve(process.cwd(), file), 'utf8')

describe('multi-select UI contracts', () => {
  it('exposes the three bottom operation events in the required order', () => {
    const component = source(
      'components/NEUIKit/pages/Chat/message/forward/multi-message-operation.vue'
    )

    expect(component.indexOf("emit('merged-forward')")).toBeGreaterThan(-1)
    expect(component.indexOf("emit('one-by-one-forward')")).toBeGreaterThan(
      component.indexOf("emit('merged-forward')")
    )
    expect(component.indexOf("emit('delete')")).toBeGreaterThan(
      component.indexOf("emit('one-by-one-forward')")
    )
  })

  it('threads selection state from the chat page through the message chain', () => {
    const chat = source('components/NEUIKit/pages/Chat/index.vue')
    const list = source('components/NEUIKit/pages/Chat/message/message-list.vue')
    const item = source('components/NEUIKit/pages/Chat/message/message-item.vue')

    for (const marker of [
      'useMessageMultiSelect',
      'MultiMessageOperation',
      'FORWARD_TASK_SUCCEEDED',
      'deleteMsgActive(selectedMessages.value)',
    ]) {
      expect(chat).toContain(marker)
    }

    for (const marker of [
      'isMultiSelecting',
      'selectedMessageKeys',
      'onToggleSelect',
      'onMultiSelect',
    ]) {
      expect(list).toContain(marker)
      expect(item).toContain(marker)
    }

    expect(item).toContain('isSelectableMessage')
    expect(item).toContain('msg-select-checkbox')
  })

  it('suppresses mutation menus while selecting or rendering readonly records', () => {
    const bubble = source('components/NEUIKit/pages/Chat/message/message-bubble.vue')

    expect(bubble).toContain('readonly?: boolean')
    expect(bubble).toContain('isMultiSelecting?: boolean')
    expect(bubble).toContain('onMultiSelect?:')
    expect(bubble).toContain('handleMultiSelect')
    expect(bubble).toContain('!props.readonly')
    expect(bubble).toContain('!props.isMultiSelecting')
  })

  it('uses the dedicated multi-select action icon', () => {
    const icon = source('components/NEUIKit/components/Icon.vue')
    const bubble = source('components/NEUIKit/pages/Chat/message/message-bubble.vue')

    expect(icon).toContain("'icon-multi-select':")
    expect(icon).toContain(
      'https://yx-web-nosdn.netease.im/common/8fdb5df4ec436e44753e2189ea342202/forward.png'
    )
    expect(bubble).toContain('type="icon-multi-select"')
    expect(bubble).not.toContain('type="icon-im-xuanzhong"')
  })

  it('connects task modes and success events on the forward page', () => {
    const forward = source('components/NEUIKit/pages/Chat/forward.vue')
    const modal = source('components/NEUIKit/pages/Chat/message/forward/forward-modal.vue')

    for (const marker of [
      'getForwardTask',
      'resolveForwardTaskMessages',
      'sendOneByOneForwardMessages',
      'sendMergedForwardMessage',
      'FORWARD_TASK_SUCCEEDED',
    ]) {
      expect(forward).toContain(marker)
    }
    expect(modal).toContain('forwardMode?: ForwardMode')
    expect(modal).toContain('sourceConversationId?: string')
  })

  it('opens the unified target selector without the legacy action sheet', () => {
    const chat = source('components/NEUIKit/pages/Chat/index.vue')
    const start = chat.indexOf('const openForwardTarget')
    const end = chat.indexOf('const confirmRemovingInvalidMessages')
    const openForwardTarget = chat.slice(start, end)

    expect(openForwardTarget).toContain('createForwardTask')
    expect(openForwardTarget).toContain('/pages/Chat/forward?taskId=')
    expect(openForwardTarget).not.toContain('showActionSheet')
    expect(openForwardTarget).not.toContain('forwardConversationType=')
  })

  it('declares forward page route params instead of leaking them as attrs', () => {
    const forward = source('components/NEUIKit/pages/Chat/forward.vue')

    expect(forward).toContain('defineProps<{')
    for (const routeParam of [
      'forwardConversationType?:',
      'taskId?:',
      'msgIdClient?:',
      'origin?:',
    ]) {
      expect(forward).toContain(routeParam)
    }
  })
})
