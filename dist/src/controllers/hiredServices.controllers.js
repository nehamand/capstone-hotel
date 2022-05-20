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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const changeStatusHiredService_service_1 = __importDefault(require("../services/hiredServices/changeStatusHiredService.service"));
const createHiredService_service_1 = __importDefault(require("../services/hiredServices/createHiredService.service"));
const getAllHIredServices_service_1 = __importDefault(require("../services/hiredServices/getAllHIredServices.service"));
const getOneHiredService_service_1 = __importDefault(require("../services/hiredServices/getOneHiredService.service"));
const updateHiredService_service_1 = __importDefault(require("../services/hiredServices/updateHiredService.service"));
class HiredServicesControllers {
}
exports.default = HiredServicesControllers;
_a = HiredServicesControllers;
HiredServicesControllers.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const hiredService = yield (0, createHiredService_service_1.default)(data);
    return res.status(201).json(hiredService);
});
HiredServicesControllers.show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const hiredService = yield (0, getOneHiredService_service_1.default)(Number(id));
    return res.status(200).json(hiredService);
});
HiredServicesControllers.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.query.status || "true";
    const hiredService = yield (0, getAllHIredServices_service_1.default)(status);
    return res.status(200).json(hiredService);
});
HiredServicesControllers.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const hiredService = yield (0, updateHiredService_service_1.default)(Number(id));
    return res.status(201).json(hiredService);
});
HiredServicesControllers.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const hiredService = yield (0, changeStatusHiredService_service_1.default)(Number(id));
    return res.status(200).json(hiredService);
});
