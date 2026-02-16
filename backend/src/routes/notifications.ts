import { Router } from 'express'
import { body, param, query, validationResult } from 'express-validator'
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

// Get user's notifications
router.get(
  '/',
  authenticate,
  [
    query('unread').optional().isBoolean(),
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 50 }),
    validate
  ],
  asyncHandler(async (req: any, res: any) => {
    const { unread, page = 1, limit = 20 } = req.query

    const where: any = { userId: req.user!.userId }
    if (unread === 'true') where.read = false

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit)
      }),
      prisma.notification.count({ where }),
      prisma.notification.count({
        where: { userId: req.user!.userId, read: false }
      })
    ])

    res.json({
      notifications,
      unreadCount,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    })
  })
)

// Mark notification as read
router.patch(
  '/:id/read',
  authenticate,
  [param('id').isUUID(), validate],
  asyncHandler(async (req: any, res: any) => {
    const notification = await prisma.notification.updateMany({
      where: {
        id: req.params.id,
        userId: req.user!.userId
      },
      data: { read: true }
    })

    if (notification.count === 0) {
      throw new AppError('Notification not found', 404)
    }

    res.json({ message: 'Notification marked as read' })
  })
)

// Mark all notifications as read
router.post(
  '/read-all',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    await prisma.notification.updateMany({
      where: {
        userId: req.user!.userId,
        read: false
      },
      data: { read: true }
    })

    res.json({ message: 'All notifications marked as read' })
  })
)

// Delete notification
router.delete(
  '/:id',
  authenticate,
  [param('id').isUUID(), validate],
  asyncHandler(async (req: any, res: any) => {
    const notification = await prisma.notification.deleteMany({
      where: {
        id: req.params.id,
        userId: req.user!.userId
      }
    })

    if (notification.count === 0) {
      throw new AppError('Notification not found', 404)
    }

    res.json({ message: 'Notification deleted successfully' })
  })
)

// Create notification (internal use)
export const createNotification = async (data: {
  userId: string
  type: string
  title: string
  message: string
  data?: any
}) => {
  return prisma.notification.create({ data })
}

export { router as notificationsRouter }
