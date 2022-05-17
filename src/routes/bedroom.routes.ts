import { Router } from "express";
import BedroomsController from "../controllers/bedroom.controller";

const bedroomRouter = Router();

bedroomRouter.post("", BedroomsController.create);
bedroomRouter.get("", BedroomsController.index);
bedroomRouter.get("/:id", BedroomsController.show);
bedroomRouter.patch("/:id", BedroomsController.update);
bedroomRouter.delete("/:id", BedroomsController.delete);

export default bedroomRouter;
