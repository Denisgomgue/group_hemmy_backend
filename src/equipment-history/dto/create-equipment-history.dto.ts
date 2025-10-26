import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';
import { ActionType } from '../entities/equipment-history.entity';

export class CreateEquipmentHistoryDto {
    @IsEnum(ActionType)
    actionType: ActionType;

    @IsOptional()
    @IsString()
    fromLocation?: string;

    @IsOptional()
    @IsString()
    toLocation?: string;

    @IsOptional()
    @IsString()
    reason?: string;

    @IsOptional()
    @IsString()
    notes?: string;

    @IsOptional()
    @IsNumber()
    performedBy?: number;

    @IsOptional()
    @IsNumber()
    equipmentId?: number;

    @IsOptional()
    @IsNumber()
    fromClientId?: number;

    @IsOptional()
    @IsNumber()
    toClientId?: number;

    @IsOptional()
    @IsNumber()
    fromInstallationId?: number;

    @IsOptional()
    @IsNumber()
    toInstallationId?: number;

    @IsOptional()
    @IsNumber()
    fromEmployeeId?: number;

    @IsOptional()
    @IsNumber()
    toEmployeeId?: number;
}
