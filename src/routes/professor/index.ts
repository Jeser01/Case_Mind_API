import { Request, Response, NextFunction } from "express"

import { Router } from "express"

import { tracer } from "../../libs/tracer-ext"
import * as services from "../../services/professor"

import { InternalServerError, BadRequest, NotFoundError } from "../../errors"

export const professor = Router()

//#region POST a any endpoint of service
professor.post(
    "/",
    async function (req: Request, res: Response, next: NextFunction) {
        try {
            const { nome, dataNascimento, CPF, email, senha, imagem } = req.body

            if (nome === undefined || dataNascimento === undefined || CPF === undefined || email === undefined || senha === undefined || imagem === undefined)
                return next(new BadRequest("All parameters should be filled"))

            const { response, code } = await services.insert({
                nome,
                dataNascimento,
                CPF,
                email,
                senha,
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
professor.post(
    "/login",
    async function (req: Request, res: Response, next: NextFunction) {
        const { email, senha } = req.body
        if (!email || !senha)
            return next(new BadRequest("All parameters should be filled"))

        try {
            const response = await services.loginByCredentials(req.body)
            return res.json(response).sendStatus(200)

        } catch (err) {
            tracer.error(err)
            return next(new InternalServerError((err as Error).message))
        }
    }
)
// professor.get(
//     "/:id",
//     async function (req: Request, res: Response, next: NextFunction) {
//         const { id } = req.params
//         try {
//             const { response, code } = await services.(id)
//             if (code == 404) {
//                 return next(new NotFoundError("The user doesn't exist."))
//             }
//             if (code == 500) {
//                 return next(new BadRequest("The user doesn't exist."))
//             }
//             return res.status(code).json(response)

//         } catch (err) {
//             tracer.error(err)
//             return next(new InternalServerError((err as Error).message))
//         }
//     }
// )
professor.put(
    "/:id",
    async function (req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const { nome, dataNascimento, CPF, email, senha, imagem } = req.body

        if (nome === undefined || dataNascimento === undefined || CPF === undefined || email === undefined || senha === undefined || imagem === undefined)
            return next(new BadRequest("All parameters should be filled"))

        try {
            const { response, code } = await services.put(id, {
                nome,
                dataNascimento,
                CPF,
                email,
                senha,
                imagem,
                Timestamp: new Date(),
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

professor.delete(
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
