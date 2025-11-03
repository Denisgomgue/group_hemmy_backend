import { Repository } from 'typeorm';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { UpdateRolePermissionDto } from './dto/update-role-permission.dto';
import { RolePermission } from './entities/role-permission.entity';
import { Role } from '../role/entities/role.entity';
import { Permission } from '../permission/entities/permission.entity';
export declare class RolePermissionService {
    private rolePermissionRepository;
    private roleRepository;
    private permissionRepository;
    constructor(rolePermissionRepository: Repository<RolePermission>, roleRepository: Repository<Role>, permissionRepository: Repository<Permission>);
    create(createRolePermissionDto: CreateRolePermissionDto): Promise<{
        roleId: any;
        permissionId: any;
        id: number;
        created_at: Date;
        role: Role;
        permission: Permission;
    }>;
    findAll(roleId?: number, permissionId?: number): Promise<{
        roleId: any;
        permissionId: any;
        id: number;
        created_at: Date;
        role: Role;
        permission: Permission;
    }[]>;
    findByRoleId(roleId: number): Promise<{
        roleId: any;
        permissionId: any;
        id: number;
        created_at: Date;
        role: Role;
        permission: Permission;
    }[]>;
    findByPermissionId(permissionId: number): Promise<{
        roleId: any;
        permissionId: any;
        id: number;
        created_at: Date;
        role: Role;
        permission: Permission;
    }[]>;
    findOne(id: number): Promise<{
        roleId: any;
        permissionId: any;
        id: number;
        created_at: Date;
        role: Role;
        permission: Permission;
    }>;
    update(id: number, updateRolePermissionDto: UpdateRolePermissionDto): Promise<RolePermission>;
    remove(id: number): Promise<RolePermission>;
}
