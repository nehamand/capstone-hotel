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
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Bedrooms_1 = __importDefault(require("../../models/Bedrooms"));
const Clients_1 = __importDefault(require("../../models/Clients"));
const formatCreateClientData_1 = __importDefault(require("../../utils/formatCreateClientData"));
const data_source_1 = require("./../../data-source");
const clientsJoinBedrrom = ({ id, bedroomId }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bedroomId) {
        throw new AppError_1.default("Bedroom is required", 400);
    }
    const clientsRepository = data_source_1.AppDataSource.getRepository(Clients_1.default);
    const bedroomRepository = data_source_1.AppDataSource.getRepository(Bedrooms_1.default);
    const client = yield clientsRepository.findOne({ where: { id } });
    if (!client) {
        throw new AppError_1.default("Client not found", 404);
    }
    const bedroom = yield bedroomRepository.findOne({ where: { id: bedroomId } });
    if (!bedroom) {
        throw new AppError_1.default("Bedroom not found", 404);
    }
    if (bedroom.clients.length >= bedroom.capacity) {
        throw new AppError_1.default("This bedroom is already full", 400);
    }
    if (bedroom.clients.find(client => client.id === id)) {
        throw new AppError_1.default("This client is already on this bedroom", 400);
    }
    bedroom.availability = false;
    client.bedroom = bedroom;
    yield bedroomRepository.save(bedroom);
    const clientSaved = yield clientsRepository.save(client);
    const formatedClient = (0, formatCreateClientData_1.default)({ client: clientSaved });
    return formatedClient;
});
exports.default = clientsJoinBedrrom;
