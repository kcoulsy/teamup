import { NextFunction, Request, Response } from 'express';
import { GenericError } from '../utils/error';

export const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `${new Date()} - ${req.method} ${req.originalUrl} - ${err.message}`
    );
  }

  if (err instanceof GenericError) {
    return res.status(err.getCode()).send({
      error: err.name,
      ...(err.message && { message: err.message }),
    });
  }

  return res.status(500).send({
    error: err.name,
    ...(err.message && { message: err.message }),
  });
};

export default handleErrors;
