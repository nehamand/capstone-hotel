import "express-async-errors"
import express from "express"
import "reflect-metadata"
import routes from "./routes"
import errorHandling from "./middlewares/errorHandling.middleware"

const app = express()

app.use(express.json())
app.use(errorHandling)

app.use(routes)

export default app
