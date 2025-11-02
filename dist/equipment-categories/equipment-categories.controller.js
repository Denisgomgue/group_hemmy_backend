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
exports.EquipmentCategoriesController = void 0;
const common_1 = require("@nestjs/common");
const equipment_categories_service_1 = require("./equipment-categories.service");
const create_equipment_category_dto_1 = require("./dto/create-equipment-category.dto");
const update_equipment_category_dto_1 = require("./dto/update-equipment-category.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let EquipmentCategoriesController = class EquipmentCategoriesController {
    equipmentCategoriesService;
    constructor(equipmentCategoriesService) {
        this.equipmentCategoriesService = equipmentCategoriesService;
    }
    create(createEquipmentCategoryDto) {
        return this.equipmentCategoriesService.create(createEquipmentCategoryDto);
    }
    findAll() {
        return this.equipmentCategoriesService.findAll();
    }
    findOne(id) {
        return this.equipmentCategoriesService.findOne(+id);
    }
    update(id, updateEquipmentCategoryDto) {
        return this.equipmentCategoriesService.update(+id, updateEquipmentCategoryDto);
    }
    remove(id) {
        return this.equipmentCategoriesService.remove(+id);
    }
};
exports.EquipmentCategoriesController = EquipmentCategoriesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_equipment_category_dto_1.CreateEquipmentCategoryDto]),
    __metadata("design:returntype", void 0)
], EquipmentCategoriesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EquipmentCategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquipmentCategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_equipment_category_dto_1.UpdateEquipmentCategoryDto]),
    __metadata("design:returntype", void 0)
], EquipmentCategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquipmentCategoriesController.prototype, "remove", null);
exports.EquipmentCategoriesController = EquipmentCategoriesController = __decorate([
    (0, common_1.Controller)('equipment-categories'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [equipment_categories_service_1.EquipmentCategoriesService])
], EquipmentCategoriesController);
//# sourceMappingURL=equipment-categories.controller.js.map