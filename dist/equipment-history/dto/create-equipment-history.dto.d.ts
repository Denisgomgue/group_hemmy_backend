import { ActionType } from '../entities/equipment-history.entity';
export declare class CreateEquipmentHistoryDto {
    actionType: ActionType;
    equipmentId?: number;
    fromSectorId?: number;
    toSectorId?: number;
    fromInstallationId?: number;
    toInstallationId?: number;
    performedBy?: number;
    actionDate?: string;
}
