import { EquipmentStatus, EquipmentUseType } from '../entities/equipment.entity';
export declare class CreateEquipmentDto {
    serialNumber?: string;
    macAddress?: string;
    brand?: string;
    model?: string;
    status?: EquipmentStatus;
    assignedDate?: string;
    useType?: EquipmentUseType;
    assignedInstallationId?: number;
    assignedEmployeeId?: number;
    categoryId?: number;
    notes?: string;
}
