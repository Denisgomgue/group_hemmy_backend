import { IsNumber, IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateInstallationEquipmentDto {
    @IsNumber()
    installationId: number;

    @IsNumber()
    equipmentItemId: number;

    @IsDateString()
    assignedAt: string;

    @IsOptional()
    @IsDateString()
    returnedAt?: string;

    @IsOptional()
    @IsString()
    @MaxLength(64)
    conditionOut?: string;

    @IsOptional()
    @IsString()
    @MaxLength(64)
    conditionIn?: string;

    @IsOptional()
    @IsNumber()
    createdByUserId?: number;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    notes?: string;
}
