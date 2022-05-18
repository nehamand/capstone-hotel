import "express-async-errors"
import "reflect-metadata"

import clientRouter from "./routes/client.routes"
import errorHandling from "./middlewares/errorHandling.middleware"
import express from "express"
import hiredService from "./routes/hiredService.routes"
import serviceRouter from "./routes/service.routes"

const app = express()

app.use(express.json())

app.use("/service", serviceRouter)
app.use("/clients", clientRouter)
app.use("/hiredServices", hiredService)

app.use(errorHandling)

export default app
