"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const tracer_1 = __importDefault(require("tracer"));
const rotFileStream = __importStar(require("rotating-file-stream"));
function generatorFileName() {
    return `Audit_${(0, moment_1.default)(new Date()).format("YYYYMMDD_HHmmssSSS")}.log`;
}
function auditlog({ path, methods, interval, size, compress, ipAddress, actor, }) {
    let tmpStream;
    if (methods) {
        if (!path)
            throw new Error("path can't be empty");
        if (!fs_1.default.existsSync(path))
            fs_1.default.mkdirSync(path, { recursive: true });
        tmpStream = rotFileStream.createStream(generatorFileName, {
            path,
            interval,
            size,
            compress,
        });
    }
    const tracer = tracer_1.default.console({
        format: "[{{timestamp}}] - {{message}}",
        dateformat: "yyyy-mm-dd'T'HH:MM:ss.l",
        transport: function (data) {
            const { rawoutput } = data;
            try {
                if (tmpStream)
                    tmpStream.write(`${rawoutput}\n`);
            }
            catch (err) {
                console.error(err);
            }
        },
    });
    return function (req, res, next) {
        const { headers, url, method, body, params, query } = req;
        res.on("finish", function () {
            const { statusCode } = res;
            const row = {
                method,
                url,
                statusCode,
                params,
                query,
                headers,
                body,
                ip: ipAddress ? ipAddress(req) : "unknown",
                actor: actor ? actor(req) : "unknown",
            };
            if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV)
                console.log(row);
            if (tracer && (methods === null || methods === void 0 ? void 0 : methods.includes(method))) {
                tracer.log(JSON.stringify(row));
            }
        });
        return next();
    };
}
exports.default = auditlog;
