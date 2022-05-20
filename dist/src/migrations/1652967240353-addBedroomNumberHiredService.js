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
exports.addBedroomNumberHiredService1652967240353 = void 0;
class addBedroomNumberHiredService1652967240353 {
    constructor() {
        this.name = 'addBedroomNumberHiredService1652967240353';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT 'now()'`);
            yield queryRunner.query(`ALTER TABLE "hired_services" DROP COLUMN "bedroom_number"`);
            yield queryRunner.query(`ALTER TABLE "hired_services" ADD "bedroom_number" character varying NOT NULL`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "hired_services" DROP COLUMN "bedroom_number"`);
            yield queryRunner.query(`ALTER TABLE "hired_services" ADD "bedroom_number" integer NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "hired_services" ALTER COLUMN "start_date" SET DEFAULT '2022-05-19 13:27:16.761992'`);
        });
    }
}
exports.addBedroomNumberHiredService1652967240353 = addBedroomNumberHiredService1652967240353;
