import { Router } from 'express'
import { body, param, validationResult } from 'express-validator'
import { prisma } from '../utils/prisma'
import { authenticate } from '../middleware/auth'
import { asyncHandler, AppError } from '../middleware/errorHandler'

const router = Router()

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Get user's portfolio
router.get(
  '/',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: req.user!.userId }
    })

    if (!portfolio) {
      throw new AppError('Portfolio not found', 404)
    }

    res.json({ portfolio })
  })
)

// Update portfolio balance
router.patch(
  '/balance',
  authenticate,
  [
    body('balance').isDecimal(),
    validate
  ],
  asyncHandler(async (req: any, res: any) => {
    const { balance } = req.body

    const portfolio = await prisma.portfolio.update({
      where: { userId: req.user!.userId },
      data: {
        balance,
        freeMargin: balance
      }
    })

    res.json({
      message: 'Portfolio balance updated',
      portfolio
    })
  })
)

// Add trade to portfolio (update statistics)
router.post(
  '/trade',
  authenticate,
  [
    body('profitLoss').isDecimal(),
    body('pips').isDecimal(),
    validate
  ],
  asyncHandler(async (req: any, res: any) => {
    const { profitLoss, pips } = req.body
    const profitLossDecimal = parseFloat(profitLoss)

    const currentPortfolio = await prisma.portfolio.findUnique({
      where: { userId: req.user!.userId }
    })

    if (!currentPortfolio) {
      throw new AppError('Portfolio not found', 404)
    }

    const isWin = profitLossDecimal > 0
    const newTotalTrades = currentPortfolio.totalTrades + 1
    const newWinningTrades = currentPortfolio.winningTrades + (isWin ? 1 : 0)
    const newLosingTrades = currentPortfolio.losingTrades + (isWin ? 0 : 1)
    const newWinRate = (newWinningTrades / newTotalTrades) * 100

    const portfolio = await prisma.portfolio.update({
      where: { userId: req.user!.userId },
      data: {
        totalProfit: isWin 
          ? { increment: profitLossDecimal } 
          : currentPortfolio.totalProfit,
        totalLoss: !isWin 
          ? { increment: Math.abs(profitLossDecimal) } 
          : currentPortfolio.totalLoss,
        totalTrades: newTotalTrades,
        winningTrades: newWinningTrades,
        losingTrades: newLosingTrades,
        winRate: newWinRate,
        equity: { increment: profitLossDecimal },
        freeMargin: { increment: profitLossDecimal }
      }
    })

    res.json({
      message: 'Trade recorded successfully',
      portfolio
    })
  })
)

// Get portfolio statistics
router.get(
  '/stats',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    const portfolio = await prisma.portfolio.findUnique({
      where: { userId: req.user!.userId }
    })

    if (!portfolio) {
      throw new AppError('Portfolio not found', 404)
    }

    const stats = {
      totalTrades: portfolio.totalTrades,
      winRate: portfolio.winRate,
      totalProfit: portfolio.totalProfit,
      totalLoss: portfolio.totalLoss,
      netProfit: portfolio.totalProfit - portfolio.totalLoss,
      averageWin: portfolio.winningTrades > 0 
        ? portfolio.totalProfit / portfolio.winningTrades 
        : 0,
      averageLoss: portfolio.losingTrades > 0 
        ? portfolio.totalLoss / portfolio.losingTrades 
        : 0,
      profitFactor: portfolio.totalLoss > 0 
        ? portfolio.totalProfit / portfolio.totalLoss 
        : portfolio.totalProfit > 0 ? Infinity : 0
    }

    res.json({ stats, portfolio })
  })
)

export { router as portfolioRouter }
