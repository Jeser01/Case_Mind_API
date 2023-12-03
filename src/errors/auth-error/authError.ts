import { BaseError } from "../base-error/baseError";

export class AuthError extends BaseError {
  constructor(message: string, userMessage?: string) {
    super(message, 401, AuthError.name, userMessage);
  }
}
