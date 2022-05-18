import Router from "express"
import serviceRouter from "./service.routes"
import employeeRouter from "./employee.routes"

const routes = Router()

routes.use("/service", serviceRouter)
routes.use("/employees", employeeRouter)

export default routes
