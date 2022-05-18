import Router from "express"

import ensureAuth from "../middlewares/ensureAuth.middleware"

import serviceRouter from "./service.routes"
import employeeRouter from "./employee.routes"
import sessionRouter from "./session.routes"

const routes = Router()

routes.use("/service", ensureAuth, serviceRouter)
routes.use("/employees", employeeRouter)
routes.use("/sessions", ensureAuth, sessionRouter)

export default routes
