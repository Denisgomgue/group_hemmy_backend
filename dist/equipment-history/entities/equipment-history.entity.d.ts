import { Equipment } from '../../equipment/entities/equipment.entity';
export declare enum ActionType {
    ASSIGNMENT = "assignment",
    TRANSFER = "transfer",
    MAINTENANCE = "maintenance",
    RETURN = "return",
    RETIREMENT = "retirement",
    LOCATION_CHANGE = "location_change"
}
export declare class EquipmentHistory {
    id: number;
    actionType: ActionType;
    fromLocation: string;
    toLocation: string;
    reason: string;
    notes: string;
    actionDate: Date;
    performedBy: number;
    fromClientId: number;
    toClientId: number;
    fromInstallationId: number;
    toInstallationId: number;
    fromEmployeeId: number;
    toEmployeeId: number;
    equipment: Equipment;
}
