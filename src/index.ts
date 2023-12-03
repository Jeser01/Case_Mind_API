import { app } from "./app"
import configs from "./configs"
import * as models from "./models"

async function startModels(): Promise<void> {
    return new Promise((resolve, reject) => {
        models
            .start()
            .then(() => {
                console.log("Models started successfully")
                resolve()
            })
            .catch(reject)
    })
}

async function startAPIServer(): Promise<void> {
    const { environment, server } = configs
    return new Promise((resolve, reject) => {
        try {
            app.listen(server.port, function () {
                console.log(`Listening on port ${server.port} in mode ${environment}`)
                console.log("API Server started successfully")
                resolve()
            })
        } catch (err) {
            reject(err)
        }
    })
}

(function initService() {
    startAPIServer()
        .then(() => startModels())
        .then(() => console.log("Server started sucessfully"))
        .catch(() => console.log("Could not possible start server."))

        .catch(console.error)
})()
