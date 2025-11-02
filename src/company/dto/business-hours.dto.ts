import { IsString, IsBoolean, IsOptional, IsIn, Matches } from 'class-validator';

export class BusinessHourDto {
    @IsString()
    @IsIn([ 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday' ])
    day: string;

    @IsBoolean()
    isOpen: boolean;

    @IsOptional()
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'El formato debe ser HH:MM (ej: 09:00)'
    })
    openTime?: string;

    @IsOptional()
    @IsString()
    @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
        message: 'El formato debe ser HH:MM (ej: 18:00)'
    })
    closeTime?: string;
}

export class BusinessHoursDto {
    @IsOptional()
    businessHours?: BusinessHourDto[];
}