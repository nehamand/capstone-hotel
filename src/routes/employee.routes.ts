import {Router} from "express"
import employeeControllers from "../controllers/employees.controllers"
import ensureAuth from "../middlewares/ensureAuth.middleware"

import {expressYupMiddleware} from "express-yup-middleware"
import createEmployeeSchema from "../validations/employees/createEmployee.validation"

const employeeRouter = Router()

employeeRouter.get("/", ensureAuth, employeeControllers.index)
employeeRouter.get("/:id", ensureAuth, employeeControllers.show)
employeeRouter.post(
  "/",
  expressYupMiddleware({schemaValidator: createEmployeeSchema}),
  employeeControllers.store
)
employeeRouter.patch("/:id", ensureAuth, employeeControllers.update)
employeeRouter.delete("/:id", ensureAuth, employeeControllers.delete)

export default employeeRouter
