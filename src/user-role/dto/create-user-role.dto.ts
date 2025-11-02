import { IsNumber, IsInt, Min, IsOptional, IsDate } from 'class-validator';

export class CreateUserRoleDto {
    @IsNumber()
    @IsInt()
    @Min(1)
    UserId: number;

    @IsNumber()
    @IsInt()
    @Min(1)
    roleId: number;

    @IsDate()
    @IsOptional()
    assignedAt?: Date;
}
