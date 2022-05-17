import Router from "express"
import employeeControllers from "../controllers/employees/employees.controllers"

const routes = Router()

routes.post("/", employeeControllers.store)

export default routes
