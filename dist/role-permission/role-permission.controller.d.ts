import { RolePermissionService } from './role-permission.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
export declare class RolePermissionController {
    private readonly rolePermissionService;
    constructor(rolePermissionService: RolePermissionService);
    create(createRolePermissionDto: CreateRolePermissionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRolePermissionDto: UpdateRolePermissionDto): string;
    remove(id: string): string;
}
