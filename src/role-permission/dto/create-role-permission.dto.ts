import { IsNumber, IsInt, Min } from 'class-validator';

export class CreateRolePermissionDto {
    @IsNumber()
    @IsInt()
    @Min(1)
    roleId: number;

    @IsNumber()
    @IsInt()
    @Min(1)
    permissionId: number;
}
