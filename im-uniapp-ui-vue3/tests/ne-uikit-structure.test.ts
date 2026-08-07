import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const root = process.cwd()
const source = (file: string) => readFileSync(resolve(root, file), 'utf8')

describe('NEUIKit source organization', () => {
  it('keeps all UI source directories under components/NEUIKit', () => {
    const neUIKitRoot = resolve(root, 'components/NEUIKit')

    for (const directory of ['components', 'locale', 'pages', 'static', 'utils']) {
      expect(existsSync(resolve(neUIKitRoot, directory))).toBe(true)
    }
  })

  it('registers pages and navigation with the NEUIKit prefix', () => {
    expect(source('pages.json')).toContain(
      '"path": "components/NEUIKit/pages/Conversation/index"'
    )
    expect(source('App.vue')).toContain(
      'from "./components/NEUIKit/utils/init.ts"'
    )
    expect(
      source('components/NEUIKit/utils/customNavigate.ts')
    ).toContain("const preUrl = '/components/NEUIKit'")
  })

  it('keeps WeChat tabbar icons in the root static directory', () => {
    const pages = source('pages.json')

    for (const icon of [
      'conversation.png',
      'conversation-selected.png',
      'contact.png',
      'contact-selected.png',
      'me.png',
      'me-selected.png',
    ]) {
      expect(pages).toContain(`"static/tabbar/${icon}"`)
      expect(existsSync(resolve(root, 'static/tabbar', icon))).toBe(true)
    }
  })
})
