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
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.put = exports.getById = exports.getAll = exports.insert = void 0;
const models_1 = require("../../models");
const tracer_ext_1 = require("../../libs/tracer-ext");
function insert(helloWorld) {
    return __awaiter(this, void 0, void 0, function* () {
        tracer_ext_1.tracer.info("insert(helloWorld)");
        tracer_ext_1.tracer.info("$helloWorld", helloWorld);
        try {
            const obj = new models_1.HelloWorld(helloWorld);
            yield obj.save();
            return { code: 201, response: obj };
        }
        catch (error) {
            return { code: 500, response: {
                    type: "Intern",
                    message: "Houve um problema ao buscar os usuarios no banco de dados, tente novamente. Se o erro persistir contate um desenvolvedor!"
                } };
        }
    });
}
exports.insert = insert;
function getAll() {
    return __awaiter(this, void 0, void 0, function* () {
        tracer_ext_1.tracer.info("getAll()");
        try {
            const Users = yield models_1.HelloWorld.findAll();
            return { code: 200, response: Users };
        }
        catch (error) {
            return { code: 500, response: {
                    type: "Intern",
                    message: "Houve um problema ao buscar os usuarios no banco de dados, tente novamente. Se o erro persistir contate um desenvolvedor!"
                } };
        }
    });
}
exports.getAll = getAll;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        tracer_ext_1.tracer.info("getById(id)");
        tracer_ext_1.tracer.info("$id", id);
        try {
            const User = yield models_1.HelloWorld.findOne({
                where: {
                    id: id
                }
            });
            if (User == null) {
                return { code: 404, response: "Usuario Não existe" };
            }
            return { code: 200, response: User.dataValues };
        }
        catch (error) {
            return { code: 500, response: {
                    type: "Intern",
                    message: "Houve um problema ao buscar os usuarios no banco de dados, tente novamente. Se o erro persistir contate um desenvolvedor!"
                } };
        }
    });
}
exports.getById = getById;
function put(id, body) {
    return __awaiter(this, void 0, void 0, function* () {
        tracer_ext_1.tracer.info("put(id, body)");
        tracer_ext_1.tracer.info("$id", id);
        tracer_ext_1.tracer.info("$body", body);
        try {
            const User = yield models_1.HelloWorld.update(body, {
                where: {
                    id: id
                }
            });
            if (User == null || User[0] == 0) {
                return { code: 404, response: {
                        type: "Invalid",
                        message: "Usuario Não existe"
                    } };
            }
            return { code: 200, response: body };
        }
        catch (error) {
            return { code: 500, response: {
                    type: "Intern",
                    message: "Houve um problema ao buscar os usuarios no banco de dados, tente novamente. Se o erro persistir contate um desenvolvedor!"
                } };
        }
    });
}
exports.put = put;
function destroy(id) {
    return __awaiter(this, void 0, void 0, function* () {
        tracer_ext_1.tracer.info("destroy(id)");
        tracer_ext_1.tracer.info("$id", id);
        try {
            const User = yield models_1.HelloWorld.findOne({
                where: {
                    id: id
                }
            });
            if (User == null) {
                return { code: 404, response: {
                        type: "Invalid",
                        message: "Usuario Não existe"
                    } };
            }
            yield User.destroy();
            return { code: 200, response: "Usuario Deletado :)" };
        }
        catch (error) {
            return { code: 500, response: {
                    type: "Intern",
                    message: "Houve um problema ao buscar os usuarios no banco de dados, tente novamente. Se o erro persistir contate um desenvolvedor!"
                } };
        }
    });
}
exports.destroy = destroy;
