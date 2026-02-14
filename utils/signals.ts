import { Signal, SignalStatus } from '../types';

const STORAGE_KEY = 'pasefx_signals';

// Get all signals from localStorage
export const getSignals = (): Signal[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading signals:', error);
    return [];
  }
};

// Save signals to localStorage
export const saveSignals = (signals: Signal[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(signals));
  } catch (error) {
    console.error('Error saving signals:', error);
  }
};

// Add new signal
export const addSignal = (signal: Omit<Signal, 'id' | 'date'>): Signal => {
  const signals = getSignals();
  const newSignal: Signal = {
    ...signal,
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
  };
  saveSignals([newSignal, ...signals]);
  return newSignal;
};

// Update signal status
export const updateSignalStatus = (id: string, status: SignalStatus, resultPips?: number): Signal | null => {
  const signals = getSignals();
  const index = signals.findIndex(s => s.id === id);
  if (index === -1) return null;
  
  signals[index] = {
    ...signals[index],
    status,
    ...(resultPips !== undefined && { resultPips }),
  };
  saveSignals(signals);
  return signals[index];
};

// Delete signal
export const deleteSignal = (id: string): boolean => {
  const signals = getSignals();
  const filtered = signals.filter(s => s.id !== id);
  if (filtered.length === signals.length) return false;
  saveSignals(filtered);
  return true;
};

// Calculate statistics
export const calculateSignalStats = (signals: Signal[]) => {
  const total = signals.length;
  const active = signals.filter(s => s.status === 'ACTIVE').length;
  const hitTP = signals.filter(s => s.status === 'HIT_TP').length;
  const hitSL = signals.filter(s => s.status === 'HIT_SL').length;
  const closed = signals.filter(s => s.status === 'CLOSED').length;
  
  const completedSignals = signals.filter(s => s.status === 'HIT_TP' || s.status === 'HIT_SL');
  const winRate = completedSignals.length > 0 
    ? Math.round((hitTP / completedSignals.length) * 100) 
    : 0;
  
  const totalPips = signals
    .filter(s => s.resultPips !== undefined)
    .reduce((sum, s) => sum + (s.resultPips || 0), 0);
  
  return {
    total,
    active,
    hitTP,
    hitSL,
    closed,
    winRate,
    totalPips,
    profit: hitTP,
    loss: hitSL,
  };
};

// Sample/demo signals for testing
export const getDemoSignals = (): Signal[] => [
  {
    id: '1',
    pair: 'EURUSD',
    direction: 'BUY',
    entry: 1.0850,
    sl: 1.0820,
    tp1: 1.0880,
    tp2: 1.0900,
    tp3: 1.0920,
    status: 'HIT_TP',
    resultPips: 30,
    date: '2026-02-10',
    analyst: 'Azil',
    timeframe: 'H1',
    analysis: 'Bullish breakout dari consolidation zone, momentum kuat.',
  },
  {
    id: '2',
    pair: 'GBPUSD',
    direction: 'SELL',
    entry: 1.2650,
    sl: 1.2680,
    tp1: 1.2620,
    tp2: 1.2600,
    tp3: 1.2580,
    status: 'HIT_SL',
    resultPips: -30,
    date: '2026-02-12',
    analyst: 'Mulky',
    timeframe: 'H4',
    analysis: 'Bearish setup di resistance major, risk:reward 1:2.',
  },
  {
    id: '3',
    pair: 'XAUUSD',
    direction: 'BUY',
    entry: 2020.50,
    sl: 2010.00,
    tp1: 2030.00,
    tp2: 2040.00,
    tp3: 2050.00,
    status: 'ACTIVE',
    date: '2026-02-14',
    analyst: 'Hadi',
    timeframe: 'M15',
    analysis: 'Gold bounce dari support daily, target 3R.',
  },
];

// Initialize with demo data if empty
export const initializeDemoSignals = (): void => {
  const existing = getSignals();
  if (existing.length === 0) {
    saveSignals(getDemoSignals());
  }
};
