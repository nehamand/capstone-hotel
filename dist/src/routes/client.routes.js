"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clients_controllers_1 = __importDefault(require("../controllers/clients.controllers"));
const express_yup_middleware_1 = require("express-yup-middleware");
const createClient_validation_1 = __importDefault(require("../validations/clients/createClient.validation"));
const updateClient_validation_1 = __importDefault(require("../validations/clients/updateClient.validation"));
const clientRouter = (0, express_1.Router)();
clientRouter.post("/", (0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: createClient_validation_1.default, }), clients_controllers_1.default.store);
clientRouter.get("/", clients_controllers_1.default.show);
clientRouter.get("/:id", clients_controllers_1.default.index);
clientRouter.patch("/:id", (0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: updateClient_validation_1.default }), clients_controllers_1.default.update);
clientRouter.patch("/joinbedroom/:id", clients_controllers_1.default.joinBedroom);
clientRouter.delete("/:id", clients_controllers_1.default.delete);
exports.default = clientRouter;
