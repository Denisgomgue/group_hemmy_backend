import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
export declare class RolePermissionService {
    create(createRolePermissionDto: CreateRolePermissionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRolePermissionDto: UpdateRolePermissionDto): string;
    remove(id: number): string;
}
