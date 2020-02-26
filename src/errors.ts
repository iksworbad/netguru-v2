import { SanitizerFailure } from '@restless/sanitizers'

export class UnknownEndpointError extends Error {
  constructor(method: string, path: string) {
    super(`Cannot ${method.toUpperCase()} ${path}`)
    Object.setPrototypeOf(this, UnknownEndpointError.prototype)
  }
}

export class MovieNotFound extends Error {
  constructor() {
    super('Movie not found in external API. Please contact our provider omdbapi')
    Object.setPrototypeOf(this, UnknownEndpointError.prototype)
  }
}

export class HttpAwareError extends Error {
  type: string
  status: number

  constructor(message: string, type: string, status: number) {
    super(message)
    this.type = type
    this.status = status
  }

  toPOJO() {
    return {
      type: this.type,
      message: this.message,
      status: this.status,
    }
  }
}

export class EndpointNotFound extends HttpAwareError {
  constructor(method: string, address: string) {
    super(`Cannot ${method} ${address}`, 'ENDPOINT_NOT_FOUND', 404)
  }
}

export class InvalidRequest extends HttpAwareError {
  constructor(public errors: SanitizerFailure[]) {
    super('Request contains invalid data', 'INVALID_REQUEST', 400)
  }

  toPOJO() {
    return {
      ...super.toPOJO(),
      errors: this.errors,
    }
  }
}
