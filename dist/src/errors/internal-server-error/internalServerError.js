"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = void 0;
const baseError_1 = require("../base-error/baseError");
class InternalServerError extends baseError_1.BaseError {
    constructor(message, userMessage) {
        super(message, 500, InternalServerError.name, userMessage);
    }
}
exports.InternalServerError = InternalServerError;
