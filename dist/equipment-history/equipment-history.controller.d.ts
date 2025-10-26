import { EquipmentHistoryService } from './equipment-history.service';
import { CreateEquipmentHistoryDto } from './dto/create-equipment-history.dto';
import { UpdateEquipmentHistoryDto } from './dto/update-equipment-history.dto';
export declare class EquipmentHistoryController {
    private readonly equipmentHistoryService;
    constructor(equipmentHistoryService: EquipmentHistoryService);
    create(createEquipmentHistoryDto: CreateEquipmentHistoryDto): Promise<import("./entities/equipment-history.entity").EquipmentHistory>;
    findAll(): Promise<import("./entities/equipment-history.entity").EquipmentHistory[]>;
    findOne(id: string): Promise<import("./entities/equipment-history.entity").EquipmentHistory | null>;
    update(id: string, updateEquipmentHistoryDto: UpdateEquipmentHistoryDto): Promise<import("./entities/equipment-history.entity").EquipmentHistory | null>;
    remove(id: string): Promise<void>;
}
