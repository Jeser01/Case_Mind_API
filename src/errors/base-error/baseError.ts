export class BaseError implements Error {
  public message: string;
  public userMessage?: string;
  public code: number;
  public name: string;

  constructor(
    message: string,
    code: number,
    name: string,
    userMessage?: string
  ) {
    this.message = message;
    this.code = code;
    this.name = name;
    this.userMessage = userMessage;
  }
}
