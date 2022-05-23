import HiredServicesControllers from "../controllers/hiredServices.controllers"
import {Router} from "express"
import createHiredServiceSchema from "../validations/hiredServices/createHiredService.validation"
import {expressYupMiddleware} from "express-yup-middleware"
import isAdminMiddleware from "../middlewares/isAdmin.middleware"
import numberIdSchema from "../validations/numberIdValidation"

const hiredService = Router()

hiredService.post(
  "/",
  isAdminMiddleware,
  expressYupMiddleware({schemaValidator: createHiredServiceSchema}),
  HiredServicesControllers.store
)
hiredService.get("/", HiredServicesControllers.index)
hiredService.get(
  "/:id",
  expressYupMiddleware({schemaValidator: numberIdSchema}),
  HiredServicesControllers.show
)
hiredService.patch(
  "/pay/:id",
  expressYupMiddleware({schemaValidator: numberIdSchema}),
  isAdminMiddleware,
  HiredServicesControllers.update
)
hiredService.delete(
  "/:id",
  expressYupMiddleware({schemaValidator: numberIdSchema}),
  isAdminMiddleware,
  HiredServicesControllers.delete
)

export default hiredService
