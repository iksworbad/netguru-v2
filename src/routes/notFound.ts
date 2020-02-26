import { Request } from 'express'
import { EndpointNotFound } from '../errors'

export function notFound(req: Request) {
  throw new EndpointNotFound(req.method, req.path)
}
