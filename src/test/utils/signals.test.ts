import { describe, it, expect, beforeEach } from 'vitest'
import { getSignals, saveSignals, addSignal, calculateSignalStats } from '../../../utils/signals'
import type { Signal } from '../../../types'

describe('Signals Utils', () => {
  // Clear localStorage before each test
  beforeEach(() => {
    localStorage.clear()
  })

  describe('getSignals', () => {
    it('should return empty array when no signals exist', () => {
      const signals = getSignals()
      expect(signals).toEqual([])
    })

    it('should return saved signals', () => {
      const mockSignals: Signal[] = [
        {
          id: '1',
          pair: 'EURUSD',
          direction: 'BUY',
          entry: 1.0850,
          sl: 1.0820,
          tp1: 1.0880,
          tp2: 1.0900,
          tp3: 1.0920,
          status: 'ACTIVE',
          date: '2026-02-16',
          analyst: 'Test',
          timeframe: 'H1',
          analysis: 'Test analysis',
        },
      ]
      saveSignals(mockSignals)
      const signals = getSignals()
      expect(signals).toHaveLength(1)
      expect(signals[0].pair).toBe('EURUSD')
    })
  })

  describe('addSignal', () => {
    it('should add a new signal with generated id and date', () => {
      const newSignal = addSignal({
        pair: 'GBPUSD',
        direction: 'SELL',
        entry: 1.2650,
        sl: 1.2680,
        tp1: 1.2620,
        tp2: 1.2600,
        tp3: 1.2580,
        status: 'ACTIVE',
        analyst: 'Azil',
        timeframe: 'H4',
        analysis: 'Bearish setup',
      })

      expect(newSignal.id).toBeDefined()
      expect(newSignal.date).toBeDefined()
      expect(newSignal.pair).toBe('GBPUSD')

      const saved = getSignals()
      expect(saved).toHaveLength(1)
    })
  })

  describe('calculateSignalStats', () => {
    it('should calculate correct statistics', () => {
      const signals: Signal[] = [
        { id: '1', pair: 'EURUSD', direction: 'BUY', entry: 1.08, sl: 1.07, tp1: 1.09, tp2: 1.10, tp3: 1.11, status: 'HIT_TP', resultPips: 30, date: '2026-02-16', analyst: 'Test', timeframe: 'H1', analysis: '' },
        { id: '2', pair: 'GBPUSD', direction: 'SELL', entry: 1.26, sl: 1.27, tp1: 1.25, tp2: 1.24, tp3: 1.23, status: 'HIT_SL', resultPips: -30, date: '2026-02-16', analyst: 'Test', timeframe: 'H1', analysis: '' },
        { id: '3', pair: 'XAUUSD', direction: 'BUY', entry: 2000, sl: 1990, tp1: 2010, tp2: 2020, tp3: 2030, status: 'ACTIVE', date: '2026-02-16', analyst: 'Test', timeframe: 'H1', analysis: '' },
      ]

      const stats = calculateSignalStats(signals)

      expect(stats.total).toBe(3)
      expect(stats.active).toBe(1)
      expect(stats.hitTP).toBe(1)
      expect(stats.hitSL).toBe(1)
      expect(stats.winRate).toBe(50)
      expect(stats.totalPips).toBe(0)
    })

    it('should handle empty signals array', () => {
      const stats = calculateSignalStats([])
      expect(stats.total).toBe(0)
      expect(stats.winRate).toBe(0)
    })
  })
})
