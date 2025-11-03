import { IsString, IsBoolean, IsOptional, IsInt, Min, MaxLength, MinLength } from 'class-validator';

export class CreateResourceDto {
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    routeCode: string;

    @IsString()
    @MinLength(2)
    @MaxLength(255)
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean;

    @IsInt()
    @Min(0)
    @IsOptional()
    orderIndex?: number;
}

