import { EquipmentCategory } from '../../equipment-categories/entities/equipment-category.entity';
export declare enum EquipmentStatus {
    STOCK = "STOCK",
    ASSIGNED = "ASSIGNED",
    SOLD = "SOLD",
    MAINTENANCE = "MAINTENANCE",
    LOST = "LOST",
    USED = "USED"
}
export declare enum EquipmentUseType {
    CLIENT = "CLIENT",
    EMPLOYEE = "EMPLOYEE",
    COMPANY = "COMPANY"
}
export declare class Equipment {
    id: number;
    serialNumber: string;
    macAddress: string;
    brand: string;
    model: string;
    status: EquipmentStatus;
    assignedDate: Date;
    useType: EquipmentUseType;
    assignedInstallationId: number;
    assignedEmployeeId: number;
    notes: string;
    created_at: Date;
    updated_at: Date;
    category: EquipmentCategory;
}
