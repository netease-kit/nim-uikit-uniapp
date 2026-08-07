import { describe, expect, it } from 'vitest'
import en from '../../components/NEUIKit/locale/en'
import zhHans from '../../components/NEUIKit/locale/zh-Hans'

describe('application title locale', () => {
  it('uses the Uniapp brand title in Chinese and retains the English title', () => {
    expect(zhHans.appText).toBe('云信IM Uniapp')
    expect(en.appText).toBe('NIM')
  })
})
