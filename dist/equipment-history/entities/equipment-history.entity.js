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
    fromLocation;
    toLocation;
    reason;
    notes;
    actionDate;
    performedBy;
    fromClientId;
    toClientId;
    fromInstallationId;
    toInstallationId;
    fromEmployeeId;
    toEmployeeId;
    equipment;
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
    __metadata("design:type", String)
], EquipmentHistory.prototype, "fromLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EquipmentHistory.prototype, "toLocation", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EquipmentHistory.prototype, "reason", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], EquipmentHistory.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", Date)
], EquipmentHistory.prototype, "actionDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EquipmentHistory.prototype, "performedBy", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EquipmentHistory.prototype, "fromClientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EquipmentHistory.prototype, "toClientId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EquipmentHistory.prototype, "fromInstallationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EquipmentHistory.prototype, "toInstallationId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EquipmentHistory.prototype, "fromEmployeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], EquipmentHistory.prototype, "toEmployeeId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_entity_1.Equipment),
    (0, typeorm_1.JoinColumn)({ name: 'equipmentId' }),
    __metadata("design:type", equipment_entity_1.Equipment)
], EquipmentHistory.prototype, "equipment", void 0);
exports.EquipmentHistory = EquipmentHistory = __decorate([
    (0, typeorm_1.Entity)('equipment_history')
], EquipmentHistory);
//# sourceMappingURL=equipment-history.entity.js.map