import { IsEnum, IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';
import { OrganizationDocumentType } from '../entities/organization.entity';

export class CreateOrganizationDto {
    @IsString()
    legalName: string;

    @IsEnum(OrganizationDocumentType)
    documentType: OrganizationDocumentType;

    @IsString()
    documentNumber: string;

    @IsOptional()
    @IsNumber()
    representativePersonId?: number;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    address?: string;
}
