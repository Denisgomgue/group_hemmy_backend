import { EquipmentCategory } from '../../equipment-categories/entities/equipment-category.entity';
import { Installation } from '../../installation/entities/installation.entity';
import { Employee } from '../../employee/entities/employee.entity';
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
    notes: string;
    categoryId: number;
    installationId: number;
    employeeId: number;
    created_at: Date;
    updated_at: Date;
    category: EquipmentCategory;
    installation: Installation;
    employee: Employee;
}
