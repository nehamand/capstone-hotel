import { Router } from "express"
import employeeControllers from "../controllers/employees/employees.controllers"
import ensureAuth from "../middlewares/ensureAuth.middleware"

const employeeRouter = Router()

employeeRouter.get("/", ensureAuth, employeeControllers.index)
employeeRouter.get("/:id", ensureAuth, employeeControllers.show)
employeeRouter.post("/", employeeControllers.store)
employeeRouter.patch("/:id", ensureAuth, employeeControllers.update)
employeeRouter.delete("/:id", ensureAuth, employeeControllers.delete)

export default employeeRouter
