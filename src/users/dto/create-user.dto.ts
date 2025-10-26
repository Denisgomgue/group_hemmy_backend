import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsString()
    passwordHash: string;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsNumber()
    actorId: number;
}
