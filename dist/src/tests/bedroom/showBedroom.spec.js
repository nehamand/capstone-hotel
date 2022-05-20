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
describe("GET /bedrooms/:id", () => {
    let connection;
    let token;
    let bedroom;
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
        let testBedroom = {
            number: "5",
            floor: "6",
            capacity: 5,
        };
        yield (0, supertest_1.default)(app_1.default).post("/employees").send(testEmployee);
        const responseLogin = yield (0, supertest_1.default)(app_1.default)
            .post("/sessions")
            .send({ cpf: testEmployee.cpf, password: testEmployee.password });
        token = responseLogin.body.token;
        bedroom = yield (0, supertest_1.default)(app_1.default)
            .post("/bedrooms")
            .set({ Authorization: `Bearer ${token}` })
            .send(testBedroom);
        bedroom = bedroom.body;
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("Shold be get a bedroom", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app_1.default)
            .get(`/bedrooms/${bedroom.id}`)
            .set({ Authorization: `Bearer ${token}` });
        expect(response.status).toEqual(200);
        expect(response.body.id).toBeDefined();
        expect(response.body).toEqual(expect.objectContaining(bedroom));
    }));
});
