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
const createEmployeeService = ({ name, cpf, password, admin, status, }) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeRepository = data_source_1.AppDataSource.getRepository(Employees_1.default);
    const cpfExists = yield employeeRepository.findOne({ where: { cpf } });
    if (cpfExists) {
        throw new AppError_1.default("Employee with this cpf already exists.", 400);
    }
    const newEmployee = new Employees_1.default();
    newEmployee.name = name;
    newEmployee.cpf = cpf;
    newEmployee.password = bcrypt_1.default.hashSync(password, 10);
    newEmployee.admin = admin;
    newEmployee.status = status;
    employeeRepository.create(newEmployee);
    yield employeeRepository.save(newEmployee);
    const employeeToShow = {
        id: newEmployee.id,
        name: newEmployee.name,
        cpf: newEmployee.cpf,
        admin: newEmployee.admin,
        status: newEmployee.status,
        created_at: newEmployee.created_at,
        updated_at: newEmployee.updated_at,
    };
    return employeeToShow;
});
exports.default = createEmployeeService;
