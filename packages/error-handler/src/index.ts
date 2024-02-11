import { NextFunction, Request as request, Response as response } from 'express'

type ErrorHandlerType = Promise<void>

export const ErrorHandler = async (
  err: any,
  req: request,
  res: response,
  next: NextFunction,
): ErrorHandlerType => {
  console.log(err)
  if (err) {
    res.status(res.statusCode ?? 500).json({
      data: null,
      error: err.message?.startsWith('[\n')
        ? JSON.parse(err.message)
        : err.message,
      message: err.message,
    })
  }
  next()
}

export const NotFound = async (
  req: request,
  res: response,
  next: NextFunction,
): ErrorHandlerType => {
  const error = new Error(`Not Found: ${req.method}:${req.originalUrl}`)
  res.status(404)
  next(error)
}
