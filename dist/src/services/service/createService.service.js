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
const Services_1 = __importDefault(require("../../models/Services"));
const createService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceRepository = data_source_1.AppDataSource.getRepository(Services_1.default);
    const newService = new Services_1.default();
    newService.name = data.name;
    newService.price = data.price;
    newService.description = data.description;
    serviceRepository.create(newService);
    yield serviceRepository.save(newService);
    return newService;
});
exports.default = createService;
