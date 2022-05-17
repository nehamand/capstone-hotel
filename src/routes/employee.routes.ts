import { Router } from "express"
import employeeControllers from "../controllers/employees/employees.controllers"

const employeeRouter = Router()

employeeRouter.post("/", employeeControllers.store)
employeeRouter.get("/", employeeControllers.index)
employeeRouter.get("/:id", employeeControllers.show)

export default employeeRouter
