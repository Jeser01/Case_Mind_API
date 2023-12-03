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
exports.deleteCourseByProfessorId = exports.getCoursesByProfessorId = exports.createCourse = void 0;
const pg_1 = require("pg");
const configs_1 = __importDefault(require("../configs"));
function createCourse(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nome, professor, descricao, categoria, imagem } = data;
        if (!nome || !professor || !descricao || !categoria) {
            console.log("Os parametros precisam ser preenchidos.");
            return {
                Error: {
                    code: 400,
                    message: "All parameters should be filled!"
                }
            };
        }
        const client = yield OpenConnection();
        const consultaSQL = `INSERT INTO Cursos (nome, professor, descricao, categoria, imagem)
    VALUES (${nome}, ${professor}, ${descricao}, ${categoria}, ${imagem})
    RETURNING *;`;
        const result = yield client.query(consultaSQL);
        if (result === null || result === void 0 ? void 0 : result.rows) {
            if (client) {
                yield CloseConnection(client);
            }
            return {
                Data: result
            };
        }
        if (client) {
            yield CloseConnection(client);
        }
        return {
            Error: {
                code: 404,
                message: "Nenhum Curso Encontrado"
            }
        };
    });
}
exports.createCourse = createCourse;
function getCoursesByProfessorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            console.log("Os parametros precisam ser preenchidos.");
            return {
                Error: {
                    code: 400,
                    message: "The ID parameter should be filled!"
                }
            };
        }
        const client = yield OpenConnection();
        const consultaSQL = `SELECT * FROM Cursos WHERE professor = ${id};`;
        try {
            const result = yield client.query(consultaSQL);
            const cursos = result.rows;
            if (cursos.length > 0) {
                return {
                    Error: {},
                    Data: cursos
                };
            }
            else {
                if (client) {
                    yield CloseConnection(client);
                }
                return {
                    Error: {
                        code: 404,
                        message: "Nenhum Curso Encontrado"
                    }
                };
            }
        }
        catch (error) {
            console.log(`[Cursos-getCoursesByProfessorId]: ${error}`);
            return {
                Error: {
                    code: 500,
                    message: "Houve um problema ao concluir sua operação. Tente mais tarde!"
                },
                Data: {}
            };
        }
    });
}
exports.getCoursesByProfessorId = getCoursesByProfessorId;
function deleteCourseByProfessorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id) {
            console.log("Os parametros precisam ser preenchidos.");
            return {
                Error: {
                    code: 400,
                    message: "The ID parameter should be filled!"
                }
            };
        }
        const client = yield OpenConnection();
        const consultaSQL = `DELETE FROM Cursos WHERE professor = ${id};`;
        try {
            const result = yield client.query(consultaSQL);
            const deletedCurso = result.rows;
            if (deletedCurso.length > 0) {
                return {
                    Data: deletedCurso
                };
            }
            else {
                if (client) {
                    yield CloseConnection(client);
                }
                return {
                    Error: {
                        code: 404,
                        message: "Nenhum Curso Encontrado"
                    }
                };
            }
        }
        catch (error) {
            console.log(`[Cursos-deleteCourseByProfessorId]: ${error}`);
            return {
                Error: {
                    code: 500,
                    message: "Houve um problema ao concluir sua operação. Tente mais tarde!"
                }
            };
        }
    });
}
exports.deleteCourseByProfessorId = deleteCourseByProfessorId;
function OpenConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = new pg_1.Pool({
            user: configs_1.default.database.USER,
            host: configs_1.default.database.HOST,
            database: configs_1.default.database.DATABASE,
            password: configs_1.default.database.PASSWORD,
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
