import { RolePermissionService } from './role-permission.service';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
export declare class RolePermissionController {
    private readonly rolePermissionService;
    constructor(rolePermissionService: RolePermissionService);
    create(createRolePermissionDto: CreateRolePermissionDto): Promise<{
        roleId: any;
        permissionId: any;
        id: number;
        created_at: Date;
        role: import("../role/entities/role.entity").Role;
        permission: import("../permission/entities/permission.entity").Permission;
    }>;
    findAll(roleId?: string, permissionId?: string): Promise<{
        roleId: any;
        permissionId: any;
        id: number;
        created_at: Date;
        role: import("../role/entities/role.entity").Role;
        permission: import("../permission/entities/permission.entity").Permission;
    }[]>;
    findOne(id: string): Promise<{
        roleId: any;
        permissionId: any;
        id: number;
        created_at: Date;
        role: import("../role/entities/role.entity").Role;
        permission: import("../permission/entities/permission.entity").Permission;
    }>;
    update(id: string, updateRolePermissionDto: UpdateRolePermissionDto): Promise<import("./entities/role-permission.entity").RolePermission>;
    remove(id: string): Promise<import("./entities/role-permission.entity").RolePermission>;
}
