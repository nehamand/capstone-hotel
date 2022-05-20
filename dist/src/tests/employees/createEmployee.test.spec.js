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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
describe("POST /employees", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Should create a new employee", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/employees")
            .send({ name: "John Doe", cpf: "123456789", password: "12345" });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("admin");
        expect(response.body).toHaveProperty("id");
    }));
    test("Shouldn't create a new employee with the same cpf", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/employees")
            .send({ name: "John Doe", cpf: "123456789", password: "12345" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("Shouldn't create a new employee without name", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/employees")
            .send({ cpf: "1234567891", password: "12345" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("Shouldn't create a new employee without password", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/employees")
            .send({ name: "John Doe", cpf: "1234567891" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
    test("Shouldn't create a new employee without cpf", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .post("/employees")
            .send({ name: "John Doe", password: "12345" });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("message");
    }));
});
