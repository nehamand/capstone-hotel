import {Router} from "express"
import ServiceController from "../controllers/service.controller"
import isAdminMiddleware from "../middlewares/isAdmin.middleware"
import {expressYupMiddleware} from "express-yup-middleware"

import createServiceSchema from "../validations/services/createService.validation"
import updateServiceSchema from "../validations/services/updateService.validation"

import numberIdSchema from "../validations/numberIdValidation"

const serviceRouter = Router()

serviceRouter.post(
  "",
  expressYupMiddleware({schemaValidator: createServiceSchema}),
  isAdminMiddleware,
  ServiceController.create
)
serviceRouter.get("", ServiceController.index)
serviceRouter.get(
  "/:id",
  expressYupMiddleware({schemaValidator: numberIdSchema}),
  ServiceController.show
)
serviceRouter.patch(
  "/:id",
  expressYupMiddleware({schemaValidator: updateServiceSchema}),
  expressYupMiddleware({schemaValidator: numberIdSchema}),
  isAdminMiddleware,
  ServiceController.update
)
serviceRouter.delete(
  "/:id",
  expressYupMiddleware({schemaValidator: numberIdSchema}),
  isAdminMiddleware,
  ServiceController.delete
)

export default serviceRouter
