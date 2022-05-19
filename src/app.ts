import "express-async-errors"
import "reflect-metadata"

import errorHandling from "./middlewares/errorHandling.middleware"
import express from "express"
import routes from "./routes"

const app = express()

app.use(express.json())

app.use(routes)

app.use(errorHandling)

export default app
