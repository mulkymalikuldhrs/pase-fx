import { Request, Response, NextFunction } from 'express'

export class AppError extends Error {
  statusCode: number
  isOperational: boolean

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = true

    Error.captureStackTrace(this, this.constructor)
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500
  let message = 'Internal Server Error'

  if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
  } else if (err.name === 'ValidationError') {
    statusCode = 400
    message = err.message
  } else if (err.name === 'UnauthorizedError') {
    statusCode = 401
    message = 'Unauthorized'
  }

  // Log full error details server-side only
  if (statusCode >= 500) {
    console.error(`[Error] ${req.method} ${req.path}:`, err)
  } else {
    console.warn(`[Warn] ${req.method} ${req.path}: ${statusCode} - ${message}`)
  }

  // Never expose internal error details to clients, even in development
  // Use server logs for debugging instead
  const isClientError = statusCode < 500
  res.status(statusCode).json({
    error: isClientError ? message : 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && isClientError && {
      details: err instanceof AppError ? err.message : undefined
    })
  })
}

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
