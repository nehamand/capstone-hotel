import Router from "express"

import ensureAuth from "../middlewares/ensureAuth.middleware"

import serviceRouter from "./service.routes"
import employeeRouter from "./employee.routes"
import sessionRouter from "./session.routes"
import bedroomRouter from "./bedroom.routes"
import hiredService from "./hiredService.routes"
import clientRouter from "./client.routes"

const routes = Router()

routes.use("/services", ensureAuth, serviceRouter)
routes.use("/employees", ensureAuth, employeeRouter)
routes.use("/sessions", sessionRouter)
routes.use("/bedrooms", ensureAuth, bedroomRouter)
routes.use("/hiredservices", ensureAuth, hiredService)
routes.use("/clients", ensureAuth, clientRouter)

export default routes
