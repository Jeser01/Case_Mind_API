import { BaseError } from "../base-error/baseError";

export class InternalServerError extends BaseError {
  constructor(message: string, userMessage?: string) {
    super(message, 500, InternalServerError.name, userMessage);
  }
}
