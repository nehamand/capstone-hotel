"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hiredServices_controllers_1 = __importDefault(require("../controllers/hiredServices.controllers"));
const express_1 = require("express");
const express_yup_middleware_1 = require("express-yup-middleware");
const createHiredService_validation_1 = __importDefault(require("../validations/hiredServices/createHiredService.validation"));
const hiredService = (0, express_1.Router)();
hiredService.post("/", (0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: createHiredService_validation_1.default }), hiredServices_controllers_1.default.store);
hiredService.get("/", hiredServices_controllers_1.default.index);
hiredService.get("/:id", hiredServices_controllers_1.default.show);
hiredService.patch("/pay/:id", hiredServices_controllers_1.default.update);
hiredService.delete("/:id", hiredServices_controllers_1.default.delete);
exports.default = hiredService;
