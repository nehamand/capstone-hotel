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
const changeStatus_service_1 = __importDefault(require("../services/service/changeStatus.service"));
const createService_service_1 = __importDefault(require("../services/service/createService.service"));
const getAllServices_service_1 = __importDefault(require("../services/service/getAllServices.service"));
const getOneService_service_1 = __importDefault(require("../services/service/getOneService.service"));
const updateService_service_1 = __importDefault(require("../services/service/updateService.service"));
class ServiceController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, price } = req.body;
            const newService = yield (0, createService_service_1.default)({ name, description, price });
            return res.status(201).json(newService);
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const status = req.query.status || "true";
            const services = yield (0, getAllServices_service_1.default)(status);
            return res.status(200).json(services);
        });
    }
    static show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const service = yield (0, getOneService_service_1.default)(Number(id));
            return res.status(200).json(service);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, price, description, status } = req.body;
            const updatedService = yield (0, updateService_service_1.default)(Number(id), {
                name,
                price,
                description,
                status,
            });
            return res.status(200).json(updatedService);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const changeService = yield (0, changeStatus_service_1.default)(Number(id));
            return res.status(200).json(changeService);
        });
    }
}
exports.default = ServiceController;
