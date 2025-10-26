import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreatePlanDto {
    @IsOptional()
    @IsNumber()
    serviceId?: number;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsOptional()
    @IsNumber()
    speedMbps?: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;
}
