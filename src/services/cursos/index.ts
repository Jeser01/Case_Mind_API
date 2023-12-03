import { createCourse, getCoursesByProfessorId, putCourseByProfessorId, deleteCourseByProfessorId } from "../../models/cursos"
import { ICursosAttributes } from "../../@types/Cursos"

export async function insert(curso: ICursosAttributes) {
    const operation = await createCourse(curso);

    if (operation?.Data) {
        return Promise.resolve(operation.Data)
    } else {
        return Promise.resolve({ response: operation.Error, code: operation.Error.code })
    }
}

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

export async function getAllCoursesByProfessorId(id: string) {
    const operation = await getCoursesByProfessorId(id);

    return { response: operation, code: 200 }
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
}

export async function put(id: string, body: ICursosAttributes) {
    const operation = await putCourseByProfessorId(id, body);

    return { response: operation, code: 200 }
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
}

export async function destroy(id: string) {
    const operation = await deleteCourseByProfessorId(id);

    return { response: operation, code: 200 }
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
}