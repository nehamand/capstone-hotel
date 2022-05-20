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
const supertest_1 = __importDefault(require("supertest"));
const data_source_1 = require("../../data-source");
const app_1 = __importDefault(require("../../app"));
const sessions_service_1 = require("../../services/sessions/sessions.service");
const createEmployee_service_1 = __importDefault(require("../../services/employees/createEmployee.service"));
describe("PATCH /employees/:id", () => {
    let connection;
    let token = "";
    let id = "";
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        const employee = {
            name: "John Doe",
            cpf: "123321",
            password: "1234",
            admin: false,
            status: true,
        };
        yield (0, createEmployee_service_1.default)(employee);
        const response = yield (0, sessions_service_1.sessionService)({ cpf: "123321", password: "1234" });
        token = response.token;
        id = response.employee.id;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Should update an employee", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .patch(`/employees/${id}`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "New name" });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("employeeUpdated");
    }));
    test("Shouldn't update an unexisting employee", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/employees/f7b183ad-1c85-406c-b2d3-53a7363ea57q`)
            .set("Authorization", `Bearer ${token}`)
            .send({ name: "New name" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
});
