import { HttpAwareError, InvalidRequest } from '../errors'
import { Request, Response, NextFunction } from 'express'
import { SanitizeError } from '@restless/restless'

function toConstCase(className: string) {
  return className
    .replace(/(?<=[a-z])([A-Z])/g, '_$1')
    .toUpperCase()
}

function preprocess(error: unknown) {
  if (error instanceof HttpAwareError) {
    return error
  }

  if (error instanceof SanitizeError) {
    return new InvalidRequest(error.errors)
  }

  if (process.env.NODE_ENV !== 'test') {
    console.error('Unknown error in request handler', error)
  }

  if (!(error instanceof Error)) {
    return new HttpAwareError(
      'An unknown error occurred',
      'UNKNOWN_UNRECOGNIZED_ERROR',
      500,
    )
  }

  return new HttpAwareError(
    error.message,
    `UNKNOWN_${toConstCase(error.constructor.name)}`,
    500,
  )
}

function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  const error = preprocess(err)
  res.status(error.status)
  res.send(error.toPOJO())
}

export default errorHandler
