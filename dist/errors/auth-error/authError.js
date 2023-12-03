"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthError = void 0;
const baseError_1 = require("../base-error/baseError");
class AuthError extends baseError_1.BaseError {
    constructor(message, userMessage) {
        super(message, 401, AuthError.name, userMessage);
    }
}
exports.AuthError = AuthError;
