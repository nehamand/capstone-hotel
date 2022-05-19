import Router from "express"

import ensureAuth from "../middlewares/ensureAuth.middleware"

import serviceRouter from "./service.routes"
import employeeRouter from "./employee.routes"
import sessionRouter from "./session.routes"
<<<<<<< HEAD
=======
import bedroomRouter from "./bedroom.routes"
import hiredService from "./hiredService.routes"
import clientRouter from "./client.routes"
>>>>>>> 25786ac771ad1606c1ee8e9059376c2176120ce9

const routes = Router()

routes.use("/services", ensureAuth, serviceRouter)
routes.use("/employees", employeeRouter)
<<<<<<< HEAD
routes.use("/sessions", ensureAuth, sessionRouter)
=======
routes.use("/sessions", sessionRouter)
routes.use("/bedrooms", ensureAuth, bedroomRouter)
routes.use("/hiredservices", ensureAuth, hiredService)
routes.use("/clients", ensureAuth, clientRouter)
>>>>>>> 25786ac771ad1606c1ee8e9059376c2176120ce9

export default routes
