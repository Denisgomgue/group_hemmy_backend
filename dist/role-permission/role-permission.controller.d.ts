import { RolePermissionService } from './role-permission.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
export declare class RolePermissionController {
    private readonly rolePermissionService;
    constructor(rolePermissionService: RolePermissionService);
    create(createRolePermissionDto: CreateRolePermissionDto): Promise<import("./entities/role-permission.entity").RolePermission>;
    findAll(): Promise<import("./entities/role-permission.entity").RolePermission[]>;
    findOne(id: string): Promise<import("./entities/role-permission.entity").RolePermission>;
    update(id: string, updateRolePermissionDto: UpdateRolePermissionDto): Promise<import("./entities/role-permission.entity").RolePermission>;
    remove(id: string): Promise<import("./entities/role-permission.entity").RolePermission>;
}
