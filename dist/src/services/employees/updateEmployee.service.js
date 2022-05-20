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
const data_source_1 = require("../../data-source");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Employees_1 = __importDefault(require("../../models/Employees"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const updateEmployeeService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.AppDataSource.getRepository(Employees_1.default);
    const employee = yield employeeRepository.findOne({ where: { id } });
    if (!employee) {
        throw new AppError_1.default("Employee not found.", 400);
    }
    if (data.password) {
        data.password = bcrypt_1.default.hashSync(data.password, 10);
    }
    const employeeToShow = yield employeeRepository.save(Object.assign(Object.assign({}, data), { id }));
    return employeeToShow;
});
exports.default = updateEmployeeService;
