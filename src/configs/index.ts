import * as fs from "fs"
import * as dotEnv from "dotenv"

import { IConfigOptions } from "configs"

const path = `${__dirname}/../.env`

if (fs.existsSync(path))
    dotEnv.config({
        path,
    })

const configs: IConfigOptions = {
    environment: process.env.NODE_ENV || "development",
    database: {
        HOST: process.env.HOST,
        USER: process.env.USER,
        PORT: process.env.PORT,
        PASSWORD: process.env.PASSWORD,
        DATABASE: process.env.DATABASE,
    },
    server: {
        port: process.env.SERVER_PORT || "3030",
        key:
            process.env.SERVER_KEY || "",
    },
}

export default configs
