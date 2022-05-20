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
const createEmployee_service_1 = __importDefault(require("../services/employees/createEmployee.service"));
const deleteEmployee_service_1 = __importDefault(require("../services/employees/deleteEmployee.service"));
const getAllEmployees_service_1 = __importDefault(require("../services/employees/getAllEmployees.service"));
const getOneEmployee_service_1 = __importDefault(require("../services/employees/getOneEmployee.service"));
const updateEmployee_service_1 = __importDefault(require("../services/employees/updateEmployee.service"));
class employeeControllers {
    static store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, cpf, password, admin, status } = req.body;
            const newUser = yield (0, createEmployee_service_1.default)({
                name,
                cpf,
                password,
                admin,
                status,
            });
            return res.status(201).json(newUser);
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = req.query.status || "true";
            const employees = yield (0, getAllEmployees_service_1.default)(status);
            return res.status(200).json(employees);
        });
    }
    static show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const employee = yield (0, getOneEmployee_service_1.default)(id);
            return res.status(200).json(employee);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, password, admin, status } = req.body;
            const employeeUpdated = yield (0, updateEmployee_service_1.default)(id, {
                name,
                password,
                admin,
                status,
            });
            return res.status(201).json({ message: "Employee updated", employeeUpdated });
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const employeeRes = yield (0, deleteEmployee_service_1.default)(id);
            return res.status(201).json({
                message: "Employee deactivated",
                status: employeeRes,
            });
        });
    }
}
exports.default = employeeControllers;
