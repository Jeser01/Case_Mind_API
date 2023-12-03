import cors from "cors"
import helmet from "helmet"
import express, { json } from "express"
import { routes } from "./routes"

export const app = express()

app.use(helmet())
app.use(cors())
app.use(json())

app.use(routes)
