import { IsOptional, IsString, IsEnum, IsNumber, IsDateString } from 'class-validator';
import { EquipmentStatus, EquipmentUseType } from '../entities/equipment.entity';

export class CreateEquipmentDto {
    @IsOptional()
    @IsString()
    serialNumber?: string;

    @IsOptional()
    @IsString()
    macAddress?: string;

    @IsOptional()
    @IsString()
    brand?: string;

    @IsOptional()
    @IsString()
    model?: string;

    @IsOptional()
    @IsEnum(EquipmentStatus)
    status?: EquipmentStatus;

    @IsOptional()
    @IsDateString()
    assignedDate?: string;

    @IsOptional()
    @IsEnum(EquipmentUseType)
    useType?: EquipmentUseType;

    @IsOptional()
    @IsNumber()
    assignedInstallationId?: number;

    @IsOptional()
    @IsNumber()
    assignedEmployeeId?: number;

    @IsOptional()
    @IsNumber()
    categoryId?: number;

    @IsOptional()
    @IsString()
    notes?: string;
}
