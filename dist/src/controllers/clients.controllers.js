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
const clientsCreate_service_1 = __importDefault(require("../services/clients/clientsCreate.service"));
const clientsDelete_service_1 = __importDefault(require("../services/clients/clientsDelete.service"));
const clientsJoinBedrrom_service_1 = __importDefault(require("../services/clients/clientsJoinBedrrom.service"));
const clientsList_service_1 = __importDefault(require("../services/clients/clientsList.service"));
const clientsListOne_service_1 = __importDefault(require("../services/clients/clientsListOne.service"));
const clientsUpdate_service_1 = __importDefault(require("../services/clients/clientsUpdate.service"));
class ClientsController {
}
exports.default = ClientsController;
_a = ClientsController;
ClientsController.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, birthDate, cpf, cellphone, bedroomId } = req.body;
    const newClient = yield (0, clientsCreate_service_1.default)({
        name,
        birthDate,
        cpf,
        cellphone,
        bedroomId,
    });
    return res.status(201).json(newClient);
});
ClientsController.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const client = yield (0, clientsListOne_service_1.default)(id);
    return res.status(200).json(client);
});
ClientsController.show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.query.status || "true";
    const client = yield (0, clientsList_service_1.default)(status);
    return res.status(200).json(client);
});
ClientsController.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, birthDate, cpf, cellphone } = req.body;
    const client = yield (0, clientsUpdate_service_1.default)(id, {
        name,
        birthDate,
        cpf,
        cellphone,
    });
    return res.status(201).json(client);
});
ClientsController.delete = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const client = yield (0, clientsDelete_service_1.default)(id);
    return res.status(200).json(client);
});
ClientsController.joinBedroom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { bedroomId } = req.body;
    const clientJoined = yield (0, clientsJoinBedrrom_service_1.default)({ id, bedroomId });
    return res.json(clientJoined);
});
