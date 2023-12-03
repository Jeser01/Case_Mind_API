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
exports.destroy = exports.put = exports.getAllCoursesByProfessorId = exports.insert = void 0;
const cursos_1 = require("../../models/cursos");
function insert(curso) {
    return __awaiter(this, void 0, void 0, function* () {
        const operation = yield (0, cursos_1.createCourse)(curso);
        if (operation === null || operation === void 0 ? void 0 : operation.Data) {
            return Promise.resolve(operation.Data);
        }
        else {
            return Promise.resolve({ response: operation.Error, code: operation.Error.code });
        }
    });
}
exports.insert = insert;
// export async function getAllCoursesByProfessorId() {
//     tracer.info("getAll()")
//     try {
//         const Users = await Cursos.findAll()
//         return { code: 200, response: Users }
//     } catch (error) {
//         return {
//             code: 500, response: {
//                 type: "Intern",
//                 message: "Houve um problema ao buscar os usuarios no banco de dados, tente novamente. Se o erro persistir contate um desenvolvedor!"
//             }
//         }
//     }
// }
function getAllCoursesByProfessorId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const operation = yield (0, cursos_1.getCoursesByProfessorId)(id);
        return { response: operation, code: 200 };
        // tracer.info("getById(id)")
        // tracer.info("$id", id)
        // try {
        //     const User = await Cursos.findOne({
        //         where: {
        //             id: id
        //         }
        //     })
        //     if (User == null) {
        //         return { code: 404, response: "Usuario Não existe" }
        //     }
        //     return { code: 200, response: User.dataValues }
        // } catch (error) {
        //     return {
        //         code: 500, response: {
        //             type: "Intern",
        //             message: "Houve um problema ao buscar os usuarios no banco de dados, tente novamente. Se o erro persistir contate um desenvolvedor!"
        //         }
        //     }
        // }
    });
}
exports.getAllCoursesByProfessorId = getAllCoursesByProfessorId;
function put(id, body) {
    return __awaiter(this, void 0, void 0, function* () {
        const operation = yield (0, cursos_1.putCourseByProfessorId)(id, body);
        return { response: operation, code: 200 };
        // tracer.info("put(id, body)")
        // tracer.info("$id", id)
        // tracer.info("$body", body)
        // try {
        //     const User = await Cursos.update(body, {
        //         where: {
        //             id: id
        //         }
        //     })
        //     if (User == null || User[0] == 0) {
        //         return {
        //             code: 404, response: {
        //                 type: "Invalid",
        //                 message: "Usuario Não existe"
        //             }
        //         }
        //     }
        //     return { code: 200, response: body }
        // } catch (error) {
        //     return {
        //         code: 500, response: {
        //             type: "Intern",
        //             message: "Houve um problema ao buscar os usuarios no banco de dados, tente novamente. Se o erro persistir contate um desenvolvedor!"
        //         }
        //     }
        // }
    });
}
exports.put = put;
function destroy(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const operation = yield (0, cursos_1.deleteCourseByProfessorId)(id);
        return { response: operation, code: 200 };
        // tracer.info("destroy(id)")
        // tracer.info("$id", id)
        // try {
        //     const User = await Cursos.findOne({
        //         where: {
        //             id: id
        //         }
        //     })
        //     if (User == null) {
        //         return {
        //             code: 404, response: {
        //                 type: "Invalid",
        //                 message: "Usuario Não existe"
        //             }
        //         }
        //     }
        //     await User.destroy()
        //     return { code: 200, response: "Usuario Deletado :)" }
        // } catch (error) {
        //     return {
        //         code: 500, response: {
        //             type: "Intern",
        //             message: "Houve um problema ao buscar os usuarios no banco de dados, tente novamente. Se o erro persistir contate um desenvolvedor!"
        //         }
        //     }
        // }
    });
}
exports.destroy = destroy;
