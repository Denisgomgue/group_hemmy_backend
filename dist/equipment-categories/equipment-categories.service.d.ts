import { Repository } from 'typeorm';
import { CreateEquipmentCategoryDto } from './dto/create-equipment-category.dto';
import { UpdateEquipmentCategoryDto } from './dto/update-equipment-category.dto';
import { EquipmentCategory } from './entities/equipment-category.entity';
export declare class EquipmentCategoriesService {
    private equipmentCategoryRepository;
    constructor(equipmentCategoryRepository: Repository<EquipmentCategory>);
    create(createEquipmentCategoryDto: CreateEquipmentCategoryDto): Promise<EquipmentCategory>;
    findAll(): Promise<EquipmentCategory[]>;
    findOne(id: number): Promise<EquipmentCategory | null>;
    update(id: number, updateEquipmentCategoryDto: UpdateEquipmentCategoryDto): Promise<EquipmentCategory | null>;
    remove(id: number): Promise<void>;
}
