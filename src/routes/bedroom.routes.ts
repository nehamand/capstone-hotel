import {Router} from "express"
import BedroomsController from "../controllers/bedroom.controller"
import isAdminMiddleware from "../middlewares/isAdmin.middleware"

const bedroomRouter = Router()

bedroomRouter.post("", isAdminMiddleware, BedroomsController.create)
bedroomRouter.get("", BedroomsController.index)
bedroomRouter.get("/:id", BedroomsController.show)
bedroomRouter.patch("/:id", isAdminMiddleware, BedroomsController.update)
bedroomRouter.delete("/:id", isAdminMiddleware, BedroomsController.delete)

export default bedroomRouter
