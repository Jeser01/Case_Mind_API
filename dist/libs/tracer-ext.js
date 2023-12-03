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
exports.tracer = exports.setConfigs = void 0;
const fs_1 = __importDefault(require("fs"));
const moment_1 = __importDefault(require("moment"));
const tracer_1 = __importDefault(require("tracer"));
const rotFileStream = __importStar(require("rotating-file-stream"));
//export { TracerLevels };
let _stream;
let _configs = {
    path: "",
    size: "",
    levels: [],
};
function _generatorFileName() {
    return `Trace_${(0, moment_1.default)(new Date()).format("YYYYMMDD_HHmmssSSS")}.log`;
}
function _writeLine(message) {
    if (message === "")
        return;
    try {
        if (_stream)
            _stream.write(message);
    }
    catch (err) {
        console.error(err);
    }
}
function setConfigs(values) {
    _configs = Object.assign(Object.assign({}, _configs), values);
    const { path, levels, size, interval, compress } = _configs;
    if (!path)
        throw new Error("path can't be empty");
    if (!fs_1.default.existsSync(path))
        fs_1.default.mkdirSync(path, { recursive: true });
    if (levels.length > 0)
        _stream = rotFileStream.createStream(_generatorFileName, {
            path,
            size,
            interval,
            compress,
        });
}
exports.setConfigs = setConfigs;
exports.tracer = tracer_1.default.console({
    dateformat: "yyyy-mm-dd'T'HH:MM:ss.l",
    preprocess: function (data) {
        data.title = data.title.toUpperCase();
    },
    transport: function (data) {
        const { levels } = _configs;
        const { title } = data;
        if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV)
            console.log(data.message);
        if (title === "log" || levels.includes(title.toUpperCase())) {
            _writeLine(`${data.rawoutput}\n`);
        }
    },
});
