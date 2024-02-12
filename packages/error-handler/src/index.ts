import { NextFunction, Request as request, Response as response } from 'express'
import { StatusCode } from './status-codes'

type ErrorHandlerType = Promise<void>
export type ZodError = {
  validation: string
  code: string
  message: string
  path: string[]
}

export const HttpStatus = StatusCode

export const ErrorHandler = async (
  err: any,
  req: request,
  res: response,
  next: NextFunction,
): ErrorHandlerType => {
  process.env.ENV === 'dev' && console.log(err)
  if (err) {
    if (err.constructor.name === 'ZodError') {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        data: null,
        error: {
          code: HttpStatus.UNPROCESSABLE_ENTITY,
          validation: err.issues,
        },
        message: err.issues.map((issue: ZodError) => issue.message).join(','),
      })
    } else {
      res.status(res.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
        data: null,
        error: {
          code: res.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR,
          validation: null,
        },
        message: err.message,
      })
    }
  }
  next()
}

export const NotFound = async (
  req: request,
  res: response,
  next: NextFunction,
): ErrorHandlerType => {
  const error = new Error(`Not Found: ${req.method}:${req.originalUrl}`)
  res.status(HttpStatus.NOT_FOUND)
  next(error)
}
