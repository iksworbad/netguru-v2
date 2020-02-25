export class UnknownEndpointError extends Error {
  public constructor(method: string, path: string) {
    super(`Cannot ${method.toUpperCase()} ${path}`);
    Object.setPrototypeOf(this, UnknownEndpointError.prototype);
  }
}
