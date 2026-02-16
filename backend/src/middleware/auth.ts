import { Request, Response, NextFunction } from 'express'
import { verifyAccessToken, TokenPayload } from '../utils/jwt'
import { AppError } from './errorHandler'

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('Access token required', 401)
    }

    const token = authHeader.substring(7)
    const decoded = verifyAccessToken(token)
    
    req.user = decoded
    next()
  } catch (error) {
    next(new AppError('Invalid or expired token', 401))
  }
}

export const requireRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AppError('Authentication required', 401)
    }

    if (!roles.includes(req.user.role)) {
      throw new AppError('Insufficient permissions', 403)
    }

    next()
  }
}
