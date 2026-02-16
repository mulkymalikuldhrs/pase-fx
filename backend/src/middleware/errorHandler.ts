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

  console.error(`[Error] ${req.method} ${req.path}:`, err)

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'Internal Server Error' : message,
    message: process.env.NODE_ENV === 'development' ? message : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  })
}

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}
