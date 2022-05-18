import Router from "express"

import ensureAuth from "../middlewares/ensureAuth.middleware"

import serviceRouter from "./service.routes"
import employeeRouter from "./employee.routes"
import sessionRouter from "./session.routes"
import bedroomRouter from "./bedroom.routes"
import isAdminMiddleware from "../middlewares/isAdmin.middleware"
import hiredService from "./hiredService.routes"
import clientRouter from "./client.routes"

const routes = Router()

routes.use("/services", ensureAuth, isAdminMiddleware, serviceRouter)
routes.use("/employees", employeeRouter)
routes.use("/sessions", sessionRouter)
routes.use("/bedrooms", ensureAuth, bedroomRouter)
routes.use("/hiredservices", hiredService)
routes.use("/clients", clientRouter)

export default routes
