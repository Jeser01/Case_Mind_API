"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const baseError_1 = require("../base-error/baseError");
class NotFoundError extends baseError_1.BaseError {
    constructor(message, userMessage) {
        super(message, 404, NotFoundError.name, userMessage);
    }
}
exports.NotFoundError = NotFoundError;
