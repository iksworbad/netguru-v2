import { Request } from 'express'
import { asyncHandler } from '@restless/restless'
import { UnknownEndpointError } from '../errors'

export const unknownEndpoint = asyncHandler((_, req: Request) => {
  throw new UnknownEndpointError(req.method, req.path)
})
