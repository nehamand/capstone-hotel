import { Router } from "express";
import ClientsController from "../controllers/clients.controllers";

const clientRouter = Router()

clientRouter.post('/', ClientsController.store)
clientRouter.get('/', ClientsController.show)
clientRouter.get('/:id', ClientsController.index)
clientRouter.patch('/:id', ClientsController.update)
clientRouter.delete('/:id', ClientsController.delete)

export default clientRouter;