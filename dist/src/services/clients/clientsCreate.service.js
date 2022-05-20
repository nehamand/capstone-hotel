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
const Bedrooms_1 = __importDefault(require("../../models/Bedrooms"));
const Clients_1 = __importDefault(require("../../models/Clients"));
const formatCreateClientData_1 = __importDefault(require("../../utils/formatCreateClientData"));
const createClient = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const clientRepository = data_source_1.AppDataSource.getRepository(Clients_1.default);
    if (!data.bedroomId) {
        throw new AppError_1.default("Bedroom id is required", 400);
    }
    const bedroomRepository = data_source_1.AppDataSource.getRepository(Bedrooms_1.default);
    const bedroom = yield bedroomRepository.findOne({ where: { id: data.bedroomId } });
    if (!bedroom) {
        throw new AppError_1.default("Bedroom not found", 404);
    }
    if (bedroom.clients.length >= bedroom.capacity) {
        throw new AppError_1.default("This bedroom is already full", 400);
    }
    bedroom.availability = false;
    const newClient = new Clients_1.default();
    newClient.name = data.name;
    newClient.birthDate = data.birthDate;
    newClient.cpf = data.cpf;
    newClient.cellphone = data.cellphone;
    newClient.bedroom = bedroom;
    yield bedroomRepository.save(bedroom);
    clientRepository.create(newClient);
    const client = yield clientRepository.save(newClient);
    const fomatedClient = (0, formatCreateClientData_1.default)({ client });
    return fomatedClient;
});
exports.default = createClient;
