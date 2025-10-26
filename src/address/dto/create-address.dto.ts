import { IsEnum, IsOptional, IsString, IsBoolean, IsNumber, IsDateString } from 'class-validator';
import { AddressType } from '../entities/address.entity';

export class CreateAddressDto {
    @IsEnum(AddressType)
    addressType: AddressType;

    @IsOptional()
    @IsString()
    addressLine?: string;

    @IsOptional()
    @IsString()
    reference?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    region?: string;

    @IsOptional()
    @IsString()
    province?: string;

    @IsOptional()
    @IsString()
    district?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    locality?: string;

    @IsOptional()
    @IsString()
    ubigeo?: string;

    @IsOptional()
    @IsBoolean()
    isPrimary?: boolean;

    @IsOptional()
    @IsDateString()
    validFrom?: string;

    @IsOptional()
    @IsDateString()
    validTo?: string;

    @IsOptional()
    @IsNumber()
    actorId?: number;

    @IsOptional()
    @IsNumber()
    installationId?: number;
}
