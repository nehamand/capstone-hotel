"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_controllers_1 = __importDefault(require("../controllers/employees.controllers"));
const ensureAuth_middleware_1 = __importDefault(require("../middlewares/ensureAuth.middleware"));
const express_yup_middleware_1 = require("express-yup-middleware");
const createEmployee_validation_1 = __importDefault(require("../validations/employees/createEmployee.validation"));
const updateEmployee_validation_1 = __importDefault(require("../validations/employees/updateEmployee.validation"));
const employeeRouter = (0, express_1.Router)();
employeeRouter.get("/", ensureAuth_middleware_1.default, employees_controllers_1.default.index);
employeeRouter.get("/:id", ensureAuth_middleware_1.default, employees_controllers_1.default.show);
employeeRouter.post("/", (0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: createEmployee_validation_1.default }), employees_controllers_1.default.store);
employeeRouter.patch("/:id", (0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: updateEmployee_validation_1.default }), ensureAuth_middleware_1.default, employees_controllers_1.default.update);
employeeRouter.delete("/:id", ensureAuth_middleware_1.default, employees_controllers_1.default.delete);
exports.default = employeeRouter;
