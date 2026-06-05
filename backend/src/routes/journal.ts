import { Router, Request, Response, NextFunction } from 'express'
import { body, param, query, validationResult } from 'express-validator'
import { prisma } from '../utils/prisma'
import { authenticate } from '../middleware/auth'
import { asyncHandler, AppError } from '../middleware/errorHandler'
import { Prisma } from '@prisma/client'

const router = Router()

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Get all journal entries
router.get(
  '/',
  authenticate,
  [
    query('status').optional().isIn(['OPEN', 'CLOSED']),
    query('symbol').optional().trim(),
    query('strategy').optional().trim(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    validate
  ],
  asyncHandler(async (req: Request, res: Response) => {
    const { status, symbol, strategy, page = '1', limit = '20' } = req.query as Record<string, string>
    const userId = req.user!.userId

    const where: Prisma.TradeJournalWhereInput = { userId }
    if (status) where.status = status
    if (symbol) where.symbol = { contains: symbol, mode: 'insensitive' }
    if (strategy) where.strategy = { contains: strategy, mode: 'insensitive' }

    const [entries, total] = await Promise.all([
      prisma.tradeJournal.findMany({
        where,
        orderBy: { entryDate: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit)
      }),
      prisma.tradeJournal.count({ where })
    ])

    res.json({
      entries,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  })
)

// Get single journal entry
router.get(
  '/:id',
  authenticate,
  [param('id').isUUID(), validate],
  asyncHandler(async (req: Request, res: Response) => {
    const entry = await prisma.tradeJournal.findFirst({
      where: {
        id: req.params.id,
        userId: req.user!.userId
      }
    })

    if (!entry) {
      throw new AppError('Journal entry not found', 404)
    }

    res.json({ entry })
  })
)

// Create journal entry
router.post(
  '/',
  authenticate,
  [
    body('symbol').trim().notEmpty(),
    body('type').trim().notEmpty(),
    body('entryDate').isISO8601(),
    body('entryPrice').isDecimal(),
    body('lotSize').isDecimal(),
    body('stopLoss').optional().isDecimal(),
    body('takeProfit').optional().isDecimal(),
    body('strategy').optional().trim(),
    body('notes').optional().trim(),
    body('emotions').optional().trim(),
    body('screenshots').optional().isArray(),
    validate
  ],
  asyncHandler(async (req: Request, res: Response) => {
    const entry = await prisma.tradeJournal.create({
      data: {
        ...req.body,
        userId: req.user!.userId,
        status: 'OPEN'
      }
    })

    res.status(201).json({
      message: 'Journal entry created successfully',
      entry
    })
  })
)

// Close journal entry
router.patch(
  '/:id/close',
  authenticate,
  [
    param('id').isUUID(),
    body('exitDate').isISO8601(),
    body('exitPrice').isDecimal(),
    body('profitLoss').optional().isDecimal(),
    body('pips').optional().isDecimal(),
    body('lessons').optional().trim(),
    validate
  ],
  asyncHandler(async (req: Request, res: Response) => {
    const { exitDate, exitPrice, profitLoss, pips, lessons } = req.body

    const entry = await prisma.tradeJournal.updateMany({
      where: {
        id: req.params.id,
        userId: req.user!.userId,
        status: 'OPEN'
      },
      data: {
        exitDate,
        exitPrice,
        profitLoss,
        pips,
        lessons,
        status: 'CLOSED'
      }
    })

    if (entry.count === 0) {
      throw new AppError('Journal entry not found or already closed', 404)
    }

    const updatedEntry = await prisma.tradeJournal.findUnique({
      where: { id: req.params.id }
    })

    res.json({
      message: 'Journal entry closed successfully',
      entry: updatedEntry
    })
  })
)

// Update journal entry
router.patch(
  '/:id',
  authenticate,
  [
    param('id').isUUID(),
    body('symbol').optional().trim().notEmpty(),
    body('type').optional().trim().notEmpty(),
    body('entryPrice').optional().isDecimal(),
    body('exitPrice').optional().isDecimal(),
    body('lotSize').optional().isDecimal(),
    body('stopLoss').optional().isDecimal(),
    body('takeProfit').optional().isDecimal(),
    body('strategy').optional().trim(),
    body('notes').optional().trim(),
    body('emotions').optional().trim(),
    body('lessons').optional().trim(),
    validate
  ],
  asyncHandler(async (req: Request, res: Response) => {
    const { symbol, type, entryPrice, exitPrice, lotSize, stopLoss, takeProfit, strategy, notes, emotions, lessons } = req.body
    
    // Only allow updating specific fields (prevent mass assignment)
    const updateData: Record<string, unknown> = {}
    if (symbol !== undefined) updateData.symbol = symbol
    if (type !== undefined) updateData.type = type
    if (entryPrice !== undefined) updateData.entryPrice = entryPrice
    if (exitPrice !== undefined) updateData.exitPrice = exitPrice
    if (lotSize !== undefined) updateData.lotSize = lotSize
    if (stopLoss !== undefined) updateData.stopLoss = stopLoss
    if (takeProfit !== undefined) updateData.takeProfit = takeProfit
    if (strategy !== undefined) updateData.strategy = strategy
    if (notes !== undefined) updateData.notes = notes
    if (emotions !== undefined) updateData.emotions = emotions
    if (lessons !== undefined) updateData.lessons = lessons

    const entry = await prisma.tradeJournal.updateMany({
      where: {
        id: req.params.id,
        userId: req.user!.userId
      },
      data: updateData
    })

    if (entry.count === 0) {
      throw new AppError('Journal entry not found', 404)
    }

    const updatedEntry = await prisma.tradeJournal.findUnique({
      where: { id: req.params.id }
    })

    res.json({
      message: 'Journal entry updated successfully',
      entry: updatedEntry
    })
  })
)

// Delete journal entry
router.delete(
  '/:id',
  authenticate,
  [param('id').isUUID(), validate],
  asyncHandler(async (req: Request, res: Response) => {
    const entry = await prisma.tradeJournal.deleteMany({
      where: {
        id: req.params.id,
        userId: req.user!.userId
      }
    })

    if (entry.count === 0) {
      throw new AppError('Journal entry not found', 404)
    }

    res.json({ message: 'Journal entry deleted successfully' })
  })
)

// Get journal statistics
router.get(
  '/stats/overview',
  authenticate,
  asyncHandler(async (req: Request, res: Response) => {
    const entries = await prisma.tradeJournal.findMany({
      where: { userId: req.user!.userId }
    })

    const totalTrades = entries.length
    const closedTrades = entries.filter(e => e.status === 'CLOSED')
    const openTrades = entries.filter(e => e.status === 'OPEN')
    
    const winningTrades = closedTrades.filter(e => (e.profitLoss || 0) > 0)
    const losingTrades = closedTrades.filter(e => (e.profitLoss || 0) < 0)
    
    const totalProfit = winningTrades.reduce((sum, e) => sum + (e.profitLoss || 0), 0)
    const totalLoss = losingTrades.reduce((sum, e) => sum + Math.abs(e.profitLoss || 0), 0)
    const netProfit = totalProfit - totalLoss

    const stats = {
      totalTrades,
      openTrades: openTrades.length,
      closedTrades: closedTrades.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      winRate: closedTrades.length > 0 ? (winningTrades.length / closedTrades.length) * 100 : 0,
      totalProfit,
      totalLoss,
      netProfit,
      profitFactor: totalLoss > 0 ? totalProfit / totalLoss : totalProfit > 0 ? Infinity : 0
    }

    res.json({ stats })
  })
)

export { router as journalRouter }
