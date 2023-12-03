"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseByProfessorId = exports.putCourseByProfessorId = exports.getCoursesByProfessorId = exports.createCourse = void 0;
const pg_1 = require("pg");
const configs_1 = __importDefault(require("../../configs"));
function createCourse(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nome, professor, descricao, categoria, imagem } = data;
        const client = yield OpenConnection();
        if (!nome || !professor || !descricao || !categoria) {
            console.log("Os parametros precisam ser preenchidos.");
        }
        if (imagem) {
            // Checar base64
        }
        const consultaSQL = `INSERT INTO Cursos (nome, professor, descricao, categoria, imagem)
    VALUES (${nome}, ${professor}, ${descricao}, ${categoria}, ${imagem})
    RETURNING *;`;
        const result = yield client.query(consultaSQL);
        console.log('Resultados da consulta:', result.rows);
        if (client) {
            yield CloseConnection(client);
        }
    });
}
exports.createCourse = createCourse;
function getCoursesByProfessorId(id) {
}
exports.getCoursesByProfessorId = getCoursesByProfessorId;
function putCourseByProfessorId(id, data) {
}
exports.putCourseByProfessorId = putCourseByProfessorId;
function deleteCourseByProfessorId(id) {
}
exports.deleteCourseByProfessorId = deleteCourseByProfessorId;
function OpenConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = new pg_1.Pool({
            user: configs_1.default.database.USER,
            host: configs_1.default.database.HOST,
            database: configs_1.default.database.DATABASE,
            password: configs_1.default.database.PASSWORD,
            // port: parseInt(configs.database.PORT, 10)
            port: configs_1.default.database.PORT
        });
        try {
            const client = yield pool.connect();
            console.log('Connected to the database');
            return client;
        }
        catch (error) {
            console.error('Error connecting to the database:', error);
            throw error;
        }
    });
}
function CloseConnection(client) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.release();
            console.log('Disconnected from the database');
        }
        catch (error) {
            console.error('Error disconnecting from the database:', error);
            throw error;
        }
    });
}
