"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentCategoriesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const equipment_categories_service_1 = require("./equipment-categories.service");
const equipment_categories_controller_1 = require("./equipment-categories.controller");
const equipment_category_entity_1 = require("./entities/equipment-category.entity");
let EquipmentCategoriesModule = class EquipmentCategoriesModule {
};
exports.EquipmentCategoriesModule = EquipmentCategoriesModule;
exports.EquipmentCategoriesModule = EquipmentCategoriesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([equipment_category_entity_1.EquipmentCategory])],
        controllers: [equipment_categories_controller_1.EquipmentCategoriesController],
        providers: [equipment_categories_service_1.EquipmentCategoriesService],
        exports: [equipment_categories_service_1.EquipmentCategoriesService],
    })
], EquipmentCategoriesModule);
//# sourceMappingURL=equipment-categories.module.js.map