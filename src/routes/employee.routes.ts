import { Router } from "express"
import employeeControllers from "../controllers/employees/employees.controllers"

const employeeRouter = Router()

employeeRouter.get("/", employeeControllers.index)
employeeRouter.get("/:id", employeeControllers.show)
employeeRouter.post("/", employeeControllers.store)
employeeRouter.patch("/:id", employeeControllers.update)
employeeRouter.delete("/:id", employeeControllers.delete)

export default employeeRouter
