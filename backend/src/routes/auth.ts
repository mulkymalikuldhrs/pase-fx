import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { prisma } from '../utils/prisma'
import { hashPassword, comparePassword } from '../utils/password'
import { generateTokens, clearAuthCookies } from '../utils/jwt'
import { authenticate } from '../middleware/auth'
import { asyncHandler, AppError } from '../middleware/errorHandler'

const router = Router()

// Validation middleware
const validate = (req: any, res: any, next: any) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

// Register
router.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('name').trim().isLength({ min: 2 }),
    validate
  ],
  asyncHandler(async (req: any, res: any) => {
    const { email, password, name } = req.body

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw new AppError('Email already registered', 409)
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'USER'
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true
      }
    })

    // Create portfolio for user
    await prisma.portfolio.create({
      data: {
        userId: user.id,
        balance: 0,
        equity: 0,
        margin: 0,
        freeMargin: 0
      }
    })

    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    res.status(201).json({
      message: 'User registered successfully',
      user,
      ...tokens
    })
  })
)

// Login
router.post(
  '/login',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').notEmpty(),
    validate
  ],
  asyncHandler(async (req: any, res: any) => {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw new AppError('Invalid credentials', 401)
    }

    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      throw new AppError('Invalid credentials', 401)
    }

    if (user.status !== 'ACTIVE') {
      throw new AppError('Account is not active', 403)
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    })

    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      ...tokens
    })
  })
)

// Get current user
router.get(
  '/me',
  authenticate,
  asyncHandler(async (req: any, res: any) => {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        status: true,
        avatar: true,
        createdAt: true,
        lastLoginAt: true
      }
    })

    if (!user) {
      throw new AppError('User not found', 404)
    }

    res.json({ user })
  })
)

// Logout
router.post('/logout', authenticate, asyncHandler(async (req: any, res: any) => {
  clearAuthCookies(res)
  res.json({ message: 'Logged out successfully' })
}))

export { router as authRouter }
