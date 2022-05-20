"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const AppError_1 = __importDefault(require("../errors/AppError"));
function ensureAuth(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.default("JWT is missing", 401);
    }
    try {
        const [, token] = authHeader.split(" ");
        const secret = process.env.SECRET_KEY || "default";
        const decoded = (0, jsonwebtoken_1.verify)(token, secret);
        const { sub, isAdmin } = decoded;
        request.user = {
            id: sub,
            isAdmin,
        };
        return next();
    }
    catch (err) {
        throw new AppError_1.default("Invalid Token");
    }
}
exports.default = ensureAuth;
