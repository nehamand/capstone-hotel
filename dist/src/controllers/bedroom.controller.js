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
const createBedroom_service_1 = __importDefault(require("../services/bedroom/createBedroom.service"));
const disableBedroom_service_1 = __importDefault(require("../services/bedroom/disableBedroom.service"));
const listBedrooms_service_1 = __importDefault(require("../services/bedroom/listBedrooms.service"));
const showBedroom_service_1 = __importDefault(require("../services/bedroom/showBedroom.service"));
const updateBedroom_service_1 = __importDefault(require("../services/bedroom/updateBedroom.service"));
class BedroomsController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { number, floor, capacity, availability } = req.body;
            const bedroom = yield (0, createBedroom_service_1.default)({
                number,
                floor,
                capacity,
                availability,
            });
            return res.status(201).json(bedroom);
        });
    }
    static index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const bedrooms = yield (0, listBedrooms_service_1.default)();
            return res.json(bedrooms);
        });
    }
    static show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const bedroom = yield (0, showBedroom_service_1.default)(Number(id));
            return res.json(bedroom);
        });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { capacity, availability } = req.body;
            const updateBedroom = yield (0, updateBedroom_service_1.default)(Number(id), {
                capacity,
                availability,
            });
            return res.json(updateBedroom);
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const bedroomDisabled = yield (0, disableBedroom_service_1.default)(Number(id));
            return res.json(bedroomDisabled);
        });
    }
}
exports.default = BedroomsController;
