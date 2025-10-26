import { Repository } from 'typeorm';
import { CreateEquipmentHistoryDto } from './dto/create-equipment-history.dto';
import { UpdateEquipmentHistoryDto } from './dto/update-equipment-history.dto';
import { EquipmentHistory } from './entities/equipment-history.entity';
export declare class EquipmentHistoryService {
    private equipmentHistoryRepository;
    constructor(equipmentHistoryRepository: Repository<EquipmentHistory>);
    create(createEquipmentHistoryDto: CreateEquipmentHistoryDto): Promise<EquipmentHistory>;
    findAll(): Promise<EquipmentHistory[]>;
    findOne(id: number): Promise<EquipmentHistory | null>;
    update(id: number, updateEquipmentHistoryDto: UpdateEquipmentHistoryDto): Promise<EquipmentHistory | null>;
    remove(id: number): Promise<void>;
}
