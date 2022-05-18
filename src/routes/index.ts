import Router from "express"

import ensureAuth from "../middlewares/ensureAuth.middleware"

import serviceRouter from "./service.routes"
import employeeRouter from "./employee.routes"
import sessionRouter from "./session.routes"
import bedroomRouter from "./bedroom.routes"

const routes = Router()

routes.use("/service", ensureAuth, serviceRouter)
routes.use("/employees", employeeRouter)
routes.use("/sessions", sessionRouter)
routes.use("/bedrooms", ensureAuth, bedroomRouter)

export default routes
