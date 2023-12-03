import { Request, Response, NextFunction } from "express"

import { Router } from "express"

import { tracer } from "../../libs/tracer-ext"
import * as services from "../../services/cursos"

import { InternalServerError, BadRequest, NotFoundError } from "../../errors"

export const cursos = Router()

//#region POST a any endpoint of service
cursos.post(
    "/",
    async function (req: Request, res: Response, next: NextFunction) {
        try {
            const { nome, professor, descricao, categoria, imagem } = req.body

            if (nome === undefined || professor === undefined || descricao === undefined || categoria === undefined || imagem === undefined)
                return next(new BadRequest("All parameters should be filled"))

            const { response, code } = await services.insert({
                nome,
                professor,
                descricao,
                categoria,
                imagem,
                Timestamp: new Date(),
            })
            return res.status(code).json(response)
        } catch (err) {
            tracer.error(err)
            return next(new InternalServerError((err as Error).message))
        }
    }
)
// cursos.get(
//     "/",
//     async function (req: Request, res: Response, next: NextFunction) {
//         try {
//             const response = await services.getAll()
//             return res.json(response).sendStatus(200)

//         } catch (err) {
//             tracer.error(err)
//             return next(new InternalServerError((err as Error).message))
//         }
//     }
// )
cursos.get(
    "/:id",
    async function (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        try {
            const { response, code } = await services.getAllCoursesByProfessorId(id)
            if (code == 404) {
                return next(new NotFoundError("The course doesn't exist."))
            }
            if (code == 500) {
                return next(new BadRequest("The course doesn't exist."))
            }
            return res.status(code).json(response)

        } catch (err) {
            tracer.error(err)
            return next(new InternalServerError((err as Error).message))
        }
    }
)
cursos.put(
    "/:id",
    async function (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const { nome, professor, descricao, categoria, imagem } = req.body

        if (nome === undefined || professor === undefined || descricao === undefined || categoria === undefined || imagem === undefined)
            return next(new BadRequest("All parameters should be filled"))
        try {
            const { response, code } = await services.put(id, {
                nome,
                professor,
                descricao,
                categoria,
                imagem
            })
            if (code == 500) {
                return next(new BadRequest("The user doesn't exist."))
            }
            return res.status(code).json(response)

        } catch (err) {
            tracer.error(err)
            return next(new InternalServerError((err as Error).message))
        }
    }
)

cursos.delete(
    "/:id",
    async function (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params

        if (id === undefined)
            return next(new BadRequest("The 'id' parameter should be filled"))
        try {
            const { response, code } = await services.destroy(id)
            if (code == 500) {
                return next(new BadRequest("The user doesn't exist."))
            }
            return res.status(code).json(response)

        } catch (err) {
            tracer.error(err)
            return next(new InternalServerError((err as Error).message))
        }
    }
)
//#endregion
