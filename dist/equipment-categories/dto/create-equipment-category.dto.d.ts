import { CategoryStatus } from '../entities/equipment-category.entity';
export declare class CreateEquipmentCategoryDto {
    name: string;
    description?: string;
    color?: string;
    status?: CategoryStatus;
}
