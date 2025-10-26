import { Equipment } from '../../equipment/entities/equipment.entity';
export declare enum CategoryStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare class EquipmentCategory {
    id: number;
    name: string;
    description: string;
    color: string;
    status: CategoryStatus;
    created_at: Date;
    updated_at: Date;
    equipment: Equipment[];
}
