import { Equipment } from '../../equipment/entities/equipment.entity';
import { Sector } from '../../sector/entities/sector.entity';
import { User } from '../../users/entities/user.entity';
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
    fromInstallationId: number;
    toInstallationId: number;
    actionDate: Date;
    created_at: Date;
    equipment: Equipment;
    fromSector: Sector;
    toSector: Sector;
    user: User;
}
