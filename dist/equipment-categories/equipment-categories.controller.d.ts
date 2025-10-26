import { EquipmentCategoriesService } from './equipment-categories.service';
import { CreateEquipmentCategoryDto } from './dto/create-equipment-category.dto';
import { UpdateEquipmentCategoryDto } from './dto/update-equipment-category.dto';
export declare class EquipmentCategoriesController {
    private readonly equipmentCategoriesService;
    constructor(equipmentCategoriesService: EquipmentCategoriesService);
    create(createEquipmentCategoryDto: CreateEquipmentCategoryDto): Promise<import("./entities/equipment-category.entity").EquipmentCategory>;
    findAll(): Promise<import("./entities/equipment-category.entity").EquipmentCategory[]>;
    findOne(id: string): Promise<import("./entities/equipment-category.entity").EquipmentCategory | null>;
    update(id: string, updateEquipmentCategoryDto: UpdateEquipmentCategoryDto): Promise<import("./entities/equipment-category.entity").EquipmentCategory | null>;
    remove(id: string): Promise<void>;
}
