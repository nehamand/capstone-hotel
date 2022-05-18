import Router from "express"

import ensureAuth from "../middlewares/ensureAuth.middleware"

import serviceRouter from "./service.routes"
import employeeRouter from "./employee.routes"
import sessionRouter from "./session.routes"
import isAdminMiddleware from "../middlewares/isAdmin.middleware"

const routes = Router()

routes.use("/services", ensureAuth, isAdminMiddleware, serviceRouter)
routes.use("/employees", employeeRouter)
routes.use("/sessions", sessionRouter)

export default routes
