import {Router} from "express"
import ServiceController from "../controllers/service.controller"
import isAdminMiddleware from "../middlewares/isAdmin.middleware"
import {expressYupMiddleware} from "express-yup-middleware"

import createServiceSchema from "../validations/services/createService.validation"

const serviceRouter = Router()

serviceRouter.post(
  "",
  expressYupMiddleware({schemaValidator: createServiceSchema}),
  isAdminMiddleware,
  ServiceController.create
)
serviceRouter.get("", ServiceController.index)
serviceRouter.get("/:id", ServiceController.show)
serviceRouter.patch("/:id", isAdminMiddleware, ServiceController.update)
serviceRouter.delete("/:id", isAdminMiddleware, ServiceController.delete)

export default serviceRouter
