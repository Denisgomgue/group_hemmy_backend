"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EquipmentHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const equipment_history_service_1 = require("./equipment-history.service");
const equipment_history_controller_1 = require("./equipment-history.controller");
const equipment_history_entity_1 = require("./entities/equipment-history.entity");
const installation_entity_1 = require("../installation/entities/installation.entity");
let EquipmentHistoryModule = class EquipmentHistoryModule {
};
exports.EquipmentHistoryModule = EquipmentHistoryModule;
exports.EquipmentHistoryModule = EquipmentHistoryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([equipment_history_entity_1.EquipmentHistory, installation_entity_1.Installation])],
        controllers: [equipment_history_controller_1.EquipmentHistoryController],
        providers: [equipment_history_service_1.EquipmentHistoryService],
        exports: [equipment_history_service_1.EquipmentHistoryService],
    })
], EquipmentHistoryModule);
//# sourceMappingURL=equipment-history.module.js.map