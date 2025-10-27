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
const installation_entity_1 = require("../installation/entities/installation.entity");
let EquipmentHistoryService = class EquipmentHistoryService {
    equipmentHistoryRepository;
    installationRepository;
    constructor(equipmentHistoryRepository, installationRepository) {
        this.equipmentHistoryRepository = equipmentHistoryRepository;
        this.installationRepository = installationRepository;
    }
    async create(createEquipmentHistoryDto) {
        const history = this.equipmentHistoryRepository.create(createEquipmentHistoryDto);
        return await this.equipmentHistoryRepository.save(history);
    }
    async createAutomatic(equipmentId, actionType, fromInstallationId, toInstallationId, performedBy) {
        let fromSector = null;
        let toSector = null;
        if (fromInstallationId) {
            const fromInstallation = await this.installationRepository.findOne({
                where: { id: fromInstallationId },
                relations: ['sector']
            });
            if (fromInstallation) {
                fromSector = fromInstallation.sector;
            }
        }
        if (toInstallationId) {
            const toInstallation = await this.installationRepository.findOne({
                where: { id: toInstallationId },
                relations: ['sector']
            });
            if (toInstallation) {
                toSector = toInstallation.sector;
            }
        }
        const history = new equipment_history_entity_1.EquipmentHistory();
        history.actionType = actionType;
        history.equipment = { id: equipmentId };
        history.fromSector = fromSector;
        history.toSector = toSector;
        if (fromInstallationId !== null) {
            history.fromInstallationId = fromInstallationId;
        }
        if (toInstallationId !== null) {
            history.toInstallationId = toInstallationId;
        }
        history.user = { id: performedBy };
        history.actionDate = new Date();
        return await this.equipmentHistoryRepository.save(history);
    }
    async findAll() {
        return await this.equipmentHistoryRepository.find({
            relations: ['equipment', 'fromSector', 'toSector', 'user'],
            order: { actionDate: 'DESC' },
        });
    }
    async findOne(id) {
        return await this.equipmentHistoryRepository.findOne({
            where: { id },
            relations: ['equipment', 'fromSector', 'toSector', 'user'],
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
    __param(1, (0, typeorm_1.InjectRepository)(installation_entity_1.Installation)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EquipmentHistoryService);
//# sourceMappingURL=equipment-history.service.js.map