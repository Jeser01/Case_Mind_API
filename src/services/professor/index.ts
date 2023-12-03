import { createProfessorUser, loginProfessorByCredentials, putProfessorById, deleteProfessorById } from "../../models/professor"
import { IProfessorAttributes, IProfessorLoginCredentials } from "../../@types/Professor"

export async function insert(professor: IProfessorAttributes) {
    const operation = await createProfessorUser(professor);

    return { response: operation, code: 200 }
    // tracer.info("insert(professor)")
    // tracer.info("$professor", professor)
    // try {
    //     const obj = new Professor(professor)
    //     await obj.save()
    //     return { code: 201, response: obj }
    // } catch (error) {
    //     return {
    //         code: 500, response: {
    //             type: "Intern",
    //             message: "Houve um problema ao buscar os usuarios no banco de dados, tente novamente. Se o erro persistir contate um desenvolvedor!"
    //         }
    //     }
    // }
}

// export async function getAll() {
//     tracer.info("getAll()")
//     try {
//         const Users = await Professor.findAll()
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

export async function loginByCredentials(credentials: IProfessorLoginCredentials) {
    const operation = await loginProfessorByCredentials(credentials);

    return { response: operation, code: 200 }
    // tracer.info("getById(id)")
    // tracer.info("$id", id)
    // try {
    //     const User = await Professor.findOne({
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
}

export async function put(id: string, body: IProfessorAttributes) {
    const operation = await putProfessorById(id, body);

    return { response: operation, code: 200 }
    // tracer.info("put(id, body)")
    // tracer.info("$id", id)
    // tracer.info("$body", body)
    // try {
    //     const User = await Professor.update(body, {
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
}

export async function destroy(id: string) {
    const operation = await deleteProfessorById(id);

    return { response: operation, code: 200 }
    // tracer.info("destroy(id)")
    // tracer.info("$id", id)
    // try {
    //     const User = await Professor.findOne({
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
}