import { IsString, IsOptional } from 'class-validator';

export class CreateSectorDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;
}
