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
exports.EquipmentHistory = exports.ActionType = void 0;
const typeorm_1 = require("typeorm");
const equipment_entity_1 = require("../../equipment/entities/equipment.entity");
const sector_entity_1 = require("../../sector/entities/sector.entity");
const user_entity_1 = require("../../users/entities/user.entity");
var ActionType;
(function (ActionType) {
    ActionType["ASSIGNMENT"] = "assignment";
    ActionType["TRANSFER"] = "transfer";
    ActionType["MAINTENANCE"] = "maintenance";
    ActionType["RETURN"] = "return";
    ActionType["RETIREMENT"] = "retirement";
    ActionType["LOCATION_CHANGE"] = "location_change";
})(ActionType || (exports.ActionType = ActionType = {}));
let EquipmentHistory = class EquipmentHistory {
    id;
    actionType;
    fromInstallationId;
    toInstallationId;
    actionDate;
    created_at;
    equipment;
    fromSector;
    toSector;
    user;
};
exports.EquipmentHistory = EquipmentHistory;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], EquipmentHistory.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ActionType
    }),
    __metadata("design:type", String)
], EquipmentHistory.prototype, "actionType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EquipmentHistory.prototype, "fromInstallationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EquipmentHistory.prototype, "toInstallationId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], EquipmentHistory.prototype, "actionDate", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], EquipmentHistory.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_entity_1.Equipment),
    (0, typeorm_1.JoinColumn)({ name: 'equipmentId' }),
    __metadata("design:type", equipment_entity_1.Equipment)
], EquipmentHistory.prototype, "equipment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sector_entity_1.Sector, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'fromSectorId' }),
    __metadata("design:type", sector_entity_1.Sector)
], EquipmentHistory.prototype, "fromSector", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => sector_entity_1.Sector, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'toSectorId' }),
    __metadata("design:type", sector_entity_1.Sector)
], EquipmentHistory.prototype, "toSector", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'performedBy' }),
    __metadata("design:type", user_entity_1.User)
], EquipmentHistory.prototype, "user", void 0);
exports.EquipmentHistory = EquipmentHistory = __decorate([
    (0, typeorm_1.Entity)()
], EquipmentHistory);
//# sourceMappingURL=equipment-history.entity.js.map