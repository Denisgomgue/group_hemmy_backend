import { IsString, MaxLength } from 'class-validator';

export class CreateEquipmentCategoryDto {
    @IsString()
    @MaxLength(32)
    code: string;

    @IsString()
    @MaxLength(100)
    name: string;
}
