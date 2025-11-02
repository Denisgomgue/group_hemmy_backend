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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Installation = exports.InstallationStatus = void 0;
const typeorm_1 = require("typeorm");
const client_entity_1 = require("../../client/entities/client.entity");
const sector_entity_1 = require("../../sector/entities/sector.entity");
var InstallationStatus;
(function (InstallationStatus) {
    InstallationStatus["ACTIVE"] = "ACTIVE";
    InstallationStatus["INACTIVE"] = "INACTIVE";
})(InstallationStatus || (exports.InstallationStatus = InstallationStatus = {}));
let Installation = class Installation {
    id;
    address;
    ipAddress;
    imagePath;
    installedAt;
    status;
    created_at;
    updated_at;
    clientId;
    client;
    sectorId;
    sector;
};
exports.Installation = Installation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Installation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Installation.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Installation.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Installation.prototype, "imagePath", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], Installation.prototype, "installedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: InstallationStatus,
        nullable: true
    }),
    __metadata("design:type", String)
], Installation.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Installation.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Installation.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Installation.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", client_entity_1.Client)
], Installation.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Installation.prototype, "sectorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sector_entity_1.Sector),
    (0, typeorm_1.JoinColumn)({ name: 'sectorId' }),
    __metadata("design:type", sector_entity_1.Sector)
], Installation.prototype, "sector", void 0);
exports.Installation = Installation = __decorate([
    (0, typeorm_1.Entity)()
], Installation);
//# sourceMappingURL=installation.entity.js.map