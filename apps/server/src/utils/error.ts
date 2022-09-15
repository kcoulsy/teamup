export class GenericError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name.replace('Error', '');
    this.message = message || '';
  }

  getCode(): number {
    if (this instanceof NotFoundError) {
      return 404;
    }

    if (this instanceof BadRequestError) {
      return 400;
    }

    if (this instanceof UnauthorizedError) {
      return 401;
    }

    if (this instanceof ForbiddenError) {
      return 403;
    }

    return 500;
  }
}

export class BadRequestError extends GenericError {}

export class NotFoundError extends GenericError {}

export class UnauthorizedError extends GenericError {}

export class ForbiddenError extends GenericError {}
