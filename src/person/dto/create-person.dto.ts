import { IsEnum, IsString, IsEmail, IsOptional, IsDateString } from 'class-validator';
import { DocumentType } from '../entities/person.entity';

export class CreatePersonDto {
    @IsEnum(DocumentType)
    documentType: DocumentType;

    @IsString()
    documentNumber: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsOptional()
    @IsDateString()
    birthdate?: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    address?: string;
}
