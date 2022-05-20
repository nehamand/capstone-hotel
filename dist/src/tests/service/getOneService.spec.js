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
const createEmployee_service_1 = __importDefault(require("../../services/employees/createEmployee.service"));
const sessions_service_1 = require("../../services/sessions/sessions.service");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const createService_service_1 = __importDefault(require("../../services/service/createService.service"));
describe("GET BY ID - /services", () => {
    let connection;
    let token = "";
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => console.error("Error during Data Source initialization", err));
        const employee = {
            name: "Alexandre",
            cpf: "12345678910",
            password: "123456",
            status: true,
            admin: true,
        };
        yield (0, createEmployee_service_1.default)(employee);
        const login = {
            cpf: employee.cpf,
            password: employee.password,
        };
        const res = yield (0, sessions_service_1.sessionService)(login);
        token = res.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Should be able to list one service", () => __awaiter(void 0, void 0, void 0, function* () {
        const service = {
            name: "Hospedagem Simples",
            price: 200,
            description: "Hospedagem simple com café da manha",
        };
        const serviceCreated = yield (0, createService_service_1.default)(service);
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/services/${serviceCreated.id}`)
            .set({
            Authorization: `Bearer ${token}`,
        });
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.objectContaining({
            name: service.name,
            price: service.price,
            description: service.description,
        }));
    }));
    test("Shouldn't be possible to return one service whith id not exists without admin permission", () => __awaiter(void 0, void 0, void 0, function* () {
        const employee = {
            name: "Alexandre",
            cpf: "12345678911",
            password: "123456",
            status: true,
            admin: false,
        };
        yield (0, createEmployee_service_1.default)(employee);
        const login = {
            cpf: employee.cpf,
            password: employee.password,
        };
        const res = yield (0, sessions_service_1.sessionService)(login);
        const service = {
            name: "Hospedagem Simples",
            price: 200,
            description: "Hospedagem simple com café da manha",
        };
        const serviceCreated = yield (0, createService_service_1.default)(service);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/services/${serviceCreated.id}`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
    test("Shouldn't be possible to return one service without admin permission", () => __awaiter(void 0, void 0, void 0, function* () {
        const employee = {
            name: "Alexandre",
            cpf: "12345678918",
            password: "123456",
            status: true,
            admin: false,
        };
        yield (0, createEmployee_service_1.default)(employee);
        const login = {
            cpf: employee.cpf,
            password: employee.password,
        };
        const res = yield (0, sessions_service_1.sessionService)(login);
        const service = {
            name: "Hospedagem Simples",
            price: 200,
            description: "Hospedagem simple com café da manha",
        };
        yield (0, createService_service_1.default)(service);
        const response = yield (0, supertest_1.default)(app_1.default).get(`/services/8`);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("message");
    }));
});
