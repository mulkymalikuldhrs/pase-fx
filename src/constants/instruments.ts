export interface MarketInstrument {
  symbol: string
  name: string
  type: 'forex' | 'crypto' | 'commodity' | 'index'
  category: string
}

export const TRADING_INSTRUMENTS: MarketInstrument[] = [
  // Forex Major
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', type: 'forex', category: 'Major' },
  { symbol: 'GBP/USD', name: 'British Pound / US Dollar', type: 'forex', category: 'Major' },
  { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', type: 'forex', category: 'Major' },
  { symbol: 'USD/CHF', name: 'US Dollar / Swiss Franc', type: 'forex', category: 'Major' },
  { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', type: 'forex', category: 'Major' },
  { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', type: 'forex', category: 'Major' },
  { symbol: 'NZD/USD', name: 'New Zealand Dollar / US Dollar', type: 'forex', category: 'Major' },
  // Forex Cross
  { symbol: 'EUR/GBP', name: 'Euro / British Pound', type: 'forex', category: 'Cross' },
  { symbol: 'EUR/JPY', name: 'Euro / Japanese Yen', type: 'forex', category: 'Cross' },
  { symbol: 'GBP/JPY', name: 'British Pound / Japanese Yen', type: 'forex', category: 'Cross' },
  // Crypto
  { symbol: 'BTC/USD', name: 'Bitcoin', type: 'crypto', category: 'Crypto' },
  { symbol: 'ETH/USD', name: 'Ethereum', type: 'crypto', category: 'Crypto' },
  { symbol: 'SOL/USD', name: 'Solana', type: 'crypto', category: 'Crypto' },
  { symbol: 'XRP/USD', name: 'Ripple', type: 'crypto', category: 'Crypto' },
  // Commodities
  { symbol: 'XAU/USD', name: 'Gold', type: 'commodity', category: 'Metal' },
  { symbol: 'XAG/USD', name: 'Silver', type: 'commodity', category: 'Metal' },
  { symbol: 'USOIL', name: 'Crude Oil', type: 'commodity', category: 'Energy' },
  // Indices
  { symbol: 'US30', name: 'Dow Jones', type: 'index', category: 'Index' },
  { symbol: 'US500', name: 'S&P 500', type: 'index', category: 'Index' },
  { symbol: 'NAS100', name: 'Nasdaq 100', type: 'index', category: 'Index' }
]
