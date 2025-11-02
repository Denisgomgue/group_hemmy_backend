import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsUrl, IsEmail, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { BusinessHourDto } from './business-hours.dto';

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    businessName: string;

    @IsString()
    @IsNotEmpty()
    ruc: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    district?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @IsString()
    @IsOptional()
    province?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsUrl()
    @IsOptional()
    website?: string;


    @IsOptional()
    description?: string;

    // Logos
    @IsString()
    @IsOptional()
    logoNormal?: string;

    @IsString()
    @IsOptional()
    logoHorizontal?: string;

    @IsString()
    @IsOptional()
    logoReduced?: string;

    @IsString()
    @IsOptional()
    logoNegative?: string;

    // Información adicional
    @IsString()
    @IsOptional()
    slogan?: string;

    @IsString()
    @IsOptional()
    mission?: string;

    @IsString()
    @IsOptional()
    vision?: string;

    @IsString()
    @IsOptional()
    socialMedia?: string;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BusinessHourDto)
    businessHours?: BusinessHourDto[];

    @IsString()
    @IsOptional()
    taxCategory?: string;

    @IsString()
    @IsOptional()
    economicActivity?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
} 