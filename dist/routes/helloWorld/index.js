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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.helloWorld = void 0;
const express_1 = require("express");
const tracer_ext_1 = require("../../libs/tracer-ext");
const services = __importStar(require("../../services/helloWorld"));
const errors_1 = require("../../errors");
exports.helloWorld = (0, express_1.Router)();
//#region POST a any endpoint of service
exports.helloWorld.post("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, age, street, neighborhood, city, state, postalCode, numberHouse, email, password } = req.body;
            if (name === undefined || age === undefined || street === undefined || neighborhood === undefined || city === undefined || state === undefined ||
                postalCode === undefined || numberHouse === undefined || email === undefined || password === undefined)
                return next(new errors_1.BadRequest("All parameters should be filled"));
            const { response, code } = yield services.insert({
                name,
                age,
                street,
                neighborhood,
                city,
                state,
                postalCode,
                numberHouse,
                email,
                password,
                Timestamp: new Date(),
            });
            return res.status(code).json(response);
        }
        catch (err) {
            tracer_ext_1.tracer.error(err);
            return next(new errors_1.InternalServerError(err.message));
        }
    });
});
exports.helloWorld.get("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield services.getAll();
            return res.json(response).sendStatus(200);
        }
        catch (err) {
            tracer_ext_1.tracer.error(err);
            return next(new errors_1.InternalServerError(err.message));
        }
    });
});
exports.helloWorld.get("/:id", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const { response, code } = yield services.getById(id);
            if (code == 404) {
                return next(new errors_1.NotFoundError("The user doesn't exist."));
            }
            if (code == 500) {
                return next(new errors_1.BadRequest("The user doesn't exist."));
            }
            return res.status(code).json(response);
        }
        catch (err) {
            tracer_ext_1.tracer.error(err);
            return next(new errors_1.InternalServerError(err.message));
        }
    });
});
exports.helloWorld.put("/:id", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const { name, age, street, neighborhood, city, state, postalCode, numberHouse, email, password } = req.body;
        if (name === undefined || age === undefined || street === undefined || neighborhood === undefined || city === undefined || state === undefined ||
            postalCode === undefined || numberHouse === undefined || email === undefined || password === undefined)
            return next(new errors_1.BadRequest("All parameters should be filled"));
        try {
            const { response, code } = yield services.put(id, {
                name,
                age,
                street,
                neighborhood,
                city,
                state,
                postalCode,
                numberHouse,
                email,
                password,
            });
            if (code == 500) {
                return next(new errors_1.BadRequest("The user doesn't exist."));
            }
            return res.status(code).json(response);
        }
        catch (err) {
            tracer_ext_1.tracer.error(err);
            return next(new errors_1.InternalServerError(err.message));
        }
    });
});
exports.helloWorld.delete("/:id", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (id === undefined)
            return next(new errors_1.BadRequest("The 'id' parameter should be filled"));
        try {
            const { response, code } = yield services.destroy(id);
            if (code == 500) {
                return next(new errors_1.BadRequest("The user doesn't exist."));
            }
            return res.status(code).json(response);
        }
        catch (err) {
            tracer_ext_1.tracer.error(err);
            return next(new errors_1.InternalServerError(err.message));
        }
    });
});
//#endregion
