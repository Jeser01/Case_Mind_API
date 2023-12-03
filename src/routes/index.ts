import { Router } from "express"
import { cursos } from "./cursos"
import { professor } from "./professor"
import { errorNotFound, errorBase, apiKeyAuth } from "./middlewares"

export const routes = Router()

routes.use("/cursos", apiKeyAuth, cursos)
routes.use("/professor", apiKeyAuth, professor)

routes.use(errorNotFound)
routes.use(errorBase)
