import {Router} from "express"
import ServiceController from "../controllers/service.controller"
import isAdminMiddleware from "../middlewares/isAdmin.middleware"

const serviceRouter = Router()

serviceRouter.post("", isAdminMiddleware, ServiceController.create)
serviceRouter.get("", ServiceController.index)
serviceRouter.get("/:id", ServiceController.show)
serviceRouter.patch("/:id", isAdminMiddleware, ServiceController.update)
serviceRouter.delete("/:id", isAdminMiddleware, ServiceController.delete)

export default serviceRouter
