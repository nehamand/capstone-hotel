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
const HiredServices_1 = __importDefault(require("../../models/HiredServices"));
const Services_1 = __importDefault(require("../../models/Services"));
const formatHiredServiceData_1 = __importDefault(require("../../utils/formatHiredServiceData"));
const createHiredService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const hiredServiceRepository = data_source_1.AppDataSource.getRepository(HiredServices_1.default);
    const serviceRepository = data_source_1.AppDataSource.getRepository(Services_1.default);
    const service = yield serviceRepository.findOne({
        where: { id: data.serviceId },
    });
    const clientRepository = data_source_1.AppDataSource.getRepository(Clients_1.default);
    const client = yield clientRepository.findOne({
        where: { id: data.clientId },
    });
    if (!service) {
        throw new AppError_1.default("Service not found", 404);
    }
    if (!client) {
        throw new AppError_1.default("Client not found", 404);
    }
    const bedroomRepository = data_source_1.AppDataSource.getRepository(Bedrooms_1.default);
    const bedroom = yield bedroomRepository.find();
    const findBedroom = bedroom.find(bedroom => bedroom.clients.find(bedClient => bedClient.id === client.id));
    if (!findBedroom) {
        throw new AppError_1.default("Client bedrooms not exists", 404);
    }
    data.bedroom_number = findBedroom.number;
    let startDate = new Date(data.start_date).getTime() / 1000;
    let endDate = new Date(data.end_date).getTime() / 1000;
    let timeDifference = endDate - startDate;
    let dayDifference = timeDifference / 86400;
    if (dayDifference <= 0) {
        throw new AppError_1.default("The date difference must be at least 1 day", 400);
    }
    let total_price = service.price * dayDifference;
    total_price = Number(total_price.toFixed(2));
    const hiredService = hiredServiceRepository.create(Object.assign(Object.assign({}, data), { service,
        client,
        total_price }));
    yield hiredServiceRepository.save(hiredService);
    const formatedHiredService = (0, formatHiredServiceData_1.default)({ hiredService });
    return formatedHiredService;
});
exports.default = createHiredService;
