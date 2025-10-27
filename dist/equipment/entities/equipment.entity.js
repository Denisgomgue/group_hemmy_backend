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
exports.Equipment = exports.EquipmentUseType = exports.EquipmentStatus = void 0;
const typeorm_1 = require("typeorm");
const equipment_category_entity_1 = require("../../equipment-categories/entities/equipment-category.entity");
const installation_entity_1 = require("../../installation/entities/installation.entity");
const employee_entity_1 = require("../../employee/entities/employee.entity");
var EquipmentStatus;
(function (EquipmentStatus) {
    EquipmentStatus["STOCK"] = "STOCK";
    EquipmentStatus["ASSIGNED"] = "ASSIGNED";
    EquipmentStatus["SOLD"] = "SOLD";
    EquipmentStatus["MAINTENANCE"] = "MAINTENANCE";
    EquipmentStatus["LOST"] = "LOST";
    EquipmentStatus["USED"] = "USED";
})(EquipmentStatus || (exports.EquipmentStatus = EquipmentStatus = {}));
var EquipmentUseType;
(function (EquipmentUseType) {
    EquipmentUseType["CLIENT"] = "CLIENT";
    EquipmentUseType["EMPLOYEE"] = "EMPLOYEE";
    EquipmentUseType["COMPANY"] = "COMPANY";
})(EquipmentUseType || (exports.EquipmentUseType = EquipmentUseType = {}));
let Equipment = class Equipment {
    id;
    serialNumber;
    macAddress;
    brand;
    model;
    status;
    assignedDate;
    useType;
    notes;
    created_at;
    updated_at;
    category;
    installation;
    employee;
};
exports.Equipment = Equipment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Equipment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Equipment.prototype, "serialNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Equipment.prototype, "macAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Equipment.prototype, "brand", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Equipment.prototype, "model", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EquipmentStatus,
        default: EquipmentStatus.STOCK
    }),
    __metadata("design:type", String)
], Equipment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], Equipment.prototype, "assignedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: EquipmentUseType,
        default: EquipmentUseType.CLIENT
    }),
    __metadata("design:type", String)
], Equipment.prototype, "useType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Equipment.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", Date)
], Equipment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" }),
    __metadata("design:type", Date)
], Equipment.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => equipment_category_entity_1.EquipmentCategory),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", equipment_category_entity_1.EquipmentCategory)
], Equipment.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => installation_entity_1.Installation, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'installationId' }),
    __metadata("design:type", installation_entity_1.Installation)
], Equipment.prototype, "installation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, { nullable: true, onDelete: 'SET NULL' }),
    (0, typeorm_1.JoinColumn)({ name: 'employeeId' }),
    __metadata("design:type", employee_entity_1.Employee)
], Equipment.prototype, "employee", void 0);
exports.Equipment = Equipment = __decorate([
    (0, typeorm_1.Entity)()
], Equipment);
//# sourceMappingURL=equipment.entity.js.map