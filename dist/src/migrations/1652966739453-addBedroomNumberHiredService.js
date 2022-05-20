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
exports.addBedroomNumberHiredService1652966739453 = void 0;
class addBedroomNumberHiredService1652966739453 {
    constructor() {
        this.name = 'addBedroomNumberHiredService1652966739453';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "hired_services" ADD "bedroom_number" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT 'now()'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT '2022-05-18 23:57:57.446167'`);
            yield queryRunner.query(`ALTER TABLE "hired_services" DROP COLUMN "bedroom_number"`);
        });
    }
}
exports.addBedroomNumberHiredService1652966739453 = addBedroomNumberHiredService1652966739453;
