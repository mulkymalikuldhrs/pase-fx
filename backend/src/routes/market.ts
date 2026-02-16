import { Router } from 'express'
import { query, validationResult } from 'express-validator'
import axios from 'axios'
import { asyncHandler, AppError } from '../middleware/errorHandler'

const router = Router()

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Forex rates from ExchangeRate-API
router.get(
  '/forex',
  asyncHandler(async (req: any, res: any) => {
    const API_KEY = process.env.EXCHANGERATE_API_KEY
    
    if (!API_KEY) {
      throw new AppError('Exchange rate API not configured', 500)
    }

    const response = await axios.get(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`,
      { timeout: 10000 }
    )

    const rates = response.data.conversion_rates
    const forexPairs = {
      'EUR/USD': (1 / rates.EUR).toFixed(5),
      'GBP/USD': (1 / rates.GBP).toFixed(5),
      'USD/JPY': rates.JPY.toFixed(3),
      'USD/CHF': rates.CHF.toFixed(5),
      'USD/CAD': rates.CAD.toFixed(5),
      'AUD/USD': rates.AUD.toFixed(5),
      'NZD/USD': rates.NZD.toFixed(5),
      'EUR/GBP': (rates.GBP / rates.EUR).toFixed(5),
      'GBP/JPY': ((1 / rates.GBP) * rates.JPY).toFixed(3),
      'EUR/JPY': ((1 / rates.EUR) * rates.JPY).toFixed(3)
    }

    res.json({
      base: 'USD',
      timestamp: new Date().toISOString(),
      rates: forexPairs
    })
  })
)

// Crypto data from CoinGecko
router.get(
  '/crypto',
  [
    query('ids').optional().trim(),
    query('vs_currency').optional().trim().default('usd'),
    validate
  ],
  asyncHandler(async (req: any, res: any) => {
    const { ids, vs_currency = 'usd' } = req.query
    const API_KEY = process.env.COINGECKO_API_KEY
    
    const defaultIds = 'bitcoin,ethereum,solana,ripple,cardano,polkadot,chainlink,polygon'
    const coinIds = ids || defaultIds

    const headers: any = {}
    if (API_KEY) {
      headers['x-cg-api-key'] = API_KEY
    }

    const response = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets',
      {
        params: {
          ids: coinIds,
          vs_currency,
          order: 'market_cap_desc',
          sparkline: false,
          price_change_percentage: '24h'
        },
        headers,
        timeout: 10000
      }
    )

    const crypto = response.data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      price: coin.current_price,
      change24h: coin.price_change_percentage_24h,
      marketCap: coin.market_cap,
      volume24h: coin.total_volume,
      high24h: coin.high_24h,
      low24h: coin.low_24h,
      lastUpdated: coin.last_updated
    }))

    res.json({ crypto })
  })
)

// Get specific coin data
router.get(
  '/crypto/:id',
  asyncHandler(async (req: any, res: any) => {
    const { id } = req.params
    const API_KEY = process.env.COINGECKO_API_KEY
    
    const headers: any = {}
    if (API_KEY) {
      headers['x-cg-api-key'] = API_KEY
    }

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${id}`,
      {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false
        },
        headers,
        timeout: 10000
      }
    )

    const coin = response.data

    res.json({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      description: coin.description.en,
      image: coin.image.large,
      marketData: {
        price: coin.market_data.current_price.usd,
        change24h: coin.market_data.price_change_percentage_24h,
        change7d: coin.market_data.price_change_percentage_7d,
        marketCap: coin.market_data.market_cap.usd,
        volume24h: coin.market_data.total_volume.usd,
        high24h: coin.market_data.high_24h.usd,
        low24h: coin.market_data.low_24h.usd,
        ath: coin.market_data.ath.usd,
        atl: coin.market_data.atl.usd
      },
      lastUpdated: coin.last_updated
    })
  })
)

// Market overview
router.get(
  '/overview',
  asyncHandler(async (req: any, res: any) => {
    const API_KEY = process.env.COINGECKO_API_KEY
    
    const headers: any = {}
    if (API_KEY) {
      headers['x-cg-api-key'] = API_KEY
    }

    const [globalResponse, trendingResponse] = await Promise.all([
      axios.get('https://api.coingecko.com/api/v3/global', { headers, timeout: 10000 }),
      axios.get('https://api.coingecko.com/api/v3/search/trending', { headers, timeout: 10000 })
    ])

    const globalData = globalResponse.data.data
    const trending = trendingResponse.data.coins.map((item: any) => ({
      id: item.item.id,
      name: item.item.name,
      symbol: item.item.symbol,
      thumb: item.item.thumb,
      marketCapRank: item.item.market_cap_rank
    }))

    res.json({
      global: {
        totalMarketCap: globalData.total_market_cap.usd,
        totalVolume: globalData.total_volume.usd,
        marketCapChange24h: globalData.market_cap_change_percentage_24h_usd,
        activeCryptocurrencies: globalData.active_cryptocurrencies,
        markets: globalData.markets
      },
      trending
    })
  })
)

export { router as marketRouter }
