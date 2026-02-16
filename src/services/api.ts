const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('pasefx_access_token')
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {})
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  })
  
  const data = await response.json()
  
  if (!response.ok) {
    throw new ApiError(response.status, data.error || data.message || 'Request failed')
  }
  
  return data
}

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    apiRequest<{ user: User; accessToken: string; refreshToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
  
  register: (email: string, password: string, name: string) =>
    apiRequest<{ user: User; accessToken: string; refreshToken: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    }),
  
  getMe: () =>
    apiRequest<{ user: User }>('/auth/me'),
  
  logout: () =>
    apiRequest<{ message: string }>('/auth/logout', { method: 'POST' })
}

// Signals API
export const signalsApi = {
  getAll: (params?: { status?: string; type?: string; symbol?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.status) queryParams.append('status', params.status)
    if (params?.type) queryParams.append('type', params.type)
    if (params?.symbol) queryParams.append('symbol', params.symbol)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    
    return apiRequest<{ signals: Signal[]; pagination: Pagination }>(`/signals?${queryParams}`)
  },
  
  getById: (id: string) =>
    apiRequest<{ signal: Signal }>(`/signals/${id}`),
  
  create: (signal: CreateSignalRequest) =>
    apiRequest<{ signal: Signal; message: string }>('/signals', {
      method: 'POST',
      body: JSON.stringify(signal)
    }),
  
  close: (id: string, data: { result: string; closedPrice: string; profitPips?: string }) =>
    apiRequest<{ signal: Signal; message: string }>(`/signals/${id}/close`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
  
  toggleLike: (id: string) =>
    apiRequest<{ message: string }>(`/signals/${id}/like`, { method: 'POST' })
}

// Portfolio API
export const portfolioApi = {
  getPortfolio: () =>
    apiRequest<{ portfolio: Portfolio }>('/portfolio'),
  
  updateBalance: (balance: number) =>
    apiRequest<{ portfolio: Portfolio; message: string }>('/portfolio/balance', {
      method: 'PATCH',
      body: JSON.stringify({ balance })
    }),
  
  addTrade: (profitLoss: number, pips: number) =>
    apiRequest<{ portfolio: Portfolio; message: string }>('/portfolio/trade', {
      method: 'POST',
      body: JSON.stringify({ profitLoss, pips })
    }),
  
  getStats: () =>
    apiRequest<{ stats: PortfolioStats; portfolio: Portfolio }>('/portfolio/stats')
}

// Journal API
export const journalApi = {
  getAll: (params?: { status?: string; symbol?: string; strategy?: string; page?: number; limit?: number }) => {
    const queryParams = new URLSearchParams()
    if (params?.status) queryParams.append('status', params.status)
    if (params?.symbol) queryParams.append('symbol', params.symbol)
    if (params?.strategy) queryParams.append('strategy', params.strategy)
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    
    return apiRequest<{ entries: JournalEntry[]; pagination: Pagination }>(`/journal?${queryParams}`)
  },
  
  getById: (id: string) =>
    apiRequest<{ entry: JournalEntry }>(`/journal/${id}`),
  
  create: (entry: CreateJournalRequest) =>
    apiRequest<{ entry: JournalEntry; message: string }>('/journal', {
      method: 'POST',
      body: JSON.stringify(entry)
    }),
  
  close: (id: string, data: { exitDate: string; exitPrice: string; profitLoss?: number; pips?: number; lessons?: string }) =>
    apiRequest<{ entry: JournalEntry; message: string }>(`/journal/${id}/close`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
  
  update: (id: string, data: Partial<JournalEntry>) =>
    apiRequest<{ entry: JournalEntry; message: string }>(`/journal/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
  
  delete: (id: string) =>
    apiRequest<{ message: string }>(`/journal/${id}`, { method: 'DELETE' }),
  
  getStats: () =>
    apiRequest<{ stats: JournalStats }>('/journal/stats/overview')
}

// Market API
export const marketApi = {
  getForexRates: () =>
    apiRequest<{ base: string; timestamp: string; rates: Record<string, string> }>('/market/forex'),
  
  getCrypto: (ids?: string) =>
    apiRequest<{ crypto: CryptoData[] }>(`/market/crypto${ids ? `?ids=${ids}` : ''}`),
  
  getCryptoById: (id: string) =>
    apiRequest<{ id: string; symbol: string; name: string; description: string; image: string; marketData: any; lastUpdated: string }>(`/market/crypto/${id}`),
  
  getOverview: () =>
    apiRequest<{ global: any; trending: any[] }>('/market/overview')
}

// Notifications API
export const notificationsApi = {
  getAll: (unread?: boolean) =>
    apiRequest<{ notifications: Notification[]; unreadCount: number; pagination: Pagination }>(
      `/notifications${unread ? '?unread=true' : ''}`
    ),
  
  markAsRead: (id: string) =>
    apiRequest<{ message: string }>(`/notifications/${id}/read`, { method: 'PATCH' }),
  
  markAllAsRead: () =>
    apiRequest<{ message: string }>('/notifications/read-all', { method: 'POST' }),
  
  delete: (id: string) =>
    apiRequest<{ message: string }>(`/notifications/${id}`, { method: 'DELETE' })
}

// Users API
export const usersApi = {
  getAll: () =>
    apiRequest<{ users: User[] }>('/users'),
  
  getById: (id: string) =>
    apiRequest<{ user: User }>(`/users/${id}`),
  
  update: (id: string, data: { name?: string; avatar?: string }) =>
    apiRequest<{ user: User; message: string }>(`/users/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data)
    }),
  
  updateRole: (id: string, role: string) =>
    apiRequest<{ user: User; message: string }>(`/users/${id}/role`, {
      method: 'PATCH',
      body: JSON.stringify({ role })
    }),
  
  updateStatus: (id: string, status: string) =>
    apiRequest<{ user: User; message: string }>(`/users/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status })
    })
}

// Types
export interface User {
  id: string
  email: string
  name: string
  role: string
  status: string
  avatar?: string
  createdAt: string
  lastLoginAt?: string
}

export interface Signal {
  id: string
  symbol: string
  type: string
  entryPrice: string
  stopLoss: string
  takeProfit: string
  takeProfit2?: string
  takeProfit3?: string
  riskReward: string
  timeframe: string
  analysis: string
  status: string
  result?: string
  closedPrice?: string
  profitPips?: string
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string
    avatar?: string
  }
  _count?: {
    likes: number
  }
}

export interface CreateSignalRequest {
  symbol: string
  type: string
  entryPrice: string
  stopLoss: string
  takeProfit: string
  takeProfit2?: string
  takeProfit3?: string
  riskReward: string
  timeframe: string
  analysis: string
}

export interface Portfolio {
  id: string
  userId: string
  balance: string
  equity: string
  margin: string
  freeMargin: string
  marginLevel: string
  totalProfit: string
  totalLoss: string
  winRate: string
  totalTrades: number
  winningTrades: number
  losingTrades: number
}

export interface PortfolioStats {
  totalTrades: number
  winRate: number
  totalProfit: number
  totalLoss: number
  netProfit: number
  averageWin: number
  averageLoss: number
  profitFactor: number
}

export interface JournalEntry {
  id: string
  userId: string
  symbol: string
  type: string
  entryDate: string
  exitDate?: string
  entryPrice: string
  exitPrice?: string
  lotSize: string
  stopLoss?: string
  takeProfit?: string
  profitLoss?: string
  pips?: string
  status: string
  strategy?: string
  notes?: string
  emotions?: string
  lessons?: string
  screenshots: string[]
  createdAt: string
  updatedAt: string
}

export interface CreateJournalRequest {
  symbol: string
  type: string
  entryDate: string
  entryPrice: string
  lotSize: string
  stopLoss?: string
  takeProfit?: string
  strategy?: string
  notes?: string
  emotions?: string
  screenshots?: string[]
}

export interface JournalStats {
  totalTrades: number
  openTrades: number
  closedTrades: number
  winningTrades: number
  losingTrades: number
  winRate: number
  totalProfit: number
  totalLoss: number
  netProfit: number
  profitFactor: number
}

export interface CryptoData {
  id: string
  symbol: string
  name: string
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  high24h: number
  low24h: number
  lastUpdated: string
}

export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  data?: any
  read: boolean
  createdAt: string
}

export interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export { ApiError }
export default apiRequest
