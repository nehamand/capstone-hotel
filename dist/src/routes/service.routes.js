"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_controller_1 = __importDefault(require("../controllers/service.controller"));
const isAdmin_middleware_1 = __importDefault(require("../middlewares/isAdmin.middleware"));
const express_yup_middleware_1 = require("express-yup-middleware");
const createService_validation_1 = __importDefault(require("../validations/services/createService.validation"));
const updateService_validation_1 = __importDefault(require("../validations/services/updateService.validation"));
const serviceRouter = (0, express_1.Router)();
serviceRouter.post("", (0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: createService_validation_1.default }), isAdmin_middleware_1.default, service_controller_1.default.create);
serviceRouter.get("", service_controller_1.default.index);
serviceRouter.get("/:id", service_controller_1.default.show);
serviceRouter.patch("/:id", (0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: updateService_validation_1.default }), isAdmin_middleware_1.default, service_controller_1.default.update);
serviceRouter.delete("/:id", isAdmin_middleware_1.default, service_controller_1.default.delete);
exports.default = serviceRouter;
