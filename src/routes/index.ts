import Router from "express"
import sessionRouter from "./session.routes"

const routes = Router()

routes.use("/sessions", sessionRouter)

export default routes
