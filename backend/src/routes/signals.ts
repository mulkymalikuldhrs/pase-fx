import { Router } from 'express'
import { body, query, param, validationResult } from 'express-validator'
import { prisma } from '../utils/prisma'
import { authenticate, requireRole } from '../middleware/auth'
import { asyncHandler, AppError } from '../middleware/errorHandler'
import { SignalType, SignalStatus, SignalResult } from '@prisma/client'

const router = Router()

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Get all signals with filters
router.get(
  '/',
  [
    query('status').optional().isIn(['ACTIVE', 'CLOSED', 'CANCELLED', 'EXPIRED']),
    query('type').optional().isIn(['BUY', 'SELL', 'BUY_LIMIT', 'SELL_LIMIT', 'BUY_STOP', 'SELL_STOP']),
    query('symbol').optional().trim(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    validate
  ],
  asyncHandler(async (req: any, res: any) => {
    const { status, type, symbol, page = 1, limit = 20 } = req.query

    const where: any = {}
    if (status) where.status = status
    if (type) where.type = type
    if (symbol) where.symbol = { contains: symbol, mode: 'insensitive' }

    const [signals, total] = await Promise.all([
      prisma.signal.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              avatar: true
            }
          },
          _count: {
            select: {
              likes: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit)
      }),
      prisma.signal.count({ where })
    ])

    res.json({
      signals,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  })
)

// Get single signal
router.get(
  '/:id',
  [param('id').isUUID(), validate],
  asyncHandler(async (req: any, res: any) => {
    const signal = await prisma.signal.findUnique({
      where: { id: req.params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        },
        likes: {
          select: {
            userId: true
          }
        },
        _count: {
          select: {
            likes: true
          }
        }
      }
    })

    if (!signal) {
      throw new AppError('Signal not found', 404)
    }

    res.json({ signal })
  })
)

// Create signal (Admin/Analyst only)
router.post(
  '/',
  authenticate,
  requireRole('ADMIN', 'ANALYST', 'MODERATOR'),
  [
    body('symbol').trim().notEmpty(),
    body('type').isIn(['BUY', 'SELL', 'BUY_LIMIT', 'SELL_LIMIT', 'BUY_STOP', 'SELL_STOP']),
    body('entryPrice').isDecimal(),
    body('stopLoss').isDecimal(),
    body('takeProfit').isDecimal(),
    body('takeProfit2').optional().isDecimal(),
    body('takeProfit3').optional().isDecimal(),
    body('riskReward').trim().notEmpty(),
    body('timeframe').trim().notEmpty(),
    body('analysis').trim().notEmpty(),
    validate
  ],
  asyncHandler(async (req: any, res: any) => {
    const signal = await prisma.signal.create({
      data: {
        ...req.body,
        authorId: req.user!.userId,
        status: 'ACTIVE'
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    res.status(201).json({
      message: 'Signal created successfully',
      signal
    })
  })
)

// Close signal (Admin/Analyst only)
router.patch(
  '/:id/close',
  authenticate,
  requireRole('ADMIN', 'ANALYST', 'MODERATOR'),
  [
    param('id').isUUID(),
    body('result').isIn(['WIN', 'LOSS', 'BREAKEVEN']),
    body('closedPrice').isDecimal(),
    body('profitPips').optional().isDecimal(),
    validate
  ],
  asyncHandler(async (req: any, res: any) => {
    const { result, closedPrice, profitPips } = req.body

    const signal = await prisma.signal.update({
      where: { id: req.params.id },
      data: {
        status: 'CLOSED',
        result: result as SignalResult,
        closedPrice,
        profitPips
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            avatar: true
          }
        }
      }
    })

    res.json({
      message: 'Signal closed successfully',
      signal
    })
  })
)

// Like/Unlike signal
router.post(
  '/:id/like',
  authenticate,
  [param('id').isUUID(), validate],
  asyncHandler(async (req: any, res: any) => {
    const existingLike = await prisma.signalLike.findUnique({
      where: {
        signalId_userId: {
          signalId: req.params.id,
          userId: req.user!.userId
        }
      }
    })

    if (existingLike) {
      await prisma.signalLike.delete({
        where: { id: existingLike.id }
      })
      res.json({ message: 'Signal unliked' })
    } else {
      await prisma.signalLike.create({
        data: {
          signalId: req.params.id,
          userId: req.user!.userId
        }
      })
      res.json({ message: 'Signal liked' })
    }
  })
)

export { router as signalsRouter }
