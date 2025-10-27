import { Repository } from 'typeorm';
import { CreateEquipmentHistoryDto } from './dto/create-equipment-history.dto';
import { UpdateEquipmentHistoryDto } from './dto/update-equipment-history.dto';
import { EquipmentHistory, ActionType } from './entities/equipment-history.entity';
import { Installation } from '../installation/entities/installation.entity';
export declare class EquipmentHistoryService {
    private equipmentHistoryRepository;
    private installationRepository;
    constructor(equipmentHistoryRepository: Repository<EquipmentHistory>, installationRepository: Repository<Installation>);
    create(createEquipmentHistoryDto: CreateEquipmentHistoryDto): Promise<EquipmentHistory>;
    createAutomatic(equipmentId: number, actionType: ActionType, fromInstallationId: number | null, toInstallationId: number | null, performedBy: number): Promise<EquipmentHistory>;
    findAll(): Promise<EquipmentHistory[]>;
    findOne(id: number): Promise<EquipmentHistory | null>;
    update(id: number, updateEquipmentHistoryDto: UpdateEquipmentHistoryDto): Promise<EquipmentHistory | null>;
    remove(id: number): Promise<void>;
}
