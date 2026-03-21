import { describe, it, expect } from 'vitest'
import { formatNumber, formatRelativeDate } from '@/utils/formatters'

describe('formatNumber', () => {
  it('should format numbers correctly', () => {
    expect(formatNumber(500)).toBe('500')
    expect(formatNumber(1500)).toBe('1.5K')
    expect(formatNumber(1000000)).toBe('1M')
    expect(formatNumber(2500000)).toBe('2.5M')
  })
})

describe('formatRelativeDate', () => {
  it('should return "Hoy" for today', () => {
    const today = new Date().toISOString()
    expect(formatRelativeDate(today)).toBe('Hoy')
  })

  it('should return "Ayer" for yesterday', () => {
    const yesterday = new Date(Date.now() - 86400000).toISOString()
    expect(formatRelativeDate(yesterday)).toBe('Ayer')
  })
})