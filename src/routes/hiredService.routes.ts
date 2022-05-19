import HiredServicesControllers from "../controllers/hiredServices.controllers"
import {Router} from "express"

import {expressYupMiddleware} from "express-yup-middleware"

import createHiredServiceSchema from "../validations/hiredServices/createHiredService.validation"

const hiredService = Router()

hiredService.post(
  "/",
  expressYupMiddleware({schemaValidator: createHiredServiceSchema}),
  HiredServicesControllers.store
)
hiredService.get("/", HiredServicesControllers.index)
hiredService.get("/:id", HiredServicesControllers.show)
//hiredService.patch('/:id', HiredServicesControllers.update)
hiredService.delete("/:id", HiredServicesControllers.delete)

export default hiredService
