import {Router} from "express"
import SessionController from "../controllers/SessionController"

import {expressYupMiddleware} from "express-yup-middleware"
import loginSchema from "../validations/login/login.validation"

const sessionRouter = Router()

sessionRouter.post(
  "/",
  expressYupMiddleware({schemaValidator: loginSchema}),
  SessionController.store
)

export default sessionRouter
