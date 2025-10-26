import { IsString, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { InstallationStatus } from '../entities/installation.entity';

export class CreateInstallationDto {
    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    ipAddress?: string;

    @IsOptional()
    @IsDateString()
    installedAt?: string;

    @IsEnum(InstallationStatus)
    status: InstallationStatus;

    @IsNumber()
    clientId: number;

    @IsNumber()
    sectorId: number;
}
