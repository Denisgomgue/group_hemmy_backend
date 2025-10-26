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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentHistoryController = void 0;
const common_1 = require("@nestjs/common");
const equipment_history_service_1 = require("./equipment-history.service");
const create_equipment_history_dto_1 = require("./dto/create-equipment-history.dto");
const update_equipment_history_dto_1 = require("./dto/update-equipment-history.dto");
let EquipmentHistoryController = class EquipmentHistoryController {
    equipmentHistoryService;
    constructor(equipmentHistoryService) {
        this.equipmentHistoryService = equipmentHistoryService;
    }
    create(createEquipmentHistoryDto) {
        return this.equipmentHistoryService.create(createEquipmentHistoryDto);
    }
    findAll() {
        return this.equipmentHistoryService.findAll();
    }
    findOne(id) {
        return this.equipmentHistoryService.findOne(+id);
    }
    update(id, updateEquipmentHistoryDto) {
        return this.equipmentHistoryService.update(+id, updateEquipmentHistoryDto);
    }
    remove(id) {
        return this.equipmentHistoryService.remove(+id);
    }
};
exports.EquipmentHistoryController = EquipmentHistoryController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_equipment_history_dto_1.CreateEquipmentHistoryDto]),
    __metadata("design:returntype", void 0)
], EquipmentHistoryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EquipmentHistoryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquipmentHistoryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_equipment_history_dto_1.UpdateEquipmentHistoryDto]),
    __metadata("design:returntype", void 0)
], EquipmentHistoryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquipmentHistoryController.prototype, "remove", null);
exports.EquipmentHistoryController = EquipmentHistoryController = __decorate([
    (0, common_1.Controller)('equipment-history'),
    __metadata("design:paramtypes", [equipment_history_service_1.EquipmentHistoryService])
], EquipmentHistoryController);
//# sourceMappingURL=equipment-history.controller.js.map