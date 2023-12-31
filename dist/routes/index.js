"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const cursos_1 = require("./cursos");
const professor_1 = require("./professor");
const middlewares_1 = require("./middlewares");
exports.routes = (0, express_1.Router)();
exports.routes.use("/cursos", middlewares_1.apiKeyAuth, cursos_1.cursos);
exports.routes.use("/professor", middlewares_1.apiKeyAuth, professor_1.professor);
exports.routes.use(middlewares_1.errorNotFound);
exports.routes.use(middlewares_1.errorBase);
