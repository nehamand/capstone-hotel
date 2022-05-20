"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../errors/AppError"));
const isAdminMiddleware = (request, response, next) => {
    const { isAdmin } = request.user;
    if (!isAdmin) {
        throw new AppError_1.default("Only admin can access this route", 401);
    }
    return next();
};
exports.default = isAdminMiddleware;
