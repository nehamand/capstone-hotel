import { Router } from "express";
import ServiceController from "../controllers/service.controller";

const serviceRouter = Router()

serviceRouter.post('', ServiceController.create)
serviceRouter.get('', ServiceController.index)
serviceRouter.get('/:id', ServiceController.show)
serviceRouter.patch('/:id', ServiceController.update)
serviceRouter.delete('/:id', ServiceController.delete)

export default serviceRouter