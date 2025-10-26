import { ActionType } from '../entities/equipment-history.entity';
export declare class CreateEquipmentHistoryDto {
    actionType: ActionType;
    fromLocation?: string;
    toLocation?: string;
    reason?: string;
    notes?: string;
    performedBy?: number;
    equipmentId?: number;
    fromClientId?: number;
    toClientId?: number;
    fromInstallationId?: number;
    toInstallationId?: number;
    fromEmployeeId?: number;
    toEmployeeId?: number;
}
