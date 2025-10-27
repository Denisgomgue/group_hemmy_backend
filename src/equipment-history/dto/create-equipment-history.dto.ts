import { IsOptional, IsDateString, IsEnum, IsNumber } from 'class-validator';
import { ActionType } from '../entities/equipment-history.entity';

export class CreateEquipmentHistoryDto {
    @IsEnum(ActionType)
    actionType: ActionType;

    @IsOptional()
    @IsNumber()
    equipmentId?: number;

    @IsOptional()
    @IsNumber()
    fromSectorId?: number;

    @IsOptional()
    @IsNumber()
    toSectorId?: number;

    @IsOptional()
    @IsNumber()
    fromInstallationId?: number;

    @IsOptional()
    @IsNumber()
    toInstallationId?: number;

    @IsOptional()
    @IsNumber()
    performedBy?: number;

    @IsOptional()
    @IsDateString()
    actionDate?: string;
}
