"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiKeyAuth = void 0;
const configs_1 = __importDefault(require("../../../configs"));
const errors_1 = require("../../../errors");
const apiKeyAuth = function (req, res, next) {
    const apiKey = req.headers["api-key"];
    const { key } = configs_1.default.server;
    if (key === undefined || apiKey === key)
        return next();
    next(new errors_1.AuthError(`User trying to use the Api Key: ${apiKey}`, "Invalid Api Key"));
};
exports.apiKeyAuth = apiKeyAuth;
