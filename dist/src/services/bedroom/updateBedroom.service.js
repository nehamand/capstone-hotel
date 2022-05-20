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
const data_source_1 = require("./../../data-source");
const updateBedroomService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const bedroomRepository = data_source_1.AppDataSource.getRepository(Bedrooms_1.default);
    const bedroom = yield bedroomRepository.findOne({ where: { id } });
    if (!bedroom) {
        throw new AppError_1.default("Bedroom not found", 404);
    }
    const updatedBedroom = yield bedroomRepository.save(Object.assign(Object.assign({}, data), { id }));
    return {
        message: "Bedroom updated",
        updatedBedroom,
    };
});
exports.default = updateBedroomService;
