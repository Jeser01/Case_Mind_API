import { BaseError } from "../base-error/baseError";

export class BadRequest extends BaseError {
  constructor(message: string, userMessage?: string) {
    super(message, 400, BadRequest.name, userMessage);
  }
}
