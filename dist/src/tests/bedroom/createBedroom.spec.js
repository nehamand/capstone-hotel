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
const data_source_1 = require("./../../data-source");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
describe("POST /bedrooms", () => {
    let connection;
    let token;
    let testBedroom = {
        number: 5,
        floor: 6,
        capacity: 5,
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.AppDataSource.initialize()
            .then((res) => (connection = res))
            .catch((err) => {
            console.error("Error during Data Source initialization", err);
        });
        let testEmployee = {
            name: "Marioto",
            cpf: "12345678998",
            password: "123456",
            admin: true,
        };
        yield (0, supertest_1.default)(app_1.default).post("/employees").send(testEmployee);
        const responseLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/sessions")
            .send({ cpf: testEmployee.cpf, password: testEmployee.password });
        token = responseLogin.body.token;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Shold be create a new bedroom", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default).post("/bedrooms").set({ Authorization: `Bearer ${token}` }).send(testBedroom);
        expect(response.status).toEqual(201);
        expect(response.body.id).toBeDefined();
        expect(response.body).toEqual(expect.objectContaining({
            number: testBedroom.number,
            floor: testBedroom.floor,
            capacity: testBedroom.capacity,
            status: true,
        }));
    }));
});
