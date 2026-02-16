import { Router } from 'express'
import { body, param, validationResult } from 'express-validator'
import { prisma } from '../utils/prisma'
import { authenticate, requireRole } from '../middleware/auth'
import { asyncHandler, AppError } from '../middleware/errorHandler'

const router = Router()

const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Get all users (Admin only)
router.get(
  '/',
  authenticate,
  requireRole('ADMIN', 'MODERATOR'),
  asyncHandler(async (req: any, res: any) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        createdAt: true,
        lastLoginAt: true,
        _count: {
          select: {
            signals: true,
            journal: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json({ users })
  })
)

// Get user by ID
router.get(
  '/:id',
  authenticate,
  [param('id').isUUID(), validate],
  asyncHandler(async (req: any, res: any) => {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
        lastLoginAt: true,
        _count: {
          select: {
            signals: true,
            journal: true
          }
        }
      }
    })

    if (!user) {
      throw new AppError('User not found', 404)
    }

    res.json({ user })
  })
)

// Update user profile
router.patch(
  '/:id',
  authenticate,
  [param('id').isUUID(), validate],
  asyncHandler(async (req: any, res: any) => {
    // Only allow users to update their own profile (unless admin)
    if (req.user!.userId !== req.params.id && req.user!.role !== 'ADMIN') {
      throw new AppError('Unauthorized to update this profile', 403)
    }

    const { name, avatar } = req.body

    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        name,
        avatar
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        updatedAt: true
      }
    })

    res.json({
      message: 'Profile updated successfully',
      user
    })
  })
)

// Update user role (Admin only)
router.patch(
  '/:id/role',
  authenticate,
  requireRole('ADMIN'),
  [
    param('id').isUUID(),
    body('role').isIn(['USER', 'ADMIN', 'MODERATOR', 'ANALYST']),
    validate
  ],
  asyncHandler(async (req: any, res: any) => {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role: req.body.role },
      select: {
        id: true,
        email: true,
        name: true,
        role: true
      }
    })

    res.json({
      message: 'User role updated successfully',
      user
    })
  })
)

// Update user status (Admin only)
router.patch(
  '/:id/status',
  authenticate,
  requireRole('ADMIN', 'MODERATOR'),
  [
    param('id').isUUID(),
    body('status').isIn(['ACTIVE', 'INACTIVE', 'SUSPENDED']),
    validate
  ],
  asyncHandler(async (req: any, res: any) => {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
      select: {
        id: true,
        email: true,
        name: true,
        status: true
      }
    })

    res.json({
      message: 'User status updated successfully',
      user
    })
  })
)

export { router as usersRouter }
