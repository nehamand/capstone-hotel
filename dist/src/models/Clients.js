"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Bedrooms_1 = __importDefault(require("./Bedrooms"));
const HiredServices_1 = __importDefault(require("./HiredServices"));
let Client = class Client {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Client.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 128 }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 11 }),
    __metadata("design:type", String)
], Client.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Client.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, length: 11, nullable: true }),
    __metadata("design:type", String)
], Client.prototype, "cellphone", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => HiredServices_1.default, (hiredServices) => hiredServices.client, {
        eager: true,
    }),
    __metadata("design:type", Array)
], Client.prototype, "hiredServices", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => Bedrooms_1.default, (bedroom) => bedroom.clients, { nullable: true }),
    __metadata("design:type", Bedrooms_1.default)
], Client.prototype, "bedroom", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Client.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Client.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], Client.prototype, "status", void 0);
Client = __decorate([
    (0, typeorm_1.Entity)("clients")
], Client);
exports.default = Client;
