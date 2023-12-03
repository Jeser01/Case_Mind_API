import { Request, Response, NextFunction } from "express";

import { BaseError, NotFoundError } from "../../../errors";

export function errorNotFound(req: Request, res: Response, next: NextFunction) {
  next(
    new NotFoundError(
      `${req.method} ${req.url} not founded `,
      "Endpoint not founded"
    )
  );
}

export function errorBase(
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { message, userMessage, code } = err;

  return res.status(code).json({
    message: userMessage || message,
  });
}
