"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorBase = exports.errorNotFound = void 0;
const errors_1 = require("../../../errors");
function errorNotFound(req, res, next) {
    next(new errors_1.NotFoundError(`${req.method} ${req.url} not founded `, "Endpoint not founded"));
}
exports.errorNotFound = errorNotFound;
function errorBase(err, req, res, next) {
    const { message, userMessage, code } = err;
    return res.status(code).json({
        message: userMessage || message,
    });
}
exports.errorBase = errorBase;
