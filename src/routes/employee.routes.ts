import {Router} from "express"
import employeeControllers from "../controllers/employees.controllers"
import ensureAuth from "../middlewares/ensureAuth.middleware"

import {expressYupMiddleware} from "express-yup-middleware"
import createEmployeeSchema from "../validations/employees/createEmployee.validation"
import updateEmployeeSchema from "../validations/employees/updateEmployee.validation"
import isAdminMiddleware from "../middlewares/isAdmin.middleware"
import idSchema from "../validations/idValidation"

const employeeRouter = Router()

employeeRouter.get("/", ensureAuth, employeeControllers.index)
employeeRouter.get(
  "/:id",
  expressYupMiddleware({schemaValidator: idSchema}),
  ensureAuth,
  employeeControllers.show
)
employeeRouter.post(
  "/",
  expressYupMiddleware({schemaValidator: createEmployeeSchema}),
  employeeControllers.store
)
employeeRouter.patch(
  "/:id",
  expressYupMiddleware({schemaValidator: updateEmployeeSchema}),
  expressYupMiddleware({schemaValidator: idSchema}),
  isAdminMiddleware,
  employeeControllers.update
)
employeeRouter.delete(
  "/:id",
  expressYupMiddleware({schemaValidator: idSchema}),
  ensureAuth,
  isAdminMiddleware,
  employeeControllers.delete
)

export default employeeRouter
