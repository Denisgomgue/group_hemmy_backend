import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum LogoType {
    NORMAL = 'normal',
    HORIZONTAL = 'horizontal',
    REDUCED = 'reduced',
    NEGATIVE = 'negative'
}

export class UploadLogoDto {
    @IsNotEmpty()
    @IsEnum(LogoType)
    logoType: LogoType;

    @IsOptional()
    @IsString()
    filename?: string;
}