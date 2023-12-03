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
exports.HelloWorld = exports.start = void 0;
const sequelize_1 = __importDefault(require("sequelize"));
const configs_1 = __importDefault(require("../configs"));
const helloWorld = __importStar(require("./HelloWorld"));
const tracer_ext_1 = require("../libs/tracer-ext");
function start() {
    tracer_ext_1.tracer.info("start()");
    return new Promise((resolve, reject) => {
        const { uri } = configs_1.default.database;
        tracer_ext_1.tracer.debug("Connecting to postgreSQL uri:", uri);
        if (!uri)
            return reject("No postgreSQL Uri to connect");
        const connection = new sequelize_1.default.Sequelize(uri, {
            logging: tracer_ext_1.tracer.info,
        });
        helloWorld
            .start(connection, "HelloWorld")
            .then(() => {
            /*
                    In this section we do the association of the classes
                */
            return connection.sync();
        })
            .then(() => resolve())
            .catch(reject);
    });
}
exports.start = start;
exports.HelloWorld = helloWorld.HelloWorld;
