"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SessionController_1 = __importDefault(require("../controllers/SessionController"));
const express_yup_middleware_1 = require("express-yup-middleware");
const login_validation_1 = __importDefault(require("../validations/login/login.validation"));
const sessionRouter = (0, express_1.Router)();
sessionRouter.post("/", (0, express_yup_middleware_1.expressYupMiddleware)({ schemaValidator: login_validation_1.default }), SessionController_1.default.store);
exports.default = sessionRouter;
