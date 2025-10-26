import { Repository } from 'typeorm';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { Equipment } from './entities/equipment.entity';
export declare class EquipmentService {
    private equipmentRepository;
    constructor(equipmentRepository: Repository<Equipment>);
    create(createEquipmentDto: CreateEquipmentDto): Promise<Equipment>;
    findAll(): Promise<Equipment[]>;
    findOne(id: number): Promise<Equipment | null>;
    update(id: number, updateEquipmentDto: UpdateEquipmentDto): Promise<Equipment | null>;
    remove(id: number): Promise<void>;
}
