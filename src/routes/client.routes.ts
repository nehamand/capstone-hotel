import {Router} from "express"
import ClientsController from "../controllers/clients.controllers"
import {expressYupMiddleware} from "express-yup-middleware"
import createClientSchema from "../validations/clients/createClient.validation"
import updateClientSchema from "../validations/clients/updateClient.validation"
import idSchema from "../validations/idValidation"

const clientRouter = Router()

clientRouter.post(
  "/",
  expressYupMiddleware({schemaValidator: createClientSchema}),
  ClientsController.store
)
clientRouter.get("/", ClientsController.show)
clientRouter.get(
  "/:id",
  expressYupMiddleware({schemaValidator: idSchema}),
  ClientsController.index
)
clientRouter.patch(
  "/:id",
  expressYupMiddleware({schemaValidator: idSchema}),
  expressYupMiddleware({schemaValidator: updateClientSchema}),
  ClientsController.update
)
clientRouter.patch(
  "/joinbedroom/:id",
  expressYupMiddleware({schemaValidator: idSchema}),
  ClientsController.joinBedroom
)
clientRouter.delete(
  "/:id",
  expressYupMiddleware({schemaValidator: idSchema}),
  ClientsController.delete
)

export default clientRouter
