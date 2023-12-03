"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const baseError_1 = require("../base-error/baseError");
class BadRequest extends baseError_1.BaseError {
    constructor(message, userMessage) {
        super(message, 400, BadRequest.name, userMessage);
    }
}
exports.BadRequest = BadRequest;
