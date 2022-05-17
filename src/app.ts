import "express-async-errors"
import express from "express"
import "reflect-metadata"
import errorHandling from "./middlewares/errorHandling.middleware"
import serviceRouter from "./routes/service.routes"
import clientRouter from "./routes/client.routes"

const app = express()

app.use(express.json())

app.use("/service", serviceRouter)
app.use("/clients", clientRouter)
app.use(errorHandling)

export default app
