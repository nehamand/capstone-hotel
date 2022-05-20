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
const Clients_1 = __importDefault(require("./Clients"));
const Services_1 = __importDefault(require("./Services"));
let HiredServices = class HiredServices {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HiredServices.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "now()" }),
    __metadata("design:type", Date)
], HiredServices.prototype, "start_date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], HiredServices.prototype, "end_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Clients_1.default, (clients) => clients.hiredServices),
    __metadata("design:type", Clients_1.default)
], HiredServices.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Services_1.default, (service) => service.hiredServices),
    __metadata("design:type", Services_1.default)
], HiredServices.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], HiredServices.prototype, "bedroom_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], HiredServices.prototype, "paid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "decimal", precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], HiredServices.prototype, "total_price", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], HiredServices.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], HiredServices.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: true }),
    __metadata("design:type", Boolean)
], HiredServices.prototype, "status", void 0);
HiredServices = __decorate([
    (0, typeorm_1.Entity)("hired_services")
], HiredServices);
exports.default = HiredServices;
