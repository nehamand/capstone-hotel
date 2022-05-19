import {Router} from "express"
import BedroomsController from "../controllers/bedroom.controller"
import isAdminMiddleware from "../middlewares/isAdmin.middleware"

import {expressYupMiddleware} from "express-yup-middleware"

import createBedroomSchema from "../validations/bedrooms/createBedroom.validation"
import updateBedroomSchema from "../validations/bedrooms/updateBedroom.validation"
const bedroomRouter = Router()

bedroomRouter.post(
  "",
  expressYupMiddleware({schemaValidator: createBedroomSchema}),
  isAdminMiddleware,
  BedroomsController.create
)
bedroomRouter.get("", BedroomsController.index)
bedroomRouter.get("/:id", BedroomsController.show)
bedroomRouter.patch(
  "/:id",
  expressYupMiddleware({schemaValidator: updateBedroomSchema}),
  isAdminMiddleware,
  BedroomsController.update
)
bedroomRouter.delete("/:id", isAdminMiddleware, BedroomsController.delete)

export default bedroomRouter
