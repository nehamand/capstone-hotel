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
const HiredServices_1 = __importDefault(require("../../models/HiredServices"));
const updateHiredService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const hiredServiceRepository = data_source_1.AppDataSource.getRepository(HiredServices_1.default);
    const hiredService = yield hiredServiceRepository.findOne({ where: { id } });
    if (!hiredService) {
        throw new AppError_1.default("Hired Service not found", 400);
    }
    if (hiredService.paid) {
        throw new AppError_1.default("This Hired Service has already been paid", 400);
    }
    const bedroomRepostiroy = data_source_1.AppDataSource.getRepository(Bedrooms_1.default);
    const bedroom = yield bedroomRepostiroy.findOne({
        where: { number: hiredService.bedroom_number },
    });
    if (!bedroom) {
        throw new AppError_1.default("Bedroom not found", 404);
    }
    bedroom.availability = true;
    bedroom.clients = [];
    yield bedroomRepostiroy.save(bedroom);
    const updatedHiredService = yield hiredServiceRepository.save({
        paid: true,
        id,
    });
    return { message: "Paid Hired service", updatedHiredService };
});
exports.default = updateHiredService;
