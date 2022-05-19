import HiredServicesControllers from "../controllers/hiredServices.controllers";
import { Router } from "express";

const hiredService = Router()

hiredService.post('/', HiredServicesControllers.store)
hiredService.get('/', HiredServicesControllers.index)
hiredService.get('/:id', HiredServicesControllers.show)
hiredService.patch('/pay/:id', HiredServicesControllers.update)
hiredService.delete('/:id', HiredServicesControllers.delete)

export default hiredService;