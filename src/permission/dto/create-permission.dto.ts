import { IsString, IsNotEmpty, IsOptional, Matches, MaxLength, IsNumber, IsInt, Min } from 'class-validator';

export class CreatePermissionDto {
    @IsString()
    @IsNotEmpty({ message: 'El código es requerido' })
    @Matches(/^[a-z0-9_:]+$/, { message: 'El código solo puede contener letras minúsculas, números, guiones bajos y dos puntos' })
    @MaxLength(100)
    code: string;

    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @MaxLength(255)
    name: string;

    @IsString()
    @IsOptional()
    @MaxLength(500)
    description?: string;

    @IsNumber()
    @IsInt()
    @Min(1)
    @IsOptional()
    resourceId?: number;
}
