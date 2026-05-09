import { describe, it, expect } from 'vitest'
import { isValidCpf, isValidEmailStrict } from './utils'

describe('isValidCpf', () => {
  it('should validate correct CPFs', () => {
    expect(isValidCpf('70496182170')).toBe(true)
    expect(isValidCpf('704.961.821-70')).toBe(true) // Should work with formatting
    expect(isValidCpf('58737310127')).toBe(true)
    expect(isValidCpf('12345678909')).toBe(true) // Mathematically valid test CPF
  })

  it('should invalidate incorrect CPFs', () => {
    expect(isValidCpf('12345678901')).toBe(false) // Invalid digits
    expect(isValidCpf('00000000000')).toBe(false) // Same digits
    expect(isValidCpf('111.111.111-11')).toBe(false) // Same digits with formatting
    expect(isValidCpf('123')).toBe(false) // Wrong length
    expect(isValidCpf('12345678901234')).toBe(false) // Wrong length
  })
})

describe('isValidEmailStrict', () => {
  it('should validate correct emails', () => {
    expect(isValidEmailStrict('test@example.com')).toBe(true)
    expect(isValidEmailStrict('user.name+tag@domain.co.uk')).toBe(true)
    expect(isValidEmailStrict('john_doe123@my-domain.org')).toBe(true)
    // Function trims strings, so these should be valid
    expect(isValidEmailStrict('test@example.com ')).toBe(true)
    expect(isValidEmailStrict(' test@example.com')).toBe(true)
  })

  it('should invalidate incorrect emails', () => {
    expect(isValidEmailStrict('test@.com')).toBe(false) // Missing domain
    expect(isValidEmailStrict('test@com')).toBe(false) // Missing dot
    expect(isValidEmailStrict('@example.com')).toBe(false) // Missing local part
    expect(isValidEmailStrict('test@example..com')).toBe(false) // Consecutive dots
    expect(isValidEmailStrict('test@.example.com')).toBe(false) // Dot after @
    expect(isValidEmailStrict('test space@example.com')).toBe(false) // Spaces
  })
})
