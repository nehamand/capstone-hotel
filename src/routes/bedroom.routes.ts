import { Router } from "express";
import BedroomsController from "../controllers/bedroom.controller";
import isAdminMiddleware from "../middlewares/isAdmin.middleware";

import { expressYupMiddleware } from "express-yup-middleware";

import createBedroomSchema from "../validations/bedrooms/createBedroom.validation";
import updateBedroomSchema from "../validations/bedrooms/updateBedroom.validation";
import numberIdSchema from "../validations/numberIdValidation";
import ensureAuth from "../middlewares/ensureAuth.middleware";
const bedroomRouter = Router();

bedroomRouter.get("", BedroomsController.index);

bedroomRouter.use(ensureAuth);

bedroomRouter.post(
  "",
  expressYupMiddleware({ schemaValidator: createBedroomSchema }),
  isAdminMiddleware,
  BedroomsController.create
);
bedroomRouter.get(
  "/:id",
  expressYupMiddleware({ schemaValidator: numberIdSchema }),
  BedroomsController.show
);
bedroomRouter.patch(
  "/:id",
  expressYupMiddleware({ schemaValidator: updateBedroomSchema }),
  expressYupMiddleware({ schemaValidator: numberIdSchema }),
  isAdminMiddleware,
  BedroomsController.update
);
bedroomRouter.delete(
  "/:id",
  expressYupMiddleware({ schemaValidator: numberIdSchema }),
  isAdminMiddleware,
  BedroomsController.delete
);

export default bedroomRouter;
