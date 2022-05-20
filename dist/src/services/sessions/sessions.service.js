"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionService = void 0;
const bcryptjs_1 = require("bcryptjs");
const jsonwebtoken_1 = require("jsonwebtoken");
const data_source_1 = require("../../data-source");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Employees_1 = __importDefault(require("../../models/Employees"));
const sessionService = ({ cpf, password, }) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.AppDataSource.getRepository(Employees_1.default);
    const employee = yield employeeRepository.findOne({
        where: { cpf },
    });
    if (!employee) {
        throw new AppError_1.default("Incorrect cpf/password", 404);
    }
    const passwordMatch = yield (0, bcryptjs_1.compare)(password, employee.password);
    if (!passwordMatch) {
        throw new AppError_1.default("Incorrect cpf/password");
    }
    const token = (0, jsonwebtoken_1.sign)({ isAdmin: employee.admin }, process.env.SECRET_KEY || "default", {
        subject: employee.id,
        expiresIn: "3d",
    });
    return {
        employee,
        token,
    };
});
exports.sessionService = sessionService;
