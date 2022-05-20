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
Object.defineProperty(exports, "__esModule", { value: true });
const sessions_service_1 = require("../services/sessions/sessions.service");
class SessionController {
    static store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cpf, password } = request.body;
            const authenticatedUser = yield (0, sessions_service_1.sessionService)({ cpf, password });
            return response.json(authenticatedUser);
        });
    }
}
exports.default = SessionController;
