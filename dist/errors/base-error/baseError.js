"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
class BaseError {
    constructor(message, code, name, userMessage) {
        this.message = message;
        this.code = code;
        this.name = name;
        this.userMessage = userMessage;
    }
}
exports.BaseError = BaseError;
