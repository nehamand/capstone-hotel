import HiredServicesControllers from '../controllers/hiredServices.controllers'
import { Router } from 'express'
import createHiredServiceSchema from '../validations/hiredServices/createHiredService.validation'
import { expressYupMiddleware } from 'express-yup-middleware'
import isAdminMiddleware from '../middlewares/isAdmin.middleware'

const hiredService = Router()

hiredService.post(
  '/',
  isAdminMiddleware,
  expressYupMiddleware({ schemaValidator: createHiredServiceSchema }),
  HiredServicesControllers.store
)
hiredService.get('/', HiredServicesControllers.index)
hiredService.get('/:id', HiredServicesControllers.show)
hiredService.patch('/pay/:id', isAdminMiddleware, HiredServicesControllers.update)
hiredService.delete(
  '/:id',
  isAdminMiddleware,
  HiredServicesControllers.delete
)

export default hiredService
