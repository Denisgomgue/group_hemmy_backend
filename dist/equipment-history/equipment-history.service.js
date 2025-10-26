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
exports.EquipmentHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const equipment_history_entity_1 = require("./entities/equipment-history.entity");
let EquipmentHistoryService = class EquipmentHistoryService {
    equipmentHistoryRepository;
    constructor(equipmentHistoryRepository) {
        this.equipmentHistoryRepository = equipmentHistoryRepository;
    }
    async create(createEquipmentHistoryDto) {
        const history = this.equipmentHistoryRepository.create(createEquipmentHistoryDto);
        return await this.equipmentHistoryRepository.save(history);
    }
    async findAll() {
        return await this.equipmentHistoryRepository.find({
            relations: ['equipment'],
            order: { actionDate: 'DESC' },
        });
    }
    async findOne(id) {
        return await this.equipmentHistoryRepository.findOne({
            where: { id },
            relations: ['equipment'],
        });
    }
    async update(id, updateEquipmentHistoryDto) {
        await this.equipmentHistoryRepository.update(id, updateEquipmentHistoryDto);
        return await this.findOne(id);
    }
    async remove(id) {
        await this.equipmentHistoryRepository.delete(id);
    }
};
exports.EquipmentHistoryService = EquipmentHistoryService;
exports.EquipmentHistoryService = EquipmentHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(equipment_history_entity_1.EquipmentHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EquipmentHistoryService);
//# sourceMappingURL=equipment-history.service.js.map