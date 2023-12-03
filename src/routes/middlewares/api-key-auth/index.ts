import { Request, Response, NextFunction } from "express"

import configs from "../../../configs"
import { AuthError } from "../../../errors"

export const apiKeyAuth = function (
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.log("req.headers: ", req.headers)
    console.log("configs.server: ", configs.server)
    const apiKey = req.headers["api-key"]
    const { key } = configs.server

    if (key === undefined || apiKey === key) return next()

    next(
        new AuthError(
            `User trying to use the Api Key: ${apiKey}`,
            "Invalid Api Key"
        )
    )
}
