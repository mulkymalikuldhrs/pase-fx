import { prisma } from '../src/utils/prisma'
import { hashPassword } from '../src/utils/password'

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await hashPassword('admin123')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pasefx.com' },
    update: {},
    create: {
      email: 'admin@pasefx.com',
      password: adminPassword,
      name: 'Admin Pasè FX',
      role: 'ADMIN',
      status: 'ACTIVE'
    }
  })
  console.log('✅ Admin user created:', admin.email)

  // Create analyst user
  const analystPassword = await hashPassword('analyst123')
  const analyst = await prisma.user.upsert({
    where: { email: 'analyst@pasefx.com' },
    update: {},
    create: {
      email: 'analyst@pasefx.com',
      password: analystPassword,
      name: 'Senior Analyst',
      role: 'ANALYST',
      status: 'ACTIVE'
    }
  })
  console.log('✅ Analyst user created:', analyst.email)

  // Create regular user
  const userPassword = await hashPassword('user123')
  const user = await prisma.user.upsert({
    where: { email: 'user@pasefx.com' },
    update: {},
    create: {
      email: 'user@pasefx.com',
      password: userPassword,
      name: 'Demo User',
      role: 'USER',
      status: 'ACTIVE'
    }
  })
  console.log('✅ Regular user created:', user.email)

  // Create portfolios for users
  await prisma.portfolio.upsert({
    where: { userId: user.id },
    update: {},
    create: {
      userId: user.id,
      balance: 10000,
      equity: 10000,
      margin: 0,
      freeMargin: 10000
    }
  })

  await prisma.portfolio.upsert({
    where: { userId: admin.id },
    update: {},
    create: {
      userId: admin.id,
      balance: 50000,
      equity: 50000,
      margin: 0,
      freeMargin: 50000
    }
  })
  console.log('✅ Portfolios created')

  // Create sample signals
  const sampleSignals = [
    {
      symbol: 'EUR/USD',
      type: 'BUY',
      entryPrice: '1.0850',
      stopLoss: '1.0800',
      takeProfit: '1.0950',
      takeProfit2: '1.1000',
      riskReward: '1:2',
      timeframe: 'H4',
      analysis: 'Bullish momentum on H4 timeframe. Price broke above key resistance at 1.0840. RSI showing bullish divergence. Targeting 1.0950 with extended target at 1.1000.',
      status: 'ACTIVE',
      authorId: analyst.id
    },
    {
      symbol: 'GBP/USD',
      type: 'SELL',
      entryPrice: '1.2650',
      stopLoss: '1.2700',
      takeProfit: '1.2550',
      takeProfit2: '1.2500',
      riskReward: '1:2',
      timeframe: 'D1',
      analysis: 'Bearish engulfing pattern on daily chart. Price rejected at 1.2700 resistance. MACD showing bearish crossover. Expecting move down to 1.2550 support.',
      status: 'ACTIVE',
      authorId: analyst.id
    },
    {
      symbol: 'XAU/USD',
      type: 'BUY',
      entryPrice: '2035.00',
      stopLoss: '2020.00',
      takeProfit: '2055.00',
      riskReward: '1:1.33',
      timeframe: 'H1',
      analysis: 'Gold showing strength at 2030 support level. Safe-haven demand increasing. Bollinger Bands expanding indicating volatility. Targeting 2055.',
      status: 'CLOSED',
      result: 'WIN',
      closedPrice: '2058.50',
      profitPips: '2350',
      authorId: analyst.id
    },
    {
      symbol: 'USD/JPY',
      type: 'SELL',
      entryPrice: '149.50',
      stopLoss: '150.00',
      takeProfit: '148.50',
      riskReward: '1:2',
      timeframe: 'H4',
      analysis: 'Yen strengthening on safe-haven flows. Price at resistance level. Stochastic overbought. Expecting pullback to 148.50.',
      status: 'CLOSED',
      result: 'LOSS',
      closedPrice: '150.20',
      profitPips: '-70',
      authorId: analyst.id
    },
    {
      symbol: 'BTC/USD',
      type: 'BUY',
      entryPrice: '52000',
      stopLoss: '50500',
      takeProfit: '55000',
      takeProfit2: '58000',
      riskReward: '1:2',
      timeframe: 'D1',
      analysis: 'Bitcoin consolidating above 50K. ETF inflows positive. Volume increasing. Expecting breakout to 55K with extended target at 58K.',
      status: 'ACTIVE',
      authorId: admin.id
    }
  ]

  for (const signal of sampleSignals) {
    await prisma.signal.create({
      data: signal as any
    })
  }
  console.log('✅ Sample signals created')

  // Create sample journal entries
  const sampleJournalEntries = [
    {
      userId: user.id,
      symbol: 'EUR/USD',
      type: 'BUY',
      entryDate: new Date('2026-02-10T08:30:00'),
      exitDate: new Date('2026-02-10T14:45:00'),
      entryPrice: '1.0820',
      exitPrice: '1.0870',
      lotSize: '0.5',
      stopLoss: '1.0780',
      takeProfit: '1.0880',
      profitLoss: '250',
      pips: '50',
      status: 'CLOSED',
      strategy: 'Breakout',
      notes: 'Clean breakout above resistance. Good risk management.',
      emotions: 'Confident',
      lessons: 'Patience paid off. Waited for confirmation.'
    },
    {
      userId: user.id,
      symbol: 'GBP/USD',
      type: 'SELL',
      entryDate: new Date('2026-02-12T10:15:00'),
      exitDate: new Date('2026-02-12T16:30:00'),
      entryPrice: '1.2680',
      exitPrice: '1.2630',
      lotSize: '0.3',
      stopLoss: '1.2720',
      takeProfit: '1.2600',
      profitLoss: '150',
      pips: '50',
      status: 'CLOSED',
      strategy: 'Trend Following',
      notes: 'Followed the downtrend. Partial profit taken.',
      emotions: 'Patient',
      lessons: 'Trend is your friend. Don\'t fight it.'
    },
    {
      userId: user.id,
      symbol: 'XAU/USD',
      type: 'BUY',
      entryDate: new Date('2026-02-14T09:00:00'),
      entryPrice: '2025.00',
      lotSize: '0.2',
      stopLoss: '2010.00',
      takeProfit: '2050.00',
      status: 'OPEN',
      strategy: 'Support Bounce',
      notes: 'Long-term position. Gold looking strong.',
      emotions: 'Optimistic'
    }
  ]

  for (const entry of sampleJournalEntries) {
    await prisma.tradeJournal.create({
      data: entry as any
    })
  }
  console.log('✅ Sample journal entries created')

  console.log('\n🎉 Database seed completed successfully!')
  console.log('\nLogin credentials:')
  console.log('  Admin: admin@pasefx.com / admin123')
  console.log('  Analyst: analyst@pasefx.com / analyst123')
  console.log('  User: user@pasefx.com / user123')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
