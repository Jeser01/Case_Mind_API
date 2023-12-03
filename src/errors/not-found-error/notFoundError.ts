import { BaseError } from "../base-error/baseError";

export class NotFoundError extends BaseError {
  constructor(message: string, userMessage?: string) {
    super(message, 404, NotFoundError.name, userMessage);
  }
}
