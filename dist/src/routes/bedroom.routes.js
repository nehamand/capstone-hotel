"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bedroom_controller_1 = __importDefault(require("../controllers/bedroom.controller"));
const isAdmin_middleware_1 = __importDefault(require("../middlewares/isAdmin.middleware"));
const express_yup_middleware_1 = require("express-yup-middleware");
const createBedroom_validation_1 = __importDefault(require("../validations/bedrooms/createBedroom.validation"));
const updateBedroom_validation_1 = __importDefault(require("../validations/bedrooms/updateBedroom.validation"));
const bedroomRouter = (0, express_1.Router)();
bedroomRouter.post("", (0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: createBedroom_validation_1.default }), isAdmin_middleware_1.default, bedroom_controller_1.default.create);
bedroomRouter.get("", bedroom_controller_1.default.index);
bedroomRouter.get("/:id", bedroom_controller_1.default.show);
bedroomRouter.patch("/:id", (0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: updateBedroom_validation_1.default }), isAdmin_middleware_1.default, bedroom_controller_1.default.update);
bedroomRouter.delete("/:id", isAdmin_middleware_1.default, bedroom_controller_1.default.delete);
exports.default = bedroomRouter;
