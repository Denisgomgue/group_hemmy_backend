import { IsString, IsBoolean, IsOptional, MinLength, MaxLength } from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    code: string;

    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;

    @IsBoolean()
    @IsOptional()
    isSystem?: boolean;
}
